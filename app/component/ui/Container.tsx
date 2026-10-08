import { cn } from "@/app/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("container mx-auto  px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
