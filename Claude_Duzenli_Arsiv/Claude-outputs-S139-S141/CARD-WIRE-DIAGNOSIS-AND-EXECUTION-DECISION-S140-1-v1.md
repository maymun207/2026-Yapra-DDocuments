<!-- relay-audit: v1 kind=card -->
CARD-WIRE-DIAGNOSIS-AND-EXECUTION-DECISION-S140-1-v1

LANE: AG-4
fanout: personalized
This is the A23 wiring card the owner approved by name (OWNER-APPROVAL-S140-A23-WIRING-FIRST-1; plan P1-3, spine §9-3a). Rooms ⑤ (entity diagnosis) and ⑥ (execution decision) are BUILT, TESTED and IMPORTED BY NOBODY ON THE LIVE TURN PATH — the modules say so in their own first lines ("SCOPE LAW (this phase): this module steers NOTHING. It is imported by nobody"). The live path still decides everything in one place: `decideAsk` in `turn/stageClarify.ts`, fed by the binary `computeClarification.ts` diagnoses-and-cancels in one expression (the ⑥ module's own words at its line 42). This card makes ⑤ report and ⑥ decide on the live path, and it changes exactly TWO visible behaviours, both witnessed this morning after PR 572: a NIL carrier becomes a NOTIFICATION instead of a question, and a not-carrier ambiguity proceeds LABELLED instead of asking. Everything else renders byte-identically.

WITNESS A (Architect, 07:50Z, fresh conversation, EQUIPMENT frame): "KB7 fabrikası" came back UNRESOLVED and the product asked "'KB7 fabrikası' ifadesini bulamadım — şunlardan birini mi kastettiniz: 'getFactoryLinesByName (example KB7)', 'getFactoryLinesByName (KB7 and)', ..." — a QUESTION whose options are tool-doc snippets. Under ⑥ that is NIL + carrier ⇒ NOTIFY_ABSENT: not a question, and the list is bounded by the caller's scope, never free text. (PR 572 has since made that particular NIL a LINK; the shape recurs for any name the registry has never seen, e.g. a misspelt factory.)

WITNESS B (Architect, 09:05Z, fresh conversation, after PR 572): "fırın" under KB7 asked between FIRINALT and FIRINUST — two options from the anchor, exactly ⑥'s OFFER_CHOICE. That path stays as it is; this card only makes the decision come from ⑥ instead of from `decideAsk`'s own branch, so the two cannot drift.

§12.6 CHECK, done: the mechanisms exist (`diagnoseFrom`, `attributionOf`, `decideExecution`, `decideTurn`, `DiagnosisRecord`, `MentionRole`) and their consumers on the live path are ZERO. This is a WIRING card; it builds no second mechanism. The cross-turn carrier (the answer to an ask losing KB7 — witnessed at 09:07Z) is plan P1-4 and is NOT this card.

PRECONDITION: `origin/master` at or beyond the fenced anchor; `stageClarify.ts` still imports neither `entityDiagnosis` nor `executionDecision` (grep prints zero live consumers outside `catalogVerify.ts` and `turnContextLog.ts`). If a consumer already exists on the live path, STOP and print it.

```evidence:raw-tokens
witness A turn      df2aea84cd9ea5b50f0c523bbc5090fd   2026-09-16T07:51:12Z
witness B turn      518d7393413c51080b2fa6377587e47f   2026-09-16T09:06:11Z
witness B follow    the next turn in conversation with the "FIRINUST" reply at 2026-09-16T09:07Z — three factories offered, KB7 lost (P1-4's premise, not this card's)
```

```evidence:the-modules
master                      4c6df852f7a9b135ba92986f428387bf73458239
routing/entityDiagnosis.ts  300 lines · exports: DiagnosisScores · EntityDiagnosis = LINK{canonicalId,layerKey,method} | NIL | AMBIGUOUS{candidateEntityIds} · AttributionRecord · diagnoseFrom(resolution) (line 179, "the ONE lawful lift", total and lossless) · attributionOf(mention, diagnosis) (196) · collapseToTodaysPipe (224, "NOT called by anything and MUST NOT BE") · classifyByScores (249, τ/β — needs scores channel-2 does not yet produce) · MentionRole = 'carrier' | 'not-carrier' (280, "Declared as a TYPE here and supplied by the machine phase") · DiagnosisRecord (296)
routing/executionDecision.ts 200 lines · ExecutionDecision = RESOLVE | OFFER_CHOICE{mention,options} | PROCEED_LABELLED{interpretation,assumedEntityId,alternatives} | NOTIFY_ABSENT{mention,inScope} | DROP_VISIBLY{mention} · MentionCase{mention,diagnosis,role,inScope?} · decideExecution (144) · decideTurn (192): first model-suppressing decision wins; a turn with no mentions proceeds
live consumers              grep -rl "entityDiagnosis|executionDecision" api/cwf --include=*.ts (tests excluded) -> backends/catalogVerify.ts, turn/turnContextLog.ts, and the two modules themselves — NOTHING in turn/stageClarify.ts or routing/computeClarification.ts
the seam today              stageClarify.ts: decideAsk({frame, entityVerdicts, entityAmbiguities, metricVerdicts, ...}) at line 1496; ask rendering at 1546 (askMessage) and 1549 (askAmbiguousMessage); entityAmbiguities options built at ~1480 from the collapse (labelSource 'self') or the disambiguators; resolvedPeerIds at 909; collapse at 976
computeClarification.ts     line 187 (per the ⑥ module's own citation) fuses diagnose + decide in one expression; export computeClarification at 235
```

```evidence:witness-a
stage 03 out   KB7 fabrikası -> UNRESOLVED; ask kind "ask" with candidates labelSource tool_doc ("getFactoryLinesByName (example KB7)", "getFactoryList (KB7 in)", "getScrapSummaryForZones (under KB7)"); rendered as a question; footer "Bu cevap hiçbir araç sorgusuna dayanmıyor"
read           turn_trace_digest by the Architect, 2026-09-16T07:52Z
```

```evidence:witness-b
stage 03 out   KB7 fabrikası -> resolved exact; fırın -> ambiguous candidateCount 2, options FIRINALT / FIRINUST labelSource self; ask-ambiguous; rendered "'fırın' adıyla eşleşen 2 kayıt var. Hangisini kastettiniz?"
read           turn_trace_digest by the Architect, 2026-09-16T09:07Z
```

## PREMISE

MEASURED: the two modules' exports, line numbers and zero live consumers, in `the-modules`, at the fenced master (grep and sed by the Architect at 2026-09-16T08:52Z and 09:10Z).
MEASURED: the seam in stageClarify.ts at the fenced master (decideAsk site, rendering sites, options construction).
MEASURED: witness A and B stage 03, in `witness-a` and `witness-b`.
MEASURED: OWNER-APPROVAL-S140-A23-WIRING-FIRST-1 — the owner chose this card as the next A23 card, by name, in the plan.
DECLARED, NOT MEASURED: carrier-ness. The room says it is STRUCTURAL and "supplied by the machine phase"; no anchor analysis exists yet. This card DECLARES the rule below and prints it on every turn so it can be falsified from the ledger.
UNMEASURED: τ/β. `classifyByScores` needs a second channel's scores; today's resolver reports verdicts, not scores. Diagnosis in this card comes ONLY from `diagnoseFrom(resolution)` — the lossless lift — and τ/β stay unwired, named, for the card that lands channel-2 (plan §9-4/§9-5).
SELF-INVALIDATION: this premise dies if either module already has a live consumer, or if `decideAsk`'s signature has changed from the fenced shape.

## ORDERS

ORDER 1 - ⑤ REPORTS. In stageClarify.ts, at the point where `entityVerdicts` is complete for the turn (after the peer narrowing and the parent-layer collapse, so ⑤ sees the SAME candidates the ask would), build ONE `DiagnosisRecord` per entity mention with `diagnoseFrom(resolution)`, `scores: null` (honest — no channel-2), and `role` from the DECLARED rule: a mention in `frame.entity_ref` is a CARRIER when the frame's action is a QUERY_* over an entity-bearing object (the K1 matrix's objects other than SYSTEM) and NOT-CARRIER otherwise (COMMAND without an entity object, document/knowledge frames, SYSTEM). Print the rule's verdict per mention in the stage 03 span output (`diagnosis: [{mention, kind, role, candidates?}]`). ⑤ CANCELS NOTHING: this order changes no behaviour.

