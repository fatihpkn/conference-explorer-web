"use client";

import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { ConferenceListItem } from "@/entities/conference";
import HeroActions from "./HeroActions";
import { Calendar, MapPin } from "lucide-react";

interface HeroInteractiveProps {
  upcomingConferences: Promise<ConferenceListItem[]>;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const wrapIndex = (index: number, length: number) => {
  if (length === 0) return 0;
  return ((index % length) + length) % length;
};

const formatFullRange = (start: string | Date, end: string | Date | null) => {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;

  const opts: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
  const startLabel = startDate.toLocaleDateString("tr-TR", opts);

  if (!endDate) {
    return startLabel;
  }

  if (
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()
  ) {
    return `${startLabel} - ${endDate.toLocaleDateString("tr-TR", {
      day: "numeric",
    })}`;
  }

  return `${startLabel} - ${endDate.toLocaleDateString("tr-TR", opts)}`;
};

const formatBadgeDate = (date: string | Date) =>
  new Date(date).toLocaleDateString("tr-TR", {
    month: "short",
    day: "numeric",
  });

export default function HeroInteractive({
  upcomingConferences,
}: HeroInteractiveProps) {
  const conferences = use(upcomingConferences);

  if (!conferences.length) {
    return <div className="absolute inset-0 bg-background animate-pulse" />;
  }

  const [[activeIndex, direction], setPagination] = useState<[number, number]>([
    0, 0,
  ]);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const paginate = (step: number) => {
    setPagination(([current]) => {
      const next = wrapIndex(current + step, conferences.length);
      return [next, step];
    });
  };

  useEffect(() => {
    if (!isAutoPlay || conferences.length <= 1) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlay, conferences.length]);

  const currentConference =
    conferences[wrapIndex(activeIndex, conferences.length)];

  const description =
    currentConference.description?.slice(0, 220) ??
    "Dünyanın dört bir yanından vizyoner konuşmacılar, yeni teknolojiler ve ilham veren oturumlarla buluş.";

  const backgroundImage = currentConference.coverImage;
  const hasCoverImage = Boolean(backgroundImage);

  const handleSelectSlide = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;
    const step = nextIndex > activeIndex ? 1 : -1;
    setPagination([nextIndex, step]);
    setIsAutoPlay(false);
  };

  return (
    <section className="relative w-full h-125 py-5 overflow-hidden">
      <div
        className="absolute inset-0"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={`${currentConference.id}-${activeIndex}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 260, damping: 30 },
              opacity: { duration: 0.25 },
            }}
            className="absolute inset-0 backdrop-blur-sm"
          >
            {hasCoverImage ? (
              <Image
                src={backgroundImage!}
                alt={currentConference.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(13,127,242,0.35),transparent_45%),linear-gradient(135deg,rgba(22,37,52,0.95),rgba(10,17,24,0.85))]" />
            )}
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-linear-to-r from-background/20 via-background/30 to-transparent" />
      </div>

      <div className="relative z-10 h-full max-w-360 mx-auto px-4 md:px-10 lg:px-20 flex flex-col justify-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider w-fit">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          {formatBadgeDate(currentConference.startDate)} •{" "}
          {currentConference.location}
        </div>

        <div className="space-y-4 flex-1">
          <h1 className="text-foreground text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.05] max-w-4xl">
            {currentConference.name}
          </h1>
          <p className="text-default-foreground/90 text-lg max-w-2xl leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-default-foreground/80">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" strokeWidth={1.5} />
              {currentConference.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" strokeWidth={1.5} />
              {formatFullRange(
                currentConference.startDate,
                currentConference.endDate
              )}
            </span>
          </div>
        </div>

        <HeroActions conferenceId={currentConference.id} />

        {conferences.length > 1 && (
          <div className="flex gap-2 z-10 w-full mb-2">
            {conferences.map((conference, index) => (
              <button
                key={conference.id}
                onClick={() => handleSelectSlide(index)}
                className={`h-1.5 rounded-full transition-all cursor-pointer shadow-xs ${
                  index === activeIndex
                    ? "w-10 bg-primary"
                    : "w-8 bg-content1 hover:bg-content1/60"
                }`}
                aria-label={`${conference.name} slide'ına git`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
