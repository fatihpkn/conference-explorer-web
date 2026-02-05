"use client";

import type { Speaker } from "@/shared/lib/db/types/speaker.type";
import type { Tag } from "@/shared/lib/db/types/tag.type";
import { conferenceFilterParsers } from "@/shared/lib/nuqs/conferenceFilters.client";
import { useQueryState } from "nuqs";
import { Suspense, useTransition } from "react";
import FilterSkeleton from "../ui/FilterSkeleton";
import LocationFilter from "./LocationFilter";
import SearchFilter from "./SearchFilter";
import SpeakerFilter from "./SpeakerFilter";
import TagFilter from "./TagFilter";
import YearFilter from "./YearFilter";

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
  const [, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useQueryState(
    "search",
    conferenceFilterParsers.search.withOptions({
      startTransition,
      shallow: false,
    })
  );

  return (
    <div className="mt-2 lg:mt-10">
      <div className="space-y-8">
        <SearchFilter
          value={searchQuery ?? ""}
          onChange={(value) =>
            startTransition(() => {
              void setSearchQuery(value && value.length > 0 ? value : null);
            })
          }
        />

        {/* <div className="grid grid-cols-4 items-center gap-3">
          <Suspense fallback={<FilterSkeleton />}>
            <YearFilter yearsPromise={yearsPromise} />
          </Suspense>
          <Suspense fallback={<FilterSkeleton />}>
            <SpeakerFilter speakersPromise={speakersPromise} />
          </Suspense>
          <Suspense fallback={<FilterSkeleton />}>
            <TagFilter tagsPromise={tagsPromise} />
          </Suspense>
          <Suspense fallback={<FilterSkeleton />}>
            <LocationFilter locationsPromise={locationsPromise} />
          </Suspense>
        </div> */}
      </div>
    </div>
  );
}
