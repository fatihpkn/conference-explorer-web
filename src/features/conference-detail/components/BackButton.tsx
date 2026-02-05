"use client";

import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      onPress={() => router.back()}
      variant="bordered"
      color="default"
      startContent={<ArrowLeft className="w-4 h-4" strokeWidth={1.5} />}
    >
      Geri Dön
    </Button>
  );
}
