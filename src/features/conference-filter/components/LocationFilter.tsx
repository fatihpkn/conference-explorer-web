"use client";

import { Select, SelectItem } from "@heroui/react";
import { useQueryState } from "nuqs";
import { use, useTransition } from "react";
import { selectClassNames } from "./selectStyles";
import { conferenceFilterParsers } from "../lib/parsers";

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
      label="Location"
      selectedKeys={location ? [location] : []}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        setLocation(selected ? String(selected) : null);
      }}
      classNames={selectClassNames}
      isClearable
    >
      {locations.map((loc) => (
        <SelectItem key={loc}>{loc}</SelectItem>
      ))}
    </Select>
  );
}
