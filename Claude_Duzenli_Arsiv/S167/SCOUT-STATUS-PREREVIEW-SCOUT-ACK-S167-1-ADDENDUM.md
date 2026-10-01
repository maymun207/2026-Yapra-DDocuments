[scout-1]
ADVERSARY-VERDICT: RED card=CARD-SCOUT-ACK-S167-1 (unchanged; this addendum closes traps (d) and (e), which the first window left UNMEASURED)
GRAFT: graft grep "from_lane" · graft grep ".replied" · graft skeleton scripts/relayAudit.ts; spans read at the named lines; `git grep` at origin/master 9354882aa2f993d8285bb0cefcb9cb1f350ec118 for the gate files graft does not index.
PROMPTS: none for the reads. The bus POST of this reply was denied by the auto-mode classifier (see SCOUT1-BLOCKER-BUS-S167-1.md).

SCOUT-STATUS-PREREVIEW-SCOUT-ACK-S167-1 · ADDENDUM · reply to ORDER-SCOUT-PREREVIEW-SCOUT-ACK-S167-1 (id 1538292b-9a6d-4366-988f-009cbf35d7f7). Main text: SCOUT-STATUS-PREREVIEW-SCOUT-ACK-S167-1.md (earlier scout-1 window). I review a card about my own visibility, as hostilely as any other.

(d) MEASURED — no gate rejects a `PICKED-UP-` artifact prefix.
- `git grep -n "PICKED-UP\|artifact_name.*like\|SCOUT-STATUS"` over scripts/relayAudit.ts, scripts/reportSchemaCheck.ts, .github/workflows and the scout migration → 0 hits.
- scout_reply checks only that the name is non-empty: 20260929030000:62 `if p_artifact_name is null or trim(p_artifact_name) = '' then`.
- relayAudit's bus mode passes the artifact name as a LABEL only: auditBusRow (relayAudit.ts:2028-2042) calls `auditText(artifactName, row.body)`. A PICKED-UP row is judged by its BODY's grammar; whether a one-line pickup body passes bus-mode grammar is UNMEASURED.
(e) MEASURED — YES, one reader reads a pickup as a finish, and a second is ambiguous.
- scripts/busDelivery.ts:331-344 (readBusCards) collects every from_lane row with non-null reply_to for scout addresses into `repliedKeys` with NO artifact filter. :356 sets `card.replied`. classifyCard :186-187 `const replied = !LANE_ADDR.test(card.laneAddr) && card.replied === true;` → `stamped || replied ? 'RECEIPTED'`. A PICKED-UP row would turn a scout card RECEIPTED in the delivery lens before any answer exists.
- scripts/adversaryGate.mjs:265-270: a sealed card's EXEMPT ack is admitted when `ack.direction === 'from_lane' && SCOUT_ADDRESSES.includes(ack.lane_addr)`, with no check of the ack row's artifact name or first line. A PICKED-UP row id would satisfy it. The VERDICT path (:273-280) is safe, because it requires the first line to match VERDICT_FIRST_LINE_RE.
Added amendments (paste-ready):
A8. "K2 applies the same `artifact_name not like 'PICKED-UP-%'` exclusion in scripts/busDelivery.ts readBusCards (:334-339), so a pickup does not make a scout card RECEIPTED. A test asserts a scout card with only a PICKED-UP reply classifies NO-EVIDENCE."
A9. "K2 makes scripts/adversaryGate.mjs:267 refuse a PICKED-UP row as an EXEMPT ack (AG006). A test plants a PICKED-UP row id as the ackId and asserts refusal."

END · ADDENDUM
