export function TrustNote({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-ink-soft ${className}`}>
      WillGuide is not a law firm and does not give legal advice. Your packet is a{" "}
      <span className="font-medium text-ink">draft for review</span> — assembled
      from your answers into organized documents. State signing rules vary; follow
      the checklist, and talk with a licensed attorney when your situation is
      complex.
    </p>
  );
}

export const PACKET_DELIVERABLES = [
  {
    title: "Draft Last Will",
    detail: "A complete draft assembled from your choices — ready to review before signing.",
  },
  {
    title: "Estate summary",
    detail: "Beneficiaries, executor, guardians, assets, and gifts in one clear place.",
  },
  {
    title: "Signing checklist",
    detail: "Plain-language next steps for your state (witnesses, notary notes, storage).",
  },
] as const;

export const AFTER_PACKET_STEPS = [
  "Read the draft carefully — fix anything that doesn’t match your wishes.",
  "Print and sign only with the witnesses (and notary, if your checklist says so).",
  "Tell your executor where the signed original lives.",
  "For complex estates — or peace of mind — have an attorney review before you rely on it.",
] as const;
