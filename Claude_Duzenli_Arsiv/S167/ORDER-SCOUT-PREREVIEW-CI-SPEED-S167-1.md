<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-PREREVIEW-CI-SPEED-S167-1

LANE: scout-1 (the scout-1 window ONLY; scout-2 prints "NOT MINE: scout-1 order" and stops). Take this AFTER ORDER-SCOUT-PREREVIEW-SCOUT-ACK-S167-1 is replied — never both at once. First line of every message: `[scout-1]`.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T21:22Z
PRECONDITION: card text in "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S167/CARD-CI-SPEED-S167-1.md" (project box: docs/CARD-CI-SPEED-S167-1.md); AG-3's measurement in ".../S167/SLIP-ORDER-MEASURE-CI-SPEED-S167-1.md"; master = your `git ls-remote origin refs/heads/master`.
AUTHORITY: OWNER-APPROVAL-S167-CI-SPEED-1 ("onay CI-hiz", 00:02 TSİ) · §12.1.
NO CRON TASK. GRAFT: graft first; reply carries `GRAFT:` and `PROMPTS:` lines. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER — adversary pre-review (read-only)
1. Verify the PRECONDITION (vitest.config.ts lines, vitest version, defaults read from the INSTALLED vitest source, build-test.yml:439).
2. Traps: (a) does any api/** or shared/** test rely on a jsdom global indirectly (a module under test touching window/document/localStorage at import, the setup file's localStorage mock, `navigator`)? AG-3's grep covered test files only — check the modules they import. (b) does src/test/setup.ts run under node without error (jest-dom import, localStorage mock)? (c) does `pool: 'threads'` break tests that spawn processes, use process.chdir, signals, or native modules (laneBootOneCommand, mergeGuard, lensPartialSurvivesKill, envProxy)? (d) does coverage / nightly-compat.yml / relay-corpus.yml call vitest with flags that the projects split changes (e.g. `--project`, include paths)? (e) does any gate count tests or files (report-schema, rule26, check:ground) and would a projects split change its reading? (f) is maxWorkers 4 safe on a 4 vCPU runner with rule26 in a parallel job (separate machine — confirm)?
3. Verdict: `ADVERSARY-VERDICT: GREEN|RED card=CARD-CI-SPEED-S167-1` + every amendment as an exact sentence.
4. scout_reply (p_from 'scout-1') as SCOUT-STATUS-PREREVIEW-CI-SPEED-S167-1; same bytes to ".../S167/SCOUT-STATUS-PREREVIEW-CI-SPEED-S167-1.md". Back to `node scripts/mail-wait.mjs scout-1 --budget-min 480`.
BUDGET: ≤ 15 minutes.
FORBIDDEN: no edit, commit, push, merge, dispatch, cron; never print an environment value.

END · ORDER-SCOUT-PREREVIEW-CI-SPEED-S167-1
