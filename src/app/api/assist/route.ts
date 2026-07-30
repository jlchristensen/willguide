import { NextResponse } from "next/server";
import {
  getFallbackAssist,
  type AssistTopic,
} from "@/lib/assist-fallback";

const TOPICS = new Set<AssistTopic>([
  "executor",
  "beneficiary",
  "guardian",
  "residue",
  "bequest",
  "assets",
  "complexity",
  "signing",
  "general",
]);

const SYSTEM = `You are WillGuide's plain-language helper for estate planning education.
Rules:
- Explain terms and common choices in simple English.
- Never draft will clauses, never invent statutes, never claim to be a lawyer.
- Never say a document is legally valid or ready to file.
- Keep answers under 180 words.
- If asked for legal advice, say WillGuide is educational and they should consult a licensed attorney in their state.
- Do not collect or request Social Security numbers or account passwords.`;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      topic?: string;
      question?: string;
    };

    const topic = (TOPICS.has(body.topic as AssistTopic)
      ? body.topic
      : "general") as AssistTopic;
    const question = (body.question || "").trim().slice(0, 500);

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      const base = getFallbackAssist(topic);
      const answer = question
        ? `${base}\n\nRegarding your question (“${question}”): WillGuide’s live AI help is not configured yet on this server. Use the explanation above, and talk with an estate attorney for advice specific to your situation.`
        : base;
      return NextResponse.json({ answer, source: "fallback" });
    }

    const userPrompt = question
      ? `Topic: ${topic}\nUser question: ${question}`
      : `Topic: ${topic}\nExplain this topic simply for someone creating a draft will packet.`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.3,
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!res.ok) {
      const fallback = getFallbackAssist(topic);
      return NextResponse.json({
        answer: fallback,
        source: "fallback",
        warning: "AI provider unavailable; showing built-in explanation.",
      });
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const answer =
      data.choices?.[0]?.message?.content?.trim() || getFallbackAssist(topic);

    return NextResponse.json({ answer, source: "openai" });
  } catch {
    return NextResponse.json(
      { error: "Could not process assist request." },
      { status: 500 }
    );
  }
}
