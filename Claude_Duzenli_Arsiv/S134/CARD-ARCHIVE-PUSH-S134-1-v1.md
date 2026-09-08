<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ARCHIVE-PUSH-S134-1 · v1 — commit the archive that was never in git, then fast-forward it, and MEASURE your own reach into that tree before either
lane: AG-5
report: bus row ARCHIVE-PUSH-S134-1-AG5-report (no repository file — this card opens no branch and no pull request)
fanout: personalized

THIS CARD SUPERSEDES `CARD-ARCHIVE-PUSH-S133-1-v1`, WHICH WAS STRUCTURALLY INCAPABLE OF CLOSING THE DEBT IT WAS WRITTEN FOR. Its ORDER A.4 reads "Untracked files under `Claude_Duzenli_Arsiv/` are EXPECTED here and are NOT yours to add" — so even had its RELEASE row ever been issued, it would have pushed the commits and left fifty S133 artefacts on disk, in no git object, forever. It also never received that RELEASE row and produced nothing. Both defects are repaired here.

THE ADVERSARY GATE IS LIFTED FOR THIS CARD, NAMED AND NOT SILENT, citing `OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1`. The measured reason: the predecessor card was gated on a `RELEASE-ARCHIVE-PUSH-S133-1` row that was never issued, and a gate whose release never arrives is the loop that ruling stops wherever it is seen. The judge here is not a scout's prose but the read-back in ORDER D: a remote ref that equals the head you printed, or nothing.

NOTHING IN `cwf_yaprak` IS TOUCHED. No branch, no commit, no pull request, no master push, no spend approval.

## PREMISE
- MEASURED: 2026-09-08T12:42Z over the bridge, documents repository at `/Users/tunckahveci/Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra - DDocuments`, branch `main` — `git rev-parse origin/main` equals the `arch-origin` fence below, which is the SAME value the predecessor card fenced at 04:05Z: the remote has not moved in eight hours. Anchor `arch-origin`.
- MEASURED: 2026-09-08T12:42Z over the bridge — `git rev-list --left-right --count origin/main...HEAD` printed zero behind and thirty ahead; `git status --porcelain -uall` counted sixty untracked paths and zero modified or staged. Anchor `debt`.
- MEASURED: 2026-09-08T12:44Z over the bridge — of those sixty, fifty lie under `Claude_Duzenli_Arsiv/S133/`, one under `Claude_Duzenli_Arsiv/S134/`, and nine under `Claude_Duzenli_Arsiv/Projeler/`. `Claude_Duzenli_Arsiv/S133/` holds seventy-one files on disk of which twenty-one are already tracked, so that directory is PARTIALLY tracked and no reading may treat it as wholly absent. Anchor `debt`.
- UNMEASURED, AND IT IS THIS CARD'S FIRST ORDER RATHER THAN AN ASSUMPTION: whether your shell can reach the documents tree at all. Your working copy is `cwf_yaprak`; `2026 - Yapra - DDocuments` is a different tree and the predecessor card assumed the reach without ever testing it (`A-REC-S133-4`). ORDER A settles it and a STOP there is a lawful outcome.
- UNMEASURED: whether `origin/main` moved since 12:42Z. The bridge has no GitHub credential (`F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1`); your window has one. ORDER B reads it.
- ON-DISAGREEMENT: if `git ls-remote origin refs/heads/main` differs from the `arch-origin` fence, someone else pushed — STOP, print both values, post the report, push nothing. If `origin/main` is not an ancestor of local `main`, STOP: this card authorises a FAST-FORWARD and nothing else. If any path in `origin/main..main` lies outside `Claude_Duzenli_Arsiv/`, STOP and print every such path.
- DECAYS the moment `origin/main` of the documents repository moves, or when a v2 of this card appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the remote this push must fast-forward FROM | MEASURED: `git rev-parse origin/main` over the bridge at 2026-09-08T12:42Z · MEASURED: the same value read as the predecessor card's own fence at 04:05Z | arch-origin |
| the size and shape of the debt | MEASURED: `git rev-list --left-right --count origin/main...HEAD` · MEASURED: `git status --porcelain -uall` counted by prefix, and `git ls-files` against `ls` for the S133 directory | debt |
| whether your shell reaches the documents tree | NOT-READ | ORDER A |
| whether the remote moved since 12:42Z | NOT-READ | ORDER B |

```evidence:arch-origin
460caf075c5fbc65a7c0d150e97511a2a985bc93
```

```evidence:debt
$ git rev-list --left-right --count origin/main...HEAD
0	30
$ git status --porcelain -uall | grep -c '^??'
60
$ git status --porcelain -uall | grep -vc '^??'
0
untracked by prefix: Claude_Duzenli_Arsiv/S133 = 50 · Claude_Duzenli_Arsiv/S134 = 1 · Claude_Duzenli_Arsiv/Projeler = 9
$ ls Claude_Duzenli_Arsiv/S133 | wc -l   -> 71
$ git ls-files Claude_Duzenli_Arsiv/S133 | wc -l -> 21
```

## SCOPE
```scope
- documents repository ONLY, branch main
- ONE commit adding ONLY the untracked files under Claude_Duzenli_Arsiv/S133/ and Claude_Duzenli_Arsiv/S134/
- the nine untracked paths under Claude_Duzenli_Arsiv/Projeler/ are NAMED in the report and LEFT EXACTLY WHERE THEY ARE
- ONE fast-forward push to origin. No amend, no rebase, no force, no lease, no branch, no tag, no delete
- cwf_yaprak: NOT TOUCHED. No branch, no commit, no pull request, no report file
- bus: one from_lane row if your channel can carry it; otherwise MECHANISM-ABSENT named
- no dispatch, no spend, no database write beyond your heartbeat and that row
```

