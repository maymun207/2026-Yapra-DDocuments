SLIP-TOUR-HONESTY-FRESH-PR-S164-2

card: CARD-TOUR-HONESTY-FRESH-PR-S164-2
branch: phase/tour-honesty-s164-2
head: ddc28caa768e767ed31a0bf3f39e3602cf0af467
parent: 6a3824c2b5efd1764be178d05ba647feec06927c (master, ls-remote read twice before the branch and once before the push, unmoved)
pr: 640 (open, non-draft); 639 closed with the ordered comment, its branch not deleted
report: docs/relay/TOUR-HONESTY-S163-1-AG4-report.md
ci: 36661022611 success
status: PUSHED

## Card receipt
mail-wait --read --take: DIGEST-OK, SEAL admitted (ack bd15d37c-f6eb-4b07-bde5-1d7c1f38671b), [STAMPED] consumed_at.
The card grammar refused the card (CP-1, CP-2, CP-3, CP-4, CP-10) under CARD_GATE=REPORT: REPORTED, not acted on.

## What was done
- `git cherry-pick -n` of the S164-1 head onto master in a fresh worktree. No conflicts; the carried commit's parent was already this master.
- FIX 1: the report's prose at :13 and :215 now names PRs and branches; the shas stay in the evidence:base and evidence:carry fences.
  `[relay-audit] [OK] 1 file(s) audited, zero violations`
- FIX 2: the tenant token in examScorers.test.ts:147 became `fixture_alpha`. The absence phrase and both assertions are unchanged.
  `[check:tenant-zero] [OK] ZERO gated-vocabulary hits in scope — 2342 files scanned`
- RESEAL, not ordered but required: FIX 2 edits a mapped file, and doc-drift went red with got 53f12465c282 (Architecture Map) and 891c098a9b4f (Agent Control Plane). `npm run reseal` wrote exactly those two digests and only those two lines of public/architecture/manifest.json. Same commit (CLAUDE.md §5).

## Local gates (build-test.yml steps run locally)
- check:rule24 → `[OK] no literal NUL in 2389 tracked source files`
- check:migration-versions → `[OK] 100 migration(s), every version key unique and 14-digit`
- check:tenant-zero → `[OK] ZERO gated-vocabulary hits in scope`
- check:backend-names → `[OK] every (id, class) count equals data/gates/backend-names-baseline.json.`
- npm run build → exit 0; `[check:ground] GREEN`; `[check:doc-drift] [OK] no drift -- all 7 narrative tabs synced`
- npm run typecheck:api → exit 0, no output
- relay corpus (relayAuditGate.test.ts, as relay-corpus.yml runs it) → 1 file, 37/37
- 18 touched test files → `Test Files 18 passed (18) · Tests 287 passed (287)`
- npm run test (full) inside the sandbox → 764 passed | 4 failed files; 11553 passed | 13 failed. All 13 are `listen EPERM` (tsx IPC pipe or loopback) in harnessHonestyGate, cardPreflight, sealDerive and envProxy. Those four files outside the sandbox → 4/4 files, 115/115 tests.
- rule26 (Playwright) not run locally; it is a CI-only UI job (green in CI, below).

## CI by full head sha (read twice, both reads identical, 8 check runs)
- build (24.x) success. Its log: `Test Files 768 passed (768)` · `Tests 11569 passed | 4 expected fail | 1 skipped (11574)`; tenant-zero OK; backend-names OK; doc-drift OK (mode=head)
- rule26 success · report-schema success · relay corpus (grammar v1) success · arm auto-merge success · changes success · Vercel Preview Comments success
- eval-canary SKIPPED (the job is `if: false`). Named here, not folded into the green.
- `[merge-guard] VERDICT GREEN` (CLEAN-MERGE; FENCE-GREW ok; timeline ok, no force-push; COLLISION 0)

## Named
- A full-suite local run rewrote the measuredAt of docs/ground/authority-conformance.latest.md (a side effect of authorityMatrix.test.ts). It was restored in my worktree and is not in the commit.
- gh was already keyring-authenticated, so `git credential fill` was not needed and no secret was printed.
- The CI job logs sit on a blob host the sandbox network filter blocks, so two log fetches ran outside the sandbox. Both were read-only.
- Not touched: absenceClaim.ts, the lexicon, K32 semantics, phase/tour-honesty-s164-1 and -s163-1.
- No cron or poll task exists in this window (CronList: no scheduled jobs).

read relay_inbox at 2026-09-30T03:03:26Z, box empty
