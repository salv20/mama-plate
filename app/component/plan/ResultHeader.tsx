import { Badge } from "../ui/Badge";
import { InlineNote } from "../ui/InlineNote";
import type { PlanForm } from "@/app/lib/plan-form";
import { allergyLabel, budgetLabel, stageLabel } from "@/app/lib/plan-options";

export function ResultHeader({ form }: { form: PlanForm }) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Your plan for today
      </h1>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="sage">{stageLabel(form.stage)}</Badge>
        <Badge tone="neutral">{budgetLabel(form.budget)} budget</Badge>
        {form.exclusions.map((item) => (
          <Badge key={item} tone="blush">
            No {allergyLabel(item).toLowerCase()}
          </Badge>
        ))}
      </div>
      <InlineNote show={form.otherAllergy}>
        You mentioned another allergy. We cannot check it, so please ask your
        clinician before using any meal.
      </InlineNote>
      <InlineNote show={form.stage === "UNKNOWN"}>
        Because you are not sure of your stage, we show meals that suit every
        stage.
      </InlineNote>
    </div>
  );
}
