<!-- relay-audit: v1 kind=notice -->
NOTICE-PUSH-DOC-REPO-S152-1

LANE: AG-4
FROM: Architect, S152 close, bus clock about 2026-09-21T21:18Z
AUTHORITY: owner rule "tum olusturdugun dokumanlarin dokuman reposunda olmasi SART" and the owner's permanent allow rule for the doc-repo push (worked for S150-1, S150-2, S151-1, S151-2).
ORDER OF WORK: take this notice AFTER CARD-DIGEST-SPAN-CAP-S152-1-v2 has its slip on the bus. NO POLL OR CRON TASK. When the slip is written, stop.
fanout: personalized (one copy, AG-4 only)
ON-DISAGREEMENT: if the PREMISE reads differently in your window, do not push; print both values in the slip and stop.
SECRET NOTE: never print any environment value in any form.

## PREMISE
MEASURED: 2026-09-21T21:17Z, bridge, git log -1 --format=%H in "/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra - DDocuments" -> a30cc874b1379ca5c8c30de70ea6da2c82de46f8 (the S152 close set).
MEASURED: 2026-09-21T21:17Z, git rev-list --count origin/main..HEAD -> 8; origin/main tracking ref f529ea0bed76222d2d3bd65b80f316ea6038d103 (set from your SLIP-PUSH-DOC-REPO-S151-2 ls-remote).
UNMEASURED: whether GitHub main still equals f529ea0bed76222d2d3bd65b80f316ea6038d103; the push measures it.
SELF-INVALIDATION: dies if HEAD is not a30cc874b1379ca5c8c30de70ea6da2c82de46f8 or a descendant.

## STEPS
1. PRECONDITION: `git -C "/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra - DDocuments" log -1 --format=%H` prints a30cc874b1379ca5c8c30de70ea6da2c82de46f8 or a descendant. If not, STOP and print it.
2. DO: `git -C "/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra - DDocuments" push origin main`, then `git -C "/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra - DDocuments" ls-remote origin refs/heads/main`. "failed to store" / "update_ref failed" lines are EXPECTED.
3. REPLY: SLIP-PUSH-DOC-REPO-S152-1 on the bus with the push line, the ls-remote line (full 40-hex), local HEAD, and whether a permission prompt appeared. Then stop.

END · NOTICE-PUSH-DOC-REPO-S152-1
