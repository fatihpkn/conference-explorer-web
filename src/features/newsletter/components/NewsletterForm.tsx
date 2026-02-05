"use client";

import { Button, Input } from "@heroui/react";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
      <Input
        type="email"
        placeholder="E-posta adresinizi girin"
        value={email}
        onValueChange={setEmail}
        classNames={{
          input: "text-foreground",
          inputWrapper: "bg-content1 border-default",
        }}
        size="lg"
        radius="lg"
      />
      <Button color="primary" size="lg" className="font-bold" radius="lg">
        Abone Ol
      </Button>
    </div>
  );
}
