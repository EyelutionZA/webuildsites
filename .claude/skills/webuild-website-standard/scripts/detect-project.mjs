#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const SOURCE_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.vue', '.svelte']);
const SKIP_DIRS = new Set([
  'node_modules',
  '.next',
  'dist',
  'build',
  'out',
  '.git',
  'coverage',
  '.turbo',
  '.vercel',
  'tests',
  '__tests__',
  'e2e',
  'playwright-report',
  'templates',
  'examples'
]);
const LOCKFILES = new Set(['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', 'bun.lockb']);
const TEST_FILE_PATTERN = /(^|\/)([^/]+\.)?(test|spec)\.(js|jsx|ts|tsx|mjs|cjs)$/;

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

function walk(dir = '.', maxDepth = 6, currentDepth = 0, results = []) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full) || currentDepth > maxDepth) return results;

  const entries = fs.readdirSync(full, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    if (entry.name.startsWith('.') && entry.name !== '.env.example') continue;
    if (SKIP_DIRS.has(entry.name)) continue;

    const rel = path.join(dir, entry.name).replace(/^\.\//, '');
    if (entry.isDirectory()) walk(rel, maxDepth, currentDepth + 1, results);
    else if (!TEST_FILE_PATTERN.test(rel.replaceAll('\\', '/'))) results.push(rel);
  }
  return results;
}

function hasDependency(deps, names) {
  return names.some((name) => Boolean(deps[name]));
}

function hasSourcePattern(sourceText, patterns) {
  return patterns.some((pattern) => pattern.test(sourceText));
}

const pkg = readJson('package.json') || {};
const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
const scripts = pkg.scripts || {};
const files = walk();
const sourceFiles = files.filter((file) => SOURCE_EXTENSIONS.has(path.extname(file)));
const sourceText = sourceFiles.map(readText).join('\n');

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

const hasApiRoutes = sourceFiles.some((file) => {
  const normalized = file.replaceAll('\\', '/');
  return /(^|\/)(app|src\/app)\/.*\/route\.(ts|js)$/.test(normalized)
    || /(^|\/)(pages|src\/pages)\/api\//.test(normalized)
    || /(^|\/)api\//.test(normalized);
});

const hasMiddleware = sourceFiles.some((file) => /(^|\/)(middleware|proxy)\.(ts|js)$/.test(file.replaceAll('\\', '/')));

