<!-- relay-audit: v1 kind=card -->
# CARD-ARCHIVE-PUSH-S123-1 · v2 — push the archive, under a capability probe you run first

The session archive repository has commits that exist only on the owner's disk. **The Architect made
them and cannot push them:** the archive remote is HTTPS and the Architect's bridge shell has no
credential for `github.com`, which it proved by running the push and reading the refusal. That is a
MACHINE job with a credential attached, so it comes to a lane rather than to the owner — `PLATINUM`
and `S102-YASA-1` both point the same way.

**v1 WAS REFUSED BY THREE SCOUT READINGS AND THIS IS WHAT THEY DEMANDED.** All three returned RED,
none of them on the digests, and they converged on one remedy: **a card that depends on a capability
must probe for it first and must name the outcome where the probe says no.** v1 forbade four
workarounds by name, and a window measured a fifth that was already installed on the machine. v1 also
enumerated nine filenames as a guard, and a window reading the same HEAD saw none of them.

## REQUIRES — RUN THIS BEFORE ANYTHING ELSE, AND PRINT WHAT IT SAYS

This card needs exactly two capabilities. Probe both, print both readings, and only then read on.

```scope
- REACH · the archive working copy is visible to your shell. Probe: `git -C <path> rev-parse HEAD`. ABSENT if it errors or the path does not exist.
- CREDENTIAL · your shell already presents a credential for the archive remote, with NO setup step. Probe: `git -C <path> push --dry-run origin main`. ABSENT if it asks for a username, a password or a token.
```

**ABSENT IS A NAMED OUTCOME OF THIS CARD, NOT A FAILURE.** If either probe reads ABSENT, you have
finished this card correctly by printing the probe's own output and filing the report on the fallback
channel in ORDER D. You do not obtain, install, substitute or delegate a capability the probe says you
lack. Both readings are the deliverable either way.

## PREMISE

MEASURED: 2026-08-28T13:36Z and re-read at 13:52Z, in the owner's archive working copy at the path in the `where` fence, over the Architect's bridge shell. Branch `main`, upstream `origin/main`.
MEASURED: `git rev-list --left-right --count @{u}...HEAD` — the working copy is TWO commits ahead and ZERO behind. Both shas are in CLAIMS.
MEASURED: `git push --dry-run origin main` from the Architect's own shell returned `fatal: could not read Username for 'https://github.com': No such device or address`. The Architect's CREDENTIAL probe reads ABSENT; that is the whole reason this card exists.
UNMEASURED: whether YOUR shell reads either probe as present. Nothing in this card assumes either, and the REQUIRES block is where you find out.
DECAYS on the next commit to that working copy. The Architect is holding it frozen for exactly this reason and will make no commit there until this card closes. If HEAD is not the sha in CLAIMS, someone else moved it.
ON-DISAGREEMENT: if `git rev-parse HEAD` gives you a different sha, do NOT push. Print what you read, print `git log --oneline @{u}..HEAD`, and file on the fallback channel. A push of commits the card never named is a push nobody reviewed.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the archive working copy's HEAD is `c5cc031e655d89ad467b891f1683eed442a17778` and its upstream is at `3ce4ea1ad26cc17940083bbef038876b19d8014f` | MEASURED: git rev-parse HEAD and git rev-parse @{u}, in that working copy · MEASURED: a scout window read the same two shas independently in round 17 and they agreed | where |
| exactly two commits are unpushed, and they are the two named in the `commits` fence | MEASURED: git rev-list --left-right --count @{u}...HEAD returned 0 2 · MEASURED: git log --oneline @{u}..HEAD enumerated both, and a scout window reproduced both readings | commits |
| NOTHING IS STAGED AND NO TRACKED FILE IS MODIFIED — which is the only property of the working tree this card depends on | MEASURED: git diff --cached --name-only is empty · MEASURED: git status --porcelain shows no line whose first two characters are anything but `??` | invariant |
| the untracked count DISAGREES BETWEEN TWO READERS OF THE SAME HEAD, and the disagreement is unresolved | MEASURED: the Architect's bridge shell returns NINE `??` lines, under `-uall` and under both settings of core.precomposeunicode · MEASURED: a scout window reading the same HEAD reported ZERO and found those paths tracked since 2026-08-21 | invariant |
| whether your shell reads REACH and CREDENTIAL as present | NOT-READ | the REQUIRES block, and your printed readings are the deliverable whichever way they go |

