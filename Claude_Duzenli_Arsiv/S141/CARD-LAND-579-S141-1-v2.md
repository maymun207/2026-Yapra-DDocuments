<!-- relay-audit: v1 kind=card -->
CARD-LAND-579-S141-1-v2

LANE: AG-5
fanout: personalized
v2 SUPERSEDES v1 (which was addressed to AG-4 under the 09:19Z ruling — refused by a producer window's harness; SLIP rows in `raw-tokens`). THE FIRST LIVE USE OF THE SEAM: you land YOUR OWN pull request, 579, and the gate you run (master's `scripts/land.ts` since PR 580) permits it only because it READS the owner's ruling from the bus — a `to_lane` row addressed to AG-5, artifact_name `OWNER-RULING-S141-PR579-SELF-LAND-THROUGH-THE-SEAM-1`, body naming pull request 579 and AG-5, created at 12:33:44Z, digest-checked through mail-wait — and prints its id, md5 and created_at on the pass line, class AUTHOR-SELF-RULED. If the gate cannot prove the ruling it refuses RULING-UNPROVEN naming the failed condition, and that refusal is a MEASUREMENT of the seam, not an obstacle: STOP and post it verbatim. The diff is the A23 §9 step-2 flow WIRED on the live turn path (`ctx.turnContext`, three producers, counts-and-names on turn_done, the container's own importer pin re-pinned to the exact five-path list); the flow steers nothing. You wrote this code under a card the Architect should not have sent you; you will not repair it now either — a red gate is posted, not fixed, and the repair is a separate card.

