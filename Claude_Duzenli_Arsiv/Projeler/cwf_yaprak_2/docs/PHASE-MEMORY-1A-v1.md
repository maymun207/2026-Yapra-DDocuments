# PHASE MEMORY-1A · v1 — the store, the distiller, forgetting
<!-- PHASE-MEMORY-1A-v1 · 2026-07-30 · S71 · v1-path A4, phase 1 of 3 (R8).
     Binding design: cwf-memory-1-design-v1_1 (project knowledge). Scope = C1
     store + write path + C3 forgetting ONLY. Retrieval/chip/params-UI = 1B;
     promotion/admin tab = 1C. Author lane: AG. Branch: phase/memory-1a off
     master @ the anchor below. Merge --no-ff, message Architect-authored at GO.
     ONE migration (AUTHORED, Operator-pending — ADR-005: Operator applies via
     `supabase db push`, never AG). ZERO gated publishes (freeze safe; the one
     new agent.param self-seeds through the S46 reconciler's existing
     system.agent_param domain — the contextTurns/mcp.healthFreshnessSec
     precedent, zero migration for the param). -->

## §0 · LIVE GROUND (S65-1 — re-verify from your clone, never assume)

- Anchor: `origin/master` = `5b91d117a90c1510d8b030fb45a8aeed2b15c609` · 388
  test files / 4332 tests · **60** migrations · docVersion rev 163 ·
  production `dpl_ALyhU77Jn4ySoorZzPRUrTahdkyD` READY.
- Name collision: `episodes` appears in NO `shared/dbConstants.ts` entry and NO
  migration (Architect grep, empty). Re-verify.
- Flush join point: `api/cwf/chat.ts:336` `Promise.allSettled([...])` — the
  finally-block where the digest write already lives, with its own posture
  comment ("a digest write failure never…"). The distiller joins THIS list.
- `ctx.turnId` = `api/cwf/_lib/turn/types.ts:123` (THE turn id, RULE-28).
- Cron precedent: `vercel.json` daily entries (e.g. turn-trace-digest-cleanup
  `20 4 * * *`) + the backend-health.ts CRON_SECRET dual-auth machine-arm shape.
- Grant palette: `shared/grantPolicy.ts` `WRITE_MODEL.SERVER_ONLY` + all-
  grantees revoke (public, anon AND authenticated — the FIX-2 lesson) + RLS
  on / zero policies. `backend_health` (20260716140000) is the closest shape
  precedent (server-only both directions, machine ledger).

## §1 · PREMISE BLOCK (mandatory — STOP on any red)

**P-A · REACHABILITY.** Before building, verify and report: (1) the
`chat.ts:336` allSettled join exists as described; (2) which distiller inputs
are ACTUALLY on ctx / in scope at that point — turnId, conversation id,
resolved user identity, the frame record, entity-resolution output, the
per-call tool ledger (`recordToolCall` / PersistRawEntry family), grounding
verdict, outcome class. For each design-note field, name its real source or
mark it UNDERIVABLE-THIS-PHASE. An underivable field ships as NULL with a
one-line note in the module header — empty≠zero: "not yet wired" must never
read as "did not happen". Do NOT invent a source.

**P-B · PROVENANCE.** The schema and rulings come from
`cwf-memory-1-design-v1_1.md` §3 C1/C3 — the design note is binding; this
prompt only narrows it to phase 1A. The governed live state this phase touches:
none (no reads of routing/learning state; `learnEnabled=0` is irrelevant here).

**P-C · SATISFIABILITY.** One migration creates one table + its indexes +
grants; nothing else in the DB changes. If ANY existing object named
`episodes` (table/view/function) turns up live or in migrations, STOP and
report. The distiller adds zero LLM calls, zero new reads on the turn's
critical path (it consumes what the turn already computed), and cannot extend
response latency (post-`res` flush block only).

## §2 · BINDING CONSTRAINTS

