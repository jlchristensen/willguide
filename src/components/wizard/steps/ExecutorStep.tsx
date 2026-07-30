"use client";

import { useWizard } from "@/components/wizard/WizardContext";
import { Field, StepShell, inputClass } from "@/components/wizard/fields";

export function ExecutorStep() {
  const { draft, setDraft } = useWizard();

  return (
    <StepShell
      title="Executor"
      description="Your executor carries out the will — paying debts and distributing property. Name someone you trust, plus an alternate."
    >
      <p className="text-sm font-semibold text-ink">Primary executor</p>
      <Field label="Full name">
        <input
          className={inputClass}
          value={draft.executor.fullName}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              executor: { ...d.executor, fullName: e.target.value },
            }))
          }
        />
      </Field>
      <Field label="Relationship">
        <input
          className={inputClass}
          value={draft.executor.relationship}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              executor: { ...d.executor, relationship: e.target.value },
            }))
          }
        />
      </Field>

      <p className="pt-2 text-sm font-semibold text-ink">Alternate executor</p>
      <Field label="Full name">
        <input
          className={inputClass}
          value={draft.alternateExecutor.fullName}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              alternateExecutor: {
                ...d.alternateExecutor,
                fullName: e.target.value,
              },
            }))
          }
        />
      </Field>
      <Field label="Relationship">
        <input
          className={inputClass}
          value={draft.alternateExecutor.relationship}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              alternateExecutor: {
                ...d.alternateExecutor,
                relationship: e.target.value,
              },
            }))
          }
        />
      </Field>
    </StepShell>
  );
}
