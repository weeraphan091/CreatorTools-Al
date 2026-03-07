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
        ViralHookLab.com may earn revenue through advertising and/or affiliate links. We believe you deserve to know
        how we fund the site. This model helps us operate and improve the site while keeping core tools available for
        free. Below we explain how advertising and affiliate relationships work and how they affect our content.
      </p>
      <p>
        We publish this disclosure for transparency and trust. Knowing how a site is funded helps you interpret what
        you see and make informed choices. Our goal is to keep the tools useful and the recommendations honest.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Advertising</h2>
      <p>
        We may display ads on pages using third-party services such as Google AdSense. Ads shown may be contextual or
        personalized depending on your settings and applicable rules in your region. We load ads in a way that does
        not block main content or slow down the core experience. Ad placement is separate from our editorial content
        and does not influence which tools or articles we recommend or how we rank them.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Affiliate links</h2>
      <p>
        Some links on our site may be affiliate links. If you click an affiliate link and make a purchase, we may
        receive a commission at no additional cost to you. The price you pay is the same whether you use our link or
        not. We only recommend tools we believe can be helpful for creators and marketers. Affiliate income does not
        determine which products we feature or the order in which they appear; our editorial and recommendation
        process is independent.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Editorial independence</h2>
      <p>
        Our recommendations and content are created to be useful first. Compensation does not dictate our editorial
        decisions. We do not accept payment to place or rank specific tools or articles. For more, see our{" "}
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
        . We are happy to clarify how we monetize the site and how that affects what you see. Your feedback helps us
        keep our policies clear and up to date.
      </p>
    </article>
  );
}

