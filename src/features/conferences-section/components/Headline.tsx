"use client";

import type { FeaturedTag } from "@/entities/conference";
import { Badge, Button } from "@heroui/react";

interface ConferenceSectionHeadlineProps {
  tag: FeaturedTag;
}

export default function ConferenceSectionHeadline({
  tag,
}: ConferenceSectionHeadlineProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold">{tag.name}</h2>
      {/* <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-900 text-[11px]">
        <Badge>{tag.conferenceCount}</Badge>
        konferans
      </span> */}
      <Button
        variant="light"
        color="primary"
        as={"a"}
        href={`/conferences?tagId=${tag.id}`}
      >
        Daha fazla Gör
      </Button>
    </div>
  );
}
