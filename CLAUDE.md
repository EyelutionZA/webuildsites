# CLAUDE.md

Follow the Webuild Website Operating Standard in `AGENTS.md`.

Before making changes:

1. Read `AGENTS.md`.
2. Read `webuild.config.json`.
3. Classify the project as `static`, `dynamic`, or `app`.
4. Inspect the existing structure before changing files.
5. Preserve working routes and behaviour unless the task asks for a rebuild.
6. Keep the project deployable.
7. Update `.env.example` and `/docs` when deployment, forms, integrations, runtime, or environment variables change.

Important correction:

Do not force every website to be static. Interactive and dynamic websites are allowed when the business requirement justifies it. Choose the simplest architecture that supports the required behaviour.
