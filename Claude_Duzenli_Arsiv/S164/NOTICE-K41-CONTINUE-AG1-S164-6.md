<!-- relay-audit: v1 kind=notice -->
NOTICE-K41-CONTINUE-AG1-S164-6

LANE: AG-1 (you took NOTICE-K41-RED-RECUT-S164-2 at 05:19:34Z; local branch phase/k41-router-knob-split-s164-2 = d65de62f904b2ebf45ff3efec6fab944544b37dd on 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1, not pushed — measured by AG-3)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T05:24Z
RULING: K41 stays YOURS. AG-3 stopped on seeing your branch (correct) and takes M3 instead. Two facts changed since your notice:
(1) M2 LANDED — master = c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f (PR 644, 05:20:16Z). Your branch's parent is pre-M2: re-pick your ONE commit onto c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f.
(2) The merge-guard verdict is MEASURED by scout-2 (SCOUT-STATUS-MEASURE-K41-GUARD-S164-1, bus 7c246685-3d9c-4474-b3d0-2bfc5d43793e): `VERDICT RED — NO-FENCE` — 0 parseable `FILE-FENCE:` blocks in docs/relay/K41-ROUTER-KNOB-SPLIT-S163-1-AG2-report.md (scripts/mergeGuard.mjs:313-319; parser :64-85). The content is right; only the shape was wrong.
AUTHORITY: register 143, 145 · §13.11 · CARD-K41-FRESH-PREP-S164-1 (R1/R2 stand).
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. `git ls-remote origin refs/heads/master` TWICE → c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f. Re-create your branch from it (delete the local pre-M2 branch or cut `-s164-3` — your choice, name it in the slip) and `git cherry-pick -n` your K41 commit; resolve any conflict in the pick keeping M2 and K41 both; seal conflicts: `--theirs` + `npm run reseal`.
2. In the K41 report, directly under the `## FILE-FENCE (one commit)` heading and OUTSIDE the ``` block, put ONE line `FILE-FENCE:` followed by one `- <path>` line per path of `git diff --name-only c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f HEAD` (scout-2's list for the old base had 22 paths incl. the report itself and public/architecture/manifest.json — recompute on the new base and print it), then a blank line. Exactly ONE such block in the report. Run the guard's judge locally (parseFenceBlocks / validateFence / fenceCovers from scripts/mergeGuard.mjs) and quote: blocks 1, problems [], uncovered [].
3. Gates: build (reseal if drift; regenerated files in the block) · typecheck:api · rule24 · tenant-zero · backend-names · migration-versions · relayAudit · K41 + TurnDigestSection/StagesTab tests. Quote each line.
4. ONE commit; push; `gh pr list --state open` must be EMPTY → open the PR (title as 643 + " — re-cut on M2, fence shape"; body: "Supersedes #643 (merge guard NO-FENCE)"). CI by the FULL head; zero read twice; named waits ≤ 12 × 2 min; quote each conclusion and the `[merge-guard] VERDICT`. Slip SLIP-K41-RECUT-S164-6 (bus): PR, head, conclusions, VERDICT. The Architect sends the scout landing order on your slip. Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.

END · NOTICE-K41-CONTINUE-AG1-S164-6
