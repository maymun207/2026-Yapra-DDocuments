<!-- relay-audit: v1 kind=card -->
CARD-LAND-581-S141-1-v1

LANE: AG-5
fanout: personalized
Fifth landing of S141 for the FOREMAN, and the first that changes what the OWNER SEES: PR 581 is AG-4's work under CARD-ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-v4 (sealed row in `raw-tokens`) — no rendered ask ever carries two identical labels (colliding options are re-rendered `<own name> · <parent name>`, distinct sets pass through byte-identical, no ladder rung touched), a truncated ask says so in both languages and carries `truncated: true`, and `matchShownOption` no longer picks the first of two identical labels (`askMatch` rides additively on CarriedResolution). Author AG-4 ≠ lander AG-5 — the ordinary seam; the AUTHOR-SELF-RULED pass is not consulted. This sits in your box BEHIND CARD-LAND-580-S141-1-v1: land 580 first (the gate), then this. You did not write this code and you will not repair it.

PRECONDITION: the branch head is as fenced and on the forge; master is at the fenced anchor or beyond it by PR 580's merge; the lock ref is ABSENT (print the ls-remote line); the three-dot diff over master is the SEVEN paths in `the-head` and none other; `api/cwf/__tests__/stageClarify.test.ts`, `.claude/`, `.github/`, `scripts/` and `supabase/` are NOT in it. If anything differs, YOUR reading wins, you print both, and you still land on YOUR measured green.

```evidence:raw-tokens
work card row (AG-4)    e96532ef-f72d-4264-8df8-19e746cf6601   (v4, sealed 11:22:33Z)
scout GREEN on v4       98e442de-2e2f-4c24-99ce-1b30985f53f1
AG-4 slip               c355f0a3-0f63-4ca7-8437-b482dd290f6f   (PUSHED, PR 581, CI read 12:14Z)
scout branch read       e2dcb030-7448-4f18-9c32-61f9c4a36c72   (CI, PR, diff, tenant, pins, 1b shape, NUL — all measured)
```

```evidence:the-head
branch         phase/ask-options-name-their-parent-s141-1
head           1eca8ee637adc07839c37f795e9612b755af1892   "AG-4: ASK-OPTIONS-NAME-THEIR-PARENT-S141-1 — report (follows the code, never gates it)", 2026-09-17T11:52:13Z
commits        c28413dfb3a0e9d564b0fc243b3210d68bd02456 (code, 11:45:45Z) · 1eca8ee637adc07839c37f795e9612b755af1892 (report, 11:52:13Z) — two over master, ahead 2 / behind 0 at the scout's read
master         db907a3424a65345c9a9c0fdde6be3c8e3c171dc   merge of PR 578 — IF PR 580 has landed first, master has moved by scripts/ + tests + one docs/relay file, none of which this diff touches; step 2 syncs and CI runs once more at the moved head — wait on it, name what you wait for
pull request   581, OPEN, headRefOid = the head above, base master, MERGEABLE (the scout's gh read at ~12:17Z); title `PHASE-ASK-OPTIONS-NAME-THEIR-PARENT-S141-1: no two identical labels, and a truncated ask says so`
diff           7 paths, three-dot numstat: api/cwf/_lib/routing/askOnUnresolved.ts 79/3 · api/cwf/_lib/turn/stageClarify.ts 90/14 · api/cwf/_lib/turn/types.ts 7/0 · api/cwf/_lib/routing/__tests__/askAmbiguousShape.test.ts 91/0 · api/cwf/__tests__/carryLastResolution.test.ts 142/6 · public/architecture/manifest.json 12/12 (reseal, same commit) · docs/relay/ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-AG4-report.md 250/0; stageClarify.test.ts UNCHANGED and its 63 tests pass at the head; NUL 0; tenant 0 over the seven files (the scout's own lens and CI step 8 agree: 2224 files scanned, zero hits)
measured       2026-09-17T12:13Z–12:19Z by the scout on the wire (refs, PR, diff, CI, log); 2026-09-17T12:00Z by the Architect on the shared clone's lane-fetched origin ref (head, two commits, seven-path numstat)
```

```evidence:ci-as-read
read by the SCOUT at ~12:16Z (row in raw-tokens), attempt 1 of each run at THIS head, all created 11:56:18Z:
Build and Test   SUCCESS — changes 5/5 · rule26 10/10 SUCCESS (REQUIRED here: manifest under public/) · build (24.x) 13/13: step 8 Tenant-zero gate OK (positive control RED as required, then zero hits), step 9 Build incl. check:doc-drift ("no drift — all 7 narrative tabs synced"), step 10 tests: stageClarify.test.ts 63 ✓ · carryLastResolution.test.ts 22 ✓ · askAmbiguousShape.test.ts 21 ✓ · Test Files 734 passed; eval-canary SKIPPED (named, never folded)
report-schema    SUCCESS
Relay corpus     SUCCESS
Nothing cancelled, no second attempt. ORDER 2 is where YOU read it again, at the same forty hex — and again at the moved head if step 2 syncs 580 in
```

