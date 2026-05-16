import { siteConfig } from '@/content/site';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Dynamic Webuild Site</p>
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">{siteConfig.name}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-600">{siteConfig.description}</p>
        <form className="mt-10 grid max-w-xl gap-4" action="/api/contact" method="post">
          <label className="grid gap-2 text-sm font-medium">
            Name
            <input className="rounded-xl border border-slate-300 px-4 py-3" name="name" required />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Email
            <input className="rounded-xl border border-slate-300 px-4 py-3" name="email" required type="email" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Message
            <textarea className="min-h-28 rounded-xl border border-slate-300 px-4 py-3" name="message" required />
          </label>
          <button className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white" type="submit">
            {siteConfig.cta.primary}
          </button>
        </form>
      </section>
    </main>
  );
}
