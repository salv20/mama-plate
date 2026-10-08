import { ChoiceChip } from "../ui/ChoiceChip";
import { InlineNote } from "../ui/InlineNote";
import { ALLERGY_OPTIONS } from "@/app/lib/plan-options";
import type { Allergy } from "@/app/lib/plan-form";
import { StepShell } from "./StepShell";

export function AllergyStep({
  exclusions,
  otherAllergy,
  onToggle,
  onOtherChange,
}: {
  exclusions: Allergy[];
  otherAllergy: boolean;
  onToggle: (item: Allergy) => void;
  onOtherChange: (value: boolean) => void;
}) {
  return (
    <StepShell
      title="Any allergies or foods to avoid?"
      description="Tap all that apply. Skip this step if you have none."
    >
      <div
        role="group"
        aria-label="Allergies and foods to avoid"
        className="flex flex-wrap gap-3"
      >
        {ALLERGY_OPTIONS.map((option) => (
          <ChoiceChip
            key={option.value}
            label={option.label}
            selected={exclusions.includes(option.value)}
            onToggle={() => onToggle(option.value)}
          />
        ))}
        <ChoiceChip
          label="Another allergy"
          selected={otherAllergy}
          onToggle={() => onOtherChange(!otherAllergy)}
        />
      </div>
      <InlineNote show={otherAllergy}>
        We cannot check allergies that are not listed. Please ask your clinician
        before using any meal.
      </InlineNote>
    </StepShell>
  );
}
