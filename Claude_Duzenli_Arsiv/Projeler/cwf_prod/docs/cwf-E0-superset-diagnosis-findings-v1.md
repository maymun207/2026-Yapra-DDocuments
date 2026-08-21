# CWF — E.0 Superset Live Diagnosis · FINDINGS · v1

<!-- cwf-E0-superset-diagnosis-findings-v1 · rev 1 · 2026-07-12 · Session 38, step W0.d complete.
     Inputs: production Vercel logs (Architect) + Operator read report (Gemini, 2026-07-12) +
     code reads at floor 415db54. This document is the INPUT to the reshaped Stream E. -->

## 0 · EXECUTIVE VERDICT

F36's root cause is **not** missing seeds and **not** a missing global backfill. It is:
**the PERSONAL `mcp_settings` row for `supersetArmes` lacks `backend_id`, and because the
personal/global merge is a UNION (no id collisions), FOUR servers are live — two per backend —
with the personal Superset connection misclassified as a FLAT tool source under backend
`armes`.** Governed Superset rules are fully SEEDED (48 rules, 31 published). `seedRules.ts`
does NOT need to run. The register-v39 Stream-E steps are factually stale and are replaced by
the staged consolidation in §4.

**Correction of the Architect's own earlier claim (S38, this session):** from `gateway=4` in
live logs I inferred "the backfill is already done." Half right: it is done on the **global**
row only. The logs were consistent with the global surface; the personal row — the one the
register meant — is the defect. The Operator's R1 read settled it.

## 1 · THE EVIDENCE CHAIN

1. **Operator R1:** personal `mcp_settings` (ksadmin): `supersetArmes` id `mcp-1782478446699-0`
   `backend_id:null`, Authorization-header auth · `armesMes` id `mcp-1783333651726-0`
   `backend_id:null`, Authorization-header auth. Global `mcp_global_settings`: `armesMes` id
   `mcp-1783320556287-0` `backend_id:null` (ABSENT BY DESIGN — armes default) · `supersetArmes`
   id `mcp-1783333651726-3on2` **`backend_id:'superset'`**, apiKeyRef auth. **All four ids
   distinct.**
2. **Code — merge semantics** (`mcpDiscovery.ts:20-40`): personal overrides global **by id**;
   unique-id personal entries are ADDED. No collisions → pure union → **4 effective servers.**
3. **Code — classification** (`backendToolPattern.ts:57-60`): `toolPatternOf(null)='flat'` →
   the personal Superset connection's tools are FLAT, backend `armes`.
4. **Arithmetic proof from live logs** (`[ToolRoute] offered=290/290 gateway=0|4`,
   `Streaming … (145 tools)`): 141 ARMES tools × 2 servers = 282 flat + personal-Superset 4
   entry tools (misclassified flat) = **286 flat** ✓ (matches `[ToolFilter] …/286`) + global-
   Superset 4 gateway tools = **290** ✓. Stream-time 145 = name-dedup (141 + 4) ✓. The exact
   fit also proves **all four servers discover successfully** (a failing discovery would
   shrink the count).
5. **Code — name-collision binding** (`stageTools.ts:140-146`): `ctx.vercelTools[safeName]=…`
   is a plain object → last write wins; stable sort + merge order (global first, personal
   appended) → **the personal connection wins every duplicated tool name** on the Anthropic
   all-tools path.
6. **Operator R2/R3/R4:** `backends` rows correct (superset = gateway · reporting_mirror);
   7 superset rule kinds; 48 rules / 31 published — **SEEDED**. (`superset.routing_hint` is
   empty — a soft kind with no instances, acceptable.)

## 2 · THE THREE FINDINGS

**F-E0-1 — the one-field defect.** Personal `supersetArmes.backend_id` is null. Effects:
its 4 gateway entry tools are offered as ordinary ARMES-flat tools; the gateway discipline
(search→call over the bound datasource) is not applied to them; and `activeBackends` gets
`'superset'` only via the *global* row — serving works at all only by that accident.

**F-E0-2 — the provenance mislabel (ADR-001-relevant, the serious one).** On the Anthropic
path, `search_tools`/`call_tool` execute via the PERSONAL connection (name-collision, §1.5)
while carrying `backend_id:null → armes` — i.e. **reporting-mirror data can be attributed to
the system_of_record tier**, bypassing the trust containment that exists precisely to keep a
mirror non-authoritative. Latent today (observed Anthropic turns called only ARMES tools),
but structurally open. This upgrades Stream E's priority: it is a **provenance repair**, not
just an activation.

