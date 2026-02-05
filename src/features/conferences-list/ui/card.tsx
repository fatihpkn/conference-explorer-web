import type { ConferenceListItem } from "@/entities/conference";
import Image from "next/image";
import Link from "next/link";
import { Card, CardBody, CardFooter } from "@heroui/react";
import { MapPin } from "lucide-react";

interface ConferenceCardProps {
  conference: ConferenceListItem;
}

export default function ConferenceCard({ conference }: ConferenceCardProps) {
  return (
    <Link href={`/conferences/${conference.id}`}>
      <Card
        isPressable
        className="bg-content1 border border-default hover:border-primary/50 transition-all group"
      >
        {conference.coverImage && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={conference.coverImage}
              alt={conference.name}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-content1 via-transparent to-transparent opacity-60" />
          </div>
        )}
        <CardBody className="p-4">
          <h2 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {conference.name}
          </h2>
          <p className="text-default-foreground text-sm mt-2 line-clamp-2">
            {conference.description}
          </p>
        </CardBody>
        <CardFooter className="pt-0 px-4 pb-4">
          <p className="text-default-foreground text-xs flex items-center gap-1">
            <MapPin className="w-3 h-3" strokeWidth={1.5} />
            {conference.location}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
