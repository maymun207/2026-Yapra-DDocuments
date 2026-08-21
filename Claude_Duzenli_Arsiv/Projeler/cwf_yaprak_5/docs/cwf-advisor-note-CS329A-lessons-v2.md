# CWF — Advisor Note: CS329A + Inference-Scaling Talk → Rollout Plan Placement · v2

<!-- cwf-advisor-note-CS329A-lessons-v2 · 2026-08-08 · SUPERSEDES v1 (S37-1: v1 stands
     as issued; this is the complete restatement — read this alone).
     Author: Claude (external advisor session, NOT the binding Architect lane).
     Audience: CWF Architect (Claude, Opus 5). STATUS: ADVISORY, ZERO authority.
     Queue/plan changes require the owner's ratification spoken in the Architect
     session's own channel (S54-4). New items enter BY NAME as additions only; the
     board is never re-litigated. -->

## §0 · PRECONDITION (S47-1) AND SOURCES
Derived exclusively from: `cwf-sota-definition-v1_5` (§10 figures), `cwf-master-rollout-plan-v2_1`,
`cwf-open-items-register-v89` (S85 close), and two owner-supplied external sources reviewed
2026-08-08: (a) Stanford CS329A Lecture-1 transcript (self-improving agents), (b) Simons
Institute talk, Mirhoseini, inference scaling — transcript + full slide deck (Language
Monkeys / power-laws paper / CodeMonkeys / Archon / KernelBench). No live CWF read was
performed in the advisor session. **Every CWF state claim below is stale by default
(RULE 25); re-derive against your fresh-clone floor and the highest register version
before acting. Your live read wins over anything here.** External figures were copied
from the slides where slide and transcript disagreed (D-3); chart-read values are
labelled ≈.

## §1 · ALREADY COVERED — DO NOT RE-MINT
The external material's syllabus is substantially pre-named in Blok 2F and the SOTA
contract. Mapping, so no duplicate items get born:

| External theme | CWF organ | Status per sources above |
|---|---|---|
| Repeated sampling + verifier selection | `CHART-CANDIDATE-1` (2F.0d) | absent from v89 §6 queue → treat as shipped, pending your live read |
| Self-improvement hygiene (what feeds back) | `SUCCESS-ONLY-RECALL-1` (2F.0c) | same |
| Verified-trace → routine distillation (Memp) | `PROCEDURE-RECALL-1` (2F.1) | queued (v89 §6) |
| Semantic memory | `SEMANTIC-MEMORY-1` (2F.2) | queued, owner-triggered |
| Outcome-vs-process reward | ToolComp criterion + `STEP-EFFICIENCY-1` (2F.3) | queued |
| Planning / task decomposition / orchestrator | `PLANNER-0` (2F.4) | queued |
| Deep research | `WEB-VALVE-1` (2.1) | ✅ (plan v2_1) |
| Benchmark-as-product culture | SOTA C1–C4, Tiers A–F, `mcp-honestbench` | binding / queued |

Vocabulary adopted from the sources: **coverage** (can a correct solution be generated
at all, pass@k) vs **precision/selection** (can it be identified among candidates). A
deterministic verifier solves the selection problem *by construction* — that is the
architectural bet CWF already made (ADR-001).

## §2 · CANDIDATE ITEM — `QUERY-CANDIDATE-1` (recon-first; UNVERIFIED premise)
**Pattern law:** *wherever a deterministic (oracle-class) verifier already exists,
best-of-N candidate generation + verifier selection is near-free capability.* CWF
applied it at one seam (chart). Candidate second seam with no named item found in the
sources above: **Superset gateway query construction** — the verifier is the bound
datasource itself (execution error / row-shape feedback).

**Flagged UNVERIFIED (TOTAL-45):** the advisor did NOT read what `gateway_step` does
today on query failure (a repair loop may already exist → no gap). Step 1 is a recon
code read, not a phase (D-1). Design constraints the external evidence imposes, for the
recon brief and any later phase:

1. **Oracle-verifier condition (hard).** With oracle-class verifiers, coverage climbs to
   k = 10⁴; with soft selectors (reward models, majority voting) gains plateau at
   k ≈ 10 and, when correct generations are rare, majority voting selects the popular
   *wrong* answer. Corollary law: **in-sample frequency is not a truth signal** — the
   sampling-layer sibling of the render-layer "a guess must never look like an answer."
   If the seam's verifier is not deterministic, the pattern is not applied there.
