<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-MEASURE-PR629-GUARD-S162-1

LANE: scout (scout-1 window, in mail-wait)
fanout: personalized (one lane, one body)
FROM: Architect, S162, 2026-09-28T17:06Z
OWNER APPROVAL: OWNER-APPROVAL-S162-PLAN-1 (landing chain 628 → 629 → 630); OWNER-RULING-S161-LANES-WAIT-1.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
WHY: PR 628 landed (master 7b54180dc68b7f4b3ca76d4cbab45d8bde5f8e26). AG-1 merged master into PR 629 under NOTICE-PR629-MERGE-MASTER-S162-1 (package.json union); NEW HEAD bcb0c576ac2e1f815ff34ec1e0824d0c1a337e1b (merge commit 6c3c7128faf2…, report commit bcb0c576…). At that head the Architect read (actions/runs?head_sha=, twice, total_count 4 both reads): Auto-merge landing success · report-schema success · Relay corpus success · **Build and Test FAILURE** — job `changes` failed at step 6 "Merge guard (clean-merge + file-fence, run from the merge-base)"; jobs build and rule26 SKIPPED (silent, not passing); eval-canary skipped by design. The Architect cannot read job logs (proxy 403) — this is your instrument (§12.9). The same merge-master shape passed the guard GREEN on PR 628 one hour earlier.
WHAT: MEASURE the cause of the guard RED. Do not fix, do not re-run (S55-1), do not post a status.

## STEPS
1. `git fetch origin` · `git ls-remote origin refs/pull/629/head refs/heads/master` read twice, print both. Expected head bcb0c576ac2e1f815ff34ec1e0824d0c1a337e1b; if it moved, measure the CURRENT head and say so in the reply's first line.
2. The Build and Test run at that head (`gh run list --commit <head> --workflow "Build and Test"` or the runs API by head_sha): job `changes`, step 6 log. Print EVERY line containing `[merge-guard]` VERBATIM, and the last 30 lines of the step. No paraphrase (§12.4).
3. Name the cause CLASS from those bytes: COLLISION (which PR numbers, which paths, and who yields — compare with 628's run, where the line read "overlaps higher #629 … #629 yields; VERDICT GREEN"); FENCE (which paths fall outside which fence file, and whether the guard diffs against master or against the merge-base c58438b59cff4d1d403634b28e44af9b01db6dea — "run from the merge-base" is the step's own name; if the guard counts master's own commits as the PR's, say so, that is a guard defect not a PR defect); CLEAN-MERGE (which paths conflict); OTHER (print).
4. Fence check yourself: `git diff --name-only origin/master...<head>` vs the ```scope``` fence in docs/relay/LANE-SANDBOX-ALLOWANCES-S161-1-AG1-report.md at that head — print both sets and the difference both ways. Also `git diff --name-only c58438b59cff4d1d403634b28e44af9b01db6dea..<head>` count (what a merge-base-rooted diff would see).
5. package.json at head: `git diff origin/master -- package.json | grep -c '^-'` and `grep -c '^+'`; confirm `check:backend-names` is present exactly once and every `tsx scripts/` script line is `node --import tsx` (the union rule of the notice).
6. REPLY with scout_reply as SCOUT-STATUS-MEASURE-PR629-GUARD-S162-1, first line `GUARD-CAUSE: COLLISION|FENCE|CLEAN-MERGE|OTHER pr=629 head=<40-hex>`, then the verbatim lines, then ONE sentence naming who must act (AG-1 on its own PR, or a guard defect for a card). If the bus write is refused, write the same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S162/SCOUT-STATUS-MEASURE-PR629-GUARD-S162-1.md" and print its sha256.
7. THEN DO NOT STOP: `node scripts/mail-wait.mjs scout --budget-min 480`; exit 0 → --read the new order, execute, reply, wait again; 3 → "NO MAIL", stop; 4 → READ FAILED with reason, stop.
FORBIDDEN: no edit, no push, no merge, no re-run, no dispatch, no status post, no cron; never print an environment value.

END · ORDER-SCOUT-MEASURE-PR629-GUARD-S162-1
