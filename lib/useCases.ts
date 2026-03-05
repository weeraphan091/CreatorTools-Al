import { tools } from "@/lib/tools";

type Audience = {
  slug: string;
  name: string;
  searchQualifier: string;
  painPoint: string;
  primaryGoal: string;
  channel: string;
  specificityScore: number;
};

type IntentAngle = {
  slug: string;
  label: string;
  keywordModifier: string;
  objective: string;
  cta: string;
  score: number;
};

export type UseCasePage = {
  slug: string;
  toolSlug: string;
  toolTitle: string;
  audienceSlug: string;
  audienceName: string;
  intentSlug: string;
  intentLabel: string;
  searchTerm: string;
  title: string;
  description: string;
  intro: string;
  tips: string[];
  promptTemplate: string;
  qualityScore: number;
  indexable: boolean;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

const audiences: Audience[] = [
  {
    slug: "for-gaming-creators",
    name: "Gaming Creators",
    searchQualifier: "gaming channels",
    painPoint: "standing out in a saturated content niche",
    primaryGoal: "increase click-through rate and watch time",
    channel: "YouTube Shorts and long-form uploads",
    specificityScore: 24,
  },
  {
    slug: "for-beauty-creators",
    name: "Beauty Creators",
    searchQualifier: "beauty creators",
    painPoint: "publishing repetitive captions and hooks",
    primaryGoal: "improve saves, shares, and profile visits",
    channel: "TikTok and Instagram Reels",
    specificityScore: 22,
  },
  {
    slug: "for-coaches",
    name: "Coaches",
    searchQualifier: "coaches",
    painPoint: "turning expertise into high-converting marketing messages",
    primaryGoal: "book more discovery calls",
    channel: "Instagram, LinkedIn, and landing pages",
    specificityScore: 21,
  },
  {
    slug: "for-real-estate-agents",
    name: "Real Estate Agents",
    searchQualifier: "real estate agents",
    painPoint: "creating fresh listing and lead generation copy",
    primaryGoal: "generate more inbound buyer and seller leads",
    channel: "Instagram and Facebook ads",
    specificityScore: 20,
  },
  {
    slug: "for-shopify-stores",
    name: "Shopify Store Owners",
    searchQualifier: "shopify stores",
    painPoint: "writing persuasive copy for many product SKUs",
    primaryGoal: "increase conversion rate on product pages",
    channel: "Shopify storefront and paid social",
    specificityScore: 23,
  },
  {
    slug: "for-saas-founders",
    name: "SaaS Founders",
    searchQualifier: "saas startups",
    painPoint: "explaining product value quickly",
    primaryGoal: "improve free-trial signup rate",
    channel: "Landing pages and email sequences",
    specificityScore: 22,
  },
  {
    slug: "for-affiliate-marketers",
    name: "Affiliate Marketers",
    searchQualifier: "affiliate marketers",
    painPoint: "writing content that ranks and converts",
    primaryGoal: "increase affiliate click and commission rate",
    channel: "SEO blog posts and social distribution",
    specificityScore: 18,
  },
  {
    slug: "for-local-businesses",
    name: "Local Businesses",
    searchQualifier: "local businesses",
    painPoint: "not having a repeatable content workflow",
    primaryGoal: "drive more phone calls and appointments",
    channel: "Google Business and local social pages",
    specificityScore: 16,
  },
  {
    slug: "for-course-creators",
    name: "Course Creators",
    searchQualifier: "course creators",
    painPoint: "launch copy that does not convert cold traffic",
    primaryGoal: "improve webinar and checkout conversions",
    channel: "Email and sales pages",
    specificityScore: 19,
  },
  {
    slug: "for-agencies",
    name: "Marketing Agencies",
    searchQualifier: "marketing agencies",
    painPoint: "producing quality client copy at scale",
    primaryGoal: "speed up content delivery without losing performance",
    channel: "Multi-platform campaign workflows",
    specificityScore: 17,
  },
  {
    slug: "for-ecommerce-brands",
    name: "Ecommerce Brands",
    searchQualifier: "ecommerce brands",
    painPoint: "ad fatigue from repeating similar messaging",
    primaryGoal: "refresh ad angles and increase ROAS",
    channel: "Meta and Google campaigns",
    specificityScore: 21,
  },
  {
    slug: "for-podcasters",
    name: "Podcasters",
    searchQualifier: "podcast creators",
    painPoint: "packaging episode ideas for discoverability",
    primaryGoal: "increase clicks and subscriber growth",
    channel: "YouTube and social clips",
    specificityScore: 20,
  },
  {
    slug: "for-finance-creators",
    name: "Finance Creators",
    searchQualifier: "finance creators",
    painPoint: "making complex topics feel simple and engaging",
    primaryGoal: "increase trust and audience retention",
    channel: "YouTube, TikTok, and newsletters",
    specificityScore: 18,
  },
  {
    slug: "for-fitness-creators",
    name: "Fitness Creators",
    searchQualifier: "fitness creators",
    painPoint: "creating daily content ideas without burnout",
    primaryGoal: "increase engagement and coaching leads",
    channel: "Instagram and short-form video",
    specificityScore: 20,
  },
  {
    slug: "for-travel-creators",
    name: "Travel Creators",
    searchQualifier: "travel creators",
    painPoint: "writing distinctive hooks across similar destinations",
    primaryGoal: "boost shares and followers from new audiences",
    channel: "Reels, Shorts, and TikTok",
    specificityScore: 19,
  },
  {
    slug: "for-newsletter-writers",
    name: "Newsletter Writers",
    searchQualifier: "email newsletter creators",
    painPoint: "finding fresh copy angles every week",
    primaryGoal: "increase open and click-through rates",
    channel: "Email newsletters and social teasers",
    specificityScore: 17,
  },
  {
    slug: "for-youtube-automation-channels",
    name: "YouTube Automation Channels",
    searchQualifier: "youtube automation channels",
    painPoint: "publishing high volume content with weak packaging",
    primaryGoal: "improve CTR while maintaining volume",
    channel: "YouTube search and browse feed",
    specificityScore: 22,
  },
  {
    slug: "for-ugc-creators",
    name: "UGC Creators",
    searchQualifier: "ugc creators",
    painPoint: "pitching brand value without clear offer framing",
    primaryGoal: "close more paid UGC deals",
    channel: "Short-form paid partnerships",
    specificityScore: 18,
  },
  {
    slug: "for-b2b-marketers",
    name: "B2B Marketers",
    searchQualifier: "b2b marketers",
    painPoint: "turning complex messaging into concise value propositions",
    primaryGoal: "increase qualified demo requests",
    channel: "LinkedIn, email, and landing pages",
    specificityScore: 20,
  },
  {
    slug: "for-app-founders",
    name: "App Founders",
    searchQualifier: "mobile app founders",
    painPoint: "weak onboarding and app store conversion copy",
    primaryGoal: "improve install-to-signup conversion",
    channel: "App Store pages and paid acquisition",
    specificityScore: 19,
  },
  {
    slug: "for-dropshipping-stores",
    name: "Dropshipping Store Owners",
    searchQualifier: "dropshipping stores",
    painPoint: "testing many products with inconsistent copy quality",
    primaryGoal: "identify winning offers faster",
    channel: "Shopify and Meta ads",
    specificityScore: 20,
  },
];

const intentAngles: IntentAngle[] = [
  {
    slug: "for-awareness-growth",
    label: "Awareness Growth",
    keywordModifier: "for awareness",
    objective: "capture broader discovery traffic from informational search intent",
    cta: "publish consistently and optimize for saves and shares",
    score: 8,
  },
  {
    slug: "for-lead-generation",
    label: "Lead Generation",
    keywordModifier: "for lead generation",
    objective: "attract qualified prospects who are closer to taking action",
    cta: "send users to opt-in pages, demos, or consultation forms",
    score: 13,
  },
  {
    slug: "for-conversion-optimization",
    label: "Conversion Optimization",
    keywordModifier: "for conversion optimization",
    objective: "improve conversion rate with stronger intent-aligned messaging",
    cta: "test winning messages on landing pages and ad creatives",
    score: 16,
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function normalizeTokens(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 4);
}

function computeQualityScore(text: string, audience: Audience, intent: IntentAngle) {
  const uniqueTokens = new Set(normalizeTokens(text)).size;
  const tokenBonus = Math.min(20, Math.floor(uniqueTokens / 3));
  const lengthBonus = text.length > 320 ? 7 : 3;
  return clamp(35 + audience.specificityScore + intent.score + tokenBonus + lengthBonus, 0, 100);
}

function buildUseCasePage(
  toolSlug: string,
  toolTitle: string,
  audience: Audience,
  intent: IntentAngle,
): UseCasePage {
  const formattedTool = toolTitle.toLowerCase();
  const searchTerm = `${formattedTool} for ${audience.searchQualifier} ${intent.keywordModifier}`;
  const slug = `${toolSlug}-${audience.slug}-${intent.slug}`;
  const title = `${toolTitle} for ${audience.name} (${intent.label})`;
  const description = `Use our ${formattedTool} for ${audience.name.toLowerCase()} to solve ${audience.painPoint} and ${audience.primaryGoal}.`;
  const intro = `${audience.name} often struggle with ${audience.painPoint}. This use-case page is designed to ${intent.objective} while helping teams ${audience.primaryGoal} across ${audience.channel}.`;
  const tips = [
    `Start with a clear campaign objective: ${intent.label.toLowerCase()}.`,
    `Use niche language that resonates with ${audience.name.toLowerCase()}.`,
    `Generate at least 10 ${formattedTool} options, shortlist 3, then test weekly.`,
    `Map each generated output to one channel variant for ${audience.channel}.`,
    `Close each asset with a CTA that aligns with your goal: ${intent.cta}.`,
  ];
  const promptTemplate = `You are an expert social media marketer. Generate 5 high converting results based on this topic: {input}. Audience: ${audience.name}. Goal: ${intent.label}.`;
  const faqs = [
    {
      question: `How can ${audience.name.toLowerCase()} use this ${formattedTool} for ${intent.label.toLowerCase()}?`,
      answer:
        "Enter a specific topic, audience intent, and desired outcome. Compare generated variants and keep the ones that perform best in click-through and conversion metrics.",
    },
    {
      question: `Is this suitable for ${audience.channel}?`,
      answer:
        `Yes. The outputs are designed to be adapted for ${audience.channel}. Customize tone, length, and CTA based on platform behavior.`,
    },
    {
      question: "How many variants should I test before scaling?",
      answer:
        "Test at least 3-5 options per campaign. Promote the best performer and continue testing new angles to avoid performance decay.",
    },
  ];

  const qualityScore = computeQualityScore(
    `${title} ${description} ${intro} ${tips.join(" ")} ${faqs.map((faq) => faq.answer).join(" ")}`,
    audience,
    intent,
  );
  const indexable = qualityScore >= 80;

  return {
    slug,
    toolSlug,
    toolTitle,
    audienceSlug: audience.slug,
    audienceName: audience.name,
    intentSlug: intent.slug,
    intentLabel: intent.label,
    searchTerm,
    title,
    description,
    intro,
    tips,
    promptTemplate,
    qualityScore,
    indexable,
    faqs,
  };
}

const useCasePages: UseCasePage[] = tools.flatMap((tool) =>
  audiences.flatMap((audience) =>
    intentAngles.map((intent) => buildUseCasePage(tool.slug, tool.title, audience, intent)),
  ),
);

export function getAllUseCasePages() {
  return useCasePages;
}

export function getIndexableUseCasePages() {
  return useCasePages.filter((page) => page.indexable);
}

export function getUseCaseBySlug(slug: string) {
  return useCasePages.find((page) => page.slug === slug);
}

export function getUseCasesByTool(toolSlug: string, limit = 6, includeNoindex = false) {
  const target = includeNoindex
    ? useCasePages.filter((page) => page.toolSlug === toolSlug)
    : getIndexableUseCasePages().filter((page) => page.toolSlug === toolSlug);
  return target.slice(0, limit);
}

export function getFeaturedUseCases(limit = 12) {
  const indexable = getIndexableUseCasePages();
  const byTool = new Map<string, UseCasePage[]>();

  for (const page of indexable) {
    const current = byTool.get(page.toolSlug) || [];
    current.push(page);
    byTool.set(page.toolSlug, current);
  }

  const featured: UseCasePage[] = [];
  const toolKeys = Array.from(byTool.keys());
  let cursor = 0;

  while (featured.length < limit && toolKeys.length > 0) {
    const toolKey = toolKeys[cursor % toolKeys.length];
    const queue = byTool.get(toolKey);
    const next = queue?.shift();
    if (next) {
      featured.push(next);
    }
    if (!queue || queue.length === 0) {
      byTool.delete(toolKey);
      toolKeys.splice(cursor % toolKeys.length, 1);
      continue;
    }
    cursor += 1;
  }

  return featured;
}

export function getUseCaseStats() {
  const total = useCasePages.length;
  const indexable = getIndexableUseCasePages().length;
  const noindex = total - indexable;
  return { total, indexable, noindex };
}
