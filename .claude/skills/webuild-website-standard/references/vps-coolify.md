# VPS / Coolify Reference

## Best Fit

VPS/Coolify is best when:

- Webuild manages hosting
- cost control matters at scale
- runtime control is needed
- Node/Docker deployment is acceptable
- persistent volumes may be needed
- multiple services may run together

## Deployment Strategies

Choose the simplest viable strategy:

1. Static deployment
2. Node/Nixpacks/buildpack deployment
3. Dockerfile deployment
4. Docker Compose deployment

Do not use Docker Compose unless multiple services are required.

## Required Runtime Contract

Document:

- Node version
- package manager
- install command
- build command
- start command
- port
- health check path
- env vars
- volumes
- database/storage dependencies

## Persistent Data

If uploads or local storage are needed, define:

- path
- volume
- backup frequency
- restore process

Prefer external object storage for client uploads when possible.

## Health Checks

For static sites, monitor `/` or `/health.html`.

For dynamic/app sites, prefer `/api/health` or another lightweight endpoint.

## Backup Strategy

Back up:

- Git repo
- env var list, not secret values in Git
- database
- uploaded media/storage
- server config if needed

## Vercel Portability Notes

If a project uses VPS-specific assumptions, document what would need to change for Vercel.

Examples:

- local persistent volume → object storage
- worker process → external queue/worker service
- local database → managed external database
