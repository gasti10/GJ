import { ImageResponse } from "next/og";

const SPACE_MONO_BOLD_URL =
  "https://fonts.gstatic.com/s/spacemono/v17/i7dMIFZifjKcF5UAWdDRaPpZYFI.ttf";

let fontDataPromise: Promise<ArrayBuffer> | null = null;

function loadSpaceMonoBold() {
  if (!fontDataPromise) {
    fontDataPromise = fetch(SPACE_MONO_BOLD_URL).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load Space Mono for brand icon");
      }
      return response.arrayBuffer();
    });
  }

  return fontDataPromise;
}

export async function createBrandIcon(size: number) {
  const fontData = await loadSpaceMonoBold();
  const fontSize = Math.round(size * 0.34);
  const letterSpacing = size >= 64 ? "0.18em" : "0.14em";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#ffffff",
          fontFamily: "Space Mono",
          fontSize,
          fontWeight: 700,
          letterSpacing,
          textTransform: "uppercase",
        }}
      >
        GJ
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [
        {
          name: "Space Mono",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
