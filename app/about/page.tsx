import type { Metadata } from "next";
import Link from "next/link";
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
      <article className="card space-y-8 p-8">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">About ViralHookLab.com</h1>
          <p className="mt-4 text-lg text-slate-600">
            AI-powered content tools built for creators, marketers, and growth teams who need results — not hype.
          </p>
        </header>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Our Mission</h2>
          <p className="mt-3 text-slate-600">
            ViralHookLab.com exists to solve one problem: the blank page. Every day, millions of creators and
            marketers stare at an empty screen, struggling to write the hook, title, caption, or headline that
            will make their content stand out. We believe that AI should handle the heavy lifting of ideation
            so you can focus on what matters — creating, shipping, and growing.
          </p>
          <p className="mt-3 text-slate-600">
            Our platform offers over 50 free AI-powered tools that generate high-converting copy for YouTube,
            TikTok, Instagram, LinkedIn, Amazon, Google Ads, and more. Each tool is designed around proven
            marketing frameworks and optimized for real-world performance, not generic outputs.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Who We Serve</h2>
          <p className="mt-3 text-slate-600">
            We built ViralHookLab for three audiences. First, <strong>content creators</strong> who need scroll-stopping
            hooks, titles, and captions across social platforms. Second, <strong>digital marketers</strong> who need
            high-CTR ad headlines, product descriptions, and email subject lines. Third, <strong>growth teams and
            agencies</strong> who need to produce quality copy at scale without sacrificing consistency or brand voice.
          </p>
          <p className="mt-3 text-slate-600">
            Whether you are a solo creator publishing daily TikToks or a marketing agency managing campaigns
            for dozens of clients, our tools save you hours every week and consistently deliver copy that performs.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">How Our Tools Work</h2>
          <p className="mt-3 text-slate-600">
            Every tool on ViralHookLab combines practical prompt engineering, SEO best practices, and
            conversion-focused copy structures. Enter your topic or keyword, and the AI generates five
            optimized results in seconds. Each result is based on patterns proven to drive engagement
            across millions of posts, ads, and videos analyzed from top-performing creators and brands.
          </p>
          <p className="mt-3 text-slate-600">
            Our tools are powered by advanced language models and fine-tuned for specific use cases — a
            YouTube title generator uses different optimization criteria than a TikTok caption generator or
            an Amazon product description writer. This specialization ensures each output is tailored to
            the platform and format where it will be used.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Our Values</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-slate-600">
            <li>
              <strong>Practical over theoretical.</strong> Every tool and guide is built to produce results you can
              use immediately, not academic frameworks that sound good but do not ship.
            </li>
            <li>
              <strong>Transparency.</strong> We are upfront about how our tools work, how we monetize, and what
              data we collect. Read our{" "}
              <Link href="/privacy-policy" className="text-brand-700 hover:text-brand-600">Privacy Policy</Link>,{" "}
              <Link href="/disclosure" className="text-brand-700 hover:text-brand-600">Disclosure</Link>, and{" "}
              <Link href="/editorial-policy" className="text-brand-700 hover:text-brand-600">Editorial Policy</Link>{" "}
              for full details.
            </li>
            <li>
              <strong>Quality at scale.</strong> We would rather offer 50 tools that produce excellent results
              than 500 tools that produce mediocre ones. Every tool is reviewed and updated regularly.
            </li>
            <li>
              <strong>Accessibility.</strong> Core tools are free to use. We believe everyone should have access
              to professional-grade marketing copy, regardless of budget.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">The Company</h2>
          <p className="mt-3 text-slate-600">
            ViralHookLab.com is operated by <strong>Seventy Eight Co., Ltd.</strong> (Tax ID: 0205565023848),
            a registered company committed to building high-quality digital tools for the global creator economy.
            Our team combines expertise in AI engineering, content marketing, SEO, and user experience design
            to deliver tools that are both powerful and easy to use.
          </p>
          <p className="mt-3 text-slate-600">
            For support, partnerships, or press inquiries, contact us at{" "}
            <a href="mailto:support@viralhooklab.com" className="text-brand-700 hover:text-brand-600">
              support@viralhooklab.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Get Started</h2>
          <p className="mt-3 text-slate-600">
            Ready to create better content faster? Explore our{" "}
            <Link href="/tools" className="text-brand-700 hover:text-brand-600">full tool library</Link>,
            read our{" "}
            <Link href="/blog" className="text-brand-700 hover:text-brand-600">blog</Link> for marketing tips,
            or jump straight into a tool and generate your first results in seconds.
          </p>
        </section>
      </article>

      <AdBanner slot="About Page Banner" adSlotId={siteConfig.ads.about} />
    </div>
  );
}
