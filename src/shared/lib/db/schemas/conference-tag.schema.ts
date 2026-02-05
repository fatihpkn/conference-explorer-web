import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { conferences } from "./conference.schema";
import { tags } from "./tag.schema";

export const conferenceTags = pgTable(
  "conference_tags",
  {
    conferenceId: integer("conference_id")
      .notNull()
      .references(() => conferences.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.conferenceId, t.tagId] })]
);

export const conferenceTagsRelations = relations(conferenceTags, ({ one }) => ({
  conference: one(conferences, {
    fields: [conferenceTags.conferenceId],
    references: [conferences.id],
  }),
  tag: one(tags, {
    fields: [conferenceTags.tagId],
    references: [tags.id],
  }),
}));
