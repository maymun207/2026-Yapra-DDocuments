<!-- relay-audit: v1 kind=card prov=1 -->
# SCOUT-CARD-REVIEW-17 · v1 — a small card with two soft edges, and the Architect names both

fanout: personalized — ONE address, scout, one copy. No sibling holds these bytes.

**THIS CARD ADVANCES NO ACCEPTANCE CRITERION AND SAYS SO.** The candidate pushes an archive
repository whose commits exist only on the owner's disk. It is housekeeping, it spends nothing, and
it is here because standing ruling ② admits no exception: every card is read by a second lens before
it reaches a producer, and a small card is exactly the kind that gets waved through.

**THE ARCHITECT MADE THOSE COMMITS AND CANNOT PUSH THEM.** The archive remote is HTTPS and the
Architect's bridge shell has no credential for it — proven by running the push and reading the
refusal, not by assuming. So the work goes to a lane, which is what `PLATINUM` and `S102-YASA-1`
require: a machine step with a credential attached never becomes an owner action item.

**TWO SOFT EDGES ARE DECLARED RATHER THAN HIDDEN, AND THEY ARE R2 AND R3.**

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the quoted candidate hashes to sha1 `538bc8b64290807a8d3aaee4eaa207ec45bfeaca` over 8247 bytes, and stripping the quote prefix recovers the card, sha1 `510a062d591165c42245d8cba08fb50490149d5c` over 8001 bytes | MEASURED: sha1sum and wc -c over both files, plus cmp of the recovered file against the built original | proof |
| the recovered candidate passes the landed mechanical card check | MEASURED: cardPreflight --self-test red=proven green=proven, then --check over the recovered file, CP-1 through CP-11 all OK | proof |
| the candidate's own PREMISE, CLAIMS and fences were measured in the owner's archive working copy over the bridge, and the Architect's push refusal is quoted from the shell rather than paraphrased | MEASURED: the bridge session that produced them, at the instant the candidate's PREMISE names | proof |
| whether ORDER C actually lets a credential-blind lane close the card, rather than improvise | NOT-READ | R1, and only your reading answers it |
| whether the `leave-alone` fence's nine paths are matchable as written | NOT-READ | R2, and the Architect believes this is the weaker of the two edges |

```evidence:proof
Built and measured 2026-08-28T13:40Z.
    quoted    sha1 538bc8b64290807a8d3aaee4eaa207ec45bfeaca over 8247 bytes
    recovered sha1 510a062d591165c42245d8cba08fb50490149d5c over 8001 bytes
    recovery  sed 's/^| //'; cmp against the built original: IDENTICAL
    preflight --self-test red=proven green=proven, then --check over the recovered file: GREEN
    the candidate contains no tab and no non-ASCII path byte; its nine untracked paths are
    written ASCII-folded and the filesystem stores them NFD-normalised. That mismatch is R2.
```

## PREMISE

PRECONDITION READ AT 2026-08-28T13:40Z: both digests, both byte counts, the byte-for-byte recovery and the preflight verdict, all from the one built file — MEASURED:sha1sum, wc -c, cmp and cardPreflight over that file
MEASURED:the candidate's own readings — HEAD, upstream, the ahead/behind count, the untracked partition and the push refusal — were taken in the owner's archive working copy over the bridge shell before the candidate was written.
UNMEASURED: whether any lane's shell can reach that working copy, and whether any lane holds a credential for that remote. The candidate is written so that a NO to either is a clean close rather than a failure — whether it succeeds at that is R1.

SELF-INVALIDATION: the candidate's own premise decays on the next commit to that archive working copy, and the Architect will make one at session close. ON-DISAGREEMENT: if you read that working copy and its HEAD is not the candidate's sha, that is not a defect in the candidate — it is the candidate's decay clause firing, and judging whether it fires HONESTLY is part of R1.

## THE CHECKLIST

