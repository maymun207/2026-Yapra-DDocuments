<!-- relay-audit: v1 kind=card -->
CARD-SCOUT-LOOP-S163-1-v1

LANE: AG-3 (in mail-wait; measured IN-LOOP by PING-AG-3-S163-1: [MAIL] latency 5.0s, [STAMPED])
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T02:40Z
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 (plan item 5) and the owner's order of S163 turn 2 (05:06 TSİ), his words: "AGler ile senin iki yonlu interactif calisabilmen onemli dolayisi ile senden bu konuyu cozmeni istiyorum … scout ve worker ag lerin bootlarini control et". Register 128 · 134 · 123 · 126 · 67/17.
ADVERSARY: NEW subject → scout-2 reviews this card BEFORE it is inserted into AG-3's box (§12.1). The version AG-3 receives is the one with scout-2's delta applied by the Architect (practice 136: no in-card gate on a scout row).
PRECONDITION: PR 634 LANDED — MEASURED: master 1a6279e0c3eddf5ac331b38f5c028b5f17668690 (Merge PR #634, 2026-09-29T02:34:11Z). It owns the transport this loop needs. One open PR at a time: branch off master only when the Architect's insert names the then-current master and no other PR is open.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## WHY (measured, not assumed)
M1 · SCOUTS CANNOT STAMP. SCOUT-STATUS-LAND-PR634-S163-1 (scout-1, file S163/): `--take` prints "[STAMP-OPEN-NAMED] consumed_at NOT written: the declared read path is read-only (postgres 25006)". The write verb is never attempted: it is gated on `nonce.ok` (scripts/mail-wait.mjs:1149) and laneNonce('scout') needs refs/heads/lane/scout, which does not exist. relay_mark_consumed is granted to cwf_lane only (20260824060000_factory_write_channel.sql:412/:425) and asserts a nonce.
M2 · THE WATERMARK IS AUGUST. factory_state row (lane, scout) state CLOSED changed_at 2026-08-23T23:59:25Z; `--pre-watermark` → 490 unstamped scout rows above it, all re-delivered to every loop (scout-1, measured). This is F-S161-MAIL-WAIT-EXIT0-ON-UNCONSUMED-STALE-ROWS-1 for scouts, reproduced.
M3 · TWO WINDOWS, ONE BOX. relay_inbox_lane_addr_check = {AG-1..AG-5, operator, scout}. Two scout windows both receive every scout order (F-S158-TWO-SCOUT-WINDOWS-RAN-ONE-ORDER-1).
M4 · A SCOUT REPLY IS ALREADY AN ACK. Live source of public.scout_reply(uuid,text,text) (read by the Architect, pg_get_functiondef, 2026-09-29T02:3xZ): SECURITY DEFINER; refuses unless `p_reply_to` names an existing `direction='to_lane' and lane_addr='scout'` row; inserts exactly one `from_lane` row with `reply_to = p_reply_to`. EXECUTE: PUBLIC, anon, authenticated, supabase_read_only_user, service_role. So "this card has a reply" is a durable, DB-enforced fact that no new grant is needed to write.
M5 · DRIFT. scout_reply is defined in NO migration in this repo (scout-1: `git grep scout_reply` → only .claude/boot/free.md). The live function is the only copy.

## DESIGN (one path)
The ack of a non-claimable address is its REPLY, read on the READ side (ABSENCE-ONLY law: staleness is resolved where it is read, nothing is re-written). Plus two addresses and a fresh floor.

## ORDERS
1. MIGRATION (one new file, supabase/migrations/<ts>_scout_addresses_and_reply_ack.sql; applied later by the Gemini operator via db push — NOT by you):
   a. Capture public.scout_reply EXACTLY as live (M5; paste the pg_get_functiondef text the Architect quotes in the NOTICE-GO, or read it read-only yourself) and REDEFINE it so the target check is `lane_addr in ('scout','scout-1','scout-2')` and the inserted reply's `lane_addr` = the TARGET row's lane_addr (not the literal 'scout'). Keep every other refusal and the 8192 cap byte-for-byte. Keep grants as live.
   b. Widen relay_inbox_lane_addr_check, relay_inbox_reply_authority, the factory_state lane_addr checks and every 'scout' literal in relay_adversary_gate to admit 'scout-1' and 'scout-2' (scout-1's file list, SCOUT-STATUS-LAND-PR634-S163-1 step 10: 20260824210000_relay_inbox_lane_addr_drift.sql:59-73 · 20260911170000_relay_reply_path_slip_contract.sql:172 · 20260824050000_factory_state.sql:119,160 · 20260911180000_relay_adversary_gate.sql:169,190,294,298). 'scout' stays valid (history).
   c. Insert factory_state rows (row_kind 'lane', lane_addr 'scout-1' and 'scout-2', state 'CLOSED', changed_at = now()) — the fresh floor for their watermark (M2). ABSENCE-ONLY: `on conflict do nothing`.
2. scripts/mail-wait.mjs — for an address that is readable but NOT claimable (laneRoster.mjs LANE_ADDR false):
   a. every delivery read and its count probe (unconsumedSql, unconsumedProbeSql, newMailSql, boxProbeSql, preWatermarkSql) adds `and not exists (select 1 from public.relay_inbox r where r.reply_to = <row>.id and r.direction = 'from_lane')`;
   b. `--take` does NOT attempt a stamp; it prints `[ACK-BY-REPLY] <artifact> — delivery is acknowledged by your scout_reply (reply_to = <id>); consumed_at is not this address's signal` and exits as a read;
   c. the claimable (AG-n) path is UNCHANGED byte-for-byte; prove it with the existing tests green and a diff that touches only the non-claimable branch.
3. .claude/boot/free.md — the scout boot names ITS address (scout-1 or scout-2), replies with scout_reply to THAT address's row, and ends every order with `node scripts/mail-wait.mjs <scout-N> --budget-min 480` (branch on exit code; 0 → --read <name>, execute, reply, wait again). An order a scout decides is not its own is ALSO answered (one-line reply "NOT MINE"), so it never re-delivers.
4. TESTS: api/cwf/__tests__/mailWaitBoxLens.test.ts pins scout-1/scout-2 as readable and non-claimable; a new test pins the reply-ack predicate (a to_lane scout-1 row with a from_lane reply is NOT delivered; without one it IS; an AG-1 row with a reply is still governed by consumed_at only).
5. UI/UX (OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1): `git grep -n "'scout'" src/` — if any admin screen renders the lane roster or bus addresses, it shows scout-1 and scout-2; if none, say "no UI surface" with the grep line.
6. FENCE: the migration · scripts/mail-wait.mjs · .claude/boot/free.md · the two test files · your report · any file a gate names (put gate-mandated files — manifest/facts — in the FIRST fence if `npm run build` touches them). ONE commit on a fresh branch off master; no merge commit.
7. `npm run build` (five gates) · `npm run typecheck:api` · the two tests; quote last lines. Push, open PR (non-draft), CI by full sha read twice, quote the merge-guard VERDICT. SLIP as SLIP-CARD-SCOUT-LOOP-S163-1 (bus + fallback file S163/). Then back to mail-wait.

## FALSIFIERS (the card is wrong if)
F1 · after the migration, a scout-1 window in `mail-wait scout-1 --budget-min 480` receives a card within 90 s, replies, re-enters, and is NOT re-delivered the same card — measured by the Architect from the reply row and the window's next [MAIL] line. If it is re-delivered, the card failed.
F2 · scout-2 does not receive a card addressed to scout-1.
F3 · every AG-n loop behaves exactly as before (AG-3's next card stamps [STAMPED]).

FORBIDDEN: applying the migration; any change to the claimable path; merge commits; --force; cron; printing an environment value.

END · CARD-SCOUT-LOOP-S163-1-v1
