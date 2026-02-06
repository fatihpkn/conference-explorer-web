export default function ConferenceMediaSkeleton() {
  return (
    <>
      <div className="bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-xl animate-pulse">
        <div className="bg-slate-200 dark:bg-[#223649] aspect-video" />
      </div>

      <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl shadow-sm border border-slate-100 dark:border-[#223649] animate-pulse">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex gap-2">
              <div className="h-6 bg-slate-200 dark:bg-[#223649] rounded w-16" />
              <div className="h-6 bg-slate-200 dark:bg-[#223649] rounded w-20" />
            </div>
            <div className="h-8 bg-slate-200 dark:bg-[#223649] rounded w-3/4" />
            <div className="h-4 bg-slate-200 dark:bg-[#223649] rounded w-1/2" />
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <div className="rounded-full bg-slate-200 dark:bg-[#223649] p-3 w-12 h-12" />
                <div className="h-3 bg-slate-200 dark:bg-[#223649] rounded w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
