# A-REC-S133-4 — the Architect published a machine fallback without checking that the machine could execute it, and withdraws it here

Written 2026-09-08T07:25Z, at the 07:22Z self-tick. This record WITHDRAWS the fallback published in `S133-DISPATCH-RECORD-4` and in the 07:22Z tick instruction. Nothing was dispatched under it, so nothing has to be un-done; the defect is that it was published as a ready path.

## WHAT WAS PUBLISHED

> "The fallback, if the bridge is still down at the next tick, is a MACHINE path and not an owner path: card AG-5 to write the two files into `Claude_Duzenli_Arsiv/S133/` from their bus rows and print each file's md5 for comparison against `md5(body)`."

## WHY IT CANNOT BE EXECUTED

The card would order the foreman to read two rows it cannot reach, and the impossibility was already in the record when the fallback was written.

- **MEASURED by the Architect, reading `scripts/mail-wait.mjs` earlier this session:** the poller reads `direction = to_lane` and delivers to a lane its OWN address. `CARD-MA-RERUN-3-S132-1-v13` is addressed to **AG-4**; `ADVERSARY-REVIEW-MA-RERUN-3-v12-S132-1-scout-report` is **from_lane**. Neither is reachable by AG-5 through the only mail instrument a lane has.
- **MEASURED by the scout, `F-S133-SCOUT-CANNOT-READ-A-CARD-PAST-THE-OUTPUT-CAP-1`:** a body is delivered truncated at 2048 octets. Even a row correctly addressed to AG-5 would arrive as the first 2048 of 39440 bytes — and a file written from a truncated body would carry an md5 that does not match, which is the check working, not a repair.
- **TESTIMONY, not the Architect's own measurement:** the scout's AMENDMENT 3 states that a server-side digest "would require execute_sql, which guard-mcp refuses". If that holds for every lane, the raw-SQL route is closed too. Marked as the lane's testimony about its own tools rather than a fact this record measured.
- **UNMEASURED:** whether the foreman's shell can write into the documents folder at all. Its working copy is `cwf_yaprak`; `2026 - Yapra - DDocuments` is a different tree. Never tested, and the fallback assumed it.

Embedding the file bodies INSIDE a card to AG-5 does not rescue it: the same 2048-octet cap applies to that card, and a file written from an Architect-typed body is a transcription, which is the exact thing the md5-equals-the-row route exists to eliminate.

## THE CLASS, AND IT IS NOT NEW

This is `A-REC-S133-2` again — a card ordering something the repository forbids by construction — reached from the other side: there, the order was measured impossible AFTER it was written; here, the impossibility was already recorded in this session's own findings and the Architect wrote past it. Relief from delivery pressure is when this happens (`A-REC-S122-ARCHITECT-PRECISION-DECAY-1`), and the mitigation that works is mechanical: **a proposed path names the instrument that executes it before it is published.** The fallback named no instrument. It should not have been written.

## WHAT IS ACTUALLY TRUE ABOUT THE MA LINE

`CARD-ADVERSARY-REVIEW-MA-RERUN-3-v13-S132-1-v1` (preflight GREEN, md5 9fcff65dd829bcb32fff3922b89a5db0, 14069 bytes) stays HELD, and the only route that reopens it is the Architect's bridge returning. There is no lane-side substitute. That is a genuine single point of failure in the review mechanism and it is now named:

**`F-S133-THE-REVIEW-ROUTE-DEPENDS-ON-THE-ARCHITECT-BRIDGE-1`** — the scout can only be given an operand it can prove, the only proving route is an archive file whose md5 equals the bus row, and the only actor that can place that file is the Architect over the device bridge. When the bridge is down, the adversary mechanism cannot start a new round on any line whose files were not already placed. The durable cure is a lane-side instrument that writes a row's body to a file (a `mail-wait.mjs` flag, so the file equals the row BY CONSTRUCTION and no transcription exists anywhere) — carded when a lane is reachable, not asserted here.

## THE OTHER SIGNAL, AND WHAT IT IS NOT

At 07:23Z: AG-4's last heartbeat 06:50:08Z, AG-5's 06:49:15Z, the scout silent since 06:42:01Z, and the Architect's bridge gone since 06:55Z. One cause explains all four — the machine slept or the desktop app closed.

That is a HYPOTHESIS and it is labelled one. `CANLILIK YALNIZ POZİTİFTİR`: a stale heartbeat is inversely correlated with production, so silence is not death, and the only positive lens — a landed commit, a pushed branch, a new bus row — shows nothing either way. No lane row is written, no reclaim is planned, and no lane is declared dead. The factory mode stays READY. If the windows are alive and working, everything here is still correct; if the machine slept, the lanes re-claim their own addresses when it wakes, which is the design.

## STATE

Mode READY. No `RELEASE` row of any kind. AG-4 holds `CARD-MA-RERUN-3-S132-1-v13` and `CARD-WEB-VALVE-1-S132-1-v10`, both gated. The scout holds `CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v10`, whose three archive files were placed at 06:40Z — that review is NOT blocked by the bridge. The owner has no action item; a machine that sleeps is not an owner failure and waking it is not an owner instruction this record will manufacture.

ARCHIVE DEBT, still unwritten and still named: `CARD-MA-RERUN-3-S132-1-v13.md` · `ADVERSARY-REVIEW-MA-RERUN-3-v12-S132-1-scout-report.md` · `CARD-ADVERSARY-REVIEW-MA-RERUN-3-v13-S132-1-v1.md` · `S133-DISPATCH-RECORD-4.md` · this record.
