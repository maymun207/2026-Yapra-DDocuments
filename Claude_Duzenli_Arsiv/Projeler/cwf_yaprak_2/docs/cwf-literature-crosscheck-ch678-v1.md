# CWF — Literature Crosscheck: "Chapter 6-7-8" (O'Reilly early release) · v1
<!-- cwf-literature-crosscheck-ch678-v1 · 2026-07-30 · S71
     Source: Chapter_6-7-8.txt (project knowledge). O'Reilly early-release text,
     author UNNAMED in the excerpt; internal references date it ~2024–2025
     (newest arXiv cited: 2408.08435). Ch6 "Knowledge and Memory" · Ch7 "Learning
     in Agentic Systems" · Ch8 "From One Agent to Many". Examples are
     LangGraph/OpenAI-based; the text predates the MCP-era converged practice.
     Method: full read (1588 normalized lines, zero skipped sections), mapped
     against the register (v71), scope-cut v1_2 (R8/R9), the MEMORY-1 design
     note v1, ADR-001/009/010/011/012-candidate, and the SOTA review.
     Item numbering: E-series (D-series is taken by the Dibia/Bornet crosscheck). -->

## §0 · VERDICT IN ONE PARAGRAPH

Nothing in these chapters forces a change to any locked decision, and the one
place the book appears to contradict us (vector-first memory) is a generation
gap, not an argument: the text is ~2024-vintage, and the 2026 practice our SOTA
review captured — hybrid, multi-signal, SQL-anchored — has already moved to
where MEMORY-1 stands. Chapter 7's learning mechanics are our promotion rail
without the gate; Chapter 8's single-agent bottleneck remedy is literally our
category routing, described before we'd have needed the advice. The chapters
surface **three named opportunities** (E-1 exemplar retrieval, E-2 a
fine-tuning trigger condition, E-3 a vocabulary-collision note) — all v1.1-or-
watch class, none touching the v1 path.

## §1 · CONFLICTS — where the book and CWF disagree, and the committed rulings

**C-a · Vector-first "semantic memory" vs MEMORY-1's no-vector multi-signal.**
Ch6's default long-term memory is embeddings + a vector store, and its
"semantic experience memory" (its episodic analog) is vector-only retrieval
over past interactions. MEMORY-1 v1 has **no vector column at all** —
keyword (TR-folded) + canonical-entity + recency + importance, deterministically
fused. RULING: no change. This is the book's age showing: the 2026 sources in
the SOTA review (including the vector-DB vendors' own write-ups) describe
moving *beyond* pure vector similarity to exactly the multi-signal shape R8
mandates. Vectors remain a purely additive later option. The apparent conflict
dissolves under dating.

**C-b · LLM on the memory write path.** Three places in the book put a model
inside the memory machinery: keyword extraction by LLM (ch6), Reflexion's
self-authored reflection buffers injected into future prompts (ch7), and
ExpeL's agent-edited insight list (ADD/EDIT/REMOVE/AGREE operations, ch7).
CWF law runs the other way: the distiller is deterministic; nothing
self-authored enters runtime except as a **draft through the gate** (anti-
oracle; agent proposes, gate disposes). RULING: no change — and here we hold
production evidence the book lacks: F185 measured what an unguarded learned
surface does (23 contaminated cache keys; the design's own stopword union
caught 4), and S69-2 is the resulting doctrine. The book presents these
mechanisms with no poisoning analysis at all. Notably, ExpeL's insight
lifecycle IS our draft lifecycle — promote/demote/edit are `router_proposals`
+ Curate + eval-gate mechanics — minus the gate. The book independently
invented our machine and forgot the safety interlock.

**C-c · Unconditional RAG injection vs R9's tool-accessed backend.** Ch6's RAG
(and semantic experience memory) reserves context every turn for retrieved
content. R9 ruled the opposite for CWF: RAG joins as a **backend the model
chooses** (context-rot, routing bypass, and the governed/advisory separation —
retrieved soft content must never mix into stage-06 deterministic knowledge).
RULING: no change. The book's own "Promise and Peril of Dynamic Knowledge
Graphs" section — validation burden, security/privacy, overreliance, keep
humans in critical decisions — is, ironically, the strongest argument in the
chapter for our fence.

**C-d · ADAS (meta-agent designs agents) vs the governance rail.** Ch8 closes
with self-designing agent systems as a frontier. As production guidance this
is ungated procedural learning at maximum blast radius — the precise inverse
of "the agent never writes its own ground truth." The chapter itself flags the
safety question and answers it with adjectives. RULING: named non-goal, all
horizons. Our answer to "how do agents improve themselves" exists and is
mechanical: draft → eval-gate → human publish → rollback, at every layer.

## §2 · GAPS — what the book has that CWF lacks (honest, triaged)

**E-1 · Exemplar retrieval (the one real design input).** Ch7's best-supported
claim: retrieving *successful past examples* into the prompt measurably
improves task performance (ExpeL/few-shot line, arXiv 2005.14165 /
2308.10144). CWF injects no past exemplars today. But the MEMORY-1 store
already captures the exemplar's distilled essence per episode — `asked` +
`entities` + `tools` (what worked) + `decision` — so the retrieval side (C2)
can surface "last time this shape of question succeeded via getDailyOeeValues"
without any schema change. What we deliberately do NOT store is the raw
transcript (payloads stay in `messages`/Langfuse), so full-text few-shot
replay is out by design, and that divergence is correct for us: our exemplar
signal is *which tools and entities worked*, not prose to imitate.
CLASSIFICATION: **v1.1 by name** — "E-1 exemplar-weighted retrieval" — rides
the MEMORY-1 store as built; zero v1 impact; the design note needs no edit.

**E-2 · Fine-tuning (incl. function-calling FT).** Ch7's parametric half. CWF
does none, and should not until two conditions hold, which become the named
trigger: (1) evidence that the prompt/catalog ceiling is actually hit — our
M1-class routing losses are today addressed by catalog and routing work, which
keeps paying; and (2) any comparison runs under M-C discipline
(action-space-size controlled — the S66 confound lesson). The book's
function-calling-FT pitch describes the problem our deterministic
routing + tool_doc + category machinery already attacks without touching
weights. CLASSIFICATION: **watch with a named trigger**, not a gap to fill.
The small-model cost note is a one-line EAIP-horizon observation, nothing more.

**E-3 · Vocabulary collision, worth one register line.** The book uses
"semantic memory" to mean *vector-stored anything* (including past
interactions). Our D-1 vocabulary uses it in the cognitive sense
(facts/policies = `domain_rules`). Anyone reading this book next to our design
note could mis-map the terms. CLASSIFICATION: record the collision in v72 so
future readers inherit the disambiguation; the design note's §1 table already
defines our senses precisely.

**Not gaps, for the record:** GraphRAG/knowledge-graph construction — the
chapter's 8-step KG pipeline (NER, hand-designed ontology, extraction) is
hand-authored topology, which ADR-009 forbids for our entity layer (ours is
*discovered* from the backend); for document knowledge it is an
inside-the-RAG-backend option, i.e. the team's shell, outside our fence (R9 /
ADR-012 candidate). Whiteboards/scratchpads — A23's `turn_context` is the
governed, typed, attributed version of the book's freeform whiteboard; the
"self-notes" prompting trick is a cheap someday-experiment, not architecture.

