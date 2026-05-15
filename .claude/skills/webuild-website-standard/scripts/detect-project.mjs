#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function exists(...parts) {
  return fs.existsSync(path.join(root, ...parts));
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
  } catch {
    return null;
  }
}

function readText(file) {
  try {
    return fs.readFileSync(path.join(root, file), 'utf8');
  } catch {
    return '';
  }
}

function walk(dir, maxDepth = 4, currentDepth = 0, results = []) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full) || currentDepth > maxDepth) return results;

  for (const entry of fs.readdirSync(full, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    if (['node_modules', '.next', 'dist', 'build', 'out', '.git'].includes(entry.name)) continue;

    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(rel, maxDepth, currentDepth + 1, results);
    else results.push(rel);
  }
  return results;
}

const pkg = readJson('package.json') || {};
const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
const scripts = pkg.scripts || {};
const files = walk('.', 5).map((file) => file.replace(/^\.\//, ''));
const allTextTargets = files.filter((file) => /\.(js|jsx|ts|tsx|mjs|cjs|json|env|md|yml|yaml)$/.test(file));
const combinedText = allTextTargets.slice(0, 300).map(readText).join('\n');

const packageManager = exists('pnpm-lock.yaml') ? 'pnpm'
  : exists('yarn.lock') ? 'yarn'
  : exists('bun.lockb') ? 'bun'
  : exists('package-lock.json') ? 'npm'
  : 'unknown';

const framework = deps.next ? 'nextjs'
  : deps['@vitejs/plugin-react'] || deps.vite ? 'vite/react-or-unknown'
  : deps.astro ? 'astro'
  : deps['@remix-run/react'] ? 'remix'
  : deps.react ? 'react'
  : 'unknown';

const router = exists('app') || exists('src', 'app') ? 'app'
  : exists('pages') || exists('src', 'pages') ? 'pages'
  : 'unknown';

const hasApiRoutes = files.some((file) => /(^|\/)(api)(\/|$)/.test(file) || /route\.(ts|js)$/.test(file));
const hasMiddleware = files.some((file) => /(^|\/)(middleware|proxy)\.(ts|js)$/.test(file));
const usesDatabase = Boolean(deps.prisma || deps['@prisma/client'] || deps.drizzle || deps['drizzle-orm'] || deps.mongoose || deps.pg || deps.mysql2 || deps.sqlite3 || deps.better_sqlite3 || deps['@supabase/supabase-js']);
const usesAuth = Boolean(deps['next-auth'] || deps['@auth/core'] || deps.clerk || deps['@clerk/nextjs'] || deps.lucia || /AUTH_SECRET|NEXTAUTH|CLERK_|SESSION/i.test(combinedText));
const usesPayments = Boolean(deps.stripe || deps.paypal || /STRIPE_|PAYMENT_|PAYFAST|PAYSTACK/i.test(combinedText));
const usesUploads = /multer|formidable|busboy|upload|writeFile|fs\.writeFile|Blob|S3|R2|cloudinary/i.test(combinedText);
const usesBackgroundJobs = /bullmq|bull|queue|cron|inngest|trigger\.dev|schedule|worker/i.test(combinedText);
const usesEnvVars = /process\.env\.|import\.meta\.env\./.test(combinedText);

const envVars = Array.from(new Set([
  ...combinedText.matchAll(/process\.env\.([A-Z0-9_]+)/g),
  ...combinedText.matchAll(/import\.meta\.env\.([A-Z0-9_]+)/g)
].map((match) => match[1]))).sort();

let hostingMode = 'static';
const reasons = [];

if (usesAuth || usesDatabase || usesPayments || usesBackgroundJobs) {
  hostingMode = 'app';
  if (usesAuth) reasons.push('auth detected');
  if (usesDatabase) reasons.push('database dependency detected');
  if (usesPayments) reasons.push('payment dependency detected');
  if (usesBackgroundJobs) reasons.push('background job/queue dependency detected');
} else if (hasApiRoutes || hasMiddleware || usesUploads || usesEnvVars) {
  hostingMode = 'dynamic';
  if (hasApiRoutes) reasons.push('API routes/route handlers detected');
  if (hasMiddleware) reasons.push('middleware/proxy detected');
  if (usesUploads) reasons.push('upload/file handling indicators detected');
  if (usesEnvVars) reasons.push('runtime environment variables detected');
}

const vercel = {
  compatible: framework === 'nextjs' || framework.startsWith('vite') || framework === 'astro' || framework === 'react',
  notes: []
};

if (usesUploads) vercel.notes.push('Check for persistent local file writes; Vercel should use external object storage.');
if (usesBackgroundJobs) vercel.notes.push('Background jobs should use an external worker/queue/scheduler.');
if (framework === 'unknown') vercel.notes.push('Framework unknown; manually confirm Vercel preset/build settings.');

const vpsCoolify = {
  compatible: framework !== 'unknown',
  strategy: hostingMode === 'static' ? 'static or node' : 'node or docker',
  notes: []
};

if (hostingMode !== 'static' && !scripts.start) vpsCoolify.notes.push('Dynamic/app project has no start script. Add or document one.');
if (usesUploads) vpsCoolify.notes.push('Define persistent volume or external object storage for uploads.');
if (usesDatabase) vpsCoolify.notes.push('Document database location and backup strategy.');

const result = {
  project: {
    name: pkg.name || path.basename(root),
    root
  },
  stack: {
    framework,
    router,
    packageManager,
    scripts
  },
  runtime: {
    hostingModeRecommendation: hostingMode,
    reasons,
    hasApiRoutes,
    hasMiddleware,
    usesDatabase,
    usesAuth,
    usesPayments,
    usesUploads,
    usesBackgroundJobs,
    usesEnvVars,
    envVars
  },
  deployment: {
    vercel,
    vpsCoolify
  },
  files: {
    hasWebuildConfig: exists('webuild.config.json'),
    hasEnvExample: exists('.env.example'),
    hasDeploymentDocs: exists('docs', 'DEPLOYMENT.md'),
    hasHandoverDocs: exists('docs', 'HANDOVER.md')
  },
  nextSteps: [
    'Verify the recommended hosting mode manually before changing architecture.',
    'Update webuild.config.json with classification, runtime, env vars, and deployment target.',
    'Run the relevant Webuild preflight checklist before deployment.'
  ]
};

console.log(JSON.stringify(result, null, 2));
