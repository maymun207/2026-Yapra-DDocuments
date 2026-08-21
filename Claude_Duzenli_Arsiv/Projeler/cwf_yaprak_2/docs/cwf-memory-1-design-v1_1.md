# CWF — MEMORY-1 Design Note · v1_1
<!-- cwf-memory-1-design-v1_1 · 2026-07-30 · S71 · A4 (critical path, R8)
     SUPERSEDES v1. Delta (owner instruction, S71): the UI surfaces that ship
     WITH the memory block are now designed in-note and bound into the phases —
     U-1 chat memory chip · U-2 admin Memory tab · U-3 governed params surface.
     E-1/E-2/E-3 (ch6-7-8 crosscheck) ratified and referenced. No other section
     changed in substance.
     Definition sources: cwf-v1-scope-cut-v1_2 §2 (R8, owner-ratified) ·
     cwf-sota-review-trust-and-memory-v1 §2 (owner-commissioned definition source) ·
     cwf-literature-crosscheck-dibia-bornet-v1 D-1 · A23_…architecture-v1_3 (carrier).
     This note precedes all MEMORY-1 phase prompts. F48 closes with A4's evidence. -->

## §0 · GROUND (live reads, 2026-07-30, repo @ `523c44b4`)

- **Stage numbering is code, not convention:** `api/cwf/_lib/replay/stageContextSlice.ts`
  — stage `'01'` query · `'02'` identity · `'03'` route · `'05'` **history** (rebuilt,
  exact; reads `historyWindowN`, see `:194` and `:438`) · `'06'` governed knowledge
  (`domain_rules` pack) · `'07'` tool-set. "Retrieval into stage 05" therefore means:
  retrieved episodes join the **history slice**, and never the stage-06 governed pack.
- **Gate anchors (the promotion rail already exists):**
  `api/cwf/_lib/knowledge/gate/evalGate.ts` · `…/gate/promptSegmentGate.ts` ·
  `…/knowledge/governance.ts`. Propose/dispose precedent live in production:
  `router_proposals` + the Curate panel (S70: owner disposed 19 rejects through it).
- **Write-model palette:** `shared/grantPolicy.ts` — the dominant governed pattern is
  `WRITE_MODEL.SERVER_ONLY` with an all-grantees revoke migration (public + anon +
  authenticated) and a `verifyGrants` probe. `domain_rules` itself is SERVER_ONLY (`:37`).
- **Vocabulary state (D-1 / SOTA §2.1):** working = `messages` last-N via governed
  `historyWindowN`; episodic = **absent** (recorded everywhere, retrieved nowhere);
  semantic = `domain_rules` (governed, human-authored); procedural = prompt segments,
  tool rules, routing config + the deliberately narrow `tool_category_cache`.
- **One wording correction, recorded:** SOTA §2.5 mentions a `memory.enabled=false`
  placeholder. Grep of the current tree finds **no such flag**. Absent-now; nothing to
  remove, nothing rides on it. (Empty≠zero on the scan surface: `api/ src/ shared/`.)
- Governed live state relevant here: `learnEnabled=0` (BRAKED) · `frameRouting=0`
  (DARK — frames/entities are still computed and logged on the live path;
  enforcement is dark, evidence is not).

## §1 · VOCABULARY AND WHAT IS ALREADY BUILT (D-1 — the required sentence)

MEMORY-1 is written in the four-part memory vocabulary: **working / episodic /
semantic / procedural**. And the load-bearing fact, stated plainly:

> **Semantic memory (`domain_rules`, governed knowledge) and procedural memory
> (prompt segments, tool rules, routing config) are ALREADY BUILT AND GOVERNED —
> only the episodic slice is new.**

CWF records everything and recalls almost nothing: `messages`, `telemetry_events` and
Langfuse hold the events; the only thing that flows back into a future turn is the
routing cache. The system has a diary it never reads. MEMORY-1 builds the reader —
and only the reader's episodic slice. Nothing else in the memory anatomy changes.

