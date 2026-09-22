with b as (select $b$<!-- relay-audit: v1 kind=card -->
CARD-ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-v2

LANE: AG-4
fanout: personalized
v2 SUPERSEDES v1, which the scout held RED on two discriminators and which was never delivered: (2) the pin at stageClarify.test.ts:373 is NOT a same-name fixture — two cameras with distinct timestamped names under two lines, labelled by their LINE — so a self-FIRST rung would move a pin v1 said stays, and would offer names that are unique but not legible; (5) v1 let the report quote the witness's real names, and docs/relay/ is a tracked path the tenant-zero gate scans. THE RUNG ORDER BELOW IS THE SCOUT'S DESIGN, recorded by name (SCOUT-VERDICT-CARD-ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-v1, discriminator 2): parent → self → layer → entity-id. The Architect's blind spot: it read :290 and assumed :373 had the same shape without reading it. The first defect found by the ⑤/⑥ witness on production, minutes after PR 573 went live (master in `the-head`). The Architect asked, in a new conversation, for the OEE of a factory that does not exist under that name. Room ⑤ did its job — three near-miss factories, AMBIGUOUS, carrier — and room ⑥ chose OFFER_CHOICE. The ask then rendered as three identical lines reading the LAYER KEY, because `buildDisambiguators` was designed for candidates that SHARE a display name (three lines all called the same thing, told apart by their parent factory) and has no rung for candidates whose own names already tell them apart. At the factory layer there is no parent, so every option fell to the 'layer' rung and the user was offered "factory, factory, factory". One function, one new SECOND rung, tests, nothing else.

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
pins           api/cwf/__tests__/stageClarify.test.ts:290 (same-name lines under three parents, labels by parent) and :373 (two cameras with DISTINCT timestamped names under two lines, labels by parent — read by the scout at :358-:373) expect labelSource 'parent' and must STAY green; :1209 expects 'self' on the collapsed path and must STAY green
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

MEASURED: the seam, its three rungs, its callers and the type in `the-head`, by `git show`/`git grep` over the shared clone at master, 2026-09-16T17:49Z; the two pins' fixture shapes by the scout's read at ~17:53Z (its verdict row on v1), carried here as the scout's measurement.
MEASURED: the witness turn's stage 03 output and the rendered screen in `the-witness` — turn_trace_digest via execute_sql at 17:46Z and the built-in browser at 17:45Z.
MEASURED: the three factory rows' display names are distinct and parentless — entity_registry via execute_sql at 17:47Z.
UNMEASURED: whether any OTHER layer can present distinct-name candidates with no parent (workstation, frame_object NULL, is the candidate). Not needed: the rule below is layer-agnostic.
SELF-INVALIDATION: this premise dies if `buildDisambiguators` gains an own-name rung by another hand, or if `origin/master` moves by a commit touching stageClarify.ts.

## ORDERS

ORDER 1 - THE RULE, in `buildDisambiguators` and nowhere else, FOUR rungs in this order: (1) 'parent' — a parent display name is in hand: label by it, exactly as today (a parent is the disambiguator the design chose, and the :373 fixture proves a unique-but-illegible own name is worse than a parent name); (2) 'self' — NEW: no parent name is in hand and the row's own display_name is non-empty: label by the row's own display_name; (3) 'layer' — as today; (4) 'entity-id' — as today. The witness reaches rung 2 because factory rows are parentless. Rewrite the function's comment block so it names FOUR rungs and says why 'self' sits between parent and layer: a thing's own name is the label whenever nothing above it can tell the things apart better, and the layer key never is. ⚠ The comment at askOnUnresolved.ts:170 ("Never the shared display name") stays true — add one clause naming the parentless, own-name case so the two comments do not contradict each other.

ORDER 2 - TESTS, failing-first on the fork point, in the existing stageClarify test file beside the pins named in `the-head`: (a) three PARENTLESS candidates with distinct display names ⇒ every option is its own display name, labelSource 'self', no option reads a layer key; (b) the pins at :290 (same-name lines under three parents) and :373 (distinct-name cameras under two lines) stay EXACTLY as they are — 'parent'; (c) a parentless row whose display_name is EMPTY falls to 'layer' as today — the floor is kept; (d) the collapsed-path pin at :1209 stays green. ⚠ TENANT-ZERO GATE (CI step 8, corpus = git ls-files, docs/relay INCLUDED): fixtures use the file's existing synthetic names, and your REPORT does not quote the witness's real factory names either — it names the turn id and says "three parentless factory rows with distinct names"; the real names live only on the bus.

ORDER 3 - WITNESS, after the landing and production READY: in a NEW conversation the Architect asks the same sentence as the witness turn; stage 03 must show three options whose labels are the three factories' own display names with labelSource 'self', and the screen must list three different names. The Architect reads turn_trace_digest and reports the options array to you on the bus; that reading is the acceptance (the scout's window cannot read the ledger — GM-1 refuses execute_sql there).

