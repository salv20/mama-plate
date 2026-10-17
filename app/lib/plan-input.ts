import type { PlannerInput } from "./meal-planner/types";
import type { PlanForm } from "./plan-form";

// Turns the wizard answers into the input the generator expects.
export function toPlannerInput(form: PlanForm): PlannerInput {
  return {
    trimester: form.stage ?? "UNKNOWN",
    exclusions: form.exclusions,
    budget: form.budget ?? "TIGHT",
    // Fail safe: only an explicit "no" allows a plan.
    hasMedicalCondition: form.hasCondition !== false,
    hasOtherAllergy: form.otherAllergy,
  };
}

export const newSeed = () => Math.floor(Math.random() * 1_000_000);
