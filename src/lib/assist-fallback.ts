export type AssistTopic =
  | "executor"
  | "beneficiary"
  | "guardian"
  | "residue"
  | "bequest"
  | "assets"
  | "complexity"
  | "signing"
  | "general";

const FALLBACK: Record<AssistTopic, string> = {
  executor:
    "Your executor (sometimes called a personal representative) is the person who carries out your will after you die — gathering assets, paying debts, and distributing what remains. Choose someone organized and trustworthy. Name an alternate in case your first choice cannot serve.",
  beneficiary:
    "A beneficiary is someone who receives part of your estate. You can name people or charities. For a simple plan, many people leave the residue (everything left after specific gifts) in equal shares to a small list of beneficiaries.",
  guardian:
    "If you have minor children, a guardian is who would care for them if you (and the other parent, if applicable) cannot. Talk with the person first. Name an alternate. This nomination still typically goes through a court process.",
  residue:
    "The residue is everything left after debts, expenses, and specific gifts. Most of your estate often passes through the residue clause, so choose those beneficiaries carefully.",
  bequest:
    "A specific bequest is a particular item or gift (for example, a car or a family heirloom) to a named person. Keep descriptions clear. If the item is gone at your death, that gift usually lapses into the residue.",
  assets:
    "You do not need bank-level detail here. A high-level inventory helps your executor know where to look — home, accounts, vehicles, and important personal property. Update it when big things change.",
  complexity:
    "Some situations are a poor fit for a simple DIY draft: business ownership, foreign property, very large estates, serious blended-family conflict, or special-needs dependents. In those cases, an estate attorney can protect people and reduce costly mistakes.",
  signing:
    "A will usually must be signed with the formalities your state requires (often two witnesses; sometimes a notarized self-proving affidavit). Do not sign alone. Follow your state checklist in the packet.",
  general:
    "WillGuide walks you through common decisions and assembles a draft from your answers. It is not a lawyer. Use the help prompts when a term is unclear, review everything carefully, and get legal advice when your situation is complex.",
};

export function getFallbackAssist(topic: AssistTopic): string {
  return FALLBACK[topic] ?? FALLBACK.general;
}
