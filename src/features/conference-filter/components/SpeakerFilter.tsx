"use client";

import type { Speaker } from "@/shared/lib/db/types/speaker.type";
import { conferenceFilterParsers } from "../lib/conferenceFilters.client";
import { Select, SelectItem } from "@heroui/react";
import { useQueryState } from "nuqs";
import { use, useTransition } from "react";
import { selectClassNames } from "./selectStyles";

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
      label="Speaker"
      selectedKeys={speakerId ? [String(speakerId)] : []}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        setSpeakerId(selected ? Number(selected) : null);
      }}
      classNames={selectClassNames}
      isClearable
    >
      {speakers.map((speaker) => (
        <SelectItem key={String(speaker.id)}>{speaker.name}</SelectItem>
      ))}
    </Select>
  );
}
