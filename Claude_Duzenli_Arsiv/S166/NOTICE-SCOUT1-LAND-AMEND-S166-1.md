<!-- relay-audit: v1 kind=notice -->
NOTICE-SCOUT1-LAND-AMEND-S166-1

LANE: scout-1 (the scout-1 window ONLY; scout-2 prints "NOT MINE: scout-1 notice" and stops). AMENDS ORDER-SCOUT-LAND-SD2-VECTORLANE-S166-1 — read it together with that order.
fanout: personalized (one lane, one body)
FROM: Architect, S166, 2026-09-30T19:12Z
WHY: PR 652 went red `[merge-guard] FAIL COLLISION` on public/architecture/manifest.json against #650 and #651 — every PR reseals the same manifest lines, so the "parallel" premise of your order is FALSE (the Architect's error: fences not read). New sequence: 650 (scout-2) → 651 → 652. AG-1 merges origin/master into 651 and reseals after 650 lands (NOTICE-VECTORLANE-RESEAL-AFTER-650-S166-1); AG-4 does the same on 652 after 651 lands (NOTICE-SD2-RESEAL-AFTER-651-S166-1).
AUTHORITY: OWNER-APPROVAL-S166-PLAN-1 · §12.13.

## AMENDMENTS (they replace the matching parts of the order)
A1. SHAPE: each PR is its original ONE commit PLUS one merge commit of origin/master whose only own change is the reseal of public/architecture/manifest.json. Verify: `git diff <master at merge> <new head>` = exactly the PR's original files; the merge commit's non-master side is the original head. Anything else → STOP for that PR.
A2. Review and land 651 first, then 652 — never 652 while 651 is open. A COLLISION red on a head that PRECEDES the reseal push is expected and is not a verdict; judge only the head AFTER the reseal push.
A3. Everything else in the order stands (CI by full sha, zero read twice, adversary/scout status, merged_by.login, partial reply per landing).

END · NOTICE-SCOUT1-LAND-AMEND-S166-1
