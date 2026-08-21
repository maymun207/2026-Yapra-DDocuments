# CWF / EAIP — SOTA DEFINITION & ACCEPTANCE CONTRACT · v1_5

<!-- cwf-sota-definition-v1_4 · rev 5 · 2026-08-04 · S82 · Architect: Claude (Opus 5).
     STATUS: **BINDING**. Amends v1_3 (rev 4, 2026-08-03). v1 … v1_3 are archive.
     v1_4 does ONE thing: it retires §10's STALE internal row and replaces it with a
     MEASURED value — the first criterion in this contract to move by evidence.
     Runner MA-RERUN-2, merged b0e8c9e2, 2026-08-04. Every figure below was copied
     from the committed report docs/replay/ma-gate-rerun2-S82-v1.md, never retyped
     from a summary (D-3 COMPUTED-NOT-ASSERTED).
     NOTHING ELSE CHANGES: the criteria, thresholds, tiers, comparison set, R1–R9
     rulings and the budget clause are byte-identical to v1_3.

     v1_5 · 2026-08-04 · S82 · adds R10: OPA-POLICY-1 enters v1 scope by owner ruling
     and, per the §1 symmetry clause, ARRIVES WITH ITS CRITERION rather than as an
     exemption. Owner's words: "Ölçmediğin hiçbir şey var değildir." -->

---

## §0 · WHY THIS DOCUMENT EXISTS

> **v1 is either SOTA or it is worthless.** Effort spent on anything that does not
> advance a SOTA criterion is wasted effort. *(owner, S80)*

That position is only enforceable if "SOTA" is a **falsifiable predicate**. It was not —
it lived as prose across three documents, with no comparison set, no thresholds, no
measurement dates and no expiry, so the argument recurred every few sessions and was
settled by rhetoric instead of evidence.

**This file is the only acceptance criterion for v1.** Anything not traceable to a
criterion here is out of v1 scope.

**The core design decision:** the comparison set is **published external benchmarks**,
not axes the Architect invented. A criterion CWF grades itself on is not a SOTA
criterion — it is a self-portrait.

---

## §1 · SOTA-1 — THE STANDING RULE (binding on the Architect)

**Türkçe (sahibin çağırdığı hâli):**

> **SOTA-1.** v1'in tek kabul ölçütü `cwf-sota-definition-v1`'dir. Architect, bir
> SOTA ölçütünü ilerleten hiçbir kalemi *"şimdilik gerek yok / trafik az / bu
> kadarı yeter / sonra / v1.1'e kalsın"* gerekçeleriyle erteleyemez, küçültemez,
> sıradan geri atamaz. Architect'in koruduğu **tek** itiraz sınıfı: *"bu sıralama
> SOTA'yı kanıtlanamaz kılıyor"* — ve bu itiraz ancak **(a)** hangi ölçütün
> kanıtsız kalacağını adıyla, **(b)** hangi tarihte kanıtlanır hâle geleceğini,
> **(c)** bunu hangi ölçümün çözdüğünü **yazarak** yapılabilir. Bu üç maddeyi
> taşımayan her erteleme önerisi **SOTA-1 ihlalidir**; sahip adıyla iptal eder,
> Architect öneriyi geri çeker. Bir ölçüt yalnızca **kanıtla** emekliye ayrılır.

**English (the operative text):**

> **SOTA-1.** The sole acceptance criterion for v1 is `cwf-sota-definition-v1`. The
> Architect may not defer, shrink or re-order-down any item that advances a SOTA
> criterion on the grounds of *"not needed yet / low traffic / this is enough for now /
> later / push to v1.1"*. The **only** objection class the Architect retains is
> *"this ordering makes SOTA unprovable"* — admissible only when it names **(a)** which
> criterion would go unproven, **(b)** the date it becomes provable, and **(c)** which
> measurement resolves it, **in writing**. Any deferral proposal missing those three is a
> **SOTA-1 violation**; the owner cancels it by name and the Architect withdraws it.
> A criterion is retired **only by evidence**, never by convenience.

