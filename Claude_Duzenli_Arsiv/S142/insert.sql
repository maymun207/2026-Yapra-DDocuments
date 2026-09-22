with c as (select $q$<!-- relay-audit: v1 kind=card -->
CARD-CARRIED-OPTION-INJECTS-ITS-REF-S141-1-v1

LANE: AG-4
fanout: personalized
A WIRING card (§12.6) on the carried-option rung PR 575 landed — the first job of S141 (bootstrap v142 ③-4). The carrier is LIVE on its read side: on both production witness runs the reply turn's stage 03 printed `carried = { read 'ok', from <asking turn>, peers [<factory id>], askOption <the line id> }` — the message the user typed matched the shown option. And the rung did NOTHING: `optionRefs []`. ORDER 2 of the S140 card resolves "every ref of this frame that folds to the matched option", and the reply frame carried ONE ref — the router had folded the history phrase into a factory-shaped ref ("<factory> fabrikası fırın", resolved to the factory by prefix) — so no ref of the frame folded to the option, the rung had nothing to act on, and the line id in the tool call came from the LLM's `getFactoryLines` chain instead of from the carrier. The user answered the question; the answer reached the seam; the seam did not use it. This card makes the matched option ITS OWN REF when the frame has none: the rung then fires exactly as pinned in (d). No new mechanism — one feeder, at one site, plus the stamp that says it happened.

PRECONDITION: `origin/master` is at or beyond the fenced anchor; `mergeEntityRegistryResolution`'s ORDER 2 block still iterates `frame.entity_ref` only; `CarriedResolution` still has no field that says which ref the option answered; no code widens `entity_ref` on the clarify path. If any of these already changed, STOP — the work exists (§12.7).

```evidence:raw-tokens
witness reply turn A   5390a905   (production, evening of 2026-09-16 — askOption matched, optionRefs [])
witness reply turn B   9446b1c2   (production, same evening — byte-similar)
morning reply turn     5b3f26de   (the SAME sentence; refs ["<the line name>"] ambiguous x3 — the shape (d) pins)
```

```evidence:the-head
master              47402e33faec80c45254668d917cb6f58625a916   merge of PR 575 — read 2026-09-17T03:08:47Z from the owner's clone (HEAD = origin/master) and from the Vercel production record dpl_CArauFvnMebebfkogvnDZmvb42L7 (READY, that sha); no deployment after it
frame source        api/cwf/_lib/turn/stageClarify.ts:2477 — const frame = ctx.irFrame; :2491 rec.entityRefs = frame.entity_ref
carrier read        stageClarify.ts:2507-2514 — Promise.all([resolveAliasWithSuffixFallback(frame.entity_ref, …), <time>, readCarriedResolution(ctx.resolvedConversationId, ctx.taskId ?? null, ctx.message)])
carried shape       stageClarify.ts:463-470 — CarriedResolution { read, turnId, peerIds, askOption: { entityId, label } | null }; the ask's SURFACE is matched in readCarriedResolution (:506-534) and NOT carried out
the rung            stageClarify.ts:1032-1047 — if (carried.askOption !== null) { wanted = {fold(label), fold(entityId)}; for (const ref of frame.entity_ref) { if (!wanted.has(fold(ref))) continue; … merged.set(ref, {canonicalId: option.entityId}); registryHits.set(ref, {method: 'exact'}); carriedOptionRefs.push(ref); } }
the stamp           stageClarify.ts:2527-2551 — rec.carried / ctx.carried = { read, from, peers, askOption, scoped, optionRefs }; types.ts:896 carried?: {…}
the consumer        stageClarify.ts:2584-2586 — ctx.entityResolutions = { canonicalIds: Array.from(new Set(<resolved canonical ids of merged>)) } — what the tool-facing path reads
the lens            api/cwf/_lib/replay/clarificationLens.ts:1120 — carried.optionRefs.length > 0 ⇒ cause 'carried-option'
frame contract      api/cwf/_lib/routing/irFrame.ts:73 — entity_ref: string[]
existing pins       api/cwf/__tests__/carryLastResolution.test.ts:308 (d) message equals a shown label ⇒ 'carried-option' before any registry verdict; :330 (d′) equals no option ⇒ today's path; :345 (A4) shown options only
```

```evidence:the-witness
reply turn A, stage 03: entityRefs ["<factory> fabrikası fırın"] — ONE ref, resolved to the factory by prefix (the page's ⓘ line: "'<factory> fabrikası fırın' was interpreted as '<factory display name>' (prefix match)"); carried { read 'ok', from <asking turn>, peers [<factory id>], askOption <line id>, scoped [], optionRefs [] }; no ask; the stops tool was called with the line id that the LLM obtained by calling getFactoryLines first
reply turn B: byte-similar
morning reply turn (the defect PR 575 repaired): entityRefs ["<the line name>"], ambiguous x3 — on THAT shape the rung fires; on the evening shape it cannot, because nothing in the frame equals the option
read by             the Architect, turn_trace_digest via execute_sql and the built-in browser, 2026-09-16T20:30Z-20:36Z (ARCHITECT-WITNESS-S140-CARRIER-LIVE-1); re-read of the seam over the owner's clone at master, 2026-09-17T03:10Z-03:12Z
```

## PREMISE

MEASURED: the frame source, the carrier read, the carried shape, the rung, the stamp, the consumer, the lens and the frame contract in `the-head`, by `sed`/`grep` over the owner's clone at master, 2026-09-17T03:10Z-03:12Z.
MEASURED: the two evening reply turns' carried blocks and ref shapes in `the-witness`, via execute_sql and the built-in browser, 2026-09-16T20:30Z-20:36Z.
MEASURED: project box searched for this seam by name (§12.5), 2026-09-17T03:10Z: the finding F-S140-CARRIED-OPTION-MATCHED-BUT-NO-REF-TO-RESOLVE-1 (CWF-S140-FINDINGS-v2, register v130 §2) records this fix direction and NO card; CARD-CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-v1 ORDER 2 is the design this card feeds; no branch ahead of master touches stageClarify.ts (fifteen stale refs listed, none newer than the S140 morning).
UNMEASURED: whether a downstream consumer compares clarify's refs against `ctx.irFrame.entity_ref` by identity (this card widens a LOCAL frame and leaves `ctx.irFrame` untouched; ORDER 4(i) measures it).
SELF-INVALIDATION: this premise dies if `origin/master` moves by a commit touching stageClarify.ts, types.ts or clarificationLens.ts, or if a v2 appears.

## ORDERS

ORDER 1 - THE FEEDER. In `computeTurnClarificationRecorded`, AFTER the carrier read and BEFORE any consumer of `frame.entity_ref` that the merge depends on: when `carried.askOption !== null` and NO ref of `frame.entity_ref` folds (the seam's own `foldedMessage`) to the option's label or entityId, build a LOCAL frame `{ ...frame, entity_ref: [...frame.entity_ref, carried.askOption.label] }` and hand THAT frame to the alias read, `loadEntityCandidates`, `mergeEntityRegistryResolution` and everything after it on this path. Rules: (a) the injected ref is the option's LABEL as shown — the string the user's message equals when folded — never the ask's surface and never a rewritten form: a ref the router did not produce must be exactly what the user typed matches; (b) inject at most ONE ref, and none when a ref already folds to the option — (d) stays byte-identical; (c) `ctx.irFrame` is NOT mutated; the widening lives in the clarify path's local frame, and `rec.entityRefs` keeps the ROUTER's refs (:2491) so the ledger never shows a router ref the router did not emit; (d) the carrier read may be serialised ahead of the alias read, or the alias read for the one injected ref may run separately after it — your choice on measurement of the seam's order; the injected ref MUST reach the governed-alias precedence guard the rung already respects (a governed alias row that answers the label still wins).

ORDER 2 - THE STAMP. `CarriedResolution` gains nothing; the seam's `carriedOptionRefs` already names the ref the rung resolved. `rec.carried` and `ctx.carried` (types.ts:896) gain ONE additive field `injectedRef: string | null` — the label injected by ORDER 1, or null; the `[EntityCarry]` log line (:1045) gains ` injected=<label>` when it acted. The clarification lens keeps cause 'carried-option' (:1120) — an injected-and-resolved ref is that cause, not a new one.

ORDER 3 - VISIBILITY ON THE PAGE. The ⓘ "interpreted as … (prefix match)" premise the page prints for the router's folded ref is NOT this card's scope and stays. Nothing renders for the injected ref: the user typed the option verbatim, an EXACT tier for ⑤, no premise owed (the rung's own comment at :1041-1043 already says so).

ORDER 4 - TESTS, failing-first on the fork point, synthetic fixtures only (⚠ TENANT-ZERO, CI step 8, docs/relay included — no live factory or line name in the tree or in your report; the witnesses' names live only on the bus), beside the S140 pins in carryLastResolution.test.ts: (g) previous episode carries an ask with two options; the message equals one label; the frame's ONLY ref is a factory-shaped phrase that resolves to the factory ⇒ the label is injected, resolves by 'carried-option', `carried.optionRefs` = [label], `carried.injectedRef` = label, NO ask, and `ctx.entityResolutions.canonicalIds` contains the option's id — the tool-facing id comes from the carrier; (g′) the frame ALREADY carries a ref equal to the option ⇒ no injection (`injectedRef` null), `entity_ref` length unchanged, outcome byte-identical to (d); (g″) `askOption` null ⇒ the frame is untouched, `injectedRef` null, byte-identical to master; (h) `rec.entityRefs` on (g) equals the ROUTER's refs — the injected label is absent from it — and `ctx.irFrame.entity_ref` is unchanged after the stage; (i) a governed alias row answering the label ⇒ the alias wins and the rung records nothing for that ref (the existing guard, pinned on the injected path). Pins that must stay green: (a)-(f), (c′), (c″), (d), (d′), (A4), the two valve pins and the NIL-mention pin in the same file; the S134 same-turn narrowing tests; the PR 572 collapse pins; the PR 573 ⑤/⑥ pins (:358 COMPARE guardian included); the PR 574 label pins.

ORDER 5 - WITNESS, after the landing and production READY, run by the Architect in a NEW conversation: the owner's two sentences in order — the factory + "fırın" downtime sentence (expect the two-line ask, as today), then the line's name alone (expect NO second ask, and stage 03 `carried.optionRefs` = [<the label>] with `injectedRef` = <the label> WHEN the router folds the history phrase, or `injectedRef` null with `optionRefs` = [<the line name>] WHEN the router emits the bare ref — both are the rung acting; `optionRefs []` on a matched askOption is the defect and the falsifier of this card). The Architect reads turn_trace_digest and reports the fields to you on the bus; that reading is the acceptance. Two clean runs are not proof (stochastic-verification rule); the pins are.

ORDER 6 - Branch off current master, ONE pull request, no-ff, never a squash. `npm run build` (doc-drift — stageClarify.ts is mapped; reseal in the SAME commit as the code) and `npm run check:tenant-zero`, print both. Report at `docs/relay/CARRIED-OPTION-INJECTS-ITS-REF-S141-1-AG4-report.md`; the report follows the landing and never gates it (§12.8). Slip with the forty-hex head, CI as you read it, `run_attempt` beside each conclusion, eval-canary SKIPPED named and not folded into green.

## FALSIFIER

If a consumer after clarify keys on `ctx.irFrame.entity_ref` and a resolved ref absent from it is DROPPED before the tool call (so the injected id never reaches `canonicalIds` or the tool argument), STOP and print the consumer and its line — do not mutate `ctx.irFrame` to get past it; that is a second card. If the injected label folds to MORE than one registry candidate under the resolved peers (the option's label is not unique at its layer), the rung's direct resolution by entityId still wins — but print the count, because a non-unique shown label is a finding against PR 574's label rung. If (d) or any S140 pin moves, STOP and print the diff: this card must not change a turn whose frame already carried the option.

## SHARED SURFACES

```scope
- api/cwf/_lib/turn/stageClarify.ts (the feeder in computeTurnClarificationRecorded; the stamp; the log line)
- api/cwf/_lib/turn/types.ts (ONE additive optional field on ctx.carried: injectedRef)
- api/cwf/_lib/replay/clarificationLens.ts (only if the replayed carried block must carry injectedRef to stay type-complete — additive)
- api/cwf/__tests__/carryLastResolution.test.ts (tests g, g′, g″, h, i beside a-f)
- public/architecture/manifest.json (reseal, same commit)
- docs/relay/CARRIED-OPTION-INJECTS-ITS-REF-S141-1-AG4-report.md
```

No migration, no new table, no IR contract change (`entity_ref: string[]` unchanged), no change to `ctx.irFrame`, no change to ⑤/⑥, no change to the render layer, no change to the router.

## DECISION RIGHTS

You choose the exact site of the widening and whether the carrier read is serialised ahead of the alias read or the one injected ref's alias is read after it, on measurement of the seam's order; you may carry the injected label through `CarriedResolution` as a data field instead of a local variable if that is cleaner, provided ORDER 1(c) holds. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the frame source, carrier read, carried shape, rung, stamp, consumer, lens, frame contract | MEASURED: sed/grep over the owner's clone at master, 2026-09-17T03:10Z-03:12Z | the-head |
| the two evening reply turns' carried blocks and ref shapes | MEASURED: turn_trace_digest via execute_sql and the built-in browser, 2026-09-16T20:30Z-20:36Z | the-witness |
| the finding has no card and no branch ahead of master touches the seam | MEASURED: project_search over the box and `git for-each-ref` over the owner's clone, 2026-09-17T03:10Z | the-head |
| the post-landing witness | NOT-READ | ORDER 5 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if `origin/master` moves by a commit touching stageClarify.ts, types.ts or clarificationLens.ts, or if a v2 appears.
$q$::text as body), o as (select $q$<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-CARRIED-OPTION-INJECTS-ITS-REF-S141-1-v1

LANE: scout

Adversary review of CARD-CARRIED-OPTION-INJECTS-ITS-REF-S141-1-v1 (bytes in the row named BYTES-FOR-REVIEW-CARD-CARRIED-OPTION-INJECTS-ITS-REF-S141-1-v1; digests in `raw-tokens`). NEW subject (§12.1: a new subject goes to the scout, no gate lift): the carried-option rung of PR 575 keys on the FRAME'S refs, and on both production witness runs the frame carried no ref equal to the matched option, so a matched answer resolved nothing (`optionRefs []`). The card's claim under test: ONE feeder — inject the matched option's LABEL as a ref into a LOCAL clarify frame when no frame ref folds to it — makes the existing rung fire, and nothing downstream drops a resolved id that is absent from `ctx.irFrame.entity_ref`.

DISCRIMINATORS, measure each and print what you measured:
(1) THE ANCHOR. `git ls-remote origin refs/heads/master` NOW versus the card's `the-head` (the Architect's read is the owner's clone plus the Vercel record, NOT the wire — this is S141's first wire read). Print the sha. A difference is a finding before any verdict.
(2) THE SEAM AS FENCED. At master: stageClarify.ts — `const frame = ctx.irFrame` at the top of computeTurnClarificationRecorded; the ORDER 2 rung iterating `frame.entity_ref` only; `CarriedResolution` carrying `askOption { entityId, label }` and no surface; `ctx.entityResolutions.canonicalIds` built from the MERGED map, not from the frame. Print the lines. If any line the card cites is off by more than a few lines, say so (the card was measured 2026-09-17T03:10Z-03:12Z).
(3) THE TRAP THE CARD NAMES AS UNMEASURED. Grep every consumer of `irFrame.entity_ref` / `frame.entity_ref` AFTER clarify on the turn path (stages 05, 07, 09, 10 and the tool-argument builder): does any of them DROP a resolved id whose ref is absent from `ctx.irFrame.entity_ref`, or rebuild the resolved set from the frame instead of from `ctx.entityResolutions`? If yes, the card's FALSIFIER fires on landing and the card is RED here — say which consumer and its line. If no such consumer exists, say you looked and where.
(4) THE PINS. carryLastResolution.test.ts (d) at :308 and (d′) at :330: confirm that injecting a label the frame already carries would NOT double-count (the card's ORDER 1(b)), and that a fixture for (g) — frame ref = a factory phrase, message = an option label — can be built from the existing harness without a live name (TENANT-ZERO).
(5) THE CALLER-ABSENT CHECK (§12.6). Search the tree for ANY existing path that widens `entity_ref` on the clarify path or resolves a matched option without a frame ref — if one exists, this is not a wiring card and the verdict is RED with the path named.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-CARRIED-OPTION-INJECTS-ITS-REF-S141-1-v1 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. The Architect seals ONLY on the verdict that answers THIS row, with an EXISTS on it in the seal SQL. Preflight on the card body from your window is expected UNMEASURED (tsx IPC EPERM, F-S140-SCOUT-PREFLIGHT-UNMEASURED-TSX-IPC-EPERM-1); the Architect's bridge preflight read GREEN on all eleven checks at 2026-09-17T03:14:21Z and that is a GRAMMAR reading, not this review.

```evidence:raw-tokens
card md5        0985aebcb7834047e8e36faf382da5f5
card sha256     2cd823d864c8fc8a2e48ccc291aa29f2380afa998a5bd2f209dcadb25cba5e82
card bytes      14013
master (card)   47402e33faec80c45254668d917cb6f58625a916
prior GREEN     23ad53db-e206-406f-ad85-e71c43145f8a   (CARD-CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-v1, the design this card feeds)
```
$q$::text as body)
insert into public.relay_inbox (direction, lane_addr, artifact_name, body)
select 'to_lane','scout','BYTES-FOR-REVIEW-CARD-CARRIED-OPTION-INJECTS-ITS-REF-S141-1-v1', c.body from c
 where md5(c.body)='0985aebcb7834047e8e36faf382da5f5' and encode(sha256(convert_to(c.body,'UTF8')),'hex')='2cd823d864c8fc8a2e48ccc291aa29f2380afa998a5bd2f209dcadb25cba5e82' and octet_length(c.body)=14013
union all
select 'to_lane','scout','ORDER-REVIEW-CARD-CARRIED-OPTION-INJECTS-ITS-REF-S141-1-v1', o.body from o
 where md5(o.body)='062a3e4bc3ac8bf9a3de9842d08b3f05' and encode(sha256(convert_to(o.body,'UTF8')),'hex')='d95dd7a823a31098ec6f5fee08e09a7c1e743a38839c9246a17f9e7acf6cb76a' and octet_length(o.body)=3702
returning id, artifact_name, md5(body), octet_length(body), created_at;