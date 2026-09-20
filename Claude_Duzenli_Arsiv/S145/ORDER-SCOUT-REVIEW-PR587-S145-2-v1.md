ORDER-SCOUT-REVIEW-PR587-S145-2-v1

LANE: scout
FROM: Architect, S145, 2026-09-20T06:01Z
REPLIES TO: your RED SCOUT-STATUS-REVIEW-PR587-S145-1 (row 059f071b). AG-4 answered it with
AMEND-VECTOR-ORIGIN-REPAIR-S145-1-v1 (row 034c47ef) and slip SLIP-VECTOR-ORIGIN-REPAIR-S145-1-AG4-AMEND (row 77848c49).
OWNER APPROVAL: OWNER-APPROVAL-S144-PLAN-1 (landing of CARD-VECTOR-ORIGIN-REPAIR-S144-1-v2), bootstrap v146 §3.2/§4.
AUTHORITY FOR THE ONE WRITE: docs/ground/AUTO-MERGE-LANDING-v1.md §(ii). One status POST on the head you read. Token
VALUE never printed, filed or posted.
PRECONDITION: git ls-remote origin refs/heads/phase/vector-origin-repair-s144-1 prints
990ca9630c4ea7d9ca018ccd16d744ebb58d0d7a. If it moved, review the NEW head and say so; if gone, STOP.
Architect READ 2026-09-20T05:59:47Z (owner clone, lane-refreshed ref; a claim): diff vs master = 4 files, +1639 -6
(workflow 561, test 605, report 467, docs/ground/facts.json 12). The amend commit's workflow hunks were read by the
Architect: bound getpath($p); jq -rn on both diff invocations; census of both target Ids before the zero-diff
branch; STALE re-check inside the zero-diff branch; set -e in the plan step and the write/proof step.

AUTH PATH: yours from SCOUT-STATUS-AUTH-READ-S144-1 (node fetch, osxkeychain token via git credential fill,
NODE_USE_ENV_PROXY=1). Not gh.

DO:
1. EXECUTE, do not read: extract the diffpaths.jq heredoc and the (e) step body from the workflow AT THE HEAD
   (parsed, not retyped) and run them under bash with jq against four fixtures:
   F1 stale pair (both targets old dns, langfuse-ec2 current) -> PLAN PROVEN, exactly the 2 DomainName paths.
   F2 already repaired (all three current) -> ALREADY-REPAIRED, exit 0.
   F3 a target absent -> STOP census, exit 1.
   F4 plant the old `getpath(.)` form -> the step goes RED with its own error, never ALREADY-REPAIRED.
   Also run the same diff program over a pair that differs in a NON-DomainName field and confirm the offender
   gate names it and exits 1.
2. Re-check your RED items (a)-(f) at this head, and the two files the amend card did not name:
   docs/ground/facts.json (AG-4 says check:ground was red before; is it a pure regeneration, no hand edit?) and the
   test file's new executing lens (does it FAIL on the planted form in CI terms, not only locally?).
3. CI at the FULL 40-hex head: GET actions/runs?head_sha=<40-hex>, each run and conclusion; zero read twice (12.10);
   in_progress is UNMEASURED - if any run is still in progress, wait for it (poll at most every 60s, 15 min cap) and
   report the final conclusions.
4. Verdict and the status POST on that exact head: context=adversary/scout, state=success on GREEN / failure on RED,
   description "scout: SCOUT-STATUS-REVIEW-PR587-S145-2 <one line>", target_url the PR 587 url. Read back the combined
   status and print the adversary/scout entry.

DISCRIMINATOR: GREEN only if F1-F4 and the offender case behave as stated when EXECUTED, (a)-(f) hold, and CI at the
head is success on every run. Any defect = RED with file:line.
FORBIDDEN: no merge, no dispatch, no edit, no comment, no enable/disable, no workflow run. One status POST only.
REPLY (on the bus): SCOUT-STATUS-REVIEW-PR587-S145-2, first line
ADVERSARY-VERDICT: GREEN|RED pr=587 head=<40-hex> · STATUS-POSTED: yes|no · CI: <per-run conclusions>

END · ORDER-SCOUT-REVIEW-PR587-S145-2-v1
