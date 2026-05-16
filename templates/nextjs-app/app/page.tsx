import { siteConfig } from '@/content/site';

/*
  Mobile-first, art-directed product landing. STARTING POINT, not a finished
  design — re-derive tokens, copy and layout per brand/ICP.
  See .claude/skills/webuild-website-standard/references/creative-direction.md
*/

export default function HomePage() {
  return (
    <div className="bg-bg text-ink">
      <header
        className="sticky top-0 z-50 border-b backdrop-blur"
        style={{ background: 'color-mix(in oklch, var(--bg) 82%, transparent)' }}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#top" className="font-display text-step-1 font-semibold tracking-tight">
            {siteConfig.name}
          </a>
          <nav className="hidden items-center gap-8 text-step--1 font-medium text-ink-muted md:flex">
            {siteConfig.nav.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors duration-150 hover:text-ink">
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="/dashboard"
            className="press inline-flex min-h-11 items-center rounded-sm bg-ink px-5 text-step--1 font-semibold text-bg transition-transform duration-200 ease-out hover:-translate-y-0.5"
          >
            {siteConfig.cta.primary}
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="grain relative overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-[var(--space-section)] pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <div className="relative z-10">
              <p className="flex items-center gap-3 text-step--1 font-semibold uppercase tracking-[0.18em] text-ink-muted">
                <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                {siteConfig.tagline}
              </p>
              <h1 className="mt-6 text-step-5 font-semibold">
                A platform built to be{' '}
                <em className="font-display text-brand [font-style:italic]">trusted</em>.
              </h1>
              <p className="mt-6 max-w-prose text-step-1 text-ink-muted">{siteConfig.description}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <a
                  href="/dashboard"
                  className="press inline-flex min-h-12 items-center justify-center rounded bg-accent px-7 text-step-0 font-semibold text-accent-ink shadow transition-transform duration-200 ease-out hover:-translate-y-0.5"
                >
                  {siteConfig.cta.primary}
                </a>
                <a
                  href="/api/health"
                  className="inline-flex min-h-12 items-center gap-2 px-1 text-step-0 font-medium underline decoration-accent decoration-2 underline-offset-[6px] transition-colors duration-150 hover:text-brand"
                >
                  {siteConfig.cta.secondary}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <aside className="reveal relative z-10 rounded-lg border bg-surface p-7 shadow lg:mb-4">
              <p className="text-step--1 font-semibold uppercase tracking-[0.16em] text-ink-muted">Production-conscious</p>
              <p className="mt-4 font-display text-step-2">
                Auth, data, payments and health checks reviewed before launch — not after.
              </p>
            </aside>
          </div>
        </section>

        {/* Product — numbered editorial list */}
        <section id="product" className="border-t bg-surface">
          <div className="mx-auto w-full max-w-6xl px-5 py-[var(--space-section)] sm:px-8">
            <h2 className="max-w-prose text-step-3 font-semibold">What ships before production.</h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-lg border bg-border">
              {siteConfig.highlights.map((item) => (
                <article
                  key={item.index}
                  className="reveal grid gap-4 bg-surface p-7 sm:grid-cols-[auto_1fr] sm:gap-10 sm:p-10"
                >
                  <span className="font-display text-step-4 leading-none text-border" aria-hidden="true">
                    {item.index}
                  </span>
                  <div>
                    <h3 className="text-step-2 font-semibold">{item.title}</h3>
                    <p className="mt-3 max-w-prose text-ink-muted">{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Closing call to action */}
        <section className="grain relative overflow-hidden bg-brand text-brand-ink">
          <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-[var(--space-section)] sm:px-8">
            <h2 className="max-w-[18ch] text-step-4 font-semibold">Ready when you are.</h2>
            <p className="mt-5 max-w-prose text-step-1 opacity-80">
              Open the dashboard, then wire in auth, data and payments before going live.
            </p>
            <a
              href="/dashboard"
              className="press mt-9 inline-flex min-h-12 items-center justify-center rounded bg-accent px-7 text-step-0 font-semibold text-accent-ink transition-transform duration-200 ease-out hover:-translate-y-0.5"
            >
              {siteConfig.cta.primary}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-10 text-step--1 text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="font-display text-step-0 font-semibold text-ink">{siteConfig.name}</span>
          <span>{siteConfig.contact.email}</span>
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </span>
        </div>
      </footer>
    </div>
  );
}
