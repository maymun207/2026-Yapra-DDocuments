# PHASE DISCOVERY-EXTEND-1 · v1
<!-- PHASE-DISCOVERY-EXTEND-1-v1 · 2026-07-26 · S66 · Architect: Claude · Author lane: AG
     Implements: cwf-f183-discovery-extension-design-v1 (READ IT FIRST — this
     prompt is the executable half, that note is the reasoning half).
     Binding law: ADR-009 v1_1 · ADR-010 · ADR-001 · ADR-005 · ADR-007.
     Closes: F183 (code half; the done-proof is a post-apply live re-measurement).
     Every command below was grep-verified against package.json at the anchor
     commit (S32-1) — none is guessed. -->

## STATE PRECONDITION (S47-1 — verify before you touch anything)
- `origin/master` = **`1ec1858dc8be4185e44500e0ec08133fcef7a57a`**
- docVersion **rev 146** · **355 test files** · **57 migrations** · drift `[OK]`
- Zero pending migrations. Zero open PRs. No phase in flight.

If any of these disagrees, **STOP and report** — do not adapt around it.

## HARD PRE-FLIGHT (run in order, paste the literal output of each)
```
git clone <repo> && cd cwf_yaprak     # FRESH CLONE. `git stash` is NOT a clean checkout (S61-1)
git rev-parse origin/master           # must print 1ec1858dc8be4185e44500e0ec08133fcef7a57a
npm ci
npm test                              # baseline. Record the exact file/test counts.
npm run build                         # includes typecheck:api + gen:arch-facts + check:doc-drift
npm run lint
```
`npm run build` runs `check:doc-drift` — it must be `[OK]` BEFORE you start, so any
drift at the end is yours.

---

## BINDING CONSTRAINTS (violating any one of these fails the phase)

1. **TWO-DOOR RULE (ADR-005).** You AUTHOR the migration file; you **NEVER** apply
   it. No `supabase db push`, no `apply_migration`, no direct DDL. The Operator
   applies it through the Supabase door. Write the file so it is idempotent and
   safe to apply exactly once.
2. **ADR-009 v1_1 — inventory is DISCOVERED, never authored.** This phase writes
   **zero** entity rows by hand. It may seed **descriptor** rows (one per
   backend-layer — those scale with the integration, not the world). If you find
   yourself typing a factory, line, zone or equipment NAME into code or into a
   migration's data section, stop: that is the defect this phase exists to remove.
3. **ADR-010 — a declaration is a claim.** The backend's declared input schema
   decides the call shape, but a failed outcome overrides the declaration at
   runtime (§G3). Log the mismatch; never silently trust or silently give up.
4. **NEVER THROWS.** The discovery path inherits `entityRegistrySync.ts`'s posture
   verbatim: every failure swallowed + logged, an empty-but-successful result
   **skips** the write, a failure **never** empties the mirror
   (`missing != deleted`, "outage only disables").
5. **ZERO per-backend literals** in the sync, parser, repository or resolver. No
   `'armes'`, no `'getFactoryLines'`, no `'lines'`, no factory name — anywhere
   except the migration's descriptor seed and test fixtures.
6. **Secrets (ADR-007).** Nothing new is read from env; never echo a key, header
   or connection string in a log line or in your report.
7. **RULE-24.** Every file you write is text — no NUL bytes. Verify before you
   report (S65-3: a NUL byte made a whole grep-based self-check silently return
   nothing last session).
8. **S65-2 — evidence is COMPUTED, never asserted.** Every number in your report
   must be pasted command output. If a grep returns 1 and you expected 0, report
   the 1 and explain it; do not type the expected number.
9. **GOLDEN FREEZE is engaged.** No golden runs, no `prompt.segment` publishes.
10. **Eval-gate untouched.** Engine, stage order and interpreter stay
    byte-identical.

---

## G0 · The migration (authored, NOT applied)

File: `supabase/migrations/20260726120000_entity_registry_layers.sql`

**Table 1 — `public.backend_entity_layers`** (the descriptor; DATA, not code):

