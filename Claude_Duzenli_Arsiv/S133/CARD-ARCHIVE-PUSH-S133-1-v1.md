<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ARCHIVE-PUSH-S133-1 · v1 — push the documents repository's `main` to origin, fenced by ANCESTRY and PATH rather than by a tip the Architect keeps moving; bus row only, cwf_yaprak untouched
lane: AG-5
report: bus row ARCHIVE-PUSH-S133-1-AG5-report (no repository file — this card opens no branch and no pull request)
fanout: personalized

The archive repository `maymun207/2026-Yapra-DDocuments` carries every session artefact this factory has minted, and its local `main` has been ahead of `origin/main` since the S132 close. An artefact that never reaches the remote is a fact the next session will guess instead of read — the owner's standing reason for the archive, in his own terms. This card pushes it. `F-S132-ARCHIVE-PUSH-FENCES-TIP-1` is why the fences below are the ANCESTOR and the PATH PREFIX and never the tip: the Architect keeps committing to that repository while a card is in flight, so a tip fence expires by the Architect's own hand and STOPs a lawful push. The count is therefore MEASURED by you at run time and reported, never fenced. This card is released only by a `RELEASE-ARCHIVE-PUSH-S133-1` row naming v1; absent, the gate stands and you stop there — and keep your tick loop running while held: the gate is a wait state, not a terminal state.

## PREMISE
- MEASURED: 2026-09-08T04:05Z over the bridge, documents repository at `/Users/tunckahveci/Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra - DDocuments`, branch `main` — `git rev-parse origin/main` equals the `arch-origin` fence; `git rev-list --count origin/main..main` printed nineteen; `git diff --name-only origin/main..main` filtered for paths NOT under `Claude_Duzenli_Arsiv/` returned the empty set, and the two top directories touched are `Claude_Duzenli_Arsiv/S132` and `Claude_Duzenli_Arsiv/S133`.
- MEASURED: 2026-09-08T03:59Z over the bridge — the Architect's own S133 commit landed on that local `main`, and four S133 card files under `Claude_Duzenli_Arsiv/S133/` carry sha256 values equal to their bus rows.
- UNMEASURED: whether `origin/main` moved since the read above — the bridge has NO network and no GitHub credential (`F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1`, measured this session: `git fetch` answers `could not read Username for 'https://github.com'`). ORDER A reads it from your window, which does have one.
- UNMEASURED: whether the local `main` tip has moved past the Architect's S133 commit by the time you run — expected and lawful; you MEASURE it, you do not compare it to a fence.
- ON-DISAGREEMENT: if `git ls-remote origin refs/heads/main` differs from the `arch-origin` fence, someone else pushed — STOP, print both values, post the report, push nothing. If any path in `origin/main..main` lies outside `Claude_Duzenli_Arsiv/`, STOP and print every such path. If `origin/main` is not an ancestor of local `main`, STOP — this card authorises a FAST-FORWARD and nothing else.
- DECAYS the moment `origin/main` of the documents repository moves.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the remote the push must fast-forward FROM | MEASURED: git rev-parse origin/main over the bridge at 2026-09-08T04:05Z | arch-origin |
| the local tip, the commit count, and the file list | NOT-READ | measured by you in ORDER A and printed, never fenced |
| whether the remote moved since 04:05Z | NOT-READ | ORDER A.1 — the bridge has no network |

```evidence:arch-origin
460caf075c5fbc65a7c0d150e97511a2a985bc93
```

## SCOPE
```scope
- documents repository ONLY, branch main: one fast-forward push to origin. No commit, no amend, no rebase, no force, no branch, no tag, no delete.
- every path in origin/main..main lies under Claude_Duzenli_Arsiv/ — verified by you before the push, not assumed
- cwf_yaprak: NOT TOUCHED. No branch, no commit, no pull request, no report file. This card writes nothing to it.
- bus: one from_lane row ARCHIVE-PUSH-S133-1-AG5-report, posted once
- no database write beyond your own heartbeat and that row; no dispatch; no spend
```

## ORDER A — MEASURE, THEN PUSH
1. In the documents repository: `git ls-remote origin refs/heads/main` — print it. It must equal the `arch-origin` fence, else ON-DISAGREEMENT.
2. `git rev-parse HEAD` and `git rev-parse origin/main` — print both. `git merge-base --is-ancestor origin/main HEAD` — print the exit status read UNPIPED; a non-zero status is ON-DISAGREEMENT.
3. `git rev-list --count origin/main..main` — print the number you read. `git diff --name-only origin/main..main` — print it WHOLE, and print separately the result of filtering it for paths not beginning `Claude_Duzenli_Arsiv/`; that filtered list must be empty.
4. `git status --porcelain -uall` — print it. Untracked files under `Claude_Duzenli_Arsiv/` are EXPECTED here and are NOT yours to add, commit or delete; name them in the report and leave them exactly where they are.
5. `git push origin main`. Then `git ls-remote origin refs/heads/main` again — it must equal the HEAD you printed in A.2. The push's own output is not the evidence (S63-1); the second ls-remote is.

## ORDER B — THE REPORT
1. Post ONE from_lane row `ARCHIVE-PUSH-S133-1-AG5-report` carrying, in order: the A.1 ls-remote, the two revs and the ancestor exit status, the count, the whole file list and the empty filtered list, the `git status --porcelain -uall` output, and the A.5 ls-remote read back. Print `read relay_inbox at <ISO>, box empty` or the rows you found.

## FALSIFIER
Wrong if any file in cwf_yaprak is written; wrong if a pull request is opened; wrong if the push is not a fast-forward; wrong if `--force` or a lease appears anywhere; wrong if any commit is created, amended or rebased in the documents repository; wrong if a path outside `Claude_Duzenli_Arsiv/` is in the pushed range; wrong if an untracked file is added, committed or deleted; wrong if the push is reported from its own output rather than from the read-back; wrong if the card acted without the RELEASE row naming v1.

## SHARED SURFACES
Documents repository: one fast-forward push to `main`. cwf_yaprak: untouched. Bus: one row. CI: nothing dispatched.

## DECISION RIGHTS
None. Whether the push happens at all is settled by ORDER A's measurements; a STOP is a lawful outcome and is reported, not worked around.

BODIES: CWF-S132-SESSION-CLOSE-v1 §1 and §5 · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v133 FIRST JOB 4 · F-S132-ARCHIVE-PUSH-FENCES-TIP-1 · CARD-SOTA-SCOREBOARD-S132-1-v1 ORDER D (the predecessor form this card corrects) · S63-1 · RULE-49.

```deliverables
A.1 ls-remote equal to the arch-origin fence, printed
HEAD, origin/main and the ancestor exit status, printed unpiped
the commit count, the whole file list, and the empty out-of-prefix filtered list
git status --porcelain -uall printed, untracked files named and left alone
push performed and verified by a SECOND ls-remote equal to HEAD
one bus row; no cwf_yaprak write, no pull request, no force
```

TAIL ANCHOR: CARD-ARCHIVE-PUSH-S133-1-v1 ends here.
