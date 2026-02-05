interface ConferenceSectionSkeletonProps {
  count: number;
}

export default function ConferenceSectionSkeleton({
  count,
}: ConferenceSectionSkeletonProps) {
  return (
    <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 w-full max-w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-64 min-w-s w-full bg-foreground/10 rounded-3xl"
        ></div>
      ))}
    </div>
  );
}
