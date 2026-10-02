[scout-1]
ADVERSARY-VERDICT: GREEN pr=680 head=7034411abe9548f9c7f1778fd8d1ef2b1eb50a29 · CI COMPLETE and green at the head (not WAITING-CI) · no adversary/scout posted (this order forbids it)
GRAFT: none run (graft indexes the stale local clone). The diff was read with `git diff 648c61d6…7034411a` / `git grep 7034411a`; live rows via scripts/roQuery.ts (read-only).
PROMPTS: one. The guard log was read through the sanctioned `gh api …/actions/jobs/<id>/logs`, whose redirect host productionresultssa17.blob.core.windows.net was declared.

SCOUT-STATUS-REVIEW-680-S170-1 · reply to ORDER-SCOUT1-REVIEW-680-S170-1 (id b4d8efab-2731-413d-82fb-7ac4b173a187)
Head 7034411abe9548f9c7f1778fd8d1ef2b1eb50a29 as the card says (2 commits: 1d320a85 code, 7034411a report attest), base 648c61d6384942ab532444be252422ed9e37c02b. Master now 45049b1f9a891c2405fc0f317d24f861a52d84c2.

## Code review vs my A1–A7: GREEN
- A1 REUSE (12.6): no new instrument. examRun.runExam gains `arm` and `noAudit` deps; examScorers.keywordArmCoverage gains `arm`; scripts/runExam.ts gains `--arm a|b`, `--no-audit` and `--recall-table`; scripts/recallExamTable.ts is a pure table builder over runExam evidence. DEFAULT = MASTER in writes: arm defaults to 'a', and `if (!deps.noAudit) await deps.writeAudit(...)` keeps master's one replay_audit row. examAuditRow is untouched. (The printed header gains "— arm a —" and an audit line; text only.) `--recall-table` REFUSES to run without `--no-audit`. `npm run exam:recall` = `… scripts/runExam.ts --recall-table --no-audit`.
- Arm (b): routeKeywordLayer with an EMPTY learned map, unioned into the offer. That is the production matcher reached through the same core, not a second copy (the toolCategories.ts keywordArmAllPaths block semantics).
- A2: no tool-level "Recall@k" is printed. The table names KeywordArm-Coverage, FirstCall-Hit@1, offered p50/p95 and interference, and states "tool-level Recall@k is not printed: no per-utterance expected-tool labels exist" (recallExamTable.ts:40).
- A3: rateCell/sizeCell print `UNMEASURED (n=<n> < n_min=<n_min>)` below n_min, never 0. Each set row prints n, labelled and with_tools. An all-unmeasured run exits 2 with "EVERY RATE IS UNMEASURED …".
- A4: under arm b every turn is `frame: 'unrecorded'` and the report prints `frame: unrecorded → matrixReplace effect UNMEASURED on <n> turn(s)`. RecordedTurn carries no IR frame, which is true by construction.
- A5: per-tool attribution through backendsForTools (cached). Any label or offered tool resolving to >1 backend → excluded 'multiple'; none → 'unattributed'. The entry floor is excluded from the offer for interference. `multipleExcluded` is counted per group.
- §13.1: `git grep` of the 4 changed code files for every registry id → 0 hits.
- A6 / the missing live table: HONEST AND NAMED, and not a landing blocker by the card's bytes. A6 reads "OUTPUT: JSON plus markdown under docs/ground/ carrying the groundContract stamp (…provenance `MEASURED:npm run exam:recall …`, commit = HEAD ancestor…) … passing `npm run check:ground`". That specifies what the instrument WRITES, and recallExamTable does exactly that (RECALL_EXAM_PROVENANCE = 'MEASURED:npm run exam:recall', buildStamp, exam_basis 'held-out'). A3 adds "The report states that a K41 default decision cannot be taken from this table until the owner assigns and labels held-out turns". The report's F-a states the BLOCK (no service env, `.env.local` absent, GM-1 refusal quoted) and refuses to commit a MEASURED: stamp nobody measured. That is the correct call.
- WHAT THE TABLE WOULD SAY, measured now from this window: golden_specimens = 20 rows, ALL exam_set 'unassigned', labelled 0, with_tools 0. calibration, acceptance, regression and profile-dev are EMPTY, so the first `npm run exam:recall` will print every cell UNMEASURED and exit 2, exactly as F-a predicts. Committing it changes no decision until the owner labels turns.
- DIAGRAM-ATTEST (report :107-108): Architecture Map and Agent Control Plane are true. It is an offline replay-module change with no turn-path, store or edge change.

## CI at 7034411abe9548f9c7f1778fd8d1ef2b1eb50a29 (read once)
build (24.x) success · rule26 success · changes success · relay corpus success · report-schema success · arm auto-merge success · Vercel success · SKIPPED: eval-canary.
Guard (that run, 15:45Z, against the open set of that time):
```
[merge-guard] pr #680 base 648c61d6384942ab532444be252422ed9e37c02b head 7034411abe9548f9c7f1778fd8d1ef2b1eb50a29 merge-base 648c61d6384942ab532444be252422ed9e37c02b
[merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head
[merge-guard] FENCE-GREW ok — head fence is held by the first fence, at 1d320a856bd9df4a3dd9c2f42a13b115bee2faff
[merge-guard] timeline ok — 4 events, no reopen, no force-push
[merge-guard] COLLISION: 7 other open PR(s) against master (plant heads ignored)
[merge-guard] COLLISION ok against #673 — fences disjoint
[merge-guard] COLLISION ok against #674 — fences disjoint
[merge-guard] COLLISION ok against #675 — fences disjoint
[merge-guard] COLLISION ok against #676 — fences disjoint
[merge-guard] COLLISION ok against #677 — fences disjoint
[merge-guard] COLLISION ok against #678 — fences disjoint
[merge-guard] COLLISION ok against #679 — fences disjoint
[merge-guard] VERDICT GREEN
```
TODAY'S open set (gh pr list) is 680 and 683. 683's 18 paths and 680's 7 paths are disjoint (read from pulls/*/files); the guard has not re-run against 683.
Mergeability: pulls/680 → mergeable=true, mergeable_state=blocked (awaiting the adversary context; not a conflict).
STALENESS: 680 was cut at 648c61d6; master is 45049b1f after 4 landings. `git diff --name-only 648c61d6 45049b1f` over 680's paths and every module it imports (api/cwf/_lib/replay, scripts/runExam.ts, scripts/recallExamTable.ts, package.json, shared/examSets.ts, scripts/groundContract.ts, toolCategories.ts, BackendToolsRepository.ts) → EMPTY. The landings did not touch what 680 builds on. Its green CI certifies 680-on-648c61d6, not 680-on-45049b1f; strict up-to-date is off, so the merged tree is first tested by master's push run.
