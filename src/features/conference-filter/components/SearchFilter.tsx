import { Input } from "@heroui/react";
import { Search } from "lucide-react";

interface SearchFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export default function SearchFilter({ value, onChange }: SearchFilterProps) {
  return (
    <Input
      aria-label="Konuşma ara"
      value={value ?? ""}
      onValueChange={(val) => onChange(val?.trim() ? val : null)}
      placeholder="Talks, speakers veya konular ara..."
      isClearable
      variant="bordered"
      radius="full"
      classNames={{
        base: "w-full",
        inputWrapper:
          "h-[72px] rounded-[36px] border border-default-200 bg-content1 px-6 shadow-large transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10",
        input: "text-lg text-default-700 placeholder:text-default-400",
        innerWrapper: "h-full",
        clearButton: "text-default-400",
      }}
      size="lg"
      startContent={
        <Search className="h-5 w-5 text-default-400" strokeWidth={1.5} />
      }
    />
  );
}
