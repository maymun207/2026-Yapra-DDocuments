<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-MEASURE-PR622-PR623-RED-S159-1-v1

LANE: scout (scout-2 window; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S159, 2026-09-26T16:26Z
OWNER APPROVAL: OWNER-APPROVAL-S159-PLAN-1 ("1-) onayliyorum", 18:20 TSI; step 3 = the numeric card behind PR 622) and OWNER-RULING-S159-NIGHTLY-FLOOR-22-1 ("onay nightly 22/24", 19:02 TSI; PR 623). This order is a READ in service of those two landings.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section.
GRAFT: code context from graft first; your status carries a GRAFT line.
SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: MEASURE why TWO independent pull requests, opened minutes apart on the same base, both fail the SAME two gates: the merge guard step of the changes job (Build and Test) and the Relay corpus assertion. Name the cause per PR from the job logs; say whether the cause is shared (something on master or in the environment) or per-PR (each report's own bytes). No fix, no edit: the AUTHOR lane repairs its own file (project instruction 12.12).

## PREMISE
READ (Architect, GitHub API via the read-only token, 2026-09-26T16:26Z): master 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35. PR 622 head 64c11225a873c5dd3387e23606403ef122430c30 (AG-4, phase/numeric-same-absolute-s159-1, 11 files); PR 623 head b391b46b68a42cc739d6ad177ce9a4016272ca3e (AG-1, phase/nightly-compat-floor-22-s159-1, 3 files). Both base = master. At both heads: Build and Test FAILURE at job changes, step 6 "Merge guard (clean-merge + file-fence, run from the merge-base)"; jobs eval-canary, build, rule26 SKIPPED (silent, not passing); Relay corpus FAILURE at step 5 "Relay corpus assertion"; report-schema and Auto-merge landing success. PR 623 also has a Nightly Compatibility workflow_dispatch run in progress (ordered by its card).
READ: the Architect cannot download job logs (proxy 403 on the log host); you can.
SELF-INVALIDATION: dies if either PR head has moved by the time you read (then measure the NEW head's runs and say so; the question is the same).
ON-DISAGREEMENT: YOUR READING WINS; print both.

## STEPS
1. Print git ls-remote origin refs/heads/master refs/pull/622/head refs/pull/623/head (full 40-hex).
2. For EACH PR, the merge guard step log: quote every [merge-guard] line verbatim (CLEAN-MERGE, FENCE, COLLISION, VERDICT and any FAIL/UNMEASURED line with its class name). Say which guard CLASS fired (COLLISION / NO-FENCE / OUTSIDE-FENCE / FENCE-GREW / MERGE-HAND-EDIT / GUARD-BOOTSTRAP / UNMEASURED reseal / other) and the path or PR number it names. If COLLISION: quote the overlapping fence entries and which PR yielded.
3. For EACH PR, the Relay corpus assertion log: quote the failing assertion lines verbatim (file, rule/check id, the offending line). Say whether the offending bytes are in the PR's own new report under docs/relay/ or in a file that is UNCHANGED by the PR (then the cause is on master).
4. Shared-cause test: run the relay corpus check and the merge guard locally at MASTER (2a6f6781b1a4748aac5f5bc7b1d73136863b1c35, no PR changes) if the scripts allow a local run (name the commands); print pass/fail. A red at master means the cause landed with PR 621 or earlier and is not either lane's.
5. Verdict line first: `MEASURE: shared=<yes|no> guard=<class per PR> corpus=<rule per PR>`. Then the per-PR facts. Name, per PR, WHICH lane must repair WHAT file (12.12: never the other lane's file, never a re-run).
REPLY (on the bus, scout_reply): SCOUT-STATUS-MEASURE-PR622-PR623-RED-S159-1.
FORBIDDEN: read-only. No edit, no push, no re-run, no dispatch, no status post, no poll task, no cron. Never print an environment value.

END · ORDER-SCOUT-MEASURE-PR622-PR623-RED-S159-1-v1
