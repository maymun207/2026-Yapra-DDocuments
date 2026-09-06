<!-- relay-audit: v1 kind=card -->
# CARD-TOOL-VISIBILITY-B-1 · v2 — the offered set has five spellings and no catalogue-wide alarm: make the trace honest and give the checker a surface

This is the CODE half of `PHASE-TOOL-VISIBILITY-1`, approved by the owner by name. The DB half
landed as `CARD-TOOL-VISIBILITY-A-1-v2` and closed a live fault: `production` v4 published at
2026-09-03T10:20:43Z, and the trace proved the model could then see and call the tool. That card
fixed TODAY. This card fixes the CLASS, and the class is the reason the fault survived two days
without anybody noticing it.

Two defects, both measured in the source at the anchor below.

**The first is that the word `offered` names distinct populations at five sites, and the model was
handed only one of them.** A reader who compares them concludes the trace is broken; a reader who
trusts one at random builds on a number that does not describe the model's world.

**The second is that no surface anywhere counts the ACTIVE tools of a covered backend that appear
in NO published category.** That population is exactly what the four invisible tools were. The
catalogue discovers them automatically and correctly; nothing then says a word about them. The
owner's question was "why does nobody tell the checker" and this is the answer: the number that
would tell him is not computed, anywhere, by anything.

**A CORRECTION THE ARCHITECT OWES, IN THE CARD RATHER THAN BESIDE IT — AND THE CORRECTION ITSELF
WAS WRONG IN v1.** The Architect told the owner that the catalogue-wide counter already exists and
the gap was only a display problem, naming `unclassifiedCount` as the counter. That was wrong. v1
then explained WHY it was wrong by claiming `countExposure`'s predicate is per-BACKEND. That
explanation is ALSO wrong, and the scout measured it: `countExposure` calls `exposureOf`, whose own
prose reads "Resolve ONE tool's exposure" and "It takes a NAME and a MAP. It does not know about
coverage, and it must not" — it is per-TOOL already. The per-BACKEND predicate is
`isSubjectToFilter`, a DIFFERENT function in the same file.

The CONCLUSION survives and was re-measured on both lenses. `countExposure`'s own header says it
counts "over the set ACTUALLY OFFERED" and states outright that "`unclassified` is NOT
`uncoveredFlat.length`". So `unclassifiedCount` is a per-turn figure over an already-filtered set;
the catalogue-wide number genuinely does not exist. Right answer, wrong reason, twice — recorded
here rather than quietly repaired, because the reason is what a future reader inherits.

## PREMISE

