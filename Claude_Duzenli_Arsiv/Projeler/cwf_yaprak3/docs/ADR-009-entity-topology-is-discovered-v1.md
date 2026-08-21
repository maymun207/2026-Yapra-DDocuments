# ADR-009 — Entity topology is DISCOVERED, never authored
<!-- ADR-009-entity-topology-is-discovered-v1 · 2026-07-25 · S65 · Architect: Claude
     Owner ruling (Maymun), verbatim: "Ne kadar oraya hardcode koyarsak, o kadar
     kötüyüz. Yani bir şeye hardcode koymak, demek ki biz bu işi bilmiyoruz,
     yapamıyoruz demektir."  Status: ACCEPTED (owner-issued law).
     Floor at issue: rev 144 (master e91ed2a). ADR numbering verified against
     docs/adr/ (001–008 taken). -->

## Status
**ACCEPTED** — owner-issued law, S65 (2026-07-25). Binding on every phase that
touches entity resolution, registry, routing, or the understanding layer.

## Context — what forced this
An S65 Operator read of live governed state exposed an asymmetry:

| Layer | Rows | How they got there |
|---|---|---|
| Factories | **17** | `entityRegistrySync.ts` — auto-mirrored from the backend's live list |
| Zones | **4** (all KB7) | hand-authored, seeded from in-code `referenceData.ts` |
| Zone/factory aliases | **5** | hand-authored, same seed path |
| Lines | **0** | — |
| Equipment | **0** | — |

Two live consequences were already observed in production chat: `glazur3`
resolves but `glazur4` does not (no alias row exists, and there is no registry
mirror for zones at all), and `mergeFactoryRegistryResolution` only runs for
`frame.object === 'FACTORY'` — so for a MES, where most questions are about
LINES and ZONES, the clarification gate is deciding against a nearly-empty
catalog.

The immediate danger is not the gap itself but the **cheap fix**: when M-A
reports "most blocks are entity-unresolved on ZONE/LINE frames", writing an
alias row for `glazur4` will look obvious, small, and harmless. It is none of
those things — it is a vote for an architecture where a human transcribes a
factory's topology into the database by hand, forever, going stale on every
backend change, with the work landing on the owner.

## Decision
**The system discovers its own world. Entity inventory and topology are
OBSERVED from the backend, never authored by a human.**

What the system must discover for itself:
- **which** factories, lines, zones, and equipment exist,
- their **names and identifiers** as the backend states them,
- their **parent–child edges** (factory → line → zone → equipment) — i.e. the
  topology graph is a *derived observation*, not a drawn diagram.

A hardcoded entity catalog is treated as an admission of ignorance: it means we
have not learned how to observe that layer. The remedy is always to extend
discovery, never to extend the hand-written list.

## The boundary — what code legitimately still holds
This law does **not** repeal DB-first/code-floor, and it is not "no constants
anywhere". The line is between **shape** and **inventory**:

**Legitimately in code (unchanged):**
- *Shapes and schemas* — what a zone IS, what fields an entity carries.
- *Algorithms* — `resolveEntityRef`'s normalize → exact → prefix → fuzzy(DL≤2)
  tiers, Turkish folding, suffix stripping.
- *Policies and closed enums* — `IR_ACTIONS`, `IR_OBJECTS`, gate priority order.
- *The discovery mechanism itself* — the descriptor-reading sync code.

**Never in code (this ADR's subject):**
- *Inventory* — which factories/lines/zones/equipment exist, what they are
  called, how they nest.

The code-floor's three sanctioned roles (seed, reset target, outage floor)
apply to structure and policy. **They do not extend to observed inventory**,
because inventory has a better floor: the persisted mirror itself. This is
already how `entityRegistrySync.ts` behaves — a failed or empty-but-successful
sync never empties the mirror (`missing != deleted`, "outage only disables"), so
the last-known-good observation survives the outage without any in-code copy of
the factory list.

**Vocabulary is a third, distinct case.** Human synonyms ("glazur3" for
"Glazur3 Hattı") are not inventory. Under the binding architecture these are
**machine-proposed from observed misses and human-ratified** — the L5
entity-miss ledger records every NIL/AMBIGUOUS resolution, proposes an alias,
and a human plus the eval-gate publishes it. Machine-proposed + human-ratified
is compliant. Hand-authored-from-scratch inventory is not.

## Enforcement — three tests every entity-touching phase must pass
1. **Genericity (zero per-backend literals).** No module in the discovery path
   may name a specific backend, factory, line, or zone. The existing red-team
   test stands as the template: *a seeded fake backend row syncs identically to
   a real one, with nothing in the module referencing a specific backend id.*
2. **Descriptor-as-data.** Which tool to call to discover a layer is read from
   the database (today: `backends.entity_list_tool`, nullable), never from a
   code branch. Extending discovery to lines/zones/equipment must extend this
   descriptor pattern — a new per-backend code path would violate both this ADR
   and the standing "backend identity is DATA" law.
3. **Absence honesty (empty≠zero, applied to topology).** If a backend exposes
   no discovery tool, the catalog for that layer is **empty**, and the correct
   runtime behavior is for the gate to ASK (clarify) rather than guess. An empty
   catalog must never be patched with hand-authored rows to make the gate quiet.
   Silence bought with hand-written inventory is exactly the failure ADR-001
   exists to prevent: a system that appears to know something it does not.

## Consequences
- **Compliant today:** factory discovery (`entityRegistrySync.ts` +
  `factory_registry`), including its cadence (on-connect / Sync / health-tick,
  one call site, zero manual entry) and its ADR-001 status as *an observation,
  never governed authority*.
- **Violating today:** the seeded `armes.zone` rows and `armes.entity_alias`
  rows in `referenceData.ts`. These are hereby **transitional**: they stay only
  until discovery covers their layer, then they are retired rather than grown.
  Adding to them is a regression under this ADR.
- **Binding constraint on M-A (STEP 3) interpretation:** whatever the
  clarification-gate baseline reports, an entity-coverage gap is NEVER closed by
  writing alias/zone rows. The sanctioned remedy is extending discovery to that
  layer. M-A's number exists to justify and later PROVE that extension — not to
  motivate hand-patching.
- **The graph falls out for free.** `factory_registry` is a flat list today.
  Once lines, zones, and equipment are discovered with their parent edges, the
  factory→line→zone→equipment graph *emerges as a derived observation*. This is
  the correct order: the graph is grown from what the backend reports, never
  drawn first and filled in afterwards.
- **Review gate:** RULE-25 reviews of entity-touching phases check the three
  enforcement tests above. A diff that adds inventory rows to code or to a
  governed table by hand is rejected regardless of how small it is.

## Why this is worth the cost
Discovery is more work than a seed row exactly once; a hand-maintained catalog
is more work every time the plant changes and is silently wrong in between. The
owner's framing is the operative test, and it is recorded here as the decision
rule: **if we are reaching for a hardcoded entity, we have not yet learned how
to observe it — and that, not the missing row, is the actual defect to fix.**

<!-- END · ADR-009-entity-topology-is-discovered-v1 · 2026-07-25 -->
