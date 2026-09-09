# F-S134-THE-CARD-FENCE-NAMED-SIX-GOVERNED-READS-AND-THERE-ARE-SEVEN-1

session: S134 · cut by the Architect at 2026-09-09T02:55Z · bridge UP
class: ARCHITECT DEFECT (A-REC-adjacent) — the card was executed faithfully and the card was incomplete
laws touched: TOTAL-45 · S61-2 (leave no debt behind) · S102 (a single negative probe is not proof of absence)

## WHAT HAPPENED

`CARD-LENS-MEASUREMENT-REPAIR-1-S134-1-v1` carried an `evidence:callsites` fence naming the
governed reads that sit inside the per-frame clarification seam. AG-4 wrapped every one of them in
`memoizeFrozenRead` and wrapped nothing else — correct behaviour, since a lane acts on the fence it
was given and does not silently widen its own scope.

The fence named SIX distinct reads. There is a SEVENTH:

```evidence:seventh
api/cwf/_lib/turn/stageClarify.ts, on the repair branch, line 977:
            const catRes = await resolveToolCategories();
```

It is still read once per frame and it is still unmemoized on the repair branch. Measured with
`git show <branch>:api/cwf/_lib/turn/stageClarify.ts` and grepped for the call, at 2026-09-09T02:55Z.

## WHY THE FENCE MISSED IT

The fence was built from two greps of `stageClarify.ts` — one for `Repository`, one for `resolve`.
`resolveToolCategories()` matches the second pattern and DOES appear in that file's import block,
which is where the Architect's eye stopped. The call site is at line 977, inside a later branch of
`computeTurnClarification` that the grep output showed but the Architect did not carry into the
fence. Two greps that share the same reading habit are one lens wearing two coats — the owner's own
standing rule about independent checks, violated by the Architect in the very card that quotes it.

## WHAT IT DOES AND DOES NOT CHANGE

- It does NOT invalidate the repair. Six of seven redundant read families are collapsed, and the
  request shape measured on the S133 run was dominated by `domain_rules`, `backends`,
  `entity_registry`, `backend_tools` and `backend_entity_layers` — all inside the six.
- It DOES mean ORDER E's before/after numbers will still carry one per-frame governed read. Whatever
  duration AG-4 reports is therefore an UPPER BOUND on the repaired cost, not the floor.
- It does NOT justify a v2 of the card. The work is on a branch and pushed; a second card version
  written before the branch's own report is read would be exactly the loop this house has already
  paid twenty-two hours for (A-REC-S133-6). The seventh read is recorded here and belongs to
  whichever card next touches this seam, with ORDER E's numbers in front of it.

## ATTRIBUTION

The blind spot is the ARCHITECT's, not AG-4's, and it is written here rather than folded into a card
revision so that the record does not later read as though the lane had missed something.

BODIES: CARD-LENS-MEASUREMENT-REPAIR-1-S134-1-v1 · F-S134-THE-POOLER-LOG-IS-A-POSITIVE-LIVENESS-LENS ·
A-REC-S133-6 · S61-2 · TOTAL-45.
