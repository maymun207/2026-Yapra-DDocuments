insert into public.relay_inbox (direction, lane_addr, artifact_name, body) select 'to_lane','scout','BYTES-FOR-REVIEW-CARD-LAND-573-S140-1-v1', $b$<!-- relay-audit: v1 kind=card -->
CARD-LAND-573-S140-1-v1

LANE: AG-5
fanout: personalized
Fifth CODE landing of S140 for the FOREMAN, and the largest: rooms ⑤ (entityDiagnosis) and ⑥ (executionDecision) wired onto the live clarify path, under CARD-WIRE-DIAGNOSIS-AND-EXECUTION-DECISION-S140-1-v1 AND its binding AMENDMENT-1 (the carrier rule covers every action on a non-SYSTEM object, COMPARE included; the near-miss case notifies with its candidates as the in-scope list). The author pushed at 2026-09-16T10:23:27Z (slip 10:25:56Z); the §12.8 clock started there and was stopped for six hours by ONE measured reason that was not the tree: GitHub Actions started no job in the repository from 10:23Z (F-S140-CI-BILLING-STOP-1 — billing annotation on every job, scout's direct read at 16:45:59Z). The owner raised the spending limit at ~16:47Z (OWNER-ACTION-S140-GITHUB-SPEND-LIMIT-RAISED-1); the author re-ran the three never-executed runs on the same head (ORDER-RERUN-CI-573-S140-1). CI at the head, read directly by the scout and by the author, is in `ci-as-read`; you MEASURE it again yourself in ORDER 2. You did not write this code and you will not repair it.

PRECONDITION: the branch head is as fenced and on the forge, master is at the fenced anchor (or beyond it by docs/relay landings only), the lock ref is ABSENT (print the ls-remote line), and the diff carries no permission surface. If anything differs, YOUR reading wins, you print both, and you still land on YOUR measured green.

```evidence:raw-tokens
work card row (AG-4)    dfd9e1c1-e779-40fb-ae72-575c5ef21f03
amendment row           4a0c92f9-9a85-4e7d-90cf-40e9d47e4f26
author slip row         4bf53d11-102d-4801-a477-5c058608e983
scout ci read row 1     7fa9c2b4-1778-472a-bdc0-8e57c0997260
scout ci read row 2     628d9331-7415-423f-99f1-671a3e0b193a
rerun slip row          57127e1e-aef5-40cf-b135-ee4942ac87f6
```

```evidence:the-head
branch         phase/wire-diagnosis-and-execution-decision-s140-1
head           796029174aeddb081506c14cfaaaebeddfd89ad2   the report commit over the amendment commit over the code commit; three commits over the fork
fork point     4c6df852f7a9b135ba92986f428387bf73458239   the current master (merge of PR 572); ahead by 3, behind by 0
pull request   573, opened by the author
diff           18 paths over master, three-dot, +1711/-136: api/cwf/_lib/turn/stageClarify.ts (+550) · api/cwf/_lib/turn/stageStream.ts · api/cwf/_lib/turn/types.ts · api/cwf/_lib/routing/entityDiagnosis.ts · api/cwf/_lib/routing/executionDecision.ts · api/cwf/_lib/replay/clarificationLens.ts (additive, outside the card's list — the author's own finding F-S140-LENS-NOTIFY-SCOPE-1, report finding 1) · nine test files incl. the new api/cwf/__tests__/wireDiagnosisDecision.test.ts (+461) · docs/relay/WIRE-DIAGNOSIS-AND-EXECUTION-DECISION-S140-1-AG4-report.md (new, +348) · public/architecture/manifest.json (reseal); NUL bytes over the whole three-dot diff 0 (tr -cd, wc -c); no settings, hooks, guard, allowlist or migration path
author gates   RELAYED from the slip of 10:25:56Z, local: 10769 tests / 0 failed; build + reseal; check:tenant-zero ZERO; lint clean; failing-first fork 19/0, head 19; 27 pins moved, each named in the report
measured       2026-09-16T16:38Z shared-clone objects (lane-fetched origin), read by the Architect; the Architect holds no forge credential and cannot fetch
```

```evidence:ci-as-read
attempt 2 of each run, on the same head, started 16:48:58Z-16:49:10Z (eleven seconds after the author consumed the rerun order); attempt 1 was the zero-step billing stop
Build and Test   completed SUCCESS at 17:06:21Z — changes 5 steps success · rule26 10 steps success · build (24.x) 13 steps success, every gate step named and green: RULE-40 no-NUL, migration version-key, Tenant-zero, Build (doc-drift inside), Run tests · eval-canary SKIPPED (named, never folded)
report-schema    completed SUCCESS at 16:49:40Z — 9 steps incl. the self-test that proves the gate can still redden
Relay corpus     completed SUCCESS at 16:49:44Z — 8 steps
read by          the scout, DIRECTLY, twice (~17:13Z and ~17:17Z, identical), row named in `raw-tokens`; and by the author at 17:11Z (slip row named in `raw-tokens`) — two independent reads, same three conclusions
ls-remote        by the scout at ~17:16Z: branch at the head above, master at the fork point, no refs/landing/* line
```

## PREMISE

MEASURED: the head, fork point, master, the eighteen paths, the NUL count and the permission grep in `the-head`, at 2026-09-16T16:38Z.
MEASURED: relay_inbox (execute_sql, 2026-09-16T16:50Z) — the scout's row of 16:45:59Z, its direct read of the three zero-step runs (billing annotation verbatim); the owner's word on the lift at ~16:47Z, relayed by the Architect.
MEASURED: relay_inbox (execute_sql, 2026-09-16T17:19Z) — the scout's direct `gh api actions/runs?head_sha=<head>` read of attempt 2 (twice, identical) and the author's slip agree: all three workflows SUCCESS, eval-canary SKIPPED, in `ci-as-read`. Not YOUR verdict yet: ORDER 2 is where you measure it.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; no permission surface in the diff, so no separate authority approval arises.
MEASURED: ARCHITECT-RULING-S136-THE-MERGE-FORM-1 — the land script is the route.
SELF-INVALIDATION: this premise dies if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, or if a lock ref is present.

## ORDERS

ORDER 1 - PRINT THE LOCK STATE FIRST: `git ls-remote origin` filtered to the land script's lock ref name. Absent → continue. Present → STOP, print it, post it.

ORDER 2 - MEASURE CI AT THE FULL FORTY-HEX HEAD YOURSELF with `actions/runs?head_sha=<forty hex>`. A zero is read a SECOND time before it becomes a premise and you say so. This head carries TWO attempts per run (attempt 1 never executed a step — billing; attempt 2 is the rerun): read the LATEST attempt and say which attempt you read. Name every workflow and its conclusion; eval-canary SKIPPED is named, never folded into green. If runs are still in progress, WAIT on them — name what you are waiting for and the last conclusion you saw.

ORDER 3 - LAND ON YOUR MEASURED GREEN: `ADF_LANE_ROLE=AG-5 npm run land -- 573`. The PR exists — use it, open none. No-ff, never a squash. If step 2 finds no update owed, this is a one-run landing; if it syncs, wait on CI at the moved head and land on run 2. If ANY step reddens, STOP: that is the author's, by ORDER 4 — name the step and the skipped steps.

ORDER 4 - YOU EDIT NOTHING. If a gate refuses, STOP and print the refusal verbatim: WHICH step failed and which steps were SKIPPED (skipped is silent, not passing). The AUTHOR repairs its own branch and pushes; nobody re-runs to chase a green (S55-1).

ORDER 5 - AFTER THE MERGE, print master's new forty-hex head, the CI conclusion there as it arrives, and the Vercel production record for it (this one BUILDS — api/ paths — print state and readyState; a CANCELED here is a finding). Post ONE from_lane slip. The post-landing witness (the work card's ORDER 5: a misspelt factory name → a notification with in-scope names; "fırın" → the byte-identical two-line ask) is the Architect's and the owner's to run on production READY, not yours.

