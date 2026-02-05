import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { conferenceSpeakers } from "./conference-speaker.schema";

export const speakers = pgTable("speakers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  bio: text("bio"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const speakersRelations = relations(speakers, ({ many }) => ({
  conferenceSpeakers: many(conferenceSpeakers),
}));
