<!-- relay-audit: v1 kind=notice -->
NOTICE-PUSH-DOC-REPO-S164-3

LANE: AG-1 (after SLIP-CARD-SD1-NUMERIC-S164-1 — finish SD1 first, then this; it takes one minute)
fanout: personalized (one lane, one body)
FROM: Architect, S164 close, 2026-09-30T06:26Z
WHY: the doc repo "2026 - Yapra - DDocuments" is 13 local commits ahead of origin/main at 06:24Z (measured `git rev-list --count origin/main..HEAD`), plus the S164 close set the Architect commits after this notice. The bridge cannot push (register 151); push is a lane job (§13.12).
AUTHORITY: §13.12 · register 151.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. In the doc repo working copy ("…/2026 DESKTOP/2026 - YAPRA/2026 - Yapra - DDocuments"): `git status --short` (print; untracked `_to_delete/` is expected and stays untracked), `git log --oneline -3`, `git rev-list --count origin/main..HEAD`.
2. `git pull --rebase origin main` only if the remote moved (print why); then `git push origin HEAD:main`. No --force.
3. `git ls-remote origin refs/heads/main` → print the 40-hex; it must equal `git rev-parse HEAD`.
4. Slip SLIP-PUSH-DOC-REPO-S164-3 (bus): the two 40-hex values and the count pushed. Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.
FORBIDDEN: --force; editing any file in the doc repo; committing `_to_delete/`; cron; printing an environment value.

END · NOTICE-PUSH-DOC-REPO-S164-3
