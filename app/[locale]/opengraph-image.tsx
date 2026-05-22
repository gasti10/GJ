import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#121110",
          color: "#f5f0eb",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#e0684f",
          }}
        >
          Gastón Jouglard
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Full Stack Developer
          </div>
          <div style={{ fontSize: 28, color: "#9a948d", maxWidth: 800 }}>
            I build software people actually use.
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#9a948d" }}>gjouglard.com.ar</div>
      </div>
    ),
    { ...size },
  );
}
