import type { Allergy, Budget, Stage } from "./plan-form";

export const STAGE_OPTIONS: {
  value: Stage;
  title: string;
  description: string;
}[] = [
  { value: "FIRST", title: "First trimester", description: "Weeks 1 to 13" },
  { value: "SECOND", title: "Second trimester", description: "Weeks 14 to 27" },
  {
    value: "THIRD",
    title: "Third trimester",
    description: "Week 28 until birth",
  },
  {
    value: "UNKNOWN",
    title: "I am not sure",
    description: "We will show meals that suit every stage",
  },
];

export const BUDGET_OPTIONS: {
  value: Budget;
  title: string;
  description: string;
}[] = [
  {
    value: "TIGHT",
    title: "Tight",
    description: "Mostly staples like beans, yam, pap and seasonal fruit",
  },
  {
    value: "MODERATE",
    title: "Moderate",
    description: "Staples plus eggs, fish or chicken some days",
  },
  {
    value: "COMFORTABLE",
    title: "Comfortable",
    description: "More variety, including meat and dairy",
  },
];

export const ALLERGY_OPTIONS: { value: Allergy; label: string }[] = [
  { value: "GROUNDNUT", label: "Groundnut" },
  { value: "EGG", label: "Egg" },
  { value: "FISH", label: "Fish" },
  { value: "SHELLFISH", label: "Crayfish and shellfish" },
  { value: "MILK", label: "Milk" },
  { value: "SOY", label: "Soy" },
  { value: "WHEAT", label: "Wheat" },
  { value: "PORK", label: "Pork" },
];

export const stageLabel = (stage: Stage | null) =>
  STAGE_OPTIONS.find((o) => o.value === stage)?.title ?? "";

export const budgetLabel = (budget: Budget | null) =>
  BUDGET_OPTIONS.find((o) => o.value === budget)?.title ?? "";

export const allergyLabel = (allergy: Allergy) =>
  ALLERGY_OPTIONS.find((o) => o.value === allergy)?.label ?? allergy;
