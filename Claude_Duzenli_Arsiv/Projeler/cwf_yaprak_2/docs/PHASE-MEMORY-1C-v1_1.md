# PHASE MEMORY-1C · v1_1 — promotion + the admin memory surface
<!-- Architect-authored · 2026-07-31 · SUPERSEDES v1 (S37-1: amend = new
     version). v1 → v1_1 delta, owned plainly: v1's constraint 1 (zero
     migrations) was an Architect premise error — the AG hand-back proved
     every existing audit carrier closed (action CHECKs; founding-law-sealed
     tables; a tick that persists nothing). Resolution = the 1A pattern:
     ONE append-only migration, Operator at the door. Also corrected: the
     promotion target KIND naming (domain_rules is the TABLE, not a kind).
     Everything else stands as v1. Binding design: cwf-memory-1-design-v1_1
     §3-C4/C5 + §6.3. Riders: CHART-SERIES-DIALECT-1 · stage-14 flip. -->

## §0 · HARD PRE-FLIGHT (live ground)

Anchor: `origin/master` = `40896d3c273a69694603201d22b0d9b6528b8548` · suite
**398/4413** · docVersion **rev 165** · production
`dpl_432EjSFiBuaCKPDq3twt28XL1rb5` READY · `episodes` = 4 rows (newest
07:57Z today, entity-carrying) · 0 expiring in 7d. Today's witnesses:

    [Memory] offered=3 conv=0 user=3 topK=3 ms=132
    [Gate] action=publish kind=agent.param key=agent.memory.retrievalTopK verdict=published
    [MemoryWrite] user=f4805bd1-… tools=3 entities=1 importance=2

Your v1 pre-flight (fresh clone, 398/4413 byte-match, live reads) carries —
re-verify only the anchor is unmoved. Branch `phase/memory-1c` (exists, zero
commits — correct starting state).

## §1 · BINDING CONSTRAINTS

1. **EXACTLY ONE migration: `memory_audit`** — append-only, structure-only,
   no PII, no raw content. Shape (binding):

       memory_audit (
         id uuid PK DEFAULT gen_random_uuid(),
         action text NOT NULL CHECK (action IN ('episode_delete','forget_tick')),
         actor_user_id uuid NULL,          -- S33-1: NULL for the machine actor
         actor jsonb NOT NULL,             -- attribution (owner | cron), always
         reason text NULL,                 -- episode_delete only
         episode_turn_id text NULL,        -- episode_delete only (RULE-28 id)
         deleted_count int NULL,           -- forget_tick only
         scanned_count int NULL,           -- forget_tick only
         created_at timestamptz NOT NULL DEFAULT now()
       )

   Grants: SERVER_ONLY · RLS on, zero policies · all-grantees revoke (public,
   anon AND authenticated — FIX-2 pattern from the family's LATEST fix
   migration) · `verifyGrants` probe row + CI coverage test in the same phase
   (standing security rule). **The Operator enters ONCE, at the door
   post-merge**, via `supabase db push` only (ADR-005); the Architect authors
   OPERATOR-APPLY-MEMORY-1C-v1 at GO time. No second migration for any
   reason — a need for one is a new premise error: STOP and hand back.
2. **The forget tick gains a ledger row:** after its deletes, the tick
   INSERTs its `forget_tick` audit row (`deleted_count`, `scanned_count`,
   machine actor per S33-1). Order is law: delete first, then append; an
   append failure logs loud and drops — audit-down ≠ forget-down ≠ chat-down.
   Pre-apply window: the INSERT failing on 42P01 degrades silently-logged,
   identical to the 1A pattern.
3. **Eval-gate untouched** — additive dispatch only; promotion rides the
   EXISTING draft → gate → publish rail.
4. **Freeze law:** the proof promotion targets the existing SOFT semantic
   lane — **kind `armes.glossary_term`** (per today's mapping; `domain_rules`
   is the destination TABLE, not a kind). prompt-segment / routing promotion
   drafts may be AUTHORED, never published, until A5.
5. **Brake law:** the agent never auto-promotes; the propose affordance is
   authoring-only while `learnEnabled=0`, visibly labeled (braked-Curate
   posture). The ONE end-to-end publish in §3 is the owner's super-admin hand
   and is immediately rolled back (rollback = new draft re-passing the gate);
   governed state ends where it began.
6. **C1:** zero writes to `messages`. Delete touches `episodes` + one
   `memory_audit` row, nothing else. Draft provenance (source `turn_id`s)
   rides `createDraft`'s existing `rule_audit` detail jsonb + the draft
   payload — no new gate surface.
