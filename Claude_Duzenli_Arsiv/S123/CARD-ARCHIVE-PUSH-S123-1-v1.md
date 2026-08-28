<!-- relay-audit: v1 kind=card -->
# CARD-ARCHIVE-PUSH-S123-1 · v1 — push the archive, and tell me whether you could

The session archive repository has commits that exist only on the owner's disk. **The Architect made
them and cannot push them:** the archive remote is HTTPS and the Architect's bridge shell has no
credential for `github.com`, which it proved by running the push and reading the refusal. That is a
MACHINE job with a credential attached, so it comes to a lane rather than to the owner — `PLATINUM`
and `S102-YASA-1` both point the same way.

## PREMISE

MEASURED: 2026-08-28T13:36Z, in the owner's archive working copy at the path in the `where` fence, over the bridge shell. Branch `main`, upstream `origin/main`.
MEASURED: `git rev-list --left-right --count @{u}...HEAD` — the working copy is TWO commits ahead and ZERO behind. Both shas are in CLAIMS.
MEASURED: `git push --dry-run origin main` from the Architect's own shell returned `fatal: could not read Username for 'https://github.com': No such device or address`. The Architect is credential-blind here; that is the whole reason this card exists.
UNMEASURED: whether YOUR shell can reach that path at all, and whether YOUR git has a credential for that remote. Nothing in this card assumes either — see the FALSIFIER.
DECAYS on the next commit to that working copy, which the Architect will make at session close. If HEAD is not the sha in CLAIMS, you are looking at a moved world.
ON-DISAGREEMENT: if `git rev-parse HEAD` gives you a different sha, do NOT push. Print what you read, print `git log --oneline @{u}..HEAD`, and stop. A push of commits the card never named is a push nobody reviewed.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the archive working copy's HEAD is `c5cc031e655d89ad467b891f1683eed442a17778` and its upstream is at `3ce4ea1ad26cc17940083bbef038876b19d8014f` | MEASURED: git rev-parse HEAD and git rev-parse @{u}, in that working copy | where |
| exactly two commits are unpushed, and they are the two named in the `commits` fence | MEASURED: git rev-list --left-right --count @{u}...HEAD returned 0 1 before the second commit and the log enumerates both | commits |
| the working tree carries no modified tracked file — every uncommitted path is UNTRACKED and none of them is this session's work | MEASURED: git status --porcelain, partitioned; the untracked paths are enumerated in the `leave-alone` fence | leave-alone |
| the two artifacts added by the newer commit are byte-identical to what the Architect preflighted and dispatched | MEASURED: md5 over both files in the working copy, compared against the preflight's own digests and against the md5 the bus row stores | where |
| whether your shell can reach that path and push it | NOT-READ | that is the deliverable, and a clean refusal is as good a report as a push |

```evidence:where
path  /Users/tunckahveci/Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra - DDocuments
      (in a bridge shell this is $HOME/mnt/2026 - Yapra - DDocuments)
remote origin  https://github.com/maymun207/2026-Yapra-DDocuments.git
branch main, upstream origin/main

the two files the newer commit adds, with the digests they must still have:
  Claude_Duzenli_Arsiv/S123/GO-LANDING-S123-2-v2.md     8241 bytes
  Claude_Duzenli_Arsiv/S123/SCOUT-CARD-REVIEW-16-v1.md 17915 bytes
```

```evidence:commits
c5cc031e655d89ad467b891f1683eed442a17778  S123: the re-cut landing card (v2) and the confirm round
80dd82f498669ec846baacad7cf69e50285c7515  S123: A1 runtime floor measured, vendor call
```

