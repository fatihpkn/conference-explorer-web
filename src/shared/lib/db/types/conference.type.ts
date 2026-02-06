import type { InferSelectModel } from "drizzle-orm";
import { conferences } from "../schemas/conference.schema";

export type Conference = InferSelectModel<typeof conferences>;

export interface ConferenceWithSpeakers {
  id: Conference["id"];
  name: Conference["name"];
  description: Conference["description"];
  location: Conference["location"];
  startDate: Conference["startDate"];
  endDate: Conference["endDate"];
  createdAt: Conference["createdAt"];
  speakers: Speaker[];
}

export type Speaker = {
  id: number;
  name: string;
  bio: string | null;
  email: string | null;
  createdAt: Date;
};
