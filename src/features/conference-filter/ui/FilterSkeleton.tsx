export default function FilterSkeleton() {
  return (
    <div className="space-y-2">
      {/* Filter Input Skeleton */}
      <div className="h-10 bg-[#223649]/20 rounded-xl animate-pulse w-full border border-[#223649]/10" />

      {/* Additional filter elements could go here */}
      <div className="flex gap-2">
        <div className="h-8 w-20 bg-[#223649]/10 rounded-full animate-pulse" />
        <div className="h-8 w-16 bg-[#223649]/10 rounded-full animate-pulse" />
        <div className="h-8 w-18 bg-[#223649]/10 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
