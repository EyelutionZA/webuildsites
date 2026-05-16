import { siteConfig } from '@/content/site';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Webuild App Template</p>
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">{siteConfig.name}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-600">{siteConfig.description}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white" href="/dashboard">
            {siteConfig.cta.primary}
          </a>
          <a className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-950" href="/api/health">
            {siteConfig.cta.secondary}
          </a>
        </div>
      </section>
    </main>
  );
}
