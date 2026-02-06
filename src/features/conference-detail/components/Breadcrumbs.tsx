"use client";

import { use } from "react";
import type { ConferenceDetail } from "@/entities/conference";
import {
  BreadcrumbItem,
  Breadcrumbs as HeroUIBreadcrumbs,
} from "@heroui/react";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({
  conferencePromise,
}: {
  conferencePromise: Promise<ConferenceDetail | null>;
}) {
  const conference = use(conferencePromise);

  return (
    <HeroUIBreadcrumbs
      separator={
        <ChevronRight
          className="w-4 h-4 text-slate-400 dark:text-[#90adcb]"
          strokeWidth={1.5}
        />
      }
      classNames={{
        list: "bg-transparent gap-2",
      }}
    >
      <BreadcrumbItem
        href="/"
        className="text-slate-500 dark:text-[#90adcb] text-sm font-medium hover:text-primary data-[current=true]:text-slate-900 dark:data-[current=true]:text-white"
      >
        Ana Sayfa
      </BreadcrumbItem>
      <BreadcrumbItem
        href="/conferences"
        className="text-slate-500 dark:text-[#90adcb] text-sm font-medium hover:text-primary data-[current=true]:text-slate-900 dark:data-[current=true]:text-white"
      >
        Konferanslar
      </BreadcrumbItem>
      <BreadcrumbItem className="text-slate-900 dark:text-white text-sm font-medium">
        {conference?.name}
      </BreadcrumbItem>
    </HeroUIBreadcrumbs>
  );
}
