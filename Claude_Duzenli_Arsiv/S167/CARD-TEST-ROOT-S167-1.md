<!-- relay-audit: v1 kind=card -->
CARD-TEST-ROOT-S167-1

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 card" and stops). First line of every message: `[AG-1]`. Thank you for SLIP-NOTICE-REARM-653-S166-1 — you stopped on a fallen precondition instead of acting on it.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T20:35Z
PRECONDITION: master = your `git ls-remote origin refs/heads/master` (a3ce7b0c1b1ba39d559d034e2c18fb938799a76c at 20:30Z, unless PR 654 has landed since — then the new master; the card does not touch the manifest). At that master `git grep -n "process.cwd()" -- '*.test.ts' '*.test.tsx'` prints 38 lines; at least 17 of them set a ROOT constant (`const ROOT = process.cwd()`, `REPO_ROOT = process.cwd()`, `resolve(process.cwd(), 'api/cwf/_lib')`), among them api/cwf/__tests__/persistenceClassGate.test.ts:46 and api/cwf/__tests__/snapshotLifecycle.test.ts:37.
ON-DISAGREEMENT: if the grep prints a different count, print it and work on what you measured.
WHY: register 175 / F-S165-TEST-ROOT-FROM-CWD-1. A test that takes the repository root from the process's working directory measures WHATEVER tree the shell stands in. S165: `npx vitest run --root <worktree>` run from another directory gave AG-1 five false failures — the tests read the shared clone, not the worktree under test. Plain words: the test answers about the wrong copy of the code.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (step 5) · §12.1 (NEW subject → scout pre-review before this card is sent).
```evidence:adversary
ADVERSARY: PENDING
why: scout-2 pre-reviews this card under ORDER-SCOUT-PREREVIEW-TESTROOT-INBUCKET-S167-1; the card is sent only as v2 carrying the verdict.
```
NO CRON TASK. GRAFT: graft first (graft/api/cwf/__tests__/*, graft/.graph/wiring.json); `git grep` only for what graft does not index. SECURITY: never print, echo, printenv or cat any environment variable.
UI/UX (§13.3): none — test-only change; say so in the report.

## WORK (push-first: branch + first commit + push + PR within 10 minutes; proofs after, CI is the certificate)
T1. ONE root, derived from a FILE location, never from the cwd: add one exported constant (name it `REPO_ROOT`) in ONE test-support module that computes the root from its own `import.meta.url` (the pattern already used at scripts/docDriftCore.ts:30 and snapshotLifecycle.test.ts:186). If a test-support module already exists that other tests import, put it there; otherwise create the smallest new file beside the tests and say why in the report.
T2. Replace every test-file use of `process.cwd()` that stands for the repository root with `REPO_ROOT` (import it). A `process.cwd()` that does NOT mean the root (e.g. a test that deliberately checks cwd behaviour) stays and is NAMED in the report with its line.
T3. Guard: one small test that fails if a `*.test.ts`/`*.test.tsx` file under api/, src/, scripts/ assigns `process.cwd()` to a ROOT-named constant (planted-fault proof: add one such line in a scratch copy, show the guard red, remove it).
T4. Proof, ONCE each (proof budget, register 173): `npx vitest run` from the worktree root; then the same suite with `--root <worktree>` from a DIFFERENT cwd (e.g. the shared clone) — both must give the same pass/fail counts; print both summary lines.
FENCE: the test files changed by T2 (listed by path in the report's FILE-FENCE line) · the REPO_ROOT module · the T3 guard test · docs/relay/TEST-ROOT-S167-1-AG1-report.md. Not public/architecture/manifest.json, not any non-test source file.

## STEPS
1. `git ls-remote origin refs/heads/master` (twice). `git worktree add <scratch>/wt-tr -b phase/test-root-s167-1 <master sha>`.
2. T1–T3, first commit, `git push origin phase/test-root-s167-1`, `gh pr create --base master` (open at once: no manifest in the fence). Print PR number + head 40-hex.
3. T4, report, commit (`git commit -F <file>`), push.
4. Slip SLIP-CARD-TEST-ROOT-S167-1 (bus; first line `[AG-1]`). Remove your worktree (`git worktree remove`, `git worktree prune`). Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.
BUDGET: first push ≤ 10 min after taking the card; whole card ≤ 45 min. A permission you cannot pass → write it in the slip and stop — never wait silently.
FORBIDDEN: --force; any path outside the fence; changing what any test asserts (only WHERE it reads from); merging; migration; cron; printing an environment value.

END · CARD-TEST-ROOT-S167-1
