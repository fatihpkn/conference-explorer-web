"use client";

import { use } from "react";
import type { ConferenceDetail } from "@/entities/conference";
import { Users } from "lucide-react";

interface SpeakersListProps {
  conferencePromise: Promise<ConferenceDetail | null>;
}

export default function SpeakersList({ conferencePromise }: SpeakersListProps) {
  const conference = use(conferencePromise);

  if (!conference || conference.speakers.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl shadow-sm border border-slate-100 dark:border-[#223649]">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" strokeWidth={1.5} />
        Konuşmacılar
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {conference.speakers.map((speaker) => (
          <div
            key={speaker.id}
            className="flex items-start gap-4 p-4 rounded-lg border border-slate-100 dark:border-[#223649] hover:bg-slate-50 dark:hover:bg-[#223649] transition-all"
          >
            <div className="size-12 rounded-full bg-slate-200 dark:bg-[#223649] shrink-0 flex items-center justify-center">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                {speaker.name.charAt(0)}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">
                {speaker.name}
              </h4>
              {speaker.bio && (
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                  {speaker.bio}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
