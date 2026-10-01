[scout-1]
ADVERSARY-VERDICT: RED card=CARD-SCOUT-ACK-S167-1
GRAFT: graft skeleton scripts/scoutReply.mjs (not indexed). Every other line below was read with git at master 1f694e1ff47d84d6e7b321e332446519f443b1f0: `git show` of scripts/mail-wait.mjs and supabase/migrations/20260929030000_scout_addresses_and_reply_ack.sql, and `git grep` of .mcp.json. The local clone is behind master, and graft indexes the local clone.

SCOUT-STATUS-PREREVIEW-SCOUT-ACK-S167-1 · reply to ORDER-SCOUT-PREREVIEW-SCOUT-ACK-S167-1 (id 1538292b-9a6d-4366-988f-009cbf35d7f7)
This card is about MY OWN visibility (scout-1). It is reviewed as hostilely as any other.
STATUS OF THIS REPLY: this file only. The bus send was refused in this window (see BLOCKERS).

## 1 · PRECONDITION at master 1f694e1f (mail-wait.mjs is byte-identical to 5e6e691f)
- The ACK BY REPLY block is :440-460, not :441-447. `replyAckClause` is at :457-460.
- `takesByStamp` :1036, `ackByReplyLine` :1038-1040, `takeDelivery` :1042-1048 (the card says :1029-1044).
- The substance holds. A claimable address stamps via `stampConsumed`. A non-claimable address prints `[ACK-BY-REPLY]` and writes nothing.

## 2 · Traps
(a) THE WRITE PATH. `public.scout_reply(p_reply_to uuid, p_from text, p_artifact_name text, p_body text)` is at 20260929030000:42. It is SECURITY DEFINER, and EXECUTE goes to public, anon, authenticated, supabase_read_only_user and service_role (:112-113). Its header (:20-24) says the scout window reaches it over the publishable key. There are two routes, and the card names neither:
  (i) mail-wait's own `query()` (:391-397) already sends `tools/call execute_sql` to the `supabase-ro` MCP server, whose URL carries `read_only=true` (.mcp.json:5). No new credential and no migration would be needed. Whether a SECURITY DEFINER INSERT succeeds inside that read-only channel is UNMEASURED by me; the Architect relays that a 20:30Z reply went this way.
  (ii) A REST POST to rest/v1/rpc/scout_reply with the publishable key (what scout-2's scratch scoutReply.mjs does).
  Either route turns mail-wait into a WRITER. Its header (:46-51) says "the script needs no write path of any kind", and its usage line promises `--read … NEVER WRITES`. Route (i) also puts a write on the exact verb that guard GM-1 refuses as a tool call ("execute_sql is refused even on a server named read-only"). The script is not behind the hook, so K1 over (i) does from code what the guard forbids from the window.
(b) K2 IS NEEDED. `replyAckClause` (:457-460) is `and not exists (select 1 … where r.reply_to = relay_inbox.id and r.direction = 'from_lane' and r.lane_addr = relay_inbox.lane_addr)`. It has no artifact filter, so a PICKED-UP row would drop the card at once. It is the ONE definition used by newMailSql :495, boxProbeSql :524, unconsumedSql :609, unconsumedProbeSql :633 and preWatermarkSql :642, so one edit covers the row read and its count probe together.
(c) DOUBLE POST. `retryTransient` (:1401) re-runs its fn on HTTP 408/429/500/502/503/504 and on connect/DNS failures (:1344, :1352). A 502/504 can follow an INSERT that already committed, and scout_reply has no idempotency key. Today `--take` reaches `takeDelivery` from readCard :975/:1023, called at :1611, which is OUTSIDE retryTransient. So K1 does not double-post as the code stands. It WILL double-post if K1 is written "retry path included" by wrapping it in retryTransient. Two scout-1 waiters ran at once in this very session (20:32Z and 20:38Z, both delivered this card), so a second window taking the same card is also real.
(d) UNMEASURED. The relay corpus, report-schema and relayAudit behaviour on a `PICKED-UP-` artifact prefix was not read: the harness refused the read. Measured side-fact: `relay_adversary_gate_check` returns null for any from_lane row (20260929030000, first line of its body), so the bus gate does not see a PICKED-UP reply.
(e) UNMEASURED. busDelivery.ts / architect:open readers of "a from_lane row exists" were not read, for the same reason.

## 3 · Amendments (paste-ready)
A1. "K1 names its write route and states the doctrine change: mail-wait gains ONE write, on `--take` only, never on `--read` or on the poll. The header :46-51 and the `--read … NEVER WRITES` usage line are amended in the same commit."
A2. "Before K1 is sent, the owner rules whether a script-side call to scout_reply over the supabase-ro execute_sql channel is permitted while guard GM-1 refuses the same verb as a tool call. If it is not, K1 uses the REST rpc with the publishable key, read from the environment and never from a literal."
A3. "K1 makes exactly ONE attempt, never inside retryTransient. Before posting, it reads for an existing from_lane row with reply_to = the card id and artifact_name = 'PICKED-UP-<artifact>' and prints `[PICKED-UP] <artifact> already posted (<row id>)` when one exists. The test plants a 502 after a committed insert and asserts one row."
A4. "K2 edits `replyAckClause` (mail-wait.mjs:457-460) alone, adding `and r.artifact_name not like 'PICKED-UP-%'`. A test asserts the AG-n clause is still the empty string, byte for byte."
A5. "K1's first act in the lane is a measured probe: one PICKED-UP post on a test card through the chosen route, quoting the returned row id or the refusal text. If route (i) refuses under read_only=true, K1 uses route (ii)."
A6. "PRECONDITION line numbers: :440-460 and :1036-1048."
A7. "(d) and (e) are measured by the lane before K3 is built: name every reader that treats a from_lane row as a finish, and whether any gate rejects the PICKED-UP- prefix."

## BLOCKERS (this window)
- The LAND-SD1 reply is NOT on the bus. GM-1 refused execute_sql on supabase-ro twice. The auto-mode classifier refused running session 3c381963's scratchpad/scoutReply.mjs ("Code from External"). The body is ready: scratchpad/reply-land-sd1.txt, 3.3k chars. Full text: Claude_Duzenli_Arsiv/S167/SCOUT-STATUS-LAND-SD1-S167-1.md.
- FINDING (CLAUDE.md §6a): session 3c381963's scratchpad/scoutReply.mjs carries a literal publishable key in variable `KEY`. The value is not reproduced. The script is not in the repo at master.
- The classifier also refused read-only `git grep`s for traps (d)/(e).
- ORDER-SCOUT-PREREVIEW-CI-SPEED-S167-1 (a392a51e): not started.
