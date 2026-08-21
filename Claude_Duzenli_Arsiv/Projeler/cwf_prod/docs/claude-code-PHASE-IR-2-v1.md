# PHASE IR-2 — deterministic resolvers: alias kind (K3) · Turkish time parser · clarification contract

<!-- claude-code-PHASE-IR-2-v1 · rev 1 · 2026-07-20 · Architect: Claude (S54)
     Parent: cwf-routing-arch-design-v1 §5 · roadmap IR-2. Runs PARALLEL to IR-1
     (S47-1 preconditions + §0 reseal pre-assignment). 1 Operator visit rides this
     phase (alias-kind migration, authored here, applied later — FENCE-first). -->

## 0 · PRECONDITION (S47-1, parallel-lane form)
Anchor at authoring: `origin/master == 4d44c740682d40f501f5b170a7e0a2dcaeda4c3f`.
If master advanced: `git diff --name-only 4d44c74..origin/master` must touch
NONE of {`api/cwf/_lib/timeTools.ts` (locate real path by content — the
`resolve_time_range` implementation), `api/cwf/_lib/knowledge/**`,
`supabase/migrations/**`, `shared/dbConstants.ts`} → rebase + paste proof +
proceed; else STOP. **Reseal pre-assignment:** later-merger rebases + reseals to
the next docVersion rev on the MERGED tree.

## 1 · Scope
Pure deterministic resolvers + one governed data kind. NOTHING here asks the
user anything (asking = IR-3's flip), touches routing/tool-offer paths, the
keyword layer, gateway.ts, or the eval-gate ENGINE (a new kind is a ROW +
additive per-kind checks per the established eval-gate scoping law). Zero
golden-gate contact. FULL profile (api + migration authored); **unsharded CI =
sole arbiter.**

## 2 · Work items

**W1 · Alias kind (K3: backend-scoped)** — `armes.entity_alias`, DB-first /
code-floor (the locked SSOT model):
- Kind shape (SOFT-class): `{ alias: string (stored normalized: lowercase,
  punctuation-stripped via the exported extractKeywords normalizer — ONE
  normalization SSOT, the LEARN-NORM-1 law), canonicalType: 'factory'|'line'|'zone'|'equipment',
  canonicalId: string, backendId: string }`.
- Code floor: seeded from the existing `armes/zones.ts` data (locate by
  content; factory/line/zone names + ids) — the floor serves on DB-empty/outage
  exactly like every other kind (empty≠zero survives Supabase down).
- Resolver `resolveEntityAlias(refs: string[], backendId): Map<ref, {canonicalType, canonicalId} | 'unresolved'>`
  — reads the kind via the SAME knowledge path `resolveToolCategories` uses
  (warm→read, db>floor). **Unresolvable ⇒ `'unresolved'`, NEVER a guess, never
  fuzzy-nearest** (that would be a governed row changing what an alias MEANS —
  polarity law).
- **Migration (AUTHORED, Operator-PENDING, applied post-merge in a FENCE-first
  Operator visit)**: seed the kind row + CORE/SOFT registration exactly the way
  the latest kind-adding migration in the repo does it (S30-1: cite the LATEST
  fix-pattern migration for grants/idempotence, never the original; idempotent
  re-run safe; STATUS comment header pattern). No new table expected — the kind
  lives in the existing rule_kinds/domain_rules structures; if you find a new
  table IS required, STOP and report before authoring it.

**W2 · Turkish relative-time parser** (extend the `resolve_time_range`
implementation): deterministic ranges for at minimum: `dün`, `dün gece`,
`bugün`, `bu hafta`, `geçen hafta`, `bu ay`, `geçen ay`, `bu vardiya`,
`önceki vardiya`, `son N saat/gün`. Europe/Istanbul tz via the EXISTING
mechanism (it already handles `last_7_days` correctly — reuse, don't fork).
Shifts: new self-seeding governed param `time.shiftBoundaries` (floor
`[0,8,16]` — three 8h shifts; db-overridable; the mcp.healthFreshnessSec
pattern). Parser is a PURE function over (expression, now, boundaries) —
exhaustively unit-tested including shift-boundary and midnight-crossing edges
(`dün gece` = yesterday 22:00→today 06:00? NO — define honestly: yesterday's
date 20:00→24:00 unless the taxonomy review says otherwise; DOCUMENT the chosen
semantics in code comment + test names so ratification can amend it as data).

**W3 · Clarification CONTRACT (compute-only)**: pure
`computeClarification(frame: IrFrame, aliasResult, timeResult)` →
`{ level: 'NONE'|'LOW'|'HIGH', question: {tr,en} | null }` — HIGH iff frame
confidence AMBIGUOUS ∨ required entity unresolved ∨ COMPARE with <2 resolvable
sides. It RETURNS the would-be question; nothing sends it (IR-3). If IR-1's
branch isn't merged yet, define the minimal `IrFrame` input type locally in a
way that IR-1's module supersedes cleanly (import-from-one-place TODO tagged
`IR-3`), and say so in the report.

## 3 · Gated steps
G0: rev-parse (+advance proof) · S32-1 script greps · paste anchors
(resolve_time_range impl, zones.ts data shape, latest kind-adding migration
filename you will mirror, resolveToolCategories knowledge-read path) ·
naming-collision grep `entity_alias|resolveEntityAlias|shiftBoundaries|computeClarification`
· branch `ir-2`.
G1 W1 kind + floor + resolver (+tests: db-row precedence over floor; outage
floor serve; normalized-alias lookup; `'unresolved'` honesty; backend scoping —
same alias, two backendIds, distinct rows).
G2 W1 migration authored (full read in report; idempotence + grants per the
mirrored latest pattern; verifyGrants probe row + CI coverage per standing
security rule).
G3 W2 parser + param (+the exhaustive pure tests; DST boundary test).
G4 W3 contract (+unit tests per level).
G5 `.agents` APPEND + conditional reseal per §0.

## 4 · Self-verify (literal evidence)
1. rev-parse (+advance proof). 2. Head SHA + PR # + **CI GREEN**. 3. diff --stat;
exactly ONE new file under `supabase/migrations/` (paste its FULL text in the
report); gateway/evalGate-engine/keyword-layer name-only untouched proof.
4. Resolver honesty greps: zero fuzzy/nearest-match code paths; `'unresolved'`
literal present. 5. Parser semantics table (expression → range) pasted from
test output. 6. Param floor/clamp/self-seed test output. 7. Targeted vitest
tail. 8. PLATINUM (self-seeding floor; zero manual config) + freeze/window
untouched statements.

## 5 · Report & merge
Push, PR, post §4. **Do NOT merge.** Architect FAST-GATE (migration read in
full — non-negotiable) → GO. Upon GO, `--no-ff` with exactly:

`Merge PHASE IR-2: governed backend-scoped entity-alias kind + Turkish relative-time parser + clarification contract (compute-only)`

Post-merge: delete branch `ir-2`. The alias-kind migration goes to the Operator
in a FENCE-first prompt (Architect authors it at GO; project `fjbrkimwvtpwoxhziidh`
stated explicitly; G-gates + idempotence probe + verifyGrants confirmation).

<!-- END · claude-code-PHASE-IR-2-v1 · rev 1 · 2026-07-20 -->
