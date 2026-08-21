# CWF — Open Items Register · v47

<!-- cwf-open-items-register-v47 · rev 47 · 2026-07-15 · Supersedes v46.
     Session: S45 ("the seam-and-faces day"). Floor at close: master fe1fc3e =
     PUBLISH-SEAM-1 merge · docVersion rev 92 · migrations tail unchanged
     (…backend_tools + …golden_batch_runs) · 2513 tests (PUBLISH-SEAM-1 CI, unsharded)
     · ADR-006 rev 2 (Amendment S43-4 committed at docs/adr/).
     IN FLIGHT AT CLOSE: the S45 golden batch run (19 staged drafts, consent 12M
     granted, running in background under AG) — verdict PENDING = S46's FIRST item. -->

## 0 · CARRY-DIFF PROOF (GOLDEN tooth #2) — v46 → v47
Every v46 id accounted; **absent-without-terminal-marker set = ∅**:
§3.1 VIZ-BIND-2 **CLOSED@86a2333** (PR #48: **F111 renderer-side CLOSED** —
findRecordGroups + resolveGroupSlice + argsContainMatch array-inclusion +
GroupAmbiguousPanel; **F107 CLOSED** — `####`/`* `/`*italic*`/`<br>` + DataTable
cells; documented edge: mismatched-key match → 'none' at call-selection, closes at
viz-v3-publish live probe) · §3.2 OBS-LEGIBILITY-1 **CLOSED@cd97aa7** (PR #49, design
v1_2, owner LIVE-VERIFIED by screenshots: root cwf.turn Input/Output populated,
cwf.stage.<NN>. names live, Langfuse Sessions lit, Inspect Tiers with query_head/
conversation_id/stage labels/pre-legibility bucket/TRUNCATED badge; ≤5s north star
PASSED; minted **LANGFUSE-V4-UPGRADE watch → §5** and **F112 → §6**) ·
§3.3 b1_scope v2 + SUPERSET-SERVE-1 + viz v3 emission **→ §2 IN FLIGHT** (edit sets
authored; SCOPE-HONEST-1 ② precondition SHIPPED @90cc884 PR #50; PUBLISH-SEAM-1
machine seam SHIPPED @fe1fc3e PR #51; job v1 **SUPERSEDED-BY job v2** — AG's CREATE
flag exposed composeSuperset per-kind all-or-nothing → v2 carries COMPLETE sets:
2 segments + 3 gateway_steps + 14 gateway_rules, floor byte-fidelity verified;
19 drafts staged with ids on file, idempotence proven, golden run backgrounded) ·
§3.3's **F110 → in-flight publish** · **F83.1 ① → in-flight publish; ② CLOSED@90cc884**
(procedureRulesRetrieved off knowledgeCapture, `.procedure` suffix family, chip
live-turn-only, F83.2-proof fixture-proven) · **F84 watch carried** (Probe-2 on Gemini
is its next evidence) · §3.4 F101 owner Decision **carried unchanged** (not reached) ·
§3.5 GATE-VISIBLE-1 v2 + F94 **carried** · §3.6 GATE-REF-1/F97 + SELF-SEED-1
**carried** · §3.7 EXPLORER batch **carried** · §3.8 F80 lane **carried** · §4 M-waves
M1/M2/M2.5/M3-SR-1/M4/M5/M6 + F86 + F67 **carried by name unchanged** (S46 opens the
owner-requested "3 halka" continuation — touches M3 SR-1 sequencing) · §5 Kale-RAG ·
stage-06 watch · STAGE-PLAYGROUND · TheBluePrint23 · cloud strategy · G4 ·
checkLedgerDiff **all carried** · §6 F106✓ F109✓ (closed prior, pointers stand) ·
F108 **OPEN carried** · v46 residual (ed414a5 push-canary) **CLOSED@S45-open** (API
read: success) · S44's "expect canary residuals" class: cd97aa7 + 90cc884 + fe1fc3e
push-canaries **ALL CLOSED@owner-screenshots** (compared/underpowered, 0 violations,
goldenSetHash stable 7eb3c3a4…, promptRev effb944… pre-publish).

