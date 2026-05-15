# 00 — Webuild Project Triage

Use this before building, auditing, migrating, or deploying any website.

## Goal

Determine what the project is, what it needs, what must not break, and where it can safely be deployed.

## Step 1: Identify Project Type

Inspect:

- `package.json`
- framework config files
- route folders
- API folders
- middleware/proxy files
- database/auth/payment libraries
- env usage
- deployment files

Classify as:

- `static`
- `dynamic`
- `app`

## Step 2: Detect Runtime Needs

Check whether the project uses:

- API routes / route handlers
- server actions
- middleware/proxy
- server-side rendering
- draft/preview mode
- auth/session logic
- database access
- file uploads
- background jobs/queues
- payment providers
- server-only secrets

## Step 3: Detect Deployment Target

Determine the target:

- Vercel
- custom VPS
- Coolify/Webuild Cloud
- unknown

If unknown, produce a compatibility report instead of assuming.

## Step 4: Identify Critical Business Behaviour

Find and protect:

- lead forms
- quote forms
- booking flows
- checkout/payment flows
- login/auth flows
- CRM/webhook integrations
- analytics/tracking
- SEO-critical pages
- high-traffic landing pages

## Step 5: Inspect Environment Variables

Look for:

- `process.env.*`
- `.env.example`
- env documentation
- secret-like strings accidentally hardcoded

Update `.env.example` if variables are missing.

## Step 6: Decide Next Action

Use this decision:

- New build → `01-new-build.md`
- Existing site audit → `02-existing-site-audit.md`
- Migration → `03-migration.md`
- Vercel deploy → `04-vercel-preflight.md`
- VPS/Coolify deploy → `05-vps-coolify-preflight.md`
- Production launch → `06-production-readiness.md`
- Handover → `07-handover.md`

## Output Required

Report:

1. Classification: `static`, `dynamic`, or `app`
2. Deployment target
3. Runtime requirements
4. Critical flows that must not break
5. Missing env vars/docs
6. Biggest risk
7. Recommended next checklist
