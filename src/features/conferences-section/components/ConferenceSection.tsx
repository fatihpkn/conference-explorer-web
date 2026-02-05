import { use } from "react";
import type {
  PaginatedResponse,
  ConferenceListItem,
} from "@/entities/conference";
import { ConferenceSectionCard } from "../ui";

interface ConferenceSectionProps {
  conferencesPromise: Promise<PaginatedResponse<ConferenceListItem>>;
}

export default function ConferenceSection({
  conferencesPromise,
}: ConferenceSectionProps) {
  const data = use(conferencesPromise);

  if (data.data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-3xl border border-dashed border-default/40 text-sm text-default-foreground/70">
        Bu etiket için konferans bulunamadı
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {data.data.map((conference) => (
        <ConferenceSectionCard key={conference.id} conference={conference} />
      ))}
    </div>
  );
}
