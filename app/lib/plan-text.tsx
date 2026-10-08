import { DISCLAIMER } from "./safety";
import {
  MOCK_AVOID,
  SLOT_LABELS,
  type MockMeal,
  type SlotKey,
} from "./mock-plan";

// Plain text version of the plan, ready to paste into WhatsApp or SMS.
export function planToText(items: { slot: SlotKey; meal: MockMeal }[]): string {
  const lines = ["My meal plan for today", ""];

  for (const { slot, meal } of items) {
    lines.push(`${SLOT_LABELS[slot]}: ${meal.name}`);
    if (meal.prep) lines.push(`  Note: ${meal.prep}`);
  }

  lines.push("", "Foods to avoid:");
  MOCK_AVOID.avoid.forEach((text) => lines.push(`- ${text}`));
  lines.push("", "Foods to limit:");
  MOCK_AVOID.limit.forEach((text) => lines.push(`- ${text}`));
  lines.push(
    "",
    "If you notice danger signs, see a clinician urgently.",
    "",
    DISCLAIMER,
  );

  return lines.join("\n");
}
