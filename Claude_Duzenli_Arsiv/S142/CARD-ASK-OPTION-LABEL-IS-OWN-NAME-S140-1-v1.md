<!-- relay-audit: v1 kind=card -->
CARD-ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-v1

LANE: AG-4
fanout: personalized
The first defect found by the ⑤/⑥ witness on production, minutes after PR 573 went live (master in `the-head`). The Architect asked, in a new conversation, for the OEE of a factory that does not exist under that name. Room ⑤ did its job — three near-miss factories, AMBIGUOUS, carrier — and room ⑥ chose OFFER_CHOICE. The ask then rendered as three identical lines reading the LAYER KEY, because `buildDisambiguators` was designed for candidates that SHARE a display name (three lines all called the same thing, told apart by their parent factory) and has no rung for candidates whose own names already tell them apart. At the factory layer there is no parent, so every option fell to the 'layer' rung and the user was offered "factory, factory, factory". One function, one new first rung, tests, nothing else.

PRECONDITION: `origin/master` is at or beyond the fenced anchor and `buildDisambiguators` still carries the three rungs parent → layer → entity-id with no own-name rung. If a self-name rung already exists there, STOP — the work exists (§12.7) and this card is wrong.

```evidence:raw-tokens
witness turn         8f82597952bbe316cf143e242d920960   (2026-09-16T17:45:04Z, production, new conversation)
pass turn            a3ee6df39af2c4c7924523569da60f2a   (2026-09-16T17:44:10Z — the two-line line ask, for contrast)
```

```evidence:the-head
master         2f404888c42c7394566ed9803148390d8e1bab73   merge of PR 573, production READY at 17:40:52Z
seam           api/cwf/_lib/turn/stageClarify.ts  buildDisambiguators, lines 244-263 at that master
rung 1 :257    parentName ? { entityId, label: parentName, labelSource: 'parent' }
rung 2 :259    r.layer_key ? { entityId, label: r.layer_key, labelSource: 'layer' }
rung 3 :260    { entityId, label: r.entity_id, labelSource: 'entity-id' }
input rows     carry display_name (the signature at :245 names it) — the own name is IN HAND and never read
callers        :644 (rows, rows) · :724 (widened, rows) · :784 (registryRows, registryRows) · :1363 (rows, parentPool)
type           api/cwf/_lib/routing/askOnUnresolved.ts:158  AmbiguityLabelSource = 'parent' | 'layer' | 'entity-id' | 'self'  — 'self' EXISTS (PR 572) and is used at stageClarify.ts:1860 for the collapsed-to-parent-layer path only
comment :170   "What the user reads. Never the shared display name" — written for the same-name case; the distinct-name case was not in the design
pins           api/cwf/__tests__/stageClarify.test.ts:290 and :373 expect labelSource 'parent' — both are SAME-NAME fixtures (three rows, one display name, three parents) and must STAY green; :1209 expects 'self' on the collapsed path and must STAY green
```

```evidence:the-witness
stage 03 output of the witness turn (turn_trace_digest, read 2026-09-16T17:46Z):
  refs      [{ref:"Kalebodur 9 fabrikası", verdict:"ambiguous", candidateCount:3}]
  ask       kind ask-ambiguous · options [{label:"factory",labelSource:"layer",entityId:"KB2"},{label:"factory",labelSource:"layer",entityId:"KB3"},{label:"factory",labelSource:"layer",entityId:"KB7"}]
  diagnosis [{mention:"Kalebodur 9 fabrikası", kind:"AMBIGUOUS", role:"carrier", rule:"S140-1-A1:object≠SYSTEM", candidates:["KB2","KB3","KB7"]}]
  decisions [{kind:"OFFER_CHOICE", options:["KB2","KB3","KB7"]}]   blocking OFFER_CHOICE
screen:     "'Kalebodur 9 fabrikası' adıyla eşleşen 3 kayıt var. Hangisini kastettiniz?  1. factory  2. factory  3. factory"
registry:   the three rows' display_name values are DISTINCT (each carries its own number in the name); parent_layer_key and parent_entity_id are NULL on all three — the factory layer has no parent
```

## PREMISE

