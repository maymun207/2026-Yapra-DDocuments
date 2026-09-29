<!-- relay-audit: v1 kind=notice -->
NOTICE-PUSH-DOC-REPO-S163-2

LANE: AG-2 (in mail-wait; measured IN-LOOP by PING-AG-2-S163-1: [STAMPED] 03:33:11Z)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T03:38Z
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 (plan item 2: doc repo push with ls-remote proof) · the owner's standing rule "tum olusturdugun dokumanlarin dokuman reposunda olmasi SART" (S143) · practice 118.
WHY A LANE: the Architect's bridge has no GitHub credential (register 107/118). MEASURED at cut: local main HEAD = 81c7fe658a82f666bfe7b6581a127cc24ac60d4b; ahead of origin/main as last fetched on the bridge (the last push, SLIP-PUSH-DOC-REPO-S163-1 by AG-1, left remote main at 29447c1c239e01517befafe0f6b11603f309aabe).
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable; never print a remote URL that carries a token.

## PRECONDITION
The doc repo is the git working copy at "/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra - DDocuments" (spaces on both sides of the dash before YAPRA). If your sandbox cannot write that repo's .git (AG-1's window has the allowWrite key; yours may not), STOP at step 1 and slip the exact refusal line — do not route around it.

## ORDER
1. `git -C "<doc repo>" fetch origin` · `git -C "<doc repo>" rev-list --left-right --count origin/main...HEAD` → print (expected 0 behind). BEHIND > 0 → STOP, slip both numbers.
2. `git -C "<doc repo>" push origin HEAD:main` → quote the push line.
3. IMMEDIATELY: `git -C "<doc repo>" ls-remote origin refs/heads/main` and `git -C "<doc repo>" rev-parse HEAD` → print both 40-hex; they must be equal.
4. SLIP as SLIP-PUSH-DOC-REPO-S163-2: first line `PUSHED remote-main=<40-hex> head=<40-hex> equal=<yes|no>` (or `REFUSED <step> <line>`), then the step lines. Fallback file "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/SLIP-PUSH-DOC-REPO-S163-2.md" (write it AFTER the push).
5. Back to `node scripts/mail-wait.mjs AG-2 --budget-min 480`.
FORBIDDEN: --force, rebase, merge, deleting files, committing _to_delete/, any commit of your own in the doc repo, cron, printing an environment value.

END · NOTICE-PUSH-DOC-REPO-S163-2
