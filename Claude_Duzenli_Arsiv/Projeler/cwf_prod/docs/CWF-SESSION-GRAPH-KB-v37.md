# CWF — Session Graph KB · v37

<!-- CWF-SESSION-GRAPH-KB-v37 · rev 37 · 2026-07-12 · Supersedes v36.
     SESSION 37: the StagesDashboard was built, shipped, walked live by the owner across all 15
     stages, fixed through three waves, given a real navigation layer, and then the whole 15-stage
     pipeline was audited against 2026 SOTA. This KB records the DECISIONS and the WHY — the
     register (v39) carries the open queue; the bootstrap (v37) carries how to start. -->

## FLOOR AT CLOSE
`origin/master` **`415db54`** · 2050 tests / 199 files · docVersion rev 69 · drift `[OK]` · CI green.
No Operator step pending.

---

## 1 · WHAT S37 BUILT (and the one decision behind each)

### UI-STAGES-1 → the StagesDashboard (`b8db75e`)
A read-only, pedagogical map of the turn pipeline (00 quota gate + 14 stages), rendered ENTIRELY
from a typed `stagesRegistry.ts`. **Decision: the page changes nothing.** It is a map + a gate + a
lesson; every mutation still happens in the governed panels it links to. Anti-drift is enforced by
C-9 teeth (15 cards · every deep-link target ∈ TABS · every `codePath` exists on disk · every span
∈ config ∪ TURN_STAGES · the landing default) so the hand-authored teaching map cannot silently rot.
Also flipped the admin landing tab `rules` → `users` (owner Karar-1).

### The owner's live 03→14 re-walk → the real product feedback
The owner walked every stage on production and produced **48 findings**. The systemic diagnosis was
his, not the Architect's: *"beni bir yere getiriyor; getirdiğim yerde ne yapacağım — o bilgi yok"*
and, bluntly, *"senden başka kimse kullanamaz bunu."* **Two roots:** (1) the content is written in
AI-voice — a reminder for someone who already knows, not an explanation for someone learning; (2)
deep-links land the user in a panel with no lesson and no next step. **This is the mandate for
Wave 2**, and it is a writing + information-architecture job, not a code job.