## PREMISE

MEASURED: the head, the two commits and the seven-path numstat over the shared clone's lane-fetched origin ref at 2026-09-17T12:00Z, by the Architect.
MEASURED: relay_inbox (execute_sql) — the scout's GREEN on v4 (11:15:40Z), AG-4's slip (12:16:21Z), the scout's branch read (12:19:59Z), rows in `raw-tokens`.
MEASURED: CI at THIS head by the scout, `ci-as-read`; ORDER 2 is where green is measured again, by you.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; no permission surface in the diff.
MEASURED: ARCHITECT-RULING-S136-THE-MERGE-FORM-1 — the land script is the route, your address: `ADF_LANE_ROLE=AG-5`. If PR 580 landed first, the land.ts on YOUR master checkout is the NEW one (with the seam); author≠lander still takes the ordinary PASS — print the verdict line.
SELF-INVALIDATION: this premise dies if the head moves by a hand other than the land script's own step 2, if the diff grows a path, or if a lock ref is present.

## ORDERS

ORDER 1 - PRINT THE LOCK STATE FIRST: `git ls-remote origin` filtered to the land script's lock ref name. Absent → continue. Present → STOP, print it, post it (PR 580's landing may hold it — wait for it to clear, name what you wait for).

ORDER 2 - MEASURE CI AT THE FULL FORTY-HEX HEAD YOURSELF with `actions/runs?head_sha=<forty hex>`. A zero is read a SECOND time before it becomes a premise and you say so. Name every workflow, its `run_attempt` and its conclusion; rule26 is REQUIRED here and its conclusion is named; eval-canary SKIPPED is named, never folded.

ORDER 3 - LAND ON YOUR MEASURED GREEN: `ADF_LANE_ROLE=AG-5 npm run land -- 581`. The PR exists — use it, open none. No-ff, never a squash. If step 2 syncs master (PR 580) into the branch: wait on CI at the moved head — name what you wait for and the last conclusion you saw — and land on that run. Print step B's own verdict line verbatim (author AG-4, lander AG-5, PASS). If ANY step reddens, STOP: that is the author's, by ORDER 4.

ORDER 4 - YOU EDIT NOTHING. If a gate refuses, STOP and print the refusal verbatim: WHICH step failed and which steps were SKIPPED. The AUTHOR (AG-4) repairs its own branch and pushes; nobody re-runs to chase a green (S55-1).

ORDER 5 - AFTER THE MERGE, print master's new forty-hex head, the CI conclusion there as it arrives, and the Vercel production record for it (this one BUILDS — api/ and public/ paths — print state and readyState; a CANCELED here is a finding). Post ONE from_lane slip. The post-landing witness is the OWNER'S: `fırın son 7 gün duruşları` on his own screen — five distinct labels or fewer, and a truncation sentence.

## FALSIFIER

If a lock ref is present and does not clear, STOP. If the diff touches stageClarify.test.ts, `.claude/`, `.github/`, `scripts/` or a migration, STOP. If CI at the head (or the moved head) is red on the latest attempt, STOP and name the step. If step B says anything but the ordinary author≠lander PASS, STOP and print it. If the land script's merge-tree rehearsal reports a conflict, STOP and print it.

## SHARED SURFACES

```scope
- api/cwf/_lib/routing/askOnUnresolved.ts · api/cwf/_lib/turn/stageClarify.ts · api/cwf/_lib/turn/types.ts
- api/cwf/_lib/routing/__tests__/askAmbiguousShape.test.ts (new) · api/cwf/__tests__/carryLastResolution.test.ts
- public/architecture/manifest.json (reseal)
- docs/relay/ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-AG4-report.md
```

You write NOTHING. The merge commit is the land script's.

## DECISION RIGHTS

You choose the route on the self-test's measurement, as before. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, the two commits and the seven-path numstat | MEASURED: for-each-ref, log and diff --numstat three-dot over the shared clone at 2026-09-17T12:00Z | the-head |
| the labeller passes distinct sets through; ORDER 1b shape; tenant 0; NUL 0 | MEASURED: the scout's branch read at 12:19:59Z, row in raw-tokens | the-head |
| CI at the head, three runs SUCCESS attempt 1, rule26 required and green | MEASURED: the scout's branch read at 12:19:59Z | ci-as-read |
| PR 581 OPEN and MERGEABLE at the head | MEASURED: the scout's gh read at ~12:17Z | the-head |
| the lock ref state now | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves by a hand other than the land script's own step 2, if the diff grows a path, if a lock ref is present and does not clear, or if a v2 appears.
