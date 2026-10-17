import { DAILY_RULES } from "./rules";
import {
  BUDGETS,
  PLAN_SLOTS,
  PLAN_SLOT_TO_MEAL_SLOT,
  TRIMESTERS,
  type DailyRule,
  type Meal,
  type PlanOk,
  type PlanOptions,
  type PlanResult,
  type PlanSlot,
  type PlannedItem,
  type PlannerInput,
  type UnmetRule,
} from "./types";

export const DISCLAIMER =
  "This is general nutrition education, not medical advice. The meals avoid the foods you selected, but always check ingredient labels and ask your clinician or midwife about your own diet.";

export const BLOCKED_MESSAGE =
  "Because you have a medical condition, please follow the diet plan from your doctor or midwife. This tool cannot give you a meal plan.";

// Small seeded random number generator so the same seed gives the same plan.
// That makes the generator testable and makes "swap" predictable.
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(list: T[], rng: () => number): T {
  return list[Math.floor(rng() * list.length)];
}

function shuffle<T>(list: T[], rng: () => number): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function suitableForTrimester(meal: Meal, trimester: PlannerInput["trimester"]) {
  if (trimester === "UNKNOWN") {
    // Not sure of stage: only use meals that are suitable at every stage.
    return TRIMESTERS.every((t) => meal.trimesters.includes(t));
  }
  return meal.trimesters.includes(trimester);
}

export function eligibleMeals(input: PlannerInput, meals: Meal[]): Meal[] {
  const budgetRank = BUDGETS.indexOf(input.budget);
  return meals.filter(
    (meal) =>
      meal.contains.every((item) => !input.exclusions.includes(item)) &&
      BUDGETS.indexOf(meal.cost) <= budgetRank &&
      suitableForTrimester(meal, input.trimester),
  );
}

export function evaluateRules(
  items: PlannedItem[],
  rules: DailyRule[],
): UnmetRule[] {
  const unmet: UnmetRule[] = [];
  for (const rule of rules) {
    if (rule.kind === "DAY_MIN") {
      const count = items.filter((i) => i.meal.tags.includes(rule.tag)).length;
      if (count < rule.min) unmet.push({ id: rule.id, message: rule.message });
    } else {
      const relevant = items.filter((i) => rule.slots.includes(i.slot));
      if (relevant.some((i) => !i.meal.tags.includes(rule.tag))) {
        unmet.push({ id: rule.id, message: rule.message });
      }
    }
  }
  return unmet;
}

function buildNotices(input: PlannerInput): string[] {
  const notices: string[] = [];
  if (input.hasOtherAllergy) {
    notices.push(
      "You mentioned another allergy. This tool cannot check it, so please ask your clinician before using any meal.",
    );
  }
  if (input.trimester === "UNKNOWN") {
    notices.push(
      "Because you are not sure of your stage, only meals suitable for every stage are shown.",
    );
  }
  return notices;
}

function buildResult(
  items: PlannedItem[],
  unmetRules: UnmetRule[],
  emptySlots: PlanSlot[],
  notices: string[],
  seed: number,
): PlanOk {
  let status: PlanOk["status"] = "COMPLETE";
  if (items.length === 0) status = "EMPTY";
  else if (emptySlots.length > 0 || unmetRules.length > 0) status = "PARTIAL";
  return { status, items, emptySlots, unmetRules, notices, seed };
}

export function generateDayPlan(
  input: PlannerInput,
  meals: Meal[],
  options: PlanOptions = {},
): PlanResult {
  // The safety gate lives here so the UI cannot skip it.
  if (input.hasMedicalCondition) {
    return { status: "BLOCKED", reason: BLOCKED_MESSAGE };
  }

  const rules = options.rules ?? DAILY_RULES;
  const attempts = options.attempts ?? 200;
  const seed = options.seed ?? 1;
  const rng = mulberry32(seed);

  const eligible = eligibleMeals(input, meals);
  const candidates = PLAN_SLOTS.map((slot) => ({
    slot,
    list: eligible.filter((m) =>
      m.slots.includes(PLAN_SLOT_TO_MEAL_SLOT[slot]),
    ),
  }));
  const emptySlots = candidates
    .filter((c) => c.list.length === 0)
    .map((c) => c.slot);

  let bestItems: PlannedItem[] = [];
  let bestUnmet: UnmetRule[] | null = null;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const used = new Set<string>();
    const items: PlannedItem[] = [];
    for (const candidate of candidates) {
      if (candidate.list.length === 0) continue;
      const fresh = candidate.list.filter((m) => !used.has(m.id));
      const pool = fresh.length > 0 ? fresh : candidate.list;
      const meal = pick(pool, rng);
      used.add(meal.id);
      items.push({ slot: candidate.slot, meal });
    }
    const unmet = evaluateRules(items, rules);
    if (bestUnmet === null || unmet.length < bestUnmet.length) {
      bestItems = items;
      bestUnmet = unmet;
    }
    if (unmet.length === 0) break;
  }

  return buildResult(
    bestItems,
    bestUnmet ?? [],
    emptySlots,
    buildNotices(input),
    seed,
  );
}

// Replace one meal in an existing plan. Prefers an option that does not make
// the plan worse against the daily rules.
export function swapMeal(
  current: PlanOk,
  slot: PlanSlot,
  input: PlannerInput,
  meals: Meal[],
  options: PlanOptions = {},
): PlanOk {
  const existing = current.items.find((i) => i.slot === slot);
  if (!existing) return current;

  const rules = options.rules ?? DAILY_RULES;
  const rng = mulberry32(options.seed ?? current.seed + 1);
  const inPlan = new Set(current.items.map((i) => i.meal.id));
  const pool = eligibleMeals(input, meals).filter(
    (m) =>
      m.slots.includes(PLAN_SLOT_TO_MEAL_SLOT[slot]) && !inPlan.has(m.id),
  );

  if (pool.length === 0) {
    const message = "No other option fits your choices for this meal.";
    return current.notices.includes(message)
      ? current
      : { ...current, notices: [...current.notices, message] };
  }

  const replaceWith = (meal: Meal): PlannedItem[] =>
    current.items.map((i) => (i.slot === slot ? { slot, meal } : i));

  const order = shuffle(pool, rng);
  const baseline = current.unmetRules.length;
  let chosen = order[0];
  for (const meal of order) {
    if (evaluateRules(replaceWith(meal), rules).length <= baseline) {
      chosen = meal;
      break;
    }
  }

  const items = replaceWith(chosen);
  return buildResult(
    items,
    evaluateRules(items, rules),
    current.emptySlots,
    current.notices,
    current.seed,
  );
}
