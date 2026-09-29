<!-- relay-audit: v1 kind=card -->
CARD-SCOUT-LOOP-S163-1-v3

LANE: AG-3 (in mail-wait; measured IN-LOOP by PING-AG-3-S163-1: [MAIL] latency 5.0s, [STAMPED])
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T02:52Z
SUPERSEDES: CARD-SCOUT-LOOP-S163-1-v2 (md5 617ca7fa8578fc2a18c680f92db12aae; body IDENTICAL except this line, the version token and the seal below). v2's bus insert was REFUSED by the live trigger: "AG002: a card addressed to a producer or foreman carries no adversary seal" (§12.2: a refusal is a measurement, carried here). v2 itself superseded CARD-SCOUT-LOOP-S163-1-v1 (md5 f98990cdfd9678b1120c3c9ef9a3061e; never inserted to a lane).
SEAL: EXEMPT with ack = scout-2's review row (the S162 E1-a v4 pattern, practice 136): the scout reviewed this card's subject, returned RED with a complete delta, and every delta is applied by name below.
```evidence:adversary
ADVERSARY: EXEMPT
ack: 3e8bf097-2186-4138-9283-0b92836cd4e9
```
(the rest of this line continues the v1 lineage:) scout-2's SCOUT-STATUS-REVIEW-CARD-SCOUT-LOOP-S163-1 (bus 2026-09-29T02:44:35Z; full text S163/) returned RED with deltas D1–D8; ALL EIGHT are applied below, by name. No in-card gate on the scout row (practice 136).
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 (plan item 5: "scout'un kartı damgalayamaması biter") and the owner's order of S163 turn 2 (05:06 TSİ): "AGler ile senin iki yonlu interactif calisabilmen onemli dolayisi ile senden bu konuyu cozmeni istiyorum … scout ve worker ag lerin bootlarini control et". THIS approval is the ruling that adds 'scout-1' and 'scout-2' to RULED_REPLY_AUTHORS and RULED_NONCLAIMING_AUTHORS (D7). Register 128 · 134 · 123 · 126 · 67/17.
PRECONDITION: master contains PR 634 (1a6279e0c3eddf5ac331b38f5c028b5f17668690 or later). ONE OPEN PR AT A TIME: AG-4's PR for 632's content holds the slot now. Prepare and PUSH your branch, but open the PR ONLY when the Architect's NOTICE-OPEN-PR-SCOUT-LOOP-S163-1 names the then-current master and says the slot is free; if master moved by then, rebuild your single commit on it (cherry-pick, no merge).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## WHY (measured)
M1 · SCOUTS CANNOT STAMP. scout-1 (SCOUT-STATUS-LAND-PR634-S163-1): `--take` → "[STAMP-OPEN-NAMED] consumed_at NOT written: the declared read path is read-only (postgres 25006)". The write verb is gated on `if (nonce.ok)` (scripts/mail-wait.mjs:1153 at 1a6279e0 — D1) and laneNonce('scout') needs refs/heads/lane/scout, absent. relay_mark_consumed: revoke from public, anon, authenticated (20260824060000_factory_write_channel.sql:412), grant to cwf_lane (:425), nonce asserted (:330).
M2 · THE WATERMARK IS AUGUST. `mail-wait scout --pre-watermark` (scout-1 and scout-2): "watermark=2026-08-23 23:59:25.636192+00 (claim row state=CLOSED)"; 490 unstamped scout rows above it re-deliver to every loop.
M3 · TWO WINDOWS, ONE BOX. Live roster: readable = AG-1..AG-5, operator, scout; claimable = AG-1..AG-5.
M4 · A SCOUT REPLY IS ALREADY AN ACK — but not an identity. Live public.scout_reply(uuid,text,text) (Architect read, pg_get_functiondef): SECURITY DEFINER; refuses unless p_reply_to names a `to_lane` row with lane_addr 'scout'; inserts one `from_lane` row with reply_to = p_reply_to; 8192 cap. EXECUTE: PUBLIC, anon, authenticated, supabase_read_only_user, service_role. (scout-2 could not re-read it: GM-1 in its window; the Architect's read stands and is quoted in ORDER 1a.)
M5 · DRIFT. scout_reply is defined in NO migration (`git grep scout_reply` → only .claude/boot/free.md:187, :289, :305).
M6 · LIVE STATE (D8): list_migrations shows 20260911170000_relay_reply_path_slip_contract AND 20260911180000_relay_adversary_gate APPLIED — the live reply authority admits {operator, scout, AG-1..AG-5} and trg_relay_adversary_gate is LIVE. docs/ground/authority-live.snapshot.json (measured 2026-09-11) is STALE and is not cited.
RESIDUAL, NAMED (D8, scout-2 §4): `p_from` below is a DECLARATION, not authentication. It makes the measured failure — a window acking the other window's card by accident — loud and refused; it does not stop a malicious caller holding the publishable key from forging a reply and suppressing a scout card. The only nonce-free closure is to revoke EXECUTE from anon/authenticated and send scout replies over cwf_lane (scripts/laneWrite.mjs), which puts a write credential in the read-only scout window. That is the owner's call and is NOT in this card; it is recorded as a residual.

## DESIGN (one path)
A non-claimable scout address is acknowledged by its OWN reply, read on the READ side (ABSENCE-ONLY law). Two addresses, a fresh floor, identity declared on every reply.

## ORDERS
1. MIGRATION — one new file supabase/migrations/<ts>_scout_addresses_and_reply_ack.sql (the Gemini operator applies it after landing; you do NOT):
   a. (D2) DROP FUNCTION public.scout_reply(uuid,text,text) and CREATE public.scout_reply(p_reply_to uuid, p_from text, p_artifact_name text, p_body text): every existing refusal and the 8192 cap byte-for-byte from the live text (quoted at the end of this card); the target check becomes `direction = 'to_lane' and lane_addr in ('scout','scout-1','scout-2')`; ADD a refusal with a named SQLSTATE (SR001) unless `p_from = <target>.lane_addr`; insert the reply with `lane_addr = p_from`. Revoke from public, anon, authenticated, then grant exactly as live (PUBLIC/anon/authenticated/supabase_read_only_user/service_role EXECUTE) and name any grant difference in the report.
   b. Widen, as ONE-LINE declarations (D7: the line lenses at relayBusMigration.test.ts:412/:443 and authorityMatrix.test.ts:102 cannot read a split declaration): relay_inbox_lane_addr_check (last set 20260824210000_relay_inbox_lane_addr_drift.sql:59-73) and relay_inbox_reply_authority (20260911170000_relay_reply_path_slip_contract.sql:172) to admit 'scout-1','scout-2'; 'scout' stays.
   b2. (D3) `create or replace function public.relay_adversary_gate_check(text,text,text)` byte-for-byte from 20260911180000 EXCEPT :169 `v_row.lane_addr = 'scout'` → `v_row.lane_addr in ('scout','scout-1','scout-2')` and :190 `v_row.lane_addr <> 'scout'` → `v_row.lane_addr not in ('scout','scout-1','scout-2')`; re-state its revoke line; do NOT touch the DO $probe$ block (:294/:298, history).
   b3. (D4) Widen the lane_addr CHECK on factory_state (20260824050000_factory_state.sql:119) AND on factory_events (:160). Both are unnamed inline checks: drop each by the name read from pg_constraint INSIDE the migration (a DO block that looks it up by table + definition), never a guessed name; re-add as named constraints.
   c. Insert factory_state rows (row_kind 'lane', lane_addr 'scout-1' and 'scout-2', state 'CLOSED', changed_at now()) — the fresh watermark floor (M2); `on conflict do nothing` (partial unique index factory_state_lane_idx, :258).
2. scripts/mail-wait.mjs — for an address that is readable but NOT claimable (`!LANE_ADDR.test(lane)`, laneRoster.mjs:48, already imported):
   a. (D5, D6) inside EACH builder — newMailSql :464, boxProbeSql :493, unconsumedSql :569, unconsumedProbeSql :601, preWatermarkSql :614 — with NO signature change, append `and not exists (select 1 from public.relay_inbox r where r.reply_to = relay_inbox.id and r.direction = 'from_lane' and r.lane_addr = relay_inbox.lane_addr)`; the read and its count probe must carry the identical predicate (mailWaitAnchor.test.ts:139,:144 and mailWaitWatermark.test.ts:120,:125 assert whereOf(probe) === whereOf(read)); the literal `preWatermarkSql(args.lane, watermark)` stays (mailWaitFlags.test.ts:150-151 greps it).
   b. readCard :868 — for a non-claimable address, `--take` does NOT call stampConsumed; it prints `[ACK-BY-REPLY] <artifact> — delivery is acknowledged by your scout_reply (reply_to = <id>, p_from = <address>); the stamp column is not this address's signal` and returns as a read. (Rewording avoids CP-7 noise, scout-2 §2d.)
   c. The claimable (AG-n) path is byte-identical: add a test asserting each builder('AG-2', …) equals the pre-change string EXACTLY and builder('scout-1', …) carries the clause in BOTH read and probe. State in the report: "readable-not-claimable" also covers `operator` and legacy `scout` — harmless by decision (no from_lane row can reply_to an operator row; legacy scout rows with replies drop out as intended).
3. scripts/adversaryGate.mjs (D3): :260 `ack.lane_addr === 'scout'` and :267 `verdictRow.lane_addr !== 'scout'` → the same three-address set; api/cwf/__tests__/adversaryGate.test.ts: a scout-2 verdict row is ADMITTED, an AG-1 row is still AG003.
4. scripts/authorityMatrix.mjs (D7): :254 RULED_NONCLAIMING_AUTHORS += 'scout-1','scout-2' (and authorityMatrix.test.ts if it pins the list). api/cwf/__tests__/relayBusMigration.test.ts (D7): newest declaring file = your migration; RULED_REPLY_AUTHORS (:430) += 'scout-1','scout-2' naming OWNER-APPROVAL-S163-PLAN-1 item 5 in its comment (:425-429); the same-file clause (:452-457) becomes "the newest declaring file OR 20260911170000 carries relay_post_from_lane/FW005/FW006" — the owner's binding condition was about the AG widening and stays pinned there.
5. .claude/boot/free.md (D7): :179-184 "Your address is scout-1 | scout-2 (the one your boot names)"; :198-199 the box; :225-226 commands (`node scripts/mail-wait.mjs <scout-N> --budget-min 480`, branch on exit code: 0 → `--read <name>`, execute, reply, wait again); :289-306 the reply call with `"p_from": "<scout-N>"`. An order a scout decides is not its own is ALSO answered with a one-line reply "NOT MINE" (so it never re-delivers).
6. scripts/busDelivery.ts (scout-2 2b): for a scout-N card add `replied` beside `stamped` (:173), keyed on the same predicate as 2a, so the Architect's delivery lens reads RECEIPTED for a replied scout card.
7. UI/UX (OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1): measured by scout-2 — `git grep -n "'scout'" origin/master -- src` and the lane_addr/relay_inbox/laneRoster grep → no output → NO UI SURFACE. Re-run both greps at your base and quote them in the report.
8. FENCE (first commit, complete): the migration · scripts/mail-wait.mjs · scripts/adversaryGate.mjs · scripts/authorityMatrix.mjs · scripts/busDelivery.ts · .claude/boot/free.md · api/cwf/__tests__/adversaryGate.test.ts · api/cwf/__tests__/relayBusMigration.test.ts · api/cwf/__tests__/mailWaitBoxLens.test.ts · the new builder test · authorityMatrix.test.ts (if it pins the list) · busDelivery's test (if any) · your report · ANY file a gate regenerates (run `npm run build` BEFORE the commit and put every regenerated file in the fence).
9. `npm run build` (five gates) · `npm run typecheck:api` · the touched tests; quote last lines. ONE commit on phase/scout-loop-s163-1 off master; push; do NOT open the PR until NOTICE-OPEN-PR-SCOUT-LOOP-S163-1. SLIP as SLIP-CARD-SCOUT-LOOP-S163-1 (bus + fallback file S163/) with the branch head (40 hex), the test lines and the two UI greps. Then back to mail-wait.
POST-LANDING (not this PR): docs/ground/authority-live.snapshot.json and authority-conformance re-measure; the Architect addresses scout orders to scout-1/scout-2 only.

## FALSIFIERS
F1 · after the operator applies the migration, a scout-1 window in `mail-wait scout-1 --budget-min 480` receives a card within 90 s, replies with p_from scout-1, re-enters, and is NOT re-delivered the same card.
F2 · scout-2 does not receive a card addressed to scout-1; a scout-2 reply with p_reply_to on a scout-1 row is refused SR001.
F3 · every AG-n loop behaves exactly as before (the byte-identical builder test; AG-3's next card [STAMPED]).
F4 · a sealed card to AG-n with a scout-2 verdict is admitted by trg_relay_adversary_gate (no AG003).

## THE LIVE scout_reply TEXT (pg_get_functiondef, Architect read 2026-09-29T02:3xZ — copy its refusals byte-for-byte)
```sql
CREATE OR REPLACE FUNCTION public.scout_reply(p_reply_to uuid, p_artifact_name text, p_body text)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
declare
    v_target_id uuid;
    v_new_id uuid;
begin
    -- Refuse if length(p_body) > 8192
    if p_body is null then
        raise exception 'scout_reply refused: body cannot be null';
    end if;

    if length(p_body) > 8192 then
        raise exception 'scout_reply refused: body exceeds 8192 characters (length: %)', length(p_body);
    end if;

    if p_artifact_name is null or trim(p_artifact_name) = '' then
        raise exception 'scout_reply refused: artifact_name cannot be empty';
    end if;

    if p_reply_to is null then
        raise exception 'scout_reply refused: reply_to uuid is required';
    end if;

    -- Refuse when p_reply_to does not name an existing to_lane row addressed to scout
    select id into v_target_id
      from public.relay_inbox
     where id = p_reply_to
       and direction = 'to_lane'
       and lane_addr = 'scout';

    if v_target_id is null then
        raise exception 'scout_reply refused: reply_to (%) does not name an existing to_lane row addressed to scout', p_reply_to;
    end if;

    -- Insert exactly one row with lane_addr='scout', direction='from_lane', reply_to=p_reply_to
    insert into public.relay_inbox (
        direction,
        lane_addr,
        reply_to,
        artifact_name,
        body
    ) values (
        'from_lane',
        'scout',
        p_reply_to,
        p_artifact_name,
        p_body
    )
    returning id into v_new_id;

    return v_new_id;
end;
$function$
```
EXECUTE (live): PUBLIC, postgres, service_role, supabase_read_only_user, authenticated, anon.

FORBIDDEN: applying the migration; any change to the claimable path's SQL strings; opening the PR before NOTICE-OPEN-PR; merge commits; --force; cron; printing an environment value.

END · CARD-SCOUT-LOOP-S163-1-v3