## ORDER A — YOUR REACH, MEASURED BEFORE ANYTHING IS WRITTEN
1. `ls -d "/Users/tunckahveci/Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra - DDocuments/.git"` and `git -C "<that repository>" rev-parse --is-inside-work-tree` — print both. If either fails, STOP and post the report saying the foreman's shell does not reach the documents tree. That STOP is a real answer to a question this house has carried unmeasured since S133 and it closes `A-REC-S133-4`'s open assumption either way.
2. Print `git -C "<that repository>" rev-parse HEAD` and `git -C "<that repository>" rev-parse origin/main` at full forty-hex length. Every later step names these.

## ORDER B — THE WIRE, AND THE FENCE
1. `git -C "<that repository>" ls-remote origin refs/heads/main` — print it. It must equal the `arch-origin` fence, else ON-DISAGREEMENT.
2. `git -C "<that repository>" merge-base --is-ancestor origin/main HEAD` — print the exit status read UNPIPED. Non-zero is ON-DISAGREEMENT.
3. `git -C "<that repository>" diff --name-only origin/main..main` — print it WHOLE, and print separately the result of filtering it for paths not beginning `Claude_Duzenli_Arsiv/`. That filtered list must be empty.

## ORDER C — THE COMMIT THE PREDECESSOR FORBADE
1. `git -C "<that repository>" status --porcelain -uall` — print it WHOLE before you add anything, and print the count of untracked paths under each of the three prefixes separately. Re-derive those three numbers from your own reading; do NOT carry this card's figures into your report as if you had measured them (`F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1`, and this card's own numbers are claims).
2. `git -C "<that repository>" add -- Claude_Duzenli_Arsiv/S133 Claude_Duzenli_Arsiv/S134` and nothing else. Then `git -C "<that repository>" status --porcelain -uall` again: print it, and prove that every remaining untracked path lies under `Claude_Duzenli_Arsiv/Projeler/`. Any other survivor is ON-DISAGREEMENT — STOP with the staged change unpushed and name it.
3. `git -C "<that repository>" diff --cached --name-only | wc -l` — print the number, and print the list. It must equal the count of untracked paths you read under those two prefixes in C.1. A disagreement is a STOP, not a rounding.
4. Commit with a message naming what it carries and why it was absent: that these files were written to disk across sessions and never entered git, so a future session would have guessed facts it could have read. Print the commit's full forty-hex sha.

## ORDER D — THE PUSH, AND THE ONLY EVIDENCE THIS CARD ACCEPTS
1. `git -C "<that repository>" push origin main`.
2. `git -C "<that repository>" ls-remote origin refs/heads/main` again — it must equal the HEAD you created in ORDER C.4. The push's own output is NOT the evidence (S63-1); this second read-back is.
3. Post ONE from_lane row `ARCHIVE-PUSH-S134-1-AG5-report` carrying, in order: the ORDER A reach reads, the two revs, the wire fence read, the ancestor exit status, the whole file list and the empty filtered list, both `status --porcelain -uall` prints, the staged count and list, the commit sha, and the final read-back. If your channel cannot post, say MECHANISM-ABSENT and name the lenses — `F-S133-PRODUCER-HAS-NO-BUS-WRITE-PATH-1` is known. Print `read relay_inbox at <ISO>, box empty` or the rows you found.

## FALSIFIER
Wrong if any file in `cwf_yaprak` is written. Wrong if a pull request is opened anywhere. Wrong if the push is not a fast-forward. Wrong if `--force` or a lease appears. Wrong if any commit is amended, rebased or reverted. Wrong if a path outside `Claude_Duzenli_Arsiv/` enters the pushed range. Wrong if anything under `Claude_Duzenli_Arsiv/Projeler/` is added, committed, moved or deleted. Wrong if any file is deleted at all. Wrong if the push is reported from its own output rather than from the read-back. Wrong if the staged count and the untracked count disagree and the commit was made anyway. Wrong if this card's own figures are reported as the lane's measurements.

## SHARED SURFACES
Documents repository: one commit and one fast-forward push to `main`. cwf_yaprak: untouched. Bus: one row. CI: nothing dispatched. Production behaviour: UNCHANGED. Secrets: none read, none printed.

## DECISION RIGHTS
Yours: the commit message's wording. Not yours: whether the push happens — ORDER A, B and C's measurements settle that, and a STOP is a lawful outcome reported rather than worked around.

BODIES: CARD-ARCHIVE-PUSH-S133-1-v1, superseded · A-REC-S133-4 · F-S132-ARCHIVE-PUSH-FENCES-TIP-1 · F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1 · F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1 · OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1 · S63-1 · TOTAL-45.

```deliverables
the ORDER A reach reads, or the STOP that says the foreman's shell does not reach the documents tree
HEAD and origin/main at full forty-hex length
the wire ls-remote equal to the arch-origin fence
the ancestor exit status, read unpiped
the whole origin/main..main file list and the empty out-of-prefix filtered list
git status --porcelain -uall printed before and after the add, with the three prefix counts re-derived by you
the staged file list and its count, equal to the untracked count under the two added prefixes
the commit sha at full forty-hex length
the push read back by a SECOND ls-remote equal to that head
one bus row, or MECHANISM-ABSENT with the lenses named
```

TAIL ANCHOR: CARD-ARCHIVE-PUSH-S134-1-v1 ends here.
