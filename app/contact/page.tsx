import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact ViralHookLab",
  description: "Contact ViralHookLab.com for support, partnerships, and product feedback.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact ViralHookLab.com Support",
    description: "Get in touch for product support, partnerships, and collaborations.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="card space-y-4 p-8">
      <h1 className="text-3xl font-bold text-slate-900">Contact</h1>
      <p className="text-slate-600">
        Need help with tools, SEO integrations, or partnership opportunities? Reach us directly.
      </p>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">Support Email</p>
        <a className="mt-1 inline-block text-brand-700 hover:text-brand-600" href="mailto:support@viralhooklab.com">
          support@viralhooklab.com
        </a>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">Response Time</p>
        <p className="mt-1">Typical response within 24-48 hours on business days.</p>
      </div>
    </section>
  );
}
