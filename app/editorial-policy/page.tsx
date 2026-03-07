import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "How ViralHookLab.com creates, reviews, and updates SEO and marketing content.",
  alternates: {
    canonical: "/editorial-policy",
  },
  openGraph: {
    title: "Editorial Policy | ViralHookLab.com",
    description: "Transparency on content quality, updates, and editorial standards.",
    url: "/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <article className="card space-y-6 p-8 text-sm leading-7 text-slate-700">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Editorial Policy</h1>
        <p className="mt-3 text-base text-slate-600">
          Transparency about how we create, review, and maintain the content on ViralHookLab.com. We publish this
          policy so you can trust that our recommendations and guides are designed for your benefit, not for
          undisclosed commercial gain. This policy applies to all pages, tools, blog posts, templates, and guides
          published on our platform.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Our Editorial Mission</h2>
        <p className="mt-3">
          ViralHookLab.com publishes practical SEO and marketing content focused on creators, founders, and
          growth teams. We prioritize actionable, testable frameworks over generic advice. Every piece of
          content on this site is designed to help you create better marketing assets, improve your online
          presence, and grow your audience or business through proven strategies.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Content Creation Process</h2>
        <p className="mt-3">
          Our content creation follows a structured process to ensure quality and accuracy:
        </p>
        <ol className="mt-3 list-inside list-decimal space-y-2">
          <li>
            <strong>Research:</strong> We analyze current platform trends, algorithm updates, and
            performance data from successful creators and marketers before writing or updating content.
          </li>
          <li>
            <strong>Drafting:</strong> Content is drafted with a focus on specificity, actionable advice,
            and real-world applicability. We avoid filler content, vague recommendations, and unsupported claims.
          </li>
          <li>
            <strong>Review:</strong> Every page is reviewed for clarity, search intent match, factual accuracy,
            and usefulness before publication. We avoid misleading claims and keyword stuffing.
          </li>
          <li>
            <strong>Publication:</strong> Content is published with appropriate metadata, structured data,
            and internal links to related resources on our platform.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">AI-Generated Content Disclosure</h2>
        <p className="mt-3">
          Our AI tools generate content suggestions (hooks, titles, captions, descriptions) based on
          language models trained on large datasets. These outputs are starting points intended to be
          reviewed, customized, and approved by the user before publication. We do not guarantee that
          AI-generated outputs are factually accurate, and users should verify any specific claims,
          statistics, or recommendations before using them in their marketing.
        </p>
        <p className="mt-3">
          Blog posts, guides, and editorial content on ViralHookLab.com are written and reviewed by
          our editorial team. While AI may assist in research and drafting, all published editorial
          content undergoes human review for accuracy and quality.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Content Standards</h2>
        <p className="mt-3">
          All content published on ViralHookLab.com adheres to the following standards:
        </p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li>Content must be original, useful, and provide genuine value to the target audience.</li>
          <li>Claims and recommendations must be based on documented best practices, platform guidelines, or verifiable performance data.</li>
          <li>We do not publish content designed primarily to manipulate search rankings through keyword stuffing, thin content, or deceptive practices.</li>
          <li>Affiliate links and sponsored content are clearly disclosed in accordance with FTC guidelines and our <Link href="/disclosure" className="text-brand-700 hover:text-brand-600">Disclosure Policy</Link>.</li>
          <li>Advertising content (Google AdSense) is clearly separated from editorial content and does not influence our recommendations.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Updates and Freshness</h2>
        <p className="mt-3">
          Tool pages, blog posts, and guides are updated when platform trends, API behavior, algorithm
          changes, or performance benchmarks change. We conduct regular content audits to identify pages
          that need updating, consolidation, or removal. Old content is revised with current information
          or consolidated into comprehensive resources to preserve quality and prevent outdated advice
          from misleading users.
        </p>
        <p className="mt-3">
          When significant updates are made to existing content, we note the changes where appropriate
          to maintain transparency with returning readers.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Independence and Advertising</h2>
        <p className="mt-3">
          ViralHookLab.com may display advertisements through Google AdSense and similar advertising
          networks. Advertising revenue helps us maintain free access to our AI tools. However,
          advertising does not influence our editorial content, tool recommendations, or the order
          in which tools are presented. Our editorial and advertising operations are independent.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Corrections and Feedback</h2>
        <p className="mt-3">
          If you find a factual issue, outdated information, or any content that does not meet
          our editorial standards, we encourage you to let us know. Send feedback to{" "}
          <a className="font-medium text-brand-700 hover:text-brand-600" href="mailto:support@viralhooklab.com">
            support@viralhooklab.com
          </a>{" "}
          with the page URL and a description of the concern. We review correction requests promptly
          and update content as needed. Significant corrections are noted on the affected page.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-500">
        <p>
          This editorial policy was last updated in March 2026. For questions about our content practices,
          contact{" "}
          <a className="text-brand-700 hover:text-brand-600" href="mailto:support@viralhooklab.com">
            support@viralhooklab.com
          </a>.
          Also see our{" "}
          <Link href="/privacy-policy" className="text-brand-700 hover:text-brand-600">Privacy Policy</Link>,{" "}
          <Link href="/terms" className="text-brand-700 hover:text-brand-600">Terms of Service</Link>, and{" "}
          <Link href="/disclosure" className="text-brand-700 hover:text-brand-600">Disclosure</Link>.
        </p>
      </section>
    </article>
  );
}
