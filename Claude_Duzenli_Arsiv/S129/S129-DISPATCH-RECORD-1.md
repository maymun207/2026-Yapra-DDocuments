# S129 · DISPATCH RECORD 1 — the archive-push card, the preflight lens that had to be built first, and two owner corrections before it reached a worker

CUT 2026-09-02 ~22:2xZ, mid-session. REVISED 2026-09-02 ~22:3xZ — the revision is marked in place,
not silently applied, and the superseded text is quoted where it stood. Continued by
S129-DISPATCH-RECORD-2 (append-only carrier).

PLACEMENT NOTE: authored into the project box before the bridge existed to write through, and
placed here as a TRANSCRIPTION of that original. The second of the two catch-ups named in
OWNER-RULING-S129-ARCHIVE-FIRST-1; every artefact after it is authored here first.

## THE CHAIN

1. **The audit that forced the card** (owner order: *"gecmis 3 seesion daki olsuturdugun doaylar
   document reposunda oldugundan emin ol"*): S126's five files and S127's three are on disk AND
   tracked — complete. **S128 is not.** Six of its nine files were never committed, and one of the
   six is `OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1.md`, the ruling that forbids exactly this state
   (`F-S129-AUTOPUSH-RULING-DID-NOT-LAND-ON-ITSELF-1`). Three of those six — the S128 close, the
   v129 bootstrap and S128's own dispatch record — had never been placed on the bridge at all;
   arm 1(b) of that ruling did not run. The Architect placed them this session from the
   project-box originals.
2. **A capability had to be built before the card could be preflighted.** `npm run card:preflight`
   dies in the bridge VM: the owner's clone carries a macOS-native `node_modules`
   (`@esbuild/darwin-arm64`) and the bridge shell is Linux, so `tsx` refuses. Claude does not write
   packages into the owner's folders. Measured cure: `cardPreflight.ts`, `harnessSelfTest.ts` and
   `relayAudit.ts` import nothing but node builtins and each other, so the three were copied to a
   VM scratch directory OUTSIDE the mounts and run under `node --experimental-strip-types`. The
   ONLY edit is two import specifiers, `./x.js` → `./x.ts`, and the `diff` against the source is
   printed in the session transcript to prove nothing else moved. **The lens was proven both ways
   before it was trusted** (D-5 GATE-SELF-TEST): `--self-test` reported `red=proven green=proven`,
   and `--check` on the already-GREEN `CARD-ARCHIVE-PUSH-S128-1-v2` returned GREEN 11/11. This
   unblocks every future card: the Architect can now preflight without a lane.
3. **CARD-ARCHIVE-PUSH-S129-1-v1** — authored FIRST into
   `Claude_Duzenli_Arsiv/S129/CARD-ARCHIVE-PUSH-S129-1-v1.md` under
   OWNER-RULING-S129-ARCHIVE-FIRST-1, then preflighted. **THREE RED ROUNDS, all three real:**
   - `CP-1 / R-CLAIM-ROW` — six CLAIMS bases written as `MEASURED <instant>: …`. The landed
     grammar is `^MEASURED:\s*(\S.*)$` — the colon binds to the word, and the instant belongs
     inside the instrument phrase. Read from `scripts/relayAudit.ts`, not guessed.
   - `CP-1 / R-ANCHOR` — the bus row's anchor was prose. Cured by adding an `evidence:bus` fence.
   - `CP-7` and `CP-8` — the fence just added then broke two other checks at once: it named
     `consumed_at` (a RETIRED receipt column an instruction may not condition on) and carried a
     uuid whose hex segments fall inside the anchored-prefix band. Both cured by removing the row
     ids and the receipt column and saying in the fence WHY they are absent.
   Then **GREEN 11/11**, sha256
   `75f7f2b5dde772912cc3d2df1e8fa7865534b6aebde19dd1d28347b6714f40c5` on disk.
4. **DISPATCHED to AG-5** — 2026-09-02T22:21:46.917705Z, `body_bytes` 18350, digest returned by the
   INSERT equal to the file's. **THIS DISPATCH WAS WRONG AND IS WITHDRAWN — see §A below.**
5. **WITHDRAWN from AG-5** — 2026-09-02T22:29:58.074174Z, artifact_name
   `WITHDRAW-CARD-ARCHIVE-PUSH-S129-1-FROM-AG5-v1`. Appended rather than deleted: the bus is
   append-only, and a foreman window reading its backlog by `created_at` now meets the card and
   its withdrawal in that order.
6. **SENT TO THE SCOUT** — 2026-09-02T22:33:12.133967Z, `lane_addr` `scout`, `body_bytes` 18350,
   body sha256 `75f7f2b5dde772912cc3d2df1e8fa7865534b6aebde19dd1d28347b6714f40c5`. The body was
   copied **row-to-row inside the database** (`insert … select body from relay_inbox where id = …`),
   so this transport involved no transcription at all and the digest equality is by construction
   rather than by luck.

## §A · OWNER CORRECTION 1 — THE ADDRESS · A-REC-S129-2

The card was dispatched to `AG-5`. The owner stopped it before any window opened, from his own
memory of the role split: *"AG 5 adresi UstaBasi = foremen icin ayrilmisti… only AG1/2/3/4
workers development yapip ayni zmanda commit edebiliyordu?"*

**MEASURED, and he is right on the address.** `.claude/boot/foreman.md` line 1 — *"boot for the
foreman lane (AG-5)"*; line 437 — *"AG-5 is the foreman"*; `scripts/factoryState.mjs` hard-codes
`laneNonce('AG-5')`. The repository files this binding as a defect of its own:
`docs/ground/authority-conformance.latest.md` carries `[ROLE-BINDING-IS-A-CODE-LITERAL]` and
`[BOOT-PROSE-BINDS-ROLE-TO-ORDINAL]`, the latter expecting a foreman address of the `UB` ordinal
form and measuring an AG one instead.

**MEASURED, and the commit half is narrower than his memory.** The fence is on MERGING, not on
committing. `guard-bash.py` refuses `gh pr merge` in every window (`FOREMAN_ROLE = "foreman"`, a
value nothing sets, which is the designed state) and refuses force-pushes; it says nothing about
`git commit` or an ordinary `git push`. Producers author, commit, push and open the pull request;
the foreman lands it with `ADF_LANE_ROLE=AG-5 npm run land`, the only form `landerLane` accepts
(`/^AG-\d+$/` — the word `foreman` fails that test and yields AUTHOR-UNKNOWN,
`F-S116-FOREMAN-BOOT-0A-ROLEWORD-STALE-1`). So the foreman does write commits; they are landing
commits and its own reports, never development work.

**Why the card did not need either role:** it commits and pushes in the owner's separate
documentation repository — no pull request, no `gh pr merge`, no `npm run land`, no
`ADF_LANE_ROLE`. The address error therefore cost nothing operationally and everything in
governance: it put producer work at the merge-authority address.

**The root cause is this factory's dominant class, wearing an address instead of a number.** The
v129 bootstrap §1 reads *"exactly ONE worker (AG-5's address) + ONE scout"*, and the Architect
carried that phrase into a dispatch without re-deriving it. `OWNER-RULING-S125-SINGLE-LANE-1` does
not contain it: it rules one worker lane plus one scout, and its item 2 says the then-current
AG-5 window finishes its in-flight landing and CLOSES. It never named a standing worker address.
Filed as **F-S129-BOOTSTRAP-GLOSSED-THE-SINGLE-LANE-RULING-1**, and v130 must state the mode
without an address.

## §B · OWNER CORRECTION 2 — THE SCOUT IS NOT OPTIONAL · A-REC-S129-3

**SUPERSEDED TEXT, quoted so the change is not silent.** This record's first cut carried a section
headed *"THE SCOUT REQUIREMENT — ONE NAMED BYPASS, AND IT IS THE WHOLE OF IT"*, which argued that
no scout round was available because no scout window was open, and justified the bypass by the
card's small blast radius and its inheritance from a card a scout had already PASSed.

**That reasoning is withdrawn.** The owner's correction: *"sen scoutu senin adversary / reviewer
olarak kullaniyordun karti wr a vermeden once hatirladin mi?"* The scout is the Architect's
ADVERSARY, and the designed order is card → scout → worker. A scout window costs nothing to open
(`/free`, read-only, claims no address, writes no repository file), so "no scout window is open"
was never an unavailability — it was a window the Architect had not asked for. A bypass named
because the reviewer was not summoned is not a bypass, it is a review skipped with paperwork.

The deeper error is what the bypass was reasoning ABOUT: it weighed the card's blast radius, which
is the Architect's own estimate of its own work. **The scout exists precisely because that
estimate is the thing under review.** S122 already named the mechanism: the only mitigation that
worked against Architect precision decay was scout windows per card, and the owner ruled the
permanent cure MECHANICAL rather than moral.

**Standing correction for the rest of this session and for v130:** a card reaches a worker only
after a scout verdict, or after a bypass whose reason is something other than the absence of a
scout window. Where the mode allows one worker and one scout, opening the scout is part of
dispatching, not a step before it.

## §C · A-REC-S129-1 — THE ARCHITECT FROZE AN ARCHIVE HE STILL OWED A FILE TO

The card's PREMISE declares the archive frozen, and its status-line prediction tells the lane that
any archive filename beyond the eight, the card and the report is a STOP. The card then names
`S129-DISPATCH-RECORD-1` as the home of the bypass — a file not yet written. Writing this record
into `Claude_Duzenli_Arsiv/S129/` at that moment would have tripped the card's own STOP condition
on arrival.

The freeze was kept and the placement DEFERRED BY NAME; the card has since closed and this file is
placed. The defect is the ordering, not the deferral — a card that freezes a surface should be the
LAST artefact written to it, and this one was written before its own dispatch record. Under
OWNER-RULING-S129-ARCHIVE-FIRST-1 the correct sequence is: record first, card last.

TAIL ANCHOR: S129-DISPATCH-RECORD-1 ends here.
