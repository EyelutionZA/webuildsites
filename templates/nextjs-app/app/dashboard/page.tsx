import type { Metadata } from 'next';
import { securityNotes } from '@/lib/security';

export const metadata: Metadata = {
  title: 'Dashboard'
};

/*
  Placeholder authenticated shell, styled to the design system.
  Replace with real app functionality after reviewing auth, database,
  roles, payments, storage and backups.
*/

const metrics = [
  { label: 'Active users', value: '—', note: 'Connect your data source' },
  { label: 'This month', value: '—', note: 'Wire up analytics' },
  { label: 'Open tasks', value: '—', note: 'Replace with real state' }
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="border-b bg-surface">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="/" className="text-step--1 font-medium text-ink-muted transition-colors hover:text-ink">
            &larr; Back to site
          </a>
          <span className="font-display text-step-1 font-semibold">Dashboard</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <h1 className="max-w-prose text-step-4 font-semibold">Welcome back.</h1>
        <p className="mt-4 max-w-prose text-step-1 text-ink-muted">
          This is a placeholder shell. Replace it with authenticated app functionality.
        </p>

        {/* Metrics — varied tiles, not a flat 3-up clone */}
        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, index) => (
            <article
              key={metric.label}
              className={`reveal rounded-lg border bg-surface p-6 shadow ${index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <p className="text-step--1 font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {metric.label}
              </p>
              <p className="mt-3 font-display text-step-4 leading-none">{metric.value}</p>
              <p className="mt-2 text-step--1 text-ink-muted">{metric.note}</p>
            </article>
          ))}
        </section>

        {/* Before production — real, honest checklist from lib/security.ts */}
        <section className="mt-12 rounded-lg border bg-surface p-6 shadow sm:p-8">
          <h2 className="text-step-2 font-semibold">Before production</h2>
          <ul className="mt-5 grid gap-3">
            {securityNotes.map((note) => (
              <li key={note} className="flex items-baseline gap-3 text-ink-muted">
                <span className="h-1.5 w-1.5 flex-none translate-y-[-0.2em] rounded-full bg-accent" aria-hidden="true" />
                {note}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
