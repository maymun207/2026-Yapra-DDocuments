<!-- relay-audit: v1 kind=notice -->
NOTICE-PROBES-FENCE-S169-1

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 notice" and stops). First line of every message: `[AG-1]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T04:28Z
MEASURED (gh API by full head sha + the owner's screenshot of the changes job on #667): your draft probe PRs against phase/pr-fast-test-s169-1 — #666 (probe/pft-b, head 7c0ad1229a66…) and #667 (probe/pft-e, head f413c7773bab…) — went RED in job `changes`: merge guard `FAIL NO-FENCE — 0 FILE-FENCE: blocks among the changed report files (none)` and `FAIL COLLISION — UNMEASURED: the fence of lower-numbered #666 cannot be read … YIELDED-TO #666`. So `build` was SKIPPED on both: proofs P6(b) (vitest.config.ts → tests=full) and A6(e) (deleted api file → tests=full) have NOT run. #665 (probe/pft-d) passed `changes` and its build is running.
WHY: the guard requires every PR, probes included, to carry exactly one FILE-FENCE block in a changed report file; an unfenced lower-numbered PR blocks every higher one against the same base.
ORDER (one path):
1. Give EACH probe branch one small report file docs/relay/PROBE-<letter>-S169-1-AG1-report.md whose line 1 is `<!-- relay-audit: v1 kind=report -->` and which carries one `## FILE-FENCE` section listing exactly that probe's changed paths (equal to `git diff --name-only <its base>...HEAD`). Push each. Do not change what the probe tests.
2. Slip SLIP-NOTICE-PROBES-FENCE-S169-1 with each probe's new head 40-hex and "ci: dispatched (not watched)". Back to mail-wait (--budget-min 110). The Architect reads the probe runs and tells you the results.
3. The probes stay DRAFT and are never merged; close them after 663's report quotes their results.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

END · NOTICE-PROBES-FENCE-S169-1
