import { cn } from "@/app/lib/cn";

type Tone = "blush" | "sage" | "neutral";

const tones: Record<Tone, string> = {
  blush: "border-blush-100 bg-blush-50 text-blush-700",
  sage: "border-sage-100 bg-sage-50 text-sage-700",
  neutral: "border-line bg-white text-muted",
};

export function Badge({
  tone = "blush",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
