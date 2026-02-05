import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as conferenceSchema from "./schemas/conference.schema";
import * as speakerSchema from "./schemas/speaker.schema";
import * as conferenceSpeakerSchema from "./schemas/conference-speaker.schema";
import * as conferenceTagSchema from "./schemas/conference-tag.schema";
import * as conferenceMediaSchema from "./schemas/conference-media.schema";
import * as tagSchema from "./schemas/tag.schema";
import * as conferenceTypes from "./types/conference.type";
import * as speakerTypes from "./types/speaker.type";
import * as tagTypes from "./types/tag.type";
import * as conferenceMediaTypes from "./types/conference-media.type";
import * as conferenceSpeakerTypes from "./types/conference-speaker.type";
import * as conferenceTagTypes from "./types/conference-tag.type";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, {
  schema: {
    ...conferenceSchema,
    ...speakerSchema,
    ...conferenceSpeakerSchema,
    ...conferenceTagSchema,
    ...conferenceMediaSchema,
    ...tagSchema,
  },
});

export {
  conferenceSchema,
  speakerSchema,
  conferenceSpeakerSchema,
  conferenceTagSchema,
  conferenceMediaSchema,
  tagSchema,
  conferenceTypes,
  speakerTypes,
  tagTypes,
  conferenceMediaTypes,
  conferenceSpeakerTypes,
  conferenceTagTypes,
};
