import { NextResponse } from "next/server";
import { getConferences } from "@/entities/conference";
import { loadConferenceFilters } from "@/features/conference-filter/lib/conferenceFilters.server";
import { sleep } from "@/shared/utils/sleep";

export async function GET(request: Request) {
  const filters = loadConferenceFilters(new URL(request.url).searchParams);

  try {
    const data = await getConferences({
      limit: filters.limit,
      page: filters.page,
      search: filters.search,
      tagId: filters.tagId,
      year: filters.year,
      location: filters.location,
      speakerId: filters.speakerId,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("/api/conferences error", error);
    return NextResponse.json(
      { message: "Konferanslar yüklenemedi" },
      { status: 500 }
    );
  }
}
