"use client";

import { useWizard } from "@/components/wizard/WizardContext";
import { Field, StepShell, inputClass } from "@/components/wizard/fields";

export function GuardiansStep() {
  const { draft, setDraft } = useWizard();

  return (
    <StepShell
      title="Guardian for minor children"
      description="Nominate who should care for your minor children if you cannot. Talk with them first, and name an alternate."
    >
      <p className="text-sm font-semibold text-ink">Primary guardian</p>
      <Field label="Full name">
        <input
          className={inputClass}
          value={draft.guardian?.fullName || ""}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              guardian: {
                fullName: e.target.value,
                relationship: d.guardian?.relationship || "",
              },
            }))
          }
        />
      </Field>
      <Field label="Relationship">
        <input
          className={inputClass}
          value={draft.guardian?.relationship || ""}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              guardian: {
                fullName: d.guardian?.fullName || "",
                relationship: e.target.value,
              },
            }))
          }
        />
      </Field>

      <p className="pt-2 text-sm font-semibold text-ink">Alternate guardian</p>
      <Field label="Full name">
        <input
          className={inputClass}
          value={draft.alternateGuardian?.fullName || ""}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              alternateGuardian: {
                fullName: e.target.value,
                relationship: d.alternateGuardian?.relationship || "",
              },
            }))
          }
        />
      </Field>
      <Field label="Relationship">
        <input
          className={inputClass}
          value={draft.alternateGuardian?.relationship || ""}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              alternateGuardian: {
                fullName: d.alternateGuardian?.fullName || "",
                relationship: e.target.value,
              },
            }))
          }
        />
      </Field>
    </StepShell>
  );
}
