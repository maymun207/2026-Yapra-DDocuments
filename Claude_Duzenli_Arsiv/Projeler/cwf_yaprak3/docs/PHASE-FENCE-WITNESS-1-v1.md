# PHASE-FENCE-WITNESS-1 · v1 — the fence fires on camera, and a failed read stops impersonating "nothing withheld"

<!-- PHASE-FENCE-WITNESS-1-v1 · 2026-08-08 · S86 · Architect (Opus 5) → AG-1.
     Bucket #2: BUG-006 + BUG-009 + BUG-036, one phase, ratified adjacency.
     Reuses VERBATIM the transport design proven in FAULT-SWITCH-0's C4' (its
     STOP report records it as a reusable asset). Zero migrations, zero
     Operator steps. -->

## PRECONDITION (S47-1)
Fresh full clone. `git rev-parse origin/master` = `224c4fb` or a descendant whose
additions are docs/relay only. Branch: `phase/fence-witness-1`. Worktree; absolute
paths. AG-2 is idle — no disjointness constraint this time.

## W1 · THE OWNER'S ONE STEP — repair the Preview key (BUG-036)
Vercel dashboard → cwf_yaprak → Settings → Environment Variables →
`SUPABASE_SECRET_KEY` → **Preview** scope → set to the CURRENT valid key (the one
Production uses). Secret-class, owner-only; the value transits no chat, no AG shell,
no report. **AG: verify only PRESENCE** (`vercel env ls` — Preview row exists), never
the value. Until W1 is done, W2 cannot succeed — if the presence check fails,
STOP-AND-REPORT rather than improvising.

## W2 · THE WITNESS RUN (C4' replayed verbatim)
1. Mint throwaway bearer locally (`openssl rand -hex 32`, 0600 file outside the repo,
   destroyed at step 5). `vercel env add CRON_SECRET preview` + `vercel env add
   CWF_FAULT_SWITCH preview` (value `synthetic-spend-read`), both scoped to
   `phase/fence-witness-1`.
2. Push the branch (it will already carry G2's code — build once, witness once).
   Preview deployment born ARMED and with a LIVE key.
3. HANDSHAKE: wait; the Architect reads the deployment from the sensor and hands a
   fresh 23h share link via one owner paste. Then the cookie-jar + bearer curl to
   `/api/admin/synthetic-traffic-injector`.
4. Expected body: `{"active":false,"reason":"spend-unmeasured"}` — the fence REFUSING
   because the read it depends on was made to fail. (If it says `"disabled"` again,
   STOP — that means governed reads are still floored and W1 did not take.)
5. Disarm: remove both branch-scoped env rows; destroy the minted file.

## W3 · THE TRIPLE (Architect's reads, named sensors)
HTTP body (yours) · runtime log pair `[FaultSwitch] FIRING point=synthetic-spend-read`
→ `daily spend UNMEASURABLE — injection REFUSED` (mine) · the durable
`telemetry_events` row — `payload.guard='synthetic-injector.tokensSpentToday'`,
`payload.error='InducedReadFaultError'`, `session_id` NULL (mine). **BUG-006 closes on
that row's id** — the first positive fence-firing evidence in the project's history,
replacing forever the inference-from-log-absence it was named for.

## G2 · BUG-009 — the withholding read gets its third state
Today `withholdUnhealthyBackends`'s catch returns `{ tools, withheldBackends: [] }` —
byte-identical to the healthy nothing-withheld answer. MEASURE-READ-HONESTY-1: a read
feeding a protective decision must distinguish "no data" from "could not read".

The FAIL-OPEN decision is PRESERVED (tools still pass — availability floor law); what
changes is that the failure stops being silent and stops impersonating health:

1. Return shape grows `healthReadFailed: boolean` (false on every healthy path,
   true only in the catch). `withheldBackends` stays `[]` there — empty≠zero: an
   unreadable ledger names no backends.
2. The catch records `recordMeasurementUnavailable('gatewayPreflight.backendHealth', err)`
   — the same durable ledger the spend fence uses — and keeps its born-loud
   `console.error`.
3. `gatewayPreflight` propagates the flag into the turn ledger next to
   `withheldBackends`, and `resolveTurnChips` renders, when true, the bilingual line
   in the withheld-chip family: `Sağlık okuması başarısız — saklama listesi bilinmiyor
   / Health read failed — withholding unknown`. A user answering from possibly-unhealthy
   backends deserves the flag on screen, not only in a log.
4. Amend test (7) exactly as its own comment promised — it now asserts the three-state
   shape — and add: armed `backend-health-read` (env-stubbed) → `healthReadFailed:
   true` + recorder called with the guard label; healthy path → `false` + recorder
   NOT called; chip renders on true, absent on false (both languages in one line, F137
   style).

## SCOPE — named
NOT touched: the fail-open policy itself (a POLICY-layer valve, ADR-012 — flipping it
to fail-closed is a separate owner decision, not this phase); the spend-fence sites;
prompt segments.

## GATES · REPORT · MERGE
Usual: CHANGELOG; doc-drift verdict rules (expect hash-only or silent); tenant-zero
with positive control. STOP-FOR-REVIEW to `docs/relay/` after CI green with suite
BASE+DELTA (counts CI-arbitrated; no file-count projection — the delta itself is the
report). W2/W3 evidence block included. Merge on GO with verbatim subject
`merge: FENCE-WITNESS-1 — the fence fires on camera, and a failed read gets a name`;
`--no-ff`, `--cleanup=strip`. The merge run doubles as the CANARY CAP verification:
with `CWF_EVAL_CI_MONTHLY_RUN_CAP=240` live, expect REAL verdict lines and the 61st
`replay_audit` canary row — report the warning line's absence explicitly.

<!-- END · PHASE-FENCE-WITNESS-1-v1 -->
