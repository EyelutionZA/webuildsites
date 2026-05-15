import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const cli = path.join(repoRoot, 'scripts/webuild.mjs');

function runPreflight(fixtureName, target) {
  const cwd = path.join(repoRoot, 'fixtures', fixtureName);
  return execFileSync(process.execPath, [cli, 'preflight', `--target=${target}`], {
    cwd,
    encoding: 'utf8'
  });
}

function runReport(fixtureName) {
  const cwd = path.join(repoRoot, 'fixtures', fixtureName);
  return execFileSync(process.execPath, [cli, 'report'], {
    cwd,
    encoding: 'utf8'
  });
}

test('preflight fails for non-deployable docs-only repository', () => {
  const output = runPreflight('docs-only-repo', 'vercel');

  assert.match(output, /Status: \*\*FAIL\*\*/);
  assert.match(output, /Deployable project/);
  assert.match(output, /non-deployable tooling\/standards/);
});

test('Vercel preflight passes for static Next fixture', () => {
  const output = runPreflight('next-static-site', 'vercel');

  assert.match(output, /Webuild Vercel Preflight/);
  assert.match(output, /Status: \*\*PASS\*\*/);
  assert.match(output, /Vercel compatibility/);
});

test('Coolify preflight passes for dynamic API fixture', () => {
  const output = runPreflight('next-dynamic-api-form', 'coolify');

  assert.match(output, /Webuild VPS\/Coolify Preflight/);
  assert.match(output, /Status: \*\*PASS\*\*/);
  assert.match(output, /Start command documented/);
});

test('Coolify preflight passes for app fixture with DB plan and health check', () => {
  const output = runPreflight('next-app-auth-db', 'coolify');

  assert.match(output, /Webuild VPS\/Coolify Preflight/);
  assert.match(output, /Status: \*\*PASS\*\*/);
  assert.match(output, /Database provider: postgres/);
  assert.match(output, /Health check: \/api\/health/);
});

test('report includes score and hosting mode for dynamic fixture', () => {
  const output = runReport('next-dynamic-api-form');

  assert.match(output, /Webuild Site Report/);
  assert.match(output, /Production readiness score/);
  assert.match(output, /Recommended hosting mode: \*\*dynamic\*\*/);
});