2. **Serial ≍ parallel freedom.** At equal cost the serial (iterative repair) and
   parallel (independent N) frontiers converge (SWE-bench data). Choose whichever fits
   the streaming UX; measurement decides. **Feedback-richness law for the serial
   variant:** the slope of serial scaling is set by the richness of structured
   environmental feedback — KernelBench (DeepSeek-R1, Level 2, Fast₁ over 10 turns):
   self-revision only ≈42 %, + execution result ≈63 %, + profiler ≈73 % (start ≈28 %).
   Self-critique without environment feedback saturates. A CWF repair round therefore
   feeds the model the deterministic error object (backend error, row counts, schema
   mismatch), never a bare retry.
3. **Diversity precondition.** Failures cluster (CodeMonkeys observed repeated identical
   wrong unit tests); if candidates are near-identical, N is waste. Recon must check
   candidate diversity; cheap levers are prompt/temperature/route variation.
   Heterogeneous-source ensembling raised the oracle ceiling markedly on SWE-bench
   ("Barrel of Monkeys" oracle 80.8 vs single-pipeline oracle 69.8) — diversity raises
   the coverage ceiling; selection then rebecomes the bottleneck.
4. **Distinguishing-probe pattern** (CodeMonkeys Selection State Machine): when
   candidates disagree, generate a *targeted deterministic probe* to separate them
   (their version: a new test executed in sandbox; ~6 % of cost selected 88.4 % of
   correct edits). CWF translation: separate query candidates by a discriminating
   deterministic check (row-count consistency, schema conformance, targeted
   sub-query); when no deterministic separator exists, fall through to the
   clarification gate. CHART-CANDIDATE-1's "ask if ambiguous" is this machine with the
   human as final discriminator — literature-confirmed.
5. **Choosing N.** Coverage follows c = exp(a·k^b) (fit rel. error 0.5–8.3 % across
   models/tasks), and the exponent is predictable from a small-k pilot's pass@1
   distribution with ~2–4 orders of magnitude less compute. N is a governed param whose
   value comes from a pilot + extrapolation, never a sweep — same spirit as R4 /
   `BENCH-SMOKE-1`.
6. **Calibration (expectation-setting).** Scaffolding a mid-tier model reaches
   near-frontier *coverage* (CodeMonkeys oracle 69.8 vs o3 71.7 on SWE-bench Verified)
   but the selection gap eats it in real score (57.4) — and even a good
   deterministic-leaning selector left ~12 points of generated-correct edits unselected.
   The pattern pays only where selection is deterministic; expected uplift is
   seam-local, not systemic. Sampling gains are also task-dependent (KernelBench Level 3:
   all models ≤12 % Eager / ≤4 % vs torch.compile).

If recon confirms single-shot-no-repair: mint by name (suggested slot 2F.0e, sibling of
2F.0d), criterion mapping candidate **MCP-Bench (score)**; internal instrument = the
2F.3 `[TurnEfficiency]` read (a repair loop must not silently inflate step cost). If it
advances **no** criterion after your analysis: apply the §1 **symmetry clause** route
explicitly — surface the verdict; the owner rules drop / prerequisite / add-criterion.
If recon shows repair already exists: record CLOSED-BY-RECON with the code pointer so
the question never re-opens.

## §3 · STANDING ANTI-LESSON — record it; it changes NOTHING in the order
The field's default ("binding constraint → add test-time compute / a smarter model") is
contradicted by CWF's own measurement AND by the external math. MA-RERUN-2 (`b0e8c9e2`,
2026-08-04): entity-unresolved share of clarification blocks **62.14 % / 76.40 %**
(whole corpus, two block definitions), **43.45 % / 65.03 %** (like-for-like). The
long-tail theorem (Schaeffer et al. 2025) gives the mechanism: per-problem
pass@k = 1 − (1 − pass@1)^k — **sampling only lifts problems with pass@1 > 0. A
deterministic failure class (unresolved entity) has pass@1 = 0 and is untouched at any
k.** Discovery/registry work (`DISCOVERY-EXTEND-2`, 2.8) is the lever; the plan already
orders it so. Recommended recording: one lesson line in the next register's §lessons
("compute is not the measured lever; discovery is — MA-RERUN-2 + long-tail theorem"),
so future "sample more / bigger model" debates resolve by citation. Placement is your
call.

## §4 · PARK CANDIDATE — `ROUTER-DISTILL-1` (measurement-triggered re-entry)
The external final loop (fine-tune on self-generated verified traces) has exactly one
weight-bearing target in CWF: the governed router. §3 says routing is **not** the
dominant block cause today → named non-lever, not a deferral (prioritization by
evidence is SOTA-1-compatible; keep that wording for ratification). Proposed park entry:
- **Name:** `ROUTER-DISTILL-1` — fine-tune the governed router on verified production
  traces (success-only corpus, post-2F.0c hygiene).
