# S129 · DISPATCH RECORD 2 — the scout round, the third address error, and the card that closed

CUT 2026-09-02 ~23:0xZ. Continues S129-DISPATCH-RECORD-1 (append-only carrier; that record is not
edited). Written FIRST into the archive under OWNER-RULING-S129-ARCHIVE-FIRST-1.

## THE CHAIN, CONTINUED

7. **SCOUT VERDICT — RED, ON ADDRESSING ONLY; CONTENT CERTIFIED.** artifact_name
   `SCOUT-CARD-REVIEW-CARD-ARCHIVE-PUSH-S129-1-verdict`, from_lane, 2026-09-02T22:45:09.821428Z.
   The scout re-derived every falsifier on its own macOS lens: `cardPreflight --check` over the
   exact bytes GREEN 11/11 (instrument proven both ways first, 34 scenarios); HEAD matched CLAIMS;
   `shasum -a 256 -c` over all eight paths returned eight OK lines by machine comparison; the tree
   was clean with exactly nine `??` lines, the macOS complement the premise predicted; upstream
   `0 0`; the seven `HEAD.lock.STALE-S121*` remnants present and no `index.lock`. It also took a
   reading the card did not have: `GIT_TERMINAL_PROMPT=0 git ls-remote origin refs/heads/main`
   answered without a credential prompt from that machine, so REACH and a READ credential are
   present there — and it correctly refused to conclude anything about PUSH scope from a read.
8. **RE-ISSUED to AG-4** — 2026-09-02T22:52:48.837669Z, `body_bytes` 18350, body sha256
   `75f7f2b5dde772912cc3d2df1e8fa7865534b6aebde19dd1d28347b6714f40c5`, body md5
   `3a89edd1c70d6418cac4e376b0c2712f`. The md5 equals the one the scout printed for the object it
   reviewed, so the reviewed object and the dispatched object are the same bytes by measurement
   rather than by assertion. Copied row-to-row inside the database; no transcription.
9. **CLOSED.** Card consumed 2026-09-02T23:01:33.481964Z; report filed from_lane at
   23:01:20.807700Z. Both REQUIRES probes read PRESENT, including the `push --dry-run` the scout
   deliberately left to the executor. Commit 1 `2334acdfba8288c3523f1ae7a2568ad9146279f4` (the
   eight files); `git ls-remote origin refs/heads/main` read it back. Commit 2
   `57948757ff71ee1d47ffd0071df3f20276762f48` (the report and the card); a second `ls-remote` read
   that back. **Both pushes are reported by the remote's own answer, neither by an exit code.**
   Verified independently from the bridge afterwards: all eight paths TRACKED at HEAD, and their
   sha256 re-derived from the working tree equal to the card's `files` fence, all eight.

## §D · THE THIRD ADDRESS ERROR, AND WHERE THE ARCHITECT DISAGREES WITH ITS ADVERSARY

The scout's RED rests on two structural reasons: R1, a scout may not commit
(`.claude/boot/free.md`: *"You write nothing to the repository"*), so the card as addressed had no
lawful executor; R2, `scout` is not claimable — `scripts/laneRoster.mjs` carries
`LANE_ADDR = /^AG-[0-9]+$/` for CLAIMABLE and a separate `BOX_ADDR` for merely having a box, and
`mail-wait` prints `claimable=AG-1 AG-2 AG-3 AG-4 AG-5` with `scout` only in `readable`. It filed
this as the same class as A-REC-S129-2, repeated one step after the notice written to end it.

**The Architect accepts the finding and disputes its attribution, with bytes.** The scout box is
the REVIEW channel, and putting a card there is the designed flow: `CARD-ARCHIVE-PUSH-S128-1-v1`
went to `to_lane scout` under its own artifact_name at 2026-08-30T03:45:14.239882Z, and that scout
returned PASS-WITH-NOTES rather than a RED on addressing. So a card in the scout box is not by
itself an instruction to execute.

What the scout has actually found is a **CHANNEL defect, and it is real**: on this bus a card sent
for REVIEW and a card sent for EXECUTION are byte-identical rows — same `direction`, same
`artifact_name`, nothing distinguishing them. The reviewer must infer which it is, and inference
is the thing this factory keeps paying for. Filed as
**F-S129-BUS-CANNOT-DISTINGUISH-REVIEW-FROM-EXECUTION-1**. The operative outcome is unchanged
either way: the body was re-issued byte-identical to a claimed producer address, and the RED cost
nothing.

