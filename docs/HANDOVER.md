# Handover Guide

## Purpose

This document explains what must be known before a Webuild-managed website can be handed over, maintained, or transferred.

## Project Summary

- Client:
- Website:
- Production domain:
- Staging domain:
- Repository:
- Hosting target:
- Hosting mode: static / dynamic / app
- CMS:
- Forms destination:
- Analytics:

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

## Required Access

Document access required for maintenance:

- Git repository access
- hosting dashboard access
- DNS access
- CMS access
- analytics access
- CRM/form destination access
- email provider access if forms send email

Do not store passwords in this repo.

## Environment Variables

Environment variables are documented in `.env.example`.

Production values must be stored in the hosting platform, not committed to Git.

## Website Behaviour

Document important behaviour:

- What forms do
- Where leads go
- What integrations exist
- What pages are dynamic
- What must not be changed without testing
- Any scheduled jobs or background tasks

## Handover Checklist

- [ ] Repository access confirmed
- [ ] Hosting access confirmed
- [ ] Domain/DNS access confirmed
- [ ] Environment variables documented
- [ ] Forms tested
- [ ] Analytics tested
- [ ] CMS access confirmed if used
- [ ] Backup process confirmed
- [ ] Uptime monitoring confirmed
- [ ] Deployment process documented
- [ ] Maintenance process documented
- [ ] Known risks documented

## Known Risks

Add project-specific risks here.

Examples:

- Form depends on third-party webhook
- Site uses API routes and cannot be static hosted
- CMS preview requires secret token
- Database must be backed up separately
- Payment provider requires live keys
