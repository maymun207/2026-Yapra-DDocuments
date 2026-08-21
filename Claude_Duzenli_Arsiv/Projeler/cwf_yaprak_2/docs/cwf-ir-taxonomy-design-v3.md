cwf-ir-taxonomy-design-v3.md


# CWF — IR Taxonomy & Frame Contract · v3 (RATIFIED + IR-4 Path B contract)
 
<!-- cwf-ir-taxonomy-design-v3 · rev 3 · 2026-07-22 · supersedes v2 (RATIFIED).
     AMENDMENT vs v2 (IR-4 fold; v2 remains immutable per S37-1): adds §9, the
     one-page Path B integration contract, folded into the IR-0 design doc per
     roadmap cwf-ir-architecture-roadmap-v1_2 §2 IR-4. Zero build. §1–8 are
     byte-identical to v2. This close of IR-4 completes BLOCK 1's BUILD; the only
     remaining BLOCK-1 item is the owner-consented go-live (dark→live flip +
     shadow compare), a decision, not a build.
     Status: RATIFIED — K1 gate PASSED at S57; owner ratified Decision A
     (QUERY_TOPOLOGY → QUERY_MASTER, 6 actions). Grounded @bad00f4; the code
     matrix in api/cwf/_lib/routing/deriveCategories.ts (IR-3, merged 866924c)
     and §4 here are byte-siblings. Path B reference: cwf-ir-pathb-hybrid-logic-v1_3.html. -->
 
**PLATINUM compliance:** design-only; the artifacts it defines (taxonomy rows,
derivation table, aliases, Path B ingestion) all land as governed DB data /
self-configuring pipelines with code floors, self-seeded via the existing
selfSeedReconciler / ROUTE-GOV-1 mirror path. Zero manual configuration is ever
required to function.
 
## 0 · What changed v1 → v2 → v3 (the ledger)
- **v2 (K1 ratification delta):** K1 §8 (the traffic-window ratification gate)
  ANSWERED. Shadow-frame read: enum-drop **3.45%** (< 5% target → PASS), frame
  confidence **93% HIGH**, **COMMAND** live-proven **100%**. Owner ratified
  **Decision A**: `QUERY_TOPOLOGY` merges into `QUERY_MASTER` → action enum
  **7 → 6**; the traffic evidence forced a *reduction*, not the growth to an 8th
  action §8 item 1 guarded against. No object change; `SYSTEM` row **retained**.
  Derivation matrix (§4) has exactly ONE changed cell.
- **v3 (IR-4 fold):** adds §9, the one-page Path B integration contract. Zero
  code, zero taxonomy change — it freezes the invariants a future federated
  backend must honor so Path A never reshapes.
**Session decisions carried (S52, unchanged):**
- **K2** — no SR1-primary intermediate flip; the one flip ceremony is IR-3
  (frame primary), SR1 becomes ladder rung 2, keyword stays the floor.
- **K3** — the IR-2 alias kind is **backend-scoped** (`<backend>.entity_alias`
  on the existing `domain_rules.backend_id` axis; code floor = armes zone data).
  No tenant model is invented; future EAIP tenancy composes ABOVE backends.
---
 
## 1 · The frame (contract shape)
 
```
IrFrame {
  action:     ActionId                 // closed enum, §2 (6 values)
  object:     ObjectId                 // closed enum, §3 (13 values)
  entity_ref: string[]                 // raw surface mentions; resolution is IR-2's job
  metrics:    MetricId[]               // closed to shared/metricVocab METRIC_IDS
  time:       { surface: string } | null   // raw temporal expression; parsing is IR-2's job
  confidence: 'HIGH' | 'AMBIGUOUS'
}
```
 
Armor (IR-1) drops-and-counts any `action`/`object`/`metrics` value outside the
ratified enums — the exact out-of-catalog discipline `semanticRouter.ts` already
applies to category names. `entity_ref` and `time.surface` are free-text BY
DESIGN: they are surface captures, and everything that interprets them is
deterministic code downstream (polarity law — a governed row must never change
what a date or an alias MEANS; the alias *table* is governed data, the
*resolver* is code).
 
