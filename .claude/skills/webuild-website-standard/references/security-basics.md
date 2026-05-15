# Security Basics Reference

## Principle

Do not make AI-built websites easy to break, spam, or leak secrets.

## Baseline Checks

- no secrets committed
- `.env.example` documents required variables without values
- forms validate input
- public endpoints avoid leaking stack traces
- dependencies reviewed for obvious risk
- uploads restricted if present
- auth/payment/database logic reviewed if present

## Secrets

Never commit:

- API keys
- SMTP passwords
- database URLs
- auth secrets
- payment secrets
- webhook secrets
- private tokens

## Forms

For public forms:

- validate required fields
- reject obvious spam
- add rate limiting/spam protection where practical
- do not expose private webhook URLs in client-side code

## Apps

If the project has auth, database, payments, private files, or dashboards, treat it as an app and require stricter review.

## Stop Conditions

Stop and report if:

- secrets are found in code
- payment/auth/database logic is unclear
- private data is handled without documented protection
- uploads write to local disk without storage/backup plan
