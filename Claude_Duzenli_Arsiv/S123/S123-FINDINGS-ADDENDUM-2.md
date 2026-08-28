# S123 · FINDINGS ADDENDUM 2 — the review round paid for itself, twice

MINTED 2026-08-28T13:50Z. Every line is a MEASUREMENT taken this session unless it says otherwise.
This addendum exists because two Architect defects were caught by machinery rather than by the
Architect, and both belong in the record under `F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1`.

## 1 · WHAT WAS DISPATCHED

| row | artifact | address | bytes | md5 of body |
|---|---|---|---|---|
| c1bf9270 | `SCOUT-CARD-REVIEW-16-v1` | scout | 17915 | `67c603ca3701309e08695f2501bb0181` |
| 04e6df8a | `SCOUT-CARD-REVIEW-17-v1` | scout | 15736 | `bdeed85af8287711650c51887522d7df` |
| 736a38d3 | `SCOUT-CARD-REVIEW-18-v1` | scout | 26249 | `09aa7759544905988c517135c46060f7` |

In every case the stored `md5(body)` equals the md5 of the file `cardPreflight --check` actually read.
The reviewed bytes, the preflighted bytes and the dispatched bytes are one object, and the quote
prefix was applied by the database rather than by hand. `A-REC-S123-1` is holding.

## 2 · `F-S123-14` · A CARD WAS BORN STALE, AND THE GAP WAS THIRTEEN MINUTES

`GO-LANDING-S123-2-v2` read its premise at **13:20:42Z**. The build lane pushed a merge-forward to
`phase/a23-ask-shape-build-1` at **13:23:22Z**. The card reached the bus at **13:33:42Z**.

**No window could ever have confirmed it.** All three replies returned RED on the falsifier's first
arm, on the branch ref, and two of them refused to judge the delta at all, exactly as
ON-DISAGREEMENT ordered.

The defect is not the staleness — refs move, that is the world working. The defect is that the
Architect measured, then spent thirteen minutes building, then dispatched **without re-reading the
refs at the moment of dispatch**. That gap cannot be closed to zero, and closing it with a human
relay is forbidden by `S102-YASA-1`. The question of what belongs in that gap is now ORDER B of
round 18.

## 3 · `F-S123-15` · THE DECAY CLAUSE WATCHED THE WRONG REF

Named by a scout window and confirmed here. `v2`'s `DECAYS` clause read "on the next push to master".
The ref that has moved under this card is the **BRANCH**, twice, both times because the build lane
was doing correct work. **A card whose decay clause watches the wrong ref cannot announce its own
expiry.** `v3` names the branch first.

The same window noted the second half: two PREMISE sentences survived the re-cut untouched, in the
future tense, about a sibling landing that had already finished. **A re-cut changes what changed;
nothing checks what stayed.** That is the hole the round-18 mechanism closes.

## 4 · `F-S123-16` · THE ARCHITECT'S OWN CORRECTION WAS THE SAME CLASS OF ERROR

Round 16 carried a correction: that round 15's "three windows GREEN" was really three replies from
two labels. **That correction was itself wrong, in the opposite direction.**

MEASURED, by a join of `relay_inbox` on `reply_to` — the durable key:

```
SCOUT-CARD-REVIEW-15-report-W1     2026-08-28T13:01:01Z   3569 bytes
SCOUT-CARD-REVIEW-15-report-W1     2026-08-28T13:01:39Z   3852 bytes
SCOUT-CARD-REVIEW-15-REPLY-W2-v1   2026-08-28T13:02:20Z   4624 bytes
```

All three carry the same `reply_to`. One window attests that only the middle row is its own — an
attestation, recorded as attestation, never as measurement. **Counting by LABEL would have collapsed
three readings into two.** The Architect's round-16 instruction to count by label is WITHDRAWN.

The first sweep was keyed on `artifact_name`, and that is what misled: **windows choose their own
names, so a name-keyed census of this bus under-reports without saying that it did.** Same shape as
the PostgREST 1000-row silent truncation the truth laws already name.

## 5 · THE MECHANISM ADOPTED, AND WHAT IT COST

All three replies converged independently on the same remedy for re-cuts: make "nothing else changed"
mechanical. The split now in force, because a card cannot hash the diff between itself and a version
that does not yet exist:

- the **CANDIDATE** carries an `evidence:supersedes` fence: its predecessor's recovered digest, and
  one line per difference naming the measured fact that forced it.
- the **REVIEW CARD** carries the diff digest and the exact command that reproduces it, with `diff -u
  --label v2 --label v3` so the header lines carry no path and no mtime and the output is
  reproducible byte for byte.

For `v2` → `v3`: 14056 bytes, sha1 `e9a1da2ca60d3e11552cf4e63f00ad1069a781da`, eight hunks. **A hunk
that maps to no line of the `supersedes` fence is a silent edit and it is a RED.** This survives a
moved ref, because it compares two texts and not the world — which is precisely what round 16 lost.

**This is a mechanism change and P-6 is open.** It is confined to the shape of cards the Architect
writes; it lands in no gate, no rule file and no repository artifact, and it is recorded here so the
GATE-1 decision about making it structural is taken with the evidence in hand rather than from memory.

## 6 · TWO GRAMMAR FINDINGS FROM THE GATE ITSELF

`F-S123-17` · **CP-3's implemented vocabulary is narrower than the prose describes.** A PREMISE line
is accepted on `MEASURED:` · `UNMEASURED` · `SELF-INVALIDATION` · `ON-DISAGREEMENT` · `DECAYS`.
`RELAYED:` is legal in a CLAIMS basis column and is REFUSED in a premise. Same class as `F-S123-7`:
a vocabulary word that is legal in one slot and not another, where the card author expects one
vocabulary.

`F-S123-18` · **CP-2 fires on a version number adjacent to a counted noun.** Its regex is
`\b(two|…|\d+)\s+(cards?|rows?|…)\b`, so the phrase "round-16 card row" reads as "16 cards" and is
refused. Harmless to work around, worth recording: a trip-wire that fires on ordinary prose is on the
path to being ignored, which is the failure CP-2's own basis note says its first draft committed.

## 7 · STATE AT THIS INSTANT

```
master   8a19fe8a049338c4b22ae6f798b0c98c0ca062e3
branch   a6f34f290f8cb87c6caca4c090d05d0b9761d522   ZERO behind, FOUR ahead, master IS an ancestor
         newest commit: "Merge origin/master into phase/a23-ask-shape-build-1, and reseal in the
         SAME commit" — the lane performed ORDER A's merge itself
rehearsal at that head: npm run typecheck:api exit 0; the two named test files, 2 files 57 tests, exit 0
in flight: SCOUT-CARD-REVIEW-17 (archive push) and SCOUT-CARD-REVIEW-18 (the landing, v3)
archive working copy: HELD at c5cc031, two commits unpushed, deliberately FROZEN — a third commit
         would falsify the archive card's own CLAIMS, which is the defect this addendum is about
```

TAIL ANCHOR: S123-FINDINGS-ADDENDUM-2 ends here.
