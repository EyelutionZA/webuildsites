import { siteConfig } from '@/content/site';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Webuild Standard</p>
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">{siteConfig.name}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-600">{siteConfig.description}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white" href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.cta.primary}
          </a>
          <a className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-950" href="#services">
            {siteConfig.cta.secondary}
          </a>
        </div>
      </section>
      <section id="services" className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-3xl font-bold tracking-tight">Built to stay maintainable</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {['Structured content', 'Deployment-ready', 'Future edits'].map((item) => (
            <article key={item} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-semibold">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">This section is intentionally simple so every new project starts clean and easy to replace.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