## §2 · REQUIREMENT (R8, owner-ratified — all five, no demo deferrals)

1. Episodic store in Postgres — governed `episodes` table, scoped.
2. Multi-signal retrieval into stage 05 — keyword + entity + recency + importance,
   fused; **never vector-only**.
3. Forgetting policy from day one — TTL, importance, decay.
4. Promotion, not accumulation — through the **existing** draft → eval-gate →
   publish → rollback path. The agent proposes; the gate disposes (anti-oracle).
5. Admin surface + lens proof — a memory change is provably non-destructive to
   past answers.

**F48 → CLOSED@evidence at A4's close.** Out by name (v1.1): self-evolving memory
frontier · F83 · F83.1 · F166.

## §3 · DESIGN — five components

### C1 · Store: governed `episodes` table

One **distilled record per completed turn**, append-only, written by deterministic
code at end of turn — no LLM writer anywhere on the write path. Every field is
distilled from structures the pipeline already holds (frame record, `[EntityResolve]`
canonical output, tool ledger, grounding verdict); **prose is never re-parsed**.

Schema (definitive for phase 1A; column order free):

```
episodes
  id                uuid PK
  turn_id           text NOT NULL          -- THE turn id = OTel trace id (RULE-28)
  conversation_id   text NOT NULL          -- exact-key for carrier-shape reads (§4)
  user_id           uuid NULL FK auth.users -- machine actors: NULL + attribution jsonb (S33-1)
  actor             jsonb NOT NULL          -- attribution (user|synthetic|replay-never: C1)
  asked             text NOT NULL           -- normalized question digest (deterministic)
  entities          jsonb NOT NULL          -- canonical ids from the resolver, [] = real empty
  scope             jsonb NULL              -- resolved scope (time range, layer) if present
  tools             jsonb NOT NULL          -- [{name, calls, ok}] — [] = zero-tool turn (real)
  decision          jsonb NULL              -- outcome class: answered|withheld|clarified|error
                                            -- + grounding verdict + candidates presented (§4)
  user_correction   jsonb NULL              -- structured correction, when a next-turn
                                            -- correction is attributable to this turn
  importance        smallint NOT NULL       -- computed, deterministic (see C3)
  created_at        timestamptz NOT NULL
  expires_at        timestamptz NOT NULL    -- TTL (C3)
  last_retrieved_at timestamptz NULL        -- reinforcement
  retrieval_count   int NOT NULL DEFAULT 0
```

Committed rulings:

- **Scope = user-private, v1.** Episodes are partitioned by `user_id`. There is no
  org-shared episodic read: **the cross-user surface IS promotion** (C4). This is the
  anti-leak position — a private correction becomes shared knowledge only through the
  gate, with a human.
- **Grants:** `SERVER_ONLY`, RLS on / zero policies, all-grantees revoke (public,
  anon AND authenticated — the FIX-2 lesson), `verifyGrants` probe row + CI coverage
  test in the same phase (standing security rule).
- **Content law:** structured and attributed fields only. No raw tool payloads (they
  live in `messages`/Langfuse), no secrets (ADR-007 posture inherited; the distiller
  consumes post-scrub structures only).
- **Never blocks the answer.** The distiller runs with the telemetry flush; a store
  failure logs and drops — memory-down ≠ chat-down (RULE-27 family).
- **C1 LAW restated for this table:** replay and governance paths write **zero** rows
  here. `actor` carries provenance so a violation is visible, not just forbidden.
- **empty≠zero at the store:** `entities: []` and `tools: []` are real empties,
  distinct from an unrecorded turn. A frame-absent turn (dark flag) records what the
  resolver produced, with the absent parts null — never fabricated.

### C2 · Retrieval into stage '05' — multi-signal, deterministic

A deterministic scorer over the caller's own episodes, fused from four signals:

