# CWF — Open Items Register · v75
<!-- cwf-open-items-register-v75 · 2026-08-01 · CLOSES S73. Supersedes v74.
     S63-2: SELF-SUFFICIENT — every open item carries full wording here or a
     sanctioned pointer (pre-S73 parked full texts remain in v72 §7,
     unchanged; S73 additions carried in full in §7 below). -->

## §0 · FLOOR (verified from fresh clones during S73; nothing in flight)

```
origin/master   c4a15ea3134abe56cbe9b69500c05a0dcf9aae1b  (VIZ-MATCH-ARRAY-1 merge)
vitest          407 files · 4516 tests · migrations 62 · docs/adr 11
docVersion      rev 168 · 2026-07-31
production      dpl_GB7Mxibnn5v7btXLP8w1prGcBtmP · READY · SHA=c4a15ea3
DB              episodes 3 · memory_audit 1 row (episode_delete) — first
                forget_tick row due 2026-08-01T03:40Z (S74's opening read)
```

**Merge ladder, S73 (FOUR --no-ff merges, every message byte-verbatim,
every suite independently re-run to the digit on reviewer clones, chunked
single-core, aggregate==enumeration partition proof):**
`215bd9ab` MEMORY-1C-FIX-1 (404/4484) → `e79119ca` VIZ-TABLE-1 (406/4504)
→ `0c13ed32` VIZ-UPLIFT-1 (407/4508) → `c4a15ea3` VIZ-MATCH-ARRAY-1
(407/4516). CI green on all four (F196-family flakes handled with
evidence-justified re-runs where they fired; MATCH-ARRAY-1 green attempt 1
incl. eval-canary).

## §1 · S73 SESSION RECORD

