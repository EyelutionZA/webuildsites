import { siteConfig } from '@/content/site';

/*
  Mobile-first, art-directed homepage. This is a STARTING POINT, not a
  finished design — re-derive tokens, copy and layout per brand/ICP.
  See .claude/skills/webuild-website-standard/references/creative-direction.md
*/

const promises = ['Mobile-first', 'Motion, considered', 'Built to hand over'];

const work = [
  { name: 'Project one', sector: 'Service brand', year: '2026' },
  { name: 'Project two', sector: 'Local business', year: '2025' }
];

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
            href="#contact"
            className="press inline-flex min-h-11 items-center rounded-sm bg-ink px-5 text-step--1 font-semibold text-bg transition-transform duration-200 ease-out hover:-translate-y-0.5"
          >
            {siteConfig.cta.primary}
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero — asymmetric, left-weighted, not centred */}
        <section className="grain relative overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-[var(--space-section)] pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
            <div className="relative z-10">
              <p className="flex items-center gap-3 text-step--1 font-semibold uppercase tracking-[0.18em] text-ink-muted">
                <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                {siteConfig.tagline}
              </p>
              <h1 className="mt-6 text-step-5 font-semibold">
                Websites built to be{' '}
                <em className="font-display text-brand [font-style:italic]">kept</em>, not replaced.
              </h1>
              <p className="mt-6 max-w-prose text-step-1 text-ink-muted">{siteConfig.description}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <a
                  href="#contact"
                  className="press inline-flex min-h-12 items-center justify-center rounded bg-accent px-7 text-step-0 font-semibold text-accent-ink shadow transition-transform duration-200 ease-out hover:-translate-y-0.5"
                >
                  {siteConfig.cta.primary}
                </a>
                <a
                  href="#approach"
                  className="inline-flex min-h-12 items-center gap-2 px-1 text-step-0 font-medium underline decoration-accent decoration-2 underline-offset-[6px] transition-colors duration-150 hover:text-brand"
                >
                  {siteConfig.cta.secondary}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>

            {/* Offset panel — adds asymmetry and depth; the hero's quiet anchor */}
            <aside className="reveal relative z-10 rounded-lg border bg-surface p-7 shadow lg:mb-4">
              <p className="text-step--1 font-semibold uppercase tracking-[0.16em] text-ink-muted">On every build</p>
              <ul className="mt-5 grid gap-4">
                {promises.map((promise) => (
                  <li key={promise} className="flex items-baseline gap-3 font-display text-step-1">
                    <span className="h-px w-6 flex-none translate-y-[-0.35em] bg-accent" aria-hidden="true" />
                    {promise}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* Approach — editorial numbered list, not a 3-up card grid */}
        <section id="approach" className="border-t bg-surface">
          <div className="mx-auto w-full max-w-6xl px-5 py-[var(--space-section)] sm:px-8">
            <h2 className="max-w-prose text-step-3 font-semibold">
              A standard behind every page, not a template.
            </h2>
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

        {/* Selected work — asymmetric rows; replace with real projects */}
        <section id="work" className="border-t">
          <div className="mx-auto w-full max-w-6xl px-5 py-[var(--space-section)] sm:px-8">
            <p className="text-step--1 font-semibold uppercase tracking-[0.18em] text-ink-muted">Selected work</p>
            <ul className="mt-8 border-t">
              {work.map((project) => (
                <li key={project.name} className="reveal border-b">
                  <a
                    href="#contact"
                    className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-6 transition-colors duration-200 hover:text-brand"
                  >
                    <span className="font-display text-step-3 font-semibold">{project.name}</span>
                    <span className="text-step-0 text-ink-muted">{project.sector}</span>
                    <span className="ml-auto text-step-0 text-ink-muted">{project.year}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing call to action — full-bleed brand band */}
        <section id="contact" className="grain relative overflow-hidden bg-brand text-brand-ink">
          <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-[var(--space-section)] sm:px-8">
            <h2 className="max-w-[18ch] text-step-4 font-semibold">Let&apos;s build something worth keeping.</h2>
            <p className="mt-5 max-w-prose text-step-1 opacity-80">
              Tell us about the project and the people it needs to reach.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="press inline-flex min-h-12 items-center justify-center rounded bg-accent px-7 text-step-0 font-semibold text-accent-ink transition-transform duration-200 ease-out hover:-translate-y-0.5"
              >
                {siteConfig.contact.email}
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="inline-flex min-h-12 items-center text-step-0 font-medium underline decoration-accent decoration-2 underline-offset-[6px]"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-10 text-step--1 text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="font-display text-step-0 font-semibold text-ink">{siteConfig.name}</span>
          <span>{siteConfig.contact.address}</span>
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </span>
        </div>
      </footer>
    </div>
  );
}
