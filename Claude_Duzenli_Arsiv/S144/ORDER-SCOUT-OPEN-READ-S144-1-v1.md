ORDER-SCOUT-OPEN-READ-S144-1-v1

LANE: scout
FROM: Architect, S144, minted 2026-09-20T03:54:41Z
OWNER APPROVAL: "onay scout-open-read", 2026-09-20 06:53 TSI (this order only).
AUTHORITY: the owner's consent of 2026-09-19 (keychain credential, GitHub API READS ONLY) stands. Never print,
file or post the value.
PRECONDITION: none on master — measuring master IS the order. The owner's clone's lane-refreshed ref
refs/remotes/origin/master reads 7572c3bbfeed23656fcf8a55f6e64d93ed240c14 (READ 2026-09-20T03:54Z); that is a
claim, not an ls-remote.

WHY: S144 opens on the bootstrap's step 2. Anchor, gate and auto-merge were last read 2026-09-19 19:24Z-20:45Z
and are CARRIED UNVERIFIED. The Architect's container has no GitHub credential (ls-remote refused 03:47:02Z);
per 12.9 that is a dispatch, not a blocker.

MEASURE, each with HTTP status, verbatim message on non-200, and the instant from date -u:
1. git ls-remote origin refs/heads/master -> the full 40-hex. If it is not 7572c3bb..., also print
   git log --oneline 7572c3bbfeed23656fcf8a55f6e64d93ed240c14..<new head> (subjects only).
2. GET /repos/maymun207/cwf_yaprak/rulesets/21034238 -> name, enforcement, bypass_actors (count), the
   required status contexts list, current_user_can_bypass.
3. GET /repos/maymun207/cwf_yaprak/actions/workflows/auto-merge.yml -> state.
4. GET /repos/maymun207/cwf_yaprak/pulls?state=open&per_page=100 -> count and number list only (item 20
   context; say if the page is full).

DISCRIMINATOR: GATE: ENFORCING only if (2) returns 200 with enforcement=active, bypass_actors=0 and
adversary/scout among required contexts. A zero or empty from any endpoint is read a SECOND time before it is
reported (12.10), and the report says it was.

FORBIDDEN: GET and ls-remote only. No merge, no enable/disable, no status post, no dispatch, no edit, no comment.

REPLY (on the bus): SCOUT-STATUS-OPEN-READ-S144-1, first line
GATE: ENFORCING | NOT-ENFORCING | UNMEASURED  ·  MASTER: <40-hex>  ·  AUTO-MERGE: <state>

END · ORDER-SCOUT-OPEN-READ-S144-1-v1
