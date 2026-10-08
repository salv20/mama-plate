import type { LucideIcon } from "lucide-react";
import { cn } from "@/app/lib/cn";

type Tone = "blush" | "sage";

const tones: Record<Tone, string> = {
  blush: "bg-blush-50 text-blush-600",
  sage: "bg-sage-50 text-sage-600",
};

export function IconBox({
  icon: Icon,
  tone = "blush",
  className,
}: {
  icon: LucideIcon;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
        tones[tone],
        className,
      )}
    >
      <Icon className="h-6 w-6" />
    </span>
  );
}
