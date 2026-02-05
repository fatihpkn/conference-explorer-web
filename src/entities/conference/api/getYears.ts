import { db } from "@/shared/lib/db";
import { conferences } from "../model/schema";
import { sql } from "drizzle-orm";

export async function getYears(): Promise<number[]> {
  const result = await db
    .selectDistinct({
      year: sql<number>`EXTRACT(YEAR FROM ${conferences.startDate})`.as("year"),
    })
    .from(conferences)
    .orderBy(sql`year DESC`);

  return result.map((r) => r.year);
}
