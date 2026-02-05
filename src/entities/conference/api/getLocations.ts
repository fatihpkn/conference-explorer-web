import { db } from "@/shared/lib/db";
import { conferences } from "../model/schema";
import { sql, isNotNull } from "drizzle-orm";

export async function getLocations(): Promise<string[]> {
  const result = await db
    .selectDistinct({
      location: conferences.location,
    })
    .from(conferences)
    .where(isNotNull(conferences.location))
    .orderBy(conferences.location);

  return result.map((r) => r.location!);
}
