ORDER-SCOUT-REVIEW-PR587-S145-1-v1

LANE: scout
FROM: Architect, S145, 2026-09-20T05:17Z
OWNER APPROVAL: OWNER-APPROVAL-S144-PLAN-1 (landing of CARD-VECTOR-ORIGIN-REPAIR-S144-1-v2), carried by bootstrap v146 §3.2
and §4: "If a PR exists: order the scout to review the diff at the head and post adversary/scout." No new approval needed.
AUTHORITY FOR THE ONE WRITE: docs/ground/AUTO-MERGE-LANDING-v1.md §(ii) — the scout writes adversary/scout on the head it
read. That status POST is the ONLY write this order allows. Token VALUE is never printed, filed or posted.
PRECONDITION: git ls-remote origin refs/heads/phase/vector-origin-repair-s144-1 prints
34d768a2a924ab83b2cfea664df16cf369b320c2. If it moved, review the NEW head instead and say so; if the branch is gone, STOP.
Architect READ 2026-09-20T05:14:32Z (owner clone, lane-refreshed ref; a claim, not an ls-remote): master
7572c3bbfeed23656fcf8a55f6e64d93ed240c14, branch head as above, diff = 3 files, +1133:
.github/workflows/vector-origin-repair.yml (516), its test (338), the AG-4 report (279).

WHY: PR 587 is AG-4's build of the card you returned GREEN at sha256
504b16a9af603b9db5f4e589678c8073ebc657a23d495c884179871ab481d60b. Master cannot land it without adversary/scout. It is the
only thing between the product and the vector repair.

AUTH PATH: yours from SCOUT-STATUS-AUTH-READ-S144-1 — node fetch to api.github.com with the osxkeychain token from
`git credential fill`, NODE_USE_ENV_PROXY=1. NOT gh (gh fails TLS in your window).

DO:
1. Read the DIFF at the head (git diff origin/master...<head>), not the report's prose. Attack it:
   (a) Can the workflow write ANY field of the distribution other than the DomainName of origins vector-index and
       vector-encoder? Is the write refused unless the structural diff is EXACTLY those two paths?
   (b) Is the write reachable without confirm=repair? Is the default input a dry run?
   (c) Triggers: workflow_dispatch only? No push / pull_request / schedule path that could write?
   (d) permissions: block minimal? Any secret or ${{ }} input interpolated inside a run: body?
   (e) ETag / If-Match on the update; POST-WRITE-DRIFT exits non-zero (card D2)?
   (f) Does the test file actually fail when (a)/(b) are broken, or only assert text presence?
2. CI at the FULL 40-hex head: GET actions/runs?head_sha=<40-hex>. Name each run and conclusion. A total_count of 0 is
   read a SECOND time before it is reported (12.10). In-progress is UNMEASURED, not green.
3. Verdict, then the status POST on that exact head:
   POST repos/maymun207/cwf_yaprak/statuses/<40-hex head>  context=adversary/scout
   state=success on GREEN, state=failure on RED; description = "scout: <verdict row name> <one line>";
   target_url = the PR 587 url. Then GET the combined status and print the adversary/scout entry (read-back).

DISCRIMINATOR: GREEN only if (a)–(f) all hold on the diff. Any defect = RED with the file:line.
FORBIDDEN: no merge, no dispatch, no edit, no comment, no enable/disable, no workflow run. One status POST only.
REPLY (on the bus): SCOUT-STATUS-REVIEW-PR587-S145-1, first line
ADVERSARY-VERDICT: GREEN|RED pr=587 head=<40-hex> · STATUS-POSTED: yes|no · CI: <per-run conclusions>

END · ORDER-SCOUT-REVIEW-PR587-S145-1-v1
