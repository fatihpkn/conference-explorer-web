import { db } from "@/shared/lib/db";
import { tags } from "@/shared/lib/db/schemas/tag.schema";
import type { Tag } from "@/shared/lib/db/types/tag.type";

export async function getTags(): Promise<Tag[]> {
  return await db.query.tags.findMany({
    orderBy: (tags, { asc }) => [asc(tags.name)],
  });
}