7. **LLM:** zero on runtime paths; draft-time assist only (Sentezle
   precedent).
8. **S69-3 at birth** — one resolved binding per row control; structural grep
   in self-verify.
9. **F221:** corpus-health header computed from real reads — total episodes ·
   expiring-in-7d · **last forget-tick time + deleted count read from
   `memory_audit`** (its honest pre-first-tick state is "no tick recorded
   yet" — never a fabricated zero; empty≠zero at this surface too).
10. **Bounded reads:** browser pages to exhaustion or caps WITH a disclosed
    truncation marker (PostgREST silent-1000 trap).
11. **Render laws:** RULE-26 @1280 AND @1024, numeric scrollWidth asserts ·
    S64-1 density. ADR-012 not citable (not in repo).
12. **Isolation unchanged:** M-MEM2=0 construction guarantee (zero memory
    imports in `grounding/`) survives byte-for-byte; re-grep in self-verify.

## §2 · GATED SUB-PHASES

**G0 · The migration** (constraint 1, with its probe + CI test; idempotent
per migration-house-style).

**G1 · Gated admin data endpoints.** List (filters: user · date range ·
outcome class · has-correction; constraint-10 pagination) · detail ·
corpus-health (constraint 9) · audited DELETE writing the `episode_delete`
row. Tests: authz-deny · audit-shape for BOTH action variants (incl. S33-1
machine form) · delete-then-audit ordering.

**G2 · U-2 admin Memory tab.** Health header · browser (date · user ·
asked-digest · entities · tools · importance · expires_at) · detail drawer
(full record + turn id) · delete behind ConfirmDialog writing a reason ·
"Terfi önerisi" affordance with braked labeling. Rendered evidence per
constraint 11.

**G3 · Promotion path.** Episode detail → propose → draft authored on the
EXISTING drafts surface (kind `armes.glossary_term`), provenance-carrying ·
additive gate dispatch · rollback exercised in test.

**G4 · CHART-SERIES-DIALECT-1 rider.** `chatParser` accepts `series` items
as `string` OR `{field, header}`; header → legend label in
`MessageChartContent`. Fixture = today's REAL 07:57Z production block (six
`{field: "<zoneUuid>.oee", header: …}` objects) — red on the old parser
(chatParser.ts:167-190 filters non-strings to zero series), green on the
new; legacy string-dialect fixture stays green.

**G5 · DOC-FLIP.** Stage-14 card: flip ONLY the button sentence (the audited
delete now exists); "Bellek bulur, öğretmez" and the mapping-only learning
law stay intact. New migration noted in the card's sources (`memory_audit
✍️` on stage 14). Reseal drifted tabs · docVersion **165 → 166** ·
CHANGELOG + KB.

**G6 · SELF-VERIFY** (literal, in order): suite counts vs anchor · migration
count 61 → **62** · S69-3 grep · constraint-12 grep · authz-deny +
audit-shape + ordering test output · rollback evidence · G4 red→green both
dialects · rendered screenshots with numeric asserts · card diff ·
`verifyGrants` probe output.

## §3 · POST-MERGE SEQUENCE + PROOF READS (S63-1, lanes named)

1. GO → merge `--no-ff` → **Operator applies** (Architect-authored
   OPERATOR-APPLY-MEMORY-1C-v1; FENCE-first, G-gates, idempotence probe,
   verifyGrants) → production READY.
2. **Owner's hand:** ONE end-to-end promotion (`[Gate] … verdict=published`,
   kind `armes.glossary_term`) then rollback — Architect reads both lines.
3. **Owner deletes one expendable episode** via the tab — Architect reads
   the `episode_delete` audit row's log echo; store count decrements
   honestly.
4. **Next 03:40Z tick:** its FIRST `forget_tick` ledger row exists and
   matches the `[MemoryForget]` log line; `scanned` consistent with the
   store (4 + today's writes − deletions).
5. **Tab rendered against live data,** owner verifying in production
   (UI-CURATE-1 pattern). **F48 → CLOSED@evidence** when 2–5 land.

## §4 · MERGE RITUAL

Self-verify → hand back → Architect RULE-25 → GO + verbatim merge message →
`--no-ff` → §3. Nothing merges before GO; the Operator never precedes the
merge.

<!-- END · PHASE-MEMORY-1C-v1_1 · 2026-07-31 -->