R1 · ORDER C, the refusal path. A lane that cannot see the path, or has no credential, is told to print what it read and stop. **Say whether that is enough to stop a capable lane from improvising** — changing the remote URL, embedding a token, opening a browser flow — or whether the card only forbids the four workarounds it happened to think of.
R2 · the `leave-alone` fence. Nine untracked paths are named so the lane leaves them alone, but they are written ASCII-folded while the filesystem stores them NFD-normalised, and the card says "match them by path shape, not by byte". **That is an instruction with no mechanical test and the Architect knows it.** Say whether a lane can obey it, and if not, name what the card should have carried instead — a digest, a count, a `git status` invariant, or something better.
R3 · the staging tension. The card's first cut said "no `git add`, no commit" in ORDER A and then told the lane to commit a report. The Architect caught that before dispatch and split it into two moments: nothing staged BEFORE the push, the report staged by name AFTER it. **Read the repaired text and say whether the ordering is now unambiguous to a lane reading top to bottom** — including the case where the first push refuses.
R4 · byte proof: recover the candidate and confirm both digests.
R5 · **SAY WHICH WINDOW YOU ARE, IN YOUR FIRST LINE.** Round 15 drew three GREEN replies whose own labels read W1, W1 and W2, and the Architect carried that forward as "three windows". It was three readings from two labels, and a third window's silence was read as a verdict. Rounds are counted by LABEL from here on.

## ORDER A — one verdict, GREEN or RED, findings named against R1 to R5

**Do not rewrite the card.** On GREEN it dispatches to AG-4 unchanged. On RED the sentence you name
is the finding and the card is re-cut as v2 rather than edited.

## ORDER B — one sentence

This card exists because one actor could do a job and another could not, and the difference was a
credential rather than a capability. **Say in one sentence how a card should express "run this only
if you hold X" so that the lane's inability is a first-class reported outcome and not a failure it
feels it must engineer around.**

## FALSIFIER

Falsified if either digest differs from CLAIMS. Report that and stop.

Second arm: **a small card is where a review round goes soft.** R2 is a real weakness the Architect
declared rather than hid; a GREEN that does not engage with it has read the announcement instead of
the card.

## SHARED SURFACES

None. You write no file, no branch, no commit, no setting. Your reply is your only write.

## DECISION RIGHTS

The owner ruled that the archive push is the Architect's to own rather than his. The Architect decides
that these two commits go up and is answerable for their content. AG-4 decides whether the world
matches the card well enough to push. You rule on the verdict. Nothing here spends beyond your own
reading.

## DELIVERY

Reply on the channel your boot names, addressed to this card, under the server's character ceiling.
Verdict first, R2 second, the ORDER B sentence last.

BODIES: `PLATINUM` · `S102-YASA-1` · `S63-1` · `TOTAL-45` · `CP-1` to `CP-11`.

## THE CANDIDATE — line-quoted, both digests in CLAIMS

Recover it with `sed 's/^| //'` over the block below. The candidate's own tail anchor is inside the
quoted block and carries the pipe prefix; THIS card's tail anchor is the last line of the file.

