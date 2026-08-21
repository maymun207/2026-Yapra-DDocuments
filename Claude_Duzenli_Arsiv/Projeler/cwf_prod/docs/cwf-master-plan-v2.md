# CWF — MASTER PLAN · v2

<!-- cwf-master-plan-v2 · rev 2 · 2026-07-12 · Supersedes v1 (immutable, S37-1).
     S38 AMENDMENT, owner-approved: the E.0 live diagnosis (cwf-E0-superset-diagnosis-
     findings-v1) changed Stream E's nature — governed rules are SEEDED; the defect is the
     personal mcp_settings row + a 4-server duplication with a provenance mislabel (F-E0-2).
     CHANGES v1 → v2: (1) Stream E reshaped from seed+backfill to a staged CONNECTION
     CONSOLIDATION (E.1–E.4); (2) E's entry gate relaxed from "W1 complete + golden set" to
     "golden set armed" — E runs PARALLEL to W1 (Operator lane, zero repo collision);
     (3) seedRules references killed; (4) W0 items marked by status. Everything else carries
     over verbatim in substance. Floor at authoring: 415db54 (S38-CLEAN-1 in flight). -->

---

## 0 · THE SPINE (updated)

1. **The golden set is the system's missing sensor, and it gates on nothing.** Owner action
   (~20 specimens, GOLDEN-MARK-1 UI). It arms: the L3 canary baseline, Wilson-CI rollback,
   the consistency lens, the offline-judge option, GOLDEN-LOOP-1's value — and it is now the
   **explicit entry gate for Stream E** (first marks open E.1; a fuller ~20 baseline opens
   E.3, the auth cutover).
2. **Superset activation (E) is the trigger for SEMANTIC-ROUTING-1** — E immediately precedes
   SR-1 in dependency terms even though E now runs early in calendar terms.
3. **Wave 2 (C) and Stream E no longer compete:** C is client/content (AG lane), E is config
   consolidation (Operator lane). They run in parallel; neither touches the other's surface.

**One-line sequence (v2):**
**W0 arm+clean → { W1 Wave-2 (C) ∥ E consolidation (gated per-stage on golden set) } →
GOLDEN-LOOP-1 → W3 consistency lens + SEMANTIC-ROUTING-1 → W4 governance batch (F47+F39) →
W5 MEMORY-1.**

---

## 1 · DEPENDENCY TABLE (v2)

| Item | Depends on | Unblocks / triggers | Lane |
|---|---|---|---|
| **Golden set (~20)** | nothing | canary baseline · consistency lens · offline judge · GOLDEN-LOOP-1 · **E.1 (first marks) and E.3 (~20)** | Owner |
| W0.b flake grep | — | **DONE S38: clean, zero further instances** | Architect |
| W0.c S38-CLEAN-1 | — | **IN FLIGHT: branch `f2cd2fc` pushed, RULE-25 green, awaiting CI-green + merge** | AG |
| W0.d E.0 diagnosis | — | **DONE S38: findings-v1; reshaped E below** | Architect + Operator |
| W0.e 08 measurement | — | stage-08 closes if sessions short (read-only; pending) | Architect (+ Operator read) |
| **W1 Wave 2 (C)** | design notes (W1.a) | product legible to non-Architect humans | Architect → AG |
| **E consolidation** | E.0 ✓ · golden set (E.1: first marks · E.3: ~20 baseline) | **SR-1 trigger** (catalog effectively doubles for routing) · Superset serving with correct provenance · F-E0-2 closed | Operator + Architect verify + Owner smoke |
| GOLDEN-LOOP-1 | golden machinery (exists) | prod failures → permanent regression tests | AG (parallel-safe) |
| Consistency lens | golden specimens · replay harness | second sensor for SR-1 proof | AG (small, W3 entry) |
| **W3 SEMANTIC-ROUTING-1** | E live · lenses · golden set | closes the ONE architecture gap; pgvector substrate reusable (stage-06 later) | Architect → AG → Operator |
| **W4 F47 audit + F39** | W1 done | per-floor verdicts · `agent.maxToolRounds` governed | Architect → AG |
| Offline eval-judge (G1) | golden set · owner decision | answer-quality measurement, offline only | Owner → later phase |
| **W5 MEMORY-1** | W1 + E done | episodic memory on existing gate rails | Architect → AG + Operator |

---

## 2 · THE WAVES (v2)

### W0 — ARM & CLEAN (status at v2 authoring)
- **W0.a — Owner: arm the golden set.** OPEN, unchanged guidance: ARMES core metrics · ≥3
  empty≠zero specimens (IKINCILUST-class) · routing-sensitive Turkish phrasings · one clean
  multi-tool turn. **First marks unlock E.1; ~20 unlock E.3.** Doubles as the "first golden
  mark" prod smoke.
- **W0.b — flake sweep:** DONE, clean (a finding: the S37-2 pattern had exactly one instance,
  already fixed at `839da8f`).
