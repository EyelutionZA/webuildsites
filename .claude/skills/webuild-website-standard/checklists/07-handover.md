# 07 — Handover Checklist

Use this when preparing a website for client handover, internal ops, or ongoing maintenance.

## Ownership

Confirm who owns:

- domain
- DNS account
- hosting/server
- repository
- CMS account
- analytics account
- form/CRM destination
- email/SMTP account
- payment account if relevant

## Access

Document access required for maintenance:

- Git repo
- hosting dashboard
- DNS
- CMS
- analytics
- CRM/form destination
- SMTP/email provider
- payment provider if used

Do not store passwords in Git.

## Operational Details

Document:

- production domain
- staging domain
- hosting mode
- deployment target
- build/start commands
- env vars
- forms and destinations
- integrations
- analytics/tracking
- backup process
- uptime monitoring
- rollback process

## Client Editing

Document where content is edited:

- `/content`
- CMS
- hardcoded components
- admin dashboard
- external service

If content is still hardcoded, state this clearly.

## Handover Output Required

1. Ownership summary
2. Access required
3. Hosting/deployment summary
4. Form/lead flow summary
5. Editing instructions
6. Backup/monitoring status
7. Known risks
8. Next maintenance date
