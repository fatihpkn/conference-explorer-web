import { serializeConferenceFilters } from "@/shared/lib/nuqs/conferenceFilters.client";
import type {
  ConferenceFilters,
  ConferenceListItem,
  PaginatedResponse,
} from "../model/types";

export interface ClientConferenceFetchParams extends ConferenceFilters {
  limit: number;
  page: number;
}

export async function fetchConferencesClient(
  params: ClientConferenceFetchParams
): Promise<PaginatedResponse<ConferenceListItem>> {
  const requestUrl = serializeConferenceFilters("/api/conferences", {
    limit: params.limit,
    page: params.page,
    search: params.search ?? null,
    tagId: params.tagId ?? null,
    year: params.year ?? null,
    location: params.location ?? null,
    speakerId: params.speakerId ?? null,
  });

  const response = await fetch(requestUrl);

  if (!response.ok) {
    throw new Error("Konferanslar yüklenirken bir hata oluştu");
  }

  return (await response.json()) as PaginatedResponse<ConferenceListItem>;
}
