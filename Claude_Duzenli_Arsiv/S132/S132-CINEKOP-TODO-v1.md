# S132-CINEKOP-TODO-v1 — everything left for the CWF cinekop release, in one table

Written WHOLE at 2026-09-07T09:55Z (12:55 TSİ), master `11d6da31644356efdb349f9a9cd9f258b1bdc05a`. **cinekop_gate** as redefined today (OWNER-RULING-S132-CINEKOP-GATE-CWF-SCOPE-1): (1) zero OPEN items in CWF scope, (2) the first measurement round of `cwf-sota-definition-v1_5` completed. ADF items are OUT (they move to the ADF tool; listed at the end so nothing is lost). Sources: S132-S117-RECONCILIATION-v1, S132-CHECKLIST-UPDATE-v1, cwf-implementation-order-S124-v33, cwf-sota-definition-v1_5, SOTA-SCOREBOARD-S132-1-AG4-report, MA-RERUN-3 v1 report, OWNER-WITNESS-S132-GI-101-1. Status is MEASURED unless marked (carried). "Who" uses the three lanes + owner; nothing here is a menu — the ORDER column is the order.

## 0 · DONE TODAY (so they are not re-listed as open)

| item | evidence |
|---|---|
| yaprak_gate reached — seven internal keys turned; GI-101 CLOSED@evidence | OWNER-RULING-S132-GI-101-CLOSED-1 + production screen |
| Both scoreboards measured, not carried: (A) 7/7 · (B) 0/16 | SOTA-SCOREBOARD-S132-1-AG4-report |
| Measurement runner path lawful (CI + read-only parity key) | OWNER-RULING-S132-MEASUREMENT-RUNNER-IS-CWF-1, CARD v3 in flight |

## 1 · CWF OPEN ITEMS — half one of the gate ("zero open in CWF scope")

