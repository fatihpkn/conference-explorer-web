import HeroContent from "@/features/hero/components/HeroContent";
import { getUpcomingConferences } from "@/entities/conference";

export default function Hero() {
  const upcomingConferences = getUpcomingConferences(3);

  return <HeroContent upcomingConferences={upcomingConferences} />;
}
