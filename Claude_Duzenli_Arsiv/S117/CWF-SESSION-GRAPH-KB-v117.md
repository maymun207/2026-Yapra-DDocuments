# CWF SESSION GRAPH KB — v117 (S117 delta, written at S118 open)
Append to v116. One line per learned edge; primary sources in repo/bus/close doc. Predecessor
`claude/CWF-SESSION-GRAPH-KB-v116.md` READ IN FULL before this was written.

## Liveness, silence, and the four states

- **Every liveness lens this factory owns is POSITIVE-ONLY.** A fresh heartbeat, a moved ref, a posted
  bus row, a `consumed_at` stamp — each proves ALIVE at an instant and **not one proves DEAD.** Silence
  is the absence of evidence and nothing inside the machine converts it into evidence of absence.
  `empty ≠ zero`, applied to time.
- **`heartbeat_at` measures the POLL LOOP, not the agent.** It fires per tick. The counterexample is on
  the wire: AG-3's last heartbeat `04:47:22Z`, its commit `1e154696` at `05:00:10Z` — thirteen minutes
  LATER — still working an hour after that. A 900-second threshold would have certified a live lane
  dead about two minutes AFTER it committed.
- **FOUR states, not two: `BUSY` · `DEAD` · `LOOP-DEAD` (agent alive, poller stopped) · `HUNG` (agent
  present, not progressing).** The last two are visible only from OUTSIDE the machine and neither can
  be covered by a declaration a lane makes about itself — a hung window cannot declare that it is hung.
- **Therefore the only lens that sees a stopped window is a person looking at it**, and that is not a
  PLATINUM violation: it is the one place `S102-YASA-1`'s real-world witness is irreducible. **The
  factory NAMES a candidate; a human CONFIRMS.** Consent, not operation.
- **A window cannot testify to its own hang — but it can leave dated files on either side of the
  silence.** AG-3 answered a liveness question with an INSTRUMENT rather than testimony: the UTC mtimes
  of its own artifacts, bounding two hangs at `05:04:08Z→07:58:59Z` and `08:38:50Z→11:53:30Z`. **Ask a
  lane for its artifact mtimes, never for its recollection.**
- **A commit's timestamp is when the object was MINTED, not when the ref was PUSHED.** Mint-then-stall
  makes a ref appear on the server hours after the object's date, and it explains six absent readings
  followed by a present one without any server anomaly. **A ref reading and a commit date are two
  different measurements of two different events.**
- **A repaired state is byte-identical to an unbroken one.** A current reading is not a claim about the
  past, and "I see no damage" is not "no damage was done".

## Gates, cards, and the grammar the RECEIVER enforces

- **A gate certifies a TREE; it must also say WHICH GATE.** A shared clone 34 commits behind ran
  `npm run land` all night and printed refusal CLASSES from a gate that no longer existed, in the
  present tense. The repair compares the deciding files' CONTENT against `origin/master`, not distance,
  so a behind-but-identical checkout passes and is merely named.
- **A check the AUTHOR runs is a habit; a check the READER runs is a gate.** Card preflight moved into
  the receiving lane precisely because its author failed it ten times out of ten while believing he
  followed it.
- **A gate can be landed DISARMED, and a landed gate is not an armed one.** `CARD_GATE = 'REPORT'`
  prints the refused check ids and lets the lane proceed. It landed that way on evidence — 0 of 10
  cards pass, four checks refuse ALL of them because cards are written as prose with ORDERS and not in
  the card grammar at all — and **arming it today would not gate the factory, it would HALT it,
  including any card sent to countermand it.** The arming is a named, reviewable, revocable one-word
  decision reserved to the Architect. **The cure is the grammar, never the constant.**
- **`*-CLOSING-*` is a NAME the boots key on, not a description.** A lane's claim lives until a card
  named `*-CLOSING-*` **for that lane** is read (`producer.md:204`, `foreman.md:484`). A closing card
  named anything else is, to a lane reading its boot literally, not a closing card. **Read the
  receiver's grammar before naming a card** — this is the same edge as the land gate's subject grammar,
  learned twice in two days.
- **A lane that reads the ORDERS rather than the file name can be right when the card is wrong** —
  AG-4 released on a mis-named closing card. That is judgement, and it is not a substitute for the
  Architect getting the name right.
- **`created_at > anchor` never returns the row sitting AT the anchor.** Lanes printed `read OK · zero
  new rows` over a non-empty box; one card sat invisible 459 seconds. `>=` plus id dedup, plus a count
  over the SAME predicate cross-examining every zero read.
- **`writeLane` moves `factory_state.changed_at`, and that column IS the per-lane box floor** — so
  posting a declaration moves the floor to now. **Heartbeats do NOT move it** (measured unmoved across
  dozens of ticks while `heartbeat_at` advanced every minute). It is the state write, not the tick.
