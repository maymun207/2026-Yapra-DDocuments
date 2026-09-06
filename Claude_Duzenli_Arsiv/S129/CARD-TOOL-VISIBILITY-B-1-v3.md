<!-- relay-audit: v1 kind=card -->
# CARD-TOOL-VISIBILITY-B-1 · v3 — the offered set has five spellings, and the alarm the checker needs is the UNANNOTATED count, not the uncategorised one

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
MEASURED: at 2026-09-03T12:1xZ, a single grouped select over `backend_tools` and the published `armes.tool_category` and `armes.tool_annotation` rows on the project fence `fjbrkimwvtpwoxhziidh` — the counts are in the `population` fence. The set of ACTIVE armes tools appearing in NO published category is FORTY-SEVEN, of which FORTY-FOUR carry a published `write` annotation, ZERO carry a published `read` annotation, and THREE carry no published annotation at all.
MEASURED: at 2026-09-03T12:1xZ, the same select narrowed to the unannotated slice, ordered by `first_seen_at` — it returns exactly the names in the `population` fence, and they are exactly the three tools whose annotations this session left unpublished. A closed enumeration, not a search.
MEASURED: at 2026-09-03T12:0xZ, the scout's independent reading of `toolCategories.ts` lines 146-160 and `backendCoverage.ts` lines 33-38 — ADR-011 CATALOG-WRITE-LOCK-1 states that no tool carrying `exposure: write` may appear in any category array, held by a CI test that re-derives the write set from the real classifier. The forty-four are excluded BY LAW and can never leave that count without repealing ADR-011.
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
| the uncategorised-active population is FORTY-SEVEN and its floor is the FORTY-FOUR write-annotated tools ADR-011 excludes by law, so it can never read zero | MEASURED: grouped select over backend_tools and the published category and annotation rows at 2026-09-03T12:1xZ, every bucket counted in one pass | population |
| the UNANNOTATED slice is THREE and its members are exactly the three tools this session left unpublished | MEASURED: the same select narrowed and ordered by first_seen_at at 2026-09-03T12:1xZ, the names enumerated in full | population |
| ADR-011 forbids a write-exposed tool from appearing in any category array, and a CI test re-derives that set from the real classifier | MEASURED: the scout's reading of toolCategories.ts 146-160 and backendCoverage.ts 33-38 at 2026-09-03T12:0xZ, quoted in its verdict | population |
| whether GATE 2's route needs an RLS policy or an index that this card does not authorise | NOT-READ | ORDER C stops and reports if it does; this card grants no migration |

```evidence:anchor
The anchor both lenses returned:

  d8895114744dbb23ba5633d726a0814cfe0468d5

`git rev-parse HEAD` in the owner's clone at 2026-09-03T11:5xZ, and
`git ls-remote origin refs/heads/master` on the scout's own lens at 2026-09-03T11:56Z.
At 2026-09-03T04:29Z the same clone stood three commits behind this value.
```

