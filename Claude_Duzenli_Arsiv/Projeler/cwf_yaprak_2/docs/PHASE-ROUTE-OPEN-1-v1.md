# PHASE · `ROUTE-OPEN-1` · v1 — a backend nobody filed is not a backend nobody may use

<!-- PHASE-ROUTE-OPEN-1-v1 · 2026-08-04 · S82 · Architect: Claude (Opus 5).
     Author lane: AG. ONE self-contained relay (D-2).
     URGENT by owner ruling S82. Small change, HOTTEST path in the system.
     ZERO migrations. ZERO Operator. ZERO governed publishes. -->

---

## §0 · PRECONDITION (S47-1)

```
FRESH FULL clone · git fetch --all · git rev-parse origin/master
  EXPECT d4f6560027a64efbf01935ed7b25f6dfbf17a711
```

| Check | Expected |
|---|---|
| migrations · test files · ADRs · docVersion | 67 · 449 · 13 · `rev 191 · 2026-08-04` |

Branch: `phase/route-open-1`. Merge only on a verbatim GO.

---

## §1 · THE DEFECT, AND WHY IT IS URGENT

A backend can now be created from the panel (`BACKEND-IDENTITY-IS-DATA-1`,
`d4f65600`), and the system syncs it, mirrors its catalog and health-tracks it —
**and then drops its tools from the turn.**

`stageTools.ts:262-271`: `offered = all(gateway tools) ∪ relevanceFilter(flat
tools)`, and the relevance filter runs against **published `tool_category`
rows**. A backend nobody has filed belongs to no category, so its tools survive
only when the message matches **nothing at all**. Production takes the filtered
branch (Gemini, `isAnthropic=false`), so this is what actually happens.

**The proof that this is a design gap and not a discovery gap:** discovery
already works. `backend_tools` records every tool's **name, description and full
`input_schema`**, automatically, on connect. **We receive the catalog and then
route from a hand-written table instead.**

**And the manual step is real, it was just hidden from the owner.** The RAG
backend's rail was laid by an operator-run job file
(`scripts/jobs/rag-tool-categories-v1.json`) — the code says so at
`selfSeedReconciler.ts:126-133`. Backend #4 would need another such file. That is
the thing this phase removes.

**The carve-out you need already exists, eight lines up.** Gateway tools bypass
the filter because *"a gateway backend's tools match no keyword category, so
filtering them offers ZERO (the live [ToolRoute] bug)"* — the code's own words.
**The same sentence is true of any uncovered flat backend.** The carve-out was
written for the symptom and never generalised to its cause:

> **A backend with no category coverage cannot survive a category filter.**

---

## §2 · THE TRAP — read this before writing a line

There are two predicates that look equivalent and are not. **One of them is a
security regression.**

| | Predicate | Verdict |
|---|---|---|
| **(A)** | the **BACKEND** has no published category rows → all its tools bypass the filter | **CORRECT — build this** |
| **(B)** | the **TOOL** appears in no category → it bypasses the filter | **FORBIDDEN** |

**Why (B) is forbidden:** ARMES publishes ~97 tools across 12 categories out of
~141 mirrored. The uncovered remainder is **not an accident** — `ADR-011`
(`CATALOG-WRITE-LOCK-1`) deliberately excludes **all 44 write-annotated tools**
from every filtered turn. *A filtered turn cannot mutate the factory.* Under (B)
those 44 would be offered on every turn, and `ADR-011` would be silently
repealed by a routing change.

**Implement (A). Write the test that would catch (B)** — a control asserting that
ARMES's write-annotated tools are **still absent** from the offered set. That
control is the most important line in this phase.

---

## §3 · GATES

### G1 · Coverage must be knowable — `resolveToolCategories`

`resolveToolCategories()` currently maps `categoryRows.map(r => r.payload)` and
**throws away `backend_id`**, so the caller cannot tell which backends were
filed. Return the covered backend ids alongside — additively, without changing
the existing fields.

- **The FLOOR case is explicit, not incidental:** `categoryRows.length === 0`
  returns the code floor, which is ARMES's category array. Its covered set is
  therefore **`{armes}`**, and it must say so rather than leaving the caller to
  infer an empty set — an empty set on the floor path would open every backend
  during an outage, which is a different behaviour from today.
