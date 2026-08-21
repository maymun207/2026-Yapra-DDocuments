# GO-TRAIN-PRECURSOR-1-v1 — CI-DIET-2 + RELAY-BUS-1, one train

<!-- S98 · Architect-authored · addressed to AG-1 (train conductor).
     Wave-5 rule: no per-lane GOs — this ONE document carries both merges,
     the seal law, the birth-proof choreography and the hygiene ring.
     PRECONDITION (S47-1): origin/master = 0a35d86b… (rev 248) and the two
     lane heads are exactly phase/ci-diet-2 = ac38a888… and
     phase/relay-bus-1 = 5abee04f…. If any moved, STOP and report. -->

## STEP 1 — CI verdicts, BLOCKING (S37-2)
Read conclusions for BOTH PR heads (`gh run view` per job + the check-runs
API cross-read, the discipline your sibling's report demonstrates):
- `ac38a888…` (PR #212 tip — the docs-only report commit ON TOP of the
  proven-green 8220893; the tip run is the arbiter, not the ancestor's)
- `5abee04f…` (PR #213 tip)
`in_progress` / `null` is NOT a pass. Both green → proceed. Either red →
STOP, report the failing job verbatim.

## STEP 2 — merge CI-DIET-2 first
Order is deliberate: the diet lands first so the second merge (and every
merge after) already pays the single-leg gate.
- `git merge --no-ff phase/ci-diet-2` onto fresh master, message VERBATIM:

```
merge: PHASE-CI-DIET-2 — the merge gate pays for exactly one thing, the truth about THIS PR (the build matrix collapses to the one Node production actually runs — 24.x, a version the gate had NEVER measured until this phase's own PR proved 7679/7680 green on it, retiring F-S98-CI-NODE-MISMATCH; coverage and the 20/22 compatibility legs move to a nightly run scheduled clear of the cron band at an hour an alarm is actually heard; eval-canary, tenant-zero, doc-drift, rule26 and the S37-2 full-suite arbiter are byte-untouched; the KARAR's path-filter item closes as ALREADY-SATISFIED by CI-DIET-1's prefix allowlist, measured not assumed; and the first PR-head red was the relay-audit grammar gate catching this phase's own report — the process fence working on the fence-builder)
```

- TAIL ANCHOR (S61-3): after the merge, `git log --oneline -1` must show
  this merge commit on master with the ac38a888 parent.
- Merge-turn local FULL suite: mandatory, on Node 24 if available locally
  (state the version you ran — your local 26.4.0 is acceptable, SAY it).
- No migration in this lane; no seal owed (computed in the phase).
- Push master. Read the docVersion on master — it must still be 248
  (this lane mints nothing).

## STEP 3 — merge RELAY-BUS-1 second
- FIRST: drop the provisional seal BY SHA on the integration line —
  `7d8fa6c` is DROP-AT-MERGE and it is NOT the branch tip; rebase-drop it
  without force-pushing the origin branch (S96-1: origin lane branches
  are never rewritten — do the drop on your local integration line).
- `git merge --no-ff` the integrated line, message VERBATIM:

```
merge: PHASE-RELAY-BUS-1-v2 — the prompt channel becomes infrastructure and the one lane fenced off git gains a return path (relay_inbox, ADR-015: three carve-outs each one box wide — the Architect writes to_lane mail, a consumer stamps its own consumed_at exactly once, and ONLY the Operator may file from_lane rows, a law that lives as a DDL CHECK rather than a reviewer's memory; append-only enforced by trigger including the TRUNCATE statement-bypass the brief missed; IS DISTINCT FROM in every guard because a plain <> reads null as unchanged and a nullable reply_to would have been silently rewritable — caught by refusing the text-level falsifier allowance and running the DDL against a real postgres; three refusals get three SQLSTATEs so a working guard and a crashing one can never read the same; class operational.control at birth, both census directions green, and the fence's missing third registry — grantPolicy.ts — measured red, stop-and-asked, owner-ratified: the fourth stop in four phases, four for four the system working)
```

- SEAL LAW: at the merge turn run the reseal fresh on the integrated
  tree; docVersion is DERIVED by reading master and taking next (S95-1) —
  after STEP 2 master reads 248, so expect 249, but READ it, never assume.
- Merge-turn local FULL suite: mandatory.
- Push master. Report both merge SHAs + the final docVersion.

## STEP 4 — hand off to the Operator (owner relays the Operator card)
Nothing for you until STEP 5. The Operator applies `20260813110000` and
files its OWN apply report as the organ's first `from_lane` row — the
return-direction birth proof arrives through the table it reports on.

## STEP 5 — outbound birth proof (your half)
After the Architect confirms the apply (the owner will say so, or you
find mail): follow `.agents/relay-bus-setup.md` §AG as lane AG-1 —
poll `to_lane` mail, you will find ONE card
(`RELAY-BUS-BIRTH-PROBE-v1`, filed by the Architect). Stamp its
`consumed_at`, then append to your phase report (ordinary commit on
master is fine for this one line — or a fresh
`docs/relay/RELAY-BUS-BIRTH-PROOF-report.md` if you prefer a clean file):
the row id + created_at + your consumed_at, verbatim from your own
read-back SELECT. That closes S63-1 for the outbound direction.
S93-3: the stamp is a state-changing call — disclose it.

## STEP 6 — HYGIENE RING (S98-L1, owner-legislated: every wave opens on a clean page)
1. Delete the quarantined shared clone directory entirely (the S97
   `wt-`/shared-clone quarantine — its checkTenantZero residue dies with
   it; nothing in it is referenced, ruled W-S97-SHARED-CLONE-USE closed).
2. Delete from origin the EIGHT merged stale branches (each verified
   zero-lost-bytes by the Architect this session):
   `phase/backend-lifecycle-1` · `phase/bench-reset-1` ·
   `phase/census-refresh-fix-1` · `phase/discovery-extend-2` ·
   `phase/frame-forcefit-lens-1` · `phase/frame-on-all-paths-1` ·
   `phase/harness-honesty-gate-1` · `phase/lifecycle-serve-wire-1`
3. After THIS train's two merges land: also delete `phase/ci-diet-2` and
   `phase/relay-bus-1` from origin (ten total).
4. Report the deletions as a list of `git push origin --delete <branch>`
   outcomes — each one named, none summarized.

## REPORT
One train report: `docs/relay/GO-TRAIN-PRECURSOR-1-report.md` (grammar v1
header — your sibling's lesson) carrying: STEP-1 verdicts · both merge
SHAs · docVersion read · suite runs (version + counts) · STEP-5 round-trip
· STEP-6 deletion list. Push on master.

<!-- END · GO-TRAIN-PRECURSOR-1-v1 -->
