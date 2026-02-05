"use client";

import { use, useTransition } from "react";
import { useQueryState } from "nuqs";
import { conferenceFilterParsers } from "@/shared/lib/nuqs/conferenceFilters.client";
import type { Speaker } from "@/shared/lib/db/types/speaker.type";
import { Select, SelectItem } from "@heroui/react";

interface SpeakerFilterProps {
  speakersPromise: Promise<Speaker[]>;
}

export default function SpeakerFilter({ speakersPromise }: SpeakerFilterProps) {
  const [isLoading, startTransition] = useTransition();
  const [speakerId, setSpeakerId] = useQueryState(
    "speakerId",
    conferenceFilterParsers.speakerId.withOptions({
      startTransition,
      shallow: false,
    })
  );

  const speakers = use(speakersPromise);

  return (
    <Select
      label="Konuşmacı"
      placeholder="Tüm Konuşmacılar"
      selectedKeys={speakerId ? [String(speakerId)] : []}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        setSpeakerId(selected ? Number(selected) : null);
      }}
      classNames={{
        trigger: "h-12",
      }}
      isClearable
    >
      <>
        {speakers.map((speaker) => (
          <SelectItem key={String(speaker.id)}>{speaker.name}</SelectItem>
        ))}
      </>
    </Select>
  );
}