### Three fix waves
- **STAGES-FIX-1** (`5fff42d`) — the mechanical layer: `<main>` scrolls (one `overflow-hidden` was
  trapping every panel), back-nav uses `pushState` + `popstate` (it was `replaceState`, so Back went
  to chat), the Langfuse chip copies the span name (**verified: self-hosted Langfuse v3.205 has NO
  per-span filter URL — that's a v4/Cloud feature**, so a "filtered link" would have been a lie),
  the ‹/› code links became a governed toggle with `__REPO_PUBLIC__` auto-off, and Quota's User
  column shows email/name with orphan rows labelled honestly (empty≠zero: the usage is real even
  when the identity is gone).
- **STAGES-FIX-2** (`8e7203d`) — the missing half of the back-nav: returning to Stages now lands on
  the CARD you left from. **Decision: target the card by id, not a pixel scrollTop** — robust to
  layout shifts from expanded disclosures. The memory lives in `AdminPanel` (which never unmounts),
  never in browser storage.
- **STAGES-FIX-3** (`017085e`) — the first **HOTFIX-profile** phase: `?tab=` jargon → human tab names
  (via ONE shared `tabLabel()`, which is exactly what makes Wave-2's renames a one-liner),
  `InlineHelp` became collapse⇄expand (the × used to hide help **forever**; the legacy flag is
  migrated so permanently-hidden boxes come back), Inspect's overflow (`min-w-0` on the `dd`), and
  the Langfuse chip now copies **and** opens the host.

### NAV-STACK-1 (`3a2fe02`) — the phase this session is proudest of
Five findings (F27/F28/F29/F31/F41) were **one missing abstraction: there was no navigation
history.** Every "go deeper" was an ad-hoc tab switch, and the shell only remembered a *Stages*
origin — so Stages→Trust→Replay→Back skipped Trust and jumped home to stage 12.
**Decision: build the abstraction, don't patch the symptoms.** `navStack.ts` is a *pure* ancestor
stack (no React/DOM/history — the same "pure core, hook wrapper" move as `resolveInitialTab`);
`useTabNavigation` stamps `navDepth` on each `pushState` and pops ONE hop on `popstate`;
`NavBreadcrumb` renders `← Ancestor › … › Current`, which simultaneously gives a back affordance
and answers "which page am I on and how did I get here."
**The strongest evidence it was the right abstraction:** `BackToStagesStrip` was DELETED and
STAGES-FIX-2's entire scroll-restore suite passed **unchanged** — the Stages special case genuinely
dissolved into "one entry in the general stack."

---

## 2 · THE SOTA AUDIT (15 stages, complete) — what it actually found

**The headline is not what the owner feared.** He suspected the architecture was behind. It mostly
is not. Three findings matter:

1. **Deterministic trust (ADR-001) is VINDICATED as the SOTA floor.** The 2026 consensus is a
   cost-ordered cascade: a **deterministic layer runs first**, and a model-based judge is escalated
   to *only for what the cheap layer cannot decide*. Benchmarks do the same (deterministic first,
   LLM as a *supplement, not a replacement*). And CWF's grounding is **runtime enforcement**, not
   offline scoring — a different job, where a stochastic judge would add latency, cost, an
   unreplayable verdict, and a second thing to verify. **Never put an LLM judge in the trust path.**
   The honest corollary: deterministic checks are *reliable but narrow* — CWF's lenses measure
   absence/routing/scope, **never answer quality**. If quality is ever to be measured, it belongs in
   an **offline** judge over golden specimens, with a pinned judge model and human-owned ground
   truth (the oracle problem: an agent that writes its own assertions locks in its own bugs).

2. **THE BIGGEST GAP IN THE WHOLE SYSTEM IS NOT ARCHITECTURAL — IT IS THAT THE GOLDEN SET IS
   EMPTY.** On the 2026 LLMOps checklist (prompt registry · versioning + review · eval gate · golden
   regression set · canary/A-B · auto-rollback · gateway · lineage stamps) CWF has **everything** —
   including the most advanced item (Wilson-CI auto-rollback) — **except the golden set the canary
   is supposed to score against.** The alarm system is wired to no sensors. **Marking ~20 specimens
   is the single highest-leverage act available**, and it also unblocks the consistency lens and any
   future cost/quality routing.

3. **The one genuine architecture gap is stages 03/07 (tool routing).** Keyword→category matching is
   *structurally* weak for Turkish (agglutinative: one concept, many surface forms) — and the proof
   is in CWF's own live learned map, which has learned **stopwords and verb inflections** as routing
   keys (`nedi?`, `bunu`, `getirebilirmisin`, `fabrikasinda`). The SOTA answer is semantic tool
   discovery (embed the tool catalog; hybrid recall). It becomes urgent **exactly when Superset
   activates** and the catalog doubles. **But CWF is quietly AHEAD in one respect:** its governed
   `routing_hint/sequencing` rule (resolve the ZONE UUID *before* calling metric tools) is a
   hand-authored **precondition-effect contract** — the very thing a June-2026 paper proposes as the
   fix for "relevance ≠ readiness." Embeddings may replace *recall*; they must not replace that
   ordering discipline.

**Also learned:** `resultStore` is **VINDICATED** — summarization is lossy and non-deterministic
(the model decides what to drop, with no cross-run consistency), which for a *numbers* agent is a
grounding-violation generator. The "deliberate stub" was the right call. **Do not reverse it because
"everyone else summarizes."** And **do not widen `historyWindowN` as a memory substitute**: context
rot means a bigger window can make answers *worse*.

**The memory gap (MEMORY-1) is real:** CWF records everything and recalls almost nothing — a diary
it never reads. The SOTA best practice for *how* an agent may evolve its own learned memory
("append-only heuristics, edited through a controlled tool, with a rollback log") **is the machine
CWF already is** (draft→gate→publish→rollback). So episodic memory should ride the existing rails:
Postgres-first, promotion-gated, with a forgetting policy — not a vector-DB bolt-on.

---

## 3 · PROCESS LESSONS (both cost real time this session)

- **S37-1 — presented artifacts are immutable.** The owner caught an in-place edit to a register he
  had already received. Any amendment mints a new version, even when disclosed in prose.
- **S37-2 — CI-green is a merge precondition, and SHARDED ≠ CI.** After NAV-STACK-1 merged, CI
  failed 1/2050 on a pre-existing flake (a sync `getByTestId` racing an async promise; the drawer
  rendered its loading skeleton first). **Both AG and the Architect had verified with sharded runs**
  — which put the racing files in *separate shards*, while CI runs unsharded and interleaves them.
  Two independent verifiers shared one methodological blind spot. The project's own
  stochastic-verification rule ("a small clean sample is not proof for nondeterministic bugs") had
  simply never been applied to the Architect's *own* verification.
- **Speed:** the bottleneck is deterministic (test/build), not model choice. Hence the two ceremony
  profiles, batching findings per round, and running AG's *implementation* on Sonnet (the Architect
  already does the planning). Note for AG-side questions: **effort high/xhigh = more thinking =
  slower**, and it is **not** multi-agent; multi-agent lives in AntiGravity's own Manager layer.

---

## 4 · WHAT THE NEXT SESSION MUST DO FIRST

**Write the MASTER PLAN** (owner-insisted, all inputs now exist): merge the remaining UI streams
(C Wave-2, E Superset) with every SOTA gap (golden set · SEMANTIC-ROUTING-1 · MEMORY-1 ·
GOLDEN-LOOP-1 · the 08 measurement · F39 · F47 · offline judge · consistency lens) and the small
open items (NAV-STACK-1 DOC-FLIP · flake-pattern grep · admin-preview seam), into ONE sequenced
plan with explicit dependencies.

Architect's current sequencing instinct (to be argued in the plan, not assumed):
**Wave 2 (C) → Superset (E) → SEMANTIC-ROUTING-1 → MEMORY-1**, with the **golden set armed by the
owner at any point** (it is independent, cheap, and unblocks the most).

<!-- END · CWF-SESSION-GRAPH-KB-v37 · rev 37 · 2026-07-12 -->
