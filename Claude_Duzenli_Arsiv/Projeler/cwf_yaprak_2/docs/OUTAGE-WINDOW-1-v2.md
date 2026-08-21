# OUTAGE-WINDOW-1 · v2 — split window, four turns each, no waiting

**Supersedes v1**, whose timing premise was wrong. **Closes on proof:**
`BUG-019` · `BUG-002` (window A) · `BUG-007` false half (window B).
**Floor:** master `5858ce8c` · prod `dpl_39xeq9mLzxts4TBtxjPyAxhhQpyF`.
**Already banked:** BUG-007's healthy control, `trace=e080e100` —
`[RedirectPolicy] backend=armes redirectAllowed=true withheld=[]`.

---

## What v1 got wrong, recorded rather than quietly replaced

v1 planned to exploit a warm cache serving a stale `up` verdict for one TTL.
**There is no such interval.** AG's reads at this anchor:

- Tools come from the **DB mirror** — production logs show
  `[MCP Mirror] served 154 defs … (live-fallback: 0)` — so they keep being
  offered regardless of whether the live backend answers.
- Withholding is a **live DB read every turn**: `mcpHealthWithholding.ts:60`
  requires a `backend_health` row that is **`down` AND fresh**. Nothing else
  produces `withheld`.
- **`freshnessSec` is not how long an old verdict survives; it is how long a
  `down` row keeps withholding alive.**
- **The Sync button writes the health verdict**, not just the catalogue
  (`backend-health.ts:27-32`). So the sequence is driven by pressing Sync, not by
  waiting for anything.

**`disabled` is the WRONG lever**, confirmed: `enabled` gates which servers load
at all, so disabling un-mounts the backend, its tools vanish and
`withheldBackends` stays **empty** — a different condition that proves nothing.

**The lever is: edit the URL, then press Sync.**

---

## STEP 0-bis — two reads before either window. AG, from code.

**R1.** Do `golden-runner` and `synthetic-traffic-injector` (both `*/1`,
`vercel.json:49,53`) ever exercise **`honestbench`**, or only the ARMES/factory
surface?
**R2.** Is BUG-002's **user-facing** path backend-agnostic — does any withheld
backend produce "temporarily unavailable" rather than "does not exist" — or is it
ARMES-specific?

**If both come back as expected (crons don't touch honestbench; the user path is
generic), run window A then B as written.** If either comes back otherwise, stop
and say so: the split collapses into one short ARMES window and the Architect
will reissue this file rather than have the owner choose.

---

## WINDOW A — `honestbench`. Zero customer exposure, zero eval pollution.

**Why honestbench:** the minute-cadence crons run factory questions against
ARMES. Breaking honestbench leaves the customer's MES up and the eval baseline
clean. **This is not a convenience — deliberately polluting the golden surface
would recreate BUG-008 by hand.**

**BEFORE TOUCHING ANYTHING: record honestbench's current URL somewhere outside
the panel.** Once overwritten it is **not recoverable from the panel** — the edit
field pre-fills from the stored value and there is no history.
**Do not touch honestbench's `activeMode`.** The dial stays under honesty control
until `HONESTBENCH-RUN-1`. This window changes a URL, nothing else.

**Timing:** do not start within ~2 minutes before `:00` or `:30` — the health
cron (`*/30`) could write `down` early and collapse turn 2 into turn 3.

| # | Action | Expected |
|---|---|---|
| **1** | Ordinary factory question, nothing changed | normal answer; baseline control |
| **2** | **Break honestbench's URL. DO NOT press Sync.** Ask a question that uses a honestbench tool (e.g. a grove/yield question) | **BUG-019:** tools still offered from the mirror, ≥1 `[MCP Error]`, the answer carries the **failure disclosure**, `answerUnbacked` stamped, **and no refusal stands alone** |
| **3** | **Press Sync** (writes the `down` row). Ask the same question | **BUG-002:** the answer says the capability is **temporarily unavailable**, not that it **does not exist** |
| **4** | **Restore the URL, press Sync.** Ask the same question again | baseline returns; a window that is not proven closed is still open |

---

## WINDOW B — ARMES. One Sync, one turn, then out.

Only BUG-007's false half needs this, because `redirectAllowed` is composed for
`armes` alone today.

**BEFORE: record ARMES's current URL outside the panel.**

| # | Action | Expected |
|---|---|---|
| **1** | **Break ARMES's URL, press Sync.** Ask one ordinary factory question | `[RedirectPolicy] backend=armes redirectAllowed=false withheld=[armes]` — **both fields explicit**, never an absent line |
| **2** | **Restore the URL, press Sync.** Ask the same question | `redirectAllowed=true withheld=[]` returns |

**Total ARMES exposure: two turns.** Any golden/synthetic run that lands inside
those two turns will fail; **that is a known, bounded cost and it is written here
in advance** — annotate those runs' timestamps in the report rather than
discovering them later.

---

## Rules for both windows

- **A near miss is not a pass** (S81-3 rule 2). If a step is mistimed — the cron
  wrote `down` before turn 2, or the mirror had already dropped the tools —
  **restore, then repeat the whole window from turn 1.** Do not patch a sequence
  mid-flight and do not induce twice "for a better read".
- **Do not leave a window open while doing anything else.** If interrupted,
  execute the restore turn first.
- **Screenshots of turns 2, 3 and 4** (window A) and turn 1 (window B). The log
  reads are the Architect's; the user-facing wording is only visible to you.
- **One value deliberately not read:** the live `mcp.healthFreshnessSec`, which a
  `domain_rules` row may raise above the 3600 s code floor. The sequence does not
  depend on it — withholding is ended by Sync, not by expiry, and even the
  minimum permitted value (300 s) outlasts the window. Recorded as not-read
  rather than assumed.

---

## After the windows

The Architect reads the traces and mints `REGISTER-BUG-BUCKET-v19` carrying, in
one version: the three closures or the precise reason each did not close, the
banked BUG-007 healthy control, **rule 13 — `S81-4`, a frozen entry is not a live
read** — and this file's own correction as a premise-error line against BUG-016.

`TYPEGATE-TRUTH-1` does not wait for either window.

<!-- END · OUTAGE-WINDOW-1-v2 -->
