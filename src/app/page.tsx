import Link from "next/link";
import { PACKET_DELIVERABLES } from "@/components/TrustNote";

const STEPS = [
  {
    n: "1",
    t: "Answer guided questions",
    d: "About 15–25 minutes covering family, executor, guardians, assets, and gifts — one clear decision at a time.",
  },
  {
    n: "2",
    t: "Get plain-language help",
    d: "Every legal term is explained in ordinary English, with common choices people make in your situation.",
  },
  {
    n: "3",
    t: "Leave with a complete packet",
    d: "A draft will, an estate summary, and a signing checklist matched to your state.",
  },
];

export default function HomePage() {
  return (
    <main className="flex-1 bg-paper">
      <header className="border-b border-line">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
          <p className="font-display text-xl text-ink">WillGuide</p>
          <nav className="flex items-center gap-6">
            <a
              href="#how"
              className="hidden text-sm text-ink-soft transition hover:text-ink sm:block"
            >
              How it works
            </a>
            <a
              href="#packet"
              className="hidden text-sm text-ink-soft transition hover:text-ink sm:block"
            >
              What&apos;s included
            </a>
            <Link
              href="/start"
              className="rounded-sm bg-sage px-4 py-2 text-sm font-medium text-white transition hover:bg-sage-deep"
            >
              Start your will
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto w-full max-w-5xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl md:leading-[1.15]">
            Put your wishes in writing, without the overwhelm.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            WillGuide walks you through the decisions that matter and assembles
            them into an organized draft will and estate plan packet — clear
            enough to review with your family, or bring to an attorney.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/start"
              className="rounded-sm bg-sage px-6 py-3 text-sm font-medium text-white transition hover:bg-sage-deep"
            >
              Start your will
            </Link>
            <a
              href="#how"
              className="text-sm font-medium text-ink underline decoration-line underline-offset-4 transition hover:decoration-ink"
            >
              See how it works
            </a>
          </div>
          <p className="mt-8 text-sm text-ink-soft">
            WillGuide is not a law firm. Your documents are drafts for review —
            not legal advice.
          </p>
        </div>
      </section>

      <section id="how" className="border-t border-line bg-mist">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-20">
          <h2 className="font-display text-3xl text-ink">How it works</h2>
          <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
            {STEPS.map((item) => (
              <div key={item.n} className="border-t border-ink/20 pt-5">
                <p className="text-sm font-medium text-ink-soft">Step {item.n}</p>
                <h3 className="font-display mt-2 text-xl text-ink">{item.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packet" className="border-t border-line">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[2fr_3fr]">
            <div>
              <h2 className="font-display text-3xl text-ink">
                What&apos;s in your packet
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Your answers are assembled into structured documents from
                carefully written templates — not improvised by AI. What you
                see is exactly what your answers produced.
              </p>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {PACKET_DELIVERABLES.map((item) => (
                <li key={item.title} className="py-5">
                  <p className="font-medium text-ink">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-mist">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl text-ink">
              Honest about our limits
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              WillGuide is built for straightforward situations. If you own a
              business, hold assets abroad, have a large or contested estate, or
              care for a dependent with special needs, we&apos;ll tell you
              plainly — and point you to a licensed estate attorney instead of
              pretending a do-it-yourself draft is enough.
            </p>
            <Link
              href="/start"
              className="mt-8 inline-block rounded-sm bg-sage px-6 py-3 text-sm font-medium text-white transition hover:bg-sage-deep"
            >
              Begin the guide
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-8 text-sm text-ink-soft md:flex-row md:items-center md:justify-between">
          <p className="font-display text-base text-ink">WillGuide</p>
          <p>
            Educational drafting tools. Not a law firm. Not legal advice. State
            laws vary — review documents before signing.
          </p>
        </div>
      </footer>
    </main>
  );
}