- **keyword** — Turkish-folded token overlap between the incoming query and
  `asked` (+ tool names), on the existing fold/extract machinery precedent;
- **entity** — overlap between the resolver's canonical ids for THIS turn and
  `episodes.entities` (exact ids, never fuzzy text);
- **recency** — decay over `created_at`;
- **importance** — the stored score, reinforced by retrieval.

Fused score = weighted sum. Weights, top-K (default small: 3–5) and the character
budget are **governed `agent.memory.*` L1 params** (RULE-1: no hardcoded config).
**No vector column exists in v1** — "never vector-only" is satisfied by having no
vectors at all; an embedding column later is purely additive.

Placement and posture:

- Retrieved episodes render as a clearly-attributed **memory slice inside stage 05**
  ("from your past interactions", each line carrying its date + turn provenance).
  They NEVER enter stage 06: governed knowledge stays deterministic and advisory
  memory stays advisory — the same separation R9 legislated for RAG.
- The slice's text is generated from our own distilled fields (template over
  structured data), not replayed raw text — the LB-11 injection surface this adds
  is minimal by construction, and the slice is data, not instruction.
- **Read failure = floor:** scorer or table unavailable → empty slice, marked
  "memory unavailable" (empty≠zero at the render), chat continues.
- **Measured from day one (the F207 lesson):** the turn telemetry carries
  `memoryOffered` / `memoryUsedInAnswer`-class fields plus a `[Memory]` Vercel log
  line, so usage is a computed read, never an assertion (S65-2).

### C3 · Forgetting — a feature, from day one

- **TTL:** `expires_at = created_at + agent.memory.ttlDays` (governed; default 90).
- **Importance (deterministic):** base score from outcome class (corrected-by-user >
  answered-with-tools > zero-tool chat), bumped by `retrieval_count`, decayed by age.
  No LLM scoring.
- **Forget tick:** a scheduled job (the health-cron pattern) hard-DELETEs expired
  rows and logs `[MemoryForget] deleted=N scanned=M` — counts computed, and the
  tick's zero is not believed until the command is proven able to fail
  (S66-1: positive-control test deletes a planted expired row).
- **Promotion outlives the diary:** a promoted episode's knowledge lives on in
  `domain_rules` / a published draft; the episode row itself may still expire.
  Memory of *what happened* is disposable; knowledge is governed.

### C4 · Promotion, not accumulation (anti-oracle)

An episode becomes knowledge **only** by promotion through the existing rail:

```
episode(s) → PROPOSAL → draft (semantic: domain_rules kind ·
procedural: prompt-segment / routing draft) → eval-gate → super-admin publish
→ versioned → rollback-able → audited
```

- **The agent proposes; the gate (and a human, initially) disposes.** The agent
  never writes its own ground truth; a proposed promotion is a draft, never a fact.
- Anchors: `evalGate.ts` / `governance.ts` (the gate is untouched — additive
  dispatch only, per the eval-gate-unbypassable law) and the `router_proposals`
  propose/dispose surface as the UX precedent.
- v1 candidate surfacing is **human-pulled**: the admin surface (C5) highlights
  episodes with `user_correction` set and repeated-miss patterns; the owner clicks
  propose → a draft is authored (LLM assist permitted at draft time only — the
  stage-drafts/Sentezle precedent; runtime stays deterministic).
- **The brake is respected:** while `learnEnabled=0`, the promotion surface is
  authoring-only, exactly like the Curate posture after F212.

### C5 · UI surfaces + lens proof

The memory block ships WITH its UI — designed here, built inside the same
program, no demo deferrals (S61-2). Three surfaces:

