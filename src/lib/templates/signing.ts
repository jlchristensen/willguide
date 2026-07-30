import type { USState } from "@/lib/schema";

export type SigningChecklist = {
  state: string;
  title: string;
  steps: string[];
  notes: string[];
};

const GENERIC: SigningChecklist = {
  state: "US (general)",
  title: "General U.S. will signing checklist",
  steps: [
    "Print the draft will on plain paper (single-sided is fine).",
    "Do not sign until witnesses are present with you.",
    "Sign and date the will in the presence of at least two adult witnesses (many states require this).",
    "Have each witness sign, print their name, and add their address while you are all present together.",
    "Store the signed original in a safe place and tell your executor where it is.",
    "Consider asking an estate planning attorney to review the draft before signing — especially if your situation is complex.",
  ],
  notes: [
    "Requirements differ by state (witness count, notary, self-proving affidavits, electronic wills).",
    "This checklist is educational, not legal advice.",
  ],
};

const BY_STATE: Partial<Record<USState, SigningChecklist>> = {
  FL: {
    state: "FL",
    title: "Florida signing checklist (summary)",
    steps: [
      "Print your draft will.",
      "Sign at the end of the will in the presence of two witnesses.",
      "Have both witnesses sign in your presence and in each other's presence.",
      "Consider a self-proving affidavit notarized with your witnesses (common in Florida practice) so probate is smoother.",
      "Keep the original signed will safe and tell your personal representative where it is.",
    ],
    notes: [
      "Florida has specific formalities; electronic wills have additional rules.",
      "This is a plain-language summary for education — confirm current Florida requirements before signing.",
    ],
  },
  TX: {
    state: "TX",
    title: "Texas signing checklist (summary)",
    steps: [
      "Print your draft will.",
      "Sign the will in the presence of two credible witnesses age 14 or older.",
      "Have both witnesses sign in your presence.",
      "Consider a self-proving affidavit (often notarized) to simplify probate.",
      "Store the original safely and inform your executor.",
    ],
    notes: [
      "Texas recognizes holographic wills in limited cases; this packet is a formal attested will draft.",
      "Educational summary only — confirm current Texas requirements.",
    ],
  },
  CA: {
    state: "CA",
    title: "California signing checklist (summary)",
    steps: [
      "Print your draft will.",
      "Sign the will (or acknowledge your signature) in the presence of two witnesses.",
      "Have both witnesses sign during your lifetime, understanding that they are witnessing your will.",
      "Witnesses should ideally not be beneficiaries.",
      "Store the original safely; California does not require notarization for a standard will, though notarized affidavits can help in some contexts.",
    ],
    notes: [
      "California also recognizes holographic wills under specific rules; this packet is a formal witnessed will draft.",
      "Educational summary only — confirm current California requirements.",
    ],
  },
  NY: {
    state: "NY",
    title: "New York signing checklist (summary)",
    steps: [
      "Print your draft will.",
      "Sign at the end of the will in the presence of at least two attesting witnesses.",
      "Have both witnesses sign, typically within a short period, and ideally complete attestation language.",
      "Consider a self-proving affidavit with a notary to ease probate.",
      "Store the original safely and tell your executor where to find it.",
    ],
    notes: [
      "New York has detailed attestation formalities; small mistakes can cause problems.",
      "Educational summary only — confirm current New York requirements.",
    ],
  },
};

export function getSigningChecklist(state: string | undefined): SigningChecklist {
  if (state && state in BY_STATE) {
    return BY_STATE[state as USState] as SigningChecklist;
  }
  return {
    ...GENERIC,
    state: state || GENERIC.state,
    title: state
      ? `${state} — use general checklist (state-specific guide coming soon)`
      : GENERIC.title,
  };
}

export function formatSigningChecklist(checklist: SigningChecklist): string {
  return `
${checklist.title}
State reference: ${checklist.state}

STEPS
${checklist.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

NOTES
${checklist.notes.map((n) => `- ${n}`).join("\n")}
`.trim();
}
