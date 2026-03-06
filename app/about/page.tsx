import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About ViralHookLab",
  description:
    "Learn about ViralHookLab.com and our mission to help creators produce viral hooks and high-converting content with AI.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About ViralHookLab.com",
    description: "Built for creators and marketers who want faster, better content generation.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">About ViralHookLab.com</h1>
        <p className="mt-4 text-slate-600">
          ViralHookLab.com is a focused suite of AI writing tools designed for modern creators and growth teams.
          Our goal is simple: make it faster to publish hooks and marketing content that gets attention and converts.
        </p>
        <p className="mt-3 text-slate-600">
          We combine practical prompt engineering, SEO best practices, and conversion-focused copy structures so
          you can ship better marketing assets in less time.
        </p>
      </section>

      <AdBanner slot="About Page Banner" adSlotId={siteConfig.ads.about} />
    </div>
  );
}