**Owner's invocation phrase:** "SOTA-1 ihlali." The Architect then either supplies
(a)+(b)+(c) in the same message or withdraws the proposal. No third option.

**Positive control (S66-1):** the Architect restates SOTA-1 **verbatim** in the first
message of every session. Its absence is the owner's signal that the session booted
wrong — detectable in message one, not message fifty.

**Symmetry clause (v1_1).** SOTA-1 binds the *Architect*, not the criteria. When an item
advances **no** criterion, saying so is not a deferral and not a violation — it is the
§9/R6 column doing its job. The Architect must surface such verdicts, including for items
the owner previously ratified, and must never quietly exempt one. The owner then rules:
drop it, name it a prerequisite, or **add the criterion it serves**. Exempting an item is
forbidden; adding a criterion for it is legitimate — because the criterion then has to be
measured too. **Both rulings taken at S80 (R7, R9) used the add-a-criterion route.**

**Budget clause (v1_3).** A budget is not a criterion and may never edit one. Money
decides **how many** criteria get measured this round; it never decides **what counts as
measured**. See R4.

---

## §2 · WHAT "SOTA" MEANS IN THIS PROJECT

| # | Condition | Why |
|---|---|---|
| **C1** | **Measured, not argued.** Every criterion has a number produced by a named runner on a named date. | S62-2: an undefined capability can only be patched, never evaluated. |
| **C2** | **External and published.** A third-party benchmark, or one CWF has published for others to run against it. | A self-authored, self-run, unpublished metric is a self-portrait. |
| **C3** | **Reproducible by a stranger.** Fresh state, pinned versions, published harness. | AgentBeats' reproducibility rule; RULE-25 applied outward. |
| **C4** | **Dated and expiring.** Every criterion carries an expiry, past which it is *stale* until re-measured. | Three of the S64 "we arrived earlier" claims were already convergent by March 2026. |

---

## §3 · THE CRITERIA

All TIER A–F values are **ÖLÇÜLMEDİ / NOT MEASURED** as of 2026-08-04 — no external
criterion has moved. Thresholds are **RATIFIED** (R3) and are binding targets. The one
criterion that HAS moved is internal and lives in §10; C2 applies to it in full, so it is
not evidence of SOTA and is never quoted as such.

### TIER A — Conversational agent under policy

| Benchmark | Measures | Maps to | Threshold | Expiry |
|---|---|---|---|---|
| **τ²-bench** (Sierra, Jun 2025) | Dual-control conversation with a simulated user; domain API tools **plus policy guidelines**. | The whole turn pipeline: policy adherence + tool use + clarification. CWF's shape, in someone else's domain. | ≥ published median, retail split | 2027-02-03 |
| **Gaia2** (Meta, Sep 2025) | Dynamic asynchronous environments; explicitly requires handling **ambiguities**, noise, temporal constraints. | The clarification gate — the external instrument for the epistemic/aleatoric distinction. | ≥ published median | 2027-02-03 |

### TIER B — MCP-native (tests the reusability claim for real)

| Benchmark | Measures | Maps to | Threshold | Expiry |
|---|---|---|---|---|
| **MCP-Bench** (Accenture, Aug 2025) | 28 MCP servers, 250 tools; multi-step cross-tool coordination. | `backend identity is DATA` + tenant-zero. | **Zero-code mount** + score ≥ median | 2027-02-03 |
| **MCP-Universe** (Salesforce, Aug 2025) | 11 real MCP servers, 6 domains. | Independent second instance of the same test. | Zero-code mount | 2027-02-03 |

**Load-bearing beyond the score:** a mount needing a code change falsifies ADR-009 /
backend-identity-is-data on the spot. **Pass/fail of the mount is the stronger result.**

### TIER C — Named CWF gaps

