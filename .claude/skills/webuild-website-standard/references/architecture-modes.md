# Architecture Modes Reference

## Purpose

This reference helps decide whether a website should be treated as `static`, `dynamic`, or `app`.

## Static

Use when the website can be generated ahead of time and served as files.

Good for:

- brochure websites
- landing pages
- service pages
- portfolio sites
- simple blogs
- campaign pages

Avoid if the site needs:

- API routes
- auth
- database
- server-side form handling
- middleware-dependent behaviour
- runtime personalization

## Dynamic

Use when the website is still mostly marketing/content, but needs runtime behaviour.

Good for:

- API forms
- CMS preview
- webhook handling
- quote calculators with server logic
- dynamic content
- integrations
- server redirects/middleware

Dynamic does not automatically mean complex. It means the site needs a runtime.

## App

Use when users log in or the system stores/manipulates private data.

Good for:

- dashboards
- portals
- ecommerce logic beyond simple checkout links
- memberships
- CRMs
- internal tools
- workflow platforms

Apps require stricter review, security, backups, and monitoring.

## Decision Test

Ask:

1. Does the project need a server at request time?
2. Does it store user-specific data?
3. Does it need auth?
4. Does it need a database?
5. Does it use server-only secrets?
6. Does it need persistent storage?
7. Does it need background processing?

If mostly no → static.
If server/runtime yes but no app state → dynamic.
If auth/database/private workflows yes → app.
