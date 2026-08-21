# CWF — MP-v4 EXECUTION RUNBOOK · v1 (the Architect's next-next-next sheet)

<!-- cwf-mp-v4-execution-runbook-v1 · rev 1 · 2026-07-14 · Session 43, authored while AG
     builds RECONCILE-COHERENCE-FIX. Purpose: zero design-debt ahead of the spine — every
     item below is either PROMPT-READY (design done, prompt authored at its turn in minutes)
     or carries its full inline design HERE. PLATINUM statement: every design below is
     self-configuring; owner touches are marked D/C/T (Decision/Consent/Test) only. -->

---

## 0 · TODAY'S FINALE (in flight — no design debt)
COHERENCE-FIX (AG) → PLAN ✓ → execute → **A3 (T)** → **golden run + viz Yayınla (C)** →
F89+F82 close → session-close artifacts (register v45 · KB v42 · bootstrap v42; ledgers
pre-drafted: F99✓ F100✓-in-fix · RULE 33 ratified · S43-1..4 · PLATINUM+BREACH-1/2 ·
hotfix chain 30604a2→13982ba→d7653dc→coherence).

## 1 · NEXT: SCOPE-HONEST-1 (F83.1) — PROMPT-READY
Design lives in `cwf-f83-…-v1_2 §1.5` (deterministic uncited-advice banner keyed on the
retrieval FACT, model-independent; "make the boundary real, not loose"). Unblocked the
moment viz publishes. Action at turn: author phase prompt from §1.5 verbatim (one idle
beat), FULL profile (prompt-segment + render), no migration.

## 2 · PLATINUM MICRO-SWEEP — the three fresh designs (DECIDED here)

### 2a · SELF-SEED-1 — "a deploy seeds itself"
**Mechanism (decided): deploy-marker + minute-tick piggyback-free cron.**
- Refactor the four seed scripts into importable lib fns returning results (no
  `process.exit`); scripts become thin wrappers (unchanged UX for humans who CHOOSE).
- New endpoint `GET /api/admin/self-seed` (CRON_SECRET pattern verbatim) + vercel.json cron
  `* * * * *`: read 1-row `seed_state` (last_seeded_sha, status, error); if
  `last_seeded_sha == BUILD_SHA` → silent 200 (one row-read/min, ADR-007 idle). Else run all
  four seeds idempotently → write sha+status → ONE `[Seed]` bounded line per family
  (`inserted/skipped`). Failure → `status='failed'`+error stored + loud log; NEXT tick
  retries (self-healing).
- **Migration:** tiny `seed_state` (single row, RLS-deny, service-only, FIX-2 revokes,
  grantPolicy+PROBES symbolic rows). Operator: one fenced visit.
- Tests: sha-guard no-op · full-run on mismatch · failure-marks-and-retries · idempotence.
- Kills forever: every "run `npm run seed:*`" owner instruction. Owner touch: none.

