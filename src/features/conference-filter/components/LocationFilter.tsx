"use client";

import { use, useTransition } from "react";
import { useQueryState } from "nuqs";
import { conferenceFilterParsers } from "@/shared/lib/nuqs/conferenceFilters.client";
import { Select, SelectItem } from "@heroui/react";

interface LocationFilterProps {
  locationsPromise: Promise<string[]>;
}

export default function LocationFilter({
  locationsPromise,
}: LocationFilterProps) {
  const [isLoading, startTransition] = useTransition();
  const [location, setLocation] = useQueryState(
    "location",
    conferenceFilterParsers.location.withOptions({
      startTransition,
      shallow: false,
    })
  );

  const locations = use(locationsPromise);

  return (
    <Select
      label="Konum"
      placeholder="Tüm Konumlar"
      selectedKeys={location ? [location] : []}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        setLocation(selected ? String(selected) : null);
      }}
      classNames={{
        trigger: "h-12",
      }}
      isClearable
    >
      {locations.map((loc) => (
        <SelectItem key={loc}>{loc}</SelectItem>
      ))}
    </Select>
  );
}
