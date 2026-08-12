import type { Metadata } from "next";
import SovereigntyPageSection from "@/components/sovereignty/SovereigntyPageSection";

const title = "Sovereignty | The Hedge Collective";
const description =
  "See. Judge. Own. Sovereign intelligence infrastructure, engineered for those who act with authority.";
const url = "https://thehedgecollective.co.uk/sovereignty";
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

export default function SovereigntyPage() {
  return (
    <main className="flex-1 bg-[#F4F0EA]">
      <SovereigntyPageSection />
    </main>
  );
}