1. **Schema = design note §3 C1**, verbatim fields (order free):
   `id uuid PK · turn_id text NOT NULL · conversation_id text NOT NULL ·
   user_id uuid NULL REFERENCES auth.users · actor jsonb NOT NULL ·
   asked text NOT NULL · entities jsonb NOT NULL · scope jsonb NULL ·
   tools jsonb NOT NULL · decision jsonb NULL · user_correction jsonb NULL ·
   importance smallint NOT NULL · created_at timestamptz NOT NULL ·
   expires_at timestamptz NOT NULL · last_retrieved_at timestamptz NULL ·
   retrieval_count int NOT NULL DEFAULT 0`.
   Indexes: `(conversation_id, created_at DESC)` — the A23 carrier read shape
   (§4 of the note; this index IS the contract's mechanical half) ·
   `(user_id, created_at DESC)` · `(expires_at)` for the forget sweep.
2. **Grants:** SERVER_ONLY · RLS on, zero policies · revoke ALL from public,
   anon AND authenticated (SELECT included) · `DB_TABLES.EPISODES` const +
   grantPolicy row + provenance comments (STATUS: AUTHORED, Operator-pending) ·
   verifyGrants probe coverage + the CI grant test (standing rule).
3. **Write door (the phase's sharpest ruling):** the distiller writes for
   REAL, identity-resolved user turns ONLY. Synthetic and replay actors write
   NOTHING — episodic memory is user-private (design §3 C1) and a machine
   actor has no user scope to remember into. The exclusion is a named
   constant + a test, and a skipped write logs one line
   (`[MemoryWrite] skipped reason=…`) — never silent. C1-LAW half: a
   replay-path write attempt must be REFUSED at the repository method
   (visible, test-pinned), not merely avoided.
4. **Deterministic distiller, scrubbed:** no LLM anywhere; `asked` is the
   capped+scrubbed query head through the EXISTING redaction boundary (F-obs3 /
   the OBS-LEGIBILITY `query_head` precedent — reuse, never a second scrubber);
   `entities` = canonical ids from the resolver output ([] = real empty);
   `tools` from the per-call ledger ([] = real zero-tool turn); NO raw tool
   payloads, NO secrets, NO prose re-parsing.
5. **Never blocks the answer:** the write is one member of the existing
   allSettled; failure logs `[MemoryWrite] failed …` and the turn is
   unaffected (test: a throwing repository leaves the response path green).
6. **Importance (C3):** deterministic code — base score by outcome class
   (corrected > answered-with-tools > zero-tool), reinforcement/decay fields
   written for 1B to use. Formula constants are code-floor (the resolver's
   DL≤2 precedent: not a tunable until there's a reason).
7. **TTL is governed:** declare `agent.memory.ttlDays` on the EXISTING
   system agent.param lane (ONE-chain/ONE-clamp, sessionTweakable:false, no
   lab tier; floor 90, clamp [7, 365]) — self-seeds via the S46 reconciler;
   `expires_at = created_at + resolved ttlDays`. RULE-1: no hardcoded 90 at
   the write site.
8. **Forget tick:** `api/admin/memory-forget.ts` + one `vercel.json` daily
   cron (pick a minute clear of the 04:20/05:00/06:00 cluster) + CRON_SECRET
   dual-auth (backend-health shape). Hard-DELETE `expires_at < now()`, log
   `[MemoryForget] deleted=N scanned=M` — counts computed from the delete's
   own returning read, never asserted (S65-2).
9. **Repository pattern:** all I/O via a new `EpisodesRepository` through
   `getServiceClient()` — the persistence chokepoint (db-read spans and the
   FENCE-DB-1 ref pin come free). No inline clients.
10. **Secrets:** env names only, never values (ADR-007).
11. **Reseal budgeted:** run `check:doc-drift`; reseal every flagged tab
    (a created persistence/turn file can join the map — the S70 lesson).

## §3 · GATES

**G1 · MIGRATION + SHARED LAYER.** Table/indexes/RLS/revokes migration
(header: purpose, STATUS AUTHORED Operator-pending, the S33-1 note on
`user_id NULL + actor jsonb`); `DB_TABLES` + grantPolicy + EpisodesRepository.
Prove on a disposable `postgres:16` container: apply ×2, run 2 = zero writes,
schema snapshots byte-identical (the A9 double-apply pattern).

**G2 · DISTILLER.** `turn/memoryDistill.ts` (pure derive) + the one
allSettled join line in chat.ts + the write door (constraint 3) +
`[MemoryWrite] user=… tools=N entities=M importance=K` born-loud line. Tests:
real-turn write shape · synthetic/replay refusal (both doors) · throwing-repo
never breaks the turn · scrub assertion (no secret-shaped value reaches any
column — the OBS-TRACE-2 G4 test class).

**G3 · TTL PARAM.** `agent.memory.ttlDays` decl + resolve + the write site
reading the resolved value (`+capped` visibility if the clamp binds — the
THINK-CLAMP precedent). Test: publish-shaped override changes `expires_at`.

**G4 · FORGET TICK.** Endpoint + cron entry + dual-auth + delete sweep +
**positive control** (S66-1): a planted expired row in the test MUST be
deleted and counted; the test first shown RED-capable (control removed →
assertion fails), then green.

**G5 · SEAL.** Suite + typecheck green (report totals vs 388/4332 anchor);
`check:doc-drift` clean post-reseal; `npm run build` green; push branch.
NO merge — GO after the Architect's RULE-25 review.

## §4 · SELF-VERIFY (literal evidence, in this order)

1. HEAD + branch + anchor merge-base.
2. P-A field-source table VERBATIM (design field → real ctx source | NULL +
   reason).
3. G1 double-apply transcript (run-2 zero writes, snapshot diff empty) +
   migration filename.
4. G2 test tail incl. the RED-capable runs (refusal + never-blocks) and one
   composed `[MemoryWrite]` line from the test harness.
5. G3 param decl diff + the resolve chain grep.
6. G4 positive-control RED then GREEN transcript + the cron diff in
   vercel.json.
7. Suite totals + typecheck + doc-drift output + resealed tab list.
8. Explicit: "ONE migration AUTHORED Operator-pending · ZERO publishes ·
   ZERO governed writes by this branch · freeze untouched · zero new LLM
   calls · zero critical-path reads."

## §5 · STOP CONDITIONS

`episodes` name collision (P-C) · a design field with no real source AND no
honest NULL path (P-A) · any need to touch the eval-gate, prompt segments, or
golden surfaces (out of phase, out of freeze) · any write path that would
require a replay/synthetic actor to succeed · migration requiring more than
the one table's objects.

**Post-merge sequence (Architect-owned):** RULE-25 fresh-clone review → GO +
merge message → OPERATOR-APPLY-MEMORY-1A prompt (FENCE-first, G-gates,
`supabase db push`, second-push idempotence probe, verifyGrants, object read)
→ live proof: `[MemoryWrite]` lines on real production turns read from Vercel
by the Architect; first `[MemoryForget]` tick observed. 1B does not open
before those reads land.

<!-- END · PHASE-MEMORY-1A-v1 · 2026-07-30 -->
