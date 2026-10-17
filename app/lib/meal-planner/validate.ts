import {
  EXCLUSIONS,
  SLOTS,
  TAGS,
  TRIMESTERS,
  BUDGETS,
  type AvoidItem,
  type Meal,
} from "./types";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function checkApproval(
  label: string,
  item: {
    status: string;
    sourceId: string | null;
    reviewedBy: string | null;
    reviewedAt: string | null;
  },
  sourceIds: string[],
  errors: string[],
) {
  if (item.sourceId !== null && !sourceIds.includes(item.sourceId)) {
    errors.push(`${label}: unknown sourceId "${item.sourceId}"`);
  }
  if (item.status === "APPROVED") {
    if (item.sourceId === null) errors.push(`${label}: approved without a source`);
    if (!item.reviewedBy) errors.push(`${label}: approved without a reviewer`);
    if (!item.reviewedAt || !DATE_PATTERN.test(item.reviewedAt)) {
      errors.push(`${label}: approved without a valid review date`);
    }
  }
}

export function validateMeals(meals: Meal[], sourceIds: string[]): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const meal of meals) {
    const label = `meal ${meal.id}`;
    if (seen.has(meal.id)) errors.push(`${label}: duplicate id`);
    seen.add(meal.id);
    if (!meal.name.trim()) errors.push(`${label}: empty name`);
    if (!meal.why.trim()) errors.push(`${label}: empty explanation`);
    if (meal.slots.length === 0) errors.push(`${label}: no slots`);
    if (meal.trimesters.length === 0) errors.push(`${label}: no trimesters`);
    if (meal.tags.length === 0) errors.push(`${label}: no tags`);
    if (!BUDGETS.includes(meal.cost)) errors.push(`${label}: bad cost`);
    for (const s of meal.slots) {
      if (!SLOTS.includes(s)) errors.push(`${label}: bad slot ${s}`);
    }
    for (const t of meal.trimesters) {
      if (!TRIMESTERS.includes(t)) errors.push(`${label}: bad trimester ${t}`);
    }
    for (const c of meal.contains) {
      if (!EXCLUSIONS.includes(c)) errors.push(`${label}: bad allergen ${c}`);
    }
    for (const tag of meal.tags) {
      if (!TAGS.includes(tag)) errors.push(`${label}: bad tag ${tag}`);
    }
    checkApproval(label, meal, sourceIds, errors);
  }
  return errors;
}

export function validateAvoidItems(
  items: AvoidItem[],
  sourceIds: string[],
): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const item of items) {
    const label = `avoid item ${item.id}`;
    if (seen.has(item.id)) errors.push(`${label}: duplicate id`);
    seen.add(item.id);
    if (!item.text.trim()) errors.push(`${label}: empty text`);
    checkApproval(label, item, sourceIds, errors);
  }
  return errors;
}
