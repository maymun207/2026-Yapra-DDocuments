# PHASE IR-2 — deterministic resolvers: alias kind (K3) · Turkish time parser · clarification contract

<!-- claude-code-PHASE-IR-2-v1_3 · rev 1.3 · 2026-07-20 · Architect: Claude (S54)
     SUPERSEDES v1_2 (immutable, S37-1). Folds the ALIAS-KIND SEEDING RULING:
     AG-A's tree finding is CORRECT and Architect-verified (KIND_REGISTRY code
     registration + REFERENCE_INSTANCES floor + selfSeedReconciler warm
     provisioning incl. missing rule_kinds rows per the F128 fix; ZERO
     migrations in repo history ever INSERT rule_kinds/domain_rules). v1_2's
     migration clause is RETRACTED as an Architect premise error (S54-1 #4 —
     authored from the roadmap's "1 Operator visit" line without tree-verifying
     the seeding architecture). A raw-SQL rule seed would bypass the eval-gated
     provisioning path — constitutionally wrong, not merely redundant.
     THIS file is the ONE relay payload (S54-3). -->

## 0 · PRECONDITION (S47-1, parallel-lane form — unchanged from v1_2)

Anchor: branch from **current `origin/master`** (at ruling time
`0c0db5cc3e10477ff0b8d9863a01619e9e01a372`, Merge PHASE IR-1 — both prior
advances pre-cleared). Verify with `git rev-parse origin/master` and paste.
IR-1 is now ON master, so: import `IrFrame` from
`api/cwf/_lib/routing/irFrame.ts` directly (W3), and your W2 param appends
AFTER IR-1's two entries in `knowledge/reference/agentParams.ts` (earlier
indexes load-bearing — never reorder). Reseal to the next free docVersion rev
(**expect 119**), final commit, grep-verified script name. STOP-and-report only
on a non-trivial conflict or an advance touching {the `resolve_time_range`
implementation, `api/cwf/_lib/knowledge/**` beyond IR-1's files,
`supabase/migrations/**`, `shared/dbConstants.ts`}.