| Benchmark | Measures | Maps to | Threshold | Expiry |
|---|---|---|---|---|
| **LongMemEval** (Oct 2024) | Five memory abilities incl. **abstention**. | MEMORY-1. Abstention is empty≠zero in memory form. | Abstention ≥ **top quartile**; overall ≥ median | 2027-02-03 |
| **Mem2ActBench** (Jan 2026) | Proactive use of long-term memory to execute tool actions. | MEMORY-1's retrieval→action path. | ≥ median | 2027-02-03 |
| **ToolComp** (Jan 2025) | Multi-step tool reasoning with **process-supervision labels**. | The stage-span tree — the instrument that pays for inspectable intermediate steps. | ≥ median on process score | 2027-02-03 |
| **API-Bank** (Apr 2023) | Planning, retrieving and calling APIs over 73 tools. | Routing / Recall@k. | ≥ median | 2026-11-03 |

### TIER D — Safety & security (nearest neighbours to CWF's leading axis)

**From `OPA-POLICY-1` (rollout 2D.5) onward, the policy layer these three benchmarks
attack IS OPA.** The owner ruled OPA into v1 scope even under a single-tenant
architecture (S82), and the §1 symmetry clause forbids exempting it — so it enters with a
criterion, in three legs, ratified S82:

| Leg | What is measured | Instrument | Threshold |
|---|---|---|---|
| **D-OPA-1 · external** | attack success rate against the policy layer | the three Tier D benchmarks below, run **after** the OPA swap | as per each row below — the swap may not degrade them |
| **D-OPA-2 · internal parity** | every OPA decision is **identical** to today's `gatewayPolicy` + F80 decision on the same input | deterministic parity run over the full annotation/category set | **100 %.** A divergence is a REGRESSION, never an improvement — this is a management-surface change, not a capability change |
| **D-OPA-3 · internal fail-closed** | when the policy read **fails**, the decision is **deny**, and the denial is observable | **`FAULT-SWITCH-0`** (rollout 2.3b) — the instrument that makes a governed read fail on demand | **100 % deny**, with a distinct, named record. Positive control: a healthy read renders the normal decision, present and explicit |

**Why D-OPA-3 exists and why it is not optional:** a fail-closed claim that cannot be made
to fail is an assumption. This project has three open bugs (006, 007, 009) whose fixes are
already in production and which cannot close for exactly that reason. OPA does not get to
repeat that shape.

**Eval-gate invariance is a precondition, not a criterion:** the gate's engine, stage
order and schema interpreter stay byte-identical. OPA changes where policy is *authored
and managed*, never how a publish is *decided*.


| Benchmark | Measures | Maps to | Threshold | Expiry |
|---|---|---|---|---|
| **MCP-SafetyBench** (Dec 2025) | 20 MCP attack types across server, host, user. | ADR-010, ADR-011, secrets-by-reference. | **Top decile** — a leadership claim | 2027-02-03 |
| **MT-AgentRisk** (Feb 2026) | Multi-turn tool-agent safety (+~16% attack success vs single-turn). | Multi-turn posture + write exclusion. | Top quartile | 2027-02-03 |
| **Agent-SafetyBench** (Dec 2024) | 8 risk categories, 10 failure modes, 2,000 cases. | Broad safety floor. | ≥ top quartile | 2026-12-03 |

### TIER E — The contributed benchmark

| Instrument | Measures | Status |
|---|---|---|
| **`mcp-honestbench`** (CWF-authored) | Agent behaviour against a **deliberately dishonest MCP backend**. | **In v1 scope (R2).** NOT BUILT. |

### TIER F — Retrieval & research over a corpus (R7, R9)

Added because the §1 symmetry clause forbids exempting an item: RAG and the web valve are
in v1 scope, so they get criteria and must be measured. Both instruments score
**citation/verifiability**, which is CWF's attribution axis — not a convenience mapping.

| Benchmark | Measures | Maps to | Threshold | Expiry |
|---|---|---|---|---|
| **F1 · BrowseComp-Plus** (Aug 2025) | Deep research over a **fixed curated document corpus**; controlled comparison of retrieval methods, **citation accuracy** and context engineering. | **The RAG lane.** A fixed customer corpus with retrieval + citation scoring is the enterprise-RAG analogue. | Overall ≥ median; **citation accuracy ≥ top quartile** | 2027-02-03 |
| **F2 · DeepScholar-Bench** (Aug 2025) | Live-web research synthesis producing long-form **cited** reports; scored on knowledge synthesis, retrieval quality and **verifiability**. | **WEB-VALVE-1.** A web valve whose output cannot be verified is worse than no valve. | Overall ≥ median; **verifiability ≥ top quartile** | 2027-02-03 |

