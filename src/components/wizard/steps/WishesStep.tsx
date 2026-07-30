"use client";

import { useWizard } from "@/components/wizard/WizardContext";
import { Field, StepShell, inputClass } from "@/components/wizard/fields";

export function WishesStep() {
  const { draft, setDraft } = useWizard();

  return (
    <StepShell
      title="Optional wishes"
      description="These notes help your family understand your preferences. They are not a substitute for funded trusts or formal directives."
    >
      <Field label="Pets / animal care">
        <textarea
          className={inputClass}
          rows={3}
          value={draft.wishes.pets || ""}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              wishes: { ...d.wishes, pets: e.target.value },
            }))
          }
          placeholder="Who should care for pets, and any funds you want set aside…"
        />
      </Field>
      <Field label="Funeral / memorial wishes">
        <textarea
          className={inputClass}
          rows={3}
          value={draft.wishes.funeral || ""}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              wishes: { ...d.wishes, funeral: e.target.value },
            }))
          }
        />
      </Field>
      <Field label="Anything else">
        <textarea
          className={inputClass}
          rows={3}
          value={draft.wishes.other || ""}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              wishes: { ...d.wishes, other: e.target.value },
            }))
          }
        />
      </Field>
    </StepShell>
  );
}