## §E · A DEFECT THE SCOUT FOUND BY COMMITTING IT — HANDED ON, NOT ABSORBED

Running `node scripts/mail-wait.mjs AG-1 --once` to check for a producer copy of the card **wrote
a live heartbeat for AG-1** at 2026-09-02T22:41:49.772Z, from a window holding no address. The
scout disclosed it in full and did not repair it, because a scout writes nothing and a second
write is not a remedy.

The mechanism it measured is the finding: `scripts/factoryState.mjs` `laneNonce()` runs
`git ls-remote origin refs/heads/lane/<lane>` and accepts any 40-hex answer. That proves THE REF
EXISTS ON THE SERVER. Its own refusal text claims *"this window does not hold that address"* — a
claim the computation cannot support. **THE LABEL IS NOT THE COMPUTATION.** Any window that can
read a public git ref can stamp any lane with an existing ref as alive, and `CLAUDE.md` §1a makes
the state table the single source of truth for which lanes are alive. That signal is forgeable by
a reader. **The owner ruled this the single lane's next work.**

## §F · A-REC-S129-4 — THE ARCHITECT ASSERTED AN ADDRESS STATE IT HAD NOT MEASURED

The card's SCOUT block states *"the relay bus has been silent since 2026-08-30T04:33:20Z … and
every address is closed."* The lane reported this as a DECAYED PREMISE rather than acting on it,
and it was right twice over. The bus was not silent by execution time — the table lens read
`table_max` 2026-09-02T22:33:12.133967Z at 22:37Z and 22:45:09.821428Z at 22:46Z, both BEFORE the
card was minted at 22:52:48. And not every address was closed:
`git ls-remote origin refs/heads/lane/AG-*` returns refs held at AG-1, AG-2 and AG-3.

**The second half is the defect and it is not decay — it was wrong when written.** Bus silence
measures THE BUS. "Every address is closed" is a statement about ADDRESSES, and addresses are
read with `ls-remote`, which the Architect never ran. An inference was written into a premise line
in the voice of a measurement. The lane, correctly, made no claim in either direction about
whether those three windows are alive: under `F-S117-LIVENESS-IS-POSITIVE-ONLY-1` a ~4.7-day-stale
heartbeat proves nothing, and silence is not evidence of death.

## §G · A DEFECT OF THIS CARD, CAUGHT BY THE LANE AND OBEYED ANYWAY

The card names its report `ARCHIVE-PUSH-S129-1-AG5-report.md` in three places — ORDER E, the
`deliverables` fence and ORDER F — inherited verbatim from the S128 template while AG-4 was the
executor. The lane followed the card literally rather than renaming it silently (S37-1: a
submitted artifact is immutable) and reported the mismatch. That is the correct behaviour and the
filename now carries a lane ordinal that did not run it. Filed as
**F-S129-CARD-TEMPLATE-CARRIED-A-LANE-ORDINAL-1**; a report path is derived from the card name and
the executing lane, and a template that hard-codes an ordinal will be wrong every time the lane
changes.

## §H · A LENS PAIR WORTH KEEPING

At close the lane's macOS lens reads `git status --porcelain -uall` EMPTY; the Architect's Linux
bridge reads NINE untracked lines. Both are true readings of one tree — the nine are the NFD
phantoms of paths tracked under NFC (F-S125-NFD-LENS-1). `empty ≠ zero` at the filesystem, and the
lens is named rather than averaged.

## STATE AT CUT

The archive freeze declared in `CARD-ARCHIVE-PUSH-S129-1-v1`'s PREMISE is LIFTED: the card has
closed. This record and `OWNER-RULING-S129-SOTA-GAP-DISPOSITION-1` are the two artefacts whose
placement A-REC-S129-1 deferred by name, and both are placed here now. They are untracked and are
the S129 close card's to land, under OWNER-RULING-S129-ARCHIVE-FIRST-1 arm 3.

AG-4 holds `lane/AG-4` under nonce `e5a6ab96`, box empty, awaiting the next card: the `laneNonce`
possession gap of §E, by the owner's ruling.

TAIL ANCHOR: S129-DISPATCH-RECORD-2 ends here.
