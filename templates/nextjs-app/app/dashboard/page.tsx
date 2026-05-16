export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-4 max-w-2xl text-slate-600">
        This is a placeholder dashboard route. Replace it with authenticated app functionality after reviewing auth, database, roles, payments, storage, and backup requirements.
      </p>
      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {['Auth', 'Database', 'Payments'].map((item) => (
          <article key={item} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="font-semibold">{item}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Document and implement this layer before production.</p>
          </article>
        ))}
      </section>
    </main>
  );
}
