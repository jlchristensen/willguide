import type { EstatePlanDraft } from "@/lib/schema";
import { hasComplexityFlags } from "@/lib/schema";

const CATEGORY_LABELS: Record<EstatePlanDraft["assets"][number]["category"], string> = {
  home: "Home / real estate",
  bank: "Bank accounts",
  investment: "Investments",
  vehicle: "Vehicles",
  personal: "Personal property",
  other: "Other",
};

export function assembleEstateSummary(draft: EstatePlanDraft): string {
  const assets =
    draft.assets.length === 0
      ? "No assets listed yet. Add high-level items so your executor has a starting inventory."
      : draft.assets
          .map((a, i) => {
            const value = a.estimatedValue?.trim()
              ? ` — est. ${a.estimatedValue}`
              : "";
            return `${i + 1}. [${CATEGORY_LABELS[a.category]}] ${a.description}${value}`;
          })
          .join("\n");

  const complexity = hasComplexityFlags(draft.complexity)
    ? Object.entries(draft.complexity)
        .filter(([, v]) => v)
        .map(([k]) => `- ${k}`)
        .join("\n")
    : "None flagged.";

  return `
ESTATE PLAN SUMMARY PACKET
Prepared for: ${draft.personal.fullName || "(name)"}
Residence: ${draft.personal.city || "(city)"}, ${draft.personal.state || "(state)"}
Marital status: ${draft.personal.maritalStatus || "(not set)"}
${draft.personal.spouseName ? `Spouse / partner: ${draft.personal.spouseName}` : ""}

THIS IS AN ORGANIZATIONAL SUMMARY — NOT A SUBSTITUTE FOR LEGAL ADVICE.

BENEFICIARIES
${
  draft.beneficiaries.length
    ? draft.beneficiaries
        .map(
          (b, i) =>
            `${i + 1}. ${b.fullName} (${b.relationship})${
              b.sharePercent != null ? ` — ${b.sharePercent}%` : ""
            }`
        )
        .join("\n")
    : "None listed."
}

EXECUTOR
Primary: ${draft.executor.fullName || "(not set)"} (${draft.executor.relationship || "—"})
Alternate: ${draft.alternateExecutor.fullName || "(not set)"} (${draft.alternateExecutor.relationship || "—"})

${
  draft.personal.hasMinorChildren
    ? `GUARDIANS
Primary: ${draft.guardian?.fullName || "(not set)"} (${draft.guardian?.relationship || "—"})
Alternate: ${draft.alternateGuardian?.fullName || "(not set)"} (${draft.alternateGuardian?.relationship || "—"})`
    : "GUARDIANS: Not applicable (no minor children indicated)."
}

ASSET INVENTORY (HIGH LEVEL)
${assets}

SPECIFIC BEQUESTS
${
  draft.bequests.length
    ? draft.bequests
        .map((b, i) => `${i + 1}. ${b.description} → ${b.recipientName}`)
        .join("\n")
    : "None listed."
}

OPTIONAL WISHES
Pets: ${draft.wishes.pets || "—"}
Funeral: ${draft.wishes.funeral || "—"}
Other: ${draft.wishes.other || "—"}

COMPLEXITY FLAGS
${complexity}
`.trim();
}
