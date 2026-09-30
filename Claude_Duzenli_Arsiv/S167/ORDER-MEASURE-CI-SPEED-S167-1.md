<!-- relay-audit: v1 kind=notice -->
ORDER-MEASURE-CI-SPEED-S167-1

LANE: AG-3 (the AG-3 window ONLY; any other window prints "NOT MINE: AG-3 order" and stops). First line of every message: `[AG-3]`. If CARD-INBUCKET-S167-1-v2 reaches your box first, finish THIS order first, then the card.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T21:05Z
PRECONDITION: master = your `git ls-remote origin refs/heads/master` (5e6e691fe9ea98b17e2a0f2e78f14802c750ae64 at 21:00Z, or later).
WHY (MEASURED by the Architect from the GitHub jobs API): Build and Test's "Run tests" step (`npm run test` = `vitest run`, 775 test files, ubuntu-latest) took 969 s on PR 654 head d4e441ec3cf9e6238c765cdd08d3814dc0e47439 and 744 s on master 5e6e691fe9ea98b17e2a0f2e78f14802c750ae64; the Build step takes 48–57 s; rule26 ~6.5 min runs in parallel. CI-DIET only skips non-code PRs, so every code PR waits ~14–18 min. Plain words: every landing waits a quarter of an hour on the test suite; the owner wants it under 8 minutes.
CONSTRAINTS (laws, not preferences): S37-2 — the UNSHARDED full suite at the PR head stays the single test arbiter, so no test selection, no skipping, no sharding across jobs; no assertion loosened; no bigger paid runner (spend).
AUTHORITY: OWNER-APPROVAL-S167-CI-SPEED-1 ("onay CI-hiz", 2026-10-01 00:02 TSİ).
NO CRON TASK. GRAFT: graft first; your slip carries a `GRAFT:` line. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER — measure and propose, change nothing
1. In a scratch worktree at master: `npx vitest run --reporter=json --outputFile=<scratch>/vitest-durations.json` ONCE (proof budget). Print total wall time, the number of files, and the TOP 25 files by duration (path, seconds, test count) and what share of the total they are.
2. Read vitest.config.ts: print pool, isolate, fileParallelism, maxWorkers/threads, setupFiles, environment per include (jsdom vs node) — file:line. Measure the Mac's core count and state that CI (ubuntu-latest, public repo) has 4 vCPU.
3. For the top 25: name the cause class per file (real sleeps/timers, jsdom where node would do, repeated heavy imports/setup, spawned processes/tsc/build inside a test, network waits, large fixtures) with file:line.
4. PROPOSE ONE design (not a menu) reaching < 8 min on 4 vCPU without weakening a single assertion — e.g. per-folder environment (node for api/**), pool/isolate settings, fake timers for real sleeps, shared expensive setup — with the expected saving per change, measured or estimated (label which). Name the files a card would touch and the planted fault that proves the suite still catches a failure.
5. Slip SLIP-ORDER-MEASURE-CI-SPEED-S167-1 (bus; `[AG-3]`, `GRAFT:` line); if over 8192 chars, full text to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S167/SLIP-ORDER-MEASURE-CI-SPEED-S167-1.md" and a summary on the bus. Remove your worktree. Back to `node scripts/mail-wait.mjs AG-3 --budget-min 480`.
BUDGET: ≤ 30 minutes.
FORBIDDEN: any commit, push, PR, merge, workflow edit, cron; printing an environment value.

END · ORDER-MEASURE-CI-SPEED-S167-1
