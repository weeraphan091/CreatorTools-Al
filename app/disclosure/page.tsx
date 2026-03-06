import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Advertising & Affiliate Disclosure",
  description:
    "Disclosure about advertising, affiliate links, and how ViralHookLab.com may earn revenue while keeping tools free.",
  alternates: { canonical: "/disclosure" },
  openGraph: {
    title: "Disclosure | ViralHookLab.com",
    description: "Advertising and affiliate disclosure for ViralHookLab.com.",
    url: "/disclosure",
  },
};

export default function DisclosurePage() {
  return (
    <article className="card space-y-4 p-8 text-sm leading-7 text-slate-700">
      <h1 className="text-3xl font-bold text-slate-900">Advertising & Affiliate Disclosure</h1>

      <p>
        ViralHookLab.com may earn revenue through advertising and/or affiliate links. This helps us operate and improve
        the site while keeping core tools available for free.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Advertising</h2>
      <p>
        We may display ads on pages using third-party services such as Google AdSense. Ads shown may be contextual or
        personalized depending on your settings and applicable rules in your region.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Affiliate links</h2>
      <p>
        Some links on our site may be affiliate links. If you click an affiliate link and make a purchase, we may
        receive a commission at no additional cost to you. We only recommend tools we believe can be helpful for
        creators and marketers.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Editorial independence</h2>
      <p>
        Our recommendations and content are created to be useful first. Compensation does not dictate our editorial
        decisions. For more, see our{" "}
        <Link href="/editorial-policy" className="font-medium text-brand-700 hover:text-brand-600">
          Editorial Policy
        </Link>
        .
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Questions</h2>
      <p>
        If you have questions about this disclosure, contact{" "}
        <a className="font-medium text-brand-700 hover:text-brand-600" href="mailto:support@viralhooklab.com">
          support@viralhooklab.com
        </a>
        .
      </p>
    </article>
  );
}

