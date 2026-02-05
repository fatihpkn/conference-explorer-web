import type { InferSelectModel } from "drizzle-orm";
import { tags } from "../schemas/tag.schema";

export type Tag = InferSelectModel<typeof tags>;
