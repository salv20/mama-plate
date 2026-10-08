"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import type { MockMeal } from "@/app/lib/mock-plan";

export function MealCard({
  label,
  meal,
  onSwap,
}: {
  label: string;
  meal: MockMeal;
  onSwap: () => void;
}) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blush-600">
          {label}
        </p>
        <button
          type="button"
          onClick={onSwap}
          aria-label={`Swap ${label.toLowerCase()}`}
          className="group inline-flex h-9 items-center gap-2 rounded-full border border-line px-3.5 text-sm font-semibold text-muted transition-colors hover:border-blush-200 hover:bg-blush-50 hover:text-blush-700"
        >
          <RefreshCw className="h-3.5 w-3.5 transition-transform duration-300 group-active:rotate-180" />
          Swap
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={meal.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="mt-3 text-lg font-bold text-ink">{meal.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {meal.why}
          </p>
          {meal.prep && (
            <p className="mt-2 text-sm text-sage-700">{meal.prep}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {meal.tags.map((tag) => (
              <Badge key={tag} tone="sage">
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </Card>
  );
}
