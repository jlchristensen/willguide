import type { EstatePlanDraft } from "@/lib/schema";

const STORAGE_KEY = "willguide-draft-v1";
const PACKET_KEY = "willguide-packet-v1";

export function saveDraft(draft: EstatePlanDraft): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function loadDraft(): EstatePlanDraft | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as EstatePlanDraft;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}

export function savePacketText(text: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PACKET_KEY, text);
}

export function loadPacketText(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(PACKET_KEY);
}
