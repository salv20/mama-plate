import type { BudgetTier, Exclusion, TrimesterInput } from "./meal-planner/types";

// The answers a user gives. Kept in memory only, never sent or stored.
export type Stage = TrimesterInput;
export type Budget = BudgetTier;
export type Allergy = Exclusion;

export type PlanForm = {
  hasCondition: boolean | null;
  stage: Stage | null;
  exclusions: Allergy[];
  otherAllergy: boolean;
  budget: Budget | null;
};

export const initialForm: PlanForm = {
  hasCondition: null,
  stage: null,
  exclusions: [],
  otherAllergy: false,
  budget: null,
};