```evidence:where
path  /Users/tunckahveci/Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra - DDocuments
      (in a bridge shell this is $HOME/mnt/2026 - Yapra - DDocuments)
remote origin  https://github.com/maymun207/2026-Yapra-DDocuments.git
branch main, upstream origin/main

the two files the newer commit adds, with the digests they must still have:
  Claude_Duzenli_Arsiv/S123/GO-LANDING-S123-2-v2.md     8241 bytes
  Claude_Duzenli_Arsiv/S123/SCOUT-CARD-REVIEW-16-v1.md 17915 bytes
Both were corroborated from the bus by two scout windows in round 17, without either of them
touching the owner's disk.
```

```evidence:commits
c5cc031e655d89ad467b891f1683eed442a17778  S123: the re-cut landing card (v2) and the confirm round
80dd82f498669ec846baacad7cf69e50285c7515  S123: A1 runtime floor measured, vendor call
```

```evidence:supersedes
This version supersedes CARD-ARCHIVE-PUSH-S123-1-v1 under S37-1. v1 is immutable and is not edited.
    v1, recovered form   sha1 510a062d591165c42245d8cba08fb50490149d5c over 8001 bytes
Every difference between v1 and this version, mapped to the reading that forced it. A hunk that
maps to nothing on this list is a silent edit and finding one is a RED:
    the REQUIRES block, new                 <- all three round-17 replies asked for a capability probe
    ORDER C rewritten as a positive rule    <- a window measured a fifth workaround already installed
    ORDER D, new, replacing the fanout line <- v1 named no channel for the REACH-ABSENT branch
    the refusal branch names a disposition  <- v1 left "write the report" ambiguous between file and commit
    the leave-alone fence becomes invariant <- two readers of the same HEAD returned different counts
    a CLAIMS row for that disagreement      <- it is recorded unresolved rather than averaged away
    a CLAIMS row for the staged/modified invariant <- that is the only tree property the push depends on
    two CLAIMS rows gain a second lens      <- a scout window reproduced the shas and the commit list
    the standfirst rewritten                <- it must say why v1 was refused
    this fence, new                         <- the mechanism adopted in round 18 applies to this card too
A CARD CANNOT CARRY THE DIGEST OF THE DIFF BETWEEN ITSELF AND ITS PREDECESSOR — that value does not
exist until the card is built. The diff digest belongs in the REVIEW card that carries this one.
```

```evidence:invariant
THE GUARD IS AN INVARIANT, NOT A LIST OF NAMES. v1 enumerated nine untracked filenames and told the
lane to match them "by path shape, not by byte". Three windows called that untestable and one of
them measured something sharper: reading the SAME HEAD, it saw ZERO untracked paths where the
Architect's shell sees nine.

Re-measured in the Architect's bridge shell at 2026-08-28T13:52Z, since that disagreement had to be
settled rather than waved at:
    git status --porcelain                                -> 9 lines, every one starting `??`
    git status --porcelain -uall                          -> 9
    git -c core.precomposeunicode=true  status --porcelain -> 9
    git -c core.precomposeunicode=false status --porcelain -> 9
    core.precomposeunicode is set to true in that copy
So the Architect's reading is stable and normalisation-independent WITHIN that shell, and the
disagreement between the two readers is NOT explained. It is recorded, unresolved.

IT DOES NOT BLOCK THE PUSH, AND HERE IS WHY: both readings agree on the only thing that matters —
nothing is STAGED and no tracked file is MODIFIED. Nine untracked and zero untracked are equally
safe for a push that stages nothing. So the guard is this, and you check it yourself:

    BEFORE:  git diff --cached --name-only  -> must be EMPTY
             git status --porcelain | grep -v '^??'  -> must be EMPTY
    AFTER:   the same two, still empty except for the one report path you staged by name

Print your own untracked count too, whatever it is. If it is neither nine nor zero, that is a third
reading and it is worth more to this factory than the push is.
```

