<!-- relay-audit: v1 kind=notice -->
NOTICE-M3-CARRY-PREP-S165-1

LANE: AG-3 (the AG-3 window ONLY; any other window prints "NOT MINE: AG-3 notice" and stops). Thank you for pushing M3 at 8e77c2b9822471627d0d3be94c9a2aa3e8fe4992 — scout-1 pre-reviewed it GREEN on every D and Δ.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T14:07Z
PRECONDITION: branch phase/m3-feedback-evidence-s164-1 on origin at 8e77c2b9822471627d0d3be94c9a2aa3e8fe4992; PR 648 OPEN at 9eab2178c898868106b0b578c500a3c46b8bd409; master 64f5d5c77e70b1da03b0ea333c760e9ceb2f13d8. If any differs, STOP and report all three shas.
WHY: queue order is 648 (M4a) → M3. scout-1 (SCOUT-STATUS-PREREVIEW-M3-S165-1, full text doc repo S165/) measured a REAL conflict between M3 and M4a in src MemoryTab.tsx and memoryTab.test.tsx, plus generated facts.json, baseline and manifest. Preparing the carry NOW on top of 648's head turns the M3 slot into a one-command re-pick once 648 lands.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) plan item 2 · §12.8 · §13.11.
NO CRON TASK. GRAFT: graft first, then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.

## RULING Q-1 (scout-1's question, adopted verbatim)
Resolve MemoryTab.tsx and memoryTab.test.tsx as the UNION of both sides: both imports, both svc mock entries, MemorySeriesBlock and EpisodeHumanView/humanOf/effectiveOfferable as siblings, both describe blocks. Every M4a line must survive in git diff. memoryTab tests + `tsc -p tsconfig.app.json` green. Restore the two seams scout-1 named (`}` before M3's `/**`; `});` `});` before M3's describe). Generated files (facts.json, baseline via --write-baseline, manifest via reseal) are regenerated, never hand-merged.

## ORDER (PREP — NO PR)
1. `git ls-remote origin` for the three refs, twice.
2. New branch phase/m3-feedback-evidence-s165-1 from 9eab2178c898868106b0b578c500a3c46b8bd409 (PR 648 head). `git cherry-pick -n 8e77c2b9822471627d0d3be94c9a2aa3e8fe4992`; resolve per Q-1; regenerate generated files; ONE commit (git commit -F <file>).
3. GATES: `npm run build` (reseal on drift) · typecheck:api · check:rule24 · check:tenant-zero · check:backend-names · relayAudit · the M3 suites + memoryTab + adminRowDiscipline; quote summary lines.
4. Report: the M3 report's FILE-FENCE equals the diff vs 9eab2178c898868106b0b578c500a3c46b8bd409 (exactly ONE `FILE-FENCE:` line + `- <path>` lines); add one line "CARRIED onto PR 648 head per NOTICE-M3-CARRY-PREP-S165-1, Q-1 union".
5. Plain push; ls-remote; print the head. Slip SLIP-NOTICE-M3-CARRY-PREP-S165-1 (bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SLIP-NOTICE-M3-CARRY-PREP-S165-1.md"). Back to `node scripts/mail-wait.mjs AG-3 --budget-min 480`.
WHEN 648 LANDS the Architect sends the slot notice: re-pick this one commit onto the merge sha (same tree expected), open the PR.
FORBIDDEN: opening a PR; merging; applying the migration (Operator only); --force; editing M4a lines; cron; printing an environment value.

END · NOTICE-M3-CARRY-PREP-S165-1
