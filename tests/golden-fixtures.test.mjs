import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const detector = path.join(repoRoot, '.claude/skills/webuild-website-standard/scripts/detect-project.mjs');

function detectFixture(fixtureName) {
  const cwd = path.join(repoRoot, 'fixtures', fixtureName);
  const output = execFileSync(process.execPath, [detector], { cwd, encoding: 'utf8' });
  return JSON.parse(output);
}

test('golden fixture: docs-only repo remains static', () => {
  const result = detectFixture('docs-only-repo');

  assert.equal(result.runtime.hostingModeRecommendation, 'static');
  assert.equal(result.stack.framework, 'unknown');
  assert.equal(result.runtime.usesAuth, false);
  assert.equal(result.runtime.usesPayments, false);
  assert.equal(result.runtime.usesBackgroundJobs, false);
});

test('golden fixture: next static site remains static', () => {
  const result = detectFixture('next-static-site');

  assert.equal(result.stack.framework, 'nextjs');
  assert.equal(result.stack.router, 'app');
  assert.equal(result.stack.hasStaticExport, true);
  assert.equal(result.runtime.hostingModeRecommendation, 'static');
  assert.deepEqual(result.runtime.runtimeEnvVars, []);
});

test('golden fixture: next API form site is dynamic', () => {
  const result = detectFixture('next-dynamic-api-form');

  assert.equal(result.stack.framework, 'nextjs');
  assert.equal(result.runtime.hostingModeRecommendation, 'dynamic');
  assert.equal(result.runtime.hasApiRoutes, true);
  assert.equal(result.deployment.vpsCoolify.compatible, true);
});

test('golden fixture: next auth/db/payment portal is app', () => {
  const result = detectFixture('next-app-auth-db');

  assert.equal(result.stack.framework, 'nextjs');
  assert.equal(result.runtime.hostingModeRecommendation, 'app');
  assert.equal(result.runtime.usesAuth, true);
  assert.equal(result.runtime.usesDatabase, true);
  assert.equal(result.runtime.usesPayments, true);
});
