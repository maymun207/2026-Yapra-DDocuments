<!-- relay-audit: v1 kind=card -->
CARD-CI-SPEED-S167-1-v2

LANE: AG-3 (the AG-3 window ONLY; any other window prints "NOT MINE: AG-3 card" and stops). First line of every message: `[AG-3]`. Built from YOUR SLIP-ORDER-MEASURE-CI-SPEED-S167-1 — your measurement, your design, carried with credit. Take NOTICE-PUSH-DOC-REPO-S168-3 first if it is still in your box, then this card.
SUPERSEDES CARD-CI-SPEED-S167-1 (v1, never sent to a lane). v2 = v1 + scout-1's amendments A1–A6 from SCOUT-STATUS-PREREVIEW-CI-SPEED-S167-1 (row 0417a10f-93ed-4df6-8648-b1c1ca16e5ee, verdict RED), pasted VERBATIM below; where an amendment and v1 differ, the amendment wins.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T04:03Z
PRECONDITION: master = your `git ls-remote origin refs/heads/master` (8d452df354e8ed98c479f6f1cdecfbc61c7ed34b at 03:28:44Z, PR 660). vitest.config.ts:8 globals true · :9 environment 'jsdom' for every include · :10 setupFiles ./src/test/setup.ts · :11 include; pool/isolate/maxWorkers unset (vitest 4.1.9). CI "Run tests" = `npm run test` (build-test.yml:439). MEASURED by the Architect (gh API, runs by full head sha): master Build and Test took 18m50s at 9354882aa2f993d8285bb0cefcb9cb1f350ec118 (03:12:48Z→03:31:38Z) and 18m20s at 731c1ee412432b2c5e96f1966793c00f00ec27e2.
ON-DISAGREEMENT: if the config lines or the defaults are not what you read, quote what is and stop.
WHY: owner, 2026-09-30 23:59 TSİ: "18 dk cok uzun degil mi?" and again 2026-10-01 06:47 TSİ: "bu gene 16+dk run ediyor neyi run ediyor 15 dk !?". Every code PR and every master push waits ~18 min on CI. AG-3 measured that ~77% of test CPU is per-file overhead, and that 615 api/shared files run under jsdom although none touches a DOM global; api+shared under node at 3 workers: 103.9 s → 48.3 s with IDENTICAL failed sets. Plain words: most of the quarter hour is the test runner building a fake browser for tests that never use one.
AUTHORITY: OWNER-APPROVAL-S167-CI-SPEED-1 ("onay CI-hiz", 2026-10-01 00:02 TSİ).
```evidence:adversary
ADVERSARY: EXEMPT
ack: 0417a10f-93ed-4df6-8648-b1c1ca16e5ee
why: same subject, v2 carries the scout's amendments verbatim (loop-breaking, OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1).
```
LAWS KEPT: S37-2 — one `vitest run`, one job, the full suite at the PR head; nothing selected, skipped or sharded; no assertion edited; no workflow edit; no paid runner. isolate stays true; environment for UI tests stays jsdom.
NO CRON TASK. GRAFT: graft first; the slip carries `GRAFT:` and `PROMPTS:` lines. SECURITY: never print, echo, printenv or cat any environment variable.
UI/UX (§13.3): none — test infrastructure only; say so in the report.

