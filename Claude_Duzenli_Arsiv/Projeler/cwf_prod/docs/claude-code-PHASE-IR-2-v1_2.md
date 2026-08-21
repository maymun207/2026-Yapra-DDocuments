# PHASE IR-2 — deterministic resolvers: alias kind (K3) · Turkish time parser · clarification contract

<!-- claude-code-PHASE-IR-2-v1_2 · rev 1.2 · 2026-07-20 · Architect: Claude (S54)
     SUPERSEDES v1 (immutable, S37-1): folds the §0 amendment issued after
     S54-POLISH-2 + HOTFIX F145 advanced master and IR-1 entered flight — no
     other section changed. THIS file is the ONE relay payload (S54-3 law).
     Parent: cwf-routing-arch-design-v1 §5 · roadmap IR-2. Runs PARALLEL to
     IR-1 (LANE B). 1 Operator visit rides this phase (alias-kind migration,
     authored here, applied later — FENCE-first). -->

## 0 · PRECONDITION (S47-1, parallel-lane form — AMENDED rev 1.2)

Anchor: branch from **current `origin/master == ee4212ef9f7aafd071c3fd5c1558d134241637f4`**
(Merge HOTFIX F145). The advances since v1's original `4d44c74` anchor —
S54-POLISH-2 (`a6f8393`) and HOTFIX F145 (`ee4212e`) — touch NONE of this
phase's named surfaces (Lane A's own name-only proof covers it). Verify with
`git rev-parse origin/master` and paste.

**Pre-cleared mid-flight advance:** LANE B's IR-1 WILL land on master while you
work and DOES touch `api/cwf/_lib/knowledge/**` — including
`knowledge/reference/agentParams.ts`, which your W2 `time.shiftBoundaries`
param also appends to. This is EXPECTED, not a STOP:
- rebase over it (append-AFTER semantics on `AGENT_PARAM_KEYS` + the params
  array — earlier indexes are load-bearing in tests, never reorder);
- reseal docVersion to the next free rev (**expect 119**, after IR-1's 118),
  final commit, grep-verified script name (S32-1);
- paste a `git range-diff` proof that your rebase changed nothing beyond the
  reseal + mechanical context shifts.
STOP-and-report applies ONLY to a non-trivial conflict or any OTHER advance
touching {the `resolve_time_range` implementation, `api/cwf/_lib/knowledge/**`
beyond IR-1's own files, `supabase/migrations/**`, `shared/dbConstants.ts`}.

**Reseal pre-assignment (unchanged):** later-merger rebases + reseals on the
MERGED tree.

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
(`dün gece` = yesterday 20:00→24:00 unless the taxonomy review says otherwise;
DOCUMENT the chosen semantics in code comment + test names so ratification can
amend it as data).

**W3 · Clarification CONTRACT (compute-only)**: pure
`computeClarification(frame: IrFrame, aliasResult, timeResult)` →
`{ level: 'NONE'|'LOW'|'HIGH', question: {tr,en} | null }` — HIGH iff frame
confidence AMBIGUOUS ∨ required entity unresolved ∨ COMPARE with <2 resolvable
sides. It RETURNS the would-be question; nothing sends it (IR-3). Once IR-1 is
on master (it will be, per §0), import `IrFrame` from
`api/cwf/_lib/routing/irFrame.ts` directly — the v1-era local-type fallback
clause is retired.

## 3 · Gated steps
G0: rev-parse (+§0 advance proof) · S32-1 script greps · paste anchors
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
G5 `.agents` APPEND + reseal per §0 (expect rev 119).

## 4 · Self-verify (paste literal evidence)
1. rev-parse (+§0 advance/range-diff proofs). 2. Head SHA + PR # + **CI GREEN**.
3. diff --stat; exactly ONE new file under `supabase/migrations/` (paste its
FULL text in the report); gateway/evalGate-engine/keyword-layer name-only
untouched proof. 4. Resolver honesty greps: zero fuzzy/nearest-match code
paths; `'unresolved'` literal present. 5. Parser semantics table (expression →
range) pasted from test output. 6. Param floor/clamp/self-seed test output.
7. Targeted vitest tail. 8. PLATINUM (self-seeding floor; zero manual config)
+ freeze/window untouched statements.

## 5 · Report & merge
Push, PR, post §4. **Do NOT merge.** Architect FAST-GATE (migration read in
full — non-negotiable) → GO. Upon GO, `--no-ff` with exactly:

`Merge PHASE IR-2: governed backend-scoped entity-alias kind + Turkish relative-time parser + clarification contract (compute-only)`

Post-merge: delete branch `ir-2`. The alias-kind migration goes to the Operator
in a FENCE-first prompt (Architect authors it at GO; project `fjbrkimwvtpwoxhziidh`
stated explicitly; G-gates + idempotence probe + verifyGrants confirmation).

<!-- END · claude-code-PHASE-IR-2-v1_2 · rev 1.2 · 2026-07-20 · supersedes v1 · amendments mint v1_3 -->
