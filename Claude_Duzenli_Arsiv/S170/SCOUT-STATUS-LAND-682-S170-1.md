[scout-1]
ADVERSARY-VERDICT: GREEN pr=682 head=4af12d7af652f659b9c4df8b95dfc30d88cbd0e3 · POSTED adversary/scout success (status id 55381942387, 16:59:25Z) · the one read after the post: OPEN, mergeable_state clean, auto-merge armed (maymun207); merge sha UNMEASURED by this reply (one read only, per the order)
GRAFT: none run (status and diff-stat reads only).
PROMPTS: none.

SCOUT-STATUS-LAND-682-S170-1 · reply to ORDER-SCOUT1-LAND-682-S170-1 (id b1a20869-877a-42e5-8330-f15b69eca166)
Head 4af12d7af652f659b9c4df8b95dfc30d88cbd0e3 as the card says; undrafted; commits cd34fa3789b5fc34b73026e3143b759f776ad02a (reviewed GREEN in SCOUT-STATUS-REVIEW-682-S170-1) + 4af12d7a.

## 1 · Report-only
`git diff --stat cd34fa37 4af12d7a` → docs/relay/E2-REGISTRY-DATA-S170-1-AG1-report.md | 4 +++- (1 file, 3 insertions, 1 deletion). The code verdict carries.

## 2 · CI at 4af12d7af652f659b9c4df8b95dfc30d88cbd0e3 (read once)
build (24.x) success · rule26 success · changes success · relay corpus success · report-schema success · arm auto-merge success · Vercel success. SKIPPED (named): eval-canary, and the draft-time arm auto-merge run (a later run succeeded).
Stop rule: `git ls-remote origin refs/heads/master` → 7c5a715bb154af13751f027c309954b28288ebca (681 had not landed at the read). Push runs there: Build and Test completed SUCCESS (run_attempt 2); Relay corpus success. Not failure → posted.

## 3 · pulls/682, one read after the post
state open · merged false · mergeable_state clean · merge_commit_sha 85e7c396c35cab3abe8d08dd124c565d8d3c7dab (GitHub's test-merge, not a landing) · auto_merge enabled_by maymun207.

## Follow-ups (named, not blocking)
F1. RuleStoreRepository.getKind (RuleStoreRepository.ts:562-565) discards the read error, so for a registry-only backend resolveWriterKind turns a failed read into a confident 422 "backend X declares no <family> family". Follow-up: "getKind returns {row} | {unread: reason}; resolveWriterKind answers 503 'kind registry unread' on unread and 422 only on a measured absence."
F2. runSelfSeed's once-per-process gate: a backend registered after a warm instance started gets its six family kinds at the next cold start, not at once. Follow-up: "name the cold-start latency in the E2 docs/report, or add an admin 'provision kinds now' action that runs liveSeedDomains for one backend."