PRECONDITION: the branch head is as fenced and on the forge; master is at the fenced anchor (PR 580's merge) or beyond it by PR 581's merge; the lock ref is ABSENT (print the ls-remote line); the three-dot diff over master is the eleven paths in `the-head` and none other; `api/cwf/_lib/turn/turnContextLog.ts` is NOT among them; the ruling row is in YOUR box with the digest in `raw-tokens`. If anything differs, YOUR reading wins, you print both, and you still land on YOUR measured green.

```evidence:raw-tokens
owner ruling (AG-5 row)   fa54b9a7-742b-4df0-ab2b-04933bab900d   md5 6ad38188c6c6addba996c24dcc9517ed   1267 bytes   12:33:44Z
owner ruling (scout copy) 5272dd6f-e712-4e1b-9a28-1bcc5a4e46fb
v1 card (AG-4, void)      97ebaf8a-50cc-4cb8-a733-e13e5aa4f648
AG-4 stopped / refused    09:10:50Z and 09:23:20Z from_lane slips, artifact names ending -STOPPED and -HARNESS-REFUSED
scout GREEN on work       892f06f5-0809-4868-a2c4-776e1174da51
scout CI read at head     cb74190f-7314-434c-a08c-576b0034345a   (three runs SUCCESS at the head, 08:24Z)
seam landing (PR 580)     4bfc151f-9a11-4a1b-8c25-ffa7ab3cd9cc   (CARD-LAND-580 sealed row)
```

```evidence:the-head
branch         phase/turn-context-flow-wired-s141-1
head           2adab2da890ac99ce9e36652b33a8914d04dbe9d   "reseal after AMENDMENT-1 (the test is a mapped file)", 2026-09-17T08:01:31Z; four commits over the fork point
master         a02caaa05b5f48926462706137d0729378907b14   Merge pull request #580, 12:23:01Z — the branch is BEHIND by 5 (PR 578 + PR 580 merges): step 2 WILL sync and CI runs once more at the moved head; PR 580's paths (scripts/, landScript.test.ts, landSelfTest.ts, one docs/relay file) overlap none of the eleven
diff           11 paths, three-dot numstat over master: api/cwf/__tests__/chatQuotaStream.test.ts 7/1 · api/cwf/_lib/turn/__tests__/turnContextFlowWired.test.ts 327/0 · api/cwf/_lib/turn/__tests__/turnContextLog.test.ts 22/3 · api/cwf/_lib/turn/context.ts 90/0 · api/cwf/_lib/turn/stageClarify.ts 29/0 · api/cwf/_lib/turn/stageStream.ts 13/0 · api/cwf/_lib/turn/stageTools.ts 58/0 · api/cwf/_lib/turn/types.ts 23/0 · docs/relay/TURN-CONTEXT-FLOW-WIRED-S141-1-AG5-report.md 195/0 · public/architecture/manifest.json 12/12 · src/components/admin/stagesRegistry.ts 5/0; turnContextLog.ts UNTOUCHED
pull request   579, OPEN, headRefOid = the head above, base master (the scout's gh read at ~08:15Z; re-read it)
the gate       master's scripts/land.ts (PR 580): AUTHOR-SELF-RULED requires ALL of direction='to_lane', artifact_name prefix OWNER-RULING-, body names `pull request 579` (or `#579`) AND `AG-5`, created_at within 24h, digest-checked via `node scripts/mail-wait.mjs AG-5 --read <name>` on the injected Exec; the ruling row above satisfies each by construction — the gate MEASURES it
measured       2026-09-17T12:34Z by the Architect on the shared clone's lane-fetched origin ref (head, master, eleven-path numstat, behind-by-5); the ruling row by execute_sql at 12:33:44Z
```

```evidence:ci-as-read
at THIS head (the forty hex in the-head), read by the SCOUT at ~08:24Z, attempt 1: Build and Test SUCCESS (build (24.x): doc-drift GREEN, tests GREEN incl. turnContextLog.test.ts 16 tests; rule26 REQUIRED (src/ path) and green; eval-canary SKIPPED named) · report-schema SUCCESS · Relay corpus SUCCESS
STALE BY DESIGN: the head is four hours old and behind master by 5 — ORDER 2 reads it again at the same forty hex, and step 2's sync produces a NEW head whose run is the one you land on
```

## PREMISE

MEASURED: the head, master, the eleven-path numstat and the behind-by-5 count over the shared clone's lane-fetched origin ref at 2026-09-17T12:34Z.
MEASURED: the ruling row on the bus (execute_sql, 12:33:44Z), addressed to AG-5, digest in `raw-tokens`; its scout copy beside it.
MEASURED: master's land.ts is PR 580's (merged 12:23:01Z, CARD-LAND-580 sealed row in `raw-tokens`): the seam is on master.
MEASURED: CI at THIS head by the scout at 08:24Z, `ci-as-read` — stale; ORDER 2 re-measures, and the synced head's run is the verdict.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; no permission surface in the diff.
UNMEASURED: whether YOUR harness (the foreman window's classifier) permits `ADF_LAND_RULING=…` on the command line — no tree read can answer it; ORDER 3 measures it, and a refusal is posted VERBATIM as a finding (F-S141 class), never routed around.
SELF-INVALIDATION: this premise dies if the head moves by a hand other than the land script's own step 2, if the diff grows a path, if a lock ref is present and does not clear, or if the ruling row is absent from your box.

## ORDERS

ORDER 1 - READ THE RULING FIRST, AS THE GATE WILL: `node scripts/mail-wait.mjs AG-5 --read OWNER-RULING-S141-PR579-SELF-LAND-THROUGH-THE-SEAM-1` — print the [CARD] header line (id, body_md5, length, DIGEST-OK). The md5 must be the one in `raw-tokens`. Then the lock state: `git ls-remote origin` filtered to the lock ref name — absent → continue; present → STOP, print, post.

ORDER 2 - MEASURE CI AT THE FULL FORTY-HEX HEAD YOURSELF with `actions/runs?head_sha=<forty hex>`. A zero is read a SECOND time before it becomes a premise and you say so. Name every workflow, run_attempt, conclusion; rule26 REQUIRED here (src/ path) and named; eval-canary SKIPPED named, never folded.

ORDER 3 - LAND THROUGH THE SEAM: `ADF_LAND_RULING=OWNER-RULING-S141-PR579-SELF-LAND-THROUGH-THE-SEAM-1 ADF_LANE_ROLE=AG-5 npm run land -- 579`. The PR exists — use it, open none. No-ff, never a squash. Step 2 WILL sync master (578 + 580) into the branch: wait on CI at the moved head — name what you wait for and the last conclusion you saw — and land on that run. Print step B's verdict line VERBATIM: expected `AUTHOR-SELF-RULED` with the ruling's artifact_name, row id, md5 and created_at. If it says RULING-UNPROVEN, STOP and post the line — which condition failed is the finding. If your harness refuses the command itself, STOP and post the refusal verbatim — that is F-S141-FOREMAN-HARNESS-REFUSES-ADF-LAND-RULING-1 and the Architect's next card, not yours.

ORDER 4 - YOU EDIT NOTHING. If a CI gate reddens at the moved head, STOP and print the refusal verbatim: WHICH step failed and which were SKIPPED. The repair is a separate card (the author is you, but a landing card never repairs); nobody re-runs to chase a green (S55-1).

ORDER 5 - AFTER THE MERGE, print master's new forty-hex head, the CI conclusion there as it arrives, and the Vercel production record for it (this one BUILDS — api/ and src/ paths — print state and readyState; a CANCELED here is a finding). Post ONE from_lane slip, and in it the gate's AUTHOR-SELF-RULED line verbatim — that line is the seam's first live witness. The post-landing product witness (a live turn showing `turnContext` counts on turn_done) is the Architect's.

## FALSIFIER

If the ruling row is not in your box, or its md5 differs from `raw-tokens`, STOP — do not land on a ruling you cannot read. If a lock ref is present and does not clear, STOP. If the diff touches `turnContextLog.ts`, a permission surface, or a migration, STOP. If CI at the moved head is red on the latest attempt, STOP and name the step. If step B says SELF-LAND (the seam not consulted — env not read) or RULING-UNPROVEN, STOP and print it. If the merge-tree rehearsal reports a conflict (PR 581 may land first and also touches stageClarify.ts at disjoint lines), STOP and print it.

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

You choose the route on the self-test's measurement, as before. You may refuse on evidence this card did not anticipate — above all on anything step B prints that is not AUTHOR-SELF-RULED.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, master, the eleven paths, behind-by-5 | MEASURED: for-each-ref, diff --numstat three-dot, rev-list --count over the shared clone at 2026-09-17T12:34Z | the-head |
| the ruling row, its address and digest | MEASURED: execute_sql returning id/md5/created_at at 12:33:44Z | the-head |
| the gate's five conditions on master | MEASURED: the scout's line-by-line read of PR 580's diff (its two rows of 11:09Z and 11:12Z) and its landing at 12:23:01Z | the-head |
| CI at the (stale) head | MEASURED: the scout's completion row at 08:24:06Z — three runs SUCCESS | ci-as-read |
| the harness's verdict on ADF_LAND_RULING in the foreman window | NOT-READ | ORDER 3 measures it |
| the lock ref state now | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves by a hand other than the land script's own step 2, if the diff grows a path, if a lock ref is present and does not clear, if the ruling row is absent, or if a v3 appears.
