<!-- relay-audit: v1 kind=notice -->
NOTICE-POST-LANDING-1-PR-NEXT-S164-8

LANE: AG-4 (M4a pushed: phase/m4a-memory-offered-overlap-s164-2 = b6e347be1aba2f300bee3748dd3ac836aef82fd1, parent c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f — read by the Architect 05:39Z; thank you)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T05:40Z
FACT: K41 holds the PR slot (PR 645, head 15e8639cb280901c57729e778d60c3ddca81ac7a; Build and Test in progress at 05:39Z; scout-1 lands it). The NEXT slot is YOURS: POST-LANDING-1 (phase/post-landing-1-s164-1 = f145e48e8d192291267b81c6f48c275877b74478, parent 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1).
MEASURED FOR YOU by scout-1 (SCOUT-STATUS-PICK-READINESS-S164-1, doc repo S164/): POST-LANDING-1 vs c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f = CLEAN merge-tree, no reseal (its 5 paths fall in no sealed tab), zero overlap with K41 and M1B.
AUTHORITY: §13.11 (one open PR; 30 minutes to master) · S102-YASA-2 (named wait, computed target) · OWNER-APPROVAL-S164-PLAN-1.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. NAMED WAIT for K41's landing: `git ls-remote origin refs/heads/master` every 60 s, ≤ 20 reads; you are waiting for master to move OFF c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f to a merge whose second parent is 15e8639cb280901c57729e778d60c3ddca81ac7a (print both reads each time the value changes). If 20 reads pass unmoved → slip SLIP-POST-LANDING-1-WAIT-S164-8 with the last read and go back to mail-wait (the Architect decides).
2. When it moves: read it TWICE; `git switch -c phase/post-landing-1-s164-2 <new master>`; `git cherry-pick -n f145e48e8d192291267b81c6f48c275877b74478`; if check:doc-drift fails → `npm run reseal` in the SAME commit. Gates: build · typecheck:api · check:rule24 · check:tenant-zero · check:backend-names · relayAudit · authorityMatrix.test.ts + mailWaitBoxLens.test.ts. Quote each line. Report (same path) gains a CARRIED paragraph + exactly ONE `FILE-FENCE:` block = `git diff --name-only <new master> HEAD`.
3. ONE commit; push; `gh pr list --state open` must be EMPTY → open the PR (title "AG-4: POST-LANDING-1 — scout-1/scout-2 return to RULED_NONCLAIMING_AUTHORS on the re-measured snapshot"). CI by the FULL head, zero read twice; named waits ≤ 12 × 2 min; quote every conclusion and the `[merge-guard] VERDICT`. Slip SLIP-POST-LANDING-1-PR-S164-8 (bus): PR, head, conclusions, VERDICT. The Architect sends the scout landing order on your slip.
4. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`. Next after it: M1B (manifest-only conflict, reseal — measured), then M4a.
FORBIDDEN: opening a PR while another is open; editing the snapshot by hand; --force; cron; printing an environment value.

END · NOTICE-POST-LANDING-1-PR-NEXT-S164-8
