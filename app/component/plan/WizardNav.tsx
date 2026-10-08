import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/app/lib/cn";

export function WizardNav({
  canBack,
  canContinue,
  isLastQuestion,
  onBack,
  onNext,
}: {
  canBack: boolean;
  canContinue: boolean;
  isLastQuestion: boolean;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-10 flex items-center justify-between">
      <Button
        variant="ghost"
        onClick={onBack}
        className={cn(!canBack && "pointer-events-none invisible")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      <Button size="lg" onClick={onNext} disabled={!canContinue}>
        {isLastQuestion ? "See my plan" : "Continue"}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
