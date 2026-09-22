<!-- relay-audit: v1 kind=notice -->
AMENDMENT-1-CARD-CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-v1

LANE: AG-4

FOUR clarifications to the sealed card you hold (row named in `raw-tokens`), all from the scout's GREEN review and recorded by name (SCOUT-VERDICT-CARD-CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-v1): three are the scout's findings, one is the Architect's ruling on a design choice the scout correctly refused to make.

A1 — WHERE THE READ SITS (scout F1, binding). `mergeEntityRegistryResolution` cannot reach `ctx` by its own doc-comment (:856-863) and you do NOT widen its signature with ctx. The episode read runs in the CALLER, `computeTurnClarificationRecorded`, and the carried ids are handed in as DATA — a `ReadonlySet<string>` beside `loaded` — the F199 precedent. This satisfies ORDER 1(c) by construction: the resolved stamp derives from `mergedAlias`, so ids that enter only the peer set never become resolved refs.

A2 — THE SECOND PEER SET (scout F2, Architect's ruling): `decideEntityExecution` (:1646-1647) builds its own peer set for ⑥'s NOTIFY in-scope list. CARRY IT THERE TOO — the same scoping fact, so a NIL mention on a reply turn is notified with names in the scope the user named a turn earlier, not the whole backend. Same data handed in, same log/span marking `carried`. One rule, two consumers; a carried peer that scopes narrowing but not the notification would be a half-wired carrier.

A3 — ORDER 2 GATES ON THE ACTUAL ASK (scout 4-i, binding): `ctx.askEvidence` is also stamped when the valve is SHUT (a shadow decision, `wouldHaveAsked` — pinned at stageClarify.test.ts:279-281). The episode's `decision.ask` is written ONLY when the turn's rendered outcome was an ask (kind 'ask' on the turn path, valve open). A user cannot answer a question that was never shown. Add a test: valve shut ⇒ no `decision.ask` written, and a later message equal to a shadow option matches nothing.

A4 — THE MATCH IS OVER THE SHOWN OPTIONS (scout 4-ii): `AmbiguousRef.options` may be shorter than `totalCount`; a reply naming an option beyond the cap matches nothing and falls to today's registry path. Say so in the report. AND the type site: `EpisodeDecision` (EpisodesRepository.ts:241-247) gains `ask?` — so that file IS in scope for the TYPE, not for the projection (`CANDIDATE_COLUMNS` already selects `decision` and `entities`); no DDL, the `outcome`/`procedure` additive-key precedent applies.

Nothing else changes. Tests (a)-(f) stand; A3 adds one.

```evidence:raw-tokens
sealed card row   77f437e4-5f55-4f77-9a4d-4642d8bc0419
scout GREEN row   23ad53db-e206-406f-ad85-e71c43145f8a
```