| column | type | notes |
|---|---|---|
| `id` | uuid pk default gen_random_uuid() | |
| `backend_id` | text not null → `backends(id)` on update cascade on delete restrict | |
| `layer_key` | text not null | the backend's own layer name, e.g. `factory`, `line`, `equipment` |
| `frame_object` | text null | the CWF frame object this layer answers for (FACTORY / LINE / ZONE / EQUIPMENT). NULL = discovered but not routable yet |
| `discovery_tool` | text not null | the MCP tool that lists this layer |
| `parent_layer_key` | text null | self-referencing by key; NULL = root layer |
| `parent_param_name` | text null | the argument carrying the parent id, e.g. `factoryId` |
| `cadence_class` | text not null default `'sync'` | check in (`'sync'`, `'slow'`, `'manual'`) |
| `enabled` | boolean not null default true | |
| `created_at` / `updated_at` | timestamptz not null default now() | |
| unique | `(backend_id, layer_key)` | |

**Table 2 — `public.entity_registry`** (the generalized mirror):

| column | type | notes |
|---|---|---|
| `id` | uuid pk default gen_random_uuid() | |
| `backend_id` | text not null → `backends(id)` | |
| `layer_key` | text not null | |
| `entity_id` | text not null | the backend's own identifier, verbatim |
| `display_name` | text not null | |
| `parent_layer_key` | text null | |
| `parent_entity_id` | text null | the derived topology edge |
| `attrs` | jsonb not null default `'{}'::jsonb` | observed extra fields, verbatim (e.g. `description`, `process`) — an OBSERVATION, never governed authority (ADR-001) |
| `first_seen_at` / `last_seen_at` | timestamptz not null default now() | |
| `status` | text not null default `'active'` | check in (`'active'`, `'missing'`) |
| unique | `(backend_id, layer_key, entity_id)` | |
| index | `(backend_id, layer_key, status)` and `(backend_id, parent_entity_id)` | |

**Backfill:** copy every `factory_registry` row into `entity_registry` as
`layer_key='factory'`, preserving `first_seen_at` / `last_seen_at` / `status`.
`factory_registry` is **left in place and untouched** — its drop is a NAMED
deferral to B5, not this phase's business.

**Descriptor seed (the ONLY data this migration writes — three rows, all armes):**
| layer_key | frame_object | discovery_tool | parent_layer_key | parent_param_name | cadence_class |
|---|---|---|---|---|---|
| `factory` | `FACTORY` | `getFactoryList` | NULL | NULL | `sync` |
| `line` | `LINE` | `getFactoryLines` | `factory` | `factoryId` | `sync` |
| `equipment` | `EQUIPMENT` | `getEntities` | `factory` | `factoryId` | `slow` |

