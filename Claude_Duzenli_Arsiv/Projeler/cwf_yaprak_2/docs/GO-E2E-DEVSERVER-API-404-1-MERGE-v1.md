# GO — PHASE-E2E-DEVSERVER-API-404-1 · MERGE AUTHORIZATION · v1
<!-- GO-E2E-DEVSERVER-API-404-1-MERGE-v1 · 2026-08-02 · S79 · Architect
     RULE-25 review PASSED. Fresh full clone (is-shallow=false); independent
     recounts: 6 files / +181−10 · 65 migrations · docVersion rev 180 ·
     manifest diff = docVersion + 7 lastSyncedCommit ONLY (0 tabs drifted,
     as reported) · phase/inspect-verdict-1 verified STILL c32b881a. The
     plugin, the e2e spec and the harness stub were read in full; the
     seven-retry finding and the disproven comment were re-derived by grep,
     not accepted on report. Self-contained per D-2. -->

## PRECONDITION (S47-1 — verify before anything)
- `git rev-parse origin/master` → `dec3ff557036bc142d85002d596f9c74325a76ce`
- `git rev-parse origin/phase/e2e-devserver-api-404-1` → `cacf04c826dceb9632af4fb4080617cb7bae529c`
- `git rev-parse origin/phase/inspect-verdict-1` → `c32b881a6161539eb26c6ca51c3b8141dc129acc` (must be UNCHANGED)
- Exactly ONE commit over master. Any mismatch → STOP and report.

## STEP 1 · CI GATE (BLOCKING — the sole test arbiter, S37-2)
Open a CI-trigger PR `phase/e2e-devserver-api-404-1` → `master`. This is a
SECOND PR; #139 stays open and untouched.
**PASS CONDITION:** every check green on head `cacf04c8` (`eval-canary`
skipped on a PR event is the standing pattern and is a pass; `in_progress`,
`queued`, null or absent is NOT).
**`rule26` is the whole point of this phase** — it must be green on the
first attempt. If `rule26` reds: STOP and paste the log. **No rerun, on any
grounds, including F-BW01.** A phase whose entire claim is "this gate no
longer flakes" cannot be admitted by a retry; a red here is a refutation of
the fix, not noise around it.

## STEP 2 · MERGE (only after STEP 1 pass)
`--no-ff` (squash banned). Merge-commit message VERBATIM, byte-exact,
single line, no trailers (S30-2):

Merge PHASE-E2E-DEVSERVER-API-404-1: the dev harness stops answering a question it has no answer for — /api/** is absent, so the gate reds only for the reasons it claims to measure

## STEP 3 · PUSH + REPORT (all from the REMOTE)
1. `git rev-parse origin/master` (new merge hash)
2. Master CI run id on the merge commit + per-check results (same pass
   condition; `rule26` first-attempt green again)
3. `git ls-remote --heads origin` — and confirm
   `phase/inspect-verdict-1` is STILL `c32b881a`. Do not prune it.

STOP THERE. The revised GO for `phase/inspect-verdict-1` — including how the
179→180 reseal collision is resolved — is issued as its own relay once this
merge hash exists. Do not merge, rebase, update, or reseal that branch on
your own initiative.

## REVIEW VERDICT (carried in full)
PASS, and the phase is better than its brief.
- **The fix is correct at the level the defect lives.** `apply: 'serve'` +
  registration in the `configureServer` BODY means the path is refused
  before vite's transform middleware can resolve it to a file — the
  poisonous behaviour is not filtered, it is made unreachable. The refusal
  is a 404 with a body that names the harness: not `index.html` (the
  S38-CLEAN-1 face), not `{}`, not a stub that would let a missing
  AdminPreview method pass for a working call.
- **The net is placed where it can actually catch.** An e2e request against
  the real running server is the only thing that proves what a server
  answers; a unit test of the middleware would only have asserted that the
  code does what the code says. The prefix test (`/api`, `/api/`, three
  nested paths) pins the RULE rather than the one path that broke.
- **The overlay-absence assertion is not a bare negative.** The spec waits
  for the panel to be visible first — a blank page also has no overlay —
  and then proves interactivity with a landed click, because swallowing
  pointer events was the overlay's actual damage. That is the S66-1 shape,
  applied without being told.
- **G3 was measured, not assumed**, and the stub was added anyway on the
  correct reasoning: a gate that happens to pass is not a harness that
  answers honestly.
- **Mutation proof accepted:** removing the plugin surfaces both historical
  faces at once (500-transform and 200-index.html). A fix proven able to
  fail in both of the ways it must.
- **Your self-correction is accepted as recorded.** Reasoning from
  `playwright.config.ts` alone while `test.describe.configure` sat in the
  spec files is the same shape as the earlier blame-vs-exposure error:
  a conclusion drawn from the file you had open rather than from the ones
  that could contradict it. Both are now on the register as one pattern.

**Named findings — do NOT act on them in this branch:**
- **E2E-RETRY-MASK-7:** independently confirmed — seven
  `test.describe.configure({ retries: process.env.CI ? 2 : 0 })` blocks
  across five spec files (`rule26-admin` ×3 at :350/:642/:710,
  `chart-uplift`:40, `table-grain`:29, `table-time`:35,
  `viz-finish-evidence`:33). Each can now hide two real failures on the very
  gate this phase just made trustworthy. This is the rest of
  RULE26-HARDEN-1 and it stays at rollout plan 2.3.
- **Precision note on the disproven comment.** The comment at
  `rule26-admin.spec.ts` ~:635 says the artifact is "not a parse error in
  any file *this phase touched*" — with that qualifier it was literally
  true, since `api/admin/rules.ts` was not touched by that phase. What your
  work disproves is its ROOT-CAUSE attribution ("a shared-compile-cache
  contention artifact"), which is now known to be wrong: it was a parse
  error, in a specific named file. State it that way when 2.3 rewrites the
  comment — the correction is worth more when it is exact about what it
  corrects.

<!-- TAIL ANCHOR (S61-3): this relay ends after the words "what it
     corrects." and this comment. Missing line = truncated relay — request a
     re-send before acting. -->
<!-- END · GO-E2E-DEVSERVER-API-404-1-MERGE-v1 -->
