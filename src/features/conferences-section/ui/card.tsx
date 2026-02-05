"use client";

import type { ConferenceListItem } from "@/entities/conference";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarGroup, Tooltip } from "@heroui/react";
import { MapPin } from "lucide-react";

interface ConferenceSectionCardProps {
  conference: ConferenceListItem;
}

const formatDateRange = (
  start: string | Date,
  end: string | Date | null
): string => {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;
  const baseOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const startLabel = startDate.toLocaleDateString("tr-TR", baseOptions);

  if (!endDate) return startLabel;

  if (
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth()
  ) {
    return `${startLabel} - ${endDate.toLocaleDateString("tr-TR", {
      day: "numeric",
    })}`;
  }

  return `${startLabel} - ${endDate.toLocaleDateString("tr-TR", baseOptions)}`;
};

export default function ConferenceSectionCard({
  conference,
}: ConferenceSectionCardProps) {
  const primaryTag = conference.tags?.[0]?.name;
  const dateLabel = formatDateRange(conference.startDate, conference.endDate);
  const hasCoverImage = Boolean(conference.coverImage);
  const speakers = conference.speakers?.slice(0, 4) ?? [];

  return (
    <Link
      href={`/conferences/${conference.id}`}
      className="group relative h-64 rounded-3xl border border-default/40 bg-content1 overflow-hidden transition-all duration-300 hover:border-primary/60 hover:shadow-[0_10px_40px_rgba(13,127,242,0.2)]"
    >
      {hasCoverImage ? (
        <Image
          src={conference.coverImage!}
          alt={conference.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(13,127,242,0.25),rgba(13,127,242,0)_55%),linear-gradient(135deg,#162534,#0a1118)]" />
      )}
      <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/50 to-background" />

      <div className="relative z-10 h-full p-5 flex flex-col gap-4">
        <div className="flex items-center gap-3 text-xs uppercase font-semibold tracking-wide text-default-foreground/70">
          {primaryTag && (
            <span className="px-3 py-1 rounded-full bg-primary/40 text-primary-900 text-[11px]">
              {primaryTag}
            </span>
          )}
          <span>{dateLabel}</span>
        </div>

        <h3 className="text-xl font-bold text-foreground leading-tight line-clamp-2">
          {conference.name}
        </h3>

        <div className="mt-auto flex items-center justify-between gap-4 text-sm text-default-foreground/85">
          <span className="flex items-center gap-2 truncate">
            <MapPin className="w-4 h-4 text-primary" strokeWidth={1.5} />
            <span className="truncate">{conference.location}</span>
          </span>
          {speakers.length > 0 ? (
            <AvatarGroup isBordered max={4} size="sm">
              {speakers.map((speaker) => (
                <Tooltip
                  key={speaker.id}
                  content={
                    <span className="w-auto text-nowrap px-2">
                      {speaker.name}
                    </span>
                  }
                  showArrow
                >
                  <Avatar
                    className="data-hover:translate-none!"
                    name={speaker.name}
                    isBordered
                    showFallback
                  />
                </Tooltip>
              ))}
            </AvatarGroup>
          ) : (
            <span className="text-xs text-default-foreground/70">
              Konuşmacılar henüz belirlenmedi
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
