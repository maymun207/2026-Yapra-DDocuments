ADVERSARY-VERDICT: GREEN pr=653 head=6bcdab70d9844d7777dbc72eea0f3bba5677fb1c · LANDED merge=a3ce7b0c1b1ba39d559d034e2c18fb938799a76c by=maymun207
SCOUT-STATUS-LAND-RESILIENCE-S166-1 · scout-2 → Architect · reply_to ORDER-SCOUT-LAND-RESILIENCE-S166-1 (id 58bf8d06-3712-4514-808c-a4f2243a954f, md5 d25c2e1430eef6fbbb2de00753cfab69 DIGEST-OK)
LANDED BY THE OWNER'S CLICK, NOT BY AUTO-MERGE: merged_by.login = maymun207 · auto_merge = null (never armed; `auto_merge.enabled_by.login` has no value to print). The "arm auto-merge" job failed at both heads on the ADF_MERGE_TOKEN permission (§3).

1 · HEAD. Named wait (every 2 min, ≤ 10) from 19:40:51Z. Waits 1-2 read 4b97f924. At wait 3 (19:44:53Z) the head was **6bcdab70d9844d7777dbc72eea0f3bba5677fb1c**, ONE commit whose parent = 4b97f92405f66d0ebe68a1edbbdc2960b515f800 (AG-1: "DNS is transient after a good read; every retry line names its class (… D1, D2)").

2 · REVIEW. The whole PR diff against merge-base d768bc29 is 3 paths (scripts/mail-wait.mjs, api/cwf/__tests__/mailWaitTransient.test.ts, docs/relay/LANE-RESILIENCE-S166-1-AG1-report.md), equal to the report's FILE-FENCE. **Deviations from A1–A6 / D1 / D2: none.**
- A1: `transientClass` judges the RENDERED message. The classes come from `FETCH_CLASS` (imported, not re-spelled): CONNECT, ROUTED-DNS, PROXY-REFUSED, DNS. They are matched as `(^|[^A-Z-])<CLASS>: fetch failed`, so they also match behind `initialize: `. `HTTP (408|429|500|502|503|504) from MCP` also counts. Everything else rejects at once. The test table pins PROXY-SET-UNUSED, FETCH-FAILED, AUTH 401/403, HTTP 404/400, `MCP error`, `no JSON array`, `SSE … no data frame` and a JSON parse error as NOT transient.
- A2: `readRetrying` calls `connect(endpoint)` on every attempt > 0, and the establishment attempt connects inside `fn`. `endpoint` is resolved once. Test (f) pins sessions s0 → s1 → s2.
- A3: `rpc`, `connect` and `query` are unchanged. Retry is wired at establishment (roster + high-water), poll, page and BOX-PROBE, plus the watermark read. BOX-NON-EMPTY-BUT-READ-EMPTY, `--read`/readCard, `--table-lens` and `--pre-watermark` are untouched.
- A4: `retryTransient(fn, { deadline, now = Date.now, sleep, log, label, capMs, afterGoodRead })`, and `const deadline` moved above the establishment try. The tests run on a fake clock: (c) sleeps 585 000 ms on the fake clock and no real time.
- A5: `AFTER_GOOD_READ_ONLY = [PROXY-REFUSED, DNS]`. Establishment uses `afterGoodRead:false` and `capMs = ESTABLISH_TRANSIENT_CAP_MS` (10 min). The watermark read retries before it may fall back.
- A6 / D2: **R2 is ABSENT** and the report says why. The `.claude/settings.json` edit was REFUSED by the harness (Self-Modification) and not routed around; R2 was dropped by the Architect's ruling. Closing a PR is `gh api repos/maymun207/cwf_yaprak/pulls/<n> -X PATCH -f state=closed`. That form passes guard-bash GB-5: GATE_PATH (:206) matches rulesets/branch protection only, and REPO_ENDPOINT (:210) matches the bare `repos/<o>/<r>` only.
- D1: a bare DNS failure is transient only after a good read. The word boundary keeps `DNS` from matching inside `ROUTED-DNS`, and ROUTED-DNS is tested first. Test (g) pins both halves, and every retry line prints `TRANSIENT <CLASS>`.

3 · CI at 6bcdab70d9844d7777dbc72eea0f3bba5677fb1c (full sha). 4 runs, all attempt 1:
- report-schema 36767660167 success · Relay corpus 36767660131 success.
- Build and Test 36767660119 success:
  - `changes` success. The merge guard logged `pr #653 base d0d43d80… merge-base d768bc29…` · `CLEAN-MERGE: no in-branch merge in merge-base..head` · `FENCE-GREW ok — head fence is held by the first fence, at 4b97f924…` · `timeline ok — 3 events, no reopen, no force-push` · `COLLISION ok against #652 — fences disjoint` · **`[merge-guard] VERDICT GREEN`**.
  - `build (24.x)` success, every step: RULE-40, Migration version-key, Tenant-zero, Backend-name, Build, Run tests.
  - **`rule26` SKIPPED** (0 steps). The CI-DIET decision skipped it because the diff has no src/ or public/ path. rule26 is a required context; a conditionally skipped job counts as success for the ruleset. I name it here and do not fold it into the green.
  - `eval-canary` SKIPPED, by design.
- **"arm auto-merge"** (Auto-merge landing 36767660134): **FAILURE**. Its last lines were `GraphQL: Resource not accessible by personal access token (repository.pullRequest)` · `##[error]Process completed with exit code 1.` This is the same failure as at 4b97f924, so the owner's token fix was not in effect by 19:44Z.
- Master moved twice during the order: d0d43d80 (PR 651), then b7740dbf (PR 652). `git merge-tree --write-tree origin/master(b7740dbf) 6bcdab70` gave a clean tree ab6d10f7 with no conflict, and master had not touched mail-wait.mjs, envProxy.mjs or the test since d768bc29.

4 · LANDING.
- Collision guard: head statuses read twice (only Vercel preview); adversary/scout count 0 just before posting.
- POSTED `adversary/scout | success | scout-2 GREEN ORDER-SCOUT-LAND-RESILIENCE-S166-1: A1-A5 + D1/D2 held, fence 3=3, guard GREEN, CI green (rule26 skipped) | 2026-09-30T19:59:48Z`.
- Named wait for master, every 60 s, at most 10:
  - Waits 1–3 (19:59:56Z to 20:02:01Z): open, `mergeable_state=unstable` (the failed non-required arm job; it was NOT `behind`), `auto_merge=null`.
  - Wait 4 (20:03:03Z): merged. Timeline: `merged 2026-09-30T20:02:59Z maymun207` · `head_ref_deleted 20:03:01Z`.
  - Merge = master = **a3ce7b0c1b1ba39d559d034e2c18fb938799a76c**, merged_by **maymun207**, auto_merge.enabled_by: none (never armed).
- Vercel PRODUCTION at the merge sha: `Production | success | Deployment has completed | 2026-09-30T20:08:27Z`. No deployment at waits 1–6; it appeared at wait 7 (20:09:20Z).
- STILL OPEN for the owner: until ADF_MERGE_TOKEN can reach repository.pullRequest, the arm job fails on every PR and nothing auto-merges. Every landing then needs a click like this one.

read relay_inbox at 2026-09-30T19:40:24Z (mail-wait exit 0, 1 row) + --read of order 58bf8d06. The previous window's CI wait was cut by a session end; every state above was re-measured after resuming.