**U-1 · Chat surface — the memory chip (user-visible attribution).** When the
retrieval layer injects a memory slice into stage 05, the rendered message
carries a chip in the evidence-strip family: `Hafıza / Memory: N kayıt`,
expandable to one line per episode (date · asked-digest · the tools that
worked), each line carrying its turn provenance. The chip states the
deterministic fact only — what was OFFERED/injected — never a "the model used
this" claim the runtime cannot prove; usage attribution stays a lens-side
metric (M-MEM1), not a UI assertion. Render states are empty≠zero-clean:
offered > 0 → chip with N · offered = 0 → no chip (no-memory is the normal
state, not a danger state, so the affirmative-signal rule does not force a
warning) · retrieval FAILURE → the floor marker "hafıza kullanılamadı"
renders, because an error is not an empty.

**U-2 · Admin Memory tab (gated, RBAC).** A new tab in the existing admin
panel: a header printing corpus health against real data (the F221 lesson —
total episodes · expiring-in-7d count · last forget-tick time + deleted
count); an episode browser filtered by user / date range / outcome class /
has-correction, with columns date · user · asked-digest · entities · tools ·
importance · expires_at; a detail drawer per episode showing the full
distilled record + its turn id; delete (right-to-forget) behind a
ConfirmDialog that writes an audited reason; and the propose-promotion
affordance (C4): episode detail → "Terfi önerisi" → a draft in the EXISTING
draft/gate surface (LLM assist at draft time only). While `learnEnabled=0`
the affordance is visibly labeled authoring-only (the braked-Curate posture).
Per S69-3, every row control derives its enabled-state, its action and its
authority from ONE resolved binding — the handler never re-derives
(the UI-CURATE-1 law, adopted at birth rather than retrofitted).

**U-3 · Governed params surface.** `agent.memory.*` (signal weights, topK,
ttlDays, char budget) join the EXISTING governed-params admin surface — the
admin-panel rule: governed DATA operations get a gated UI affordance; no
bespoke widget, no code-constant tuning.

All three surfaces obey the standing render laws: RULE-26 (nothing clips at
1280/1024 — rendered evidence or not done) and S64-1 (dense layouts are
native HTML, legible at container width).

- **MEMORY-LENS (the proof obligation of R8 #5):** replay-grade, pinned-corpus
  A/B — the same turns evaluated with the memory slice ON vs OFF. Pre-registered
  assertion: **grounded values are byte-identical** across arms. Memory may change
  what the agent FINDS and how it frames; it may never change the governed truth of
  a value. The lens obeys the laws it measures (S65-3): zero writes to `messages`
  (C1), reads through the same stage-05 code path (S70-3: the consuming path is
  named — the lens exercises the real slice builder, not a copy).
- **Pre-registered metrics:** M-MEM1 retrieval usage rate (offered vs used) ·
  M-MEM2 grounding-drift on the pinned corpus (must be 0) · M-MEM3 forget-tick
  delete counts vs planted positives.

## §4 · A23 CROSS-TURN-CARRIER CONTRACT (binding paragraph, per R8)

A23 defines the cross-turn carrier — the **son-çözüm dilimi**: a separate,
persistent, minimal slice written at end of turn together with the telemetry flush,
holding the previous turn's **canonical_ids + scope + ⑥ decision + presented
candidates**; read by ② at the start of the next turn so a correction ("hayır, KB7")
is interpreted as a delta. Its boundaries are law: it never writes to `messages`
(C1), is never sourced from `turn_trace_digest` (ADR-008, display-only), and never
re-parses prose. It ships with the ⑤/⑥ phase of the A23 program (post-B7) and A23
itself notes it is "a minimal working-memory slice — consistent with B3/MEMORY-1,
designed once, not a bespoke hack."

**The contract this note binds MEMORY-1 to:** the episodic store must not preclude
that read shape — and by this design it does not, verifiably:

- `episodes` carries the carrier's exact field set, structured (`entities` =
  canonical ids, `scope`, `decision` including presented candidates), keyed by
  `conversation_id` + `created_at` — so the carrier's read ("most recent resolved
  state for THIS conversation") is servable as an **exact-key recency read**, no
  scoring involved. A23 may consume it directly, or mount a sibling minimal table
  without collision; both doors stay open and neither requires schema surgery.
