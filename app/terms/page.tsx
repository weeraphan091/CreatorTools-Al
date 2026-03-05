import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using CreatorTools AI.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | CreatorTools AI",
    description: "Legal terms that apply to CreatorTools AI usage.",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <article className="card space-y-4 p-8 text-sm leading-7 text-slate-700">
      <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
      <p>
        By using CreatorTools AI, you agree to these terms. If you do not agree, do not use the service.
      </p>
      <h2 className="text-xl font-semibold text-slate-900">Service Usage</h2>
      <p>
        You may use the tools for lawful marketing and content workflows. Abuse, scraping at scale, and harmful
        content generation are prohibited.
      </p>
      <h2 className="text-xl font-semibold text-slate-900">Generated Content</h2>
      <p>
        You are responsible for reviewing and editing generated outputs before publishing. CreatorTools AI does not
        guarantee legal compliance, factual accuracy, or platform policy alignment for every output.
      </p>
      <h2 className="text-xl font-semibold text-slate-900">Availability</h2>
      <p>
        We may update, modify, or discontinue parts of the service at any time to improve quality, security, and
        scalability.
      </p>
      <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a className="font-medium text-brand-700 hover:text-brand-600" href="mailto:contact@creatortoolsai.com">
          contact@creatortoolsai.com
        </a>
        .
      </p>
    </article>
  );
}
