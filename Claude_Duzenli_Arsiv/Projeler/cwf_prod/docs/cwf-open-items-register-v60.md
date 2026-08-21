# CWF — Open Items Register · v60
<!-- cwf-open-items-register-v60 · 2026-07-22 · amends v59_7 after S59
     ("THE SUPERSET DAY"). GOLDEN LEDGER: append-only; items leave ONLY via
     terminal marker; carry-diff pasted in §0; open items carried BY NAME with
     pointer to v59_7 for last full wording; prose may shorten, no item omitted.
     NOTE: minted MID-FLIGHT — PHASE ENTITY-FLOOR-1 is IN-FLIGHT with AG at
     close; §1 carries the exact resume chain. -->

## VERIFIED FLOOR (v60 / S59 close, mid-flight)
master `c0fff4920fbc1848fd9694e5a95ad69d30c28a6c` · rev 134 · ~3531 tests / 338
files (CI-arbitrated) · drift OK · ZERO pending migrations at close (55 total;
`20260722120000_backend_tools_via_gateway.sql` Operator-applied & live-verified
today; ENTITY-FLOOR-1's migration is IN-FLIGHT on its branch, not yet merged).
**S59 lineage:** `a5be673`(S58) → `efb6910`(METRIC-FLOOR-1 PR#100, rev 131) →
`bfa25f5`(SUPERSET-VIS-1 PR#101, rev 132) → `c0fff49`(SUPERSET-VIS-2 PR#102,
rev 134). Operator ops: via_gateway migration apply · poisoned-cache cleanup
(9 rows, pinned kb7 intact, idempotent). Gated publishes (AG, --as ksadmin,
S43-4/PUBLISH-SEAM-1): 2× superset.routing_hint + 3× behavior rows
(cross-type-search · value-depth · oee-source "Both" mapping) — all
gate-verdict=published, rule_audit complete.

## 0 · CARRY-DIFF PROOF — v59_7 → v60
**S59 terminal markers (items leaving OPEN):**
- **B2 step-2 activation prescription (v59_7 §1: "seedRules.ts publish +
  backend_id backfill") → SUPERSEDED@S59-live-diagnosis** — BOTH halves were
  wrong: Superset governed content already existed (33 published/7 kinds,
  arrived via admin UI; seedRules never had a Superset domain by design) and
  global supersetArmes already carried backend_id='superset' (v1's "missing"
  finding was a DISABLED stale ksadmin personal row). Memory profile amended.
- **F154 (frame metric-slot drop) → CLOSED@efb6910+live** — metric-slot FLOOR
  law in deriveCategories (frame.metrics∩METRIC_IDS≠∅ ⇒ 'metrics' cannot drop;
  overrides unmapped cells, span attr cwf.route.metric_floor). Live-verified
  twice (canonicalOEE=present on the previously-failing query class).
- **F155 (call_tool ARMES-name escape) → CLOSED@efb6910** — gatewayPreflight
  deterministic honest local error, fail-open, per-turn single mirror read.
- **F156 (cross-layer learn contamination) → CLOSED@efb6910+operator-cleanup**
  — learn only when basis==='keyword' + metric-vocab guard + [ToolFilter]
  learn-suppressed log; 9 poisoned unpinned rows deleted (G1-G4 evidence).
- **F157 (IrFrame invisible) → CLOSED@efb6910** — frame verbatim in router
  span OBSERVATION_OUTPUT + digest (paid off SAME DAY: F162 root-cause read).
- **v59_7 §5 WATCH "IR-3 OEE basis=frame consistency" → CLOSED@F154-chain** —
  the watch escalated into the diagnosed defect and its floor-law fix; residual
  frame-quality signals now flow through F162/ENTITY-FLOOR lane.
- **SUPERSET-VIS-1 → CLOSED@bfa25f5+operator+live** — gateway deep-discovery
  (generic `gatewayEnumerate`, 22/22 inner tools byte-stable, `stable=true`
  verdict line), `backend_tools.via_gateway` partition (migration applied,
  column live, cross-partition missing-flip isolation), turn-path guard
  by-construction (+red-team), gateway-inner panel surfacing, composeSuperset
  routing_hint consumer (two-lane un-poisonable code baseline) + publish job.
  PLATINUM proof: health tick auto-runs deep-discovery with zero human touch.
- **SUPERSET-STEER-1 (named deferral, S59-morning) → MERGED-INTO
  SUPERSET-VIS design §3.3** (routing_hint consumer + authority baseline) —
  delivered inside VIS-1; never a separate phase.
- **SUPERSET-VIS-2 → CLOSED@c0fff49+publish** — generic
  `gatewayCapabilityIndex` (backend-agnostic, red-team 'gatewaytest' proof;
  AG self-caught a second genericity leak), governed gateway behavior rows
  (cross-type-search + value-depth, GATEWAY_STEPS floor lock-step, named-trap
  wildcard rewording ratified), OEE glossary published with owner's "Both"
  mapping (chart 'Granit - İkincil İşlemler Aylık OEE Grafiği' = value source;
  dashboard 'Granit - OEE Raporu' = report view). AG G0 truth-corrections
  ratified: real live totals **47 datasets / 191 charts / 22 dashboards**
  (births TOTAL-45 rule, §5).
**Carry-diff check:** every v59_7 item is present below OR carries a terminal
marker above. "Absent without marker" set = **EMPTY** ✓. F-BW11/12/13 carried
OPEN (§4). §2 freeze, §3 spine, §6 rules, §7 parked/watch carried by name.

## 1 · v5_2 RELEASE TRACK — position + ★RESUME CHAIN★ (S60 opens here)
GATE-0 ✓ → B1 ✓ → **B2 Superset — infrastructure DONE & live-proven; VERDICT
PENDING behind the in-flight chain** → F163 mini-phase → B3 Memory → B4 → B5 →
B6 → B7 → Path B.
**IN-FLIGHT: PHASE ENTITY-FLOOR-1 v1_2 with AG** (branch `entity-floor-1`,
anchor `c0fff49`; v1 immutable; v1_2 delta = source-tool declaration is DATA:
`backends.entity_list_tool` column, armes backfilled 'getFactoryList', zero
per-backend code, genericity red-team). Scope: G1 `factory_registry` mirror
(migration, backend_tools posture) + G2 entity resolver (TR-fold, suffix-strip,
DL≤2 typo; frame FACTORY + unique match ⇒ clarification CANNOT fire; span
stamps entity_resolved/method; ambiguous/unknown keeps clarification + adds
known-factory hint) + G3 **F161** pagination honesty (grep-kill `total=`,
`records=N/total page=X/Y paginated=true`, span cwf.tool.paginated+coverage,
model-facing "ilk N/total" note — partial≠complete) + G4 **F159** TR templates.
**RESUME:** (1) AG final report → Architect FAST-GATE → GO packet (merge block
+ Operator migration block, one message) → (2) merge → Operator apply → deploy
READY (Architect confirms) → first health tick self-fills registry (17
factories) → (3) owner's 2 verification turns: "Granit fabrikasının aylık
OEE'sini Superset'teki hazır veriden göster" (expect: no clarification, entity
resolved, Superset chart DATA + attribution) + "granik fabrikasi oee degerleri
nedir?" (typo-tolerance) — Architect seals from logs (entity_resolved stamp +
records=/paginated= lines) → (4) **owner's BLOCK 2 verdict** ("kapalı, geri
dönmemek üzere") → (5) **F163 phase** (design DELIVERED:
`cwf-tool-doc-overlay-design-v1`; Architect authors the gated prompt) → (6)
BLOCK 3 Memory opens (MEMORY-1 design note first; anaphora class "diğer tüm
hatları…" lives THERE, explicitly out of ENTITY-FLOOR scope).

## 2 · 🧊 GOLDEN FREEZE (engaged, unchanged) — pointer v59_7 §2.
Golden-runner 1075/18h watch unchanged (BLOCK 5).

## 3 · REMAINING SPINE — B3/B4/B5/B6/B7/Path-B carried by name (pointer
v59_7 §3). B5 additions this session: ksadmin's 2 stale/disabled personal MCP
rows + raw Authorization headers (len 156) confirmed in-scope of the 6/6
raw→apiKeyRef sweep.

