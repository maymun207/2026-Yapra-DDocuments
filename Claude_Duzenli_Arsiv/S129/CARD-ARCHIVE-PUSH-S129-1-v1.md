<!-- relay-audit: v1 kind=card -->
# CARD-ARCHIVE-PUSH-S129-1 · v1 — eight never-committed archive files: verify, commit once, push, and report what the remote says

The archive repository's working copy holds eight files that have NEVER been committed. Six of
them are S128's, and one of those six is `OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1.md` — the ruling
that forbids exactly this state. It was written at the S128 close and never landed
(F-S129-AUTOPUSH-RULING-DID-NOT-LAND-ON-ITSELF-1, measured at this session's open under that
ruling's own arm 2). Two are S129's, authored directly into the archive under the ruling that
replaced the direction (OWNER-RULING-S129-ARCHIVE-FIRST-1).

**The Architect cannot push and this card is the proof-carrying consequence:** the archive
remote answered a credential prompt from the bridge VM this session — `git ls-remote origin
HEAD` returned *could not read Username for https://github.com*, the same AUTH absence against a
private repository that F-S126-ARCHITECT-GH-403-1 named. A push with a credential is a MACHINE
job with a credential attached, so it comes to a lane rather than to the owner; `PLATINUM` and
`S102-YASA-1` point the same way, and CARD-ARCHIVE-PUSH-S128-1-v2 is the precedent this card
inherits its shape from.

SCOUT: NOT TAKEN, and the bypass is NAMED rather than implied. The S126 mode addition requires a
scout verdict or a named bypass per card; no scout window exists — the relay bus has been silent
since 2026-08-30T04:33:20Z, when AG-5 filed its lane-close report, and every address is closed.
The bypass is recorded in S129-DISPATCH-RECORD-1 with this justification: this card stages
eight named files whose digests any reader can re-derive, deletes nothing, touches no gate, no
governed row and no file in `cwf_yaprak`, and its shape is a line-for-line inheritance of a card
a scout has already PASSed (`SCOUT-CARD-REVIEW-CARD-ARCHIVE-PUSH-S128-1-verdict`, from_lane,
2026-08-30T03:50:51Z). If a scout window opens before you consume this card, its verdict
supersedes this bypass and a RED stops the card wherever it stands.

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

MEASURED: 2026-09-02T22:16:52Z, `git rev-parse HEAD` and `git rev-parse @{u}` in the owner's archive working copy (path in the `where` fence, branch `main`, upstream `origin/main`), over the Architect's bridge shell under GIT_OPTIONAL_LOCKS=0 — both read the one sha the `where` fence carries, and `git rev-list --left-right --count @{u}...HEAD` returned `0 0`; nothing is unpushed, this card CREATES the commit it pushes.
MEASURED: 2026-09-02T22:16:52Z, `git status --porcelain -uall` in that working copy — seventeen untracked lines, of which EIGHT are the archive files this card commits (all-ASCII names, identical in every lens, named in the `files` fence) and NINE are NFD phantoms of files ALREADY TRACKED under NFC spellings (F-S125-NFD-LENS-1, the class CARD-ARCHIVE-PUSH-S123-1-v3 measured; the nine are named in the `phantoms` fence) — on a macOS shell expect the phantoms to vanish and the count to read eight plus this card's own file in S129/ plus, after ORDER E, your report; any OTHER archive filename, or any status line that is not `??`, is a STOP.
MEASURED: 2026-09-02T22:16:52Z, `git diff --cached --name-only` in that working copy returned EMPTY and no `git status --porcelain -uall` line was anything but `??` — nothing is staged and no tracked file is modified, the only working-tree property this card depends on; you re-verify it yourself in ORDER A.
MEASURED: 2026-09-02T22:16:52Z, `sha256sum` over all eight paths on the bridge shell — every value agrees with the `files` fence, and each was taken at authoring time from the archive file itself under OWNER-RULING-S129-ARCHIVE-FIRST-1 arm 2 rather than re-derived afterwards from a copy.
MEASURED: 2026-09-02T22:16:52Z, `ls .git/` in that working copy — SEVEN lock-shaped remnants, all HEAD.lock, all named in the `locks` fence, and NO live `.git/index.lock` (`ls -l .git/index.lock` returned *No such file or directory*). The four index.lock remnants the S128 card removed are gone; **this card removes nothing.**
DECAYS on the next commit to that working copy from anywhere, and on any further archive placement; the Architect places no further file in `Claude_Duzenli_Arsiv/` until this card closes, this card's own file in S129/ being the last placement before the freeze line.
ON-DISAGREEMENT: if `git rev-parse HEAD` differs from CLAIMS, or any sha256 differs, or anything is staged, or any tracked file shows as modified, do NOT commit and do NOT push — print what you read and file on the fallback channel in ORDER F; a push of a tree the card never measured is a push nobody reviewed.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the archive working copy's HEAD and its upstream are BOTH `84a67f1aa6e54ede2a7626a13ea99fc67ba28546`, zero ahead, zero behind | MEASURED: git rev-parse HEAD and git rev-parse @{u} at 2026-09-02T22:16:52Z, both returning the where-fence sha; git rev-list --left-right --count @{u}...HEAD returned 0 0 | where |
| exactly eight archive files are untracked-and-intended, and they are the eight NAMED in the fence with the digests beside them | MEASURED: sha256sum over the eight named paths on the bridge shell at 2026-09-02T22:16:52Z, taken from each archive file at authoring time | files |
| NOTHING IS STAGED AND NO TRACKED FILE IS MODIFIED | MEASURED: git diff --cached --name-only at 2026-09-02T22:16:52Z returning empty, and git status --porcelain -uall showing only `??` lines | where |
| the nine remaining untracked lines on a Linux lens are NFD phantoms of files tracked under NFC, and are NOT staged by this card | MEASURED: git status --porcelain -uall at 2026-09-02T22:16:52Z returning seventeen untracked lines, which minus the eight named files leaves exactly these nine; git ls-tree -r --name-only HEAD resolves each to a tracked NFC path | phantoms |
| seven lock-shaped remnants sit in .git/, all HEAD.lock, and this card removes NONE of them; no live index.lock existed at the read | MEASURED: ls .git/ at 2026-09-02T22:16:52Z enumerating all seven, and ls -l .git/index.lock returning No such file or directory | locks |
| no scout verdict exists for this card, and the bypass is named in the dispatch record | MEASURED: select id, direction, lane_addr, artifact_name, created_at from relay_inbox order by created_at desc limit 15 — run at 2026-09-02T22:0xZ, whose newest row is dated 2026-08-30T04:33:20.070331Z | bus |
| whether your shell reads REACH and CREDENTIAL as present | NOT-READ | the REQUIRES block; both readings are yours and are the deliverable whichever way they go |

```evidence:bus
$ select direction, lane_addr, artifact_name, created_at
  from relay_inbox order by created_at desc limit 15;   -- run 2026-09-02T22:0xZ
newest row:
  from_lane  operator  LANE-CLOSE-S128-AG5-report   created_at 2026-08-30 04:33:20.070331+00
newest to_lane row:
  to_lane    AG-5      CARD-LANE-CLOSE-S128-AG5-v1  created_at 2026-08-30 04:25:32.616040+00
Nothing later than the first line exists in either direction, so no row has been written in the
three days since; the newest to_lane row is the card that CLOSED the AG-5 window, and no window
of either kind is open. The bypass named in the SCOUT block stands on this reading, and is
recorded in S129-DISPATCH-RECORD-1. Row ids are deliberately omitted here: a uuid's hex segments
fall inside the anchored-prefix band and this fence is anchored (CP-8). consumed_at is RETIRED as
a freshness signal and is not read by this card; the box is read by created_at.
```

```evidence:where
path  /Users/tunckahveci/Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra - DDocuments
      (in a bridge shell this is $HOME/mnt/2026 - Yapra - DDocuments)
remote origin  https://github.com/maymun207/2026-Yapra-DDocuments.git
branch main, upstream origin/main
HEAD == upstream == 84a67f1aa6e54ede2a7626a13ea99fc67ba28546
```

```evidence:files
All paths relative to Claude_Duzenli_Arsiv/ in that working copy. Verify each with sha256sum
before staging anything. Each value was taken from the archive file itself at authoring time.

583644899b3726d7f1daa0b737e9d4998b5af2ea7ab081c44632d1c11134e1ff  S128/CARD-LANE-CLOSE-S128-AG5-v1.md
9fa580cd103ed1f54a888c226273e52d0fb5ef7d0955191e00f32b815ab6f6ad  S128/CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v129.md
9199c73d5772059adfd9c41d9861b5c274a095e13b1757f3324f7da395e6c50b  S128/CWF-S128-SESSION-CLOSE-v1.md
98717b5885f48e050826bb75b367f181738022e750825404bd94a31cac6e3a97  S128/OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1.md
c93b1481a16c878747811f7e773092348ccc5b862a892ccef793de03fe0be6d3  S128/OWNER-RULING-S128-WINDOW-REFRESH-1.md
548b5d2ca73da8097aa08eab75b667bd18161c7c5103c0a537866e1cec59365f  S128/S128-DISPATCH-RECORD-1.md
a0de32e361ada8fce430006b54426629da810cafd9502185706bf6c0e06d3701  S129/CWF-S129-OPEN-MEASUREMENT-v1.md
552a3bd7280df12f802af4bcff12079c07d7c5079ccf2217b0572b6cefacc04a  S129/OWNER-RULING-S129-ARCHIVE-FIRST-1.md

THE SIX S128 FILES ARE TRANSCRIPTIONS, AND THAT IS SAID HERE RATHER THAN HIDDEN. Three of them
(CWF-S128-SESSION-CLOSE-v1.md, CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v129.md,
S128-DISPATCH-RECORD-1.md) were placed in S129 by retyping the project-box originals, because the
project box exposes no digest surface and byte-identity with it CANNOT be proven from either side
(F-S129-PROJECT-BOX-HAS-NO-DIGEST-SURFACE-1). The digests above are therefore digests OF THE
ARCHIVE FILES, which is what this card pushes and what every later reader will read. The other
three S128 files were placed at the S128 close and were untouched this session. The two S129
files were authored into the archive first and have no other origin.
```

```evidence:locks
Lock-shaped remnants in .git/ — SEVEN in all, every one a HEAD.lock, every one DELIBERATELY
UNTOUCHED by this card. They block no index write. THIS CARD DELETES NOTHING; an unordered
deletion is exactly what this fence exists to prevent:
  HEAD.lock.STALE-S121
  HEAD.lock.STALE-S121-091033
  HEAD.lock.STALE-S121-093144
  HEAD.lock.STALE-S121-094642
  HEAD.lock.STALE-S121-100611
  HEAD.lock.STALE-S121-101651
  HEAD.lock.STALE-S121-104354

No live .git/index.lock existed at the premise read. Discipline if one exists when you arrive,
inherited from ARCHIVE-PUSH-S124-1: read the holder with lsof; a lock no process holds is stale
and is removed WITH ITS NAME PRINTED; a lock a process holds is a STOP, and the process is named
in the report instead.
```

```evidence:phantoms
The nine untracked lines a Linux lens shows beyond the eight. Each is an NFD spelling of a path
tracked at HEAD under NFC (F-S125-NFD-LENS-1). Proof, per path: `git ls-tree -r --name-only HEAD`
contains the same path in NFC. They are files ALREADY ON THE REMOTE. You do not stage them, and
on a macOS shell you will not even see them:
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

FIRST, read your own box fresh, DIRECTLY by `created_at` — not through a poller's anchor. A row
addressed to you newer than this card is a STOP until you have acted on it. This card pushes to a
shared remote twice, so it carries the fresh-box clause even though it deletes nothing.
Then, after the REQUIRES probes: read `git rev-parse HEAD` against CLAIMS; run `sha256sum` over
the eight paths and compare every value to the `files` fence; run the BEFORE half of the
invariant — `git diff --cached --name-only` must be EMPTY and `git status --porcelain -uall` must
show ONLY `??` lines. Any mismatch is the ON-DISAGREEMENT arm. Print all four readings.

## ORDER B — THE LOCKS: READ, NAME, REMOVE NOTHING

Print `ls .git/` and confirm the seven HEAD.lock remnants named in the `locks` fence. Remove none
of them. If a live `.git/index.lock` exists, apply the lsof discipline from the fence before
anything else. Nothing in `.git/` is touched by this card.

## ORDER C — STAGE BY NAME, COMMIT ONCE, PUSH

Stage the eight paths BY NAME — eight `git add` invocations, or one with eight explicit paths.
`git add -A`, `git add .` and every pathless form are forbidden throughout this card. Then `git
diff --cached --name-only` must list EXACTLY the eight; a ninth line or a missing line is a STOP.
Write the commit message from the `message` fence to a file OUTSIDE the working copy with your
editor tool and commit with `git commit -F <that path>` — never `-m`. Then `git push origin main`.

```message
CARD-ARCHIVE-PUSH-S129-1: land the six S128 stragglers and the two S129 artefacts

Eight files, staged by name, none previously tracked. Six are S128's, including
OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1 itself, which was written at the S128 close
and never landed - the state that ruling exists to abolish, found by its own
arm-2 open measurement one session later. Two are S129's, authored directly into
the archive under OWNER-RULING-S129-ARCHIVE-FIRST-1, which reverses the direction:
the archive is where a durable artefact is written first and where its digest is
taken, and the project box is the derived copy. The nine NFD-spelled untracked
lines a Linux lens shows are phantoms of files already tracked under NFC
(F-S125-NFD-LENS-1) and are deliberately untouched.
```

## ORDER D — REPORT WHAT THE REMOTE SAYS, NOT THAT YOU RAN IT

Print the push's own output, then re-read the remote: `git ls-remote origin refs/heads/main`.
**The report is that second reading** — `S63-1`: a push's exit code is not evidence. The remote
value must equal your new commit's sha, and both appear in the report in full.

## ORDER E — THE REPORT, AND THIS CARD, IN A SECOND COMMIT

Write `Claude_Duzenli_Arsiv/S129/ARCHIVE-PUSH-S129-1-AG5-report.md` in that working copy AFTER
the push has been read back. It carries: both REQUIRES readings, the fresh-box reading, the four
verification readings, the lock enumeration, the staged-list check, the commit sha, the push
output, and the ls-remote reading. Stage BY NAME exactly two paths — the report and this card's
file sitting beside it in S129/ — commit with a message naming this card, push again, and read
the remote back a second time.

## ORDER F — THE CHANNEL THAT SURVIVES A NO, OR A HALF

On CREDENTIAL ABSENT: write the same report file, **leave it UNTRACKED, commit nothing**, and say
in it that the remote was never reached. On REACH ABSENT: report on the bus, `from_lane`,
artifact name `ARCHIVE-PUSH-S129-1-AG5-report`, carrying both probe readings. ON A SECOND-PUSH
FAILURE after a FIRST push that succeeded: file the bus row anyway, carrying the first push's
ls-remote reading — a landed commit is never left unexplained. Either way, file the bus row that
closes this card.

## THE CREDENTIAL RULE, STATED POSITIVELY

**Push only with the credential your shell already presents for this remote, exactly as
configured.** Any step whose purpose is to obtain, install, substitute or delegate one is outside
this card — installing a credential helper, running a setup command, a second remote, another
clone, another window, or the owner's hands. If your CREDENTIAL probe reads ABSENT, the absence
is the report.

## FALSIFIER

This card is wrong if HEAD differs from CLAIMS, if any of the eight sha256 values differs, if
anything is staged or any tracked file modified before you start, or if the staged list is not
exactly the eight. Test all four before you touch the remote and report what you found. Second
arm: **a push reported by its own exit code is a push reported by nobody** — no ls-remote reading
in the report, no done.

## SHARED SURFACES

One: the `main` branch of the archive remote. You touch no other file in that working copy beyond
the eight, the report, and this card's file; no file in `cwf_yaprak`; no gate, no governed row,
no migration, no git configuration anywhere. There are NO deletions in this card. It spends
nothing — no CI run, no deployment, no model call beyond your own.

## DECISION RIGHTS

OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1 arm 2 orders that an unpushed archive file found at a
session open has its cure dispatched THE SAME SESSION WITHOUT WAITING FOR THE OWNER; that ruling
is this card's authority and no further consent was sought. The Architect decides that these
eight files go up and is answerable for their content. **You decide nothing about the content and
everything about whether the world matches this card well enough to push.** A named refusal
closes this card as completely as a push does.

BODIES: `PLATINUM` · `S102-YASA-1` · `S63-1` · `TOTAL-45` · `DERIVED-NEVER-SOURCE` ·
`empty ≠ zero` (eight and seventeen are both true counts of one tree — the lens is named, never
averaged).

fanout: personalized

```deliverables
branch: main
report: Claude_Duzenli_Arsiv/S129/ARCHIVE-PUSH-S129-1-AG5-report.md
```

TAIL ANCHOR: CARD-ARCHIVE-PUSH-S129-1-v1 ends here.
