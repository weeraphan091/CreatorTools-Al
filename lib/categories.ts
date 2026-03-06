export type CategoryId = "tiktok" | "youtube" | "instagram" | "ecommerce" | "business-writing" | "seo-marketing";

export type CategoryFaq = { question: string; answer: string };

export type Category = {
  id: CategoryId;
  label: string;
  href: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  expandedIntro: string;
  faqs: CategoryFaq[];
};

export const categories: Category[] = [
  {
    id: "tiktok",
    label: "TikTok",
    href: "/tiktok",
    seoTitle: "Best AI Tools for TikTok Growth",
    seoDescription:
      "Discover ViralHookLab tools for TikTok hooks, scripts, captions, and CTAs—built to improve watch time, comments, and saves.",
    intro:
      "TikTok rewards retention and fast pattern interrupts—your first line and first two seconds matter more than anything. ViralHookLab helps you generate scroll-stopping hooks, caption lines that drive comments, and script starters you can batch for consistent posting. Use these tools to test multiple angles quickly: curiosity, proof, contrarian takes, and outcome-based openers.",
    expandedIntro:
      "TikTok has become the world's fastest-growing social platform with over 1.5 billion monthly active users in 2026. The platform's algorithm is uniquely democratic — any video from any creator can go viral if it captures attention and holds it. This makes TikTok the single best platform for organic growth, whether you are a solo creator, a brand, or an agency managing multiple accounts. The key metric TikTok's algorithm optimizes for is watch time. Videos that keep viewers watching past the first 3 seconds earn exponentially more distribution. This means your hook — the opening line and visual — is the most important creative asset in every video. Our AI tools help you generate proven hook patterns, caption formulas that drive comments, and script structures that maintain retention throughout the video.",
    faqs: [
      { question: "How do I write a viral TikTok hook?", answer: "Start with a curiosity gap, bold claim, or direct question in the first 2 seconds. Use specific numbers and outcomes to make your hook feel credible. Our AI Hook Generator creates five proven hook variations for any topic instantly." },
      { question: "What makes a good TikTok caption?", answer: "Good TikTok captions are short, add context to the video, and end with a prompt that encourages comments, saves, or shares. Keep the first line under 10 words since TikTok truncates longer captions in the feed." },
      { question: "How often should I post on TikTok?", answer: "Most growth experts recommend 1-3 posts per day for maximum algorithm exposure. Consistency matters more than volume — posting daily at the same times builds audience habits and algorithmic momentum." },
      { question: "Can AI tools help me grow on TikTok?", answer: "Yes. AI tools accelerate your ideation process by generating multiple hook, caption, and script variations in seconds. This lets you test more angles faster, which is the primary driver of TikTok growth." },
    ],
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "/youtube",
    seoTitle: "Best AI Tools for YouTube CTR & Growth",
    seoDescription:
      "Use ViralHookLab to generate YouTube titles, faceless channel ideas, and hook angles designed to improve CTR and discovery.",
    intro:
      "YouTube growth is a packaging game: titles, thumbnails, and the opening promise determine clicks and retention. ViralHookLab helps you generate high-CTR title angles, hook lines that match search intent, and faceless channel ideas with repeatable formats.",
    expandedIntro:
      "YouTube remains the world's second-largest search engine and the dominant platform for long-form video content, with over 2.5 billion logged-in users per month. Unlike social feeds where content is ephemeral, YouTube videos can generate views for years through search and suggested video placement. This makes YouTube one of the highest-ROI platforms for creators and businesses. The two metrics that matter most for YouTube growth are click-through rate (CTR) and average view duration. CTR is determined primarily by your title and thumbnail. Average view duration is determined by your content quality and structure, starting with the opening hook. Our tools generate title angles optimized for both search keywords and emotional appeal, hook lines that match viewer expectations, and faceless channel concepts with proven repeatable formats.",
    faqs: [
      { question: "How do I write YouTube titles that get more clicks?", answer: "Combine a primary keyword with a clear outcome and an emotional element. Keep titles between 50-65 characters. Use formats like 'How I [Result] in [Timeframe]' or '[Number] Mistakes That Kill Your [Goal].' Our YouTube Title Generator creates five optimized options for any topic." },
      { question: "What is a good CTR for YouTube videos?", answer: "Average YouTube CTR is 2-10% depending on niche and audience. Aim for above 5% on search-driven content and above 8% on browse content. Monitor CTR in YouTube Studio and rewrite titles that fall below your channel average." },
      { question: "Can I change my YouTube title after publishing?", answer: "Yes. If a video gets decent impressions but low CTR after 48 hours, update the title with a different angle. YouTube will re-evaluate the video and may push it to more viewers with the improved packaging." },
      { question: "What are faceless YouTube channels?", answer: "Faceless channels create content without showing the creator's face, using screen recordings, animations, stock footage, or AI-generated visuals. Popular niches include top-10 lists, educational explainers, and compilation channels." },
    ],
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "/instagram",
    seoTitle: "Best AI Tools for Instagram Reels & Profiles",
    seoDescription:
      "Generate Instagram Reels scripts, profile bios, and hook-driven content ideas with ViralHookLab—built for saves, shares, and follows.",
    intro:
      "Instagram growth comes from consistency and clarity: strong hooks, simple structure, and a clear call to action. ViralHookLab helps you generate Reel scripts with a hook-to-CTA flow, plus bios that communicate who you help, what result you deliver, and what to do next.",
    expandedIntro:
      "Instagram has evolved into a multi-format platform where Reels, Stories, carousels, and the traditional feed all compete for attention. With over 2 billion monthly active users, Instagram remains essential for personal brands, businesses, and creators who want to build visual authority and drive engagement. The platform's algorithm in 2026 heavily favors Reels for discovery and reach, making short-form video the primary growth lever. Your Instagram bio is your conversion page — it is the first thing new visitors see and determines whether they follow or leave. A well-structured bio communicates your identity, credibility, and next step in under three seconds. For Reels, the hook-to-CTA structure is critical: grab attention in the first second, deliver value in the body, and close with a clear action.",
    faqs: [
      { question: "How do I write a better Instagram bio?", answer: "Structure your bio in three lines: who you help and what result you deliver, one proof point or credential, and a single CTA directing visitors to your link. Our Instagram Bio Generator creates five professionally written options instantly." },
      { question: "What type of Instagram content gets the most reach?", answer: "Reels consistently get the highest reach on Instagram in 2026. The algorithm prioritizes Reels in the Explore tab and suggested content feeds. Combine Reels with carousel posts for saves and engagement." },
      { question: "How long should Instagram Reels be?", answer: "The ideal Reel length is 15-30 seconds for maximum retention and algorithmic distribution. Longer Reels (60-90 seconds) can work for tutorial content but require stronger hooks to maintain watch time." },
      { question: "How often should I post on Instagram?", answer: "Aim for 4-7 Reels per week and 2-3 carousel or feed posts. Consistency matters more than volume — a regular schedule trains the algorithm and your audience." },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    href: "/ecommerce",
    seoTitle: "Best AI Tools for E-commerce Copy That Converts",
    seoDescription:
      "Create product descriptions, Amazon listing copy, brand names, and slogans with ViralHookLab—optimized for conversion and clarity.",
    intro:
      "E-commerce copy wins when it makes value obvious fast: benefit-first language, scannable structure, and clear objection handling. ViralHookLab helps you generate product descriptions, Amazon-ready bullets, and brand assets like names and slogans so you can ship faster and test more angles.",
    expandedIntro:
      "E-commerce is projected to exceed $7 trillion in global sales by 2026, and the competition for every click and conversion has never been fiercer. The difference between a product page that converts at 1% and one that converts at 3% is entirely in the copy and presentation — that 2% gap can mean millions in revenue at scale. Product descriptions are your silent salesperson. They need to communicate the product's value instantly, address common objections, and create enough confidence for the visitor to click 'Add to Cart.' Our AI tools generate product descriptions, Amazon A+ content headlines, Etsy SEO titles, brand names, and slogans optimized for conversion. Each tool is built around ecommerce-specific copywriting frameworks that prioritize clarity, scannability, and persuasion.",
    faqs: [
      { question: "How do I write product descriptions that convert?", answer: "Lead with the core problem your product solves, map each feature to a customer benefit, use scannable bullet points, and close with a trust-building CTA. Our Product Description Generator follows this framework automatically." },
      { question: "What makes a good Amazon product listing?", answer: "A strong Amazon listing has a keyword-rich title under 200 characters, five benefit-focused bullet points, an A+ Content section, and a backend keyword set. Focus on search relevance and conversion in equal measure." },
      { question: "How important is the brand name for ecommerce?", answer: "Very important. A memorable, easy-to-spell brand name improves word-of-mouth referrals, ad recall, and repeat purchase rates. Use our Brand Name Generator to brainstorm options, then validate domain availability." },
      { question: "Can AI write better product copy than humans?", answer: "AI excels at generating multiple copy variations quickly, ideal for A/B testing. The best approach combines AI drafts with human review for brand voice and accuracy. Use AI for speed, humans for quality control." },
    ],
  },
  {
    id: "business-writing",
    label: "Business Writing",
    href: "/business-writing",
    seoTitle: "Best AI Tools for Business Writing & Marketing Copy",
    seoDescription:
      "Generate LinkedIn posts, X thread hooks, email subject A/B tests, ad headlines, blog titles, and CTAs with ViralHookLab.",
    intro:
      "Business writing is a distribution lever: the same idea performs wildly differently depending on the hook, structure, and CTA. ViralHookLab helps you generate LinkedIn post drafts, X thread hooks, email subject line A/B variants, and ad headlines designed to improve clicks and replies.",
    expandedIntro:
      "In B2B and professional contexts, the quality of your writing directly impacts revenue. A LinkedIn post that resonates can generate thousands of profile views and dozens of inbound leads. An email subject line that outperforms by just 5% in open rate can mean thousands more dollars in campaign revenue. An ad headline with higher CTR reduces your cost per acquisition. Our AI tools are built for these specific constraints. Each tool generates copy optimized for its platform: LinkedIn posts with engagement-driving hooks, X/Twitter threads with viral-worthy openers, email subject lines in A/B test pairs, ad headlines organized by messaging angle, blog titles matching search intent, and CTAs calibrated to funnel stage.",
    faqs: [
      { question: "How do I write LinkedIn posts that get engagement?", answer: "Start with a strong first line that creates curiosity or states a bold opinion before the 'see more' fold. Use short paragraphs, include a personal story or data point, and end with a question that invites comments." },
      { question: "What makes a good email subject line?", answer: "Good subject lines are specific, benefit-oriented, and under 50 characters. They create just enough curiosity to earn the open without being misleading. Test two variants per campaign and track open rates." },
      { question: "How can AI improve my ad headlines?", answer: "AI generates diverse headline angles (benefit, urgency, proof, curiosity) in seconds, giving you a larger testing pool. More variants tested means faster convergence on winning messages." },
      { question: "Are these tools suitable for B2B marketing?", answer: "Yes. Our business writing tools are designed for professional contexts including LinkedIn thought leadership, B2B email campaigns, Google Ads for SaaS, and blog content marketing." },
    ],
  },
  {
    id: "seo-marketing",
    label: "SEO & Marketing",
    href: "/seo-marketing",
    seoTitle: "Best AI Tools for SEO & Marketing",
    seoDescription:
      "Optimize meta descriptions, local SEO, lead magnets, user personas, and Quora answers with ViralHookLab—built for agencies and growth teams.",
    intro:
      "SEO and marketing copy drive discoverability and conversion. ViralHookLab helps you generate meta descriptions at scale, Google Business Profile copy for local visibility, user personas for targeting, lead magnet ideas for list building, and Quora answers tuned for lead generation.",
    expandedIntro:
      "Search engine optimization and digital marketing are the growth engines behind every successful online business. With over 8.5 billion Google searches per day, the opportunity to capture organic traffic is massive — but so is the competition. Meta descriptions influence click-through rate from search results. Google Business Profile descriptions determine local search visibility. Lead magnets drive email list growth. User personas sharpen your targeting and messaging. Our SEO and marketing tools help agencies, growth teams, and solo marketers produce these assets at scale. Every tool is designed to align copy with search intent — the most important factor in modern SEO success.",
    faqs: [
      { question: "How do I write meta descriptions that improve CTR?", answer: "Write meta descriptions under 155 characters that include the target keyword, a clear benefit, and a soft CTA. Match the description to the searcher's intent — informational queries need educational hooks, commercial queries need value propositions." },
      { question: "What is local SEO and why does it matter?", answer: "Local SEO optimizes your online presence for location-based searches like 'dentist near me.' It matters because 46% of Google searches have local intent, and the top 3 local results capture the majority of clicks." },
      { question: "How can AI help with SEO content?", answer: "AI accelerates keyword-to-copy workflows: generating meta descriptions at scale, writing optimized page titles, creating FAQ content for rich snippets, and drafting user personas for content targeting." },
      { question: "Are these tools useful for marketing agencies?", answer: "Absolutely. Agencies managing multiple clients can use our tools to generate meta descriptions, ad headlines, lead magnet ideas, and content briefs at scale with consistent quality." },
    ],
  },
];

export function getCategoryById(id: CategoryId) {
  return categories.find((category) => category.id === id) ?? null;
}
