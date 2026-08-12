import type { Metadata } from "next";
import RequestAccessSection from "@/components/request-access/RequestAccessSection";

const title = "Request Access | The Hedge Collective";
const description =
  "See for yourself. Request a briefing held in confidence. For governments and institutions building sovereign capability.";
const url = "https://thehedgecollective.co.uk/request-access";
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

export default function RequestAccessPage() {
  return (
    <main className="flex-1 bg-[#F4F0EA]">
      <RequestAccessSection />
    </main>
  );
}
