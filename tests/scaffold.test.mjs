import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const generator = path.join(repoRoot, 'scripts/create-webuild-site.mjs');
const detector = path.join(repoRoot, '.claude/skills/webuild-website-standard/scripts/detect-project.mjs');
const validator = path.join(repoRoot, '.claude/skills/webuild-website-standard/scripts/validate-webuild-config.mjs');

function scaffold(mode) {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), `webuild-scaffold-${mode}-`));
  const name = `${mode}-client-site`;
  execFileSync(process.execPath, [generator, name, `--mode=${mode}`], { cwd: parent, encoding: 'utf8' });
  return path.join(parent, name);
}

function runJson(script, cwd) {
  const output = execFileSync(process.execPath, [script], { cwd, encoding: 'utf8' });
  return JSON.parse(output);
}

function assertCommonGeneratedFiles(siteDir) {
  const required = [
    'AGENTS.md',
    'CLAUDE.md',
    'webuild.config.json',
    '.env.example',
    'schemas/webuild.config.schema.json',
    'scripts/webuild.mjs',
    '.claude/skills/webuild-website-standard/SKILL.md',
    'docs/DEPLOYMENT.md',
    'docs/MAINTENANCE.md',
    'docs/HANDOVER.md',
    'docs/MIGRATION.md'
  ];

  for (const file of required) {
    assert.equal(fs.existsSync(path.join(siteDir, file)), true, `${file} should exist`);
  }
}

test('scaffold static site with required Webuild files and valid config', () => {
  const siteDir = scaffold('static');
  assertCommonGeneratedFiles(siteDir);
  assert.equal(fs.existsSync(path.join(siteDir, 'app/page.tsx')), true);
  assert.equal(fs.existsSync(path.join(siteDir, 'content/site.ts')), true);

  const detect = runJson(detector, siteDir);
  const validate = runJson(validator, siteDir);

  assert.equal(detect.runtime.hostingModeRecommendation, 'static');
  assert.equal(validate.valid, true);
});

test('scaffold dynamic site with API routes and valid config', () => {
  const siteDir = scaffold('dynamic');
  assertCommonGeneratedFiles(siteDir);
  assert.equal(fs.existsSync(path.join(siteDir, 'app/api/contact/route.ts')), true);
  assert.equal(fs.existsSync(path.join(siteDir, 'app/api/health/route.ts')), true);

  const detect = runJson(detector, siteDir);
  const validate = runJson(validator, siteDir);

  assert.equal(detect.runtime.hostingModeRecommendation, 'dynamic');
  assert.equal(detect.runtime.hasApiRoutes, true);
  assert.equal(validate.valid, true);
});

test('scaffold app site with dashboard, health endpoint and valid config', () => {
  const siteDir = scaffold('app');
  assertCommonGeneratedFiles(siteDir);
  assert.equal(fs.existsSync(path.join(siteDir, 'app/dashboard/page.tsx')), true);
  assert.equal(fs.existsSync(path.join(siteDir, 'app/api/health/route.ts')), true);

  const detect = runJson(detector, siteDir);
  const validate = runJson(validator, siteDir);

  assert.equal(detect.runtime.hostingModeRecommendation, 'app');
  assert.equal(detect.runtime.usesAuth, true);
  assert.equal(detect.runtime.usesDatabase, true);
  assert.equal(detect.runtime.usesPayments, true);
  assert.equal(validate.valid, true);
});
