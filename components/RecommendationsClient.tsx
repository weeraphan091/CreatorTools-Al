"use client";

import { trackEvent } from "@/lib/analytics";

type Recommendation = {
  title: string;
  description: string;
  href: string;
  category: string;
  affiliateNote: string;
};

const recommendations: Recommendation[] = [
  {
    title: "TubeBuddy",
    description:
      "Browser extension for YouTube keyword research, A/B title testing, thumbnail analysis, and channel optimization. Essential for growing a YouTube channel faster.",
    href: "https://www.tubebuddy.com",
    category: "YouTube",
    affiliateNote: "Up to 30% recurring commission",
  },
  {
    title: "vidIQ",
    description:
      "YouTube analytics and SEO tool that shows keyword scores, competitor insights, and trending topics. Helps you find high-opportunity video ideas backed by data.",
    href: "https://vidiq.com",
    category: "YouTube",
    affiliateNote: "25% recurring commission",
  },
  {
    title: "Semrush",
    description:
      "All-in-one SEO, content marketing, and competitor analysis platform. Keyword research, site audits, rank tracking, and backlink analysis for serious marketers.",
    href: "https://www.semrush.com",
    category: "SEO",
    affiliateNote: "Up to $200 per subscription sale",
  },
  {
    title: "Ahrefs",
    description:
      "Powerful SEO toolset for backlink analysis, keyword research, content gap analysis, and rank tracking. Trusted by agencies and in-house SEO teams worldwide.",
    href: "https://ahrefs.com",
    category: "SEO",
    affiliateNote: "Affiliate program available",
  },
  {
    title: "SurferSEO",
    description:
      "AI-powered on-page SEO tool that analyzes top-ranking pages and gives you a content score with real-time optimization suggestions as you write.",
    href: "https://surferseo.com",
    category: "SEO",
    affiliateNote: "25% recurring commission",
  },
  {
    title: "Jasper AI",
    description:
      "AI writing assistant for marketing copy, blog posts, emails, and ad headlines. Uses templates and brand voice settings to keep output consistent.",
    href: "https://www.jasper.ai",
    category: "AI Writing",
    affiliateNote: "30% recurring commission",
  },
  {
    title: "Canva",
    description:
      "Design platform for thumbnails, social media graphics, carousels, presentations, and video. Drag-and-drop with thousands of templates.",
    href: "https://www.canva.com",
    category: "Design",
    affiliateNote: "Up to $36 per Canva Pro signup",
  },
  {
    title: "Envato Elements",
    description:
      "Unlimited downloads of stock video, photos, music, graphics, templates, and fonts for a flat monthly fee. Perfect for content creators who need assets fast.",
    href: "https://elements.envato.com",
    category: "Creative Assets",
    affiliateNote: "50% commission on first month",
  },
  {
    title: "Epidemic Sound",
    description:
      "Royalty-free music and sound effects library for YouTube, TikTok, podcasts, and social content. No copyright claims when you use their tracks.",
    href: "https://www.epidemicsound.com",
    category: "Music & Audio",
    affiliateNote: "Affiliate program available",
  },
  {
    title: "ConvertKit",
    description:
      "Email marketing platform built for creators. Landing pages, automations, and subscriber tagging to grow and monetize your email list.",
    href: "https://convertkit.com",
    category: "Email Marketing",
    affiliateNote: "30% recurring commission",
  },
  {
    title: "Shopify",
    description:
      "E-commerce platform to build and run your online store. Product pages, checkout, inventory, and marketing tools all in one place.",
    href: "https://www.shopify.com",
    category: "E-commerce",
    affiliateNote: "Up to $150 per referral",
  },
  {
    title: "Hostinger",
    description:
      "Affordable web hosting with fast load times, free domain, and one-click WordPress install. Great for blogs, landing pages, and portfolio sites.",
    href: "https://www.hostinger.com",
    category: "Hosting",
    affiliateNote: "Up to 60% commission per sale",
  },
  {
    title: "Grammarly",
    description:
      "AI writing assistant that checks grammar, clarity, tone, and plagiarism. Works in browsers, Google Docs, and most writing apps.",
    href: "https://www.grammarly.com",
    category: "Writing",
    affiliateNote: "$0.20 per free signup, $20 per Premium",
  },
  {
    title: "Notion",
    description:
      "All-in-one workspace for notes, project management, databases, and content calendars. Build a complete content system in one tool.",
    href: "https://www.notion.so",
    category: "Workflow",
    affiliateNote: "Affiliate program available",
  },
  {
    title: "Descript",
    description:
      "Video and podcast editing tool that lets you edit media by editing text. AI-powered transcription, screen recording, and clip creation.",
    href: "https://www.descript.com",
    category: "Video Editing",
    affiliateNote: "Affiliate program available",
  },
  {
    title: "Teachable",
    description:
      "Platform to create and sell online courses, coaching programs, and digital downloads. Built-in payments, landing pages, and student management.",
    href: "https://teachable.com",
    category: "Online Courses",
    affiliateNote: "30% recurring commission",
  },
  {
    title: "Later",
    description:
      "Social media scheduling tool for Instagram, TikTok, Pinterest, LinkedIn, and more. Visual content calendar with auto-publishing and analytics.",
    href: "https://later.com",
    category: "Social Media",
    affiliateNote: "Affiliate program available",
  },
  {
    title: "NordVPN",
    description:
      "Fast, secure VPN for online privacy and accessing geo-restricted content. Useful for creators researching trends across different markets.",
    href: "https://nordvpn.com",
    category: "Privacy & Security",
    affiliateNote: "Up to 40% commission per sale",
  },
];

export default function RecommendationsClient() {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {recommendations.map((item) => (
        <article key={item.title} className="card flex flex-col p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{item.category}</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">{item.title}</h2>
          <p className="mt-2 flex-1 text-sm text-slate-600">{item.description}</p>
          <p className="mt-3 text-xs text-emerald-700 font-medium">{item.affiliateNote}</p>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer sponsored"
            onClick={() => trackEvent("outbound_recommendation_click", { label: item.title, category: item.category })}
            className="mt-4 inline-flex self-start rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Visit site →
          </a>
        </article>
      ))}
    </section>
  );
}