**MEMORY-1C-FIX-1 → CLOSED@evidence.** RULE-25 on fresh clone (gate
directory 0-byte; zero migrations; lint pre-existence re-derived on TWO
clean clones — no stash). The briefed §1.1 mechanism did NOT reproduce;
AG's reproduce-before-fixing found the real two: STALE STORE (GovernanceTab
no mount reload) + NEWEST-DRAFT SHADOWING (KeyEntry kept one draft per
key). Both regression-pinned; both exhibits surfaced retroactively with
ZERO data changes (owner screenshot: fire_orani draft-only row + payload
healthy + G4's honest-empty timeline branch). Collision routing shipped:
promote resolves published (kind,key) first, byte-exact-after-trim (the
catalog's only convention, disclosed not invented), draft adopts the key
verbatim, audit carries attachedToRuleId/Version, case-variant honestly
creates NEW — test-pinned both ways.

**F48 witness-1 SEALED — the owner's hand.** `fire_orani` published
through the real gate: `[Gate] action=publish kind=armes.glossary_term
key=fire_orani rule=c92a1dba verdict=published stage=- reason="" ms=2258`
(13:36:12Z, Architect log read; UI showed SCHEMA/REFERENTIAL/BEHAVIORAL
green). The full loop — episode → promote (provenance draft) → visible
(FIX-1) → human publish through the gate — has now run once end-to-end in
production. Staged drafts 48→47. PROMOTE-DRAFT-VISIBILITY-1 →
CLOSED@evidence · PROMOTE-COLLISION-1 → CLOSED (code+test; a live
same-key promote would be the belt's live proof, not required).
**F48 remains OPEN on exactly one witness: the first forget_tick ledger
row (due 08-01T03:40Z). It closes → A4 CLOSES.**

**THE VIZ PROGRAM (owner mandate, ratified S73 — a NAMED scope addition
to v1; scope-cut v1_2 itself UNAMENDED because every piece entered under
S69-1 user-path or rode an already-in-v1 publish):**
- **Design note `cwf-viz-overhaul-design-v1_1`** (v1 archived same day):
  three-layer inventory · demo comparison (CWF-DEMO app = recharts 3.9 +
  MUI DataGrid; MUI harvest REJECTED — one design system; repo
  `maymun207/cwf` is only the landing page) · the ruling that dissolved
  the F166 amendment question: remedy (A) re-fetch folds into viz v4
  (already in v1 at A5); (B) attributed carry-forward stays v1.1 VIZ-BIND.
- **VIZ-TABLE-1 → CLOSED@evidence** (merge `e79119ca`). TABLE-EPOCH-1
  (F209's remaining surface — table printed raw epoch ms) fixed via the
  ONE-clock extraction: timezone family moved to `src/lib/timeFormat.ts`,
  chart tests 0-byte = the pin; two honest gates (field census
  {timestamp,startMs,endMs} derived from live payloads · F63 magnitude
  window reused); raw in title, sort raw, null unconditional. **F158 →
  CLOSED** riding as G3: groundingCheck Check 1c re-runs the SAME sentence
  checks per numeric markdown-table cell via a synthetic
  `<rowLabel> <value> <header>` line (~86 lines, no new violation class,
  planted-cell red-then-green). Live witnesses: zoned table render
  ("2026-07-31 00:59") AND the F158-inverse photo — Glazur1 cell "Veri
  Yok" agreeing with prose, twice.
- **VIZ-UPLIFT-1 → CLOSED@evidence** (merge `0c13ed32`; parity witness
  collected 08-01 04:06 — crosshair tooltip live under the owner's
  pointer). recharts 3.10.1 = the phase's ONLY dependency, pixels only:
  chartData stays the single pipeline, fallback strings byte-pinned
  OUTSIDE the lib, F209 tests+e2e 0-byte. Ticks join the one clock
  (ISO strings → "25 Tem" via component-parse + Intl UTC-pinned — never
  new Date(string); unparseable→raw; clip fixed @1280+@1024). Humanization
  = disclosed chain (dialect header → registry/turnLabelMap → raw key; no
  heuristics). Table zebra+density in two Tailwind classes. **F160 →
  CLOSED@evidence at the render layer** (single-tool 4-series + cross-
  group 7-series each render as ONE chart, e2e-pinned; the S59 claim is
  dead). Bundle price NAMED: +48.1% raw / +45.3% gzip — the cost of
  superseding **P-2B (no-chart-lib) → SUPERSEDED-BY owner mandate S73**.
  Disclosed deviations: animations off (deterministic e2e) · chart-branch
  jsdom pins moved to props boundary (e2e owns the pixels).
- **VIZ-DIRECTIVE-MISS-1 → CLOSED@evidence · VIZ-MATCH-ARRAY-1 →
  CLOSED@evidence** (merge `c4a15ea3`). The diagnosis chain that found it
  is now a law (S73-1, §8): production fallback over present data (trace
  `ce985938`, 164 elements) → logs → local repro exonerated slice+derive →
  Inspect walk (digest mirror honest about its limits; grounding ok) →
  ONE fenced read-only Operator fetch returned the verbatim directive →
  jsdom mount through the REAL component reproduced → 3-variant bisect
  (spaces exonerated; match-array = killer) → line `toolResultSelect.ts:76`.
  Root: F111b taught scalar-match↔array-arg; its dual (array-match↔
  array-arg — the model mirroring the tool's OWN arg shape) never taught.
  Fix: subset semantics, deterministic, scalar arms byte-identical,
  empty-array ruling disclosed (vacuous subset, arrays only), array↔scalar
  honest miss; verbatim production directive red-then-green through the
  real component; ONE source line replaced. Live witness: the same
  question renders the chart, zoneIds-array visible in the call line.

**RAG lane (B4-lite): CONNECTION BANKED · JOIN AT A5.**
- 3-step walk done. **Real names (correcting the plan's placeholders):
  MCP row = `machine-knowledge-base` (streamable-http, private Vercel
  URL) · secret = `ragbackend`.** Probe sealed two-witness (owner UI tools
  list + Architect log read: mcp-probe 200s, zero `[MCP Probe]` error
  lines, fence ok). Row left DISABLED.
- **Owner experiment (rag ON + armes/superset OFF, ~1h):** zero damage,
  four named findings, honest behavior at every layer (no fabrication;
  gateway denied `unknown_tool` correctly — F202 shape held; honest
  declines). Posture restored same evening; health tick sealed it:
  checked:2 up:2 · armes 141 tools · entity 17/779 emptyContainers=12 ·
  superset 22 stable.
- **RAG-ROUTE-STARVE-1** (full text §7) · **MCP-WARM-STALE-1** (full text
  §7) · **RAG-BACKENDID-Q → CLOSED-answered:** the row's masked JSON has
  NO backend_id → default-armes merge BY DESIGN (three witnesses: mirror
  label `backend=armes`, health checked:2, backend pulldown shows only
  ARMES/Superset/System). Consequence is an A5 gate requirement, not a
  defect.
- **Operator overreach REFUSED:** Gemini produced an implementation plan
  to patch `toolCategories.ts` (zero-tool → all-tools fallback). Refused
  on BOTH grounds: lane (ADR-002/006 — Operator never touches the repo)
  and layer (S72-2 — the defect is DATA, an uncategorized backend; a
  0→all fallback converts a deliberate refusal into a full permission and
  today's starvation was protective). Gemini acknowledged; thread closed.
  The legitimate design question survives as a §7 item tied to M-C.
- Service datum for the A5 pack: `knowledge_lookup_parameter` rejected
  `factory_id="KB7"` (expects UUID) — the domain pack teaches id shapes.

**F166 — live recurrence ×2 this session, remedy sharpened.** (1) The
owner's example session (sealed by the turn's own "no tool query" marker:
zero calls → ×5 honest panels). (2) 04:11: follow-up "bunu gün bazında
çizer misin" did a HALF re-fetch (resolve_time_range + getFactoryLines but
NOT the data tool) → ×7 honest panels. **The viz v4 rule is therefore
"re-call the DATA tools — resolving time/lines is not enough."** Single-
turn chart asks work perfectly (three live proofs today); follow-up chart
asks stay honestly broken until viz v4. No new phase — cutting one would
steal A5's own cargo.

## §2 · DECISIONS CARRIED (v74 §2 in full force, plus S73)

All of v74 §2. S73 adds: **owner viz-overhaul mandate ratified** (named v1
scope addition; executed and CLOSED same session) · **P-2B superseded**
(§1) · **F166 remedy split ruling** (A→viz v4 in v1 · B→v1.1 VIZ-BIND) ·
**A5 RAG-JOIN GATE (expanded by S73 evidence — the checklist):** registry
backend row + RECREATED MCP row with explicit backend_id + domain pack
publish (teaches id shapes per §1 datum) + tool_category rows (MANDATORY —
RAG-ROUTE-STARVE-1) + ENABLE + mirror-row verification + backend visible
in the rules pulldown (acceptance criterion) + post-enable proof reads
wait one discovery-TTL (5 min) or bust the cache (MCP-WARM-STALE-1
ops-note) + F207-class day-one usage read + RAG-ATTR-1 stands (optional
team question: structured source attribution; closes the finding if
shipped) · **viz v4 content list (locked feeds):** base + CHART-SERIES-
DIALECT-1 tightening + F166-A "re-call the DATA tools" + dialect-header
teaching (humanization) + exact-field-names & zone-keyed-shape example
(VIZ-DIRECTIVE-MISS-1) + prose/render dissonance note (§7 cosmetic) ·
**owner decisions queued AFTER F48 closes:** OEE-sibling `69202e21`
merge-or-discard (Architect brings an evidence-backed recommendation) ·
restoration draft `fe8709c6` disposition.

## §3 · LIVE GOVERNED STATE (re-derive from here — never from memory)

```
router.frameRouting = 0 (DARK) · learnEnabled = 0 (BRAKED) · contextTurns = 2
tool_category_cache = 2 rows both pinned · epoch 12
router_proposals = 20 / 0 pending / 1 accepted / 19 rejected
mcp_settings = 3 GLOBAL rows: armes (sse, ON) · supersetArmes (sse, ON) ·
  machine-knowledge-base (streamable-http, OFF, apiKeyRef=ragbackend,
  NO backend_id → folds to default armes until the A5 recreate)
mcp_secrets = 3 (armes-daily-token · supersettoken · ragbackend 07-31)
armes.tool_category = 12 / 108 / 97 / 0-write · FLOOR == LIVE
  (CatalogSync run-observation: tools=141 missing=9 — §7 note)
agent params live: temperature·historyWindowN·maxToolRounds·maxOutputTokens·
  thinkingBudget · agent.memory.ttlDays=90 · agent.memory.retrievalTopK=3
episodes: LIVE · 3 rows · forget cron 40 3Z
memory_audit: LIVE · sealed · 1 row (episode_delete) · first forget_tick
  row due 08-01T03:40Z
glossary armes.glossary_term: OEE v2 PUBLISHED alwaysInject:true ·
  fire_orani v1 PUBLISHED alwaysInject:false (13:36Z, S73) · inert drafts:
  fe8709c6 (restoration) · 69202e21 (OEE-sibling) — owner decisions post-F48
staged drafts = 47 · permissions: + memory:manage (super-admin)
entity_registry 17/779/0 · corpus 167/796 · synthetic = frame-only
SUPERSET_PUBLIC_BASE_URL = SET · repo PUBLIC
frontend: recharts 3.10.1 (sole chart dep; MUI absent) · ONE clock =
  src/lib/timeFormat.ts (chart + table)
```

## §4 · CORRECTIONS + LABEL NOTES (append-only)

v74 §4 carries. S73 additions: **(a)** Architect premise error: FIX-1 v1
§1.1's briefed mechanism did not reproduce (a faithful seed rendered
draft-only rows fine); AG re-bound to the two proven mechanisms — the
premise block's intended failure mode, absorbed as designed. **(b)**
Architect command error during UPLIFT review: a piped `tail` masked tsc's
exit while stale node_modules lacked recharts — caught in-session, redone
with true exits; lesson: never read `$?` through a pipe. **(c)** The
owner-compiled viz summary carried two stale lines, corrected: F153
already CLOSED at A2 (`SUPERSET_PUBLIC_BASE_URL` set) · F160's "multi-
series unsupported" was stale-as-absolute (now closed at render layer,
§1). **(d)** Plan-name corrections: `ragdocs`→`machine-knowledge-base`,
`ragtoken`→`ragbackend` (the Architect's earlier log queries for the
placeholder names correctly returned empty). **(e)** F196 gains two more
data points: VIZ-UPLIFT-1 branch CI attempt-1 red = memory-1b signature
(verified before re-run) · MATCH-ARRAY-1 green attempt 1 with rule26 —
the retry-hardening candidate (per-describe CI retries on the memory-1b
spec) stands, unbuilt. **(f)** Cosmetic ledger additions: table date
column repeats the "2026-07-31 " prefix ×19 (column-aware prefix elision =
G4-neighbor polish, parked) · model prose may narrate a chart over an
honest fallback panel (prose/render dissonance — viz v4 note).

## §5 · THE v1 PATH (scope-cut v1_2 UNAMENDED)

```
 ✅ A1 · ✅ A9 · ✅ A2 · ✅ A6 · ✅ 1A · ✅ 1B · ✅ 1C · ✅ FIX-1 ·
 ✅ F48-witness-1 (fire_orani published) ·
 ✅ VIZ PROGRAM (TABLE-1 · UPLIFT-1 · MATCH-ARRAY-1 — S73 mandate, closed)
 ▶  S74 OPENING READ: first forget_tick ledger row (03:40Z) →
    F48 → CLOSED@evidence → A4 CLOSES
 →  owner decisions: OEE-sibling 69202e21 · fe8709c6
 →  A5 freeze lift: 4 publishes (viz v4 per §2 content list · b1_scope v3 ·
    tools.rule.1/6 v2) + F133-L5 + F83.1 + FLOOR RE-SYNC RE-RUN
    + THE RAG-JOIN GATE (§2 checklist)
 →  A7 B6 min docs + D-2 + D-3 + LAND ADR-012 + R-1 retrofit
    + STAGE-CARD-DRIFT-1 fix
 →  A8 B7 tag + release notes + branch pruning (recount at A8)
```
v1.1 queue: **MEASURE-1 (head)** · E-1 · v72 §5 list unchanged ·
+ S73 additions: F166-(B) attributed carry-forward (VIZ-BIND) ·
settings-epoch in the discovery-cache signature · bundle lazy-load ·
provider-parity design item (rides M-C).

## §6 · DARK FLAG — carried verbatim in substance from v74
(frameRouting=0 · stageClarify unreachable · 1B entity signal honestly
canonical-0 · A23-after-B7 owns re-evaluation · M1 rule 5/52, GO =
M1=0/N≥30 · `entities=` label note.)

## §7 · PARKED — pre-S73 full texts carry unchanged in v72 §7 (+v74 §7
deltas: RAG-ATTR-1 · STAGE-CARD-DRIFT-1 · F196 3-signature). S73 NEW
items, full wording:

- **MCP-WARM-STALE-1** — `mcpDiscovery.ts:48-51` holds a per-server-
  signature warm-instance tool-discovery cache, TTL 5 min. Across a
  backend-toggle storm, different warm serverless instances served
  different universe snapshots for ≤TTL: a disabled server's tools stayed
  callable (16:09/16:10 knowledge_* calls succeeded post-disable) and an
  enabled server's tools were absent (16:29 Gemini: 9-def universe,
  canonicalOEE=absent, armes ON). Discriminating test 16:36: steady state
  fully healthy (31/145 offered, canonicalOEE present, real data).
  DISPOSITION: transient class, NOT a v1 defect (backend toggles are rare
  admin acts); ops-law absorbed into the A5 RAG-JOIN gate (post-enable
  reads wait one TTL or bust the cache); the structural fix — settings-
  epoch in the cache signature — is a named v1.1 candidate.
- **PROVIDER-PARITY design item (rides M-C)** — the isAnthropic
  all-fallback vs semantic-filter asymmetry produced a single-provider
  success mode when an uncategorized backend joined. The exposure policy
  for uncategorized/joined backends + the fate of the isAnthropic branch
  is a DESIGN decision made with M-C's controlled re-run — never an
  opportunistic fallback patch (the refused 0→all proposal is the
  anti-pattern exhibit).
- **CATALOG-MISSING-9 observation** — `[CatalogSync] backend=armes
  tools=141 missing=9`: mirror rows whose live tool is currently absent
  (missing≠deleted by design). No prior pinned value to compare;
  uninvestigated; non-blocking; watch.
- **Cosmetic pair (§4f):** table date-prefix elision · prose/render
  dissonance (the latter rides viz v4 as a teaching note).

## §8 · LAWS

v74 §8 carries (S72-1 · S72-2 · practice precedents). S73 adds:
- **S73-1 — the diagnosis chain ends at a byte:** screen → production log
  → local repro (exonerate the data path) → trace panel (respect its
  honest limits) → ONE fenced read-only Operator fetch → real-component
  bisect → the line. Four layers were exonerated in order today (renderer,
  shape, cap, record) before one expression was convicted. Never patch
  above the proven layer.
- **S73-2 — after a toggle storm, warm caches lie for ≤TTL:** no behavior
  verdict on backend enable/disable flips until one discovery-TTL passes
  or the cache is busted; write the wait into every proof-read that
  follows a settings flip.
- Practice precedents: the two-clean-clones lint-pre-existence method
  (beats stash) · verbatim production bytes belong INSIDE the regression
  test (MATCH-ARRAY-1's directive) · a "before" exhibit screenshot is
  ledger material for every uplift phase.

<!-- END · cwf-open-items-register-v75 · 2026-08-01 · closes S73 -->
