import { db } from "@/shared/lib/db";
import { speakers } from "@/shared/lib/db/schemas/speaker.schema";
import type { Speaker } from "@/shared/lib/db/types/speaker.type";

export async function getSpeakers(): Promise<Speaker[]> {
  return await db.query.speakers.findMany({
    orderBy: (speakers, { asc }) => [asc(speakers.name)],
  });
}
