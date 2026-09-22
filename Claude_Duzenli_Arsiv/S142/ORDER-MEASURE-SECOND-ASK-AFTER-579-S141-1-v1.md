<!-- relay-audit: v1 kind=notice -->
ORDER-MEASURE-SECOND-ASK-AFTER-579-S141-1-v1

LANE: scout

PRIORITY OVER EVERYTHING IN YOUR BOX, including the LAND-581 verdict (hold it until this is measured — 581 touches matchShownOption, the seam under suspicion).

THE OWNER-VISIBLE REGRESSION CANDIDATE, measured on production at master e443e35f… (PR 579 live, Vercel READY 12:58:47Z), by the Architect in the built-in browser, conversation id in `raw-tokens`:
turn 1 (13:10:48Z) `KB7 fabrikası fırın duruşları, 16 Eylül 2026` → ask, TWO options (FIRINALT, FIRINUST), scoped by KB7 (entity_scope_narrowed entered 1388 survived 567, carriedFrom null) — correct.
turn 2 (13:12:14Z) `FIRINUST` → THE SAME ASK AGAIN (English template): ir_frame entity_ref ["KB7","fırın"], entity_scope_narrowed carriedFrom 545223f8…, clarification_asked. No injected ref, no answer. At 07:22Z (PR 576 witness) the same two-turn shape answered: optionRefs [FIRINUST], injectedRef FIRINUST, no second ask.

MEASURE, in this order:
(1) Which landing changed the carry path between 07:22Z and now: list every master merge since 69549266… (PR 576) touching api/cwf/_lib/turn/stageClarify.ts or the carried-resolution read (readCarriedResolution :5xx, injectedRefFor :520, matchShownOption :531 at db907a34 numbering) — 577 (binder), 579 (+29 lines at :2672, producer 2 at the entityResolutions stamp). Print 579's stageClarify.ts hunk in full and say whether it can change control flow (an early return, a throw caught upstream, a changed `carried` object).
(2) The two paths: turn 1 at 07:22Z was the GENERAL ask (no factory in the message, five options); today's turn 1 was the COLLAPSED ask (KB7 in the message, :2133 branch, two options). Does the carried-option injection (PR 576, injectedRefFor) read `row.decision.ask.options` in a shape the COLLAPSED branch persists? Print where each branch persists its ask (the stage record / decision row) and whether `options[].entityId` and `label` are present for the collapsed one. If the collapsed branch persists no `ask` (or a different key), that is the finding — F-S141-CARRIED-OPTION-NOT-INJECTED-ON-THE-COLLAPSED-ASK-PATH-1 — and NOT a 579 regression.
(3) Read the production stage records for both turns (the table the 07:22Z witness read optionRefs/injectedRef from — name it): print `carried`, `askOption`, `askMatch` (if 581 were live — it is not), `injectedRef`, `optionRefs` for turn 2.
(4) turn_done: neither turn produced a `turn_done` telemetry row (kind='turn_done' absent after 13:05Z) — is turn_done skipped on ask turns by design? cite the line. The turnContext witness for 579 needs a full (answered) turn; say what shape of turn produces one.

VERDICT lines: `SECOND-ASK: REGRESSION-579 <hunk>` or `SECOND-ASK: COLLAPSED-PATH-GAP <where>` or `SECOND-ASK: OTHER <what>`, then the four items. `reply_to` = THIS row's id. Then the LAND-581 verdict (row 584a4880), amended by what you found.

```evidence:raw-tokens
conversation      6c3c49da-14ee-4925-a60f-b8ceaffe450d
turn 1 user msg   8efe671a-bc95-4335-8fa7-f7e49d060a30   13:10:48Z
turn 1 ask        8f5c5589-c19b-4c04-a238-71a8df5deac7   13:11:09Z
turn 2 user msg   e8a7d6b9-69ca-49cc-a130-95fd4bb50a7f   13:12:14Z   "FIRINUST"
turn 2 ask again  4af94479-15e9-455b-a893-195038a504bd   13:12:26Z
carriedFrom       545223f8ec6843a9d4a0bcd94ce6a6e8
07:22Z witness    reply turn 4f15b00a (optionRefs [FIRINUST], injectedRef FIRINUST)
master            e443e35f0ea9b9c4da498f2943318f7c22379c2b
PR 576 merge      69549266
LAND-581 order    584a4880-f10a-41f2-89bb-03cc268097ab
```
