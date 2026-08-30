<!-- relay-audit: v1 kind=card -->
# CARD-ARCHIVE-PUSH-S128-1 · v2 — fifteen never-committed session files: verify, commit once, push, and report what the remote says

The session archive repository's working copy holds the COMPLETE S125, S126 and S127 session
archives on disk, and NONE of the fifteen files has ever been committed. The v128 bootstrap's
"S127 archive done" meant WRITTEN, not LANDED — a stale-count-class finding filed this session.
The S125 and S126 folders did not exist at all until the Architect placed them this session from
the project-box originals; every placed file was verified sha256-identical on both sides of the
bridge before this card was cut, and the digests are in the `files` fence for you to re-derive.

**The Architect cannot push and this card is the proof-carrying consequence:** the anonymous
GitHub path answered a credential prompt from the cloud container AND from the bridge VM this
session — the third session running (F-S126-ARCHITECT-GH-403-1, now measured as an AUTH absence
against a PRIVATE repository, not a rate limit). A push with a credential is a MACHINE job with
a credential attached, so it comes to a lane rather than to the owner — `PLATINUM` and
`S102-YASA-1` both point the same way, and CARD-ARCHIVE-PUSH-S123-1-v3 is the precedent this
card inherits its shape from.

SCOUT: reviewed, and the guarantee is a NAMED ROW, not this card's arrival. The scout's verdict
on v1 — PASS-WITH-NOTES, artifact_name `SCOUT-CARD-REVIEW-CARD-ARCHIVE-PUSH-S128-1-verdict`,
filed from_lane at 2026-08-30T03:50:51Z — re-derived on its own macOS lens: REACH present, HEAD
equal to the `where` fence, ALL FIFTEEN sha256 values matching, the invariant holding, no live
index.lock, and cardPreflight GREEN. Every note in that verdict is incorporated in this v2 and
mapped line-by-line in the `supersedes` fence. One side effect the scout disclosed, so you do
not have to guess at it: its status read refreshed `.git/index`'s stat-cache, so the index
MTIME postdates this card (~2026-08-30T03:48Z) — a read, not a write; nothing is staged and no
tracked file is modified, which ORDER A has you re-verify yourself. The scout deliberately did
NOT take the CREDENTIAL probe (a push, even dry-run, is execution and outside its charter) —
that reading is yours alone. The dispatch record for this card names the verdict row and, if
one was used anywhere, the bypass — a claim this card cannot self-certify, which is why it
points at the record instead of asserting it.

## REQUIRES — RUN THIS BEFORE ANYTHING ELSE, AND PRINT WHAT IT SAYS

This card needs exactly two capabilities. Probe both, print both readings, and only then read on.

```scope
- REACH · the archive working copy is visible to your shell. Probe: `git -C <path from the where fence> rev-parse HEAD`. ABSENT if it errors or the path does not exist.
- CREDENTIAL · your shell already presents a credential for the archive remote, with NO setup step. Probe: `git -C <path> push --dry-run origin main`. ABSENT if it asks for a username, a password or a token.
```

**ABSENT IS A NAMED OUTCOME OF THIS CARD, NOT A FAILURE.** If either probe reads ABSENT, you have
finished this card correctly by printing the probe's own output and filing the report on the
fallback channel in ORDER F. You do not obtain, install, substitute or delegate a capability the
probe says you lack. Both readings are the deliverable either way.

## PREMISE

