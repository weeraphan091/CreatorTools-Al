export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "50-viral-tiktok-hooks",
    title: "50 Viral TikTok Hooks",
    description: "A swipe file of 50 proven TikTok hooks to boost watch time and shares.",
    content: [
      "Great TikTok content starts with a hook in the first two seconds. Use curiosity, bold claims, or quick outcomes.",
      "Examples: 'Nobody talks about this growth trick...', 'I tested this for 30 days and the result shocked me.', 'Before you post your next TikTok, do this first.'",
      "Pair each hook with a clear visual pattern interrupt and an easy CTA to comment, save, or follow.",
    ],
  },
  {
    slug: "100-youtube-title-ideas",
    title: "100 YouTube Title Ideas",
    description: "Use these YouTube title formats to increase clicks and rank for search intent.",
    content: [
      "Winning YouTube titles combine clarity + curiosity + a promised outcome.",
      "Try formats like: 'How I [Outcome] in [Timeframe]', '[Number] Mistakes Beginners Make', and 'I Tried [Method] So You Don't Have To'.",
      "Always test two title directions: search-driven and emotion-driven, then compare CTR and retention.",
    ],
  },
  {
    slug: "best-instagram-bio-examples",
    title: "Best Instagram Bio Examples",
    description: "See high-converting Instagram bio examples for creators, coaches, and brands.",
    content: [
      "Your bio should answer three things quickly: who you help, what result you provide, and what to do next.",
      "Use one line for positioning, one line for proof, and one line CTA with a link.",
      "A clean bio increases profile-to-follow and profile-to-click conversion rates.",
    ],
  },
  {
    slug: "50-high-converting-call-to-actions",
    title: "50 High Converting Call To Actions",
    description: "A curated list of conversion-focused CTAs for landing pages, ads, and social posts.",
    content: [
      "Strong CTAs reduce friction and make the next step obvious.",
      "Use specific action language like: 'Get my free template', 'Start your 7-day trial', and 'See pricing instantly'.",
      "Match CTA intensity to funnel stage: soft CTA for awareness, direct CTA for decision stage.",
    ],
  },
  {
    slug: "viral-marketing-hooks",
    title: "Viral Marketing Hooks",
    description: "A practical framework to craft viral hooks across social media platforms.",
    content: [
      "Viral hooks often include tension, novelty, specificity, or social proof.",
      "Build your hook stack: contrarian angle + specific number + emotional trigger.",
      "Treat hooks as testable assets. Ship multiple variants, then scale what performs.",
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
