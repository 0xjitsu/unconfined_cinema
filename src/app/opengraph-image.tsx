import { ImageResponse } from "next/og";

export const alt = "The Unconfined Cinema";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontFamily: "serif",
            fontWeight: 300,
            color: "#F5F0EB",
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          The Unconfined Cinema
        </div>
        <div
          style={{
            fontSize: 18,
            fontFamily: "sans-serif",
            color: "#8A8A8A",
            marginTop: "32px",
            letterSpacing: "0.1em",
          }}
        >
          Where Philippine Cinema Escapes the Screen
        </div>
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "#C8A97E",
            marginTop: "24px",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
