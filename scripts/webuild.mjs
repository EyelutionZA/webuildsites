#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const cwd = process.cwd();

const detectorPath = path.join(repoRoot, '.claude/skills/webuild-website-standard/scripts/detect-project.mjs');
const validatorPath = path.join(repoRoot, '.claude/skills/webuild-website-standard/scripts/validate-webuild-config.mjs');

const command = process.argv[2] || 'help';
const shouldWrite = process.argv.includes('--write');

function runNodeJson(scriptPath) {
  try {
    const output = execFileSync(process.execPath, [scriptPath], { cwd, encoding: 'utf8' });
    return { ok: true, data: JSON.parse(output), raw: output };
  } catch (error) {
    const stdout = error.stdout?.toString() || '';
    try {
      return { ok: false, data: JSON.parse(stdout), raw: stdout, error };
    } catch {
      return { ok: false, data: null, raw: stdout || error.message, error };
    }
  }
}

function readJsonIfExists(file) {
  try {
    return JSON.parse(fs.readFileSync(path.join(cwd, file), 'utf8'));
  } catch {
    return null;
  }
}

function scoreProject(detectResult, validateResult, config) {
  const scores = {
    classification: 20,
    deployment: 20,
    documentation: 20,
    environment: 20,
    operations: 20
  };

  const runtime = detectResult?.runtime || {};
  const files = detectResult?.files || {};
  const validationIssues = validateResult?.issues || [];
  const errors = validationIssues.filter((issue) => issue.level === 'error').length;
  const warnings = validationIssues.filter((issue) => issue.level === 'warning').length;

  if (errors > 0) scores.classification -= Math.min(20, errors * 6);
  if (warnings > 0) scores.deployment -= Math.min(10, warnings * 2);

  if (!files.hasWebuildConfig) scores.classification -= 10;
  if (!files.hasDeploymentDocs) scores.documentation -= 7;
  if (!files.hasHandoverDocs) scores.documentation -= 7;
  if (!files.hasEnvExample) scores.environment -= 12;

  if (runtime.hostingModeRecommendation === 'dynamic' && !config?.commands?.start) scores.deployment -= 8;
  if (runtime.hostingModeRecommendation === 'app') {
    if (!config?.maintenance?.backups) scores.operations -= 8;
    if (!config?.deployment?.healthCheckPath) scores.operations -= 4;
  }

  if (config?.classification?.hostingMode && runtime.hostingModeRecommendation && config.classification.hostingMode !== 'none') {
    if (config.classification.hostingMode !== runtime.hostingModeRecommendation) scores.classification -= 8;
  }

  for (const key of Object.keys(scores)) scores[key] = Math.max(0, Math.min(20, scores[key]));
  const total = Object.values(scores).reduce((sum, value) => sum + value, 0);
  const riskLevel = total >= 85 ? 'Low' : total >= 65 ? 'Medium' : total >= 45 ? 'High' : 'Critical';

  return { total, riskLevel, scores };
}

