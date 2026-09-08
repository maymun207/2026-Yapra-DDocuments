<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-LAND-MA-HARDEN-1-S134-1 · v2 — land the MA-RERUN harden branch on master under a named owner approval, and STOP if CI does not exist at the head you land
lane: AG-5
report: docs/relay/LAND-MA-HARDEN-1-S134-1-AG5-report.md
fanout: personalized

AUTHORITY: `OWNER-APPROVAL-S134-MA-HARDEN-MERGE-1`, given 2026-09-08 in the owner's own words — "MA harden'ı master'a indirelim ve master'ı ilerletelim" — naming exactly ONE landing. It is SPENT by that firing. No second push may be taken under it, and a landing that STOPs is not re-run under it either.

THE ADVERSARY GATE IS LIFTED FOR THIS CARD, NAMED AND NOT SILENT, citing `OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1`. The judge is CI at the head, read by you, and the landing tool's own gate — not a scout's prose.

THE APPROVAL WAS GIVEN ON A PREMISE THAT NAMES ITS OWN GAP, AND YOU ARE THE ONLY LENS THAT CLOSES IT. The Architect CANNOT read CI on this repository (`F-S134-ARCHITECT-HOLDS-A-CREDENTIAL-IT-CANNOT-SPEND-1`) and told the owner so before he answered. Nothing here has been called green. If CI at the head is red, or if no run exists at it, you STOP, and the owner's word does not override that — this is the mechanical repair of `A-REC-S133-7`.

EVERY SHA THIS CARD ACTS ON IS COMPUTED BY YOU IN ORDER A AND NEVER COPIED OUT OF PROSE. The fences below are what you COMPARE against, not what you paste into a command.

IF `CARD-ARCHIVE-PUSH-S134-1-v1` IS IN YOUR BOX AHEAD OF THIS ROW, DO IT FIRST. Boxes are read by `created_at`, earliest first, and that card is minutes of work.

## PREMISE
- MEASURED: 2026-09-08T12:48Z over the bridge, in the owner's clone — the harden branch is TWO commits ahead of `origin/master` and ZERO behind it, and its whole diff against `origin/master` is `.github/workflows/ma-rerun.yml` plus `docs/relay/MA-RERUN-HARDEN-1-S133-1-AG4-report.md`. Both heads at full length are in the `branch` fence.
- MEASURED: 2026-09-08T12:54Z — AG-5's own tick read `master` FROM THE WIRE and reported the same value the bridge's remote-tracking ref carries, which is a second lens differing in what it assumes about the ref's freshness rather than only in mechanism.
- MEASURED: `git show origin/phase/ma-rerun-harden-1-s133-1:docs/relay/MA-RERUN-HARDEN-1-S133-1-AG4-report.md`, read 2026-09-08T12:50Z — AG-4 reports two CI runs at the branch's FIRST commit, `Build and Test` and `Relay corpus`, both success, and names `report-schema` as NOT TRIGGERED there because that commit changes no report. This is the AUTHOR'S testimony about a DIFFERENT head and it is NOT a verdict at the head you will land. Anchor `author-ci`.
- UNMEASURED, AND IT IS THIS CARD'S GATE: whether any CI run exists at the branch head, and what each concluded. The second commit ADDS a report, so `report-schema` is expected to have fired there and its absence is itself a finding. ORDER B reads it.
- UNMEASURED: the pull request's number. You COMPUTE it from the head branch; this card carries no remembered number, because a remembered number is how a landing lands the wrong thing.
- ON-DISAGREEMENT: if the master you read from the wire differs from the `branch` fence's master, STOP and print both — the approval named a landing onto that master. If the branch head differs from the fence, STOP: the thing the owner approved is not the thing in front of you. If the runs listing at the branch head answers `total_count: 0`, STOP and say CI NEVER RAN AT THIS HEAD. If any run concluded other than success or a NAMED skip, STOP and name it.
- DECAYS the moment `origin/master` moves, or when a v3 of this card appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the branch head, the master it lands onto, the distance between them, and the whole of the diff | MEASURED: `git rev-parse origin/master origin/phase/ma-rerun-harden-1-s133-1` over the bridge at 2026-09-08T12:48Z · MEASURED: `git log --format=%H origin/master..origin/phase/ma-rerun-harden-1-s133-1` and `git diff --stat origin/master...origin/phase/ma-rerun-harden-1-s133-1` at the same instant | branch |
| that master value read a second time by a lens differing in assumption | MEASURED: AG-5's own wire read at 2026-09-08T12:54Z, reported on its tick | branch |
| what the author says about CI at the branch's FIRST commit | MEASURED: `git show origin/phase/ma-rerun-harden-1-s133-1:docs/relay/MA-RERUN-HARDEN-1-S133-1-AG4-report.md` at 2026-09-08T12:50Z | author-ci |
| whether CI exists at the head being landed | NOT-READ | ORDER B |
| the pull request's number | NOT-READ | ORDER C |

