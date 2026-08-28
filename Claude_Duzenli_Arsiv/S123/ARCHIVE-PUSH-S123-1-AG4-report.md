# ARCHIVE-PUSH-S123-1 · AG-4 report — both capabilities PRESENT, the push is DONE and read back, and ORDER D's FILE was refused by this lane's harness

RELAYED VERBATIM by the Architect from the bus row this lane wrote, because the lane's own harness
refused the file write. The text below is the lane's, unedited.

Answering `CARD-ARCHIVE-PUSH-S123-1-v3`. Read with `--read`, `[DIGEST-OK]` — the locally recomputed md5
matched the row's.

**READ THIS LINE FIRST SO THE CHANNEL IS NOT MISREAD.** This report arrives on the bus, which the card
reserves for the REACH-ABSENT branch. **REACH WAS NOT ABSENT.** Both probes read PRESENT and the push
SUCCEEDED. The bus is being used because the report FILE could not be written — a case the card did not
anticipate, explained in full below. Do not read this as the REACH-ABSENT branch.

## REQUIRES — the two probe readings, printed as the card demands

**REACH · PRESENT.** `git -C <path> rev-parse HEAD` returned a sha rather than an error, and it is the
sha CLAIMS names:

    c5cc031e655d89ad467b891f1683eed442a17778

**CREDENTIAL · PRESENT.** `git -C <path> push --dry-run origin main` reached the remote and asked for
nothing — no username, no password, no token, no prompt:

    To https://github.com/maymun207/2026-Yapra-DDocuments.git
       3ce4ea1..c5cc031  main -> main

That is the reading the Architect's bridge shell could not obtain. There the same command returned
`fatal: could not read Username for 'https://github.com'`; here it completed. That difference is the
entire reason this card was addressed to a lane, and the only reason the push was possible.

**ORDER C was never exercised.** No credential was obtained, installed, substituted or delegated: no
helper installed, no setup command, no second remote, no other clone, no other tool, no other window,
and the owner was not asked. The credential this shell already presents was used exactly as configured.
The card notes a credential for this host was measured in round 17 under a different tool on this
machine; that store was not reached for and nothing here depended on it.

## VERIFICATION — run before the remote was touched

| what the card demanded | what was read | verdict |
|---|---|---|
| `git rev-parse HEAD` equals the CLAIMS sha | `c5cc031e655d89ad467b891f1683eed442a17778` | MATCHES |
| upstream equals the CLAIMS sha | `3ce4ea1ad26cc17940083bbef038876b19d8014f` | MATCHES |
| exactly two commits unpushed, and they are the `commits` fence's two | `c5cc031` then `80dd82f` | MATCHES |
| `git rev-list --left-right --count @{u}...HEAD` | `0` behind, `2` ahead | MATCHES |
| BEFORE: `git diff --cached --name-only` empty | empty | PASSES |
| BEFORE: no status line other than `??` | the whole `status --porcelain` output was empty | PASSES |

All three FALSIFIER arms were tested before the remote was touched. None fired.

**A deviation in HOW one check ran, named rather than left silent.** The `invariant` fence specifies
`git status --porcelain | grep -v '^??'`. This lane's governing shell rule forbids pipes in a command,
so the bare `git status --porcelain` was run and its output inspected directly. That is stronger, not
weaker: the unpiped output was ENTIRELY EMPTY, so the filtered and unfiltered sets are both empty and
the pipe could not have hidden anything.

## THE UNTRACKED COUNT — ZERO, and it is not a third number

This shell reads ZERO untracked paths — one of the two readings the `invariant` fence already explains,
not a new finding. This is macOS; its git precomposes the NFD directory entries to NFC before comparing
against the NFC index, they match, and status is clean. The Architect's Linux bridge shell has no
precompose path and reports nine. Two readers, one HEAD, two counts, one measured cause. The card asked
for a THIRD number if one appeared; none did.

Both readings agree on the only property the push depends on: nothing staged, no tracked file modified.

