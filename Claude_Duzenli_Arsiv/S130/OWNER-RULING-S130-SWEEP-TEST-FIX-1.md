<!-- relay-audit: v1 kind=notice -->
# OWNER-RULING-S130-SWEEP-TEST-FIX-1 — the two assertions that pin the stale provenance wording are updated in a second commit on the re-authored branch

Owner's words, verbatim (2026-09-05 ~07:1x TSİ / 04:1xZ): "ag4 e istedigin blogu verdim. + 123 branchi nasil temizleriz ne onerirsin?" — the first clause answers the Architect's ⚡ that offered the single path and the word `test-fix onay`; the owner delivered the approval block toward AG-4 and confirmed it here. Recorded by the Architect; the executing card is CARD-TEST-FIX-STALE-FACT-SWEEP-2-v1 (AG-4).

## THE FACT RULED ON

MEASURED (AG-4 report REAUTHOR-STALE-FACT-SWEEP-2-AG-4-report 03:49Z; scout SCOUT-REVIEW-STALE-FACT-SWEEP-2-v1 03:51Z — two lanes, same bytes): `build (24.x)` FAILED at PR #492's head on exactly one test, `api/cwf/__tests__/learningSnapshotMigration.test.ts` lines 401–402, which read `shared/dbConstants.ts` and `shared/grantPolicy.ts` off disk and pin the literal `AUTHORED, Operator-pending` — the wording the sweep corrects. Line 90 of the same file asserts the opposite for the migration SQL (`not.toContain('AUTHORED, Operator-pending')`, under F-S100-MIGRATION-STATUS-LIES). The red is inherited: the source branch `phase/stale-fact-sweep-1` never had a green build (last real run FAILURE 2026-08-27, first CANCELLED, tip never built). The re-authored content is byte-identical to the source (four blob shas equal). Finding: F-S130-SWEEP-ASSERTION-PINS-THE-STALE-FACT-1 (AG-4) = F-S130-SWEEP-PINS-STALE-COMMENT-1 (scout).

## THE RULING

1. AG-4 adds ONE more commit to `phase/stale-fact-sweep-2`, token `AG-4:`, changing only the two assertions (and the block title that names them) so they pin the corrected wording as it stands in the two files at the head; the regexes are built from the files, not from memory.
2. The sweep's own lines are NOT reverted to the stale wording (the rejected path).
3. Local proof before push: the test file green, including line 90; both ground gates green.
4. The chain then resumes: CI at the new head → scout re-review at the new head → landing card to the foreman → master push under the standing "numara sorma, devam" word.

## RECORDED BESIDE IT

A-REC-S130-14 — the Architect's re-author card asserted "the content is GREEN" from the scout's comments-only reading and read AG-1's subject clause "one assertion reddened on purpose" as prose; the scout read it the same way. Neither carried a lens for tests that assert on comment TEXT, and the source branch had never been built, so no read of it could have supplied one. Named by both lanes; the Architect's premise was wrong and the lanes' STOP was right.

```evidence:head
PR #492 head at ruling time (build RED):
    c11b46252db5b78621ea74cbc7e73a398043d02e
```

TAIL ANCHOR: OWNER-RULING-S130-SWEEP-TEST-FIX-1 ends here.
