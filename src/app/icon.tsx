import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#C8A97E",
          fontFamily: "serif",
          fontWeight: 300,
          letterSpacing: "-0.02em",
        }}
      >
        UC
      </div>
    ),
    { ...size }
  );
}
