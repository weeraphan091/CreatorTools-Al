import { absoluteUrl } from "@/lib/site";
import { siteConfig } from "@/lib/site";
import type { ToolConfig } from "@/lib/tools";

type ToolJsonLdProps = {
  tool: ToolConfig;
};

export default function ToolJsonLd({ tool }: ToolJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: tool.seoDescription,
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl(`/tools/${tool.slug}`),
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
