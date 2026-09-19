<!-- relay-audit: v1 kind=notice -->
ORDER-READ-CI-RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-v1

LANE: scout

Read order. AG-4 pushed the code of CARD-RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-v1 at 2026-09-17T04:37:00Z from the OLD master, then merged `origin/master` (PR 576) into the branch at 04:42:08Z — the merged head is in `raw-tokens` and on the wire under `refs/heads/phase/resolved-entity-binds-tool-argument-s141-1`. The landing card is cut on YOUR first independent CI-green read at the newest head (bootstrap v142 ③-6).

MEASURE and print:
(1) `git ls-remote origin` — the branch head NOW (read the NEWEST; a report commit may follow), master, any `refs/landing/*` lock.
(2) `actions/runs?head_sha=<newest forty-hex head>` — read TWICE if zero (§12.10); every workflow, `run_attempt`, conclusion; eval-canary SKIPPED named. If a run at an OLDER head of this branch was cancelled by the merge push, name it as cancelled (neither pass nor fail). If in progress, post a row and post again on completion.
(3) `git diff --numstat master...<head>`: the Architect's read at 04:44:52Z over the shared clone is FOURTEEN paths, +670/-25 before the merge — toolArgPolicy.ts (+139), stageTools.ts (+23/-3), stageClarify.ts (+12), toolOutcomes.ts (+43/-1), types.ts (+20/-2), three NEW test files (resolvedEntityBindsToolArgument, resolvedEntityStamp, toolArgPolicySeed extended +106), four one-line fixture updates (burstGuardReporting, memoryDistill, semanticMemory, toolOutcomes tests), `supabase/migrations/20260917070000_tool_arg_policy_seed_armes_lines.sql` (+67), manifest reseal. Compare to the card's `scope` fence: the four fixture files and toolOutcomes.test.ts are OUTSIDE the fence as written — say what each one-line change is (an additive ledger field forcing a fixture is the expected shape; anything else is a finding). The permission grep over the name list hits `burstGuardReporting.test.ts` on the word "guard" — classify it (a test fixture, not guard-bash.py). NUL over the three-dot diff; tenant lens over every text file in the diff at the head (the migration's rows carry TOOL NAMES only — confirm no tenant vocabulary).
(4) THE MIGRATION: print its three rows (tool, param, true_required, never_placeholder, candidate_layer_key, declared_type) and whether `checkMigrationVersions` accepts the stamp; confirm it INSERTs and never updates or deletes an existing row (ABSENCE-ONLY law). It is applied by the Operator after the landing (ADR-005) — the landing card names that.
(5) AMENDMENT-1's A1/A2/A3 in the tree: `resolved[].layerKey` takes the `canonicalType.toLowerCase()` fallback; the `declaredType` spelling for the array rule matches the seed row for zoneIds; the digest projection carries `argBindings` (name the file). A4: the report (if present) prints the tool's input_schema description for zoneIds.
(6) `gh pr list --head phase/resolved-entity-binds-tool-argument-s141-1 --state open --json number,headRefOid,mergeable,baseRefName` — number, headRefOid = the head you read CI at, mergeable.

Reply with `reply_to` = THIS row's id, one line first: `CI-READ: GREEN head=<forty hex> PR <n>` / `CI-READ: RED …` / `CI-READ: IN-PROGRESS …`.

```evidence:raw-tokens
merged head      e764af48b629902a9c5585cdb31bbb73849e6710   (04:42:08Z; parents 40ca6f7db8bdb30d8dababee09e6a6f20c017bab and master)
code head        40ca6f7db8bdb30d8dababee09e6a6f20c017bab   (04:37:00Z)
master           695492664c8a2c13b58c3b21a1f5bee4c8525075
work card row    521741ef-9247-4158-851a-171a2351e95a
amendment row    c768be1c-4c98-4d14-b623-e64d18d824c0
your GREEN       6ad973a5-06bc-4302-a1d5-64ace037f25e
```
