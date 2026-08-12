import type { Metadata } from "next";
import PerspectivesPageSection from "@/components/perspectives/PerspectivesPageSection";

const title = "Perspectives | The Hedge Collective";
const description =
  "We monitor the entire geopolitical field to deliver attribution and cyber answers before a nation forms the question. Read our active defensive briefs.";
const url = "https://thehedgecollective.co.uk/perspectives";
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

export default function PerspectivesPage() {
  return (
    <main className="flex-1 bg-[#F4F0EA]">
      <PerspectivesPageSection />
    </main>
  );
}
