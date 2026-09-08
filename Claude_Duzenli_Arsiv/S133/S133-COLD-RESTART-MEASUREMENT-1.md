# S133-COLD-RESTART-MEASUREMENT-1

Written WHOLE (A-REC-S101-7) by the Architect at 2026-09-08T04:4xZ (07:4x TSİ), the moment the owner reported that he had closed AntiGravity and every Claude Code extension window by his own hand and wanted fresh lanes. Every figure below is MEASURED with its instrument named, or marked CARRIED with the reason it could not be re-measured from here.

## 0 · WHY THIS DOCUMENT EXISTS

`foreman.md` §1z names the exact cell this factory is now sitting in, and names it as the one that reads as nothing at all:

> A window that dies while `WORKING` leaves `WORKING` + ref present, which is BYTE-IDENTICAL to a healthy lane — so it is not an unhandled cell, it is a cell that READS AS NORMAL. The ordinary walk then measures every ref present, answers `NO-ADDRESS-FREE` and stops, all correctly, and the takeover path cannot fire because takeover requires the released half. **The address is unreclaimable for the rest of the session and nothing barks.**

Five windows were closed without the DRAINING ritual, so not one of them released its ref or wrote `CLOSED`. There is no lens inside this machine that can tell those five rows from five healthy lanes — `F-S117-LIVENESS-IS-POSITIVE-ONLY-1` — and there is no threshold that may be substituted for one, because a heartbeat threshold was tried and FALSIFIED (`AG-3`, stale at 04:47:22Z on 2026-08-25, committed `1e154696` at 05:00:10Z). The factory NAMES; a human CONFIRMS. This document is the naming.

## 1 · THE GRAVEYARD — MEASURED 2026-09-08T04:3x–04:4xZ

