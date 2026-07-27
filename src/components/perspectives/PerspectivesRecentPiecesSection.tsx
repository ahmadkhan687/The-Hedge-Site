import RecentPiecesClient from "@/components/perspectives/RecentPiecesClient";
import { getPublishedArticles } from "@/lib/articles-api";

export default async function PerspectivesRecentPiecesSection() {
  const articles = await getPublishedArticles();

  return (
    <section className="px-5 py-16 sm:px-8 lg:px-[120px] lg:py-24">
      <div className="mx-auto flex w-full max-w-[1488px] flex-col gap-12">
        <div className="h-px w-full bg-[#111]/[0.08]" />
        <RecentPiecesClient articles={articles} />
      </div>
    </section>
  );
}
