import { describe, expect, it } from "vitest";
import mealsJson from "../data/meals.json";
import avoidJson from "../data/avoid-list.json";
import sourcesJson from "../data/sources.json";
import {
  formatPlanAsText,
  generateDayPlan,
  validateAvoidItems,
  validateMeals,
  type AvoidItem,
  type Meal,
  type PlannerInput,
  type Source,
} from "../lib/meal-planner";

const meals = mealsJson as unknown as Meal[];
const avoid = avoidJson as unknown as AvoidItem[];
const sourceIds = (sourcesJson as unknown as Source[]).map((s) => s.id);

describe("content data", () => {
  it("meals pass validation", () => {
    expect(validateMeals(meals, sourceIds)).toEqual([]);
  });

  it("avoid list passes validation", () => {
    expect(validateAvoidItems(avoid, sourceIds)).toEqual([]);
  });

  it("rejects an approved meal with no source, reviewer or date", () => {
    const bad: Meal = { ...meals[0], status: "APPROVED" };
    const errors = validateMeals([bad], sourceIds);
    expect(errors.length).toBe(3);
  });

  it("rejects duplicate ids", () => {
    const errors = validateMeals([meals[0], meals[0]], sourceIds);
    expect(errors.some((e) => e.includes("duplicate id"))).toBe(true);
  });

  it("rejects an unknown source id", () => {
    const bad: Meal = { ...meals[0], sourceId: "does-not-exist" };
    const errors = validateMeals([bad], sourceIds);
    expect(errors.some((e) => e.includes("unknown sourceId"))).toBe(true);
  });
});

describe("formatPlanAsText", () => {
  it("produces plain text with the plan, avoid list and disclaimer", () => {
    const input: PlannerInput = {
      trimester: "FIRST",
      exclusions: ["GROUNDNUT"],
      budget: "TIGHT",
      hasMedicalCondition: false,
    };
    const plan = generateDayPlan(input, meals, { seed: 5 });
    if (plan.status === "BLOCKED") throw new Error("blocked");

    const text = formatPlanAsText(plan, avoid);
    expect(text).toContain("Breakfast:");
    expect(text).toContain("Foods to avoid:");
    expect(text).toContain("see a clinician urgently");
    expect(text).toContain("not medical advice");
    expect(text).not.toContain("\u2014");
  });
});
