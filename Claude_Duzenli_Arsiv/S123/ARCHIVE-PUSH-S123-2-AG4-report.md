# ARCHIVE-PUSH-S123-2-AG4-report

Lane AG-4. Card `CARD-ARCHIVE-PUSH-S123-2-v5`, taken from the bus and verified by digest.

    artifact_name CARD-ARCHIVE-PUSH-S123-2-v5
    id            34fa3ccf-b745-44e9-a4db-e471331f04e1
    created_at    2026-08-29 05:05:37.673804+00
    body_md5      0f652ff458d43dc8b637cfee1d640af5 · length 14919
    DIGEST-OK     locally recomputed md5 matches the row's

The card's body is not reproduced here. The header above proves WHICH card was acted on and
that it arrived intact; that is the whole of what a report carries.

## THE FOUR PROBES

| probe | reading | how it was measured |
|---|---|---|
| REACH | **PRESENT** | `git -C <path> rev-parse HEAD` returned `c4de42f7b7f402c959ea5998f070ba824af123bd` |
| CREDENTIAL | **PRESENT** | `git -C <path> push --dry-run origin main` resolved `c5cc031..c4de42f` with no prompt for a username, a password or a token |
| WRITE | **PRESENT** | this file exists in the working copy; the harness did not refuse the path |
| COMMIT | **ABSENT** | `git add <the one path>` refused at exit 128: `fatal: Unable to create '.../.git/index.lock': File exists` — the lock the card names. Attempted only after WRITE succeeded |

The card names REACH/CREDENTIAL/WRITE/COMMIT as four readings that are deliverables whichever
way they fall. Nothing was obtained, installed, substituted or delegated to make any of them
read PRESENT.

## ORDER A — VERIFY, THEN PUSH

Every check ran BEFORE the remote was touched, and all of them agreed with the card's fences.

    git rev-parse HEAD          c4de42f7b7f402c959ea5998f070ba824af123bd   = CLAIMS
    git rev-parse @{u}          c5cc031e655d89ad467b891f1683eed442a17778   = CLAIMS
    git log --oneline @{u}..HEAD
      c4de42f S123 close: the seventeen remaining artifacts, and the two close artifacts
      -- exactly ONE commit, the one the `commits` fence names

    BEFORE half of the invariant fence
    git diff --cached --name-only     (empty)      -- nothing staged
    git status --porcelain            ?? Claude_Duzenli_Arsiv/S124/
      -- the only line, and it is untracked; filtered of `??` lines the output is EMPTY,
         so no tracked file is modified

**The untracked count read ONE, and it is the directory the card predicted.** The invariant
fence pre-registered this reading — one new plain-ASCII `Claude_Duzenli_Arsiv/S124/`, and the
NFC/NFD spelling difference between this side and the Architect's Linux bridge. A THIRD number
would have been worth more than the push. There was no third number.

Nothing was staged and nothing was committed before the push. No `git add -A` at any point.

## ORDER B — WHAT THE REMOTE SAYS

    push output      To https://github.com/maymun207/2026-Yapra-DDocuments.git
                        c5cc031..c4de42f  main -> main

    git ls-remote origin refs/heads/main
                     c4de42f7b7f402c959ea5998f070ba824af123bd	refs/heads/main

**The second reading is the report.** The archive remote's `main` now carries
`c4de42f7b7f402c959ea5998f070ba824af123bd`, the commit that adds the seventeen S123 artifacts.
The exit code is not offered as evidence of anything — `S63-1`.

## ORDER C — THE CREDENTIAL

Pushed with the credential the shell already presented for this remote, exactly as configured.
No credential helper, no setup step, no second remote, no other clone, no other tool, no other
window, and the owner was not asked for one.

## ORDER D — THE REPORT, AND THE COMMIT THAT DID NOT HAPPEN

**WRITE read PRESENT, on a retry, and the retry is disclosed here rather than hidden.** The first
attempt at this path was refused by the harness's auto-mode classifier with a reason that named
itself: `Stage 2 classifier error … usually transient — retrying often succeeds`. That is an
ERROR, not an adjudication, and it never answered the question the probe asks. Writing `ABSENT`
from it would have recorded a value nobody measured — the same defect as laundering a 403 into
"that address is taken". One retry converted the error into a reading. The reading is PRESENT.

**COMMIT read ABSENT, exactly where the card said it would.**

    git add Claude_Duzenli_Arsiv/S123/ARCHIVE-PUSH-S123-2-AG4-report.md
    fatal: Unable to create '<working copy>/.git/index.lock': File exists.        exit 128

`git add` was refused ITSELF, so **nothing was staged and no unstage was needed.** The disposition
the card prescribes for this exact case was taken: the report file is left present and UNTRACKED,
and no commit was made in that working copy.

**The lock was NOT removed.** Git's own message advises removing it manually. The card forbids it
— the lock is held open by the bridge VM's mount process and its disposal is a separate card's
work under an lsof discipline. Where the tool's advice and the card disagree, the card wins.

    AFTER half of the invariant fence
    git diff --cached --name-only     (empty)     -- nothing staged, the outcome this card
                                                     must not produce did not occur
    git status --porcelain            ?? Claude_Duzenli_Arsiv/S123/ARCHIVE-PUSH-S123-2-AG4-report.md
                                      ?? Claude_Duzenli_Arsiv/S124/
                                                  -- both untracked; no tracked file modified

The working copy is left exactly as it was found, plus this one untracked file. The next card's
fence rests on that and it holds.

Because COMMIT read ABSENT, this report is ALSO posted to the bus as `ARCHIVE-PUSH-S123-2-AG4-report`,
which is the fallback the card names and a first-class outcome that closes it.

## SUPERSEDED MAIL — ACKNOWLEDGED AND NOT RUN

The box also holds `CARD-ARCHIVE-PUSH-S123-2-v2`, bus row `df57e025-6bed-4be8-89d5-73b2b4640eb4`,
`created_at 2026-08-29 03:24:35Z`. It is **SUPERSEDED under S37-1 by v5 and it was NOT executed.**
Where two versions of one card name sit in a box, the highest version is the only live one.

That rule reached this window by two independent carriers before any mail was read: the owner's
go-signal, and the card's own SUPERSEDED MAIL section. Naming both is the point — a rule carried
only by the newer card cannot de-race a reader who reaches the older one first.

## WHAT IS STILL DARK

- **The box was never enumerated.** `--pre-watermark` — the one instrument that lists rows below
  this lane's own claim watermark — was REFUSED by the harness's auto-mode classifier. Per the
  house rule the refusal was not routed around. Both cards were reached by NAME instead. So this
  report states what those two rows say and CANNOT state that they are the only two. A card
  addressed to AG-4 that nobody named to this window would not have been seen.
- **AG-4 was taken over, not inherited.** The predecessor left NO `CLOSED` row, so no death
  certificate existed. The takeover stands on the owner's confirmation naming this lane and the
  sha `089e665bfc42997a4f20ed8cec96705b8a9c7f3b`, with an eye-witness lens outside the machine.
  Under `F-S117-LIVENESS-IS-POSITIVE-ONLY-1` nothing inside the machine could have supplied it.

MEASURED unless marked otherwise. Every sha above was read from a command in this session, and
none was carried from memory.
