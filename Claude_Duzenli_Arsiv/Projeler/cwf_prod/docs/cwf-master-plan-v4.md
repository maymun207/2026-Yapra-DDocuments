# CWF — MASTER PLAN · v4 (the PLATINUM finalization)

<!-- cwf-master-plan-v4 · rev 4 · 2026-07-14 · Supersedes v3 (immutable, S37-1).
     Authored at S43 close-of-arc, on the owner's order: re-audit EVERY open item against the
     PLATINUM RULE + this session's outputs, and finalize. Floor at authoring:
     origin/master 81a6ab0 (ROUTE-GOV-1 → GOLDEN-BATCH-1 → BULK-REVIEW-1, three merges today) ·
     docVersion rev 78 · ONBOARD-RECONCILE-1 in flight with AG. -->

---

## 0 · THE CONSTITUTION (as of today — order of supremacy)

1. **PLATINUM RULE (supreme, unchangeable):** every component self-configures and is
   operational with a SINGLE click/action. Required manual configuration = wrong design →
   STOP and REDESIGN. Humans touch the system only by CHOICE: **Decision · Consent · Test**.
   Breach protocol active; ledger: **BREACH-1** (29-click publish ceremony → redesign
   BULK-REVIEW-1, shipped) · **BREACH-2** (click-level landmine iteration → redesign
   ONBOARD-RECONCILE-1, in flight). Every design note / phase prompt carries a one-line
   PLATINUM compliance statement from now on.
2. **S43-3:** zero-judgment plans are machine-executed, never handed to the owner.
3. **S43-2 FAST-GATE:** CI is the sole test arbiter; Architect review ≤60s; deep ritual only
   for CI-absence / release hardening / owner request. (First two runs today: 5s and 2s.)
4. Everything below them unchanged: eval-gate unbypassable · DB-first/code-floor ·
   empty≠zero · deterministic trust (ADR-001) · C1 · backend-identity-is-DATA · S31/33/37/39/40/41 families.

## 1 · SESSION-43 SHIPPED LEDGER (code-verified)

- **ROUTE-GOV-1 v2_2 + FIX-1** (`4b34552`): mirror `backend_tools` live-synced (armes 141/0,
  superset 4/0) · governed `tool_category`/`tool_annotation` (12+119 seeded) · fail-closed
  gate (F80) · RULE 31 relocated · catalog evidence `{count,hash}` in audit · F73 deleted ·
  F88's "no audit rows" myth killed (33 reject rows were always there — no surface showed them).
- **GOLDEN-BATCH-1** (`53e9b4e`): chunked background golden runs · per-minute cron LIVE and
  healthy-idle · EXECUTE-locked SQL claim/spend fns · governed 12M ceiling seeded · F89's
  publish side ready (first run pending §3.2).
- **BULK-REVIEW-1** (`81a6ab0`): the ceremony died — staged-drafts console, search everywhere
  (F96), inline exposure edit, one gated bulk publish, persistent per-row verdicts, `[Gate]`
  log line (paid for itself within 30 minutes: three remote diagnoses from logs alone),
  `[StageDrafts]` log + loading states (F93), WRITE_PREFIX widened (F95).
- **Findings minted/closed:** F92 open (d388d5c2's ENABLED personal supersetArmes, raw
  bearer) · F93 ✓ · F94 open (orphan-error copy hint) · F95 ✓ · F96 ✓ · **F97 open**
  (format-rule check validates against GRAPH, must consult MIRROR∪nodes) · **F98**
  (phantom tools in seed categories — ≥1 confirmed: `machine/getMachineNotifications`;
  reconciler enumerates & removes) · CANARY-CHUNK-1 minted.
- Operator-lane note: A-1 must show the CONNECTED ref as one line, never the org project
  list — added to the fence template.

## 2 · PLATINUM AUDIT — every open item, verdicted

Legend: 🏆 compliant · 👤 legitimate human touch (Decision/Consent/Test) · 🔁 REDESIGN (breach-
class if built as-was).

