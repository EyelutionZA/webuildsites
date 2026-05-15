# Webuildsites

Webuildsites is the operating standard for building, migrating, deploying, and maintaining modern AI-assisted websites.

This repository is not just a website repo. It is the foundation for a repeatable website delivery system that supports:

- new AI-built websites
- existing websites already in development
- completed websites that need to be moved into a managed hosting workflow
- static websites, dynamic websites, and web apps
- Claude Code, GitHub, Coolify/Webuild Cloud, and future deployment automation

## Core Idea

AI can generate code quickly. The real risk is fragile code, broken deployments, scattered content, fake forms, missing environment variables, and websites nobody can maintain six months later.

This standard exists to make every website easier to:

- understand
- edit
- deploy
- monitor
- back up
- migrate
- improve

## Quick Start for Claude Code

1. Copy or keep the `.claude/skills/webuild-website-standard/SKILL.md` skill in the project.
2. Keep `AGENTS.md`, `CLAUDE.md`, `webuild.config.json`, `.env.example`, and `/docs` in the root.
3. Ask Claude Code to read `CLAUDE.md`, `AGENTS.md`, and `webuild.config.json` before making changes.
4. Classify the project before building: `static`, `dynamic`, or `app`.
5. Do not force websites to be static if they need interactivity, API routes, CMS preview, integrations, auth, databases, or workflows.

## Recommended Project Modes

| Mode | Use For | Hosting Impact |
|---|---|---|
| Static Website | brochure sites, landing pages, SEO pages, basic external forms | cheapest and simplest |
| Dynamic Website | API routes, server-side forms, CMS preview, integrations, personalized content | needs Node/runtime |
| Web App | auth, dashboards, database, payments, user accounts, workflows | needs full app hosting and stricter ops |

## Important Rule

Build the simplest architecture that supports the required behaviour.

Do not build every website like an app.  
Do not force every website into static HTML.  
Classify first, then build properly.
