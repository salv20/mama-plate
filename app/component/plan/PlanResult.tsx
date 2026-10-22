"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shuffle } from "lucide-react";
import { Button } from "../ui/Button";
import { fadeUp, stagger } from "@/app/lib/motion";
import {
  DISCLAIMER,
  formatPlanAsText,
  generateDayPlan,
  getAvoidItems,
  getMeals,
  swapMeal,
} from "@/app/lib/meal-planner";
import {
  PLAN_SLOTS,
  PLAN_SLOT_LABELS,
  type Meal,
  type PlanOk,
  type PlanSlot,
  type PlannerInput,
} from "@/app/lib/meal-planner/types";
import type { PlanForm } from "@/app/lib/plan-form";
import { newSeed, toPlannerInput } from "@/app/lib/plan-input";
import { AvoidPanel } from "./AvoidPanel";
import { CopyButton } from "./CopyButton";
import { EmptySlotCard } from "./EmptySlotCard";
import { MealCard } from "./MealCard";
import { PlanNotices } from "./PlanNotices";
import { ResultHeader } from "./ResultHeader";

function buildPlan(input: PlannerInput, meals: Meal[]): PlanOk | null {
  const result = generateDayPlan(input, meals, { seed: newSeed() });
  return result.status === "BLOCKED" ? null : result;
}

export function PlanResult({
  form,
  onReset,
}: {
  form: PlanForm;
  onReset: () => void;
}) {
  const input = useMemo(() => toPlannerInput(form), [form]);
  const meals = useMemo(() => getMeals(), []);
  const avoidItems = useMemo(() => getAvoidItems(), []);

  const [plan, setPlan] = useState<PlanOk | null>(() =>
    buildPlan(input, meals),
  );
  const [round, setRound] = useState(0);

  if (!plan) return null;

  const swap = (slot: PlanSlot) =>
    setPlan((current) =>
      current
        ? swapMeal(current, slot, input, meals, { seed: newSeed() })
        : current,
    );

  const shuffleAll = () => {
    setPlan(buildPlan(input, meals));
    setRound((r) => r + 1);
  };

  return (
    <div>
      <ResultHeader form={form} />
      <PlanNotices plan={plan} noContent={meals.length === 0} />

      <motion.ul
        key={round}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mt-8 space-y-4"
      >
        {PLAN_SLOTS.map((slot) => {
          const item = plan.items.find((i) => i.slot === slot);
          return (
            <motion.li key={slot} variants={fadeUp}>
              {item ? (
                <MealCard
                  label={PLAN_SLOT_LABELS[slot]}
                  meal={item.meal}
                  onSwap={() => swap(slot)}
                />
              ) : (
                <EmptySlotCard label={PLAN_SLOT_LABELS[slot]} />
              )}
            </motion.li>
          );
        })}
      </motion.ul>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <CopyButton text={formatPlanAsText(plan, avoidItems)} />
        <Button variant="secondary" size="lg" onClick={shuffleAll}>
          <Shuffle className="h-4 w-4" />
          New ideas
        </Button>
        <Button variant="ghost" size="lg" onClick={onReset}>
          Start over
        </Button>
      </div>

      <div className="mt-10">
        <AvoidPanel items={avoidItems} />
      </div>

      <p className="mt-6 text-sm">
        <Link
          href="/urgent-care"
          className="font-semibold text-blush-700 underline-offset-4 hover:underline"
        >
          When to see a clinician urgently
        </Link>
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted">{DISCLAIMER}</p>
    </div>
  );
}