```evidence:candidate
| <!-- relay-audit: v1 kind=card -->
| # CARD-ARCHIVE-PUSH-S123-1 · v1 — push the archive, and tell me whether you could
| 
| The session archive repository has commits that exist only on the owner's disk. **The Architect made
| them and cannot push them:** the archive remote is HTTPS and the Architect's bridge shell has no
| credential for `github.com`, which it proved by running the push and reading the refusal. That is a
| MACHINE job with a credential attached, so it comes to a lane rather than to the owner — `PLATINUM`
| and `S102-YASA-1` both point the same way.
| 
| ## PREMISE
| 
| MEASURED: 2026-08-28T13:36Z, in the owner's archive working copy at the path in the `where` fence, over the bridge shell. Branch `main`, upstream `origin/main`.
| MEASURED: `git rev-list --left-right --count @{u}...HEAD` — the working copy is TWO commits ahead and ZERO behind. Both shas are in CLAIMS.
| MEASURED: `git push --dry-run origin main` from the Architect's own shell returned `fatal: could not read Username for 'https://github.com': No such device or address`. The Architect is credential-blind here; that is the whole reason this card exists.
| UNMEASURED: whether YOUR shell can reach that path at all, and whether YOUR git has a credential for that remote. Nothing in this card assumes either — see the FALSIFIER.
| DECAYS on the next commit to that working copy, which the Architect will make at session close. If HEAD is not the sha in CLAIMS, you are looking at a moved world.
| ON-DISAGREEMENT: if `git rev-parse HEAD` gives you a different sha, do NOT push. Print what you read, print `git log --oneline @{u}..HEAD`, and stop. A push of commits the card never named is a push nobody reviewed.
| 
| ## CLAIMS
| 
| | claim | basis | anchor |
| |---|---|---|
| | the archive working copy's HEAD is `c5cc031e655d89ad467b891f1683eed442a17778` and its upstream is at `3ce4ea1ad26cc17940083bbef038876b19d8014f` | MEASURED: git rev-parse HEAD and git rev-parse @{u}, in that working copy | where |
| | exactly two commits are unpushed, and they are the two named in the `commits` fence | MEASURED: git rev-list --left-right --count @{u}...HEAD returned 0 1 before the second commit and the log enumerates both | commits |
| | the working tree carries no modified tracked file — every uncommitted path is UNTRACKED and none of them is this session's work | MEASURED: git status --porcelain, partitioned; the untracked paths are enumerated in the `leave-alone` fence | leave-alone |
| | the two artifacts added by the newer commit are byte-identical to what the Architect preflighted and dispatched | MEASURED: md5 over both files in the working copy, compared against the preflight's own digests and against the md5 the bus row stores | where |
| | whether your shell can reach that path and push it | NOT-READ | that is the deliverable, and a clean refusal is as good a report as a push |
| 
| ```evidence:where
| path  /Users/tunckahveci/Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra - DDocuments
|       (in a bridge shell this is $HOME/mnt/2026 - Yapra - DDocuments)
| remote origin  https://github.com/maymun207/2026-Yapra-DDocuments.git
| branch main, upstream origin/main
| 
| the two files the newer commit adds, with the digests they must still have:
|   Claude_Duzenli_Arsiv/S123/GO-LANDING-S123-2-v2.md     8241 bytes
|   Claude_Duzenli_Arsiv/S123/SCOUT-CARD-REVIEW-16-v1.md 17915 bytes
| ```
| 
| ```evidence:commits
| c5cc031e655d89ad467b891f1683eed442a17778  S123: the re-cut landing card (v2) and the confirm round
| 80dd82f498669ec846baacad7cf69e50285c7515  S123: A1 runtime floor measured, vendor call
| ```
| 
| ```evidence:leave-alone
| NINE untracked paths sit in that working copy and NONE of them is this session's work. They are
| the owner's own documents, and they predate S123. Named, so that "leave them" is checkable:
|   Claude_Duzenli_Arsiv/Projeler/EAIP-1/docs/GU_Bas Sistem Mimari.docx
|   Claude_Duzenli_Arsiv/Projeler/EAIP-1/docs/GU_DOKUMAN 6.docx
|   Claude_Duzenli_Arsiv/Projeler/EAIP-1/docs/GU_KOBI'ler Icin Fabrika Hizmet Modeli Arastirmasi.docx
|   Claude_Duzenli_Arsiv/Projeler/cwf_yaprak3/docs/2026-08-02 - Session76 baslatma icin dokuman okuma.md
|   Claude_Duzenli_Arsiv/Projeler/cwf_yaprak3/docs/2026-08-02 - Session77 baslatma icin dokuman okuma.md
|   Claude_Duzenli_Arsiv/Projeler/cwf_yaprak3/docs/2026-08-03 - CWF'yi multiple agent olarak calistirma.md
|   Claude_Duzenli_Arsiv/Projeler/cwf_yaprak3/docs/2026-08-03 - Session79 baslatma icin dokuman okuma.md
|   Claude_Duzenli_Arsiv/Projeler/cwf_yaprak3/docs/2026-08-04 - Session80 baslamasi icin dokuman okuma.md
|   Claude_Duzenli_Arsiv/Projeler/cwf_yaprak3/docs/2026-08-05 - Session82 baslamasi icin eki okuma.md
| Their filenames are NFD-normalised on this filesystem and the spellings above are the ASCII-folded
| forms — match them by path shape, not by byte. YOU DO NOT ADD ANY OF THEM. `git add -A` is
| forbidden in this card for exactly that reason.
| ```
| 
| ## ORDER A — VERIFY, THEN PUSH, IN THAT ORDER
| 
| Read `git rev-parse HEAD` and `git log --oneline @{u}..HEAD` FIRST and compare them to the
| `commits` fence. Only if both match do you run `git push origin main`.
| 
| **BEFORE THE PUSH YOU STAGE AND COMMIT NOTHING** — no `git add`, no commit, no rebase, no force, no
| branch creation, no tag. The commits going up must be exactly the two the fence names, and a third
| commit made before the push would make this card's own CLAIMS false.
| 
| The report in the fanout paragraph is the ONE exception and it comes AFTER the push: you `git add`
| that single named path, commit it, and push again. `git add -A` stays forbidden throughout.
| 
| ## ORDER B — REPORT WHAT THE REMOTE SAYS, NOT THAT YOU RAN IT
| 
| Print the push's own output and then re-read the remote: `git ls-remote origin refs/heads/main`.
| **The report is that second reading**, not the exit code — `S63-1`, a merge is not evidence, and
| neither is a push. If the remote's `main` equals the HEAD sha in CLAIMS, say so with both shas.
| 
| ## ORDER C — IF YOU CANNOT
| 
| Two failures are EXPECTED and neither is your fault. If the path is not mounted in your shell, say
| which paths you can see and stop. If git asks for a credential you do not have, print the refusal
| verbatim and stop. **A named refusal closes this card honestly**; a workaround does not. You do not
| change the remote's URL, you do not add a credential helper, you do not embed a token in a URL, and
| you do not open a browser flow.
| 
| ## FALSIFIER
| 
| This card is wrong if HEAD is not the sha in CLAIMS, or if the unpushed set is not exactly the two
| commits in the `commits` fence. Test that before you touch the remote and report what you found.
| 
| Second arm: **a push reported by its own exit code is a push reported by nobody.** If your report does
| not carry the `ls-remote` reading, the card is not done.
| 
| ## SHARED SURFACES
| 
| One: the `main` branch of the archive remote. You touch no file in that working copy, no file in
| `cwf_yaprak`, no gate, no governed row, no migration. This card spends nothing — no CI run, no
| deployment, no model call beyond your own.
| 
| ## DECISION RIGHTS
| 
| The owner ruled that the archive push is the Architect's to own rather than his. The Architect decides
| that these two commits go up and is answerable for their content. **You decide nothing about the
| content and everything about whether the push is safe to run** — if the world does not match this
| card, refusing is the right answer and is the deliverable.
| 
| BODIES: `PLATINUM` · `S102-YASA-1` (no machine step reaches the owner) · `S63-1` · `TOTAL-45`.
| 
| fanout: personalized
| 
| Report to `Claude_Duzenli_Arsiv/S123/ARCHIVE-PUSH-S123-1-AG4-report.md` in that same working copy,
| AFTER the push of the two named commits has been made and read back. Stage that one path by name,
| commit it with a message naming this card, and push again. If the first push refused, write the
| report anyway and say in it that the remote was never reached.
| 
| ```deliverables
| branch: main
| report: Claude_Duzenli_Arsiv/S123/ARCHIVE-PUSH-S123-1-AG4-report.md
| ```
| 
| TAIL ANCHOR: CARD-ARCHIVE-PUSH-S123-1-v1 ends here.
```

TAIL ANCHOR: SCOUT-CARD-REVIEW-17-v1 ends here.
