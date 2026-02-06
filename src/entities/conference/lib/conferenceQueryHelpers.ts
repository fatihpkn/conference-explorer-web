import { db } from "@/shared/lib/db";
import { conferenceSpeakers } from "@/shared/lib/db/schemas/conference-speaker.schema";
import { conferenceTags } from "@/shared/lib/db/schemas/conference-tag.schema";
import { and, eq, ilike, or, sql } from "drizzle-orm";
import { conferences } from "../model/schema";
import type {
  ConferenceFilters,
  ConferenceListItem,
  ConferenceMedia,
  PaginatedResponse,
} from "../model/types";
import type { Speaker } from "@/shared/lib/db/types/speaker.type";
import type { Tag } from "@/shared/lib/db/types/tag.type";

export type ConferenceIdResolution =
  | { type: "empty" }
  | { type: "ids"; ids?: number[] };

export function buildBaseCondition(filters: ConferenceFilters) {
  const conditions = [];

  if (filters.search) {
    conditions.push(
      or(
        ilike(conferences.name, `%${filters.search}%`),
        ilike(conferences.description, `%${filters.search}%`),
        ilike(conferences.location, `%${filters.search}%`)
      )
    );
  }

  if (filters.year) {
    conditions.push(
      sql`EXTRACT(YEAR FROM ${conferences.startDate}) = ${filters.year}`
    );
  }

  if (filters.location) {
    conditions.push(ilike(conferences.location, `%${filters.location}%`));
  }

  return conditions.length > 0 ? and(...conditions) : undefined;
}

export async function resolveConferenceIds(
  filters: ConferenceFilters
): Promise<ConferenceIdResolution> {
  let conferenceIds: number[] | undefined;

  if (filters.tagId) {
    const taggedConferences = await db
      .select({ conferenceId: conferenceTags.conferenceId })
      .from(conferenceTags)
      .where(eq(conferenceTags.tagId, filters.tagId));

    conferenceIds = taggedConferences.map((tc) => tc.conferenceId);

    if (conferenceIds.length === 0) {
      return { type: "empty" };
    }
  }

  if (filters.speakerId) {
    const speakerConferences = await db
      .select({ conferenceId: conferenceSpeakers.conferenceId })
      .from(conferenceSpeakers)
      .where(eq(conferenceSpeakers.speakerId, filters.speakerId));

    const speakerConfIds = speakerConferences.map((sc) => sc.conferenceId);

    if (speakerConfIds.length === 0) {
      return { type: "empty" };
    }

    if (conferenceIds) {
      conferenceIds = conferenceIds.filter((id) => speakerConfIds.includes(id));
      if (conferenceIds.length === 0) {
        return { type: "empty" };
      }
    } else {
      conferenceIds = speakerConfIds;
    }
  }

  return { type: "ids", ids: conferenceIds };
}

export function emptyPaginatedResponse<T>(
  page: number,
  limit: number
): PaginatedResponse<T> {
  return {
    data: [],
    meta: {
      total: 0,
      page,
      limit,
      totalPages: 0,
    },
  };
}

type ConferenceWithRelations = Awaited<
  ReturnType<typeof db.query.conferences.findMany>
>[number] & {
  conferenceSpeakers: { speaker: Speaker }[];
  conferenceTags: { tag: Tag }[];
  media: Pick<ConferenceMedia, "url">[];
};

export function mapConferenceToListItem(
  conference: ConferenceWithRelations
): ConferenceListItem {
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
    coverImage: conference.media[0]?.url ?? null,
  };
}
