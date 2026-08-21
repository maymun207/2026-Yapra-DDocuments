# PHASE-OBS-HOST-TRUTH-1-v1 — the observability host stops being unwatched, and a flush stops lying

<!-- S98 · Architect-authored · lane AG-3 · Wave-5 MAIN.
     Carries TWO named standing findings: OBS-HOST-HEALTH-1 and
     F-OBS-FLUSH-OK-LIE. Took #17's slot by owner ruling (S98) — the
     honestbench instrument is already BUILT and its blockers are outside
     the Author lane, so it moves to Wave 6 as a blocker sweep.
     URGENCY: the monthly Langfuse budget window opens ~20 August — days
     away — and during it the host is dark for ~10 days. A blind spot with
     a known date is not a risk, it is an appointment. -->

## PRECONDITION (S47-1)
Fresh clone at `origin/master` = `cc9a2a78de473b2ec6eeb3d38641780cc781851b`
(rev 249 · 575 vitest test files · 77 migrations · 15 ADRs · drift 7/7 ·
zero `phase/*`). Disagreement → STOP and report.

## THE TWO FINDINGS, STATED
**F-OBS-FLUSH-OK-LIE.** The force-flush path reports `langfuse=ok` when
its promise RESOLVES — not when the export was actually delivered. A
serverless invocation therefore ends saying it shipped its traces when it
may have shipped nothing. This is exactly the class this house keeps
killing: one shape carrying two opposite facts (delivered vs
attempted-and-unknown).
**OBS-HOST-HEALTH-1.** The self-hosted Langfuse host (AWS EC2 behind
CloudFront) has NO internal health surface. When it is down — including
the scheduled budget window — nothing in this system says so; traces
simply stop arriving and every reader assumes a quiet day.

## CLAIMS (S97-L1 — computed live this session; each names its source)
- `LOG-TRUTH-1 G0` (manifest rev 142 note, read live) already made
  `forceFlushObservability()` race each processor individually with a
  bounded timeout and log a structured diagnostic naming which processor
  did not settle — **the diagnostic exists; the VERDICT is still
  optimistic.** This phase is the second half of that work, not a rebuild.
- ADR-004/008 keep three systems apart and this phase must not blur them:
  `telemetry_events` = durable governance LEDGER · Langfuse = scrubbed
  causal TRACES · `turn_trace_digest` = 14-day DISPLAY-ONLY mirror.
- ADR-007 is binding here: the Langfuse host is ENV-ONLY by law, secrets
  are never echoed, and a rejected host produces one loud closed-reason
  line. A health surface must obey all three.
- The house has a health-surface precedent to copy rather than invent:
  `backend_health` + `api/admin/backend-health.ts` (CRON_SECRET machine
  arm, */30 cron) — read it before designing anything.
- MEASURE-READ-HONESTY-1 is the phase's spine: three shapes, no fourth —
  throw · `null` · `numberOrNull`; the guard catches failure, never success.

## THE SHAPE
### R1 — the flush verdict tells delivery from attempt
`ok` may only mean DELIVERED. Everything else is a named state
(`unknown`/`timeout`/`failed`, closed enum), carried on the same one
structured line the G0 work already emits — additive fields, no new log
site. If the exporter genuinely cannot report delivery, then `ok` is
UNAVAILABLE as a verdict and the honest value is `unknown`: say that in
the report rather than manufacturing certainty. **Prove the lie exists
first** (a forced non-delivering exporter that today prints `ok`), then
prove it reds after.

### R2 — the host gets a health surface
A bounded liveness probe of the configured Langfuse host, on the
`backend-health` cron pattern, recording an observation the system can
read back. Rules: env-only host (ADR-007, reuse `validateLangfoose`-class
validation already in `observability/config.ts` — do not re-read raw env)
· no secret in any recorded field · a probe that cannot run records
`could-not-read`, never `down` (a fence that cannot measure must not
manufacture a verdict) · the record is an OBSERVATION, never authority.

### R3 — the blind spot is VISIBLE, and dated
An admin surface (the Health band is the natural home — read how band 7
renders the persistence census and follow it) states: host reachable or
not, when last checked, and — this is the part that matters — that trace
absence during a known-down window is EXPECTED, not evidence of a quiet
system. Empty≠zero applied to observability itself: "no traces" and
"traces not arriving" are different facts and must not render the same.

### R4 — the budget window is a first-class state, not a surprise
Whatever mechanism you choose (a governed date, an operator-set flag, or
simply the probe's own verdict), the system must be able to say "the host
is down and this is the known window" versus "the host is down and nobody
expected it". If you conclude the distinction cannot be earned honestly
without inventing knowledge, say so and implement only the honest half.

## FENCE (exhaustive; intersections with the three sibling lanes = ∅)
EDIT: `api/cwf/_lib/observability/**` (config.ts, otel.ts, the flush path)
· `api/admin/health-analytics.ts` (the band's data) · the Health band
component under `src/components/admin/**`
CREATE: `api/admin/obs-host-health.ts` (the cron-armed probe endpoint) ·
`api/cwf/_lib/observability/hostProbe.ts` (+ `__tests__`) ·
`docs/relay/PHASE-OBS-HOST-TRUTH-1-report.md` · a `vercel.json` cron entry
if you take the cron route (that file is yours this wave)
PLUS: `.agents/CHANGELOG.md` · `.agents/skills/cwf-project-kb/SKILL.md`
**FORBIDDEN THIS WAVE (allocated to siblings):** `shared/dbConstants.ts` ·
`shared/grantPolicy.ts` · `scripts/verifyGrants.ts` ·
`knowledge/reference/agentParams.ts` · `api/cwf/_lib/backends/**` ·
`api/cwf/_lib/routing/**` · `api/cwf/_lib/knowledge/backends/**`.
**If you need a TABLE:** migration stamp `20260813130000` is reserved for
you — but the three-registry block is allocated elsewhere this wave, so a
new table is a STOP-and-ask. Prefer recording into an existing surface;
if a table is genuinely right, stop and say why in one paragraph.

## FALSIFIERS
(a) A forced non-delivering exporter prints `ok` on the pre-change code
    and does NOT after — the lie is demonstrated, not asserted.
(b) A probe that cannot run yields `could-not-read`; a probe that ran and
    failed yields `down`. The two are never the same byte.
(c) No secret and no host credential appears in any recorded field or log
    line (a verifyGrants-class no-leak assertion).
(d) Trace absence renders differently from host-unreachable in the panel.

## BIRTH PROOF (S93-1, inside this phase)
Run the probe against the REAL configured host and paste the verdict.
Then force the failing arm (point the probe at an unreachable host in a
test, or block it) and paste that verdict too. Two readings, both real —
a health organ proven only on the happy path is the organ this finding
was opened about.

## DELIVERY (S91 gate)
Branch `phase/obs-host-truth-1` — PUSH · PR against master · report at the
path above · seal only if a mapped file is touched (`observability/**` IS
mapped — expect a provisional seal in its own commit, DROP-AT-MERGE,
docVersion NOT bumped, S95-1). NO per-lane GO: build, push, report, then
**re-enter MAIL-WAIT** — the GO-TRAIN is mail.

<!-- END · PHASE-OBS-HOST-TRUTH-1-v1 -->
