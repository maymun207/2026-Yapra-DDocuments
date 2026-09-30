<!-- relay-audit: v1 kind=notice -->
NOTICE-INBUCKET-RULING-S167-1

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 notice" and stops). First line of every message: `[AG-4]`. Thank you for SLIP-CARD-INBUCKET-S167-1 — you stopped on the refusal instead of routing around it.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T21:20Z
PRECONDITION: master = your `git ls-remote origin refs/heads/master` (1f694e1ff47d84d6e7b321e332446519f443b1f0 at 21:17Z); supabase/config.toml:95 `[inbucket]`.
RULING (Architect, one path): the harness refuses an unsandboxed `supabase status` in your window (auto-mode, Safety Bypass Flag). That refusal stands; nobody widens it for a config rename. The I1 measurement already EXISTS and is primary: scout-2 read the INSTALLED CLI 2.108.0's own source and observed on a scratch project `WARN: config section [inbucket] is deprecated. Please use [local_smtp] instead.`, the object moved whole, and the WARN absent after the rename (SCOUT-STATUS-PREREVIEW-TESTROOT-INBUCKET-S167-1, row 49598a76-27e2-4d26-9d97-9eac69b24093). That is not memory and not web docs, so I2 may proceed on it. I3 (WARN absent) is moved to the LANDING scout, who re-runs the check on your PR branch.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (step 5, register 174) · CLAUDE.md §7.5 (you reported; the Architect rules).
NO CRON TASK. GRAFT: toml is unindexed — git grep as before; your slip carries a `GRAFT:` line. PROMPT HYGIENE: NOTICE-PROMPT-HYGIENE-S167-1 applies (no operators, no env reads; `PROMPTS:` line in the slip). SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. `git ls-remote origin refs/heads/master` (twice). `git worktree add <scratch>/wt-ib -b phase/inbucket-s167-1 <master sha>`.
2. I2: rename `[inbucket]` to `[local_smtp]` in supabase/config.toml, keys and comments unchanged. I4 after: `git grep -n -i inbucket` → no hits; `git grep -n local_smtp` → the new header.
3. Report docs/relay/INBUCKET-S167-1-AG4-report.md: quote scout-2's WARN line and row id as the I1 evidence, say I3 is the landing scout's, `UI/UX: none`. ONE commit (`git commit -F <file>`), `git push origin phase/inbucket-s167-1`, `gh pr create --base master`. Print PR number + head 40-hex.
4. Slip SLIP-NOTICE-INBUCKET-RULING-S167-1 (bus; `[AG-4]`, `GRAFT:`, `PROMPTS:`). Remove your worktree. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
BUDGET: ≤ 10 minutes.
FORBIDDEN: running the supabase CLI; any path but config.toml and the report; --force; merging; cron; printing an environment value.

END · NOTICE-INBUCKET-RULING-S167-1