## 4 · BOARD-WALK — F-BW01-10 CLOSED (v59_7 §4) · **F-BW11/12/13 OPEN**
(batchable; the "fold into a BLOCK-2 visit" candidate expired un-taken —
re-home to B5 or an early-B3 batch).

## 5 · NEW S59 RECORDS (rules / findings / tally / watches)
**RULES:**
- **S59-1 (owner-adopted via v1_2/v1_3 speed model):** an unknown whose
  failure is DESIGN-SAFE (honest degraded state) does NOT serialize a phase —
  hard mid-phase stops are reserved for unknowns that gate schema/security.
  Sibling: internalize stability proofs (one click, in-process double-run).
- **S59-2 · TOTAL-45 RULE (owner-legislated, PERMANENT, memory-written):** a
  log/telemetry field is a CLAIM, not the world — before ANY observed field
  becomes a premise: grep the emitter OR cross-corroborate; else explicit
  "unverified" mark. Born: "[ToolResult] total=45" misread as full list while
  list_* paged at 10 (real 47/191/22). RULE-25 extends to log-field semantics.
  Code companion = **F161** (in-flight): "kayıt yetmez, kod geçmeli".
- **S37-1 reaffirmed in practice:** v1→v1_2→v1_3 mid-flight handover clause
  (SUPERSET-VIS-1) worked; relay latency made AG start on v1 — no work lost.
