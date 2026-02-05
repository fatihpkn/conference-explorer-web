import type { ConferenceListItem } from "@/entities/conference";
import Link from "next/link";
import { Avatar, Card, CardBody } from "@heroui/react";
import { Bookmark } from "lucide-react";

interface ConferenceCardProps {
  conference: ConferenceListItem;
}

export default function ConferenceCard({ conference }: ConferenceCardProps) {
  const primaryTag = conference.tags[0]?.name ?? "Konferans";
  const mainSpeaker = conference.speakers[0];

  const startDate = conference.startDate
    ? new Date(conference.startDate)
    : null;
  const endDate = conference.endDate ? new Date(conference.endDate) : null;

  const monthLabel = startDate
    ? startDate.toLocaleString("en-US", { month: "short" })
    : "";
  const dayLabel = startDate
    ? startDate.getDate().toString().padStart(2, "0")
    : "";

  const durationMinutes =
    startDate && endDate
      ? Math.max(
          0,
          Math.round((endDate.getTime() - startDate.getTime()) / 60000)
        )
      : null;

  const durationLabel = (() => {
    if (
      !durationMinutes ||
      Number.isNaN(durationMinutes) ||
      durationMinutes === 0
    ) {
      return null;
    }
    if (durationMinutes < 60) {
      return `${durationMinutes} min`;
    }
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return minutes === 0 ? `${hours} h` : `${hours} h ${minutes} min`;
  })();

  return (
    <Link href={`/conferences/${conference.id}`}>
      <Card
        isPressable
        className="group relative border border-default-200 bg-content1 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 rounded-2xl"
      >
        <CardBody className="p-6">
          <div className="flex gap-6">
            <div className="flex flex-col items-center justify-center min-w-16 h-16 rounded-xl bg-default-100 text-default-500">
              <span className="text-xs font-semibold uppercase tracking-wide">
                {monthLabel}
              </span>
              <span className="text-2xl font-bold text-default-900 leading-none">
                {dayLabel}
              </span>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-default-500">
                <span className="font-bold uppercase tracking-[0.4em] text-primary">
                  {primaryTag}
                </span>
                {durationLabel && (
                  <>
                    <span className="text-default-300">•</span>
                    <span>{durationLabel}</span>
                  </>
                )}
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-default-900 group-hover:text-primary transition-colors line-clamp-2">
                  {conference.name}
                </h2>
                <p className="text-sm text-default-500 leading-relaxed line-clamp-2">
                  {conference.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    name={mainSpeaker?.name}
                    className="w-10 h-10 text-sm font-semibold bg-default-200 text-default-700"
                    radius="full"
                  />
                  <span className="text-sm font-semibold text-default-700">
                    {mainSpeaker?.name ?? "Bilinmeyen Konuşmacı"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
