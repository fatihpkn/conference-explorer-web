import { Suspense } from "react";
import FeaturedConferences from "@/widgets/featured-conferences/FeaturedConferences";
import Hero from "@/widgets/hero-carousel/HeroCarousel";
import Newsletter from "@/widgets/newsletter/Newsletter";
import HeroSkeleton from "@/features/hero/ui/HeroSkeleton";

export const dynamic = "force-dynamic";

export default function LandingPage() {
  return (
    <main className="flex-1 flex flex-col w-full">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>

      <div className="max-w-360 mx-auto w-full px-4 md:px-10 lg:px-20 py-12">
        <FeaturedConferences limit={5} />
      </div>

      <Newsletter />
    </main>
  );
}
