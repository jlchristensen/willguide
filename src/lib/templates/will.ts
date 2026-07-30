import type { EstatePlanDraft } from "@/lib/schema";

function todayLong(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function listBeneficiaries(draft: EstatePlanDraft): string {
  if (draft.beneficiaries.length === 0) return "(no beneficiaries listed)";
  return draft.beneficiaries
    .map((b, i) => {
      const share =
        draft.residueDistribution === "equal_beneficiaries"
          ? `an equal share`
          : b.sharePercent != null
            ? `${b.sharePercent}%`
            : "a share as designated";
      return `${i + 1}. ${b.fullName} (${b.relationship}) — ${share}`;
    })
    .join("\n");
}

function listBequests(draft: EstatePlanDraft): string {
  if (draft.bequests.length === 0) {
    return "No specific bequests are listed. The residue clause controls distribution of the estate.";
  }
  return draft.bequests
    .map(
      (b, i) =>
        `${i + 1}. I give ${b.description} to ${b.recipientName}, if living at my death; otherwise this gift shall lapse into the residue of my estate.`
    )
    .join("\n\n");
}

/**
 * Deterministic will assembly from structured answers.
 * This is a conservative general US-style draft — not state-certified legal advice.
 */
export function assembleWillDocument(draft: EstatePlanDraft): string {
  const p = draft.personal;
  const countyLine = p.county?.trim()
    ? `County of ${p.county}, State of ${p.state}`
    : `State of ${p.state}`;

  const spouseClause =
    p.maritalStatus === "married" && p.spouseName?.trim()
      ? `I am married to ${p.spouseName}. References to my spouse mean ${p.spouseName}.`
      : p.maritalStatus === "partnered" && p.spouseName?.trim()
        ? `I am in a partnership with ${p.spouseName}.`
        : `My marital status is: ${p.maritalStatus || "not specified"}.`;

  const guardianClause =
    p.hasMinorChildren && draft.guardian?.fullName.trim()
      ? `
ARTICLE — GUARDIAN OF MINOR CHILDREN
If I leave minor children surviving me, I nominate ${draft.guardian.fullName} (${draft.guardian.relationship}) as guardian of the person and estate of my minor children.
${
  draft.alternateGuardian?.fullName.trim()
    ? `If that person is unable or unwilling to serve, I nominate ${draft.alternateGuardian.fullName} (${draft.alternateGuardian.relationship}) as alternate guardian.`
    : ""
}
`.trim()
      : "";

  const wishesParts: string[] = [];
  if (draft.wishes.pets?.trim()) {
    wishesParts.push(`Pets / animal care wishes: ${draft.wishes.pets.trim()}`);
  }
  if (draft.wishes.funeral?.trim()) {
    wishesParts.push(`Funeral / memorial wishes: ${draft.wishes.funeral.trim()}`);
  }
  if (draft.wishes.other?.trim()) {
    wishesParts.push(`Other wishes: ${draft.wishes.other.trim()}`);
  }
  const wishesArticle =
    wishesParts.length > 0
      ? `
ARTICLE — NONBINDING WISHES
The following statements express my wishes but are not intended to create enforceable trusts unless separately funded:
${wishesParts.map((w) => `- ${w}`).join("\n")}
`.trim()
      : "";

  return `
LAST WILL AND TESTAMENT
OF
${p.fullName.toUpperCase()}

DRAFT — FOR REVIEW ONLY
This document was assembled by WillGuide from your answers. It is not legal advice and may not meet all requirements of ${p.state || "your state"}. Have it reviewed before signing. Laws vary by state.

---

I, ${p.fullName}, of ${p.city}, ${countyLine}, being of sound mind and disposing memory, make, publish, and declare this to be my Last Will and Testament, and I revoke all prior wills and codicils.

ARTICLE 1 — IDENTITY AND FAMILY
${spouseClause}
I reside in ${p.city}, ${p.state}.

ARTICLE 2 — EXECUTOR
I nominate ${draft.executor.fullName} (${draft.executor.relationship}) as Executor of this Will.
${
  draft.alternateExecutor.fullName.trim()
    ? `If that person is unable or unwilling to serve, I nominate ${draft.alternateExecutor.fullName} (${draft.alternateExecutor.relationship}) as alternate Executor.`
    : "No alternate Executor is named."
}
I request that the Executor be permitted to serve without bond to the extent allowed by applicable law, and with authority to administer my estate, pay debts and expenses, and distribute property under this Will.

ARTICLE 3 — SPECIFIC BEQUESTS
${listBequests(draft)}

ARTICLE 4 — RESIDUE
I give the residue of my estate, real and personal, wherever situated, as follows:

${listBeneficiaries(draft)}

If a named beneficiary does not survive me, that person's share shall pass to my remaining surviving beneficiaries in equal shares, unless I have indicated otherwise above.

${guardianClause}

${wishesArticle}

ARTICLE — GENERAL PROVISIONS
If any provision of this Will is held invalid, the remaining provisions shall continue in effect. Headings are for convenience only.

IN WITNESS WHEREOF, I have signed this Will on _________________ (date), at _________________ (city/state).


_________________________________
${p.fullName}, Testator


WITNESSES
We, the undersigned, declare that the Testator signed this Will in our presence, that we signed as witnesses in the Testator's presence and in the presence of each other, and that to the best of our knowledge the Testator appeared to be of sound mind and under no duress.


Witness 1: ___________________________    Date: __________
Print name: ___________________________
Address: ______________________________


Witness 2: ___________________________    Date: __________
Print name: ___________________________
Address: ______________________________


Document assembled: ${todayLong()}
WillGuide draft ID reference: ${p.fullName} / ${p.state}
`.trim();
}