MEASURED: 2026-08-30T03:19Z, `git rev-parse HEAD` and `git rev-parse @{u}` in the owner's archive working copy (path in the `where` fence, branch `main`, upstream `origin/main`), over the Architect's bridge shell — both read the one sha the `where` fence carries, and `git rev-list --left-right --count @{u}...HEAD` returned `0 0`; nothing is unpushed, this card CREATES the commit it pushes.
MEASURED: 2026-08-30T03:24Z, `GIT_OPTIONAL_LOCKS=0 git status --porcelain -uall` in that working copy — 24 untracked lines, of which FIFTEEN are the archive files this card commits (all-ASCII names, identical in every lens) and NINE are NFD phantoms of files ALREADY TRACKED under NFC spellings (F-S125-NFD-LENS-1, the class CARD-ARCHIVE-PUSH-S123-1-v3 measured; proof command in the `phantoms` fence) — on a macOS shell expect the phantoms to vanish and the count to read fifteen plus this card's files in S128/ (v1 and this v2 — S37-1 keeps both) plus, after ORDER E, your report; any OTHER archive filename or a non-`??` status line is a STOP.
MEASURED: 2026-08-30T03:44Z, `sha256sum` over all fifteen paths, run independently on the bridge side and on the container side against the project-box originals — all fifteen values agree byte-for-byte with the `files` fence, and you re-derive them yourself in ORDER A.
MEASURED: 2026-08-30T03:26Z, `ls .git/` in that working copy — four stale index.lock remnants AND seven HEAD.lock remnants, all eleven named in the `locks` fence; the bridge VM may rename but not unlink, so your shell removes the four index.lock remnants under ORDER B and touches the seven HEAD.lock remnants NOT AT ALL.
DECAYS on the next commit to that working copy from anywhere; the Architect holds it frozen and places no further archive file there until this card closes (this card's own v2 file is the one placement after the freeze line, and it is named above).
ON-DISAGREEMENT: if `git rev-parse HEAD` differs from CLAIMS, or any sha256 differs, or any tracked file shows as modified or staged, do NOT commit and do NOT push — print what you read and file on the fallback channel; a push of a tree the card never measured is a push nobody reviewed.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the archive working copy's HEAD and its upstream are BOTH `a3ef8922dc160caf88057847290ec7aba9e8a3f5`, zero ahead, zero behind | MEASURED: git rev-parse HEAD and @{u}; git rev-list --left-right --count @{u}...HEAD returned 0 0 · MEASURED: the scout's macOS lens re-read the same sha in its verdict row | where |
| exactly fifteen archive files are untracked-and-intended, and their digests are the fifteen sha256 values in the fence | MEASURED: sha256sum on the bridge side and the container side · MEASURED: the scout re-derived all fifteen on a macOS shell, agreeing, and its glob over the three folders returned exactly fifteen | files |
| NOTHING IS STAGED AND NO TRACKED FILE IS MODIFIED — the only working-tree property this card depends on | MEASURED: git diff --cached --name-only empty; git status --porcelain -uall shows only `??` lines · MEASURED: the scout read the same two, twice, on its own lens | where |
| the nine remaining untracked lines on a Linux lens are NFD phantoms of files tracked under NFC, and are NOT staged by this card | MEASURED: every phantom path resolves to a tracked path at HEAD via the proof command in the fence · MEASURED: the scout's macOS lens shows no phantom at all, the predicted complement | phantoms |
| eleven lock-shaped remnants sit in .git/ — four index.lock remnants this card removes, seven HEAD.lock remnants it deliberately leaves — and a live index.lock, if one exists when you arrive, is yours to classify by holder | MEASURED: ls .git/ on the bridge side; the scout enumerated all eleven and found no live lock; the lsof discipline is S124's, inherited | locks |
| whether your shell reads REACH and CREDENTIAL as present | NOT-READ | the REQUIRES block; the scout took REACH (present) but deliberately left CREDENTIAL to you — a push probe is execution, and your printed readings are the deliverable whichever way they go |

```evidence:where
path  /Users/tunckahveci/Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra - DDocuments
      (in a bridge shell this is $HOME/mnt/2026 - Yapra - DDocuments)
remote origin  https://github.com/maymun207/2026-Yapra-DDocuments.git
branch main, upstream origin/main
HEAD == upstream == a3ef8922dc160caf88057847290ec7aba9e8a3f5
```

```evidence:files
All paths relative to Claude_Duzenli_Arsiv/ in that working copy. Verify each with sha256sum;
every value below was derived twice (bridge shell and container) and re-derived a third time by
the scout on macOS, all agreeing.

6bf64b79f68b491f2a1abd2b08ac8e81b8d97f395412b0627fc2084a63ad7a67  S125/CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v126.md
2e9e3f0b522d23c7cf20e76d6c9bba9d1b81b3573b385e7ee30cc4c309483c34  S125/CWF-S125-SESSION-CLOSE-v1.md
1adcfbaef73648e3fc16cc77a23d0a4d09d51fef87e9f46583b09a7087e642af  S125/OWNER-RULING-S125-SINGLE-LANE-1.md
8b4a672dacafd8234bd54e41785a43ad0a9b0d68172c9548325611488a1d14ab  S125/S125-DISPATCH-RECORD-1.md
9e62a06e1130e9b9cfd40d1fa985ff17e4e30d704e50e19b06072cc9f7010459  S125/S125-DISPATCH-RECORD-2.md
219513b0d33e3c61ab1dd9ba48490f6495ccb89108b92e17608c367bd80391e7  S125/S125-EAIP-COLDSTART-PROCESS-v1.md
7a1009cf05da1306c4aacf3be72692587dd5f8d4c0c47ed450e77a8df3d863ae  S125/S125-GATE-TUNING-DOCTRINE-v1.md
d1f2d546cd6e931c5a9baec7bf9e81c336f82922de9951b12004e194bbbacb2a  S126/CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v127.md
5d59badce4270ef56873e3a1e22fa9f2632de58bda698d07ef745c8f9b2aa75c  S126/CWF-S126-SESSION-CLOSE-v1.md
e12a38ff59204c2f7820d4de0948790d7c5cd2d6e5eb1f0226c2f68a9fca3b29  S126/OWNER-RULING-S126-BUDGET-THRESHOLDS-1.md
bc96641b026693be5c0688d5925efeae3a7c223b1cb0721ec52f054ae8b14410  S126/OWNER-RULING-S126-TRUNK-SYNC-LANDING-1.md
ef6a10c55fcf22cfcf9f5279415c752976b62798e3acd0f037bc438df4e904ca  S126/OWNER-RULING-S126-VALVES-AND-A-ITEMS-1.md
7d3da33d423cf509413184d4c1a28eedcc3677494abee558ae8ea2a78e4c2508  S127/CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v128.md
d1b2e8bef9e9974161f4d20f4337718682e2e60b5b63f67a3795a40dc27a2d2d  S127/CWF-S127-SESSION-CLOSE-v1.md
694eadf712927b6b57900d103cf1e44f966b718cd11d1b4dd96236aaa498dc33  S127/S127-FINDINGS-ADDENDUM-1.md
```

```evidence:locks
Lock-shaped remnants in .git/ — ELEVEN in all, enumerated so nothing at the deletion step is a
surprise (the scout's ask, incorporated).

The FOUR index.lock remnants ORDER B removes, renamed aside because the bridge VM may rename
but not unlink:
  index.lock.STALE-S121-085137
  index.lock.STALE-moved-by-S121-2026-08-27T0851Z
  index.lock.stale-S128
  index.lock.stale-S128-2

The SEVEN HEAD.lock remnants that are DELIBERATELY UNTOUCHED by this card — they block no
index write, and an unordered deletion is exactly what this fence exists to prevent:
  HEAD.lock.STALE-S121
  HEAD.lock.STALE-S121-091033
  HEAD.lock.STALE-S121-093144
  HEAD.lock.STALE-S121-094642
  HEAD.lock.STALE-S121-100611
  HEAD.lock.STALE-S121-101651
  HEAD.lock.STALE-S121-104354

Discipline for a LIVE index.lock, inherited from ARCHIVE-PUSH-S124-1: read the holder with
lsof; a lock no process holds is stale and is removed WITH ITS NAME PRINTED; a lock a process
holds is a STOP, and the process is named in the report instead.
```

```evidence:phantoms
The nine untracked lines a Linux lens shows beyond the fifteen. Each is an NFD spelling of a
path tracked at HEAD under NFC (F-S125-NFD-LENS-1). Proof, per path: `git ls-tree -r
--name-only HEAD` contains the same path in NFC. They are files ALREADY ON THE REMOTE. You do
not stage them, and on a macOS shell you will not even see them:
  Projeler/EAIP-1/docs/GU_Baş Sistem Mimarı.docx
  Projeler/EAIP-1/docs/GU_DOKÜMAN 6.docx
  Projeler/EAIP-1/docs/GU_KOBİ'ler İçin Fabrika Hizmet Modeli Araştırması.docx
  Projeler/cwf_yaprak3/docs/2026-08-02 - Session76 başlatma için dokuman okuma.md
  Projeler/cwf_yaprak3/docs/2026-08-02 - Session77 başlatma için dokuman okuma.md
  Projeler/cwf_yaprak3/docs/2026-08-03 - CWF'yi multiple agent olarak çalıştırma.md
  Projeler/cwf_yaprak3/docs/2026-08-03 - Session79 başlatma için dokuman okuma.md
  Projeler/cwf_yaprak3/docs/2026-08-04 - Session80 başlaması için dokuman okuma.md
  Projeler/cwf_yaprak3/docs/2026-08-05 - Session82 başlaması için eki okuma.md
```

## ORDER A — FRESH BOX FIRST, THEN VERIFY EVERYTHING BEFORE TOUCHING ANYTHING

FIRST, read your own box fresh, directly by `created_at` — a row addressed to you newer than
this card is a STOP until you have acted on it (the fresh-box clause GO-LANDING-S126-2 carried;
this card deletes files and pushes twice, so it carries it too).
Then, after the REQUIRES probes: read `git rev-parse HEAD` against CLAIMS; run `sha256sum` over
the fifteen paths and compare every value to the `files` fence; run the BEFORE half of the
invariant — `git diff --cached --name-only` must be EMPTY and `git status --porcelain -uall`
must show ONLY `??` lines. Any mismatch is the ON-DISAGREEMENT arm. Print all four readings.

## ORDER B — THE LOCKS, BEFORE THE COMMIT THAT NEEDS THE INDEX

Remove the FOUR index.lock remnants named in the `locks` fence, one rm per file, printing each
name. The seven HEAD.lock remnants in the same fence are NOT touched. If a live
`.git/index.lock` exists, apply the lsof discipline from the fence before anything else.
Nothing else in `.git/` is touched.

## ORDER C — STAGE BY NAME, COMMIT ONCE, PUSH

Stage the fifteen paths BY NAME — fifteen `git add` invocations or one with fifteen explicit
paths; `git add -A`, `git add .` and every pathless form are forbidden throughout this card.
Then `git diff --cached --name-only` must list EXACTLY the fifteen; a sixteenth line or a
missing line is a STOP. Write the commit message from the `message` fence to a file OUTSIDE the
working copy with your editor tool and commit with `git commit -F <that path>` — never `-m`.
Then `git push origin main`.

```message
CARD-ARCHIVE-PUSH-S128-1: land the S125, S126 and S127 session archives

Fifteen files, staged by name, none previously tracked. S125 and S126 were
placed by the Architect in S128 from the project-box originals and verified
sha256-identical on both sides of the bridge before the card was cut; S127
was placed at the S127 close and verified the same way. The nine NFD-spelled
untracked lines a Linux lens shows are phantoms of files already tracked
under NFC (F-S125-NFD-LENS-1) and are deliberately untouched.
```

## ORDER D — REPORT WHAT THE REMOTE SAYS, NOT THAT YOU RAN IT

Print the push's own output, then re-read the remote: `git ls-remote origin refs/heads/main`.
**The report is that second reading** — `S63-1`: a push's exit code is not evidence. The remote
value must equal your new commit's sha, and both appear in the report in full.

## ORDER E — THE REPORT, AND THE CARD FILES, IN A SECOND COMMIT

Write `Claude_Duzenli_Arsiv/S128/ARCHIVE-PUSH-S128-1-AG5-report.md` in that working copy AFTER
the push has been read back. It carries: both REQUIRES readings, the fresh-box reading, the
three verification readings, the lock removals by name, the staged-list check, the commit sha,
the push output, and the ls-remote reading. Stage BY NAME exactly three paths — the report and
this card's two files sitting beside it in S128/ (v1 and v2; S37-1 keeps the superseded
version) — commit with a message naming this card, push again, and read the remote back a
second time.

