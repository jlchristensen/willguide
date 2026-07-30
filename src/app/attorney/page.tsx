import Link from "next/link";

export default function AttorneyPage() {
  return (
    <main className="atmosphere min-h-screen">
      <header className="border-b border-line/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-display text-lg text-ink">
            WillGuide
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-xs font-semibold tracking-[0.2em] text-sage">
          RECOMMENDED PATH
        </p>
        <h1 className="font-display mt-3 text-4xl text-ink">
          An attorney is the safer next step
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          Based on what you shared — business interests, foreign assets, a large
          estate, blended-family conflict, or a special-needs dependent — a
          simple DIY draft is not enough. A licensed estate planning attorney in
          your state can design documents that fit the real risks.
        </p>

        <div className="mt-10 space-y-4 text-sm leading-relaxed text-ink">
          <p className="font-semibold">What to do now</p>
          <ol className="list-decimal space-y-2 pl-5 text-ink-soft">
            <li>Search for a trusts &amp; estates attorney in your state.</li>
            <li>
              Bring your notes from WillGuide — family, executor preferences, and
              asset inventory still save time in the first meeting.
            </li>
            <li>
              Ask about wills vs. trusts, guardianship, and beneficiary
              designations on accounts (those often pass outside a will).
            </li>
          </ol>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/start"
            className="rounded-md border border-line bg-white px-5 py-3 text-sm font-medium text-ink"
          >
            Review my answers
          </Link>
          <Link
            href="/"
            className="rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white"
          >
            Back to WillGuide
          </Link>
        </div>

        <p className="mt-10 text-xs text-ink-soft">
          WillGuide is not a law firm and does not refer or supervise attorneys.
          This page is educational guidance only.
        </p>
      </div>
    </main>
  );
}