| # | item | what closes it | who | order | status |
|---|---|---|---|---|---|
| 1.1 | **MA-RERUN-3** — the one measured internal row re-measured under the current instrument; fresh baseline, both numerators | `docs/replay/ma-gate-rerun3-S132-v1.md` landed + `cwf-sota-definition-v1_6` amendment (S82 row retired as event-expired) | AG-4 (CI runner) → Architect landing card → owner approval → Architect v1_6 | 1 | IN FLIGHT (card v3, 09:46Z) |
| 1.2 | **PI-001** — consumption arm of the artifact-name store (kept OPEN as its own item by today's ruling) | a reading of the ledger row against the code at master; CLOSED@evidence or one card | AG-4 (read) + Architect | 2 | OPEN, unread since S111 |
| 1.3 | **F-S117-CLARIFY-CHILD-LAYER-FALSE-EMPTY-1** — "KB7 OEE" false-empty repro (SOTA-bound: clarification gate) | re-issue `KB7 OEE` in production, read the trace by the bucket's LOG-COORDS method; CLOSED@evidence if the layer-scope build fixed it, else one product card | AG-4 (trace read) — witness by the owner's screen optional | 3 | OPEN, never re-measured |
| 1.4 | **F-S132-ASK-RENDERED-TWICE-BILINGUAL-1** — the ask bubble prints TR + EN copies | one small product card (turn-language / render seam), trace of today's witness turn as premise | AG-4 | 4 | OPEN, found today |
| 1.5 | **F-S130-TEST-SUITE-WRITES-GROUND-DOC-1** — test run dirties `docs/ground/authority-conformance.latest.md` in the owner's clone | one card: the test must not write a ground doc | AG-4 | 5 | OPEN (measured at S132 open) |
| 1.6 | **Census cadence** — `docs/ground/census.latest.json` 13 days stale (60-min bound) | a measurement runner (same CWF classification as 1.1) or an explicit "census is ADF" ruling; until then no card may make it a premise | Architect ruling → AG-4 | 6 | OPEN, 15 sessions |
| 1.7 | **VECTOR-QOS before any engine switch** (owner verbatim) | whether it landed first is a measurement OWED; then the ledger row | AG-4 (read) | 7 | OPEN (carried) |
| 1.8 | **#81 BACKEND-DISCOVERY-1** | ordinary build card after 1.1–1.6 | AG-4 | 8 | OPEN (carried, untouched) |
| 1.9 | **#82b Design-RAG** — "ASLA UNUTMA" | PARKED by owner; leaves the list only by the owner's word | owner | — | PARKED |
| 1.10 | **Kademe 4 H9 deploy verification · H10 dispatch half** | classification reading first (CWF or ADF), then card or move | Architect | 9 | CARRIED-UNVERIFIED |
| 1.11 | **65-row repo ledger CWF-scope triage** — which of the 65 `docs/ground/open-items.md` rows are CWF | one AG-4 read card producing the CWF/ADF split by row; ledger WRITE stays frozen, the split lives in the box | AG-4 | 10 | OPEN — needed to prove "zero" honestly |

## 2 · MEASUREMENT PRECONDITIONS — what must exist before round one can run (§6 + the seven first-run needs + owner package)

| # | item | what closes it | who | order | status |
|---|---|---|---|---|---|
| 2.1 | A3 — Operator's two rows: `backends` identity + `mcp_global_settings` server row | one Operator prompt (Gemini), rows read back | Architect (prompt) → Gemini | 11 | UNBLOCKED since v32, not done |
| 2.2 | A1 — long-lived public HTTPS host for `a2a/server.ts` (Dockerfile.a2a exists; no deploy workflow at master) | owner vendor call + spend; then one AG-4 deploy card (CWF, as a measurement runner) | owner → AG-4 | 12 | OPEN (S123 floor measured) |
| 2.3 | A2 — credential set `A2A_TRIGGER_SECRET` · `A2A_ACTOR_USER_ID` (real uuid) · `A2A_CARD_URL` + ARMES key ROTATION (v124 §5) | owner hand, env/repo-secret only; names verified by a lane, never values | owner | 12 | OPEN |
| 2.4 | A4 — honestbench public endpoint (+ the repo went PRIVATE per S125; republish decision) | owner decision; then one AG-4 publish card | owner → AG-4 | 12 | OPEN — 0 of 5 modes scored |
| 2.5 | A5 — spend authorisation per round, using BENCH-SMOKE-1 METERED actuals (not the estimate) | owner word per round; BENCH-SMOKE-1's metered figures are still FIXTURE (scoreboard report) → one AG-4 metering run first | AG-4 (metering) → owner | 13 | OPEN |
| 2.6 | Reset precondition — service client on target + session holding `LEARNING_MANAGE` | part of 2.2's deploy card | AG-4 | 12 | OPEN (capability defined in code) |
| 2.7 | Registry credential if the image route is taken | owner, if 2.2 chooses the image route | owner | 12 | NOT-READ |
| 2.8 | Synthetic injector pause ruling for the run window | owner word | owner | 13 | OPEN |
| 2.9 | **WEB-VALVE-1** (F2's subject) | build card + its criterion named in the card | AG-4 | 14 | NOT STARTED (dropped item, restored by name) |
| 2.10 | **RAG lane finish / F1 LLM-scan retrieval baseline** ("KRİTİK") | user-eye finish definition + governed baseline run | Architect (definition) → AG-4 | 14 | NOT STARTED (only a reach-probe exists) |
| 2.11 | **B-FRONTIER-PAIRING-1** (equal-cost bare model, R5) | build card | AG-4 | 15 | NOT STARTED |
| 2.12 | **GOLDEN-SET-REPLAYABILITY-1** (K3 precondition of round one) | build card | AG-4 | 15 | NOT STARTED |
| 2.13 | **EVAL-SPLIT-LAW + first measurement round law** | Architect writes the law text; lane lands it | Architect → AG-4 | 15 | NOT STARTED |
| 2.14 | **OPA-POLICY-1** + FAULT-SWITCH-0 (D-OPA-2 parity, D-OPA-3 fail-closed) | build cards; recon reports only at master | AG-4 (+ Gemini for any policy rows) | 16 | RECON ONLY |
| 2.15 | FAILURE-LESSON-MEMORY-1 · SILENT-FINISH | product cards behind the measurement furniture; SILENT-FINISH may be absorbed by turnLanguage work — UNMEASURED | AG-4 | 17 | NOT STARTED |
| 2.16 | Scout as Adversary on every Architect card (owner's design, S132) | from the next card: scout review row before the AG-4 row | Architect + scout | standing | ADOPTED, first use pending |

## 3 · THE MEASUREMENT ROUND — half two of the gate (sixteen external criteria, R3 thresholds binding)

| # | criterion | tier | threshold | blocked by | status at master |
|---|---|---|---|---|---|
| 3.1 | τ²-bench | A | ≥ published median | 2.2–2.5 | ÖLÇÜLMEDİ |
| 3.2 | Gaia2 | A | ≥ median | 2.2–2.5 | ÖLÇÜLMEDİ |
| 3.3 | MCP-Bench score | B | ≥ median | 2.1, 2.2–2.5 | ÖLÇÜLMEDİ |
| 3.4 | MCP-Bench zero-code mount | B | mount with ZERO code change (ADR-009 falsifier) | 2.1 | ÖLÇÜLMEDİ — mount never executed |
| 3.5 | MCP-Universe zero-code mount | B | same | 2.1 | ÖLÇÜLMEDİ |
| 3.6 | LongMemEval (abstention) | C | abstention top quartile; overall ≥ median | 2.2–2.5 | ÖLÇÜLMEDİ |
| 3.7 | Mem2ActBench | C | ≥ median | 2.2–2.5 | ÖLÇÜLMEDİ |
| 3.8 | ToolComp (process) | C | ≥ median on process score | 2.2–2.5 | ÖLÇÜLMEDİ |
| 3.9 | API-Bank | C | ≥ median (expiry 2026-11-03 — the nearest) | 2.2–2.5 | ÖLÇÜLMEDİ |
| 3.10 | MCP-SafetyBench | D | TOP DECILE (leadership claim) | 2.14 for the OPA legs; 2.2–2.5 | ÖLÇÜLMEDİ |
| 3.11 | MT-AgentRisk | D | top quartile | same | ÖLÇÜLMEDİ |
| 3.12 | Agent-SafetyBench | D | ≥ top quartile (expiry 2026-12-03) | same | ÖLÇÜLMEDİ |
| 3.13 | F1 BrowseComp-Plus | F | overall ≥ median; citation accuracy top quartile | 2.10 | ÖLÇÜLMEDİ |
| 3.14 | F2 DeepScholar-Bench | F | overall ≥ median; verifiability top quartile | 2.9 | ÖLÇÜLMEDİ |
| 3.15 | mcp-honestbench C2/C3 round (four adversary modes, scoring authored before results) | E | published, stranger-runnable | 2.4 | instrument BUILT, 0/5 modes scored |
| 3.16 | B-FRONTIER baseline at equal cost | — | mandatory comparison member | 2.11 | ÖLÇÜLMEDİ |
| 3.17 | Cost per full round, METERED | — | replaces the Architect estimate (R4) | 2.5 | FIXTURE only |
| 3.18 | D-OPA-2 parity 100 % · D-OPA-3 fail-closed 100 % (internal) | D | as ruled R10 | 2.14 | ÖLÇÜLMEDİ from birth |
| 3.19 | Internal M-A row (the S82 row) | internal | event-based expiry | 1.1 | EXPIRED → fresh baseline in flight |

Budget clause stands: money decides how many criteria are measured in a round, never what counts as measured; an unfunded criterion stays ÖLÇÜLMEDİ, never shrunk.

## 4 · CLOSE-OF-SESSION DEBT (Architect, no lane)

| # | item |
|---|---|
| 4.1 | CWF-S132-SESSION-CLOSE-v1 · CWF-BOOTSTRAP-v133 (drops the stale ⓵ line; carries GI-101 closed, the rulings, this TODO) |
| 4.2 | cwf-sota-definition-v1_6 (after 1.1 lands) |
| 4.3 | ADF-REQUIREMENTS-FROM-CWF-1 (OWNER-RULING-S132-ADF-SPLIT-FROM-MEASURED-DEFECTS-1) |
| 4.4 | ARCHITECT-CARD-TEMPLATE-v3 — credential-classification rule (by capability, never by intent), archive push fences by path+ancestry, scout-review row first |
| 4.5 | Project box instructions v5_9 — §0 seed v3, §9 rewrite from S132 measurements, cinekop_gate redefinition |
| 4.6 | Archive push of the S132 commits (documents repo is four commits ahead of origin) — ORDER on the next AG-5 card |

## 5 · OUT OF THE GATE — ADF, frozen, moving to the ADF tool (named so nothing is lost)

CARD_GATE re-arm · silence declaration read path (F-S118) and write path (F-S132-SILENT-UNTIL) · dead-backlog inheritance (F-S132-TAKEN-OVER-ADDRESS) · producer boot stale sentences (F-S131 ×2) · archive-push tip fence (F-S132) · the three S117 holes (REF-READING · UPDATE-BRANCH · ROUTE-DERIVE) · FOREMAN-DRAINING-RESOLVE-GAP · S116-DRAIN-TAIL · CLOSE-SHUTDOWN-NOT-WRITTEN · REWRITE-ORPHANS-STAMP · JEST-DOM-SETUP-GAP · ARCHITECT-WATCH-STALE-VERDICTS · LANDING-COUNT-WATCHES-MASTER · WATERMARK-MOVED-BY-WRITELANE · RELAY-INBOX-MIGRATION-DRIFT · GATE-1 ⓶ ⓸ ⓺ ⓻ · ADF exit test 6/6 · ledger item E (register v122 / KB v118 / bucket v57) · ADF-ARCHITECTURE-v2 landing (H2 open) · 14 foreman report branches · authorship-lens-2 SUPERSEDED reading · budget-fence warning-subscriber gap (owner surface, not ADF but not CWF either — carried by name).

TAIL ANCHOR: S132-CINEKOP-TODO-v1 ends here.
