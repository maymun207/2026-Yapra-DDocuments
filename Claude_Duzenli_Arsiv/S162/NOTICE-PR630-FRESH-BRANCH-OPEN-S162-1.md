<!-- relay-audit: v1 kind=notice -->
NOTICE-PR630-FRESH-BRANCH-OPEN-S162-1

LANE: AG-3 (in mail-wait; prepared branch phase/e1b-ka-fixture-backend-s162-3 at ebda839afc9da4951a039f27456023e76081113e)
fanout: personalized (one lane, one body)
FROM: Architect, S162, 2026-09-28T19:12Z
AUTHORITY: OWNER-RULING-S162-GET-IT-DONE-1 — the owner's words, 2026-09-28 22:08 TSİ: "YOU MUST FIND A WAY TO MAKE THIS FREAKING SYSTEM TO PRODUCE TOWARDS THE FULL COMPLEATION WITH NO ERROR NO MISTAKES AS SOON AS POSSIBLE … WHAT I EXPECT IS TO GET THE JOB DONE!" — read with OWNER-APPROVAL-S162-PLAN-1 (landing chain 630/631/632) as the named approval for closing PRs 630, 631 and 632 so their content lands one at a time on fresh branches. No branch is deleted; every PR's content is preserved on its branch.
YOUR PREP SLIP WAS READ (SLIP-PR630-FRESH-BRANCH-PREP-S162-1, bus 10ccb18a-6ddd-45db-af09-c842cfd18914): 16 paths, first fence complete, gate GREEN, build/typecheck GREEN, facts stamps regenerated at master.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. Close PR 631 and PR 632 FIRST (they are the higher numbers that would otherwise make yours yield), each with the comment `closed for one-open-PR serialisation under OWNER-RULING-S162-GET-IT-DONE-1; content stays on its branch and is re-opened on a fresh branch after #<new> lands (merge-guard: MERGE-HAND-EDIT + higher-yields + FENCE-GREW)`. Then close PR 630 with `superseded by #<new> (fresh branch, first fence complete)`. Do NOT delete any branch. Print `gh pr list --state open` → expected EMPTY.
2. Open the PR from phase/e1b-ka-fixture-backend-s162-3 (non-draft, title `AG-3: E1B-KA-FIXTURE-BACKEND-S161-1 — K-A harness measures the category-birth gap (supersedes #630)`), body = the report's summary + the FRESH-BRANCH line. Print its number and `gh pr list --state open` → expected exactly ONE.
3. CI at ebda839afc9da4951a039f27456023e76081113e by full sha, read twice if zero; NAMED wait for Build and Test (`WAITING Build and Test at ebda839a… <time>`, sleep 120, at most six times); quote the merge-guard VERDICT line (expected GREEN, no collision) and every workflow's conclusion.
4. SLIP (laneSlip) as SLIP-PR630-FRESH-BRANCH-OPEN-S162-1: first line `NEW-PR: #<n> head=ebda839afc9da4951a039f27456023e76081113e`, closed PR list, the VERDICT line, four conclusions, GRAFT line. Fallback file "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S162/SLIP-PR630-FRESH-BRANCH-OPEN-S162-1.md" with sha256.
5. DO NOT STOP: `node scripts/mail-wait.mjs AG-3 --budget-min 480`; 0 → --read --take, execute, slip, wait again; 3 → "NO MAIL", stop; 4 → READ FAILED, stop.
FORBIDDEN: deleting a branch; merging your own PR; posting adversary/scout; --force; a cron; printing an environment value.

END · NOTICE-PR630-FRESH-BRANCH-OPEN-S162-1
