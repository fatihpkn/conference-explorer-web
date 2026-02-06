"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import type { PaginatedResponse } from "@/entities/conference/client";

interface UseInfiniteScrollOptions<T> {
  initialData: T[];
  initialMeta: PaginatedResponse<T>["meta"];
  fetchMore: (page: number) => Promise<PaginatedResponse<T>>;
  onPageChange?: (page: number) => void;
  rootMargin?: string;
}

interface UseInfiniteScrollReturn<T> {
  items: T[];
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  isPending: boolean;
  hasMore: boolean;
}

export function useInfiniteScroll<T>({
  initialData,
  initialMeta,
  fetchMore,
  onPageChange,
  rootMargin = "200px",
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const [items, setItems] = useState<T[]>(initialData);
  const [meta, setMeta] = useState(initialMeta);
  const [isPending, startTransition] = useTransition();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Reset when initial data changes (filter change)
  useEffect(() => {
    setItems(initialData);
    setMeta(initialMeta);
  }, [initialData, initialMeta]);

  const hasMore = meta.page < meta.totalPages;

  const loadMore = useCallback(() => {
    if (isPending || !hasMore) return;

    const nextPage = meta.page + 1;

    startTransition(async () => {
      const response = await fetchMore(nextPage);
      setItems((prev) => [...prev, ...response.data]);
      setMeta(response.meta);
      onPageChange?.(response.meta.page);
    });
  }, [isPending, hasMore, meta.page, fetchMore, onPageChange]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin }
    );

    observer.observe(sentinel);

    return () => {
      observer.unobserve(sentinel);
      observer.disconnect();
    };
  }, [loadMore, rootMargin]);

  return { items, sentinelRef, isPending, hasMore };
}
