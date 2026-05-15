---
name: webuild-website-standard
description: Build, audit, migrate, or prepare AI-assisted websites for production across Vercel and custom VPS/Coolify hosting. Use when creating a new website, fixing a broken AI-built site, classifying static/dynamic/app hosting needs, setting deployment rules, or bringing an existing site into the Webuild managed standard.
when_to_use: Use for Claude Code website builds, existing website audits, Vercel deployment prep, VPS/Coolify deployment prep, migration safety reviews, form/integration setup, SEO/performance hardening, and production readiness checks.
argument-hint: "[new|audit|migrate|deploy] [optional target: vercel|vps|coolify]"
---

# Webuild Website Standard Skill

## Mission

Turn AI-assisted website code into a production-ready digital asset that can be deployed, hosted, monitored, edited, backed up, and safely improved over time.

Optimise for maintainability, deployment safety, conversion, SEO, and future editability — not demo-only visuals.

## Non-Negotiable Principle

Build the simplest architecture that supports the required behaviour.

Do not force every website to be static.
Do not turn every website into an app.
Do not break working sites.

Every project must be classified before major changes:

1. `static` — static marketing website
2. `dynamic` — interactive website with runtime/server needs
3. `app` — full web app with auth, database, accounts, payments, dashboards, or workflows

## Operating Sequence

For every task, follow this order:

1. Read `AGENTS.md`, `CLAUDE.md`, `webuild.config.json`, and relevant `/docs`.
2. Inspect the current codebase before changing files.
3. Classify the project as `static`, `dynamic`, or `app`.
4. Identify deployment target: `vercel`, `vps`, `coolify`, or `unknown`.
5. Identify build command, start command, package manager, env vars, and runtime needs.
6. Make the smallest safe change that achieves the goal.
7. Keep routes, forms, integrations, and design behaviour intact unless explicitly changing them.
8. Update `.env.example`, `webuild.config.json`, and `/docs` when runtime/deployment/integration details change.
9. Run or clearly state the required validation: install, lint/typecheck if available, build.
10. Report risks, assumptions, unfinished items, and deployment compatibility.

## Hosting Classification

### Static Website

Use when the site needs:

- marketing pages
- landing pages
- brochure content
- SEO pages
- simple animations
- content that can be prebuilt
- forms handled by external provider/webhook without local server logic

Requirements:

- no API routes required at runtime
- no auth
- no database
- no middleware-dependent behaviour
- no server-only personalization

Hosting fit:

- Vercel: yes
- VPS/Coolify: yes
- any static server: yes if exported correctly

### Dynamic Website

Use when the site needs:

- API routes
- server-side form handling
- CMS preview/draft mode
- webhooks
- third-party integrations
- dynamic server rendering
- server-side redirects/middleware
- personalization
- scheduled tasks or server-only secrets

Requirements:

- Node.js runtime or compatible serverless runtime
- documented start command or platform runtime
- environment variables stored in hosting platform

Hosting fit:

- Vercel: yes for supported framework/runtime features
- VPS/Coolify: yes via Node server, Docker, or supported build pack
- plain static hosting: no

### Web App

Use when the project needs:

- authentication
- user accounts
- database
- dashboards
- payments
- roles/permissions
- private data
- queues/background jobs
- file uploads/storage
- complex workflows

Requirements:

- stricter architecture review
- database backup strategy
- auth/session strategy
- storage strategy
- logging/error monitoring
- security review
- staging before production

Hosting fit:

- Vercel: yes if external services and runtime limits are suitable
- VPS/Coolify: yes via Docker/Node plus separately managed services
- shared/static hosting: no

## Vercel Compatibility Rules

When target is Vercel:

- Prefer standard Next.js conventions over custom servers.
- Do not require Docker for normal Vercel deployments.
- Keep `package.json` scripts conventional: `dev`, `build`, `start`.
- Use `vercel.json` only when project-level file-based config is needed.
- Do not add VPS-only assumptions such as persistent local disk, long-running background workers, or server process managers.
- Store env vars in Vercel project settings, never in Git.
- Document whether the site uses SSR, ISR, Route Handlers/API routes, middleware/proxy, image optimization, or static export.
- If using long-running tasks, queues, cron, file storage, or databases, document external services clearly.

Vercel-ready projects should answer:

- Framework preset?
- Build command?
- Output directory, if custom?
- Required env vars?
- Does it use serverless/runtime functionality?
- Does it need preview/staging environment variables?

## Custom VPS / Coolify Compatibility Rules

When target is VPS or Coolify:

- Prefer portable Node or Docker deployment.
- Keep `npm run build` and `npm run start` working for dynamic/app projects.
- If Docker is needed, add a `Dockerfile` and document exposed port.
- Do not depend on Vercel-only features unless documented with an alternative.
- Avoid using local disk for permanent uploads unless a volume and backup strategy are defined.
- Document reverse proxy/domain/SSL expectations.
- Document database, storage, queue, and backup requirements.
- Include a health endpoint or health page where practical.

