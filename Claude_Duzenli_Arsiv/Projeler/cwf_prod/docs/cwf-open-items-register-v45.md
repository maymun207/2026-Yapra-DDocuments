# CWF — Open Items Register · v45

<!-- cwf-open-items-register-v45 · rev 45 · 2026-07-14 · Supersedes v44.
     FIRST close under the GOLDEN LEDGER RULE: §0 carries the carry-diff proof.
     Session: S43 ("the PLATINUM day"). Floor at close: master badge 74f9ae9 (post
     RECONCILE-PHANTOM-INVARIANT; full hash + unsharded count + docVersion → RECORD at
     next open; expect ≥2351 tests, rev ≥79, drift [OK]). Golden run fabb123b (400
     chunks) IN FLIGHT at close. -->

## 0 · CARRY-DIFF PROOF (GOLDEN rule tooth #2) — v44 → v45
Every v44 id accounted; **absent-without-terminal-marker set = ∅**:
ROUTE-GOV-1 CLOSED@4b34552+fef9ca3 · GOLDEN-BATCH-1 CLOSED@53e9b4e · viz-REPUBLISH
→ §2 (in flight tonight) · GATE-VISIBLE-1 → §3.1 (scope v2) · SCOPE-HONEST-1 → §3.3 ·
EXPLORER-batch → §3.4 · MCP-INVOKE-1 → §4 · Wave-2 IA-2/DOCS-1 → §4 (CONTENT-1/IA-1 were
already merged pre-S43 — MP-v3 §1 correction stands) · "Superset activation (E)" SUPERSEDED-BY
SUPERSET-SERVE-1 (§3.6; F36 diagnosis CLOSED by A3 log: gateway=4 OFFERED) · SEMANTIC-
ROUTING-1 → §4 M3 · MEMORY-1 → §4 M6 · F86 → §4 · F67 → §4 M2 · master-plan-merge
CLOSED@MP-v4+runbook-v1/v1_2 · F80-write-policy → §3.5 (policy lane) · F73 CLOSED@Operator
D-4 · F81 → EXPLORER batch · F83-arc → §3.3+§5 · F84 → §3.3 evidence · F87/F88/F90 → their
phases · F89 CLOSED-ON-PUBLISH (run in flight) · F91 CLOSED@catalog-as-reference · Kale-RAG
carried (§5; restored runbook-Δ1 after the MP-v4 drop the owner caught).

## 1 · S43 SHIPPED (by name, one line each)
Merged chain: **ROUTE-GOV-1**(+FIX-1) `4b34552` → **GOLDEN-BATCH-1** `53e9b4e` →
**BULK-REVIEW-1** `81a6ab0` → **ONBOARD-RECONCILE-1** `30604a2` → **ARGV-FIX** `13982ba` →
**DEDUPE-FIX** `d7653dc` → **COHERENCE-FIX** → **RESURRECT-FIX** → **RESURRECT-2** →
**PHANTOM-INVARIANT** (=badge `74f9ae9`; unlisted hashes recoverable from git log — logged
here as the chain, GOLDEN-compliant). Reconciler **CONVERGED** (armes: empty plan + 3
permanent skip lines). Operator visits ×3 (ROUTE-GOV apply+F73 · GB-1 apply · G5+F92) all
gates ✅. A3 live-verified: `catSource=db catCount=12 offered=76/145 gateway=4
writeOffered=17`, batch tools called once-for-3-zones, learned-map writing.
Laws: **PLATINUM** (+BREACH-1/2 ledger) · **GOLDEN LEDGER** (absorbs S43-1) · **S43-2
FAST-GATE** (runs today: 5s/6s/2s) · **S43-3** · **S43-4** (ADR-006 amended) · **RULE 33**
ratified · **G1 APPROVED** → JUDGE-OFFLINE-1 · Operator-template A-1 single-ref line.

## 2 · IN FLIGHT AT CLOSE
- **Golden run `fabb123b`** — 400 chunks, 6/min, ceiling projection ~9.0M/12M, ceilingFailed=0.
  → verdict green ⇒ owner **"Yayınla"** ⇒ F89+F82 formally CLOSED.
- **OUTPUT-BUDGET-1 (F105)** — AG building; FAST-GATE on PR, merge, AG-run seeds ×2.

## 3 · COMMITTED SPINE (order)
1. **GATE-VISIBLE-1 v2** — 422-transport · F90 identity verdict · audit pane · **F94** copy
   hint · **[Gate] emission moves service-side** (reconcile runs currently log only to stdout).
2. **PLATINUM sweep** (designed in runbook §2): **GATE-REF-1/F97** (mirror-reference format
   rules **+ key≡payload.tool invariant for new publishes** — F101's class lesson) →
   **CANARY-CHUNK-1** (sentinel smoke; master goes green) → **SELF-SEED-1** (deploy-marker;
   one Operator visit; kills seed commands forever).
3. **SCOPE-HONEST-1 (F83.1)** — prompt-ready post viz-publish + OUTPUT-BUDGET.
4. **EXPLORER batch** — F81 guard · F87 labels · TS2339 · dialog · **+writeOffered=17
   semantics check** · HOTFIX-6 `resurrect_annotation` label polish.
5. **F80 write-policy lane** — allowWrite decisions stay owner-D; console is the affordance.
6. **SUPERSET-SERVE-1** — teaching, not inclusion: E.2 `gateway_rule` QUERY-FORM + chat
   provenance visibility; archived `call-tool-request-wrapper` floor/DB state check.
7. **F101 OWNER DECISION (D)** — mismatched format-rule row: pick surviving content
   (`getScrapBarcodeList` key vs `getDailyManualScrap` payload), loser archived.

## 4 · M-WAVES (runbook v1+v1_2 authoritative; names carried)
M1 WAVE2-IA-2 → WAVE2-DOCS-1(+F9 endpoint decided) → re-walk · M2 consistency-lens +
GOLDEN-LOOP-1 + F67-read · **M2.5 JUDGE-OFFLINE-1** · M3 SR-1 (skeleton locked; gated on M2)
· M4 F47(G3) · M5 MCP-INVOKE-1 (v43 spec whole) · M6 MEMORY-1 · F86.

## 5 · PARKED / EXTERNAL / WATCH (triggers on file)
Kale-RAG (laws: MCP-backend-only · LangGraph-no-second-plane · shared TR-hybrid; trigger:
corpus) · stage-06 watch (Superset rules ~2×) · STAGE-PLAYGROUND (owner-raise) ·
TheBluePrint23 · cloud strategy · G4 repo-private→VITE_REPO_PUBLIC=false · CANARY red =
known until sweep-2c · checkLedgerDiff mechanization (GOLDEN×PLATINUM candidate).

## 6 · FINDINGS LEDGER Δ (S43 mint; pre-S43 ids live in v44 §4 — pointer, not summary)
F92✓G5-visit · F93✓BULK · F94→§3.1 · F95✓BULK · F96✓BULK · F97→§3.2 · F98✓reconciler
(8 phantoms named in plan logs) · F99✓DEDUPE · F100✓COHERENCE · **F101→§3.7(D)** ·
F102✓ORDER · F103✓RESURRECT(+2 kind-generic) · F104✓INVARIANT · **F105→§2(OUTPUT-BUDGET-1)**.

<!-- END · cwf-open-items-register-v45 · rev 45 · 2026-07-14 -->
