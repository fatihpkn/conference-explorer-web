import {
  getConferences,
  getTags,
  getYears,
  getLocations,
  getSpeakers,
} from "@/entities/conference";
import type {
  ConferenceListItem,
  PaginatedResponse,
} from "@/entities/conference";
import ConferenceFilter from "@/features/conference-filter/components/ConferenceFilter";
import ConferencesList from "@/features/conferences-list/components/ConferencesList";
import ConferenceSkeleton from "@/features/conferences-list/ui/skeleton";
import { searchParamsCache } from "@/shared/lib/nuqs/conferenceFilters.server";
import { Suspense } from "react";

interface FilterableConferencesListProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function FilterableConferencesList({
  searchParams,
}: FilterableConferencesListProps) {
  const { limit, search, tagId, year, location, speakerId, page } =
    await searchParamsCache.parse(searchParams);

  const normalizedFilters = {
    search: search?.trim() ? search : undefined,
    tagId: tagId && tagId > 0 ? tagId : undefined,
    year: year || undefined,
    location: location?.trim() ? location : undefined,
    speakerId: speakerId || undefined,
  };

  const initialDataPromise = loadInitialConferences({
    limit,
    page,
    filters: normalizedFilters,
  });

  const tagsPromise = getTags();
  const yearsPromise = getYears();
  const locationsPromise = getLocations();
  const speakersPromise = getSpeakers();

  return (
    <div className="space-y-6">
      <ConferenceFilter
        tagsPromise={tagsPromise}
        yearsPromise={yearsPromise}
        locationsPromise={locationsPromise}
        speakersPromise={speakersPromise}
      />
      <Suspense fallback={<ConferenceSkeleton count={limit} />}>
        <ConferencesListSection
          dataPromise={initialDataPromise}
          filters={normalizedFilters}
          limit={limit}
        />
      </Suspense>
    </div>
  );
}

async function loadInitialConferences({
  limit,
  page,
  filters,
}: {
  limit: number;
  page: number;
  filters: {
    search?: string;
    tagId?: number;
    year?: number;
    location?: string;
    speakerId?: number;
  };
}): Promise<PaginatedResponse<ConferenceListItem>> {
  const targetPage = Math.max(page ?? 1, 1);
  const aggregatedData: ConferenceListItem[] = [];
  let latestMeta: PaginatedResponse<ConferenceListItem>["meta"] | null = null;

  for (let currentPage = 1; currentPage <= targetPage; currentPage++) {
    const response = await getConferences({
      limit,
      page: currentPage,
      ...filters,
    });

    aggregatedData.push(...response.data);
    latestMeta = response.meta;

    if (response.meta.page >= response.meta.totalPages) {
      break;
    }
  }

  const initialMeta =
    latestMeta ??
    ({
      total: 0,
      page: 1,
      limit,
      totalPages: 0,
    } satisfies PaginatedResponse<ConferenceListItem>["meta"]);

  return {
    data: aggregatedData,
    meta: initialMeta,
  };
}

async function ConferencesListSection({
  dataPromise,
  filters,
  limit,
}: {
  dataPromise: Promise<PaginatedResponse<ConferenceListItem>>;
  filters: {
    search?: string;
    tagId?: number;
    year?: number;
    location?: string;
    speakerId?: number;
  };
  limit: number;
}) {
  const { data, meta } = await dataPromise;

  return (
    <ConferencesList
      initialData={data}
      initialMeta={meta}
      filters={filters}
      limit={limit}
    />
  );
}
