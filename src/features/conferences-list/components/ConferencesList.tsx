"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useQueryState } from "nuqs";
import { ConferenceCard, ConferenceCardSkeleton } from "../ui";
import type {
  ConferenceListItem,
  PaginatedResponse,
} from "@/entities/conference/client";
import { fetchConferencesClient } from "@/entities/conference/client";
import { conferenceFilterParsers } from "@/features/conference-filter/lib/conferenceFilters.client";

interface ConferencesListProps {
  initialData: ConferenceListItem[];
  initialMeta: PaginatedResponse<ConferenceListItem>["meta"];
  filters: {
    search?: string;
    tagId?: number;
    year?: number;
    location?: string;
    speakerId?: number;
  };
  limit: number;
}

export default function ConferencesList({
  initialData,
  initialMeta,
  filters,
  limit,
}: ConferencesListProps) {
  const [isPending, startTransition] = useTransition();

  const [conferences, setConferences] = useState(initialData);
  const [meta, setMeta] = useState(initialMeta);
  const [, setPageQuery] = useQueryState(
    "page",
    conferenceFilterParsers.page.withOptions({ shallow: true })
  );

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setConferences(initialData);
    setMeta(initialMeta);
  }, [initialData, initialMeta, filters]);

  const hasMore = useMemo(() => {
    return (meta.page ?? 1) < (meta.totalPages ?? 1);
  }, [meta.page, meta.totalPages]);

  const fetchNextPage = useCallback(async () => {
    if (isPending || !hasMore) return;
    const nextPage = (meta.page ?? 1) + 1;
    try {
      startTransition(async () => {
        const body = await fetchConferencesClient({
          limit,
          page: nextPage,
          search: filters.search,
          tagId: filters.tagId,
          year: filters.year,
          location: filters.location,
          speakerId: filters.speakerId,
        });
        setConferences((prev) => [...prev, ...body.data]);
        setMeta(body.meta);
        setPageQuery(body.meta.page);
      });
    } catch (error) {
      console.error(error);
    }
  }, [
    hasMore,
    meta.page,
    filters.search,
    filters.tagId,
    filters.year,
    filters.location,
    filters.speakerId,
    limit,
    setPageQuery,
    isPending,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    const current = loadMoreRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
      observer.disconnect();
    };
  }, [fetchNextPage]);

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {conferences.map((conference) => (
            <ConferenceCard key={conference.id} conference={conference} />
          ))}

          {isPending &&
            Array.from({ length: 2 }).map((_, index) => (
              <ConferenceCardSkeleton key={`loading-${index}`} />
            ))}
        </div>
      </div>

      <div ref={loadMoreRef} aria-hidden="true" className="h-4" />

      {!hasMore && !isPending && conferences.length > 0 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0d7ff2]/10 rounded-full text-[#0d7ff2]">
            <div className="w-2 h-2 rounded-full bg-[#0d7ff2] animate-pulse" />
            <span className="text-sm font-medium">
              Tüm konferanslar yüklendi
            </span>
          </div>
        </div>
      )}

      {conferences.length === 0 && !isPending && (
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
