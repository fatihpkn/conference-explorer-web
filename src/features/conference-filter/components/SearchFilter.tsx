import { useQueryState } from "nuqs";
import { conferenceFilterParsers } from "@/shared/lib/nuqs/conferenceFilters.client";
import { useTransition } from "react";
import { Input } from "@heroui/react";
import { Search } from "lucide-react";

export default function SearchFilter() {
  const [isLoading, startTransition] = useTransition();
  const [search, setSearch] = useQueryState(
    "search",
    conferenceFilterParsers.search.withOptions({
      startTransition,
      shallow: false,
    })
  );

  return (
    <Input
      onValueChange={(value) => setSearch(value || null)}
      placeholder="Konferans ara..."
      isClearable
      variant="flat"
      className="h-14"
      size="lg"
      startContent={
        <Search className="w-4 h-4 text-default-400" strokeWidth={1.5} />
      }
    />
  );
}
