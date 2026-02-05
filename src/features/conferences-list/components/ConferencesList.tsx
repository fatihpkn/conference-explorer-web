"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueryState } from "nuqs";
import { ConferenceCard, ConferenceSkeleton } from "../ui";
import type {
  ConferenceListItem,
  PaginatedResponse,
} from "@/entities/conference";
import {
  conferenceFilterParsers,
  serializeConferenceFilters,
} from "@/shared/lib/nuqs/conferenceFilters.client";

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
  const [conferences, setConferences] = useState(initialData);
  const [meta, setMeta] = useState(initialMeta);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(initialMeta.page ?? 1);
  const [pageQuery, setPageQuery] = useQueryState(
    "page",
    conferenceFilterParsers.page.withOptions({ shallow: true })
  );

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setConferences(initialData);
    setMeta(initialMeta);
    setPage(initialMeta.page ?? 1);
  }, [initialData, initialMeta, filters]);

  useEffect(() => {
    if (!pageQuery || Number.isNaN(pageQuery)) {
      return;
    }
    setPage(pageQuery);
  }, [pageQuery]);

  const hasMore = useMemo(() => {
    return page < meta.totalPages;
  }, [page, meta.totalPages]);

  const fetchNextPage = useCallback(async () => {
    if (isLoading || !hasMore) return;
    const nextPage = page + 1;
    setIsLoading(true);
    try {
      const requestUrl = serializeConferenceFilters("/api/conferences", {
        limit,
        page: nextPage,
        search: filters.search ?? null,
        tagId: filters.tagId ?? null,
        year: filters.year ?? null,
        location: filters.location ?? null,
        speakerId: filters.speakerId ?? null,
      });
      const response = await fetch(requestUrl);
      if (!response.ok) {
        throw new Error("Konferanslar yüklenirken bir hata oluştu");
      }
      const body =
        (await response.json()) as PaginatedResponse<ConferenceListItem>;
      setConferences((prev) => [...prev, ...body.data]);
      setMeta(body.meta);
      setPage(body.meta.page);
      setPageQuery(body.meta.page);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [
    isLoading,
    hasMore,
    page,
    filters.search,
    filters.tagId,
    filters.year,
    filters.location,
    filters.speakerId,
    limit,
    setPageQuery,
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
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
        {conferences.map((conference) => (
          <ConferenceCard key={conference.id} conference={conference} />
        ))}
      </div>
      <div ref={loadMoreRef} aria-hidden="true" className="h-2" />
      {isLoading && <ConferenceSkeleton count={limit} />}
      {!hasMore && !isLoading && (
        <p className="text-center text-sm text-default-foreground/70">
          Tüm konferanslar yüklendi.
        </p>
      )}
    </div>
  );
}
