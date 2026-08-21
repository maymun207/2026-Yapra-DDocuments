# GO — PHASE-M1F1-FEEDBACK-PRODUCER-1 · MERGE AUTHORIZATION · v1
<!-- GO-M1F1-MERGE-v1 · 2026-08-02 · S79 · Architect RULE-25 review PASSED
     (fresh full clone, byte-level; independent recounts 27 files / +1092−27 /
     65 migrations / 420 test files; migration + grantPolicy + endpoint +
     isolation test full-read). Self-contained per D-2: everything AG needs
     is in THIS file. -->

## PRECONDITION (S47-1 — verify before anything)
- `git rev-parse origin/master` → `af2d194edd30d68867c625d3faa564a872633366`
- `git rev-parse origin/phase/m1f1-feedback-producer-1` → `d7ae7715e6e1bcccae0d6366859310fd382edeef`
- Exactly ONE commit on the branch over master. If either hash differs, STOP
  and report — do not merge.

## STEP 1 · CI GATE (BLOCKING — the sole test arbiter, S37-2)
Branch CI fires only via a pull_request (M1P0 precedent). Open the
CI-trigger PR from `phase/m1f1-feedback-producer-1` → `master` now.
**PASS CONDITION:** the unsharded CI run on the PR HEAD (`d7ae7715`)
completes with ALL checks green (expected ×5). `in_progress`, `queued`,
or a null/absent status is NOT a pass. If any check is red: STOP, paste
the failing job log — no rerun without an evidence-justified cause
(S55-1; F-BW01 reruns must show identical known signatures, and say so).
Report the run id + per-check results verbatim.

## STEP 2 · MERGE (only after STEP 1 pass)
`--no-ff` (squash banned). Merge-commit message VERBATIM, byte-exact,
single line (S30-2):

Merge PHASE-M1F1-FEEDBACK-PRODUCER-1: the turn gets a thumbs verdict — one row per (user, turn), latest wins, and the pipeline is structurally fenced out of its own report card

## STEP 3 · PUSH + REPORT
Push master. Then report, all from the REMOTE (never local state):
1. `git rev-parse origin/master` (the new merge hash)
2. Master CI run id on the merge commit + per-check results (same pass
   condition as STEP 1)
3. `git branch -r` output (the phase branch may be pruned after the merge
   hash is reported — prune is optional, reporting is not)

NO further steps in this relay. The Operator apply (migration
20260802160000_turn_feedback.sql, FENCE fjbrkimwvtpwoxhziidh) and the
owner's single 👍 hand-witness follow as their OWN relays after the merge
report — do not run, stage, or simulate the migration from the Author lane
(ADR-005).

## REVIEW VERDICT (for the record, carried in full)
PASS. Verified from a fresh clone: migration all-grantees pattern complete
(public wholesale + anon explicit five + authenticated delete/truncate;
owner-RLS 3 policies, NO delete policy, denial at the privilege layer);
endpoint identity-by-construction (session user, server-derived
conversation, foreign/absent trace = identical 404, read failure THROWS);
pipeline fence independently grep-confirmed ZERO touches + the isolation
test carries both D-5 directions with S66-1 floors; C1 intact (zero new
`messages` write sites); rev 179 sealed; priv-precise grantPolicy check
correct in direction with legacy tables passing.
**Named finding M1F1-R1 (NOT a blocker, deferral by name):** the new
breaking-revoke classifier branch (a revoke of insert/update/select/all
from authenticated must be flagged) lacks its own positive-control
fixture. One fixture case rides the next in-repo phase (M1F2, plan 1.3).
Do NOT add it to this branch — the review is closed on these bytes.

<!-- TAIL ANCHOR (S61-3): this relay ends after the words "these bytes."
     and this comment. If this line is missing, the relay arrived
     truncated — request re-send before acting. -->
<!-- END · GO-M1F1-MERGE-v1 -->
