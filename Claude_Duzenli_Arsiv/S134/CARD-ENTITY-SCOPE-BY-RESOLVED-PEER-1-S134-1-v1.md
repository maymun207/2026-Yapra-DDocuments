<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ENTITY-SCOPE-BY-RESOLVED-PEER-1-S134-1 · v1 — the user named the factory; stop asking which factory
lane: AG-4
report: docs/relay/ENTITY-SCOPE-BY-RESOLVED-PEER-1-S134-1-AG4-report.md
fanout: personalized

THE ADVERSARY GATE IS LIFTED FOR THIS CARD, NAMED AND NOT SILENT, citing `OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1`. The referee is CI.

NO MASTER PUSH. Branch and pull request only, left OPEN. No owner spend approval is required and none has been given.

⚠ CI IS CURRENTLY REFUSED BY THE FORGE at the account layer — jobs do not start, and a run that ends in a few seconds with no steps is that refusal, not your work. ORDER D says exactly what to do when you meet it. Write the code anyway; the block is being cleared separately.

## THE DEFECT, WITNESSED BY THE OWNER

He typed, in production: `KB7 de FIRINUST de olan duruslari gosterirmisin`. He named the factory AND the line. CWF answered with a question — which of three FIRINUST records did he mean — and listed them as Granit Fabrikası, Kalebodur 3 Fabrikası, Kalebodur 7 Fabrikası. He had already said Kalebodur 7.

The turn made ZERO tool calls. The user gave complete information and received an interrogation.

## WHY IT HAPPENS, MEASURED IN ONE LOG LINE

Anchor `resolve`. The production log for that turn holds BOTH facts side by side: the factory is RESOLVED, `KB7:exact@factory`, on the SAME line that declares the line ambiguous, `FIRINUSTx3`. Two truths in one string, never joined.

The registry rows differ by exactly ONE column. Anchor `rows`. Three FIRINUST lines, `parent_entity_id` KB7, Granit, KB3. Filtering by the factory already resolved in the same frame leaves ONE.

`parent_entity_id` IS read today — and only to make the question prettier. Anchor `labels`. `buildDisambiguators` uses the parent row's display name as the OPTION LABEL, which is why the interrogation is decorated with precisely the fact that would have ended it. Presentation, not resolution.

## THE COUNTERFACTUAL, AND IT IS THE SHARPEST DATUM

Anchor `counterfactual`. In the SAME log, a turn that named ONLY the factory went `decision=no-ask`, called `getFactoryLines` with the factory, found the line by itself, called the stops tool and returned fourteen stops. **Naming the line makes the answer WORSE than not naming it.** A system that punishes precision is not merely slow, it teaches its user to give it less.

## WHAT IS NOT CHANGED, AND WHY

The IR frame carries `entity_ref` as a FLAT list of strings, so it cannot express "the line INSIDE the factory". **DO NOT CHANGE THE IR CONTRACT IN THIS CARD.** The flat list is SUFFICIENT for this repair: both surfaces are already in it, one of them already resolves, and the fix is to let a resolved peer scope an ambiguous one. Widening the IR is a larger change with its own gates and it is not this card.

## PREMISE
- MEASURED: Vercel production runtime logs for the deployment serving master, read by the Architect at 2026-09-09T14:0Z, covering several turns of this exact question. Anchors `resolve`, `counterfactual`.
- MEASURED: the governed registry read directly, at the same instant. Anchor `rows`.
- MEASURED: the disambiguator builder in the clarification seam. Anchor `labels`.
- UNMEASURED: two turns logged `suppressedClarification=true` while the ask still fired. That flag's meaning is NOT established and this card does NOT touch it. ORDER E records it as an observation only.
- UNMEASURED: the ask rendered TWICE in the owner's screenshot, Turkish and English concatenated. A render-layer defect, out of scope here, recorded in ORDER E.
- MEASURED: the banner saying the answer rests on no tool query is CORRECT and is NOT a defect — the Vercel log for that turn shows zero tool calls, so do not "fix" it. Anchor `resolve`.
- ON-DISAGREEMENT: if the registry no longer holds three FIRINUST rows differing only by parent, or the log line no longer shows a resolved factory beside an ambiguous line, STOP and print what you actually read. The witness is the premise.
- DECAYS the moment `origin/master` moves, or when a v2 appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the factory resolves and the line is called ambiguous in the same turn | MEASURED: Vercel runtime logs filtered to the line surface, production deployment, at 2026-09-09T14:0Z · MEASURED: the same logs read for a second turn of the same question, which repeats the pattern | resolve |
| three registry rows share the display name and differ only by their parent | MEASURED: `select display_name, parent_entity_id from entity_registry where display_name ilike FIRINUST` · MEASURED: the same rows read again with the parent column projected alone | rows |
| the parent is used to LABEL the options and never to filter them | MEASURED: `grep -n parent_entity_id api/cwf/_lib/turn/stageClarify.ts` · MEASURED: `grep -rn parent_entity_id api/cwf/_lib/routing/resolveEntityRef.ts`, which returns nothing | labels |
| naming only the factory ANSWERS the question that naming both refuses | MEASURED: the same Vercel log, a turn whose frame carried the factory alone | counterfactual |
| whether the repaired path answers the owner's exact sentence | NOT-READ | ORDER D |

