import { Suspense } from "react";
import HeroInteractive from "./HeroInteractive";
import type { ConferenceListItem } from "@/entities/conference";

interface HeroContentProps {
  upcomingConferences: Promise<ConferenceListItem[]>;
}

export default function HeroContent({ upcomingConferences }: HeroContentProps) {
  return (
    <Suspense
      fallback={
        <section className="relative w-full h-125 bg-background animate-pulse" />
      }
    >
      <HeroInteractive upcomingConferences={upcomingConferences} />
    </Suspense>
  );
}
