"use client";

import { Suspense } from "react";
import type { Tag } from "@/shared/lib/db/types/tag.type";
import type { Speaker } from "@/shared/lib/db/types/speaker.type";
import SearchFilter from "./SearchFilter";
import TagFilter from "./TagFilter";
import YearFilter from "./YearFilter";
import LocationFilter from "./LocationFilter";
import SpeakerFilter from "./SpeakerFilter";
import FilterSkeleton from "../ui/FilterSkeleton";

interface ConferenceFilterProps {
  tagsPromise: Promise<Tag[]>;
  yearsPromise: Promise<number[]>;
  locationsPromise: Promise<string[]>;
  speakersPromise: Promise<Speaker[]>;
}

export default function ConferenceFilter({
  tagsPromise,
  yearsPromise,
  locationsPromise,
  speakersPromise,
}: ConferenceFilterProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <SearchFilter />

        <Suspense fallback={<FilterSkeleton />}>
          <TagFilter tagsPromise={tagsPromise} />
        </Suspense>

        {/* Year Filter */}
        <Suspense fallback={<FilterSkeleton />}>
          <YearFilter yearsPromise={yearsPromise} />
        </Suspense>

        {/* Location Filter */}
        <Suspense fallback={<FilterSkeleton />}>
          <LocationFilter locationsPromise={locationsPromise} />
        </Suspense>

        {/* Speaker Filter */}
        <Suspense fallback={<FilterSkeleton />}>
          <SpeakerFilter speakersPromise={speakersPromise} />
        </Suspense>
      </div>
    </div>
  );
}