```evidence:resolve
[Frame] action=QUERY_EVENTS object=DOWNTIME entity_ref=[KB7,FIRINUST] metrics=[] conf=HIGH basis=frame
[EntityResolve] alias refs=[KB7,FIRINUST] resolved=[KB7:alias-direct] unresolved=[FIRINUST]
[EntityResolve] scope=layers=ALL[equipment,factory,line] refs=[KB7,FIRINUST] resolved=[KB7:exact@factory] unresolved=[] ambiguous=[FIRINUSTx3] suppressedClarification=false
[Clarify] layerStatus=resolved scopedLayerStatus=resolved object=DOWNTIME refs=2 reads=ok
[Ask] decision=ask-ambiguous ambiguous=1 totals=[3] valve=1 wouldHaveAsked=0
```

```evidence:rows
backend_id  layer_key  display_name  parent_layer_key  parent_entity_id  status
armes       line       FIRINUST      factory           KB7               active
armes       line       FIRINUST      factory           Granit            active
armes       line       FIRINUST      factory           KB3               active
```

```evidence:labels
buildDisambiguators, api/cwf/_lib/turn/stageClarify.ts:
    const parentName = r.parent_entity_id
        ? byKey.get(the parent layer key and the parent entity id, joined)
        : undefined;
    const option: AmbiguousOption = parentName
        ? { entityId: r.entity_id, label: parentName, labelSource: 'parent' }
        : the layer key, or failing that the entity id
the parent appears ONLY here, and only as a label
```

```evidence:counterfactual
[Frame] action=QUERY_EVENTS object=DOWNTIME entity_ref=[KB7] metrics=[] conf=HIGH basis=frame
[Ask] decision=no-ask reason=all-resolved valve=1 wouldHaveAsked=0
[MCP Call] getFactoryLines with args: {"factoryId":"KB7"}
[MCP Result] getFactoryLines returned lines including the name FIRINUST
[MCP Call] getLineStopsReportForZones with the FIRINUST zone id, the factory, a three-day window
[ToolResult] getLineStopsReportForZones: elements=14 returned=14 truncated=false
```

## SCOPE
```scope
- ONE branch off current master, ONE pull request, LEFT OPEN
- api/cwf/_lib/turn/stageClarify.ts — narrow ambiguous candidates by a RESOLVED peer
- tests for the narrowing, including the cases where it must NOT fire
- docs/relay/ — your report
- NO change to the IR contract, no new field on the frame
- NO change to buildDisambiguators labelling behaviour
- NO change to the render layer and NO touching the duplicate-message defect
- NO change to the suppressedClarification flag
- NO master push, NO merge, NO admin powers
- NO re-run of anything and NO workflow dispatch
```

## ORDER A — REPRODUCE THE WITNESS BEFORE CHANGING ANYTHING
1. `git fetch origin`, print `git rev-parse origin/master` at FULL forty-hex length, branch from it.
2. Read the registry rows yourself and print them. If they do not match the `rows` fence, STOP.
3. Print the parent greps from the CLAIMS table and compare them to the `labels` fence.
4. Write a FAILING test first, at the seam, that encodes the owner's sentence: an ambiguous line surface, three candidates differing only by parent, a factory peer already resolved in the same frame — and assert that NO ask is raised and the single in-scope candidate is chosen. It must FAIL on master. Print that failure.

## ORDER B — THE NARROWING
1. Where the ask decision is made, before an ambiguous surface becomes a question: if the frame's OTHER surfaces already resolved to an entity, and the ambiguous candidates carry a parent chain, keep only candidates whose parent matches a resolved peer.
2. Exactly ONE survivor means RESOLVE it and do not ask. More than one means ask, with the survivors only. ZERO survivors means **ASK WITH THE FULL ORIGINAL SET**, never with an empty list: an over-eager filter that silently empties the candidates would turn a good question into no answer at all, which is worse than the defect being fixed.
3. The match is on the RESOLVED entity id, not on the raw surface string the user typed. KB7 resolved to a factory; compare against that identity.
4. The parent chain may be more than one rung. If a candidate's parent is not itself a resolved peer, walk up while the data makes it cheap; if it does not, keep the candidate rather than dropping it. **A CANDIDATE IS NEVER DROPPED ON AN UNMEASURED RELATION** — absence of a known parent is not evidence of a wrong parent (`empty ≠ zero`).
5. Log the narrowing so it is auditable in production: how many candidates entered, how many survived, and which resolved peer scoped them. A silent filter is unmeasurable from the outside, and this factory has already paid for one of those.

