import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using ViralHookLab.com.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | ViralHookLab.com",
    description: "Legal terms that apply to ViralHookLab.com usage.",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <article className="card space-y-4 p-8 text-sm leading-7 text-slate-700">
      <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
      <p>
        Welcome to ViralHookLab.com. These terms govern your use of our AI-powered content and hook generators.
        The service is designed for creators, marketers, and businesses who need headlines, captions, hooks, and
        similar copy for social media, ads, and marketing. By using ViralHookLab.com, you agree to these terms.
        If you do not agree, do not use the service.
      </p>
      <h2 className="text-xl font-semibold text-slate-900">Service Usage</h2>
      <p>
        You may use the tools for lawful marketing and content workflows. Our generators are intended for
        creators, marketers, and businesses who need headlines, captions, hooks, and similar copy. Examples of
        permitted use include drafting titles for videos, writing ad headlines, and generating bio or CTA copy for
        your own campaigns. Abuse, scraping at scale, and harmful content generation are prohibited. We reserve
        the right to limit or suspend access when usage violates these terms or harms the service for others.
      </p>
      <h2 className="text-xl font-semibold text-slate-900">Generated Content</h2>
      <p>
        You are responsible for reviewing and editing generated outputs before publishing. ViralHookLab.com does not
        guarantee legal compliance, factual accuracy, or platform policy alignment for every output. AI-generated
        text is a starting point; you must ensure it meets your own standards and any platform or legal requirements
        before use in ads, social posts, or other published content. We recommend testing and refining outputs before
        using them in live campaigns or public-facing materials.
      </p>
      <h2 className="text-xl font-semibold text-slate-900">Availability</h2>
      <p>
        We may update, modify, or discontinue parts of the service at any time to improve quality, security, and
        scalability. We will strive to communicate material changes where appropriate, such as via email or a notice
        on the site when terms or pricing change in a significant way. Continued use after changes constitutes
        acceptance of the updated terms.
      </p>
      <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a className="font-medium text-brand-700 hover:text-brand-600" href="mailto:support@viralhooklab.com">
          support@viralhooklab.com
        </a>
        . We aim to respond to legal and policy inquiries within a reasonable time, typically within a few business
        days. For billing or account issues, the same contact applies.
      </p>
    </article>
  );
}