## ORDER A — VERIFY, THEN PUSH, IN THAT ORDER

After the REQUIRES probes, read `git rev-parse HEAD` and `git log --oneline @{u}..HEAD` and compare
them to the `commits` fence. Run the BEFORE half of the `invariant` fence. Only if all three agree do
you run `git push origin main`.

**BEFORE THE PUSH YOU STAGE AND COMMIT NOTHING** — no `git add`, no commit, no rebase, no force, no
branch creation, no tag. The commits going up must be exactly the two the fence names, and a third
commit made before the push would make this card's own CLAIMS false for whatever card comes next.

## ORDER B — REPORT WHAT THE REMOTE SAYS, NOT THAT YOU RAN IT

Print the push's own output and then re-read the remote: `git ls-remote origin refs/heads/main`.
**The report is that second reading**, not the exit code — `S63-1`, a merge is not evidence, and
neither is a push. If the remote's `main` equals the HEAD sha in CLAIMS, say so with both shas.

## ORDER C — THE CREDENTIAL RULE, STATED POSITIVELY

**Push only with the credential your shell already presents for this remote, exactly as configured.**
Any step whose purpose is to obtain, install, substitute or delegate one is outside this card — that
includes installing a git credential helper, running a setup command for one, using a different tool
that carries its own auth store, adding a second remote, pushing from another clone, handing the job
to another window, and asking the owner. A window measured in round 17 that a credential for this
host is already present ON THIS MACHINE under a different tool; **that measurement is not permission
to reach for it.** If your CREDENTIAL probe reads ABSENT, the absence is the report.

## ORDER D — THE REPORT, AND THE CHANNEL THAT SURVIVES A NO

On SUCCESS: write `Claude_Duzenli_Arsiv/S123/ARCHIVE-PUSH-S123-1-AG4-report.md` in that working copy
AFTER the push has been made and read back, stage that ONE path by name, commit it with a message
naming this card, and push again. `git add -A` is forbidden throughout.

On CREDENTIAL ABSENT: write the same file, **leave it UNTRACKED, and commit nothing.** A local commit
here would leave the copy three commits ahead and break the next card's `commits` fence before it is
written. Say in the report that the remote was never reached.

On REACH ABSENT: you cannot write that file at all, so **report on the bus instead**, `from_lane`,
artifact name `ARCHIVE-PUSH-S123-1-AG4-report`, carrying the same two probe readings and the paths
your shell CAN see. v1 had no answer for this branch and a window named it: a card titled "tell me
whether you could" must have a channel that survives the case where the answer is no.

## FALSIFIER

This card is wrong if HEAD is not the sha in CLAIMS, or if the unpushed set is not exactly the two
commits in the `commits` fence, or if anything is staged or modified before you start. Test all three
before you touch the remote and report what you found.

Second arm: **a push reported by its own exit code is a push reported by nobody.** If your report does
not carry the `ls-remote` reading, the card is not done.

## SHARED SURFACES

One: the `main` branch of the archive remote. You touch no other file in that working copy, no file in
`cwf_yaprak`, no gate, no governed row, no migration, and no git configuration anywhere. This card
spends nothing — no CI run, no deployment, no model call beyond your own.

## DECISION RIGHTS

The owner ruled that the archive push is the Architect's to own rather than his. The Architect decides
that these two commits go up and is answerable for their content. **You decide nothing about the
content and everything about whether the world matches the card well enough to push** — and both
probe readings are yours to report whichever way they fall. A named refusal closes this card as
completely as a push does.

BODIES: `PLATINUM` · `S102-YASA-1` (no machine step reaches the owner) · `S63-1` · `TOTAL-45` ·
`empty ≠ zero` (two readers, two counts, one unresolved disagreement — recorded, not averaged).

fanout: personalized

```deliverables
branch: main
report: Claude_Duzenli_Arsiv/S123/ARCHIVE-PUSH-S123-1-AG4-report.md
```

TAIL ANCHOR: CARD-ARCHIVE-PUSH-S123-1-v2 ends here.