## 1 · S45 SHIPPED (by name, merged chain)
**VIZ-BIND-2** `86a2333` (2440/247) → **OBS-LEGIBILITY-1** `cd97aa7` (2484/252,
rev 90) → **SCOPE-HONEST-1** `90cc884` (rev 91) → **PUBLISH-SEAM-1** `fe1fc3e`
(2513, rev 92; `scripts/publishGovernedContent.ts` + core: plan/stage/golden/publish,
consent-flag-never-default, `--as` identity + S33-1, REPLAY-QUOTA reserve/settle,
replay_audit mirrors prompt-golden.ts byte-for-byte; **ADR-006 rev 2** commits S43-4
as the narrow gated-service-script exception). Operator diagnostic read delivered the
F111 specimen (messages `691863a5…`: `{zoneUuid:[{timestamp,performance,availability,
quality,oee}]}` — args carry `zoneIds[]`). EXEC v1 **SUPERSEDED-BY EXEC v2** (v1
stopped CORRECTLY on the missing seam — PLATINUM queue-jump produced PUBLISH-SEAM-1;
AG's "two runs needed" claim was FALSE: prompt-golden takes a `keys[]` draft set).
**New rules minted:** **S45-1** (every agent-bound output = ONE relay-ready block;
owner never assembles/merges parts) · **S45-2** (any publish into a `pick()`-style
all-or-nothing kind MUST carry the complete set — partial publish silently unserves
the floor; composeSuperset lesson, AG-caught).

## 2 · IN FLIGHT AT CLOSE (S46 FIRST)
**S45 golden batch run** backgrounded under AG (20 specimens × 3 reps, consent
12M, reserve/settle live). On verdict: green → Architect authors publish GO with
`--golden-run-id` embedded (S45-1); **underpowered → owner decision** (Architect
recommendation ready: both arms clean + gate green ⇒ consent to publish — fabb123b
precedent); red → STOP + audit. Then publish ×19 → audit-line verification →
**PROBES (texts, run verbatim):**
P1 F110/F111: `granit fırın alt ve üst zonların son 2 haftalık OEE değerlerini
karşılaştır` (expect: no refusal, KB7-default stated, per-zone charts via match).
P2 F83.1/chip (run on GEMINI — F84 evidence): `Dün A3 hattında en çok duruşa neden
olan 3 problemi bul ve her biri için düzeltici aksiyon öner` (expect: labelled tiers
+ provenance chip). P3 SUPERSET-SERVE: `Superset'ten üretim verilerini getir ve
özetle` (expect: capability-vocabulary search_tools, datasource-attributed answer —
first prod serve) + negative control `bana bir kek tarifi ver` (verbatim refusal).
KNOWN-EXPECTED: next master push-canary shows **baseline:absent = DOCUMENTED-GREEN**
(promptRev changes at publish). Post-publish check attached: verify `supersetArmes`
mcp_settings `backend_id:'superset'` backfill state (E-stream leftover) if P3 fails.
This publish, when landed, **CLOSES the long-deferred "Superset DB-first activation"**
(gateway lane DB-first, floor = outage fallback). Floor-sync note: code floors for
viz/b1_scope/gatewayProtocol stay at pre-publish text (reference role) — fold sync
into the next FULL phase touching those files.

## 3 · COMMITTED SPINE (v46 order, minus shipped)
1. F101 OWNER DECISION (D) — v46 §3.4 wording verbatim.
2. GATE-VISIBLE-1 v2 — v46 §3.5 wording verbatim (+F94).
3. PLATINUM sweep remainder — GATE-REF-1/F97 → SELF-SEED-1 (v46 §3.6).
4. EXPLORER batch (v46 §3.7).
5. F80 write-policy lane (v46 §3.8).
6. **UI mini-batch (NEW):** F112 + any Wave-2-adjacent mechanical strays.

## 4 · M-WAVES (runbook v1+v1_2 authoritative; carried by name, unchanged)
M1 WAVE2-IA-2 → WAVE2-DOCS-1(+F9) → re-walk · M2 consistency-lens + GOLDEN-LOOP-1 +
F67-read · M2.5 JUDGE-OFFLINE-1 · M3 SR-1 (evidence pile stands) · M4 F47(G3) ·
M5 MCP-INVOKE-1 · M6 MEMORY-1 · F86 (F108 sibling). **S46 owner topic: "3 halka"
continuation** (discovery→classification→mapping; the delivered explainer = Wave-2
User-Docs raw material; goto-doc icons reminder re-logged — F42 pattern).

## 5 · PARKED / EXTERNAL / WATCH (v45 §5 triggers stand)
Kale-RAG · stage-06 watch (note: S45 publish keeps rule count ~same+1, trigger NOT
tripped) · STAGE-PLAYGROUND · TheBluePrint23 · cloud strategy · G4
repo-private→VITE_REPO_PUBLIC=false · checkLedgerDiff mechanization ·
**LANGFUSE-V4-UPGRADE (NEW watch):** v4 = observation-centric model; wins: saved
views + F10 per-span links; risks: EC2/ClickHouse data-model migration; evaluate
standalone AFTER v3 floor proven; trigger: owner-raise or a v3 limitation blocking
a committed deliverable.

## 6 · FINDINGS LEDGER Δ (S45; earlier ids: v46 §6 / v45 §6 pointers)
**F107 CLOSED@86a2333** · **F108 OPEN carried** (arbiter unchanged: Inspect/Replay
specimen read) · **F110 in-flight** (b1_scope v2 publish) · **F111 renderer-side
CLOSED@86a2333; emission-side in-flight** (viz v3 publish; call-selection
mismatched-key edge closes with it) · **F112 OPEN (NEW):** Inspect event-detail
raw-JSON panel — long lines clipped at right edge AND vertical scroll cuts lines
mid-height (last visible line half-rendered despite horizontal room); mechanical
(pre-wrap + overflow-auto + line-height-aligned padding); F37 family; evidence:
owner screenshots 2026-07-15; → §3.6 UI mini-batch.

<!-- END · cwf-open-items-register-v47 · rev 47 · 2026-07-15 -->
