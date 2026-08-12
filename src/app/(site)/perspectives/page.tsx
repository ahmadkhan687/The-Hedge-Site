import type { Metadata } from "next";
import PerspectivesPageSection from "@/components/perspectives/PerspectivesPageSection";

export const metadata: Metadata = {
  title: "Perspectives | The Hedge Collective",
  description:
    "Silent on the work. Loud on the thinking. Judge the mind before you trust the hand.",
  alternates: {
    canonical: "https://thehedgecollective.co.uk/perspectives",
  },
  openGraph: {
    url: "https://thehedgecollective.co.uk/perspectives",
  },
};

export default function PerspectivesPage() {
  return (
    <main className="flex-1 bg-[#F4F0EA]">
      <PerspectivesPageSection />
    </main>
  );
}
