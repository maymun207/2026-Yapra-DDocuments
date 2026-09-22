<!-- relay-audit: v1 kind=card -->
CARD-LAND-580-S141-1-v1

LANE: AG-5
fanout: personalized
Fourth landing of S141 for the FOREMAN, and the one that repairs the gate you run: PR 580 is AG-4's work under CARD-LAND-RULING-SEAM-S141-1-v1 + AMENDMENT-1 (rows in `raw-tokens`) — `scripts/land.ts` step B gains a third pass, AUTHOR-SELF-RULED, that lets a lane land its OWN code only on an owner ruling the gate READS FROM THE BUS (env `ADF_LAND_RULING=<artifact_name>` → a `to_lane` row addressed to the lander, artifact_name prefixed OWNER-RULING-, body naming the PR and the lander, created_at within 24h, digest-checked through `node scripts/mail-wait.mjs <lane> --read <name>` on the injected Exec) and refuses RULING-UNPROVEN naming the failed condition otherwise; the no-env SELF-LAND message is byte-identical to today's and pinned by a test. Author AG-4 ≠ lander AG-5: THIS landing goes through step B the ordinary way and does NOT use the seam. The seam is used by the NEXT landing — PR 579, AG-5's own code — on a fresh owner ruling addressed to you. scripts/ is a permission surface: the scout read the diff line by line (row in `raw-tokens`); guard-bash.py, `.claude/settings*.json` and `.github/` are untouched; `gh pr merge` stays fenced everywhere; land.ts still calls gh itself. You did not write this code and you will not repair it.

PRECONDITION: the branch head is as fenced and on the forge; master is at the fenced anchor (or beyond it by docs/relay landings only); the lock ref is ABSENT (print the ls-remote line); the three-dot diff over master is the FOUR paths in `the-head` and none other; no path under `.claude/`, `.github/` or `public/`. If anything differs, YOUR reading wins, you print both, and you still land on YOUR measured green.

```evidence:raw-tokens
work card row (AG-4)    bb57e28f-b395-42c5-b731-7babe4d2ba5f
amendment 1             7e3ce33d-4bf5-492b-95ce-1022883c0ae6
scout GREEN on work     1ec4f625-4c14-41c6-bf76-5ec8bc31b3c1
scout diff + CI read    5045c98a-71f9-4451-8348-5d2c396cf14e   (row 1, diff line by line, CI in progress)
scout CI complete       9858d0bf-38ab-4189-b2dc-4bfad41f8502   (three runs SUCCESS at the head, attempt 1)
```

```evidence:the-head
branch         phase/land-ruling-seam-s141-1
head           ccfc9d13e620da476e8314fd4f4fcb19dd47e789   "AG-4: LAND-RULING-SEAM-S141-1 — report (follows the code, never gates it)", 2026-09-17T10:52:51Z
commits        e8ae74d97bf694eb291654730ee4aaefeaad9cea (code, 10:49:34Z) · ccfc9d13e620da476e8314fd4f4fcb19dd47e789 (report, 10:52:51Z) — two over master, ahead 2 / behind 0
master         db907a3424a65345c9a9c0fdde6be3c8e3c171dc   merge of PR 578; the branch forks from it — step 2 has nothing to sync, ONE run certifies the tree
pull request   580, OPEN, headRefOid = the head above, base master, MERGEABLE (the scout's gh read at ~11:11Z); title `PHASE-LAND-RULING-SEAM-S141-1: the gate reads an owner ruling from the bus, and says so`
diff           4 paths, three-dot numstat: scripts/land.ts 217/1 · scripts/landSelfTest.ts 23/1 · api/cwf/__tests__/landScript.test.ts 231/1 · docs/relay/LAND-RULING-SEAM-S141-1-AG4-report.md 235/0; no manifest (scripts/ and api/cwf/__tests__/ are mapped by no tab; doc-drift OK on the head); NUL 0, tenant 0 over the four files (the scout)
measured       2026-09-17T11:04Z–11:11Z by the scout on the wire (refs, PR, diff); 2026-09-17T11:01Z by the Architect on the shared clone's lane-fetched origin ref (head, two commits, four-path stat)
```

```evidence:ci-as-read
read by the SCOUT at ~11:11Z (completion row in raw-tokens), attempt 1 of each run at THIS head, all created 10:53:39Z:
Build and Test   SUCCESS — changes 5/5, build (24.x) 13/13: RULE-40 no-NUL, Migration version-key gate, Tenant-zero gate, Build incl. check:doc-drift ("no drift — all 7 narrative tabs synced"), Run tests (landScript.test.ts 140 tests pass; suite 734 files / 10842 passed, 4 expected fail, 1 skipped); rule26 SKIPPED — not required for this diff (no src/ public/ e2e/ or migration path); eval-canary SKIPPED (named, never folded)
report-schema    SUCCESS
Relay corpus     SUCCESS
Vercel           "Canceled by Ignored Build Step" — the non-production-ref rule; no production build for this branch, as expected
ORDER 2 is where YOU read it again, at the same forty hex
```

