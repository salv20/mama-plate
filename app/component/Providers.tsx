"use client";

import { MotionConfig } from "framer-motion";

// Respects the "reduce motion" setting on the user's phone or computer.
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
