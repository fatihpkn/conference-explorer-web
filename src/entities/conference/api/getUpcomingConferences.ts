import { db } from "@/shared/lib/db";
import { conferenceMedia } from "@/shared/lib/db/schemas/conference-media.schema";
import { conferences } from "@/shared/lib/db/schemas/conference.schema";
import { sleep } from "@/shared/utils/sleep";
import { eq, gte } from "drizzle-orm";
import type { ConferenceListItem } from "../model/types";

export async function getUpcomingConferences(
  limit: number = 3
): Promise<ConferenceListItem[]> {
  const now = new Date();

  await sleep();

  const results = await db.query.conferences.findMany({
    where: gte(conferences.startDate, now),
    orderBy: [conferences.startDate],
    limit,
    with: {
      conferenceSpeakers: {
        with: {
          speaker: true,
        },
      },
      conferenceTags: {
        with: {
          tag: true,
        },
      },
      media: {
        where: eq(conferenceMedia.type, "image"),
        limit: 1,
      },
    },
  });

  return results.map((conference) => ({
    id: conference.id,
    name: conference.name,
    description: conference.description,
    location: conference.location,
    startDate: conference.startDate,
    endDate: conference.endDate,
    coverImage: conference.media[0]?.url || null,
    speakers: conference.conferenceSpeakers.map((cs) => cs.speaker),
    tags: conference.conferenceTags.map((ct) => ct.tag),
    createdAt: conference.createdAt,
  }));
}
