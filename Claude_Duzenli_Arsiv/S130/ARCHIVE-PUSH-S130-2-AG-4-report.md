<!-- relay-audit: v1 kind=report -->
# ARCHIVE-PUSH-S130-2-AG-4-report — the 94 archive files are on origin, proven from the remote

Card: `CARD-ARCHIVE-PUSH-S130-2-v1`, read at `created_at=2026-09-06 02:15:21.545332+00`,
`body_md5=a28e63bac6b4819e0913dccab63a2cc0`, length=4643, `[DIGEST-OK]` — the digest was
recomputed locally over the received bytes and matched the row's.

Lane: AG-4, S131 producer window. This window took AG-4 under
`OWNER-RULING-S131-AG4-TAKEOVER-1` after a claim walk returned `NO-ADDRESS-FREE` with no
death certificate on any address; the owner supplied the human half of the certificate and
named the dead nonce.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the local archive commit, unpushed at ORDER A | MEASURED: `git rev-parse HEAD` in the documents repository, 2026-09-06T03:3xZ | commit |
| `origin/main` still at the old tip before the push | MEASURED: `git ls-remote origin refs/heads/main`, same window | history |
| the pushed tip, read back FROM THE REMOTE | MEASURED: `git ls-remote origin refs/heads/main` after ORDER B | remote |
| the commit's shape | MEASURED: `git show --stat --oneline HEAD` | shape |

```evidence:commit
c55903a3f1484a6c1164172e8187f21e91409c6a
```

```evidence:history
57948757ff71ee1d47ffd0071df3f20276762f48
```

```evidence:remote
c55903a3f1484a6c1164172e8187f21e91409c6a	refs/heads/main
```

```evidence:shape
94 files changed, 8486 insertions(+)
```

## ORDER A — READ FIRST

- `git rev-parse HEAD` = `c55903a3f1484a6c1164172e8187f21e91409c6a` — EQUALS the card's
  `commit` fence. ON-DISAGREEMENT does not fire on this clause.
- `git ls-remote origin refs/heads/main` = `57948757ff71ee1d47ffd0071df3f20276762f48` —
  EQUALS the card's `history` fence, and is NOT at or past the `commit` fence. Nobody had
  pushed; the push was genuinely owed. The STOP clause does not fire.
- `git show --stat --oneline HEAD` last line = `94 files changed, 8486 insertions(+)`,
  matching the card's PREMISE. Every path in the stat sits under
  `Claude_Duzenli_Arsiv/S129/` or `Claude_Duzenli_Arsiv/S130/`.
- `git status --porcelain -uall` = 6 untracked paths, and they divide in a way the card
  anticipated only partly:

      ?? Claude_Duzenli_Arsiv/S130/CARD-ARCHIVE-PUSH-S130-2-v1.md
      ?? Claude_Duzenli_Arsiv/S131/ARCHITECT-CARD-TEMPLATE-v2.md
      ?? Claude_Duzenli_Arsiv/S131/CARD-TRUNK-CI-VERDICTS-S130-1-v1.md
      ?? Claude_Duzenli_Arsiv/S131/OWNER-RULING-S131-AG4-TAKEOVER-1.md
      ?? Claude_Duzenli_Arsiv/S131/OWNER-RULING-S131-AG5-TAKEOVER-1.md
      ?? Claude_Duzenli_Arsiv/S131/S131-DISPATCH-RECORD-1.md

  The S130 path is this card's own archive copy — expected and IN SCOPE by the card's own
  words. **The five `S131/` paths are OUTSIDE the card's scope fence**, which names S129
  and S130 only, and the FALSIFIER makes the card wrong if any path outside those two
  directories enters the commit. They were left untracked and unstaged. This is a
  DISAGREEMENT with the card's expectation that ORDER A would find only S129/S130 paths;
  it is reported here rather than resolved, and it did not block the order.

  The nine `Projeler/` NFD phantoms the card's PREMISE recorded over the bridge did NOT
  appear in this window's direct read — corroborating the `not-mine` fence in
  `ARCHIVE-PUSH-S130-1-AG-4-report`.

## ORDER B — PUSH AND PROVE

    git push origin main
    To https://github.com/maymun207/2026-Yapra-DDocuments.git
       5794875..c55903a  main -> main

Read back FROM THE REMOTE, because S63-1 holds that the push's exit code is not evidence:

    git ls-remote origin refs/heads/main
    c55903a3f1484a6c1164172e8187f21e91409c6a	refs/heads/main

`origin/main` now equals local HEAD at the full forty hex. Two sessions of archive debt —
24 files under S129 and 70 under S130 — are on origin.

## ORDER C — REPORT, BESIDE THE PUSH

This file, plus `Claude_Duzenli_Arsiv/S130/CARD-ARCHIVE-PUSH-S130-2-v1.md`, staged BY PATH
and never with `git add .`. The five `S131/` paths were deliberately excluded per the
FALSIFIER. One commit naming this card, pushed, and read back from the remote a second
time; that second read-back is recorded in the commit that carries this file.

## FINDINGS — reported, not resolved

1. **The card grammar REFUSED this card.** `scripts/mail-wait.mjs` printed
   `[CARD-REFUSED] the card grammar refuses this card: CP-1, CP-2, CP-6, CP-9`, followed by
   `[CARD-GATE-DISARMED] CARD_GATE=REPORT, so this refusal is REPORTED and NOT acted on.`
   The lane proceeded into the card, as the disarmed gate directs. The four refusal codes
   are named here so the refusal is visible to a reader who never saw the tick.

2. **`consumed_at` is a done-marker, not a start signal.** `--read` leaves it unwritten and
   prints `[NOT-TAKEN]`. Per `OWNER-RULING-S131-AG4-TAKEOVER-1`, the two AG-4 cards gain
   `consumed_at` only AFTER their reports post. This window did not take delivery on
   receipt.

3. **The boot file's first-read form is refused by the current reader.**
   `.claude/boot/producer.md` prescribes
   `node scripts/mail-wait.mjs AG-N --once --since <iso>` as the window's first box read.
   The reader now REFUSES `--since` when the lane has a measured watermark, exit 2:
   `the flag is REFUSED rather than ignored: answering over one boundary while naming the
   other is the defect being repaired here`, and directs the caller to `--pre-watermark`.
   The boot file also still describes `consumed_at` as retired and "a signal in neither
   direction", while the reader's own header line now reads
   `reading consumed_at IS NULL above the lane's own claim`. The tree has moved past the
   boot file on both points. Reported for the Architect; no file was edited under this card.

4. **The at-anchor hazard was real in this window, and `--pre-watermark` is what caught
   it.** This lane's watermark is its own claim row, `2026-09-06 03:26:53.844168+00`. Both
   S130 cards were minted BELOW it (02:15 and 03:01). An ordinary `--once` poll reported
   `zero unconsumed rows above the watermark (read OK, cross-checked)` — correct, and
   completely blind to both cards. 103 unconsumed rows sit below the boundary.

## FALSIFIER — checked

- `origin/main` after ORDER B ≠ local HEAD → **NO**: both are
  `c55903a3f1484a6c1164172e8187f21e91409c6a`.
- a path outside `S129/` and `S130/` entered the commit → **NO**: staged by path; the five
  `S131/` paths were excluded deliberately.
- the report file is not in the second pushed commit → **NO**: this file is that commit's
  subject.

TAIL ANCHOR: ARCHIVE-PUSH-S130-2-AG-4-report ends here.
