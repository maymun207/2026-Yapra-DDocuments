# CWF — FLOOR-TENANT-SPLIT · Design Note · v1_1
<!-- cwf-floor-tenant-split-design-v1_1 · 2026-08-02 · S77 · supersedes v1
     (S37-1: presented artifact immutable; scope materially widened by the
     owner's ratification "100% arınmış — Kale ve Kale ile alakalı her şey",
     which CLOSES TENANT-VOCAB-EXTENT-Q as FULL EXTENT). -->

## 0 · What changed vs v1
v1's census was the literal word "kale" (15 files). The owner's full-extent
ruling widens the vocabulary; the widened census (same lens discipline:
fresh full clone @ `39590e97`, all files, `.git` excluded) found:

| Word | Files | Where it lives |
|---|---|---|
| kale (boundary) | 13 real | as v1 (identity/persona/corpus/jobs/docs/seal/migration) |
| kalebodur | 3 | test data + corpus + fixture |
| **kb7** | **111** | corpus/tests/e2e/dev-previews + **~16 runtime modules** + seals + history |
| kb2 / kb3 | 4 / 5 | corpus + fixtures |
| **glazur** | **60** | same shape as kb7 + **entity-resolution core** |
| sicil | 6 | corpus V3 + fixture + comments + history |
| seramik | 13 | identity/persona/glossary/jobs/UI translations + seal + history |
| ardictech | 11 | **VENDOR class — out of scope** (see §4) |

False-positive classes now NAMED in the lens: Turkish mid-word substrings
("ma**kale**de"), binary files (`public/brand/*.jpeg`), lockfile hash
strings (`package-lock.json`). Lens: `grep -rinIP` with letter-boundary
look-behind, binaries skipped, `package-lock.json` excluded.

## 1 · Three-layer classification (spot-read verified, not guessed)
**Layer A — VOICE (v1 scope, unchanged):** promptFloor/identity Kale
identity block · armes personaText · b1_scope job copies · fixtures.
T3 publish-then-neutralize ordering binding (v1 §1 verbatim).

**Layer B — COMMENT/EXAMPLE SWEEP (new):** tenant names in doc-strings and
comments across `evalGate.ts` ("Granit-as-KB7"), `coreSchemas.ts`
("glazur 3" example), `resolveEntityRef.ts`, `stageClarify.ts`,
`groundingCheck.ts` (F158 note), `toolCategories.ts`, `memoryRetrieve.ts`,
superset `gatewayProtocol.ts`, `backendTrust.ts`, chart/render libs, admin
UI, dev previews, e2e specs. Mechanical reword to neutral placeholders
(`FactoryF1`, `LineA`, `ZoneZ1`); zero behavior change; comment-only edits
proven by AST comments-stripped byte-compare (S34-1) where the file's only
hits are comments.

**Layer C — KNOWLEDGE FLOOR (the architectural core, new):**
`armes/zones.ts` carries LIVE tenant topology in code: `FACTORY_ID='KB7'`
+ four zones with capability flags, including the load-bearing blind-spot
`IKINCILUST scrapVisible:false` (empty≠zero's concrete instance). This is
what ADR-009 outlaws as hand-authored — and F183 already built its home
(`entity_registry` factory/line/zone layers). **Hard dependency: F184
comes OFF the shelf** — the behavioral qualifiers (hasBarcode/
scrapVisible) exist ONLY in zones.ts today; retiring the file without a
registry carrier for qualifiers deletes the blind-spot map and breaks
grounding's scope vocabulary + the render layer's honesty. The armes
glossary floor (`glossary.ts`) rides the same split (governed
glossary_term data already exists — OEE v3; the code floor keeps
STRUCTURE, sheds tenant examples).

**Outage-floor consequence (named, owner-visible):** post-split, the code
floor for tenant topology is DISCOVERY itself (seed = discovery run,
reset target = re-discovery, outage posture = attributed absence — "floor
has no tenant data" is an honest empty, never a stamped zero). A
multi-tenant platform's code floor speaking any tenant's topology is the
category error this program removes.

## 2 · Committed structure — TWO phases, sequenced
**PHASE-FLOOR-TENANT-SPLIT-1 (voice + vocabulary):** Layers A+B + corpus
templating + fixtures/e2e/dev neutralization + tree cleanup (consumed
jobs, stale doc v2) + sealed-surface reword/reseal + `check:tenant-zero`
CI gate covering {kale, kalebodur, sicil, seramik, kb2, kb3}. kb7/glazur
NOT yet gated (Layer C still legitimately carries them) — the gap is
NAMED, not silent. Zero migrations. Behavior change = none, except the
T3-ordered identity publish (owner consent line).

**PHASE-FLOOR-TENANT-SPLIT-2 (knowledge floor):** zones/glossary floor →
entity_registry + governed data; **absorbs F184** (qualifier carrier —
likely the deferred `static_args`/qualifier jsonb on the registry, DESIGNED
in this phase, decided on its own evidence); grounding scope-vocabulary +
clarify + alias resolution re-pointed at the registry (B5 floor-swap
precedent: four-way empty≠zero proven branch-for-branch); Operator
migration expected; `check:tenant-zero` widens to kb7/glazur/full-extent
→ 100% reached. S63-1 proof read: live turn resolves a zone-scoped
question with registry-sourced vocabulary; outage floor test proves
attributed absence.

Why two: a mechanical sweep and a floor-architecture change carry
different risk classes, different proof reads, and different rollback
shapes; coupling them makes the sweep hostage to the floor design.

## 3 · Rulings carried from v1 (unchanged)
T1 lens (letter-boundary + `-I` + lockfile exclusion) · T2 history split
(applied migrations + append-only `.agents/CHANGELOG.md` are CLASSIFIED
HISTORY, exempt from the zero-gate scope, each excluded hit pinned by
count in the phase report) · T3 publish-then-neutralize ordering ·
`check:tenant-zero` with S66-1 positive control.

## 4 · Named out-of-scope items
- **WHITE-LABEL-Q (parked):** `ardictech` (11 files: login/shell branding,
  ksadmin seam actor, backend contact fields) is VENDOR identity, not
  tenant. Whether the platform also white-labels the vendor is a separate
  product decision — parked by name, not smuggled into this program.
- **DEFAULT_BACKEND_ID='armes':** vendor product name, backend KEY (data
  row identity) — stays.
- Live DB content ("Kale Seramik" in `backends.display_name`, b1_scope v4
  segment text, entity names in entity_registry): CORRECT as
  deployment-time tenant data — the entire point of the split.

<!-- END · cwf-floor-tenant-split-design-v1_1 -->
