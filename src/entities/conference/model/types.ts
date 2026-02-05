import type { Conference } from "@/shared/lib/db/types/conference.type";
import type { Speaker } from "@/shared/lib/db/types/speaker.type";
import type { Tag } from "@/shared/lib/db/types/tag.type";

export type { Conference };

export interface ConferenceListItem extends Omit<Conference, "embedding"> {
  speakers: Speaker[];
  tags: Tag[];
  coverImage?: string | null;
}

export interface ConferenceMedia {
  id: number;
  conferenceId: number;
  type: "image" | "video" | "presentation" | "cover_letter" | "pdf" | "link";
  url: string | null;
  title: string | null;
  description: string | null;
  body: string | null;
  createdAt: Date | null;
}

export interface ConferenceDetail extends Omit<Conference, "embedding"> {
  speakers: Speaker[];
  tags: Tag[];
  media: ConferenceMedia[];
}

export interface ConferenceFilters {
  search?: string;
  tagId?: number;
  year?: number;
  location?: string;
  speakerId?: number;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type ConferenceSearchParams = {
  search?: string | null;
  tagId?: string | null;
  page?: string | null;
  limit?: string | null;
};

export interface FeaturedTag {
  id: number;
  name: string;
  conferenceCount: number;
}
