# ARCHIVE-PUSH-S129-1 — report

Card: `CARD-ARCHIVE-PUSH-S129-1-v1`
Read at: `created_at=2026-09-02 22:52:48.837669+00`, `id=c9801b70-9617-49f3-be1c-0790bea51911`,
`body_md5=3a89edd1c70d6418cac4e376b0c2712f`, `length=18350`, `[DIGEST-OK]` — the reader
recomputed the digest locally over the bytes it received and it matched the row's.

Executed by lane **AG-4**, address won from the git server by the claim walk
(`* [new branch]` plus a ref reading back the nonce `e5a6ab968e3538d1be17c05657f4b1a7e4bcb047`).

## A NAMING DISCREPANCY, RECORDED RATHER THAN RESOLVED

This card was addressed to `AG-4` on the bus, and `AG-4` is the address this window holds. The
card names its report `ARCHIVE-PUSH-S129-1-**AG5**-report.md` in three places — ORDER E, the
`deliverables` fence, and the ORDER F bus artifact name. The lane letter in the filename is
therefore wrong for the window that executed it.

The card's path is used VERBATIM anyway, because three consistent occurrences make it the name
the Architect will look for, and a deliverable renamed by its executor is a deliverable nobody
finds. The card is authority and it is not a premise: the mismatch is named here, and the
correction belongs to the Architect, not to this lane. Probable origin is inheritance from
`CARD-ARCHIVE-PUSH-S128-1-v2`, which the card itself says this one takes its shape from and
which was dispatched to AG-5.

## REQUIRES — BOTH PROBES, BOTH READINGS

**REACH · PRESENT.**

    $ git -C "<where-fence path>" rev-parse HEAD
    84a67f1aa6e54ede2a7626a13ea99fc67ba28546

**CREDENTIAL · PRESENT.**

    $ git -C "<where-fence path>" push --dry-run origin main
    Everything up-to-date

No username, password or token was requested, and no setup step was taken, attempted or
considered. The credential is the one the shell already presented for this remote. The
`Everything up-to-date` reading independently corroborates the CLAIMS row asserting zero ahead
and zero behind at the premise read.

## ORDER A — FRESH BOX, THEN THE FOUR VERIFICATIONS

**Fresh box — NOT a stop.** Read directly against the lane's own claim boundary
(`consumed_at IS NULL` above `2026-09-02 22:35:23.580772+00`), not through a poller's remembered
anchor:

    1 row for AG-4 across 1 page -- HEAD REACHED
    head reached at created_at=2026-09-02 22:52:48.837669+00

The single row is this card itself. Nothing addressed to this lane is newer than it.

**1 · HEAD against CLAIMS — MATCH.** `84a67f1aa6e54ede2a7626a13ea99fc67ba28546`, equal to the
`where` fence and to the CLAIMS row.

**2 · sha256 over the eight paths — ALL EIGHT MATCH the `files` fence.** Taken with
`shasum -a 256`, the macOS spelling of the fence's `sha256sum`; the algorithm is the same and the
tool is named here rather than silently substituted.

    583644899b3726d7f1daa0b737e9d4998b5af2ea7ab081c44632d1c11134e1ff  S128/CARD-LANE-CLOSE-S128-AG5-v1.md
    9fa580cd103ed1f54a888c226273e52d0fb5ef7d0955191e00f32b815ab6f6ad  S128/CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v129.md
    9199c73d5772059adfd9c41d9861b5c274a095e13b1757f3324f7da395e6c50b  S128/CWF-S128-SESSION-CLOSE-v1.md
    98717b5885f48e050826bb75b367f181738022e750825404bd94a31cac6e3a97  S128/OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1.md
    c93b1481a16c878747811f7e773092348ccc5b862a892ccef793de03fe0be6d3  S128/OWNER-RULING-S128-WINDOW-REFRESH-1.md
    548b5d2ca73da8097aa08eab75b667bd18161c7c5103c0a537866e1cec59365f  S128/S128-DISPATCH-RECORD-1.md
    a0de32e361ada8fce430006b54426629da810cafd9502185706bf6c0e06d3701  S129/CWF-S129-OPEN-MEASUREMENT-v1.md
    552a3bd7280df12f802af4bcff12079c07d7c5079ccf2217b0572b6cefacc04a  S129/OWNER-RULING-S129-ARCHIVE-FIRST-1.md

**3 · `git diff --cached --name-only` — EMPTY.** Nothing staged before this card touched anything.

