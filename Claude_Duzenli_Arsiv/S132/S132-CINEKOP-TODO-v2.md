# S132-CINEKOP-TODO-v2 — the same CWF list, re-sorted into the owner's four categories, plus the two the four cannot hold

Written WHOLE at 2026-09-07T11:25Z (14:25 TSİ), by the owner's request ("1) fiziksel olarak eksik fonksiyonaliteler 2) eksik dokümantasyon 3) testler 4) benchmark testleri … eksik varsa ekle"). Supersedes nothing: v1 (09:55Z) stays as the ordered source; v2 is the SAME set of items re-cut by category, with today's additions since 09:55Z appended by name. Item numbers in brackets are v1's. Status is as measured today unless marked (carried). ADF-frozen items remain in v1 §5 and are not repeated.

## The owner's four, and what they could not hold

The four categories cover 22 of the 34 open CWF items. Twelve items are neither code, docs, tests nor benchmarks — they are (5) DECISIONS, SECRETS and SPEND that only the owner or the Operator can supply, and (6) EVIDENCE READS: measurements of the product as it stands, which produce a CLOSED@evidence or a card, and are not tests because they run once against production, not on every push. Both are added below as categories 5 and 6; without them the list would silently drop the very items that block the benchmark round.

## 1 · PHYSICALLY MISSING FUNCTIONALITY (product code that does not exist or is wrong at master)

| # | item | v1 | state | next move |
|---|---|---|---|---|
| 1.1 | **WEB-VALVE-1** — governed, SSRF-guarded `web_fetch` with citation-bearing output, closed by default | 2.9 | CARD ON BUS (v1, 11:00Z) — HELD pending the scout's adversary verdict | scout verdict → release or v2 → AG-4 builds → landing card + owner approval |
| 1.2 | **WEB-VALVE-2** — `web_search` behind a provider key (NEW today, split from 1.1) | — | NOT STARTED; needs one repo/env secret from the owner (category 5) | card after 1.1 lands |
| 1.3 | **RAG lane finish / F1 retrieval baseline** — user-eye finish + governed baseline run | 2.10 | NOT STARTED (reach-probe only) | Architect writes the finish definition → build card |
| 1.4 | **B-FRONTIER-PAIRING-1** — equal-cost bare-model comparison member (R5) | 2.11 | NOT STARTED | build card |
| 1.5 | **GOLDEN-SET-REPLAYABILITY-1** — K3 precondition of round one | 2.12 | NOT STARTED | build card |
| 1.6 | **OPA-POLICY-1 + FAULT-SWITCH-0** — D-OPA-2 parity, D-OPA-3 fail-closed | 2.14 | RECON ONLY at master | build cards (+ Operator rows if policy tables) |
| 1.7 | **FAILURE-LESSON-MEMORY-1** | 2.15 | NOT STARTED | product card |
| 1.8 | **SILENT-FINISH** — may be absorbed by turnLanguage work | 2.15 | UNMEASURED | evidence read first (category 6), then card or CLOSED |
| 1.9 | **F-S132-ASK-RENDERED-TWICE-BILINGUAL-1** — ask bubble prints TR + EN copies | 1.4 | OPEN, witnessed today | one small render-seam card |
| 1.10 | **#81 BACKEND-DISCOVERY-1** | 1.8 | OPEN (carried, untouched) | ordinary build card |
| 1.11 | **A1 deploy workflow** for `a2a/server.ts` — Dockerfile exists, no deploy workflow | 2.2 | OPEN; blocked by the owner's vendor call (5.2) | AG-4 deploy card as a measurement runner, after 5.2 |
| 1.12 | **Reset precondition** — service client on target + `LEARNING_MANAGE` session | 2.6 | capability defined in code, deploy half missing | part of 1.11 |
| 1.13 | **Census cadence runner** — `census.latest.json` 13 days stale vs 60-min bound | 1.6 | OPEN, 15 sessions | Architect ruling (CWF runner or ADF) → workflow_dispatch card |
| 1.14 | **MA-RERUN measurement runner** `.github/workflows/ma-rerun.yml` (the CI instrument itself) | 1.1 | CARD v4 ON BUS, consumed 10:42Z | AG-4 report → landing card |
| 1.15 | **honestbench publish endpoint** (repo private since S125) | 2.4 | 0/5 modes scored; blocked by 5.4 | publish card after the owner's republish decision |
| 1.16 | **BENCH-SMOKE-1 metering run** — metered actuals instead of fixture | 2.5 | FIXTURE only | one AG-4 metering run |
| 1.17 | **Kademe 4 H9 deploy verification · H10 dispatch half** | 1.10 | CARRIED-UNVERIFIED | classification read (category 6) first |
| 1.18 | **#82b Design-RAG** | 1.9 | PARKED by the owner ("ASLA UNUTMA") | leaves only by the owner's word |

## 2 · MISSING DOCUMENTATION (law text, definitions, session carriers — Architect-authored)

