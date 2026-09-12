# OWNER-AUTHORITY-S137-LAND-ASK-RENDERED-1

Given by the owner, 2026-09-12T19:51Z, in his own words:

    OWNER-AUTHORITY-S137-LAND-ASK-RENDERED-1 — yeşilse AG-4 indirebilir.

Given AHEAD of the work, at the Architect's request, so that the landing does not wait on a message.

## WHAT IT COVERS

ONE landing, by AG-4, of the pull request AG-5 opens under `CARD-ASK-RENDERED-TWICE-S137-1-v2`. AG-4 is a
valid lander here and the adversary measured why: the repository's guard fences only a direct `gh pr merge`
and names the `ADF_LANE_ROLE=AG-<n> npm run land` route, which `landerLane` accepts. AG-5 authored, so it
cannot land its own product work.

No spend approval accompanies it and none is needed: the canary carries `if: false`.

## THE PRODUCT DECISION UNDERNEATH IT

This landing overturns `F171`, a recorded design decision the owner had never been shown. The owner's
earlier word — **"KES"** — is what moves it, on what he saw on screen.

```evidence:f171
api/cwf/_lib/turn/stageClarify.ts, doc comment above bilingualText, at master:
  the message renders BILINGUALLY, TR first, because it is deterministic and
  "has no reason to pick a side based on ctx.language — that toggle is an
  INTERFACE setting, not a translation of what the user actually typed"

api/cwf/__tests__/stageClarify.test.ts, the test that pins it by name:
  "F171: the message is IDENTICAL regardless of ctx.language — the toggle no longer decides"
```

The card orders that test REWRITTEN rather than deleted, keeping its F171 reference and recording that the
owner overturned it having witnessed the output. A deleted test loses the history.

## THE ARCHITECT'S TWO ERRORS ON THIS ITEM, RECORDED

**① "No language signal exists on the turn."** Wrong. `ctx.language` comes off the request body in
`api/cwf/chat.ts` and is typed `string | undefined`. The Architect asserted an absence from one grep of one
file — the single-negative-probe class this house already names.

**② v1 of the card omitted the reseal.** Both seam files are sealed — `stageClarify.ts` in five narrative
tabs, `computeClarification.ts` in one — so any edit reddens `check:doc-drift` until `npm run reseal` runs in
the same commit, and the manifest was not in the card's scope block. The adversary refused it. A lane obeying
v1 would have hit a red build or reseal outside its own fence.

The adversary also found that ② SUBSUMES ①: rendering one member makes the doubled list disappear with no
change to `withKnownFactoryHint`, which keeps two out-of-scope test files untouched. The work got smaller
because the card was refused.

END · OWNER-AUTHORITY-S137-LAND-ASK-RENDERED-1
