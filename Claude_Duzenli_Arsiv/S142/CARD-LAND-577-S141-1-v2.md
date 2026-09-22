<!-- relay-audit: v1 kind=card -->
CARD-LAND-577-S141-1-v2

LANE: AG-5
fanout: personalized
v2 SUPERSEDES v1, which the scout REDded on discriminator 1: v1 was cut at 05:22:34Z on a head the author had already moved past at 05:16:14Z and 05:21:31Z — the Architect copied the head from an earlier read instead of measuring it at cut (A-REC-S141-LANDING-CARD-CUT-ON-A-STALE-HEAD-1; this card's `the-head` was read in the minute named there). Second CODE landing of S141 for the FOREMAN: a stage-03 resolution fills the tool slot it resolved, under CARD-RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-v1 and its AMENDMENT-1 (owner ruling OWNER-RULING-S141-TOOL-ARGUMENT-CARD-FIRST-1). The author pushed the code at 2026-09-17T04:37:00Z from the old master, merged current master into the branch itself at 04:42:08Z, pushed the report at 04:47:36Z, then applied AMENDMENT-1 A1-A3 at 05:16:14Z and folded the amendment and the notice into the report at 05:21:31Z; PR 577's head is that last commit and CI completed green there at the instant in `ci-as-read` — the §12.8 clock runs from there. The branch already CONTAINS master, so step 2 should find no update owed and this is a ONE-run landing; if step 2 syncs, wait on CI at the moved head and land on run 2. You did not write this code and you will not repair it. THIS DIFF CARRIES A MIGRATION (a seed of three governed rows, INSERT ... ON CONFLICT DO NOTHING) — it is DATA, not a permission surface; landing it does not apply it. The Operator applies it after the landing (ADR-005), on a card the Architect posts.

PRECONDITION: the branch head is as fenced and on the forge, master is at the fenced anchor (or beyond it by docs/relay landings only), the lock ref is ABSENT (print the ls-remote line), and the diff carries no permission surface (the one `guard` grep hit is a vitest fixture name, classified by the scout). If anything differs, YOUR reading wins, you print both, and you still land on YOUR measured green.

```evidence:raw-tokens
work card row (AG-4)    521741ef-9247-4158-851a-171a2351e95a
amendment row           c768be1c-4c98-4d14-b623-e64d18d824c0
scout GREEN on work     6ad973a5-06bc-4302-a1d5-64ace037f25e
scout CI read, row 1    0904aabb-fce1-454a-a654-ee5cbba74e34   (the diff, fixtures, migration, A1-A4 measured at the earlier head)
scout CI read, at 39f3  25e9d198-2857-4755-8245-8d290488e37a   (green at the SUPERSEDED head — v1's certificate)
scout RED on v1         71fb516f-9d98-489c-b14a-b451e7072546   (discriminator 1: head moved before v1 was cut)
scout CI read, at head  6a64e88e-464b-4e00-9b4b-3c8c72df4f3b   (green at THIS head; PR number)
author slip row         abbdad40-dfce-4fef-a1f9-50a5db8af8d4   (05:43:54Z, PUSHED, the same head)
migration file          supabase/migrations/20260917070000_tool_arg_policy_seed_armes_lines.sql
```

```evidence:the-head
branch         phase/resolved-entity-binds-tool-argument-s141-1
head           ab71199c530223c2d4800506ada79f654d1ee75b   "report, AMENDMENT-1 and the NOTICE folded in", 05:21:31Z; five commits over master
a1-a3 commit   f37fd469f7a3c5abbd19cab7ffd0c626e61fc91c   05:16:14Z — AMENDMENT-1 A1 (layer fallback), A2 (declaredType spelling), A3 (argBindings projected to the turn_done telemetry payload, values stripped); pushed together with the head, so no run was ever minted at it
report commit  39f3302390f360b841f73e0550fe058c9051202a   04:47:36Z — v1's head; its runs certify the superseded tree only
merge commit   e764af48b629902a9c5585cdb31bbb73849e6710   04:42:08Z — the author's own merge of current master into the branch (CLAUDE.md §5), seal re-derived
code commit    40ca6f7db8bdb30d8dababee09e6a6f20c017bab   "a stage-03 resolution fills the tool slot it resolved", 04:37:00Z, parent the OLD master
master         695492664c8a2c13b58c3b21a1f5bee4c8525075   merge of PR 576; contained in the branch — ahead by 5, behind by 0
pull request   577, opened by the author; headRefOid = the head above; mergeable MERGEABLE; base master (the scout's gh read at ~05:43Z)
diff           17 paths over master, three-dot, +1369/-27 (the Architect's shortstat at 05:45:42Z and the scout's at ~05:43Z agree): api/cwf/_lib/turn/toolArgPolicy.ts (+139, the binder) · stageTools.ts (+23/-3, the call site) · stageClarify.ts (+12, the layered stamp) · toolOutcomes.ts (+71/-1, argBindings on the ledger and argBindingsWithoutValues, the off-process copy without the model's value) · stageStream.ts (+12/-1, A3: argBindings on the turn_done telemetry payload, values stripped; the SSE done frame not widened) · types.ts (+20/-2) · three NEW tests (resolvedEntityBindsToolArgument +315, resolvedEntityStamp +182) and toolArgPolicySeed.test.ts (+106/-1) · five fixture hunks outside the original fence, each an additive `argBindings` key on an exact-equality pin (burstGuardReporting, memoryDistill ×2, semanticMemory, chatQuotaStream +9/-1) and toolOutcomes.test.ts (+13/-2) · supabase/migrations/<stamp>_tool_arg_policy_seed_armes_lines.sql (+67; its full filename is in raw-tokens; three INSERT rows for armes getFactoryLines.factoryId→factory, getLineStopsReportForZones.factoryId→factory, .zoneIds→line declaredType 'id[]'; ON CONFLICT DO NOTHING; no update, no delete) · docs/relay/RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-AG4-report.md (new, +384) · public/architecture/manifest.json (reseal, 24 seal lines); NUL bytes over the whole three-dot diff 0 (the Architect at 05:36:43Z; the scout at ~05:43Z); tenant lens 0 (the scout); permission grep over the seventeen names hits only api/cwf/__tests__/burstGuardReporting.test.ts on the word "guard" — a brake-ledger vitest fixture, not .claude/hooks/guard-bash.py
findings at this head   F-S141-BIND-LEDGER-NOT-PROJECTED-1 CLOSED in-branch by the a1-a3 commit (the author names it F-S141-BIND-DIGEST-PREMISE-MEASURED-DIFFERENTLY-1: the projection is on turn_done, value-stripped); the tool's input_schema for zoneIds UNMEASURED-BY-THE-LANE (F-S141-BIND-SCHEMA-READ-REFUSED-1, guard-mcp refusal, not routed around — the Operator reads it after the landing); neither is a landing matter
measured       2026-09-17T05:45:42Z shared-clone lane-fetched origin ref, read by the Architect IN THE MINUTE THIS CARD WAS CUT (the v1 defect); the scout's wire read at ~05:43Z agrees on head and master; the Architect holds no forge credential and cannot fetch
```

```evidence:ci-as-read
read by the SCOUT at ~05:43Z (the at-head completion row named in raw-tokens), the first independent read at THIS head — attempt 1 of each run:
Build and Test   completed SUCCESS 05:41:18Z (created 05:21:42Z) — changes 5/5 · build (24.x) 13/13 (CI-DIET decision · RULE-40 no-NUL · Migration version-key gate · Tenant-zero · Build with doc-drift · Run tests) · rule26 10/10 (required by land.ts for a migration-touching diff); eval-canary 0 steps SKIPPED (named, never folded)
report-schema    completed SUCCESS 05:22:16Z
Relay corpus     completed SUCCESS 05:22:06Z
at the a1-a3 commit total_count was 0 twice — pushed together with the head, no run was ever minted there; the runs at the superseded report head remain and certify that tree only; nothing was cancelled, no second attempt
ORDER 2 is where YOU read it again, at the same forty hex
```

## PREMISE

MEASURED: the head, master and the seventeen-path shortstat in `the-head`, over the shared clone's lane-fetched origin ref at 2026-09-17T05:45:42Z, the minute of the cut; the NUL count at 05:36:43Z; the per-file figures and the two new paths' content by the scout at ~05:43Z.
MEASURED: relay_inbox (execute_sql, 05:45:37Z) — the scout's GREEN on the work card (03:45:17Z), its RED on v1 (05:28:01Z), its at-head CI completion row (05:44:22Z) and the author's slip (05:43:54Z), rows named in `raw-tokens`.
MEASURED: CI at THIS head by the scout, `ci-as-read`; ORDER 2 is where green is measured again, by you.
MEASURED: the migration is INSERT-only with ON CONFLICT DO NOTHING (the scout's row 1, item 4) — the ABSENCE-ONLY law holds; applying it is the Operator's, after this landing.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; no permission surface in the diff, so no separate authority approval arises.
MEASURED: ARCHITECT-RULING-S136-THE-MERGE-FORM-1 — the land script is the route.
SELF-INVALIDATION: this premise dies if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, or if a lock ref is present.

## ORDERS

ORDER 1 - PRINT THE LOCK STATE FIRST: `git ls-remote origin` filtered to the land script's lock ref name. Absent → continue. Present → STOP, print it, post it.

ORDER 2 - MEASURE CI AT THE FULL FORTY-HEX HEAD YOURSELF with `actions/runs?head_sha=<forty hex>`. A zero is read a SECOND time before it becomes a premise and you say so. Name every workflow, its `run_attempt` and its conclusion; eval-canary SKIPPED is named, never folded into green. If runs are still in progress, WAIT on them — name what you are waiting for and the last conclusion you saw.

ORDER 3 - LAND ON YOUR MEASURED GREEN: `ADF_LANE_ROLE=AG-5 npm run land -- 577`. The PR exists — use it, open none. No-ff, never a squash. If step 2 finds no update owed, this is a one-run landing; if it syncs, wait on CI at the moved head and land on run 2. If ANY step reddens, STOP: that is the author's, by ORDER 4 — name the step and the skipped steps.

ORDER 4 - YOU EDIT NOTHING. If a gate refuses, STOP and print the refusal verbatim: WHICH step failed and which steps were SKIPPED (skipped is silent, not passing). The AUTHOR repairs its own branch and pushes; nobody re-runs to chase a green (S55-1).

ORDER 5 - AFTER THE MERGE, print master's new forty-hex head, the CI conclusion there as it arrives, and the Vercel production record for it (this one BUILDS — api/ paths — print state and readyState; a CANCELED here is a finding). Post ONE from_lane slip, and say in it that the migration in this diff is NOT applied by the landing. The Operator's card follows from the Architect; the post-landing witness (the work card's ORDER 6, after the Operator's push) is the Architect's, not yours.

## FALSIFIER

If a lock ref is present, STOP. If the diff touches a permission surface, STOP: that landing needs the owner's own named approval. If CI at the head is red on the latest attempt, STOP and name the step. If the land script's merge-tree rehearsal reports a conflict, STOP and print it.

## SHARED SURFACES

```scope
- api/cwf/_lib/turn/toolArgPolicy.ts
- api/cwf/_lib/turn/stageTools.ts
- api/cwf/_lib/turn/stageClarify.ts
- api/cwf/_lib/turn/toolOutcomes.ts
- api/cwf/_lib/turn/stageStream.ts (A3 projection)
- api/cwf/_lib/turn/types.ts
- api/cwf/_lib/turn/__tests__/resolvedEntityBindsToolArgument.test.ts (new)
- api/cwf/_lib/turn/__tests__/resolvedEntityStamp.test.ts (new)
- api/cwf/_lib/turn/__tests__/toolArgPolicySeed.test.ts
- api/cwf/__tests__/burstGuardReporting.test.ts · memoryDistill.test.ts · semanticMemory.test.ts · toolOutcomes.test.ts · chatQuotaStream.test.ts (fixture hunks)
- supabase/migrations/<stamp>_tool_arg_policy_seed_armes_lines.sql (landed, NOT applied; filename in raw-tokens)
- docs/relay/RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-AG4-report.md
- public/architecture/manifest.json
```

You write NOTHING. The merge commit is the land script's.

## DECISION RIGHTS

You choose the route on the self-test's measurement, as before. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, master, the seventeen-path shortstat and the NUL count | MEASURED: for-each-ref, rev-parse, diff --shortstat three-dot, tr/wc over the shared clone at 2026-09-17T05:45:42Z and 05:36:43Z | the-head |
| the per-file figures, the two new paths' content, the fixture hunks, the migration's INSERT-only shape, the tenant lens | MEASURED: the scout's row 1 (~04:49Z) and at-head completion row (~05:43Z), rows in raw-tokens | the-head |
| the pull request number, headRefOid and mergeable state | MEASURED: the scout's gh pr list at ~05:43Z, row in raw-tokens | the-head |
| the scout's GREEN on the work card | MEASURED: relay_inbox row at 2026-09-17T03:45:17Z, execute_sql 03:48Z | the-head |
| CI at the head | MEASURED: the scout's at-head completion row at 05:44:22Z — attempt 1, three runs SUCCESS, eval-canary SKIPPED | ci-as-read |
| no spend approval and no authority approval is required | MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 and the diff | the-head |
| the lock ref state now | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, if a lock ref is present, or if a v2 appears.
