# CWF — Session Graph KB · v55_2

<!-- CWF-SESSION-GRAPH-KB-v55_2 · rev 55.2 · 2026-07-21 · Closes S56 ("POST-FULL-
     TRACE CLEANUP + RELEASE PLANNING + GATE-0 WALK"). Supersedes the chat-embedded
     interrupt-skeleton KB v55 (presented → immutable per S37-1; this v55_2 is the
     full reconstruction, authored at S57 boot from a detailed re-read of the S56
     transcript + fresh-clone verification at 0636fd3). -->

## SESSION S56 — one line
Boot floor `49ea01d` rev 126 → close floor `0636fd3` rev 127 · **FIVE merges + one
Operator-free hotfix chain + the release MASTER PLAN (v5_2) + the K1 synthetic-
traffic motor designed and handed off + BOARD-WALK cards 00–13 walked (9 findings).**

## MERGE LINEAGE (all `--no-ff`, RULE-25 verified)
`49ea01d` → `a6fd3df` (PR #90 · OBS-TRACE-2b) → `31d456e` (PR #91 · FLAKE-SWEEP-1)
→ `46813be` (PR #92 · PANE-SCROLL-1) → `da279e0` (PR #93 · HOTFIX-F152, commits
`7b182f1`+`b4a440b`) → `0636fd3` (PR #94 · PANE-SCROLL-2, commits `c5b6c86` +
CHANGELOG `b3d09ba`).
Test floor: 3351/322 at `31d456e` (FLAKE-SWEEP 5× unsharded green) → **~3322 at
`0636fd3`** (net reduction = VSplit + monoblock-era tests deleted in the
pane-scroll arc; CI-arbitrated per S37-2/S56-2).

---

## THE DECISION GRAPH

### 1 · OBS-TRACE-2b (F150 close) + FLAKE-SWEEP-1 — the parallel-lane pair
- `.rpc(fn,args)` now opens the same `cwf.db.read` span through the ONE
  `getServiceClient()` proxy — all 11 dark stored-procedure sites traced;
  stricter-than-`.from()` secret posture (sorted arg KEY names only, hard-leak
  canary); empty≠zero at the rpc layer (`dataShape` prevents void-fn `null` →
  fabricated `row_count:0`). Reseal rev 126→127 also resynced six manifest doc
  entries `21ab667`→`49ea01d` — S55 docVersion watch RESOLVED.
- FLAKE-SWEEP-1: line-level audit of ~600 sync `getBy*` across 45 client test
  files; exactly ONE live race found+fixed (`replayTab.test.tsx:1136`,
  golden-filter chip → `await findByRole`); 3 chatShell hot files traced CLEAN
  (file-level heuristic FALSE-POSITIVED — line-level tracing was necessary;
  method lesson recorded) but converted to `findBy*` belt-and-suspenders. 5×
  retry-free green (S55-1). The S37-2 cleanup debt CLOSED.
- **S56-1 born here:** AG-A and AG-B collided on a SHARED `/tmp/cwf_yaprak`
  workdir (checkouts interleaved; AG-A's commit briefly landed on master
  locally). AG-A caught it PRE-PUSH, reset the shared dir, saved the diff as a
  patch, redid in an isolated clone rebased onto the new master — the RATIFIED
  recovery pattern. Master never corrupted (RULE-25 clean at both merges).

### 2 · Whole-pane-scroll arc (F151) — the monoblock dies
Owner rejected the monoblock admin layout (panel roots pin `h-full`, `<main>`'s
F4 `overflow-y-auto` never engages, overflow trapped in nested ScrollAreas;
rendered evidence, reproduces on every tab). Three-step kill:
- **PANE-SCROLL-1** (`46813be`): one `PanelScroll(min-h-full)` wrapper on 10
  panels. AG-B DEVIATED from the Architect's A/B panel classification and
  applied uniform `min-h-full` everywhere — reviewed and **ratified as superior**
  (simpler invariant, no per-panel taxonomy to drift).
- **HOTFIX-F152** (`da279e0`): corrected PANE-SCROLL-1's guard over-claim on
  Rollout reachability (v1) + root-fixed the intermittent-timeout landmine the
  phase exposed (v1_2). **Architect premise error #1 (S56):** the Architect
  diagnosed "AdminPanel never imports RolloutTab" — AG-A TREE-PROVED AdminPanel
  DOES import+render RolloutTab; Rollout restored to the guard in PANE-SCROLL-2.
  Architect owned the error. **S56-2 born here:** a mid-run "job already green"
  claim was read as merge-ready while the WHOLE CI job had not finished — merge
  precondition = the full CI job green, no partial/stale reads.
- **PANE-SCROLL-2** (`0636fd3`): **G3 SCOPE RULING reversed by owner override**
  (the S55 ruling had allowlisted VSplit's fixed-viewport layout; owner killed
  it). `VSplit.tsx` DELETED (ProvidersTab was the last consumer);
  Providers/Routing now document-flow; the no-scroll-trap guard is COMPREHENSIVE
  (all 12 non-Stages panels, Rollout restored); dead vsplit allowlist entries
  cleaned. RULE-26 + pane-scroll e2e green. **Monoblock DEAD.**

### 3 · Release master plan v5 → v5_2 (MUST-FOLLOW rule book)
Owner stated the 8-item priority: 1=IR · 2=Superset · 3=Memory · 4=RAG ·
5=BM25+regex hybrid · 6=cleanup · 7=docs · 8=close. #5 was identified as **Path
B** (`cwf-ir-pathb-hybrid-logic-v1_3` — the hybrid-retrieval second gear for
1000+ federated tools; Qdrant + bge-m3 + OPA; never sees raw language, searches
the IR canonical frame). **Owner decision:** close the PRODUCT first; Path B =
**ADJACENT PROGRAM immediately after BLOCK 7** (queued, not someday). Rationale
locked: Path B needs IR's frame to exist and only proves out against a real
federated corpus (Kale-RAG + Superset). Result = `cwf-master-plan-v5_2`: GATE-0
+ 7 product blocks + Path B adjacent, **owner-legislated MUST-FOLLOW UNTIL
FINISH — no sapma, laser-focus, every response positions against v5_2.**

### 4 · K1 / synthetic traffic (the data motor)
- The ~Aug 2 review date was exposed as an **Architect ESTIMATE**, not
  owner-legislated — the real K1 gate is DATA sufficiency. Organic traffic is
  too thin (9 turns/18h). Owner directed: **generate synthetic traffic.**
- Design chain v1 → v1_2 → v1_3: a **rate-limited canary injector** (explicitly
  NOT a load-tester), governed rate, single toggle, question sets = DATA
  (admin-UI-editable). Three question classes:
  **A** data-query × 4 active factories (dominant; owner anchors A1 Granit-duruş
  + A2 Sır-sevkiyat VERBATIM); **B** prescriptive/agentic (F83 arc, today
  refused — measures frame-fires-despite-refusal + seeds the F83 regression
  bed; owner anchors Q3 corrective-A3 + Q4 web-research VERBATIM); **C**
  registered-but-inactive factories = the LIVE empty≠zero / ADR-001 stress test
  (honest-absence vs fabrication/scope-borrow).
- **Factory ground truth (owner ran `getFactoryList` live):** 17 registered,
  **4 active** (KB7 Kalebodur 7 · Granit · Sır Hazırlık-Çan · GR&SFX Masse),
  13 inactive (Granit_Irak · Pasta · KB3 · Slab1 · Sinterflex2 · Masse_DK ·
  Granit_Yerkoy1 · KB2 · Granit_Yerkoy2 · Sinterflex1 · Masse_Yerkoy ·
  Sir_Yerkoy · Masse_YK). **Durable-map "ARMES=KB7" premise WRONG** → fix at
  the BLOCK-6 docs pass.
- **SEEDING RULING scope corrected — Architect premise error #2 (AG-B caught):**
  synthetic sets are OPERATIONAL data, NOT the governed-kind lane
  (KIND_REGISTRY = rule-governance only, `selfSeedReconciler.ts:32`) → real
  table + in-code absence-only warm-seeder; admin curation = plain CRUD, not a
  governance publish.
- **§0b scope ruling (AG-B caught the auth trap):** FULL-TURN mode drives the
  real pipeline and needs a real `userId` FK to `auth.users`
  (`chat.ts:66/115/173`); minting a login-capable synthetic account REJECTED
  (new auth attack surface, against S33-1 spirit, touches C1 LAW). **Owner:
  ship FRAME-ONLY now** — frame recording rides
  `RouterProposalsRepository`→`record_router_proposal` RPC under service-role
  with null-actor (S33-1 pattern), no auth surface, no messages write.
  `synthetic.mode` keeps both enum values; selecting `full-turn` returns an
  HONEST born-loud message (S41-1), default `frame-only`. **SYNTH-TRAFFIC-2**
  named (full-turn + proper system-principal identity + Class-C live
  answer-test) — not built.
- **Handed to AG-B:** `claude-code-PHASE-SYNTH-TRAFFIC-1-v1_3`, branch
  `synth-traffic-1`, precondition `0636fd3` (S47-1), isolated workdir (S56-1).
  Frame-only is GOLDEN-FREEZE-INDEPENDENT (no prompt.segment, no main LLM).
  *S57-boot fact: branch NOT yet pushed to origin — PR pending.*

### 5 · BOARD-WALK re-walk (GATE-0 item b) — cards 00–13, 9 findings
Walked live against the OBS-TRACE StagesDashboard. Full wording in register
v59_2 §4; the decisions:
- **Owner rulings:** default COLLAPSED everywhere (page-head + card bodies) ·
  stage context PERSISTS across manual tab-switch + LAST turn auto-selected on
  first entry · **ruling-1:** `ai.*` native-span no-I/O is INTENTIONAL
  (`gateway.ts:184-187` omits `recordInputs/recordOutputs`; the real scrubbed
  I/O lives on the `cwf.*` sibling spans; turning them on would duplicate I/O
  AND widen the raw prompt/completion secret surface) — fix = LEGEND, and
  `recordInputs/Outputs` stays OFF. No information is lost — verified.
- **Three investigate items diagnosed-closed (system CORRECT, legend needed):**
  F-BW05 (domain_rules ×4 = legitimate multi-kind reads) · F-BW06 (`seed_state`
  insert = the S46 concurrency CLAIM no-op lock-probe, 23505-conflict-and-
  return, 3 pairs = 3 domains; honest micro-opt note: cheap pre-SELECT could
  skip the probe — BLOCK 5, pattern itself is deliberate) · F-BW07 (ruling-1).
- **Open UI batch:** F-BW01·02·03·04·08·09 — ALL client-only, ONE batched
  GATE-0 fix phase after card 14.
- Card 14 (Bellek Güncelleme / cwf.flush) NOT yet walked — the last card.

### 6 · S56 laws born
- **S56-1 ISOLATED-WORKDIR:** concurrent AG lanes never share `/tmp/<repo>`;
  unique clone per lane per phase; AG-A's pre-push catch+reset+patch+redo =
  the ratified recovery. Every concurrent-phase prompt carries the line.
- **S56-2 CI FULL-JOB GREEN:** a mid-run "job green" claim ≠ full-job green;
  merge precondition = the WHOLE unsharded CI job finished green (extends
  S37-2). Born from the F152 partial-green merge lesson.
- **cwf-master-plan-v5_2 = MUST-FOLLOW UNTIL FINISH** (owner-legislated).

---

## KEY VERIFIED FACTS (carry forward)
- ARMES = **4 active + 13 inactive = 17 registered** factories (getFactoryList,
  owner-run live). Durable-map "KB7 only" premise = WRONG (docs-pass fix).
- Semantic router = `gemini-2.5-flash-lite` (id gemini-lite, DB-first); main
  chat = `gemini-2.5-flash`.
- `VSplit.tsx` DELETED; monoblock dead; no-scroll-trap guard = all 12
  non-Stages panels incl. Rollout.
- F152 "Rollout never imports" diagnosis was WRONG (AG-A tree-proof); SEEDING
  RULING mis-scope caught by AG-B. **Architect premise-error tally +2 this
  session (three-count since S54-1)** — the two-lane critique loop is
  load-bearing.
- `gateway.ts:184-187`: `experimental_telemetry` sets isEnabled+functionId,
  OMITS recordInputs/recordOutputs — ruled INTENTIONAL (ruling-1), never turn on.
- SeedStateRepository.claim = atomic INSERT lock-probe (unique(domain,
  fingerprint) → 23505 = already-seeded, claim=false) — per-warm no-op by design.
- golden-runner **1075 calls/18h during the freeze** — observed in telemetry,
  UNDIAGNOSED; investigate at BLOCK 5 (freeze machinery should be idle).
- LEDGER archaeology (S57 boot): **ENTITY-FLOOR-1** (S54-era design response to
  owner reliability escalation) = **MERGED-INTO IR-2** (`eddf83e`) — the
  governed backend-scoped entity-alias kind + `resolveEntityAlias` with
  `'unresolved'`-never-guess honesty IS the entity floor. Not dropped.

## WHERE THE PROGRAM SITS (S56 close = S57 boot)
GATE-0 partially complete: (a) PANE-SCROLL-2 ✓ · (b) card 14 + batch fix remain
· (c) owner "UI clean" NOT YET. SYNTH-TRAFFIC-1 in flight with AG-B (branch not
yet pushed). v5_2 BLOCK 1 gated on K1 data + GATE-0. BLOCKS 2–7 not started.
GOLDEN FREEZE engaged (no golden token spent in S56). Path B queued after
BLOCK 7.

<!-- END · CWF-SESSION-GRAPH-KB-v55_2 · rev 55.2 · 2026-07-21 -->
