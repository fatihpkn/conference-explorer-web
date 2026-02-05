"use client";

import { use } from "react";
import type { ConferenceDetail } from "@/entities/conference";

interface ConferenceInfoProps {
  conferencePromise: Promise<ConferenceDetail | null>;
}

export default function ConferenceInfo({
  conferencePromise,
}: ConferenceInfoProps) {
  const conference = use(conferencePromise);

  if (!conference) {
    return (
      <div className="text-center py-12 text-gray-500">
        Konferans bulunamadı
      </div>
    );
  }

  const coverLetter = conference.media.find((m) => m.type === "cover_letter");

  return (
    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl shadow-sm border border-slate-100 dark:border-[#223649]">
      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold mb-4">Özet</h3>
        {conference.description ? (
          <>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {conference.description}
            </p>
            {coverLetter?.body && (
              <>
                <hr className="my-6 border-slate-100 dark:border-[#223649]" />
                <h3 className="text-xl font-bold mb-4">{coverLetter.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {coverLetter.body}
                </p>
              </>
            )}
          </>
        ) : (
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Bu konferans hakkında detaylı bilgi yakında eklenecektir.
          </p>
        )}
      </div>
    </div>
  );
}
