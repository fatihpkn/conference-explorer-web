import type { InferSelectModel } from "drizzle-orm";
import { conferenceTags } from "../schemas/conference-tag.schema";

export type ConferenceTag = InferSelectModel<typeof conferenceTags>;
