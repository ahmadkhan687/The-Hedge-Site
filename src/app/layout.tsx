import type { Metadata } from "next";
import {
  Archivo_Narrow,
  Barlow_Condensed,
  EB_Garamond,
  Inter,
  Schibsted_Grotesk,
} from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "800"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: "800",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
  weight: "600",
});

export const metadata: Metadata = {
  title: "The Hedge Collective",
  description: "The Hedge Collective",
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
      <body className="min-h-full overflow-x-clip flex flex-col bg-[#F4F0EA] text-black">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
