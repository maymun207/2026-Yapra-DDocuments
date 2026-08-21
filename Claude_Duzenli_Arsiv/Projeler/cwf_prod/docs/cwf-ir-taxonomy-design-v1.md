# CWF — IR Taxonomy & Frame Contract · v1 (DRAFT)

<!-- cwf-ir-taxonomy-design-v1 · rev 1 · 2026-07-19 · IR-0 deliverable, DRAFT.
     Status: DRAFT — ratification is a NAMED OWNER GATE deferred until the
     SC-1/SC-2 traffic window's evidence is reviewed (decision K1, S52).
     Grounded in a fresh clone of maymun207/cwf_yaprak @ a82c2a2:
     toolCategories.ts (12 categories, ALWAYS_INCLUDE), glossary.ts,
     shared/metricVocab.ts, timeTools.ts. Parent: cwf-ir-architecture-roadmap-v1. -->

**PLATINUM compliance:** this phase is design-only; the artifacts it defines
(taxonomy rows, derivation table, aliases) all land as governed DB data with
code floors, self-seeded via the existing selfSeedReconciler path. Zero manual
configuration is ever required to function.

**Session decisions carried (S52):**
- **K1** — draft now, ratify after SC-1/SC-2 mismatch evidence (~2 weeks traffic).
- **K2** — no SR1-primary intermediate flip; the one flip ceremony is IR-3
  (frame primary), SR1 becomes ladder rung 2, keyword stays the floor.
- **K3** — the IR-2 alias kind is **backend-scoped** (`<backend>.entity_alias`
  on the existing `domain_rules.backend_id` axis; code floor = armes zone data).
  No tenant model is invented; future EAIP tenancy composes ABOVE backends.

---

## 1 · The frame (contract shape)

