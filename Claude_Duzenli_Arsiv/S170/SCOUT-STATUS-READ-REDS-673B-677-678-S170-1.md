[scout-1]
READ-REDS: #673 = (a) own branch, check:doc-drift inside `npm run build`: 3 tabs touched, 0 DIAGRAM-ATTEST lines · #677 = (b) guard COLLISION, YIELDED-TO #673, #675, #676 · #678 = (b) guard COLLISION, YIELDED-TO #676, #677. Both 677 and 678 are otherwise clean (CLEAN-MERGE, FENCE-GREW ok, timeline ok).
GRAFT: none run (CI logs are not indexed; no code question arose).
PROMPTS: one. The sanctioned `gh api …/actions/jobs/<id>/logs` redirect host productionresultssa17.blob.core.windows.net was declared for the three log reads.

SCOUT-STATUS-READ-REDS-673B-677-678-S170-1 · reply to ORDER-SCOUT1-READ-REDS-673B-677-678-S170-1 (id 98805d8b-b119-43ee-96e9-cef61fc594ad)
PRECONDITION: master = 648c61d6384942ab532444be252422ed9e37c02b. Heads unmoved (gh pr list): #673 6526e0746b17a89a7398d698e7eb77d0b78c1c63, #677 950e9bd84dc9afd4dba622c52ef22a0bf53d6751, #678 18a7120fe590fd8758b9ef7ac65af1e980ff1009. My reader truncates each log line at 200 chars; truncated lines end mid-word.

## PR 673 — build (24.x) job 110274058512, step 10 "Build" (npm run build)
Gates before Build are GREEN: rule24, migration-versions, `[check:tenant-zero] [OK] ZERO gated-vocabulary hits in scope`, `[check:backend-names] [OK] every (id, class) count equals data/gates/backend-names-baseline.json.` Inside Build, `[check:ground] GREEN`, then:
```
[check:doc-drift] [FAIL] DOC DRIFT: Architecture Map touched by api/cwf/_lib/knowledge/piiNameLexicon.ts, api/cwf/_lib/knowledge/reference/kinds.ts, api/cwf/_lib/knowledge/reference/piiNameLexiconSeeds.ts, api/cwf/_lib/knowledge/selfSeedReconciler.ts, api/cwf/_lib/pii/pi
[check:doc-drift] structure ok -- 7 narrative tabs, every diagram resolves, every codeAreas non-empty.
[check:doc-drift] [FAIL] DOC DRIFT: Request Lifecycle touched by api/cwf/_lib/knowledge/piiNameLexicon.ts, api/cwf/_lib/knowledge/reference/kinds.ts, api/cwf/_lib/knowledge/reference/piiNameLexiconSeeds.ts, api/cwf/_lib/knowledge/selfSeedReconciler.ts -- update the diagr
[check:doc-drift] ATTEST RUN -- base 648c61d6384942ab532444be252422ed9e37c02b, merge-base 648c61d6384942ab532444be252422ed9e37c02b, 15 changed path(s)
[check:doc-drift] [FAIL] DOC DRIFT: Governance Model touched by api/cwf/_lib/knowledge/piiNameLexicon.ts, api/cwf/_lib/knowledge/reference/kinds.ts, api/cwf/_lib/knowledge/reference/piiNameLexiconSeeds.ts, api/cwf/_lib/knowledge/selfSeedReconciler.ts -- update the diagra
[check:doc-drift] attest lines read: none (1 report(s) in the diff)
[check:doc-drift] 3 tab(s) failed. In your report add, per tab: DIAGRAM-ATTEST: <tab name exactly as in manifest.json> — <why the diagram still holds, at least 10 characters>
[check:doc-drift] tab 'Runtime Topology': not touched
[check:doc-drift] tab 'LLM Control Surface': not touched
[check:doc-drift] tab 'Agent Control Plane': not touched
[check:doc-drift] tab 'Stage Cards': not touched
##[error]Process completed with exit code 1.
```
- FAILED gate: check:doc-drift (RULE-20 per-PR DIAGRAM-ATTEST). Tabs: Architecture Map, Request Lifecycle, Governance Model.
- SILENT: step 11 Run tests (skipped). The PII tests have never run in CI on any head of #673.
- CLASS: (a) the author's own branch. The report carries zero attest lines.
- REPAIR (AG-2): add three lines to docs/relay/<the #673 report> — `DIAGRAM-ATTEST: Architecture Map — …`, `DIAGRAM-ATTEST: Request Lifecycle — …`, `DIAGRAM-ATTEST: Governance Model — …`, each with a ≥10-char reason (e.g. "a new system SOFT kind and a pure detector, no new stage or edge"). Tab names must match manifest.json exactly. The attest line is report text, so the fence does not grow.