## ORDER F — THE CHANNEL THAT SURVIVES A NO, OR A HALF

On CREDENTIAL ABSENT: write the same report file, **leave it UNTRACKED, commit nothing**, and
say in it that the remote was never reached. On REACH ABSENT: report on the bus, `from_lane`,
artifact name `ARCHIVE-PUSH-S128-1-AG5-report`, carrying both probe readings. ON A SECOND-PUSH
FAILURE after a FIRST push that succeeded: file the bus row anyway, carrying the first push's
ls-remote reading — a landed commit is never left unexplained (the scout's ask, incorporated).
Either way, file the bus row that closes this card.

## THE CREDENTIAL RULE, STATED POSITIVELY

**Push only with the credential your shell already presents for this remote, exactly as
configured.** Any step whose purpose is to obtain, install, substitute or delegate one is
outside this card — installing a credential helper, running a setup command, a second remote,
another clone, another window, or the owner's hands. If your CREDENTIAL probe reads ABSENT,
the absence is the report.

## FALSIFIER

This card is wrong if HEAD differs from CLAIMS, if any of the fifteen sha256 values differs, if
anything is staged or any tracked file modified before you start, or if the staged list is not
exactly the fifteen. Test all four before you touch the remote and report what you found.
Second arm: **a push reported by its own exit code is a push reported by nobody** — no
ls-remote reading in the report, no done.

## SHARED SURFACES

One: the `main` branch of the archive remote. You touch no other file in that working copy
beyond the fifteen, the report, and this card's two files; no file in `cwf_yaprak`; no gate, no
governed row, no migration, no git configuration anywhere. The four index.lock remnants are the
only deletions — the seven HEAD.lock remnants are named and left. This card spends nothing —
no CI run, no deployment, no model call beyond your own.

## DECISION RIGHTS

The owner said "devam" to landing the archive gap this session; the Architect decides that
these fifteen files go up and is answerable for their content — every one is a byte-verified
copy of a project-box original. **You decide nothing about the content and everything about
whether the world matches this card well enough to push.** A named refusal closes this card as
completely as a push does.

BODIES: `PLATINUM` · `S102-YASA-1` · `S63-1` · `TOTAL-45` · `empty ≠ zero` (fifteen and
twenty-four are both true counts of one tree — the lens is named, never averaged).

fanout: personalized

```evidence:supersedes
This version supersedes CARD-ARCHIVE-PUSH-S128-1-v1 under S37-1. v1 is immutable and is not
edited; both files land together in ORDER E.

THE VERSION STAMP IS EXEMPT: TITLE VERSION and TAIL ANCHOR VERSION map to the re-cut itself.
Every OTHER difference between v1 and this version, mapped to the scout finding that forced it
(verdict artifact_name SCOUT-CARD-REVIEW-CARD-ARCHIVE-PUSH-S128-1-verdict, from_lane,
2026-08-30T03:50:51Z). A changed line that maps to nothing here, and is not a version stamp,
is a silent edit, and finding one is a RED:
  the SCOUT block rewritten whole        <- the circularity finding: "met because delivered" is
                                            no guarantee; the block now names the verdict row
                                            by artifact_name and instant, carries the scout's
                                            own re-derivations, its disclosed index-mtime side
                                            effect, and its deliberate CREDENTIAL abstention
  the locks fence gains seven HEAD.lock  <- scout note 1: the fence under-enumerated .git/;
     remnants, DELIBERATELY UNTOUCHED       eleven lock-shaped files, four removed, seven named
                                            and left, so the deletion step meets no surprise
  ORDER A gains the fresh-box first step <- scout note 2: CP-11 passed vacuously (its regex
                                            knows none of this card's verbs) — the clause
                                            GO-LANDING-S126-2 carried is written in by hand
  ORDER F gains the half-failure clause  <- scout note 3: a first push that lands and a second
                                            that fails must still file the bus row with the
                                            first ls-remote reading
  ORDER E stages three paths, not two    <- consequence of the re-cut itself: v1 and v2 both
                                            sit in S128/ and S37-1 keeps both
  PREMISE lines two, four, five retuned  <- the same three incorporations, restated where the
                                            lane will re-measure them; line two's count
                                            prediction now names both card files
  CLAIMS rows retuned with scout bases   <- the verdict is a third lens on four claims and the
                                            lock claim now counts eleven
```

```deliverables
branch: main
report: Claude_Duzenli_Arsiv/S128/ARCHIVE-PUSH-S128-1-AG5-report.md
```

TAIL ANCHOR: CARD-ARCHIVE-PUSH-S128-1-v2 ends here.
