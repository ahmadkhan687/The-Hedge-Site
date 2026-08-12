import type { Metadata } from "next";
import AboutSection from "@/components/about/AboutSection";

const title = "About | The Hedge Collective";
const description =
  "We build sovereign intelligence. Owned by the state that uses it. Institutional-grade infrastructure designed for strategic independence.";
const url = "https://thehedgecollective.co.uk/about";
const shareImage = "https://thehedgecollective.co.uk/og/share-og.png?v=2";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    type: "website",
    title,
    description,
    url,
    images: [{ url: shareImage }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: shareImage }],
  },
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-[#F4F0EA]">
      <AboutSection />
    </main>
  );
}
