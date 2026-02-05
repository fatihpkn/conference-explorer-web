import { db } from "@/shared/lib/db";
import { eq } from "drizzle-orm";
import { conferences } from "../model/schema";
import type { ConferenceDetail } from "../model/types";

export async function getConferenceById(
  id: number
): Promise<ConferenceDetail | null> {
  const conference = await db.query.conferences.findFirst({
    where: eq(conferences.id, id),
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
      media: true,
    },
  });

  if (!conference) {
    return null;
  }

  return {
    id: conference.id,
    name: conference.name,
    description: conference.description,
    location: conference.location,
    startDate: conference.startDate,
    endDate: conference.endDate,
    createdAt: conference.createdAt,
    speakers: conference.conferenceSpeakers.map((cs) => cs.speaker),
    tags: conference.conferenceTags.map((ct) => ct.tag),
    media: conference.media,
  };
}
