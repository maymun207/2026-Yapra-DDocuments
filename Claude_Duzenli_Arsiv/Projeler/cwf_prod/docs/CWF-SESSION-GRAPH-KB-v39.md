# CWF — Session Graph KB · v39

<!-- CWF-SESSION-GRAPH-KB-v39 · rev 39 · 2026-07-13 · Supersedes v38. Session 39 in one document:
     what happened, what was DECIDED, and WHY. Companions: cwf-open-items-register-v41 (the queue)
     and cwf-master-plan-v2 (the sequence). Floor at close: b753783 · 2116/207 · rev 70. -->

## 1 · WHAT SHIPPED (chain 7f6aeb3 → b753783)
- **GOLDEN-ASSIST-1** (`a38adc6`): the golden-curation panel now carries the target spec —
  a coverage strip (4 buckets + `etiketsiz` + total) and a bucket-tagging popover, over the
  EXISTING endpoint (`markGoldenSpecimen(id, note?)`). Zero api/schema change.
- **RULES-AMEND-1** (`682f85b`): **F52** closed — you can finally amend a published rule from its
  OWN payload. Reset relabeled + confirm-gated + generalized.
- **GOLDEN-ASSIST-1-FIX-1** (`b753783`): F54 + F55.
- **E.3 + E.4** (Operator + owner): **Stream E CLOSED.**
- **Three Wave-2 design notes** (the whole of W1.a).

## 2 · THE TWO BIG TRUTHS OF S39

### 2.1 · The golden set exists (20/20)
The plan called it "the system's missing sensor, and it gates on nothing." It was stuck at 5/20 for
two sessions. **Root cause was not discipline — it was a missing tool:** the coverage spec lived in
an Architect document, so the owner had to hold it in his head while scrolling a flat list. Moving
the spec INTO the product (GOLDEN-ASSIST-1) moved the set from 5 to 20 **in one morning**.
*A manual step that keeps stalling is a missing tooling feature, not a human failing.*

### 2.2 · The ARMES "catalog skew" never existed — it was a UNITS ERROR
KB-v38 §2 recorded: *"one ARMES connection exposed 145 tools, the other 137."* This session's E.3
measurement (live `[ToolRoute]`): **`141 flat + 4 gateway = 145`** after disabling the personal
connection; **282 before**. So `282 = 141 + 141` — **both connections served the identical
141-tool catalog.** The "145" observed during the July outage was a **TOTAL** (141 flat + 4
gateway); subtracting it from a FLAT count (`282 − 145 = 137`) mixed units and manufactured a skew
that was then carried forward as fact — by the KB, and then by the Architect, who re-asserted it
in this session as "verified."
**S39-3:** *arithmetic that closes is not proof; units must match.* The real defect was worse and
simpler: the same tool was offered to the model **twice**, with collisions resolved last-write-wins.
E.3 ended it.

## 3 · LESSONS (each cost real time)
- **S39-L1 · Two of the three defects found this session came from ARCHITECT spec gaps, not AG
  errors** (F53 single-language hint; F54 the primary Mark button not requiring a bucket). The
  lesson that generalises: **every place an affordance can be misused is a place a gate is
  missing.** Write the gate into the spec, not into the review.
- **S39-L2 · The merge block is an attractor** (S39-1). A two-step instruction (corrective commit →
  merge) delivered in one message lost step one. AG merged; the CHANGELOG sentence was dropped.
- **S39-L3 · AG will take the "obviously reasonable" shortcut** — it then pushed the doc fix
  **directly to master**, bypassing PR review, because it was "just docs." Harm ≈ zero; the pattern
  is not. **S39-2** now lives in every phase prompt's binding constraints — structural, not a
  reminder.
- **S39-L4 · The A0 gate paid for itself.** Asking AG to READ `GoldenSpecimensRepository.mark()`
  before building retro-tagging revealed a write-once guarantee on ACTIVE rows — the feature was
  infeasible without a history rewrite. **The cheapest place to learn a feature is impossible is
  before you build it, by reading one `if`.** (Human curators CAN unmark→re-mark their own recent
  mark; the re-mark path DOES write the note. That is a person correcting their own record, not a
  machine rewriting provenance.)
- **S39-L5 · The Architect changed a position under evidence, once.** The reset-affordance
  generalization was first REJECTED (unrequested capability expansion), then ACCEPTED after
  re-examining the risk: the code floor **is** the safe baseline (it serves during a DB outage), the
  action only mints a DRAFT, and publish still passes the gate. **Defending a wrong line for the
  sake of consistency does not help the owner.** But the process point was held: the decision was
  written into the CHANGELOG rather than smuggled.
- **S39-L6 · The owner is a HUMAN, and the Architect was writing to him like a peer architect.**
  He said so, correctly. Every response now ends with a click-level action list. *(This is the same
  failure the product has — "it brings me somewhere and never says what to do" — reproduced in
  chat. If we don't take the diagnosis seriously ourselves, we don't take it seriously.)*

## 4 · DECIDED — DO NOT RE-LITIGATE
- **Naming (Wave 2):** `routing` → **Araç Eşleme** · `trust` → **Veri Otoritesi** · `tweak` →
  **Sandbox Ortamı / Session Sandbox** (owner-locked). **G2: `?tab=` ids STAY** — labels are the
  human surface, ids the machine surface; `tabLabel()` is the one lever.
- **The Sandbox label's residue is copy, not a rename:** "Sandbox Ortamı" does not carry
  *session-scoped* the way "Session Sandbox" does → a **test-pinned primer sentence** says it.
- **Wave-2 doctrine:** the voice becomes a **test** (`voiceGate.test.ts`), the docs bridge becomes a
  **type** (`StageEntry.docs` required, `DocSlug` derived from the registry). Doctrine in a design
  note decays; doctrine in a type does not.
- **Client-only phases carry NO reseal** — the drift manifest maps only `api/**`, `shared/**`,
  `vercel.json`. Verified, not assumed.
- **E is done. `seedRules.ts` does not run.** G5 (delete vs disable) decides ~2026-07-20.

## 5 · S39 HUMAN CONTEXT
The owner curated 15 golden specimens in a morning, published his second governed rule path, ran
the E.3 cutover with the Operator, and caught the Architect twice — once for writing to him like an
AI peer, once for a redundant action item. He is now the system's most reliable sensor: **three of
this session's defects were found by him, live, in under an hour.** Treat his walkthroughs as the
primary QA channel.

<!-- END · CWF-SESSION-GRAPH-KB-v39 · rev 39 · 2026-07-13 -->