**FINDINGS (open unless marked):**
- **F153 · OPEN (external ops):** Superset returns `http://0.0.0.0:8080/...`
  base URLs — Superset deployment config (armes-reports2), NOT CWF; breaks
  explore links if ever surfaced. Kale/ARDIC ops item.
- **F158 · OPEN:** render-layer empty≠zero gap — model-authored table cell
  showed Glazur1 "0" while prose honestly said "veri bulunamadı"; grounding
  didn't scan the table surface. Small fix; B5 or an early batch.
- **F159 · IN-FLIGHT@ENTITY-FLOOR-1 G4** (EN clarification template → TR).
- **F160 · OPEN (VIZ family):** multi-series single chart (per-line OEE lines)
  unsupported — model fetched data, honestly offered table/per-line
  alternatives. VIZ-BIND evolution lane.
- **F161 · IN-FLIGHT@ENTITY-FLOOR-1 G3** (pagination honesty — see S59-2).
- **F162 · IN-FLIGHT@ENTITY-FLOOR-1 G1-G2** — clarification over-fire ROOT
  CAUSE digest-verbatim (traces 591fcf00/73870d59): frame HIGH,
  object=FACTORY, entity_ref clean — gate fired on entity_ref slot ALONE
  (no armes.entity_alias canonical hit). Healthy contrast same session:
  glazur3→getDailyOeeValues chart. 4 failing specimens logged (2 read, 2
  anaphora-class → B3).
- **F163 · DESIGN DELIVERED** (`cwf-tool-doc-overlay-design-v1`) — human doc
  overlay on tool descriptions ("İşletme notu"): governed `<backend>.tool_doc`
  kind (≤400 char, append|replace, gate-published, dead-overlay rejection
  S41-2), serve = flat tool defs + capability index, Sentezle draft-time LLM
  assist (stage-drafts pattern; runtime stays deterministic), provenance
  four-source table (§1 of the note) = the owner's "once and for all" charter.
  Industry-verified (NVIDIA MCPToolOverrideConfig · AWS enrichment guidance ·
  mcp-proxy-processor). **Owner-ratified sequence: after B2 verdict, BEFORE
  B3.** Phase prompt = Architect's next authoring task at resume step (5).
