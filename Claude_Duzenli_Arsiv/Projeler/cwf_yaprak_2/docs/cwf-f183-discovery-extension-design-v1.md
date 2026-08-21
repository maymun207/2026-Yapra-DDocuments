# CWF — F183 Design Note: discovery extension to lines / zones / equipment · v1
<!-- cwf-f183-discovery-extension-design-v1 · 2026-07-26 · S66 · Architect: Claude
     Binding on this design: ADR-009 v1_1 (inventory is discovered, never authored)
     · ADR-010 (a declaration is a claim) · ADR-001 (mirror = observation, never
     governed authority) · ADR-005 (migrations by Operator via db push).
     Evidence base: OPERATOR-READ-F183-DISCOVERY-SURFACE-v1 (2026-07-26 03:32Z) +
     fresh-clone read of master 1ec1858d (rev 146). Every live value below is
     quoted from one of those two reads; nothing here is recalled from a summary
     (S65-1). Proof-of-done contract: §7. -->

## §0 · What this note is
The design for the highest-leverage item S65's measurement produced: **the
clarification gate blocks ~85% of frames, 98.9% of those on `entity-unresolved`,
because everything below the factory layer is either hand-seeded or absent.**
This note specifies how discovery extends down. It authorizes no code; the AG
phase prompt is written from it.

## §1 · The live read (dated evidence, not recall)

| Fact | Value | Source |
|---|---|---|
| `backends` descriptor columns | `entity_list_tool`, `factory_param_name`, `scope_identity` (jsonb) | Operator Q1 |
| `backend_tools` stores declared schemas | **`input_schema jsonb`** column exists and is populated | Operator Q2 |
| armes tools | 145 (141 active / 4 missing) | Operator Q2 |
| `getFactoryLines` required params | **`"required": []`** — `factoryId` OPTIONAL | Operator Q3 |
| `getEntities` required params | `factoryId` **required**, `showAll` required | Operator Q3 |
| Hand-authored zone rows | **4** published `armes.zone`, all `line:'KB7'` | Operator Q4 |
| Hand-authored aliases | **5** `armes.entity_alias` (4 zones + `kb7`) | Operator Q4 |
| Factory mirror | **17** active rows | Operator Q5 |
| Topology-shaped table | **none** — 43 tables, only `factory_registry` | Operator Q6 |
| `getFactoryLines` real payload | `[{factoryId:'KB7', lines:[{zoneId, name, description, process}, …]}]`, 7 records for KB7 | recorded traffic, trace `2032bf00`, pinned VERBATIM in `turnLabelMapRealPayload.test.ts` |
| The FACTORY-only guard | `stageClarify.ts:98` — `if (frame.object !== 'FACTORY' …) return;` | fresh clone |
| Sync call site | `catalogSync.ts:82`, one site, on-connect + Sync + health tick | fresh clone |

**Coverage today, computed:** 4 hand-authored zone rows against a 17-factory
mirror, of which KB7 alone is observed to have 7 lines. The hand-authored
catalog is not merely small — it is **wrong at the one layer it covers**
(Glazur1, Glazur2 and FIRINUST exist in the backend and have neither a zone row
nor an alias). Estimated whole-plant coverage is low single digits; the exact
denominator is unknown until L1 discovery runs, and is deliberately **not
estimated further** here.

**Premise corrected in-session:** the Architect's opening read premised that any
layer below factories needs a per-parent fan-out. The declaration refutes that
for the layer that matters most (`getFactoryLines` is callable with no argument).
Recorded as S66 premise error #1, caught by the Operator read.

## §2 · What ARMES actually declares — the layer map

| Layer | Tool | Parent arg | Call shape | Parent edge |
|---|---|---|---|---|
| L0 factory | `getFactoryList` | — (`{}`) | 1 call | root |
| **L1 line/zone** | `getFactoryLines` | `factoryId` **optional** | **1 call, whole plant** | `factoryId` in the payload wrapper |
| L2 equipment | `getEntities` | `factoryId` **required** | fan-out = active L0 rows (17 today) | `factoryId`; a zone edge is **UNKNOWN and must be probed** |

Two vocabulary facts this design must respect rather than resolve by hand:
1. **ARMES calls it "lines" and keys it `zoneId`.** Its line layer and its zone
   layer are the same object in this payload. CWF's frame taxonomy distinguishes
   LINE and ZONE. The mapping is therefore **DATA** (§3 D1), never a code branch.