MEASURED: at 2026-09-03T11:5xZ, `git rev-parse HEAD` in the owner's clone over the bridge, and the scout's independent `git ls-remote origin refs/heads/master` at 2026-09-03T11:56Z — both return the value in the `anchor` fence. The clone MOVED during this session: at 2026-09-03T04:29Z it stood three commits behind.
MEASURED: at 2026-09-03T11:5xZ, `sed -n '900,950p' api/cwf/_lib/turn/stageTools.ts` — the stage 07 span writes `offeredToolNames: [...ctx.offeredToolNames]` beside `offeredCount: toolDefs.length`, and those two are not the same population.
MEASURED: at 2026-09-03T11:5xZ, `sed -n '760,800p' api/cwf/_lib/turn/stageTools.ts` — `ctx.offeredToolNames = new Set(toolDefs.map((t) => t.name))`, a Set over RAW names, taken BEFORE the registration loop.
MEASURED: at 2026-09-03T11:5xZ, `sed -n '990,1045p' api/cwf/_lib/turn/stageTools.ts` — the registration loop sanitises each name with `.replace(/[^a-zA-Z0-9_]/g, '_')`, then calls `claimToolName`, and on refusal executes `continue`, writing NEITHER `toolToServerMap` NOR `vercelTools`. The model is handed `ctx.vercelTools` and nothing else.
MEASURED: at 2026-09-03T11:5xZ, `sed -n '232,246p' api/cwf/_lib/turn/stageTools.ts` — `checkRoutingContainment` tests `ctx.offeredToolNames.has(toolName)` and, on a miss, EMITS a `routing_mismatch` telemetry row whose payload carries `offeredCount: ctx.offeredToolNames.size`.
MEASURED: at 2026-09-03T11:5xZ, `sed -n '1055,1062p' api/cwf/_lib/turn/stageTools.ts` — that function is called with `toolDef.name`, the RAW name, from inside the execute closure. Raw name tested against a raw-name Set: consistent TODAY, and consistent only while both stay raw.
MEASURED: at 2026-09-03T11:5xZ, `sed -n '1832,1842p' api/cwf/_lib/turn/stageTools.ts` — the `[ToolRegistry]` console line ALREADY prints `registered=${Object.keys(ctx.vercelTools).length}` and `collisions=${collisions.length}`, and the refused count ALREADY rides the active span as `ATTR_TOOL_COLLISION_COUNT`.
MEASURED: at 2026-09-03T11:5xZ, `grep -n 'offeredToolCount' api/cwf/_lib/turn/stageStream.ts` — stage 08 stamps `offeredToolCount: Object.keys(ctx.vercelTools).length`, recomputing at a second site what line 1835 already computed.
MEASURED: at 2026-09-03T11:5xZ, `sed -n '303,310p' api/cwf/_lib/turn/stageTools.ts` — the local names are seeded into `toolNameClaims` directly, WITHOUT passing through `claimToolName`, so they never generate a collision record for themselves.
MEASURED: at 2026-09-03T11:5xZ, `sed -n '105,115p;140,150p;165,178p' api/cwf/_lib/routing/backendCoverage.ts` — `exposureOf` is documented "Resolve ONE tool's exposure" and "It takes a NAME and a MAP. It does not know about coverage, and it must not"; `countExposure` is documented "counted over the set ACTUALLY OFFERED" and "`unclassified` is NOT `uncoveredFlat.length`".
MEASURED: at 2026-09-03T11:5xZ, `grep -n 'Staged drafts' src/components/admin/GovernanceTab.tsx` — the backlog figure the owner sees renders at line 816 as a TAB LABEL, reachable only by someone already standing on the Governance tab looking for it.
DECAYS on any commit touching `turn/stageTools.ts`, `turn/stageStream.ts`, `routing/backendCoverage.ts` or the admin backend-tools routes, and on any further movement of the clone. Re-read the named regions at ORDER A; a moved line is not a moved fact, but a changed predicate is.
ON-DISAGREEMENT: if `ctx.offeredToolNames` is no longer assigned from raw `toolDefs`, or `claimToolName` no longer `continue`s on refusal, or `checkRoutingContainment` is no longer called with the raw name — STOP and report what you read. The whole card rests on those, and a card that patches a file it no longer describes is worse than one that stops.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the word `offered` names distinct populations at the five sites enumerated, and the model receives only `ctx.vercelTools` | MEASURED: sed over the five named regions of stageTools.ts and stageStream.ts at 2026-09-03T11:5xZ, each site quoted with its line, re-derived by the scout on its own lens | sites |
| `ctx.offeredToolNames` the SET has a live production consumer that tests it with RAW names and emits telemetry on a miss | MEASURED: sed over the checkRoutingContainment definition and its call site at 2026-09-03T11:5xZ, both quoted | sites |
| the registered count and the refused count are ALREADY computed and already published, at a console line and a span attribute | MEASURED: sed over the ToolRegistry block at 2026-09-03T11:5xZ, both expressions quoted | sites |
| `exposureOf` is per-TOOL and `isSubjectToFilter` is the per-BACKEND predicate, and the catalogue-wide number is absent regardless | MEASURED: sed over three regions of backendCoverage.ts at 2026-09-03T11:5xZ, the module's own sentences quoted | sites |
| the arithmetic can close, because the local names bypass claimToolName and the local mounts are unconditional | MEASURED: sed over the claims-map seeding at 2026-09-03T11:5xZ, plus the scout's independent reading of the three local mount sites and the guard that closes before them | sites |
| the named readers of the backend_tools mirror do not compute the catalogue-wide join, and the backlog figure is a tab label | MEASURED: two lenses at 2026-09-03T11:5xZ — a grep for the mirror name over api and src, and a second grep for the word unclassified — with each named member attributed to the command that returned it | surfaces |
| the clone's HEAD equals origin/master, and the clone moved during this session | MEASURED: git rev-parse HEAD over the bridge at 2026-09-03T11:5xZ and the scout's independent git ls-remote at 2026-09-03T11:56Z, agreeing | anchor |
| whether GATE 2's route needs an RLS policy or an index that this card does not authorise | NOT-READ | ORDER C stops and reports if it does; this card grants no migration |

