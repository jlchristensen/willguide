"use client";

import { useWizard } from "@/components/wizard/WizardContext";
import { Field, StepShell, inputClass } from "@/components/wizard/fields";
import { createId, type Asset } from "@/lib/schema";

const CATEGORIES: Asset["category"][] = [
  "home",
  "bank",
  "investment",
  "vehicle",
  "personal",
  "other",
];

export function AssetsStep() {
  const { draft, setDraft } = useWizard();

  function add() {
    setDraft((d) => ({
      ...d,
      assets: [
        ...d.assets,
        {
          id: createId(),
          category: "other",
          description: "",
          estimatedValue: "",
        },
      ],
    }));
  }

  function update(id: string, patch: Partial<Asset>) {
    setDraft((d) => ({
      ...d,
      assets: d.assets.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    }));
  }

  function remove(id: string) {
    setDraft((d) => ({
      ...d,
      assets: d.assets.filter((a) => a.id !== id),
    }));
  }

  return (
    <StepShell
      title="Asset inventory"
      description="Keep this high-level. A simple list helps your executor know where to look — you can refine later."
    >
      <div className="space-y-4">
        {draft.assets.map((a, i) => (
          <div
            key={a.id}
            className="space-y-3 rounded-md border border-line bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">Asset {i + 1}</p>
              <button
                type="button"
                className="text-xs text-danger"
                onClick={() => remove(a.id)}
              >
                Remove
              </button>
            </div>
            <Field label="Category">
              <select
                className={inputClass}
                value={a.category}
                onChange={(e) =>
                  update(a.id, {
                    category: e.target.value as Asset["category"],
                  })
                }
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Description">
              <input
                className={inputClass}
                value={a.description}
                onChange={(e) => update(a.id, { description: e.target.value })}
                placeholder="Primary home, checking at First Bank…"
              />
            </Field>
            <Field label="Estimated value (optional)">
              <input
                className={inputClass}
                value={a.estimatedValue || ""}
                onChange={(e) =>
                  update(a.id, { estimatedValue: e.target.value })
                }
                placeholder="$250,000"
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
        Add asset
      </button>
    </StepShell>
  );
}
