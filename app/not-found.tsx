import Link from "next/link";

export default function NotFound() {
  return (
    <section className="card mx-auto max-w-2xl p-8 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Page Not Found</h1>
      <p className="mt-3 text-slate-600">
        The page you are looking for does not exist. Explore our AI tools and templates instead.
      </p>
      <div className="mt-5 flex justify-center gap-3">
        <Link
          href="/tools"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Browse Tools
        </Link>
        <Link
          href="/templates"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
        >
          SEO Templates
        </Link>
      </div>
    </section>
  );
}
