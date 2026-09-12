# CWF-S137-FINDINGS-v1

Cut 2026-09-12. Every line is MEASURED with its instrument, or says UNMEASURED.

## F-S137-A-REPORT-COMMIT-KILLS-EVERY-FENCE-1 — THE SESSION'S DOMINANT FAILURE

**THREE landing cards died tonight to the same shape**, and it is not a lane behaving badly. Each producer
did the RIGHT thing: put its report in its own commit so the code commit stays exactly the fenced set. Each
time, that second push moved the branch tip after the Architect had cut a card against it.

```evidence:instances
532  v1 and v2 both refused — the author's report commit moved the tip while the card was written (S137, 23:2xZ 09-11)
535  survived only because the card was cut AFTER the adoption commit
ASK  v1 refused — the report commit landed at 20:00:05Z, the card's row was minted 20:03:31Z.
     DECAYS had fired three minutes before the card existed.
```

Worse, measured by the adversary on the third instance: the superseded head's runs come back **CANCELLED**,
and cancelled is neither a pass nor a failure — `judgeCi` refuses it. So a dead fence does not merely
mis-name a sha; it names a tree the forge never finished judging.

**AND THE ARCHITECT DID IT TOO.** While the adversary was reviewing the documents-push card, the Architect
committed a ninth artefact into that repository and killed its own fence. It named the breach to the
adversary rather than hiding it (`NOTICE-THE-DOCUMENTS-COUNT-MOVED-WHILE-YOU-READ-S137-1-v1`), and the
adversary had already read the ninth commit before sealing. The class is not a lane defect; it is a
fence-versus-clock defect that every actor in this factory commits.

REPAIR DIRECTION, not ruled here: a landing card fenced to a BRANCH NAME plus a "no pushes since" assertion
the lane re-measures, rather than to a tip sha; or a hold issued at the moment the producer card is cut
rather than after the first death. Both are design questions and go to the adversary.

## F-S137-THE-GRANT-IS-WIDER-THAN-THE-RULING-1 — OPEN, AND THE OWNER RULED IT STAYS

Filed in full as its own artefact. `Bash(graft:*)` admits every subcommand with no prompt, including
`graft build --deep` and `graft brain link` / `brain push` — the two paths the owner's absolute ruling
(`OWNER-RULING-S137-NO-CODE-LEAVES-FOR-GRAFT-1`) forbids. Telemetry is ON on the machine and has already
flushed. The skill file contradicts itself at lines 16 and 86.

The owner was shown all three and ruled: **"AG-4 benimsesin, ayarlara dokunmasın."** So `#535` landed with
the settings as they are. The finding STAYS OPEN by his informed choice, and the ruling is now enforced by
convention rather than by the grant — which this house's own §12 says has already failed. Recorded so a
future session does not rediscover it as news.

## F-S137-THE-FACTORY-CITES-AUTHORITIES-GIT-CANNOT-SEE-1 — FILED, UNREPAIRED

Four of five rulings cited in cards this session are ABSENT from the tree. Three actors hit it
independently in one day. One ruling (S130) is done properly and pinned by two tests, so the repair shape
exists. Filed in full as its own artefact.

## THE ARCHITECT'S OWN DEFECTS, ALL FIVE

`A-REC-S137-I-POLLED-INSTEAD-OF-NAMING-THE-SILENCE-1` — four consecutive unmoved measurements reported as
ticks. The owner asked "neden debelenip duruyorsun". The rule adopted: two consecutive unmoved measurements
are a REPORT plus a finding, never a third tick.

`A-REC-S137-I-READ-ABSENCE-OF-PUSH-AS-ABSENCE-OF-WORK-1` — told the owner AG-4 was asleep and asked him to
interrupt its window. Measured minutes later: the card was consumed 24 seconds after insert and the clone
fetched 8 seconds after that. §12.11(b) and §12.10, both named in this house's own law. The action item was
withdrawn before he acted on it.

`A-REC-S137-I-ASSERTED-AN-ABSENCE-FROM-ONE-GREP-1` — said no language signal exists on the turn.
`ctx.language` comes off the request body in `api/cwf/chat.ts`. Single-negative-probe.

`A-REC-S137-I-OMITTED-THE-RESEAL-FROM-A-SEALED-SEAM-CARD-1` — the ASK producer card v1 edited two sealed
files without ordering a reseal or scoping the manifest. The adversary refused it; a lane obeying it would
have hit a red build.

`A-REC-S137-I-DRAMATISED-A-SETTINGS-GAP-AS-A-BREAKAGE-1` — presented the graft findings to the owner as if
something were broken. He pushed back: "bu kadar is yaptin... bizde neden patliyor?" Nothing was broken.
The gap was between graft's defaults and HIS ruling, and the actual blocker on `#535` was AUTHOR-UNKNOWN,
which has nothing to do with graft. Bundling them made one owner decision look like three.

## WHAT THE ADVERSARY CAUGHT THAT NOBODY ELSE WOULD HAVE

It refused two cards tonight and both refusals shrank the work rather than growing it. On the ASK producer
card it measured that ② SUBSUMES ①: rendering one member makes the doubled list vanish with no change to
the hint builder, keeping two out-of-scope test files untouched. On the landing card it measured the
CANCELLED runs at the dead fence — a state neither green nor red that the Architect had no lens for.

It also corrected two counts the Architect had stated loosely: `npm run build` runs SIX steps, not five;
and the joined clarification form is asserted seven times in exactly one test file, not "somewhere in the
suite".

## WHAT REMAINS UNMEASURED AT CLOSE

Whether session `24d72668-e84b-435c-9401-ecc36f496433` — the uncarded window that wrote the graft wiring —
was a lane, the Operator, or the owner's own. Its transcript sits under a path neither the adversary's
hooks nor the Architect's bridge can read. AG-4 adopted the work rather than claiming it.

Whether `REGISTER-BUG-BUCKET` has moved. It stood at v54 for three sessions and was not measured tonight.

`cwf-sota-definition` is ABSENT from the tree — measured. Only `docs/laws/constitution/SOTA-1.md` is there.
The acceptance contract for SOTA lives where no gate can read it, which is the same class as the citations
finding above, applied to SOTA-1 itself.

END · CWF-S137-FINDINGS-v1
