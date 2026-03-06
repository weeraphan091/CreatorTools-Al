import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { keywordClusters } from "@/lib/keywordMap";

export const metadata: Metadata = {
  title: "SEO Keyword Map",
  description: "Keyword cluster map for CreatorTools AI growth strategy across tools, templates, and blog pages.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/seo-keyword-map",
  },
  openGraph: {
    title: "SEO Keyword Map | CreatorTools AI",
    description: "Keyword clusters and intent mapping used to scale organic traffic.",
    url: "/seo-keyword-map",
  },
};

export default function SeoKeywordMapPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "SEO Keyword Map", href: "/seo-keyword-map" },
        ]}
      />

      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">SEO Keyword Cluster Map</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          This map aligns search intent with destination pages to improve rankings, click-through rate, and conversion
          quality.
        </p>
      </section>

      <section className="card overflow-x-auto p-6">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <th className="px-3 py-2">Pillar</th>
              <th className="px-3 py-2">Intent</th>
              <th className="px-3 py-2">Primary Keyword</th>
              <th className="px-3 py-2">Secondary Keywords</th>
              <th className="px-3 py-2">Target Page</th>
            </tr>
          </thead>
          <tbody>
            {keywordClusters.map((cluster) => (
              <tr key={cluster.primaryKeyword} className="border-b border-slate-100 align-top">
                <td className="px-3 py-3 font-medium text-slate-900">{cluster.pillar}</td>
                <td className="px-3 py-3 capitalize">{cluster.intent}</td>
                <td className="px-3 py-3">{cluster.primaryKeyword}</td>
                <td className="px-3 py-3">{cluster.secondaryKeywords.join(", ")}</td>
                <td className="px-3 py-3">
                  <Link href={cluster.targetHref} className="text-brand-700 hover:text-brand-600">
                    {cluster.targetHref}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