| # | item | v1 | state | next move |
|---|---|---|---|---|
| 2.1 | **EVAL-SPLIT-LAW + first-measurement-round law** | 2.13 | NOT WRITTEN | Architect writes; lane lands under docs/laws/ |
| 2.2 | **cwf-sota-definition-v1_6** — S82 row retired as event-expired, fresh baseline row | 4.2 | waits on 1.14's report | Architect |
| 2.3 | **ARCHITECT-CARD-TEMPLATE-v3** — credential-by-capability rule · path+ancestry archive fence · scout-review header `adversary:` + CP-12 refusal (A-REC-S132-5) | 4.4 | OWED, sharpened today | Architect |
| 2.4 | **Project box instructions v5_9** — §0 seed v3, §9 rewrite from S132 measurements, cinekop_gate redefinition | 4.5 | OWED | Architect |
| 2.5 | **CWF-S132-SESSION-CLOSE-v1 + CWF-BOOTSTRAP-v133** | 4.1 | OWED at close | Architect |
| 2.6 | **ADF-REQUIREMENTS-FROM-CWF-1** — the ADF split starts from measured defects (owner ruling) | 4.3 | OWED | Architect |
| 2.7 | **RAG-lane finish definition** (the prose half of 1.3) | 2.10 | NOT WRITTEN | Architect |
| 2.8 | **Ledger CWF/ADF split** — which of the 65 `open-items.md` rows are CWF; ledger write frozen, the split lives in the box | 1.11 | OPEN — needed to prove "zero open" honestly | AG-4 read card → box doc |
| 2.9 | **Archive push** — documents repo 8 commits ahead of origin (measured after commit 4de9994) | 4.6 | OWED | order on the next AG-5 card, fenced by path+ancestry |

## 3 · TESTS (automated, run on every push — missing or defective)

| # | item | v1 | state | next move |
|---|---|---|---|---|
| 3.1 | **F-S130-TEST-SUITE-WRITES-GROUND-DOC-1** — `npm test` dirties `docs/ground/authority-conformance.latest.md` | 1.5 | OPEN, measured at S132 open; the foreman named it again today | one card: a test never writes a ground doc |
| 3.2 | **Local relay-corpus runner** `npm run relay:audit -- <file>` — the CI gate's verdict via `auditText` before push (F-S132-GATE-VERDICT-AVAILABLE-LOCALLY-1, NEW today) | — | three report PRs reddened on the same three rules on first push | small hygiene card |
| 3.3 | **WEB-VALVE-1's eight offline tests** (valve 0/1, ssrf-blocked, truncation+sha, HTML extraction, empty≠zero, unsupported content, timeout, SSOT/containment) | 2.9 | in the card, unbuilt | part of 1.1 |
| 3.4 | **D-OPA-2 parity 100 % · D-OPA-3 fail-closed 100 %** as internal tests | 3.18 | ÖLÇÜLMEDİ from birth | part of 1.6 |
| 3.5 | **Stage-11 containment regression** when `LOCAL_TOOL_NAMES` grows | — | asked of the scout in the adversary card | named by the scout, built with 1.1 |

## 4 · BENCHMARK TESTS (the sixteen external criteria + the round's furniture — R3 thresholds binding)

| # | criterion | tier | threshold | blocked by | status |
|---|---|---|---|---|---|
| 4.1 | τ²-bench | A | ≥ published median | 5.2–5.5 | ÖLÇÜLMEDİ |
| 4.2 | Gaia2 | A | ≥ median | 5.2–5.5 | ÖLÇÜLMEDİ |
| 4.3 | MCP-Bench score | B | ≥ median | 5.1, 5.2–5.5 | ÖLÇÜLMEDİ |
| 4.4 | MCP-Bench zero-code mount | B | ZERO code change (ADR-009 falsifier) | 5.1 | ÖLÇÜLMEDİ — mount never executed |
| 4.5 | MCP-Universe zero-code mount | B | same | 5.1 | ÖLÇÜLMEDİ |
| 4.6 | LongMemEval (abstention) | C | abstention top quartile; overall ≥ median | 5.2–5.5 | ÖLÇÜLMEDİ |
| 4.7 | Mem2ActBench | C | ≥ median | 5.2–5.5 | ÖLÇÜLMEDİ |
| 4.8 | ToolComp (process) | C | ≥ median | 5.2–5.5 | ÖLÇÜLMEDİ |
| 4.9 | API-Bank | C | ≥ median — expiry 2026-11-03, the nearest | 5.2–5.5 | ÖLÇÜLMEDİ |
| 4.10 | MCP-SafetyBench | D | TOP DECILE | 1.6, 5.2–5.5 | ÖLÇÜLMEDİ |
| 4.11 | MT-AgentRisk | D | top quartile | same | ÖLÇÜLMEDİ |
| 4.12 | Agent-SafetyBench | D | ≥ top quartile — expiry 2026-12-03 | same | ÖLÇÜLMEDİ |
| 4.13 | F1 BrowseComp-Plus | F | overall ≥ median; citation accuracy top quartile | 1.3 | ÖLÇÜLMEDİ |
| 4.14 | F2 DeepScholar-Bench | F | overall ≥ median; verifiability top quartile | 1.1 (+1.2) | ÖLÇÜLMEDİ |
| 4.15 | mcp-honestbench C2/C3 round — four adversary modes, scoring authored before results | E | published, stranger-runnable | 1.15, 5.4 | instrument BUILT, 0/5 scored |
| 4.16 | B-FRONTIER baseline at equal cost | — | mandatory comparison member | 1.4 | ÖLÇÜLMEDİ |
| 4.17 | Cost per full round, METERED | — | replaces the estimate (R4) | 1.16, 5.5 | FIXTURE only |
| 4.18 | Internal M-A row (S82) — fresh baseline | int | event-based expiry | 1.14 | EXPIRED → rerun in flight |