```evidence:population
Read in one grouped select at 2026-09-03T12:1xZ on the project fence, and then narrowed
once and ordered by first_seen_at. Both readings are enumerations, not searches.

  active armes tools in the mirror                                145
  distinct tool names across all published categories              98
  published armes.tool_annotation rows                            142

  ACTIVE and in NO published category                              47
      of which: published exposure = write                         44   <- ADR-011 FLOOR
                published exposure = read                           0
                NO published annotation at all                      3   <- THE ALARM

The three, with the instant each was discovered:

  getEmployeesByShiftAndDate    first_seen 2026-08-28 11:31:54+00
  getMaterialListByFactory      first_seen 2026-09-01 08:31:00+00
  getOrdersByDate               first_seen 2026-09-01 09:31:53+00

WHY THE UNANNOTATED SLICE IS THE ALARM AND THE OTHER TWO ARE NOT. A tool with no published
annotation CANNOT be admitted to a category: the eval-gate's REFERENTIAL rule refuses the
publish outright, and it did so in this session, in the owner's own hands, with the message
"tool_category 'production' includes unclassified tool 'getOrdersByDate' — add a
tool_annotation first". That refusal is the pipeline's real chokepoint. On the day the
fault began this count read FOUR; the DB half of this phase published one annotation and
one category and it now reads THREE. It is a number that moves when the fault moves.

The forty-four move only if ADR-011 is repealed, and the zero is a genuine empty that would
become an alarm the moment a read-annotated tool were left out of every category.
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

## ORDER C — GATE 2: THE CHECKER'S SURFACE, AND THE COUNT IT ACTUALLY SHOWS

Give the checker a number that MOVES WHEN THE FAULT MOVES. v1 and v2 ordered the wrong one and the
scout was right to call it RED: "which active tools appear in no published category" reads
FORTY-SEVEN today and can never fall below FORTY-FOUR, because ADR-011 excludes every
write-annotated tool from every category BY LAW. A badge that opens at forty-seven would have moved
to about fifty-one when the four invisible tools arrived, and no checker alive reads that as an
event. It is the born-barking signal this project has already ruled worse than no signal at all.

Add a read-only admin route that returns, for one backend, the population PARTITIONED into three
named buckets, each with its members and their `first_seen_at`:

- **UNANNOTATED** — active in the mirror, no published `armes.tool_annotation`. **This is the
  alarm.** It reads THREE today and read FOUR on the day the fault began. A tool in this bucket
  cannot be admitted to a category at all: the eval-gate's REFERENTIAL rule refuses the publish,
  and it did exactly that in this session with the message quoted in the `population` fence.
- **ANNOTATED READ, UNCATEGORISED** — a genuine empty today, and a real alarm the moment it is not.
  Do not collapse it into the bucket above because it happens to read zero: `empty ≠ zero`, and a
  bucket that exists at zero is how the first non-zero day becomes visible.
- **ANNOTATED WRITE, UNCATEGORISED** — the ADR-011 floor. Reported, labelled as expected, and it
  NEVER alarms. Label it in the response with ADR-011's name so a future reader does not "fix" it.

The exposure predicate is `seedExposureOf`, exported at
`api/cwf/_lib/knowledge/reference/referenceData.ts`, which is the predicate ADR-011 is itself
written in terms of. Use that one; do not write a second classifier.

**The per-tool predicate here is correct, because this is a REPORT and not a FILTER. Do NOT compose
a fresh paragraph explaining that distinction.** It is already worked out, in the module you must
not modify: `backendCoverage.ts`'s `exposureOf` header, the paragraph beginning "It takes a NAME and
a MAP. It does not know about coverage, and it must not". CITE that paragraph by its opening words.
A second, independently worded explanation of one distinction is how the two drift apart, and this
card was corrected twice for getting that distinction wrong in prose.

Do NOT import, call, extend or modify anything in `routing/backendCoverage.ts`. The routing
predicate is not in scope and must not acquire a second caller with a different appetite.

Surface **the UNANNOTATED count and only that count** as the badge on the admin Control Plane entry
point, rendered whether it is zero or not, because an omitted badge and a clean one are the same
observation. Zero renders as zero — and here zero is REACHABLE, which is the whole difference
between this order and the one it replaces. The other two buckets live inside the panel the badge
opens, never on the badge.

The same route answers the REVERSE QUERY the owner ruled a prerequisite: given a tool name, which
published categories and which published annotations name it. One route, both directions, because
they are one join read from two ends.

## ORDER D — GATE 3: PROVE IT ON A TURN, NOT ON A TEST

A green test is not evidence that production changed. After merge and deploy, send one ordinary
production turn and read its stage 07 output. Report the registered count, the candidate count,
the refused count, and that the arithmetic closes on live data.

Then read the new admin route for backend `armes` and report ALL THREE BUCKETS in full — enumerate
the members, do not search them, and if a bucket is empty say EMPTY rather than reporting a count of
zero as if the query had failed.

The acceptance evidence is SPECIFIC and it is the reason ORDER C was re-cut: the UNANNOTATED bucket
must return exactly `getEmployeesByShiftAndDate`, `getMaterialListByFactory` and `getOrdersByDate`,
and NOTHING else. If it returns those three beside forty-four others, the partition was not built
and the badge is the useless one this card exists to prevent. Publishing those three annotations is
NOT this card's work — their appearance ALONE, in their own bucket, is the proof.

Report the ANNOTATED WRITE bucket's size beside ADR-011's name. If it is not in the neighbourhood
of forty-four, say so and stop: either the write-lock moved or the query is not the one this card
describes, and both are findings rather than chores.

## ORDER E — REPORT

Open a pull request. Then file `from_lane` with artifact name
`TOOL-VISIBILITY-B-1-<your-address>-report`, carrying the ORDER A readings including your HEAD,
the branch and pull request number, the arithmetic assertion's own numbers, every test you changed
and why, and the ORDER D live readings in full.

## FALSIFIER

This card is wrong if ORDER A finds the figures already agree at HEAD, or that `ctx.vercelTools` is
not what the model receives, or if the UNANNOTATED bucket returns anything other than the three
names in the `population` fence. Two scout windows tested the first two arms directly and neither
triggered. The third arm is new in v3 and is the one to watch: if the bucket comes back with
forty-seven members, the partition was not built and the badge is born barking again.

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
This version supersedes CARD-TOOL-VISIBILITY-B-1-v2, which superseded v1, both under S37-1. Neither
is edited. THE VERSION STAMPS ARE EXEMPT: title and tail anchor map to the re-cut itself.

v2's own supersedes fence recorded what the FIRST scout verdict (2026-09-03T11:56:28Z, AMBER)
forced, and every one of those changes is CARRIED INTO v3 UNCHANGED. v3 exists because a SECOND
scout window reviewed the same v1 independently (verdict artifact_name
SCOUT-CARD-REVIEW-TOOL-VISIBILITY-B-1-verdict, from_lane, 2026-09-03T12:05:17Z) and returned RED on
GATE 2 — a defect the first window did not reach. Its two AMBERs were the first window's two, and
v2 had already answered both; its RED was new and v2 did not answer it. A changed line that maps to
nothing here, and is not a version stamp, is a silent edit and finding one is a RED:

  ORDER C is rewritten to partition   <- the RED itself: "active and in no published category" is
    the population into UNANNOTATED       FORTY-SEVEN with a FORTY-FOUR floor that ADR-011 fixes by
    (the alarm) · annotated-read          law, so the badge can never read zero and would have moved
    (a live empty) · annotated-write      only from about forty-four to about forty-eight when the
    (the ADR-011 floor), and the          four invisible tools arrived. The scout named this the
    badge shows ONLY the first             born-barking class this project rules worse than silence
  the alarm bucket is UNANNOTATED,    <- the Architect's own live measurement, which the scout could
    not merely uncategorised              not take (its SQL verb is fenced, correctly): the
                                          annotated-read-uncategorised slice is ZERO, and the whole
                                          alarm is the three unannotated tools. The causal chain is
                                          measured too — no annotation means the eval-gate REFUSES
                                          category membership, which is the refusal the owner met
                                          in this session by name
  ORDER C names seedExposureOf as     <- the scout's remedy, taken verbatim: it is the predicate
    the predicate to use                  ADR-011 is itself written in terms of, and using it
                                          touches nothing in routing/backendCoverage.ts
  ORDER D's acceptance evidence is    <- the same RED, carried into the proof: v2 expected the three
    that the bucket returns EXACTLY       names "to appear in that list", which they would have done
    three names and nothing else          beside forty-four others, proving nothing
  ORDER D orders the write bucket     <- the same RED: the floor must be reported and labelled so a
    reported beside ADR-011's name        future reader does not "fix" it
  the FALSIFIER gains a third arm     <- the same RED: a forty-seven-member bucket is the failure
                                          mode this version exists to prevent
  PREMISE gains three live-count      <- the Architect's measurement plus the scout's source
    readings and the population fence     reading of ADR-011's write-lock. The scout marked its own
                                          numbers UNMEASURED and quoted from source prose; these
                                          are readings of the database itself, and the fence says
                                          which is which
  CLAIMS gains a row for the          <- each new measurement needs its claim; a fence member with
    population count, a row for the       no claim is an unanchored assertion
    unannotated slice, and a row for
    ADR-011's write-lock
  the title names the corrected       <- v2's title advertised the wrong half of the remedy
    alarm

UNCHANGED and deliberately so: every GATE 1 instruction, including the span-field-versus-context-Set
sentence that was the first window's AMBER; ORDER A; the SHARED SURFACES prohibition on migrations;
and the correction paragraph recording that the Architect's own reason was wrong twice. The second
scout window verified all eight of v1's PREMISE readings against source and reported NO PREMISE
DISAGREEMENT. It also stood down one candidate finding rather than filing it — the bare `continue`
at the unmapped-server guard is defensive and unreachable on the measured path — and that
non-finding is recorded here so no lane re-derives it.
```

TAIL ANCHOR: CARD-TOOL-VISIBILITY-B-1-v3 ends here.