## WORK (push-first)
C1. vitest.config.ts → `test.projects`: "node" = api/**/__tests__/**/*.test.ts + shared/__tests__/**/*.test.ts, environment 'node', pool 'threads'; "dom" = src/**/__tests__/**/*.test.{ts,tsx}, environment 'jsdom', pool as today. Top level: maxWorkers 4 (see A4). Coverage block and thresholds unchanged. The one existing `// @vitest-environment node` pragma (fixtureMcpServer.test.ts:1) stays harmless.
C2. COUNT PARITY (the split's real risk): at the same tree, old config vs new report the SAME file count and test count; print both. A file in neither include fails the card.
C3. laneBootOneCommand.test.ts and mergeGuard.test.ts: build the fixture git repo ONCE (beforeAll) and copy it per test (same bytes, same assertions) — only if C1 alone does not bring the CI "Run tests" step under 480 s; say which in the report.
C4. PLANTED FAULTS: one in a module the node project covers (e.g. an api/admin handler returns 500), one in a src/components/admin component (drop a rendered label): the full run goes RED in each project; revert; quote both.
C5. THE MEASURE THAT CLOSES THE CARD: the "Run tests" step time on THIS PR's own CI run, read from the jobs API by full head sha, reported against 480 s. Under 480 s is the exit; over it → C3, push, read again.
SIDE FINDING: the test that writes docs/ground/authority-conformance.latest.md is now its own card (CARD-TEST-CLEAN-TREE-S169-1, AG-4, register 190). Do NOT touch api/cwf/__tests__/authorityMatrix.test.ts here.
AMENDMENTS (scout-1, verbatim; they win over C1–C5 above where they differ):
A1. "C1: BOTH inline projects carry `extends: true`. Without it vitest 4.1.9 builds an inline project with configFile=false (vitest/dist/chunks/cli-api.24X8XwN1.js:11113) and it inherits neither `globals: true` (needed by src/test/setup.ts's bare beforeEach/vi), the react plugin, nor the '@' alias."
A2. "C1: `environment` and `include` MOVE out of the root `test` block into the two projects only. `setupFiles`, `globals` and `coverage` stay at the root ONLY and are not repeated in a project. With extends:true, Vite's mergeConfig concatenates arrays (vite/dist/node/chunks/node.js:2595-2597), so a root include would make each project run all three globs."
A3. "C2 prints, at the same tree: the old total (files, tests); the node project's file count = the count of api/**/__tests__/**/*.test.ts plus shared/__tests__/**/*.test.ts; the dom project's = the count of src/**/__tests__/**/*.test.{ts,tsx}; node + dom = the old total, and no file path appears in both projects' lists (`vitest list --filesOnly --project <name>`)."
A4. "PRECONDITION correction: the repository is private (`gh repo view` isPrivate:true), so the CI runner's core count is UNMEASURED and may be 2, not 4. Before keeping `maxWorkers: 4`, AG-3 measures the build job's core count from a source it can quote. If it cannot, maxWorkers is left at the default and the report says UNMEASURED. The slip's k ≈ 3.1 is recomputed with the measured worker count."
A5. "The report quotes the relay-corpus job's `Test Files  1 passed (1)` for `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts` at the PR head. That proves a path filter under projects runs the file once, in the node project."
A6. "PRECONDITION adds vitest.config.ts:8 `globals: true` to the lines it names."
FENCE: vitest.config.ts · (C3 only) api/cwf/__tests__/laneBootOneCommand.test.ts, api/cwf/__tests__/mergeGuard.test.ts · docs/relay/CI-SPEED-S167-1-AG3-report.md.

## STEPS
1. `git ls-remote origin refs/heads/master` (twice). Worktree `phase/ci-speed-s167-1` at master (if the sandbox refuses a worktree, use the shared-clone copy and say so).
2. C1 (with A1, A2), C2 (with A3); first commit + push + `gh pr create --base master` within 10 minutes. Print PR number + head 40-hex.
3. C4; report; push. C5 (and A5) from the PR's CI; C3 only if needed.
4. Slip SLIP-CARD-CI-SPEED-S167-1 (bus; `[AG-3]`, `GRAFT:`, `PROMPTS:`, the measured "Run tests" seconds). Back to `node scripts/mail-wait.mjs AG-3 --budget-min 480`.
BUDGET: first push ≤ 10 min; whole card ≤ 60 min. A refused command → write it in the slip, never route around it, never wait silently.
FORBIDDEN: isolate:false; happy-dom; test selection/sharding; workflow edits; assertion edits; --force; merging; cron; printing an environment value.

END · CARD-CI-SPEED-S167-1-v2
