"use client";

import { useEffect, useState } from "react";
import type { AssistTopic } from "@/lib/assist-fallback";

const TOPICS: { id: AssistTopic; label: string }[] = [
  { id: "general", label: "Overview" },
  { id: "executor", label: "Executor" },
  { id: "beneficiary", label: "Beneficiaries" },
  { id: "guardian", label: "Guardian" },
  { id: "residue", label: "Residue" },
  { id: "bequest", label: "Bequests" },
  { id: "assets", label: "Assets" },
  { id: "complexity", label: "When to see a lawyer" },
  { id: "signing", label: "Signing" },
];

export function AssistPanel({ defaultTopic = "general" }: { defaultTopic?: AssistTopic }) {
  const [topic, setTopic] = useState<AssistTopic>(defaultTopic);

  useEffect(() => {
    setTopic(defaultTopic);
  }, [defaultTopic]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function ask(customQuestion?: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          question: customQuestion ?? question,
        }),
      });
      const data = (await res.json()) as { answer?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "Could not get help");
      setAnswer(data.answer || "");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className="rounded-lg border border-line bg-white/70 p-4 backdrop-blur md:p-5">
      <h2 className="font-display text-lg text-ink">Plain-language help</h2>
      <p className="mt-1 text-xs text-ink-soft">
        Explanations only — WillGuide will not invent legal clauses here.
      </p>

      <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
        Topic
        <select
          className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink"
          value={topic}
          onChange={(e) => setTopic(e.target.value as AssistTopic)}
        >
          {TOPICS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={() => ask("Explain this topic simply.")}
        className="mt-3 w-full rounded-md bg-sage px-3 py-2 text-sm font-semibold text-white transition hover:bg-sage-deep"
        disabled={loading}
      >
        {loading ? "Thinking…" : "Explain this topic"}
      </button>

      <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
        Or ask a short question
        <textarea
          className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink"
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. Who should I pick as executor?"
        />
      </label>
      <button
        type="button"
        onClick={() => ask()}
        disabled={loading || !question.trim()}
        className="mt-2 w-full rounded-md border border-line px-3 py-2 text-sm font-medium text-ink transition hover:bg-mist disabled:opacity-40"
      >
        Ask
      </button>

      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      {answer ? (
        <div className="mt-4 rounded-md bg-mist/80 p-3 text-sm leading-relaxed text-ink">
          {answer}
        </div>
      ) : null}
    </aside>
  );
}
