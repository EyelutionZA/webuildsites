# 06 — Production Readiness Checklist

Use this before launch or before marking a website production-ready.

## Build & Runtime

- [ ] install command works or blocker documented
- [ ] build command works or blocker documented
- [ ] start command works for dynamic/app projects
- [ ] hosting mode is correct
- [ ] deployment target is documented
- [ ] env vars are documented

## Forms & Leads

- [ ] all forms are real or marked pending
- [ ] validation works
- [ ] success/error states work
- [ ] destination confirmed
- [ ] spam protection considered
- [ ] duplicate submissions prevented where practical

## SEO

- [ ] H1 present on key pages
- [ ] titles/meta descriptions present
- [ ] sitemap present
- [ ] robots present
- [ ] Open Graph present where relevant
- [ ] image alt text checked
- [ ] local schema added where relevant

## Tracking

- [ ] analytics configured
- [ ] conversion events documented
- [ ] pixels/tags documented
- [ ] privacy/consent requirements considered

## Performance

- [ ] images optimized
- [ ] unnecessary packages avoided
- [ ] heavy scripts reviewed
- [ ] mobile layout checked
- [ ] obvious CLS/layout issues checked

## Security Basics

- [ ] no secrets committed
- [ ] env vars in hosting platform
- [ ] form abuse/spam considered
- [ ] dependencies reviewed
- [ ] auth/payment/database flows reviewed if present

## Operations

- [ ] backups configured
- [ ] uptime monitoring configured
- [ ] health check path or homepage monitor chosen
- [ ] rollback process known
- [ ] handover docs updated

## Output Required

1. Production readiness: pass/fail/conditional
2. Blockers
3. Warnings
4. Hosting compatibility
5. Launch checklist remaining
