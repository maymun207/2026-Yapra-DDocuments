<!-- relay-audit: v1 kind=card -->
CARD-CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-v1

LANE: AG-4
fanout: personalized
A WIRING card (§12.6), P1-4 of the S140 plan — the cross-turn carrier. The owner witnessed it this morning and it is the last open defect on his "fırın" scorecard: the asking turn resolves the factory and asks which kiln line; the reply turn carries only the line's name, finds THREE lines of that name under three factories, and asks AGAIN — the factory the user named one turn earlier is lost. The carrier is NOT absent: `EpisodesRepository.listRecentByConversation` calls itself "the A23 CARRIER read", the asking turn's episode already holds `entities.canonical` (the resolved factory id) and `scope` (action · object · time), and stage 05 reads it — for the PROMPT. Nothing in clarify reads it. The narrowing that would end the second ask already exists at the seam (`narrowAmbiguousByResolvedPeer`, PR 549 lineage) and takes a set of resolved peer ids. This card hands it the previous turn's peers. No migration, no new table, no IR change.

PRECONDITION: `origin/master` is at or beyond the fenced anchor; `resolvedPeerIds` at the seam is still built from `merged` only; `memoryDistill.ts` still writes `entities.canonical` from `ctx.entityResolutions.canonicalIds`; no caller of `listRecentByConversation` exists on the clarify path. If any of these already changed, STOP — the work exists (§12.7).

```evidence:raw-tokens
asking turn     518d7393413c51080b2fa6377587e47f   (09:06:11Z — factory resolved, kiln line ambiguous ×2 at the line layer, ask raised)
reply turn      5b3f26de3e9f4ae998f14dfa97e13263   (09:07:31Z — the user typed the line's name alone; three same-name lines under three factories; ask raised AGAIN)
```

```evidence:the-head
master              4bec094ea1d14289eaf4783677d304385e4e4bc5   merge of PR 574, production READY 18:47:17Z
carrier read        api/cwf/_lib/persistence/repositories/EpisodesRepository.ts:518-536 — listRecentByConversation(conversationId, limit, taskId), comment "PHASE MEMORY-1B (G1): the A23 CARRIER read — same-conversation recency"; ORDER BY created_at DESC LIMIT k; excludes failed turns (OFFERABLE_OUTCOME_FILTER); returns null on a failed read, [] on an empty conversation
carrier write       api/cwf/_lib/turn/memoryDistill.ts:489-495 — entities: { surfaces, canonical: ctx.entityResolutions.canonicalIds, frameExtracted, resolverRan }; scope: { action, object, time, metrics }
today's consumer    memoryRetrieve (stage 05) → prompt recall only; clarify imports nothing from episodes (git grep -n "Episodes" api/cwf/_lib/turn/stageClarify.ts → 0)
seam                api/cwf/_lib/turn/stageClarify.ts:965-976 — const resolvedPeerIds = new Set<string>(); for (const v of merged.values()) if (isResolvedEntity(v)) resolvedPeerIds.add(v.canonicalId); then narrowAmbiguousByResolvedPeer(v.candidateEntityIds, parentage, resolvedPeerIds) per ambiguous ref
narrowing           stageClarify.ts:385 narrowAmbiguousByResolvedPeer(candidateEntityIds, parentage, resolvedPeerIds): PeerNarrowing { entered, survivors, scopedBy } — unchanged when the set is empty; walks the parent chain (walkToResolvedPeer)
stamp               types.ts:804 ctx.entityResolutions?: { canonicalIds: string[] } — a stamp, read back nowhere on the turn path
```

