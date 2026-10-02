[scout-1]
ADVERSARY-VERDICT: GREEN (code) pr=686 head=7d807fc4425ac38a3a2a99f3ed14ae9169c383df · CI COMPLETE and RED by the merge guard: FENCE-SYNTAX on the report's own fence entry `api/admin/rules/[id].ts` (class a, author's branch, report-only fix) · build and rule26 SKIPPED (code never built or tested in CI) · no adversary/scout posted
GRAFT: none run (graft indexes the stale local clone). The diff was read with `git diff c817f8e3…7d807fc4` / `git grep 7d807fc4`.
PROMPTS: one. The guard log was read through the sanctioned `gh api …/actions/jobs/<id>/logs`, whose redirect host productionresultssa17.blob.core.windows.net was declared.
CORRECTION to my SCOUT-STATUS-WHY-680-S170-1: #680 MERGED at 2026-10-01T17:21:44Z as c817f8e3717395e834446415d3e701a2b06be4d2 (gh pr view 680). It landed during or just before my last reads there, so the "not merged" state resolved itself, and the cause remains unmeasured.

SCOUT-STATUS-REVIEW-686-S170-1 · reply to ORDER-SCOUT1-REVIEW-686-S170-1 (id e6c47826-16e0-4615-9238-b9a3426d21f3)
Head 7d807fc4425ac38a3a2a99f3ed14ae9169c383df (1 commit), base and merge-base c817f8e3717395e834446415d3e701a2b06be4d2 = master.

## Code review vs my A1–A9: GREEN
- A8: governance.ts's prompt.segment Layer 2 block is untouched in the diff (the routing arm is inserted AFTER it, and the publish-row golden detail is unchanged). A test pins the block against master ("governance.ts still carries the prompt.segment block exactly as master had it").
- A1 THE HASH BINDS THE DRAFT: the exam side (runExam buildExamCandidate) hashes `buildCandidate(getPublishedRules([draft.backend_id]) → {kind_id,key,payload}, draft)` filtered by sameRoutingFamily. The publish side (governance.ts) hashes `gate.candidate`, which is buildCandidate over `this.repo.getPublishedRules([backend]).map(toRuleInstance)` (:382), with the SAME routingCandidateHash and the SAME filter. Same function, same rows, same fields; a stale hash REJECTS. The candidate VIEW really carries the draft: withCandidateRule proxies getPublishedRules only, and both candidate resolvers read published rows ONLY through getPublishedRules (resolveToolCategories.ts:186, entryFloor.ts:111), so no silent fall-through to published. Tested: "an interleaved publish in the family flips it" and "A1: the same run after an interleaved publish → REJECTED".
- A2: decideRoutingExamPublish's only score block is `candidate.rate < published.rate - deltaRecall`, reached only when both arms have n ≥ nMin and non-null rates. FirstCall-Hit@1 and honesty never enter (test: low hit/honesty with held coverage → ALLOWED). No absolute bar.
- A3: `exam:no_jurisdiction` → ALLOW, audited `{exam:'no_jurisdiction'}` on the publish row, with a UI panel saying so (routing_obligation, metric_registry, gateway_tool_policy, `agent.param` keys under `router.`).
- A4 / §13.1: routing-ness is data (index.json `routingExam`), matched by family suffix in shared/backendData.ts routingExamJurisdiction. A test asserts no kind-id or family literal in the gate path.
- A6: an empty or below-nMin set → `{exam:'unmeasured', underpowered:true, n, labelled, nMin}`; an unread set adds `examSet:'unread', examSetReason`.
- A7 (register 96): golden-runs.ts returns `runnerEnabled` (resolveGoldenRunnerEnabled). GovernanceTab shows "Golden runner disabled (golden.enabled=0) — a started run will not progress", and null renders "unread", never "enabled". The publish history carries an exam badge.
- Fence growth (report :208-214, 8 entries): rules/[id].ts (carries examRunId), golden-runs.ts (A7), adminStore.ts (the tab's publish), backendData.ts (the shared rule), the baseline (the system cell) and three tests are all needed. Baseline: only `system` tests 871→874 plus a per-file line; no vendor id moves.
- DIAGRAM-ATTEST (report :196-200): true for Architecture Map, Request Lifecycle, LLM Control Surface and Agent Control Plane. Governance Model is honest but thin: it says the drawn Layer-2 statement still holds and the routing arm "is not drawn yet and is named in the dark section". The diagram is now INCOMPLETE rather than wrong; acceptable under the attest only because the report names it.

## Findings (non-blocking)
F1. FAIL-OPEN ON A READ OUTAGE: readRoutingExamContext returns labelled 0 when the exam set cannot be read, so an outage ALLOWS every routing publish as `exam:unmeasured` (audited WITH the reason). This is the contract's "could not judge never blocks", but it means an outage disables the gate; worth one line in the report.
F2. `labelled` counts `acceptable !== null`, including labels with an empty tools list, while the keyword arm scores only with-tools labels. The gate can therefore demand a run that then comes back unmeasured. Harmless; count with_tools instead.
F3. The UI labels the exam run id "optional". That is true only while the set is below nMin; once labelled, a routing publish without it REJECTS. The text should say so.
F4. Bulk publish and the rollout-complete path pass no examRunId (named by the report :207), so they will reject routing drafts once sets are labelled.
F5 (GUARD, not this PR): mergeGuard.mjs:105 `/[*?[\]{}!]/` refuses any literal path containing `[` or `]`, so a Vercel dynamic route like `api/admin/rules/[id].ts` cannot be fenced by name at all. Follow-up: allow `\[`-escaped or exact-path entries that exist in the diff.

## CI at 7d807fc4425ac38a3a2a99f3ed14ae9169c383df (read once)
changes FAILURE · relay corpus success · report-schema success · arm auto-merge success · Vercel success · SKIPPED: build, rule26, eval-canary. The backend-name and tenant-zero steps (inside build) are UNMEASURED.
```
[merge-guard] pr #686 base c817f8e3717395e834446415d3e701a2b06be4d2 head 7d807fc4425ac38a3a2a99f3ed14ae9169c383df merge-base c817f8e3717395e834446415d3e701a2b06be4d2
[merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head
[merge-guard] FAIL FENCE-SYNTAX — FENCE-SYNTAX 'api/admin/rules/[id].ts': globs are not in the dialect; name literal paths or dir/ prefixes
[merge-guard] timeline ok — 3 events, no reopen, no force-push
[merge-guard] COLLISION: 2 other open PR(s) against master (plant heads ignored)
[merge-guard] COLLISION UNMEASURED against #684 — this PR has no valid fence
[merge-guard] COLLISION UNMEASURED against #685 — this PR has no valid fence
[merge-guard] VERDICT RED — FENCE-SYNTAX
##[error]Process completed with exit code 1.
```
Class (a): the author's own report fence. Rule: scripts/mergeGuard.mjs:105-106.
REPAIR (AG-4), report-only: in docs/relay/E2-K34-PUBLISH-GATE-S170-1-AG4-report.md's FILE-FENCE, replace `- api/admin/rules/[id].ts` with `- api/admin/rules/` (a dir prefix, which the dialect allows; the directory holds only [id].ts and bulk-publish.ts). FENCE-GREW will not refuse it: the guard walks past a first commit whose fence fails VALIDATION (mergeGuard.mjs:463-477, "Only the no-fence and validation classes keep walking"), so the repaired commit becomes the first valid fence. After that push the guard measures COLLISION against #684/#685 for the first time, and build runs for the first time.
