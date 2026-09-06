# S129-FINDINGS-ADDENDUM-1 — the downstream reader question, answered while the scout reviewed

`CARD-TOOL-VISIBILITY-B-1-v1` carries one NOT-READ row: whether any downstream reader consumes the
stage 07 `offeredToolNames` field and would break if its population changed. ORDER A orders the
lane to settle it. The Architect ran the same grep in parallel, on the owner's clone at
2026-09-03T11:5xZ, so the answer is on record BEFORE the lane reports — and so that a lane report
that says "no readers" can be recognised as wrong rather than accepted.

The card is NOT amended. S37-1: a submitted artifact is immutable, and this card already branches
correctly on either answer. This file is a finding, not a correction.

## WHAT THE GREP FOUND

MEASURED: at 2026-09-03T11:5xZ, `grep -rn "offeredToolNames" api src scripts` in the owner's clone
over the bridge, with the three modules that compute their own list from `toolCategories.ts`
excluded (`toolCategories.ts`, `replay/routerAbLens.ts`, `scripts/a23PathBArmB.ts`).

There IS a consumer chain, and it makes an assumption that GATE 1 would invalidate:

    api/admin/stage-context.ts:137
        resolveStage11(turn, stage07.artifact.offeredToolNames)

    api/cwf/_lib/replay/stageContextSlice.ts:425
        const offeredSet = offeredToolNames
            ? new Set([...offeredToolNames, ...LOCAL_TOOL_NAMES])
            : null;

`stageContextSlice` UNIONS the local tool names into the offered set, and it does that precisely
BECAUSE `offeredToolNames` is known to exclude them — `localTools.ts` line 6 states the same fact
in its own prose: the local tools are "never part of `ctx.offeredToolNames` (that set is MCP
`toolDefs` only)".

If GATE 1 redefines `offeredToolNames` to carry the REGISTERED set, the local tools are ALREADY in
it, and this union becomes a no-op that looks deliberate. That is not a crash — it is worse: a
correct-looking line whose reason has quietly evaporated.

## THE DISTINCTION THE LANE MUST STILL SETTLE

UNMEASURED, and named as such: whether `stage07.artifact.offeredToolNames` at
`stage-context.ts:137` is the LIVE SPAN's field or a value REBUILT by the replay slice from the
recorded turn. `stageContextSlice.ts:131` assigns `offeredToolNames: result.offeredToolNames` from
a router recomputation, which suggests rebuilt rather than read — but suggests is not measured, and
the Architect did not open the call path far enough to say.

That distinction decides the shape of GATE 1:

  - if the replay slice REBUILDS the list, the live span is free and `offeredToolNames` may carry
    the registered set, with `localTools.ts`'s prose updated so the next reader is not misled
  - if the replay slice READS the live span, the old field keeps its population and the honest
    registered set arrives under its own name beside it

ORDER A of the card orders exactly this reading. The lane settles it by opening the call path, not
by grepping harder.

## WHY THIS IS FILED RATHER THAN SENT

S54-3: a cross-lane relay is EXACTLY ONE self-contained artifact. Sending this as a side note
beside the card would make the dispatch two artifacts and would put a measurement into the lane's
hands that the card's own ORDER A is designed to produce. The card stands as sent. This file exists
so the Architect can check the lane's answer against an independently taken one — and so that the
session close does not have to re-derive it.

TAIL ANCHOR: S129-FINDINGS-ADDENDUM-1 ends here.
