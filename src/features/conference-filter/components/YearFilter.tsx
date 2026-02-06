"use client";

import { conferenceFilterParsers } from "../lib/conferenceFilters.client";
import { Select, SelectItem } from "@heroui/react";
import { useQueryState } from "nuqs";
import { use, useTransition } from "react";
import { selectClassNames } from "./selectStyles";

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
      label="Year"
      selectedKeys={year ? [String(year)] : []}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        setYear(selected ? Number(selected) : null);
      }}
      classNames={selectClassNames}
      isClearable
    >
      {years.map((y) => (
        <SelectItem key={String(y)}>{y}</SelectItem>
      ))}
    </Select>
  );
}
