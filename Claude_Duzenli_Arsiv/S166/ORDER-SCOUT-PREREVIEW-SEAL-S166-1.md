<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-PREREVIEW-SEAL-S166-1

LANE: scout-1 (the scout-1 window ONLY; scout-2 prints "NOT MINE: scout-1 order" and stops).
fanout: personalized (one lane, one body)
FROM: Architect, S166, 2026-09-30T19:20Z
PRIORITY AND DEVIATION, named: you hold ORDER-SCOUT-LAND-SD2-VECTORLANE-S166-1 (+ NOTICE-SCOUT1-LAND-AMEND-S166-1), and 651 cannot move until 650 lands and AG-1 re-seals (~15–20 min). Do this review IN THAT GAP. Practice 159 ("never a review and a landing at once") is set aside for this one order by the owner's 22:08 TSİ order ("kalıcı çözümü hemen implement edelim"); the LANDING wins the moment a re-sealed 651 head is green — pause the review, land, resume.
PRECONDITION: the card is "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S166/CARD-SEAL-NO-SHARED-LINES-S166-1.md" (project box: docs/CARD-SEAL-NO-SHARED-LINES-S166-1.md).
AUTHORITY: OWNER-APPROVAL-S166-PLAN-1 · owner order 22:08 TSİ · §12.1 (NEW subject → scout first). Your SCOUT-STATUS-LAND-SD2-VECTORLANE-S166-1 §3 diagnosis is the card's premise — thank you.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER — adversary pre-review of the CARD against the CODE (read-only)
1. Verify the PRECONDITION lines by quoting code (manifest fields, checkDocDrift FAIL path, reseal.ts, resealPaths, the COLLISION block, every consumer of lastSyncedCommit/mappedContentSha incl. shared/docIdentity.ts and any UI).
2. Hunt the traps: (a) does S1 keep RULE-20's PURPOSE (no mapped change merges without a diagram review) or open a hole — e.g. a PR that splits a change so the tab is touched only in a commit the diff misses, a renamed file, a merge commit from master bringing mapped changes (must NOT demand attestation for master's own changes: merge-base..HEAD vs the PR base)? (b) can build mode be abused to skip the check (is every PR guaranteed to run S1 in a required context — which job, which context name)? (c) does removing the fields break Vercel's build, docIdentity, nightly-compat, or any test? (d) does S5 hide a real conflict? (e) transition: open PRs 650/651/652 and SD1 carry manifest hash edits — what happens to each when this lands (conflict on deleted lines?), and what is the cheapest order? (f) is the FENCE complete (a file the card missed = FENCE-GREW later)? (g) is 60 min realistic?
3. Verdict: `ADVERSARY-VERDICT: GREEN|RED card=CARD-SEAL-NO-SHARED-LINES-S166-1` + every required amendment as an exact sentence the Architect can paste.
4. scout_reply (p_from 'scout-1') as SCOUT-STATUS-PREREVIEW-SEAL-S166-1; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S166/SCOUT-STATUS-PREREVIEW-SEAL-S166-1.md". Then back to the landing order.
BUDGET: ≤ 20 minutes of review time. A permission you cannot pass → write it in the reply and stop.
FORBIDDEN: no edit, commit, push, merge, dispatch, cron; never print an environment value.

END · ORDER-SCOUT-PREREVIEW-SEAL-S166-1
