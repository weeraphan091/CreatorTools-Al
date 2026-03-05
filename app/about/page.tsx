import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "About CreatorTools AI",
  description:
    "Learn about CreatorTools AI and our mission to help creators produce high-converting content with AI.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About CreatorTools AI",
    description: "Built for creators and marketers who want faster, better content generation.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">About CreatorTools AI</h1>
        <p className="mt-4 text-slate-600">
          CreatorTools AI is a focused suite of AI writing tools designed for modern creators and growth teams.
          Our goal is simple: make it faster to publish content that gets attention and converts.
        </p>
        <p className="mt-3 text-slate-600">
          We combine practical prompt engineering, SEO best practices, and conversion-focused copy structures so
          you can ship better marketing assets in less time.
        </p>
      </section>

      <AdBanner slot="About Page Banner" />
    </div>
  );
}
