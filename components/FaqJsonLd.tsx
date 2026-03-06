import { absoluteUrl } from "@/lib/site";

type FaqJsonLdItem = {
  question: string;
  answer: string;
};

type FaqJsonLdProps = {
  title?: string;
  slugPath: string;
  items: FaqJsonLdItem[];
};

export default function FaqJsonLd({ title, slugPath, items }: FaqJsonLdProps) {
  if (!items.length) {
    return null;
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: title,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    mainEntityOfPage: absoluteUrl(slugPath),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

