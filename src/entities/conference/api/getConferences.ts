import { db } from "@/shared/lib/db";
import { sleep } from "@/shared/utils/sleep";
import { and, desc, inArray, sql } from "drizzle-orm";
import { conferences } from "../model/schema";
import type {
  ConferenceFilters,
  ConferenceListItem,
  PaginatedResponse,
} from "../model/types";
import {
  buildBaseCondition,
  emptyPaginatedResponse,
  mapConferenceToListItem,
  resolveConferenceIds,
} from "../lib/conferenceQueryHelpers";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export async function getConferences(
  filters: ConferenceFilters = {}
): Promise<PaginatedResponse<ConferenceListItem>> {
  const page = filters.page ?? DEFAULT_PAGE;
  const limit = filters.limit ?? DEFAULT_LIMIT;
  const offset = (page - 1) * limit;

  await sleep();

  const baseCondition = buildBaseCondition(filters);
  const idResolution = await resolveConferenceIds(filters);

  if (idResolution.type === "empty") {
    return emptyPaginatedResponse(page, limit);
  }

  const conferenceIds = idResolution.ids;

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
  const data: ConferenceListItem[] = conferencesData.map(
    mapConferenceToListItem
  );

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
