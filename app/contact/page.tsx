import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact ViralHookLab",
  description: "Contact ViralHookLab.com for support, partnerships, and product feedback.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact ViralHookLab.com Support",
    description: "Get in touch for product support, partnerships, and collaborations.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <article className="card space-y-8 p-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
        <p className="mt-3 text-lg text-slate-600">
          Have a question, suggestion, or partnership idea? We would love to hear from you.
          Choose the best way to reach us below.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">General Support</h2>
        <p className="mt-3 text-slate-600">
          For questions about our AI tools, account issues, billing inquiries, or technical support,
          email us directly. Our support team reviews every message and aims to respond within
          24-48 hours on business days.
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Support Email</p>
          <a className="mt-1 inline-block text-brand-700 hover:text-brand-600" href="mailto:support@viralhooklab.com">
            support@viralhooklab.com
          </a>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Partnerships and Collaborations</h2>
        <p className="mt-3 text-slate-600">
          We are open to collaborations with content creators, marketing agencies, SaaS companies,
          and educational platforms. If you are interested in co-marketing, integrations, affiliate
          partnerships, or sponsored content, reach out with a brief description of what you have in mind.
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Partnership Inquiries</p>
          <a className="mt-1 inline-block text-brand-700 hover:text-brand-600" href="mailto:support@viralhooklab.com">
            support@viralhooklab.com
          </a>
          <p className="mt-2 text-slate-500">Please include &quot;Partnership&quot; in your subject line.</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Bug Reports and Feature Requests</h2>
        <p className="mt-3 text-slate-600">
          Found a bug or have an idea for a new tool or feature? We actively use feedback to
          prioritize our product roadmap. When reporting a bug, please include the tool name,
          what you entered, and a description of the unexpected behavior. For feature requests,
          describe the use case and how it would help your workflow.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Press and Media</h2>
        <p className="mt-3 text-slate-600">
          For press inquiries, interviews, or media coverage requests, email us at the address
          above with &quot;Press&quot; in the subject line. We are happy to provide product information,
          usage statistics, and expert commentary on AI content tools and creator economy trends.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-4">
          <details className="rounded-lg border border-slate-200 p-4">
            <summary className="cursor-pointer font-medium text-slate-900">How quickly will I get a response?</summary>
            <p className="mt-2 text-sm text-slate-600">
              We typically respond within 24-48 hours on business days (Monday through Friday).
              During peak periods, response times may extend slightly, but we read every message.
            </p>
          </details>
          <details className="rounded-lg border border-slate-200 p-4">
            <summary className="cursor-pointer font-medium text-slate-900">Can I request a custom AI tool?</summary>
            <p className="mt-2 text-sm text-slate-600">
              We consider custom tool requests based on demand and feasibility. If multiple users
              request a similar tool, it may be added to our public tool library. For enterprise
              custom solutions, contact us with your requirements.
            </p>
          </details>
          <details className="rounded-lg border border-slate-200 p-4">
            <summary className="cursor-pointer font-medium text-slate-900">How do I report a content error?</summary>
            <p className="mt-2 text-sm text-slate-600">
              If you find a factual error, outdated information, or misleading content on any page,
              email us with the page URL and a description of the issue. We review correction
              requests promptly and update content as needed. See our{" "}
              <Link href="/editorial-policy" className="text-brand-700 hover:text-brand-600">Editorial Policy</Link> for details.
            </p>
          </details>
          <details className="rounded-lg border border-slate-200 p-4">
            <summary className="cursor-pointer font-medium text-slate-900">Where is your company located?</summary>
            <p className="mt-2 text-sm text-slate-600">
              ViralHookLab.com is operated by Seventy Eight Co., Ltd. (Tax ID: 0205565023848).
              We serve users globally and provide all support in English.
            </p>
          </details>
        </div>
      </section>

      <section className="rounded-xl border border-brand-100 bg-brand-50 p-5">
        <p className="text-sm text-brand-800">
          Before contacting support, you may find answers in our{" "}
          <Link href="/tools" className="font-medium text-brand-700 hover:text-brand-600">tool pages</Link> (each includes an FAQ section),
          our{" "}
          <Link href="/blog" className="font-medium text-brand-700 hover:text-brand-600">blog</Link>,
          or our{" "}
          <Link href="/privacy-policy" className="font-medium text-brand-700 hover:text-brand-600">Privacy Policy</Link>.
        </p>
      </section>
    </article>
  );
}
