import { OptionCard } from "../ui/OptionCard";
import { BUDGET_OPTIONS } from "@/app/lib/plan-options";
import type { Budget } from "@/app/lib/plan-form";
import { StepShell } from "./StepShell";

export function BudgetStep({
  value,
  onChange,
}: {
  value: Budget | null;
  onChange: (value: Budget) => void;
}) {
  return (
    <StepShell
      title="What budget feels right?"
      description="Pick the level that fits your week."
    >
      <div role="radiogroup" aria-label="Budget" className="space-y-3">
        {BUDGET_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            title={option.title}
            description={option.description}
            selected={value === option.value}
            onSelect={() => onChange(option.value)}
          />
        ))}
      </div>
    </StepShell>
  );
}
