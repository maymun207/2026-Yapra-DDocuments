<!-- relay-audit: v1 kind=card -->
# CARD-TOOL-VISIBILITY-B-1 · v1 — the offered set has three names and no catalogue-wide alarm: make the trace honest and give the checker a surface

This is the CODE half of `PHASE-TOOL-VISIBILITY-1`, approved by the owner by name. The DB half
landed as `CARD-TOOL-VISIBILITY-A-1-v2` and closed a live fault: `production` v4 published at
2026-09-03T10:20:43Z, and the trace proved the model could then see and call the tool. That card
fixed TODAY. This card fixes the CLASS, and the class is the reason the fault survived two days
without anybody noticing it.

Two defects, both measured in the source at the anchor below.

**The first is that the word `offered` names three different populations in three places, and at
least one of them is a lie about what the model actually saw.** A reader who compares them
concludes the trace is broken; a reader who trusts one of them at random builds on a number that
does not describe the model's world.

**The second is that no surface anywhere counts the ACTIVE tools of a covered backend that appear
in NO published category.** That population is exactly what the four invisible tools were. The
catalogue discovers them automatically and correctly; nothing then says a word about them. The
owner's question was "why does nobody tell the checker" and this is the answer: the number that
would tell him is not computed, anywhere, by anything.

**A CORRECTION THE ARCHITECT OWES, IN THE CARD RATHER THAN BESIDE IT.** The Architect told the
owner that this counter already exists and the gap was only a display problem, naming
`unclassifiedCount` as the counter. Reading `routing/backendCoverage.ts` shows that was wrong.
`countExposure` runs over ONE TURN's offered `toolDefs`, and its predicate is per-BACKEND by
deliberate design — `backendCoverage.ts` states in its own prose that the per-TOOL predicate is
FORBIDDEN because it would silently repeal ADR-011's write-lock. So `unclassifiedCount` is a
per-turn figure over an already-filtered set and it never could have named the four tools. The
catalogue-wide number does not exist. GATE 2 creates it, and creates it WITHOUT touching the
routing predicate.

## PREMISE

