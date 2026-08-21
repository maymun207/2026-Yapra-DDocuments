# OPERATOR LANE — Gemini · env-presence check for the OBS-3.1 live replay run
**cwf-operator-env-presence-obs31-v1 · 2026-07-04 · Operator lane (diagnostic read only)**

You are the Operator lane. This is a **diagnostic read only**. Hard fence — obey exactly:
- **NO repo contact** (do not clone, read, or touch `cwf_yaprak`).
- **NO writes** of any kind. **NO governed-table access.** **NO migrations.** **NO self-initiated "cleanup."**
- **NEVER echo, print, paste, log, or partially reveal any secret VALUE** — not one character, not a prefix/suffix, not a length. You report **presence/absence of NAMES only** (`SET` / `MISSING`).
- Do exactly the task below and stop. No extra steps.

## Task
Check the local `.env.local` file that the OBS-3.1 replay run will load (the file `vercel dev` reads — remember it must contain the values *in the file*; shell `export`s are ignored). For each env var NAME below, report a single word: `SET` if the name is present with a non-empty value, `MISSING` if the name is absent or its value is empty. **Do not print any value.**

**REQUIRED (run cannot proceed without all three):**
| Name | Why it's needed |
|---|---|
| `GEMINI_API_KEY` | The specimen's provider is `gemini/gemini-2.5-flash`; every rep's single gateway call reads this. Absent → reps ERROR (not empty) → the run is INVALID. |
| `SUPABASE_URL` | The `replay:run` audited endpoint's persistence client + the `replay_audit` write. |
| `SUPABASE_SECRET_KEY` | Same — the RLS-exempt secret-key client the endpoint uses. |

**OPTIONAL (nice-to-have, not blocking):**
| Name | Note |
|---|---|
| `CWF_REPLAY_TOKEN_BUDGET` | Only if you want headroom above the 500K/run default. `MISSING` is fine. |
| `FACTORY_TIMEZONE` | If the recorded turn's time block relies on it; `MISSING` is usually fine (defaults exist). |

## Output format (exactly this, nothing else)
```
GEMINI_API_KEY: SET|MISSING
SUPABASE_URL: SET|MISSING
SUPABASE_SECRET_KEY: SET|MISSING
CWF_REPLAY_TOKEN_BUDGET: SET|MISSING
FACTORY_TIMEZONE: SET|MISSING
VERDICT: READY  (if all three REQUIRED = SET)  |  NOT READY: <comma-separated MISSING required names>
```

If `.env.local` does not exist at the expected path, report `FILE MISSING: .env.local` and `VERDICT: NOT READY: file absent`.
