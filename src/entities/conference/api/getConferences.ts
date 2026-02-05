import { db } from "@/shared/lib/db";
import { conferenceTags } from "@/shared/lib/db/schemas/conference-tag.schema";
import { conferenceSpeakers } from "@/shared/lib/db/schemas/conference-speaker.schema";
import { and, desc, eq, ilike, or, sql, inArray } from "drizzle-orm";
import { conferences } from "../model/schema";
import type {
  ConferenceFilters,
  ConferenceListItem,
  PaginatedResponse,
} from "../model/types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export async function getConferences(
  filters: ConferenceFilters = {}
): Promise<PaginatedResponse<ConferenceListItem>> {
  const page = filters.page ?? DEFAULT_PAGE;
  const limit = filters.limit ?? DEFAULT_LIMIT;
  const offset = (page - 1) * limit;

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

  const baseCondition = conditions.length > 0 ? and(...conditions) : undefined;

  // If filtering by tag, we need to get conference IDs first
  let conferenceIds: number[] | undefined;
  if (filters.tagId) {
    const taggedConferences = await db
      .select({ conferenceId: conferenceTags.conferenceId })
      .from(conferenceTags)
      .where(eq(conferenceTags.tagId, filters.tagId));

    conferenceIds = taggedConferences.map((tc) => tc.conferenceId);

    if (conferenceIds.length === 0) {
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
  }

  // If filtering by speaker, we need to get conference IDs
  if (filters.speakerId) {
    const speakerConferences = await db
      .select({ conferenceId: conferenceSpeakers.conferenceId })
      .from(conferenceSpeakers)
      .where(eq(conferenceSpeakers.speakerId, filters.speakerId));

    const speakerConfIds = speakerConferences.map((sc) => sc.conferenceId);

    if (speakerConfIds.length === 0) {
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

    // Intersect with existing conferenceIds if tagId filter is also applied
    if (conferenceIds) {
      conferenceIds = conferenceIds.filter((id) => speakerConfIds.includes(id));
      if (conferenceIds.length === 0) {
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
    } else {
      conferenceIds = speakerConfIds;
    }
  }

  // Build final condition
  const finalCondition = conferenceIds
    ? and(baseCondition, inArray(conferences.id, conferenceIds))
    : baseCondition;

  // Get total count
  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(conferences)
    .where(finalCondition);

  const total = Number(totalResult[0]?.count ?? 0);
  const totalPages = Math.ceil(total / limit);

  // Get conferences with relations using Drizzle relational query
  const conferencesData = await db.query.conferences.findMany({
    where: finalCondition,
    orderBy: [desc(conferences.startDate)],
    limit,
    offset,
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
        where: (media, { eq }) => eq(media.type, "image"),
        limit: 1,
      },
    },
  });

  // Transform to ConferenceListItem format
  const data: ConferenceListItem[] = conferencesData.map((conf) => ({
    id: conf.id,
    name: conf.name,
    description: conf.description,
    location: conf.location,
    startDate: conf.startDate,
    endDate: conf.endDate,
    createdAt: conf.createdAt,
    speakers: conf.conferenceSpeakers.map((cs) => cs.speaker),
    tags: conf.conferenceTags.map((ct) => ct.tag),
    coverImage: conf.media[0]?.url ?? null,
  }));

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
  };
}
