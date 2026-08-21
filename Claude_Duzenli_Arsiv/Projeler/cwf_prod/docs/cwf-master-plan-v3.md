# CWF — MASTER PLAN · v3 (the recovery consolidation)

<!-- cwf-master-plan-v3 · rev 3 · 2026-07-14 · Supersedes v2 (immutable, S37-1).
     Authored in S43 on the owner's audit request: registers v20→v44 + KBs v20→v41 swept,
     code ground-truth verified at origin/master c5f58a4 (+ PR #34 route-gov-2 in flight).
     This document DISCHARGES the queued "master-plan merge (owner-insisted)" item.
     MP-v2's own exit line — "next-horizon items then mint cwf-master-plan-v3" — is this. -->

---

## 0 · AUDIT VERDICT — what was lost, and how

**The owner's instinct was correct.** Items were dropped, and the mechanism is identified:
**register close-compression.** At each session close the new register compresses the standing
queue into prose ("Standing from vN, unchanged"); three compressions silently shed items:

| Dropped item | Last seen | Dropped at |
|---|---|---|
| STAGE-PLAYGROUND (parked idea, trigger recorded) | v38 | v39 |
| F9-proper (real in-panel source viewer) | v39 | v40 |
| G1 offline eval-judge decision | v40 | v41 |
| GOLDEN-LOOP-1 (prod failure → golden regression) | v41 | v42 |
| **WAVE2-IA-2** · **WAVE2-DOCS-1** (the user-manual line) | v43 | **v44** |
| F47 per-floor audit · consistency lens · G5 delete-date · W0.f smokes · E-residue · METRIC_ALIASES | v43 | **v44** |

The v43→v44 compression (the Architect's own S41-42 close) was the largest shed — it even
lost a v43 section literally titled **"Small items (do not lose)."** Every dropped item is
reinstated in §4 with its last-seen wording. §9 proposes the standing rule that makes this
class of loss structurally impossible.

**Also corrected (drift in the other direction):** v44 §3.7 lists "Wave-2 content/IA" and
"Superset activation (E)" as queued — **both cores are in fact DONE and merged/closed**
(§1). The stale lines masked exactly the two threads the owner felt were lost.

---

## 1 · VERIFIED DONE since MP-v2 (code-cited, fresh-clone ground truth)

- **W0.b flake sweep** ✓ · **W0.c S38-CLEAN-1** ✓ merged · **W0.d E.0 diagnosis** ✓.
- **Golden set ARMED** — GOLDEN-ASSIST-1 + FIX-1 merged (`b753783`; F54 bucket-required Mark,
  F55 tag-is-a-claim). Batch evidence: the F89 run drove 120 turns, so specimens exist.
  *(Exact count vs the ~20 target: one panel glance — §7 verify list.)*
- **W1 Wave-2, first two of four phases MERGED:**
  - `WAVE2-CONTENT-1` (`e93906c`) — stage cards in the human voice · **the docs bridge as a
    TYPE** (`DOC_SLUGS`, link-less until docs exist — never a dead link) · renames F33
    Routing→"Araç Eşleme" and F45 Trust→"Veri Otoritesi" · G2 decided (ids stay, labels via
    `tabLabel()`).
  - `WAVE2-IA-1` (`c7eb89c`) — Sandbox regrouped by stage; stage tag a checked fact (F50/F51).
- **RULES-AMEND-1** (`682f85b`) — amend a published rule from its own payload (F52); reset
  relabeled, confirm-gated, generalized to all kinds.
- **STREAM E — CORE CLOSED (register v41: "SR-1 trigger has FIRED").** E.1 personal-Superset
  disabled ✓ · E.3 ARMES consolidation via index-guarded `jsonb_set` ✓. Residue → §4 R9.
- **ROUTE-SCRAP-1 · MCP-EXPLORER-1 · PARAM-GOV-1 · VIZ-BIND-1** merged (`4177eb2` → `c5f58a4`):
  F39 CLOSED (**this was MP-v2 W4's second half** — W4 remainder is now F47 alone), F82
  render-side, F63/F64, `[Params]` log. **SEC-1** closed; Operator fence validated under fire.
- **Textbook governance-replay explainer: DELIVERED COMPLETE** — `cwf-governance-replay-
  explained-v1` §5.1 carries the mandatory 2026-07-06 Wilson-CI worked example
  (`distinguishable=false` = underpowered, not "no effect"). v43 listing it outstanding was
  stale. CLOSED.
- **SOTA sweep COMPLETE (parts 1–3).** Part-3 verdict, stages 09–14: **no new architecture
  gaps** — 09 "top of the 2026 checklist" (its one gap was the empty golden set → now armed),
  12 vindicated + consistency-lens addition (§4 R4), 14's gap = MEMORY-1 (already named) +
  one cheap loop = GOLDEN-LOOP-1 (§4 R5). The single genuine architecture gap remains
  **stage 03/07 → SEMANTIC-ROUTING-1**.

## 2 · IN FLIGHT (today)

- **ROUTE-GOV-1 v2_2** — PR #34, RULE-25 review passed except two gaps; **FIX-1 with AG now**
  (grant-registry probe + §3.B.4.e catalog evidence). Merge = CI green on the new head.
- **GATE-VISIBLE-1** — design v1 approved (F88 transport-swallow + F90 identity-bound
  verdict); phase prompt authored at its queue turn. No migration — Operator-independent.

## 3 · THE COMMITTED SPINE (near-term, order unchanged from register v44 §3)

1. **ROUTE-GOV-1 v2_2** merge → owner chain: fenced Operator visit (migration + **F73
   delete** + GATE-VISIBLE §7 audit reads) → `seed:rules` → panel sync → stage-drafts →
   publish → A3 re-test.
2. **GOLDEN-BATCH-1** (F89) → its Operator visit → `seed:agent-params` → cron verified from
   logs.
3. **viz v2 REPUBLISH** (owner; first golden run through the new machinery) — completes
   F82's model side; unblocks every prompt.segment publish.
4. **GATE-VISIBLE-1** (F88+F90).
5. **F83.1 SCOPE-HONEST-1** — deterministic uncited-advice banner (per f83-…-v1_2 §1.5:
   make the boundary real, not loose).
6. **EXPLORER-1-FIX-1 batch (revised)** — F81 guard · F87 human line labels · TS2339
   cleanup · explorer dialog polish.

## 4 · RECOVERED — REINSTATED WITH LAST-SEEN WORDING

- **R1 · WAVE2-IA-2 (Rules/Kinds)** *(v43 #5, design note ready)*: guided publish strip ·
  persistent backend-slice label · **F49** archived filter · **F46** role split · **F26**
  Kinds→Rules order · **F7/F8 schema visibility** (the panel never shows a kind's field
  spec — the owner's real need behind the coreSchemas question) · batch **F68** (`as const`
  on STAGES).
- **R2 · WAVE2-DOCS-1 — the user manual** *(v43 #6 + F9 v39)*: the six user docs +
  `DOCS_REGISTRY` rows + **📖 links on the cards** (today 15 cards point at planned docs and
  render NO link) + **F42 arrival strips** propagated to all deep-links + **F9-proper**
  in-panel source viewer (source-serving endpoint; shares the substrate). Exit is
  type-encoded: `DOC_SLUGS ⊆ DOCS_REGISTRY`. **This is the owner-named item: in-app user
  manual + the panel icons that refer to it.** The CONTENT-1 type-bridge means this phase
  lights up links, not plumbing.
- **R3 · F47 per-floor audit doc** *(v43; gate G3)* — per-floor verdict table, no blanket
  opening; then ONE AG phase for the adjustable set. (= MP-v2 W4 remainder, F39 done.)
- **R4 · Consistency lens** *(v43; SOTA-12's one addition)* — cross-response consistency on
  golden specimens; cheap; **the second sensor required before SEMANTIC-ROUTING-1 ships**.
- **R5 · GOLDEN-LOOP-1** *(v41; SOTA-14's cheap loop)* — a prod failure becomes a permanent
  golden regression specimen. Parallel-safe AG phase; machinery exists.
- **R6 · G1 decision — offline eval-judge: DUE NOW** (was "decide by end of E"; E is
  closed). Recommendation unchanged: yes, offline-only, pinned judge, human-owned ground
  truth.
- **R7 · G5 — personal MCP overrides: DELETE, dated ~2026-07-20** *(v43)* — they hold RAW
  secrets (owner's personal `armesMes` carries a raw `apiKey`; global uses `apiKeyRef`).
  Disable already done (E.1/E.3); the delete is the one-week-proven follow-through. **Owner
  + Operator, this week.**
- **R8 · W0.f prod smokes — status VERIFY**: first guardrail cron fire · first L5 rollout
  (= the `CRON_SECRET` positive verification — no completion evidence found in any KB) ·
  routing/quota smokes. Cheap: Architect reads Vercel logs.
- **R9 · Stream-E residue** *(v43 "do not lose")*: provenance visibility in chat answers ·
  governed `gateway_rule` teaching `search_tools` QUERY FORM. (F73 already folded into the
  ROUTE-GOV-1 Operator visit ✓.)
- **R10 · METRIC_ALIASES** governed row + dedup *(v43 🔴 remainder)* — small; batches into
  WAVE2-IA-2 or the EXPLORER batch.
- **R11 · STAGE-PLAYGROUND** *(v38)* — sandboxed COPY of a 🧱 module run against replay
  specimens, verdict-diff vs the real engine. **PARKED**, trigger: owner raises post
  Wave-2. (Not scheduled; kept visible.)

## 5 · MID-TERM WAVES (after the §3 spine; supersedes MP-v2 §2)

**M1 — Wave-2 completion:** WAVE2-IA-2 (R1) → WAVE2-DOCS-1 (R2, incl. F9-proper) → owner
re-walk 00→14 → findings v5 (expected small).
**M2 — Sensors:** consistency lens (R4) + GOLDEN-LOOP-1 (R5) + F67 session-shape measurement
(read-only; opportunistic — decides stage-08 closure; resultStore thresholds stay blocked on
it).
**M3 — SEMANTIC-ROUTING-1** *(trigger already FIRED at E-close; gated on M2's two sensors)*:
pgvector tool-catalog embedding · hybrid scoring · §7/ALWAYS_INCLUDE/precondition contract
preserved · routing-lens A/B with adequate reps. FULL + Operator ceremony. Shares Turkish
hybrid-search infra with the Kale RAG.
**M4 — Governance batch:** F47 audit (R3, gate G3) → one AG phase for the adjustable set.
**M5 — MCP-INVOKE-1** *(after ROUTE-GOV-1; v43's full spec preserved)*: gated tool console ·
new capability `MCP_TOOL_INVOKE` (super_admin) · backend-scope check · **audit-FIRST** row ·
args validated against the stored `input_schema` · explicit LIVE-PRODUCTION confirm ·
rate-limited · zero `messages` writes (C1). **Owner's ruling: log everything** — bounded
shape: full scrubbed args + result truncated 8 KB + total size + `truncated` flag + full-body
hash. Migration ⇒ Operator lane.
**M6 — MEMORY-1** (F48; framed by F83 §3.4 "the agent opens a DRAFT"): Postgres-first
governed episodes on the existing draft→gate→publish→rollback rails + forgetting policy.
**M7 — F86 computed-analysis** (deterministic T1 arithmetic — the "inverted LLM usage"
correction) — slots after GATE-VISIBLE-1 at owner's call.
**F83.2–4 arc:** awaits the Kale RAG corpus (§6).

## 6 · PARKED / EXTERNAL (visible, with triggers)

- **Kale procedure-RAG** — external build; enters as an **MCP backend** (backends row +
  trust tier + eval-gate), never a side-channel; chunk-identity/zone-ID/hybrid-search
  guidance delivered (KB v41 §6). Trigger: corpus exists.
- **TheBluePrint23** — awaiting owner making it public / uploading files.
- **Cloud strategy** (GCP candidate · AWS-IAC-MCP for authoring; live-CRUDL rejected) —
  trigger: first greenfield EAIP component.
- **STAGE-PLAYGROUND** (R11) — owner-raised trigger.
- **G4**: repo goes private → set `VITE_REPO_PUBLIC=false` in Vercel.

## 7 · DECISION & VERIFY LIST (owner-facing, dated)

| # | Item | When |
|---|---|---|
| G5 | DELETE personal MCP overrides (raw secrets) | **~2026-07-20** |
| G1 | Offline eval-judge yes/no | **due now** (recommend: yes, offline-only) |
| V1 | Golden-set size vs ~20 target | one panel glance |
| V2 | `CRON_SECRET`/L5-rollout positive verify + guardrail-cron fire | Architect log-read |
| G3 | F47 per-floor verdicts | before M4 build |

## 8 · DO-NOT-BUILD (carried, locked)

No runtime LLM judge · no stage-08 summarizer (F67 measurement decides closure) · no
`historyWindowN` widening · DB-first/code-floor · empty≠zero mechanical · deterministic
grounding · unbypassable eval-gate · C1 · backend identity is DATA · §7 candidate-set law ·
LangGraph never a second orchestration plane.

## 9 · NEW STANDING RULE (proposed) — S43-1 "a register item dies loud"

Every register close MUST diff its item-IDs against the superseded version; any ID absent
from the new register must appear under an explicit **CLOSED / MOVED / PARKED** marker with
a one-line reason. Silent absence = drift, same class as a silent publish rejection (S41-1's
sibling). Compression stays legal — only *unmarked* disappearance becomes illegal.

## 10 · EXIT (unchanged in spirit from MP-v2 §6)

Wave-2 re-walk clean **including the 📖 user-docs links live** · SR-1 lens-proven ·
golden set self-growing (GOLDEN-LOOP-1) · every floor verdict explicit (F47) · MEMORY-1
approved · G1/G5 decided and executed. Next horizon mints v4.

<!-- END · cwf-master-plan-v3 · rev 3 · 2026-07-14 -->
