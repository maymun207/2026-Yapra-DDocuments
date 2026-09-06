<!-- relay-audit: v1 kind=notice -->
# S130-DISPATCH-RECORD-9 — both hardening PRs landed: #493 (master 5d916ad4…) and #494 (master 824fb29d…); the owner's queue item 2 closed

Architect's block record, S130, block 9. Covers 2026-09-05 10:08Z → 14:55Z (13:08 → 17:55 TSİ). All times UTC unless marked TSİ. Every sha below is measured from the bus, Vercel, or a lane report quoted verbatim; the source is named per line.

## WHAT LANDED — PR #493 `phase/harden-context-retrieval-organ-1`

The context-retrieval organ's five scout findings A1–A5 (SCOUT-REVIEW-CONTEXT-RETRIEVAL-1-v1) closed by AG-4 under CARD-HARDEN-CONTEXT-RETRIEVAL-ORGAN-1-v1, each with a planted-fault test proven to fail at the parent, plus a real reseal.

```evidence:landing-493
master before:  de47d9b1fd867bd8c86d76566002da56d53583af   (PR #490 merge)
PR head landed: 57ae325bfda66867e1197a9e6424ed5a0d2e9972   (three AG-4 commits on the #490 master; pushed 13:20:41Z)
master after:   5d916ad418032daf2ec312d059c64c26738b79d1   (foreman ls-remote read-back; Vercel meta githubCommitSha agrees)
landed tree:    ad687561761c183833e06b33928a84765220e6a2   (= merge-tree rehearsal)
merged at:      2026-09-05T14:06:38Z
Vercel prod:    dpl_DJBFj5qzZcQTMYHTSgN1jSbHewVF READY, target production, ref master (Architect read, 14:1xZ)
paths:          12 — five modules, five test files, groundTools.ts (A1 fence-crossing, accepted by name), public/architecture/manifest.json (real reseal)
CI at head:     total_count 6 — build (24.x) success · rule26 success · changes · relay corpus (grammar v1) · Vercel Preview Comments success · eval-canary SKIPPED (named)
```

## WHAT LANDED — PR #494 `phase/harden-provenance-export-1`

The provenance export's three scout findings A1–A3 (SCOUT-REVIEW-PROVENANCE-EXPORT-1-v1) closed by AG-4 under CARD-HARDEN-PROVENANCE-EXPORT-1-v1: two-layer redaction (repo scrubber, then six frozen shape patterns) THEN bounding with every cut declared (`bounded`, `originalBytes`, named constant 8192, byte cut dropping a partial trailing character); `truncated` a REQUIRED positional argument pinned by a `@ts-expect-error` type-level test; `exportTurnProvenanceTraced` wrapper carrying counts/bounds/names and no payload byte, the pure builder untouched. 18 → 29 tests; 11 fail / 18 pass at the parent; the pre-fix leak DEMONSTRATED.

```evidence:landing-494
master before:  5d916ad418032daf2ec312d059c64c26738b79d1   (PR #493 merge)
PR head landed: cbcf2b9e48d3a8f4249fda6d4cd20492f9d9ec06   (sync merge of f5b86638… with the #493 master; pushed 14:20:49Z)
master after:   824fb29d927c6e8c1f59e55ceac49455f3374cb0   (foreman ls-remote read-back; Vercel meta githubCommitSha agrees)
landed tree:    2beb78ecc9f44889a895e8331fb56fb5936d5c54   (= merge-tree rehearsal; foreman re-derived by rev-parse ^{tree})
merged at:      2026-09-05T14:50:53Z
Vercel prod:    dpl_4SvT6r3eEebp95RT9c8mkGQhuvS6 READY, target production, ref master (Architect read, 14:5xZ)
paths:          3 — turnProvenanceExport.ts (+261) · turnProvenanceExport.test.ts (+252) · public/architecture/manifest.json (real reseal)
CI at head:     total_count 6, all completed — build (24.x) success · rule26 success · changes · relay corpus (grammar v1) · Vercel Preview Comments success · eval-canary SKIPPED (foreman's own read at the forty hex, 14:50Z; ORDER B wait ZERO)
resolver:       AUTHOR-SUBJECT lane=AG-4, subjects=2 reports=0; lander AG-5 → PASS; sync merge commit invisible to lens one (land.ts reproduced the scout's prediction)
latencies:      approval/scout copy 535.6s · landing card 273.4s · AG-4 copy 244.9s (owner read line ~17:48 TSİ)
```

## THE CHAINS, AS RUN (bus rows by artifact_name; ids in the transcript fence)

