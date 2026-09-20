<!-- relay-audit: v1 kind=card -->
CARD-RESOLVE-EVERY-LAYER-ASK-AT-PARENT-S140-1-v1

LANE: AG-4
fanout: personalized
PR 570 landed at 07:35Z and the two witnesses that followed it in production say exactly what is left. The registry is now read whole, the parent labels are real, and the resolved factory scopes the swarm (1377 → 560). Two defects remain in `turn/stageClarify.ts`, and both are one seam: the candidates a ref may resolve AGAINST are chosen by the FRAME's object, not by what the ref names; and an ambiguity is presented at the layer the candidates happen to sit in, not at the layer that would end the question.

WITNESS A (the Architect's own turn, 07:50Z, fresh conversation): "Son 1 haftalık kamera KB7 fabrikasının FIRINUST hattının kamera performanslarını incele". The frame's object is EQUIPMENT, so the read is `layers=[equipment]`; the factory and line rows never enter the candidate set; "KB7 fabrikası" comes out UNRESOLVED (and the ask offers tool-doc snippets as "did you mean"), "FIRINUST hattı" is ambiguous over 823 equipment rows — every one under the line the user named. The owner's identical question at 06:04Z framed as QUALITY (`layers=ALL`) and resolved KB7 — the SAME words resolve or fail on the frame's object. The code's own comment at the alias fallback says the opposite is intended: "Applies to every entity_ref regardless of frame.object (object names the query's subject domain, not the ref's own kind)".

WITNESS B (the owner, 07:45Z, fresh conversation): "KB7 fabrikasının 15 eylül 2026 tarihindeki fırın duruşlarını getir" (DOWNTIME, `layers=ALL`). KB7 exact. "fırın" ambiguous over 560 = 558 equipment + 2 lines, all under KB7; labels FIRINALT/FIRINUST (parent rung). The user is asked to pick one of 558 cameras when the two things "fırın" can mean in KB7 are the two kiln LINES that sit above all of them — and both are already in the candidate set. The ask should be "FIRINALT mı, FIRINUST mu?" (2 options), not five of 558.

Both are `narrowAmbiguousByResolvedPeer`'s neighbours (CARD-ENTITY-SCOPE-BY-RESOLVED-PEER-1-S134-1, landed as PR 524): that card scoped a swarm by a resolved peer and, by its own words, did not widen where refs resolve or change how an ambiguity is presented. This card does those two things and nothing else. GraphKbReader wiring (F24, plan P1-5) is the general form and is NOT voided by this — this card reads the parentage the clarify seam already builds (`buildParentage(rows)`), and P1-5 later replaces that read with the graph.

PRECONDITION: `origin/master` at or beyond the fenced anchor; `stageClarify.ts` still builds `candidates` from `inScope` (the frame-object-filtered rows) at the site fenced below, and `narrowAmbiguousByResolvedPeer` still returns survivors without collapsing them to a parent. If either has changed, STOP and print it.

```evidence:raw-tokens
witness A turn      df2aea84cd9ea5b50f0c523bbc5090fd   conversation bfdb783f-7037-4e4e-8051-4e8aa2ea0df4   2026-09-16T07:51:12Z
witness B turn      f1b38f6ee0d5fa5482f8e7272dc4d29f   conversation 6ba8a928-6074-44f6-bee4-987f002d411f   2026-09-16T07:45:44Z
witness B follow    1f3d8864d51d2b866f246d4a27ff793b   ("line stop'ı kastettim", no factory)   2026-09-16T07:46:56Z
```

```evidence:witness-a
stage 03 in    entityRefs ["KB7 fabrikası","FIRINUST hattı"]  frameObject EQUIPMENT  scope layers=[equipment]
stage 03 out   KB7 fabrikası -> UNRESOLVED   FIRINUST hattı -> ambiguous candidateCount 823   ask kind "ask" with unresolved candidates labelSource tool_doc ("getFactoryLinesByName (example KB7)" ...)
registry read  entity_registry read in pages 500·500·500·500·500·20 = 2520 rows (PR 570 live) — the rows were there; the filter dropped them
rendered       "'KB7 fabrikası' ifadesini bulamadım — şunlardan birini mi kastettiniz: 'getFactoryLinesByName (example KB7)', ..."  ⚠ Bu cevap hiçbir araç sorgusuna dayanmıyor
read           turn_trace_digest by the Architect, 2026-09-16T07:52Z; the turn was asked by the Architect in the owner's built-in browser
```

```evidence:witness-b
stage 03 in    entityRefs ["KB7 fabrikası","fırın"]  frameObject DOWNTIME  scope layers=ALL[equipment,factory,line,workstation]
stage 03 out   KB7 fabrikası -> resolved KB7 factory method exact   fırın -> ambiguous candidateCount 560   five options all label FIRINALT labelSource parent, entityIds FIRINALT_2025112200xx ...
follow-up      without the factory: candidateCount 1377, same shape
registry       display_name ILIKE '%firin%': equipment 1371 (FIRINALT 548 · FIRINUST 823) · line 6 (FIRINALT 3 · FIRINUST 3) · factory 0; under KB7's lines: equipment 558 + the 2 KB7 lines = 560  (SQL by the Architect 2026-09-16T07:48Z — the 560 and 1377 are exact)
rendered       "'fırın' adıyla eşleşen 560 kayıt var. Hangisini kastettiniz? 1. FIRINALT 2. FIRINALT 3. FIRINALT ..."
```

```evidence:the-seam
file              api/cwf/_lib/turn/stageClarify.ts   at master 7da8491a8dd3d348316d3aa93f27c08f24e00279
scope choice      const matching = layers.filter((l) => l.frame_object === frame.object); const scoped = matching.length > 0 ? matching : layers; const scopedKeys = new Set(scoped.map((l) => l.layer_key));   (near line 440)
candidate site    const inScope = rows.filter((r) => scopedKeys.has(r.layer_key)); ... if (inScope.length > 0) { const candidates: EntityRegistryCandidate[] = inScope.map((r) => ({ entityId, displayName, aliases, layerKey })) ...   (near lines 449-470)
parent pool       disambiguators: buildDisambiguators(inScope, rows) — the label pool is ALL rows; the candidate pool is inScope only. Two truths side by side, again.
parentage         parentage: buildParentage(rows) — every row's parent link, already built, already returned
peer narrowing    export function narrowAmbiguousByResolvedPeer(candidateEntityIds, parentage, resolvedPeerIds): PeerNarrowing  (line 349) — survivors only; no collapse to a parent layer
alias fallback    comment near line 845: "Applies to every entity_ref regardless of frame.object (object names the query's subject domain, not the ref's own kind)"
```

## PREMISE

MEASURED: witness A and witness B stage 03, in `witness-a` and `witness-b`, from turn_trace_digest at 2026-09-16T07:52Z and 07:48Z.
MEASURED: the registry counts behind 560 and 1377, live SQL at 2026-09-16T07:48Z.
MEASURED: the seam lines in `the-seam` at the fenced master.
MEASURED: PR 524's narrowing is landed and called (S132 table F23 CLOSED@evidence); its card said it would not widen where refs resolve nor change how an ambiguity is presented.
UNMEASURED: whether `scope` in the stage 03 log must keep meaning "the answer's layer" for any downstream reader (lenses). ORDER 1 keeps the token and adds a second one rather than changing its meaning.
SELF-INVALIDATION: this premise dies if the candidate site already reads all rows, or if the narrowing already collapses to a parent layer.

## ORDERS

ORDER 1 - REFS RESOLVE AGAINST EVERY LAYER. At the candidate site, build `candidates` from ALL rows (every layer this backend has), each carrying its `layerKey` as today. The frame-object layer is still computed and still logged — add a distinct token beside `scope` (e.g. `answerLayer=[equipment]`) so a reader can see the answer's layer and the search space separately; do not change the meaning of the existing `scope` token. Witness A's acceptance: same words, `KB7 fabrikası` resolves to the factory by `exact`, `FIRINUST hattı` resolves to the ONE line under KB7 via the peer narrowing that already exists, and the ask is not raised. `layerStatus`/`scopedLayerStatus` semantics (declared-empty for the frame's layer) are UNCHANGED — they describe the answer's layer and still must.

ORDER 2 - AN AMBIGUITY IS ASKED AT THE PARENT. After the peer narrowing and before the ask is shaped: if the surviving candidates span a child layer and a parent layer, and EVERY child survivor's parent chain passes through a survivor of the parent layer, collapse to the parent-layer survivors: those become the options (label = the parent's own display_name, a new `labelSource: 'self'` — the option IS the entity, not decorated by its parent), `totalCount` = their count, and the log line prints `collapsedFrom=<n> to=<m> atLayer=<key>`. If the parent-layer survivors are exactly ONE, that is a single survivor and the existing rule applies (resolve, no ask). If the children do not all sit under parent survivors, do NOT collapse — the full survivor set is asked, as today (the zero-drop law of PR 524 holds: a candidate is never dropped on an unmeasured relation). Witness B's acceptance: "fırın" under KB7 asks between FIRINALT and FIRINUST — two options — and the follow-up without a factory asks among the six lines, never among 1371 cameras.

ORDER 3 - TESTS, failing-first on the fork point, tenant-free fixtures (the file's existing neutral names; NO live factory, line or equipment name — PR 570 was held red on this at 06:33Z): (a) a factory ref resolves under an EQUIPMENT frame; (b) a line ref under a resolved factory resolves to one line under an EQUIPMENT frame; (c) a swarm of children under two parent survivors collapses to the two parents with labelSource 'self'; (d) a swarm where one child's parent is NOT a survivor does not collapse; (e) the PR 524 cases (ORDER C of that card) still pass unchanged; (f) declared-empty for the frame's layer still reports as before.

ORDER 4 - WITNESS. After the landing and production READY, the two questions in `raw-tokens` are asked again in NEW conversations (the owner or the Architect asks; the Architect can, from the owner's browser). You read stage 03 and print the scope tokens, each ref's verdict, and the options with their labelSource. That reading is the acceptance.

ORDER 5 - Branch off current master, ONE pull request, no-ff, never a squash. `npm run build` (doc-drift lives there — `stageClarify.ts` is a mapped file for at least one tab; reseal in the SAME commit) and `npm run check:tenant-zero` locally, both printed. Report at `docs/relay/RESOLVE-EVERY-LAYER-ASK-AT-PARENT-S140-1-AG4-report.md`; the report follows the landing. Post the from_lane slip with the forty-hex head and CI as you read it.

## FALSIFIER

If the candidate site already reads all rows, STOP. If widening the candidate set makes any existing clarify test red for a reason other than "the factory now resolves", STOP and print it. If the collapse ever produces an EMPTY option list, the card is wrong — the zero-drop law wins.

## SHARED SURFACES

```scope
- api/cwf/_lib/turn/stageClarify.ts
- api/cwf/_lib/routing/askOnUnresolved.ts (only if `labelSource: 'self'` must be added to AmbiguityLabelSource)
- api/cwf/__tests__/stageClarify.test.ts and api/cwf/_lib/routing/__tests__/ (the tests above)
- public/architecture/manifest.json (reseal, same commit)
- docs/relay/RESOLVE-EVERY-LAYER-ASK-AT-PARENT-S140-1-AG4-report.md
```

No change to the IR contract, to `backend_entity_layers`, to any discovery tool, to the render layer, or to GraphKbReader (P1-5 is its own card).

## DECISION RIGHTS

You choose the token names and where the collapse lives (inside `narrowAmbiguousByResolvedPeer` as a second pass, or a sibling function) — but ONE function decides the collapse and it is unit-tested alone. You may refuse ORDER 2's `'self'` label source if the existing `AmbiguityLabelSource` union already carries a value that means "the option is the entity itself" — name it and use it.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| witness A: factory unresolved and 823 equipment under an EQUIPMENT frame; the registry was read whole | MEASURED: turn_trace_digest stage 03 and dbReads at 2026-09-16T07:52Z | witness-a |
| witness B: 560 = 558 equipment + 2 lines under KB7; 1377 without the factory | MEASURED: turn_trace_digest stage 03 at 07:48Z and live SQL over entity_registry at 07:48Z | witness-b |
| the candidate pool is inScope while the label pool is all rows; the narrowing returns survivors only | MEASURED: sed over stageClarify.ts at the fenced master | the-seam |
| PR 524's narrowing is landed and called | READ: S132-CWF-MISSING-FUNCTIONALITY-v2 F23 CLOSED@evidence, project box | the-seam |
| the two witnesses after landing | NOT-READ | ORDER 4 measures them |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if `origin/master` moves by a commit touching stageClarify.ts, or if a v2 appears.
