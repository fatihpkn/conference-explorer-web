import type { InferSelectModel } from "drizzle-orm";
import { speakers } from "../schemas/speaker.schema";

export type Speaker = InferSelectModel<typeof speakers>;
