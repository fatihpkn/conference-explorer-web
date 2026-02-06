"use client";

import { use } from "react";
import type { ConferenceDetail } from "@/entities/conference";
import {
  Link,
  FileText,
  Download,
  Github,
  ExternalLink,
  File,
} from "lucide-react";

interface ResourcesCardProps {
  conferencePromise: Promise<ConferenceDetail | null>;
}

export default function ResourcesCard({
  conferencePromise,
}: ResourcesCardProps) {
  const conference = use(conferencePromise);

  if (!conference) {
    return null;
  }

  // Filter media files for resources
  const pdfFiles = conference.media.filter((m) => m.type === "pdf" && m.url);
  const links = conference.media.filter((m) => m.type === "link" && m.url);
  const presentations = conference.media.filter(
    (m) => m.type === "presentation" && m.url
  );

  return (
    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl shadow-sm border border-slate-100 dark:border-[#223649]">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <Link className="w-5 h-5 text-primary" strokeWidth={1.5} />
        Konferans Kaynakları
      </h3>
      <div className="space-y-4">
        {pdfFiles.map((pdf) => (
          <a
            key={pdf.id}
            className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-[#223649] hover:bg-slate-50 dark:hover:bg-[#223649] transition-all group"
            href={pdf.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-red-500" strokeWidth={1.5} />
              <span className="font-medium">{pdf.title || "PDF Doküman"}</span>
            </div>
            <Download
              className="w-5 h-5 text-slate-400 group-hover:text-primary"
              strokeWidth={1.5}
            />
          </a>
        ))}

        {presentations.map((presentation) => (
          <a
            key={presentation.id}
            className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-[#223649] hover:bg-slate-50 dark:hover:bg-[#223649] transition-all group"
            href={presentation.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-3">
              <File className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-medium">
                {presentation.title || "Sunum"}
              </span>
            </div>
            <ExternalLink
              className="w-5 h-5 text-slate-400 group-hover:text-primary"
              strokeWidth={1.5}
            />
          </a>
        ))}

        {links.map((link) => (
          <a
            key={link.id}
            className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-[#223649] hover:bg-slate-50 dark:hover:bg-[#223649] transition-all group"
            href={link.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-3">
              <Link
                className="w-5 h-5 text-slate-900 dark:text-white"
                strokeWidth={1.5}
              />
              <span className="font-medium">{link.title || "Bağlantı"}</span>
            </div>
            <ExternalLink
              className="w-5 h-5 text-slate-400 group-hover:text-primary"
              strokeWidth={1.5}
            />
          </a>
        ))}

        {pdfFiles.length === 0 &&
          links.length === 0 &&
          presentations.length === 0 && (
            <>
              <a
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-[#223649] hover:bg-slate-50 dark:hover:bg-[#223649] transition-all group"
                href="#"
              >
                <div className="flex items-center gap-3">
                  <FileText
                    className="w-5 h-5 text-red-500"
                    strokeWidth={1.5}
                  />
                  <span className="font-medium">Sunum Slaytları (PDF)</span>
                </div>
                <Download
                  className="w-5 h-5 text-slate-400 group-hover:text-primary"
                  strokeWidth={1.5}
                />
              </a>
              <a
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-[#223649] hover:bg-slate-50 dark:hover:bg-[#223649] transition-all group"
                href="#"
              >
                <div className="flex items-center gap-3">
                  <Github
                    className="w-5 h-5 text-slate-900 dark:text-white"
                    strokeWidth={1.5}
                  />
                  <span className="font-medium">GitHub Repository</span>
                </div>
                <ExternalLink
                  className="w-5 h-5 text-slate-400 group-hover:text-primary"
                  strokeWidth={1.5}
                />
              </a>
              <a
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-[#223649] hover:bg-slate-50 dark:hover:bg-[#223649] transition-all group"
                href="#"
              >
                <div className="flex items-center gap-3">
                  <FileText
                    className="w-5 h-5 text-primary"
                    strokeWidth={1.5}
                  />
                  <span className="font-medium">İlgili Teknik Rapor</span>
                </div>
                <ExternalLink
                  className="w-5 h-5 text-slate-400 group-hover:text-primary"
                  strokeWidth={1.5}
                />
              </a>
            </>
          )}
      </div>
    </div>
  );
}
