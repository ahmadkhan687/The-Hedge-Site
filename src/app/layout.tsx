import type { Metadata } from "next";
import {
  Archivo_Narrow,
  Barlow_Condensed,
  EB_Garamond,
  Inter,
  Schibsted_Grotesk,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "800"],
  display: "swap",
  preload: true,
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: "800",
  display: "swap",
  preload: false,
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  preload: false,
});

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
  weight: "600",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "The Hedge Collective",
  description: "The Hedge Collective",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlowCondensed.variable} ${ebGaramond.variable} ${archivoNarrow.variable} ${schibstedGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-[#F4F0EA] text-black">
        {children}
      </body>
    </html>
  );
}