**Why F1 matters beyond RAG (R9):** customer documents are the primary customer input. If
CWF cannot leverage them measurably, the platform's value proposition is unproven at its
most commercially load-bearing point. F1 turns that from an opinion into a number.

---

## §4 · THE COMPARISON SET

1. **B-FRONTIER — a plain frontier model with the same tools, no CWF.** Same benchmark,
   bare model, benchmark's own tools. **Runs at equal cost (R5).**
2. **B-LEADERBOARD — published entries** (τ²-bench, Terminal-Bench 2.0, AgentBeats live
   leaderboards). Public numbers, no permission needed.
3. **B-HARNESS — NVIDIA NOOA** (`NVIDIA-NeMo/labs-OO-Agents`, arXiv 2607.20709): the
   closest peer *claim* — a harness whose thesis is that harness capabilities, not the
   model, drive performance. **This is why "our harness is better" is not sayable without
   a number.**

---

## §5 · `mcp-honestbench` — THE CONTRIBUTED BENCHMARK (R2)

Across all 86 benchmarks in the RDI index, **none measures the axis CWF claims to lead.**
Safety benchmarks test whether the agent is *attacked*; τ²-bench tests whether it follows
a *policy*. **Nothing tests whether an agent notices its backend is lying,
under-reporting or unreadable — and presents that honestly instead of as fact.**

An AgentBeats **green agent** serving a controlled dishonest MCP backend. Four adversary
modes, each drawn from a failure CWF has **already observed in production**:

| Mode | The backend does | Correct behaviour | Live precedent |
|---|---|---|---|
| **M1 · silent-zero** | Returns `0` where the truth is *absent*. | Distinguish real-0 from missing. | HEAD-204: a failed count returning silent green. |
| **M2 · silent-truncation** | Returns first N rows, no signal. | State "first N of M" or refuse to aggregate. | PostgREST's 1000-row cap. |
| **M3 · declaration drift** | Advertises a schema it does not honour. | Trust observed behaviour over declaration. | ADR-010's founding observation. |
| **M4 · plausible fabrication** | Well-formed invented rows for an out-of-scope entity. | Attribute, scope-check, refuse to present as fact. | Granit Glazur3 all-zeros: CWF did not borrow another factory's data. |

Scored on **detection · attribution · non-presentation**, deterministically — no LLM
judge, consistent with ADR-001.

**The trap, stated before building:** a benchmark authored by the system it flatters is
worthless. It must ship with **at least one adversary mode CWF currently fails**, and its
scoring must be authored **before** CWF's results are known.

---

## §6 · WHAT MUST BE BUILT FOR CWF TO BE TESTABLE AT ALL

These three block **15 of 16 criteria** — no other item in the project unblocks anything
at that scale, which is why they lead the rollout plan.

| Item | What | Why not optional | Lane |
|---|---|---|---|
| **BENCH-A2A-1** | Expose CWF as an **A2A purple agent** (agent card, `--host/--port/--card-url` entrypoint, GHCR image). | AgentBeats is the only route to third-party-run, reproducible, published results (C2+C3). | AG |
| **BENCH-RESET-1** | Verified **fresh-state reset** per assessment: governed DB to the code reference, empty episodic memory, cold caches, `task_id`-namespaced. | AgentBeats mandates fresh state. CWF's reset target exists by construction — this exercises and proves it. **A capability most stateful agents cannot offer.** | AG + Operator |
| **BENCH-BACKEND-MOUNT-1** | Mount a benchmark's MCP servers as an ordinary backend, **zero code change**. | This *is* Tier B's test. | AG |

---

## §7 · KNOWN CONFOUNDS — declared before measuring

1. **Language.** CWF is Turkish-first; every benchmark is English. **Ruling: benchmarks
   run in English**; Turkish-specific claims need a separate instrument. A Turkish
   handicap is a finding, not an excuse.
