"use client";

import { useState } from "react";
import { initialForm, type Allergy, type PlanForm } from "@/app/lib/plan-form";

export const STEPS = [
  "safety",
  "stage",
  "allergies",
  "budget",
  "result",
] as const;
export type StepKey = (typeof STEPS)[number];

const LAST = STEPS.length - 1;
export const QUESTION_COUNT = 4;

export function usePlanWizard() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [form, setForm] = useState<PlanForm>(initialForm);

  const step = STEPS[index];

  const canContinue =
    step === "safety"
      ? form.hasCondition !== null
      : step === "stage"
        ? form.stage !== null
        : step === "budget"
          ? form.budget !== null
          : true;

  function goTo(target: number) {
    setDirection(target > index ? 1 : -1);
    setIndex(target);
  }

  function next() {
    if (!canContinue) return;
    // A medical condition skips straight to the safe message.
    if (step === "safety" && form.hasCondition) return goTo(LAST);
    goTo(Math.min(index + 1, LAST));
  }

  function back() {
    if (step === "result" && form.hasCondition) return goTo(0);
    goTo(Math.max(index - 1, 0));
  }

  function reset() {
    setDirection(-1);
    setIndex(0);
    setForm(initialForm);
  }

  function update(patch: Partial<PlanForm>) {
    setForm((current) => ({ ...current, ...patch }));
  }

  function toggleExclusion(item: Allergy) {
    setForm((current) => ({
      ...current,
      exclusions: current.exclusions.includes(item)
        ? current.exclusions.filter((x) => x !== item)
        : [...current.exclusions, item],
    }));
  }

  return {
    step,
    stepNumber: Math.min(index + 1, QUESTION_COUNT),
    direction,
    form,
    canContinue,
    next,
    back,
    reset,
    update,
    toggleExclusion,
  };
}

export type PlanWizardState = ReturnType<typeof usePlanWizard>;
