# Deployment Guide

## Purpose

This document explains how the project should be deployed and what infrastructure it requires.

Every Webuild-managed website must declare whether it is:

- `static`
- `dynamic`
- `app`

This matters because not every modern website should be forced into static hosting. Interactive websites, API routes, CMS previews, integrations, auth, databases, and dashboards may require a Node/Docker runtime.

## Current Hosting Mode

Check `webuild.config.json`:

```json
{
  "classification": {
    "hostingMode": "dynamic"
  }
}
```

Update this per project.

## Standard Commands

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Start production server when dynamic/app hosting is required:

```bash
npm run start
```

## Deployment Targets

Preferred deployment target:

- Webuild Cloud
- Coolify-compatible VPS/server
- Git-based deployment

## Static Websites

Static websites may be deployed to static hosting if they do not use runtime-only features.

Before classifying as static, confirm the project does not require:

- API routes
- server-side form handling
- middleware
- auth
- database
- dynamic server rendering
- background jobs

## Dynamic Websites

Dynamic websites require a runtime such as Node/Docker.

Use this when the website needs:

- API routes
- server-side forms
- CMS preview
- webhooks
- integrations
- personalized content
- dynamic redirects/middleware

## Web Apps

Web apps require stricter deployment planning.

Document:

- database provider
- auth provider
- background jobs
- storage provider
- payment provider
- backup strategy
- monitoring strategy

## Environment Variables

Required variables must be documented in `.env.example` and added to the hosting environment.

Common variables:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`
- `FORM_WEBHOOK_URL`
- `DATABASE_URL`
- `AUTH_SECRET`
- `CMS_API_KEY`

## Pre-Launch Checklist

- [ ] Hosting mode confirmed in `webuild.config.json`
- [ ] Build command confirmed
- [ ] Start command confirmed if dynamic/app
- [ ] Environment variables added
- [ ] Domain connected
- [ ] SSL active
- [ ] Forms tested
- [ ] Analytics tested
- [ ] Sitemap checked
- [ ] Robots checked
- [ ] Mobile layout checked
- [ ] Main CTA tested
- [ ] Backups configured
- [ ] Uptime monitoring configured
- [ ] Rollback process understood
