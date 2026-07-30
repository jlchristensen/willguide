"use client";

import { useWizard } from "@/components/wizard/WizardContext";
import { Field, StepShell, inputClass } from "@/components/wizard/fields";
import { createId } from "@/lib/schema";

export function BequestsStep() {
  const { draft, setDraft } = useWizard();

  function add() {
    setDraft((d) => ({
      ...d,
      bequests: [
        ...d.bequests,
        { id: createId(), description: "", recipientName: "" },
      ],
    }));
  }

  function update(
    id: string,
    patch: Partial<(typeof draft.bequests)[number]>
  ) {
    setDraft((d) => ({
      ...d,
      bequests: d.bequests.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    }));
  }

  function remove(id: string) {
    setDraft((d) => ({
      ...d,
      bequests: d.bequests.filter((b) => b.id !== id),
    }));
  }

  return (
    <StepShell
      title="Specific bequests"
      description="Optional gifts of particular items or amounts. Everything else flows through the residue clause."
    >
      {draft.bequests.length === 0 ? (
        <p className="text-sm text-ink-soft">
          No specific gifts yet — that is fine for many simple plans.
        </p>
      ) : null}
      <div className="space-y-4">
        {draft.bequests.map((b, i) => (
          <div
            key={b.id}
            className="space-y-3 rounded-md border border-line bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">Gift {i + 1}</p>
              <button
                type="button"
                className="text-xs text-danger"
                onClick={() => remove(b.id)}
              >
                Remove
              </button>
            </div>
            <Field label="What are you giving?">
              <input
                className={inputClass}
                value={b.description}
                onChange={(e) => update(b.id, { description: e.target.value })}
                placeholder="My piano / $5,000 / wedding ring…"
              />
            </Field>
            <Field label="To whom?">
              <input
                className={inputClass}
                value={b.recipientName}
                onChange={(e) =>
                  update(b.id, { recipientName: e.target.value })
                }
              />
            </Field>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-mist"
      >
        Add specific gift
      </button>
    </StepShell>
  );
}
