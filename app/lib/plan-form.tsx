// The answers a user gives. Kept in memory only, never sent or stored.
export type Stage = "FIRST" | "SECOND" | "THIRD" | "UNKNOWN";
export type Budget = "TIGHT" | "MODERATE" | "COMFORTABLE";
export type Allergy =
  | "GROUNDNUT"
  | "EGG"
  | "FISH"
  | "SHELLFISH"
  | "MILK"
  | "SOY"
  | "WHEAT"
  | "PORK";

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