ORDER 4 - Branch off current master, ONE pull request, no-ff, never a squash. Run `npm run build` (the doc-drift gate lives there — stageClarify.ts is mapped by five tabs; reseal in the SAME commit) and `npm run check:tenant-zero`, print both. Report at `docs/relay/ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-AG4-report.md`; the report follows the landing and never gates it (§12.8). Post the from_lane slip with the forty-hex head and CI as you read it — print `run_attempt` beside each conclusion.

## FALSIFIER

If an own-name rung already exists, STOP. If inserting 'self' between parent and layer turns any existing test red, STOP and print it — that is a consumer this card did not see. If `rows` on any caller does not carry display_name, STOP and print the caller.

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

You do not widen: no "own name (parent)" composite in this card — the parent rung is untouched. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the three rungs, the callers, the type and the pins | MEASURED: git show / git grep over the shared clone at master, 2026-09-16T17:49Z | the-head |
| the witness turn's ledger and screen | MEASURED: turn_trace_digest via execute_sql at 17:46Z; built-in browser page text at 17:45Z | the-witness |
| the three factory rows are distinct-named and parentless | MEASURED: entity_registry via execute_sql at 17:47Z | the-witness |
| the post-landing witness | NOT-READ | ORDER 3 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if `origin/master` moves by a commit touching stageClarify.ts, or if a v3 appears.
$b$ as t), o as (select $o$<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-v2

LANE: scout

v2 of the label card, cut from YOUR RED on v1 (both discriminators taken; the rung order parent → self → layer → entity-id is yours and is credited by name in the card). Bytes in the row named BYTES-FOR-REVIEW-CARD-ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-v2; digests in `raw-tokens`. The Architect re-read stageClarify.test.ts:355-373 in the shared clone and confirms your reading of the fixture.

DISCRIMINATORS, measure each and print what you measured:
(1) ORDER 1's rung order versus the three pins (:290 · :373 · :1209): under parent → self → layer → entity-id, do all three stay green as written? A pin that would move is RED.
(2) ORDER 2's tests (a)-(d): does any test require a live name, or does any clause still send a gated name into a tracked path (report included)? Run the gate's own lens over the card body and say where the hits are; hits confined to the `the-witness` fence on the bus are acceptable, a hit the ORDERS would copy into the tree is RED.
(3) The seam and callers as in v1 — unchanged premise; confirm the head is still the fenced master and `buildDisambiguators` still has three rungs.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-v2 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. The Architect seals ONLY on the verdict that answers THIS row.

```evidence:raw-tokens
card md5        f96ffedbc9661cbc78f2e033654cbef1
card sha256     0ba19df7a27da209e5cbdc30edbde1028720181560b08a9366142bda210558e0
master          2f404888c42c7394566ed9803148390d8e1bab73
your v1 RED     70e244b8-38ec-4704-b182-bca84ebbc9a4
```
$o$ as t)
insert into public.relay_inbox (direction, lane_addr, artifact_name, body)
select 'to_lane','scout','BYTES-FOR-REVIEW-CARD-ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-v2', b.t from b where md5(b.t)='f96ffedbc9661cbc78f2e033654cbef1' and encode(sha256(convert_to(b.t,'UTF8')),'hex')='0ba19df7a27da209e5cbdc30edbde1028720181560b08a9366142bda210558e0'
union all
select 'to_lane','scout','ORDER-REVIEW-CARD-ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-v2', o.t from o where md5(o.t)='a45f63025f9b2e23e6ba16fb59d18627' and encode(sha256(convert_to(o.t,'UTF8')),'hex')='4ae3e4a61225ded4acfc06dd999a80135c902ccb3c1f3c388a3122249d475812'
returning id, artifact_name, created_at;