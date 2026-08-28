# S123 · FINDINGS ADDENDUM 3 — the seventh key landed, and the review loop paid for itself six times

MINTED 2026-08-28T14:33Z. Every line is a MEASUREMENT taken this session unless it says otherwise.
Supersedes nothing; `S123-FINDINGS-ADDENDUM-2` stands and this continues it under `S37-1`.

## 1 · THE SEVENTH KEY LANDED

```evidence:landing
PR #479 · master 3aab649dfbab5360c52aab58db839d0905649fa6 · 2026-08-28 17:14:40 +0300
9 files, +1426 / −47 — exactly the nine paths GO-LANDING-S123-2-v4's files fence named
#29 / GI-101 · the A23 understanding layer · traces to TIER A · Gaia2
```

It is the second landing of the session; the honestbench scorer went in at `8a19fe8a` (PR #472).
Both were items the register had carried for eight sessions as "the real blocker, NOT BUILT".

**HOW IT WAS DISPATCHED, AND THIS IS THE PART WORTH KEEPING.** The card was not re-typed into the
bus. It was extracted SERVER-SIDE from the scout row that had reviewed it, and the insert was guarded
on `md5 = 4495b0e78d1b82463e7fb40dc3360fb0`. **The reviewed bytes, the preflighted bytes and the
dispatched bytes are one object by construction, not by comparison.** The same method dispatched the
archive card to AG-4 (`md5 04bea073…`, `sha256 42466d07dc97c409b78d11325a20d25e35205e48ca40d29754734854fb9b3958`).

## 2 · SIX ROUNDS, EIGHTEEN READINGS, TWO SILENT EDITS CAUGHT

| round | candidate | verdicts | what it found |
|---|---|---|---|
| 16 | landing v2 | 3 RED | the card was born stale — premise read 13:20:42Z, the lane pushed 13:23:22Z, the card posted 13:33:42Z |
| 17 | archive v1 | 3 RED | no capability probe; a credential blacklist missing a fifth route already installed; no channel for the "I cannot reach it" branch |
| 18 | landing v3 | 3 RED | the diff-digest instrument is not portable; the supersedes rule could never be satisfied; **a deleted `S63-1` gloss** |
| 19 | archive v2 | 2 RED | **a deleted CLAIMS row**, demoted to fence prose; the hunk COUNT itself differs between differs |
| 20 | landing v4 | 3 GREEN | dispatched to AG-5 → landed |
| 21 | archive v3 | 3 GREEN | the construction verified independently → dispatched to AG-4 → PUSHED |

**BOTH SILENT EDITS WERE FOUND BY THE SAME MECHANISM, AND BOTH TIMES THE AUTHOR HAD READ ITS OWN DIFF
FIRST.** That is the finding, not the two edits.

## 3 · `F-S123-19` · TWO INSTRUMENTS BROKE, AND BOTH MEASURED THE TOOL RATHER THAN THE THING

**`diff -u` is not one program.** Three windows on BSD/Apple diff rendered the same delta at a
different byte count from the Architect's GNU diff — and on the archive card their hunk COUNT differed
too, four against five, on inputs whose digests both matched. One window proved content-equivalence by
applying its own diff with `patch` and recovering the successor byte-identically. **The unit of a hunk
is a property of the differ, not of the two texts.** The diff digest is withdrawn, one round after it
was adopted.

**And in Postgres, `text::bytea` is NOT a byte-preserving cast.** It interprets backslash-octal escape
sequences, so hashing a card that contains the literal `\305\237` through that cast measures different
bytes. Measured both ways over the same value: `convert_to(t,'UTF8')` returns
`42466d07dc97c409b78d11325a20d25e35205e48ca40d29754734854fb9b3958`, matching the file; `t::bytea`
returns `c9a4ecdf01e6190fb37ff4526370706d4373542657a7cd6dc32d0cf2428946fc`. Same class, one hour apart.

## 4 · WHAT REPLACED THEM — AND IT IS A CONSTRUCTION, NOT A CLAIM

A re-cut now carries an `evidence:supersedes` fence: the predecessor's digest, a stated exemption for
the version stamp (a version bump always moves the title and the tail anchor, so a rule demanding a
measured cause for those can never be satisfied), and one line per difference naming what forced it.

**And on the archive card the Architect went further: `v3` was BUILT server-side from the `v2` bytes
the scouts had reviewed, by eight named substitutions and nothing else.** The output hashes to the
same digest as the Architect's local file. A change outside those eight could not have survived the
pipeline. "Nothing else changed" stopped being a claim a reviewer must audit and became a property of
how the artifact was made. Three windows verified it independently.

## 5 · `F-S123-20` · THE FOREMAN LANDS AND DOES NOT REPORT

```evidence:reports
git ls-tree -r --name-only origin/master docs/relay/ | grep -c 'GO-LANDING-S123'   -> 0
the only landing report added to master on 2026-08-28 is GO-LANDING-S122-1-AG5-report.md, at 08:57
two S123 landings went in after it — PR #472 at 16:01 and PR #479 at 17:14 — and neither filed one
```

Both S123 landing cards declared `report:` in their `deliverables` block. Under `busDelivery.ts`, a
card is ACTED **iff** a declared name exists on origin. **The trunk moved twice; the deliverable was
filed neither time, so by the gate's own reading both cards are NOT ACTED.** The S122 precedent shows
the lane can and normally does file. This is a lane finding and it is uncarded.

## 6 · ORDER C's TWO READINGS, TAKEN BY THE ARCHITECT SINCE THE LANE DID NOT FILE THEM

```evidence:corpus
Measured at master 3aab649dfbab5360c52aab58db839d0905649fa6, 2026-08-28T14:32Z.

ORPHAN                       4     (files=1397 sql=93 moduleLoad=252 symbolUse=238
                                    READ-OFF-TURN=15 READ-ON-TURN=37 READ-ONLY=2 INERT=2)
                                   unchanged from the session-open reading — the landing added none

provenance survey over docs/relay/, 308 files:
  governed 228 · ungoverned 80 · already-prov 57
  claim rows scanned 3575 · would-fail 1922 (53.8%)
  R-CLAIM-PROV 1824 · R-ABSENCE-LENS 532
  governed files with at least one failing row: 166 (72.8%)

the report this landing carried, on its own:
  PHASE-A23-ASK-SHAPE-BUILD-1-AG3-report.md — 1/14 claim rows would fail, one R-ABSENCE-LENS
```

**THE SURVEY IS A REPORT, NOT A GATE** — it returns 0 always. The 53.8% is a corpus-wide historical
figure and the landing did not move it; the landed report's own row is 1 in 14. Both numbers are
recorded as numbers rather than as an adjective, which is what ORDER C asked for.

## 7 · IDENTITY IS NOW A RECEIPT

Round 15's "three windows" was right; the Architect's round-16 "correction" to "two labels" was wrong;
its round-18 "at least two windows" was still short. Settled in round 18 and confirmed in 19 and 21 by
**server-issued row ids**, which a window cannot fabricate about itself: three windows replied to
round 15, two of which both label themselves `W1`. **Counting by label collapses three readings into
two; `reply_to` plus the receipt is the durable key.** A name-keyed census of this bus under-reports
without saying that it did — the same shape as the PostgREST 1000-row silent truncation.

## 8 · THE NINE-VERSUS-ZERO DISAGREEMENT, RESOLVED — AND BOTH READERS WERE RIGHT

```evidence:normalisation
index spelling,   raw bytes:  ba \305\237 la   ->  U+015F, precomposed, NFC
on-disk spelling, raw bytes:  ba s \314\247 la ->  s + U+0327 combining, NFD
core.precomposeunicode = true in that working copy
```

macOS git precomposes the NFD names it reads from the filesystem into NFC, they match the NFC index,
and status is clean — a window's ZERO. The Architect's Linux bridge shell has no precompose code path,
so the NFD directory entries read as untracked — the NINE. No DELETIONS appear on either side because
the mac filesystem's lookup is normalisation-insensitive, so the NFC index paths still resolve.
**Two readers, one HEAD, two counts, one cause, neither wrong** — `empty ≠ zero` at the filesystem.
AG-4 read ZERO on the same copy and named it as one of the two explained readings, not a third.

## 9 · STILL OWED, NAMED RATHER THAN CARRIED SILENTLY

- the two AG-3 gate findings handed back by the build lane: five reader sites the card named none of,
  and the whole-tree typecheck passing over `api/` files while proving nothing about them
- `F-S123-20`, the foreman's unfiled landing reports
- `F-S123-21`, a read-only diagnostic that rewrites a governed ledger as a side effect
- `F-S123-22`, the archive card's fallback keyed on REACH rather than on the WRITE
- the sweep's five CLOSED-BY-TREE closures (GI-006, GI-012, PI-007, PI-011, PI-014)
- the ARMES `apiKeyRef` card — the owner rotates the key itself; the literal is never pasted here
- the card for the test that dirties `docs/ground/authority-conformance.latest.md` on every run

TAIL ANCHOR: S123-FINDINGS-ADDENDUM-3 ends here.
