export default function ConferenceInfoSkeleton() {
  return (
    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl shadow-sm border border-slate-100 dark:border-[#223649] animate-pulse">
      <div className="prose dark:prose-invert max-w-none">
        <div className="h-6 bg-slate-200 dark:bg-[#223649] rounded w-16 mb-4" />
        <div className="space-y-3">
          <div className="h-4 bg-slate-200 dark:bg-[#223649] rounded w-full" />
          <div className="h-4 bg-slate-200 dark:bg-[#223649] rounded w-full" />
          <div className="h-4 bg-slate-200 dark:bg-[#223649] rounded w-5/6" />
          <div className="h-4 bg-slate-200 dark:bg-[#223649] rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}
