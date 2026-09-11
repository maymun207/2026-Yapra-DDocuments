<!-- relay-audit: v1 kind=card -->
CARD-LAND-EQUIPMENT-PARENT-LAYER-SPLIT-S136-1-v2

LANE: AG-4
BRANCH: phase/land-equipment-parent-layer-split-s136-1 (new, cut from master)
fanout: personalized

SUPERSEDES v1, which was written and never inserted. Two differences, both named: the owner approval is
now GRANTED and is quoted in the approval fence rather than owed, and ORDER 0 is new.

YOU ARE THE LANDER, NOT THE AUTHOR. AG-5 wrote this branch; you land it. A lane never merges its own
work, which is why this card is addressed to you and not to the lane that pushed it.

ON THE ROUTE, BECAUSE YOU RAISED IT AND YOU WERE RIGHT TO. "A producer never merges" is a SHORTENING of
two narrower rules, and neither covers this landing. CLAUDE.md says NEVER MERGE YOUR OWN WORK and adds
"that rule tracks who did the work" - AG-5 did this work. `guard-bash` GB-2 refuses `gh pr merge` from a
producer window - that is the PULL REQUEST route, and it is not the route here. The route here is the
S100-3 detached-HEAD merge form, which the producer allowlist carries deliberately, and which is how the
CURRENT MASTER was landed from your own address on 2026-09-10. Do not use `gh pr merge`, do not use
`npm run land`, and do NOT set `ADF_LANE_ROLE` - in a producer window its absence is the feature.

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
OWNER-APPROVAL-S136-EQUIPMENT-PARENT-LAYER-SPLIT-MERGE-1, granted 2026-09-11 in the owner's own word,
"onayliyorum", answering this request:

    OWNER-APPROVAL-S136-EQUIPMENT-PARENT-LAYER-SPLIT-MERGE-1:
    58f85fdc11c752123d9574e694f8af93e2fc5a0d head'ini master'a indir.
    Tek inis icin gecerlidir.

It authorises ONE master landing of the head named above and nothing else. It carries a CONDITION that
was written into the request BEFORE the owner answered: the CI at that head was NOT measured by the
Architect, and the approval is spent ONLY if you measure the green yourself. Red, unmeasured, or
skipped-where-it-should-have-run means the approval is NOT spent and the owner is told in that turn.

The artefact is `OWNER-APPROVAL-S136-EQUIPMENT-PARENT-LAYER-SPLIT-MERGE-1`, in the project box and in the
documents archive. It also records WHY it had to be re-granted: the S135 approval the bootstrap asserts
was searched for through two lenses and found in neither.
```

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| The branch head named above contains master, so its gates judged the merged tree. | MEASURED: git merge-base --is-ancestor on the owner's mounted clone at 2026-09-11T12:19Z | merge-base |
| The change is confined to the nine paths enumerated in SHARED SURFACES. | MEASURED: git diff --name-only against master on the same clone at the same reading | scope-read |
| A named owner spend approval for exactly this one landing exists. | MEASURED: the owner's reply in session, recorded as an artefact at 2026-09-11 | approval |
| Whether CI is green at that head is NOT known to the Architect. | NOT-READ | the Architect holds no GitHub credential and this session's proxy refuses the repository; ORDER A is where the green is taken |
| Whether this card passes the repository's own card gate is NOT known to the Architect. | NOT-READ | the Architect's Linux bridge cannot run the repo's macOS-installed toolchain; ORDER 0 is where that gate runs |

## PREMISE

MEASURED: the two git readings named in the CLAIMS table, taken on the owner's clone which is mounted
read-only to the Architect. That clone last fetched origin at 2026-09-11T07:54Z and the Architect CANNOT
refresh it, so every ref reading above is a reading of that moment and not of now. You re-measure on your
own tree, which is the same disk and is refreshed by your own fetch.

NOT-READ: the CI conclusion at that head. The S136 bootstrap carries a green for it from a prior session.
That green is INHERITED, it is not this Architect's measurement, and you do not inherit it either.

SELF-INVALIDATION: this premise DECAYS the moment another commit is pushed to that branch, because the
head named in the fence would no longer be the tip.

## ORDERS

ORDER 0 - GATE THIS CARD BEFORE YOU ACT ON IT. Run the repository's own card gate against this card body
and print its verdict VERBATIM, every check, pass or fail. The Architect could not run it: its bridge is
a Linux VM mounting a clone whose `node_modules` was installed on macOS, so the toolchain refuses with an
esbuild platform error. That refusal is carried here rather than routed around. If the gate REDS this
card, REFUSE IT and report the refusal text; a card is authority but it is not a premise.

ORDER A - MEASURE CI AT THE HEAD YOURSELF. Print total_count FIRST for the full forty-hex sha named in
the heads fence. A short sha returns zero and reads byte-identically to "CI never ran". If it returns
zero, READ IT A SECOND TIME before it becomes a premise, and say in your report that the second read
happened. Name every check and its conclusion. State whether the heavy steps RAN or were skipped by
CI-DIET. A SKIPPED job is named, never folded into the green.

ORDER B - IF ANYTHING IS RED, UNMEASURED, OR SKIPPED-WHERE-IT-SHOULD-HAVE-RUN, STOP AND REPORT. Do not
land. Do not re-run to chase a green. Name WHICH STEP failed and which steps were SKIPPED behind it;
skipped steps are silent, not passing. The approval is then NOT spent.

ORDER C - VERIFY THE HEAD IMMEDIATELY BEFORE THE MERGE. If the branch tip is not the sha in the heads
fence, STOP: the approval names one head and a different one is not covered by it. Do NOT bring master
into that branch to "catch it up" - the branch already contains master, and a merge there would move the
tip off the authorised head and void the approval.

ORDER D - LAND WITH --no-ff, BY THE DETACHED-HEAD MERGE FORM. Squash is forbidden. Push to master once.
One landing, the head the approval named, and no other.

ORDER E - THE REPORT FOLLOWS THE LANDING AND DOES NOT GATE IT. Land first, write your record second.
Finished code does not wait for prose.

ORDER F - DO NOT EDIT AG-5's FILES. If its report file has a problem that holds a gate, that is the
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
hours old by its own statement and yours is fresher; yours wins and the difference is a finding.

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

You land under the named approval, or you REFUSE and report. A refusal on measured grounds is the right
answer and is never held against the lane. You do not widen the approval to any other branch, and you do
not supply an approval yourself.

## ON-DISAGREEMENT

What is anchored is the BRANCH HEAD and the approval that names it. A master newer than the fence is
EXPECTED and is not by itself a reason to stop - but if master has moved SO THAT the branch no longer
contains it, the falsifier fires. If the branch tip differs from the head in the fence, STOP.

DECAYS at the next push to that branch, or when master moves such that the branch no longer contains it.
