import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { conferenceTags } from "./conference-tag.schema";

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  conferenceTags: many(conferenceTags),
}));
