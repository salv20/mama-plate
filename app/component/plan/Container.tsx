"use client";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { QUESTION_COUNT, usePlanWizard } from "@/app/hooks/usePlanWizard";
import { ProgressBar } from "./ProgressBar";
import { StepRouter } from "./StepRouter";
import { StepTransition } from "./StepTransition";
import { WizardNav } from "./WizardNav";

export function PlanWizard() {
  const wizard = usePlanWizard();
  const { step, stepNumber, direction, canContinue, next, back } = wizard;
  const isResult = step === "result";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  return (
    <div className="mx-auto max-w-2xl">
      {!isResult && <ProgressBar current={stepNumber} total={QUESTION_COUNT} />}

      <div className="mt-8 min-h-[26rem]">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <StepTransition key={step} direction={direction}>
            <StepRouter wizard={wizard} />
          </StepTransition>
        </AnimatePresence>
      </div>

      {!isResult && (
        <WizardNav
          canBack={step !== "safety"}
          canContinue={canContinue}
          isLastQuestion={step === "budget"}
          onBack={back}
          onNext={next}
        />
      )}
    </div>
  );
}