## ORDER C — THE CASES WHERE IT MUST NOT FIRE
Write these as tests and print their results:
1. No resolved peer in the frame means behaviour UNCHANGED, the ask fires with all candidates.
2. A resolved peer that is NOT an ancestor of any candidate means all candidates survive, the ask fires unchanged.
3. Two candidates share the same in-scope parent means the ask still fires, with those two.
4. The single-surface case, a line named with no factory, is UNCHANGED.
5. The counterfactual turn, factory alone, is still `no-ask` and still reaches the tools.

## ORDER D — GATES, AND WHAT TO DO IF THE FORGE REFUSES
1. `npm run build` — name all FIVE gates individually with their results.
2. `npm run test` and `npm run typecheck:api`, each named, reported as "local, on an unsynced head".
3. Push the branch, open the pull request, LEAVE IT OPEN. Print the number and the head sha at full forty-hex.
4. Read CI with a COMPUTED sha: `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=$(git rev-parse HEAD)"`. `total_count` FIRST.
5. **IF THE RUNS END IN A FEW SECONDS WITH AN EMPTY STEP LIST, THAT IS THE FORGE REFUSING TO START JOBS AT THE ACCOUNT LAYER, NOT YOUR WORK.** Print the run's annotation verbatim, report the head as CI-BLOCKED rather than red, and STOP there. Do not re-run, do not push again to provoke a run, do not weaken a gate to get a green.

## ORDER E — RECORD, DO NOT REPAIR
In your report, name as OBSERVATIONS ONLY, with no code change: the two turns that logged `suppressedClarification=true` while the ask still fired; and the ask rendered twice, Turkish and English concatenated, in the owner's screenshot. Both belong to later cards.

## FALSIFIER
Wrong if a candidate was dropped on an unmeasured relation. Wrong if a zero-survivor filter produced an empty ask. Wrong if the IR contract gained a field. Wrong if the labelling behaviour changed. Wrong if the render layer or the suppression flag was touched. Wrong if the narrowing matched on a raw user string instead of a resolved identity. Wrong if the narrowing is invisible in the logs. Wrong if the failing test did not fail on master first. Wrong if any of the five must-not-fire cases changed behaviour. Wrong if anything reached master. Wrong if a seconds-long empty-step CI result was reported as a red gate rather than as the forge refusal. Wrong if anything was re-run to chase a green.

## SHARED SURFACES
cwf_yaprak: ONE new branch, ONE open pull request, ZERO master pushes. CI: whatever the forge permits; nothing dispatched. Database: reads only; no governed write; your heartbeat and one bus row. Production behaviour: CHANGED ON PURPOSE — a question the user already answered stops being asked. Secrets: none read, none printed.

## DECISION RIGHTS
Yours: where the narrowing lives, its logging shape, your branch name, your report's wording. Not yours: whether a candidate may be dropped without a measured relation (it may not), whether the IR changes (it does not), whether anything merges (nothing does).

BODIES: OWNER-WITNESS-S134-FIRINUST-ASK-1 · OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1 · A-REC-S133-6 · S55-1 · S63-1 · S101-L1 · empty ≠ zero · TOTAL-45.

```deliverables
origin/master at full forty-hex, and the branch cut from it
the registry rows printed and compared to the fence
the parent greps printed and compared to the fence
the failing test, FAILING on master, printed
the narrowing diff, with its log line
five tests for the five must-not-fire cases, each named with its result
npm run build reported as FIVE named gates with five results
npm run test and npm run typecheck:api, each named
the pull request number and its head sha at full forty-hex, LEFT OPEN
total_count at that head printed FIRST, keyed on a computed sha
if CI is refused: the annotation verbatim and the head reported as CI-BLOCKED, not red
the two observations recorded and NOT repaired
docs/relay/ENTITY-SCOPE-BY-RESOLVED-PEER-1-S134-1-AG4-report.md on your branch
one from_lane row, or MECHANISM-ABSENT with the lenses named
```

TAIL ANCHOR: CARD-ENTITY-SCOPE-BY-RESOLVED-PEER-1-S134-1-v1 ends here.
