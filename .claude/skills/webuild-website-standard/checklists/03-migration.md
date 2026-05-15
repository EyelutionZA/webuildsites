# 03 — Webuild Migration Checklist

Use this when moving an existing website into the Webuild standard.

## Migration Rule

Audit first. Stabilise second. Standardise third. Refactor last.

## Phase 1: Stabilise

- [ ] Create/use a working branch
- [ ] Confirm install command
- [ ] Confirm build command
- [ ] Confirm start command if needed
- [ ] Identify deployment target
- [ ] Identify hosting mode
- [ ] Identify env vars
- [ ] Identify form destinations

## Phase 2: Add Standard Files

Add if missing:

- [ ] `AGENTS.md`
- [ ] `CLAUDE.md`
- [ ] `webuild.config.json`
- [ ] `.env.example`
- [ ] `docs/DEPLOYMENT.md`
- [ ] `docs/MAINTENANCE.md`
- [ ] `docs/HANDOVER.md`

## Phase 3: Document Runtime

Update `webuild.config.json` with:

- project status
- classification
- framework
- package manager
- commands
- runtime needs
- deployment target
- integrations
- maintenance requirements

## Phase 4: Safe Standardisation

Only after build/deployment is understood:

- centralise editable content where safe
- document forms and integrations
- clean obvious duplicates
- remove unused dependencies only after checking usage
- improve SEO basics
- add deployment notes

## Phase 5: Validate

- [ ] install works or blocker documented
- [ ] build works or blocker documented
- [ ] main pages preserved
- [ ] forms preserved
- [ ] routes preserved
- [ ] deployment notes updated

## Stop Conditions

Stop and report if:

- current build fails before changes
- form destination is unknown
- database/auth/payment logic is present and not audited
- requested migration would change routes
- hosting target conflicts with runtime needs
- change would remove existing behaviour

## Output Required

1. What was migrated
2. What was not touched and why
3. Build status
4. Hosting mode
5. Deployment compatibility
6. Risks
7. Next safe step
