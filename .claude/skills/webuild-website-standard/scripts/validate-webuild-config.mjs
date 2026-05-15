#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const configPath = path.join(root, 'webuild.config.json');

function fail(message) {
  return { level: 'error', message };
}

function warn(message) {
  return { level: 'warning', message };
}

if (!fs.existsSync(configPath)) {
  console.log(JSON.stringify({
    valid: false,
    issues: [fail('webuild.config.json is missing')]
  }, null, 2));
  process.exit(1);
}

let config;
try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
  console.log(JSON.stringify({
    valid: false,
    issues: [fail(`webuild.config.json is not valid JSON: ${error.message}`)]
  }, null, 2));
  process.exit(1);
}

const issues = [];
const mode = config?.classification?.hostingMode;
const target = config?.deployment?.target;
const runtime = config?.runtime || {};
const commands = config?.commands || {};
const integrations = config?.integrations || {};

if (!config.standard) issues.push(fail('Missing standard'));
if (!config.version) issues.push(warn('Missing standard version'));
if (!config.project?.name) issues.push(fail('Missing project.name'));
if (!mode) issues.push(fail('Missing classification.hostingMode'));
if (mode && !['static', 'dynamic', 'app'].includes(mode)) issues.push(fail('classification.hostingMode must be static, dynamic, or app'));
if (!target) issues.push(warn('Missing deployment.target'));

if (!commands.build) issues.push(fail('Missing commands.build'));
if ((mode === 'dynamic' || mode === 'app') && !commands.start) issues.push(fail('Dynamic/app projects must document commands.start'));
if ((mode === 'dynamic' || mode === 'app') && runtime.requiresNodeServer === false && runtime.usesApiRoutes) {
  issues.push(warn('usesApiRoutes is true but requiresNodeServer is false. Confirm runtime target.'));
}

if (mode === 'static') {
  if (runtime.usesApiRoutes) issues.push(fail('Static projects should not require API routes at runtime'));
  if (runtime.usesAuth) issues.push(fail('Static projects should not require auth'));
  if (runtime.usesDatabase) issues.push(fail('Static projects should not require database access at runtime'));
  if (runtime.usesBackgroundJobs) issues.push(fail('Static projects should not require background jobs'));
}

const requiredEnv = new Set();
for (const section of Object.values(integrations)) {
  if (section && Array.isArray(section.requiredEnv)) {
    for (const env of section.requiredEnv) requiredEnv.add(env);
  }
}

const envExamplePath = path.join(root, '.env.example');
if (!fs.existsSync(envExamplePath)) {
  issues.push(fail('.env.example is missing'));
} else {
  const envExample = fs.readFileSync(envExamplePath, 'utf8');
  for (const env of requiredEnv) {
    if (!envExample.includes(env)) issues.push(warn(`Required env var ${env} is not listed in .env.example`));
  }
}

const docs = ['docs/DEPLOYMENT.md', 'docs/MAINTENANCE.md', 'docs/HANDOVER.md'];
for (const doc of docs) {
  if (!fs.existsSync(path.join(root, doc))) issues.push(warn(`${doc} is missing`));
}

const valid = !issues.some((issue) => issue.level === 'error');
console.log(JSON.stringify({ valid, issues }, null, 2));
process.exit(valid ? 0 : 1);
