import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { conferences } from "./conference.schema";
import { speakers } from "./speaker.schema";

export const conferenceSpeakers = pgTable(
  "conference_speakers",
  {
    conferenceId: integer("conference_id")
      .notNull()
      .references(() => conferences.id, { onDelete: "cascade" }),
    speakerId: integer("speaker_id")
      .notNull()
      .references(() => speakers.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.conferenceId, t.speakerId] })]
);

export const conferenceSpeakersRelations = relations(
  conferenceSpeakers,
  ({ one }) => ({
    conference: one(conferences, {
      fields: [conferenceSpeakers.conferenceId],
      references: [conferences.id],
    }),
    speaker: one(speakers, {
      fields: [conferenceSpeakers.speakerId],
      references: [speakers.id],
    }),
  })
);
