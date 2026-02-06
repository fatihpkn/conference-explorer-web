import { getConferenceById } from "@/entities/conference";
import ConferenceMedia from "@/features/conference-detail/components/ConferenceMedia";
import ConferenceInfo from "@/features/conference-detail/components/ConferenceInfo";
import ConferenceMediaSkeleton from "@/features/conference-detail/ui/ConferenceMediaSkeleton";
import ConferenceInfoSkeleton from "@/features/conference-detail/ui/ConferenceInfoSkeleton";
import BackButton from "@/features/conference-detail/components/BackButton";
import SpeakerBioCard from "@/features/conference-detail/components/SpeakerBioCard";
import SpeakersList from "@/features/conference-detail/components/SpeakersList";
import ResourcesCard from "@/features/conference-detail/components/ResourcesCard";
import RelatedContent from "@/features/conference-detail/components/RelatedContent";
import Breadcrumbs from "@/features/conference-detail/components/Breadcrumbs";
import { Suspense, ViewTransition } from "react";

interface ConferenceDetailProps {
  conferenceId: number;
}

export default async function ConferenceDetail({
  conferenceId,
}: ConferenceDetailProps) {
  const conferencePromise = getConferenceById(conferenceId);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <Suspense
          fallback={
            <ViewTransition>
              <div className="flex flex-row gap-4 animate-pulse mt-2">
                <div className="h-6 w-24 bg-slate-200 dark:bg-[#223649] rounded mb-4"></div>
                <div className="h-6 w-24 bg-slate-200 dark:bg-[#223649] rounded mb-4"></div>
                <div className="h-6 w-24 bg-slate-200 dark:bg-[#223649] rounded mb-4"></div>
              </div>
            </ViewTransition>
          }
        >
          <ViewTransition>
            <Breadcrumbs conferencePromise={conferencePromise} />
          </ViewTransition>
        </Suspense>
        <BackButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Suspense fallback={<ConferenceMediaSkeleton />}>
            <ViewTransition>
              <ConferenceMedia conferencePromise={conferencePromise} />
            </ViewTransition>
          </Suspense>

          <Suspense fallback={<ConferenceInfoSkeleton />}>
            <ViewTransition>
              <ConferenceInfo conferencePromise={conferencePromise} />
            </ViewTransition>
          </Suspense>

          <Suspense
            fallback={
              <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl shadow-sm border border-slate-100 dark:border-[#223649] animate-pulse">
                <div className="h-6 bg-slate-200 dark:bg-[#223649] rounded mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-16 bg-slate-200 dark:bg-[#223649] rounded"></div>
                  <div className="h-16 bg-slate-200 dark:bg-[#223649] rounded"></div>
                </div>
              </div>
            }
          >
            <ViewTransition>
              <SpeakersList conferencePromise={conferencePromise} />
            </ViewTransition>
          </Suspense>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <Suspense
            fallback={
              <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl shadow-sm border border-slate-100 dark:border-[#223649] animate-pulse">
                <div className="h-6 bg-slate-200 dark:bg-[#223649] rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 dark:bg-[#223649] rounded"></div>
                  <div className="h-4 bg-slate-200 dark:bg-[#223649] rounded w-3/4"></div>
                </div>
              </div>
            }
          >
            <ViewTransition>
              <SpeakerBioCard conferencePromise={conferencePromise} />
            </ViewTransition>
          </Suspense>

          <Suspense
            fallback={
              <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl shadow-sm border border-slate-100 dark:border-[#223649] animate-pulse">
                <div className="h-6 bg-slate-200 dark:bg-[#223649] rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 dark:bg-[#223649] rounded"></div>
                  <div className="h-4 bg-slate-200 dark:bg-[#223649] rounded"></div>
                </div>
              </div>
            }
          >
            <ViewTransition>
              <ResourcesCard conferencePromise={conferencePromise} />
            </ViewTransition>
          </Suspense>

          <RelatedContent />
        </div>
      </div>
    </div>
  );
}