2. **Domain lock.** Tier A/B/F run CWF outside its domain on purpose: a foundation that
   only works on ARMES is not a foundation.
3. **Cost.** See R4. Until `BENCH-SMOKE-1` reports metered actuals, every cost figure in
   this document is an **Architect estimate** and is labelled as such.
4. **Contamination.** Prefer refreshed/verified benchmark variants where they exist.
5. **The Architect cannot run any of this.** All of §6 is AG lane; spend is owner.

---

## §8 · LIFECYCLE

- **Measured:** value + runner + date + commit SHA in §10. Never asserted from memory (D-3).
- **Stale:** past expiry. A stale criterion may **not** be cited as evidence of SOTA.
- **Retired:** only by evidence. Never by convenience, cost, or scope pressure.
- **Added:** new criteria enter **by name**, additively (§1 symmetry clause).
- **Amended:** immutable once presented; changes ship as the next `v1_N`.

---

## §9 · RATIFICATION RECORD — owner, 2026-08-03

| # | Slot | Ruling |
|---|---|---|
| **R1** | Governance / trust / measurement axes count as v1 criteria? | **YES.** Carried by Tier D + §5. |
| **R2** | `mcp-honestbench` in v1 scope? | **YES.** |
| **R3** | §3 thresholds as proposed? | **YES.** Median for capability tiers; top-quartile/decile only where CWF claims leadership. |
| **R4** | Benchmark spend budget. | **CLOSED at v1_3.** (i) **2M tokens** for the §6 harness proof. (ii) **$10 per measurement round**, owner-set, explicitly provisional: *"şimdilik $10 yapalım görelim, ona göre artırırız."* (iii) **`BENCH-SMOKE-1` is hereby a COST-METERING INSTRUMENT** — it must report *metered* cost-per-task, tokens-in/out per task, and an extrapolated cost-per-full-round, per benchmark and per model. Those actuals **replace the Architect's estimate** in this document at the next amendment (D-3: the budget stops being a guess). (iv) Architect's current estimate, explicitly labelled an estimate pending (iii): one full §3 round with B-FRONTIER ≈ **400M tokens ≈ $100 on Flash-class**. (v) **Binding consequence (§1 budget clause, §8):** a criterion the budget does not cover stays **ÖLÇÜLMEDİ** in §10. It is never marked measured on a partial run, and the Architect never shrinks a criterion to fit a budget. **This document is the single source for the budget figure; no other artifact restates it.** |
| **R5** | B-FRONTIER at equal cost? | **YES.** |
| **R6** | Rollout-plan SOTA column? | **YES.** Ships in the rollout plan from v1_1 onward. |
| **R7** | `WEB-VALVE-1` — no criterion. Ruling? | **ADD THE CRITERION.** Tier F2 (DeepScholar-Bench). The item stays in v1 scope **and becomes measurable**. |
| **R8** | `RULE26-HARDEN-1` — no criterion. Ruling? | **To v1.1 (Blok 6).** Owner: *"boş beleş iş yapmanın kimseye faydası yok; işe yarayınca çalışmalı."* |
| **R10** | `OPA-POLICY-1` — owner ruled it into v1 scope **even single-tenant** (S82): *"policy'yi OPA üzerinden yönetilmesini istiyorum."* It advanced no criterion. Ruling? | **ADD THE CRITERION** — the R7/R9 route, third use. Three legs (§3 Tier D): external attack-success via the Tier D benchmarks · **D-OPA-2** 100 % decision parity with today's `gatewayPolicy`+F80 · **D-OPA-3** 100 % fail-closed under a **`FAULT-SWITCH-0`**-induced read failure. Owner's governing sentence, recorded verbatim as a standing principle: **"Ölçmediğin hiçbir şey var değildir."** |
| **R9** | RAG lane — no criterion. Ruling? | **ADD THE CRITERION — framing corrected by the owner:** *"bu ilerletiyorsa değil, ilerletMELİ; RAG temel müşteri girdisi, onu leverage edemiyorsak neyi leverage edeceğiz — KRİTİK."* Tier F1 (BrowseComp-Plus). **Architect's added finding:** the missing criterion was the symptom; the disease is that the RAG lane has run as a paused parallel lane with **no user-eye finish definition and no measurement** — an **S74-1 violation**. F1 supplies the criterion; the rollout plan supplies the finish definition (2B.1). |

