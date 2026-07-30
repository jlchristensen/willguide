import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="hero-atmosphere relative min-h-[100svh] text-white">
        <div className="absolute inset-0 animate-soft-in opacity-40">
          <div className="absolute -left-20 top-24 h-64 w-64 rounded-full bg-sage/30 blur-3xl" />
          <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-sand/20 blur-3xl" />
        </div>

        <header className="no-print relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
          <p className="font-display text-xl tracking-tight md:text-2xl">WillGuide</p>
          <Link
            href="/start"
            className="text-sm text-white/80 transition hover:text-white"
          >
            Start
          </Link>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-5xl flex-col justify-end px-6 pb-16 pt-24 md:pb-24">
          <h1 className="font-display animate-fade-up max-w-3xl text-5xl leading-[1.05] tracking-tight md:text-7xl">
            WillGuide
          </h1>
          <p className="animate-fade-up-delay mt-5 max-w-xl text-lg text-white/85 md:text-xl">
            An affordable, calm path from first questions to a legally organized
            draft will and estate plan packet.
          </p>
          <div className="animate-fade-up-delay mt-10 flex flex-wrap gap-4">
            <Link
              href="/start"
              className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-mist"
            >
              Start your will
            </Link>
            <a
              href="#how"
              className="rounded-md border border-white/35 px-6 py-3 text-sm text-white/90 transition hover:border-white/70"
            >
              How it works
            </a>
          </div>
        </div>
      </section>

      <section id="how" className="atmosphere border-t border-line/60 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl text-ink md:text-4xl">
            Guided answers. Organized draft. Clear next steps.
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">
            WillGuide asks the decisions that matter, explains terms in plain
            language, then assembles a draft packet from your answers — not from
            freeform AI guessing.
          </p>

          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Answer guided questions",
                d: "Family, executor, guardians, assets, and gifts — one step at a time.",
              },
              {
                n: "02",
                t: "Get plain-language help",
                d: "Stuck on a word? Ask for a short explanation without legal jargon.",
              },
              {
                n: "03",
                t: "Download your packet",
                d: "Draft will, estate summary, and a signing checklist for your state.",
              },
            ].map((item) => (
              <li key={item.n}>
                <p className="text-xs font-semibold tracking-[0.2em] text-sage">
                  {item.n}
                </p>
                <h3 className="font-display mt-2 text-xl text-ink">{item.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line/60 bg-ink px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl md:text-3xl">Built for simple situations</h2>
          <p className="mt-4 max-w-2xl text-white/75">
            If you own a business, hold foreign assets, have a large or conflicted
            estate, or care for a special-needs dependent, we&apos;ll steer you
            toward an attorney instead of pretending a DIY draft is enough.
          </p>
          <p className="mt-8 max-w-2xl text-sm text-white/55">
            WillGuide is not a law firm and does not provide legal advice. Documents
            are drafts for review. State formalities vary — follow your signing
            checklist and get professional help when needed.
          </p>
          <Link
            href="/start"
            className="mt-10 inline-block rounded-md bg-sage px-6 py-3 text-sm font-semibold text-white transition hover:bg-sage-deep"
          >
            Begin the guide
          </Link>
        </div>
      </section>

      <footer className="border-t border-line bg-paper px-6 py-8 text-sm text-ink-soft">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-ink">WillGuide</p>
          <p>Educational drafting tools. Not legal advice.</p>
        </div>
      </footer>
    </main>
  );
}
