<!-- relay-audit: v1 kind=notice -->
NOTICE-PR630-FRESH-BRANCH-PREP-S162-1

LANE: AG-3 (in mail-wait; branch phase/e1b-ka-fixture-backend-s161-2, PR 630, head fcafd59df4e088920d5540d3ddbcc8968c69f2fa)
fanout: personalized (one lane, one body)
FROM: Architect, S162, 2026-09-28T19:06Z
OWNER APPROVAL: OWNER-APPROVAL-S162-PLAN-1 (landing chain). The PR closures this prepares for are PENDING the owner's named approval ("onay serial-close"); this notice only PREPARES — it opens no PR and closes nothing.
YOUR SLIP WAS READ (SLIP-PR630-BASELINE-S162-1, bus 375b892b-ef6d-4685-bcc9-4a3cf93d4311): FENCE-GREW RED; you refused to drop the path from the fence — correct. A-REC-S162-2 (Architect): "FENCE-GREW allowed" was my unmeasured premise; the guard allows no growth after the first fence. MEASURED CONSEQUENCE (scout-1 on 631 + your run): a hand-merge is RED, a fresh branch takes a higher number and yields, and a fence cannot grow — so the three open PRs block each other. The remedy is ONE OPEN PR AT A TIME on fresh branches whose FIRST commit carries the whole fence. 630 goes first.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER (prepare only)
1. `git fetch origin`; master must be 7b54180dc68b7f4b3ca76d4cbab45d8bde5f8e26 (if it moved, STOP and slip). `git checkout -b phase/e1b-ka-fixture-backend-s162-3 origin/master`.
2. Bring 630's CONTENT over without a merge: `git checkout fcafd59df4e088920d5540d3ddbcc8968c69f2fa -- <every path in `git diff --name-only origin/master fcafd59df4e088920d5540d3ddbcc8968c69f2fa`>` (that list = your 15 original paths + data/gates/backend-names-baseline.json; print it). public/architecture/manifest.json comes from fcafd59d's tree (already resealed on master 7b54180d) — run `npm run reseal` anyway and confirm it is a no-op (`git status --porcelain` shows no manifest change after reseal; if it does, keep the reseal result).
3. Report: the ```scope``` fence in docs/relay/E1B-KA-FIXTURE-BACKEND-S161-1-AG3-report.md must list EVERY path of step 2 (baseline included) — this is the FIRST fence of the new branch; add one evidence-fenced line `FRESH-BRANCH: phase/e1b-ka-fixture-backend-s162-3 from master 7b54180dc68b7f4b3ca76d4cbab45d8bde5f8e26; content = fcafd59d tree; supersedes PR 630 (FENCE-GREW + MERGE-HAND-EDIT + higher-yields, guard by design)`; `node scripts/relayAudit.ts` on it. Prove: `git diff --stat fcafd59df4e088920d5540d3ddbcc8968c69f2fa -- <the paths>` shows ONLY the report's new lines.
4. `npm run check:backend-names` → GREEN; `npm run build` (five gates) + `npm run typecheck:api`; quote last lines. ONE non-merge commit.
5. `git push -u origin phase/e1b-ka-fixture-backend-s162-3`; print the 40-hex head and the ls-remote line. DO NOT open a PR and DO NOT close 630/631/632 — that step comes in the next notice after the owner's approval.
6. SLIP (laneSlip) as SLIP-PR630-FRESH-BRANCH-PREP-S162-1: `NEW-HEAD: <40-hex> branch=phase/e1b-ka-fixture-backend-s162-3 (no PR yet)`, the path list, diff-stat proof, gate/build/typecheck last lines, GRAFT line. Fallback file "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S162/SLIP-PR630-FRESH-BRANCH-PREP-S162-1.md" with sha256.
7. DO NOT STOP: `node scripts/mail-wait.mjs AG-3 --budget-min 480`; 0 → --read --take, execute, slip, wait again; 3 → "NO MAIL", stop; 4 → READ FAILED, stop.
FORBIDDEN: opening or closing any PR; any merge commit; rebase; --force; a cron; printing an environment value.

END · NOTICE-PR630-FRESH-BRANCH-PREP-S162-1
