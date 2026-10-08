import type { PlanWizardState } from "@/hooks/usePlanWizard";
import { AllergyStep } from "./AllergyStep";
import { BudgetStep } from "./BudgetStep";
import { ResultView } from "./ResultView";
import { SafetyStep } from "./SafetyStep";
import { StageStep } from "./StageStep";

// Chooses which screen to show for the current step.
export function StepRouter({ wizard }: { wizard: PlanWizardState }) {
  const { step, form, update, toggleExclusion, back, reset } = wizard;

  switch (step) {
    case "safety":
      return (
        <SafetyStep
          value={form.hasCondition}
          onChange={(v) => update({ hasCondition: v })}
        />
      );
    case "stage":
      return (
        <StageStep value={form.stage} onChange={(v) => update({ stage: v })} />
      );
    case "allergies":
      return (
        <AllergyStep
          exclusions={form.exclusions}
          otherAllergy={form.otherAllergy}
          onToggle={toggleExclusion}
          onOtherChange={(v) => update({ otherAllergy: v })}
        />
      );
    case "budget":
      return (
        <BudgetStep
          value={form.budget}
          onChange={(v) => update({ budget: v })}
        />
      );
    case "result":
      return <ResultView form={form} onBack={back} onReset={reset} />;
  }
}
