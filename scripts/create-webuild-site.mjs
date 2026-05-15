#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const siteName = args[0];
const modeArg = args.find((arg) => arg.startsWith('--mode='));
const mode = modeArg ? modeArg.split('=')[1] : 'dynamic';
const allowedModes = ['static', 'dynamic', 'app'];

function usage() {
  console.log(`\nUsage:\n  node scripts/create-webuild-site.mjs <site-name> --mode=static|dynamic|app\n\nExamples:\n  node scripts/create-webuild-site.mjs acme-plumbing --mode=static\n  node scripts/create-webuild-site.mjs lead-gen-site --mode=dynamic\n  node scripts/create-webuild-site.mjs client-portal --mode=app\n`);
}

if (!siteName || !allowedModes.includes(mode)) {
  usage();
  process.exit(1);
}

const templateDir = path.join(repoRoot, 'templates', `nextjs-${mode}`);
const targetDir = path.resolve(process.cwd(), siteName);

if (!fs.existsSync(templateDir)) {
  console.error(`Template not found: ${templateDir}`);
  process.exit(1);
}

if (fs.existsSync(targetDir)) {
  console.error(`Target directory already exists: ${targetDir}`);
  process.exit(1);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [from, to] of Object.entries(replacements)) {
    content = content.split(from).join(to);
  }
  fs.writeFileSync(filePath, content);
}

copyDir(templateDir, targetDir);

const replacements = {
  '__WEBUILD_PROJECT_NAME__': siteName,
  '__WEBUILD_PROJECT_TITLE__': siteName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' '),
  '__WEBUILD_HOSTING_MODE__': mode
};

const filesToPatch = [
  'package.json',
  'webuild.config.json',
  'content/site.ts',
  'app/layout.tsx',
  'README.md',
  'docs/DEPLOYMENT.md',
  'docs/HANDOVER.md'
];

for (const rel of filesToPatch) {
  replaceInFile(path.join(targetDir, rel), replacements);
}

console.log(`Created ${mode} Webuild site at: ${targetDir}`);
console.log('\nNext steps:');
console.log(`  cd ${siteName}`);
console.log('  npm install');
console.log('  npm run dev');
console.log('\nBefore production:');
console.log('  npm run build');
console.log('  update webuild.config.json');
console.log('  update .env.example and docs/');
