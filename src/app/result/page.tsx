"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AFTER_PACKET_STEPS,
  PACKET_DELIVERABLES,
  TrustNote,
} from "@/components/TrustNote";
import { loadDraft, loadPacketText } from "@/lib/storage";

export default function ResultPage() {
  const [packet, setPacket] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [state, setState] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setPacket(loadPacketText());
    const draft = loadDraft();
    if (draft?.email) setEmail(draft.email);
    if (draft?.personal.fullName) setFullName(draft.personal.fullName);
    if (draft?.personal.state) setState(draft.personal.state);
  }, []);

  function download() {
    if (!packet) return;
    const blob = new Blob([packet], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "willguide-draft-packet.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function sendEmail() {
    if (!packet) return;
    setSending(true);
    setStatus("");
    try {
      const res = await fetch("/api/send-packet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, packetText: packet, fullName }),
      });
      const data = (await res.json()) as {
        error?: string;
        message?: string;
        delivered?: boolean;
      };
      if (!res.ok) {
        setStatus(data.error || "Could not send.");
        return;
      }
      setStatus(
        data.delivered
          ? "Sent — check your inbox."
          : data.message || "Email captured. Download your packet below."
      );
    } catch {
      setStatus("Network error.");
    } finally {
      setSending(false);
    }
  }

  if (packet === null) {
    return (
      <main className="atmosphere flex min-h-screen items-center justify-center px-6">
        <p className="text-ink-soft">Loading packet…</p>
      </main>
    );
  }

  if (!packet) {
    return (
      <main className="atmosphere flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-3xl text-ink">No packet found</h1>
        <p className="mt-3 max-w-md text-ink-soft">
          Complete the guide first so we can assemble your draft.
        </p>
        <Link
          href="/start"
          className="mt-8 rounded-md bg-sage px-5 py-3 text-sm font-semibold text-white"
        >
          Start the guide
        </Link>
      </main>
    );
  }

  return (
    <main className="atmosphere min-h-screen">
      <header className="no-print border-b border-line bg-paper">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-display text-lg text-ink">
            WillGuide
          </Link>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-md border border-line px-3 py-2 text-sm text-ink"
            >
              Print / Save PDF
            </button>
            <button
              type="button"
              onClick={download}
              className="rounded-md bg-ink px-3 py-2 text-sm font-semibold text-white"
            >
              Download
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="no-print mb-10">
          <p className="text-xs font-semibold tracking-[0.16em] text-sage uppercase">
            Packet ready
          </p>
          <h1 className="font-display mt-2 text-3xl text-ink md:text-4xl">
            {fullName ? `${fullName.split(" ")[0]}, your draft packet is ready` : "Your draft packet is ready"}
          </h1>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Everything below was assembled from your answers into one organized
            file{state ? ` for ${state}` : ""}. Read it before you sign anything.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {PACKET_DELIVERABLES.map((item, i) => (
              <div
                key={item.title}
                className="border-t border-sage/40 pt-3"
              >
                <p className="text-xs font-semibold tracking-[0.14em] text-sage">
                  0{i + 1}
                </p>
                <p className="mt-1 font-display text-lg text-ink">{item.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 border border-line bg-white px-5 py-5">
            <p className="text-sm font-semibold text-ink">What to do next</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-ink-soft">
              {AFTER_PACKET_STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="mt-6 flex flex-col gap-3 border border-line bg-white p-4 sm:flex-row sm:items-end">
            <label className="flex-1 text-sm text-ink">
              Email a copy to yourself
              <input
                className="mt-1 w-full rounded-md border border-line px-3 py-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </label>
            <button
              type="button"
              disabled={sending || !email}
              onClick={sendEmail}
              className="rounded-md bg-sage px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {sending ? "Sending…" : "Email packet"}
            </button>
          </div>
          {status ? <p className="mt-2 text-sm text-ink-soft">{status}</p> : null}

          <div className="mt-6">
            <TrustNote />
          </div>
        </div>

        <p className="no-print mb-3 text-xs font-semibold tracking-[0.14em] text-ink-soft uppercase">
          Full packet
        </p>
        <article className="print-packet whitespace-pre-wrap rounded-lg border border-line bg-white p-6 font-mono text-xs leading-relaxed text-ink md:p-8 md:text-sm">
          {packet}
        </article>

        <p className="no-print mt-8 text-center text-sm text-ink-soft">
          <Link href="/start" className="font-medium text-sage underline">
            Edit answers and rebuild
          </Link>
        </p>
      </div>
    </main>
  );
}
