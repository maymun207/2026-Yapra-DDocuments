<!-- relay-audit: v1 kind=notice -->
# OWNER-APPROVAL-S130-MASTER-PUSH-PR-494-1 — named owner approval for the master push of PR #494 `phase/harden-provenance-export-1`, bound to its synced tip

Recorded by the Architect under S102 (every master push carries a NAMED owner spend approval). The owner's words: OWNER-RULING-S130-LAND-490-1 §2 — "2- (3)" = the hardening cards are the second item of the re-ordered queue, ruled 2026-09-05 ~09:2x TSİ — plus the standing session word "numara sorma, devam" for each master push's eval-canary cost (~110k; the canary is FROZEN, so the actual spend is the CI-DIET run already paid). This approval binds those words to ONE head, named below, and to nothing else.

## WHAT IS APPROVED

One `gh pr merge --auto --merge` of PR #494 by the foreman (lander AG-5) via `ADF_LANE_ROLE=AG-5 npm run land -- 494`, producing one merge commit on `master`. Content: the three provenance-export hardenings A1–A3 (SCOUT-REVIEW-PROVENANCE-EXPORT-1-v1) — two-layer redaction then bounding with every cut declared, `truncated` a required argument pinned at the type level, a payload-free trace wrapper — each with tests proven to fail at the parent, plus a real reseal (two tab digests moved), plus the trunk-sync merge of today's master (PR #493) that touched only the seal and was resolved by regeneration.

## BOUND HEAD

```evidence:head
PR #494 phase/harden-provenance-export-1, synced tip (merge of the two AG-4 commits with today's master; pushed 2026-09-05T14:20:49Z):
    cbcf2b9e48d3a8f4249fda6d4cd20492f9d9ec06
master it lands on (PR #493 merge):
    5d916ad418032daf2ec312d059c64c26738b79d1
```

If the PR head at landing time is any other hash, this approval does not cover it: the foreman STOPS and a new approval is written.

## BASIS (measured before this approval was written)

MEASURED: 2026-09-05T14:26:29Z SCOUT-REVIEW-HARDEN-PROVENANCE-EXPORT-1-v1: VERDICT AMBER — one finding, in a COMMENT, not in behaviour ("no RegExp anywhere in that file" is false in its letter: `redaction.ts` segments KEYS with regex literals; the argument that it has no shape-based secret matcher is sound; repair = one comment sentence, owed by name, next AG-4 card). The scout reviewed the synced tip in the `head` fence (ON-DISAGREEMENT entered and named: parents = the two-commit tip and today's master). ORDER A PASS (3 paths, 2 `AG-4:` subjects, the seal the only overlap with master's 12 paths). ORDER B: every A1/A2/A3 fix has a test that FAILS at the parent, measured at the parent by ls-tree and grep; the positive control is real; `@ts-expect-error` would turn `typecheck:api` red if `truncated` gained a default; the span attributes carry counts and names, no payload byte. Counts cross-checked: parent file 18 cases (card's "20" stale — A-REC-S130-18 confirmed from a second hand), 11 new, 29 total = AG-4's 29/29. ORDER C: no write sink; three credential-SHAPED literals are planted fixtures in the A1 test; reseal content-derived (two `mappedContentSha` moved). ORDER D: resolver AUTHOR-SUBJECT/AG-4, lander AG-5 PASS, AG-4 SELF-LAND.
MEASURED: 2026-09-05T13:59:14Z HARDEN-PROVENANCE-EXPORT-1-AG-4-report: CI at the pre-sync tip total_count 6, five success + eval-canary SKIPPED; that green DOES NOT CARRY to the synced tip (scout, ORDER D).
MEASURED: 2026-09-05T14:37Z Vercel (Architect read): the synced tip's branch deployment CANCELED by the ignored build step, `githubPrId` 494 — the push is on the wire.
UNMEASURED at writing: CI at the synced tip — the scout read it IN-PROGRESS at 14:26Z (build (24.x), rule26); the foreman's own ORDER B read at the forty hex is the referee; any context not success/skipped → this approval is not exercised.

## SCOPE

This approval covers PR #494 ALONE, at the head above. The trunk-sync merge commit is part of the approved head; it authored nothing. Product scope under OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1; nothing in the ADF machinery moves.

TAIL ANCHOR: OWNER-APPROVAL-S130-MASTER-PUSH-PR-494-1 ends here.