## PREMISE

MEASURED: the head, the two commits and the four-path stat over the shared clone's lane-fetched origin ref at 2026-09-17T11:01Z, by the Architect.
MEASURED: relay_inbox (execute_sql) — the scout's GREEN on the work card (09:43:52Z), its diff-and-CI row 1 (11:09:41Z) and CI completion (11:12:12Z), rows in `raw-tokens`.
MEASURED: CI at THIS head by the scout, `ci-as-read`; ORDER 2 is where green is measured again, by you.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; the diff touches no permission-granting surface (settings, hooks, workflows) — it touches the gate script itself, which the scout read line by line.
MEASURED: ARCHITECT-RULING-S136-THE-MERGE-FORM-1 — the land script is the route, your address: `ADF_LANE_ROLE=AG-5`.
UNMEASURED: the seam's own behaviour under YOUR harness (a later landing measures it; this one never enters the seam — author ≠ lander).
SELF-INVALIDATION: this premise dies if the head moves, if the diff grows a path, or if a lock ref is present.

## ORDERS

ORDER 1 - PRINT THE LOCK STATE FIRST: `git ls-remote origin` filtered to the land script's lock ref name. Absent → continue. Present → STOP, print it, post it.

ORDER 2 - MEASURE CI AT THE FULL FORTY-HEX HEAD YOURSELF with `actions/runs?head_sha=<forty hex>`. A zero is read a SECOND time before it becomes a premise and you say so. Name every workflow, its `run_attempt` and its conclusion; SKIPPED is named, never folded.

ORDER 3 - LAND ON YOUR MEASURED GREEN: `ADF_LANE_ROLE=AG-5 npm run land -- 580`. The PR exists — use it, open none. No-ff, never a squash. Print step B's own verdict line verbatim (author AG-4, lander AG-5 — expect the ordinary author≠lander PASS; the seam is NOT consulted). If ANY step reddens, STOP: that is the author's, by ORDER 4. ⚠ You are landing the script that lands: the land script that RUNS is the one on YOUR checkout of master (the old one), not the branch's — say which head's land.ts ran, by its sha.

ORDER 4 - YOU EDIT NOTHING. If a gate refuses, STOP and print the refusal verbatim: WHICH step failed and which steps were SKIPPED. The AUTHOR (AG-4) repairs its own branch and pushes; nobody re-runs to chase a green (S55-1).

ORDER 5 - AFTER THE MERGE, print master's new forty-hex head and the CI conclusion there as it arrives (a Vercel production build is NOT expected: scripts/ and tests only — print state anyway). Post ONE from_lane slip. Carry the scout's one follow-up as a line in the slip, not a repair: `parseMailWaitRead` stamps direction/laneAddr from its arguments, so the direction check is inherited from mail-wait's cardSql WHERE clause and no test pins that clause (one assertion closes it — a later card).

## FALSIFIER

If a lock ref is present, STOP. If the diff touches `.claude/`, `.github/`, `public/` or a migration, STOP. If CI at the head is red on the latest attempt, STOP and name the step. If step B says anything but the ordinary author≠lander PASS — above all if it says AUTHOR-SELF-RULED or RULING-UNPROVEN — STOP and print it: the seam must not fire on this landing. If the land script's merge-tree rehearsal reports a conflict, STOP and print it.

## SHARED SURFACES

```scope
- scripts/land.ts · scripts/landSelfTest.ts
- api/cwf/__tests__/landScript.test.ts
- docs/relay/LAND-RULING-SEAM-S141-1-AG4-report.md
```

You write NOTHING. The merge commit is the land script's.

## DECISION RIGHTS

You choose the route on the self-test's measurement, as before. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, the two commits and the four-path stat | MEASURED: for-each-ref, log and diff --numstat three-dot over the shared clone at 2026-09-17T11:01Z | the-head |
| the diff line by line, NUL, tenant, no permission surface | MEASURED: the scout's row 1 at 11:09:41Z, rows in raw-tokens | the-head |
| CI at the head, three runs SUCCESS attempt 1 | MEASURED: the scout's completion row at 11:12:12Z | ci-as-read |
| PR 580 OPEN and MERGEABLE at the head | MEASURED: the scout's gh read at ~11:11Z | the-head |
| the lock ref state now | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves, if the diff grows a path, if a lock ref is present, or if a v2 appears.
