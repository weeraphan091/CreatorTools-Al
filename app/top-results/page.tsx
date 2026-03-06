import type { Metadata } from "next";
import TopResultsClient from "@/components/TopResultsClient";

export const metadata: Metadata = {
  title: "Saved Results",
  description:
    "View and reuse your saved AI results from ViralHookLab.com. Copy hooks, titles, captions, and CTAs in one place.",
  alternates: { canonical: "/top-results" },
  openGraph: {
    title: "Saved Results | ViralHookLab.com",
    description: "Your saved hooks, titles, captions, and CTAs in one place.",
    url: "/top-results",
  },
};

export default function TopResultsPage() {
  return <TopResultsClient />;
}

