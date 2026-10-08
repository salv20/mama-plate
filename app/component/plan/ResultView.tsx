import type { PlanForm } from "@/app/lib/plan-form";
import { BlockedNotice } from "./BlockedNotice";
import { PlanResult } from "./PlanResult";

export function ResultView({
  form,
  onBack,
  onReset,
}: {
  form: PlanForm;
  onBack: () => void;
  onReset: () => void;
}) {
  if (form.hasCondition)
    return <BlockedNotice onBack={onBack} onReset={onReset} />;
  return <PlanResult form={form} onReset={onReset} />;
}
