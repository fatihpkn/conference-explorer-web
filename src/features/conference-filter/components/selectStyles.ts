const selectBase = "relative";

const triggerBase = [
  "h-12",
  "rounded-full",
  "border",
  "border-default-200",
  "bg-content1",
  "px-5",
  "text-base",
  "font-medium",
  "text-default-700",
  "shadow-sm",
  "transition",
  "duration-200",
  "hover:border-primary/60",
  "focus:border-primary",
  "focus:ring-4",
  "focus:ring-primary/20",
].join(" ");

const labelBase =
  "text-xs font-semibold uppercase tracking-[0.3em] text-default-400";

const listboxBase =
  "rounded-2xl border border-default-200 bg-content1/95 backdrop-blur p-2";

const popoverBase =
  "rounded-2xl border border-default-200 bg-content1/95 backdrop-blur";

export const selectClassNames = {
  base: selectBase,
  trigger: triggerBase,
  value: "text-default-700",
  label: labelBase,
  listbox: listboxBase,
  popoverContent: popoverBase,
};
