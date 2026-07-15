import type { Metadata } from "next";
import DomainsPageSection from "@/components/domains/DomainsPageSection";

export const metadata: Metadata = {
  title: "Domains | The Hedge Collective",
  description:
    "Three threats. Every scale. From synthetic narrative warfare to coordinated networks and engineered radicalisation.",
};

export default function DomainsPage() {
  return (
    <main className="flex-1 bg-[#F4F0EA]">
      <DomainsPageSection />
    </main>
  );
}
