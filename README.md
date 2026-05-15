# Webuildsites

Webuildsites is the operating standard for building, migrating, deploying, and maintaining modern AI-assisted websites.

This repository is a standards, skill, tooling, and template repository. It is not itself a deployable client website.

It provides:

- a Claude Code skill for Webuild website work
- project checklists and references
- detector and validator scripts
- a canonical `webuild.config.json` schema
- starter templates for future website builds
- documentation for Vercel and VPS/Coolify compatibility

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

Install/copy the **whole skill folder**, not only `SKILL.md`:

```txt
.claude/skills/webuild-website-standard/
```

`SKILL.md` depends on the included `checklists/`, `references/`, `templates/`, and `scripts/` folders.

For a Webuild-managed project, keep these files in the project root:

```txt
AGENTS.md
CLAUDE.md
webuild.config.json
.env.example
docs/
.claude/skills/webuild-website-standard/
```

Then ask Claude Code to read:

```txt
CLAUDE.md
AGENTS.md
webuild.config.json
.claude/skills/webuild-website-standard/SKILL.md
```

## Recommended Project Modes

| Mode | Use For | Hosting Impact |
|---|---|---|
| `none` | standards/tooling repos, not deployable websites | no hosting target |
| `static` | brochure sites, landing pages, SEO pages, basic external forms | cheapest and simplest |
| `dynamic` | API routes, server-side forms, CMS preview, integrations, personalized content | needs runtime |
| `app` | auth, dashboards, database, payments, user accounts, workflows | needs full app hosting and stricter ops |

## Commands

Run the detector:

```bash
npm run detect
```

Validate the config:

```bash
npm run validate:config
```

Run tests:

```bash
npm test
```

Run all checks:

```bash
npm run check
```

## Important Rule

Build the simplest architecture that supports the required behaviour.

Do not build every website like an app.  
Do not force every website into static HTML.  
Classify first, then build properly.
