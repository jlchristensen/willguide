# WillGuide

**Repo:** https://github.com/jlchristensen/willguide

Affordable guided drafting for a **draft** last will and estate plan packet.

WillGuide walks someone through plain-language questions, explains terms with optional AI help, then **assembles documents from templates** (not freeform AI writing). Outputs include:

- Draft Last Will
- Estate summary / asset inventory
- State signing checklist (FL, TX, CA, NY + general fallback)

**Not a law firm. Not legal advice.** Documents are drafts for review and organization.

## Quick start

```bash
cd projects/willguide
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example`:

| Variable | Purpose |
|----------|---------|
| `OPENAI_API_KEY` | Optional. Powers live AI explanations. Without it, built-in plain-language help is used. |
| `OPENAI_MODEL` | Optional. Defaults to `gpt-4o-mini`. |
| `RESEND_API_KEY` | Optional. Enables real email delivery of the packet. |
| `EMAIL_FROM` | Required with Resend (e.g. `WillGuide <onboarding@resend.dev>`). |

## Main routes

| Path | What it does |
|------|----------------|
| `/` | Landing page |
| `/start` | Guided wizard |
| `/result` | Draft packet download / print / email |
| `/attorney` | Soft-gate when complexity flags are set |

## How drafting works

1. User answers structured questions → `EstatePlanDraft` JSON  
2. `/api/generate` fills conservative templates → plain-text packet  
3. `/api/assist` explains terms only (never invents clauses)  
4. `/api/send-packet` emails the packet when Resend is configured, otherwise captures the email server-side for the MVP  

## Deploy (AWS Amplify)

Connect the repo (or this folder as the app root), set build:

- **Build command:** `npm run build`
- **Output:** `.next` (Amplify Next.js SSR hosting)
- Add env vars in Amplify console

## Product note

Before charging customers or claiming multi-state compliance, have an estate attorney review templates and signing checklists.
