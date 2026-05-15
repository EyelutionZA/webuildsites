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
const detector = path.join(repoRoot, '.claude/skills/webuild-website-standard/scripts/detect-project.mjs');

function makeTempProject(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'webuild-detect-'));
  for (const [file, content] of Object.entries(files)) {
    const fullPath = path.join(dir, file);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content);
  }
  return dir;
}

function detect(files) {
  const dir = makeTempProject(files);
  const output = execFileSync(process.execPath, [detector], { cwd: dir, encoding: 'utf8' });
  return JSON.parse(output);
}

test('docs-only repo does not get misclassified as app', () => {
  const result = detect({
    'README.md': 'Mentions AUTH_SECRET, PAYMENT_SECRET_KEY, upload, queue, cron, worker and scheduler in documentation only.',
    'docs/PLATFORM-COMPATIBILITY.md': 'session upload schedule cron queue worker payment examples only',
    'webuild.config.json': '{ "example": true }'
  });

  assert.equal(result.runtime.hostingModeRecommendation, 'static');
  assert.equal(result.runtime.usesAuth, false);
  assert.equal(result.runtime.usesPayments, false);
  assert.equal(result.runtime.usesBackgroundJobs, false);
  assert.equal(result.runtime.usesUploads, false);
  assert.ok(result.scan.markdownIgnored >= 1);
});

test('lockfile scheduler text does not trigger background jobs', () => {
  const result = detect({
    'package.json': JSON.stringify({
      name: 'static-next-site',
      dependencies: { next: 'latest', react: 'latest', 'react-dom': 'latest' },
      scripts: { build: 'next build' }
    }),
    'package-lock.json': JSON.stringify({ packages: { 'node_modules/scheduler': { version: '0.1.0' } } }),
    'app/page.tsx': 'export default function Page() { return <main>Hello</main>; }'
  });

  assert.equal(result.runtime.hostingModeRecommendation, 'static');
  assert.equal(result.runtime.usesBackgroundJobs, false);
});

test('NEXT_PUBLIC env vars alone do not force dynamic hosting', () => {
  const result = detect({
    'package.json': JSON.stringify({
      name: 'public-env-site',
      dependencies: { next: 'latest', react: 'latest', 'react-dom': 'latest' },
      scripts: { build: 'next build' }
    }),
    'app/page.tsx': "export default function Page() { return <main>{process.env.NEXT_PUBLIC_GA_ID}</main>; }"
  });

  assert.equal(result.runtime.hostingModeRecommendation, 'static');
  assert.deepEqual(result.runtime.runtimeEnvVars, []);
});

test('Next API route is dynamic', () => {
  const result = detect({
    'package.json': JSON.stringify({
      name: 'dynamic-next-site',
      dependencies: { next: 'latest', react: 'latest', 'react-dom': 'latest' },
      scripts: { build: 'next build', start: 'next start' }
    }),
    'app/api/contact/route.ts': 'export async function POST() { return Response.json({ ok: true }); }'
  });

  assert.equal(result.runtime.hostingModeRecommendation, 'dynamic');
  assert.equal(result.runtime.hasApiRoutes, true);
});

test('auth/database/payment dependencies classify as app', () => {
  const result = detect({
    'package.json': JSON.stringify({
      name: 'client-portal',
      dependencies: {
        next: 'latest',
        react: 'latest',
        'react-dom': 'latest',
        '@prisma/client': 'latest',
        'next-auth': 'latest',
        stripe: 'latest'
      },
      scripts: { build: 'next build', start: 'next start' }
    }),
    'app/page.tsx': 'export default function Page() { return <main>Portal</main>; }'
  });

  assert.equal(result.runtime.hostingModeRecommendation, 'app');
  assert.equal(result.runtime.usesAuth, true);
  assert.equal(result.runtime.usesDatabase, true);
  assert.equal(result.runtime.usesPayments, true);
});
