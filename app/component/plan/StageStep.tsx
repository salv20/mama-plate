import { OptionCard } from "../ui/OptionCard";
import { STAGE_OPTIONS } from "@/app/lib/plan-options";
import type { Stage } from "@/app/lib/plan-form";
import { StepShell } from "./StepShell";

export function StageStep({
  value,
  onChange,
}: {
  value: Stage | null;
  onChange: (value: Stage) => void;
}) {
  return (
    <StepShell
      title="Where are you in your pregnancy?"
      description="Choose the stage you are in now."
    >
      <div
        role="radiogroup"
        aria-label="Stage of pregnancy"
        className="space-y-3"
      >
        {STAGE_OPTIONS.map((option) => (
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