- The registry-read failure path (`catch`) already falls back to the seed list;
  its covered set follows the same rule.

### G2 · The partition — `stageTools.ts`

```
gateway      = pattern === 'gateway'                     → offered, unfiltered (today)
uncoveredFlat= flat AND backend ∉ coveredBackendIds      → offered, unfiltered (NEW)
coveredFlat  = flat AND backend ∈ coveredBackendIds      → relevanceFilter (today)

offered = gateway ∪ uncoveredFlat ∪ filter(coveredFlat)
```

- **`ALWAYS_INCLUDE` is sacred** and unioned on every path (`toolCategories.ts:1073`
  states it). Do not disturb it.
- **`ctx.offeredToolNames`, `ctx.filteredToolCount` and `ctx.matchedCategories`
  must reflect what was actually offered.** `checkRoutingContainment` emits a
  `routing_mismatch` telemetry row for a call outside the offered set — if the
  new tools are offered but not recorded, a legitimate call is flagged as a
  routing defect.

### G3 · Born-loud, and zero is printed

One line per filtered turn, **always**, including the clean case — an omitted
line is indistinguishable from a clean one, which is the defect class this
project has spent two days removing:

```
[ToolRoute] uncovered=<n> backends=[<id>:<count>,…] covered=<n> gateway=<n>
```

`uncovered=0` prints explicitly.

### G4 · The bound is NAMED, not silently enforced

An uncovered backend with 250 tools would flood the context. **Do not cap and do
not truncate** — a silent drop is the disease, not the cure. Instead: when the
uncovered tool count exceeds a threshold you declare in the code, **say so on the
same line**, loudly, and let the measurement decide. The real answer is
`ROUTE-DERIVE-1` (the rail derives itself from the mirror), which is the next
item and is **not** in this phase.

### G5 · The replay lens must not disagree with the turn

`routeShadowLens.ts:249,255` partitions by pattern the same way. If it does not
resolve coverage identically, a lens and the turn it replays will disagree about
what was offered — and every measurement built on it inherits the error. Make it
resolve the same way, or state why it need not and prove it.

### G6 · Byte-identity today — asserted, not claimed

On current data **no backend is uncovered**: ARMES is filed, Superset is a
gateway (already exempt), and `machine-knowledge-base` has a published category
from its job file. So `uncoveredFlat` is **empty** and the offered set is
**unchanged**. **Prove it with a test over today's shape**, not with a sentence.

Mutation controls, both directions: a backend with categories stays filtered · a
backend without them is offered whole · **and the (B)-predicate control from §2.**

---

## §4 · WHAT IS NOT IN THIS PHASE

- **`ROUTE-DERIVE-1`** — deriving categories from the mirror automatically
  (`stage-drafts` generalised beyond `armes` + absence-only publish through the
  gate, on the `selfSeedReconciler` precedent). The next item.
- **`ROUTE-ASK-1`** — the semantic router matching the message against mirror
  descriptions instead of a keyword map. Needs `2.7 FRAME-SHADOW-EVIDENCE-1`'s
  measurement first.
- **The fifth wall, recorded here so it is not lost:** `assemble.ts:55` switches
  on backend id and `prompt/backends/<id>/pack.ts` must exist for a backend to
  describe itself. `composeFor` degrades to an empty slice so this is not fatal,
  but a pack is still **code**. Named `BACKEND-PACK-OPTIONAL-1`; **not built
  here**, and no ruling is assumed about it.
- Any governed publish, any migration, any Operator step.

---

## §5 · CI, RESEAL, REPORT

Five gates by name; `in_progress`/`null` is not a pass. This touches
`api/cwf/_lib/**`, so the drift guard will fire — obey it, and decide
redraw-vs-hash-only **by reading the tabs**: a partition change adds no topology
node, but Request Lifecycle describes what stage 7 offers.

**Report:** branch and head · §0's numbers computed by you · G1's covered-set
shape including the floor case · G2's partition with the three counts on a real
turn · G3's line · G6's byte-identity proof · the §2 (B)-predicate control and
what it reds on · the five CI conclusions · the drift outcome and your reasoning ·
**anything unanticipated, by name.** If you think a gate is wrong, say so
**before** implementing something else.

**Do not merge.** RULE-25 review from a fresh clone, then a verbatim GO.

<!-- END · PHASE-ROUTE-OPEN-1-v1 -->
