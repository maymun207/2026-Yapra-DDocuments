[AG-3] SLIP-ORDER-MEASURE-CI-SPEED-S167-1

card: ORDER-MEASURE-CI-SPEED-S167-1 (id 059c076e-3160-4b81-8822-17f5825c2488, digest OK, stamped)
tree measured: master 5e6e691fe9ea98b17e2a0f2e78f14802c750ae64 (precondition held at read time)
status: measured and proposed; nothing changed — no commit, push, PR, workflow edit or cron.

GRAFT: graft skeleton scripts/mail-wait.mjs · graft skeleton scripts/laneSlip.mjs · graft skeleton vitest.config.ts
(no definitions indexed) · graft skeleton src/test/setup.ts · graft grep "@vitest-environment" (1 hit:
api/cwf/__tests__/fixtureMcpServer.test.ts:1). Graft does not index node_modules, workflow YAML or most test
bodies' call sites, so the rest is `git grep <sha>` against master and sed reads — named per claim below.

## How it was measured, and what is dark

- The scratch worktree was REFUSED by the sandbox (`.git/worktrees` not writable). I did not route around it:
  the tree is a `git clone --shared --no-checkout` of the shared clone into scratch, checked out at 5e6e691f,
  with the shared `node_modules` symlinked in (package-lock.json byte-equal to master's).
- Local Node is 26.4.0; CI tests on 24.x (.github/workflows/build-test.yml:350). The shared clone's HEAD was
  d768bc29 (stale); every file:line below was re-read at 5e6e691f with `git grep <sha>`.
- 16 tests in 5 files FAIL LOCALLY ONLY because the sandbox forbids local listen (tsx IPC pipe / 127.0.0.1
  `listen EPERM`): cardPreflight, envProxy, harnessHonestyGate, mcpIsErrorPassthrough, sealDerive. Their
  durations are UNMEASURED (they fail fast). I did not disable the sandbox.
- Proof budget: the full suite was run ONCE to completion (a first attempt on a `git archive` copy was aborted
  in its first minute: not a git repo, so git-based tests could not run). The A/B numbers below come from
  PARTIAL runs (api/admin and api+shared only), which is where the design's claim lives.

## 1 · The full run (M4 Pro, 14 cores, default workers = 13)

wall 65.70 s · CPU user 571.66 s + sys 141.34 s = 713 s · 778 files · 11,792 tests (11,772 pass, 16 sandbox-fail)
Sum of per-file TEST time = 164.8 s, i.e. only ~23% of CPU. The rest is per-file overhead:
environment (jsdom), transform/import, setup. That overhead, not test bodies, is the cost.

Top 25 by file duration (seconds · share of the 164.8 s per-file sum · tests):
 1 29.16 17.7% 26  api/cwf/__tests__/laneBootOneCommand.test.ts
 2 13.72  8.3% 88  src/components/admin/__tests__/replayTab.test.tsx
 3 13.15  8.0% 34  api/cwf/__tests__/mergeGuard.test.ts
 4  6.95  4.2% 35  src/components/admin/__tests__/StagesTab.test.tsx
 5  4.83  2.9% 24  src/components/admin/__tests__/mcpSettingsTab.test.tsx
 6  4.22  2.6% 11  src/components/admin/__tests__/governanceSurfaceSplit.test.tsx
 7  3.88  2.4% 11  src/components/admin/__tests__/governanceReadyEditTruth.test.tsx
 8  3.72  2.3%  8  src/components/admin/__tests__/AdminPanel.test.tsx
 9  3.46  2.1% 19  src/components/admin/__tests__/oa10UiHome.test.tsx
10  3.25  2.0% 14  api/cwf/__tests__/docDriftAttest.test.ts
11  2.78  1.7% 21  src/components/admin/__tests__/inspectVerdict.test.tsx
12  2.72  1.7% 46  src/components/admin/__tests__/learningTab.test.tsx
13  2.43  1.5%  9  api/cwf/__tests__/mcpIsErrorPassthrough.test.ts  (3 sandbox-fail; UNMEASURED)
14  1.99  1.2% 34  api/cwf/__tests__/vectorConsumer.test.ts
15  1.75  1.1% 52  api/cwf/__tests__/cardPreflight.test.ts          (3 sandbox-fail; UNMEASURED)
16  1.74  1.1% 19  src/components/admin/__tests__/memoryTab.test.tsx
17  1.70  1.0%  4  src/components/admin/__tests__/navStackIntegration.test.tsx
18  1.56  0.9% 28  src/components/admin/__tests__/backendTrustPanel.test.tsx
19  1.53  0.9% 14  src/lib/__tests__/chartAxisLabels.test.ts
20  1.53  0.9% 67  api/cwf/__tests__/stageClarify.test.ts
21  1.53  0.9% 30  src/components/admin/__tests__/routingTab.test.tsx
22  1.29  0.8%  5  src/components/admin/__tests__/StagesTab.setContext.test.tsx
23  1.06  0.6%  2  api/cwf/__tests__/lensPartialSurvivesKill.test.ts
24  1.01  0.6%  3  src/components/admin/__tests__/governanceCreateBackend.test.tsx
25  0.93  0.6%  8  src/components/admin/__tests__/governanceBulkReview.test.tsx
Top 25 = 67.9% of the per-file test-time sum. By root: api 609 files (88.4 s, 53.7%), src 163, shared 6.

## 2 · Config (vitest.config.ts at 5e6e691f; vitest 4.1.9, jsdom 29.1.1)

- environment: 'jsdom' for EVERY include — vitest.config.ts:9. Only override in the tree:
  api/cwf/__tests__/fixtureMcpServer.test.ts:1 `// @vitest-environment node`.
- setupFiles: ['./src/test/setup.ts'] — :10 (jest-dom matchers, a localStorage mock, restoreAllMocks per test).
- include: src/**/__tests__/**/*.test.{ts,tsx}, shared/__tests__/**/*.test.ts, api/**/__tests__/**/*.test.ts — :11.
- pool, isolate, fileParallelism, maxWorkers: NOT SET → defaults. isolate: true
  (node_modules/vitest/dist/chunks/defaults.9aQKnqFk.js:47); maxWorkers = availableParallelism() − 1 for `run`
  (node_modules/vitest/dist/chunks/cli-api.24X8XwN1.js:3765-3770); pool: forks (Vitest 4 default, config.pool unset).
- Mac: 14 logical cores (os.availableParallelism(), Apple M4 Pro). CI: ubuntu-latest public = 4 vCPU (per card;
  not measured here) → Vitest runs 3 workers there.
- CI step: `npm run test` = `vitest run` (build-test.yml:439, package.json:36).

## 3 · Cause class per file (file:line at 5e6e691f)

- REAL GIT / SPAWNED PROCESSES:
  laneBootOneCommand.test.ts:68-78 — beforeEach builds a bare origin + clone + commit + push + fetch
  (6 spawns) for EACH of 26 tests, then the code under test runs real git (:46-49 gitIn/spawnSync).
  mergeGuard.test.ts:161-164 — repo() = mkdtemp + git init + commits via execFileSync per case.
  docDriftAttest.test.ts:35-37 temp git repo via execFileSync; :214 spawns `node --import tsx scripts/checkDocDrift.ts`.
  cardPreflight.test.ts:216 `npx tsx` child (npx resolution + tsx boot per call).
  lensPartialSurvivesKill.test.ts:59,62 — REAL SLEEPS 900 ms + 150 ms around a SIGKILL of a child (by design:
  the kill of a real process is the subject; ~1 s, left alone).
- JSDOM + RTL ASYNC WAITS (heavy component render, waitFor/findBy polling): replayTab.test.tsx (155 wait/timer
  sites), mcpSettingsTab (59), StagesTab (54), oa10UiHome (28), AdminPanel (24), governanceSurfaceSplit (23),
  governanceReadyEditTruth (20); the rest of the src/components/admin rows are the same class.
- JSDOM WHERE NODE WOULD DO: every api/** and shared/** file (615 files). Zero of them reference a DOM
  global (git grep 5e6e691f for document./window./@testing-library/localStorage/HTMLElement/navigator. over
  api/**/__tests__ + shared/__tests__: no hits).
