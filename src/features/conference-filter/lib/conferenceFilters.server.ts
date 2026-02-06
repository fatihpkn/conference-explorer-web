import { createLoader, createSearchParamsCache } from "nuqs/server";
import { conferenceFilterParsers } from "./parsers";

export { conferenceFilterParsers } from "./parsers";

export const searchParamsCache = createSearchParamsCache(
  conferenceFilterParsers
);

export const loadConferenceFilters = createLoader(conferenceFilterParsers);

export type ConferenceFiltersParsed = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
