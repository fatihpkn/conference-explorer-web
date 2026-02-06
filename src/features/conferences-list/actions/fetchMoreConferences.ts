"use server";

import { getConferences } from "@/entities/conference";
import type {
  ConferenceFilters,
  ConferenceListItem,
  PaginatedResponse,
} from "@/entities/conference";

export async function fetchMoreConferences(
  filters: ConferenceFilters
): Promise<PaginatedResponse<ConferenceListItem>> {
  return getConferences(filters);
}
