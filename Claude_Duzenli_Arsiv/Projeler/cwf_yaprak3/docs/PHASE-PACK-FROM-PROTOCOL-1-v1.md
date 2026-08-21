# PHASE-PACK-FROM-PROTOCOL-1-v1 — a backend's prompt pack is DERIVED, not authored

<!-- S98 · Architect-authored · lane AG-2 · Wave-5 MAIN · walk item #13
     (+W-035). Filed through relay_inbox (single-line). -->

## PRECONDITION (S47-1)
Fresh clone at `origin/master` = `cc9a2a78de473b2ec6eeb3d38641780cc781851b`
(rev 249 · 575 vitest test files · 77 migrations · 15 ADRs · drift 7/7 ·
zero `phase/*`). Disagreement → STOP and report.

## WHY (the criterion)
#16 lets a backend MOUNT without code. This phase is its twin: once
mounted, that backend must be able to be TALKED ABOUT without code. Today
a backend's domain pack is hand-authored TypeScript — read live:
`api/cwf/_lib/knowledge/backends/` holds exactly two directories,
`armes/` and `superset/`, each a hand-written module set (glossary,
formats, metrics, blindSpots, toolGraph, personaText, render). A sixth
backend mounted tomorrow gets NO pack, and writing one is an engineering
project — the exact thing the SOTA claim denies. The pack must be
DERIVED from what the protocol already gives us (tool names, descriptions,
schemas, the mirror, the census) with governed rows as the override layer.

## CLAIMS (S97-L1 — computed live this session; each names its source)
- `knowledge/backends/` contains exactly `armes/` and `superset/`
  (directory listing) — two hand-authored packs, five live backends.
- The mirror already holds per-backend tool inventory: armes 150 ·
  superset 26 · machine-knowledge-base 5 · honestbench 4 · system 0
  (`backend_tools` count per `backends` row, read live).
- `tool_behavior_census` (S96/S97) already records, per probed tool, the
  observed call shape and response field names — 97/97 walked in S97.
  **That is derivation raw material, and it is already in the house.**
- ADR-009 governs the shape of this work: topology is DISCOVERED, never
  hand-authored. A derived pack is the same law applied to vocabulary.
- ADR-011 / catalog write-lock: nothing derived here may widen exposure.

## THE SHAPE
### R1 — a DERIVED pack for any backend, from protocol facts only
One pure module: mirror rows (+ census rows where present) → a rendered
domain section. Zero backend-specific strings in the module — prove it
the way `gatewayCapabilityIndex.ts` was proven (a red-team test seeding a
FAKE backend id and asserting its output contains no existing backend's
name). What it may render: tool inventory grouped legibly, parameter
shapes, observed response fields, declared value spaces. What it may
NEVER render: invented semantics, guessed units, business meaning nobody
declared — a derivation that guesses is a hallucination with a schema.

### R2 — the two hand packs become the OVERRIDE layer, not the floor
armes/superset keep serving byte-identically on day one
(characterization-pinned — no prompt text may change without a governed
publish, S80-3). The derived pack fills where no hand pack exists. State
the precedence in one sentence in code and hold it with a test.

### R3 — absence is honest
A backend with an empty mirror gets NO section, never an empty heading
and never a fabricated one (empty≠zero). An unreadable mirror degrades
BY NAME (MEASURE-READ-HONESTY-1), never silently to "this backend has
no tools".

### R4 — W-035 rides here
Fold the standing W-035 item (carried in the register since the 2E rail
opened). Read it, state what it asks, and either close it in this phase
or say by name why it does not belong — never silently drop it.

## FENCE (exhaustive; intersections with the three sibling lanes = ∅)
CREATE: `api/cwf/_lib/knowledge/backends/derivedPack.ts` (+ `__tests__`) ·
`docs/relay/PHASE-PACK-FROM-PROTOCOL-1-report.md`
EDIT: `api/cwf/_lib/knowledge/backends/armes/**` and `superset/**` ONLY
where precedence wiring demands it · the compose/render entry point that
assembles per-backend sections · `api/cwf/_lib/knowledge/DbKnowledgeProvider.ts`
if the derived read needs a warm slot (its own try/catch — an outage
disables the section, never the slice)
PLUS: `.agents/CHANGELOG.md` · `.agents/skills/cwf-project-kb/SKILL.md`
**FORBIDDEN THIS WAVE (allocated to siblings):** `shared/dbConstants.ts` ·
`shared/grantPolicy.ts` · `scripts/verifyGrants.ts` ·
`knowledge/reference/agentParams.ts` · `api/cwf/_lib/backends/**` ·
`api/cwf/_lib/routing/**`. If your work genuinely needs one of these,
STOP and ask — do not route around it.
No migration stamp is allocated to this lane: this phase should need none.
If you conclude it does, that is a STOP-and-ask, not a decision.

## FALSIFIERS
(a) Seed a fake backend id with fake mirror rows → a pack renders, and it
    contains zero tokens naming any real backend.
(b) armes and superset prompt output is BYTE-IDENTICAL before/after
    (characterization test over the composed prompt).
(c) Empty mirror → section absent, not empty. Unreadable mirror → named
    degradation. Both forced, not hoped for.
(d) No derived text can widen tool exposure: a write-annotated tool never
    gains reachability through this path (grep + behavioural pin).

## BIRTH PROOF (S93-1, inside this phase)
Render the derived pack for a backend that has NO hand pack today —
`machine-knowledge-base` (5 mirror tools) is the natural subject — and
paste the rendered section verbatim in the report. If it reads as
useless, SAY SO: a derived pack nobody would want is a finding, not a
failure to hide.

## DELIVERY (S91 gate)
Branch `phase/pack-from-protocol-1` — PUSH · PR against master · report at
the path above · seal only if you touch a mapped file (provisional, own
commit, DROP-AT-MERGE, docVersion NOT bumped — S95-1). NO per-lane GO:
build, push, report, then **re-enter MAIL-WAIT** — the GO-TRAIN is mail.

<!-- END · PHASE-PACK-FROM-PROTOCOL-1-v1 -->