```evidence:the-witness
asking turn, episodes row: entities.canonical ["<the factory id>"], entities.surfaces [factory surface, "fırın"], scope { action QUERY_EVENTS, object DOWNTIME, time "15 eylül 2026" }, decision.outcome.class "clean"; stage 03: factory resolved exact, "fırın" ambiguous candidateCount 2, ask-ambiguous with two line options (labelSource self)
reply turn, stage 03: entityRefs ["<the line name>"], frame QUERY_EVENTS × DOWNTIME with time carried from history (the router DOES carry action/object/time), refs [{ verdict ambiguous, candidateCount 3 }], ask-ambiguous with three options labelled by their PARENT factories — one of them the factory the user named a turn earlier; episodes row of the reply turn: entities.canonical [] — nothing resolved
same-turn precedent: CARD-ENTITY-SCOPE-BY-RESOLVED-PEER-1-S134-1 — a factory resolved in the SAME frame narrows a same-name line to one. Across turns the peer is one episode away.
read by            the Architect, turn_trace_digest and episodes via execute_sql at 2026-09-16T18:56Z
```

## PREMISE

MEASURED: the carrier read, the carrier write, today's consumer, the seam, the narrowing and the stamp in `the-head`, by `git show`/`git grep` over the shared clone at master, 2026-09-16T18:58Z.
MEASURED: the two witness turns' stage 03 records and episodes rows in `the-witness`, via execute_sql at 18:56Z.
MEASURED: project box searched for the seam by name (§12.5): CWF-S140-ARCHITECTURE-VS-CODE-MEASURED-v1 lists "Cross-turn carrier / last-resolution slice (A-10, P3c): ABSENT — no module, no table"; this card measures that the SLICE exists as the episode row and only the CONSUMER is absent — CALLER-ABSENT, not MECHANISM-ABSENT. The plan's "table via Operator migration" is therefore not needed for this step; recorded in the plan as a reordering with this reason.
UNMEASURED: how many prior turns to carry. This card carries ONE — the most recent offerable episode of the conversation — and names the bound.
SELF-INVALIDATION: this premise dies if `origin/master` moves by a commit touching stageClarify.ts, memoryDistill.ts or EpisodesRepository.ts, or if a v2 appears.

## ORDERS

ORDER 1 - CARRIED PEERS. At the seam, BEFORE the peer set is used: read the most recent offerable episode of `ctx.resolvedConversationId` through `listRecentByConversation(conversationId, 1, ctx.taskId ?? null)` and add its `entities.canonical` ids to `resolvedPeerIds`. Rules: (a) a `null` read (could not read) and `[]` (no prior turn) both leave the set exactly as today — behaviour unchanged, and the span says which of the two it was (empty ≠ unreadable); (b) carried ids are kept in a SEPARATE set as well, so the log line and the span can say a narrowing was `scopedBy` a CARRIED peer and not a same-turn one; (c) the carried peer never becomes a resolved ref of THIS turn's frame — it scopes, it does not answer; the ledger must not show the factory as "resolved" on a turn whose sentence did not name it. The read is ONE bounded query per turn (LIMIT 1), same posture as stage 05's.

ORDER 2 - ANSWERING THE ASK BY ITS OPTION. Extend the episode's `decision` at distill time with the ask, when the turn asked: `ask: { surface, options: [{ entityId, label }] }` (the shape already on `ctx.askEvidence`). At the seam, if the previous episode carries an ask and the current turn's message, trimmed and case-folded, EQUALS one option's label or entityId, resolve the ask's surface DIRECTLY to that entityId — verdict resolved, method `'carried-option'` — before any registry candidate search; log and span name it. A message that equals no option changes nothing.

ORDER 3 - VISIBILITY. The stage 03 span output gains `carried: { read: 'ok'|'empty'|'unreadable', peers: [ids], askOption: entityId|null }`; the `[EntityCollapse]`-style log line gains `carriedFrom=<turn_id>` when a carried peer or option acted. The clarification lens (`clarificationLens.ts`) gains a cause `'carried-peer'` / `'carried-option'` for a resolution that came from the carrier — additive, as the NOTIFY cause was in PR 573.

