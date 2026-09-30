<!-- relay-audit: v1 kind=notice -->
NOTICE-SD1-NEDEN-RULING-S167-1

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 notice" and stops). First line of every message: `[AG-4]`. Thank you for FINDING-SD1-EXEMPT-NEDEN-S166-1 — you stopped an armed PR on a measured hole instead of letting it land.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T20:46Z
PRECONDITION: PR 655 open at f6d26f00e1d0776e8f0daf485ab54826c9f64627 (phase/sd1-numeric-grouping-exempt-s166-1); your finding: numericLexiconSeeds.ts seeds the bare exempt phrases 'Neden' (tr) and 'Why' (en); numericLedger.ts:344 followedByExemptPhrase exempts any whole number followed by a phrase.
ON-DISAGREEMENT: if the head moved or the seed rows are not what you measured, print what you read and stop.
RULING (Architect, one path): the exemption exists for the METHOD NAME ("5 Neden Analizi", "5 Whys"), not for the word. A bare 'Neden'/'Why' seed lets a real count ("3 neden bulundu", "başlıca 2 neden:") bypass the numeric guard — that is a correctness hole, so it does not land. Drop the bare 'Neden' and bare 'Why' seed rows; keep the method rows ('Neden Analizi', 'Whys' and any other multi-word method form already seeded). SD1's production exit is unchanged: the stamp is absent on "1 250 000" and on "5 Neden Analizi".
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (step 2, register 166) · §2 (a guard that barks nowhere on a real count is worse than none) · CLAUDE.md §7.5 (you reported the contradiction; the Architect rules).
NO CRON TASK. GRAFT: graft first; your slip carries a `GRAFT:` line. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS (on the SAME branch; a new commit on PR 655)
1. `git ls-remote origin refs/heads/master` and the PR head (both 40-hex).
2. Remove the two bare rows from numericLexiconSeeds.ts. Add pins to the SD1 test file that is ALREADY in the first commit's FILE-FENCE: "3 neden bulundu" → NOT exempt (guarded); "başlıca 2 neden:" → NOT exempt; "3 why" → NOT exempt; "5 Neden Analizi" → exempt; "5 Whys" → exempt. If no fenced test file fits, STOP and say so (a new path on an open PR is a fresh-branch carry — practice 145, mergeGuard FENCE-GREW).
3. Run that test file and typecheck:api ONCE each (proof budget, register 173). Append a short "RULING S167 — bare Neden/Why dropped" paragraph to the report. ONE commit (`git commit -F <file>`), `git push origin phase/sd1-numeric-grouping-exempt-s166-1` (no --force).
4. Slip SLIP-NOTICE-SD1-NEDEN-RULING-S167-1 (bus; first line `[AG-4]`): new head 40-hex, the pins and their results, the `GRAFT:` line. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
BUDGET: ≤ 15 minutes.
FORBIDDEN: --force; any path outside the first commit's fence; merging; migration; cron; printing an environment value.

END · NOTICE-SD1-NEDEN-RULING-S167-1
