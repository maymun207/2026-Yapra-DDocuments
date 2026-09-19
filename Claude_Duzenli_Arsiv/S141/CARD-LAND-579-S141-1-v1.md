<!-- relay-audit: v1 kind=card -->
CARD-LAND-579-S141-1-v1

LANE: AG-4
fanout: personalized
Fourth landing of S141, and the first in this session's history where the LANDER IS NOT THE FOREMAN: the author of PR 579 is AG-5 itself (CARD-TURN-CONTEXT-FLOW-WIRED-S141-1-v1 — the Architect's dispatch error, A-REC-S141-CODE-CARD-TO-THE-LANDER-1), and `scripts/land.ts` step B REFUSES a self-land whose paths leave docs/relay/ (class SELF-LAND, :969-982, measured by the scout). The owner ruled by name — OWNER-RULING-S141-PR579-LANDS-BY-AG-4-1 — that for THIS pull request AG-4 lands: `landerLane` reads `ADF_LANE_ROLE` (:1368-1370), author AG-5 ≠ lander AG-4 passes step B (:956-961), the producer settings allow `npm run:*`, and guard-bash's GB-2 watches only a typed `gh pr merge` (land.ts calls gh itself). This is a ONE-PR exception, not a topology change; the foreman-lands law stands for every other landing. You did not write this code and you will not repair it. The diff is the A23 §9 step-2 flow WIRED on the live turn path: `ctx.turnContext` on the context, three producers (ir-router · clarify-resolve/carried-option · tool-arg-bind with the FIRST pinned read declaration), counts-and-names on turn_done, and the container's own importer pin re-pinned to the exact five-path list — the flow steers nothing.

PRECONDITION: the branch head is as fenced and on the forge; master is at the fenced anchor (or beyond it by docs/relay landings only); the lock ref is ABSENT (print the ls-remote line); the three-dot diff over master is the eleven paths in `the-head` and none other; `api/cwf/_lib/turn/turnContextLog.ts` is NOT among them. If anything differs, YOUR reading wins, you print both, and you still land on YOUR measured green.

```evidence:raw-tokens
work card row (AG-5)    f162a630-38ab-41ff-be49-ece838a2eac5
amendment 1             4e0b9139-1df1-4345-bf97-fdf637cce201
scout GREEN on work     892f06f5-0809-4868-a2c4-776e1174da51
scout self-land read    961b0f03-d338-4c28-9f6d-340f25c907f5   (land.ts :896-982 printed; SELF-LAND for this diff)
scout CI read, at head  cb74190f-7314-434c-a08c-576b0034345a   (three runs SUCCESS at the head)
```

```evidence:the-head
branch         phase/turn-context-flow-wired-s141-1
head           2adab2da890ac99ce9e36652b33a8914d04dbe9d   "reseal after AMENDMENT-1 (the test is a mapped file)", 2026-09-17T08:01:31Z; four commits over the fork point
commits        1f7bedcbb66e237b51b29b45b920ae300559f1f7 (code, 07:28:19Z) · 2f04591f56a7f67a37ba3133ef57ff6c92fc4097 (report, 07:30:41Z) · b32d6ba3f5658fa67ef49297c9b6ae354b4ec2c9 (AMENDMENT-1 A1: importer pin re-pinned, 07:53:28Z) · 2adab2da890ac99ce9e36652b33a8914d04dbe9d (manifest reseal, 08:01:31Z)
master         db907a3424a65345c9a9c0fdde6be3c8e3c171dc   merge of PR 578 (docs/relay only); the branch forked from d29935c1b87ce3878061061556689dc67006e411 — step 2 WILL sync and CI runs once more at the moved head
pull request   579, opened by the author; headRefOid = the head above; base master; MERGEABLE (the scout's gh read at ~08:15Z)
diff           11 paths over master, three-dot, +781/-16: api/cwf/_lib/turn/context.ts (+90: the log on the context, contribute helper with the `[TurnContext] refused` line, sealTurnContextForLedger) · types.ts (+23) · stageTools.ts (+58: ROUTER_DECLARED_CONFIDENCE, producer 1 at the irFrame stamp, producer 3 + pinned read at the binder) · stageClarify.ts (+29: producer 2 + carried-option) · stageStream.ts (+13: counts-and-names on turn_done) · api/cwf/_lib/turn/__tests__/turnContextFlowWired.test.ts (+327, new) · api/cwf/_lib/turn/__tests__/turnContextLog.test.ts (+22/-3: the SPEC-ONLY pin becomes an exact five-path importer list) · api/cwf/__tests__/chatQuotaStream.test.ts (+7/-1 fixture) · docs/relay/TURN-CONTEXT-FLOW-WIRED-S141-1-AG5-report.md (+195, new) · public/architecture/manifest.json (reseal, seal lines only) · src/components/admin/stagesRegistry.ts (+5: one Stage Cards law row); turnContextLog.ts UNTOUCHED; NUL 0, tenant 0, permission grep empty (the scout at 2f04591f56a7f67a37ba3133ef57ff6c92fc4097; the later two commits touch only the test and the manifest)
measured       2026-09-17T08:44:12Z shared-clone lane-fetched origin ref, read by the Architect IN THE MINUTE THIS CARD WAS CUT; the scout's wire read at ~08:15Z agrees on head and master
```

