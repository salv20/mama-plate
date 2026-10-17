import Link from "next/link";
import { Leaf } from "lucide-react";
import { site } from "@/app/lib/site";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      aria-label={`${site.name} home`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blush-600 text-white">
        <Leaf className="h-5 w-5" />
      </span>
      <span className="text-lg font-bold tracking-tight text-ink">
        {site.name}
      </span>
    </Link>
  );
}
