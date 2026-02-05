import type { InferSelectModel } from "drizzle-orm";
import { conferenceSpeakers } from "../schemas/conference-speaker.schema";

export type ConferenceSpeaker = InferSelectModel<typeof conferenceSpeakers>;
