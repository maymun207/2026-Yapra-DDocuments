with c as (select $q$<!-- relay-audit: v1 kind=card -->
CARD-LAND-577-S141-1-v1

LANE: AG-5
fanout: personalized
Second CODE landing of S141 for the FOREMAN: a stage-03 resolution fills the tool slot it resolved, under CARD-RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-v1 and its AMENDMENT-1 (owner ruling OWNER-RULING-S141-TOOL-ARGUMENT-CARD-FIRST-1). The author pushed the code at 2026-09-17T04:37:00Z from the old master, merged current master into the branch itself at 04:42:08Z, and pushed the report at 04:47:36Z; PR 577 opened on that head and CI completed green at 05:05:27Z — the §12.8 clock runs from there. The branch already CONTAINS master, so step 2 should find no update owed and this is a ONE-run landing; if step 2 syncs, wait on CI at the moved head and land on run 2. You did not write this code and you will not repair it. THIS DIFF CARRIES A MIGRATION (a seed of three governed rows, INSERT ... ON CONFLICT DO NOTHING) — it is DATA, not a permission surface; landing it does not apply it. The Operator applies it after the landing (ADR-005), on a card the Architect posts.

PRECONDITION: the branch head is as fenced and on the forge, master is at the fenced anchor (or beyond it by docs/relay landings only), the lock ref is ABSENT (print the ls-remote line), and the diff carries no permission surface (the one `guard` grep hit is a vitest fixture name, classified by the scout). If anything differs, YOUR reading wins, you print both, and you still land on YOUR measured green.

```evidence:raw-tokens
work card row (AG-4)    521741ef-9247-4158-851a-171a2351e95a
amendment row           c768be1c-4c98-4d14-b623-e64d18d824c0
scout GREEN on work     6ad973a5-06bc-4302-a1d5-64ace037f25e
scout CI read, row 1    0904aabb-fce1-454a-a654-ee5cbba74e34   (in progress at the head; the diff, fixtures, migration, A1-A4 measured)
scout CI read, complete 25e9d198-2857-4755-8245-8d290488e37a   (green at the head; PR number)
author slip row         NONE at cut — the landing does not wait for it (bootstrap v142 ③-6)
migration file          supabase/migrations/20260917070000_tool_arg_policy_seed_armes_lines.sql
```

```evidence:the-head
branch         phase/resolved-entity-binds-tool-argument-s141-1
head           39f3302390f360b841f73e0550fe058c9051202a   the report commit; three commits over master
merge commit   e764af48b629902a9c5585cdb31bbb73849e6710   04:42:08Z — the author's own merge of current master into the branch (CLAUDE.md §5), seal re-derived; parents the code commit and master
code commit    40ca6f7db8bdb30d8dababee09e6a6f20c017bab   "a stage-03 resolution fills the tool slot it resolved", 04:37:00Z, parent the OLD master; its content is byte-identical at the head
master         695492664c8a2c13b58c3b21a1f5bee4c8525075   merge of PR 576; contained in the branch — ahead by 3, behind by 0
pull request   577, opened by the author; headRefOid = the head above; mergeable MERGEABLE; base master (the scout's gh read at ~05:14Z)
diff           15 paths over master, three-dot, +1182/-25 (the scout's shortstat; the Architect's earlier +670 total was WRONG, the per-file figures were right): api/cwf/_lib/turn/toolArgPolicy.ts (+139, the binder) · stageTools.ts (+23/-3, the call site) · stageClarify.ts (+12, the layered stamp) · toolOutcomes.ts (+43/-1, argBindings on the ledger) · types.ts (+20/-2) · three NEW tests (resolvedEntityBindsToolArgument +268, resolvedEntityStamp +163) and toolArgPolicySeed.test.ts (+106/-1) · four fixture hunks outside the fence, each `argBindings: []` on an exact-equality ledger literal (burstGuardReporting, memoryDistill ×2, semanticMemory) and toolOutcomes.test.ts (+13/-2: the same field on two pins plus a boundary comment) · supabase/migrations/<stamp>_tool_arg_policy_seed_armes_lines.sql (+67; its full filename is in raw-tokens; three INSERT rows for armes getFactoryLines.factoryId→factory, getLineStopsReportForZones.factoryId→factory, .zoneIds→line declaredType 'id[]'; ON CONFLICT DO NOTHING; no update, no delete) · docs/relay/RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-AG4-report.md (new, +312) · public/architecture/manifest.json (reseal, 24 seal lines); NUL bytes over the whole three-dot diff 0; tenant lens 0 over all fifteen files; permission grep over the name list hits only api/cwf/__tests__/burstGuardReporting.test.ts on the word "guard" — a brake-ledger vitest fixture, not .claude/hooks/guard-bash.py
findings the author and the scout filed at this head   F-S141-BIND-LEDGER-NOT-PROJECTED-1 (argBindings is stamped on ctx.toolLedger and NOT projected into turn_trace_digest — stageStream.ts picks fields by name; the witness surface for the divergence count is the `[ToolArgBind]` runtime log line alone — AMENDMENT-1 A3 unmet, named by the author in the report); the tool's input_schema for zoneIds UNMEASURED-BY-THE-LANE (guard-mcp refusal, not routed around — AMENDMENT-1 A4); neither is a landing matter: the code is gated green and the layer mapping rests on the tree's own descriptors (the scout's discriminator 3 on the work card)
measured       2026-09-17T04:44:52Z shared-clone objects (lane-fetched origin) for the merged head, read by the Architect; the scout's wire reads at ~04:47Z, ~04:49Z and ~05:14Z agree on the three heads and master; the Architect holds no forge credential and cannot fetch
```

```evidence:ci-as-read
read by the SCOUT at ~05:14Z (completion row named in raw-tokens), the first independent read — attempt 1 of each run at the head:
Build and Test   completed SUCCESS 05:05:27Z — changes 5/5 · build (24.x) 13/13 (CI-DIET decision · RULE-40 no-NUL · Migration version-key gate: the new seed stamp accepted · Tenant-zero · Build with doc-drift · Run tests) · rule26 10/10; eval-canary 0 steps SKIPPED (named, never folded)
report-schema    completed SUCCESS 04:48:44Z
Relay corpus     completed SUCCESS 04:48:56Z
at the two older heads of this branch total_count was 0 twice — no pull request existed yet, so no run ever existed there; nothing was cancelled
ORDER 2 is where YOU read it again, at the same forty hex
```

## PREMISE

MEASURED: the merged head, the code commit, master, the fourteen pre-report paths, the NUL count and the permission grep in `the-head`, over the shared clone at 2026-09-17T04:44:52Z; the report commit and the fifteenth path by the scout at ~04:49Z and ~05:14Z.
MEASURED: relay_inbox (execute_sql, 05:19:25Z) — the scout's GREEN on the work card (03:45:17Z), the scout's two CI rows (05:12:45Z, 05:14:27Z) and the pull request number, rows named in `raw-tokens`.
MEASURED: CI at the head by the scout, `ci-as-read`; ORDER 2 is where green is measured again, by you.
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
- api/cwf/_lib/turn/types.ts
- api/cwf/_lib/turn/__tests__/resolvedEntityBindsToolArgument.test.ts (new)
- api/cwf/_lib/turn/__tests__/resolvedEntityStamp.test.ts (new)
- api/cwf/_lib/turn/__tests__/toolArgPolicySeed.test.ts
- api/cwf/__tests__/burstGuardReporting.test.ts · memoryDistill.test.ts · semanticMemory.test.ts · toolOutcomes.test.ts (fixture hunks)
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
| the merged head, code commit, master, fourteen paths, NUL count and permission grep | MEASURED: git log, merge-base, diff --numstat three-dot, diff --name-only grep, tr/wc over the shared clone at 2026-09-17T04:44:52Z | the-head |
| the report commit, the fifteenth path, the +1182/-25 total, the fixture hunks, the migration's INSERT-only shape | MEASURED: the scout's row 1 and completion row at ~04:49Z and ~05:14Z, rows in raw-tokens | the-head |
| the pull request number, headRefOid and mergeable state | MEASURED: the scout's gh pr list at ~05:14Z, row in raw-tokens | the-head |
| the scout's GREEN on the work card | MEASURED: relay_inbox row at 2026-09-17T03:45:17Z, execute_sql 03:48Z | the-head |
| CI at the head | MEASURED: the scout's completion row at 05:14:27Z — attempt 1, three runs SUCCESS, eval-canary SKIPPED | ci-as-read |
| no spend approval and no authority approval is required | MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 and the diff | the-head |
| the lock ref state now | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, if a lock ref is present, or if a v2 appears.
$q$::text as body), o as (select $q$<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-LAND-577-S141-1-v1

LANE: scout

Adversary review of CARD-LAND-577-S141-1-v1 (bytes in the row named BYTES-FOR-REVIEW-CARD-LAND-577-S141-1-v1; digests in `raw-tokens`). A LANDING card for AG-5 on PR 577 — the tool-argument binder you reviewed as CARD-RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-v1 (GREEN) and whose CI you read to completion (rows named below). Cut on YOUR completion row; no author slip exists and the card says so. §12.8: CI green at 05:05:27Z, so master is owed by 05:35Z — measure, do not pad.

DISCRIMINATORS, measure each and print what you measured:
(1) `the-head` versus `git ls-remote origin` NOW — branch head, master, lock ref absent. A moved head decays the card.
(2) CI at the head — re-read `actions/runs?head_sha=<head>` ONCE; the three ids and conclusions unchanged (a new attempt is a finding).
(3) The card's `the-head` and `ci-as-read` quote YOUR two rows: confirm no conclusion, count or instant was added, dropped or reworded (§12.4) — in particular the +1182/-25 total, the fifteen paths, the four fixture hunks, the migration's INSERT-only/ON CONFLICT DO NOTHING shape, the two findings (BIND-LEDGER-NOT-PROJECTED, input_schema UNMEASURED-BY-THE-LANE) and the "no run ever existed at the older heads" sentence.
(4) The migration as a LANDING matter: confirm the land script's own gates carry no step that APPLIES a migration (landing ≠ apply, ADR-005), so the diff's migration path is data in the tree and not a permission surface for AG-5. If any gate in land.ts or the workflows touches `supabase` on landing, RED with the line.
(5) A refusal met while authoring, carried per §12.2: cardPreflight refused the first draft on CP-8 because the migration's fourteen-digit stamp read as a short sha in an anchored fence; the stamp moved to the unanchored `raw-tokens` fence and the anchored positions now say `<stamp>`. Confirm the BYTES row is the second body (md5 below) and that nothing else changed between the two.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-LAND-577-S141-1-v1 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. The Architect seals ONLY on the verdict that answers THIS row, with an EXISTS on it in the seal SQL. Bridge preflight GREEN on eleven checks at 2026-09-17T05:21:02Z (a grammar reading, not this review).

```evidence:raw-tokens
card md5        080614c959a2728c4d8372e53dff5e68
card sha256     cfa237344d08f1551917b13361dc2d479697761efb379066bd19bf283194cdbb
card bytes      11685
head            39f3302390f360b841f73e0550fe058c9051202a
master          695492664c8a2c13b58c3b21a1f5bee4c8525075
your GREEN      6ad973a5-06bc-4302-a1d5-64ace037f25e
your CI rows    0904aabb-fce1-454a-a654-ee5cbba74e34 · 25e9d198-2857-4755-8245-8d290488e37a
```
$q$::text as body)
insert into public.relay_inbox (direction, lane_addr, artifact_name, body)
select 'to_lane','scout','BYTES-FOR-REVIEW-CARD-LAND-577-S141-1-v1', c.body from c
 where md5(c.body)='080614c959a2728c4d8372e53dff5e68' and encode(sha256(convert_to(c.body,'UTF8')),'hex')='cfa237344d08f1551917b13361dc2d479697761efb379066bd19bf283194cdbb' and octet_length(c.body)=11685
union all
select 'to_lane','scout','ORDER-REVIEW-CARD-LAND-577-S141-1-v1', o.body from o
 where md5(o.body)='973d6e2f062db1178678fc707b728b94' and encode(sha256(convert_to(o.body,'UTF8')),'hex')='49192b24b5777739ffe5ed4297613a520adc39c41270642bdf25e0c660047333' and octet_length(o.body)=2837
returning id, artifact_name, md5(body), octet_length(body), created_at;