import { describe, expect, it } from "vitest";
import mealsJson from "../data/meals.json";
import {
  BUDGETS,
  EXCLUSIONS,
  PLAN_SLOTS,
  PLAN_SLOT_TO_MEAL_SLOT,
  eligibleMeals,
  generateDayPlan,
  swapMeal,
  type Exclusion,
  type Meal,
  type PlanOk,
  type PlannerInput,
} from "../lib/meal-planner";

const realMeals = mealsJson as unknown as Meal[];

const baseInput: PlannerInput = {
  trimester: "SECOND",
  exclusions: [],
  budget: "MODERATE",
  hasMedicalCondition: false,
};

function fixtureMeal(overrides: Partial<Meal>): Meal {
  return {
    id: "fixture",
    name: "Fixture meal",
    slots: ["LUNCH"],
    trimesters: ["FIRST", "SECOND", "THIRD"],
    contains: [],
    cost: "TIGHT",
    tags: ["PROTEIN"],
    why: "Test meal.",
    sourceId: null,
    reviewedBy: null,
    reviewedAt: null,
    status: "DRAFT",
    ...overrides,
  };
}

function expectOk(result: ReturnType<typeof generateDayPlan>): PlanOk {
  if (result.status === "BLOCKED") throw new Error("plan was blocked");
  return result;
}

describe("safety gate", () => {
  it("refuses to plan when the user has a medical condition", () => {
    const result = generateDayPlan(
      { ...baseInput, hasMedicalCondition: true },
      realMeals,
    );
    expect(result.status).toBe("BLOCKED");
  });
});

describe("hard filters on real data", () => {
  it("never returns an excluded food, an over-budget meal or a wrong-stage meal", () => {
    const trimesters = ["FIRST", "SECOND", "THIRD", "UNKNOWN"] as const;

    for (let mask = 0; mask < 1 << EXCLUSIONS.length; mask += 1) {
      const exclusions = EXCLUSIONS.filter((_, i) => (mask >> i) & 1);
      for (const budget of BUDGETS) {
        for (const trimester of trimesters) {
          const input: PlannerInput = {
            ...baseInput,
            exclusions,
            budget,
            trimester,
          };
          const plan = expectOk(
            generateDayPlan(input, realMeals, { attempts: 20 }),
          );
          for (const item of plan.items) {
            for (const excluded of exclusions) {
              expect(item.meal.contains).not.toContain(excluded);
            }
            expect(BUDGETS.indexOf(item.meal.cost)).toBeLessThanOrEqual(
              BUDGETS.indexOf(budget),
            );
            expect(item.meal.slots).toContain(
              PLAN_SLOT_TO_MEAL_SLOT[item.slot],
            );
          }
        }
      }
    }
  });

  it("still has options for every slot in the most restrictive case", () => {
    const input: PlannerInput = {
      ...baseInput,
      exclusions: [...EXCLUSIONS],
      budget: "TIGHT",
    };
    const eligible = eligibleMeals(input, realMeals);
    for (const slot of PLAN_SLOTS) {
      const options = eligible.filter((m) =>
        m.slots.includes(PLAN_SLOT_TO_MEAL_SLOT[slot]),
      );
      expect(options.length).toBeGreaterThanOrEqual(2);
    }
  });
});

describe("micronutrient rules on real data", () => {
  it("covers vitamin A and zinc on a tight budget with no exclusions", () => {
    const input: PlannerInput = { ...baseInput, budget: "TIGHT" };
    for (let seed = 1; seed <= 20; seed += 1) {
      const plan = expectOk(generateDayPlan(input, realMeals, { seed }));
      const unmet = plan.unmetRules.map((r) => r.id);
      expect(unmet).not.toContain("vitamin-a");
      expect(unmet).not.toContain("zinc");
    }
  });

  it("tags only meals that name a vitamin A or zinc food", () => {
    for (const meal of realMeals) {
      if (meal.tags.includes("ZINC") || meal.tags.includes("VITAMIN_A")) {
        expect(meal.sourceId).not.toBeNull();
      }
    }
  });
});

describe("determinism", () => {
  it("gives the same plan for the same seed", () => {
    const a = generateDayPlan(baseInput, realMeals, { seed: 42 });
    const b = generateDayPlan(baseInput, realMeals, { seed: 42 });
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });
});

describe("trimester handling", () => {
  it("only uses all-stage meals when the stage is unknown", () => {
    const meals = [
      fixtureMeal({ id: "first-only", trimesters: ["FIRST"] }),
      fixtureMeal({ id: "all-stages" }),
    ];
    const plan = expectOk(
      generateDayPlan({ ...baseInput, trimester: "UNKNOWN" }, meals, {
        attempts: 5,
      }),
    );
    const ids = plan.items.map((i) => i.meal.id);
    expect(ids).not.toContain("first-only");
    expect(plan.notices.join(" ")).toContain("not sure of your stage");
  });
});

describe("honest reporting", () => {
  it("reports empty slots instead of inventing a meal", () => {
    const meals = [fixtureMeal({ id: "only-lunch", slots: ["LUNCH"] })];
    const plan = expectOk(generateDayPlan(baseInput, meals, { attempts: 5 }));
    expect(plan.status).toBe("PARTIAL");
    expect(plan.emptySlots).toContain("BREAKFAST");
    expect(plan.emptySlots).toContain("DINNER");
  });

  it("reports an unmet calcium rule when no calcium food fits", () => {
    const exclusions: Exclusion[] = ["MILK", "FISH"];
    const plan = expectOk(
      generateDayPlan({ ...baseInput, exclusions }, realMeals, {
        attempts: 50,
      }),
    );
    expect(plan.unmetRules.map((r) => r.id)).toContain("calcium");
  });

  it("adds a notice when the user has another allergy", () => {
    const plan = expectOk(
      generateDayPlan({ ...baseInput, hasOtherAllergy: true }, realMeals),
    );
    expect(plan.notices.join(" ")).toContain("another allergy");
  });

  it("returns an empty status when nothing fits", () => {
    const plan = expectOk(generateDayPlan(baseInput, []));
    expect(plan.status).toBe("EMPTY");
  });
});

describe("swapMeal", () => {
  it("replaces a meal with a different one that respects the exclusions", () => {
    const input: PlannerInput = { ...baseInput, exclusions: ["FISH", "EGG"] };
    const plan = expectOk(generateDayPlan(input, realMeals, { seed: 7 }));
    const before = plan.items.find((i) => i.slot === "LUNCH")!.meal.id;

    const swapped = swapMeal(plan, "LUNCH", input, realMeals);
    const after = swapped.items.find((i) => i.slot === "LUNCH")!.meal;

    expect(after.id).not.toBe(before);
    expect(after.contains).not.toContain("FISH");
    expect(after.contains).not.toContain("EGG");
  });

  it("does not repeat a meal already in the plan", () => {
    const plan = expectOk(generateDayPlan(baseInput, realMeals, { seed: 3 }));
    const swapped = swapMeal(plan, "DINNER", baseInput, realMeals);
    const ids = swapped.items.map((i) => i.meal.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("tells the user when there is no other option", () => {
    const meals = [fixtureMeal({ id: "only", slots: ["LUNCH"] })];
    const plan = expectOk(generateDayPlan(baseInput, meals, { attempts: 5 }));
    const swapped = swapMeal(plan, "LUNCH", baseInput, meals);
    expect(swapped.notices.join(" ")).toContain("No other option");
  });
});
