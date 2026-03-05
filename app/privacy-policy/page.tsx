import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read how CreatorTools AI collects, stores, and protects user data.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | CreatorTools AI",
    description: "Data handling and privacy practices for CreatorTools AI users.",
    url: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="card space-y-4 p-8 text-sm leading-7 text-slate-700">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p>
        CreatorTools AI respects your privacy. This page explains what information we collect and how we use it to
        improve product performance, security, and user experience.
      </p>
      <h2 className="text-xl font-semibold text-slate-900">Information We Collect</h2>
      <p>
        We may collect usage analytics, device/browser metadata, and content inputs you submit to generation tools.
        We do not intentionally collect sensitive personal data.
      </p>
      <h2 className="text-xl font-semibold text-slate-900">How We Use Data</h2>
      <p>
        Data is used to operate the service, monitor abuse, improve conversion quality, and measure product
        performance. We may use aggregated and anonymized statistics for analytics and reporting.
      </p>
      <h2 className="text-xl font-semibold text-slate-900">Third-Party Services</h2>
      <p>
        We use third-party providers such as hosting, analytics, ad networks, and AI APIs. These services may process
        data according to their own policies.
      </p>
      <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
      <p>
        For privacy requests, contact us at{" "}
        <a className="font-medium text-brand-700 hover:text-brand-600" href="mailto:contact@creatortoolsai.com">
          contact@creatortoolsai.com
        </a>
        .
      </p>
    </article>
  );
}