```evidence:branch
origin/master                                = e25f7cd33b7a72d262f7e62c54299c55b17adb4d
origin/phase/ma-rerun-harden-1-s133-1        = 4771b6f719cd755767783c9d407d9f961f3b5a8f
commits ahead of master (full length, newest first):
  4771b6f719cd755767783c9d407d9f961f3b5a8f  AG-4: the report, and the trade stated rather than hidden
  62936f3e12e9edf2cc99365f11dbc3b5fc894aaf  AG-4: stderr leaves the upload, retention drops to a day, a counting step reports seams
commits behind master: none
 .github/workflows/ma-rerun.yml                    |  67 ++++++-
 docs/relay/MA-RERUN-HARDEN-1-S133-1-AG4-report.md | 217 ++++++++++++++++++++++
 2 files changed, 275 insertions(+), 9 deletions(-)
```

```evidence:author-ci
total_count: 2 at 62936f3e12e9edf2cc99365f11dbc3b5fc894aaf
  Build and Test   completed   success
  Relay corpus     completed   success
report-schema did not trigger at that head because the commit changes no report;
it fires on the report commit that follows.
```

## SCOPE
```scope
- ONE landing of phase/ma-rerun-harden-1-s133-1 onto master, through npm run land
- the pull request number COMPUTED from the head branch, never carried
- your report on a branch of your own, and its pull request left open
- no dispatch of ma-rerun.yml — the measurement is AG-4's card, not yours
- no second master push under this approval, whatever else is landable
- no change to the workflow file, the report, or anything else on the branch you land
- the documents repository is NOT touched by this card
```

## ORDER A — THE FLOOR, COMPUTED
1. Read your box by `created_at`, earliest first, and act on anything older than this row before this row.
2. `git fetch origin`. Print `git rev-parse origin/master` and `git rev-parse origin/phase/ma-rerun-harden-1-s133-1` at FULL forty-hex length, and `git ls-remote origin refs/heads/master` — the wire, not only the tracking ref. Compare all of it to the `branch` fence; a difference is ON-DISAGREEMENT. **Every later order uses the values you just printed, never the fence's text.**
3. Print `git log --format=%H origin/master..origin/phase/ma-rerun-harden-1-s133-1` and `git diff --name-only origin/master...origin/phase/ma-rerun-harden-1-s133-1`. Exactly two commits and exactly the two files the `branch` fence names. A third path is ON-DISAGREEMENT.

## ORDER B — CI AT THE HEAD YOU ARE LANDING, KEYED ON WHAT YOU COMPUTED
1. `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=$(git rev-parse origin/phase/ma-rerun-harden-1-s133-1)"` — the substitution is the point: the key is the FULL forty hex you computed, never a prefix you typed. Print `total_count` FIRST. Zero is a STOP and it means CI NEVER RAN AT THIS HEAD (S101-L1); a short sha would answer zero here too, which is byte-identical, and that is exactly why you do not type one.
2. Name EVERY run with its conclusion. Poll the same read until each reports one; do not dispatch and do not re-run (S55-1).
3. Name any workflow that did NOT trigger, and say so rather than counting it green (`F-S133-A-SUBSET-REPORTED-AS-THE-WHOLE-1`). `eval-canary` is FROZEN (`RULING-S121-CANARY-FROZEN-1`) and a skip there is named, not treated as failure. `report-schema` is EXPECTED at this head because the second commit adds a report; if it is absent, record it as a finding and STOP, because the head then carries a report no schema gate has read.
4. Print the commit statuses at that head as well, and name the Vercel one if present.