## §3 · WHERE CWF IS AHEAD — with the receipts

1. **The book's own multi-agent off-ramp is our routing layer.** Ch8: when
   skill count exceeds reliable selection, "encapsulate multiple skills into
   larger groupings, choose the skillset first, then the skill within it."
   That is `tool_category` two-step routing, verbatim — built, governed,
   write-locked (ADR-011), and *measured* (ROUTE-SHADOW M1 = 5/52; the
   provider-arm asymmetry finding shows we even measure the measurement).
   The book's remedy is our baseline.
2. **Ch7's learning loop, made safe.** ExpeL's insight lifecycle exists here
   as proposals + Curate + eval-gate + versioned publish + rollback + audit —
   the identical mechanics with a write boundary. The SOTA review said it
   first: the field's aspirational answer "is the machine CWF already IS."
3. **The dynamic-KG peril list is our standing law, mechanized.** Validation →
   eval-gate; security/privacy → RLS/SERVER_ONLY/ADR-007; overreliance →
   ADR-001 (a lying backend made harmless); "human oversight in critical
   decisions" → the gate disposes, the owner publishes. The book prescribes;
   we enforce.
4. **Memory design rigor.** Scoping (user-private, promotion as the org
   surface), forgetting from day one, usage measured from day one (the F207
   lesson), and a lens obligation (M-MEM2: memory may change finding, never
   the governed truth of a value). None of these appear in ch6.
5. **The delegation boundary the chapters never consider.** All of ch8 is
   pre-MCP: coordination inside a framework's process. Our multi-agent story
   runs at the MCP boundary — delegation is a tool call (ADR-012 candidate),
   trust earned per-tool (ADR-010), specialist internals free inside their own
   shell. That is a cleaner federation boundary than any of the four
   frameworks surveyed, and it is also the honest reading of parsimony
   (ch8's own principle): today's task shape earns exactly one agent — which
   is D-5, reconfirmed.
6. **Provenance and empty≠zero.** Absent from all three chapters. Every
   retrieval surface the book proposes would, in our terms, ship without an
   evidence chip.

## §4 · ACTIONS (all ledger-class; zero v1-path impact)

- v72 register gains three named lines: **E-1** (exemplar-weighted retrieval,
  v1.1, rides MEMORY-1 store) · **E-2** (fine-tuning watch, dual trigger:
  measured prompt/catalog ceiling + M-C-controlled comparison) · **E-3**
  (vocabulary-collision disambiguation note).
- MEMORY-1 design note v1: **unchanged** — the chapters validate it (semantic
  experience memory confirms the need; the generation gap confirms the
  no-vector ruling; ExpeL confirms the promotion rail).
- No phase, no ADR change, no scope-cut amendment.

<!-- END · cwf-literature-crosscheck-ch678-v1 · 2026-07-30 · S71 -->
