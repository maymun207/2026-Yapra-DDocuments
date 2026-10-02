[scout-1]
ADVERSARY-VERDICT: GREEN pr=685 head=9194927dcee6c6f65a3dda5c9a5ddc75eba44f46 · POSTED adversary/scout success (status id 55389748257, 18:31:06Z) · the one read after the post: OPEN, mergeable_state clean, auto-merge armed (maymun207); merge sha UNMEASURED by this reply (one read only, per the order)
GRAFT: none run (CI-log and status reads only).
PROMPTS: one. The build and guard logs were read through the sanctioned `gh api …/actions/jobs/<id>/logs`, whose redirect host productionresultssa17.blob.core.windows.net was declared.

SCOUT-STATUS-LAND-685-S170-1 · reply to ORDER-SCOUT1-LAND-685-S170-1 (id c46c8d7d-f3c2-4843-8b18-b6bb7eec26d9)
Head 9194927dcee6c6f65a3dda5c9a5ddc75eba44f46 unchanged (commits 30c415d1, 9194927d).

## 1 · The build now ran (build (24.x) job 110515566622, success 18:27:42Z)
```
[check:tenant-zero] [OK] ZERO gated-vocabulary hits in scope — 2410 files scanned (floor 400), 26 binaries skipped (counted, not silently dropped), exemptions: B-2 history only.
[check:backend-names] [OK] every (id, class) count equals data/gates/backend-names-baseline.json.
[check:doc-drift] ATTEST RUN -- base c817f8e3717395e834446415d3e701a2b06be4d2, merge-base c817f8e3717395e834446415d3e701a2b06be4d2, 14 changed path(s)
[check:doc-drift] attest docs/relay/161-RECALLED-AS-MEASURED-S170-1-AG1-report.md:125 tab='Architecture Map' -> COUNTED (matched)
[check:doc-drift] attest docs/relay/161-RECALLED-AS-MEASURED-S170-1-AG1-report.md:126 tab='Runtime Topology' -> COUNTED (matched)
[check:doc-drift] attest docs/relay/161-RECALLED-AS-MEASURED-S170-1-AG1-report.md:127 tab='Request Lifecycle' -> COUNTED (matched)
[check:doc-drift] attest docs/relay/161-RECALLED-AS-MEASURED-S170-1-AG1-report.md:128 tab='Agent Control Plane' -> COUNTED (matched)
[check:doc-drift] attest docs/relay/161-RECALLED-AS-MEASURED-S170-1-AG1-report.md:129 tab='Stage Cards' -> COUNTED (matched)
[check:doc-drift] tab 'LLM Control Surface': not touched
[check:doc-drift] tab 'Governance Model': not touched
[check:doc-drift] [OK] every touched tab is attested or its diagram is in the diff (mode=pr).
 Test Files  792 passed (792)
```
DIAGRAM-ATTEST reasons judged TRUE, each against the code I reviewed in SCOUT-STATUS-REVIEW-685-S170-1:
- Architecture Map: no component, store or edge (the same messages table, the existing MessageRepository).
- Runtime Topology: no service or connection (the same service-role client that already writes messages).
- Request Lifecycle: stage order unchanged (one best-effort read inside the grounding step, degrading to recalled null).
- Agent Control Plane: one additive done-frame key plus two chip lines, decided server-side.
- Stage Cards: no stage added, removed or reordered.
None is untrue.

## 2 · Rest of CI at the head
changes success (attempt 2, 18:17:16Z; guard: `COLLISION note — #686 (higher) has no readable fence (FENCE-SYNTAX …); it yields, not this PR`, `VERDICT GREEN`; #684 has landed) · rule26 success · relay corpus success · report-schema success · arm auto-merge success · Vercel success · SKIPPED: eval-canary.
Stop rule (AUTO-MERGE-LANDING-v1.md §(ii)): `git ls-remote origin refs/heads/master` → 0f2f2a447d67cca641f9f86180997ce7323e4e26 (read twice). Push Build and Test there: completed SUCCESS (run 36905115368). Not failure → posted.

## 3 · pulls/685, one read after the post
state open · merged false · mergeable_state clean · merge_commit_sha bf7a0541bb9470bde9be909502afb62a3fcdd7aa (GitHub's test-merge, not a landing) · auto_merge enabled_by maymun207.

## Follow-up (named, not blocking)
F-a PRECISION RESIDUAL: the recalled ledger reads messages.raw_tool_results `raw` = the server's capped client copy (rawForClient), which can carry handle records the model never read. This turn's ledger reads the SDK `returned` string (numericLedger.ts:263-264). A number from a never-read record restated by the model is therefore labelled RECALLED instead of UNSOURCED: softer, offerability-neutral, from server bytes only. Follow-up card: "persist a per-turn ledger of the SDK `returned` strings (or their numeric literals) beside raw_tool_results, and build the prior ledger from it, so recalled means 'the model saw this number before'."
