import type { Metadata } from "next";
import PrivacyPolicySection from "@/components/privacy/PrivacyPolicySection";

const title = "Privacy Policy | The Hedge Collective";
const description =
  "How The Hedge Collective handles personal information across our website and communications.";
const url = "https://thehedgecollective.co.uk/privacy";
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

export default function PrivacyPage() {
  return (
    <main className="flex-1 bg-[#F4F0EA]">
      <PrivacyPolicySection />
    </main>
  );
}