Seed them idempotently (`on conflict (backend_id, layer_key) do nothing`).
`superset` and `system` get **no rows** — their catalogs stay honestly empty and
the gate correctly ASKS (ADR-009 enforcement #3).

**Security, both tables:** RLS enabled, **zero client policies**, and
`revoke select, insert, update, delete, truncate ... from public, anon,
authenticated` — the full grantee set, never PUBLIC alone (FIX-2 lesson). Same
posture as `factory_registry`; copy it rather than inventing one. Add the S30-1
note: this migration creates no SQL functions and nothing SECURITY DEFINER.
Comment every table and every non-obvious column, in the house style.

## G1 · Constants + repositories
- `shared/dbConstants.ts`: add `ENTITY_REGISTRY: 'entity_registry'` and
  `BACKEND_ENTITY_LAYERS: 'backend_entity_layers'`. `FACTORY_REGISTRY` stays.
- `EntityRegistryRepository` — `listByBackendLayer(backendId, layerKey)`,
  `listByBackend(backendId)`, `upsertLayer(backendId, layerKey, rows)` returning
  `{total, active, missing}`. Mirror `FactoryRegistryRepository`'s upsert
  semantics exactly, including the missing-flip.
- `BackendEntityLayersRepository` — `listEnabled(backendId)`, ordered so parents
  precede children (root first, then by `parent_layer_key` depth).
- Add the `backend_tools` read this phase needs: fetch one tool's stored
  `input_schema` by `(backend_id, tool_name)`.

## G2 · The parser — one generic level of descent
Today's `findRecordArray` + `firstStringField` would take the recorded
`getFactoryLines` payload and mint **one wrong row** keyed by the outer
`factoryId`. The fix, stated with zero literals:

> If a record carries an id-like field **and** owns an array property whose
> elements themselves carry id-like fields, **descend one level**: each inner
> element becomes an entity row and the outer record's id becomes its
> `parent_entity_id`. Otherwise the record itself is the entity row.

- Extend the tolerant key-candidate lists with `zoneId`, `entityId`, `lineId`,
  `equipmentId` and their snake_case forms — these are SHAPE, which ADR-009
  leaves in code.
- Every non-id field on the entity record is carried verbatim into `attrs`.
- Unit-test it against the **VERBATIM recorded production payload** already
  pinned in the repo (`GET_FACTORY_LINES_RAW`, trace `2032bf00`, 2026-07-17):
  `[{factoryId:'KB7', lines:[{zoneId, name, description, process}, …]}]` — 7
  records, each with `parent_entity_id === 'KB7'`. Re-embed it verbatim in an
  `api/**/__tests__/` file with the same trace citation (vitest's include covers
  `api/**/__tests__/**/*.test.ts`; it does NOT cover `scripts/**`). Do not
  normalize, reorder or re-indent recorded traffic.

## G3 · The discovery sync — call shape is DISCOVERED
Generalize `entityRegistrySync.ts` (rename to `entityDiscoverySync.ts` if you
prefer; keep one call site in `catalogSync.ts:82`).

For each enabled descriptor row, parents before children:
1. Read the tool's stored `input_schema`.
2. `parent_param_name` **absent from the schema's `required` array** ⇒ **ONE
   zero-argument call** for the whole layer.
3. `parent_param_name` **required** ⇒ fan-out over the parent layer's `active`
   mirror rows.
4. **ADR-010 fallback:** if the zero-argument call errors, times out, or returns
   an unparseable/empty shape while the parent layer is non-empty, fall back to
   fan-out **on the same tick** and log
   `declared=optional observed=failed action=fanout`.
5. `cadence_class='slow'` layers run on a bounded schedule, not on every
   health tick — state in your report exactly what you implemented and why it
   cannot stall a Sync click.
6. One log line per layer:
   `[EntityDiscovery] backend=<id> layer=<key> tool=<name> shape=<zeroarg|fanout>
   calls=<n> total=<n> active=<n> missing=<n>`

`getFactoryLines`'s own description warns that the unfiltered response is very
large. Keep the existing 20s per-call ceiling and add a size/record guard that
REPORTS truncation rather than silently dropping records (S65-3: the last
measurement tool lost 59% of its population to a silent cap).

## G4 · The resolver and the gate — where the 85% actually moves
- Generalize `resolveEntityRef` from factory-only candidates to
  `{entityId, displayName, aliases[]}`, where `aliases` carries observed
  `attrs.description`-class strings. **Preserve byte-for-byte:** the tier order
  (exact → prefix → fuzzy DL≤2), the one-candidate-wins rule, and
  *ambiguous is reported, never guessed among*.
- Normalization gains parenthetical stripping. Evidence for why this matters:
  the F175 dead turn carried `entity_ref = ["Ganit fabrikası", "sırlama 3-4-5",
  "4-12 vardiyası"]` and resolved nothing, while the backend's own record for
  Glazur3 reads `description: "Sırlama 3 ( Alt Kat )"`. **The user's word is
  already inside the backend's declaration** — this is discovery doing the work
  an alias row would otherwise be hand-written for.
- Extend the generic Turkish suffix-word list with line/zone forms (`hattı`,
  `hattının`, `bölgesi`, `bölgesinin`). Language, not inventory — code is correct.
- **`stageClarify.ts:98` — lift the FACTORY-only guard.** Resolve against the
  registry rows whose descriptor `frame_object` matches `frame.object`; when the
  frame's object is absent or unrecognized, match across enabled layers and
  report which layer produced the hit. **This is the change that moves the
  number.**
- The governed `armes.entity_alias` polarity law is untouched: a governed alias
  hit still wins and is never overridden by the mirror.

## G5 · Tests
- **Genericity red-team** (ADR-009 enforcement #1), extending the existing
  template at `entityRegistrySync.test.ts:111`: a seeded FAKE backend with two
  descriptor rows syncs a two-level topology identically to the real one, and a
  grep proves zero occurrences of any real backend id in the changed modules.
- Parser: the verbatim payload (G2), a flat payload, a malformed record, an
  empty array, and a record whose inner array elements have no id field.
- Sync: zero-arg path, fan-out path, the ADR-010 fallback path, empty-result skip,
  failure-leaves-mirror-intact, never-throws.
- Resolver: description-hit, ambiguity between `Sırlama 2` and `Sırlama 3`
  reported as ambiguous, governed-alias precedence, unresolvable stays
  unresolved.
- **Must-block guardian:** a probe that cannot be resolved at any layer still
  produces a HIGH clarification. A block rate that falls while this test falls is
  a regression, not a win.

## G6 · The measurement lens must keep up (S65-3)
`api/cwf/_lib/replay/clarificationLens.ts` replays the production seam
`computeTurnClarification(ctx)` — **do not reimplement gate logic; a copy
measures a copy.** Two changes only:
- its registry snapshot must now also record `entity_registry` counts **per
  layer** (today it records `entity_alias` size and `factory_registry` counts),
  so the re-measurement is reproducible against a known catalog state;
- a regression test pinning that the snapshot reports a layer that exists but has
  zero rows **as zero, not as absent** (empty≠zero — the exact defect that made
  `perSet` swallow a real set last session).

## G7 · Reseal + docVersion
The changed paths map to **Architecture Map** (`api/cwf/_lib/**`, `shared/**`),
**Runtime Topology** (`backends/**`, `persistence/**`, `turn/**`), **Request
Lifecycle** (`backends/**`, `turn/**`) and **Agent Control Plane** (`turn/**`,
`replay/**`). The reseal is therefore **mandatory and broad — it is not scope
creep** (S65 premise-error #3 was exactly this).
- `npm run reseal`, then bump `docVersion` to **rev 147** by hand.
- Append a manifest `reviewNote` entry for this phase. **Do NOT anchor it to an
  entry I name** — the Architect invented a non-existent anchor twice last
  session. Read the existing top-level ledger, append after the genuinely LAST
  entry, and quote that entry's verbatim title in your report.
- Mixed code+doc goes as the two-commit pattern; the reseal lands in the same
  commit as the doc bump.

---

## WHAT THIS PHASE MUST NOT DO
- **No `armes.entity_alias` rows. No `armes.zone` rows. No deletions of either.**
  The 4 zone rows carry behavioral qualifiers (`hasBarcode`, `scrapVisible`, the
  IKINCILUST scrap note) that discovery does NOT replace and whose removal would
  destroy an empty≠zero guard. Owner-ratified split: that half is **F184**, a
  separate item. Touching it here fails the phase.
- No Superset descriptor rows. Its topology channel (ClickHouse `machine_data`
  columns `factoryid` / `lineid` / `machineid`, reachable only through
  `execute_sql`) is real and recorded, and is a later DATA addition — not code.
- No admin-panel work: adding a layer is not required by anyone today because G0
  seeds what armes needs. The gated admin affordance is **DISCOVERY-EXTEND-2**,
  named and sequenced, and it becomes mandatory the moment a fourth layer or a
  third backend is wanted (PLATINUM: it must never be a manual SQL step).
- No dropping `factory_registry`, no retiring `backends.entity_list_tool` — both
  are B5.
- No prompt changes, no golden runs, no eval-gate changes.

---

## SELF-VERIFY (paste literal, captured output for every line)
1. `git rev-parse origin/master` at start = `1ec1858d…`; your branch's head at end.
2. `npm test` — file/test counts before and after, and the delta explained.
3. `npm run build` — `[OK]` from `check:doc-drift`, pasted.
4. `npm run lint` — clean.
5. `grep -rc $'\0'` (or equivalent) over every file you created ⇒ **0** (RULE-24).
6. Genericity grep: zero real-backend-id occurrences in the changed sync/parser/
   repository/resolver modules — paste the command AND its output, including the
   case where the count is non-zero and you explain it (S65-2).
7. The parser test against the verbatim `2032bf00` payload: 7 rows, every
   `parent_entity_id === 'KB7'` — paste the assertion output.
8. The must-block guardian test passing.
9. The migration file: confirm it is **not applied**, and paste its
   `revoke ... from public, anon, authenticated` line.
10. `docVersion` = rev 147, and the **verbatim title** of the existing reviewNote
    entry you appended after.
11. CI on the PR head: green, unsharded (S37-2 — sharded ≠ CI, and
    `in_progress`/`null` is NOT a pass).

## DONE IS NOT DONE AT MERGE (S63-1)
This phase's proof arrives AFTER the Operator applies the migration and the next
sync tick runs. Your report ends by naming, not producing, that evidence:
`[EntityDiscovery]` lines per layer, the per-layer `entity_registry` counts, the
re-run clarification lens beside the baseline (per-frame **84.6%**, per-utterance
**83.3%**, organic **35.0%**, `entity-unresolved` share **98.9%**), and the
must-block guardian still at **100%**. Assume your own measurement has a silent,
flattering defect until it is cross-checked (S65-3).

<!-- TAIL ANCHOR — if you cannot see this line the relay arrived truncated;
     request a resend before starting (S61-3).
     END · PHASE-DISCOVERY-EXTEND-1-v1 · 2026-07-26 · S66 -->