```
IrFrame {
  action:     ActionId                 // closed enum, §2
  object:     ObjectId                 // closed enum, §3
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

## 2 · ACTION enum — 7 values (draft)

Design rule: actions are GENERIC verbs; domain lives in objects. This is the
orthogonality choice that lets SAP/IoT-Ignite extend the OBJECT axis without
ever forcing a new action (§6). It refines the roadmap's estimate (QUERY_DOWNTIME
is not an action here — downtime is an object, queried via QUERY_EVENTS).

| ActionId | Turkish surface (examples) | Essence |
|---|---|---|
| `QUERY_STATUS` | "şu an durum ne", "canlı", "hat çalışıyor mu" | instantaneous state |
| `QUERY_METRIC` | "OEE kaç", "fire oranı", "debi", "K4 sayacı" | measured quantity over a window |
| `QUERY_EVENTS` | "duruşlar", "dün geceki transferler", "bildirimler" | event records over a window |
| `QUERY_MASTER` | "reçete listesi", "malzeme tanımı", "sicil", "araç havuzu" | definitional/reference records |
| `QUERY_TOPOLOGY` | "hangi hatlar var", "KB7 zonları", "tesis listesi" | structural inventory |
| `COMPARE` | "A hattı ile B hattını kıyasla", "geçen haftayla" | multi-entity / multi-window contrast |
| `COMMAND` | "hattı durdur", "duruşu sınıflandır", "not ekle" | state-changing act |

Notes:
- `COMMAND` aligns 1:1 with the `armes.tool_annotation` write-exposure lane
  (F80): a COMMAND frame may only ever derive to categories whose write tools
  carry `allowWrite:true` — the taxonomy and the exposure governance meet here
  by construction, not by convention.
- `COMPARE` derives to the UNION of the underlying `QUERY_METRIC`/`QUERY_EVENTS`
  derivations for its object, and flags multi-target for the clarification
  contract (an under-specified COMPARE is the canonical AMBIGUOUS case).
- Deliberately absent: `ANNOTATE` (a COMMAND), `EXPLAIN`/`HELP` (not routing —
  no tool set changes; the prompt core owns it).

## 3 · OBJECT enum — 13 values (draft)

+1 over the roadmap's 8–12 estimate; the delta is `VEHICLE` (the `logistics`
category is a real ARMES family — araç/taşıt pool — and folding it into
TRANSFER would blur event-vs-asset).

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

`SYSTEM` is admitted but flagged thin — 3 tools today; ratification may drop it
to a capability check instead of a taxonomy row.

## 4 · Derivation table `(action × object) → category` (draft)

Legend: cell = category set derived; `·` = invalid pair by design (derives to
∅, frame still recorded — observe-only never breaks); every derived set is
implicitly ∪ ALWAYS_INCLUDE (`getFactoryList`,`getFactoryLines` — the floor
stays sacred on every path).

| ↓action \ object→ | LINE | ZONE | FACTORY | EQUIPMENT | ORDER | RECIPE | MATERIAL | TRANSFER | VEHICLE | EMPLOYEE | QUALITY | DOWNTIME | SYSTEM |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| QUERY_STATUS | andon,machine | andon | factory | machine | production | · | material | transfer | logistics | employee | quality | linestop | admin |
| QUERY_METRIC | metrics(+quality*) | metrics(+quality*) | metrics | machine | production | · | material | · | · | · | quality | linestop | · |
| QUERY_EVENTS | linestop,andon | linestop | · | machine | production | · | material | transfer | logistics | employee | quality | linestop | · |
| QUERY_MASTER | production | factory | factory | machine | production | production | material | transfer | logistics | employee | · | · | admin |
| QUERY_TOPOLOGY | factory | factory | factory | machine | · | · | · | · | · | · | · | · | · |
| COMPARE | =Q_METRIC∪Q_EVENTS row for the object | ← | ← | ← | ← | · | ← | ← | · | · | ← | ← | · |
| COMMAND | production | · | · | machine | production | · | material | transfer | · | employee | · | linestop | admin |

\* `+quality` iff `metrics` includes `FIRE` — the metricVocab METRIC_ALIASES
mapping (fire/scrap/ıskarta) is the discriminator; this reproduces today's
FIRE_ROUTING_SYNONYMS behavior deterministically instead of by keyword luck.

**Coverage (draft, measured deliverable):** 7×13 = 91 pairs → **56 derivable /
35 invalid-by-design**. Every derivable pair lands in an existing category —
the paper proof that IR-1 can be observe-only with ZERO behavior change. The
flip-era metric to watch (IR-3): rate of frames landing on `·` or dropped by
armor — that is the ladder fall-through rate, and it must be a stamped span
attribute from IR-1 day one so the 2-week evidence window prices it for free.

## 5 · Slots, confidence, clarification

- `entity_ref` — captured verbatim (["sırlama hattı", "fırın 3", "KB7"]).
  IR-2 resolves via the K3 backend-scoped alias kind; `unresolved` is an honest
  terminal state, never a guess (VIZ-BIND-1 polarity applied to routing).
- `metrics` — closed to `METRIC_IDS` (OEE/FIRE/THROUGHPUT today). Extending it
  is a CODE change (polarity law) — the taxonomy never gets to invent a metric.
- `time.surface` — captured verbatim ("dün gece", "bu vardiya", "geçen hafta").
  IR-2 extends the EXISTING `timeTools.resolveTimeRange`
  (FACTORY_TIMEZONE-aware) with the Turkish relative grammar; code-only.
- `confidence: AMBIGUOUS` triggers, report-only until IR-3: (a) two objects
  with no linking action pattern, (b) COMMAND without a resolvable entity_ref,
  (c) COMPARE with <2 resolvable targets, (d) empty action+object after drops.

## 6 · Forward-vocabulary fit (the one-page Path B check)

| Future need | Fits as | Enum change? |
|---|---|---|
| SAP QUERY_MASTER_DATA | QUERY_MASTER × (MATERIAL/ORDER/…) | none |
| SAP CREATE_ORDER / POST_CONFIRMATION | COMMAND × ORDER | none |
| IoT-Ignite QUERY_DEVICE_CAPABILITY | QUERY_MASTER × EQUIPMENT(DEVICE) | object axis |
| IoT-Ignite live telemetry | QUERY_STATUS/QUERY_METRIC × EQUIPMENT | object axis |
| Superset "grafik/chart" intents | QUERY_METRIC/QUERY_EVENTS (+viz directive, out of scope) | none |

Claim to ratify: **the ACTION enum closes early and holds; OBJECT is the
extension axis.** Object additions arrive as governed taxonomy versions through
the eval gate (backend-scoped rows self-place, the WAVE2-IA-2 `surface`
precedent) — never as code enum edits after ratification.

## 7 · Non-goals (byte-level)

No tool-argument forcing (gateway.ts untouched, IR-3's own exclusion) · keyword
floor `routeKeywordLayer` untouched forever · detector vocabularies
(metricVocab) untouched · no golden-run dependency anywhere (GOLDEN FREEZE) ·
no new turn-pipeline stage (frame rides stage 07's existing router call).

## 8 · Ratification checklist (the K1 gate — what the traffic window must answer)

1. Do live utterances fit the 7 actions, or does a recurring shape force an 8th?
   (Evidence: IR-1 shadow frames — but pre-IR-1, the proposals ledger + Inspect
   corpus give a manual sample; ADD-1/ADD-2 telemetry keys it to config.)
2. Enum-drop rate per field (target: <5% after prompt tuning; sustained higher
   = taxonomy gap, not prompt gap).
3. Derivation fall-through rate on the `·` cells (which invalid pairs do real
   users actually produce?).
4. `entity_ref` surface diversity — sizes the K3 alias table's initial seed.
5. `SYSTEM` object: earn its row or drop to capability check.

<!-- END · cwf-ir-taxonomy-design-v1 · rev 1 · 2026-07-19 · DRAFT -->
