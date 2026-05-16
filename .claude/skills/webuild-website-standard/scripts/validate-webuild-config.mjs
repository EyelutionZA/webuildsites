#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

function parseEnvExample(text) {
  const names = new Set();
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([A-Z0-9_]+)\s*=/);
    if (match) names.add(match[1]);
  }
  return names;
}

function findSchemaPath() {
  const candidates = [
    path.join(root, 'schemas', 'webuild.config.schema.json'),
    path.resolve(__dirname, '..', 'schemas', 'webuild.config.schema.json'),
    path.resolve(__dirname, '..', '..', '..', '..', 'schemas', 'webuild.config.schema.json')
  ];

  return candidates.find((candidate) => fs.existsSync(candidate));
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
const schemaPath = findSchemaPath();
if (!schemaPath) {
  issues.push(fail('Canonical schema schemas/webuild.config.schema.json could not be found', 'schemas/webuild.config.schema.json'));
} else {
  const schema = readJson(schemaPath);
  if (schema.__error) {
    issues.push(fail(`Canonical schema is not valid JSON: ${schema.__error}`, 'schemas/webuild.config.schema.json'));
  } else {
    const ajv = new Ajv({ allErrors: true, strict: false });
    const validateSchema = ajv.compile(schema);
    const schemaValid = validateSchema(config);
    if (!schemaValid) {
      for (const error of validateSchema.errors || []) {
        issues.push(fail(`Schema: ${error.instancePath || '/'} ${error.message}`, error.instancePath || '/'));
      }
    }
  }
}

const mode = config?.classification?.hostingMode;
const projectType = config?.project?.type;
const runtime = config?.runtime || {};
const commands = config?.commands || {};
const integrations = config?.integrations || {};
const deployment = config?.deployment || {};
const stack = config?.stack || {};
const maintenance = config?.maintenance || {};

if (projectType === 'website' && mode === 'none') issues.push(fail('Website projects cannot use hostingMode none', 'classification.hostingMode'));
if (projectType !== 'website' && ['static', 'dynamic', 'app'].includes(mode)) {
  issues.push(warn('Non-website repository is using a website hosting mode. Confirm this is intentional.', 'classification.hostingMode'));
}
if (hasOwn(config?.classification, 'type')) {
  issues.push(warn('classification.type is deprecated. Use project.type and classification.hostingMode instead.', 'classification.type'));
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

if (hasOwn(runtime, 'hasApiRoutes')) {
  issues.push(fail('runtime.hasApiRoutes is not a valid config field. Use runtime.usesApiRoutes.', 'runtime.hasApiRoutes'));
}

if (mode === 'none') {
  if (deployment.target && deployment.target !== 'none') issues.push(warn('hostingMode none should usually use deployment.target none', 'deployment.target'));
  for (const key of runtimeBooleans) {
    if (runtime[key]) issues.push(warn(`hostingMode none usually should not set runtime.${key} true`, `runtime.${key}`));
  }
}

if (mode === 'static') {
  const staticForbidden = [
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
  const envNames = parseEnvExample(fs.readFileSync(envExamplePath, 'utf8'));
  for (const env of requiredEnv) {
    if (!envNames.has(env)) issues.push(warn(`Required env var ${env} is not listed in .env.example`, '.env.example'));
  }
}

const requiredProjectFiles = ['AGENTS.md', 'CLAUDE.md'];
for (const file of requiredProjectFiles) {
  if (!fs.existsSync(path.join(root, file))) issues.push(warn(`${file} is missing`, file));
}

const docs = ['docs/DEPLOYMENT.md', 'docs/MAINTENANCE.md', 'docs/HANDOVER.md', 'docs/MIGRATION.md'];
for (const doc of docs) {
  if (!fs.existsSync(path.join(root, doc))) issues.push(warn(`${doc} is missing`, doc));
}

const valid = !issues.some((item) => item.level === 'error');
console.log(JSON.stringify({ valid, issues }, null, 2));
process.exit(valid ? 0 : 1);
