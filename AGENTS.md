# Webuild Website Operating Standard

You are working on a website that must follow the Webuild Website Operating Standard.

This standard exists to make AI-assisted websites production-ready, maintainable, deployable, editable, monitorable, and safe to improve over time.

The goal is not only to make the website look good. The goal is to create a website that can be hosted, edited, monitored, backed up, migrated, and improved without becoming fragile.

---

## 1. Core Principle

Build the simplest architecture that supports the required behaviour.

Do not force every website to be static.
Do not turn every website into a complex app.

Classify the project first:

1. Static Website
2. Dynamic Website
3. Web App

Then build, migrate, or fix the project according to that classification.

---

## 2. Project Classification

### Static Website

Use this when the site needs:

- marketing pages
- landing pages
- brochure content
- SEO pages
- simple animations
- blogs or content that can be prebuilt
- basic forms through an external form service or webhook

Avoid server-only features when the project is classified as static.

### Dynamic Website

Use this when the site needs:

- API routes
- server-side form handling
- CMS preview
- webhooks
- third-party integrations
- dynamic content
- personalized content
- server-side redirects or middleware

Document why dynamic behaviour is needed.

### Web App

Use this when the project needs:

- authentication
- user accounts
- database
- dashboards
- payments
- role-based access
- background jobs
- private data
- complex workflows

Do not treat web apps like normal marketing websites.

---

## 3. Default Stack

For new Webuild websites, prefer:

- Next.js App Router
- TypeScript
- Tailwind CSS
- React
- Git-based deployment
- environment variables for config
- Coolify/Webuild Cloud compatible deployment

Use extra dependencies only when they clearly reduce risk, improve maintainability, or are required by the brief.

---

## 4. Required Project Files

Every Webuild-managed project should include:

- `AGENTS.md`
- `CLAUDE.md`
- `webuild.config.json`
- `.env.example`
- `docs/DEPLOYMENT.md`
- `docs/MAINTENANCE.md`
- `docs/HANDOVER.md`

For existing websites, add these files before doing risky refactors.

---

## 5. Recommended Structure for New Projects

Use this structure unless there is a strong reason not to:

- `/app` for routes, layouts, metadata, sitemap, robots, and API routes
- `/components/layout` for header, footer, navigation
- `/components/sections` for page sections
- `/components/ui` for reusable UI components
- `/components/forms` for forms
- `/content` for editable business content
- `/lib` for utilities, analytics, form helpers, API clients, constants
- `/public` for images, icons, logos, static files
- `/docs` for project documentation

Do not create random folders unless there is a clear architectural reason.

---

## 6. Existing Website Rule

If the project already exists, do not rebuild blindly.

First audit:

- framework
- package manager
- routes
- components
- dependencies
- forms
- environment variables
- SEO
- deployment method
- hosting mode
- build command
- risks

Then migrate gradually.

Preserve working design and routes unless asked to change them.

---

## 7. Content Rule

Content that may change later should be centralised where practical.

Examples:

- business name
- services
- contact details
- navigation
- FAQs
- testimonials
- CTAs
- SEO titles
- SEO descriptions
- social links
- footer details

For new projects, use `/content` where practical.

For existing projects, do not move everything at once if it risks breaking the site.

---

## 8. Interactivity Rule

Interactive websites are allowed.

Every interactive feature must have a reason.

Before adding interactivity, decide whether it needs:

- client-side state
- server-side processing
- API routes
- database
- third-party service
- authentication

Avoid fake interactivity that looks good but does nothing.

---

## 9. Forms Rule

Forms must be real, reliable, or clearly marked as pending.

Every production form should have:

- validation
- success state
- error state
- spam protection strategy
- duplicate-submit prevention
- destination documented
- environment variables documented

Forms may use:

- webhook
- API route
- CRM endpoint
- email service
- third-party form service

Never hide a fake form inside a production-ready site.

---

## 10. SEO Rule

Every production website must include:

- metadata
- clear H1 per page
- semantic structure
- image alt text
- sitemap
- robots
- Open Graph metadata where relevant
- local business schema where relevant

Every important page needs:

- page purpose
- target search intent
- meta title
- meta description
- CTA

---

## 11. Performance Rule

Performance matters, but do not sacrifice required functionality — or required craft.

Prefer:

- server components where suitable
- minimal client-side JavaScript
- optimized, responsive images (AVIF/WebP, explicit dimensions)
- lazy loading below the fold
- CSS-first motion; a JavaScript motion library only when an interaction genuinely needs it
- clean dependency choices

Avoid:

