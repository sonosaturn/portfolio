import { ImageResponse } from "next/og";
import { site } from "./site";

// Shared Open Graph image renderer (1200×630) used by the root and per-project
// OG routes. Palette mirrors the site: warm near-black + amber accent.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function renderOg({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#171510",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#c9a227", letterSpacing: 1 }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 24 ? 84 : 104,
              fontWeight: 700,
              color: "#ece6da",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#a39a88", lineHeight: 1.35, maxWidth: 900 }}>
            {subtitle}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, color: "#a39a88" }}>
          <span style={{ color: "#ece6da" }}>{site.name.toLowerCase()}</span>
          <span style={{ color: "#c9a227" }}>.</span>
          <span style={{ marginLeft: 20 }}>{site.url.replace("https://", "")}</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
