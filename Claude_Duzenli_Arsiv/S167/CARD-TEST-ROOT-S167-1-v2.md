<!-- relay-audit: v1 kind=card -->
CARD-TEST-ROOT-S167-1-v2

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 card" and stops). First line of every message: `[AG-1]`. Thank you for SLIP-NOTICE-REARM-653-S166-1 — you stopped on a fallen precondition instead of acting on it.
SUPERSEDES CARD-TEST-ROOT-S167-1 (never sent to a lane). v2 = v1 + scout-2's amendments from SCOUT-STATUS-PREREVIEW-TESTROOT-INBUCKET-S167-1 (row 49598a76-27e2-4d26-9d97-9eac69b24093, verdict RED with five amendments), pasted VERBATIM below; where an amendment and v1 differ, the amendment wins.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T21:10Z
PRECONDITION: master = your `git ls-remote origin refs/heads/master` (1f694e1ff47d84d6e7b321e332446519f443b1f0 at 21:07Z, PR 655 landed; scout-2 measured at 5e6e691fe9ea98b17e2a0f2e78f14802c750ae64 — re-count at your master; the card does not touch the manifest). At that master `git grep -n "process.cwd()" -- '*.test.ts' '*.test.tsx'` prints 38 lines; at least 17 of them set a ROOT constant (`const ROOT = process.cwd()`, `REPO_ROOT = process.cwd()`, `resolve(process.cwd(), 'api/cwf/_lib')`), among them api/cwf/__tests__/persistenceClassGate.test.ts:46 and api/cwf/__tests__/snapshotLifecycle.test.ts:37.
ON-DISAGREEMENT: if the grep prints a different count, print it and work on what you measured.
WHY: register 175 / F-S165-TEST-ROOT-FROM-CWD-1. A test that takes the repository root from the process's working directory measures WHATEVER tree the shell stands in. S165: `npx vitest run --root <worktree>` run from another directory gave AG-1 five false failures — the tests read the shared clone, not the worktree under test. Plain words: the test answers about the wrong copy of the code.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (step 5) · §12.1 (NEW subject → scout pre-review before this card is sent).
```evidence:adversary
ADVERSARY: EXEMPT
ack: 49598a76-27e2-4d26-9d97-9eac69b24093
why: scout-2 returned RED with five amendments (T1, T2, T2, T3, T4); v2 carries them verbatim (same subject, loop-breaking, OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1).
```
SCOUT-2 MEASURED (summary of its A1-A3, full text in the row above): the grep is 38 lines / 30 files; ROOT constants = exactly 17; 20 more lines also mean the root (MIGRATIONS/ADMIN_DIR/FLOOR_FILE constants, inline resolve(process.cwd(), …) at catalogWriteLock:119 floorSync:120 mailWaitFlags:150 obsHostTrigger:170 persistenceClassBand:142 planner:336 plannerJurisdiction:218,225 routingFloorBackend:37,191,376,435 adminRowDiscipline:223 lensPartialSurvivesKill:46, and prefix slices turnTraceDigestDisplayOnly:50, adminLegibility:40,57); non-root code uses: ZERO (noRuntimeApiImport:26 is a comment). No shared test-support module exists; home = src/test/repoRoot.ts (imports nothing from api/). CI runs vitest only from the repo root, so CI's measurement is unchanged.
NO CRON TASK. GRAFT: graft first (graft/api/cwf/__tests__/*, graft/.graph/wiring.json); `git grep` only for what graft does not index. SECURITY: never print, echo, printenv or cat any environment variable.
UI/UX (§13.3): none — test-only change; say so in the report.

## WORK (push-first: branch + first commit + push + PR within 10 minutes; proofs after, CI is the certificate)
T1. ONE root, derived from a FILE location, never from the cwd: add one exported constant (name it `REPO_ROOT`) in ONE test-support module that computes the root from its own `import.meta.url` (the pattern already used at scripts/docDriftCore.ts:30 and snapshotLifecycle.test.ts:186). If a test-support module already exists that other tests import, put it there; otherwise create the smallest new file beside the tests and say why in the report.
T2. Replace every test-file use of `process.cwd()` that stands for the repository root with `REPO_ROOT` (import it). A `process.cwd()` that does NOT mean the root (e.g. a test that deliberately checks cwd behaviour) stays and is NAMED in the report with its line.
T3. Guard: one small test that fails if a `*.test.ts`/`*.test.tsx` file under api/, src/, scripts/ assigns `process.cwd()` to a ROOT-named constant (planted-fault proof: add one such line in a scratch copy, show the guard red, remove it).
T4. Proof, ONCE each (proof budget, register 173): `npx vitest run` from the worktree root; then the same suite with `--root <worktree>` from a DIFFERENT cwd (e.g. the shared clone) — both must give the same pass/fail counts; print both summary lines.
AMENDMENTS (scout-2, verbatim; they win over T1–T4 above where they differ):
- T1: "Compute REPO_ROOT as resolve(dirname(fileURLToPath(import.meta.url)), '..', '..') in src/test/repoRoot.ts; never new URL('<literal>', import.meta.url), which vite rewrites to an asset URL and which collects 0 tests. The cited pattern is scripts/docDriftCore.ts:38."
- T2: "T2 covers all 37 code lines of the grep (17 ROOT constants + 20 dir/inline/slice uses, 29 files); the three file.slice(process.cwd().length + 1) lines change with their scan root; the comments at mailWaitFlags.test.ts:147-149 and obsHostTrigger.test.ts:167-169 are rewritten; noRuntimeApiImport.test.ts:26 is a comment and stays."
- T2: "Give cwd: REPO_ROOT to the child processes at backendDataRegistry.test.ts:27, turnContextLog.test.ts:346 and lensPartialSurvivesKill.test.ts:58; name api/cwf/_lib/replay/toolCorpusSample.ts:95 in the report as out-of-fence residue."
- T3: "The guard fails on ANY process.cwd() in code (comments stripped) in *.test.ts/*.test.tsx under api/, src/, shared/, excluding its own file, with an allowlist that is empty at landing."
- T4: "Install dependencies in the worktree (npm ci) before T4 so both runs resolve the same node_modules; print both summary lines."
FENCE NOTE: CARD-SCOUT-ACK-S167-1 (queued, AG-1 after this card) edits scripts/mail-wait.mjs and its tests; this card edits mailWaitFlags.test.ts comments only. This PR lands first.
FENCE: the test files changed by T2 (listed by path in the report's FILE-FENCE line) · the REPO_ROOT module · the T3 guard test · docs/relay/TEST-ROOT-S167-1-AG1-report.md. Not public/architecture/manifest.json, not any non-test source file.

## STEPS
1. `git ls-remote origin refs/heads/master` (twice). `git worktree add <scratch>/wt-tr -b phase/test-root-s167-1 <master sha>`.
2. T1–T3, first commit, `git push origin phase/test-root-s167-1`, `gh pr create --base master` (open at once: no manifest in the fence). Print PR number + head 40-hex.
3. T4, report (quote each amendment and how it was met), commit (`git commit -F <file>`), push.
4. Slip SLIP-CARD-TEST-ROOT-S167-1 (bus; first line `[AG-1]`). Remove your worktree (`git worktree remove`, `git worktree prune`). Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.
BUDGET: first push ≤ 10 min after taking the card; whole card ≤ 45 min. A permission you cannot pass → write it in the slip and stop — never wait silently.
FORBIDDEN: --force; any path outside the fence; changing what any test asserts (only WHERE it reads from); merging; migration; cron; printing an environment value.

END · CARD-TEST-ROOT-S167-1-v2
