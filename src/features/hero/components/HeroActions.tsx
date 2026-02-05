"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

interface HeroActionsProps {
  conferenceId?: number;
}

export default function HeroActions({ conferenceId }: HeroActionsProps) {
  const detailHref = conferenceId
    ? `/conferences/${conferenceId}`
    : "/conferences";

  return (
    <div className="flex flex-wrap gap-4">
      <Button
        as={Link}
        href={detailHref}
        color="primary"
        size="lg"
        className="font-bold shadow-lg shadow-primary/20"
        radius="lg"
      >
        Etkinliği İncele
      </Button>
      <Button
        as={Link}
        href="/conferences"
        variant="bordered"
        size="lg"
        className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/10 font-bold"
        radius="lg"
      >
        Konferansları Keşfet
      </Button>
    </div>
  );
}
