import { NextResponse } from "next/server";

/**
 * Captures email + packet delivery intent.
 * If RESEND_API_KEY + EMAIL_FROM are set, attempts real email via Resend.
 * Otherwise stores a server log-style acknowledgment (MVP waitlist capture).
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      packetText?: string;
      fullName?: string;
    };

    const email = (body.email || "").trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }

    const packetText = (body.packetText || "").slice(0, 200_000);
    if (!packetText) {
      return NextResponse.json({ error: "Packet missing." }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;

    if (resendKey && from) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [email],
          subject: "Your WillGuide draft packet",
          text: `Hi${body.fullName ? ` ${body.fullName}` : ""},\n\nHere is your WillGuide draft estate packet. This is educational and not legal advice.\n\n${packetText}`,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Resend error:", errText);
        return NextResponse.json(
          { error: "Email provider failed. You can still download your packet." },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true, delivered: true });
    }

    // MVP without email provider: acknowledge capture for waitlist/product utility
    console.info("[willguide] packet email capture", {
      email,
      name: body.fullName || null,
      bytes: packetText.length,
      at: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      delivered: false,
      message:
        "Saved your email for this session. Email delivery is not configured yet — download or print your packet below.",
    });
  } catch {
    return NextResponse.json({ error: "Could not send packet." }, { status: 500 });
  }
}
