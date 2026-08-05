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

const SITE_URL = "https://thehedgecollective.co.uk";
const SITE_TITLE =
  "The Hedge Collective | Strategic Intelligence for the AI Era";
const SITE_DESCRIPTION =
  "Silent on the work. Loud on the thinking. Judge the mind before you trust the hand.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | The Hedge Collective",
  },
  description: SITE_DESCRIPTION,
  applicationName: "The Hedge Collective",
  authors: [{ name: "The Hedge Collective" }],
  keywords: [
    "strategic intelligence",
    "AI",
    "geopolitics",
    "cybersecurity",
    "sovereignty",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "The Hedge Collective",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
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
