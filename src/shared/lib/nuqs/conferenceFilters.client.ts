"use client";

import { createSerializer, parseAsInteger, parseAsString } from "nuqs";
import { defaultConferenceFilterState } from "@/features/conference-filter/types";
import { startTransition } from "react";

export const conferenceFilterParsers = {
  search: parseAsString
    .withDefault(defaultConferenceFilterState.search ?? "")
    .withOptions({
      startTransition: startTransition,
      limitUrlUpdates: {
        method: "debounce",
        timeMs: 240,
      },
    }),
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
