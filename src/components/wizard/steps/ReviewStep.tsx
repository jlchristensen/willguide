"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useWizard } from "@/components/wizard/WizardContext";
import { StepShell, Field, inputClass } from "@/components/wizard/fields";
import {
  PACKET_DELIVERABLES,
  TrustNote,
} from "@/components/TrustNote";
import {
  hasComplexityFlags,
  isDraftReadyForGenerate,
} from "@/lib/schema";
import { savePacketText } from "@/lib/storage";

export function ReviewStep() {
  const { draft, setDraft, goTo } = useWizard();
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const complex = hasComplexityFlags(draft.complexity);

  async function generate() {
    const validation = isDraftReadyForGenerate(draft);
    setErrors(validation);
    if (validation.length) return;

    if (complex) {
      router.push("/attorney");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft }),
      });
      const data = (await res.json()) as {
        packetText?: string;
        error?: string;
        errors?: string[];
      };
      if (!res.ok) {
        setErrors(data.errors || [data.error || "Could not generate packet"]);
        return;
      }
      if (data.packetText) {
        savePacketText(data.packetText);
        router.push("/result");
      }
    } catch {
      setErrors(["Network error — please try again."]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <StepShell
      title="You’re ready for your packet"
      description="Glance over your answers, then we’ll assemble three organized documents from them — not freeform AI guessing."
    >
      <div className="rounded-lg border border-sage/25 bg-sage/5 px-4 py-4">
        <p className="text-xs font-semibold tracking-[0.14em] text-sage uppercase">
          What you’ll get
        </p>
        <ul className="mt-3 space-y-3">
          {PACKET_DELIVERABLES.map((item) => (
            <li key={item.title}>
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              <p className="text-sm text-ink-soft">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3 rounded-md border border-line bg-white p-4 text-sm text-ink">
        <p className="text-xs font-semibold tracking-[0.14em] text-ink-soft uppercase">
          Your answers
        </p>
        <Row
          label="You"
          value={`${draft.personal.fullName || "—"}, ${draft.personal.city || "—"}, ${draft.personal.state || "—"}`}
          onEdit={() => goTo("personal")}
        />
        <Row
          label="Beneficiaries"
          value={
            draft.beneficiaries.map((b) => b.fullName).filter(Boolean).join(", ") ||
            "None"
          }
          onEdit={() => goTo("beneficiaries")}
        />
        <Row
          label="Executor"
          value={draft.executor.fullName || "—"}
          onEdit={() => goTo("executor")}
        />
        {draft.personal.hasMinorChildren ? (
          <Row
            label="Guardian"
            value={draft.guardian?.fullName || "—"}
            onEdit={() => goTo("guardians")}
          />
        ) : null}
        <Row
          label="Assets listed"
          value={
            draft.assets.length
              ? `${draft.assets.length} item${draft.assets.length === 1 ? "" : "s"}`
              : "None yet (optional)"
          }
          onEdit={() => goTo("assets")}
        />
        <Row
          label="Specific gifts"
          value={
            draft.bequests.length
              ? `${draft.bequests.length} gift${draft.bequests.length === 1 ? "" : "s"}`
              : "None"
          }
          onEdit={() => goTo("bequests")}
        />
        <Row
          label="Fit check"
          value={complex ? "Attorney path recommended" : "Simple draft path"}
          onEdit={() => goTo("complexity")}
        />
      </div>

      <Field
        label="Email for your packet (optional)"
        hint="You can email yourself a copy on the next screen."
      >
        <input
          className={inputClass}
          type="email"
          value={draft.email || ""}
          onChange={(e) =>
            setDraft((d) => ({ ...d, email: e.target.value }))
          }
          placeholder="you@example.com"
        />
      </Field>

      {complex ? (
        <p className="rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          Your fit check suggests a licensed attorney is safer than a DIY draft.
          Continue for a clear next-step recommendation — your answers still help
          you prepare for that conversation.
        </p>
      ) : null}

      {errors.length > 0 ? (
        <ul className="list-disc space-y-1 pl-5 text-sm text-danger">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      ) : null}

      <button
        type="button"
        onClick={generate}
        disabled={loading}
        className="w-full rounded-md bg-sage px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-sage-deep disabled:opacity-60 sm:w-auto"
      >
        {loading
          ? "Assembling your packet…"
          : complex
            ? "See attorney recommendation"
            : "Assemble my draft packet"}
      </button>

      <TrustNote />
    </StepShell>
  );
}

function Row({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line/60 pb-3 last:border-0 last:pb-0">
      <div>
        <p className="text-xs uppercase tracking-wide text-ink-soft">{label}</p>
        <p className="mt-0.5 text-ink">{value}</p>
      </div>
      <button type="button" className="text-xs font-medium text-sage" onClick={onEdit}>
        Edit
      </button>
    </div>
  );
}