```evidence:leave-alone
NINE untracked paths sit in that working copy and NONE of them is this session's work. They are
the owner's own documents, and they predate S123. Named, so that "leave them" is checkable:
  Claude_Duzenli_Arsiv/Projeler/EAIP-1/docs/GU_Bas Sistem Mimari.docx
  Claude_Duzenli_Arsiv/Projeler/EAIP-1/docs/GU_DOKUMAN 6.docx
  Claude_Duzenli_Arsiv/Projeler/EAIP-1/docs/GU_KOBI'ler Icin Fabrika Hizmet Modeli Arastirmasi.docx
  Claude_Duzenli_Arsiv/Projeler/cwf_yaprak3/docs/2026-08-02 - Session76 baslatma icin dokuman okuma.md
  Claude_Duzenli_Arsiv/Projeler/cwf_yaprak3/docs/2026-08-02 - Session77 baslatma icin dokuman okuma.md
  Claude_Duzenli_Arsiv/Projeler/cwf_yaprak3/docs/2026-08-03 - CWF'yi multiple agent olarak calistirma.md
  Claude_Duzenli_Arsiv/Projeler/cwf_yaprak3/docs/2026-08-03 - Session79 baslatma icin dokuman okuma.md
  Claude_Duzenli_Arsiv/Projeler/cwf_yaprak3/docs/2026-08-04 - Session80 baslamasi icin dokuman okuma.md
  Claude_Duzenli_Arsiv/Projeler/cwf_yaprak3/docs/2026-08-05 - Session82 baslamasi icin eki okuma.md
Their filenames are NFD-normalised on this filesystem and the spellings above are the ASCII-folded
forms — match them by path shape, not by byte. YOU DO NOT ADD ANY OF THEM. `git add -A` is
forbidden in this card for exactly that reason.
```

## ORDER A — VERIFY, THEN PUSH, IN THAT ORDER

Read `git rev-parse HEAD` and `git log --oneline @{u}..HEAD` FIRST and compare them to the
`commits` fence. Only if both match do you run `git push origin main`.

**BEFORE THE PUSH YOU STAGE AND COMMIT NOTHING** — no `git add`, no commit, no rebase, no force, no
branch creation, no tag. The commits going up must be exactly the two the fence names, and a third
commit made before the push would make this card's own CLAIMS false.

The report in the fanout paragraph is the ONE exception and it comes AFTER the push: you `git add`
that single named path, commit it, and push again. `git add -A` stays forbidden throughout.

## ORDER B — REPORT WHAT THE REMOTE SAYS, NOT THAT YOU RAN IT

Print the push's own output and then re-read the remote: `git ls-remote origin refs/heads/main`.
**The report is that second reading**, not the exit code — `S63-1`, a merge is not evidence, and
neither is a push. If the remote's `main` equals the HEAD sha in CLAIMS, say so with both shas.

## ORDER C — IF YOU CANNOT

Two failures are EXPECTED and neither is your fault. If the path is not mounted in your shell, say
which paths you can see and stop. If git asks for a credential you do not have, print the refusal
verbatim and stop. **A named refusal closes this card honestly**; a workaround does not. You do not
change the remote's URL, you do not add a credential helper, you do not embed a token in a URL, and
you do not open a browser flow.

## FALSIFIER

This card is wrong if HEAD is not the sha in CLAIMS, or if the unpushed set is not exactly the two
commits in the `commits` fence. Test that before you touch the remote and report what you found.

Second arm: **a push reported by its own exit code is a push reported by nobody.** If your report does
not carry the `ls-remote` reading, the card is not done.

## SHARED SURFACES

One: the `main` branch of the archive remote. You touch no file in that working copy, no file in
`cwf_yaprak`, no gate, no governed row, no migration. This card spends nothing — no CI run, no
deployment, no model call beyond your own.

## DECISION RIGHTS

The owner ruled that the archive push is the Architect's to own rather than his. The Architect decides
that these two commits go up and is answerable for their content. **You decide nothing about the
content and everything about whether the push is safe to run** — if the world does not match this
card, refusing is the right answer and is the deliverable.

BODIES: `PLATINUM` · `S102-YASA-1` (no machine step reaches the owner) · `S63-1` · `TOTAL-45`.

fanout: personalized

Report to `Claude_Duzenli_Arsiv/S123/ARCHIVE-PUSH-S123-1-AG4-report.md` in that same working copy,
AFTER the push of the two named commits has been made and read back. Stage that one path by name,
commit it with a message naming this card, and push again. If the first push refused, write the
report anyway and say in it that the remote was never reached.

```deliverables
branch: main
report: Claude_Duzenli_Arsiv/S123/ARCHIVE-PUSH-S123-1-AG4-report.md
```

TAIL ANCHOR: CARD-ARCHIVE-PUSH-S123-1-v1 ends here.
