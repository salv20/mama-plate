"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/app/lib/cn";

type OptionCardProps = {
  title: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
};

// A large tappable choice. Use inside a role="radiogroup" wrapper.
export function OptionCard({
  title,
  description,
  selected,
  onSelect,
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      whileTap={{ scale: 0.985 }}
      className={cn(
        "flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-colors duration-200 sm:p-5",
        selected
          ? "border-blush-600 bg-blush-50"
          : "border-line bg-white hover:border-blush-200",
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
          selected
            ? "border-blush-600 bg-blush-600 text-white"
            : "border-blush-200 bg-white",
        )}
      >
        <AnimatePresence>
          {selected && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span>
        <span className="block font-semibold text-ink">{title}</span>
        {description && (
          <span className="mt-1 block text-sm text-muted">{description}</span>
        )}
      </span>
    </motion.button>
  );
}
