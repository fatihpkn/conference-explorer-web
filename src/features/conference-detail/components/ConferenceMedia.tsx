"use client";

import { use, useState } from "react";
import type { ConferenceDetail } from "@/entities/conference";
import Image from "next/image";
import { FileText, Play, Heart, Share2, Bookmark, Flag } from "lucide-react";

interface ConferenceMediaProps {
  conferencePromise: Promise<ConferenceDetail | null>;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function ConferenceMedia({
  conferencePromise,
}: ConferenceMediaProps) {
  const conference = use(conferencePromise);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!conference) {
    return null;
  }

  const images = conference.media.filter((m) => m.type === "image" && m.url);
  const videos = conference.media.filter((m) => m.type === "video" && m.url);
  const presentations = conference.media.filter(
    (m) => m.type === "presentation" && m.url
  );

  const allMedia = [...images, ...videos, ...presentations];
  const selectedMedia = allMedia[selectedIndex];

  const duration = Math.ceil(
    (conference.endDate.getTime() - conference.startDate.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <>
      {/* Media Player */}
      <div className="bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-xl">
        <div className="relative flex items-center justify-center bg-black bg-cover bg-center aspect-video">
          {selectedMedia ? (
            <>
              {selectedMedia.type === "image" && selectedMedia.url && (
                <Image
                  src={selectedMedia.url}
                  alt={selectedMedia.title || conference.name}
                  width={1280}
                  height={720}
                  className="w-full h-full object-cover"
                />
              )}
              {selectedMedia.type === "video" && selectedMedia.url && (
                <div className="w-full h-full flex items-center justify-center">
                  <iframe
                    src={selectedMedia.url.replace("watch?v=", "embed/")}
                    title={selectedMedia.title || "Video"}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              )}
              {selectedMedia.type === "presentation" && selectedMedia.url && (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <a
                    href={selectedMedia.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Sunumu Görüntüle
                  </a>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-slate-200 dark:bg-[#223649]">
              <span className="text-slate-500 dark:text-slate-400">
                Medya bulunamadı
              </span>
            </div>
          )}

          {/* Play button overlay for video */}
          {selectedMedia?.type === "video" && (
            <button className="absolute inset-0 flex shrink-0 items-center justify-center rounded-full size-20 bg-primary/90 text-white hover:scale-110 transition-transform shadow-lg mx-auto">
              <Play
                className="w-10 h-10"
                fill="currentColor"
                strokeWidth={1.5}
              />
            </button>
          )}
        </div>
      </div>

      {/* Headline & Actions */}
      <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl shadow-sm border border-slate-100 dark:border-[#223649]">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex gap-2 mb-3">
              {conference.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded uppercase"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <h1 className="text-slate-900 dark:text-white tracking-tight text-2xl md:text-3xl font-bold leading-tight">
              {conference.name}
            </h1>
            <p className="mt-2 text-slate-500 dark:text-[#90adcb]">
              {conference.location} • {formatDate(conference.startDate)}
              {duration > 1 && ` - ${formatDate(conference.endDate)}`}
            </p>
          </div>
          {/* Actions Bar Integration */}
          <div className="flex flex-wrap gap-2 md:justify-end">
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <div className="rounded-full bg-slate-100 dark:bg-[#223649] p-3 text-slate-600 dark:text-white group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                <Heart className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <p className="text-xs font-medium">Kaydet</p>
            </div>
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <div className="rounded-full bg-slate-100 dark:bg-[#223649] p-3 text-slate-600 dark:text-white group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                <Share2 className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <p className="text-xs font-medium">Paylaş</p>
            </div>
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <div className="rounded-full bg-slate-100 dark:bg-[#223649] p-3 text-slate-600 dark:text-white group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                <Bookmark className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <p className="text-xs font-medium">İzleme Listesi</p>
            </div>
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <div className="rounded-full bg-slate-100 dark:bg-[#223649] p-3 text-slate-600 dark:text-white group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                <Flag className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <p className="text-xs font-medium">Şikayet Et</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
