"use client";

import { phaseForStep, STEP_LABELS } from "@/lib/step-labels";
import type { WizardStepId } from "@/lib/step-labels";

export function WizardProgress({
  steps,
  stepIndex,
  stepId,
  progress,
}: {
  steps: WizardStepId[];
  stepIndex: number;
  stepId: WizardStepId;
  progress: number;
}) {
  const label = STEP_LABELS[stepId];
  const phase = phaseForStep(stepId);

  return (
    <div className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-sage uppercase">
              {phase}
            </p>
            <p className="mt-1 text-sm text-ink">
              <span className="font-semibold">{label}</span>
              <span className="text-ink-soft">
                {" "}
                · Step {stepIndex + 1} of {steps.length}
              </span>
            </p>
          </div>
          <p className="text-xs text-ink-soft tabular-nums">
            {Math.round(progress)}% complete
          </p>
        </div>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line/50">
          <div
            className="h-full rounded-full bg-sage transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <ol className="mt-3 flex items-center gap-0 overflow-x-auto pb-0.5 text-[11px] sm:text-xs">
          {steps.map((id, i) => {
            const done = i < stepIndex;
            const current = i === stepIndex;
            return (
              <li key={id} className="flex shrink-0 items-center">
                <span
                  className={[
                    "rounded px-1.5 py-0.5",
                    current
                      ? "bg-sage/15 font-semibold text-sage-deep"
                      : done
                        ? "text-ink"
                        : "text-ink-soft/70",
                  ].join(" ")}
                >
                  {STEP_LABELS[id]}
                </span>
                {i < steps.length - 1 ? (
                  <span className="mx-0.5 text-line" aria-hidden>
                    /
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
