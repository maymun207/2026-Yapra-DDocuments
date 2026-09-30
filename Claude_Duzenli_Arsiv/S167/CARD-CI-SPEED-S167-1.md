<!-- relay-audit: v1 kind=card -->
CARD-CI-SPEED-S167-1

LANE: AG-3 (the AG-3 window ONLY; any other window prints "NOT MINE: AG-3 card" and stops). First line of every message: `[AG-3]`. Built from YOUR SLIP-ORDER-MEASURE-CI-SPEED-S167-1 (full text: "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S167/SLIP-ORDER-MEASURE-CI-SPEED-S167-1.md") — your measurement, your design, carried with credit.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T21:22Z
PRECONDITION: master = your `git ls-remote origin refs/heads/master` (1f694e1ff47d84d6e7b321e332446519f443b1f0 at 21:17Z). vitest.config.ts:9 environment 'jsdom' for every include; :10 setupFiles ./src/test/setup.ts; :11 include; pool/isolate/maxWorkers unset (vitest 4.1.9 defaults: forks, isolate true, workers = cores − 1 → 3 on CI). CI "Run tests" = `npm run test` (build-test.yml:439): 744 s on master 5e6e691f, 969 s on PR 654 head (jobs API).
ON-DISAGREEMENT: if the config lines or the defaults are not what you read, quote what is and stop.
WHY: owner, 2026-09-30 23:59 TSİ: "18 dk cok uzun degil mi?" Every code PR waits 14–18 min on CI. AG-3 measured that ~77% of test CPU is per-file overhead, not test bodies, and that 615 api/shared files run under jsdom although none touches a DOM global; api+shared under node at 3 workers: 103.9 s → 48.3 s with IDENTICAL failed sets. Plain words: most of the quarter hour is the test runner building a fake browser for tests that never use one.
AUTHORITY: OWNER-APPROVAL-S167-CI-SPEED-1 ("onay CI-hiz", 2026-10-01 00:02 TSİ) · §12.1 NEW subject → scout pre-review before this card is sent.
```evidence:adversary
ADVERSARY: PENDING
why: scout-1 pre-reviews this card under ORDER-SCOUT-PREREVIEW-CI-SPEED-S167-1; sent only as v2 carrying the verdict.
```
LAWS KEPT: S37-2 — one `vitest run`, one job, the full suite at the PR head; nothing selected, skipped or sharded; no assertion edited; no workflow edit; no paid runner. isolate stays true; environment for UI tests stays jsdom.
NO CRON TASK. GRAFT: graft first; the slip carries `GRAFT:` and `PROMPTS:` lines (NOTICE-PROMPT-HYGIENE-S167-1). SECURITY: never print, echo, printenv or cat any environment variable.
UI/UX (§13.3): none — test infrastructure only; say so in the report.

## WORK (push-first)
C1. vitest.config.ts → `test.projects`: "node" = api/**/__tests__/**/*.test.ts + shared/__tests__/**/*.test.ts, environment 'node', pool 'threads', same setupFiles; "dom" = src/**/__tests__/**/*.test.{ts,tsx}, environment 'jsdom', pool as today. Top level: maxWorkers 4. Coverage block and thresholds unchanged. The one existing `// @vitest-environment node` pragma (fixtureMcpServer.test.ts:1) stays harmless.
C2. COUNT PARITY (the split's real risk): at the same tree, old config vs new report the SAME file count and test count; print both. A file in neither include fails the card.
C3. laneBootOneCommand.test.ts and mergeGuard.test.ts: build the fixture git repo ONCE (beforeAll) and copy it per test (same bytes, same assertions) — only if C1 alone does not bring the CI "Run tests" step under 480 s; say which in the report.
C4. PLANTED FAULTS: one in a module the node project covers (e.g. an api/admin handler returns 500), one in a src/components/admin component (drop a rendered label): the full run goes RED in each project; revert; quote both.
C5. THE MEASURE THAT CLOSES THE CARD: the "Run tests" step time on THIS PR's own CI run, read from the jobs API by full head sha, reported against 480 s. Under 480 s is the exit; over it → C3, push, read again.
SIDE FINDING (yours): a test WRITES docs/ground/authority-conformance.latest.md during `vitest run`. Name the test (file:line) in the report; do NOT fix it here (own card).
FENCE: vitest.config.ts · (C3 only) api/cwf/__tests__/laneBootOneCommand.test.ts, api/cwf/__tests__/mergeGuard.test.ts · docs/relay/CI-SPEED-S167-1-AG3-report.md.

## STEPS
1. `git ls-remote origin refs/heads/master` (twice). Worktree `phase/ci-speed-s167-1` at master (if the sandbox refuses a worktree again, use the shared-clone copy as you did and say so).
2. C1, C2; first commit + push + `gh pr create --base master` within 10 minutes.
3. C4; report; push. C5 from the PR's CI; C3 only if needed.
4. Slip SLIP-CARD-CI-SPEED-S167-1 (bus; `[AG-3]`, `GRAFT:`, `PROMPTS:`, the measured "Run tests" seconds). Back to `node scripts/mail-wait.mjs AG-3 --budget-min 480`.
BUDGET: first push ≤ 10 min; whole card ≤ 60 min.
FORBIDDEN: isolate:false; happy-dom; test selection/sharding; workflow edits; assertion edits; --force; merging; cron; printing an environment value.

END · CARD-CI-SPEED-S167-1
