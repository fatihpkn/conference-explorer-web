"use client";

import { use, useTransition } from "react";
import { useQueryState } from "nuqs";
import { conferenceFilterParsers } from "@/shared/lib/nuqs/conferenceFilters.client";
import { Select, SelectItem } from "@heroui/react";

interface YearFilterProps {
  yearsPromise: Promise<number[]>;
}

export default function YearFilter({ yearsPromise }: YearFilterProps) {
  const [isLoading, startTransition] = useTransition();
  const [year, setYear] = useQueryState(
    "year",
    conferenceFilterParsers.year.withOptions({
      startTransition,
      shallow: false,
    })
  );

  const years = use(yearsPromise);

  return (
    <Select
      label="Yıl"
      placeholder="Tüm Yıllar"
      selectedKeys={year ? [String(year)] : []}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        setYear(selected ? Number(selected) : null);
      }}
      classNames={{
        trigger: "h-12",
      }}
      isClearable
    >
      {years.map((y) => (
        <SelectItem key={String(y)}>{y}</SelectItem>
      ))}
    </Select>
  );
}
