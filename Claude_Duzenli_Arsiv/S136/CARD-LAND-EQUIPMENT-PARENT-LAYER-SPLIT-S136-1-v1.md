<!-- relay-audit: v1 kind=card -->
CARD-LAND-EQUIPMENT-PARENT-LAYER-SPLIT-S136-1-v1

LANE: AG-4
BRANCH: phase/land-equipment-parent-layer-split-s136-1 (new, cut from master)
fanout: personalized

YOU ARE THE LANDER, NOT THE AUTHOR. AG-5 wrote this branch; you land it. A lane never merges its own
work, which is why this card is addressed to you and not to the lane that pushed it. This is the SAME
direction that ran on 2026-09-10 under CARD-LAND-EQUIPMENT-DEDUPE-S135-1-v1, where AG-5 authored and you
landed; that landing is the current master and its commit subject names you.

WHAT LANDS: `phase/equipment-parent-layer-split-1-s135-1`, at the head named in the `heads` fence below.
That fence is the only place the sha is written.

WHY IT MATTERS: the equipment layer's absence reconciliation is STRUCTURALLY INCAPABLE of firing and has
been since the layer existed. `readObservedEdges` filters by the parent ids the fan-out was SCOPED with,
while the stored edges carry the parent refs the PAYLOAD named; the two sets are disjoint, so the read
returns zero rows on every tick and not one equipment edge has ever been flipped absent in fifteen days.
ORDER 1 of the branch repairs exactly that seam.

```evidence:heads
58f85fdc11c752123d9574e694f8af93e2fc5a0d   phase/equipment-parent-layer-split-1-s135-1
92a3f0b313c1b15d9c64e703afcf10649bf751cb   master at the same reading
```

```evidence:merge-base
$ git merge-base --is-ancestor origin/master phase/equipment-parent-layer-split-1-s135-1
exit 0
read on the owner's clone, mounted read-only to the Architect, at 2026-09-11T12:19Z
```

```evidence:scope-read
$ git diff --name-only master..phase/equipment-parent-layer-split-1-s135-1
api/cwf/_lib/backends/__tests__/entityDiscoverySync.test.ts
api/cwf/_lib/backends/entityDiscoverySync.ts
api/cwf/_lib/persistence/index.ts
api/cwf/_lib/persistence/repositories/BackendEntityLayersRepository.ts
api/cwf/_lib/persistence/repositories/__tests__/backendEntityLayersSplit.test.ts
docs/relay/EQUIPMENT-PARENT-LAYER-SPLIT-1-S135-1-AG5-report.md
public/architecture/diagrams/architecture-map.html
public/architecture/manifest.json
supabase/migrations/20260911070000_entity_layer_parent_ref_layer_key.sql
```

```evidence:approval
UNRESOLVED AT THE MOMENT THIS CARD WAS CUT.

The S136 bootstrap asserts that OWNER-APPROVAL-S135-EQUIPMENT-PARENT-LAYER-SPLIT-MERGE-1 is granted and
unspent. The Architect searched for that artefact through TWO lenses and found it in NEITHER:
the project box, whose three sibling approvals for the dedupe, the web-citation and the UI-pane landings
are all present under their own names; and the documents archive by grep. An assertion in a bootstrap is
not an approval artefact, and the FULLEST-ATTESTED law says the attested text wins over the asserted one.

So the approval is treated here as NOT YET PRESENT. The Architect owes it as a posted artefact addressed
to this card by name before ORDER D runs. ORDER C is what holds the line until then.
```

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| The branch head named above contains master, so its gates judged the merged tree. | MEASURED: git merge-base --is-ancestor on the owner's mounted clone at 2026-09-11T12:19Z | merge-base |
| The change is confined to the nine paths enumerated in SHARED SURFACES. | MEASURED: git diff --name-only against master on the same clone at the same reading | scope-read |
| Whether CI is green at that head is NOT known to the Architect. | NOT-READ | the Architect holds no GitHub credential and this session's proxy refuses the repository; ORDER A is where the green is taken |
| A named owner spend approval for this landing exists. | NOT-READ | approval |

## PREMISE

MEASURED: the two git readings named in the CLAIMS table, taken on the owner's clone which is mounted
read-only to the Architect. That clone last fetched origin at 2026-09-11T07:54Z and the Architect CANNOT
refresh it, so every ref reading above is a reading of that moment and not of now. You re-measure on your
own tree, which is the same disk and is refreshed by your own fetch.

