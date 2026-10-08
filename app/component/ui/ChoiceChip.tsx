"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/app/lib/cn";

type ChoiceChipProps = {
  label: string;
  selected: boolean;
  onToggle: () => void;
};

// A pill that can be switched on and off. Several can be selected at once.
export function ChoiceChip({ label, selected, onToggle }: ChoiceChipProps) {
  return (
    <motion.button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors duration-200",
        selected
          ? "border-blush-600 bg-blush-600 text-white"
          : "border-line bg-white text-ink hover:border-blush-200 hover:bg-blush-50",
      )}
    >
      <AnimatePresence initial={false}>
        {selected && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 16, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <Check className="h-4 w-4" strokeWidth={3} />
          </motion.span>
        )}
      </AnimatePresence>
      {label}
    </motion.button>
  );
}
