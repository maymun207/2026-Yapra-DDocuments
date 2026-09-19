# F-S142-A-SECOND-CLONE-IN-THE-LANE-FOLDER-IS-TWO-MONTHS-STALE-1

Status: OPEN. Filed in S142, measured 2026-09-18 between 01:59Z and 02:01Z, at the opening of the
session, BEFORE any card was cut - which is where it belongs (section 11: the Architect's first
measurement at open).

## THE MEASUREMENT

`~/cwf-branches` holds seven directories. All seven contain a `.git` entry, so a reader glancing at the
folder sees seven repositories. They are not seven repositories.

SIX are WORKTREES of the real clone and their `.git` files point at
`Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra -  Codes/cwf_yaprak/.git/worktrees/<name>` (note the
DOUBLE space in `Yapra -  Codes`). With the parent repository not mounted, every git command in them
fails with `fatal: not a git repository`. They answer nothing at all - which is honest.

THE SEVENTH, `cwf-yaprak-AGB`, is a FULL clone and it answers. It answers WRONG:

    origin/master                    dfb787830105f82e2157f5a8fdd3e5afea98dbf7
    its commit date                  2026-07-16T12:58:08+03:00
    refs/remotes/origin/master mtime 2026-07-16 09:59:30Z
    .git/FETCH_HEAD mtime            2026-07-16 09:57:55Z
    the S142 anchor object           ABSENT - `merge-base --is-ancestor <anchor> origin/master` -> NO,
                                     and the range `<anchor>..origin/master` is refused as
                                     "Not a valid commit name"

Two months stale, and the anchor commit is not even present as an object.

## WHY IT IS A FINDING AND NOT A TIDYING NOTE

The folder is NAMED for the lanes, so `~/cwf-branches` is the natural thing for an Architect to mount and
read when it wants "the shared clone". Doing that yields a July master WITH NO SIGNAL THAT ANYTHING IS
WRONG: the ref resolves, the log prints, the dates look like dates. This is
F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1 with a two-month lag and a second substrate - a
number carried from one carrier to another without being re-derived, except here the carrier is a git
ref and the number is a forty-hex head.

It is also the mirror of the bootstrap's own liveness rule (section 6): an UNMOVED remote-tracking ref is
byte-identical to "nobody fetched". This clone shows the sharper version - a ref can be not merely
unmoved but MOVED TO SOMEWHERE ELSE ENTIRELY, and still resolve cleanly.

## THE DISCRIMINATOR, ONE COMMAND

Whether a clone is the shared clone is settled by the presence of the anchor OBJECT, not by its
`origin/master` value and not by its folder name:

    git -C <clone> cat-file -e <forty-hex anchor>

The real clone at `Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra -  Codes/cwf_yaprak` passes it, and its
`origin/master` equals the bootstrap's anchor `dcba9fe49a3dae0d4b058ec8f94d21d41cbaee49` exactly, last
fetched by a lane at 2026-09-17T21:53:10Z. Note what that freshness does NOT prove: nothing after the
anchor in that ref is byte-identical to "no lane has fetched since 21:53:10Z". The scout's independent
`git ls-remote` is what settled that master had not moved.

## WHAT WOULD CLOSE IT

Either retire `~/cwf-branches/cwf-yaprak-AGB`, or re-point it and let a lane fetch it, or name it in the
boot as NOT the shared clone. Any of the three; a warning label on a wrong thing is not a repair
(S61-2).

OWNER ACTION: none required. If the owner knows why that clone exists, saying so is faster than any
measurement - the clone is his machine's, not the factory's.

## OWNER CONTRIBUTION AND THE MEASUREMENT IT FORCED (S112-YASA-1, section 12.14)

The owner answered, in his own words: `1-) sordugun folde su path de exists-> /Users/tunckahveci/cwf-branches/cwf-yaprak-AGB`.
Recorded by name as a design/context contribution. It also corrected the Architect's question: existence
was never in doubt - the Architect had read that exact clone - so the open question was whether the clone
is still IN USE. Measured at 2026-09-18T02:25Z:

    origin                    https://github.com/maymun207/cwf_yaprak.git (the right repository)
    HEAD                      dfb787830105f82e2157f5a8fdd3e5afea98dbf7, branch master, working tree CLEAN
    HEAD reflog, last entry   2026-07-16 12:58:08 +0300 - nothing has moved HEAD in two months
    .git/objects, .git/config last written 2026-07-16 09:58
    newest non-.git files     2026-09-08 09:09, and every one of them a .DS_Store - Finder browsing the
                              folder, not a lane working in it

VERDICT: the clone is ABANDONED, not live. NO LANE IS WORKING FROM A TWO-MONTH-OLD MASTER, which was the
serious reading and it is now falsified. The residual risk is narrower and unchanged: the clone ANSWERS
when asked, with no signal that its answer is two months old.

ONE HONEST CORRECTION, because the opposite would have been a fabricated signal: `.git/index` carried an
mtime of 2026-09-18 02:25, two minutes before this measurement, which reads exactly like a lane touching
the repository. It was not a lane. It was THIS ARCHITECT'S OWN `git status --porcelain` refreshing the
index while measuring. An instrument that writes to the thing it measures must subtract its own
footprint before reporting movement - the same discipline as section 12.11's rule that liveness is read
from OUTPUT, applied to the measurer instead of the measured.
