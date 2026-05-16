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

## Creative & Brand

Run the full creative gate in `checklists/08-creative-review.md`. At minimum:

- [ ] ICP and the six creative axes are recorded
- [ ] no raw framework defaults (Tailwind palette, default blue, system fonts, 3-up clone grid)
- [ ] design tokens (OKLCH colour, fluid type scale, spacing, depth, radius) derived from the ICP
- [ ] a real display typeface; layout uses asymmetry and intentional whitespace
- [ ] motion budget applied; CSS-first; authored easing; reduced-motion designed
- [ ] one intentional signature moment
- [ ] the site does not read as a generic AI/template build

## Mobile-First

- [ ] designed and reviewed on a ~390px canvas first
- [ ] touch targets at least 44px, adequately spaced
- [ ] primary actions reachable in the thumb zone
- [ ] safe-area insets handled; viewport meta uses `viewport-fit=cover`
- [ ] LCP under 2.5s, INP under 200ms, CLS under 0.1 on mobile

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
5. Creative review result and any "looks generic" concerns
6. Mobile-first and Core Web Vitals status
7. Accessibility concerns
8. Security concerns
9. Launch checklist remaining
