"use client";

import { motion } from "framer-motion";
import { easeOut } from "@/app/lib/motion";

const variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 36 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -36 }),
};

// Slides the next step in from the right, or from the left when going back.
export function StepTransition({
  direction,
  children,
}: {
  direction: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.32, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