**ARCHITECT PREMISE-ERROR TALLY (S59 = 3; discipline notes):**
  (1) `catCount=12` read as "Superset rules absent" — structural
      (resolveToolCategories hardcodes ['armes']), falsified by AG R2/R3.
  (2) "[ToolResult] total=45 = full list" — the TOTAL-45 incident (S59-2).
  (3) "Granit = KB7'nin hattı" wrong premise in a suggested user turn —
      owner-caught; past-session ground truth: 17 factories, 4 active
      (KB7·Granit·Sir·Masse are SEPARATE).
  Discipline-positive: the "granit=MATERIAL ambiguity" hypothesis was flagged
  AS hypothesis and falsified by the digest read before use — TOTAL-45
  working as designed, not a tally entry.
**ADR-001 LIVE VINDICATION (frame this, don't fix it):** "KB7'nin aylık OEE'si
Superset'te YOK; Granit'inki VAR" — the exact scope-authority discipline the
2026-06-28 acid test demanded (where P3 once leaked Granit-as-KB7 under
disclaimer). Optional governed row: superset.blind_spot "KB7 monthly OEE not
in Superset → ARMES" (owner's call, un-decided — carried OPEN as an option).
**WATCHES (new):**
- JWT ES256 "kid unrecognized" transient on the gated publish script (first
  attempt failed, identical retry clean) — single specimen; recurrence →
  root-cause (S55-1 posture).
- GatewayEnum runs FULL double-sweep (2×18 pages) on EVERY health tick —
  works, but load-polish candidate: freshness-gate via mcp.healthFreshnessSec
  pattern (B5 or ride any BLOCK-2-adjacent visit).
- Enumeration swallowed errors ×2 every run: `get_instance_info` +
  `search_tools(metadata)` → "Streamable HTTP error" (server-side quirk,
  F153-adjacent; sweep completes regardless).
- `[ToolResult] total=34` on list_charts etc. remains a LYING FIELD until
  F161 merges — treat every such number as unverified (TOTAL-45).
- Keyword layer keeps learning stopword-ish tokens under legitimate
  basis=keyword turns ("sini","veriden","hazır"…) — traffic-window-locked;
  evidence accumulates for the ~Aug 2 review.
- gateway=4 semantics RESOLVED (no contradiction with S55's W-12 "3"): 4 =
  Superset's advertised entry points (search_tools/call_tool/
  get_instance_info/health_check); 3 = ARMES LOCAL_TOOL_NAMES — different
  sets, both true.

## 6 · RULES / RECORDS — all prior survive by name (pointer v59_7 §6 + KB).
**+ S59-1, + S59-2/TOTAL-45** (§5).

## 7 · PARKED / EXTERNAL / WATCH — v59_7 §7 carried by name + §5 watches
above. Stale-branch sweep now also owed: metric-floor-1 / superset-vis-1 /
superset-vis-2 remotes were deleted at merge ✓ (AG-confirmed); older list
(obs-trace-2b · flake-sweep-1 · pane-scroll-1/2 · hotfix/f152) still owed.

## 8 · YOUR ACTION ITEMS (owner, at v60 write / S59 close)
- Add to the project: this register `v60`, `CWF-SESSION-GRAPH-KB-v58`,
  `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v58`, plus today's phase/design files
  if not yet added (METRIC-FLOOR-1 · SUPERSET-VIS-1 v1/v1_2/v1_3 · SUPERSET-
  VIS-2 · ENTITY-FLOOR-1 v1/v1_2 · cwf-superset-visibility-1-design-v1 ·
  cwf-tool-doc-overlay-design-v1).
- To start S60: paste bootstrap v58 into a fresh session — it boots
  MID-FLIGHT at §1's RESUME chain (AG report may already be waiting; paste it
  there).
- Relay stays the only owner surface; your judgment points in the chain: the
  2 verification turns + the BLOCK 2 verdict (+ optional blind_spot row call).

<!-- END · cwf-open-items-register-v60 · 2026-07-22 -->