- **Re-entry trigger (measured, not dated):** a fresh M-A read shows entity-unresolved
  no longer dominant AND routing-class misses the leading cause; the trigger read names
  its runner.
- **Method note (external evidence):** plain SFT on self-generated data plateaus via
  diversity collapse; multistep-RL-style fine-tuning preserved diversity and kept
  improving; smaller models benefit less from the flywheel — expectations for a small
  governed router set accordingly.
- **External confirmation line for the register:** DeepSeek-R1's loop learns mainly
  from *positive* traces — independent confirmation of the `SUCCESS-ONLY-RECALL-1`
  design premise.

## §5 · RAG LANE — BASELINE DISCIPLINE (input to the RAG-TEAM relay / F1 criterion)
CodeMonkeys eliminated embedding/vector retrieval on a ~3 M-token / ~200 k-line repo
with plain LLM-scan relevance (Qwen-2.5-32B): **92.6 % recall, ~$0.7/problem, 15.5 %
of total cost**, approaching oracle retrieval as context length grows. Discipline, not
verdict: **before any vector infrastructure (parked Qdrant + bge-m3) is committed, a
governed LLM-scan retrieval baseline must be measured under F1 (BrowseComp-Plus)** —
vector infra must earn its place against that baseline by evidence. Honest limit:
LLM-scan cost is linear per query in corpus size; the crossover point is itself a
measurement, and the corpus-size axis belongs in the baseline design.

## §6 · MEASUREMENT-CRAFT INPUTS (no new items; feed existing named work)
1. **Funnel accounting → `STEP-EFFICIENCY-1` (2F.3) design input.** CodeMonkeys
   published per-stage conditional losses: 100 % → context 92.6 % (7.4 % missing files)
   → coverage 69.8 % (22.8 % not generated) → score 57.4 % (**11.6 % correct-but-not-
   selected**). CWF analog for the measurement board: a corpus-level funnel over the
   turn pipeline — IR loss → discovery loss → tool loss → grounding loss → render loss —
   each stage's conditional loss named.
2. **Parameterized-threshold metric family → `mcp-honestbench` design input.** Fast_p
   (share of outputs that are correct AND beat baseline by factor p) turns difficulty
   into a sweepable knob; the same shape fits a parameterized honesty/accuracy
   threshold in honestbench's metric definitions.
3. **Eval hygiene law for BLOK 3's first measurement round:** Archon tuned its
   architecture on a held-out 20 % and measured on the untouched 80 %, split fixed
   across methods. CWF craft line: **any parameter tuned against a benchmark uses a
   held-out split; the number entering §10 comes from the untouched split.** (C1–C4
   companion; prevents self-portrait-by-tuning.)
4. **Floor as differential oracle (design line, "AI as compiler" pattern).** Reference
   implementation verifying a faster rewrite (PyTorch verifying CUDA) has a structural
   CWF sibling: in DB-first/code-floor, the floor path can serve as the differential
   oracle for a governed override on identical input; divergence = alarm. File as a
   design note, not an item.

## §7 · DESIGN-INPUT LINES FOR PARKED/QUEUED TOPICS
- **Multi-agent (parked, S82 research family):** models systematically prefer their own
  reasoning traces; a second model helps most as **evaluator/critic, not generator**.
  Position the second agent verifier-side from the first design note.
- **Archon vocabulary** (Generator · Fuser · Critic · Ranker · Verifier · Unit-Test
  Generator · Unit-Test Evaluator, with per-block call costs): adopt as vocabulary
  only. The one block with no CWF analog is **Fuser** (synthesize candidates into one
  answer); under ADR-001 it may live only in the soft/advisory layer, never in
  grounding — and it is meaningless for structured candidates (two SQLs don't merge).
  Archon-class gains cost 35–44 calls/query (avg +15.1 % pass@1 over frontier single
  models; task-specific All-Source: MATH 93.5 %, CodeContests 41.4 %): not a v1 shape
  for an interactive governed platform. Its "assign the cheapest sufficient model per
  step" principle is already embodied as governed model params; 2F.3 data later becomes
  that assignment's measurement feed.

## §8 · WHAT THIS NOTE DOES NOT DO
No queue reorder. No phase prompt. No floor/hash/test-count claims beyond the named
sources. All external figures from the cited slides/papers; chart-reads marked ≈; all
CWF figures from the named documents (D-3). Processing is subject to your own D-7
checklist and per-item owner ratification, in your channel.

<!-- END · cwf-advisor-note-CS329A-lessons-v2 · 2026-08-08 -->