## 1 · Scope
Pure deterministic resolvers + one governed data kind. NOTHING here asks the
user anything (asking = IR-3's flip), touches routing/tool-offer paths, the
keyword layer, gateway.ts, or the eval-gate ENGINE (a new kind is a REGISTRY
row + additive per-kind checks per the established eval-gate scoping law).
Zero golden-gate contact. **ZERO migrations, ZERO Operator visits** (the
self-seed reconciler provisions through the governed path). FULL profile (api);
**unsharded CI = sole arbiter.**

## 2 · Work items

**W1 · Alias kind (K3: backend-scoped)** — `armes.entity_alias`, DB-first /
code-floor (the locked SSOT model), **seeded the way this codebase actually
seeds kinds**:
- Register `KIND_IDS.ENTITY_ALIAS = 'armes.entity_alias'` + its `KindDef` in
  `api/cwf/_lib/knowledge/reference/kinds.ts` `KIND_REGISTRY`, mirroring the
  closest governed-DATA-kind precedent (G0 pastes `armes.tool_category`'s
  KindDef and mirrors its class/surface/lock posture — do NOT copy
  `armes.zone`'s CORE/isLocked posture unless the precedent says so).
- Floor seed instances in `REFERENCE_INSTANCES`
  (`reference/referenceData.ts`), derived from the existing `armes/zones.ts`
  data (factory/line/zone names + ids) — the floor serves on DB-empty/outage
  exactly like every other kind (empty≠zero survives Supabase down).
- Alias storage normalization: lowercase, punctuation-stripped via the
  exported extractKeywords normalizer — ONE normalization SSOT (LEARN-NORM-1
  law). Row shape: `{ alias, canonicalType: 'factory'|'line'|'zone'|'equipment',
  canonicalId, backendId }`.
- **Provisioning = the self-seed reconciler** (`selfSeedReconciler.ts`,
  S46-SELF-SEED-1): on next warm it provisions the missing `rule_kinds` row +
  seed instances through the governed path (the F128 fix — G0 pastes that
  provisioning code path as proof). If G0 finds the reconciler does NOT cover
  some part of a new kind's provisioning, STOP and report — do not improvise a
  second seeding mechanism.
- Resolver `resolveEntityAlias(refs: string[], backendId): Map<ref, {canonicalType, canonicalId} | 'unresolved'>`
  — reads the kind via the SAME knowledge path `resolveToolCategories` uses
  (warm→read, db>floor). **Unresolvable ⇒ `'unresolved'`, NEVER a guess, never
  fuzzy-nearest** (a governed row must never change what an alias MEANS —
  polarity law).

**W2 · Turkish relative-time parser** (extend the `resolve_time_range`
implementation): deterministic ranges for at minimum: `dün`, `dün gece`,
`bugün`, `bu hafta`, `geçen hafta`, `bu ay`, `geçen ay`, `bu vardiya`,
`önceki vardiya`, `son N saat/gün`. Europe/Istanbul tz via the EXISTING
mechanism (reuse, don't fork). Shifts: new self-seeding governed param
`time.shiftBoundaries` (floor `[0,8,16]`; db-overridable; append AFTER IR-1's
param entries). Parser is a PURE function over (expression, now, boundaries) —
exhaustively unit-tested incl. shift-boundary and midnight-crossing edges
(`dün gece` = yesterday 20:00→24:00 unless the taxonomy review says otherwise;
DOCUMENT the chosen semantics in code comment + test names).

**W3 · Clarification CONTRACT (compute-only)**: pure
`computeClarification(frame: IrFrame, aliasResult, timeResult)` →
`{ level: 'NONE'|'LOW'|'HIGH', question: {tr,en} | null }` — HIGH iff frame
confidence AMBIGUOUS ∨ required entity unresolved ∨ COMPARE with <2 resolvable
sides. It RETURNS the would-be question; nothing sends it (IR-3). Import
`IrFrame` from `routing/irFrame.ts`.

## 3 · Gated steps
G0: rev-parse (+§0 proofs) · S32-1 script greps · paste anchors
(resolve_time_range impl, zones.ts data shape, `armes.tool_category` KindDef,
the selfSeedReconciler missing-kind provisioning path, resolveToolCategories
knowledge-read path) · naming-collision grep
`ENTITY_ALIAS|entity_alias|resolveEntityAlias|shiftBoundaries|computeClarification`
· branch `ir-2`.
G1 W1 registry + floor + resolver (+tests: db-row precedence over floor;
outage floor serve; normalized-alias lookup; `'unresolved'` honesty; backend
scoping — same alias, two backendIds, distinct rows).
G2 W1 self-seed verification (+tests: kind provisions on warm exactly once;
second warm idempotent — zero duplicates; seed-actor-latent path stays honest
and non-fatal).
G3 W2 parser + param (+exhaustive pure tests; DST boundary test).
G4 W3 contract (+unit tests per level).
G5 `.agents` APPEND + reseal per §0 (expect rev 119).

## 4 · Self-verify (paste literal evidence)
1. rev-parse (+§0 proofs). 2. Head SHA + PR # + **CI GREEN**.
3. `git diff --name-only <anchor>..HEAD -- supabase/` **EMPTY** (paste);
gateway/evalGate-engine/keyword-layer name-only untouched proof. 4. Resolver
honesty greps: zero fuzzy/nearest-match paths; `'unresolved'` literal present.
5. Parser semantics table (expression → range) from test output. 6. Param
floor/clamp/self-seed test output. 7. Self-seed once/idempotent test output.
8. Targeted vitest tail. 9. PLATINUM (registry+floor+reconciler = zero manual
steps, zero Operator action) + freeze/window untouched statements.

## 5 · Report & merge
Push, PR, post §4. **Do NOT merge.** Architect FAST-GATE → GO. Upon GO,
`--no-ff` with exactly:

`Merge PHASE IR-2: governed backend-scoped entity-alias kind + Turkish relative-time parser + clarification contract (compute-only)`

Post-merge: delete branch `ir-2`. Architect-side verification: prod warm log's
`[Seed]` provisioning line for `armes.entity_alias` + resolver serving —
**no Operator visit** (an optional later Operator READ may confirm the rows).

<!-- END · claude-code-PHASE-IR-2-v1_3 · rev 1.3 · 2026-07-20 · supersedes v1_2 · amendments mint v1_4 -->
