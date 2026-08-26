# PHASE-FACTORY-BOOT-1 — DESIGN v1
Architect · S116 · born of PLATINUM-BREACH-S116-1 (owner's verbatim mandate: the factory must have a STATE, one-command startup, graceful shutdown; no cards before the factory is verifiably stable). Queue position: FIRST after LAW-BATCH-1 (queue-jumping per the PLATINUM law). Absorbs H10's core (lane_events) and F-S116-INIT-ORDER-1.

## 1 · THE STATE, DB-FIRST (the owner's own words: "kocaman DB var")

One governed table, `public.factory_state`, one migration (Operator, db push, one of the wave's two slots):
- **factory row** (singleton): `mode` ∈ INIT · READY · WORKING · DRAINING · SHUTDOWN, `changed_at`, `changed_by` (lane addr or 'architect'), `note`.
- **lane rows** (one per address incl. operator+scout): `lane_addr` (FK-checked against the same CHECK family as relay_inbox), `state` ∈ BOOTING · CLAIMED · WORKING · PARKED · CLOSED, `nonce_sha`, `heartbeat_at`, `updated_at`.
- Append-only event twin `factory_events` (the H10 seed): every transition INSERTs an event row; the state table is the READ MODEL, events are the audit spine. C1 untouched (zero writes to messages).
- Write path: lanes write THEIR OWN rows only (RLS by… lanes share one DB identity today, so the fence is the guard layer + boot law, named honestly as POLICY not INVARIANT until per-lane identities exist — ADR-012 labeling).

## 2 · STARTUP — one owner act

Owner says "fabrikayı başlat" (or opens N windows; later, headless). Sequence law:
1. FOREMAN first. Boot: claim AG-5 → sweep dead lane refs (close-stamps from §3 make "dead" measurable, replacing the broken liveness lens for the common case) → prune dead worktrees per S98-L1 → write factory mode READY.
2. PRODUCERS after READY: claim first free address (no takeover needed — closed sessions RELEASED their refs per §3), write CLAIMED, read box, write WORKING.
3. ARCHITECT GATE (binding on me): **no card is dispatched until factory mode = READY and the target lane row reads CLAIMED/WORKING with a fresh heartbeat.** Dispatch reads the table, never assumes. `architect:open` gains a `factory` field printing mode + lane rows + heartbeat ages (UNMEASURED with reason when unreachable).

## 3 · SHUTDOWN — graceful, addressed to the Architect

Owner says "fabrikayı kapat" → Architect writes mode DRAINING (+ a broadcast row on the bus). Each lane, on its next tick: finishes the item in hand, pushes/report-syncs, **releases its lane ref (pinned delete)**, writes CLOSED, stops polling. Foreman drains remaining landings, exits last, writes SHUTDOWN. Architect verifies: `ls-remote lane/*` empty + all rows CLOSED, stamps the close. Force-close remains the emergency path only — and §2's sweep makes even that inheritance clean.

## 4 · WHAT DIES WITH THIS PHASE
- NO-ADDRESS-FREE parking at session open (root: refs outliving windows) — S116 measured it three ways.
- Owner window-to-lane choreography and consent-paste relays for stale claims.
- Card-dispatch-before-stable (my own act this session, named in the breach).
- The tick-starvation blind: heartbeats expose a stalled lane to the foreman bell and to `architect:open`.

## 5 · WAVE SHAPE (cards cut on owner GO)
- **FB-OP** (Operator, Gemini + db push, fence fjbrkimwvtpwoxhziidh): the migration (factory_state + factory_events + CHECKs + grants), G-gates, idempotence probe, verifyGrants. One migration slot, pre-assigned timestamp.
- **FB-AG2** (scripts): `factoryState.mjs` lib (read/write/heartbeat, third-value discipline), mail-wait tick integration, `architect:open` factory field, land gate refusal when mode ≠ READY/WORKING.
- **FB-AG1** (boots): startup/shutdown ritual text in all boots; close ritual releases refs; DRAINING obedience; codify §2 order.
- **FB-AG5** (foreman): READY stamping after sweep; bell on heartbeat silence; drain on DRAINING.
Sequencing: FB-OP lands first (schema is the floor), then AG2 ∥ AG1, then AG5 proves the full cycle: one scripted open → READY → one card → one landing → "fabrikayı kapat" → clean wire. That cycle, measured end-to-end, is the phase's birth proof (S93-1) and the ADF exit test's criterion-1/6 evidence.

## 6 · NOT IN SCOPE (named, so nothing silently grows)
Headless window spawning (ADF-HEADLESS-LANE-1 stays deferred) · per-lane DB identities (named as the INVARIANT upgrade path) · dispatch automation beyond the READY gate (H10 full form arrives Kademe 4 on this substrate).

END-OF-DESIGN PHASE-FACTORY-BOOT-1-design-v1
