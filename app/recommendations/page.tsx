import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RecommendationsClient from "@/components/RecommendationsClient";

export const metadata: Metadata = {
  title: "Recommended Tools for Creators and Marketers",
  description:
    "A curated list of the best tools for content creators and digital marketers — YouTube, SEO, email, design, hosting, and more. Some links are affiliate links.",
  alternates: { canonical: "/recommendations" },
  openGraph: {
    title: "Recommended Tools for Creators | ViralHookLab.com",
    description: "Our top picks for tools that help creators and marketers grow faster.",
    url: "/recommendations",
  },
};

export default function RecommendationsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Recommendations" },
        ]}
      />

      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">Recommended Tools for Creators & Marketers</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          We have tested and used these tools across our own workflows for content creation, SEO, video
          production, email marketing, and ecommerce. Each tool listed here offers an affiliate program —
          some links below may earn us a commission at no extra cost to you.{" "}
          <Link href="/disclosure" className="font-medium text-brand-700 hover:text-brand-600">
            Read our full disclosure
          </Link>
          .
        </p>
      </section>

      <RecommendationsClient />

      <section className="card p-6 text-sm text-slate-500">
        <p>
          <strong>Disclosure:</strong> Some of the links on this page are affiliate links. If you sign up
          through our links, we may receive a commission at no additional cost to you. We only recommend
          tools we genuinely use or believe provide value to creators and marketers. See our{" "}
          <Link href="/disclosure" className="text-brand-700 hover:text-brand-600">Disclosure Policy</Link>{" "}
          and{" "}
          <Link href="/editorial-policy" className="text-brand-700 hover:text-brand-600">Editorial Policy</Link>{" "}
          for details.
        </p>
      </section>
    </div>
  );
}