**4 · `git status --porcelain -uall` — NINE lines, every one `??`.** No tracked file modified.

    ?? Claude_Duzenli_Arsiv/S128/CARD-LANE-CLOSE-S128-AG5-v1.md
    ?? Claude_Duzenli_Arsiv/S128/CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v129.md
    ?? Claude_Duzenli_Arsiv/S128/CWF-S128-SESSION-CLOSE-v1.md
    ?? Claude_Duzenli_Arsiv/S128/OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1.md
    ?? Claude_Duzenli_Arsiv/S128/OWNER-RULING-S128-WINDOW-REFRESH-1.md
    ?? Claude_Duzenli_Arsiv/S128/S128-DISPATCH-RECORD-1.md
    ?? Claude_Duzenli_Arsiv/S129/CARD-ARCHIVE-PUSH-S129-1-v1.md
    ?? Claude_Duzenli_Arsiv/S129/CWF-S129-OPEN-MEASUREMENT-v1.md
    ?? Claude_Duzenli_Arsiv/S129/OWNER-RULING-S129-ARCHIVE-FIRST-1.md

Nine, and the card predicted nine on this lens: the eight named files plus the card's own file in
`S129/`. The nine NFD phantoms named in the `phantoms` fence do not appear, because this is a
macOS NFC lens — the outcome the fence predicted, not a disagreement with it. Seventeen on a
Linux lens and nine here are both true counts of one tree; the lens is named rather than
averaged. No archive filename outside the card's enumeration appeared, and no status line was
anything but `??`.

## ORDER B — THE LOCKS: READ, NAMED, NONE REMOVED

`ls .git/` returned SEVEN lock-shaped remnants, all `HEAD.lock`, exactly the seven named in the
`locks` fence and no others:

    HEAD.lock.STALE-S121
    HEAD.lock.STALE-S121-091033
    HEAD.lock.STALE-S121-093144
    HEAD.lock.STALE-S121-094642
    HEAD.lock.STALE-S121-100611
    HEAD.lock.STALE-S121-101651
    HEAD.lock.STALE-S121-104354

**NONE was removed.** No deletion of any kind was performed by this card.

    $ ls -l .git/index.lock
    ls: .../.git/index.lock: No such file or directory

No live index lock existed, so the `lsof` discipline did not engage.

## ORDER C — STAGED BY NAME, COMMITTED ONCE

Staged with ONE `git add` carrying eight explicit paths. No `git add -A`, no `git add .`, no
pathless form at any point in this card.

`git diff --cached --name-only` after staging listed EXACTLY the eight:

    Claude_Duzenli_Arsiv/S128/CARD-LANE-CLOSE-S128-AG5-v1.md
    Claude_Duzenli_Arsiv/S128/CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v129.md
    Claude_Duzenli_Arsiv/S128/CWF-S128-SESSION-CLOSE-v1.md
    Claude_Duzenli_Arsiv/S128/OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1.md
    Claude_Duzenli_Arsiv/S128/OWNER-RULING-S128-WINDOW-REFRESH-1.md
    Claude_Duzenli_Arsiv/S128/S128-DISPATCH-RECORD-1.md
    Claude_Duzenli_Arsiv/S129/CWF-S129-OPEN-MEASUREMENT-v1.md
    Claude_Duzenli_Arsiv/S129/OWNER-RULING-S129-ARCHIVE-FIRST-1.md

No ninth line, no missing line. The card's own file was deliberately left unstaged for the second
commit.

The message was written from the `message` fence to a file OUTSIDE the working copy with an
editor tool and committed with `git commit -F <path>`; `-m` was not used.

**ONE DEVIATION FROM THE FENCE'S BYTES, NAMED HERE.** A single trailer line,
`Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>`, was appended below the
fence's text under the executing environment's standing attribution instruction. Nothing in the
fence was altered, reordered or removed. It is recorded rather than left for a later reader to
discover in a diff.

Commit result:

    [main 2334acd] CARD-ARCHIVE-PUSH-S129-1: land the six S128 stragglers and the two S129 artefacts
     8 files changed, 796 insertions(+)

All eight entries were `create mode 100644` — none was previously tracked, as the card claimed.

**Commit sha (full 40 hex): `2334acdfba8288c3523f1ae7a2568ad9146279f4`**

## ORDER D — WHAT THE REMOTE SAYS

Push output:

    To https://github.com/maymun207/2026-Yapra-DDocuments.git
       84a67f1..2334acd  main -> main

The remote, re-read afterwards — this reading, not the exit code, is the report:

    $ git ls-remote origin refs/heads/main
    2334acdfba8288c3523f1ae7a2568ad9146279f4	refs/heads/main

The remote value equals the new commit sha in full. `S63-1` satisfied: the push is reported by
the remote's own answer, not by its exit status.

## SCOPE HELD

No file in the archive working copy was touched beyond the eight, this report, and the card's own
file in `S129/`. No file in `cwf_yaprak` was touched. No gate, no governed row, no migration, no
git configuration anywhere. No deletion of any kind. No CI run, no deployment, no credential
obtained, installed, substituted or delegated.
