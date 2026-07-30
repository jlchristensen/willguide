"use client";

import { useWizard } from "@/components/wizard/WizardContext";
import { CheckboxRow, Field, StepShell, inputClass } from "@/components/wizard/fields";
import { US_STATES, type MaritalStatus } from "@/lib/schema";

export function PersonalStep() {
  const { draft, setDraft } = useWizard();
  const p = draft.personal;

  return (
    <StepShell
      title="About you"
      description="We use this to place you in the right state formalities and personalize your draft."
    >
      <Field label="Full legal name">
        <input
          className={inputClass}
          value={p.fullName}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              personal: { ...d.personal, fullName: e.target.value },
            }))
          }
          placeholder="Jordan Avery Lee"
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="City">
          <input
            className={inputClass}
            value={p.city}
            onChange={(e) =>
              setDraft((d) => ({
                ...d,
                personal: { ...d.personal, city: e.target.value },
              }))
            }
          />
        </Field>
        <Field label="State">
          <select
            className={inputClass}
            value={p.state}
            onChange={(e) =>
              setDraft((d) => ({
                ...d,
                personal: {
                  ...d.personal,
                  state: e.target.value as typeof p.state,
                },
              }))
            }
          >
            <option value="">Select state</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="County (optional)" hint="Helpful for some state forms.">
        <input
          className={inputClass}
          value={p.county || ""}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              personal: { ...d.personal, county: e.target.value },
            }))
          }
        />
      </Field>
      <Field label="Marital status">
        <select
          className={inputClass}
          value={p.maritalStatus}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              personal: {
                ...d.personal,
                maritalStatus: e.target.value as MaritalStatus | "",
              },
            }))
          }
        >
          <option value="">Select</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="partnered">Partnered</option>
          <option value="divorced">Divorced</option>
          <option value="widowed">Widowed</option>
        </select>
      </Field>
      {(p.maritalStatus === "married" || p.maritalStatus === "partnered") && (
        <Field label="Spouse / partner full name">
          <input
            className={inputClass}
            value={p.spouseName || ""}
            onChange={(e) =>
              setDraft((d) => ({
                ...d,
                personal: { ...d.personal, spouseName: e.target.value },
              }))
            }
          />
        </Field>
      )}
      <CheckboxRow
        checked={p.hasMinorChildren}
        onChange={(v) =>
          setDraft((d) => ({
            ...d,
            personal: { ...d.personal, hasMinorChildren: v },
          }))
        }
        label="I have minor children and want to nominate a guardian"
      />
    </StepShell>
  );
}
