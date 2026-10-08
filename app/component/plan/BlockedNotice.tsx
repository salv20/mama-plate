import { HeartHandshake } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { IconBox } from "../ui/IconBox";

export function BlockedNotice({
  onBack,
  onReset,
}: {
  onBack: () => void;
  onReset: () => void;
}) {
  return (
    <Card className="border-sage-100 bg-sage-50 p-8 sm:p-10">
      <IconBox icon={HeartHandshake} tone="sage" className="bg-white" />
      <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
        Please follow your clinician&apos;s plan
      </h1>
      <p className="mt-3 leading-relaxed text-muted">
        A medical condition usually comes with its own diet, so a general meal
        plan is not right for you. Your doctor or midwife can give you advice
        that fits your health.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="secondary" onClick={onBack}>
          Change my answer
        </Button>
        <Button variant="ghost" href="/urgent-care">
          When to see a clinician urgently
        </Button>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm font-semibold text-sage-700 underline-offset-4 hover:underline"
      >
        Start over
      </button>
    </Card>
  );
}
