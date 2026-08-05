import { readFile } from "fs/promises";
import { join } from "path";
import { ImageResponse } from "next/og";

export const alt = "The Hedge Collective | Strategic Intelligence for the AI Era";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [logoBuf, globeBuf] = await Promise.all([
    readFile(join(process.cwd(), "public/og/logo.png")),
    readFile(join(process.cwd(), "public/og/globe-line.png")),
  ]);

  const logoSrc = `data:image/png;base64,${logoBuf.toString("base64")}`;
  const globeSrc = `data:image/png;base64,${globeBuf.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "#F5F2EB",
          backgroundImage:
            "linear-gradient(to right, rgba(17,17,17,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.045) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={globeSrc}
          alt=""
          width={740}
          height={740}
          style={{
            position: "absolute",
            left: "50%",
            top: "48%",
            transform: "translate(-50%, -50%)",
            opacity: 0.5,
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt=""
          width={96}
          height={96}
          style={{
            position: "absolute",
            left: 44,
            top: 36,
            objectFit: "contain",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            zIndex: 1,
            padding: "0 64px",
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 62,
              letterSpacing: "0.06em",
              color: "#111111",
              textAlign: "center",
              textTransform: "uppercase",
              lineHeight: 1.05,
            }}
          >
            THE HEDGE COLLECTIVE
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{ width: 56, height: 1, backgroundColor: "#C6A02C" }}
            />
            <div
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 28,
                color: "#3A3834",
                textAlign: "center",
              }}
            >
              Strategic Intelligence for the AI Era
            </div>
            <div
              style={{ width: 56, height: 1, backgroundColor: "#C6A02C" }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