---

## §10 · STATUS TABLE

| Criterion | Value | Runner | Date | SHA |
|---|---|---|---|---|
| τ²-bench | **ÖLÇÜLMEDİ** | — | — | — |
| Gaia2 | **ÖLÇÜLMEDİ** | — | — | — |
| MCP-Bench (score) | **ÖLÇÜLMEDİ** | — | — | — |
| MCP-Bench (zero-code mount) | **ÖLÇÜLMEDİ** | — | — | — |
| MCP-Universe (zero-code mount) | **ÖLÇÜLMEDİ** | — | — | — |
| LongMemEval (abstention) | **ÖLÇÜLMEDİ** | — | — | — |
| Mem2ActBench | **ÖLÇÜLMEDİ** | — | — | — |
| ToolComp (process) | **ÖLÇÜLMEDİ** | — | — | — |
| API-Bank | **ÖLÇÜLMEDİ** | — | — | — |
| MCP-SafetyBench | **ÖLÇÜLMEDİ** | — | — | — |
| MT-AgentRisk | **ÖLÇÜLMEDİ** | — | — | — |
| Agent-SafetyBench | **ÖLÇÜLMEDİ** | — | — | — |
| F1 · BrowseComp-Plus (citation accuracy) | **ÖLÇÜLMEDİ** | — | — | — |
| F2 · DeepScholar-Bench (verifiability) | **ÖLÇÜLMEDİ** | — | — | — |
| `mcp-honestbench` | **NOT BUILT** | — | — | — |
| B-FRONTIER baseline | **ÖLÇÜLMEDİ** | — | — | — |
| **Cost per full round (metered)** | **ÖLÇÜLMEDİ** — estimate only ($100, Flash-class) | `BENCH-SMOKE-1` | — | — |
| **Internal — gate block rate (M-A) · like-for-like, n = 2534** | **55.41 %** ask-rate (HIGH+ALT_D) · **37.02 %** (HIGH only) · entity-unresolved share of blocks **43.45 %** / **65.03 %** | `MA-RERUN-2` | 2026-08-04 | `b0e8c9e2` |
| **Internal — gate block rate (M-A) · whole corpus, n = 7227** | **38.63 %** ask-rate (HIGH+ALT_D) · **31.42 %** (HIGH only) · entity-unresolved share of blocks **62.14 %** / **76.40 %** | `MA-RERUN-2` | 2026-08-04 | `b0e8c9e2` |
| **D-OPA-2 · policy parity (internal)** | **ÖLÇÜLMEDİ** — target 100 % | — | — | — |
| **D-OPA-3 · fail-closed under induced read failure (internal)** | **ÖLÇÜLMEDİ** — target 100 % deny | — | — | — |

### §10.1 · The internal row — what it says, and the four things it does not

**Measured, and how.** An offline replay of the production clarification seam over the
whole frozen corpus (`--all`, window pinned `2026-08-04T11:38:21.647Z`, populations
counted `7071` synthetic + `167` telemetry, `truncated false` on both). The previous
value (85 % rounded from **84.61 %**, entity-unresolved **98.88 %**, n = 2534,
2026-07-25) was **STALE** and is now retired **by evidence**, per §8.

**(1) The like-for-like population was reconstructed by TIME, not by size.** Matching `n`
matches a count, not a population — disproven with figures at S81. The baseline
population was isolated by `createdAt <= T`; `T` was chosen by a rule authored **before
any rate was computed** (hourly sweep across 2026-07-25, minimise `|count(T) − 2534|`,
ties to the earlier `T`), landing on `13:00Z` with `d = 0.000 %` on an 11-hour plateau.

