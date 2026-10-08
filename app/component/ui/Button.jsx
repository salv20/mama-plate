import Link from "next/link";
import { cn } from "@/app/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-blush-600 text-white shadow-sm hover:-translate-y-0.5 hover:bg-blush-700 hover:shadow-md",
  secondary:
    "border border-line bg-white text-ink hover:border-blush-200 hover:bg-blush-50",
  ghost: "text-blush-700 hover:bg-blush-50",
  inverse: "bg-white text-blush-700 hover:-translate-y-0.5 hover:bg-blush-50",
};

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...rest
}) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