#493: CARD-HARDEN-CONTEXT-RETRIEVAL-ORGAN-1-v1 → AG-4 (10:04:14Z). AG-4 report 13:40:54Z (window suspended with the owner's machine ~13:05–16:20 TSİ; progress measured meanwhile from the owner's clone via `git for-each-ref` — silence was work). Scout card 13:33:52Z → verdict GREEN 13:58:34Z. Approval PR-493-1 13:44:22Z bound to 57ae325b…; landing card 14:02:17Z; owner typed the read line ~17:09 TSİ; foreman consumed 14:10:41Z — but the merge stamp is 14:06:38Z: the foreman had read and landed before stamping the card consumed (latencies 1152s / 264s / 77s). Report 14:08:58Z.

#494: CARD-HARDEN-PROVENANCE-EXPORT-1-v1 → AG-4 (10:07:25Z). AG-4 report 13:59:14Z (PR #494 at f5b86638…, CI 6/6 at that tip). CARD-TRUNK-SYNC-HARDEN-PROVENANCE-EXPORT-1-v1 → AG-4 14:15:51Z (consumed 14:17:01Z) and CARD-SCOUT-REVIEW-HARDEN-PROVENANCE-EXPORT-1-v1 → scout 14:19:00Z, in parallel. AG-4: merge conflicted in the seal ALONE, resolved by regeneration (three distinct Architecture Map digests — #493's, the branch's, the merged tree's — the proof a hand-merge could not have produced), check:ground + check:doc-drift GREEN on the resolved tree, pushed cbcf2b9e… 14:20:49Z, CI watched to completion 14:36Z, report 14:38:05Z. Scout verdict 14:26:29Z: AMBER (one finding, in a comment), ON-DISAGREEMENT entered and named (reviewed the synced tip, parents named), ORDER A PASS, every fix's test measured to fail at the parent, positive control checked against all six patterns, counts 18+11=29 cross-checked, resolver AUTHOR-SUBJECT/AG-4 read at land.ts:1282 / :956, CI IN-PROGRESS named. Approval PR-494-1 14:39:36Z bound to cbcf2b9e…; scout verdict and AG-4 sync report copied to the AG-5 box; landing card 14:43:58Z; ⚡ one read line to the owner 17:44 TSİ.

```
bus row ids (transcript):
  #493 organ card            a31b4899-4666-4d46-939d-ce06a17e2562
  #493 AG-4 report           4986dedd-1c71-48ff-951e-6a91b778dc40   copy in AG-5 box c49d63f6-ddef-47e5-8071-933971c51a4d
  #493 scout card            c0f7abee-28dc-40d8-a367-8ca75c2e1016
  #493 scout verdict         d5248016-f751-4a71-bdf6-84ee6cb763df   copy in AG-5 box 16f23946-5668-4a78-8a72-3081a5e80943
  #493 owner approval        77443c89-3ab2-4f42-bbd2-062eda79a667
  #493 landing card          f783cb20-d8af-4347-9ad4-260c1bf15ece
  #493 AG-5 landing report   39d8a7fe-c17f-43ec-a568-da8dee513f0a
  #494 provenance card       f3a3e72a-fa72-4097-bcee-98d20a3bf840
  #494 AG-4 report           e8880a7e-400c-4681-926a-f48ef038d610
  #494 sync card             83e42f46-e3d6-4533-b563-b386dc666830
  #494 AG-4 sync report      e539e817-5b33-4757-aa10-f153222ca505   copy in AG-5 box cd2490a1-d6fe-485f-8d6d-01bc7a825e42
  #494 scout card            1846867d-563b-4be2-829c-e9663e67df9a
  #494 scout verdict         ec1e2328-9f11-44e5-8eea-44fcffd92e00   copy in AG-5 box 5ce6fda0-e2a3-419f-ba80-25790240d45f
  #494 owner approval        8d669d21-3708-486d-a18c-5a9be87a175f
  #494 landing card          2861fc95-6157-48b1-8b37-515350ab0fd0
  #494 AG-5 landing report   75e74151-4af7-4055-9a9c-ff8d47236a9c   (14:52:40Z)
```

## FINDINGS THIS BLOCK

F-S130-CARD-GATE-REFUSES-ARCHITECT-TEMPLATE-1 (AG-4, three reports): mail-wait's card grammar REFUSED all three Architect cards of this block — organ card CP-1/CP-2/CP-6, provenance card CP-1/CP-2/CP-6, sync card CP-1/CP-2/CP-4/CP-6 — and the lane proceeded only because `CARD_GATE=REPORT` disarms the gate. AG-4's words: "three cards, three refusals, an overlapping set — a pattern in the minting template rather than three independent accidents." Owed to the Architect, next session, BEFORE any card is minted: read the checkpoint definitions from the installed source (scripts/mail-wait.mjs and its grammar module), conform the template, and prove it with a self-test card the gate accepts. Until then every card is running on a disarmed gate, which is a PLATINUM-class debt, named here.

