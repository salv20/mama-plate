import mealsJson from "../../data/meals.json";
import avoidJson from "../../data/avoid-list.json";
import sourcesJson from "../../data/sources.json";
import type { AvoidItem, Meal, Source } from "./types";

// In production only clinician-approved content is used.
// For local testing set NEXT_PUBLIC_ALLOW_DRAFT_CONTENT=true in .env.local.
function allowDrafts(): boolean {
  return process.env.NEXT_PUBLIC_ALLOW_DRAFT_CONTENT === "true";
}

export function getMeals(): Meal[] {
  const all = mealsJson as unknown as Meal[];
  return allowDrafts() ? all : all.filter((m) => m.status === "APPROVED");
}

export function getAvoidItems(): AvoidItem[] {
  const all = avoidJson as unknown as AvoidItem[];
  return allowDrafts() ? all : all.filter((a) => a.status === "APPROVED");
}

export function getSources(): Source[] {
  return sourcesJson as unknown as Source[];
}
