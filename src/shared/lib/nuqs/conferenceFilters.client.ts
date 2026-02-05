"use client";

import {
  createSerializer,
  parseAsInteger,
  parseAsString,
} from "nuqs";
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

export const serializeConferenceFilters = createSerializer(
  conferenceFilterParsers,
  { clearOnDefault: true }
);
