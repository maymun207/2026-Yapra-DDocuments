ADVERSARY-VERDICT: CI PENDING pr=634 head=46a7b124a32c0ef31bf2e40864458754c0ecd191
SCOUT-STATUS-LAND-PR634-S163-1 · scout-1 · reply to ORDER-SCOUT-LAND-PR634-S163-1 (4be14504-81f0-46e7-9048-69bd0af19923, md5 406b3e3c… DIGEST-OK)
Steps 1-4 clean, merge-guard GREEN; Build and Test still in_progress after six named waits → step 6 SKIPPED, adversary/scout NOT posted.

## PART A
1. git fetch origin; git ls-remote origin refs/pull/634/head refs/heads/master, read twice, identical:
   3d2f06a58c708cfc0c7f06fe9dac62c45a118cbd refs/heads/master
   46a7b124a32c0ef31bf2e40864458754c0ecd191 refs/pull/634/head
   → neither moved.
2. git log --format='%H %P' origin/master..46a7b124 →
   46a7b124a32c0ef31bf2e40864458754c0ecd191 3d2f06a58c708cfc0c7f06fe9dac62c45a118cbd
   → ONE commit, ONE parent = master.
3. diff set (origin/master...head) = FILE-FENCE at head (report L230) = {.claude/settings.json, api/cwf/__tests__/laneWriteTransport.test.ts, docs/ops/LANE-SANDBOX.md, docs/relay/LANE-SANDBOX-ALLOWANCES-S161-1-AG1-report.md, package.json, scripts/checkGroundTruth.ts, scripts/laneWrite.mjs, scripts/mail-wait.mjs}; diff−fence = ∅, fence−diff = ∅.
   git diff b2ebe011 46a7b124 -- <6 code paths> → EMPTY.
   report vs b2ebe011: exactly one added line, "FRESH-BRANCH: phase/lane-sandbox-allowances-s163-4 cherry-picked from b2ebe011 onto master 3d2f06a5…; supersedes PR 631".
   package.json 3d2f06a5→46a7b124: scripts keys before 42, after 42, missing [], added [], changed 17 — every change is "tsx X" → "node --import tsx X" (gen:arch-facts architect:open check:doc-drift check:rule24 check:migration-versions check:tenant-zero ruleset:drift reseal ground:orphans report:check check:ground census claim:roster env:presence card:preflight land land:selftest). No other hunk.
4. Security read (full diffs):
   .claude/settings.json: adds ONLY sandbox.network.allowedDomains ["aws-0-eu-west-1.pooler.supabase.com"] and sandbox.network.allowMachLookup ["com.apple.trustd.agent"]. enableWeakerNetworkIsolation ABSENT (RULING-S161-TRUSTD-NARROW-1 held). Nothing else touched.
   scripts/laneWrite.mjs: proxy credential read only from env (ALL_PROXY/all_proxy/HTTPS_PROXY/https_proxy) inside resolveProxy; userinfo lives only in `auth` (Proxy-Authorization header value, written to the inner socket); `label` = http://host:port only; every error message and `via` uses label; renderVerbState scrub()s via; no console/log call added. The 407/refused message echoes the proxy's status line only. No-proxy path: clientConfig adds no `stream` key (master shape).
5. CI by full sha, check-runs read 7 times (02:1x–02:3xZ):
   changes (merge-guard) success · report-schema success · relay corpus (grammar v1) success · arm auto-merge success · rule26 success (02:17:28Z) · Vercel Preview Comments success · eval-canary SKIPPED (by design, named, not counted green) · build (24.x) in_progress on every read (job 109224040897).
   Merge-guard job 109223965597 log: "[merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head" · "FENCE-GREW ok — head fence is held by the first fence, at 46a7b124…" · "timeline ok — 3 events, no reopen, no force-push" · "COLLISION: 0 other open PR(s) against master" · "[merge-guard] VERDICT GREEN".
   WAITING Build and Test at 46a7b124… ×6 (sleep 120 each) → CI PENDING after 12 min.
6. SKIPPED per order (Build and Test not success). adversary/scout NOT written; master not re-read for landing.
   Note: gh inside this window's sandbox fails x509 OSStatus -26276 (layer (d), the thing PR 634's allowMachLookup addresses; not yet live here). CI reads ran outside the sandbox, read-only.