| address | `factory_state` row | nonce_sha (the row's) | `refs/heads/lane/<addr>` at origin | last heartbeat |
|---|---|---|---|---|
| AG-1 | WORKING | `92a307b2b42abf37a68f06bea13eaf4a37307c35` | EQUAL to the row's nonce | 2026-09-02T22:41:49Z |
| AG-2 | WORKING | `9b56810026d7623e0f6f88142a02f166a106c061` | EQUAL to the row's nonce | 2026-08-29T04:24:11Z |
| AG-3 | WORKING | `8641beb171c9b606d6293a5c3b14cdb5df16f133` | EQUAL to the row's nonce | 2026-08-29T04:24:16Z |
| AG-4 | WORKING | `279a0c62b9510ea4c75e92ba7b18bce7f4ecc99e` | EQUAL to the row's nonce | 2026-09-07T21:51:47Z |
| AG-5 | CLAIMED | `4a81984328efbd5ed6754882b060ca1d5a09e8f5` | EQUAL to the row's nonce | 2026-09-08T04:12:43Z |
| operator | CLOSED | — | — | — |
| scout | CLOSED | — | — | — |

Instruments: the rows from `public.factory_state` over the Supabase MCP; the refs from `git rev-parse origin/lane/AG-N` in the owner's clone over the bridge.

**THE REF READ IS CARRIED, NOT FRESH, AND THE REASON IS A CAPABILITY GAP.** Neither the Architect container nor the bridge VM holds a GitHub credential — `git fetch` answers `fatal: could not read Username for 'https://github.com'` in both (`F-S126-ARCHITECT-GH-403-1`, standing; `F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1`, measured this session). So the five ref shas above come from the clone's remote-tracking refs as of the last SUCCESSFUL fetch, not from a live `ls-remote`. **The booting foreman re-measures them with `git ls-remote origin 'refs/heads/lane/AG-*'` before acting on a single one**, and if any differs from this table it STOPS and reports both values.

## 2 · THE ROSTER CEILING — MEASURED, and it is why no walk can succeed

`relay_inbox_lane_addr_check` and `factory_state_lane_addr_check` both read:

```
CHECK (lane_addr = ANY (ARRAY['AG-1','AG-2','AG-3','AG-4','AG-5','operator','scout']))
```

Five claimable addresses, and all five are held. `claim.md` §1 therefore prints `NO-ADDRESS-FREE` and orders the walk to STOP — correctly. `claim.md` also forbids inventing `AG-6`: two windows once won `lane/AG-6` and `lane/AG-7`, both pushes accepted, both refs reading back their own nonce, and both boxes unaddressable forever because the CHECK rejects those values. **An unaddressable box and an empty box are byte-identical at the poller.**

## 3 · THE MODE ROW — WRITTEN, and why INIT rather than READY

At the moment the owner reported the closure the factory mode read `READY`. `producer.md` §1z blocks a producer's claim walk on `INIT` and permits it on `READY` or `WORKING`, so a fresh producer opened against a `READY` mode would have started claiming while no foreman was alive to sweep — racing the one window whose job is to decide which addresses are free.

The Architect therefore wrote `mode = INIT` at 2026-09-08T04:41:25Z on the ARCHITECT MODE-ROW authority (memory seed v3 §7: the Architect's DB write surface is `relay_inbox` INSERT plus the `factory_state` mode row for owner-commanded transitions). The note on that row carries this reasoning verbatim. **No lane row was written by the Architect.** The S118 cold restart hand-wrote lane rows and recorded that as outside the declared surface; this restart does not repeat it, because `factory_reclaim` now exists and each fresh window reclaims its OWN address.

## 4 · THE CURE, and it is the one the boots already describe

`factory_reclaim(p_addr text, p_dead_nonce text, p_new_nonce text)` exists and is SECURITY DEFINER — MEASURED in `pg_proc` this session. It was exercised live twice in S132's cold restart (05:45:37Z and 05:48:07Z), which CLOSED `F-S118-CLAIM-GUARD-DEADLOCK-AFTER-LEGITIMATE-RECLAIM-1`.

The git half is a LEASED REPLACEMENT, never a delete — `producer.md`: *"reclamation runs only on a human confirmation naming THAT lane and THAT sha, and it is a leased replacement, announced, never a delete."* The lease is pinned to the DEAD nonce, so if the ref has moved since this table was written the push is refused and the window STOPS instead of stealing a live address. `--force-with-lease` is permitted by `guard-bash.py`; a bare `--force` is BLOCKED and that block is the producer boot's own positive control.

**Only TWO addresses are reclaimed.** `OWNER-RULING-S125-SINGLE-LANE-1` fixes the factory at one worker plus one scout, and `OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1` fixes the foreman at AG-5; the scout takes no address at all. So AG-5 and AG-4 are reclaimed and **AG-1, AG-2 and AG-3 are left exactly as they stand** — named here as fossils rather than swept, because sweeping them buys nothing and every avoidable write to another lane's row is a write this factory has paid for before.

## 5 · WHAT IS WAITING IN THE BOXES, so no fresh window mistakes a full box for an empty one

- **AG-4**, gated and unconsumed: `CARD-MA-RERUN-3-S132-1-v11` (04:28:43Z, sha256 `4a54b0d7f7e9dc0083299b55ad3f65aca59f8ec05c00cd8b7c89b150171f37c6`) and `CARD-WEB-VALVE-1-S132-1-v7` (03:55:14Z, sha256 `4030b97959443f32f2a70c073a3637a0234890890f7ff144abfeabadcf7c682b`). Neither has a `RELEASE` row; both are HELD by design.
- **scout**, unconsumed (the scout reads with `--read` and stamps nothing): `CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v7`, `CARD-ADVERSARY-REVIEW-ARCHIVE-PUSH-S133-1-v1`, `CARD-ADVERSARY-REVIEW-MA-RERUN-3-v11-S132-1-v1`. All three are live work for the first fresh scout.
- **AG-5**: `CARD-ARCHIVE-PUSH-S133-1-v1` (04:06:09Z, sha256 `cc81c9665b4931d07eda777b30cdaa0f3885180920a0cae4c485ead0f82b9f63`) carries a `consumed_at` of 04:06:59Z written by the window that is now dead, and it was **NEVER ACTED** — no report row exists. This is `F-S132-TAKEN-OVER-ADDRESS-INHERITS-DEAD-BACKLOG-1` recurring. `producer.md` retires `consumed_at` as a signal in either direction and orders a DIRECT read by `created_at`, so a fresh AG-5 that follows its boot will still see the card; a fresh AG-5 that keys on `consumed_at` will not. **Named here so the gap is visible before it costs a card.**

## 6 · WHAT IS OWED FROM THE OWNER, and why it cannot be machine work

`OWNER-RULING-S133-COLD-RESTART-1` — the human confirmation the boots require by name, naming the two addresses and the two dead shas. It cannot be the Architect's: the whole point of `F-S117-LIVENESS-IS-POSITIVE-ONLY-1` is that no lens inside this machine can certify a window dead, and the Architect substituting its own judgement there would be the machine certifying the thing it is structurally unable to see. The owner closed the windows with his own hand; his word is the measurement.

Opening the windows is his too, for the ordinary reason that they run on his computer.

TAIL ANCHOR: S133-COLD-RESTART-MEASUREMENT-1 ends here.
