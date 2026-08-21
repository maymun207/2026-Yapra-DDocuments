# GO — PHASE-INSPECT-VERDICT-1 · MERGE AUTHORIZATION · v1
<!-- GO-INSPECT-VERDICT-1-MERGE-v1 · 2026-08-02 · S79 · Architect RULE-25
     review PASSED. Fresh full clone (is-shallow=false), independent recounts:
     15 files / +1247−28 · 65 migrations (unchanged) · 424 test files ·
     docVersion rev 180 · fence test byte-unmodified · pipeline grep ZERO
     (positive-controlled). Endpoint, repository read, both client doors, the
     chip/detail/filter render and the failure marker were read in full.
     Self-contained per D-2. -->

## PRECONDITION (S47-1 — verify before anything)
- `git rev-parse origin/master` → `dec3ff557036bc142d85002d596f9c74325a76ce`
- `git rev-parse origin/phase/inspect-verdict-1` → `c32b881a6161539eb26c6ca51c3b8141dc129acc`
- Exactly ONE commit over master. Any mismatch → STOP and report.

## STEP 1 · CI GATE (BLOCKING — the sole test arbiter, S37-2)
Branch CI fires only via a pull_request. Open the CI-trigger PR
`phase/inspect-verdict-1` → `master`.
**PASS CONDITION:** the run on PR HEAD `c32b881a` completes with every check
green (`eval-canary` skipped on a PR event is the standing pattern and is a
pass; `in_progress`, `queued`, null or absent is NOT).
**`rule26` is the arbiter for your two red local e2e specs.** Your claim —
`rule26-admin.spec.ts` Rules @1024 and Memory @1024 fail identically at the
untouched anchor, same vite-transform root cause — matches the registered
F-BW01 second signature family exactly, and your branch's failures being a
subset of the anchor's is the right read. But local is not the arbiter:
- `rule26` green in CI → the local red is environmental; report it as such
  and proceed.
- `rule26` RED in CI → STOP, paste the job log. No rerun without an
  evidence-justified cause; if you rerun on F-BW01 grounds, state that the
  signatures are identical and show them (S55-1).

## STEP 2 · MERGE (only after STEP 1 pass)
`--no-ff` (squash banned). Merge-commit message VERBATIM, byte-exact,
single line, no trailers (S30-2):

Merge PHASE-INSPECT-VERDICT-1: the verdict becomes visible where turns are already read — one door for telemetry and feedback both, and a lookup that says when it does not know

## STEP 3 · PUSH + REPORT (all from the REMOTE)
1. `git rev-parse origin/master` (new merge hash)
2. Master CI run id on the merge commit + per-check results (same pass
   condition)
3. `git ls-remote --heads origin` (prune optional; reporting is not)

NO further steps. There is no Operator relay for this phase — zero
migrations, zero governed writes. After the merge report the owner does a
single hand-witness in the panel and the Architect reads the lookup's log
line from production.

## REVIEW VERDICT (carried in full)
PASS. Verified byte-level from a fresh clone:
- **Door condition is one value, not two copies.** `crossUserDoor` is
  declared once and consumed by `refresh()` and the verdict effect — the
  exact failure you named (service-role telemetry paired with own-rows
  verdicts silently rendering every voted turn as unvoted) is structurally
  unreachable. This was the phase's central risk and it is closed.
- **Gate is telemetry's tier, never lower:** `ensurePermission(ctx,
  PERMISSIONS.TELEMETRY_READ_ALL, res)`, GET-only, and the test asserts the
  permission CONSTANT reached the guard rather than that some 403 happened.
- **empty ≠ zero honoured three times:** repository throws instead of
  returning short; the endpoint 422s over the bound instead of truncating;
  the panel raises a named marker instead of showing chipless turns. The
  marker's wording carries the distinction out loud.
- **Producer frozen, fence intact:** `feedbackPipelineIsolation.test.ts`
  byte-unmodified; `grep` over `api/cwf/_lib/turn|prompt` → ZERO,
  positive-controlled against directories that do carry the token.
- **Restraint held:** `reason_text` renders only in the expanded detail; an
  unvoted turn renders nothing at all.
- **Your two mutation findings are the substance of this review.** A
  render-test suite that mocks the function whose throw it claims to pin was
  pinning nothing, and a page-level RULE-26 assertion absorbed by an
  ancestor's `overflow-auto` was measuring the wrong box — both are classes
  of false green, not instances. Both are now closed with tests that red on
  the mutation. This is exactly what a gate self-test is for (D-5).

**Named findings, NOT blockers, deferred by name — do NOT add them to this
branch:**
- **IV1-R1:** the two bound constants differ by design — the endpoint
  refuses over `ADMIN_FEEDBACK_TRACE_IDS_MAX` (100) while the repository
  refuses over `ADMIN_TELEMETRY_MAX_LIMIT` (1000) and chunks at 100. Correct
  today because the client batches at the endpoint's bound, so the 422 is
  unreachable in practice; it becomes a live divergence the moment a second
  caller appears. Rides the next phase that adds one.
- **IV1-R2:** the e2e harness exercises the CROSS-USER door only (the
  personal door needs a browser Supabase client the harness has none of).
  Unit coverage carries it; noted so a future harness change does not read
  the gap as coverage.
- **F-BW01 evidence rider:** your anchor-vs-branch comparison is filed to
  the RULE26-HARDEN-1 (rollout plan 2.3) input — the structural fix stays
  there, not here.

<!-- TAIL ANCHOR (S61-3): this relay ends after the words "not here." and
     this comment. Missing line = truncated relay — request a re-send. -->
<!-- END · GO-INSPECT-VERDICT-1-MERGE-v1 -->
