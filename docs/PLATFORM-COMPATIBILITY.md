# Platform Compatibility Guide

## Purpose

Webuild websites must be deployable to the right environment without guessing.

This guide explains how to keep projects compatible with:

- Vercel
- custom VPS
- Coolify/Webuild Cloud

## Core Rule

Choose the simplest platform that supports the required behaviour.

Do not force a site to be static if it needs runtime behaviour.
Do not force a site onto a VPS if Vercel is the correct target.
Do not use provider-specific features without documenting the impact.

## Compatibility Matrix

| Requirement | Vercel | VPS/Coolify | Static Hosting |
|---|---:|---:|---:|
| Static pages | Yes | Yes | Yes |
| Next.js App Router | Yes | Yes | Limited if static export only |
| API routes / Route Handlers | Yes | Yes | No |
| Server-side form handling | Yes | Yes | No |
| CMS preview / draft mode | Yes | Yes | No |
| Middleware/proxy logic | Yes, with platform limits | Yes, depending on implementation | No |
| Auth | Yes, external/session strategy required | Yes, external/session strategy required | No |
| Database | Yes, external DB | Yes, local or external DB | No |
| Background jobs | External service recommended | Possible with worker/process manager | No |
| File uploads | External storage recommended | Volume or external storage required | No |
| Persistent local disk | No/avoid | Yes with volumes/backups | No |
| Docker | Not normal path | Yes | No |

## Vercel Deployment Rules

Use Vercel when:

- the project is a standard Next.js site
- serverless/runtime features are acceptable
- env vars are managed in Vercel
- no persistent local disk is required
- background jobs/storage/databases are handled by external services

Document:

- framework preset
- build command
- output directory if custom
- env vars
- preview env vars
- serverless/API usage
- external services

Avoid:

- custom long-running servers
- local file writes for permanent uploads
- undocumented cron/queue needs
- relying on local volumes

## VPS/Coolify Deployment Rules

Use VPS/Coolify when:

- the project needs more runtime control
- the business wants managed hosting under Webuild
- Docker or Node deployment is preferred
- persistent volumes are required
- multiple services may run together
- cost control matters at scale

Document:

- Node version
- package manager
- build command
- start command
- port
- env vars
- database requirements
- storage requirements
- health check path
- backup process

Prefer:

- standard Node deployment for dynamic Next.js
- Dockerfile when dependencies/runtime need strict control
- external object storage for uploaded media
- external/managed DB unless the backup process is clear

## Static Hosting Rules

Use static hosting only when:

- no API routes are required
- no runtime server logic is required
- no auth/database/dashboard behaviour exists
- forms are handled externally
- content can be prebuilt

Do not classify a site as static just to save hosting cost if it breaks required behaviour.

## Provider Lock-In Rules

If using a provider-specific feature, document:

1. What feature is used
2. Why it is needed
3. What happens on Vercel
4. What happens on VPS/Coolify
5. Migration alternative

Examples:

- Vercel Analytics
- Vercel Blob
- Edge-specific runtime APIs
- Coolify volumes
- local uploads
- platform cron jobs

## Recommended Default

For Webuild's business model:

- marketing websites with runtime needs: `dynamic` on Webuild Cloud/Coolify-compatible VPS
- simple brochure sites: `static` or `dynamic` depending on forms/CMS
- serious apps: `app` with dedicated architecture review

The goal is not to use one runtime for everything.
The goal is to use one operating standard across different runtime needs.
