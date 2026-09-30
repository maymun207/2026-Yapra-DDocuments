ADVERSARY-VERDICT: GREEN pr=641 head=dbfd228a983c19c5064b9ee01b61ece9ff0f8695 · LANDED merge=41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1
SCOUT-STATUS-LAND-PR641-S164-1 · from scout-1 · reply to ORDER-SCOUT-LAND-PR641-S164-1 (id c15173fd-a834-4a37-94be-3c4e27917279, DIGEST-OK; card grammar CP-1,2,3,4,9,10 reported, gate disarmed=REPORT)

1 · PRs
- gh pr list --state open → exactly one: 641 phase/m1-mcp-iserror-passthrough-s164-1 dbfd228a983c19c5064b9ee01b61ece9ff0f8695, non-draft
- git ls-remote master, twice → 1b2553c960317ab0cc0718e51dda8b7bc92bc112 both reads (the merge of PR 640)

2 · SHAPE
- git log origin/master..head → ONE commit, parent 1b2553c960317ab0cc0718e51dda8b7bc92bc112
- diffstat: 36 files, +1026 / -96

3 · CONTENT vs CARD-M1-MCP-ISERROR-PASSTHROUGH-S164-1-v2 (read in S164/), diff read in full for mcpClient.ts, stageTools.ts, toolResultClass.ts, mcpOutcome.ts, toolResultClassWiring, spanIOCompleteness, the two new tests
- (a) ONE function: executeMCPTool returns Promise<McpToolOutcome> {text, isError}; no sibling. `const isError = result.isError === true;` as the card spells it. The four JSON-error returns → isError: true.
- (b) the four not-sent arms (misroute, policyDenial, cap, argRefusal) stay TEXT; only the sent arm yields sentOutcome; transportError: outcome?.isError === true, and resultClass is null for a not-sent call — no verdict manufactured.
- (c) repair still text-gated: repairGatewayArguments(resultTextRaw, args); repairedOutcome supersedes text AND verdict together; count-semantics comment added; the stale "SNIFFING" comment corrected (Δ13).
- (d) modelFacingRefusal(c, toolText?): toolMessage = scrubbedAttrValue(toolText, 240) only when reason === 'tool-reported' AND rejectionReason(toolText) === undefined; recognised rejection sentences carry no toolMessage. Beyond D3 in toolResultClass.ts: one import and the 240 constant only. NOTE: D3 is realised as a second optional argument, not a field on the classification — same observable shape, pinned by three D3 tests.
- (e) attempt span output {ok: true, isError, ms, resultBytes} with the ok/isError comment; spanIOCompleteness asserts isError false.
- (f) mocks: git grep -nE "executeMCPTool: vi.fn\(async \(\) => '" -- api → 0 hits; git grep -n "as never" -- resultBudgetStageWiring.test.ts → 0 hits. Every executeMCPTool mock at head returns okOutcome/errOutcome: 26 mock files = the review's 25 + tourHonestyEmpties.test.ts (landed by PR 640 after the review).
- (g) toolResultClassWiring: errOutcome(transport sentence) → reason tool-reported, no toolMessage, no ECONNREFUSED; sibling okOutcome(same) → reason transport.
- (h) F1 (stage 07 + accumulator asserted, not the call) · F1-transport (real executeMCPTool vs fixture server) · F2 · F3 · D3 ×3 · F6 (ask-discovery + control) exist as named tests. Re-run at head in a detached worktree over all touched suites: 33 files, 299 passed / 1 skipped / 3 failed — the 3 are listen EPERM 127.0.0.1 (sandbox loopback) in mcpIsErrorPassthrough; that file re-run outside the sandbox → 8/8 passed. CI ran the same file green.
- (i) untouched (paths confirmed by git ls-files, then git diff --stat empty): api/cwf/_lib/turn/toolOutcomes.ts, api/cwf/_lib/replay/examScorers.ts, api/cwf/_lib/testing/fixtureMcpServer.ts, api/cwf/_lib/backends/entityDiscoverySync.ts, api/cwf/_lib/mcp/gatewayEnumerate.ts, api/cwf/_lib/turn/stageClarify.ts.
- (j) non-test diff: no backend id, tool name or sentence literal added (the two config error strings pre-exist). New tests use 'backend-under-test'.
- gates at head: check:backend-names [OK] equals baseline · check:tenant-zero [OK] ZERO, 2346 files · check:doc-drift [OK] 7 tabs · gen:arch-facts "left unchanged" · reseal 0 tabs hash-changed (7 lastSyncedCommit stamps only, restored) · typecheck:api exit 0 · relayAudit on the report [OK] zero violations. The report's 7–39-hex runs (row ids, md5, 12-hex tab digests) all sit inside evidence:box / evidence:lane / evidence:gates fences, none in prose.

4 · CI at dbfd228a983c19c5064b9ee01b61ece9ff0f8695 (check-runs read twice, identical, total 8)
- runs: Auto-merge landing success · report-schema success · Relay corpus success · Build and Test success (run 36664079275, attempt 1)
- Build and Test job build (24.x): 1 Set up job · 2 checkout · 3 CI-DIET decision · 4 Node 24.x · 5 Install · 6 RULE-40 gate · 7 Migration version-key gate · 8 Tenant-zero gate · 9 Backend-name gate · 10 Build · 11 Run tests — all success; steps 12–20 not listed by the API (neither run nor skipped); 21–23 success.
- rule26 job: 1 Set up · 2 checkout · 3 Node 22.x · 4 Install · 5 Playwright deps · 6 Playwright Chromium · 7 RULE-26 headless clip gate — all success; 8–12 not listed; 13–15 success.
- changes success · arm auto-merge success · Vercel Preview Comments success · eval-canary SKIPPED by design.
- Run tests: 770 files passed; 11581 passed | 4 expected fail | 1 skipped (11586)
- [merge-guard] VERDICT GREEN (CLEAN-MERGE, FENCE-GREW ok, timeline ok — 3 events, no reopen, no force-push, COLLISION 0)
- timeline read directly: committed · commented (vercel[bot]) · auto_merge_enabled — no force-push
- before the status: OPEN, non-draft, MERGEABLE, mergeStateStatus BLOCKED (not BEHIND), auto-merge armed

5 · LANDING
- adversary/scout success posted on dbfd228a983c19c5064b9ee01b61ece9ff0f8695 at 2026-09-30T03:58:13Z
- named wait: read 1 03:58:22Z, read 2 03:59:23Z master unchanged; gh pr view → MERGED 2026-09-30T03:59:26Z
- merge 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1, parents 1b2553c960317ab0cc0718e51dda8b7bc92bc112 + dbfd228a983c19c5064b9ee01b61ece9ff0f8695
- Vercel at merge: pending "Vercel is deploying your app" ×5, read 6 04:05:23Z success "Deployment has completed"; deployment 6751229787 environment Production, status success "Deployment has completed". Production READY.

DARK / RESIDUE
- No production turn read (scout holds no DB lane).
- Loopback tests needed an out-of-sandbox run locally (named above); CI is the full-suite measurement.
- Worktree hygiene: scratchpad/wt641 removed cleanly. scratchpad/wt640 (from PR 640's order): working tree gone after --force, but the record .git/worktrees/wt640 could not be deleted (EPERM). Its remains were tracked files of ddc28caa (merged) plus ignored node_modules link and two gen:arch-facts outputs — no unique work.

FORBIDDEN list kept: no edit, push, merge, re-run, dispatch, cron, migration. No environment value printed.
