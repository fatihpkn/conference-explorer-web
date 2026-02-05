"use client";

import {
  Breadcrumbs as HeroUIBreadcrumbs,
  BreadcrumbItem,
} from "@heroui/react";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs() {
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
        Konferans Detayları
      </BreadcrumbItem>
    </HeroUIBreadcrumbs>
  );
}
