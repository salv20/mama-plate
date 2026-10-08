"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";

// A short message that slides open and closed.
export function InlineNote({
  show = true,
  children,
}: {
  show?: boolean;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <p className="mt-4 flex gap-3 rounded-2xl bg-blush-50 p-4 text-sm leading-relaxed text-blush-700">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{children}</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
