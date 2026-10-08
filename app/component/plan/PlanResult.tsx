"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { DISCLAIMER } from "@/app/lib/safety";
import { fadeUp, stagger } from "@/app/lib/motion";
import {
  MOCK_PLAN,
  SLOTS,
  SLOT_LABELS,
  type SlotKey,
} from "@/app/lib/mock-plan";
import type { PlanForm } from "@/app/lib/plan-form";
import { planToText } from "@/app/lib/plan-text";
import { AvoidPanel } from "./AvoidPanel";
import { CopyButton } from "./CopyButton";
import { MealCard } from "./MealCard";
import { ResultHeader } from "./ResultHeader";

const initialPicks = Object.fromEntries(
  SLOTS.map((slot) => [slot, 0]),
) as Record<SlotKey, number>;

export function PlanResult({
  form,
  onReset,
}: {
  form: PlanForm;
  onReset: () => void;
}) {
  const [picks, setPicks] = useState(initialPicks);

  const items = SLOTS.map((slot) => {
    const options = MOCK_PLAN[slot];
    return { slot, meal: options[picks[slot] % options.length] };
  });

  const swap = (slot: SlotKey) =>
    setPicks((p) => ({ ...p, [slot]: p[slot] + 1 }));

  return (
    <div>
      <ResultHeader form={form} />

      <motion.ul
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mt-8 space-y-4"
      >
        {items.map(({ slot, meal }) => (
          <motion.li key={slot} variants={fadeUp}>
            <MealCard
              label={SLOT_LABELS[slot]}
              meal={meal}
              onSwap={() => swap(slot)}
            />
          </motion.li>
        ))}
      </motion.ul>

      <div className="mt-10">
        <AvoidPanel />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <CopyButton text={planToText(items)} />
        <Button variant="secondary" size="lg" onClick={onReset}>
          Start over
        </Button>
        <Button variant="ghost" size="lg" href="/urgent-care">
          When to see a clinician urgently
        </Button>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-muted">{DISCLAIMER}</p>
    </div>
  );
}
