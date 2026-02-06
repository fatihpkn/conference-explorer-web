"use client";

import { use, useCallback, ViewTransition } from "react";
import { useQueryStates } from "nuqs";
import { ConferenceCard, ConferenceCardSkeleton } from "../ui";
import type {
  ConferenceListItem,
  PaginatedResponse,
} from "@/entities/conference/client";
import { conferenceFilterParsers } from "@/features/conference-filter/lib/conferenceFilters.client";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { fetchMoreConferences } from "../actions/fetchMoreConferences";

interface ConferencesListProps {
  conferencesPromise: Promise<PaginatedResponse<ConferenceListItem>>;
}

export default function ConferencesList({
  conferencesPromise,
}: ConferencesListProps) {
  const { data: initialData, meta: initialMeta } = use(conferencesPromise);

  const [filters, setFilters] = useQueryStates(conferenceFilterParsers, {
    shallow: true,
  });

  const fetchMore = useCallback(
    (page: number) =>
      fetchMoreConferences({
        limit: filters.limit,
        page,
        search: filters.search || undefined,
        tagId: filters.tagId || undefined,
        year: filters.year || undefined,
        location: filters.location || undefined,
        speakerId: filters.speakerId || undefined,
      }),
    [
      filters.limit,
      filters.search,
      filters.tagId,
      filters.year,
      filters.location,
      filters.speakerId,
    ]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setFilters({ page }, { shallow: true });
    },
    [setFilters]
  );

  const { items, sentinelRef, isPending, hasMore } = useInfiniteScroll({
    initialData,
    initialMeta,
    fetchMore,
    onPageChange: handlePageChange,
  });

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <ViewTransition>
            {items.map((conference) => (
              <ConferenceCard key={conference.id} conference={conference} />
            ))}

            {isPending &&
              Array.from({ length: 2 }).map((_, index) => (
                <ConferenceCardSkeleton key={`loading-${index}`} />
              ))}
          </ViewTransition>
        </div>
      </div>

      <div ref={sentinelRef} aria-hidden="true" className="h-4" />

      {!hasMore && !isPending && items.length > 0 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0d7ff2]/10 rounded-full text-[#0d7ff2]">
            <div className="w-2 h-2 rounded-full bg-[#0d7ff2] animate-pulse" />
            <span className="text-sm font-medium">
              Tüm konferanslar yüklendi
            </span>
          </div>
        </div>
      )}

      {items.length === 0 && !isPending && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#223649]/10 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#223649]/20" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Konferans bulunamadı
          </h3>
          <p className="text-sm text-[#90adcb]">
            Filtrelerinizi değiştirmeyi deneyin
          </p>
        </div>
      )}
    </div>
  );
}
