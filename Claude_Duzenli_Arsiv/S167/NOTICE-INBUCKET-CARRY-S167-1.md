<!-- relay-audit: v1 kind=notice -->
NOTICE-INBUCKET-CARRY-S167-1

LANE: AG-3 (the AG-3 window ONLY; any other window prints "NOT MINE: AG-3 notice" and stops). First line of every message: `[AG-3]`. Thank you for SLIP-NOTICE-INBUCKET-HEADER-FIX-S167-1 — you refused a card that contradicted its own fence, with the measurement (header alone → 36/37: R-CLAIMS-MISSING, R-DIFF, R-TRIP-HEX at :13 and :22).
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T21:33Z
PRECONDITION: PR 657 (phase/inbucket-s167-1, author AG-4) open at 67eaf3b36149e43655e0ea82bfd402b67054b49f; master 1f694e1ff47d84d6e7b321e332446519f443b1f0.
RULING (one path): NOTICE-INBUCKET-HEADER-FIX-S167-1 is WITHDRAWN (its premise "header only" was false). Repairing AG-4's report body would make you write another lane's certificate (§12.12). Instead YOU become the author of the same one-line change on a FRESH branch with YOUR OWN report (practice 101/145 carry), and PR 657 is closed as SUPERSEDED-BY your PR. The evidence for the rename stays scout-2's measurement of the installed CLI (row 49598a76-27e2-4d26-9d97-9eac69b24093), quoted in YOUR report.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (step 5, register 174/188) · §12.12 · CLAUDE.md §7.5.
NO CRON TASK. PROMPT HYGIENE: NOTICE-PROMPT-HYGIENE-S167-1. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. `git ls-remote origin refs/heads/master` (twice). Branch `phase/inbucket-s167-2` from that master (worktree, or your shared-clone copy method if the sandbox refuses).
2. supabase/config.toml: `[inbucket]` → `[local_smtp]`, keys and comments unchanged (the same byte change as 67eaf3b3's config.toml; verify with `git diff 1f694e1ff47d84d6e7b321e332446519f443b1f0 67eaf3b36149e43655e0ea82bfd402b67054b49f -- supabase/config.toml` and reproduce it exactly).
3. Report docs/relay/INBUCKET-S167-2-AG3-report.md — line 1 `<!-- relay-audit: v1 kind=report -->`, WITH the sections the grammar requires (## CLAIMS, ## DIFF, FILE-FENCE line); no 7–39-hex in prose or anchored fences (use full 40-hex or name rows by artifact name, not id). Run `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts` ONCE → 37/37 before committing.
4. ONE commit (`git commit -F <file>`), push, `gh pr create --base master` (NOT draft). Then close PR 657: `gh api repos/maymun207/cwf_yaprak/pulls/657 -X PATCH -f state=closed` and add a comment `gh pr comment 657 --body "SUPERSEDED-BY #<new> (NOTICE-INBUCKET-CARRY-S167-1)"`.
5. Slip SLIP-NOTICE-INBUCKET-CARRY-S167-1 (bus; `[AG-3]`, new PR number + head 40-hex, `GRAFT:`, `PROMPTS:`). Back to `node scripts/mail-wait.mjs AG-3 --budget-min 480`.
BUDGET: ≤ 15 minutes.
FORBIDDEN: editing any file on phase/inbucket-s167-1; --force; merging; `--delete-branch`; running the supabase CLI; cron; printing an environment value.

END · NOTICE-INBUCKET-CARRY-S167-1
