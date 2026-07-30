"use client";

import { useWizard } from "@/components/wizard/WizardContext";
import { Field, StepShell, inputClass } from "@/components/wizard/fields";
import { createId } from "@/lib/schema";

export function BeneficiariesStep() {
  const { draft, setDraft } = useWizard();

  function add() {
    setDraft((d) => ({
      ...d,
      beneficiaries: [
        ...d.beneficiaries,
        { id: createId(), fullName: "", relationship: "", sharePercent: undefined },
      ],
    }));
  }

  function update(
    id: string,
    patch: Partial<(typeof draft.beneficiaries)[number]>
  ) {
    setDraft((d) => ({
      ...d,
      beneficiaries: d.beneficiaries.map((b) =>
        b.id === id ? { ...b, ...patch } : b
      ),
    }));
  }

  function remove(id: string) {
    setDraft((d) => ({
      ...d,
      beneficiaries: d.beneficiaries.filter((b) => b.id !== id),
    }));
  }

  return (
    <StepShell
      title="Beneficiaries"
      description="Who should receive the residue of your estate (what remains after debts and specific gifts)?"
    >
      <Field label="How should the residue be shared?">
        <select
          className={inputClass}
          value={draft.residueDistribution}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              residueDistribution: e.target.value as
                | "equal_beneficiaries"
                | "custom",
            }))
          }
        >
          <option value="equal_beneficiaries">Equal shares among beneficiaries</option>
          <option value="custom">Custom percentages</option>
        </select>
      </Field>

      <div className="space-y-4">
        {draft.beneficiaries.map((b, i) => (
          <div
            key={b.id}
            className="space-y-3 rounded-md border border-line bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">Beneficiary {i + 1}</p>
              <button
                type="button"
                className="text-xs text-danger"
                onClick={() => remove(b.id)}
              >
                Remove
              </button>
            </div>
            <Field label="Full name">
              <input
                className={inputClass}
                value={b.fullName}
                onChange={(e) => update(b.id, { fullName: e.target.value })}
              />
            </Field>
            <Field label="Relationship">
              <input
                className={inputClass}
                value={b.relationship}
                onChange={(e) => update(b.id, { relationship: e.target.value })}
                placeholder="Child, sibling, friend, charity…"
              />
            </Field>
            {draft.residueDistribution === "custom" ? (
              <Field label="Share percent">
                <input
                  className={inputClass}
                  type="number"
                  min={0}
                  max={100}
                  value={b.sharePercent ?? ""}
                  onChange={(e) =>
                    update(b.id, {
                      sharePercent: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  }
                />
              </Field>
            ) : null}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-mist"
      >
        Add beneficiary
      </button>
    </StepShell>
  );
}
