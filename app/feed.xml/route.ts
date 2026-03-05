import { NextResponse } from "next/server";
import { blogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { templatePages } from "@/lib/templates";

export async function GET() {
  const now = new Date().toUTCString();

  const blogItems = blogPosts.map(
    (post) => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <description><![CDATA[${post.description}]]></description>
        <link>${siteConfig.url}/blog/${post.slug}</link>
        <guid>${siteConfig.url}/blog/${post.slug}</guid>
        <pubDate>${now}</pubDate>
      </item>
    `,
  );

  const templateItems = templatePages.slice(0, 10).map(
    (page) => `
      <item>
        <title><![CDATA[${page.title}]]></title>
        <description><![CDATA[${page.description}]]></description>
        <link>${siteConfig.url}/templates/${page.slug}</link>
        <guid>${siteConfig.url}/templates/${page.slug}</guid>
        <pubDate>${now}</pubDate>
      </item>
    `,
  );

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${siteConfig.name}</title>
        <description>${siteConfig.description}</description>
        <link>${siteConfig.url}</link>
        ${[...blogItems, ...templateItems].join("")}
      </channel>
    </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
