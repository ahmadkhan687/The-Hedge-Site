import type { Metadata } from "next";
import PakistanAdminGeographyStudyLanding from "@/components/perspectives/PakistanAdminGeographyStudyLanding";
import StudyPasswordGate from "@/components/perspectives/StudyPasswordGate";
import { hasStudyAccess, isStudyPasswordConfigured } from "@/lib/study-access";

const title = "Pakistan’s Administrative Geography | The Hedge Collective";
const description =
  "A directional study of youth discussion around creating additional provinces, with national, provincial, divisional and district-level variation.";
const url =
  "https://thehedgecollective.co.uk/perspectives/pakistan-administrative-geography-study";
const shareImage = "https://thehedgecollective.co.uk/og/share-og.png?v=2";

export const metadata: Metadata = {
  title,
  description,
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: url,
  },
  openGraph: {
    type: "article",
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

export default async function PakistanAdminGeographyStudyPage() {
  if (!isStudyPasswordConfigured()) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-[#F7F5EF] px-5 py-16">
        <p className="max-w-md font-inter text-sm text-[#45413C]">
          This briefing is not available yet. Access has not been configured.
        </p>
      </main>
    );
  }

  const unlocked = await hasStudyAccess();
  if (!unlocked) {
    return <StudyPasswordGate />;
  }

  return <PakistanAdminGeographyStudyLanding />;
}