function renderReport() {
  const detect = runNodeJson(detectorPath);
  const validate = runNodeJson(validatorPath);
  const config = readJsonIfExists('webuild.config.json');
  const detectData = detect.data || {};
  const validateData = validate.data || { valid: false, issues: [{ level: 'error', message: 'Validator did not return JSON' }] };
  const score = scoreProject(detectData, validateData, config);

  const runtime = detectData.runtime || {};
  const stack = detectData.stack || {};
  const deployment = detectData.deployment || {};
  const issues = validateData.issues || [];

  const lines = [];
  lines.push('# Webuild Site Report');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Project: ${detectData.project?.name || config?.project?.name || path.basename(cwd)}`);
  lines.push('');
  lines.push('## Executive Summary');
  lines.push('');
  lines.push(`- Production readiness score: **${score.total}/100**`);
  lines.push(`- Risk level: **${score.riskLevel}**`);
  lines.push(`- Recommended hosting mode: **${runtime.hostingModeRecommendation || 'unknown'}**`);
  lines.push(`- Config hosting mode: **${config?.classification?.hostingMode || 'missing'}**`);
  lines.push(`- Validator status: **${validateData.valid ? 'valid' : 'not valid'}**`);
  lines.push('');
  lines.push('## Score Breakdown');
  lines.push('');
  for (const [name, value] of Object.entries(score.scores)) {
    lines.push(`- ${name}: ${value}/20`);
  }
  lines.push('');
  lines.push('## Detected Stack');
  lines.push('');
  lines.push(`- Framework: ${stack.framework || 'unknown'}`);
  lines.push(`- Router: ${stack.router || 'unknown'}`);
  lines.push(`- Package manager: ${stack.packageManager || 'unknown'}`);
  lines.push(`- Static export: ${Boolean(stack.hasStaticExport)}`);
  lines.push(`- Dockerfile: ${Boolean(stack.hasDockerfile)}`);
  lines.push(`- Compose file: ${Boolean(stack.hasCompose)}`);
  lines.push('');
  lines.push('## Runtime Signals');
  lines.push('');
  const runtimeKeys = [
    'hasApiRoutes',
    'hasMiddleware',
    'usesDatabase',
    'usesAuth',
    'usesPayments',
    'usesUploads',
    'usesBackgroundJobs',
    'usesRuntimeEnvVars'
  ];
  for (const key of runtimeKeys) lines.push(`- ${key}: ${Boolean(runtime[key])}`);
  lines.push(`- Runtime env vars: ${(runtime.runtimeEnvVars || []).join(', ') || 'none'}`);
  lines.push('');
  lines.push('## Deployment Compatibility');
  lines.push('');
  lines.push(`- Vercel compatible: ${deployment.vercel?.compatible ?? 'unknown'}`);
  for (const note of deployment.vercel?.notes || []) lines.push(`  - ${note}`);
  lines.push(`- VPS/Coolify compatible: ${deployment.vpsCoolify?.compatible ?? 'unknown'}`);
  lines.push(`- VPS/Coolify strategy: ${deployment.vpsCoolify?.strategy || 'unknown'}`);
  for (const note of deployment.vpsCoolify?.notes || []) lines.push(`  - ${note}`);
  lines.push('');
  lines.push('## Config Validation');
  lines.push('');
  if (issues.length === 0) {
    lines.push('- No validation issues found.');
  } else {
    for (const item of issues) lines.push(`- ${item.level.toUpperCase()}: ${item.path ? `${item.path}: ` : ''}${item.message}`);
  }
  lines.push('');
  lines.push('## Recommended Next Steps');
  lines.push('');
  const nextSteps = new Set(detectData.nextSteps || []);
  if (!validateData.valid) nextSteps.add('Fix validation errors before deployment.');
  if (score.total < 85) nextSteps.add('Run the relevant Webuild preflight checklist before marking production-ready.');
  if ((runtime.hostingModeRecommendation || '') !== (config?.classification?.hostingMode || '') && config?.classification?.hostingMode !== 'none') {
    nextSteps.add('Align webuild.config.json hostingMode with detector output or document the intentional override.');
  }
  for (const step of nextSteps) lines.push(`- ${step}`);
  lines.push('');

  return lines.join('\n');
}

function printHelp() {
  console.log(`Webuild CLI\n\nUsage:\n  node scripts/webuild.mjs detect\n  node scripts/webuild.mjs validate\n  node scripts/webuild.mjs report [--write]\n  node scripts/webuild.mjs doctor\n\nCommands:\n  detect    Run project detector and print JSON\n  validate  Validate webuild.config.json\n  report    Generate a production-readiness report\n  doctor    Run detect + validate + report summary\n`);
}

if (command === 'detect') {
  const result = runNodeJson(detectorPath);
  console.log(result.raw.trim());
  process.exit(result.ok ? 0 : 1);
}

if (command === 'validate') {
  const result = runNodeJson(validatorPath);
  console.log(result.raw.trim());
  process.exit(result.ok ? 0 : 1);
}

if (command === 'report' || command === 'doctor') {
  const report = renderReport();
  if (shouldWrite) {
    const outputPath = path.join(cwd, 'webuild-report.md');
    fs.writeFileSync(outputPath, report);
    console.log(`Report written to ${outputPath}`);
  } else {
    console.log(report);
  }
  process.exit(0);
}

printHelp();
