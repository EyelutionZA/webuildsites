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
- [ ] labels and error messages are accessible

## Accessibility

- [ ] main navigation works with keyboard
- [ ] visible focus states exist
- [ ] inputs have programmatic labels
- [ ] buttons/links have accessible names
- [ ] colour contrast is readable
- [ ] heading hierarchy is logical
- [ ] meaningful images have useful alt text
- [ ] decorative images are marked appropriately
- [ ] modals/menus do not trap or lose focus
- [ ] hover-only interactions also work on keyboard/touch
- [ ] motion does not block usability

## SEO

- [ ] H1 present on key pages
- [ ] titles/meta descriptions present
- [ ] sitemap present
- [ ] robots present
- [ ] Open Graph present where relevant
- [ ] image alt text checked
- [ ] schema added where relevant

## Tracking

- [ ] analytics configured
- [ ] conversion events documented
- [ ] pixels/tags documented
- [ ] privacy/consent requirements considered where relevant

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
- [ ] security headers considered
- [ ] CSRF risk reviewed for state-changing authenticated routes
- [ ] upload restrictions and storage plan reviewed if uploads exist
- [ ] public endpoints do not leak stack traces

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
5. Accessibility concerns
6. Security concerns
7. Launch checklist remaining
