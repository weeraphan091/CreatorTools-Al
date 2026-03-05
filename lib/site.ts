export const siteConfig = {
  name: "CreatorTools AI",
  description:
    "Free AI generators for YouTube titles, TikTok captions, hooks, bios, ad copy, and more.",
  url: "https://creatortools-ai.vercel.app",
  locale: "en_US",
  creator: "CreatorTools AI",
  twitterHandle: "@creatortoolsai",
  keywords: [
    "youtube title generator",
    "tiktok caption generator",
    "ai hook generator",
    "instagram bio generator",
    "ad headline generator",
    "blog title generator",
    "product description generator",
    "brand name generator",
    "slogan generator",
    "call to action generator",
  ],
};

export function absoluteUrl(pathname: string) {
  return `${siteConfig.url}${pathname}`;
}
