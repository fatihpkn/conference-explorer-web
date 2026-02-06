"use client";

import { createSerializer } from "nuqs";
import { conferenceFilterParsers } from "./parsers";

export { conferenceFilterParsers } from "./parsers";

export const serializeConferenceFilters = createSerializer(
  conferenceFilterParsers,
  { clearOnDefault: true }
);
