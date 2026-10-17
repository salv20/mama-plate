export const TRIMESTERS = ["FIRST", "SECOND", "THIRD"] as const;
export type Trimester = (typeof TRIMESTERS)[number];
export type TrimesterInput = Trimester | "UNKNOWN";

export const BUDGETS = ["TIGHT", "MODERATE", "COMFORTABLE"] as const;
export type BudgetTier = (typeof BUDGETS)[number];

// Things a user can choose to exclude. Allergens plus personal or religious exclusions.
export const EXCLUSIONS = [
  "GROUNDNUT",
  "EGG",
  "FISH",
  "SHELLFISH",
  "MILK",
  "SOY",
  "WHEAT",
  "PORK",
] as const;
export type Exclusion = (typeof EXCLUSIONS)[number];

export const TAGS = [
  "IRON",
  "PROTEIN",
  "CALCIUM",
  "FIBRE",
  "VITAMIN_C",
  "VEGETABLE",
  "FRUIT",
] as const;
export type Tag = (typeof TAGS)[number];

// Which kind of meal this is in the library.
export const SLOTS = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"] as const;
export type Slot = (typeof SLOTS)[number];

// The five eating moments in a day plan.
export const PLAN_SLOTS = [
  "BREAKFAST",
  "MORNING_SNACK",
  "LUNCH",
  "AFTERNOON_SNACK",
  "DINNER",
] as const;
export type PlanSlot = (typeof PLAN_SLOTS)[number];

export const PLAN_SLOT_TO_MEAL_SLOT: Record<PlanSlot, Slot> = {
  BREAKFAST: "BREAKFAST",
  MORNING_SNACK: "SNACK",
  LUNCH: "LUNCH",
  AFTERNOON_SNACK: "SNACK",
  DINNER: "DINNER",
};

export const PLAN_SLOT_LABELS: Record<PlanSlot, string> = {
  BREAKFAST: "Breakfast",
  MORNING_SNACK: "Morning snack",
  LUNCH: "Lunch",
  AFTERNOON_SNACK: "Afternoon snack",
  DINNER: "Dinner",
};

export type ContentStatus = "DRAFT" | "APPROVED";

export interface Meal {
  id: string;
  name: string;
  slots: Slot[];
  trimesters: Trimester[];
  // Allergens and excluded foods this meal contains.
  contains: Exclusion[];
  cost: BudgetTier;
  tags: Tag[];
  // One plain sentence on why the meal is in the library.
  why: string;
  // Optional safety or preparation note shown with the meal.
  prep?: string;
  // Required once status is APPROVED.
  sourceId: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null; // YYYY-MM-DD
  status: ContentStatus;
}

export interface AvoidItem {
  id: string;
  group: "AVOID" | "LIMIT";
  text: string;
  sourceId: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  status: ContentStatus;
}

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url: string;
  year: number;
}

// What the user tells the tool. None of this is stored anywhere.
export interface PlannerInput {
  trimester: TrimesterInput;
  exclusions: Exclusion[];
  budget: BudgetTier;
  // Answer to the safety gate question (diabetes, high blood pressure, etc).
  hasMedicalCondition: boolean;
  // User ticked "another allergy not listed".
  hasOtherAllergy?: boolean;
}

export type DailyRule =
  | {
      id: string;
      kind: "DAY_MIN"; // at least `min` meals in the day carry the tag
      tag: Tag;
      min: number;
      message: string;
    }
  | {
      id: string;
      kind: "EACH_SLOT"; // every meal in the listed plan slots carries the tag
      tag: Tag;
      slots: PlanSlot[];
      message: string;
    };

export interface UnmetRule {
  id: string;
  message: string;
}

export interface PlannedItem {
  slot: PlanSlot;
  meal: Meal;
}

export type PlanResult =
  | { status: "BLOCKED"; reason: string }
  | {
      status: "COMPLETE" | "PARTIAL" | "EMPTY";
      items: PlannedItem[];
      emptySlots: PlanSlot[];
      unmetRules: UnmetRule[];
      notices: string[];
      seed: number;
    };

export type PlanOk = Exclude<PlanResult, { status: "BLOCKED" }>;

export interface PlanOptions {
  seed?: number;
  attempts?: number;
  rules?: DailyRule[];
}
