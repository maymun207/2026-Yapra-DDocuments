# CWF-S169-FINDINGS-v1
- F-S169-ROW197-PREMISE-FALSE-1 (row 197): git diff is already allowed in settings; the auto-mode classifier overrides allow rules and reserves the outcome to the window's user. Fix = owner consent in that window, per refusal. Never "smaller pieces".
- F-S169-SCOUT1-REPLY-CHANNEL-BLOCKED-1: scout_reply POST failed DNS without envProxy and was classifier-denied with it; owner consent in the window cleared it. SCOUT-ACK (668) uses the same route ii from mail-wait.
- F-S169-MAILWAIT-120MIN-HARNESS-CAP-1 (row 202): the harness stops background commands at 120 min; --budget-min 480 silently dies at 120. Interim rule: 110 + re-run; code fix pending.
- F-S169-LANES-DEAF-WHILE-WATCHING-CI-1 → OWNER-RULING-S169-NO-CI-WATCH-1.
- F-S169-RELATED-MODE-UNREACHABLE-1 (row 201, AG-1): every PR carries a docs/relay report, so an api/shared-only allowlist never fires; Architect ruling admits docs/relay/**.
- F-S169-SLIP-CI-FIELD-1 (row 206; AG-4, AG-2): laneSlip.mjs:73 accepts `ci:` only as run+state or UNMEASURED...; lanes write "ci: UNMEASURED dispatched (not watched)".
- F-S169-CI-RUNNER-2-CORES-1 (AG-3, A4): CI build job has 2 cores → vitest default 1 worker; follow-up maxWorkers 2 (row 203).
- F-S169-CONFORMANCE-DOC-NO-COMMIT-KEY-1 (row 205, scout-2): frontmatter has 5 keys vs STAMP_KEYS 6; no gate reads .md stamps. Dark.
- F-S169-AUTHMATRIX-DMTS-1 (row 204, AG-4): scripts/authorityMatrix.d.mts lacks canonicalConformanceDocument; test uses a namespace cast.
- F-S169-DOUBLE-FULL-RUN-1 (row 207): each landing runs the full suite on the PR and again on master; merge queue (merge_group trigger already present) would run once — owner surface.
- F-S169-BRIDGE-DB-CLOCK-SKEW-NONE: bridge `date -u` and DB created_at agree (04:03 both); the 03:50 miss was A-REC-S169-3, not skew.
END · CWF-S169-FINDINGS-v1
