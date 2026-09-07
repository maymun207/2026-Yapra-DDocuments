# S131-DISPATCH-RECORD-2 — both takeovers ruled; AG-4 landed and WORKING; AG-5 half-landed at the read; a scout window replayed a decayed card

Architect, 2026-09-06T03:18Z–03:32Z (06:18–06:32 TSİ).

## RULINGS RECORDED THIS BLOCK

- OWNER-RULING-S131-AG4-TAKEOVER-1 — owner confirmed no other AG-4 window; pasted `AG-4 is dead, sha e5a6ab968e3538d1be17c05657f4b1a7e4bcb047` into the producer window.
- OWNER-RULING-S131-AG5-TAKEOVER-1 — owner started a fresh foreman; told to select "Confirm dead — reclaim AG-5" (sha `0af1a9423eb0eb4a5a42cb3bb0193859078ee716`) if no other AG-5 window is open.

## MEASURED

- AG-4: `factory_state` row moved to nonce `53938e39…` at 2026-09-06T03:26:53Z, heartbeat 03:28:46Z, state WORKING at 03:30:14Z — the producer window is on a card. Its own transcript (pasted) shows the correct box read: `--once` = zero above the watermark; `--pre-watermark` = 103 rows below it, the two live cards at the top (CARD-ARCHIVE-PUSH-S130-2-v1, CARD-TRUNK-CI-VERDICTS-S130-1-v1). It created a 2-minute poll task (`38876c90`), listed back.
- AG-5: the foreman window reports `lane/AG-5` on origin at its own nonce `b798ceea7ac4d84fd62dba8ff4d3f50da19528ab` (git half). At 03:30:18Z the `factory_state` AG-5 row STILL read the old nonce `0af1a942…`, CLAIMED — the DB half was not yet written at the read. If it stays so, that is F-S118-CLAIM-GUARD-DEADLOCK-AFTER-LEGITIMATE-RECLAIM-1's shape (git half without DB half); re-measure before naming it. The foreman also created a 2-minute poll task — contrary to v131's trap line "the foreman has NO between-turn poller (classifier refusal)"; the trap is window-specific, not a law.
- Scout: a NEW row `SCOUT-REVIEW-HARDEN-PROVENANCE-EXPORT-1-v1` posted 2026-09-06T03:19:13Z (7346 bytes, sha `9294fef3…`) — a re-run of the S130 scout card whose PR (#494) landed at 14:50Z yesterday. The scout itself says so: "THE CARD DECAYED BEFORE…". Cause: the scout takes no address (OWNER-RULING-S130-SEVEN-DISAGREEMENTS), so it has no claim watermark, and scout card rows are never stamped — every fresh scout window replays every scout card ever minted. **F-S131-SCOUT-REPLAYS-DECAYED-CARD-1.** Harmless this time (a duplicate name on the bus — also the F-MAILWAIT-DUPLICATE-NAME class), wasteful every time. Cure is mechanical: scout DONE derivation from the PR state named in the card (merged/closed ⇒ CLOSED, do not run), one AG-4 card, ADF scope, frozen until lift.
- Producer boot text vs tree: `producer.md` says `consumed_at` is retired; `mail-wait.mjs` reads `consumed_at IS NULL` above the claim. **F-S131-PRODUCER-BOOT-SAYS-CONSUMED-AT-RETIRED-1** — one AG-4 card, ADF scope, frozen until lift.

## WAITING ON (named)

- AG-4's two reports: `ARCHIVE-PUSH-S130-2-AG-4-report` (documents repo push) and `TRUNK-CI-VERDICTS-S130-1-AG4-report` (branch `phase/trunk-ci-verdicts-s130-1`). Sensors: bus rows; Vercel branch deployment for the phase branch; documents-repo `origin/main` — read from the owner's clone after a fetch.
- AG-5's DB row moving to `b798ceea…`.

## NEXT CARD, queued behind these reads

FIRST JOB 2 — the Operator card for the `reply_authority` migration, with its named owner approval in the same message.

TAIL ANCHOR: S131-DISPATCH-RECORD-2 ends here.