**(2) The baseline's own block definition is UNDETERMINED and is not recoverable.** In a
replay a count mismatch is confounded between *a different definition* and *a different
gate behaviour* — and the second is the thing being measured. **Both definitions are
therefore reported and neither is asserted**, which is why every cell above carries two
figures. A delta against the 2026-07-25 baseline inherits that uncertainty and must
carry it wherever it is quoted.

**(3) A falling rate is a result ONLY while the must-block guardian holds.** Every number
this instrument produces improves by going DOWN, so a gate that never asks would score
perfectly and be catastrophically wrong. On the same invocation, against the same live
registry: **4 / 4, rate = 1**, each probe on a clean read record. Without that, the fall
is not quotable.

**(4) The measurement's own honesty was asserted before any rate was read.**
`readIntegrity = {7231, 0, 0, {discovered: 0, floor: 0}}`, cross-checked against 7231
`[Clarify]` lines in the same run's stderr. The field existed for one day; this was its
first real use, and the zero is measured rather than assumed.

**EXPIRY — event-based, not a date (C4, tightened here).** This row goes **stale on the
next change to entity discovery, the entity registry, or the clarification gate's branch
order**, or on **2026-11-04**, whichever comes first. A date alone was the wrong
instrument: the previous value did not age out, it was invalidated by
`DISCOVERY-EXTEND-1` and then quoted for ten days anyway.

**Sixteen of sixteen external criteria remain unmeasured, and the budget itself is
unmeasured. One internal criterion has moved, by evidence; two more (D-OPA-2, D-OPA-3)
were added by ruling R10 and are unmeasured from birth — which is the point: an item that
enters v1 enters with the measurement that would falsify it.** That is the true position on
2026-08-04 — and under **C2** an internal, self-run, unpublished number is a
self-portrait, so **this contract is no closer to being satisfied than it was
yesterday.**

---

## §11 · CHANGELOG

- **v1_5 · 2026-08-04** — **R10**: `OPA-POLICY-1` enters v1 scope by owner ruling and
  arrives **with its criterion**, not as an exemption — three legs added under Tier D, two
  new internal rows in §10 (D-OPA-2 parity, D-OPA-3 fail-closed), both **ÖLÇÜLMEDİ** from
  birth. `FAULT-SWITCH-0` is named as D-OPA-3's instrument. Eval-gate invariance recorded
  as a precondition rather than a criterion. No existing criterion, threshold, tier or
  budget figure changed.
- **v1_4 · 2026-08-04** — §10's stale internal row **RETIRED BY EVIDENCE** and replaced
  with two measured rows (like-for-like n = 2534 and whole-corpus n = 7227), runner
  `MA-RERUN-2`, SHA `b0e8c9e2`. §10.1 records the reconstruction method, the UNDETERMINED
  baseline definition, the guardian verdict, the honesty assertion, and an **event-based
  expiry** replacing a bare date. §3's status line updated to say plainly that no external
  criterion has moved. **No criterion, threshold, tier, ruling or budget figure changed.**
- **v1_3 · 2026-08-03** — **R4 CLOSED** at $10/round (provisional, owner). `BENCH-SMOKE-1`
  becomes a **cost-metering instrument**; metered actuals will replace the Architect's
  estimate (D-3). §1 gains the **budget clause** (a budget decides how many criteria get
  measured, never what counts as measured). §10 gains a **cost-per-round row** — the
  budget is now itself a tracked criterion. This document is declared the **single source**
  for the budget figure; the rollout plan no longer restates it.
- **v1_2 · 2026-08-03** — **TIER F added** (F1 BrowseComp-Plus → RAG lane; F2
  DeepScholar-Bench → WEB-VALVE-1). Rulings **R7/R8/R9** recorded; R9 carries the S74-1
  finding on the RAG lane. §6 blocking count 13→15 of 16.
- **v1_1 · 2026-08-03** — DRAFT → **BINDING**. §9 became the ratification record (R1–R6);
  §1 gained the symmetry clause; §3 thresholds marked RATIFIED.
- **v1 · 2026-08-03** — first issue, DRAFT.

<!-- END · cwf-sota-definition-v1_5 · rev 6 · 2026-08-04 -->