## ORDER A — the push

    To https://github.com/maymun207/2026-Yapra-DDocuments.git
       3ce4ea1..c5cc031  main -> main

Nothing was staged, committed, rebased, forced, branched or tagged before it. The commits that went up
are exactly the two the fence names.

## ORDER B — the remote read back, which IS the report

    git ls-remote origin refs/heads/main
    c5cc031e655d89ad467b891f1683eed442a17778	refs/heads/main

Stated in full, as the card demands both shas:

    remote main   c5cc031e655d89ad467b891f1683eed442a17778
    CLAIMS HEAD   c5cc031e655d89ad467b891f1683eed442a17778

They are equal. The push's exit code is offered as evidence of nothing; this second reading is the
measurement, taken after the push rather than inferred from it. The AFTER half of the invariant was
re-read and is clean: nothing staged, no modified tracked file.

## ORDER D — THE FILE WAS REFUSED BY THIS LANE'S HARNESS, AND THE REFUSAL WAS NOT ROUTED AROUND

Writing `Claude_Duzenli_Arsiv/S123/ARCHIVE-PUSH-S123-1-AG4-report.md` into the archive working copy was
REFUSED by this window's permission classifier: that path lies outside the session's declared working
directories. The refusal is a MEASUREMENT and it is reported rather than defeated.

**No workaround was attempted.** Not a heredoc, not a shell redirect, not an `echo`, not a second tool.
This project's fence rule and the refusal's own terms agree, and the choice of whether to take a route
around a refused mechanism is exactly the decision that must not be made by the actor the refusal aims at.

**THIS IS A BRANCH THE CARD DOES NOT COVER, AND THAT GAP IS THE FINDING.** ORDER D routes to the bus only
on REACH ABSENT. Here REACH and CREDENTIAL both read PRESENT and the push succeeded — yet the report file
still could not be written, because the constraint lives in the LANE'S HARNESS rather than in the world
the probes measure. The card's own rationale is the reason this report is on the bus anyway: *a card
titled "tell me whether you could" must have a channel that survives the case where the answer is no.*
The answer to "could you write the file" is no.

A future re-cut may wish to make the report channel's fallback conditional on the WRITE failing, not on
REACH being absent — the two are separable, and this run separated them.

**Consequences, stated plainly so the next card's fences stay true:**

- The working copy is at `c5cc031e655d89ad467b891f1683eed442a17778` and the remote matches it. The copy
  is NOT ahead of its upstream.
- NOTHING was committed for this report, so the copy is not three commits ahead and the next card's
  `commits` fence is not broken by this lane.
- No report file exists in the working copy, tracked or untracked. Anyone looking for one on disk will
  not find it; this bus row is the report.

## STILL DARK

- **The two artifacts' byte-identity was NOT re-measured here.** The CLAIMS row asserting
  `GO-LANDING-S123-2-v2.md` (8241 bytes) and `SCOUT-CARD-REVIEW-16-v1.md` (17915 bytes) are byte-identical
  to what was preflighted and dispatched rests on the Architect's digests and two scout windows' bus
  reconciliation. This lane verified the commit shas carrying those files, not the files' digests. The
  falsifier did not ask for it and DECISION RIGHTS place content with the Architect — named here so this
  report is not read as having confirmed it.
- **Whether the Architect's nine-untracked reading still holds** after this push is unmeasured from here.
  Nothing in the push touched those paths, so no change is expected, but an expectation is not a reading.

## SHARED SURFACES — what was touched

The `main` branch of the archive remote, and nothing else. No other file in that working copy — the one
file ORDER D names was refused and therefore never created. No file in `cwf_yaprak`, no gate, no governed
row, no migration, and no git configuration anywhere, not even a one-shot environment override on the
probe: it was run plain so its own words would be the reading. No CI run, no deployment, no model call
beyond this window's own.

TAIL: ARCHIVE-PUSH-S123-1-AG4-report ends here.
