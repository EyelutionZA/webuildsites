# 02 — Existing Website Audit Checklist

Use this when inspecting a website already in development or already completed.

## Audit Rule

Do not rebuild blindly. Do not refactor first. Understand the current system first.

## Inspect These Files/Folders

- `package.json`
- lockfile: `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lockb`
- framework config
- `app/`, `pages/`, `src/`, `routes/`
- `components/`
- `lib/`, `utils/`, `services/`
- `api/` or route handlers
- middleware/proxy files
- `.env.example`
- deployment files
- docs

## Audit Categories

### Framework & Runtime

- framework
- router type
- package manager
- Node version if known
- build command
- start command
- static/dynamic/app classification

### Forms & Leads

- all forms
- where submissions go
- validation
- success/error states
- spam protection
- CRM/webhook/email integrations

### Environment Variables

- variables used
- variables documented
- variables missing from `.env.example`
- secrets accidentally hardcoded

### SEO & Tracking

- metadata
- sitemap
- robots
- schema
- analytics
- pixels
- Open Graph

### Deployment

- current target
- Vercel compatibility
- VPS/Coolify compatibility
- Docker/buildpack requirements
- health check path

### Risk

- fragile areas
- large components
- fake forms
- broken imports
- unused dependencies
- provider lock-in
- unknown runtime dependencies

## Output Required

Produce:

1. Website classification
2. Current stack
3. Deployment compatibility
4. Critical flows
5. Missing env vars
6. SEO/tracking status
7. Form status
8. Main risks
9. Safe migration plan