- dependency bloat
- unnecessary client components
- animation that regresses Core Web Vitals or animates layout properties
- giant page files
- unused packages

Performance and motion are not in conflict. Purposeful, CSS-first, transform/opacity-only motion costs almost nothing. See the skill references `motion-and-interaction.md` and `mobile-first.md`.

---

## 12. Environment Variable Rule

Never hardcode secrets.

Every required environment variable must be added to `.env.example`.

Common examples:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`
- `FORM_WEBHOOK_URL`
- `SMTP_HOST`
- `SMTP_USER`
- `SMTP_PASS`
- `CMS_API_KEY`
- `DATABASE_URL`
- `AUTH_SECRET`
- `PAYMENT_SECRET_KEY`

---

## 13. Hosting Mode Rule

Every project must declare its hosting mode in `webuild.config.json`.

Allowed modes:

- `static`
- `dynamic`
- `app`

Static projects should avoid API routes.

Dynamic and app projects must document server requirements.

---

## 14. Deployment Rule

The project must remain deployable.

Before finishing:

- identify build command
- identify start command if dynamic/app
- check environment variables
- update deployment docs
- note whether it can run on static hosting or needs Node/Docker
- note any database or service dependencies

---

## 15. Webuild Config Rule

Every project needs `webuild.config.json`.

It should document:

- project type
- hosting mode
- build command
- start command
- package manager
- required environment variables
- forms destination
- analytics
- CMS
- database
- backup needs
- monitoring needs

---

## 16. Documentation Rule

Keep documentation short but useful.

Another developer or AI agent should understand the project in 15 minutes.

Required docs:

- Deployment
- Maintenance
- Handover
- Migration for existing projects

---

## 17. Safety Rule

Do not break working sites.

For existing or completed websites:

- make a branch before migration
- audit before changing
- avoid large risky refactors
- preserve routes
- preserve visual output
- test build before and after
- document what changed

---

## 18. Creative Direction

A Webuild site must look bespoke and brand-specific. A visitor must not be able to tell it was AI-built. The benchmark is a custom studio build, not a framework demo.

### Anti-Generic Rule

Every visual default must be a deliberate, documented decision — never a framework default left untouched. The following are not acceptable in production:

- raw default Tailwind palette, or a default (~250 degree) blue accent
- pure white background with near-black text; hue-neutral greys
- system fonts only, or one font for headings and body with no display face
- everything centred; the repeated 3-up icon-card grid as the only pattern
- emoji icons; default grey-blur shadows; no radius system
- zero motion, or one indiscriminate global fade
- vague filler copy; undesigned empty, loading, and error states

### ICP-First

Before building or restyling, record the Ideal Customer Profile and set the six creative axes — information density, motion intensity, colour temperature/chroma, type voice, imagery, radius posture. Design tokens (colour in OKLCH, a fluid `clamp()` type scale, spacing, depth, radius) are derived from those axes, not from framework defaults.

### Mobile-First

Design and build for the smallest screen first, then enhance upward. Touch targets at least 44px. Primary actions in the thumb zone. Honour safe-area insets. Core Web Vitals are launch gates: LCP under 2.5s, INP under 200ms, CLS under 0.1 on mobile.

### Motion

Motion is a craft requirement with a budget. CSS-first; a motion library only when justified; `static` projects ship no motion JavaScript. Authored easing, `transform`/`opacity` only, `prefers-reduced-motion` as a designed calm fallback.

### Creative Review

Every site has one intentional signature moment. Run the creative review before launch. Creative quality is a launch gate equal to SEO, accessibility, and security.

Deep guidance lives in the skill: `references/creative-direction.md`, `icp-and-positioning.md`, `brand-and-art-direction.md`, `motion-and-interaction.md`, `mobile-first.md`, and `checklists/08-creative-review.md`.

---

## 19. Definition of Done

A task is complete only when:

- the site still builds or build blockers are clearly reported
- hosting mode is known
- required env vars are documented
- forms are connected or clearly marked
- SEO basics are present
- deployment requirements are clear
- design tokens are derived from the ICP, not left as framework defaults
- the site is mobile-first and meets the Core Web Vitals gates
- the creative review passes — the site does not read as a generic AI build
- future editing is easier than before
- risks are documented

---

## 20. Final Response Requirements

After making changes, always report:

1. What changed
2. Files created or modified
3. How to run locally
4. How to build
5. Required environment variables
6. Whether the site is static, dynamic, or app-like
7. Creative direction summary: ICP, design tokens, motion approach, mobile-first/Core Web Vitals status
8. Any risks, assumptions, or unfinished items
