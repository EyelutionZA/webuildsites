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

Performance matters, but do not sacrifice required functionality.

Prefer:

- server components where suitable
- minimal client-side JavaScript
- optimized images
- lazy loading
- limited animation libraries
- clean dependency choices

Avoid:

- dependency bloat
- unnecessary client components
- heavy animations everywhere
- giant page files
- unused packages

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

## 18. Definition of Done

A task is complete only when:

- the site still builds or build blockers are clearly reported
- hosting mode is known
- required env vars are documented
- forms are connected or clearly marked
- SEO basics are present
- deployment requirements are clear
- future editing is easier than before
- risks are documented

---

## 19. Final Response Requirements

After making changes, always report:

1. What changed
2. Files created or modified
3. How to run locally
4. How to build
5. Required environment variables
6. Whether the site is static, dynamic, or app-like
7. Any risks, assumptions, or unfinished items