## FALSIFIER

If a lock ref is present, STOP. If the diff touches a permission surface, STOP: that landing needs the owner's own named approval. If CI at the head is red on the latest attempt, STOP and name the step. If the land script's merge-tree rehearsal reports a conflict, STOP and print it.

## SHARED SURFACES

```scope
- api/cwf/_lib/turn/stageClarify.ts
- api/cwf/_lib/turn/stageStream.ts
- api/cwf/_lib/turn/types.ts
- api/cwf/_lib/routing/entityDiagnosis.ts
- api/cwf/_lib/routing/executionDecision.ts
- api/cwf/_lib/replay/clarificationLens.ts
- api/cwf/__tests__/** (nine files, named in the report)
- api/cwf/_lib/replay/__tests__/clarificationLens.test.ts
- docs/relay/WIRE-DIAGNOSIS-AND-EXECUTION-DECISION-S140-1-AG4-report.md
- public/architecture/manifest.json
```

You write NOTHING. The merge commit is the land script's.

## DECISION RIGHTS

You choose the route on the self-test's measurement, as before. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, fork point, master, eighteen paths, NUL count and permission grep | MEASURED: git merge-base, rev-list, diff --stat three-dot, diff --name-only grep, tr/wc over the shared clone at 2026-09-16T16:38Z | the-head |
| the pull request number and the push instant | READ: the author's slip on the bus at 2026-09-16T10:25:56Z and the commit timestamps | the-head |
| the author's local gates | RELAYED: the author's slip at 2026-09-16T10:25:56Z | the-head |
| the billing stop and the zero-step runs | READ: the scout's direct read on the bus at 2026-09-16T16:45:59Z | the-head |
| CI at the head after the rerun | READ: the scout's direct read on the bus at 2026-09-16T17:15:19Z and the author's slip at 17:16:33Z | ci-as-read |
| no spend approval and no authority approval is required | MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 and the eighteen-path diff | the-head |
| the lock ref state now | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, if a lock ref is present, or if a v2 appears.
$b$ where md5($b$<!-- relay-audit: v1 kind=card -->
CARD-LAND-573-S140-1-v1

LANE: AG-5
fanout: personalized
Fifth CODE landing of S140 for the FOREMAN, and the largest: rooms ⑤ (entityDiagnosis) and ⑥ (executionDecision) wired onto the live clarify path, under CARD-WIRE-DIAGNOSIS-AND-EXECUTION-DECISION-S140-1-v1 AND its binding AMENDMENT-1 (the carrier rule covers every action on a non-SYSTEM object, COMPARE included; the near-miss case notifies with its candidates as the in-scope list). The author pushed at 2026-09-16T10:23:27Z (slip 10:25:56Z); the §12.8 clock started there and was stopped for six hours by ONE measured reason that was not the tree: GitHub Actions started no job in the repository from 10:23Z (F-S140-CI-BILLING-STOP-1 — billing annotation on every job, scout's direct read at 16:45:59Z). The owner raised the spending limit at ~16:47Z (OWNER-ACTION-S140-GITHUB-SPEND-LIMIT-RAISED-1); the author re-ran the three never-executed runs on the same head (ORDER-RERUN-CI-573-S140-1). CI at the head, read directly by the scout and by the author, is in `ci-as-read`; you MEASURE it again yourself in ORDER 2. You did not write this code and you will not repair it.

PRECONDITION: the branch head is as fenced and on the forge, master is at the fenced anchor (or beyond it by docs/relay landings only), the lock ref is ABSENT (print the ls-remote line), and the diff carries no permission surface. If anything differs, YOUR reading wins, you print both, and you still land on YOUR measured green.

```evidence:raw-tokens
work card row (AG-4)    dfd9e1c1-e779-40fb-ae72-575c5ef21f03
amendment row           4a0c92f9-9a85-4e7d-90cf-40e9d47e4f26
author slip row         4bf53d11-102d-4801-a477-5c058608e983
scout ci read row 1     7fa9c2b4-1778-472a-bdc0-8e57c0997260
scout ci read row 2     628d9331-7415-423f-99f1-671a3e0b193a
rerun slip row          57127e1e-aef5-40cf-b135-ee4942ac87f6
```

```evidence:the-head
branch         phase/wire-diagnosis-and-execution-decision-s140-1
head           796029174aeddb081506c14cfaaaebeddfd89ad2   the report commit over the amendment commit over the code commit; three commits over the fork
fork point     4c6df852f7a9b135ba92986f428387bf73458239   the current master (merge of PR 572); ahead by 3, behind by 0
pull request   573, opened by the author
diff           18 paths over master, three-dot, +1711/-136: api/cwf/_lib/turn/stageClarify.ts (+550) · api/cwf/_lib/turn/stageStream.ts · api/cwf/_lib/turn/types.ts · api/cwf/_lib/routing/entityDiagnosis.ts · api/cwf/_lib/routing/executionDecision.ts · api/cwf/_lib/replay/clarificationLens.ts (additive, outside the card's list — the author's own finding F-S140-LENS-NOTIFY-SCOPE-1, report finding 1) · nine test files incl. the new api/cwf/__tests__/wireDiagnosisDecision.test.ts (+461) · docs/relay/WIRE-DIAGNOSIS-AND-EXECUTION-DECISION-S140-1-AG4-report.md (new, +348) · public/architecture/manifest.json (reseal); NUL bytes over the whole three-dot diff 0 (tr -cd, wc -c); no settings, hooks, guard, allowlist or migration path
author gates   RELAYED from the slip of 10:25:56Z, local: 10769 tests / 0 failed; build + reseal; check:tenant-zero ZERO; lint clean; failing-first fork 19/0, head 19; 27 pins moved, each named in the report
measured       2026-09-16T16:38Z shared-clone objects (lane-fetched origin), read by the Architect; the Architect holds no forge credential and cannot fetch
```

```evidence:ci-as-read
attempt 2 of each run, on the same head, started 16:48:58Z-16:49:10Z (eleven seconds after the author consumed the rerun order); attempt 1 was the zero-step billing stop
Build and Test   completed SUCCESS at 17:06:21Z — changes 5 steps success · rule26 10 steps success · build (24.x) 13 steps success, every gate step named and green: RULE-40 no-NUL, migration version-key, Tenant-zero, Build (doc-drift inside), Run tests · eval-canary SKIPPED (named, never folded)
report-schema    completed SUCCESS at 16:49:40Z — 9 steps incl. the self-test that proves the gate can still redden
Relay corpus     completed SUCCESS at 16:49:44Z — 8 steps
read by          the scout, DIRECTLY, twice (~17:13Z and ~17:17Z, identical), row named in `raw-tokens`; and by the author at 17:11Z (slip row named in `raw-tokens`) — two independent reads, same three conclusions
ls-remote        by the scout at ~17:16Z: branch at the head above, master at the fork point, no refs/landing/* line
```

## PREMISE

MEASURED: the head, fork point, master, the eighteen paths, the NUL count and the permission grep in `the-head`, at 2026-09-16T16:38Z.
MEASURED: relay_inbox (execute_sql, 2026-09-16T16:50Z) — the scout's row of 16:45:59Z, its direct read of the three zero-step runs (billing annotation verbatim); the owner's word on the lift at ~16:47Z, relayed by the Architect.
MEASURED: relay_inbox (execute_sql, 2026-09-16T17:19Z) — the scout's direct `gh api actions/runs?head_sha=<head>` read of attempt 2 (twice, identical) and the author's slip agree: all three workflows SUCCESS, eval-canary SKIPPED, in `ci-as-read`. Not YOUR verdict yet: ORDER 2 is where you measure it.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; no permission surface in the diff, so no separate authority approval arises.
MEASURED: ARCHITECT-RULING-S136-THE-MERGE-FORM-1 — the land script is the route.
SELF-INVALIDATION: this premise dies if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, or if a lock ref is present.

## ORDERS

ORDER 1 - PRINT THE LOCK STATE FIRST: `git ls-remote origin` filtered to the land script's lock ref name. Absent → continue. Present → STOP, print it, post it.

ORDER 2 - MEASURE CI AT THE FULL FORTY-HEX HEAD YOURSELF with `actions/runs?head_sha=<forty hex>`. A zero is read a SECOND time before it becomes a premise and you say so. This head carries TWO attempts per run (attempt 1 never executed a step — billing; attempt 2 is the rerun): read the LATEST attempt and say which attempt you read. Name every workflow and its conclusion; eval-canary SKIPPED is named, never folded into green. If runs are still in progress, WAIT on them — name what you are waiting for and the last conclusion you saw.

ORDER 3 - LAND ON YOUR MEASURED GREEN: `ADF_LANE_ROLE=AG-5 npm run land -- 573`. The PR exists — use it, open none. No-ff, never a squash. If step 2 finds no update owed, this is a one-run landing; if it syncs, wait on CI at the moved head and land on run 2. If ANY step reddens, STOP: that is the author's, by ORDER 4 — name the step and the skipped steps.

ORDER 4 - YOU EDIT NOTHING. If a gate refuses, STOP and print the refusal verbatim: WHICH step failed and which steps were SKIPPED (skipped is silent, not passing). The AUTHOR repairs its own branch and pushes; nobody re-runs to chase a green (S55-1).

ORDER 5 - AFTER THE MERGE, print master's new forty-hex head, the CI conclusion there as it arrives, and the Vercel production record for it (this one BUILDS — api/ paths — print state and readyState; a CANCELED here is a finding). Post ONE from_lane slip. The post-landing witness (the work card's ORDER 5: a misspelt factory name → a notification with in-scope names; "fırın" → the byte-identical two-line ask) is the Architect's and the owner's to run on production READY, not yours.

## FALSIFIER

If a lock ref is present, STOP. If the diff touches a permission surface, STOP: that landing needs the owner's own named approval. If CI at the head is red on the latest attempt, STOP and name the step. If the land script's merge-tree rehearsal reports a conflict, STOP and print it.

## SHARED SURFACES

```scope
- api/cwf/_lib/turn/stageClarify.ts
- api/cwf/_lib/turn/stageStream.ts
- api/cwf/_lib/turn/types.ts
- api/cwf/_lib/routing/entityDiagnosis.ts
- api/cwf/_lib/routing/executionDecision.ts
- api/cwf/_lib/replay/clarificationLens.ts
- api/cwf/__tests__/** (nine files, named in the report)
- api/cwf/_lib/replay/__tests__/clarificationLens.test.ts
- docs/relay/WIRE-DIAGNOSIS-AND-EXECUTION-DECISION-S140-1-AG4-report.md
- public/architecture/manifest.json
```

You write NOTHING. The merge commit is the land script's.

## DECISION RIGHTS

You choose the route on the self-test's measurement, as before. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, fork point, master, eighteen paths, NUL count and permission grep | MEASURED: git merge-base, rev-list, diff --stat three-dot, diff --name-only grep, tr/wc over the shared clone at 2026-09-16T16:38Z | the-head |
| the pull request number and the push instant | READ: the author's slip on the bus at 2026-09-16T10:25:56Z and the commit timestamps | the-head |
| the author's local gates | RELAYED: the author's slip at 2026-09-16T10:25:56Z | the-head |
| the billing stop and the zero-step runs | READ: the scout's direct read on the bus at 2026-09-16T16:45:59Z | the-head |
| CI at the head after the rerun | READ: the scout's direct read on the bus at 2026-09-16T17:15:19Z and the author's slip at 17:16:33Z | ci-as-read |
| no spend approval and no authority approval is required | MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 and the eighteen-path diff | the-head |
| the lock ref state now | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, if a lock ref is present, or if a v2 appears.
$b$)='72f38427f5f0e1056e3fba6349c53659' and encode(sha256(convert_to($b$<!-- relay-audit: v1 kind=card -->
CARD-LAND-573-S140-1-v1

LANE: AG-5
fanout: personalized
Fifth CODE landing of S140 for the FOREMAN, and the largest: rooms ⑤ (entityDiagnosis) and ⑥ (executionDecision) wired onto the live clarify path, under CARD-WIRE-DIAGNOSIS-AND-EXECUTION-DECISION-S140-1-v1 AND its binding AMENDMENT-1 (the carrier rule covers every action on a non-SYSTEM object, COMPARE included; the near-miss case notifies with its candidates as the in-scope list). The author pushed at 2026-09-16T10:23:27Z (slip 10:25:56Z); the §12.8 clock started there and was stopped for six hours by ONE measured reason that was not the tree: GitHub Actions started no job in the repository from 10:23Z (F-S140-CI-BILLING-STOP-1 — billing annotation on every job, scout's direct read at 16:45:59Z). The owner raised the spending limit at ~16:47Z (OWNER-ACTION-S140-GITHUB-SPEND-LIMIT-RAISED-1); the author re-ran the three never-executed runs on the same head (ORDER-RERUN-CI-573-S140-1). CI at the head, read directly by the scout and by the author, is in `ci-as-read`; you MEASURE it again yourself in ORDER 2. You did not write this code and you will not repair it.

PRECONDITION: the branch head is as fenced and on the forge, master is at the fenced anchor (or beyond it by docs/relay landings only), the lock ref is ABSENT (print the ls-remote line), and the diff carries no permission surface. If anything differs, YOUR reading wins, you print both, and you still land on YOUR measured green.

```evidence:raw-tokens
work card row (AG-4)    dfd9e1c1-e779-40fb-ae72-575c5ef21f03
amendment row           4a0c92f9-9a85-4e7d-90cf-40e9d47e4f26
author slip row         4bf53d11-102d-4801-a477-5c058608e983
scout ci read row 1     7fa9c2b4-1778-472a-bdc0-8e57c0997260
scout ci read row 2     628d9331-7415-423f-99f1-671a3e0b193a
rerun slip row          57127e1e-aef5-40cf-b135-ee4942ac87f6
```

```evidence:the-head
branch         phase/wire-diagnosis-and-execution-decision-s140-1
head           796029174aeddb081506c14cfaaaebeddfd89ad2   the report commit over the amendment commit over the code commit; three commits over the fork
fork point     4c6df852f7a9b135ba92986f428387bf73458239   the current master (merge of PR 572); ahead by 3, behind by 0
pull request   573, opened by the author
diff           18 paths over master, three-dot, +1711/-136: api/cwf/_lib/turn/stageClarify.ts (+550) · api/cwf/_lib/turn/stageStream.ts · api/cwf/_lib/turn/types.ts · api/cwf/_lib/routing/entityDiagnosis.ts · api/cwf/_lib/routing/executionDecision.ts · api/cwf/_lib/replay/clarificationLens.ts (additive, outside the card's list — the author's own finding F-S140-LENS-NOTIFY-SCOPE-1, report finding 1) · nine test files incl. the new api/cwf/__tests__/wireDiagnosisDecision.test.ts (+461) · docs/relay/WIRE-DIAGNOSIS-AND-EXECUTION-DECISION-S140-1-AG4-report.md (new, +348) · public/architecture/manifest.json (reseal); NUL bytes over the whole three-dot diff 0 (tr -cd, wc -c); no settings, hooks, guard, allowlist or migration path
author gates   RELAYED from the slip of 10:25:56Z, local: 10769 tests / 0 failed; build + reseal; check:tenant-zero ZERO; lint clean; failing-first fork 19/0, head 19; 27 pins moved, each named in the report
measured       2026-09-16T16:38Z shared-clone objects (lane-fetched origin), read by the Architect; the Architect holds no forge credential and cannot fetch
```

```evidence:ci-as-read
attempt 2 of each run, on the same head, started 16:48:58Z-16:49:10Z (eleven seconds after the author consumed the rerun order); attempt 1 was the zero-step billing stop
Build and Test   completed SUCCESS at 17:06:21Z — changes 5 steps success · rule26 10 steps success · build (24.x) 13 steps success, every gate step named and green: RULE-40 no-NUL, migration version-key, Tenant-zero, Build (doc-drift inside), Run tests · eval-canary SKIPPED (named, never folded)
report-schema    completed SUCCESS at 16:49:40Z — 9 steps incl. the self-test that proves the gate can still redden
Relay corpus     completed SUCCESS at 16:49:44Z — 8 steps
read by          the scout, DIRECTLY, twice (~17:13Z and ~17:17Z, identical), row named in `raw-tokens`; and by the author at 17:11Z (slip row named in `raw-tokens`) — two independent reads, same three conclusions
ls-remote        by the scout at ~17:16Z: branch at the head above, master at the fork point, no refs/landing/* line
```

## PREMISE

MEASURED: the head, fork point, master, the eighteen paths, the NUL count and the permission grep in `the-head`, at 2026-09-16T16:38Z.
MEASURED: relay_inbox (execute_sql, 2026-09-16T16:50Z) — the scout's row of 16:45:59Z, its direct read of the three zero-step runs (billing annotation verbatim); the owner's word on the lift at ~16:47Z, relayed by the Architect.
MEASURED: relay_inbox (execute_sql, 2026-09-16T17:19Z) — the scout's direct `gh api actions/runs?head_sha=<head>` read of attempt 2 (twice, identical) and the author's slip agree: all three workflows SUCCESS, eval-canary SKIPPED, in `ci-as-read`. Not YOUR verdict yet: ORDER 2 is where you measure it.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; no permission surface in the diff, so no separate authority approval arises.
MEASURED: ARCHITECT-RULING-S136-THE-MERGE-FORM-1 — the land script is the route.
SELF-INVALIDATION: this premise dies if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, or if a lock ref is present.

## ORDERS

ORDER 1 - PRINT THE LOCK STATE FIRST: `git ls-remote origin` filtered to the land script's lock ref name. Absent → continue. Present → STOP, print it, post it.

ORDER 2 - MEASURE CI AT THE FULL FORTY-HEX HEAD YOURSELF with `actions/runs?head_sha=<forty hex>`. A zero is read a SECOND time before it becomes a premise and you say so. This head carries TWO attempts per run (attempt 1 never executed a step — billing; attempt 2 is the rerun): read the LATEST attempt and say which attempt you read. Name every workflow and its conclusion; eval-canary SKIPPED is named, never folded into green. If runs are still in progress, WAIT on them — name what you are waiting for and the last conclusion you saw.

ORDER 3 - LAND ON YOUR MEASURED GREEN: `ADF_LANE_ROLE=AG-5 npm run land -- 573`. The PR exists — use it, open none. No-ff, never a squash. If step 2 finds no update owed, this is a one-run landing; if it syncs, wait on CI at the moved head and land on run 2. If ANY step reddens, STOP: that is the author's, by ORDER 4 — name the step and the skipped steps.

ORDER 4 - YOU EDIT NOTHING. If a gate refuses, STOP and print the refusal verbatim: WHICH step failed and which steps were SKIPPED (skipped is silent, not passing). The AUTHOR repairs its own branch and pushes; nobody re-runs to chase a green (S55-1).

ORDER 5 - AFTER THE MERGE, print master's new forty-hex head, the CI conclusion there as it arrives, and the Vercel production record for it (this one BUILDS — api/ paths — print state and readyState; a CANCELED here is a finding). Post ONE from_lane slip. The post-landing witness (the work card's ORDER 5: a misspelt factory name → a notification with in-scope names; "fırın" → the byte-identical two-line ask) is the Architect's and the owner's to run on production READY, not yours.

## FALSIFIER

If a lock ref is present, STOP. If the diff touches a permission surface, STOP: that landing needs the owner's own named approval. If CI at the head is red on the latest attempt, STOP and name the step. If the land script's merge-tree rehearsal reports a conflict, STOP and print it.

## SHARED SURFACES

```scope
- api/cwf/_lib/turn/stageClarify.ts
- api/cwf/_lib/turn/stageStream.ts
- api/cwf/_lib/turn/types.ts
- api/cwf/_lib/routing/entityDiagnosis.ts
- api/cwf/_lib/routing/executionDecision.ts
- api/cwf/_lib/replay/clarificationLens.ts
- api/cwf/__tests__/** (nine files, named in the report)
- api/cwf/_lib/replay/__tests__/clarificationLens.test.ts
- docs/relay/WIRE-DIAGNOSIS-AND-EXECUTION-DECISION-S140-1-AG4-report.md
- public/architecture/manifest.json
```

You write NOTHING. The merge commit is the land script's.

## DECISION RIGHTS

You choose the route on the self-test's measurement, as before. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, fork point, master, eighteen paths, NUL count and permission grep | MEASURED: git merge-base, rev-list, diff --stat three-dot, diff --name-only grep, tr/wc over the shared clone at 2026-09-16T16:38Z | the-head |
| the pull request number and the push instant | READ: the author's slip on the bus at 2026-09-16T10:25:56Z and the commit timestamps | the-head |
| the author's local gates | RELAYED: the author's slip at 2026-09-16T10:25:56Z | the-head |
| the billing stop and the zero-step runs | READ: the scout's direct read on the bus at 2026-09-16T16:45:59Z | the-head |
| CI at the head after the rerun | READ: the scout's direct read on the bus at 2026-09-16T17:15:19Z and the author's slip at 17:16:33Z | ci-as-read |
| no spend approval and no authority approval is required | MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 and the eighteen-path diff | the-head |
| the lock ref state now | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, if a lock ref is present, or if a v2 appears.
$b$,'UTF8')),'hex')='acb7488001b2aeb2580402b3d7173b18d063597f91353b5cafe36dbf5f91e48b' returning id, created_at;