ORDER 4 - TESTS, failing-first on the fork point, synthetic fixtures only (⚠ TENANT-ZERO, CI step 8, docs/relay included — no live factory or line name in the tree or in your report; the witness's names live only on the bus): (a) previous episode carries a resolved factory; current turn's line surface has three same-name candidates under three factories ⇒ ONE survivor, RESOLVE, no ask, scopedBy carried; (b) no previous episode ⇒ byte-identical behaviour to master (the three-way ask); (c) read failure (repository returns null) ⇒ same as (b) and the span says 'unreadable'; (d) previous episode carries an ask with two options and the current message equals one label ⇒ resolved by 'carried-option', no registry search; (e) previous episode's peer does NOT sit on any candidate's parent chain ⇒ no narrowing, all candidates survive (the S134 zero-drop law); (f) the carried peer is not reported as a resolved ref of the current frame. Pins that must stay green: the S134 same-turn narrowing tests, the PR 572 collapse pins, the PR 573 ⑤/⑥ pins (:358 COMPARE guardian included), the PR 574 label pins.

ORDER 5 - WITNESS, after the landing and production READY, run by the Architect in a NEW conversation: the owner's two sentences in order — the factory + "fırın" downtime sentence (expect the two-line ask, as today), then the line's name alone (expect NO second ask: one survivor, a tool call for the stops, and stage 03 `carried.peers` naming the factory, `scopedBy` carried). The Architect reads turn_trace_digest and reports the fields to you on the bus; that reading is the acceptance.

ORDER 6 - Branch off current master, ONE pull request, no-ff, never a squash. `npm run build` (doc-drift — stageClarify.ts and memoryDistill.ts are mapped; reseal in the SAME commit) and `npm run check:tenant-zero`, print both. Report at `docs/relay/CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-AG4-report.md`; the report follows the landing and never gates it (§12.8). Slip with the forty-hex head, CI as you read it, `run_attempt` beside each conclusion.

## FALSIFIER

If the previous episode's `entities.canonical` is written WITHOUT layer keys and `narrowAmbiguousByResolvedPeer` needs layer-qualified ids to walk the chain, STOP and print the two shapes — do not invent a join. If a carried peer would narrow a set to ZERO, keep the full set (S134 law) and say so. If `listRecentByConversation`'s OFFERABLE filter excludes an asking turn's episode (outcome class not offerable), STOP and print the class — the carrier would be blind exactly when it is needed.

## SHARED SURFACES

```scope
- api/cwf/_lib/turn/stageClarify.ts (the peer set at the seam; span/log additions)
- api/cwf/_lib/turn/memoryDistill.ts (decision.ask at distill)
- api/cwf/_lib/persistence/repositories/EpisodesRepository.ts (only if the candidate columns must include decision — read-side projection, no schema change)
- api/cwf/_lib/replay/clarificationLens.ts (two additive causes)
- api/cwf/__tests__/** (tests a-f beside the S134/572/573/574 pins)
- public/architecture/manifest.json (reseal, same commit)
- docs/relay/CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-AG4-report.md
```

No migration, no new table, no IR contract change, no change to ⑤/⑥, no change to the render layer, no change to memoryRetrieve's prompt recall.

## DECISION RIGHTS

You choose where the read sits (before the resolver loop or just before the peer set) on measurement of the seam's order; you may carry the peer as a `CandidateParentage`-shaped fact if that is what the walker needs, provided ORDER 1(c) holds. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the carrier read, write, consumer, seam, narrowing and stamp | MEASURED: git show / git grep over the shared clone at master, 2026-09-16T18:58Z | the-head |
| the asking and reply turns' ledgers and episodes | MEASURED: turn_trace_digest and episodes via execute_sql at 2026-09-16T18:56Z | the-witness |
| the archive names the carrier ABSENT and this card finds the slice PRESENT | MEASURED: project_search over the box at 18:54Z; the episodes read above | the-witness |
| the post-landing witness | NOT-READ | ORDER 5 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if `origin/master` moves by a commit touching stageClarify.ts, memoryDistill.ts or EpisodesRepository.ts, or if a v2 appears.
