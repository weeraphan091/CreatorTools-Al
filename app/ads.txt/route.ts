import { NextResponse } from "next/server";

function getPublisherIdFromClient(client?: string) {
  if (!client) return null;
  const normalized = client.trim();
  if (!normalized) return null;
  if (normalized.startsWith("ca-pub-")) {
    return `pub-${normalized.replace("ca-pub-", "")}`;
  }
  if (normalized.startsWith("pub-")) {
    return normalized;
  }
  return null;
}

export function GET() {
  const publisherId =
    process.env.ADSENSE_PUBLISHER_ID ||
    process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ||
    getPublisherIdFromClient(process.env.NEXT_PUBLIC_ADSENSE_CLIENT) ||
    "";

  const lines: string[] = [];

  if (publisherId) {
    lines.push(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0`);
  } else {
    // Keep ads.txt reachable even before AdSense is configured.
    lines.push("# ads.txt is not configured yet.");
    lines.push("# Set NEXT_PUBLIC_ADSENSE_CLIENT (ca-pub-XXXX) or ADSENSE_PUBLISHER_ID (pub-XXXX).");
  }

  return new NextResponse(lines.join("\n") + "\n", {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

