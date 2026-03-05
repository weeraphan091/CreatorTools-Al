import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "How CreatorTools AI creates, reviews, and updates SEO and marketing content.",
  alternates: {
    canonical: "/editorial-policy",
  },
  openGraph: {
    title: "Editorial Policy | CreatorTools AI",
    description: "Transparency on content quality, updates, and editorial standards.",
    url: "/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <article className="card space-y-4 p-8 text-sm leading-7 text-slate-700">
      <h1 className="text-3xl font-bold text-slate-900">Editorial Policy</h1>
      <p>
        CreatorTools AI publishes practical SEO and marketing content focused on creators, founders, and growth teams.
        We prioritize actionable, testable frameworks over generic advice.
      </p>
      <h2 className="text-xl font-semibold text-slate-900">Content Standards</h2>
      <p>
        Every page is reviewed for clarity, search intent match, and usefulness. We avoid misleading claims and
        keyword stuffing.
      </p>
      <h2 className="text-xl font-semibold text-slate-900">Updates and Freshness</h2>
      <p>
        Tool pages and guides are updated when platform trends, API behavior, or performance benchmarks change. Old
        content is revised or consolidated to preserve quality.
      </p>
      <h2 className="text-xl font-semibold text-slate-900">Corrections</h2>
      <p>
        If you find a factual issue, send feedback to{" "}
        <a className="font-medium text-brand-700 hover:text-brand-600" href="mailto:contact@creatortoolsai.com">
          contact@creatortoolsai.com
        </a>
        . We review correction requests promptly.
      </p>
    </article>
  );
}
