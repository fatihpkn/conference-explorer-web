import {
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { conferences } from "./conference.schema";

export const mediaTypeEnum = pgEnum("conference_media_type", [
  "image",
  "video",
  "presentation",
  "cover_letter",
  "pdf",
  "link",
]);

export const conferenceMedia = pgTable(
  "conference_media",
  {
    id: serial("id").primaryKey(),
    conferenceId: integer("conference_id")
      .notNull()
      .references(() => conferences.id, { onDelete: "cascade" }),
    type: mediaTypeEnum("type").notNull(),
    url: text("url"),
    title: text("title"),
    description: text("description"),
    body: text("body"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("conference_media_conference_idx").on(table.conferenceId),
    index("conference_media_type_idx").on(table.type),
  ]
);

export const conferenceMediaRelations = relations(
  conferenceMedia,
  ({ one }) => ({
    conference: one(conferences, {
      fields: [conferenceMedia.conferenceId],
      references: [conferences.id],
    }),
  })
);
