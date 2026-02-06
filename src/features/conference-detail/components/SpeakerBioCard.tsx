"use client";

import { use } from "react";
import type { ConferenceDetail } from "@/entities/conference";
import { User, Globe, Terminal } from "lucide-react";

interface SpeakerBioCardProps {
  conferencePromise: Promise<ConferenceDetail | null>;
}

export default function SpeakerBioCard({
  conferencePromise,
}: SpeakerBioCardProps) {
  const conference = use(conferencePromise);

  if (!conference || conference.speakers.length === 0) {
    return null;
  }

  // For now, show the first speaker
  const speaker = conference.speakers[0];

  return (
    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl shadow-sm border border-slate-100 dark:border-[#223649]">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-primary" strokeWidth={1.5} />
        Konuşmacı Hakkında
      </h3>
      <div className="flex flex-col items-center text-center">
        <div className="size-24 rounded-full border-4 border-primary/20 mb-4 bg-cover bg-center bg-slate-200 dark:bg-[#223649]" />
        <h4 className="text-xl font-bold">{speaker.name}</h4>
        <p className="text-primary font-medium text-sm mb-4">
          {speaker.bio || "Konferans Konuşmacısı"}
        </p>

        <div className="flex gap-4">
          <a
            className="text-slate-400 dark:text-slate-500 hover:text-primary transition-colors"
            href="#"
          >
            <Globe className="w-5 h-5" strokeWidth={1.5} />
          </a>
          <a
            className="text-slate-400 dark:text-slate-500 hover:text-primary transition-colors"
            href="#"
          >
            <Terminal className="w-5 h-5" strokeWidth={1.5} />
          </a>
          <a
            className="text-slate-400 dark:text-slate-500 hover:text-primary transition-colors"
            href="#"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