- MEMORY-1 sources those fields from resolver/pipeline structures only — never from
  prose, never from the digest — so the carrier inherits clean provenance for free.
- The scored retrieval path (C2) and the carrier's exact-key read are **distinct
  access patterns on purpose**; nothing in C2 is mandatory for the carrier.

## §5 · LAWS THIS PROGRAM IS BOUND BY (named, not re-litigated)

C1 LAW (zero `messages` writes from replay/governance — extended explicitly to the
distiller's actor attribution) · DB-first/code-floor · empty≠zero (store, render,
and scan surfaces) · grounding/trust deterministic, never an LLM judge · eval-gate
unbypassable (additive dispatch only) · RULE-1 no hardcoded config · RULE-28 one
turn id (episodes reference the OTel trace id, never mint a second) · ADR-007
secrets · ADR-011 untouched (episodes change no tool exposure) · **F166 law: memory
is NEVER a viz data source** — a chart binds to fresh tool data; an episode may
recall *which tool worked*, never supply values · S33-1 machine-actor NULL + jsonb ·
S65-2 computed evidence · S66-1 positive controls · S70-3 named consuming paths ·
and the render laws on every UI surface: S69-3 (one resolved binding per
control) · F221 precedent (decisions visibly made against real data) · F210
affirmative-signal (danger states never silent) · RULE-26 · S64-1.

## §6 · EXECUTION — three gated phases (each with its named proof read, S63-1)

1. **PHASE MEMORY-1A — the store.** Migration (`episodes` + RLS + all-grantees
   revoke + verifyGrants probe + CI test), end-of-turn distiller, forget tick.
   *Proof read:* Operator object-read of the applied table; production turns
   producing rows (Architect reads `[Memory]`/`[MemoryForget]` Vercel lines);
   forget-tick positive control red-then-green.
2. **PHASE MEMORY-1B — the reader + the chat surface.** Scorer + governed
   `agent.memory.*` params (U-3, joining the existing params surface) +
   stage-05 slice + telemetry fields + **U-1 memory chip** + MEMORY-LENS.
   *Proof read:* a live turn's `[Memory] offered=N` line; the chip RENDERED in
   production on a real turn (screenshot-grade, RULE-26, all three render
   states exercised — offered / none / failure-floor via test harness); lens
   run on the pinned corpus with M-MEM2 = 0.
3. **PHASE MEMORY-1C — promotion + the admin surface.** Proposal path into the
   existing drafts/gate + **U-2 Memory tab** (browser, drawer, audited delete,
   propose affordance, corpus-health header) + audit. *Proof read:* one
   end-to-end promotion through the real gate under the owner's hand
   (verdict=published), then rolled back — both directions exercised; the tab
   rendered against live data with the owner verifying in production (the
   UI-CURATE-1 verification pattern), S69-3 structural check grep-verified.

**F48 → CLOSED@evidence at 1C's close.** Estimated inside R8's 3–4-week v1 budget.

## §7 · OUT OF SCOPE (named, so nothing sneaks back in unlabeled)

Vectors/embeddings (additive later, never a v1 dependency) · self-evolving memory
frontier (MemRL/MemEvolve class — v1.1+, research-grade) · F83 / F83.1 · F166
(viz carry-forward rides A23/after) · the A23 carrier BUILD itself (post-B7; only
the §4 contract binds now) · org-shared episodic reads (promotion is the org
surface) · any LLM on the runtime write path · **E-1 exemplar-weighted retrieval**
(ratified S71; v1.1 by name — rides this store UNCHANGED, no schema impact) ·
a user-facing memory on/off toggle (named v1.1 option: the U-1 chip delivers
transparency in v1; a control follows only if asked for).

<!-- END · cwf-memory-1-design-v1_1 · 2026-07-30 · S71 -->