## 2 · ACTION enum — 6 values (RATIFIED)
 
Design rule: actions are GENERIC verbs; domain lives in objects. This is the
orthogonality choice that lets SAP/IoT-Ignite extend the OBJECT axis without
ever forcing a new action (§6).
 
| ActionId | Turkish surface (examples) | Essence |
|---|---|---|
| `QUERY_STATUS` | "şu an durum ne", "canlı", "hat çalışıyor mu" | instantaneous state |
| `QUERY_METRIC` | "OEE kaç", "fire oranı", "debi", "K4 sayacı" | measured quantity over a window |
| `QUERY_EVENTS` | "duruşlar", "dün geceki transferler", "bildirimler" | event records over a window |
| `QUERY_MASTER` | "reçete listesi", "malzeme tanımı", "sicil", "araç havuzu", **"hangi hatlar var", "KB7 zonları", "tesis listesi"** | definitional/reference records **+ structural inventory** |
| `COMPARE` | "A hattı ile B hattını kıyasla", "geçen haftayla" | multi-entity / multi-window contrast |
| `COMMAND` | "hattı durdur", "duruşu sınıflandır", "not ekle" | state-changing act |
 
**Decision A (K1):** the former `QUERY_TOPOLOGY` ("hangi hatlar var", "KB7
zonları", "tesis listesi") is folded into `QUERY_MASTER`. Rationale: the router
could not reliably separate "list the recipes" (master) from "list the zones"
(topology) at the action level — both are "give me a list of definitional/
structural things" — and the derivation gives both the same `factory` category,
which is ALWAYS_INCLUDE floor on every path anyway. The merge loses zero
coverage. Historical `synthetic_runs` frames stamped `QUERY_TOPOLOGY` stay as
recorded observe-only data (not re-classified).
 
Notes:
- `COMMAND` aligns 1:1 with the `armes.tool_annotation` write-exposure lane
  (F80): a COMMAND frame may only ever derive to categories whose write tools
  carry `allowWrite:true` — the taxonomy and the exposure governance meet here
  by construction, not by convention.
- `COMPARE` derives to the UNION of the underlying `QUERY_METRIC`/`QUERY_EVENTS`
  derivations for its object, and flags multi-target for the clarification
  contract (an under-specified COMPARE is the canonical AMBIGUOUS case).
- Deliberately absent: `ANNOTATE` (a COMMAND), `EXPLAIN`/`HELP` (not routing —
  no tool set changes; the prompt core owns it), `QUERY_TOPOLOGY` (merged, above).
## 3 · OBJECT enum — 13 values (RATIFIED, unchanged from v1)
 
| ObjectId | Turkish surface | Primary category anchor |
|---|---|---|
| `LINE` | hat, üretim hattı | production/andon/metrics |
| `ZONE` | zon, bölge (KB7 zonları) | factory(topology)/metrics |
| `FACTORY` | fabrika, tesis | factory |
| `EQUIPMENT` | makine, ekipman, sensör, fırın, pres | machine |
| `ORDER` | sipariş, iş emri, plan | production |
| `RECIPE` | reçete | production |
| `MATERIAL` | malzeme, hammadde, stok, lot, nem/yoğunluk | material |
| `TRANSFER` | sevkiyat, taşıma, yükleme/boşaltma, iade | transfer |
| `VEHICLE` | araç, taşıt, pool | logistics |
| `EMPLOYEE` | personel, çalışan, vardiya, sicil | employee |
| `QUALITY` | fire/ıskarta olayı, barkod, kamera kontrol | quality |
| `DOWNTIME` | duruş, arıza, breakdown | linestop |
| `SYSTEM` | token, dashboard, superset, yetki | admin (thin, flagged) |
 
`SYSTEM` is admitted but flagged thin — 3 tools today. K1 did not force it to a
capability check; it stays a row for v2. Re-evaluate only if a future traffic
window shows it consistently empty.
 
## 4 · Derivation table `(action × object) → category` (RATIFIED)
 
Legend: cell = category set derived; `·` = invalid pair by design (derives to
∅, `unmapped:true`, frame still recorded — observe-only never breaks); every
derived set is implicitly ∪ ALWAYS_INCLUDE (`getFactoryList`,`getFactoryLines` —
the floor stays sacred on every path).
 
| ↓action \ object→ | LINE | ZONE | FACTORY | EQUIPMENT | ORDER | RECIPE | MATERIAL | TRANSFER | VEHICLE | EMPLOYEE | QUALITY | DOWNTIME | SYSTEM |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| QUERY_STATUS | andon,machine | andon | factory | machine | production | · | material | transfer | logistics | employee | quality | linestop | admin |
| QUERY_METRIC | metrics(+quality*) | metrics(+quality*) | metrics | machine | production | · | material | · | · | · | quality | linestop | · |
| QUERY_EVENTS | linestop,andon | linestop | · | machine | production | · | material | transfer | logistics | employee | quality | linestop | · |
| QUERY_MASTER | production,factory | factory | factory | machine | production | production | material | transfer | logistics | employee | · | · | admin |
| COMPARE | =Q_METRIC∪Q_EVENTS(object) | ← | ← | ← | ← | · | ← | ← | · | · | ← | ← | · |
| COMMAND | production | · | · | machine | production | · | material | transfer | · | employee | · | linestop | admin |
 
\* `+quality` iff `metrics` includes `FIRE` — the metricVocab `METRIC_ALIASES` /
`FIRE_ROUTING_SYNONYMS` mapping (fire/scrap/ıskarta) is the discriminator; this
reproduces today's FIRE_ROUTING behavior deterministically instead of by keyword
luck.
 
**The ONE cell changed by Decision A:** `QUERY_MASTER × LINE` went from
`production` (v1) to `production,factory` — the union of the old MASTER cell with
the folded TOPOLOGY cell (`factory`). Since `factory` topology tools are
ALWAYS_INCLUDE on every path, this is a no-op against the floor; it is recorded
explicitly so the derivation is self-documenting. All other MASTER cells were
already ⊇ their TOPOLOGY counterpart or the TOPOLOGY cell was `·`, so they are
unchanged.
 
**COMPARE is computed, not a lookup:** for an object, COMPARE = `QUERY_METRIC`
derivation ∪ `QUERY_EVENTS` derivation for that object. The `←` cells mean "apply
that rule"; the `·` cells (RECIPE, VEHICLE, EMPLOYEE, SYSTEM) are invalid for
COMPARE (both underlying rows ∅, or a single resolvable target only).
 
**Coverage (measured deliverable):** the 6×13 = 78 static pairs are enumerated
by IR-3's `deriveCategories` unit test — **58 derivable / 20 unmapped**
(CI-confirmed on PR #98, byte-verified against this table at review). Every
derivable pair lands in an EXISTING category (IR-1 observe-only with ZERO
behavior change); every `·` pair returns `unmapped` honestly. v1's "56/35" prose
is retired — a strict cell count does not reproduce it. The flip-era metric to
watch (IR-3 go-live): rate of frames landing on `·` or dropped by armor — the
ladder fall-through rate, a stamped span attribute from IR-1 day one.
 
## 5 · Slots, confidence, clarification
 
- `entity_ref` — captured verbatim (["sırlama hattı", "fırın 3", "KB7"]).
  IR-2 resolves via the K3 backend-scoped alias kind; `unresolved` is an honest
  terminal state, never a guess (VIZ-BIND-1 polarity applied to routing).
- `metrics` — closed to `METRIC_IDS` (OEE/FIRE/THROUGHPUT today). Extending it
  is a CODE change (polarity law) — the taxonomy never gets to invent a metric.
- `time.surface` — captured verbatim ("dün gece", "bu vardiya", "geçen hafta").
  IR-2 extends the EXISTING `timeTools.resolveTimeRange`
  (FACTORY_TIMEZONE-aware) with the Turkish relative grammar; code-only.
- `confidence: AMBIGUOUS` triggers: (a) two objects with no linking action
  pattern, (b) COMMAND without a resolvable entity_ref, (c) COMPARE with <2
  resolvable targets, (d) empty action+object after drops. **IR-3 flipped these
  from report-only to ACTIVE** (merged 866924c, dark) — an AMBIGUOUS frame now
  asks the clarifying question (`computeClarification`) instead of guessing,
  gated by `router.frameRouting`.
## 6 · Forward-vocabulary fit (the one-page Path B check)
 
| Future need | Fits as | Enum change? |
|---|---|---|
| SAP QUERY_MASTER_DATA | QUERY_MASTER × (MATERIAL/ORDER/…) | none |
| SAP CREATE_ORDER / POST_CONFIRMATION | COMMAND × ORDER | none |
| IoT-Ignite QUERY_DEVICE_CAPABILITY | QUERY_MASTER × EQUIPMENT(DEVICE) | object axis |
| IoT-Ignite live telemetry | QUERY_STATUS/QUERY_METRIC × EQUIPMENT | object axis |
| Superset "grafik/chart" intents | QUERY_METRIC/QUERY_EVENTS (+viz directive, out of scope) | none |
| structural inventory ("hangi hatlar/zonlar") | QUERY_MASTER × (LINE/ZONE/FACTORY) | none (Decision A absorbed it) |
 
Ratified claim: **the ACTION enum closes at 6 and holds; OBJECT is the extension
axis.** Object additions arrive as governed taxonomy versions through the eval
gate (backend-scoped rows self-place, the WAVE2-IA-2 `surface` precedent) — never
as code enum edits after ratification. Decision A demonstrated the enum can also
*contract* on evidence, which strengthens the "actions close early" thesis.
 
## 7 · Non-goals (byte-level)
 
No tool-argument forcing (gateway.ts untouched, IR-3's own exclusion) · keyword
floor `routeKeywordLayer` untouched forever · detector vocabularies
(metricVocab) untouched · no golden-run dependency anywhere (GOLDEN FREEZE) ·
no new turn-pipeline stage (frame rides stage 07's existing router call).
 
## 8 · Ratification record (the K1 gate — CLOSED)
 
The traffic window answered the gate; disposition per item:
 
1. **Do live utterances fit the actions, or force a new one?** — Fit confirmed;
   evidence forced a *merge* (TOPOLOGY→MASTER, Decision A), not an 8th action.
   → **6 actions ratified.**
2. **Enum-drop rate per field (target <5%)?** — 3.45% → **PASS.**
3. **Derivation fall-through on `·` cells?** — Priced as a stamped span attribute
   from IR-1; the live go-live shadow (IR-3, post-merge) reads it against
   frame-primary vs keyword-primary. Informational, no enum change.
4. **`entity_ref` surface diversity (sizes K3 alias seed)?** — feeds IR-2's
   backend-scoped alias table seed; no taxonomy change.
5. **`SYSTEM` object — earn its row or drop?** — **retained** as a row (evidence
   did not demand a drop); re-evaluate on a future window.
Frame quality at ratification: confidence 93% HIGH; COMMAND live-proven 100%.
 
## 9 · Path B integration contract (IR-4 — one page, zero build)
 
**Status: FUTURE-STATE CONTRACT.** Path B (hybrid BM25+vector retrieval over
federated tool spaces — SAP BAPIs, IoT-Ignite device capabilities, 1000+ tools)
is **NOT built** until a federated backend is real. This section freezes the ONLY
contract Path B must honor, so **Path A** (the derivation table shipped in IR-3,
merged `866924c`) never reshapes when Path B arrives. Elaborated runtime +
ingestion reference: `cwf-ir-pathb-hybrid-logic-v1_3.html`. Nothing here is a
build order.
 
The seven binding invariants:
 
1. **Second strategy, never a replacement.** Path B mounts BESIDE the
   `(action×object)→category` derivation table (§4) as a second resolution
   strategy — never above it, never replacing it. The Resolver Router chooses
   A vs B **deterministically** (core-table hit → Path A; core-table MISS → Path
   B); the LLM never picks a backend. BM25/hybrid is IR's *second gear*, not its
   rival.
2. **The frame is the only interface.** Retrieval is keyed on the CANONICAL
   FRAME terms (§1–3), never the raw user sentence. Turkish morphology is solved
   upstream by the normalizer and never reaches retrieval — the SAP-BAPI-English
   ↔ canonical-frame gap is a short translation distance, not a morphology
   problem. This is what makes Path B model-agnostic for free.
3. **Same armor, same floor, one longer ladder.** Every Path B candidate crosses
   the identical parse→Zod→closed-vocab→cap→floor armor, and the result is ∪
   ALWAYS_INCLUDE on every path. The fall-through ladder gains a rung — **frame →
   Path A derivation → Path B retrieval → SR1 semantic → keyword floor** — and no
   existing rung is ever removed.
4. **empty≠zero extends to retrieval (ALT-C).** 0 hits or below-threshold ≠
   error; a low-score guess is NEVER surfaced. Honest terminal: "bu istek için
   bağlı sistemlerde araç bulunamadı" or an ALT-A clarification. This is the
   federated member of the empty≠zero routing family — now five:
   retrieval-empty · alias-unresolved · frame-ambiguous · exposure-ungoverned ·
   **federated-retrieval-empty**.
5. **Outage isolation (ALT-B).** Qdrant/OPA/embedding down → Path B disables
   cleanly; Path A + core-table + keyword floor keep serving. The federated tool
   space may vanish; core factory capability NEVER can. (Fail-safe polarity §1:
   outage only disables, never enables.)
6. **Exposure governance travels unchanged.** Federated tools carry the same F80
   `read|write` exposure discipline; a tool without a taxonomy tag or exposure
   classification is dropped at the OPA layer even if it reached the index
   (ROUTE-GOV-1 fail-closed). COMMAND-on-federated obeys the same audited
   `allowWrite:true` gate + the ALT-D honest message. The data-pulling → external-
   channel chain rule holds across backends.
7. **F134 is the mid-turn complement, not a competitor.** The IR ladder is
   PRE-TURN resolution; F134's meta-tool is the MID-TURN half (the SOTA
   model-in-the-loop discovery pattern, CWF-native). When a multi-step turn's
   first tool result reveals the candidate set is insufficient, F134 is the
   governed mid-turn trigger of Path B retrieval, passing through OPA +
   ALWAYS_INCLUDE unchanged. Pre-turn (IR) and mid-turn (F134) are two halves of
   one contract.
**Ingestion (offline, on-connect — the corpus is born, not hand-built):** backend
connect → `listTools` → mirror (`backend_tools`, missing≠deleted) → canonical
enrichment (taxonomy action/object tag + exposure) → encode (bge-m3 deterministic
dense+sparse) → Qdrant upsert (tenant collection, idempotent). **PLATINUM:**
trigger = on-connect auto + one panel "Sync" button (ROUTE-GOV-1 mirror pattern);
the only human touchpoint is *optional* curation of write-exposure. Index rebuild
is the machine's job — no step requires manual assembly.
 
**LangGraph note:** deliberately absent from this contract; it enters as an
OPTIONAL stage-04 planner ONLY when multi-step cross-backend plans are real — its
templates born code-ref + DB-version + sandbox from day one. Deferred, not
forgotten.
 
That is the whole IR-4 contract. **BLOCK 1's build is complete.**
 
<!-- END · cwf-ir-taxonomy-design-v3 · rev 3 · 2026-07-22 · RATIFIED + IR-4 ·
     amendments mint v4 — never in-place (S37-1) -->