import { db } from "@/shared/lib/db";
import { conferenceTags } from "@/shared/lib/db/schemas/conference-tag.schema";
import { tags } from "@/shared/lib/db/schemas/tag.schema";
import { desc, sql, gt } from "drizzle-orm";
import { conferences } from "../model/schema";
import type { FeaturedTag } from "../model/types";

const DEFAULT_LIMIT = 5;

export async function getFeaturedTags(
  limit: number = DEFAULT_LIMIT
): Promise<FeaturedTag[]> {
  console.log("[FEATURED TAGS] Request");

  const result = await db
    .select({
      id: tags.id,
      name: tags.name,
      conferenceCount: sql<number>`count(*)`.as("conference_count"),
    })
    .from(conferenceTags)
    .innerJoin(tags, sql`${conferenceTags.tagId} = ${tags.id}`)
    .innerJoin(
      conferences,
      sql`${conferenceTags.conferenceId} = ${conferences.id}`
    )
    .where(gt(conferences.startDate, new Date()))
    .groupBy(tags.id, tags.name)
    .orderBy(desc(sql`count(*)`))
    .limit(limit);

  return result.map((row) => ({
    id: row.id,
    name: row.name,
    conferenceCount: Number(row.conferenceCount),
  }));
}
