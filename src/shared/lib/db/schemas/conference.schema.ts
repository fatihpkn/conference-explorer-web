import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { conferenceSpeakers } from "./conference-speaker.schema";
import { conferenceTags } from "./conference-tag.schema";
import { conferenceMedia } from "./conference-media.schema";

export const conferences = pgTable("conferences", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  location: text("location"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const conferencesRelations = relations(conferences, ({ many }) => ({
  conferenceSpeakers: many(conferenceSpeakers),
  conferenceTags: many(conferenceTags),
  media: many(conferenceMedia),
}));
