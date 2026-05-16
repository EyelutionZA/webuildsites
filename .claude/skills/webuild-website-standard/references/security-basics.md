# Security Basics Reference

## Principle

Do not make AI-built websites easy to break, spam, or leak secrets.

Security depth depends on project type:

- `static` sites need basic hardening, dependency hygiene, safe forms, and secure headers where possible.
- `dynamic` sites need input validation, abuse protection, server-side secret protection, and endpoint review.
- `app` projects need a stricter security review for auth, database, payments, private files, and permissions.

## Baseline Checks

- no secrets committed
- `.env.example` documents required variables without values
- forms validate input
- public endpoints avoid leaking stack traces
- dependencies reviewed for obvious risk
- uploads restricted if present
- auth/payment/database logic reviewed if present
- security headers considered
- CSRF risk considered for state-changing routes
- dependency alerting/auditing considered

## Secrets

Never commit:

- API keys
- SMTP passwords
- database URLs
- auth secrets
- payment secrets
- webhook secrets
- private tokens

Store secrets in the hosting provider or secret manager.

## Security Headers

Where practical, configure:

- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy`
- `X-Frame-Options` or CSP `frame-ancestors`

Do not blindly add an aggressive CSP that breaks analytics, maps, fonts, payment providers, or embedded tools. Start with a report/review mindset, then tighten.

## Forms and Public Endpoints

For public forms:

- validate required fields server-side where applicable
- reject obvious spam
- add rate limiting/spam protection where practical
- do not expose private webhook URLs in client-side code
- never return raw stack traces to users
- log enough to debug without logging secrets or unnecessary personal data

## CSRF and State-Changing Actions

If a project uses cookies/session auth and has state-changing routes, review CSRF risk.

Examples:

- account updates
- contact preference updates
- payment actions
- admin actions
- dashboard mutations

Mitigations may include:

- CSRF tokens
- same-site cookies
- origin/referer checks
- using server-side auth libraries correctly
- avoiding unsafe GET mutations

## Dependencies

For production projects:

- run dependency checks where practical
- enable dependency alerts where repository hosting supports them
- avoid abandoned packages for critical paths
- avoid unnecessary dependencies
- review packages that run postinstall scripts

## Uploads and Files

If uploads exist:

- restrict file types
- restrict file size
- avoid executing uploaded files
- store outside the web root or use object storage
- scan/validate when risk justifies it
- define backup and deletion behaviour

## Apps

If the project has auth, database, payments, private files, or dashboards, treat it as an app and require stricter review.

App review should include:

- auth/session configuration
- role/permission checks
- database access rules
- payment webhook verification
- private data exposure risks
- backups and restore process
- logging and error monitoring

## Stop Conditions

Stop and report if:

- secrets are found in code
- payment/auth/database logic is unclear
- private data is handled without documented protection
- uploads write to local disk without storage/backup plan
- state-changing authenticated routes exist without clear CSRF/session strategy
- a security header change may break production integrations
