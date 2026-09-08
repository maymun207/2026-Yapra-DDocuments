# OWNER-RULING-S133-COLD-RESTART-1

Written WHOLE (A-REC-S101-7) by the Architect at 2026-09-08T05:0xZ (08:0x TSİ). This artefact is the human confirmation `foreman.md` §1z and `producer.md` require by name before any lane address is taken over. It is composed of TWO parts that must not be confused: the owner's WITNESS, which is his and is quoted verbatim; and the MEASUREMENT that names the addresses and shas, which is the Architect's and was taken from the live database and the owner's clone.

## 0 · PLATINUM-BREACH-S133-1 — SELF-DECLARED, and it is why this document exists in this shape

At 04:4xZ the Architect wrote the owner an action item asking him to TYPE a ruling sentence the Architect had itself composed. That item is FORBIDDEN by the PLATINUM rule's own test: *"Sahibe herhangi bir aksiyon maddesi yazmadan önce sor: bu madde insan YARGISI içeriyor mu? Hayırsa → o iş MAKİNE işidir."* The judgement — that the windows are dead — had ALREADY been delivered, in the owner's own message, before the item was written. What remained was transcription, and transcription is machine work. Naming the two shas was never his either; it is measurement, and measurement is the Architect's.

Recorded as `PLATINUM-BREACH-S133-1`. The repair is this document: the Architect mints the ruling from the witness the owner already gave, and the owner types nothing.

## 1 · THE WITNESS — the owner's words, verbatim

> "AntiGravity ve tum ClaudeCode extentionlarini kapattim sidmi bunlari yeniden baslatmak istiyorum, grave yard Agentlarla isimiz yok simdi yenilerini baslatacagiz."

and, on the fossil addresses, in the same exchange:

> "diger aglerin queuelari ve onalrin adress spacelerini de fosil olarak tutmak anlamsiz"

> "bundan sonra 4 worker agent ile gitmek yerine sadece 1 x worker agent ile gidecegiz, + 1x Advesariy scout agent olacak ve + 1 x Foreman agent olacak"

This is the lens the machine does not own. `F-S117-LIVENESS-IS-POSITIVE-ONLY-1`: a fresh heartbeat, a moved ref, a posted row each prove ALIVE at an instant and **not one proves dead**. A heartbeat threshold was tried and falsified. So the factory NAMES and a human CONFIRMS, and the confirmation above is the whole of the authority for everything below.

## 2 · THE MEASUREMENT — the Architect's, instruments named

`public.factory_state` over the Supabase MCP, and `git rev-parse origin/lane/AG-N` in the owner's clone over the bridge, both read 2026-09-08T04:3x–04:4xZ:

| address | row state | nonce_sha, and the ref at origin carries the SAME value | last heartbeat |
|---|---|---|---|
| AG-1 | WORKING | `92a307b2b42abf37a68f06bea13eaf4a37307c35` | 2026-09-02T22:41:49Z |
| AG-2 | WORKING | `9b56810026d7623e0f6f88142a02f166a106c061` | 2026-08-29T04:24:11Z |
| AG-3 | WORKING | `8641beb171c9b606d6293a5c3b14cdb5df16f133` | 2026-08-29T04:24:16Z |
| AG-4 | WORKING | `279a0c62b9510ea4c75e92ba7b18bce7f4ecc99e` | 2026-09-07T21:51:47Z |
| AG-5 | CLAIMED | `4a81984328efbd5ed6754882b060ca1d5a09e8f5` | 2026-09-08T04:12:43Z |

**The ref half is CARRIED, not fresh.** Neither the Architect container nor the bridge VM holds a GitHub credential (`F-S126-ARCHITECT-GH-403-1`; `F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1`), so those five shas come from the clone's remote-tracking refs as of the last successful fetch. **Every window re-measures with `git ls-remote` before it touches anything, and STOPS on any difference.**

## 3 · WHAT HAPPENED TO AG-1, AG-2 AND AG-3 — measured, because the owner asked and a guess would have been worse than silence

**Their last substantive card LANDED in each case.** Measured from the bus and reconciled against `cwf-open-items-register-v122` §1:

