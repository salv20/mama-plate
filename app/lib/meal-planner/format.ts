import { DISCLAIMER } from "./generate";
import { PLAN_SLOT_LABELS, type AvoidItem, type PlanOk } from "./types";

// Plain text version of the plan, ready to paste into WhatsApp or SMS.
export function formatPlanAsText(plan: PlanOk, avoid: AvoidItem[]): string {
  const lines: string[] = ["My meal plan for today", ""];

  for (const item of plan.items) {
    lines.push(`${PLAN_SLOT_LABELS[item.slot]}: ${item.meal.name}`);
    if (item.meal.prep) lines.push(`  Note: ${item.meal.prep}`);
  }

  for (const rule of plan.unmetRules) {
    lines.push("", rule.message);
  }
  for (const notice of plan.notices) {
    lines.push("", notice);
  }

  const toAvoid = avoid.filter((a) => a.group === "AVOID");
  const toLimit = avoid.filter((a) => a.group === "LIMIT");

  if (toAvoid.length > 0) {
    lines.push("", "Foods to avoid:");
    for (const a of toAvoid) lines.push(`- ${a.text}`);
  }
  if (toLimit.length > 0) {
    lines.push("", "Foods to limit:");
    for (const a of toLimit) lines.push(`- ${a.text}`);
  }

  lines.push("", "If you notice danger signs, see a clinician urgently.");
  lines.push("", DISCLAIMER);
  return lines.join("\n");
}
