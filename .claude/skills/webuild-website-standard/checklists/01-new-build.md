# 01 — New Website Build Checklist

Use this when creating a new website under the Webuild standard.

## Build Principle

Start simple, but do not remove needed interactivity.

Choose the architecture based on behaviour, not ideology.

## Required Decisions Before Coding

Define:

- business goal
- target audience
- primary conversion
- secondary conversion
- required pages
- required forms
- required integrations
- required CMS/editing layer
- deployment target
- hosting mode: `static`, `dynamic`, or `app`

## Recommended Structure

Use this structure unless the project has a strong reason not to:

```txt
app/
components/
  layout/
  sections/
  ui/
  forms/
content/
lib/
public/
docs/
```

## Content Rules

Put frequently edited content in `/content` where practical:

- business info
- navigation
- services/products
- FAQs
- testimonials
- CTAs
- SEO details
- social links

## Form Rules

Every form must be either connected or clearly marked pending.

Document:

- fields
- destination
- validation
- success/error states
- spam protection
- required env vars

## Deployment Rules

If Vercel:

- use standard Next.js conventions
- avoid custom server assumptions
- document env vars and serverless/runtime features

If VPS/Coolify:

- ensure build/start commands are clear
- document Node version, port, health path, env vars
- add Dockerfile only if needed

## Definition of Done

- [ ] Pages created
- [ ] Components reusable
- [ ] Content centralised where practical
- [ ] Forms connected or marked pending
- [ ] SEO basics present
- [ ] Build command known
- [ ] Hosting mode documented
- [ ] Vercel compatibility documented
- [ ] VPS/Coolify compatibility documented
- [ ] `.env.example` updated
- [ ] `/docs` updated