```evidence:ci-as-read
read by the SCOUT at ~08:24Z (row in raw-tokens), attempt 1 of each run at THIS head:
Build and Test   SUCCESS — build (24.x): step 9 Build incl. check:doc-drift GREEN, step 10 Run tests GREEN; turnContextLog.test.ts PASSES (16 tests); rule26 REQUIRED (src/ path) and green; eval-canary SKIPPED (named, never folded)
report-schema    SUCCESS
Relay corpus     SUCCESS
the two earlier heads were RED (2f04591f56a7f67a37ba3133ef57ff6c92fc4097: the pin; b32d6ba3f5658fa67ef49297c9b6ae354b4ec2c9: doc-drift) and are superseded; nothing re-run
ORDER 2 is where YOU read it again, at the same forty hex — and again at the moved head after step 2
```

## PREMISE

MEASURED: the head, master and the eleven-path shortstat in `the-head`, over the shared clone's lane-fetched origin ref at 2026-09-17T08:44:12Z, the minute of the cut.
MEASURED: relay_inbox (execute_sql) — the scout's GREEN on the work card (07:02:56Z), its self-land read (07:38:41Z), its at-head CI completion (08:24:06Z), rows named in `raw-tokens`.
MEASURED: CI at THIS head by the scout, `ci-as-read`; ORDER 2 is where green is measured again, by you, twice (before and after the step-2 sync).
MEASURED: OWNER-RULING-S141-PR579-LANDS-BY-AG-4-1 — the owner's word for this ONE pull request; recorded in the project box under that name.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; no permission surface in the diff.
MEASURED: ARCHITECT-RULING-S136-THE-MERGE-FORM-1 — the land script is the route, with YOUR address: `ADF_LANE_ROLE=AG-4`.
SELF-INVALIDATION: this premise dies if the head moves by a hand other than the land script's own step 2, if the diff grows a path, if a lock ref is present, or if the owner withdraws the ruling.

## ORDERS

ORDER 1 - PRINT THE LOCK STATE FIRST: `git ls-remote origin` filtered to the land script's lock ref name. Absent → continue. Present → STOP, print it, post it.

ORDER 2 - MEASURE CI AT THE FULL FORTY-HEX HEAD YOURSELF with `actions/runs?head_sha=<forty hex>`. A zero is read a SECOND time before it becomes a premise and you say so. Name every workflow, its `run_attempt` and its conclusion; eval-canary SKIPPED is named, never folded.

ORDER 3 - LAND ON YOUR MEASURED GREEN: `ADF_LANE_ROLE=AG-4 npm run land -- 579`. The PR exists — use it, open none. No-ff, never a squash. Step 2 WILL sync master (PR 578) into the branch: wait on CI at the moved head — name what you wait for and the last conclusion you saw — and land on run 2. Print step B's own verdict line (author AG-5, lander AG-4, PASS) verbatim. If ANY step reddens, STOP: that is the author's, by ORDER 4.

ORDER 4 - YOU EDIT NOTHING. If a gate refuses, STOP and print the refusal verbatim: WHICH step failed and which steps were SKIPPED. The AUTHOR (AG-5) repairs its own branch and pushes; nobody re-runs to chase a green (S55-1).

ORDER 5 - AFTER THE MERGE, print master's new forty-hex head, the CI conclusion there as it arrives, and the Vercel production record for it (this one BUILDS — api/ and src/ paths — print state and readyState; a CANCELED here is a finding). Post ONE from_lane slip. The post-landing witness (a live turn showing `turnContext` counts on turn_done) is the Architect's.

## FALSIFIER

If a lock ref is present, STOP. If the diff touches a permission surface or `turnContextLog.ts`, STOP. If CI at the head is red on the latest attempt, STOP and name the step. If step B refuses with anything but PASS, STOP and print it — the ruling covers the lander's identity, not a second gate. If the land script's merge-tree rehearsal reports a conflict, STOP and print it.

## SHARED SURFACES

```scope
- api/cwf/_lib/turn/context.ts · types.ts · stageTools.ts · stageClarify.ts · stageStream.ts
- api/cwf/_lib/turn/__tests__/turnContextFlowWired.test.ts (new) · turnContextLog.test.ts (pin re-pinned)
- api/cwf/__tests__/chatQuotaStream.test.ts (fixture)
- docs/relay/TURN-CONTEXT-FLOW-WIRED-S141-1-AG5-report.md
- public/architecture/manifest.json (reseal)
- src/components/admin/stagesRegistry.ts (one law row)
```

You write NOTHING. The merge commit is the land script's.

## DECISION RIGHTS

You choose the route on the self-test's measurement, as before. You may refuse on evidence this card did not anticipate — above all if step B does not say PASS for author AG-5 / lander AG-4.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, master and the eleven-path shortstat | MEASURED: for-each-ref and diff --stat three-dot over the shared clone at 2026-09-17T08:44:12Z | the-head |
| the per-file content, NUL, tenant and permission lenses | MEASURED: the scout's reads at the report head (07:38Z) and the diffs of the two later commits (07:58Z, 08:24Z), rows in raw-tokens | the-head |
| land.ts refuses self-land for this diff and passes author≠lander | MEASURED: the scout's verbatim print of :896-982 and :1368-1370, row in raw-tokens | the-head |
| CI at the head | MEASURED: the scout's completion row at 08:24:06Z — three runs SUCCESS, the pin passes | ci-as-read |
| the owner's ruling for this one landing | MEASURED: OWNER-RULING-S141-PR579-LANDS-BY-AG-4-1 in the project box | the-head |
| the lock ref state now | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves by a hand other than the land script's own step 2, if the diff grows a path, if a lock ref is present, if the owner withdraws the ruling, or if a v2 appears.
