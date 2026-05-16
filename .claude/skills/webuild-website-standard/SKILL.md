---
name: webuild-website-standard
description: >-
  Build, audit, migrate, or prepare AI-assisted websites for production across
  Vercel and custom VPS/Coolify hosting. Use when creating a new website,
  fixing a broken AI-built site, classifying static/dynamic/app hosting needs,
  setting deployment rules, running production preflight, bringing an existing
  site into the Webuild managed standard, or giving a site bespoke creative
  direction — brand identity, art direction, motion, mobile-first design, and
  making AI-built sites look custom and brand-specific rather than templated.
license: Proprietary
metadata:
  author: Webuildsites
  version: "2.0.0"
  category: web-development
  tags:
    - ai-websites
    - nextjs
    - vercel
    - coolify
    - vps
    - deployment
    - migration
    - production-readiness
---

# Webuild Website Standard

## Mission

Turn AI-assisted website code into a production-ready digital asset that can be deployed, hosted, monitored, edited, backed up, migrated, and safely improved over time.

Optimise for maintainability, deployment safety, conversion, SEO, accessibility, security, and future editability.

Hold an equally high bar for craft. Every Webuild site must look bespoke and brand-specific — art-directed, motion-considered, mobile-first — never a generic AI/template build. Production-ready means it works *and* it looks custom. Creative direction is a first-class requirement, not a finishing touch.

## Non-Negotiable Rule

Build the simplest architecture that supports the required behaviour.

Do not force every website to be static.
Do not turn every website into an app.
Do not break working sites.

Every project must be classified before major changes:

- `static` — marketing/brochure/landing site with no runtime server requirement
- `dynamic` — interactive website with server/runtime needs
- `app` — full web app with auth, database, accounts, payments, dashboards, or workflows

## Operating Sequence

1. Read `AGENTS.md`, `CLAUDE.md`, `webuild.config.json`, and relevant `/docs`.
2. Run or mentally apply `checklists/00-triage.md`.
3. Inspect the current codebase before changing files.
4. Classify the project as `static`, `dynamic`, or `app`.
5. Identify target deployment: `vercel`, `vps`, `coolify`, or `unknown`.
6. For any build or visual change, establish creative direction first: ICP, the six creative axes, and design tokens — see `references/creative-direction.md`.
7. Load the relevant checklist/reference from this skill folder.
8. Make the smallest safe change that achieves the task.
9. Preserve working routes, forms, integrations, and design behaviour unless explicitly changing them.
10. Update `.env.example`, `webuild.config.json`, and `/docs` when runtime/deployment/integration details change.
11. Validate with install/build/typecheck/lint where available, or clearly report what could not be run.
12. Run `checklists/08-creative-review.md` before marking any visual work production-ready.

## Which Supporting File To Use

Use these files instead of trying to keep everything in this main skill:

| Situation | Load |
|---|---|
| First touch / project classification | `checklists/00-triage.md` |
| New website build | `checklists/01-new-build.md` |
| Existing website audit | `checklists/02-existing-site-audit.md` |
| Migration into Webuild standard | `checklists/03-migration.md` |
| Vercel deployment prep | `checklists/04-vercel-preflight.md` + `references/vercel.md` |
| VPS/Coolify deployment prep | `checklists/05-vps-coolify-preflight.md` + `references/vps-coolify.md` |
| Final production readiness | `checklists/06-production-readiness.md` |
| Handover/client ops | `checklists/07-handover.md` |
| Creative review before launch | `checklists/08-creative-review.md` |
| Architecture choice | `references/architecture-modes.md` |
| Next.js portability | `references/nextjs-portability.md` |
| Forms and leads | `references/forms-and-leads.md` |
| Accessibility | `references/accessibility.md` |
| SEO and conversion | `references/seo-standard.md` |
| Security baseline | `references/security-basics.md` |
| Creative direction (hub: making a site look bespoke) | `references/creative-direction.md` |
| ICP and positioning | `references/icp-and-positioning.md` |
| Brand, colour, typography, art direction | `references/brand-and-art-direction.md` |
| Motion and interaction | `references/motion-and-interaction.md` |
| Mobile-first and Core Web Vitals | `references/mobile-first.md` |
| Deployment contract | `templates/deployment-contract.json` |

## Recommended Tooling

When possible, use the included scripts:

```bash
node .claude/skills/webuild-website-standard/scripts/detect-project.mjs
node .claude/skills/webuild-website-standard/scripts/validate-webuild-config.mjs
```

These scripts are advisory. If they cannot run, inspect manually and report the limitation.

## Stop Conditions

Stop and report before making risky changes when:

- the build is already failing before your changes
- the form destination is unknown
- required environment variables cannot be inferred
- auth, database, payments, or private data are involved and not audited
- migration would require route changes
- target hosting conflicts with runtime needs
- a requested change would remove existing functionality
- the project has no backup/branch and the change is destructive

## Final Response Format

Always finish with:

1. What changed
2. Files created/modified
3. Hosting mode: `static`, `dynamic`, or `app`
4. Vercel compatibility
5. VPS/Coolify compatibility
6. Required env vars
7. Commands to run
8. Risks, assumptions, or unfinished items
