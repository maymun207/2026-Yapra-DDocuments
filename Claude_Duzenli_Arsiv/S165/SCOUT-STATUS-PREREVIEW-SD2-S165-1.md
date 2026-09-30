PREREVIEW-VERDICT: RED branch=phase/sd2-brake-notice-grouped-count-s164-2 head=1ef841865dc786ea527331dc6adbaa6a441f5908
SCOUT-STATUS-PREREVIEW-SD2-S165-1 · from scout-1 · reply to ORDER-SCOUT-PREREVIEW-SD2-S165-1 (id de1c25c0-d987-4a50-aee5-5ba7462f739e, DIGEST-OK). PRE-REVIEW ONLY — no status posted.
RED ON ONE WORD (Δ-1 below). Everything else GREEN, the D7 ruling included.

BACKUP DUTY: not needed. PR 647 head 794be5a81b956937eee1a25d0fdeedc2eecde235 had no adversary/scout at 07:32:28Z; a watch polling every 60 s saw scout-2's adversary/scout land at 07:33:46Z (before the 07:42:12Z threshold). Nothing posted by scout-1.

1 · HEADS (fetch, then ls-remote): master 763a54bc551572137276afa6cc55446e80c934cc · phase/sd2-brake-notice-grouped-count-s164-2 1ef841865dc786ea527331dc6adbaa6a441f5908 = the precondition. TWO commits on parent 61e7f368604ffdd86b8841d9063e540641d42efc: 7f4f84b1bfef862bfa21390c14f04c5e24d9b61b (card v2) then 1ef84186 (the ruling's "ONE new commit" — authorised, named). 13 files, +568 / -56.

2 · vs CURRENT master 763a54bc: `git merge-tree --write-tree` → CLEAN (tree 7938a8a1), no conflicted path. RESEAL AT THE SLOT: not needed against 763a54bc — MEASURED in a scratch worktree at 763a54bc with both commits applied (cherry-pick -n 61e7f368..1ef84186): check:doc-drift [OK] 7 tabs, gen:arch-facts "left unchanged". If SD1 / M3 / M4a land first, manifest.json will conflict; take master's and `npm run reseal`, one step.

3 · THE RULING (NOTICE-SD2-D7-RULING-S165-1) — GREEN, premises verified at 763a54bc:
- P1 burstBrakeMessage.ts:2-7 "The exact, deterministic tool-result text … Pinned by test, never re-derived at a call site". Readers of the text (git grep toolCallCapMessage + the sentence, over api src shared scripts data supabase): ONLY stageTools.ts:1667 (the cap arm) and burstGuardReporting.test.ts; the user-facing chip is composed from the ledger's brake records, not this text (burstBrakeMessage.ts:26-28). No reader treats it as governed data.
- P2 segmentIds is a CLOSED set: api/cwf/_lib/prompt/core/segmentIds.ts:15 `export const SEGMENT_IDS = [`; coreSchemas.ts:224 `segmentId: z.enum(SEGMENT_IDS)`; promptSegmentSchema.test.ts:26 `toHaveLength(20)`.
- P3 promptRevFrom (resolvePromptSegments.ts:95-103) hashes EVERY id in SEGMENT_IDS order → a 21st segment moves every turn's promptRev; promptRev is the L5 guardrail's arm label (stageStream.ts:884-885).
- Trap check: examScorers.ts reads no promptRev; goldenRun.ts:374 hashes candidate SEGMENTS only. Keeping the clause in code means it is versioned by deploy sha, not promptRev — exactly today's sentence and gatewayPreflight's misroute text. Consistent, not a trap. The (c) follow-up (one governed home for all fixed tool-result texts) is the right place to change that.

4 · CARD FIDELITY at the head
- Δ6 GREEN · partialRead.ts: reasonSource 'toolLedger.brakes' → 'ToolResultMeta' with the reason in the comment; NO appended notice (stageStream.ts not in the diff). SD2-2 partialReadDisclosure.test.ts:114.
- Δ7 + ruling GREEN except Δ-1 · toolCallCapMessage(toolName, limit, refusedCount?) (burstBrakeMessage.ts:48): today's sentence byte-identical, then "Bu turda bu araç için gönderilmeyen çağrı sayısı: N." then the clause; count undefined or < 1 → today's sentence exactly. The injectable-clause parameter and the {{REFUSED_COUNT}} path are GONE (git grep REFUSED_COUNT|clauseTemplate|injectClause over api src shared → 0 hits); no prompt-segment seed file in the diff. stageTools.ts:1667-1671 passes the running count from the per_tool_calls brake for this tool (recorded before the message is composed, so the first refusal reads 1). SD2-9 burstGuardReporting.test.ts:146-155: TODAY is a literal equal to master's sentence; (list_charts,2) / undefined / 0 → TODAY. SD2-1 perToolCapCount.test.ts:136-142 pins results[2] = (TOOL,2,1) and results[4] = (TOOL,2,3).
- Δ8 GREEN · toolResult.ts: `groupsOf` imported; total = SUM when ≥ 2 groups; returnedInline = total − picked + kept (= SUM when all inline, the rows shown when cut); handle registers every row tagged `_group`; fields/fieldSummaries/sample from the same rows; `groupCounts` on both paths; groundingCheck.ts adds every group count to knownCounts and parseToolResultMeta keeps a map only when every value is a number; types.ts ToolResultMeta.groupCounts.
- Δ9 GREEN · inlineAggregates.ts: groupsOf EXPORTED, body unchanged (sibling groups only); no nested-shape rule anywhere in the diff; SD2-5 pins "a data-key array whose records each carry one array is NOT read as groups".
- D4 GREEN · report :75 — findRecordGroups not changed; client {"unit_a":24,"unit_b":24,"unit_c":23} = server. Replay note present (:74).
- FORBIDDEN GREEN · no appended notice, no nested rule, no second walker, cap value untouched, no migration, no new segment id, segmentIds.ts / promptRev untouched.

Δ-1 (RED, paste-ready) — the clause drops "hepsi". Card v2 D2 gives the clause as "yanıtta 'tümü/hepsi' deme; kaç çağrının gönderilmediğini söyle", and register 61 is literally the prose saying "hepsi / all". The head says only "tümü".
  api/cwf/_lib/turn/burstBrakeMessage.ts:55:
    + ` Yanıtında "tümü" deme; ${refusedCount} çağrının gönderilmediğini söyle.`
  →
    + ` Yanıtında "tümü" ya da "hepsi" deme; ${refusedCount} çağrının gönderilmediğini söyle.`
  and the two full-string pins in api/cwf/__tests__/burstGuardReporting.test.ts :160 and :163 get the same words (perToolCapCount.test.ts compares through the function, so it follows). One more commit on the branch; fence unchanged (both files already in it).

5 · REPORT: EXACTLY ONE line that is exactly `FILE-FENCE:` (:175) + 13 `- <path>` lines (:176-188) = `git diff --name-only 61e7f368..1ef84186`, same set → blocks 1, problems none, diff-not-fence ∅, fence-not-diff ∅. FENCE-GREW: the first commit's fence (7f4f84b1 report :153-166) is the same 13 paths; the ruling commit touched 5 paths, all inside it → "FENCE-GREW ok". Hex scan: every 7–39 run inside evidence:card / evidence:gates / evidence:gates-d7 fences; none in prose. relayAudit [OK].

6 · SCRATCH WORKTREE (head, then master + both commits; removed afterwards)
- head: vitest inlineAggregates, burstGuardReporting, partialRead*, groundingCheck, perToolCapCount, toolResult → 10 files, 230/230 · typecheck:api exit 0.
- PLANT (card's): `total = grouped ? groups[0][1].length : …` (first group only) → inlineAggregates 6 FAILED incl. SD2-3 at :55 and :74 "expected 24 to be 71", SD2-6/7/8 and the grouped byte-pin (:226). Reverted → green.
- master 763a54bc + SD2: 10 files 230/230 · doc-drift OK · facts unchanged · check:backend-names OK (unchanged baseline) · check:tenant-zero OK 2353 · check:rule24 OK.

7 · CI PREDICTION: Build and Test / Relay corpus / report-schema — no predictable trip (measured above). rule26 WILL RUN (public/architecture/manifest.json in the diff → CI-DIET ui=true); not measurable here (Playwright needs a local port the sandbox refuses). eval-canary SKIPPED by design. The PR carries two commits and no in-branch merge → CLEAN-MERGE is unaffected.

UNMEASURED: rule26 e2e; full vitest suite (touched suites only).
Forbidden kept: no status posted, no edit to the branch, push, merge, re-run, cron. No environment value printed.