- **A `SILENT-UNTIL` declaration is written into `factory_state.note`, and `readLanes()` does not
  select `note`** — and `candidateNotice` has no non-test caller. **A mechanism can be landed, tested,
  and unreadable by every consumer that exists.** Build the READ path in the same wave as the write.

## The write channel, and the deadlock it hides

- **"Read a card, then mark it consumed" exists in NEITHER connection alone**: `supabase-ro` can SELECT
  the table and takes 42501 on the verb; `cwf_lane` can EXECUTE the verb and takes 42501 on the table.
  The grants are not broken — they are complementary by design and **nothing told the caller.**
  `relay_mark_consumed` had taken 42501 on every delivery since the file existed.
- **`factory_claim` admits a re-claim in exactly two shapes — the same nonce, or a `CLOSED` row — and
  BOTH are gated on a nonce only the DEAD window could present.** A lane that lawfully re-wins its
  address after its predecessor died is then locked out permanently: `FW002` on the claim, `FW001` on
  the `CLOSED` write that would satisfy the other shape. **The address is free in git and unwritable in
  the database at once.** The missing piece is a third admissible shape, or a `factory_release` a lane
  holding the GIT half can call. **A guard that is correct in every branch can still have no
  reachable exit.**
- **A death certificate has two halves in two different systems** — a `CLOSED` row in the database and
  a released ref in git — **and the verb that writes the first cannot see the second.** Every rule that
  treats one half as the whole certificate authorises deleting a ref whose holder was never proven
  gone.
- **A window that dies while `WORKING` leaves `WORKING` + ref present, which is byte-identical to a
  healthy lane.** It is not an unhandled cell in the sweep matrix — **it is a cell that READS AS
  NORMAL**, and the walk then answers `NO-ADDRESS-FREE` entirely correctly while an address stays
  unreclaimable and nothing barks.
- **Release BEFORE the window closes, or the address is lost.** With every lane ref held, a factory
  closed by shutting windows cannot re-open at all.

## Reading, counting, and the Architect's own prose

- **A number in prose does not survive being read twice.** A landing count was corrected on the bus,
  did not take, was corrected again, and still went into the next bootstrap wrong. **The list is the
  artefact; the arithmetic is the reader's.**
- **A landing that does not move master is still a landing.** A counter watching only master misses
  every stacked request.
- **A tool's error string is a claim, not a measurement.** `gh` reported conflicts on a branch three
  `merge-tree` rehearsals proved clean in three directions.
- **An exit code is not a test result.** `vitest --repeat=10` does not exist in 4.1.9; the `CACError`
  exit 1 was briefly read as "the isolated run failed" when NO TEST RAN.
- **`ok:true` is not the row.** A write's acceptance says nothing about what the row now says: read it
  back from the table.
- **A probe timed outside the observed distribution manufactures the answer it was sent to find.**
- **A watch body is a list of things to MEASURE, never a set of facts** — a scheduled watch fired 15
  minutes late carrying a framing already falsified and a finding name already withdrawn.
- **LIST BEFORE YOU CLAIM AN ABSENCE.** A carrier, a file or a row that was never enumerated is not a
  thing that may be called missing.
- **A carrier outside its namespace is a carrier the next reader will not enumerate** — one bucket
  written to a root-level underscored path was declared missing by the very document warning about
  unmeasured claims.
- **A superseding document is where names go to die.** The fullest NARRATIVE dropped nine item names
  its own predecessors carried. Under `EN TAM TANIKLI İFADE KAZANIR` a silent compression is a DEFECT,
  not an update — **prose supersedes prose; it must never supersede a ledger.**
- **A refusal PRESERVES a question; it does not ANSWER one.** A foreman refused to re-run a red that
  was the last blocker on the last request, with the session closing — and was careful afterwards to
  say that the credit for the answer-shaped part belonged to the lane that ran sixteen measurements,
  not to the refusal that left the evidence intact.
- **Sixteen greens under an order of magnitude less load are weak evidence.** CI reported 332 s where
  the local target took ~30 s. Treating local greens as a flake verdict is absence-of-evidence
  promoted to evidence-of-absence.
- **The repair you are closest to making is the one to measure hardest.** Raising a 5000 ms timeout on
  a file that completes in ~1 s would have produced a green and buried the cause.
- **A state somebody else can close is not a measurement of yours** — DONE-derivation resolves a
  report against the lane the CARD was addressed to, so one lane's report cannot close another's item.
  A loose glob would have made the ledger unauditable.
- **A transcript is a PUBLICATION.** If the next read would put a secret into an artefact, the lane
  STOPS and asks for a card.
- **No report is ever removed from a tree to turn a refusal green.** Deleting evidence is the one
  repair never available.
- **An owner ask can be refused on PLATINUM grounds and never reach the owner** — a standing
  destructive-history grant for autonomous lanes was refused as a design and the gate learned to read
  instead (cost: one card; permissions left behind: none), and a ~480-row backfill was replaced by a
  per-lane watermark that needed no column, no migration, and not one historical row written.

END-OF-KB CWF-SESSION-GRAPH-KB-v117
