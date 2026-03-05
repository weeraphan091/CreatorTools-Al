import { absoluteUrl } from "@/lib/site";

type BlogJsonLdProps = {
  title: string;
  description: string;
  slug: string;
};

export default function BlogJsonLd({ title, description, slug }: BlogJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Organization",
      name: "CreatorTools AI",
    },
    publisher: {
      "@type": "Organization",
      name: "CreatorTools AI",
    },
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
