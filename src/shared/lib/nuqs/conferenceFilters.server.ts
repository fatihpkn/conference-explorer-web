import {
  createLoader,
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

import { defaultConferenceFilterState } from "@/features/conference-filter/types";

export const conferenceFilterParsers = {
  search: parseAsString.withDefault(defaultConferenceFilterState.search ?? ""),
  limit: parseAsInteger.withDefault(defaultConferenceFilterState.limit),
  tagId: parseAsInteger.withDefault(defaultConferenceFilterState.tagId ?? 0),
  page: parseAsInteger.withDefault(defaultConferenceFilterState.page),
  year: parseAsInteger.withDefault(defaultConferenceFilterState.year ?? 0),
  location: parseAsString.withDefault(
    defaultConferenceFilterState.location ?? ""
  ),
  speakerId: parseAsInteger.withDefault(
    defaultConferenceFilterState.speakerId ?? 0
  ),
};

export const searchParamsCache = createSearchParamsCache(
  conferenceFilterParsers
);

export const loadConferenceFilters = createLoader(conferenceFilterParsers);

export type ConferenceFiltersParsed = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
