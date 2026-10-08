import { cn } from "@/app/lib/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(43,31,39,0.04)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
