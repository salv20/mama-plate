import { describe, expect, it } from "vitest";
import { initialForm } from "../lib/plan-form";
import { toPlannerInput } from "../lib/plan-input";

describe("toPlannerInput", () => {
  it("maps the wizard answers to generator input", () => {
    const input = toPlannerInput({
      hasCondition: false,
      stage: "SECOND",
      exclusions: ["EGG", "FISH"],
      otherAllergy: true,
      budget: "MODERATE",
    });
    expect(input).toEqual({
      trimester: "SECOND",
      exclusions: ["EGG", "FISH"],
      budget: "MODERATE",
      hasMedicalCondition: false,
      hasOtherAllergy: true,
    });
  });

  it("only allows a plan after an explicit no to the safety question", () => {
    expect(toPlannerInput({ ...initialForm, hasCondition: false }).hasMedicalCondition).toBe(false);
    expect(toPlannerInput({ ...initialForm, hasCondition: true }).hasMedicalCondition).toBe(true);
    expect(toPlannerInput({ ...initialForm, hasCondition: null }).hasMedicalCondition).toBe(true);
  });
});
