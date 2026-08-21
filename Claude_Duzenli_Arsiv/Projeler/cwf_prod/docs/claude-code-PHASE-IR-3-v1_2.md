# PHASE IR-3 — the flip: frame-driven candidate set (BLOCK 1 closer)
**claude-code-PHASE-IR-3-v1_2 · rev 1 · 2026-07-22 · Architect: Claude · Executor: AG · MUST-FOLLOW: cwf-master-plan-v5_2**

## §0 · AMENDMENT NOTICE (why v1_2 supersedes v1)
v1 was PRESENTED and is therefore immutable (S37-1); this v1_2 is its successor,
not an in-place edit. **Reason:** v1's G1 pointed at the derivation matrix by
reference to `cwf-ir-taxonomy-design-v1.md` — an Architect design doc **AG cannot
access**. That violated the durable-map §5 rule ("artifacts destined for AG are
embedded verbatim in the phase prompt"). AG correctly STOPPED rather than
constructing an un-ratified matrix on the spot (ratified behavior — do not "fix"
the stop). v1_2 folds the **K1-ratified, post-TOPOLOGY-merge (6-action)** matrix
and both enums **verbatim into G1**, so this file is fully self-contained (S54-3:
one relay artifact, zero external dependency). Logged as an Architect
premise/completeness error to the S54-1 tally. **Everything else is byte-identical
to v1** — same precondition, same gated sub-phases, same merge message.

---

Closes v5_2 BLOCK 1's central item. Turns the router from keyword-primary to
**frame → semantic → keyword** primary: the IR-1 frame (today observe-only) plus
the (action×object)→category derivation table become the PRIMARY candidate-set
engine; keyword `matched`/learned-map becomes the fallback tier. Also activates
IR-2's clarification (built, wired to nobody today) and merges the K1-ratified
taxonomy (QUERY_TOPOLOGY → QUERY_MASTER).

> PLATINUM: every new resolution path self-configures from governed data + code
> floor; the derivation table is CODE (deterministic, not an LLM judge); the
> router.prompt change publishes through the normal eval gate (one governed
> publish, owner-consented) — no manual runway. Freeze-independent
> (`router.prompt` is NOT a `prompt.segment`; IR closes under GOLDEN FREEZE).

## §P · PRECONDITION (S47-1) + WORKDIR (S56-1)
Valid ONLY while `origin/master == bad00f4f6e81e2a7ab8f621fbe111bf140a2c7cb`
(rev 128). On mismatch STOP and report actual state. Unique workdir (S56-1).
Grep pre-flight commands from `package.json` (S32-1). Branch: `ir-3`.

## §D · DIAGNOSIS (Architect, tree-verified @bad00f4 — do NOT re-derive)
- Today the candidate set is built keyword-first: `toolCategories.ts`
  learned-map + the router's `matched[]`. The IR-1 frame rides
  `RouterResponseSchema` but **steers nothing** (irFrame.ts §1: "EXTRACTED and
  RECORDED — steers NOTHING").
- IR-2 shipped `computeClarification.ts` (pure, "imported by nobody, steers
  nothing today") + `resolveEntityAlias.ts` — both READY, wired to no one.
- **The (action×object)→category derivation table is NOT in code.** It is
  provided VERBATIM in G1 below (post-TOPOLOGY-merge, 6-action). Building it as a
  deterministic code module is IR-3's core work. (v1 pointed at a design doc; see
  §0.)
- `router.prompt` is DB-governed via `resolveRouterPromptTemplate` (floor =
  `ROUTER_PROMPT_FLOOR`, seed = `ROUTER_PROMPT_SEED`, governed kind
  `system.router_prompt`, registered in selfSeedReconciler). The frame
  instructions inject at the `{{FRAME_BLOCK}}` site, gated by `frameEnabled`.
- K1 §8 is ANSWERED (owner-ratified): **QUERY_TOPOLOGY merges into QUERY_MASTER**
  (router can't separate them live; derivation gives both the same `factory`
  category — and `factory` topology tools are ALWAYS_INCLUDE anyway, so the merge
  loses zero coverage; no downstream branch). 6 actions post-merge.

## §G · GATED SUB-PHASES (each self-verifies before the next)

**G0 · Preflight + K1-A enum merge (do this FIRST, in isolation).**
Delete `QUERY_TOPOLOGY` and fold it into `QUERY_MASTER` at its THREE sites:
1. `irFrame.ts:20` — remove `'QUERY_TOPOLOGY'` from `IR_ACTIONS` (Zod enum → 6).
2. `semanticRouter.ts:170` — remove QUERY_TOPOLOGY from the "action must be ONE
   of" prompt line (this is the `ROUTER_PROMPT_FLOOR` text; the governed
   `ROUTER_PROMPT_SEED` in `reference/routerPrompt.ts` must match — update BOTH,
   they are byte-siblings). A governed re-publish of `system.router_prompt` is
   required so the live DB template matches (see G4).
3. The derivation table (G1) already folds the TOPOLOGY row's mappings into
   MASTER (see the matrix below).
`segmentIds.ts:11` "TOPOLOGY" is UNRELATED (segment-topology wording) — do NOT
touch. Add a migration-free note: any historical `synthetic_runs` frame with
`action:'QUERY_TOPOLOGY'` stays as recorded data (observe-only history, not
re-classified). Self-verify: grep shows zero `QUERY_TOPOLOGY` outside test
fixtures + historical-data comments; 6 actions in `IR_ACTIONS`.

**G1 · Build the derivation table as a deterministic code module.**
Create `api/cwf/_lib/routing/deriveCategories.ts`:
`deriveCandidateCategories(frame: IrFrame): { categories: string[]; basis: 'frame'; unmapped: boolean }`
from the RATIFIED matrix embedded below (verbatim; do NOT re-derive, do NOT invent
cells).

**The two closed enums (as they must read AFTER G0):**
```
ACTIONS (6): QUERY_STATUS · QUERY_METRIC · QUERY_EVENTS · QUERY_MASTER · COMPARE · COMMAND
OBJECTS (13): LINE · ZONE · FACTORY · EQUIPMENT · ORDER · RECIPE · MATERIAL ·
              TRANSFER · VEHICLE · EMPLOYEE · QUALITY · DOWNTIME · SYSTEM
```

**The ratified `(action × object) → category` matrix (post-TOPOLOGY-merge):**

Legend: cell = category set derived; `·` = invalid pair by design → derives to ∅,
`unmapped:true`, frame still recorded (observe-only never breaks). Every derived
set is implicitly ∪ ALWAYS_INCLUDE (`getFactoryList`,`getFactoryLines` — the floor
stays sacred on every path; do NOT re-add these inside the matrix).

| ↓action \ object→ | LINE | ZONE | FACTORY | EQUIPMENT | ORDER | RECIPE | MATERIAL | TRANSFER | VEHICLE | EMPLOYEE | QUALITY | DOWNTIME | SYSTEM |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| QUERY_STATUS | andon,machine | andon | factory | machine | production | · | material | transfer | logistics | employee | quality | linestop | admin |
| QUERY_METRIC | metrics(+quality*) | metrics(+quality*) | metrics | machine | production | · | material | · | · | · | quality | linestop | · |
| QUERY_EVENTS | linestop,andon | linestop | · | machine | production | · | material | transfer | logistics | employee | quality | linestop | · |
| QUERY_MASTER | production,factory | factory | factory | machine | production | production | material | transfer | logistics | employee | · | · | admin |
| COMPARE | =Q_METRIC∪Q_EVENTS(object) | ← | ← | ← | ← | · | ← | ← | · | · | ← | ← | · |
| COMMAND | production | · | · | machine | production | · | material | transfer | · | employee | · | linestop | admin |

\* `+quality` iff `metrics` includes `FIRE` — use the metricVocab
`METRIC_ALIASES`/`FIRE_ROUTING_SYNONYMS` mapping (fire/scrap/ıskarta) as the
discriminator; this reproduces today's FIRE_ROUTING behavior deterministically.

**Encoding rules (binding):**
- Pure, deterministic, NO LLM, NO I/O. Same armor discipline as the category
  armor: an (action,object) pair whose cell is `·` → `unmapped:true`,
  `categories:[]` (never a throw, never a guess).
- **QUERY_MASTER×LINE** is `production,factory` — this is the ONLY cell changed
  by the TOPOLOGY→MASTER fold (union of the old MASTER `production` + TOPOLOGY
  `factory`). All other MASTER cells are unchanged. Encode it exactly as shown.
- **COMPARE is COMPUTED, not a static lookup:** for a given object, COMPARE
  derives to `deriveCandidateCategories(QUERY_METRIC,obj).categories ∪
  deriveCandidateCategories(QUERY_EVENTS,obj).categories`. The `←` cells mean
  "apply that rule"; the `·` cells (RECIPE, VEHICLE, EMPLOYEE, SYSTEM) are invalid
  for COMPARE regardless (both underlying rows are ∅ or one target only) →
  `unmapped`. Implement COMPARE as the union call, not by hard-coding the result.
- **COMMAND × F80:** COMMAND derives only to categories whose tools are
  write-exposure-governed (F80 lane, `allowWrite:true`). If the object's COMMAND
  cell is `·` (no governed write category), that is the ALT-D case (G3),
  `unmapped` for write purposes.
- **Every category name above is a REAL category id** in
  `api/cwf/_lib/toolCategories.ts` (Architect-verified @bad00f4: andon, machine,
  factory, metrics, production, material, transfer, logistics, employee, quality,
  linestop, admin). If any derived name is not found in the live CATEGORIES set,
  STOP and report — do not silently map to a near-name.

Ship a full unit test that **enumerates all 6×13 = 78 (action×object) pairs** and
proves: every derivable pair lands in an EXISTING category (backward-compat proof,
the design's "prove on paper"); every `·` pair returns `unmapped` honestly. The
test REPORTS the measured derivable/invalid split — **do NOT assert a
pre-committed coverage number** (v1's design-doc "56/35" figure does not match a
strict cell count; the enumeration is the ground truth and its output becomes the
ratified coverage figure). COMPARE's derivable count follows from its computed
union — enumerate it, don't hard-code.

**G2 · The FLIP — frame-primary candidate set.**
At the candidate-set assembly point (the pre-stage-7 `resolveToolCategories`
path that feeds tool selection), change the order to **frame → semantic →
keyword**:
1. If `frameEnabled` AND the frame resolved (not null) AND `deriveCandidateCategories`
   returns a non-empty mapped set → that is the PRIMARY candidate set.
2. Union with / fall back to the existing keyword `matched` + learned-map tier
   when the frame is null, unmapped, or low-confidence (keep the keyword tier as
   the SECOND gear — never delete it; it is the floor).
3. Governed by a new `router.frameRouting` boolean param (L1, DB-first + code
   floor `false`) so the flip is itself a governed, reversible switch — dark→live
   is a param publish, not a redeploy (ADR-002 spirit: reversible, observable).
Empty≠zero holds: frame-primary returning `[]` because genuinely no category
maps is DIFFERENT from the frame being absent — record which tier produced the
set (`basis: 'frame'|'keyword'|'union'`) on the telemetry + span I/O
(FULL-TRACE MANDATE: the routing decision's basis is visible).

**G3 · Clarification ACTIVE + ALT-D honest message.**
Wire `computeClarification` (built in IR-2, imported by nobody) into the live
turn path:
- When it returns HIGH (AMBIGUOUS frame / unresolved required entity / COMPARE
  under-resolved) → the turn ASKS the clarifying question instead of guessing
  (this is IR-3's flip of IR-2's contract: "asking the user is IR-3's flip, not
  IR-2's" — roadmap line).
- **ALT-D (COMMAND × F80):** when the frame is COMMAND but derives to a category
  with NO governed write exposure (F80 unclassified/allowWrite:false) → return
  the honest born-loud message (S41-1) "bu işlem için yazma yetkisi tanımlı
  değil / no governed write exposure for this action", NOT a silent drop and NOT
  a fabricated success. This is the empty≠zero routing family's 4th member.
- Governed by the same `router.frameRouting` switch (clarification only fires
  when frame routing is live).

**G4 · router.prompt governed re-publish (the one consent-class action).**
The `system.router_prompt` template's action list changed (G0). The live DB
template must be re-published through the NORMAL eval gate (schema→referential→
behavioral, the unbypassable server endpoint) — NOT a raw write. This is a
governed publish = OWNER consent-class (S54-4): the phase prepares the new
`ROUTER_PROMPT_SEED`/template text and the publish PAYLOAD, but the OWNER speaks
the publish authorization in the executing channel. Include a
`scripts/`-orchestrated gated-service publish (S43-4: Architect orchestrates AG
to run the gated-service script on standing consent; raw DB stays Operator-only)
OR stage it for the owner's one-tap publish in the Rules panel — state which in
the report. Floor guarantee: until published, `resolveRouterPromptTemplate`
serves the code floor (updated in G0), so the system is never inconsistent.

**G5 · Riders (batch, same phase).**
- `semanticRouter.ts:179-181` stale "only ever render for the code floor" comment
  → correct it (the frame block now steers; the comment is IR-1-era).
- **F134** (annotation) · **F146** (probe context + per-layer attribution lens) ·
  **F147** (`GroundingViolation.backendId`) · enrichment 4th-tier sentence —
  apply per their register wording (v59_6 §3). If any rider is larger than a
  small edit, carve it out and report — do not force-fit.

**G6 · Seal.** Reseal per living-doc lock-step if any mapped file is touched
(expect rev 129). `.agents` CHANGELOG entry. Full suite via CI (whole job green,
S56-2, single attempt — S55-1).

## §V · SELF-VERIFY (paste literal evidence)
1. Anchor rev-parse. 2. Head SHA + PR # + WHOLE CI job green (S56-2).
3. G0: grep-proof zero live `QUERY_TOPOLOGY`, 6 actions. 4. G1: derivation unit
test output (all 78 pairs enumerated → every derivable pair → existing category;
unmapped honesty; the MEASURED coverage split reported, not asserted).
5. G2: a test proving frame-primary produces the candidate set when frame
resolves + keyword fallback when null + `router.frameRouting=false` keeps
today's behavior BYTE-IDENTICAL (the reversible-floor proof). 6. G3:
clarification-fires + ALT-D honest-message tests. 7. G4: publish payload +
whether it's owner-tap or gated-script; floor-serves-until-published proof.
8. Empty≠zero + FULL-TRACE: routing `basis` visible on span/telemetry.
9. PLATINUM + freeze-independence statement (`router.prompt` ≠ `prompt.segment`).
10. Reseal rev.

## §M · REPORT & MERGE
Push, open PR, post §V. Do NOT merge until Architect FAST-GATE review → GO
(security/routing surface = migration-adjacent scrutiny on the derivation table +
the publish path). The `router.frameRouting` flip stays `false` (dark) at merge;
going live is a SEPARATE owner-consented param publish AFTER merge + a shadow
comparison (frame-primary vs keyword-primary on the accumulated synthetic
frames). Merge message:

`Merge PHASE IR-3: frame-driven candidate set — K1-A enum merge + (action×object)→category derivation + frame-primary flip (dark) + clarification active + ALT-D (BLOCK 1)`

Post-merge: delete branch `ir-3`.

<!-- END · claude-code-PHASE-IR-3-v1_2 · rev 1 · 2026-07-22 -->
