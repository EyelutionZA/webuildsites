# Maintenance Guide

## Purpose

This document explains how to keep a Webuild-managed website healthy after launch.

The goal is not just uptime. The goal is to make sure the site keeps working as a business asset.

## Monthly Website Checks

- [ ] Website loads correctly
- [ ] SSL is valid
- [ ] Domain resolves correctly
- [ ] Main forms work
- [ ] Form leads reach the correct destination
- [ ] Analytics is tracking
- [ ] Main CTAs work
- [ ] Mobile layout is checked
- [ ] No obvious broken links
- [ ] Sitemap is accessible
- [ ] Robots file is accessible
- [ ] Backups are running
- [ ] Uptime monitoring is active
- [ ] Dependencies reviewed where relevant

## Dynamic Website Checks

For dynamic websites, also check:

- [ ] API routes respond correctly
- [ ] Server logs show no recurring errors
- [ ] Required environment variables are present
- [ ] Webhooks work
- [ ] Integrations work
- [ ] CMS preview works if used

## Web App Checks

For web apps, also check:

- [ ] Auth works
- [ ] Database connection works
- [ ] Critical workflows work
- [ ] Background jobs run
- [ ] Payment/test transaction flow works if relevant
- [ ] Role permissions are still correct
- [ ] Error logs are reviewed

## Common Edits

For new Webuild-structured projects, content should usually live in:

```txt
/content
```

For existing migrated websites, inspect the structure before editing.

Do not assume all content has been centralised.

## Safe Edit Process

1. Create or use a working branch.
2. Make the smallest safe change.
3. Run/build locally where possible.
4. Check mobile and desktop.
5. Deploy to staging if available.
6. Push to production after approval.
7. Document meaningful changes.

## Emergency Rollback

If a deployment breaks:

1. Identify the last known working deployment or commit.
2. Roll back through the hosting platform or Git.
3. Confirm homepage, forms, and key pages work.
4. Review logs/build output.
5. Document the incident and fix.

## Support Boundary

Not every request is a small maintenance edit.

Small maintenance examples:

- text updates
- image swaps
- contact detail changes
- CTA changes
- adding a testimonial
- fixing a broken link

Project work examples:

- new page templates
- new integrations
- booking systems
- ecommerce
- membership systems
- dashboards
- payment flows
- major redesigns

Project work should be scoped separately.
