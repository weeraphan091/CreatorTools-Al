import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(120deg, #0f172a, #1e293b)",
          color: "#ffffff",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.9 }}>ViralHookLab.com</div>
        <div
          style={{
            marginTop: 16,
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>AI Tools for</span>
          <span>Viral Hooks & CTR</span>
        </div>
        <div style={{ marginTop: 20, fontSize: 30, opacity: 0.85 }}>
          YouTube Titles • TikTok Captions • Hooks • CTAs
        </div>
      </div>
    ),
    size,
  );
}
