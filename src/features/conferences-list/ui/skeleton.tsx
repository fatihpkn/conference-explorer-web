interface ConferenceSkeletonProps {
  count: number;
}

export default function ConferenceListSkeleton({
  count,
}: ConferenceSkeletonProps) {
  return (
    <div className="animate-pulse space-y-4 p-4 w-full grid gap-6 grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="h-50 w-full bg-gray-200 rounded"></div>
      ))}
    </div>
  );
}
