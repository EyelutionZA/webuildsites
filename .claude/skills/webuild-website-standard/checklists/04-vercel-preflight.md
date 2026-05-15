# 04 — Vercel Preflight Checklist

Use this before deploying or preparing a site for Vercel.

## Vercel Fit

Vercel is a good target when:

- the project uses standard Next.js conventions
- runtime features fit serverless/platform constraints
- env vars can be managed in Vercel
- persistent local disk is not required
- background jobs/storage/databases are externalised

## Check Framework

- [ ] Next.js version known
- [ ] App Router or Pages Router identified
- [ ] build command known
- [ ] output directory known if custom
- [ ] no custom server required unless intentionally unsupported by default Vercel flow

## Check Runtime Features

Document usage of:

- [ ] route handlers / API routes
- [ ] server actions
- [ ] middleware/proxy
- [ ] SSR/ISR/static generation
- [ ] image optimization
- [ ] external database
- [ ] external storage
- [ ] external queues/cron

## Check Env Vars

- [ ] all `process.env.*` variables documented in `.env.example`
- [ ] production env vars listed
- [ ] preview env vars listed if different
- [ ] no secrets committed

## Avoid On Vercel Unless Externalised

- persistent local uploads
- long-running workers
- process managers
- cron that depends on server process staying alive
- local SQLite as production DB
- Docker-only deployment assumptions

## Vercel Output Required

Report:

1. Vercel compatible: yes/no/conditional
2. Build command
3. Required env vars
4. Serverless/runtime features used
5. External services required
6. Portability notes for VPS/Coolify