MEASURED: the seam, its three rungs, its callers, the type and the pins in `the-head`, by `git show`/`git grep` over the shared clone at master, 2026-09-16T17:49Z.
MEASURED: the witness turn's stage 03 output and the rendered screen in `the-witness` — turn_trace_digest via execute_sql at 17:46Z and the built-in browser at 17:45Z.
MEASURED: the three factory rows' display names are distinct and parentless — entity_registry via execute_sql at 17:47Z.
UNMEASURED: whether any OTHER layer can present distinct-name candidates with no parent (workstation, frame_object NULL, is the candidate). Not needed: the rule below is layer-agnostic.
SELF-INVALIDATION: this premise dies if `buildDisambiguators` gains an own-name rung by another hand, or if `origin/master` moves by a commit touching stageClarify.ts.

## ORDERS

ORDER 1 - THE RULE, in `buildDisambiguators` and nowhere else: a candidate is labelled by ITS OWN display name whenever that name is unique among the candidates being labelled — `labelSource: 'self'`. Only when two or more candidates SHARE a display name does the existing ladder apply to those colliding rows (parent → layer → entity-id), unchanged. Uniqueness is judged over the `rows` argument (the set that will be offered), not over the whole registry. Write the rung FIRST and rewrite the function's comment block so it names FOUR rungs and says why 'self' comes first: a user is asked to choose between things, and a thing's own name is the label unless the names cannot tell them apart. ⚠ The comment at askOnUnresolved.ts:170 ("Never the shared display name") stays true — it speaks of the SHARED case — but add one clause naming the distinct-name case so the two comments do not contradict each other.

ORDER 2 - TESTS, failing-first on the fork point, in the existing stageClarify test file beside the pins named in `the-head`: (a) three candidates with DISTINCT display names and no parent ⇒ every option is its own display name, labelSource 'self', no option reads a layer key; (b) three candidates sharing ONE display name with three different parents ⇒ the pins at :290/:373 stay exactly as they are — 'parent'; (c) a MIXED set: two rows share a name, one row is unique ⇒ the unique row is 'self', the two colliding rows are 'parent'; (d) the collapsed-path pin at :1209 stays green. ⚠ TENANT-ZERO GATE (CI step 8): fixtures use the file's existing synthetic names; no live factory, line or equipment name enters the tree — the witness's real names live only in this card and in your report's quotation of the bus, never in a test.

ORDER 3 - WITNESS, after the landing and production READY: in a NEW conversation the Architect asks the same sentence as the witness turn; stage 03 must show three options whose labels are the three factories' own display names with labelSource 'self', and the screen must list three different names. You read turn_trace_digest and print the options array. That reading is the acceptance.

ORDER 4 - Branch off current master, ONE pull request, no-ff, never a squash. Run `npm run build` (the doc-drift gate lives there — stageClarify.ts is mapped by five tabs; reseal in the SAME commit) and `npm run check:tenant-zero`, print both. Report at `docs/relay/ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-AG4-report.md`; the report follows the landing and never gates it (§12.8). Post the from_lane slip with the forty-hex head and CI as you read it — print `run_attempt` beside each conclusion.

## FALSIFIER

If an own-name rung already exists, STOP. If making 'self' the first rung turns any existing test red for a reason other than the four rungs' order, STOP and print it — that is a consumer this card did not see. If `rows` on any caller does not carry display_name, STOP and print the caller.

## SHARED SURFACES

```scope
- api/cwf/_lib/turn/stageClarify.ts (buildDisambiguators and its comment only)
- api/cwf/_lib/routing/askOnUnresolved.ts (one comment clause at the AmbiguousOption label field; no type change)
- api/cwf/__tests__/stageClarify.test.ts
- public/architecture/manifest.json (reseal, same commit)
- docs/relay/ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-AG4-report.md
```

No change to the collapse path (:1860), to `computeAskOutcome`, to ⑤/⑥, to the render layer, or to any registry read.

## DECISION RIGHTS

You may render a colliding pair as "own name (parent name)" instead of the bare parent name IF you also keep labelSource 'parent' and the :290/:373 pins pass unchanged; if they would move, do not. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the three rungs, the callers, the type and the pins | MEASURED: git show / git grep over the shared clone at master, 2026-09-16T17:49Z | the-head |
| the witness turn's ledger and screen | MEASURED: turn_trace_digest via execute_sql at 17:46Z; built-in browser page text at 17:45Z | the-witness |
| the three factory rows are distinct-named and parentless | MEASURED: entity_registry via execute_sql at 17:47Z | the-witness |
| the post-landing witness | NOT-READ | ORDER 3 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if `origin/master` moves by a commit touching stageClarify.ts, or if a v2 appears.