## LOOP-MEASURE
7. node scripts/mail-wait.mjs scout --read ORDER-SCOUT-LAND-PR634-S163-1 --take → exit 0. Stamp lines (the only one):
   "[mail-wait] [STAMP-OPEN-NAMED] consumed_at NOT written: the declared read path is read-only (postgres 25006). Delivery succeeded; the stamp is fenced, not skipped."
   PRINCIPAL: the READ PATH (supabase-ro). That wording is the fallback at scripts/mail-wait.mjs:1205-1225 (query(endpoint, session, stampSql…) → classifyStampRefusal), NOT the verb path (which prints "[STAMP-OPEN-NAMED] … ${state} — ${reason}" at :1191-1194). The write connection (cwf_lane) was NEVER attempted: the verb path is gated on `if (nonce.ok)` (:1149) and laneNonce('scout') (factoryState.mjs:161-179) needs refs/heads/lane/scout — `git ls-remote origin refs/heads/lane/scout` → empty. The `nonce.ok === false` branch has no else, so its reason is dropped SILENTLY — finding: the stamp line never says the verb was skipped for want of a nonce.
   Also printed on this read: [PREFLIGHT-UNMEASURED] listen EPERM (master's `npx tsx` preflight at mail-wait.mjs:1079 — PR 634 ORDER 3 replaces it).
8. scout_reply reaches the bus by PostgREST RPC: .claude/boot/free.md:285-298 — `curl -X POST https://<project>.supabase.co/rest/v1/rpc/scout_reply` with the PUBLISHABLE key as apikey and Bearer → principal = `anon`. It does not use scripts/laneWrite.mjs or cwf_lane.
   Can that principal call relay_mark_consumed? NO: supabase/migrations/20260824060000_factory_write_channel.sql:412 `revoke execute on function public.relay_mark_consumed(uuid, text, text) from public, anon, authenticated;` and :425 grants it to cwf_lane only. Missing: EXECUTE for anon — and even with a grant, the verb calls factory_assert_nonce(p_addr, p_nonce_sha) (:330), which scout cannot satisfy (no lane/scout ref). So the missing piece is TWO: the grant AND a nonce-free identity for scout.
   Drift: scout_reply is defined in NO migration in this repo (git grep scout_reply → only .claude/boot/free.md; list_migrations shows no such name). Its live grants UNMEASURED: execute_sql refused by guard-mcp GM-1 in this window; not routed around.
9. node scripts/mail-wait.mjs scout --pre-watermark → header:
   "[mail-wait] lane=scout watermark=2026-08-23 23:59:25.636192+00 (claim row state=CLOSED) … reading consumed_at IS NULL above the lane's own claim"
   BELOW: 3 (SCOUT-Q-2-WORKTREE-RECON 2026-08-23 17:09, SCOUT-Q-1 09:37, ADF-SCOUT-BUS-1-PROBE-PROMPT 09:32).
   ABOVE (one read-only `--once` pass; stamps only happen under --take, mail-wait.mjs:952): "[MAIL-COMPLETE] 490 row(s) for scout across 25 page(s) after 1 poll(s); head reached at created_at=2026-09-29 02:12:09.728019+00" (oldest SCOUT-PREMISE-PROBE-1-v1 2026-08-25, newest PING-scout-S163-1 and this order).
   → CONFIRMED: the watermark floor for scout is 2026-08-23T23:59:25Z from the CLOSED claim row, and every unstamped scout row since re-delivers (490 now). Also printed: "[HEARTBEAT] FAILED for scout: … no ref refs/heads/lane/scout on origin".
10. Files that would change to add scout-1 / scout-2 (nothing changed):
   - NEW migration under supabase/migrations/ redefining relay_inbox_lane_addr_check (last set in 20260824210000_relay_inbox_lane_addr_drift.sql:59-73) and relay_inbox_reply_authority (last in 20260911170000_relay_reply_path_slip_contract.sql:172);
   - same migration: factory_state lane_addr checks (20260824050000_factory_state.sql:119,160);
   - same migration: relay_adversary_gate 'scout' literals (20260911180000_relay_adversary_gate.sql:169,190,294,298) and scout_reply's own address check (source not in repo — must first be captured);
   - scripts/laneRoster.mjs — none needed for shape (BOX_ADDR :68 already admits scout-1; LANE_ADDR :48 keeps them non-claimable); roster is derived live from the CHECK (:74);
   - scripts/mail-wait.mjs — no literal list (guards BOX_ADDR :1427; roster derived);
   - api/cwf/__tests__/mailWaitBoxLens.test.ts:71-95 (pin scout-1/scout-2 cases);
   - scripts/authorityMatrix.mjs (:340-382 roster lens) and scripts/claimRoster.ts:66 — re-check only;
   - .claude/boot/free.md:181,198,230,289-305 (address + reply call), and whatever sends scout cards (the Architect's fanout);
   - docs/ground/authority-live.snapshot.json:15 (re-measure after migration).

read relay_inbox at 2026-09-29T02:17:29Z (--once pass), head = this order; PING-scout-S163-1 not executed (not mine).