MEASURED: at 2026-09-03T11:4xZ, `sed -n '900,950p' api/cwf/_lib/turn/stageTools.ts` in the owner's clone over the bridge — the stage 07 span writes `offeredToolNames: [...ctx.offeredToolNames]` beside `offeredCount: toolDefs.length`, and those two are not the same population.
MEASURED: at 2026-09-03T11:4xZ, `sed -n '760,800p' api/cwf/_lib/turn/stageTools.ts` — `ctx.offeredToolNames = new Set(toolDefs.map((t) => t.name))`, a Set over RAW names, taken BEFORE the registration loop.
MEASURED: at 2026-09-03T11:4xZ, `sed -n '990,1045p' api/cwf/_lib/turn/stageTools.ts` — the registration loop sanitises each name with `.replace(/[^a-zA-Z0-9_]/g, '_')`, then calls `claimToolName`, and on refusal executes `continue`, writing NEITHER `toolToServerMap` NOR `vercelTools`. The model is handed `ctx.vercelTools` and nothing else.
MEASURED: at 2026-09-03T11:4xZ, `grep -n 'offeredToolCount' api/cwf/_lib/turn/stageStream.ts` — stage 08 stamps `offeredToolCount: Object.keys(ctx.vercelTools).length`, a THIRD number under a fourth spelling.
MEASURED: at 2026-09-03T11:4xZ, `grep -n 'function claimToolName' -A 32 api/cwf/_lib/turn/stageTools.ts` — every refusal is already pushed onto `ctx.toolNameCollisions` and printed as a `[ToolCollision]` line, so the refused population is ALREADY captured and merely never subtracted from any published count.
MEASURED: at 2026-09-03T11:4xZ, `grep -n '^ \* ' api/cwf/_lib/routing/backendCoverage.ts` — the module states its predicate is per-BACKEND and that the per-TOOL predicate must NEVER be substituted, because ADR-011 deliberately withholds write-annotated tools from every filtered turn.
MEASURED: at 2026-09-03T11:4xZ, `grep -rln backend_tools api src` — `api/admin/backend-tools.ts`, `api/admin/backend-tools/sync.ts` and `api/admin/backend-tools/stage-drafts.ts` are the standing admin surfaces over the mirror, and `src/components/admin/CensusTab.tsx` and `RoutingTab.tsx` already read it in the browser.
MEASURED: at 2026-09-03T11:4xZ, `grep -n 'Staged drafts' src/components/admin/GovernanceTab.tsx` — the backlog figure the owner sees renders at GovernanceTab line 816 as a TAB LABEL, reachable only by someone already standing on the Governance tab looking for it.
DECAYS on any commit touching `turn/stageTools.ts`, `turn/stageStream.ts`, `routing/backendCoverage.ts` or the admin backend-tools routes. Re-read the named regions at ORDER A; a moved line is not a moved fact, but a changed predicate is.
ON-DISAGREEMENT: if `ctx.offeredToolNames` is no longer assigned from raw `toolDefs`, or `claimToolName` no longer `continue`s on refusal, or `backendCoverage.ts` no longer states the per-BACKEND predicate — STOP and report what you read. The whole card rests on those, and a card that patches a file it no longer describes is worse than one that stops.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the word `offered` names distinct populations at the three sites enumerated, and the model receives only the last one | MEASURED: sed over the three named regions of stageTools.ts and stageStream.ts at 2026-09-03T11:4xZ, each site quoted with its line | sites |
| refused names are already recorded and already printed, and are simply never reconciled against any published count | MEASURED: grep of claimToolName with its body at 2026-09-03T11:4xZ | sites |
| the routing predicate is per-BACKEND by design and weakening it to per-TOOL would repeal ADR-011's write-lock | MEASURED: the module prose of backendCoverage.ts read at 2026-09-03T11:4xZ | sites |
| no catalogue-wide count of active-but-unclassified tools exists on any surface | MEASURED: grep -rln backend_tools over api and src at 2026-09-03T11:4xZ, every reader enumerated and each one read for what it computes | surfaces |
| the backlog figure the owner named is a tab label inside the Governance tab | MEASURED: grep of the label in GovernanceTab.tsx at 2026-09-03T11:4xZ, with its line | surfaces |
| whether any downstream reader consumes the stage 07 `offeredToolNames` field and would break if its population changed | NOT-READ | ORDER A settles it by grep before ORDER B writes a line |

```evidence:sites
The three sites, quoted:

  stageTools.ts ~780   ctx.offeredToolNames = new Set(toolDefs.map((t) => t.name))
                       -> RAW names, deduped, taken BEFORE registration

  stageTools.ts ~922   offeredCount: toolDefs.length
                       -> RAW candidates, NOT deduped, includes names that are
                          about to be refused

  stageStream.ts 166   offeredToolCount: Object.keys(ctx.vercelTools).length
                       -> what the model was actually handed: sanitised, claim-won,
                          plus the local time/aggregate/query tools

  stageTools.ts ~1004  const safeName = toolDef.name.replace(/[^a-zA-Z0-9_]/g, '_')
  stageTools.ts ~1006  if (!claimToolName(...)) continue
                       -> the subtraction nobody publishes

The live turn that exposed this was read from the admin latest-turn-trace surface at
2026-09-03T10:29:17Z, immediately after the production category publish: its figures
disagreed with each other inside one span pair. The turn id is deliberately NOT pasted
here — it is not forty hex and a lane must never copy one as though it were an anchor.
Read the most recent turn yourself at ORDER D; the disagreement reproduces on any turn.
```

```evidence:surfaces
Every reader of the backend_tools mirror, and what each computes:

  api/admin/backend-tools.ts         lists the mirror for a backend
  api/admin/backend-tools/sync.ts    fills the mirror from the live catalogue
  api/admin/backend-tools/stage-drafts.ts  stages annotation drafts
  src/components/admin/CensusTab.tsx       probe results per tool
  src/components/admin/RoutingTab.tsx      routing curation over keywords
  src/components/admin/GovernanceTab.tsx   the draft backlog, as a TAB LABEL at line 816

  NONE of them answers: which ACTIVE tools of a COVERED backend appear in no
  published armes.tool_category row. That query is the one the four invisible
  tools would have appeared in on the day they arrived.
```

