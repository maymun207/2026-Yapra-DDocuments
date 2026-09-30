<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-PREREVIEW-TESTROOT-INBUCKET-S167-1

LANE: scout-2 (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 order" and stops). First line of every message: `[scout-2]`.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T20:36Z
PRECONDITION: the two card texts are in "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S167/CARD-TEST-ROOT-S167-1.md" and ".../S167/CARD-INBUCKET-S167-1.md" (also in the project box under docs/); master = your `git ls-remote origin refs/heads/master`.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (step 5) · §12.1 (NEW subjects → scout first).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER — adversary pre-review of BOTH cards against the CODE (read-only)
A. CARD-TEST-ROOT-S167-1:
 1. List EVERY test file that uses `process.cwd()` as the repository root (path:line), and every use that means something else (path:line + what it means). The card claims ≥17 ROOT uses out of 38 hits — confirm or correct.
 2. Is there already a test-support module that tests import (vitest setup files, a helpers dir)? Name the right home for REPO_ROOT, or say none exists.
 3. Traps: (a) does vitest's config (root, setupFiles, include) make import.meta.url resolve differently under `--root`? (b) does any CI step or script run vitest from a non-root cwd today, so the change alters what CI measures? (c) can the T3 guard misfire on legitimate cwd tests? (d) does any listed file sit inside a sealed/manifest-guarded path or a guard rule's fence (mergeGuard.mjs) that the card missed?
B. CARD-INBUCKET-S167-1:
 1. From the INSTALLED supabase CLI's own source or output (not web docs): the exact deprecation text and the new section name; the CLI version.
 2. The command that parses config.toml WITHOUT starting containers or touching the remote project — name it, or say none exists.
 3. Every reader of `inbucket` in the repo (path:line).
C. Verdict lines: `ADVERSARY-VERDICT: GREEN|RED card=CARD-TEST-ROOT-S167-1` and `ADVERSARY-VERDICT: GREEN|RED card=CARD-INBUCKET-S167-1`, each followed by every required amendment as an exact sentence the Architect can paste.
D. scout_reply (p_from 'scout-2') as SCOUT-STATUS-PREREVIEW-TESTROOT-INBUCKET-S167-1; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S167/SCOUT-STATUS-PREREVIEW-TESTROOT-INBUCKET-S167-1.md". Back to `node scripts/mail-wait.mjs scout-2 --budget-min 480`.
BUDGET: ≤ 15 minutes. A permission you cannot pass → write it in the reply and stop.
FORBIDDEN: no edit, commit, push, merge, dispatch, cron; never print an environment value.

END · ORDER-SCOUT-PREREVIEW-TESTROOT-INBUCKET-S167-1
