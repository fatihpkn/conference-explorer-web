"use client";

import { use, useTransition } from "react";
import { useQueryState } from "nuqs";
import { conferenceFilterParsers } from "@/shared/lib/nuqs/conferenceFilters.client";
import type { Tag } from "@/shared/lib/db/types/tag.type";
import { Select, SelectItem } from "@heroui/react";

interface TagFilterProps {
  tagsPromise: Promise<Tag[]>;
}

export default function TagFilter({ tagsPromise }: TagFilterProps) {
  const tags = use(tagsPromise);
  const [isLoading, startTransition] = useTransition();
  const [tagId, setTagId] = useQueryState(
    "tagId",
    conferenceFilterParsers.tagId.withOptions({
      startTransition,
      shallow: false,
    })
  );

  return (
    <Select
      label="Konu"
      placeholder="Tüm Konular"
      selectedKeys={tagId ? [String(tagId)] : []}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        setTagId(selected ? Number(selected) : null);
      }}
      classNames={{
        trigger: "h-12",
      }}
      isClearable
    >
      {tags.map((tag) => (
        <SelectItem key={String(tag.id)}>{tag.name}</SelectItem>
      ))}
    </Select>
  );
}
