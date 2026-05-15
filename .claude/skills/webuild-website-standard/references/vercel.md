# Vercel Reference

## Best Fit

Vercel is best when:

- project follows standard Next.js conventions
- serverless/runtime limits are acceptable
- persistent local disk is not needed
- databases/storage/queues are externalised
- preview deployments are useful

## Strong Defaults

- Use normal `next build` flow.
- Do not add Docker for normal Vercel projects.
- Avoid custom servers.
- Store env vars in Vercel settings.
- Keep build settings simple unless there is a specific need.

## Watchouts

Avoid relying on:

- persistent local files
- long-running background workers
- local SQLite in production
- process managers
- custom server assumptions
- local uploads without object storage

## Must Document

- build command
- env vars
- API routes/route handlers
- middleware/proxy
- image optimization assumptions
- external services
- preview/prod env differences

## Portability Notes

If using Vercel-specific services, document what the VPS alternative would be.

Examples:

- Vercel Blob → S3/R2/minio/object storage
- Vercel Analytics → GA4/Plausible/PostHog
- Vercel Cron → Coolify scheduled job/server cron/external scheduler
