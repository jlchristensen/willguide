import { NextResponse } from "next/server";
import {
  hasComplexityFlags,
  isDraftReadyForGenerate,
  type EstatePlanDraft,
} from "@/lib/schema";
import { assemblePacket, packetToPlainText } from "@/lib/packet";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { draft?: EstatePlanDraft };
    const draft = body.draft;

    if (!draft || !draft.personal) {
      return NextResponse.json({ error: "Missing draft." }, { status: 400 });
    }

    if (hasComplexityFlags(draft.complexity)) {
      return NextResponse.json(
        {
          error: "Complexity flags require attorney path.",
          redirect: "/attorney",
        },
        { status: 409 }
      );
    }

    const errors = isDraftReadyForGenerate(draft);
    if (errors.length) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const packet = assemblePacket(draft);
    const packetText = packetToPlainText(packet);

    return NextResponse.json({
      packet,
      packetText,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not generate packet." },
      { status: 500 }
    );
  }
}
