import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for ViralHookLab.com, operated by Seventy Eight Co., Ltd., including Google AdSense cookie and opt-out disclosures.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | ViralHookLab.com",
    description:
      "Information collection, cookies, and advertising disclosures (including Google AdSense) for ViralHookLab.com users.",
    url: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="card space-y-4 p-8 text-sm leading-7 text-slate-700">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p>
        This Privacy Policy describes how ViralHookLab.com (“ViralHookLab”, “we”, “us”) collects, uses, and shares
        information when you use our website and tools. We are committed to transparency about data practices so you can
        use our AI generators with confidence. ViralHookLab.com is operated by{" "}
        <span className="font-medium text-slate-900">Seventy Eight Co., Ltd.</span>.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Who we are</h2>
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="font-semibold text-slate-900">Operator</p>
        <p className="mt-1">Seventy Eight Co., Ltd.</p>
        <p className="mt-1">Tax ID: 0205565023848</p>
        <p className="mt-1">
          Support email:{" "}
          <a className="font-medium text-brand-700 hover:text-brand-600" href="mailto:support@viralhooklab.com">
            support@viralhooklab.com
          </a>
        </p>
      </div>

      <h2 className="text-xl font-semibold text-slate-900">Information We Collect</h2>
      <p>
        We collect only what is necessary to run the service, prevent abuse, and improve our tools. We may collect the
        following categories of information:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <span className="font-medium text-slate-900">Usage data</span> (for example: pages viewed, feature
          interactions, and approximate timestamps).
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
        We use information to operate the service, deliver tool outputs, prevent abuse, troubleshoot issues, improve
        product quality, and understand performance. We may use aggregated and anonymized statistics for analytics and
        reporting.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Cookies and Similar Technologies</h2>
      <p>
        We and our partners may use cookies, web beacons, and similar technologies. Cookies are small text files stored
        on your device that help websites function, remember preferences, measure performance, and support advertising.
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Provide and secure the service.</li>
        <li>Remember preferences.</li>
        <li>Measure performance and analytics.</li>
        <li>Serve and measure advertisements.</li>
      </ul>

      <h2 className="text-xl font-semibold text-slate-900">Google AdSense and Personalized Advertising</h2>
      <p>
        We use <span className="font-medium text-slate-900">Google AdSense</span> to display advertisements. Third-party
        vendors, including <span className="font-medium text-slate-900">Google</span>, use cookies to serve ads based on
        a user&apos;s prior visits to this website and/or other websites.
      </p>
      <p>
        Google&apos;s use of advertising cookies (including the{" "}
        <span className="font-medium text-slate-900">DoubleClick DART cookie</span>) enables Google and its partners to
        serve ads to users based on their visit to this site and/or other sites on the Internet (personalized ads).
      </p>
      <p>
        <span className="font-medium text-slate-900">Opt-out / ad personalization controls:</span> Users may opt out of
        personalized advertising by visiting{" "}
        <a
          className="font-medium text-brand-700 hover:text-brand-600"
          href="https://www.google.com/settings/ads"
          target="_blank"
          rel="noreferrer"
        >
          Google Ads Settings (https://www.google.com/settings/ads)
        </a>
        .
      </p>
      <p>
        You can also learn more about how Google uses information from sites or apps that use its services at{" "}
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
        We use third-party providers such as hosting, analytics, ad networks (including Google AdSense), and AI APIs to
        operate our service. These providers may process information according to their own policies and may set cookies
        or similar identifiers.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Data Retention</h2>
      <p>
        We retain information only as long as necessary to operate the service, comply with legal obligations, resolve
        disputes, and enforce agreements. We do not keep personal data longer than needed for these purposes.
        Aggregated analytics may be retained longer for reporting and planning, in a form that does not identify you.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Your Choices and Controls</h2>
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
        <a className="font-medium text-brand-700 hover:text-brand-600" href="mailto:support@viralhooklab.com">
          support@viralhooklab.com
        </a>
        .
      </p>
    </article>
  );
}