## ORDER C — THE LANDING
1. `gh pr list --state open --head phase/ma-rerun-harden-1-s133-1` — print the number you computed and the head sha the API reports for it. That sha must equal what you printed in ORDER A.2. If no open pull request exists, STOP and say so; this card does not open one.
2. `npm run land -- <that number>`. Print the landing record WHOLE, including its own CI read and its classification. The seam is `land.ts`'s AUTHOR-SUBJECT classification: the author is AG-4 and you are the lander, the shape that worked in S133, needing no report-only exception.
3. If `land` refuses for any reason, STOP and print its refusal verbatim. Do not merge by hand, do not `--admin`, do not force.

## ORDER D — THE PROOF THAT MASTER MOVED
1. `git fetch origin`, then `git ls-remote origin refs/heads/master` — print it. It must NOT equal what you printed in ORDER A.2 any more, and the new value at full forty-hex length is what you report as the new anchor. The landing tool's own output is not the evidence (S63-1); this read-back is.
2. `git cat-file -p origin/master:.github/workflows/ma-rerun.yml | grep -c 'clarify_lines='` and `git cat-file -p origin/master:.github/workflows/ma-rerun.yml | grep -n 'ma-rerun-stderr.log'` — prove the hardened workflow is the one on master now, and print both. The stderr name must not appear inside the upload step's `path:`.
3. Read CI at the NEW master head exactly as in ORDER B, keyed on `$(git rev-parse origin/master)`, and name every run with its conclusion.
4. Write `docs/relay/LAND-MA-HARDEN-1-S134-1-AG5-report.md` on a branch of your own, `auditText` locally `violations: 0`, push, open a pull request and LEAVE IT OPEN — this approval is spent and does not cover landing your own report.
5. Post one from_lane row if your channel can; if not, say MECHANISM-ABSENT and name the lenses (`F-S133-PRODUCER-HAS-NO-BUS-WRITE-PATH-1`).

## FALSIFIER
Wrong if the landing proceeded with `total_count: 0` at the head. Wrong if any CI read was keyed on a sha typed out of this card rather than computed. Wrong if a run was re-run or dispatched to make it green. Wrong if a workflow that did not trigger was counted as passing. Wrong if the pull request number was carried rather than computed. Wrong if the merge was done by hand, with `--admin`, or with force. Wrong if a second master push was taken under this approval. Wrong if master was reported as moved from the tool's output rather than from a read-back. Wrong if anything on the landed branch was edited. Wrong if the documents repository was touched. Wrong if your own report was landed on master.

## SHARED SURFACES
cwf_yaprak: ONE master push, plus one new branch carrying your report and an open pull request. CI: the gates that fire on the merge commit; nothing dispatched. Database: no governed write; your heartbeat and one bus row. Production behaviour: the web valve stays CLOSED and the MA workflow stays `workflow_dispatch` only — landing it changes no runtime path. Secrets: none read, none printed.

## DECISION RIGHTS
Yours: your report's wording and your own branch's name. Not yours: whether the landing happens — ORDER A and ORDER B settle that, a STOP is a lawful outcome reported rather than worked around, and the owner's approval does not overrule a red or absent CI read.

BODIES: OWNER-APPROVAL-S134-MA-HARDEN-MERGE-1 · CARD-MA-RERUN-HARDEN-1-S133-1-v1, the work being landed · MA-RERUN-HARDEN-1-S133-1-AG4-report · A-REC-S133-7 · F-S134-ARCHITECT-HOLDS-A-CREDENTIAL-IT-CANNOT-SPEND-1 · F-S133-A-SUBSET-REPORTED-AS-THE-WHOLE-1 · OWNER-RULING-S122-E1-E2-v1 with E1-AMENDMENT-1 · RULING-S121-CANARY-FROZEN-1 · S101-L1 · S55-1 · S63-1.

```deliverables
origin/master and the branch head at full forty-hex, read from the wire, compared to the fence
exactly two commits and exactly two files in the diff, printed
total_count at the branch head, printed FIRST, keyed on a computed sha, and every run named with its conclusion
every workflow that did NOT trigger, named rather than counted green
the pull request number COMPUTED from the head branch, with the head sha the API reports
the whole landing record from npm run land
the NEW master, read back from the wire at full forty-hex
the hardened workflow proven present on the new master by both greps
CI at the new master head, every run named with its conclusion
docs/relay/LAND-MA-HARDEN-1-S134-1-AG5-report.md on your own branch, pull request open and NOT merged
one from_lane row, or MECHANISM-ABSENT with the lenses named
```

TAIL ANCHOR: CARD-LAND-MA-HARDEN-1-S134-1-v2 ends here.