NOT-READ: the CI conclusion at that head. The S136 bootstrap carries a green for it from a prior session.
That green is INHERITED, it is not this Architect's measurement, and you do not inherit it either.

NOT-READ: the owner spend approval. See the approval fence.

SELF-INVALIDATION: this premise DECAYS the moment another commit is pushed to that branch, because the
head named in the fence would no longer be the tip.

## ORDERS

ORDER A - MEASURE CI AT THE HEAD YOURSELF, BEFORE ANYTHING ELSE. Print total_count FIRST for the full
forty-hex sha named in the heads fence. A short sha returns zero and reads byte-identically to "CI never
ran". If it returns zero, READ IT A SECOND TIME before it becomes a premise, and say in your report that
the second read happened. Name every check and its conclusion. State whether the heavy steps RAN or were
skipped by CI-DIET. A SKIPPED job is named, never folded into the green.

ORDER B - IF ANYTHING IS RED, UNMEASURED, OR SKIPPED-WHERE-IT-SHOULD-HAVE-RUN, STOP AND REPORT. Do not
land. Do not re-run to chase a green. Name WHICH STEP failed and which steps were SKIPPED behind it;
skipped steps are silent, not passing.

ORDER C - DO NOT MERGE UNTIL THE APPROVAL ARTEFACT IS IN YOUR BOX BY NAME. The Architect will post it as
a card to this address naming this card and the head in the heads fence. Until that row exists, ORDER D
does not run. This is a NAMED wait with a named thing waited on, not a sleep: while you wait, ORDER A is
real work and so is cutting your branch. If ORDER A comes back red, report and stop and the wait is moot.

ORDER D - LAND WITH --no-ff. Squash is forbidden. Use the detached-HEAD merge form. Verify the branch tip
equals the sha in the heads fence immediately before the merge; if it differs, STOP, because an approval
names one head and a different one is not covered by it.

ORDER E - THE REPORT FOLLOWS THE LANDING AND DOES NOT GATE IT. Land first, write your record second.
Finished code does not wait for prose.

ORDER F - DO NOT EDIT AG-5's FILES. If its report file has a problem that holds the gate, that is the
AUTHOR's repair and not yours. Report it and stop.

ORDER G - NAME THE POST-LANDING MEASUREMENT IN YOUR REPORT, because this landing is only proven by
production. After the deploy, the next cron tick must be able to flip an equipment edge absent for the
first time. Your report states that the Architect owes a re-reading of the absent count after a tick, and
that if it still cannot move then ORDER 1 landed and did not work. The migration in the branch is applied
by the OPERATOR and by nobody else; it is NOT your step and you do not run it.

## FALSIFIER

If ORDER A comes back UNMEASURED rather than green, this card does not land and says so. Absence of a
green is not evidence of a red, and it is equally not a licence to merge.

If master has moved so that the branch no longer contains it, STOP and report: the tree the gates judged
is no longer the tree that would be merged.

If your own reading of the branch tip differs from the heads fence, STOP. The Architect's clone view is
four hours old by its own statement and yours is fresher; yours wins and the difference is a finding.

## SHARED SURFACES

MEASURED: git diff --name-only against master at 2026-09-11T12:19Z. The files the landing brings in are
enumerated below. Your own branch adds only your landing record.

```scope
api/cwf/_lib/backends/entityDiscoverySync.ts
api/cwf/_lib/backends/__tests__/entityDiscoverySync.test.ts
api/cwf/_lib/persistence/index.ts
api/cwf/_lib/persistence/repositories/BackendEntityLayersRepository.ts
api/cwf/_lib/persistence/repositories/__tests__/backendEntityLayersSplit.test.ts
docs/relay/EQUIPMENT-PARENT-LAYER-SPLIT-1-S135-1-AG5-report.md
public/architecture/diagrams/architecture-map.html
public/architecture/manifest.json
supabase/migrations/20260911070000_entity_layer_parent_ref_layer_key.sql
```

## DECISION RIGHTS

You land under the named approval once it arrives, or you REFUSE and report. A refusal on measured
grounds is the right answer and is never held against the lane. You do not widen the approval to any
other branch, and you do not supply the approval yourself.

## ON-DISAGREEMENT

What is anchored is the BRANCH HEAD and the approval that will name it. A master newer than the fence is
EXPECTED and is not by itself a reason to stop - but if master has moved SO THAT the branch no longer
contains it, the falsifier fires. If the branch tip differs from the head in the fence, STOP.

DECAYS at the next push to that branch, or when master moves such that the branch no longer contains it.