- REPEATED HEAVY IMPORTS: per-file import dominates the remaining overhead (api/admin: import 7.97 s vs
  tests 0.37 s summed, see §4). Not proposed for change — see "not proposed".

## 4 · PROPOSED DESIGN (one): split the suite into two Vitest projects by environment

A/B MEASURED locally at 3 workers (CI's worker count), same tree:
- api/admin (68 files, 766 tests): jsdom 10.84 s (environment 17.43 s summed) → node 5.33 s (environment 3 ms);
  −51% wall. All 766 pass both ways.
- api/** + shared/** (617 files, 9,790 tests): jsdom 103.90 s → node 48.34 s; −53.5% wall. FAILED SETS IDENTICAL
  (the same 16 sandbox tests in the same 5 files under both). No test changes verdict with the environment.
- node + pool=threads on api/admin: 5.33 s → 4.44 s (−17%). All 766 pass. (Not yet measured over all of api.)

The change — vitest.config.ts only, `test.projects`:
  project "node": include api/**/__tests__/**/*.test.ts + shared/__tests__/**/*.test.ts; environment 'node';
                  pool 'threads'; same setupFiles.
  project "dom":  include src/**/__tests__/**/*.test.{ts,tsx}; environment 'jsdom'; pool as today.
  Top-level: maxWorkers 4 (from the implicit 3); coverage block and thresholds unchanged at the root.
Nothing is selected, skipped or sharded: one `vitest run`, one job, the full suite at the PR head (S37-2 kept).
No assertion edited. No workflow edit (the step stays `npm run test`).

Expected saving on CI (744 s baseline on master, RELAYED from the card's jobs-API read):
  CI/local speed factor k ≈ 3.1, ESTIMATED as (744 s × 3 workers) / 713 s local CPU.
  a) node env for api+shared: −55.6 s local at 3 workers (MEASURED) × k ≈ −170 s → ~575 s (ESTIMATED).
  b) threads pool for the node project: −17% of that project (MEASURED on api/admin only) ≈ −25 s → ~550 s (ESTIMATED).
  c) maxWorkers 3 → 4: the 4th vCPU is mostly idle behind the orchestrator; −15…25% if CPU-bound
     ≈ 410–470 s (ESTIMATED; the thin margin is here, and it is the item to verify first on a real CI run).
  d) optional, same card: laneBootOneCommand beforeEach → build the fixture repo ONCE in beforeAll and cpSync it
     per test (same repo bytes, same assertions); mergeGuard.repo() likewise. ~29 s + 13 s local → est. a third of
     that; CI tail file ~90 s → ~30 s (ESTIMATED). Matters for the tail, not the average.
  Projected: ~7–8 min on 4 vCPU. UNDER 8 MIN IS AN ESTIMATE, NOT A MEASUREMENT; the card that implements this
  must read the "Run tests" step time on its own PR's CI run and report it against 480 s.

