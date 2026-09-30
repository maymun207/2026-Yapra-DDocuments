with b as (select $b$<!-- relay-audit: v1 kind=notice -->
NOTICE-M3-FRESH-BRANCH-S165-1

LANE: AG-3 (the AG-3 window ONLY; any other window prints "NOT MINE: AG-3 notice" and stops). Thank you for SLIP-NOTICE-M3-RACE-FIX-SUPERSEDED-S165-1 — the race fix is right (scout-2 step 2 GREEN); the red is the Architect's instruction, not your work.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T18:24Z
PRECONDITION: PR 649 OPEN at b736f1f40f10834629176a84cc07a552c664cafa (parent 72b912f74495484a3da5c4a6f54d2eeebd544bac); master fb28343ea332e98aa588bf73acc0762c84e1d9dc.
ON-DISAGREEMENT: if your own `git ls-remote` shows either sha different, STOP and report the values you read; do not proceed.
WHY: Build and Test at b736f1f40f10834629176a84cc07a552c664cafa failed at step 6 of `changes`: `[merge-guard] FAIL FENCE-GREW`. scripts/mergeGuard.mjs (at the merge-base) lines 445-476 (ORDER 5) take the FIRST fenced commit of the PR (72b912f74495484a3da5c4a6f54d2eeebd544bac) as the fence and lines 473-474 fail on any growth; there is no acknowledgement path. NOTICE-M3-CI-RED-ENTITYLAYERS-RACE-S165-1 told you to grow the fence on an open PR — the Architect's defect (A-REC-S162-2 repeated). Remedy = house pattern of NOTICE-PR632-FRESH-BRANCH-S163-1 and practice 145: one commit on a FRESH branch whose FIRST fence is the full fence.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) plan item 2 · §12.8 · §13.11 · practice 145/101. ADVERSARY: same subject as ORDER-SCOUT-LAND-M3-S165-1/-2 (loop-breaking, OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1); scout-2 lands with a tree-equality review.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. `git ls-remote origin` master and phase/m3-feedback-evidence-s165-2, twice.
2. New branch phase/m3-feedback-evidence-s165-3 from fb28343ea332e98aa588bf73acc0762c84e1d9dc; `git checkout b736f1f40f10834629176a84cc07a552c664cafa -- .` (the tree of your pushed head); in the report keep ONE `FILE-FENCE:` line + the 29 `- <path>` lines (entityLayersSection.test.tsx included from the start) and replace the "FENCE-GREW:" wording with one line "CARRIED to a fresh branch per NOTICE-M3-FRESH-BRANCH-S165-1 (first fence = full fence)"; keep the evidence:race block. `npm run reseal` only if the manifest drifts. ONE commit (git commit -F <file>), parent = fb28343ea332e98aa588bf73acc0762c84e1d9dc.
3. PROOF (lean, quoted): `git diff --stat b736f1f40f10834629176a84cc07a552c664cafa` = the report file only; entityLayersSection.test.tsx alone 5×; relayAudit + report:check; the merge-base guard's fence functions (parseFenceBlocks/validateFence/fenceCovers) → problems [] and uncovered [] against fb28343ea332e98aa588bf73acc0762c84e1d9dc. NO full-suite repeats (practice 173) — CI is the certificate.
4. Plain push; ls-remote; print the head (40-hex).
5. Close PR 649 FIRST (a still-open 649 makes the new, higher-numbered PR yield): `gh pr close 649 --comment "SUPERSEDED-BY the fresh-branch PR from phase/m3-feedback-evidence-s165-3 (NOTICE-M3-FRESH-BRANCH-S165-1; FENCE-GREW)"`. Then open the PR from phase/m3-feedback-evidence-s165-3 to master with the same title as 649 and the report path in the body; print its number.
6. Slip SLIP-NOTICE-M3-FRESH-BRANCH-S165-1 (bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SLIP-NOTICE-M3-FRESH-BRANCH-S165-1.md") with PR number + head. Remove your scratch worktrees; say how many. Back to `node scripts/mail-wait.mjs AG-3 --budget-min 480`.
FORBIDDEN: --force; pushing to phase/m3-feedback-evidence-s165-2; editing any path other than the report prose; merging; migration apply; cron; printing an environment value.

END · NOTICE-M3-FRESH-BRANCH-S165-1
$b$ as t)
insert into public.relay_inbox (direction, lane_addr, artifact_name, body)
select 'to_lane','AG-3','NOTICE-M3-FRESH-BRANCH-S165-1', b.t from b where md5(b.t)='65b6ee8f92f1fde3ba7d1bbdf7cf7e4c' and encode(sha256(convert_to(b.t,'UTF8')),'hex')='a58e999aac0bb66eb5463d28ca8a836a58d5919ee165c044ebbaedf0c8d6ae23'
returning id, artifact_name, created_at, md5(body);
