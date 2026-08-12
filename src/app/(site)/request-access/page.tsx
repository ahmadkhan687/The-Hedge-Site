import type { Metadata } from "next";
import RequestAccessSection from "@/components/request-access/RequestAccessSection";

export const metadata: Metadata = {
  title: "Request Access | The Hedge Collective",
  description:
    "See for yourself. Request a briefing held in confidence. For governments and institutions building sovereign capability.",
  alternates: {
    canonical: "https://thehedgecollective.co.uk/request-access",
  },
  openGraph: {
    url: "https://thehedgecollective.co.uk/request-access",
  },
};

export default function RequestAccessPage() {
  return (
    <main className="flex-1 bg-[#F4F0EA]">
      <RequestAccessSection />
    </main>
  );
}
