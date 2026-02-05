import type { InferSelectModel } from "drizzle-orm";
import { conferenceMedia } from "../schemas/conference-media.schema";

export type ConferenceMedia = InferSelectModel<typeof conferenceMedia>;