- **AG-1** — last card `PHASE-LEDGER-DECAY-SWEEP-1-v5`, 2026-08-28T10:50:08Z, consumed. Register §1, S123: the ledger decay sweep closed GI-006, GI-012, PI-007, PI-011 and PI-014 CLOSED-BY-TREE.
- **AG-2** — last card `PHASE-CP8-RECONCILE-1-v7`, 2026-08-28T06:09:58Z, consumed. Register §1, S122: PR #474, the CP-8 reconciliation, LANDED.
- **AG-3** — last card `PHASE-A23-ASK-SHAPE-BUILD-1-v1`, 2026-08-28T12:13:25Z, consumed. Register §1, S123: PR #479, the A23 build — the seventh key BUILT.

**So there is no half-finished product work stranded at those three addresses.** What IS stranded is their own closing: `S118-FINAL-CLOSING-1-v1` (2026-08-26T01:22:48Z) sits UNCONSUMED in all three boxes, and AG-3 additionally holds `S118-LANE-CLOSING-2-AG3-v1` and `S118-LANE-CLOSING-3-AG3-SWEEP-v1` unconsumed. **The closing cards were sent and never acted, which is precisely why the rows still read `WORKING` eleven sessions later.** That is the answer to "onlara ne yaptık": we told them to close, and nothing was alive to hear it.

**A COUNT THAT MUST NOT BE QUOTED WITHOUT ITS CAVEAT.** The three boxes hold 98, 105 and 125 rows with a NULL `consumed_at`. That is NOT a backlog of unactioned work: `consumed_at` was abandoned for most of the period those rows were written — nothing could write the stamp — so a NULL there is an artefact of the abandonment, not a measurement of work. `TOTAL-45` and `F-S131-PRODUCER-BOOT-SAYS-CONSUMED-AT-RETIRED-1`. The dated read in the paragraph above is the honest instrument; the aggregate is not.

## 4 · THE RULING

Under the witness in §1 and the measurement in §2:

1. **AG-4 and AG-5 are taken over by leased replacement**, each by the fresh window that will hold it, pinned to the dead nonce named in §2 — `git push --force-with-lease=refs/heads/lane/AG-N:<dead nonce>` plus `factory_reclaim('AG-N','<dead nonce>','<new nonce>')`. Not a delete. A bare `--force` is BLOCKED by the guard and that block is the producer boot's own positive control.

2. **AG-1, AG-2 and AG-3 are RETIRED, not left as fossils.** The owner is right that keeping their address spaces and queues as fossils is meaningless, and the Architect's earlier "leave them" was wrong for a measurable reason rather than a matter of taste: `foreman.md` §1z states that a non-`CLOSED` row plus a present ref is **byte-identical to a healthy lane**, so the ordinary walk answers `NO-ADDRESS-FREE` and the takeover path cannot fire — *"The address is unreclaimable for the rest of the session and nothing barks."* Three of those left standing are three landmines, not three harmless corpses.

   **The retirement runs as four sanctioned motions per address, in this order, by the foreman:** take it over by leased replacement exactly as in (1); write `CLOSED`; release the ref — which by then is the foreman's OWN ref, so the release is the DRAINING ritual's own step 3 and not a third party deleting someone else's ref, a motion `foreman.md` authorises nowhere; then move to the next. The result is a real death certificate — `CLOSED` row **and** ref absent — which `foreman.md` names as the only reading that means "retired, nothing to sweep", and it leaves three genuinely FREE addresses behind.

3. **The `lane_addr` CHECK constraint is NOT touched.** Removing AG-1/2/3 from `relay_inbox_lane_addr_check` and `factory_state_lane_addr_check` would be a migration — Operator work under ADR-005, an owner spend/approval, and an ADF-freeze question — for negative value: a free address is an asset. The roster stays five wide and three of them stand free.

4. **The queues are NOT deleted, and cannot be.** `relay_inbox` carries a delete guard and is append-only by law (GOLDEN LEDGER). Retiring an address retires the ADDRESS, never its history. The 375 rows those three lanes received stay exactly where they are, and that is correct: they are the record.

5. **The shape stands at one worker, one adversary scout, one foreman** — `OWNER-RULING-S125-SINGLE-LANE-1` and `OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1`, restated by the owner in §1 and unchanged by this ruling. The scout takes no address.

## 5 · WHAT THE OWNER DOES

Opens three windows, in order, and pastes the start prompt the Architect gives him for each. Nothing else. He types no ruling, transcribes no sha, and runs no command of his own composition — §0 is why that sentence is in this document.

TAIL ANCHOR: OWNER-RULING-S133-COLD-RESTART-1 ends here.
