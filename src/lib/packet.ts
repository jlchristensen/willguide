import type { EstatePlanDraft } from "@/lib/schema";
import { assembleWillDocument } from "@/lib/templates/will";
import {
  formatSigningChecklist,
  getSigningChecklist,
} from "@/lib/templates/signing";
import { assembleEstateSummary } from "@/lib/templates/summary";

export type EstatePacket = {
  will: string;
  summary: string;
  signing: string;
  disclaimer: string;
};

export const PACKET_DISCLAIMER = `IMPORTANT DISCLAIMER
WillGuide provides educational drafting tools and document assembly from your answers. We are not a law firm and do not provide legal advice. This packet is a DRAFT. State laws differ on wills, witnesses, notarization, and related documents. Review carefully before signing. If you own a business, have foreign assets, a large or complex estate, blended-family conflict, or a special-needs dependent, consult a licensed estate planning attorney in your state.`;

export function assemblePacket(draft: EstatePlanDraft): EstatePacket {
  const checklist = getSigningChecklist(draft.personal.state || undefined);
  return {
    will: assembleWillDocument(draft),
    summary: assembleEstateSummary(draft),
    signing: formatSigningChecklist(checklist),
    disclaimer: PACKET_DISCLAIMER,
  };
}

export function packetToPlainText(packet: EstatePacket): string {
  return [
    packet.disclaimer,
    "",
    "=".repeat(60),
    "",
    packet.will,
    "",
    "=".repeat(60),
    "",
    packet.summary,
    "",
    "=".repeat(60),
    "",
    packet.signing,
  ].join("\n");
}
