<!-- relay-audit: v1 kind=notice -->
NOTICE-PUSH-DOC-REPO-S163-1

LANE: AG-1 (take this AFTER your slip for NOTICE-PR631-FRESH-BRANCH-S163-1; it is your next card)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T02:18Z
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 (plan item 2: doc repo push with ls-remote proof) · the owner's standing rule "tum olusturdugun dokumanlarin dokuman reposunda olmasi SART" (S143) · OWNER-APPROVAL-S161-SANDBOX-LOCAL-1 (the doc-repo .git allowWrite in your .claude/settings.local.json).
WHY A LANE: the Architect's bridge has no GitHub credential and cannot push (register 107/118). MEASURED by the Architect at 2026-09-29T02:18Z: local main HEAD = 043edd5a08b469b9ad8d4b17b8be8b5a609d55a5; 37 commits ahead of origin/main as last fetched on the bridge.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable; never print a remote URL that carries a token.

## PRECONDITION
The doc repo is the git working copy at "/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra - DDocuments" (spaces on both sides of the dash before YAPRA; the no-space spelling does not exist). `git -C "<that path>" status --short` — print the count; untracked `_to_delete/` folders are expected and are NOT committed.

## ORDER
1. `git -C "<doc repo>" fetch origin` · `git -C "<doc repo>" rev-list --left-right --count origin/main...HEAD` → print (expected: 0 behind, 37+ ahead). If BEHIND > 0: STOP and slip both numbers (no merge, no rebase).
2. `git -C "<doc repo>" push origin HEAD:main` → quote the push line (`<old>..<new>  HEAD -> main`).
3. IMMEDIATELY after (before any tracking-ref step can refuse): `git -C "<doc repo>" ls-remote origin refs/heads/main` → the 40-hex remote sha. It must equal `git -C "<doc repo>" rev-parse HEAD` (expected 043edd5a08b469b9ad8d4b17b8be8b5a609d55a5 or a later Architect commit). Print both.
4. SLIP as SLIP-PUSH-DOC-REPO-S163-1: first line `PUSHED remote-main=<40-hex> head=<40-hex> equal=<yes|no>`, then steps 1–3 lines. Fallback file: "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/SLIP-PUSH-DOC-REPO-S163-1.md" (write it AFTER the push; it will be in the next push).
5. Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.
FORBIDDEN: --force, rebase, merge, deleting files, committing _to_delete/, any cron, printing an environment value.

END · NOTICE-PUSH-DOC-REPO-S163-1
