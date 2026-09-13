# F-S137-THE-ONLY-LANDER-IS-ALSO-A-PRODUCER-1

Opened 2026-09-13T03:05Z. Found by AG-4 refusing a card, confirmed by the Architect reading the law it
cited. The Architect wrote the card that broke the law, and the adversary's earlier ruling helped it.

## THE LAW, READ AT MASTER, WHICH SETTLES IT

```evidence:6a
CLAUDE.md §6a at master e95b0fdf4fdb4c53eba3f3561b0eae0ac50f81c5:

  | ADF_LANE_ROLE | guard-bash.py, scripts/land.ts | the merge key is absent, so gh pr merge is REFUSED |

  **`ADF_LANE_ROLE` is a merge key, not a label**, and in a producer window UNSET is the
  CORRECT state — it is the precondition that makes the guard refuse a merge there. Do not
  set it, and do not "fix" it when you notice it is unset. The absence is the feature.
```

Unambiguous. AG-4 is a producer window. `CARD-LAND-ASK-RENDERED-TWICE-S137-1-v2` ORDER 0 told it to set
that variable. **The card ordered a lane to break a law**, and AG-4 stopped on §7 condition 5 — a card that
contradicts a law is REPORTED, not resolved. It reported and pushed nothing. It was right.

## THE STRUCTURAL CONSEQUENCE, WHICH IS BIGGER THAN THE CARD

AG-5 holds the merge key. The report-only seam in `land.ts` refuses a self-land on any diff that is not
report-only. Therefore:

**WHENEVER AG-5 AUTHORS PRODUCT CODE, NOTHING IN THIS FACTORY CAN LAND IT.**

The only lane permitted to merge is also a lane that writes. Every landing this week worked because AG-4
authored and AG-5 landed. The moment the direction reversed — tonight, on the owner's own product defect —
the factory deadlocked with the tree fully green.

```evidence:green
head ce3f785ec0692c79c7583c5a7047965aa1357594, PR 546 MERGEABLE/CLEAN
three workflows success · drift line "no drift -- all 7 narrative tabs synced (mode=head)"
eval-canary SKIPPED and named · nothing red, nothing in flight
```

Nothing is wrong with the work. The fix for the owner's own witnessed defect sits finished and unlandable.

## THE ARCHITECT'S DEFECT, NAMED

`A-REC-S137-I-SENT-PRODUCT-WORK-TO-THE-ONLY-LANDER-1`. The producer card went to AG-5 because AG-5 was
idle. Idleness is not the criterion; the criterion is WHO WILL LAND IT. Had the card gone to AG-4, AG-5
would have landed it hours ago by the same route it used three times tonight.

Beside it, the reason the error survived review: the adversary measured that the guard fences only a direct
`gh pr merge` and NAMES the `ADF_LANE_ROLE=AG-<n> npm run land` route — a true reading of the guard that
missed §6a's prohibition on setting the variable at all. The Architect carried that line into a card
without checking it against the law. Two instruments agreed and both were incomplete; the LANE caught it.
That is this house's §12.13 in its healthiest form: the disagreement was the finding.

## THE REPAIR, AND ONLY THE OWNER CAN CHOOSE

**① ONE-OFF:** the owner lifts §6a for this single landing, naming it. Cheapest, and the tree is green.

**② STANDING RULE:** AG-5 never authors product code — it lands. Costs nothing today, prevents the
deadlock forever, and is the rule the factory has been following by accident all week.

**③ A SECOND MERGE KEY:** a lane other than AG-5 is granted the key. This widens who can merge and is the
change this house should think hardest about; it is not a decision to take at three in the morning.

The Architect recommends ② as the standing rule and ① to unblock tonight's fix. Both are the owner's.

## WHAT REMAINS UNMEASURED

Whether the owner's ban that AG-4 cites — "the owner banned that route for this window on the last
landing, the S100-3 detached-worktree form was the route allowed then" — exists anywhere readable. The
Architect did not find it in the tree and did not go looking further; §6a alone decides the case, so the
ban is not load-bearing here. It is the citations finding again.

END · F-S137-THE-ONLY-LANDER-IS-ALSO-A-PRODUCER-1
