<!-- relay-audit: v1 kind=notice -->
NOTICE-SD2-D7-RULING-S165-1

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 notice" and stops). Thank you for SLIP-CARD-SD2-S164-1 — reporting the card-vs-law conflict instead of resolving it was exactly right (CLAUDE.md §7 stop 5).
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T07:16Z
PRECONDITION: branch phase/sd2-brake-notice-grouped-count-s164-2 on origin at 7f4f84b1bfef862bfa21390c14f04c5e24d9b61b. If it differs, STOP and report both shas.
ORDERING: after NOTICE-M4A-N1-N2-S165-1 (in your box before this one). PREP: NO PR.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) — SD2 is plan item 4 · §8 (deterministic vs soft) · CLAUDE.md §7.5.

## RULING ON THE BLOCK (Δ7's clause home) — ONE path
None of (a), (b), (c). The clause lives where the sentence it extends already lives: in toolCallCapMessage (burstBrakeMessage.ts), code-pinned and test-pinned, exactly like today's sentence.
WHY, measured from your report and the file:
1. burstBrakeMessage.ts:1-40 declares this text DETERMINISTIC and pinned by test ("never re-derived at a call site", the OUTAGE-TRUTH-1 requirement). The new clause ("do not say all; say how many calls were not sent") is part of the same correctness text: it stops a false "all" claim. §8: deterministic/authoritative text is code or gated; soft/learned text is data. This clause is on the deterministic side.
2. (a) breaks segmentIds.ts's closed topology and moves EVERY production turn's promptRev (the L5 guardrail's arm label) for a clause that fires only on capped turns — a guardrail regression to fix a wording defect. Refused.
3. (b) would change model-facing text without moving promptRev — an unlabelled prompt change. Refused.
4. (c) is real but larger than this card: ALL fixed model-facing tool-result texts (this one, gatewayPreflight's misroute text, and their siblings) get ONE governed home with its own version label, designed once. That is registered as its own item (A25 L265 follow-up), measured by a scout first; it is NOT built inside SD2.
CARD AMENDMENT (supersedes the v2 lines it contradicts): D2's "clause is a prompt.segment row" and FORBIDDEN's "the new model clause as a code literal" are withdrawn FOR THIS CLAUSE ONLY. It is not backend-specific text (no backend name, no vendor, no tool list), so OWNER-RULING-S153-NO-ARMES-HARDCODE-1 is untouched. Nothing else in v2 changes.

## ORDER
1. ls-remote the branch twice; clean worktree at 7f4f84b1bfef862bfa21390c14f04c5e24d9b61b.
2. toolCallCapMessage(toolName, limit, refusedCount): today's sentence byte-identical, then the count, then the clause in Turkish (and an English twin ONLY if today's function has one — it does not, so Turkish only, matching gatewayPreflight's model-facing posture). The injectable-clause parameter and the {{REFUSED_COUNT}} substitution path are REMOVED (no dead branch, §12.6). SD2-9 becomes: count 0/undefined → today's sentence exactly (the byte-pin), count ≥ 1 → sentence + count + clause (pin the full string).
3. The prompt-segment seed file leaves the diff if it was touched. burstGuardReporting.test.ts (:109, :129, :138-139) updated BY NAME to the new pinned strings.
4. Report: replace the BLOCK section with "RULED by NOTICE-SD2-D7-RULING-S165-1" and quote the ruling's point 1 in one line. FILE-FENCE: exactly ONE `FILE-FENCE:` line + `- <path>` lines equal to the diff.
5. GATES as v2 order 4 (npm run build with reseal on drift · typecheck:api · check:rule24 · check:tenant-zero · check:backend-names · relayAudit · touched suites). CI-only gates at the PR: Build and Test, Relay corpus, report-schema, rule26; eval-canary SKIPPED, named.
6. ONE new commit; plain push; ls-remote; print the head. Slip SLIP-NOTICE-SD2-D7-RULING-S165-1 (bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SLIP-NOTICE-SD2-D7-RULING-S165-1.md"). Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
NO CRON TASK. GRAFT: graft first, then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.
FORBIDDEN: a new segment id; touching segmentIds.ts or the promptRev hash; a migration; an appended brake notice; changing the cap value; changing flat-payload output; opening a PR; --force; cron.

END · NOTICE-SD2-D7-RULING-S165-1
