# 05 — VPS / Coolify Preflight Checklist

Use this before deploying or preparing a website for a custom VPS, Coolify, or Webuild Cloud.

## VPS/Coolify Fit

VPS/Coolify is a good target when:

- Webuild manages hosting
- cost control matters at scale
- runtime control is needed
- Docker/Node deployment is acceptable
- persistent volumes may be needed
- multiple services may run together

## Required Runtime Information

Document:

- [ ] Node version
- [ ] package manager
- [ ] install command
- [ ] build command
- [ ] start command
- [ ] port
- [ ] health check path
- [ ] environment variables

## Deployment Strategy

Choose one:

- [ ] Static site deployment
- [ ] Node/Nixpacks/buildpack deployment
- [ ] Dockerfile deployment
- [ ] Docker Compose deployment

Do not add Docker unless it solves a real deployment problem.

## Persistent Data

Check whether the app needs:

- uploads
- local files
- SQLite
- cache folders
- generated assets
- database volumes

If yes, document:

- volume path
- backup strategy
- restore strategy

## Services

Document external or local services:

- database
- Redis/queue
- object storage
- SMTP/email
- CMS
- payment provider
- CRM/webhook

## Reverse Proxy / SSL

Confirm:

- domain
- staging domain if used
- SSL handled by Coolify/proxy
- redirects
- www/non-www choice

## VPS/Coolify Output Required

Report:

1. VPS/Coolify compatible: yes/no/conditional
2. Deployment strategy
3. Build/start commands
4. Port
5. Health check path
6. Required env vars
7. Persistent storage needs
8. Backup needs
9. Vercel portability notes