F-S130-DECLARATION-LENS-BARKS-ON-EVERY-LANE-1 (foreman, 09:3xZ): `parseDeclaration` marks all seven `factory_state` rows MALFORMED; the declaration lens is uninformative until fixed. Owed: AG-4 card next session (read the parser and the seven live rows; fix whichever side is wrong; test with a planted good and a planted bad row).

F-S130-TEST-SUITE-WRITES-GROUND-DOC-1 (AG-4, organ report): running the test suite rewrites the `measuredAt` stamp in `docs/ground/authority-conformance.latest.md`, dirtying the tree — the same class as F-S130-RESEAL-BREADCRUMB-ALWAYS-DIRTIES-1 (a generator that stamps run identity into a committed artefact). GATE_SURFACE excludes it, so landings are unaffected; owed: the stamp moves out of the committed doc or the doc out of the tree.

F-S130-AMBER-494-REDACTION-COMMENT-OVERSTATES-1 (scout, 14:26Z): the module's A1 comment says `redaction.ts` has "no RegExp anywhere — grepped, not assumed"; false in its letter (segmentsOf uses regex literals to segment KEYS), true in substance (no shape-based secret matcher, so layer two is necessary). The scout named WHY it matters: "grepped, not assumed" asserts a measurement with a blind spot — a grep for the constructor misses every literal — and its own first grep had the same blind spot. Repair: one comment sentence, next AG-4 card. Not blocking; recorded so the sentence does not survive as a false measurement claim.

F-S130-CI-COUNT-GROWS-AFTER-PUSH-1 (AG-4, sync report, corroborating its earlier finding): at the first read of a fresh head `total_count` was 4 (build and rule26 not yet registered), then 6. A lane that certifies a count before every context exists certifies nothing; the sync card ordered the count watched and the order held. Card class note: every CI order names the EXPECTED total_count and waits for it.

A-REC-S130-18 — the Architect's provenance card said the test file held "20 existing cases"; AG-4 measured 18, the scout counted 18 independently. A stale count carried from memory into a card — the F-S122-STALE-COUNT class, Architect instance. Mitigation that worked: two lanes measured it and said so.

A-REC-S130-19 — the Architect asked the owner "is AG-4 idle?" territory: for ~3 h the AG-4 window was silent while the owner's machine slept and then while AG-4 worked; the Architect at first had no sensor other than the bus. The owner's clone (`device_bash`, `git for-each-ref` on origin refs) proved a reliable lane-progress sensor — pushes appear there within a fetch. Recorded as method: silence on the bus is not idleness; read the wire.

F-S130-TRUNK-VERDICTS-OWED-1 (foreman, both landing reports): master runs four gates no PR exercises (`coverage`, `compat (20.x)`, `compat (22.x)`, `fence`). The trunk run at `5d916ad4…` was IN-PROGRESS four minutes after #493 landed and was never re-read; the trunk run at `824fb29d…` had not started when the #494 report was cut. NEITHER trunk verdict is in any report of this session. Owed: the next session's architect:open reads both trunk runs at the forty hex before any card is minted (S63-1 — merge is not proof).

F-S130-SHARED-CLONE-DIRTY-GROUND-DOC-2 (foreman, #493 and #494): the shared clone's `docs/ground/authority-conformance.latest.md` stayed modified across both landings; left alone by name (a stash would be a write into another window's tree). Same root as F-S130-TEST-SUITE-WRITES-GROUND-DOC-1; one fix closes both.

MEASURED, NOT A BUG: the foreman's card-consumed stamp (14:10:41Z) is LATER than its merge (14:06:38Z) for #493 — the foreman reads, lands, reports, then stamps. The stamp is an "I am done" marker, not an "I have started" marker; a poller reading consumed_at as a start signal would be wrong by minutes.

## WHAT IS ON THE BUS NOW (14:55Z)

Nothing unconsumed addressed to a lane. AG-5: idle, all four #494 rows stamped. AG-4: idle (worktrees wt-harden and wt-hprov retained pending RULE-49 merged-by-content measurement — both branches are now merged; the release is the next session's first AG-4 hygiene line). Scout: idle. The owner's queue item 2 is CLOSED: both hardening PRs landed.

## NEXT

Owner's queue item 3: CWF-S130-SESSION-CLOSE-v1 and CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v131 (§11), cut in this same turn from the measured state above. Next session's first jobs are enumerated in the bootstrap.

TAIL ANCHOR: S130-DISPATCH-RECORD-9 ends here.