ORDER 2 - ⑥ DECIDES. Feed the records to `decideTurn` and let its result be the SINGLE authority for what the turn does with entities:
  RESOLVE → as today; the `AttributionRecord` goes into the stage 03 span output (`attributions: [...]`) and, where the method was not `exact`, into the answer's premise so the render layer can show "X olarak yorumlandı" — the S134 "Ganit → Granit" correction shape, now declared.
  OFFER_CHOICE → today's ask-ambiguous rendering, options = the decision's `options` (the anchor's candidates — the collapsed set), UNCHANGED bytes for witness B.
  PROCEED_LABELLED (not-carrier ambiguity) → the turn PROCEEDS with `assumedEntityId`, the alternatives named in the span output and in a one-line premise caveat rendered with the answer. Today this case asks; after this card it answers with a label.
  NOTIFY_ABSENT (carrier NIL) → the turn does NOT call the model and renders a NOTIFICATION, not a question: "<mention> bu sistemde bulunamadı." followed by what the caller's scope contains — `inScope` = the display names of the ANSWER layer's rows for the resolved peers (the factory's lines when a factory resolved; the layer's rows otherwise), capped at ten with the true total printed ("... ve N tane daha"). NO tool-doc snippets, NO "did you mean" phrasing. Witness A's shape becomes this.
  DROP_VISIBLY (not-carrier NIL) → the turn proceeds; the drop is printed in the span output and in the footer line the render layer already carries for premises.
  The existing `decideAsk` keeps computing its verdict for the metric slots and for the shadow/evidence record (`askEvidenceOf`) — its ENTITY branch no longer decides; where the two disagree, the log prints both (`[Ask] decideAsk=<kind> execution=<kind>`), because that disagreement is the measurement that retires `decideAsk`'s entity branch in a later card. Do not delete `decideAsk` in this card.

ORDER 3 - THE FLOW CARRIES IT. The stage 03 span output gains `diagnosis[]`, `decisions[]` (kind per mention), `blocking` (the first model-suppressing decision or null), `attributions[]`. `turnContextLog.ts` already imports these types — reuse its shapes; do not mint parallel ones.

ORDER 4 - TESTS, failing-first on the fork point, tenant-free fixtures (no live factory, line or equipment name; PR 570 was held red on this): (a) carrier NIL renders a notification with a capped in-scope list and calls no model; (b) not-carrier NIL drops visibly and proceeds; (c) carrier AMBIGUOUS renders the same bytes as today's ask-ambiguous for the collapsed two-line case; (d) not-carrier AMBIGUOUS proceeds labelled with the alternatives named; (e) LINK by a non-exact method carries an attribution into the span and the premise; (f) a turn with no mentions proceeds unchanged; (g) the declared carrier rule is printed per mention; (h) the `decideAsk` vs execution disagreement log line fires when they differ.

ORDER 5 - WITNESS. After landing and production READY, in NEW conversations: witness A's sentence with a misspelt factory (a name the registry does not hold) must render a NOTIFICATION with in-scope names and no tool-doc snippets; witness B's sentence must render byte-identically to 09:06Z. You read stage 03 and print `diagnosis`, `decisions`, `blocking`.

ORDER 6 - Branch off current master, ONE pull request, no-ff, never a squash. `npm run build` (stageClarify.ts is mapped by at least one tab — reseal in the SAME commit; and read PR 572's lesson: if master reseals under you, merge master in and reseal over the merged tree before pushing) and `npm run check:tenant-zero` locally, both printed. Report at `docs/relay/WIRE-DIAGNOSIS-AND-EXECUTION-DECISION-S140-1-AG4-report.md`; the report follows the landing.

## FALSIFIER

If either module already has a live consumer, STOP. If OFFER_CHOICE changes the rendered bytes of witness B, the mapping is wrong — STOP and print the diff. If NOTIFY_ABSENT ever renders a question mark or a tool name, the card is wrong. If `decideTurn` suppresses the model on a turn that has NO entity mentions, STOP: that is the IR-2 semantics the module itself preserves.

## SHARED SURFACES

```scope
- api/cwf/_lib/turn/stageClarify.ts
- api/cwf/_lib/routing/executionDecision.ts and routing/entityDiagnosis.ts (ONLY to remove the "imported by nobody" scope-law comments and to export what wiring needs; no logic change)
- api/cwf/_lib/turn/turnContextLog.ts (reuse of shapes; additive)
- the render seam that prints the answer's premise/footer line (name the file in your report; additive)
- api/cwf/__tests__/ (the tests above)
- public/architecture/manifest.json (reseal, same commit)
- docs/relay/WIRE-DIAGNOSIS-AND-EXECUTION-DECISION-S140-1-AG4-report.md
```

No change to the IR contract, to `computeClarification.ts`'s metric logic, to the registry, to `backend_entity_layers`, to any discovery tool, or to `decideAsk`'s signature. No τ/β rows. No cross-turn carrier.

## DECISION RIGHTS

You choose where the DECLARED carrier rule lives (a pure function beside `decideExecution` is the expected shape) and the exact notification wording in Turkish and English, within the constraint above. You may refuse ORDER 2's PROCEED_LABELLED for not-carrier ambiguity if you measure that today's frames NEVER produce a not-carrier entity mention under the declared rule — print the measurement and leave that branch wired but unreachable, named as such.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the two modules' exports and their zero live consumers | MEASURED: grep and sed over api/cwf at the fenced master, 2026-09-16T08:52Z and 09:10Z | the-modules |
| the decideAsk site and rendering sites in stageClarify.ts | MEASURED: grep and sed at the fenced master, 2026-09-16T09:10Z | the-modules |
| witness A asked a question with tool-doc options for a NIL carrier | MEASURED: turn_trace_digest stage 03 at 2026-09-16T07:52Z | witness-a |
| witness B offered the two collapsed lines | MEASURED: turn_trace_digest stage 03 at 2026-09-16T09:07Z | witness-b |
| the owner approved this as the next A23 card | READ: OWNER-APPROVAL-S140-A23-WIRING-FIRST-1 in CWF-S140-IMPLEMENTATION-PLAN-EVERYTHING-LIVE-v1, project box | the-modules |
| the witnesses after landing | NOT-READ | ORDER 5 measures them |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if `origin/master` moves by a commit touching stageClarify.ts or either module, or if a v2 appears.
