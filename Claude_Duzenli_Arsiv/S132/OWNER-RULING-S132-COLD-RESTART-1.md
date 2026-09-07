# OWNER-RULING-S132-COLD-RESTART-1 — every AG window restarted from scratch by the owner; the death certificates for AG-4 and AG-5, with their shas measured

Recorded by the Architect, 2026-09-07T05:36Z (08:36 TSİ). Owner's words, verbatim: "AG agentlarinin hepsini sifirdan baslatmak istiyorum, foreman, AG4 worker ve scout u kapattim yeniden boot edecegim."

## WHAT WAS MEASURED BEFORE THE RULING (2026-09-07T05:33Z)

| lane | `factory_state` | nonce (full, from the row) | ref on origin (owner's clone, last fetch 04:55Z) | heartbeat |
|---|---|---|---|---|
| AG-4 | WORKING | `53938e395aa17383bbf2b1a2ae4d33f9da51e0a5` | `origin/lane/AG-4` at the same value, 2026-09-06 06:21 TSİ | 2026-09-07T05:06:21Z, then silent |
| AG-5 | CLAIMED | `b798ceea7ac4d84fd62dba8ff4d3f50da19528ab` | `origin/lane/AG-5` at the same value, 2026-09-06 06:27 TSİ | 2026-09-07T05:06:32Z, then silent |
| scout | CLOSED | — | takes no address (OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1) | — |

Both rows carry both halves of a LIVE claim (row + ref) and no half of a death certificate. Liveness is positive-only: the silent heartbeats prove nothing (F-7: a box read by another lane writes the read lane's heartbeat — the 05:06Z stamps are consistent with the closed twin Architect's reads). The confirming lens is outside the machine, and the owner supplied it: he closed the windows himself.

The AG-4 box holds ONE unconsumed card at this instant: `CARD-SOTA-SCOREBOARD-S132-1-v1` (row `634526a2-b617-4fe8-9574-45d353eae923`, 05:28:59Z, `consumed_at` null). A fresh producer window that reads its backlog DIRECTLY at birth (CLAUDE.md §1) finds it; the card is not re-minted.

## THE RULING

1. The owner's eye is the human half of BOTH death certificates: no other AG-4 window and no other AG-5 window is open — he closed them.
2. A fresh producer window claims AG-4 by the takeover form the boot accepts, naming THAT lane and THAT sha (the S129/S131 form): `AG-4 is dead, sha 53938e395aa17383bbf2b1a2ae4d33f9da51e0a5`.
3. A fresh foreman window claims AG-5 the same way: when its claim walk asks, the owner confirms dead and reclaims AG-5 against `b798ceea7ac4d84fd62dba8ff4d3f50da19528ab`; if the window asks in prose rather than by a choice, the same line form applies: `AG-5 is dead, sha b798ceea7ac4d84fd62dba8ff4d3f50da19528ab`.
4. The scout boots without an address; nothing to certify. Its known defect stands unchanged: with no watermark it replays every scout card ever minted (F-S131-SCOUT-REPLAYS-DECAYED-CARD-1, frozen) — a duplicate scout row on the bus after this boot is that defect, not a new one.
5. Nothing on the bus is touched by this ruling. No card is re-minted; no governed row is written by the Architect. The Architect's 05:37Z self-check (the AG-4 takeover reminder) was cancelled the moment this ruling was given, so no stale takeover prompt fires.

## WHAT PROVES IT LANDED (Architect reads, never the windows' word)

- `factory_state` AG-4 row: nonce ≠ `53938e39…`, then WORKING; AG-5 row: nonce ≠ `b798ceea…`, then CLAIMED with a moving heartbeat.
- `origin/lane/AG-4` and `origin/lane/AG-5` moved (owner's clone after a fetch, or the Vercel branch list).
- `CARD-SOTA-SCOREBOARD-S132-1-v1` gains `consumed_at` — a done-marker after its report posts, never a start signal.
- The known half-landing shape to watch for (S131 measured it on AG-5): ref moved, DB row still on the old nonce — F-S118-CLAIM-GUARD-DEADLOCK-AFTER-LEGITIMATE-RECLAIM-1's shape; re-measure before naming it.

TAIL ANCHOR: OWNER-RULING-S132-COLD-RESTART-1 ends here.