### 2b · GATE-REF-1 (F97) — "a caption doesn't need a graph node"
**Decision:** format-rule referential check becomes
`tool ∈ mirror.names(ANY status) ∪ ALWAYS_INCLUDE ∪ graphNodeTools` — mirror is the
reference (ROUTE-GOV's own thesis), graph kept as OR for continuity; **empty mirror keeps
the OLD error path** (no new not-synced coupling — pre-sync worlds unchanged). Additive
lines in the ARMES dispatch only; `GateCatalogInput` already injected — zero new reads.
- RED-first: the READY `getLineStopsReport` format rule — rejected on anchor
  ("unknown tool"), publishes on HEAD with no node.
- Unblocks: that rule TODAY-after-merge; all future caption rules. FULL profile (gate file,
  additive-dispatch-sanctioned), no migration. Owner touch: none (rule publishes via
  reconcile/bulk).

### 2c · CANARY-CHUNK-1 — "master goes green honestly"
**Decision: redefine the canary as SENTINEL SMOKE, not full certification** (full rigor now
lives at publish-time via GB-1 — running 120 turns per deploy was never the canary's job;
its 500k budget was sized for exactly this smaller truth).
- Sentinels = the **3 oldest ACTIVE golden specimens** (deterministic, code-side, ZERO
  migration, zero owner marking; a panel star-override is a later WAVE nicety).
- `eval-ci` gains sentinel mode: 3 specimens × 1 rep, synchronously via the existing
  single-replay entry (fits time wall + budget by construction), same verdict semantics
  (regression ⇒ red, else green; `completed:false` becomes impossible at K=3).
- Workflow yaml untouched except the mode flag; audit row shape preserved.
- Result: every master push green unless a REAL sentinel regression. Owner touch: none.
**Sequencing:** 2a needs Operator (migration); 2b/2c don't → ship order **2b → 2c → 2a**
(two FAST-GATE merges land while the single Operator visit is prepared; one visit total).

## 3 · GATE-VISIBLE-1 v2 — PROMPT-READY (shrunk)
Remaining from design-v1: single-publish 422→domain-result transport (AdminApiError.body) ·
identity-bound `lastPublish {forRuleId}` (F90) · audit-trail pane in rule detail ·
F94 orphan-error copy hint. `[Gate]` log + bulk path SHIPPED. No migration.

## 4 · EXPLORER BATCH — MECHANICAL (no design)
F81 declared⇒published guard panel line · F87 zone-UUID→human labels · TS2339 cleanup ·
explorer dialog polish. HOTFIX-adjacent profile.

## 5 · M-WAVES — status sheet
- **M1 IA-2:** design note READY (v43 row #5: strip · F49 · F46 · F26 · F7/F8 · F68).
- **M1 DOCS-1:** spec'd (six docs + DOCS_REGISTRY + 📖 + F42 strips). **F9 endpoint decided
  now:** admin-only `GET /api/admin/source?path=…`, allowlist = stagesRegistry codePaths ∪
  DOCS_REGISTRY sources, text/plain, no write, `__REPO_PUBLIC__` toggle retired by it.
- **M2 sensors:** consistency lens (SOTA-12 shape: same-specimen cross-rep answer-shape
  agreement, deterministic comparator, golden substrate) · GOLDEN-LOOP-1 (prod grounding
  violation ⇒ auto-draft a golden specimen, owner approves = D) · F67 = one telemetry read.
- **M3 SR-1 — SKELETON LOCKED (full note at turn):** pgvector table `tool_embeddings`
  (backend_id, tool_name, embedding, source_hash) fed FROM THE MIRROR (name+description;
  sync-triggered upsert — self-configuring, PLATINUM ✓) · hybrid score = existing keyword
  layer ⊕ cosine top-K · governed L1 params `routing.semanticK`, `routing.semanticMinScore`
  · §7/ALWAYS_INCLUDE/floor contracts byte-preserved · proof = routing lens A/B, adequate
  reps, Wilson protocol · shares TR-hybrid infra with the Kale RAG. Gate: M2 sensors live.
- **M4 F47:** per-floor verdict TABLE first (D), then one AG phase.
- **M5 MCP-INVOKE-1:** v43 spec carried whole (audit-FIRST, log-everything, 8KB truncate).
- **M6 MEMORY-1 skeleton:** episodes = a SOFT kind on existing rails; agent writes DRAFTS
  only (F83 §3.4); forgetting = TTL param + archive sweep by the self-seed cron's sibling
  tick; retrieval deterministic-first (recency+key match), embeddings only after SR-1
  proves the substrate.
- **F86:** deterministic computed-analysis block replacing model T1 arithmetic — design at
  turn (needs VIZ-BIND surface reread; small).

## 6 · STANDING WATCH (Architect solo, zero-touch)
Post-finale log verifies: reconcile 38× `[Gate] published` · `catSource=db` first sighting ·
golden run chunk cadence + finalize · canary red until 2c. Register v45 carries the
PLATINUM column forward + this runbook's ids.

<!-- END · cwf-mp-v4-execution-runbook-v1 · rev 1 · 2026-07-14 -->
