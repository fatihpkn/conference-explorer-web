export interface ConferenceFilterState {
  search?: string;
  tagId?: number | null;
  page: number;
  limit: number;
  year?: number | null;
  location?: string;
  speakerId?: number | null;
}

export const defaultConferenceFilterState: ConferenceFilterState = {
  search: "",
  tagId: null,
  page: 1,
  limit: 10,
  year: null,
  location: "",
  speakerId: null,
};
