# Forms and Leads Reference

## Principle

A website is not production-ready if the form is fake, untested, or has an unknown destination.

## Required Form Details

Document every form:

- form name
- page/location
- fields
- required fields
- validation
- destination
- success state
- error state
- spam protection
- duplicate-submit prevention
- env vars

## Common Destinations

- external webhook
- CRM endpoint
- API route
- email service
- third-party form provider
- booking tool

## Red Flags

- console-only submit handler
- fake success message
- no error state
- no destination known
- hardcoded webhook in component
- no spam protection plan
- no lead routing documentation

## Webuild Rule

If the form destination is unknown, stop and report before changing or replacing form logic.