```evidence:anchor
The anchor both lenses returned:

  d8895114744dbb23ba5633d726a0814cfe0468d5

`git rev-parse HEAD` in the owner's clone at 2026-09-03T11:5xZ, and
`git ls-remote origin refs/heads/master` on the scout's own lens at 2026-09-03T11:56Z.
At 2026-09-03T04:29Z the same clone stood three commits behind this value.
```

```evidence:sites
The five spellings, quoted, and the one the model actually got:

  stageTools.ts ~780    ctx.offeredToolNames = new Set(toolDefs.map((t) => t.name))
                        -> RAW names, deduped, taken BEFORE registration.
                           THIS IS A LIVE PREDICATE, not just a report — see below.

  stageTools.ts ~922    offeredToolNames: [...ctx.offeredToolNames]
                        offeredCount: toolDefs.length
                        -> the span field mirrors the raw Set; the count beside it
                           is the raw candidate list, NOT deduped, and includes
                           names that are about to be refused

  stageTools.ts ~241    payload: { kind: 'routing_mismatch', ...,
                                   offeredCount: ctx.offeredToolNames.size }
                        -> a third figure under a name already used for a different
                           population one file over

  stageTools.ts ~1835   [ToolRegistry] registered=Object.keys(ctx.vercelTools).length
                                       collisions=collisions.length
                        -> the honest pair, ALREADY COMPUTED, printed to a console
                           line and never lifted into the stage 07 span

  stageStream.ts 166    offeredToolCount: Object.keys(ctx.vercelTools).length
                        -> the same honest figure, RECOMPUTED at a second site

The live predicate, and why it is the dangerous one:

  stageTools.ts ~237    if (ctx.offeredToolNames.has(toolName)) return;
  stageTools.ts ~1059   checkRoutingContainment(ctx, toolDef.name)
                        -> RAW name tested against a RAW-name Set. Consistent today.
                           Consistent ONLY while both stay raw.

The subtraction nobody publishes, and why it can be closed:

  stageTools.ts ~1004   const safeName = toolDef.name.replace(/[^a-zA-Z0-9_]/g, '_')
  stageTools.ts ~1006   if (!claimToolName(...)) continue
  stageTools.ts ~306    toolNameClaims.set(localName, ...) for each LOCAL_TOOL_NAMES
                        -> seeded WITHOUT claimToolName, so the local names generate
                           no collision record for themselves, while a backend tool
                           sanitising onto one IS refused and IS recorded

The live turn that exposed the disagreement was read from the admin latest-turn-trace
surface at 2026-09-03T10:29:17Z, immediately after the production category publish. The
turn id is deliberately NOT pasted here — it is not forty hex and a lane must never copy
one as though it were an anchor. Read the most recent turn yourself at ORDER D; the
disagreement reproduces on any turn.
```

