<!-- relay-audit: v1 kind=notice -->
NOTICE-PUSH-DOC-REPO-S150-1

LANE: AG-4
FROM: Architect, S150, 2026-09-21T16:55Z
AUTHORITY: owner rule "tum olusturdugun dokumanlarin dokuman reposunda olmasi SART" and the owner's PERMANENT Bash allow rule for the doc-repo push, which the owner is updating to the repo's CURRENT path (see STEP 2). Supersedes NOTICE-PUSH-DOC-REPO-S149-2, which your SLIP-PUSH-DOC-REPO-S149-2 (bus 2026-09-21T16:43:55Z) correctly refused: the path it named is now an empty directory. Your refusal was right and is recorded as the finding F-S150-DOC-REPO-PATH-MOVED-1.
NO POLL OR CRON TASK. This is the only notice for this window; when its slip is written, stop.
fanout: personalized (one copy, AG-4 only)
ON-DISAGREEMENT: if any PREMISE line reads differently in your window, do not push; print both values in the slip and stop.
GATE-NOTE: written with a STEPS section (relay_adversary_gate refuses ORDERS in a notice, measured 2026-09-21T05:00Z).
SECRET NOTE: your slip reports that printenv put CWF_LANE_DATABASE_URL into your transcript. Do not print any environment value again in any form; presence checks use npm run env:presence. The owner rotates the cwf_lane password on the Architect's report; nothing in this notice touches that.

## PREMISE
MEASURED: 2026-09-21T16:50Z, from the bridge, the doc repo lives at "/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra - DDocuments" (a space on BOTH sides of the dash before YAPRA); the old path "/Users/tunckahveci/Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra - DDocuments" is an empty directory, as your slip measured
MEASURED: 2026-09-21T16:50Z, git rev-parse HEAD in the doc repo -> 8976c685a585a51e9f0812af1727e09d4604fda0 (S150 open commit; matches the head your slip printed under other-value)
MEASURED: 2026-09-21T16:50Z, git rev-parse origin/main in the doc repo -> ab34e705203c7f84bed7202038bddb9b9e5cb826 (tracking ref; equals the ls-remote line in your slip)
MEASURED: 2026-09-21T16:50Z, git rev-list --left-right --count origin/main...HEAD -> 0 behind, 5 ahead (A24 v1_2, A24 v1_3, S149 close set, S149-2 notice commit, S150 open commit)
UNMEASURED: whether origin/main on GitHub still equals ab34e705203c7f84bed7202038bddb9b9e5cb826 at push time; the push measures it.
SELF-INVALIDATION: dies if HEAD is no longer 8976c685a585a51e9f0812af1727e09d4604fda0 or a descendant of it, or if the repo is not at the path named above.

## STEPS
1. PRECONDITION: `git -C "/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra - DDocuments" log -1 --format=%H` prints 8976c685a585a51e9f0812af1727e09d4604fda0 or a descendant. If not, STOP and print it.
2. DO: `git -C "/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra - DDocuments" push origin main`, then `git -C "/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra - DDocuments" ls-remote origin refs/heads/main`. If the permission prompt appears because the owner's allow rule still names the old path, WAIT for the owner's answer in your window; do not route around it and do not try another spelling of the path. Declare github.com to the sandbox proxy first if the first attempt is refused (as in your S149-1 slip). "failed to store" and "update_ref failed" lines are EXPECTED; the Architect sets the tracking ref.
3. REPLY: SLIP-PUSH-DOC-REPO-S150-1 on the bus with the push line, the ls-remote line (full 40-hex), local HEAD, and one line saying whether the permission prompt appeared and how it was answered (yes/no). Then stop.

END · NOTICE-PUSH-DOC-REPO-S150-1
