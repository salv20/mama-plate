import { InlineNote } from "../ui/InlineNote";
import { OptionCard } from "../ui/OptionCard";
import { StepShell } from "./StepShell";

export function SafetyStep({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (value: boolean) => void;
}) {
  return (
    <StepShell
      title="One quick safety check"
      description="Do you have diabetes, high blood pressure, sickle cell disease, kidney problems, or a diet your doctor gave you?"
    >
      <div
        role="radiogroup"
        aria-label="Medical condition"
        className="space-y-3"
      >
        <OptionCard
          title="No, none of these"
          selected={value === false}
          onSelect={() => onChange(false)}
        />
        <OptionCard
          title="Yes, or I am not sure"
          description="Your doctor or midwife can give you advice that fits your health."
          selected={value === true}
          onSelect={() => onChange(true)}
        />
      </div>
      <InlineNote show={value === true}>
        A general meal plan may not suit you. We will point you to the right
        next step.
      </InlineNote>
    </StepShell>
  );
}