```evidence:surfaces
PROVENANCE FIRST, because v1's fence claimed a membership it had not computed and the
scout caught the same defect in this card's predecessor. `grep -rln backend_tools api src`
returns sixty-nine files. This fence does NOT enumerate them. It names a SELECTED subset,
each member attributed to the command that produced it, and the selection rule is stated:
a file is named here only if it was READ and found to compute something about the mirror's
membership.

  from `grep -rln backend_tools api src`:
    api/admin/backend-tools.ts               lists the mirror for a backend
    api/admin/backend-tools/sync.ts          fills the mirror from the live catalogue
    api/admin/backend-tools/stage-drafts.ts  stages annotation drafts
    api/admin/backends.ts                    backend records, not tool membership
    src/components/admin/CensusTab.tsx       probe results per tool
    src/components/admin/RoutingTab.tsx      routing curation over keywords

  from `grep -n 'Staged drafts' src/components/admin/GovernanceTab.tsx`, and NOT from the
  mirror grep — v1 named this file under the wrong command and that was the defect:
    src/components/admin/GovernanceTab.tsx   the draft backlog, a TAB LABEL at line 816

  from a SECOND lens, `grep -rln unclassified api src`, which returns fifty-one files:
    healthCoverage.ts and RoutingTab.tsx render a per-table id and a per-tool badge.
    Neither is the catalogue-wide join.

  ALREADY CO-RESIDENT, and this changes what GATE 2 costs rather than what it claims:
    RoutingTab.tsx holds the published categories and the mirror GET in ONE component's
    state. Nothing joins them.

  NONE of the above answers: which ACTIVE tools of a COVERED backend appear in no
  published armes.tool_category row. Two lenses, one negative each, and the module
  prose of backendCoverage.ts agreeing that its own counter is not that number.
```

## ORDER A — READ BEFORE YOU WRITE

Re-take the PREMISE readings at your own HEAD, which the clone has already moved once this session
— confirm `git rev-parse HEAD` before anything else and STOP if it disagrees with the anchor.

Then settle the NOT-READ row by DESIGN rather than by grep: decide whether the GATE 2 route can be
served by the same guard and the same client every other `api/admin/*` route uses. If it needs a
new RLS policy, a new grant or a new index, STOP and report. This card authorises no migration and
no database function, and the lane that discovers it needs one has found a finding, not a chore.

## ORDER B — GATE 1: ONE POPULATION PER NAME

**READ THIS SENTENCE BEFORE ANY OTHER IN THIS ORDER. The words `offeredToolNames` name TWO
different objects, and the two have opposite consequences.**

- **`ctx.offeredToolNames`, THE SET, STAYS THE RAW `toolDefs` SET. Do not touch it.** It is not a
  report; it is the live predicate `checkRoutingContainment` tests, and that function is called at
  the execute closure with the RAW `toolDef.name`. Give the Set sanitised or registered names and
  every tool whose raw name needed sanitising becomes a FALSE `routing_mismatch` on every call —
  silently, in the very telemetry this project measures routing by. The function's own doc states
  the invariant it rests on. If you believe the Set must change, then the call site changes in the
  SAME commit or neither changes.
- **The SPAN FIELD at the stage 07 output MAY carry the registered set**, and that is the whole of
  GATE 1's freedom.

With that settled, make the stage 07 span describe the world the model was handed. The registered
set is knowable only AFTER the registration loop, so these fields are computed there:

- the REGISTERED names and their count — `Object.keys(ctx.vercelTools)` snapshotted after
  registration completes, which is definitionally what the model saw
- the CANDIDATE count, under a name that says candidate, so the pre-filter figure survives
- the REFUSED count. Note before you write it: this already rides the span as
  `ATTR_TOOL_COLLISION_COUNT` and already prints on the `[ToolRegistry]` line. Lift the EXISTING
  value into the stage 07 output; do not compute a second one, which would be the defect this card
  exists to remove, committed inside its own remedy.

The arithmetic must CLOSE and a test must assert that it closes: candidates, minus duplicate raw
names, minus refusals, plus the locally-registered tools, equals the registered count. The
ingredients were verified: the local names bypass `claimToolName`, and the local mounts sit outside
the guard that closes the MCP branch, so they are unconditional — the identity holds on a no-MCP
turn too, where it reads zero minus zero minus zero plus the local mounts.

**DECISION-PARITY ON BOTH SIDES.** `registered=` is computed at the `[ToolRegistry]` line AND again
at `stageStream.ts:166`. That is exactly the ADR-013 DECISION-PARITY-1 shape this card invokes, and
it is already live. Both sides read one snapshot, or you state in the report why one of them cannot.

Expect `registerToolsSpanIO.test.ts` to go RED on its `offeredToolNames` equality assertions. That
is the test working, not a regression — update it and say so in the report.

