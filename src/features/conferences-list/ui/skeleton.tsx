interface ConferenceSkeletonProps {
  count: number;
}

export function ConferenceCardSkeleton() {
  return (
    <div className="p-6 bg-content1/80 border border-default-200 rounded-2xl flex gap-6 animate-pulse">
      <div className="flex flex-col items-center justify-center min-w-16 h-16 rounded-xl bg-default-200/80" />

      <div className="flex-1 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-3 w-24 rounded-full bg-default-200" />
          <div className="h-3 w-3 rounded-full bg-default-200" />
          <div className="h-3 w-12 rounded-full bg-default-200" />
        </div>

        <div className="space-y-2">
          <div className="h-5 w-3/4 rounded bg-default-200" />
          <div className="h-4 w-full rounded bg-default-100" />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-default-200" />
            <div className="h-4 w-24 rounded bg-default-100" />
          </div>
          <div className="w-6 h-6 rounded bg-default-200" />
        </div>
      </div>
    </div>
  );
}

export default function ConferenceListSkeleton({
  count,
}: ConferenceSkeletonProps) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <ConferenceCardSkeleton key={index} />
      ))}
    </div>
  );
}
