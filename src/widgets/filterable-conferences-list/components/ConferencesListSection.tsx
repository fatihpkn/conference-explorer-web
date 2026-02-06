import { use } from "react";
import ConferencesList from "@/features/conferences-list/components/ConferencesList";
import type {
  ConferenceListItem,
  PaginatedResponse,
} from "@/entities/conference";

interface ConferencesListSectionProps {
  dataPromise: Promise<PaginatedResponse<ConferenceListItem>>;
  filters: {
    search?: string;
    tagId?: number;
    year?: number;
    location?: string;
    speakerId?: number;
  };
  limit: number;
}

export default function ConferencesListSection({
  dataPromise,
  filters,
  limit,
}: ConferencesListSectionProps) {
  const { data, meta } = use(dataPromise);

  return (
    <ConferencesList
      initialData={data}
      initialMeta={meta}
      filters={filters}
      limit={limit}
    />
  );
}
