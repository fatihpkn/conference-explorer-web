import { getFeaturedTags, getConferences } from "@/entities/conference";
import ConferenceSection from "@/features/conferences-section/components/ConferenceSection";
import ConferenceSectionSkeleton from "@/features/conferences-section/ui/skeleton";
import ConferenceSectionHeadline from "@/features/conferences-section/components/Headline";
import { Suspense } from "react";

interface FeaturedConferencesProps {
  limit?: number;
}

export default async function FeaturedConferences({
  limit = 5,
}: FeaturedConferencesProps) {
  const featuredTags = await getFeaturedTags(limit);

  if (featuredTags.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Yaklaşan konferans bulunamadı
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {featuredTags.map((tag) => {
        const conferencesPromise = getConferences({
          tagId: tag.id,
          limit: 4,
        });

        return (
          <section
            key={tag.id}
            className="space-y-2 pb-10 border-b border-default/10"
          >
            <ConferenceSectionHeadline tag={tag} />
            <Suspense fallback={<ConferenceSectionSkeleton count={4} />}>
              <ConferenceSection conferencesPromise={conferencesPromise} />
            </Suspense>
          </section>
        );
      })}
    </div>
  );
}