2. **A second, wider zone source exists** — `getEntityZones` ("all zones for a
   factory without type filtering", `factoryId` required), which plausibly
   includes silo/storage zones that are not production lines. Whether it is a
   distinct population is **not asserted**. Under this design adding it later is
   **one descriptor row and zero code**, which is the entire point.

## §3 · Design decisions (committed)

### D1 · The layer descriptor is DATA, in one table
New table `backend_entity_layers` — one row per (backend, layer). Columns:
`backend_id` · `layer_key` (the backend's own layer name) · `frame_object`
(nullable; the CWF closed-enum object this layer answers for — FACTORY / LINE /
ZONE / EQUIPMENT) · `discovery_tool` · `parent_layer_key` (nullable) ·
`parent_param_name` (nullable) · `cadence_class` · `enabled`.

- Not new columns on `backends`: layers are a set, not a fixed trio, and a
  columnar encoding would force a migration per layer.
- **Degree test (ADR-009 v1_1):** rows scale with *integration* (one per
  connected backend-layer, authored once at connection time), never with the
  world. ACCEPTED.
- Posture identical to `factory_registry`: RLS on, zero client policies, REVOKE
  on the full grantee set (public, anon, authenticated — FIX-2). Service-role
  only. Gated admin-UI affordance owed (governed DATA operation), authored in
  this phase or named as an in-phase deferral — never a manual SQL step.
- `backends.entity_list_tool` becomes the **L0 row's** `discovery_tool`. The
  column stays for one release as the compatibility read, retired at B5.

### D2 · The call shape is DISCOVERED, not authored
The sync reads the tool's own `input_schema` from `backend_tools` and decides:
- parent param **absent from `required`** ⇒ **one zero-argument call** for the
  whole layer;
- parent param **required** ⇒ fan-out over the parent layer's `active` mirror
  rows.

This keeps ADR-009 honest at the mechanism level: even *how* to call is read from
the backend's declaration. Per **ADR-010**, that declaration is a **claim** — so
the outcome is checked: a zero-arg call that errors, returns an unusable shape,
or times out **falls back to fan-out on the same tick** and logs the mismatch.
Declaration-first, outcome-verified. No per-backend literal in either path.

### D3 · One mirror with parent edges
New table `entity_registry`: `backend_id` · `layer_key` · `entity_id` ·
`display_name` · `parent_layer_key` · `parent_entity_id` · `attrs jsonb`
(observed extra fields, verbatim — e.g. `description`, `process`) ·
`first_seen_at` · `last_seen_at` · `status` ∈ {active, missing} ·
`unique (backend_id, layer_key, entity_id)`.

- `factory_registry`'s 17 rows are **backfilled** into it as `layer_key='factory'`
  in the same migration; the old table stays read-only-unused for one release and
  is dropped at B5 (**named deferral**, not silence). Q6 proved there is no
  second home today; this design does not create one.
- Discipline inherited verbatim: **missing ≠ deleted**, an empty-but-successful
  call **skips** the write, a failure **never** empties the mirror, the module
  **never throws**.
- The topology graph is now derived: `parent_entity_id` chains produce
  factory→line→equipment without anyone drawing it (ADR-009 "the graph falls out
  for free").

### D4 · Parsing: one generic level of descent, zero literals
The recorded payload nests the records one level down (`lines[]` inside a factory
wrapper). Today's `findRecordArray` would return the outer array and mint a
single row keyed by `factoryId` — silently wrong. The rule, stated generically:
*if a record's own id-like field is present **and** it carries an array property
whose elements themselves have id-like fields, descend one level and set the
outer id as `parent_entity_id`.* No `'lines'` literal, no backend name. Extend
the existing tolerant key-candidate lists (`FACTORY_ID_KEYS` etc.) with
`zoneId`/`entityId`-class keys — those are shape, which ADR-009 leaves in code.

### D5 · Lift the FACTORY-only guard, and widen the match targets
- `mergeFactoryRegistryResolution` → generalized to resolve against the registry
  rows whose `frame_object` matches the frame's object; when the frame's object
  is absent or unknown, match across layers and report the layer with the hit.
  **This is the change that moves the 85%.**
- **Match targets gain the observed `description`.** Evidence: the F175 dead turn
  carried `entity_ref = ["Ganit fabrikası", "sırlama 3-4-5", "4-12 vardiyası"]`
  and resolved nothing; the backend's own record for Glazur3 says
  `description: "Sırlama 3 ( Alt Kat )"`. The user's word is already inside the
  backend's declaration. Normalization must strip parentheticals before matching.
  **This is discovery doing the work an alias row would otherwise be written for**
  — the ADR-009-compliant answer to the vocabulary problem for this backend.
- Tier order (exact → prefix → fuzzy DL≤2), the one-candidate-wins rule and the
  **ambiguous-is-reported-never-guessed** contract are preserved byte-for-byte.
  Widening the target set raises ambiguity (Sırlama 2 vs 3); reporting it is
  correct behavior, not a regression.
- The governed `armes.entity_alias` polarity law is untouched: a governed alias
  hit still wins and is never overridden by the mirror.

## §4 · The residue — the one place the owner's ruling is needed
The 4 `armes.zone` rows carry **two different kinds of content**:

| Content | Example | Verdict |
|---|---|---|
| Inventory | `name: 'IKINCILUST'`, `line: 'KB7'` | grows with the WORLD → **retire, discovery replaces it** |
| Observed behavioral qualifier | `hasBarcode: false`, `scrapVisible: false`, "Fire/scrap ARMES'te görünmez; fire kırılımı yapısal olarak yoktur" | **not discoverable from any list call** |

Deleting the second class along with the first would silently destroy an
**empty≠zero guard**: `scrapVisible:false` is what stops IKINCILUST's absent
scrap data from being reported as a real zero. ADR-009 forbids hand-authored
*inventory*; this is not inventory, it is knowledge about the backend's
behavior — and its natural home under ADR-010 is machine-proposed +
human-ratified, not hand-authored-forever.

**Committed recommendation:** F183 replaces the inventory half only. The
qualifier half is **carried, not deleted**, and re-homed as its own item
(proposed **F184 — behavioral qualifiers are observed, not authored**) in the
ADR-010 earned-trust lane. Retiring `armes.zone` wholesale is explicitly out of
scope for this phase. Owner ruling requested on that split before the AG phase
prompt is written.

## §5 · Cadence and budget
- **L1 = one call per sync tick.** Cheap in count, potentially large in payload
  (the tool's own description warns the unfiltered response is "very large").
  The existing 20s per-call ceiling stays; a size guard and the D2 fan-out
  fallback cover the failure.
- **L2 = 17 calls per tick** at today's factory count — too expensive for the
  */30 health tick. Hence `cadence_class` on the descriptor: L0/L1 ride the
  existing catalog-sync cadence; **L2 defaults to a slower class** and the phase
  must state which. Equipment questions are not what the 85% is made of.
- Nothing in this design adds a manual step. If any step turns out to require
  one, that is a PLATINUM breach and the design is wrong.

## §6 · ADR-009 enforcement self-check
1. **Genericity** — zero per-backend literals in the sync, parser or resolver.
   Red-team test extended: a seeded fake backend with two descriptor rows syncs a
   two-level topology identically to armes, with no `'armes'` reference anywhere
   in the modules.
2. **Descriptor-as-data** — which tool discovers which layer, and how the parent
   id is passed, are rows; adding `getEntityZones` later is a row, not a diff.
3. **Absence honesty** — a backend with no descriptor row for a layer gets an
   **empty catalog** and the gate **ASKS**. `superset` and `system` have
   `entity_list_tool = NULL` today and stay empty by design. No layer is ever
   patched with hand-written rows to quiet the gate.

## §7 · Proof of done (S63-1 — the merge is not the proof)
1. **Live sync evidence:** post-deploy `[EntityRegistry]` lines showing per-layer
   `total/active/missing`, and an `entity_registry` count by layer read by the
   Operator. Computed, never asserted (S65-2).
2. **The number falls:** re-run the M-A clarification lens against a **recorded
   registry snapshot** (design v2 §3/§4) and report the new block rate beside the
   baseline's 84.6% per-frame / 83.3% per-utterance / 35.0% organic, with the
   `entity-unresolved` share.
3. **The guardian holds:** E2 — unresolvable probes still block **100%**. A block
   rate that falls while E2 falls is a regression, not a win.
4. **The specific turn:** the F175 evidence turn's `"sırlama 3-4-5"` resolves, or
   reports ambiguity honestly — never a silent guess.
5. **S65-3 applies to this phase's own tooling:** assume the re-measurement has a
   silent, flattering defect until it is cross-checked against a second read.

## §8 · Named deferrals (recorded, not silent)
- `factory_registry` drop → B5.
- `backends.entity_list_tool` retirement → B5 (compatibility read until then).
- `getEntityZones` as a second zone layer → after its payload is compared; a DATA
  change when it lands.
- The L2 zone edge → probed and recorded verbatim in this phase, **not assumed**.
- Behavioral qualifiers → proposed F184 (§4).
- Turkish generic-suffix stripping currently knows factory words only
  (`fabrikası`, `işletmesi`); line/zone words (`hattı`, `bölgesi`) must be added —
  language, not inventory, so code is the correct home.

## §9 · What the AG phase prompt must additionally establish
These are **unknowns, and the phase must record them from real calls rather than
design around them** (TOTAL-45):
1. The verbatim `getEntities` payload shape, and whether an entity record carries
   a zone edge at all.
2. Whether a no-argument `getFactoryLines` call actually succeeds in production
   and its response size — the declaration is a claim (ADR-010).
3. The observed L1 population across all 17 factories, which sets the real
   denominator §1 declines to estimate.

<!-- END · cwf-f183-discovery-extension-design-v1 · 2026-07-26 · S66 -->