VPS/Coolify-ready projects should answer:

- Build pack or Docker?
- Node version?
- Start command?
- Port?
- Required env vars?
- Persistent storage needed?
- Database needed?
- Backup path/service?
- Health check path?

## Portability Rules

A Webuild website should be portable between Vercel and VPS where practical.

Avoid lock-in unless it is intentional and documented.

Do not use these without noting portability impact:

- Vercel-only environment assumptions
- custom edge/runtime-specific APIs
- local persistent filesystem writes
- provider-specific image loaders
- provider-specific analytics as the only analytics source
- undocumented serverless function constraints
- undocumented cron/queue behaviour

If the project intentionally uses a platform-specific feature, document:

1. why it is used
2. what breaks on the other platform
3. what alternative exists

## Existing Website Migration Rules

If the website already exists:

- Do not rebuild blindly.
- Do not move many files before confirming the build.
- Do not change routes unless requested.
- Do not change form behaviour without identifying where leads go.
- Do not convert dynamic to static just to simplify hosting.
- Do not remove dependencies until usage is checked.

Migration order:

1. Audit structure and runtime.
2. Add standard files if missing.
3. Document env vars and hosting mode.
4. Confirm build command.
5. Fix deployment blockers.
6. Centralise content only where safe.
7. Improve SEO/performance/forms.
8. Refactor last.

## Content & Editing Rules

Content that may change later should be centralised where practical.

For new projects, use `/content` for:

- business details
- navigation
- services
- FAQs
- testimonials
- CTAs
- SEO titles/descriptions
- social links
- footer details

For existing projects, centralise gradually. Do not risk breaking working UI just to satisfy structure.

## Forms & Lead Capture Rules

Forms must be real, reliable, or clearly marked as pending.

Every production form needs:

- validation
- success state
- error state
- duplicate-submit prevention
- spam protection strategy
- documented destination
- required env vars in `.env.example`

Allowed form destinations:

- API route
- external webhook
- CRM endpoint
- email service
- third-party form provider

Never ship fake forms disguised as working forms.

## SEO & Conversion Rules

Every production website must include:

- one clear H1 per page
- semantic HTML
- metadata/title/description
- Open Graph metadata where relevant
- sitemap
- robots
- descriptive image alt text
- local business schema where relevant
- clear CTA on important pages

Every important page should have:

- target audience
- search intent or conversion intent
- primary CTA
- secondary CTA where useful
- trust proof/social proof where relevant

## Performance Rules

Performance matters, but required functionality wins.

Prefer:

- server components where suitable
- minimal client-side JavaScript
- optimized images
- lazy loading for heavy non-critical sections
- limited animation libraries
- clean dependency choices

Avoid:

- dependency bloat
- giant page files
- unnecessary client components
- heavy animations everywhere
- unused packages
- unbounded third-party scripts

## Required Files

Every Webuild-managed project should include:

- `AGENTS.md`
- `CLAUDE.md`
- `webuild.config.json`
- `.env.example`
- `docs/DEPLOYMENT.md`
- `docs/MAINTENANCE.md`
- `docs/HANDOVER.md`

For portability, also add when relevant:

- `vercel.json` for Vercel-specific configuration
- `Dockerfile` for VPS/Coolify Docker deployment
- `docker-compose.yml` only when multiple services are required

## `webuild.config.json` Requirements

Keep this file accurate. It is the future bridge to Webuild CLI/hosting automation.

Must document:

- project name/client/status
- classification: `static`, `dynamic`, or `app`
- deployment target: `vercel`, `vps`, `coolify`, or `webuild-cloud`
- framework/router/language/styling/package manager
- install/dev/build/start commands
- runtime needs: API routes, auth, DB, background jobs, storage
- required env vars
- forms provider
- analytics provider
- CMS/database providers
- monitoring/backups

## Validation Checklist

Before finishing a build/migration/deployment task:

- [ ] Hosting mode is correct
- [ ] Deployment target is documented
- [ ] Build command is known
- [ ] Start command is known when needed
- [ ] Env vars are in `.env.example`
- [ ] Forms are connected or marked pending
- [ ] SEO basics are present
- [ ] Build blockers are fixed or clearly reported
- [ ] Vercel compatibility is documented
- [ ] VPS/Coolify compatibility is documented
- [ ] Risks are documented

## Final Response Format

Always finish with:

1. What changed
2. Files created/modified
3. Hosting mode: `static`, `dynamic`, or `app`
4. Vercel compatibility
5. VPS/Coolify compatibility
6. Required env vars
7. Commands to run
8. Risks/assumptions/unfinished items
