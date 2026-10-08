"use client";

import { motion } from "framer-motion";

export function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs font-semibold text-muted">
        <span>
          Step {current} of {total}
        </span>
        <span>About a minute</span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-blush-100"
      >
        <motion.div
          className="h-full rounded-full bg-blush-600"
          initial={false}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}
