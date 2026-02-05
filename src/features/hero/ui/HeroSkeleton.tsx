export default function HeroSkeleton() {
  return (
    <section className="relative w-full h-125 overflow-hidden">
      <div className="absolute inset-0 bg-background animate-pulse" />
      <div className="relative h-full max-w-360 mx-auto px-4 md:px-10 lg:px-20 flex flex-col justify-center gap-6">
        <div className="w-48 h-6 bg-default/20 rounded-full animate-pulse" />
        <div className="space-y-4">
          <div className="w-full max-w-3xl h-16 bg-default/20 rounded-lg animate-pulse" />
          <div className="w-full max-w-3xl h-16 bg-default/20 rounded-lg animate-pulse" />
        </div>
        <div className="w-full max-w-xl h-6 bg-default/20 rounded animate-pulse" />
        <div className="flex gap-4">
          <div className="w-32 h-12 bg-default/20 rounded-xl animate-pulse" />
          <div className="w-32 h-12 bg-default/20 rounded-xl animate-pulse" />
        </div>
        <div className="flex gap-4">
          <div className="w-64 h-16 bg-default/20 rounded-xl animate-pulse" />
          <div className="w-64 h-16 bg-default/20 rounded-xl animate-pulse" />
          <div className="w-64 h-16 bg-default/20 rounded-xl animate-pulse" />
        </div>
      </div>
    </section>
  );
}