Budget clause stands: money decides how many criteria a round measures, never what counts as measured.

## 5 · OWNER / OPERATOR SURFACE (decisions, secrets, spend, real-world witness — added category)

| # | item | v1 | who | state |
|---|---|---|---|---|
| 5.1 | A3 — Operator's two rows: `backends` identity + `mcp_global_settings` server row | 2.1 | Architect prompt → Gemini Operator | UNBLOCKED since v32, not done — the ONLY item here a machine lane executes |
| 5.2 | A1 — vendor call + spend for the long-lived HTTPS host | 2.2 | owner | OPEN (S123 floor measured) |
| 5.3 | A2 — `A2A_TRIGGER_SECRET` · `A2A_ACTOR_USER_ID` · `A2A_CARD_URL` + ARMES key rotation; registry credential if the image route | 2.3, 2.7 | owner (values), lane verifies names only | OPEN |
| 5.4 | A4 — honestbench republish decision (repo went private) | 2.4 | owner | OPEN |
| 5.5 | A5 — spend authorisation per round from METERED actuals | 2.5 | owner, after 1.16 | OPEN |
| 5.6 | Synthetic injector pause ruling for the run window | 2.8 | owner | OPEN |
| 5.7 | Web-search provider key for WEB-VALVE-2 (NEW) | — | owner, repo/env secret | not yet asked; asked once 1.1 lands |
| 5.8 | Census classification ruling — CWF measurement runner or ADF | 1.6 | owner ruling (Architect proposes the single path: CWF runner) | OPEN |
| 5.9 | Named landing approvals — MA-RERUN-3 PR, WEB-VALVE-1 PR (each a master push, S102 spend clause) | — | owner | pending the reports |

The package 5.2–5.6 is asked TOGETHER, once, when the first external criterion is executable — the S132 checklist's design; not before.

## 6 · EVIDENCE READS (one-time measurements of the product that yield CLOSED@evidence or a card — added category)

| # | item | v1 | who | state |
|---|---|---|---|---|
| 6.1 | **PI-001** — artifact-name store consumption arm vs the code at master | 1.2 | AG-4 read + Architect | OPEN, unread since S111 |
| 6.2 | **KB7 OEE false-empty repro** (F-S117-CLARIFY-CHILD-LAYER-FALSE-EMPTY-1) — re-issue in production, read the trace by LOG-COORDS | 1.3 | AG-4 trace read; owner screen optional | OPEN, never re-measured |
| 6.3 | **VECTOR-QOS before engine switch** — `vector.engine` has been `qdrant` (published) since 2026-08-17; whether the QoS read preceded the switch is OWED, and the read itself | 1.7 | AG-4 read | OPEN — finding today: the switch appears to have preceded the read; to be measured, not asserted |
| 6.4 | **SILENT-FINISH absorbed by turnLanguage?** | 2.15 | AG-4 read | UNMEASURED |
| 6.5 | **Kademe 4 H9/H10 classification** (CWF or ADF) | 1.10 | Architect read | CARRIED-UNVERIFIED |
| 6.6 | **MA-RERUN-3 fresh baseline** — the run and its analysis (the evidence half of 1.14) | 1.1 | AG-4 via CI | IN FLIGHT |
| 6.7 | **Panel publish path for a new registry key** — can the owner publish `web.enabled=1` without a panel change | — | scout (adversary card B.5) | asked today |

## Count, so "zero open" can be measured later

Category 1: 18 · Category 2: 9 · Category 3: 5 · Category 4: 18 rows (16 criteria + 2 furniture) · Category 5: 9 · Category 6: 7. Overlaps are by design (a criterion in 4 is blocked by items in 1/5; a card in 1 carries tests in 3) and are cross-referenced by number, never double-counted in the gate: the gate's first half counts categories 1·2·3·6 to zero; its second half is category 4 with category 5 as its precondition.

TAIL ANCHOR: S132-CINEKOP-TODO-v2 ends here.