const usesDatabase = hasDependency(deps, [
  'prisma', '@prisma/client', 'drizzle', 'drizzle-orm', 'mongoose', 'pg', 'mysql2',
  'sqlite3', 'better-sqlite3', '@supabase/supabase-js', 'mongodb', 'kysely', 'typeorm'
]) || hasSourcePattern(sourceText, [
  /new\s+PrismaClient\s*\(/,
  /createClient\s*\([^)]*SUPABASE/i,
  /DATABASE_URL/,
  /from\(['"][A-Za-z0-9_-]+['"]\)\.(select|insert|update|delete)/
]);

const usesAuth = hasDependency(deps, [
  'next-auth', '@auth/core', '@clerk/nextjs', 'clerk', 'lucia', '@supabase/auth-helpers-nextjs', 'jsonwebtoken', 'bcrypt', 'bcryptjs', 'passport'
]) || hasSourcePattern(sourceText, [
  /\bAUTH_SECRET\b/,
  /\bNEXTAUTH_/,
  /\bCLERK_/,
  /getServerSession\s*\(/,
  /currentUser\s*\(/,
  /signIn\s*\(/,
  /signOut\s*\(/
]);

const usesPayments = hasDependency(deps, ['stripe', '@stripe/stripe-js', '@paypal/checkout-server-sdk']) || hasSourcePattern(sourceText, [
  /\bSTRIPE_/,
  /\bPAYSTACK_/,
  /\bPAYFAST_/,
  /\bPAYMENT_SECRET_KEY\b/,
  /new\s+Stripe\s*\(/,
  /checkout\.sessions\.create\s*\(/
]);

const usesUploads = hasDependency(deps, ['multer', 'formidable', 'busboy', '@aws-sdk/client-s3', 'cloudinary']) || hasSourcePattern(sourceText, [
  /request\.formData\s*\(/,
  /formData\.get\s*\(['"][^'"]*(file|image|upload)/i,
  /fs\.(writeFile|writeFileSync|createWriteStream)\s*\(/,
  /putObject\s*\(/,
  /\bS3_BUCKET\b/,
  /\bR2_BUCKET\b/
]);

const usesBackgroundJobs = hasDependency(deps, ['bull', 'bullmq', 'inngest', '@trigger.dev/sdk', 'node-cron', 'agenda', 'bee-queue']) || hasSourcePattern(sourceText, [
  /new\s+Queue\s*\(/,
  /QueueScheduler\s*\(/,
  /inngest\.createFunction\s*\(/,
  /cron\.schedule\s*\(/,
  /process\.env\.(CRON_SECRET|QUEUE_|REDIS_URL)/
]);

const envVars = Array.from(new Set([
  ...sourceText.matchAll(/process\.env\.([A-Z0-9_]+)/g),
  ...sourceText.matchAll(/import\.meta\.env\.([A-Z0-9_]+)/g)
].map((match) => match[1]))).sort();

const runtimeEnvVars = envVars.filter((name) => !name.startsWith('NEXT_PUBLIC_') && !name.startsWith('PUBLIC_'));
const usesRuntimeEnvVars = runtimeEnvVars.length > 0;

let hostingMode = 'static';
const reasons = [];

if (usesAuth || usesDatabase || usesPayments || usesBackgroundJobs) {
  hostingMode = 'app';
  if (usesAuth) reasons.push('auth detected');
  if (usesDatabase) reasons.push('database dependency detected');
  if (usesPayments) reasons.push('payment dependency detected');
  if (usesBackgroundJobs) reasons.push('background job/queue dependency detected');
} else if (hasApiRoutes || hasMiddleware || usesUploads || usesRuntimeEnvVars) {
  hostingMode = 'dynamic';
  if (hasApiRoutes) reasons.push('API routes/route handlers detected');
  if (hasMiddleware) reasons.push('middleware/proxy detected');
  if (usesUploads) reasons.push('upload/file handling indicators detected');
  if (usesRuntimeEnvVars) reasons.push('server-only/runtime environment variables detected');
}

const configText = readText('next.config.js') + readText('next.config.mjs') + readText('next.config.ts');
const hasStaticExport = /output\s*:\s*['"]export['"]/.test(configText);
const hasDockerfile = exists('Dockerfile');
const hasCompose = exists('docker-compose.yml') || exists('compose.yml');

const vercel = {
  compatible: framework === 'nextjs' || framework.startsWith('vite') || framework === 'astro' || framework === 'react' || framework === 'unknown',
  notes: []
};

if (usesUploads) vercel.notes.push('Check for persistent local file writes; Vercel should use external object storage.');
if (usesBackgroundJobs) vercel.notes.push('Background jobs should use an external worker/queue/scheduler.');
if (framework === 'unknown') vercel.notes.push('No framework detected; this may be a standards/docs repo or needs manual framework setup.');
if (hasDockerfile) vercel.notes.push('Dockerfile detected; Vercel normally ignores Dockerfile for standard Next.js deployments.');

const vpsCoolify = {
  compatible: framework !== 'unknown' || hasDockerfile || hasCompose || Boolean(scripts.build || scripts.start),
  strategy: hasCompose ? 'compose' : hasDockerfile ? 'docker' : hostingMode === 'static' ? 'static or node' : 'node or docker',
  notes: []
};

if (hostingMode !== 'static' && !scripts.start && !hasDockerfile && !hasCompose) {
  vpsCoolify.notes.push('Dynamic/app project has no start script or container config. Add or document one.');
}
if (usesUploads) vpsCoolify.notes.push('Define persistent volume or external object storage for uploads.');
if (usesDatabase) vpsCoolify.notes.push('Document database location and backup strategy.');
if (framework === 'unknown') vpsCoolify.notes.push('No app framework detected; likely docs/standard repo or manual deployment needed.');

const result = {
  project: {
    name: pkg.name || path.basename(root),
    root
  },
  stack: {
    framework,
    router,
    packageManager,
    scripts,
    hasStaticExport,
    hasDockerfile,
    hasCompose
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
    usesRuntimeEnvVars,
    envVars,
    runtimeEnvVars
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
  scan: {
    sourceFilesScanned: sourceFiles.length,
    lockfilesIgnored: files.filter((file) => LOCKFILES.has(path.basename(file))).length,
    markdownIgnored: files.filter((file) => path.extname(file) === '.md').length
  },
  nextSteps: [
    'Verify the recommended hosting mode manually before changing architecture.',
    'Update webuild.config.json with classification, runtime, env vars, and deployment target.',
    'Run the relevant Webuild preflight checklist before deployment.'
  ]
};

console.log(JSON.stringify(result, null, 2));