**F-E0-3 — full duplication.** Two live connections per backend, differing in AUTH method:
personal = legacy raw Authorization header; global = `apiKeyRef` (the MCP-SECRET-REF-1
pattern). Costs: ~doubled tool catalog on the Anthropic path (token bloat, mitigated by
caching), ambiguous per-name execution binding, and a candidate explanation for the observed
`search_tools` inconsistency (5 results at 04:55 vs empty `content:[]` at 08:30 — to be
characterized in E.2; server-side flakiness remains possible). **Note: current WORKING ARMES
traffic almost certainly runs on the personal connection** (it wins collisions) — the global
`apiKeyRef` auth path is live-unproven. The consolidation must respect that.

## 3 · WHAT THIS KILLS / KEEPS IN THE REGISTER

- ~~Run `scripts/seedRules.ts`~~ — **KILLED.** Rules are seeded and published (R4).
- ~~Backfill `backend_id` on "the supersetArmes mcp_settings row"~~ — **RESHAPED.** The global
  row already has it; the defect is the personal row, and the better fix is removal, not
  backfill (§4).
- KEPT: "diagnose live, don't guess" — vindicated twice in one day (the register's own steps
  and the Architect's own gateway=4 inference were both corrected by live reads).

## 4 · THE RESHAPED STREAM E — staged connection consolidation (Operator lane)

Goal state: **one connection per backend, global-governed, secret-by-reference, correctly
classified.** Stages, each independently verifiable and reversible:

- **E.1 — remove the mislabeled path (low risk, high value):** disable (or delete) the
  PERSONAL `supersetArmes` entry. Superset then serves ONLY via the global row (correct
  gateway classification, correct `reporting_mirror` provenance). Nothing else changes;
  ARMES untouched; F-E0-2 is closed by this single step.
- **E.2 — verify + characterize global Superset serving:** Architect drives test turns; reads
  `[ToolRoute] gateway=4` persists · `search_tools`/`call_tool` execute via the global
  connection · result-consistency probe for the 5-vs-0 behavior (N-rep, per the stochastic
  rule) · one Superset-answered turn traced in Langfuse with `reporting_mirror` attribution.
- **E.3 — ARMES consolidation (the careful one — auth cutover):** FIRST prove the global
  `armesMes` `apiKeyRef` auth live (a discovery/health probe or a turn pinned to it), THEN
  disable the personal `armesMes` entry. This touches the working data path — golden-set
  sensors wanted before this step.
- **E.4 — owner smokes:** a BI question ARMES cannot answer → Superset-attributed answer;
  an MES question → ARMES answer; quota/routing smokes ride along.

Operator actions are all `mcp_settings`/`mcp_global_settings` scoped (the sanctioned
array-aware UPDATE class); zero repo writes; each stage gets its own FENCE-first prompt.

## 5 · PLAN AMENDMENT PROPOSAL (owner decision → mints master-plan v2)

The approved master plan gates E on **W1 (Wave 2) completion + golden set**. The diagnosis
changed E's nature: it is now an Operator-lane connection consolidation with **zero panel-
legibility dependency** — Wave-2 completion is no longer load-bearing for it. Meanwhile
F-E0-2 (provenance mislabel) argues for doing at least E.1 sooner.

**Recommendation:** re-gate Stream E to **"golden set armed (W0.a)"** only, and run it in
parallel with W1 (different lanes, no collision). Within E, E.1 (the mislabel removal) is
low-risk enough to run immediately after golden marking begins; E.3 (the ARMES auth cutover)
stays behind a fuller golden baseline. On approval, `cwf-master-plan-v2` is minted with the
reshaped E and this gate (S37-1: the presented v1 stays immutable).

## 6 · SR-1 EVIDENCE, NOW QUANTIFIED (side product, feeds W3)

`tool_category_cache`: **104 rows**; the 20 newest include English stopwords ("can", "you",
"the", "your", "bring", "list") and Turkish inflections with punctuation ("gosterirmisin?",
"degerlerini", "olarak", "list?", "format?") as routing keys — live confirmation of the
stage-03 structural weakness, plus a write-amplification quirk (the same words re-learned per
tool result within one turn). Also recorded from live logs: one Anthropic turn violated the
zone-UUID precondition contract (fabricated `a1b2c3d4-…` zoneIds → empty results → self-
corrected via `getFactoryLines`) — Wave-2 stage-07 depth material and SR-1 motivation.

<!-- END · cwf-E0-superset-diagnosis-findings-v1 · rev 1 · 2026-07-12 -->
