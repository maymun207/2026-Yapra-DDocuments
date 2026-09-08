# CWF-S133-FINDINGS-v2 — addendum cut after the web valve landing attempt

session: S133
supersedes nothing; ADDS to CWF-S133-FINDINGS-v1 (md5 59c05a3f261b8feb2ddf5a42c456db99)
cut: 2026-09-08, after the reseal
every entry below is MEASURED IN THIS WINDOW unless the line says CARRIED

## F-S133-PRODUCER-HAS-NO-BUS-WRITE-PATH-1 — the loudest finding of the session

MEASURED by AG-4 and reported in `WEB-VALVE-RESEAL-S133-1-AG4-report`, two lenses agreeing:
`relay_post_from_lane` is DEFINED — created in `20260824060000_factory_write_channel.sql`,
enumerated in `scripts/verifyGrants.ts` with the signature
`(p_addr, p_artifact_name, p_body, p_nonce_sha)`, and exercised in
`factoryWriteChannel.test.ts` — but NOTHING in `scripts/` calls it, and `callVerb`, the one
function in `factoryState.mjs` that reaches the write channel, is module-private and not
exported. A producer lane therefore CANNOT post a from_lane row at all.

WHY THIS IS THE LOUDEST: it explains, mechanically, a fact that looked like idleness. Across
this whole session every from_lane row on the bus came from the scout. AG-4 received seven
cards and posted nothing — not because it was asleep, but because the path does not exist in
any caller. The Architect read that silence as "the lane is idle" and cut more card versions
into it. A missing caller and a sleeping lane are byte-identical from the bus, and this house
had no way to tell them apart until a lane went looking for the function and reported its
absence.

The read-side plane already covers the gap and AG-4 named that too: `scripts/busDelivery.ts`
classifies a card ACTED when a name the card's own `deliverables` block declared exists on
origin — work is proof of receipt. So a card is provable without a bus row. What is NOT
covered is the Architect's own inference: I must stop reading bus silence as lane silence.

CURE, OWED: export a caller for `relay_post_from_lane`, or make `busDelivery.ts` the declared
receipt for producer lanes and say so in `producer.md`. Not carded in this window; named.

## F-S133-SILENCE-DECLARATION-IS-DROPPED-ON-THE-VERB-PATH-1

MEASURED by AG-4: `producer.md` orders a lane to write `SILENT-UNTIL <iso> :: <what>` into its
own `factory_state.note` before a long turn. `writeLane`'s `opts.note` is honoured ONLY on the
legacy direct-table path, reached only when the coordination verbs are ABSENT. On a window
whose write channel works, the call routes to `factory_write_lane(lane, state, nonce)`, which
has no note parameter, and the declaration is silently dropped. So a lane that obeys the rule
is `UNDECLARED-SILENT` by mechanism, not by neglect.

Sibling of the finding above and of the same class: an instruction whose instrument does not
exist. A-REC-S133-4's standing mitigation — name the INSTRUMENT that executes a path before
publishing it — applies to `producer.md` as much as to the Architect's own proposals.

## F-S133-A-SUBSET-REPORTED-AS-THE-WHOLE-1

MEASURED from `package.json` by AG-4, and it is the mechanical form of A-REC-S133-7:

    build         tsc -b && typecheck:api && gen:arch-facts && check:ground && vite build && check:doc-drift
    test          vitest run
    typecheck:api tsc -p tsconfig.api.json && tsc -p tsconfig.api.test.json

The five gates `npm run build` runs that the reported green never covered: `tsc -b` (the ROOT
project — every line under `src/`), `gen:arch-facts`, `check:ground`, `vite build`, and
`check:doc-drift`. `vitest` plus `typecheck:api` is a PROPER SUBSET of the build. A subset
reported as the whole is the exact shape of measurement error this house keeps paying for, and
it is now named as a class rather than an incident.

## F-S133-A-VERDICT-AT-THE-PARENT-IS-NOT-A-VERDICT-AT-THE-CHILD-1

MEASURED in this window: three CI runs came back green at the reseal commit, and a report
commit landed on top of it minutes later. The green belongs to the parent. Any landing card
must order the runs read at the head being LANDED, and this one does.

Sibling, from AG-4's report and worth keeping: `gh api actions/runs?head_sha=<short sha>`
answers `total_count: 0`, which reads BYTE-IDENTICALLY to "CI never ran". The full forty hex
characters are not a style preference on that query; a short sha is a false negative.

## THE COUNTING, CORRECTED IN THIS WINDOW

The landing fence went from nine paths to seventeen. The eight added are five diagrams, the
manifest, `src/components/admin/stagesRegistry.ts` and AG-4's reseal report. The Architect's
v1 fence said "no product code touched" and then fenced out the file where the Stage Cards
tab's narrative actually lives — the fence was wrong, not the lane. Corrected by a new card
version under S37-1, never by an edit.

## THE OWNER'S APPROVAL, AND ITS WIDENING

`OWNER-APPROVAL-S133-WEB-VALVE-MERGE-1` names a merge, not a path list. The path list was the
Architect's fence. The reseal was required by CI before that merge could happen at all, so the
approval is ruled to cover it, the widening is recorded here by name, and the owner was told
in the same turn it was ruled.
