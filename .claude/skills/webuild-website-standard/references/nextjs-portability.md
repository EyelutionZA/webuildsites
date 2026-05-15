# Next.js Portability Reference

## Purpose

Keep Next.js projects deployable across Vercel and custom VPS/Coolify where practical.

## Portable Defaults

Prefer:

- standard App Router conventions
- `npm run build`
- `npm run start` for dynamic/app projects
- environment variables for config
- external storage for uploads
- external database for serious production apps
- documented API routes and middleware

## Static Export Notes

Static export can be useful for simple websites, but it is not correct for every project.

Do not static export if the project needs:

- API routes at runtime
- server actions
- middleware/proxy runtime behaviour
- auth/session logic
- server-side form handling
- server-only secrets at request time
- dynamic personalization

## Dynamic Notes

Dynamic Next.js projects should document:

- server-side routes
- runtime requirements
- start command
- port for VPS/Coolify
- env vars
- external services

## Provider-Specific Features

Document portability impact when using:

- edge runtime APIs
- Vercel Blob
- Vercel Analytics
- provider-specific image loaders
- provider-specific cron
- platform-specific middleware constraints

## Safe Rule

A project may be Vercel-first or VPS-first, but it must not hide platform assumptions.
