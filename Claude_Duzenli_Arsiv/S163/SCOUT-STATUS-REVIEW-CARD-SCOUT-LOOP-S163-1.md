REVIEW-VERDICT: RED card=CARD-SCOUT-LOOP-S163-1-v1 md5=f98990cdfd9678b1120c3c9ef9a3061e
SCOUT-STATUS-REVIEW-CARD-SCOUT-LOOP-S163-1 · scout-2 · reply to ORDER-SCOUT-REVIEW-CARD-SCOUT-LOOP-S163-1 (377720dd-0d18-41ba-ad70-843fa8b05c34, body_md5 c44e692d39d0ef2fc62ee63c68558a82 DIGEST-OK; [PREFLIGHT-UNMEASURED] listen EPERM — local clone predates PR 634's loader fix)
BASE read: `git rev-parse origin/master` → 1a6279e0c3eddf5ac331b38f5c028b5f17668690 (= card BASE). Every file:line below is `git grep`/`git show` at origin/master unless marked otherwise.
Card bytes: `md5 CARD-SCOUT-LOOP-S163-1-v1.md` → f98990cdfd9678b1120c3c9ef9a3061e.

WHY RED, one line: as written, the card (a) breaks the LIVE adversary gate for every future producer card, (b) turns an anon-callable RPC into a delivery-suppression switch, and (c) reddens three tests outside its fence. All three can be fixed in the card text — deltas below.

## 1 · M1–M5 against the primary source

M1 · CONFIRMED in content; line cite STALE. At 1a6279e0 the nonce gate is `scripts/mail-wait.mjs:1153` (`if (nonce.ok) {`), laneNonce at :1152. :1149 is the pre-PR-634 line (PR 634 added 4 lines at :1079). Grant lines CONFIRMED: `20260824060000_factory_write_channel.sql:412` revoke from public, anon, authenticated · `:425` grant to cwf_lane · nonce assert `:330` `perform public.factory_assert_nonce(p_addr, p_nonce_sha);`.
  DELTA → replace "(scripts/mail-wait.mjs:1149)" with "(scripts/mail-wait.mjs:1153 at 1a6279e0)".

M2 · CONFIRMED (floor re-measured by me). `node scripts/mail-wait.mjs scout --pre-watermark` → "lane=scout watermark=2026-08-23 23:59:25.636192+00 (claim row state=CLOSED)"; 3 rows below it (SCOUT-Q-2-WORKTREE-RECON, SCOUT-Q-1, ADF-SCOUT-BUS-1-PROBE-PROMPT). The 490 above it is RELAYED from scout-1; I did not re-count.

M3 · CONFIRMED (live). Same run: "roster derived from relay_inbox_lane_addr_check: readable=AG-1 AG-2 AG-3 AG-4 AG-5 operator scout | claimable=AG-1 AG-2 AG-3 AG-4 AG-5". The two-windows finding F-S158 is RELAYED.

M4 · UNMEASURED from this window. `mcp__supabase-ro__execute_sql` (pg_get_functiondef + routine_privileges) → BLOCKED by guard-mcp GM-1. I did not route around it. The only corroboration in the repo is prose: `.claude/boot/free.md:289-306` (curl with the PUBLISHABLE key as apikey and Bearer, so the caller role is anon; "the server refuses a p_reply_to that does not name an existing to_lane row addressed to scout, and refuses a body over 8192"). The card's grant list rests only on the Architect's read.

M5 · CONFIRMED. `git grep -n scout_reply origin/master` → only `.claude/boot/free.md:187, :289, :305`. `list_migrations` (live, read tool) has no scout_reply name.

ALSO MEASURED, and it changes the premises of the card's order 1b: `list_migrations` (live) shows **20260911170000 relay_reply_path_slip_contract AND 20260911180000 relay_adversary_gate are APPLIED**. So the live reply-authority admits {operator, scout, AG-1..AG-5}, and trg_relay_adversary_gate is LIVE. `docs/ground/authority-live.snapshot.json` (measuredAt 2026-09-11T17:20:58Z, :29 "operator, scout" only; :36 gate "absent") is STALE and must not be cited.

## 2 · Core claim: "a scout row with a from_lane reply is delivered" — every consumer

`git grep -n reply_to origin/master -- scripts api supabase src .github .claude/boot` and `git grep -n consumed_at …` (the same paths):

2a · BREAKS: THE ADVERSARY GATE (live). SQL `20260911180000_relay_adversary_gate.sql:190` `… or v_row.lane_addr <> 'scout' or v_row.reply_to is null then` → AG003, and `:169` (EXEMPT ack) `v_row.lane_addr = 'scout'`. JS mirror `scripts/adversaryGate.mjs:267` `verdictRow.lane_addr !== 'scout'` and `:260` `ack.lane_addr === 'scout'`. The file header says: "Every pattern … spelled ONCE in scripts/adversaryGate.mjs … adversaryGate.test.ts pins each literal". After order 1a, the reply's lane_addr is copied from the TARGET row, so every verdict a scout-1/scout-2 writes has lane_addr scout-1/scout-2. The gate then refuses EVERY sealed card to AG-n with AG003. The card widens only the SQL literals, leaves the JS mirror and its pin test out of the fence, and lists :294/:298. Those two are inside the one-shot `do $probe$` self-test and need no redefinition. What must be redefined is `relay_adversary_gate_check` in full (create or replace, byte-copy except :169 and :190).
  DELTA (order 1b, replace the adversary clause) → "b2. Re-issue `create or replace function public.relay_adversary_gate_check(text,text,text)` byte-for-byte from 20260911180000 except the two lane comparisons (:169 `v_row.lane_addr = 'scout'` → `v_row.lane_addr in ('scout','scout-1','scout-2')`; :190 `v_row.lane_addr <> 'scout'` → `v_row.lane_addr not in ('scout','scout-1','scout-2')`). Re-state its revoke line. Do not touch the DO $probe$ block (history). In the SAME commit change scripts/adversaryGate.mjs:260 and :267 to the same set, and extend api/cwf/__tests__/adversaryGate.test.ts with a scout-2 verdict row that is ADMITTED and an AG-1 one that is still AG003."
  Also mail-wait's `[SEAL]` path (`resolveBusRow` :1012-1024 selects direction, lane_addr and reply_to for `sealVerdict` :1026) reads through the same JS check, so it inherits 2a.

2b · DEGRADES but does not break: `scripts/busDelivery.ts:173` `const stamped = card.consumedAt !== null;` → a reply-acked scout card classifies NO-EVIDENCE, never RECEIPTED (:174). The Architect's delivery lens will under-report scout delivery forever.
  DELTA (add to WHY or FENCE) → "busDelivery.ts is an AG-n lens; for scout-N its NO-EVIDENCE is not a finding. (Or: add `replied` beside `stamped`, keyed on the same reply predicate — in fence only if the Architect wants it.)"

2c · SAFE: RI001/RI002 (`20260813110000_relay_inbox.sql:162-195`) are a BEFORE UPDATE guard; scout_reply is an INSERT and never reaches them. relay_mark_consumed is untouched. `relay_post_from_lane` (20260911170000:90) takes no reply_to, so no AG slip can satisfy the predicate. Only scout_reply or a service-role insert can.
  TIGHTEN anyway (order 2a text) → "`and not exists (select 1 from public.relay_inbox r where r.reply_to = <row>.id and r.direction = 'from_lane' and r.lane_addr = <row>.lane_addr)`". This way a reply filed under a different address never acks the row.

2d · STALE LAW THE CARD WILL TRIP: `scripts/cardPreflight.ts:374-377` CP-7 flags every line that names consumed_at without the word RETIRED. The card's L13 (M1) and L29 (order 2b) both match, so AG-3's read prints [CARD-REFUSED] CP-7. `CARD_GATE = 'REPORT'` (mail-wait.mjs:162) makes it report-only, so this is noise, not a stop. The CP-7 premise itself is stale for AG-n; that is not in scope here.
  DELTA → none required; optionally reword order 2b to "…the stamp column is not this address's signal".

## 3 · Does the live table refuse a scout-1/scout-2 reply after order 1b?

Before 1b: YES, twice. `relay_inbox_lane_addr_check` (live roster above) refuses lane_addr scout-1/scout-2 on ANY row, and the live `relay_inbox_reply_authority` (20260911170000:172, applied) refuses a from_lane row outside {operator, scout, AG-1..AG-5}. After 1b: admitted. RI001/RI002 are not involved (INSERT). trg_relay_adversary_gate returns null for from_lane rows and for to_lane rows not matching `^AG-[0-9]+$` (:132-133), so it admits both the scout-N cards and the scout-N replies.

WHAT ELSE MUST CHANGE (not in the card):
3a · `api/cwf/__tests__/relayBusMigration.test.ts` goes RED three ways when a newer migration declares the constraint. `:440` expects the newest declaring file to be `20260911170000_relay_reply_path_slip_contract.sql`. `:430` `RULED_REPLY_AUTHORS` is a literal of 7. `:452-457` requires the newest declaring file to also define relay_post_from_lane with FW005/FW006 ("the owner's binding condition").
  DELTA → add the file to the fence, and add: "update relayBusMigration.test.ts: newest file = the new migration; RULED_REPLY_AUTHORS += 'scout-1','scout-2'; the same-file clause becomes 'the newest declaring file OR 20260911170000 carries relay_post_from_lane/FW005/FW006' — the owner's binding condition was about the AG widening and stays pinned to that file." The comment at :425-429 says the literal is the RULED set, so name the ruling that adds scout-1/scout-2 to it. OWNER-APPROVAL-S163-PLAN-1 item 5 if that is its text.
3b · The declaration must be ONE line: the line lenses at relayBusMigration.test.ts:412/:443 and authorityMatrix.test.ts:102 cannot see a split declaration (pinned at :474-478).
3c · `scripts/authorityMatrix.mjs:254` `RULED_NONCLAIMING_AUTHORS = ['operator','scout']`, plus the "ADMITTED ⊆ RULED" lens (:525 onward). Once the snapshot is re-measured, scout-1/scout-2 are admitted-but-not-ruled, which is a finding.
  DELTA → add scripts/authorityMatrix.mjs (and authorityMatrix.test.ts if it pins the list) to the fence: RULED_NONCLAIMING_AUTHORS += 'scout-1','scout-2'.
3d · factory_state: `20260824050000_factory_state.sql:119` is factory_state, but `:160` is **factory_events**, not factory_state. Both CHECKs are unnamed inline column checks, so their live names are auto-generated and UNMEASURED here (GM-1). `on conflict do nothing` is effective through the partial unique index `factory_state_lane_idx` (:258).
  DELTA → "1b: widen the lane_addr CHECK on factory_state (:119) and on factory_events (:160). Drop each by the name read from pg_constraint at apply time (the Operator prints it); do not guess `<table>_lane_addr_check`."
3e · Apply order: the prior two migrations are already applied (list_migrations), so `db push` applies only this file. There is no hidden scope creep.

## 4 · scout_reply redefinition (1a) — is copying the target's lane_addr safe?

NO, not as written. Copying the target makes the reply's address a function of which uuid was passed, not of who sent it. So (i) a scout-1 window replying to a scout-2 row writes a scout-2 row, which acks scout-2's card and silences it: F2 inverted, the same accident as F-S158. (ii) Under M4, EXECUTE reaches anon, and the key is the publishable one printed in `.claude/boot/free.md:290`. Row ids are not secret: every [CARD] line prints `id=` (mail-wait.mjs:915-918) and reports quote them. Today a forged reply is noise. After this card it is DELIVERY SUPPRESSION of any scout card by anyone holding a public key.
SMALLEST ENFORCEABLE FORM WITHOUT A NONCE:
  DELTA (replace order 1a's second sentence) → "REDEFINE it as `scout_reply(p_reply_to uuid, p_from text, p_artifact_name text, p_body text)`: refuse (named SQLSTATE, e.g. SR001) unless the target row is `direction='to_lane' and lane_addr in ('scout','scout-1','scout-2')` AND `p_from = target.lane_addr`. Insert the reply with `lane_addr = p_from`. Keep every other refusal and the 8192 cap byte-for-byte. DROP the 3-arg signature in the same migration, or it stays callable as an overload with no p_from. Revoke from public, anon, authenticated, then grant as live, and name any grant difference in the report."
  Stated honestly: p_from is a DECLARATION, not authentication. It makes the cross-window ACCIDENT loud (the measured failure), not a malicious anon caller impossible. The only nonce-free closure of the anon hole is to revoke EXECUTE from anon/authenticated and grant it to cwf_lane, sending the reply over scripts/laneWrite.mjs. That needs the credential in scout windows and is the Architect's/owner's call. Name it as the residual in the card's WHY.
  free.md must then pass `"p_from": "<scout-N>"` (order 3).

## 5 · Claimable-path invariant (2c) — functions and pins

Functions order 2 may touch (at 1a6279e0): `newMailSql` :464, `boxProbeSql` :493, `unconsumedSql` :569, `unconsumedProbeSql` :601, `preWatermarkSql` :614, `readCard` :868 (the two `take` branches, :952 and the success arm), `sayNotTaken` :1051. Their callers in `main` :1580, :1620-1621, :1690-1691, :1732-1733. `stampConsumed` :1130 need NOT be touched: branch in readCard before calling it.
Tests that pin the AG-n path: `mailWaitWatermark.test.ts` (LANE='AG-2', :44-151), `mailWaitAnchor.test.ts` (LANE='AG-2', :43-152), `mailWaitBoxLens.test.ts:123-144` (stampSql), `landScript.test.ts:526` (the NOT-TAKEN line verbatim). Two tests bind the implementation shape:
  - `mailWaitAnchor.test.ts:139,:144` and `mailWaitWatermark.test.ts:120,:125` assert `whereOf(probe) === whereOf(read)`. The predicate must enter each read AND its probe together, or `read OK` is certified by a probe over a different predicate.
  - `mailWaitFlags.test.ts:150-151` greps the SOURCE for the literal `preWatermarkSql(args.lane, watermark)`. A new parameter reddens it.
  DELTA (order 2c) → "Decide inside each builder from `!LANE_ADDR.test(lane)` (laneRoster.mjs:48, already imported), with no signature change, so every AG-n string is byte-identical. Add a test asserting builder(`'AG-2'`, …) equals the pre-change string exactly, and builder(`'scout-1'`, …) contains the not-exists clause in BOTH the read and its probe."
  Also note: "readable but not claimable" includes `operator` and legacy `scout`. That is harmless, because no from_lane row can carry reply_to to an operator row (2c), and legacy scout rows with replies drop out as desired. Say so in the card so it is a decision, not an accident.

## 6 · What the card misses

FENCE must add: `scripts/adversaryGate.mjs` · `api/cwf/__tests__/adversaryGate.test.ts` · `api/cwf/__tests__/relayBusMigration.test.ts` · `scripts/authorityMatrix.mjs` (+ `authorityMatrix.test.ts` if it pins the list) · the new mail-wait builder test (if not inside mailWaitBoxLens.test.ts).
free.md lines to change: :179-184 ("Your address is `scout`"), :198-199 (box definition), :225-226 (commands), :289-306 (the reply call, + p_from).
Post-apply, NOT this PR: `docs/ground/authority-live.snapshot.json` and `authority-conformance.latest.md` re-measure. The snapshot is already stale (§1).
Outside the repo: the Architect's scout fanout must address scout-1/scout-2, and a card still sent to legacy `scout` keeps the August floor.
UI/UX (order 5), run: `git grep -n "'scout'" origin/master -- src` → no output (exit 1). Second lens `git grep -n -i -e lane_addr -e relay_inbox -e laneRoster origin/master -- src` → no output. → **no UI surface**.

## 7 · CALLER-ABSENT: is there an existing ack-by-reply?

No. Every reply_to reader at master uses it as "is a returning row", never as "the target was delivered": `20260911180000:186-190,:294`, `scripts/adversaryGate.mjs:267`, `mail-wait.mjs:1016`. The two tests only pin the self-FK and the RI trigger (`relayBusMigration.test.ts:235-277`). The nearest existing mechanism is `busDelivery.ts:155-174` "ACTED is decided FIRST … work is proof of receipt whatever the receipt says". That is the same doctrine (evidence over stamp), but keyed on git, which a scout never writes. So a new predicate is justified. The fresh floor (1c) reuses the existing watermark (mail-wait.mjs:556) and needs no new mechanism.

## Summary of deltas the Architect can paste
D1 M1 line cite :1149 → :1153. D2 order 1a → the p_from form (§4) + drop 3-arg overload. D3 order 1b → b2 adversary gate + JS mirror + test (§2a). D4 order 1b → factory_state :119 / factory_events :160 by measured name (§3d). D5 order 2a → add `r.lane_addr = <row>.lane_addr` (§2c). D6 order 2c → decide in-builder from LANE_ADDR, no signature change, byte-identical AG-2 test (§5). D7 fence += §6 list, with the ruling that adds scout-1/scout-2 to RULED_REPLY_AUTHORS and RULED_NONCLAIMING_AUTHORS. D8 WHY: cite list_migrations (both 2026-09-11 migrations applied), not the stale snapshot. Name the anon residual (§4).

read relay_inbox at 2026-09-29 (mail-wait --read of this order; no --take; not stamped — scouts cannot stamp, M1). Nothing written except this file and the scout_reply row.