Files a card would touch: vitest.config.ts (required); api/cwf/__tests__/laneBootOneCommand.test.ts and
api/cwf/__tests__/mergeGuard.test.ts (optional item d, fixture only).

Planted-fault proof that the suite still catches a failure:
  1. COUNT PARITY: at the same tree, old config vs new must report the SAME file count and test count
     (778 / 11,792 here). A file that falls out of both projects' include is the real risk of a split, and a
     green run cannot show it; the count can.
  2. PLANT in a module the node project covers (e.g. make one api/admin handler return 500) and in one
     src/components/admin component (drop a rendered label): the full run must go RED in each project, then revert.
  3. MIS-ASSIGNMENT IS LOUD, already observed: src/components/shared/__tests__/usageChartUnmeasured.test.tsx
     forced into node failed 4/4 (it did not pass silently). A DOM test moved into the node project cannot turn green by accident.

Not proposed, and why: isolate:false (would cut import cost but makes files share module state — a result could
depend on file order); happy-dom (changes what a UI assertion is measured against); sharding/test selection and
a bigger runner (forbidden by the card).

## Hygiene

Scratch tree: a shared clone under this window's scratchpad (not a git worktree; the worktree was refused).
REMOVAL WAS REFUSED by the permission layer (`rm -rf`), not routed around; still present, all inside this
window's scratchpad: scratchpad/ci-clone, scratchpad/ci-speed, scratchpad/master-5e6e691f.tar.
`git worktree list` at close: the shared clone (d768bc29 [master]) and another session's
.../647d7dab-.../scratchpad/wt-tr (1f694e1f [phase/test-root-s167-1]) — not mine, untouched.
Shared clone `git status --porcelain -uall`: `M  .claude/settings.json` (staged before this lane booted, not mine)
and `.env.example: Operation not permitted` (a sandbox read refusal, not a change). No edit in the shared clone.

FINDING (side): after the full run, the scratch clone showed ` M docs/ground/authority-conformance.latest.md` —
some test in the suite WRITES A TRACKED FILE under docs/ground/ during `vitest run`. Not traced to the test in this
order's budget; a suite that mutates the tree it certifies is worth its own card.

Post note: master moved to 1f694e1f while this was written (+2 test files: numericLexicon.test.ts,
governanceNumericLexicon.test.tsx; vitest.config.ts, src/test/setup.ts and the workflow untouched), so the bus slip
names that tip as head and says which tree was measured.

END · SLIP-ORDER-MEASURE-CI-SPEED-S167-1