## PR 677 — changes job 110270743274, step 6 "Merge guard"
```
[merge-guard] pr #677 base 648c61d6384942ab532444be252422ed9e37c02b head 950e9bd84dc9afd4dba622c52ef22a0bf53d6751 merge-base 648c61d6384942ab532444be252422ed9e37c02b
[merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head
[merge-guard] FENCE-GREW ok — head fence is held by the first fence, at 950e9bd84dc9afd4dba622c52ef22a0bf53d6751
[merge-guard] timeline ok — 3 events, no reopen, no force-push
[merge-guard] COLLISION: 5 other open PR(s) against master (plant heads ignored)
[merge-guard] FAIL COLLISION — YIELDED-TO #673: #677 and #673 overlap on data/gates/backend-names-baseline.json~data/gates/backend-names-baseline.json; the higher number yields
[merge-guard] COLLISION ok against #674 — fences disjoint
[merge-guard] FAIL COLLISION — YIELDED-TO #675: #677 and #675 overlap on data/gates/backend-names-baseline.json~data/gates/backend-names-baseline.json; the higher number yields
[merge-guard] FAIL COLLISION — YIELDED-TO #676: #677 and #676 overlap on api/cwf/_lib/turn/stageTools.ts~api/cwf/_lib/turn/stageTools.ts, api/cwf/_lib/turn/types.ts~api/cwf/_lib/turn/types.ts; the higher number yields
[merge-guard] COLLISION note — overlaps higher #678 on api/cwf/_lib/turn/stageTools.ts~api/cwf/_lib/turn/stageTools.ts; #678 yields
[merge-guard] VERDICT RED — COLLISION
##[error]Process completed with exit code 1.
```
- SILENT: build, rule26 (skipped); 677's code is unmeasured in CI. CLASS: (b), rule scripts/mergeGuard.mjs:532. The own branch is otherwise clean.
- REPAIR (AG-1): no edit now. 677 is held for the owner's publicBaseUrl anyway (A4). After #673, #675 and #676 land, `git merge origin/master`, re-write the backend-names baseline with --write-baseline, resolve stageTools.ts/types.ts by content, and push.

## PR 678 — changes job 110270831949, step 6 "Merge guard"
```
[merge-guard] pr #678 base 648c61d6384942ab532444be252422ed9e37c02b head 18a7120fe590fd8758b9ef7ac65af1e980ff1009 merge-base 648c61d6384942ab532444be252422ed9e37c02b
[merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head
[merge-guard] FENCE-GREW ok — head fence is held by the first fence, at b2c91bdf10380d41ca373405eba7752364286247
[merge-guard] timeline ok — 4 events, no reopen, no force-push
[merge-guard] COLLISION: 5 other open PR(s) against master (plant heads ignored)
[merge-guard] COLLISION ok against #673 — fences disjoint
[merge-guard] COLLISION ok against #674 — fences disjoint
[merge-guard] COLLISION ok against #675 — fences disjoint
[merge-guard] FAIL COLLISION — YIELDED-TO #676: #678 and #676 overlap on api/cwf/_lib/turn/stageTools.ts~api/cwf/_lib/turn/stageTools.ts, api/cwf/_lib/turn/toolOutcomes.ts~api/cwf/_lib/turn/toolOutcomes.ts; the higher number yields
[merge-guard] FAIL COLLISION — YIELDED-TO #677: #678 and #677 overlap on api/cwf/_lib/turn/stageTools.ts~api/cwf/_lib/turn/stageTools.ts; the higher number yields
[merge-guard] VERDICT RED — COLLISION
##[error]Process completed with exit code 1.
```
- SILENT: build, rule26 (skipped). CLASS: (b), rule scripts/mergeGuard.mjs:532. The own branch is otherwise clean.
- REPAIR (AG-3): no edit now. After #676 lands, merge origin/master and resolve stageTools.ts/toolOutcomes.ts. #677 is HELD for the owner (A4), so 678 stays blocked behind a PR that cannot land today, unless the Architect closes or re-fences #677 or rules the order.

## The queue
The guard makes the higher number yield on any shared path, so the landing order is forced: 673 → (675, 676) → 677 → 678. #677 is owner-held, which parks 678 too. The Architect's call: whether #677 should be closed and re-opened after the owner sets publicBaseUrl, so it stops blocking #678.

read relay_inbox at 2026-10-01T09:27:10Z: this order was the only card.