- **W0.c — S38-CLEAN-1:** in flight (`f2cd2fc`; + one queued commit: the STAGES-FIX-1 stale
  annotation one-liner). Merge = CI-green + the Architect's verbatim message.
- **W0.d — E.0 diagnosis:** DONE → `cwf-E0-superset-diagnosis-findings-v1`.
- **W0.e — 08 measurement:** PENDING (read-only telemetry query; opportunistic).
- **W0.f — Owner prod smokes** (carried): guardrail cron fire · first L5 rollout
  (`CRON_SECRET` positive verify) · routing/quota smokes — any time during W0–W1.

### W1 — STREAM C · WAVE 2 (unchanged from v1)
W1.a three design notes (content-voice · Tweak IA F23 · Rules split F46+F26) → W1.b four AG
phases (WAVE2-CONTENT-1 incl. renames F33/F45 + gate G2 · WAVE2-IA-1 · WAVE2-IA-2 ·
WAVE2-DOCS-1 incl. F9-proper) → exit: owner re-walk 00→14, findings v5 expected small.

### E — SUPERSET CONNECTION CONSOLIDATION (reshaped; Operator lane; parallel to W1)
Goal state: **one connection per backend, global-governed, secret-by-reference, correctly
classified.** (Full rationale + evidence: findings-v1 §4.)
- **E.1 — remove the mislabeled path** *(gate: first golden marks)*: disable the PERSONAL
  `supersetArmes` entry (`enabled=false`, reversible). Closes F-E0-2 (reporting-mirror data
  can no longer execute under a null-backend/armes attribution). Expected log signature:
  `[ToolRoute]` total 290→286, `gateway=4` persists.
- **E.2 — verify + characterize** *(Architect)*: Superset calls bind to the global connection
  only · N-rep consistency probe on the `search_tools` 5-vs-0 behavior · one Superset-answered
  turn traced in Langfuse with `reporting_mirror` attribution.
- **E.3 — ARMES consolidation, the auth cutover** *(gate: ~20 golden baseline)*: FIRST prove
  the global `armesMes` `apiKeyRef` auth live, THEN disable the personal `armesMes`. This
  touches the working data path — sensors mandatory, own FENCE-first prompt, staged and
  reversible.
- **E.4 — owner smokes:** a BI question ARMES cannot answer → Superset-attributed answer; an
  MES question → ARMES answer; provenance visible.
- **E exit:** one connection per backend live → **SR-1 trigger fires.**

### W3 — CONSISTENCY LENS → SEMANTIC-ROUTING-1 (unchanged from v1)
Small consistency-lens phase first (two sensors before the routing change), then the SR-1
design note → pgvector tool-catalog embedding, hybrid scoring, §7/ALWAYS_INCLUDE/precondition
contract preserved, routing-lens A/B with adequate reps before ship. FULL + Operator ceremony.

### W4 — GOVERNANCE BATCH (unchanged): F47 per-floor audit doc (gate G3) → ONE AG phase for
the adjustable set + F39 `agent.maxToolRounds` L1 param.

### W5 — MEMORY-1 (unchanged): Postgres-first governed episodes on the existing
draft→gate→publish→rollback rails + forgetting policy. Not `historyWindowN`; not a vector
bolt-on.

---

## 3 · DECISION GATES (v2)

| Gate | Question | Recommendation | Decide by |
|---|---|---|---|
| G1 | Offline eval-judge | Yes, offline-only, pinned judge, human-owned ground truth | End of E |
| G2 | `?tab=` ids stay or migrate | Stay; labels via `tabLabel()` | Inside WAVE2-CONTENT-1 |
| G3 | F47 audit verdicts | Per-floor table, no blanket opening | Before W4.b |
| G4 | Repo private? | Then `VITE_REPO_PUBLIC=false` in Vercel | When it happens |
| **G5 (new)** | Personal MCP overrides: disable vs delete permanently | Disable now (reversible); delete after E.4 proves the global-only state through a full working week | E.4 + 1 week |

---

## 4 · DO-NOT-BUILD (unchanged, locked)
No runtime LLM judge · no stage-08 summarizer (W0.e decides closure) · no `historyWindowN`
widening · locked laws: DB-first/code-floor · empty≠zero mechanical · deterministic grounding ·
unbypassable eval-gate · C1 · backend identity is DATA · §7.

## 5 · CEREMONY & BINDINGS (unchanged from v1, plus)
E.1/E.3 = Operator ceremony, FENCE-first, pre-read → single targeted UPDATE → post-read →
idempotence probe; never lightened. All S37 rules apply (S37-1 immutable artifacts · S37-2
CI-green precondition · batching · versioning · "YOUR ACTION ITEMS" · automation-first).

## 6 · PLAN EXIT (unchanged in substance)
Wave-2 re-walk clean · one connection per backend serving with correct provenance · SR-1
lens-proven live · golden set self-growing (GOLDEN-LOOP-1) · every floor verdict explicit ·
MEMORY-1 program approved. Next-horizon items then mint `cwf-master-plan-v3`.

<!-- END · cwf-master-plan-v2 · rev 2 · 2026-07-12 -->
