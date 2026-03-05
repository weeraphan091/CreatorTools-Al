import { tools } from "@/lib/tools";

type Audience = {
  slug: string;
  name: string;
  painPoint: string;
  primaryGoal: string;
  channel: string;
};

export type UseCasePage = {
  slug: string;
  toolSlug: string;
  toolTitle: string;
  audienceSlug: string;
  audienceName: string;
  searchTerm: string;
  title: string;
  description: string;
  intro: string;
  tips: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

const audiences: Audience[] = [
  {
    slug: "for-gaming-creators",
    name: "Gaming Creators",
    painPoint: "standing out in a saturated content niche",
    primaryGoal: "increase click-through rate and watch time",
    channel: "YouTube Shorts and long-form uploads",
  },
  {
    slug: "for-beauty-creators",
    name: "Beauty Creators",
    painPoint: "publishing repetitive captions and hooks",
    primaryGoal: "improve saves, shares, and profile visits",
    channel: "TikTok and Instagram Reels",
  },
  {
    slug: "for-coaches",
    name: "Coaches",
    painPoint: "turning expertise into high-converting marketing messages",
    primaryGoal: "book more discovery calls",
    channel: "Instagram, LinkedIn, and landing pages",
  },
  {
    slug: "for-real-estate-agents",
    name: "Real Estate Agents",
    painPoint: "creating fresh listing and lead generation copy",
    primaryGoal: "generate more inbound buyer and seller leads",
    channel: "Instagram and Facebook ads",
  },
  {
    slug: "for-shopify-stores",
    name: "Shopify Store Owners",
    painPoint: "writing persuasive copy for many product SKUs",
    primaryGoal: "increase conversion rate on product pages",
    channel: "Shopify storefront and paid social",
  },
  {
    slug: "for-saas-founders",
    name: "SaaS Founders",
    painPoint: "explaining product value quickly",
    primaryGoal: "improve free-trial signup rate",
    channel: "Landing pages and email sequences",
  },
  {
    slug: "for-affiliate-marketers",
    name: "Affiliate Marketers",
    painPoint: "writing content that ranks and converts",
    primaryGoal: "increase affiliate click and commission rate",
    channel: "SEO blog posts and social distribution",
  },
  {
    slug: "for-local-businesses",
    name: "Local Businesses",
    painPoint: "not having a repeatable content workflow",
    primaryGoal: "drive more phone calls and appointments",
    channel: "Google Business and local social pages",
  },
  {
    slug: "for-course-creators",
    name: "Course Creators",
    painPoint: "launch copy that does not convert cold traffic",
    primaryGoal: "improve webinar and checkout conversions",
    channel: "Email and sales pages",
  },
  {
    slug: "for-agencies",
    name: "Marketing Agencies",
    painPoint: "producing quality client copy at scale",
    primaryGoal: "speed up content delivery without losing performance",
    channel: "Multi-platform campaign workflows",
  },
  {
    slug: "for-ecommerce-brands",
    name: "Ecommerce Brands",
    painPoint: "ad fatigue from repeating similar messaging",
    primaryGoal: "refresh ad angles and increase ROAS",
    channel: "Meta and Google campaigns",
  },
  {
    slug: "for-podcasters",
    name: "Podcasters",
    painPoint: "packaging episode ideas for discoverability",
    primaryGoal: "increase clicks and subscriber growth",
    channel: "YouTube and social clips",
  },
  {
    slug: "for-finance-creators",
    name: "Finance Creators",
    painPoint: "making complex topics feel simple and engaging",
    primaryGoal: "increase trust and audience retention",
    channel: "YouTube, TikTok, and newsletters",
  },
  {
    slug: "for-fitness-creators",
    name: "Fitness Creators",
    painPoint: "creating daily content ideas without burnout",
    primaryGoal: "increase engagement and coaching leads",
    channel: "Instagram and short-form video",
  },
  {
    slug: "for-travel-creators",
    name: "Travel Creators",
    painPoint: "writing distinctive hooks across similar destinations",
    primaryGoal: "boost shares and followers from new audiences",
    channel: "Reels, Shorts, and TikTok",
  },
];

function buildUseCasePage(toolSlug: string, toolTitle: string, audience: Audience): UseCasePage {
  const formattedTool = toolTitle.toLowerCase();
  const audiencePhrase = audience.slug.replaceAll("-", " ");
  const searchTerm = `${formattedTool} ${audiencePhrase}`;
  const slug = `${toolSlug}-${audience.slug}`;
  const audienceTitle = audiencePhrase.replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    slug,
    toolSlug,
    toolTitle,
    audienceSlug: audience.slug,
    audienceName: audience.name,
    searchTerm,
    title: `${toolTitle} ${audienceTitle}`,
    description: `Use our ${formattedTool} for ${audience.name.toLowerCase()} to solve ${audience.painPoint} and ${audience.primaryGoal}.`,
    intro: `${audience.name} often struggle with ${audience.painPoint}. This page gives a practical workflow to use the ${toolTitle} so you can ${audience.primaryGoal} across ${audience.channel}.`,
    tips: [
      `Start with one clear campaign goal before generating ${formattedTool} outputs.`,
      `Use niche-specific language your ${audience.name.toLowerCase()} audience already understands.`,
      `Generate at least 5-10 variations and test top performers weekly.`,
      `Reuse winning outputs in your ${audience.channel} calendar for consistency.`,
    ],
    faqs: [
      {
        question: `How can ${audience.name.toLowerCase()} use this ${formattedTool} effectively?`,
        answer:
          "Enter a specific topic, audience intent, and desired outcome. Then test multiple generated variants and keep the best performing version.",
      },
      {
        question: `Will this help improve ${audience.primaryGoal}?`,
        answer:
          "Yes. It speeds up copy ideation and gives high-converting angles, which helps you test faster and scale what works.",
      },
    ],
  };
}

const useCasePages: UseCasePage[] = tools.flatMap((tool) =>
  audiences.map((audience) => buildUseCasePage(tool.slug, tool.title, audience)),
);

export function getAllUseCasePages() {
  return useCasePages;
}

export function getUseCaseBySlug(slug: string) {
  return useCasePages.find((page) => page.slug === slug);
}

export function getUseCasesByTool(toolSlug: string, limit = 6) {
  return useCasePages.filter((page) => page.toolSlug === toolSlug).slice(0, limit);
}

export function getFeaturedUseCases(limit = 12) {
  return useCasePages.slice(0, limit);
}
