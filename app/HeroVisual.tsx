"use client";

import { motion } from "framer-motion";
import { Wallet, ShieldCheck } from "lucide-react";
import { cn } from "./lib/cn";
import { easeOut } from "@/app/lib/motion";
import { PlanPreviewCard } from "./PlanPreviewCard";

function FloatingTag({
  children,
  icon,
  delay,
  className,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("absolute", className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 + delay, duration: 0.5, ease: easeOut }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm"
      >
        {icon}
        {children}
      </motion.div>
    </motion.div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden
        className="absolute -right-3 -top-6 h-40 w-40 rounded-full bg-sage-100"
      />
      <div
        aria-hidden
        className="absolute -bottom-6 -left-3 h-32 w-32 rounded-[2rem] bg-blush-100"
      />

      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.25, ease: easeOut }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <PlanPreviewCard />
        </motion.div>
      </motion.div>

      <FloatingTag
        delay={0}
        className="-left-2 top-10 sm:-left-8"
        icon={<ShieldCheck className="h-4 w-4 text-sage-600" />}
      >
        Allergy aware
      </FloatingTag>
      <FloatingTag
        delay={0.4}
        className="-right-2 bottom-14 sm:-right-8"
        icon={<Wallet className="h-4 w-4 text-blush-600" />}
      >
        Fits your budget
      </FloatingTag>
    </div>
  );
}