## ORDER A — READ BEFORE YOU WRITE

Re-take the PREMISE readings at your own HEAD. Then settle the NOT-READ row: `grep -rn
"offeredToolNames" api src scripts` and read every hit that consumes the stage 07 SPAN OUTPUT as
opposed to computing its own list from `toolCategories.ts`. Name them in your report. If a
downstream reader depends on the raw-name population, say so and GATE 1 changes shape — you add
the honest field and leave the old one alone rather than redefining it under a reader's feet.

## ORDER B — GATE 1: ONE POPULATION PER NAME

Make the stage 07 span describe the world the model was handed.

The registered set is knowable only AFTER the registration loop, so the span's offered fields must
be computed there and not before. Emit, on the stage 07 `register-tools` output:

- the REGISTERED names and their count — `Object.keys(ctx.vercelTools)` snapshotted after
  registration completes, which is definitionally what the model saw
- the CANDIDATE count, under a name that says candidate, so the pre-filter figure survives
- the REFUSED count, taken from `ctx.toolNameCollisions.length`, which already exists

The arithmetic must CLOSE and a test must assert that it closes: candidates, minus duplicate raw
names, minus refusals, plus the locally-registered tools, equals the registered count. A figure
that does not close is the defect restated in more fields.

`offeredCount` and `offeredToolNames` keep their spelling ONLY if ORDER A found a reader that
needs the old population. Otherwise they carry the registered set, because the field name promises
what was offered and the model was never offered a refused name.

Make `stageStream.ts` read the same snapshot rather than recomputing `Object.keys` — ADR-013
DECISION-PARITY-1 is explicit that two surfaces reporting one decision must not compute it twice.

## ORDER C — GATE 2: THE CHECKER'S SURFACE

Give the catalogue-wide unclassified population a place to be seen.

Add a read-only admin route that answers, for one backend: which rows of `backend_tools` are
`status='active'` and appear in NO published `armes.tool_category` row, returned as names with
their `first_seen_at`. **The predicate here is per-TOOL and that is CORRECT, because this is a
REPORT and not a filter.** Say so in the source, beside the query, naming `backendCoverage.ts`'s
forbidden-predicate paragraph and why this is not it. A future reader who finds a per-tool
predicate in this repository must be able to tell in one paragraph which kind it is.

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
`TOOL-VISIBILITY-B-1-<your-address>-report`, carrying the ORDER A readings, the branch and pull
request number, the arithmetic assertion's own numbers, and the ORDER D live readings in full.

## FALSIFIER

This card is wrong if ORDER A finds that the three figures already agree at HEAD, or that
`ctx.vercelTools` is not what the model receives, or if the catalogue-wide query returns the
routing filter's answer rather than a per-tool one. Any of those would mean the diagnosis is
mis-sited and the remedy would be patching a symptom in the wrong file.

## SHARED SURFACES

Repository files under `api/cwf/_lib/turn/`, one new route under `api/admin/`, and the admin entry
point component, plus their tests. One branch, one pull request. No migration. No database
function. No governed row is written, published or archived. No secret is read or rotated. No
deletions. `routing/backendCoverage.ts` is READ and NOT MODIFIED.

## DECISION RIGHTS

The owner approved `PHASE-TOOL-VISIBILITY-1` by name and ordered under
`OWNER-RULING-S129-SOTA-GAP-DISPOSITION-1` that G-4 is a prerequisite and the rest is not shrunk.
GATE 1 advances `API-Bank` by making routing measurable; GATE 2 carries G-4 and G-5. Neither is
deferrable on convenience by anyone, the Architect included.

You decide the shape of the code and the route. You decide nothing about the predicate distinction
in ORDER C — that one is load-bearing and the reason it is spelled out at length.

BODIES: `PLATINUM` · `SOTA-1` · `S63-1` (the merge is not the evidence; the live turn is) ·
`TOTAL-45` · `empty ≠ zero` · `S61-2`.

fanout: personalized

```deliverables
branch: phase/tool-visibility-b-1
report: bus row from_lane, artifact_name TOOL-VISIBILITY-B-1-<your-address>-report
```

TAIL ANCHOR: CARD-TOOL-VISIBILITY-B-1-v1 ends here.
