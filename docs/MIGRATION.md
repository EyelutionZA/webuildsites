# Migration Guide

## Purpose

Use this guide when bringing an existing or completed website into the Webuild Website Operating Standard.

The migration goal is not to rebuild everything. The goal is to make the project easier to understand, deploy, maintain, and improve without breaking what already works.

## Migration Principle

Do not rebuild blindly.

Audit first. Standardise second. Refactor last.

## Step 1: Audit

Identify:

- framework
- package manager
- build command
- start command
- routes/pages
- components
- styling approach
- dependencies
- forms
- integrations
- environment variables
- SEO setup
- sitemap/robots setup
- analytics setup
- deployment target
- hosting mode
- database/auth usage
- known build issues

## Step 2: Classify

Classify the project as:

- static
- dynamic
- app

Use `webuild.config.json` to document this.

## Step 3: Add Standard Files

Add these before risky changes:

- `AGENTS.md`
- `CLAUDE.md`
- `webuild.config.json`
- `.env.example`
- `docs/DEPLOYMENT.md`
- `docs/MAINTENANCE.md`
- `docs/HANDOVER.md`

## Step 4: Stabilise Deployment

Before refactoring, confirm:

- the project installs
- the project builds
- env vars are known
- form destinations are known
- runtime requirements are known

## Step 5: Gradual Standardisation

Only after the project is understood:

- centralise frequently edited content where safe
- document forms and integrations
- clean obvious duplicate components
- remove unused dependencies carefully
- improve SEO basics
- improve performance risks
- improve documentation

## Step 6: Avoid Dangerous Refactors

Do not do these unless specifically requested and tested:

- full redesign
- route restructuring
- framework migration
- changing form handling
- changing auth/database/payment logic
- deleting components that appear unused without checking
- converting dynamic sites to static without understanding runtime needs

## Migration Output

After migration, report:

1. What changed
2. What still needs attention
3. Whether the project builds
4. Hosting mode
5. Required environment variables
6. Deployment requirements
7. Risks
8. Recommended next steps
