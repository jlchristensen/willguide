"use client";

import { useWizard } from "@/components/wizard/WizardContext";
import { CheckboxRow, StepShell } from "@/components/wizard/fields";
import type { ComplexityFlags } from "@/lib/schema";

const ITEMS: { key: keyof ComplexityFlags; label: string }[] = [
  {
    key: "ownsBusiness",
    label: "I own a business or significant business interest",
  },
  {
    key: "foreignAssets",
    label: "I own property or accounts outside the United States",
  },
  {
    key: "largeEstate",
    label: "My estate may be large enough for estate-tax planning concerns",
  },
  {
    key: "blendedFamilyConflict",
    label: "I have a blended family with potential conflict over inheritances",
  },
  {
    key: "specialNeedsDependent",
    label: "I have a dependent with special needs who may need a specialized plan",
  },
];

export function ComplexityStep() {
  const { draft, setDraft } = useWizard();
  const flagged = Object.values(draft.complexity).some(Boolean);

  return (
    <StepShell
      title="Is a simple draft enough?"
      description="Check any that apply. If your situation is complex, we will recommend an attorney path instead of a DIY packet."
    >
      <div className="space-y-3">
        {ITEMS.map((item) => (
          <CheckboxRow
            key={item.key}
            checked={draft.complexity[item.key]}
            onChange={(v) =>
              setDraft((d) => ({
                ...d,
                complexity: { ...d.complexity, [item.key]: v },
              }))
            }
            label={item.label}
          />
        ))}
      </div>
      {flagged ? (
        <p className="rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          Based on your answers, a licensed estate planning attorney is the safer
          next step. You can still continue to organize your thoughts, but we will
          emphasize the attorney path before generating a DIY draft.
        </p>
      ) : (
        <p className="text-sm text-ink-soft">
          No complexity flags selected. A guided draft packet can still help you
          get organized — remember it is educational, not legal advice.
        </p>
      )}
    </StepShell>
  );
}
