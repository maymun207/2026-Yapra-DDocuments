<!-- relay-audit: v1 kind=card -->
CARD-INBUCKET-S167-1

LANE: AG-3 (the AG-3 window ONLY; any other window prints "NOT MINE: AG-3 card" and stops). First line of every message: `[AG-3]`. Take it AFTER NOTICE-PUSH-DOC-REPO-S167-1 is slipped.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T20:35Z
PRECONDITION: master = your `git ls-remote origin refs/heads/master`. At a3ce7b0c1b1ba39d559d034e2c18fb938799a76c, supabase/config.toml:95 reads `[inbucket]` (enabled = true, port = 54324).
ON-DISAGREEMENT: if the section is not there, print what is and stop.
WHY: register 174 / F-S165-INBUCKET-CONFIG-DEPRECATION-1 — the supabase CLI prints a deprecation warning on `[inbucket]` on every run. Plain words: a warning printed on every run teaches everyone to ignore warnings, and the next real one is missed.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (step 5) · §12.1 (NEW subject → scout pre-review before this card is sent).
```evidence:adversary
ADVERSARY: PENDING
why: scout-2 pre-reviews this card under ORDER-SCOUT-PREREVIEW-TESTROOT-INBUCKET-S167-1; the card is sent only as v2 carrying the verdict.
```
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
UI/UX (§13.3): none — local-dev config only; say so in the report.

## WORK (push-first)
I1. MEASURE the CLI's own words: run the installed supabase CLI once in a way that parses config.toml without starting containers (the scout names the command) and quote the deprecation line VERBATIM, plus `supabase --version`.
I2. Rename the section exactly as that line says (keys unchanged unless the line says otherwise). Do not rename from memory or from web docs.
I3. Re-run the same command: the deprecation line must be ABSENT; print the output.
I4. `git grep -n -i inbucket` over the repo (both before and after) — any other reader of the old key (scripts, docs, tests, CI) is listed; code readers are updated in the same commit, prose mentions are named in the report.
FENCE: supabase/config.toml · any code reader I4 finds (listed) · docs/relay/INBUCKET-S167-1-AG3-report.md. No migration, no production config.

## STEPS
1. `git ls-remote origin refs/heads/master` (twice). `git worktree add <scratch>/wt-ib -b phase/inbucket-s167-1 <master sha>`.
2. I1–I4, report, ONE commit (`git commit -F <file>`), `git push origin phase/inbucket-s167-1`, `gh pr create --base master`. Print PR number + head 40-hex.
3. Slip SLIP-CARD-INBUCKET-S167-1 (bus; first line `[AG-3]`). Remove your worktree. Back to `node scripts/mail-wait.mjs AG-3 --budget-min 480`.
BUDGET: whole card ≤ 20 min. A permission you cannot pass → write it in the slip and stop.
FORBIDDEN: --force; `supabase db push` or any command touching the remote project; any path outside the fence; merging; cron; printing an environment value.

END · CARD-INBUCKET-S167-1
