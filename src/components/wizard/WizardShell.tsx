"use client";

import Link from "next/link";
import { AssistPanel } from "@/components/wizard/AssistPanel";
import {
  useWizard,
  type WizardStepId,
} from "@/components/wizard/WizardContext";
import { PersonalStep } from "@/components/wizard/steps/PersonalStep";
import { ComplexityStep } from "@/components/wizard/steps/ComplexityStep";
import { BeneficiariesStep } from "@/components/wizard/steps/BeneficiariesStep";
import { ExecutorStep } from "@/components/wizard/steps/ExecutorStep";
import { GuardiansStep } from "@/components/wizard/steps/GuardiansStep";
import { AssetsStep } from "@/components/wizard/steps/AssetsStep";
import { BequestsStep } from "@/components/wizard/steps/BequestsStep";
import { WishesStep } from "@/components/wizard/steps/WishesStep";
import { ReviewStep } from "@/components/wizard/steps/ReviewStep";
import type { AssistTopic } from "@/lib/assist-fallback";

const TOPIC_BY_STEP: Record<WizardStepId, AssistTopic> = {
  personal: "general",
  complexity: "complexity",
  beneficiaries: "beneficiary",
  executor: "executor",
  guardians: "guardian",
  assets: "assets",
  bequests: "bequest",
  wishes: "general",
  review: "signing",
};

function StepBody({ id }: { id: WizardStepId }) {
  switch (id) {
    case "personal":
      return <PersonalStep />;
    case "complexity":
      return <ComplexityStep />;
    case "beneficiaries":
      return <BeneficiariesStep />;
    case "executor":
      return <ExecutorStep />;
    case "guardians":
      return <GuardiansStep />;
    case "assets":
      return <AssetsStep />;
    case "bequests":
      return <BequestsStep />;
    case "wishes":
      return <WishesStep />;
    case "review":
      return <ReviewStep />;
    default:
      return null;
  }
}

export function WizardShell() {
  const { stepId, stepIndex, steps, next, back, progress } = useWizard();
  const isLast = stepIndex === steps.length - 1;

  return (
    <div className="atmosphere min-h-screen">
      <header className="no-print border-b border-line/70 bg-white/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-display text-lg text-ink">
            WillGuide
          </Link>
          <p className="text-xs text-ink-soft">
            Step {stepIndex + 1} of {steps.length}
          </p>
        </div>
        <div className="h-1 w-full bg-line/40">
          <div
            className="h-1 bg-sage transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1fr_320px]">
        <div>
          <StepBody id={stepId} />

          {!isLast ? (
            <div className="no-print mt-10 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={back}
                disabled={stepIndex === 0}
                className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink disabled:opacity-40"
              >
                Back
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-soft"
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="no-print mt-6">
              <button
                type="button"
                onClick={back}
                className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink"
              >
                Back
              </button>
            </div>
          )}
        </div>

        <div className="no-print lg:sticky lg:top-6 lg:self-start">
          <AssistPanel defaultTopic={TOPIC_BY_STEP[stepId]} />
        </div>
      </div>
    </div>
  );
}