## ORDER C — GATE 2: THE CHECKER'S SURFACE

Give the catalogue-wide unclassified population a place to be seen.

Add a read-only admin route that answers, for one backend: which rows of `backend_tools` are
`status='active'` and appear in NO published `armes.tool_category` row, returned as names with
their `first_seen_at`.

**The predicate here is per-TOOL and that is correct, because this is a REPORT and not a FILTER.
Do NOT compose a fresh paragraph explaining that distinction.** It is already worked out, in the
module you must not modify: `backendCoverage.ts`'s `exposureOf` header, the paragraph beginning "It
takes a NAME and a MAP. It does not know about coverage, and it must not". CITE that paragraph by
its opening words. A second, independently worded explanation of one distinction is how the two
drift apart, and this card was itself corrected twice for getting that distinction wrong in prose.

Do NOT import, call, extend or modify anything in `routing/backendCoverage.ts`. The routing
predicate is not in scope and must not acquire a second caller with a different appetite.

Surface the count where a checker meets it without hunting: a badge on the admin Control Plane
entry point, rendered whether it is zero or not, because an omitted badge and a clean one are the
same observation. Zero renders as zero.

The same route answers the REVERSE QUERY the owner ruled a prerequisite: given a tool name, which
published categories and which published annotations name it. One route, both directions, because
they are one join read from two ends.

## ORDER D — GATE 3: PROVE IT ON A TURN, NOT ON A TEST

A green test is not evidence that production changed. After merge and deploy, send one ordinary
production turn and read its stage 07 output. Report the registered count, the candidate count,
the refused count, and that the arithmetic closes on live data. Then read the new admin route for
backend `armes` and report the returned names in full — enumerate them, do not search them, and if
the list is empty say EMPTY rather than reporting a count of zero as if the query had failed.

The three named tools whose annotations are still unpublished — `getOrdersByDate`,
`getEmployeesByShiftAndDate`, `getMaterialListByFactory` — are expected to appear in that list.
Their appearance is the acceptance evidence for GATE 2: the surface that would have caught the
original fault, catching the remainder of it. Publishing them is NOT this card's work.

## ORDER E — REPORT

Open a pull request. Then file `from_lane` with artifact name
`TOOL-VISIBILITY-B-1-<your-address>-report`, carrying the ORDER A readings including your HEAD,
the branch and pull request number, the arithmetic assertion's own numbers, every test you changed
and why, and the ORDER D live readings in full.

## FALSIFIER

This card is wrong if ORDER A finds the figures already agree at HEAD, or that `ctx.vercelTools` is
not what the model receives, or if the catalogue-wide query returns the routing filter's answer
rather than a per-tool one. The scout tested the first two arms directly and neither triggered.

## SHARED SURFACES

Repository files under `api/cwf/_lib/turn/`, one new route under `api/admin/`, the admin entry
point component, and the tests that assert over the changed fields. One branch, one pull request.
No migration. No database function. No RLS policy. No governed row is written, published or
archived. No secret is read or rotated. No deletions. `routing/backendCoverage.ts` is READ and NOT
MODIFIED. `ctx.offeredToolNames` the Set is READ and NOT REDEFINED.

## DECISION RIGHTS

The owner approved `PHASE-TOOL-VISIBILITY-1` by name and ordered under
`OWNER-RULING-S129-SOTA-GAP-DISPOSITION-1` that G-4 is a prerequisite and the rest is not shrunk.
GATE 1 advances `API-Bank` by making routing measurable; GATE 2 carries G-4 and G-5. Neither is
deferrable on convenience by anyone, the Architect included.

You decide the shape of the code and the route. You decide NOTHING about which object
`offeredToolNames` names in ORDER B, and NOTHING about composing your own version of the per-tool
versus per-backend paragraph in ORDER C. Those two are load-bearing and are the reason both are
spelled out at length.

BODIES: `PLATINUM` · `SOTA-1` · `S63-1` (the merge is not the evidence; the live turn is) ·
`TOTAL-45` · `empty ≠ zero` · `S61-2` · `ADR-013 DECISION-PARITY-1`.

