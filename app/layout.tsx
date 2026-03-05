import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "CreatorTools AI | Free AI Generators for Creators",
    template: "%s | CreatorTools AI",
  },
  description:
    "CreatorTools AI helps creators generate high converting titles, hooks, bios, ads, and more with AI.",
  openGraph: {
    title: "CreatorTools AI | Free AI Generators for Creators",
    description:
      "Create viral marketing content with 10 free AI tools for YouTube, TikTok, Instagram, blogs, and ads.",
    url: "https://creatortools-ai.vercel.app",
    siteName: "CreatorTools AI",
    type: "website",
  },
  metadataBase: new URL("https://creatortools-ai.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <main className="container-shell py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
