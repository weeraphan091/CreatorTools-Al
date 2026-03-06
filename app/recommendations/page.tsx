import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RecommendationsClient from "@/components/RecommendationsClient";

export const metadata: Metadata = {
  title: "Recommendations",
  description:
    "A curated creator stack of tools for editing, SEO, analytics, and growth. Some links may be affiliate links.",
  alternates: { canonical: "/recommendations" },
  openGraph: {
    title: "Recommendations | ViralHookLab.com",
    description: "A curated creator stack of tools for growth and production.",
    url: "/recommendations",
  },
};

export default function RecommendationsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Recommendations", href: "/recommendations" },
        ]}
      />

      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">Creator Stack Recommendations</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Tools we recommend for creators and marketers: editing, SEO, analytics, and publishing workflows.{" "}
          <Link href="/disclosure" className="font-medium text-brand-700 hover:text-brand-600">
            Read our disclosure
          </Link>
          .
        </p>
      </section>

      <RecommendationsClient />
    </div>
  );
}

