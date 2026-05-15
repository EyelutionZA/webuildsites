#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const configPath = path.join(root, 'webuild.config.json');

function issue(level, message, pathName = '') {
  return { level, message, path: pathName };
}

function fail(message, pathName = '') {
  return issue('error', message, pathName);
}

function warn(message, pathName = '') {
  return issue('warning', message, pathName);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    return { __error: error.message };
  }
}

function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object || {}, key);
}

function commandExists(command) {
  if (!command || typeof command !== 'string') return false;
  const parts = command.trim().split(/\s+/);
  if (parts[0] !== 'npm' || parts[1] !== 'run' || !parts[2]) return true;

  const pkg = readJson(path.join(root, 'package.json'));
  if (pkg.__error) return false;
  return Boolean(pkg.scripts?.[parts[2]]);
}

if (!fs.existsSync(configPath)) {
  console.log(JSON.stringify({ valid: false, issues: [fail('webuild.config.json is missing')] }, null, 2));
  process.exit(1);
}

const config = readJson(configPath);
if (config.__error) {
  console.log(JSON.stringify({ valid: false, issues: [fail(`webuild.config.json is not valid JSON: ${config.__error}`)] }, null, 2));
  process.exit(1);
}

const issues = [];
const mode = config?.classification?.hostingMode;
const projectType = config?.project?.type;
const runtime = config?.runtime || {};
const commands = config?.commands || {};
const integrations = config?.integrations || {};
const deployment = config?.deployment || {};
const stack = config?.stack || {};

if (config.standard !== 'webuild-website-standard') issues.push(fail('standard must be webuild-website-standard', 'standard'));
if (!config.version) issues.push(fail('Missing version', 'version'));
if (!config.project?.name) issues.push(fail('Missing project.name', 'project.name'));
if (!projectType) issues.push(fail('Missing project.type', 'project.type'));
if (projectType && !['website', 'standard-repository', 'template-repository', 'tooling-repository'].includes(projectType)) {
  issues.push(fail('project.type must be website, standard-repository, template-repository, or tooling-repository', 'project.type'));
}

if (!mode) issues.push(fail('Missing classification.hostingMode', 'classification.hostingMode'));
if (mode && !['none', 'static', 'dynamic', 'app'].includes(mode)) {
  issues.push(fail('classification.hostingMode must be none, static, dynamic, or app', 'classification.hostingMode'));
}
if (projectType === 'website' && mode === 'none') issues.push(fail('Website projects cannot use hostingMode none', 'classification.hostingMode'));
if (projectType !== 'website' && ['static', 'dynamic', 'app'].includes(mode)) {
  issues.push(warn('Non-website repository is using a website hosting mode. Confirm this is intentional.', 'classification.hostingMode'));
}

const runtimeBooleans = [
  'requiresNodeServer',
  'usesApiRoutes',
  'usesMiddleware',
  'usesDatabase',
  'usesAuth',
  'usesPayments',
  'usesUploads',
  'usesBackgroundJobs',
  'usesPersistentStorage'
];
for (const key of runtimeBooleans) {
  if (!hasOwn(runtime, key)) issues.push(fail(`Missing runtime.${key}`, `runtime.${key}`));
  else if (typeof runtime[key] !== 'boolean') issues.push(fail(`runtime.${key} must be boolean`, `runtime.${key}`));
}

if (mode === 'none') {
  if (deployment.target && deployment.target !== 'none') issues.push(warn('hostingMode none should usually use deployment.target none', 'deployment.target'));
  for (const key of runtimeBooleans) {
    if (runtime[key]) issues.push(warn(`hostingMode none usually should not set runtime.${key} true`, `runtime.${key}`));
  }
}

if (mode === 'static') {
  const staticForbidden = ['usesApiRoutes', 'usesMiddleware', 'usesDatabase', 'usesAuth', 'usesPayments', 'usesBackgroundJobs', 'usesPersistentStorage'];
  for (const key of staticForbidden) {
    if (runtime[key]) issues.push(fail(`Static projects should not require runtime.${key}`, `runtime.${key}`));
  }
}

if (mode === 'dynamic') {
  if (runtime.usesAuth || runtime.usesDatabase || runtime.usesPayments || runtime.usesBackgroundJobs) {
    issues.push(warn('Dynamic project has app-like runtime features. Consider hostingMode app.', 'classification.hostingMode'));
  }
}

if ((mode === 'dynamic' || mode === 'app') && !commands.start) {
  issues.push(fail('Dynamic/app projects must document commands.start', 'commands.start'));
}

if (projectType === 'website') {
  if (!commands.build) issues.push(fail('Website projects must document commands.build', 'commands.build'));
  if (commands.build && !commandExists(commands.build)) issues.push(warn(`Build command may not exist in package.json: ${commands.build}`, 'commands.build'));
  if (commands.start && !commandExists(commands.start)) issues.push(warn(`Start command may not exist in package.json: ${commands.start}`, 'commands.start'));
}

if (!stack.framework) issues.push(fail('Missing stack.framework', 'stack.framework'));
if (!stack.packageManager) issues.push(fail('Missing stack.packageManager', 'stack.packageManager'));
if (!deployment.target) issues.push(fail('Missing deployment.target', 'deployment.target'));
if (typeof deployment.containerized !== 'boolean') issues.push(fail('deployment.containerized must be boolean', 'deployment.containerized'));

const requiredEnv = new Set(Array.isArray(runtime.requiredEnv) ? runtime.requiredEnv : []);
for (const section of Object.values(integrations)) {
  if (section && Array.isArray(section.requiredEnv)) {
    for (const env of section.requiredEnv) requiredEnv.add(env);
  }
}

const envExamplePath = path.join(root, '.env.example');
if (!fs.existsSync(envExamplePath)) {
  issues.push(projectType === 'website' ? fail('.env.example is missing', '.env.example') : warn('.env.example is missing', '.env.example'));
} else {
  const envExample = fs.readFileSync(envExamplePath, 'utf8');
  for (const env of requiredEnv) {
    if (!envExample.includes(env)) issues.push(warn(`Required env var ${env} is not listed in .env.example`, '.env.example'));
  }
}

const docs = ['docs/DEPLOYMENT.md', 'docs/MAINTENANCE.md', 'docs/HANDOVER.md'];
for (const doc of docs) {
  if (!fs.existsSync(path.join(root, doc))) issues.push(warn(`${doc} is missing`, doc));
}

const valid = !issues.some((item) => item.level === 'error');
console.log(JSON.stringify({ valid, issues }, null, 2));
process.exit(valid ? 0 : 1);