fanout: personalized

```deliverables
branch: phase/tool-visibility-b-1
report: bus row from_lane, artifact_name TOOL-VISIBILITY-B-1-<your-address>-report
```

```evidence:supersedes
This version supersedes CARD-TOOL-VISIBILITY-B-1-v1 under S37-1. v1 is immutable and is not
edited. THE VERSION STAMPS ARE EXEMPT: title and tail anchor map to the re-cut itself. Every OTHER
difference maps to the scout note that forced it (verdict artifact_name
SCOUT-CARD-REVIEW-TOOL-VISIBILITY-B-1-verdict, from_lane, 2026-09-03T11:56:28Z, verdict AMBER). A
changed line that maps to nothing here, and is not a version stamp, is a silent edit and finding
one is a RED:

  ORDER B opens by naming WHICH        <- the AMBER itself: v1 never said whether
    object offeredToolNames means,        offeredToolNames meant the span field or the context
    and forbids touching the Set          Set. Applied to the Set, an obedient lane turns every
                                          sanitised tool into a false routing_mismatch on every
                                          call, in the telemetry routing is measured by
  the title and the sites fence        <- the scout's undercount finding: v1 said three sites;
    say five spellings, adding the        the payload at 241 and the ToolRegistry pair at 1835
    routing_mismatch payload and          are two more, and 1835 already computes the honest
    the ToolRegistry pair                 numbers v1 asked to be invented
  ORDER B lifts the EXISTING refused   <- the same finding: the refused count already rides the
    count instead of computing one        span as ATTR_TOOL_COLLISION_COUNT
  ORDER B adds the both-sides          <- the scout's live-defect finding: registered= is
    DECISION-PARITY instruction           computed at 1835 AND stageStream.ts:166, and v1
                                          ordered only the stream side fixed
  ORDER B warns registerToolsSpanIO    <- the scout's reader survey: that test asserts the old
    will go RED and calls it correct      population and will fail by design
  the correction paragraph names       <- the scout's mis-siting finding: exposureOf is per-TOOL
    exposureOf per-TOOL and                already; isSubjectToFilter is the per-BACKEND
    isSubjectToFilter per-BACKEND,         predicate. v1's conclusion was right for a wrong
    and says the conclusion survived       reason, which is the reason a future reader inherits
  ORDER C orders the lane to CITE      <- the same finding turned into an instruction: the
    backendCoverage's own paragraph        distinction is already written in the module the card
    rather than compose a rival one        forbids touching
  the surfaces fence states its        <- the scout's provenance defect, the second card running:
    selection rule, gives the grep's       v1 claimed "every reader" from a grep returning
    real size, attributes each member      sixty-nine files while naming six, and named
    to its own command, and adds a         GovernanceTab.tsx under a command whose output does
    second lens                            not contain it
  the surfaces fence records that      <- the scout's new finding: RoutingTab.tsx already holds
    both halves of GATE 2's join            both halves in one component's state, which changes
    are already co-resident                 what GATE 2 costs, not what it claims
  PREMISE and ORDER A carry the HEAD   <- the scout's cross-card measurement: the clone moved
    and order a STOP on disagreement       from three-behind to the anchor during this session
  ORDER A settles the NOT-READ row     <- the scout SETTLED v1's NOT-READ row: no production
    by design, and the row is now           reader consumes the span output's list. The open
    the RLS/index question                  question that remains is the route's own authority
  CLAIMS gains the rows for the        <- each new measurement needs its claim; a fence member
    live predicate, the existing            with no claim is an unanchored assertion
    counters, the module prose and
    the arithmetic ingredients

UNCHANGED and deliberately so: ORDER D's live-turn proof, the three unpublished annotation names,
and the SHARED SURFACES prohibition on migrations. The scout could not verify the PREMISE's
database-side history — the production publish instant is the Architect's own reading — and that
stands unreviewed. A GREEN grammar verdict is not an endorsement of unread facts.
```

TAIL ANCHOR: CARD-TOOL-VISIBILITY-B-1-v2 ends here.
