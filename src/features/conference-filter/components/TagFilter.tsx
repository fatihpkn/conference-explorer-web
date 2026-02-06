"use client";

import { use, useTransition } from "react";
import type { Tag } from "@/shared/lib/db/types/tag.type";
import { conferenceFilterParsers } from "../lib/conferenceFilters.client";
import { Select, SelectItem } from "@heroui/react";
import { useQueryState } from "nuqs";
import { selectClassNames } from "./selectStyles";

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
      label="Topic"
      selectedKeys={tagId ? [String(tagId)] : []}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        setTagId(selected ? Number(selected) : null);
      }}
      classNames={selectClassNames}
      isClearable
    >
      {tags.map((tag) => (
        <SelectItem key={String(tag.id)}>{tag.name}</SelectItem>
      ))}
    </Select>
  );
}
