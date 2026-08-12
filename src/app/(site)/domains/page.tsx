import type { Metadata } from "next";
import DomainsPageSection from "@/components/domains/DomainsPageSection";

const title = "Domains | The Hedge Collective";
const description =
  "Three threats. Every scale. From synthetic narrative warfare to coordinated networks and engineered radicalisation.";
const url = "https://thehedgecollective.co.uk/domains";
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

export default function DomainsPage() {
  return (
    <main className="flex-1 bg-[#F4F0EA]">
      <DomainsPageSection />
    </main>
  );
}