| Item | Verdict | Note |
|---|---|---|
| ONBOARD-RECONCILE-1 (in flight) | 🏆+👤 | machine derives+executes; human = one consent (`--execute`). v2 later: panel button = the literal single click |
| A3 re-test · viz golden run+publish | 👤 | Test · Consent — the two touchpoints PLATINUM itself blesses |
| **Seeds (`seed:rules`/`agent-params`/…) as owner terminal steps** | 🔁 → **SELF-SEED-1** | system self-seeds idempotently at boot/deploy when reference rows are absent (`[Seed]` logged); kills every future "run npm seed" instruction. DB-first law intact (seed role, mechanized) |
| GATE-VISIBLE-1 (scope v2, shrunk) | 🏆 | remaining: single-publish 422 transport fix · F90 identity-bound verdict · audit-trail pane · F94 error-copy hint. `[Gate]` log + bulk path already shipped |
| **F97 → GATE-REF-1** | 🏆 | format-rule tool check: graph → mirror∪nodes. PLATINUM-positive: humans stop authoring graph nodes just to publish a caption; unblocks the ready `getLineStopsReport` rule |
| **CANARY-CHUNK-1** | 🏆 | eval-canary consumes the chunked machinery / latest finalized run — master goes green with zero human steps |
| EXPLORER-1-FIX-1 batch (F81 guard · F87 labels · TS2339 · dialog) | 🏆 | panel truth items |
| G5 + **F92** delete (raw-secret personal rows, incl. d388d5c2's supersetArmes) | 👤+🏆 | one consented Operator visit, ~2026-07-20; machine (Gemini) executes |
| W0.f verifies (CRON_SECRET/L5 first fire · guardrail cron) | 🏆 | Architect log-reads; zero owner steps |
| MCP-INVOke-1 | 👤 | gated console IS the "human chooses to tweak" affordance; audit-first, log-everything ruling carried |
| WAVE2-IA-2 → WAVE2-DOCS-1 (user manual + 📖 links + F9) | 🏆 | a self-explaining system is PLATINUM's UI face; DOC_SLUGS ⊆ DOCS_REGISTRY exit |
| F47 per-floor audit (G3) | 👤 | Decision-shaped by design |
| Consistency lens · **GOLDEN-LOOP-1** | 🏆 | LOOP is PLATINUM-positive: prod failures self-convert to permanent regression specimens |
| F67 session-shape measurement | 🏆 | read-only; decides stage-08 closure |
| SEMANTIC-ROUTING-1 (F74) | 🏆 | the system learns FINDING; sidecar noted: schema/description-informed exposure PROPOSALS replace the regex (still drafts — Decision preserved) |
| MEMORY-1 (F48, F83 §3.4 "agent opens a DRAFT") | 🏆+👤 | agent proposes, gate+human dispose — the PLATINUM shape of learning |
| F86 computed-analysis · F83.1 SCOPE-HONEST-1 · METRIC_ALIASES | 🏆 | deterministic; F83.1 unblocks at §3.2 |
| E-residue (chat provenance · gateway_rule QUERY FORM) | 🏆 | Superset governance later rides the SAME generic reconciler (`--backend=superset`) |
| Parked: STAGE-PLAYGROUND · TheBluePrint23 · cloud strategy · G4 | — | unchanged, triggers on file |

## 3 · THE FINALIZED SPINE (committed order; owner column = only legitimate touches)

| # | Item | Owner touch |
|---|---|---|
| 1 | **ONBOARD-RECONCILE-1**: FAST-GATE → merge → dry-run paste → `--execute` | Consent ×1 |
| 2 | **A3 re-test** → Architect log-verify (`catSource=db`, batch tool offered) → **viz golden run → Yayınla** (closes F89 + F82 model side) | Test · Consent |
| 3 | **F83.1 SCOPE-HONEST-1** (now publishable) | — |
| 4 | **PLATINUM micro-sweep** (three small machine phases, FAST-GATE each): **SELF-SEED-1** · **GATE-REF-1 (F97)** · **CANARY-CHUNK-1** | — |
| 5 | **GATE-VISIBLE-1 v2** (shrunk scope) + **EXPLORER batch** (+F94 copy) | — |
| 6 | **G5+F92 Operator visit** (~07-20) | Consent ×1 |
| 7 | **M-waves** as MP-v3, re-stamped: IA-2 → DOCS-1 → owner re-walk → lens+LOOP → **SR-1** → F47 → MCP-INVOKE-1 → MEMORY-1 → F86 | re-walk = Test |

## 4 · OPEN DECISIONS (the only things awaiting the owner's word)
- **G1** offline eval-judge (recommend: yes, offline-only, pinned judge) — due.
- **S43-1** "a register item dies loud" — formal yes/no (practiced by the Architect since v3
  regardless).
- **G5 date confirm** (~2026-07-20) + scope now includes F92.

## 5 · EXIT (v4)
Reconciler converged & A3 clean · viz published through a finished golden run · master CI
fully green (CANARY-CHUNK-1) · zero owner terminal steps remain in any standing flow
(SELF-SEED-1) · Wave-2 complete incl. live 📖 docs · SR-1 lens-proven · MEMORY-1 approved ·
every future backend's onboarding = connect → auto-sync → drafts → exposure Decisions →
one Consent. Next horizon mints v5.

<!-- END · cwf-master-plan-v4 · rev 4 · 2026-07-14 -->
