import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how CreatorTools AI collects, uses, and protects information, including how Google AdSense uses cookies for personalized ads.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | CreatorTools AI",
    description:
      "Information collection, cookies, and advertising disclosures (including Google AdSense) for CreatorTools AI users.",
    url: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="card space-y-4 p-8 text-sm leading-7 text-slate-700">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p>
        CreatorTools AI respects your privacy. This Privacy Policy explains what information we collect, how we use it,
        and how advertising partners (including Google) may use cookies to serve ads.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Summary</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>We collect basic usage and device information to operate and improve the service.</li>
        <li>We may show ads through Google AdSense and other advertising partners.</li>
        <li>Advertising partners may use cookies (including the DoubleClick DART cookie) for personalized advertising.</li>
        <li>
          You can control ad personalization using Google Ads Settings:{" "}
          <a
            className="font-medium text-brand-700 hover:text-brand-600"
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noreferrer"
          >
            https://www.google.com/settings/ads
          </a>
          .
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-slate-900">Information We Collect</h2>
      <p>We may collect:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <span className="font-medium text-slate-900">Usage analytics</span> (for example: pages viewed, clicks, and
          feature interactions).
        </li>
        <li>
          <span className="font-medium text-slate-900">Device and browser metadata</span> (for example: device type,
          browser type, operating system, language, and approximate location derived from IP address).
        </li>
        <li>
          <span className="font-medium text-slate-900">User-submitted inputs</span> you provide to the AI generation
          tools (for example: topics or keywords).
        </li>
      </ul>
      <p>We do not intentionally collect sensitive personal data (such as government IDs or payment card numbers).</p>

      <h2 className="text-xl font-semibold text-slate-900">How We Use Data</h2>
      <p>
        Data is used to operate the service, monitor abuse, improve conversion quality, and measure product
        performance. We may use aggregated and anonymized statistics for analytics and reporting.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Cookies and Similar Technologies</h2>
      <p>We and our partners may use cookies, web beacons, and similar technologies to:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Provide and secure the service.</li>
        <li>Remember preferences.</li>
        <li>Measure performance and analytics.</li>
        <li>Serve and measure advertisements.</li>
      </ul>

      <h2 className="text-xl font-semibold text-slate-900">Google AdSense and Third-Party Advertising</h2>
      <p>
        Third-party vendors, including <span className="font-medium text-slate-900">Google</span>, use cookies to serve
        ads based on a user&apos;s prior visits to this website and/or other websites.
      </p>
      <p>
        Google&apos;s use of advertising cookies (including the{" "}
        <span className="font-medium text-slate-900">DoubleClick DART cookie</span>) enables Google and its partners to
        serve ads to users based on their visit to this site and/or other sites on the Internet.
      </p>
      <p>
        Users may opt out of personalized advertising by visiting{" "}
        <a
          className="font-medium text-brand-700 hover:text-brand-600"
          href="https://www.google.com/settings/ads"
          target="_blank"
          rel="noreferrer"
        >
          Google Ads Settings
        </a>
        . You can also learn more about how Google uses information from sites or apps that use its services at{" "}
        <a
          className="font-medium text-brand-700 hover:text-brand-600"
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noreferrer"
        >
          Google Advertising Technologies
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Third-Party Services</h2>
      <p>
        We use third-party providers such as hosting, analytics, ad networks (including Google AdSense), and AI APIs.
        These services may process data according to their own policies and may set cookies or similar identifiers.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Data Retention</h2>
      <p>
        We retain information only as long as needed to operate the service, comply with legal obligations, resolve
        disputes, and enforce agreements. Aggregated analytics may be retained longer for reporting and planning.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Your Choices</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <span className="font-medium text-slate-900">Ad personalization</span>: manage via{" "}
          <a
            className="font-medium text-brand-700 hover:text-brand-600"
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noreferrer"
          >
            Google Ads Settings
          </a>
          .
        </li>
        <li>
          <span className="font-medium text-slate-900">Browser controls</span>: most browsers let you remove or block
          cookies. If you block cookies, some site features may not work properly.
        </li>
      </ul>

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
