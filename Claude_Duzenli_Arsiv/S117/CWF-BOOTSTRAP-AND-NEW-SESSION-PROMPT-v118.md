# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v118

Supersedes v117. Written WHOLE at S117 close, 2026-08-25. Rewritten whole twice — once to carry
§0.5, once to correct a false claim inside it (see §0.5's own note). Governance artefacts are never
patched by string surgery (A-REC-S101-7).
**Every number in this document is a CLAIM (TOTAL-45). Verify against a fresh clone and the live
DB at session open; on conflict the fresh clone and the live DB win, and the difference is filed
as a bug.** S117 exists as a cautionary tale for exactly this: **seven** Architect errors, every one
of them a remembered or inherited value used as a premise — including one inside this very file.

---

## 0 · OPEN THE SESSION IN THIS ORDER

1. Read `claude/cwf-memory-seed-CWF5-v2.md` and this file. Verify the anchor table in a **fresh clone**.
2. **Rewrite SOTA-1 VERBATIM in your first message** from `docs/laws/constitution/SOTA-1.md`
   (S66-1 positive control). Its absence means the session opened wrong.
3. `npm run architect:open` + read `factory_state` live.
4. Read the bus (`relay_inbox`) — newest `from_lane` rows first.
5. Read `claude/S117-SESSION-NOTES-v3.md` — the full record of the previous day.

**WHERE THESE LIVE, because it confused the owner at S117 close and cost a round trip.** Every
carrier in this project's history lives in the project's **docs / knowledge** collection, reachable
with `project_read` / `project_search` — 172 entries at close. The project's **files** collection
holds exactly ONE item, `CWF SorularSayfa1.csv`, a blob the owner uploaded on 08-17. **Docs and
files are two different collections and the web UI shows them in two different panes.** A carrier
that is not visible in the files pane is not missing; it was never there. Knowledge size at close:
593,500 of 2,000,000.

## 0.5 · THE CARRIER DEBT — S118'S FIRST ACT, BY OWNER DECISION

**S117 closed with only two carriers written: this file and `claude/S117-SESSION-NOTES-v3.md`.**
The owner was told the rest were missing and ruled that S118 writes them. They are named here so
they cannot be lost, and writing them is S118's first act — before new phase work.

**⚠ THIS TABLE'S FIRST VERSION WAS WRONG, AND THE ERROR IS INSTRUCTIVE.** It claimed
`REGISTER-BUG-BUCKET-v54` was owed from v53. **v54 ALREADY EXISTS**, written mid-S117 at
`2026-08-24T17:37Z`. I asserted a carrier's absence without listing the project docs — the same
class as the six errors §3 warns about, committed inside the file that warns about them. The
owner's question is what surfaced it. `A-REC-S117-CARRIER-ABSENCE-ASSERTED-1`.

| owed | from | carries |
|---|---|---|
| `REGISTER-BUG-BUCKET-v55` | **v54, not v53** | the OVERNIGHT + MORNING batch of S117 findings. v54 covers only the S117 *day* work — one finding (`F-S117-CLARIFY-CHILD-LAYER-FALSE-EMPTY-1`) plus `PLATINUM-BREACH-S117-1`. §4 below is an index, not the entry. |
| `cwf-open-items-register-v121` | v120 | open items incl. `#387`, `#402`, the three holes |
| `CWF-SESSION-GRAPH-KB-v117` | v116 | the S117 node and its edges |
| `cwf-implementation-order-S117-v30` | v29 (S116) | the sequence §6 sketches |
| `cwf-memory-seed-CWF5-v3` | v2 | §3's disciplines — they belong in the seed, because they must reach EVERY future session, not only the next one |
| `CWF-S117-SESSION-CLOSE-v1` | — | the formal close |

**A PATH DEFECT TO FIX WHILE YOU ARE THERE:** v54 sits at `claude_REGISTER-BUG-BUCKET-v54.md` —
root level, UNDERSCORE — while every sibling uses the `claude/` namespace with a slash
(`claude/REGISTER-BUG-BUCKET-v53.md`). A carrier outside its namespace is a carrier the next reader
will not list. Write v55 to `claude/REGISTER-BUG-BUCKET-v55.md` and say in it where v54 actually is.

**THE LEDGER LAW BINDS HERE AND IT IS WHY THIS IS NOT A QUICK JOB.** A `vN+1` may not be written
without reading `vN`: carriers are append-only, items leave only by `CLOSED@evidence` /
`SUPERSEDED-BY` / `MERGED-INTO`, every closure pastes its own carry-diff, **a summary of a summary
is forbidden, and every item lives BY NAME.** Read each predecessor first. **Do not reconstruct a
carrier from this file** — it is a derived view and a derived view is not a source
(S102: türev kaynağın yerine geçmez). The wrong row above is what that law protects against.
**And the mirror trap:** the canonical home for open items is `docs/ground/open-items.md` in the
repo, not the project box. A project-box register is a MIRROR and mirrors go stale silently
(PB-S108-1, evidence `F-S108-RULE24-COLLISION`; also `F-S112-CANONICAL-LEDGER-SCOPE-1`). If you
write `v121` in the box, say in it that it is a mirror and name the commit it mirrors — or card a
lane to write the repo copy, which is the honest fix.

## 1 · STATE AT CLOSE (claims — re-measure all of it)

- `origin/master` = `50ba7d7e` — *"Merge pull request #401 from …/phase/card-preflight-must-run-1"*
- **Thirteen requests landed into master on 2026-08-25**, plus `#390` into its own base
  `phase/context-retrieval-1`. **A landing that does not move master is still a landing** —
  `F-S117-LANDING-COUNT-WATCHES-MASTER-ONLY-1`.
- Lanes: **AG-2 · AG-4 · AG-5 PARKED**, pollers running, wake on a new card.
  **AG-3 holds `lane/AG-3` at `82495d4d`** (re-claimed by the ordinary walk on an empty lease) but
  at close had **not** written its state row — it still read `WORKING` with a heartbeat from
  `04:47Z`. Expect that row to be stale, not to be a fact.
- Open requests: **`#387`** `phase/context-retrieval-1` (`993fa218`) — blocked on `AUTHOR-UNKNOWN`,
  everything ahead of authorship green; **`#402`** `phase/lens-author-set-1` (`2d7469d8`) — the
  AUTHOR-SET lens, RED on one unexplained test. `#402` unblocks `#387`, and only for lander AG-5.
- Untouched: `phase/authorship-lens-2` (`70be7849`, AG-3's, superseded for its base-ref content).

## 2 · WHAT CHANGED IN THE MACHINE — do not re-derive these

- **The land gate names itself.** Step 0 prints the gate revision and REFUSES when the deciding
  files diverge from `origin/master` — `GATE-STALE`. It compares CONTENT, not distance, so a
  behind-but-identical checkout passes and is merely named.
- **The land gate reads the request's own base**, threaded from `baseRefName`, and step 7 proves
  the RIGHT ref moved. Stacked requests are landable.
- **The ancestry test fetches the head object first**; genuine unknowns still report `UNMEASURED`.
- **The bus read is fixed**: `>=` plus id dedup, a count over the SAME predicate cross-examining
  every zero read, and a per-lane watermark from `factory_state.changed_at`. `relay_mark_consumed`
  now actually fires — it had taken 42501 on every delivery since the file existed.
- **Declared silence is live**: `SILENT-UNTIL <iso> :: <what>`, `UNDECLARED-SILENT` printing as its
  own class, a candidate notice that NAMES and never acts, and a destructive dwell.
- **Card preflight runs in the RECEIVING LANE** (`readCard` in `scripts/mail-wait.mjs`, body over
  STDIN). A non-compliant card is REFUSED, its check ids reported, and the lane STOPS.
  **CP-9 measured-at · CP-10 disagreement clause · CP-11 fresh box read.** Absent clause = STOP.

## 3 · DISCIPLINES ADOPTED — these are now expected of the Architect

- **Every card naming a sha or state carries `MEASURED-AT` and an explicit ON-DISAGREEMENT clause.**
  Of the previous Architect's last ten cards, **zero** passed the preflight that already existed.
  Assume yours fail until measured.
- **Silence is unreadable.** Four states: `BUSY` · `DEAD` · `LOOP-DEAD` (poller stopped, agent
  alive) · `HUNG` (agent present, not progressing). The last two are visible only from outside.
  **Never report a lane as dead. Report `UNMEASURED`.** Only the owner's screen settles it.
- **Every liveness lens is positive-only**: fresh heartbeat, moved ref, posted row, `consumed_at`
  stamp each prove ALIVE at an instant; none proves DEAD.
- **A repaired state is byte-identical to an unbroken one** — a current reading is not a claim
  about the past.
- **A tool's error string is a claim, not a measurement.**
- **A probe timed outside the observed distribution manufactures the answer it was sent to find.**
- **LIST BEFORE YOU CLAIM AN ABSENCE.** A carrier, a file or a row you did not enumerate is not a
  thing you may call missing (`A-REC-S117-CARRIER-ABSENCE-ASSERTED-1`).
- **A transcript is a PUBLICATION** — if the next read would put a secret into an artefact, STOP
  and card it.
- **A diagnosed transient is not a licence to re-run.** The law forbids re-running the SAME tree;
  it does not forbid measuring a DIFFERENT one. Fix the cause, then measure again.
- **Never remove a report from a tree to turn a refusal green.**
- **Attribution is measured from the bus, never remembered.**

## 4 · THE THREE OPEN HOLES — do not close these with a story

1. **`F-S117-REF-READING-CONFLICT-UNEXPLAINED-1`** — `lane/AG-3` was deleted at `06:01:40Z` and
   measured absent by the foreman, yet read PRESENT at `5cd6ddb1` by the Architect at 06:02, 06:38,
   06:55 and 07:16Z, then absent again at 07:45Z. AG-3 testified it never re-pushed, falsifying the
   only reconciling hypothesis. **Unexplained and unattributed.**
   *A mirror case appeared at close and may be benign*: AG-3's new nonce is dated `08:38:55Z` while
   the Architect read the ref absent six times afterwards. Leading hypothesis — **a commit
   timestamp is when the object was MINTED, not when the ref was PUSHED**; AG-3 was asked to settle
   it from its own transcript. **Hypothesis, not measurement.**
2. **`F-S117-UPDATE-BRANCH-EXIT-1-UNEXPLAINED-1`** — `gh pr update-branch` reports conflicts;
   three `merge-tree` rehearsals in three directions produce one identical tree with no conflicted
   path.
3. **`F-S117-ROUTE-DERIVE-G3-RED-UNEXPLAINED-1`** — `#402` red on one test of 10,105
   (`routeDerivationAutoRun.test.ts`, 5000ms timeout, unrelated to the diff). Sixteen runs across
   three lenses did not reproduce it, **and ruled the timeout repair OUT on evidence**: the whole
   file completes in ~1s against a 5000ms budget. A real race and a genuine assertion failure both
   remain live, separable only under CI-grade load. **Raising the timeout is forbidden** — it moves
   a number that is not the constraint and buries the cause.

Also still OPEN from earlier in S117, carried in bucket v54:
`F-S117-CLARIFY-CHILD-LAYER-FALSE-EMPTY-1` — the live production reproduction AND falsifier of
`#29 A23 ⑤/⑥` (`stageClarify.ts:321-329` dual resolved/unresolved loop), with an `empty ≠ zero`
breach at the RENDER layer. Deterministic repro: re-issue any `KB7 <equipment-metric>` query.

## 5 · OWNER ITEMS CARRIED INTO THE NEXT SESSION

- **Budget fence: eight consecutive red scheduled days.** Diagnosis is hypothesis (1) — the budget
  state genuinely violates the fence — refuted against miscalibration on four independent grounds.
  Two persistent failures: projected monthly spend exceeds the stop threshold (two independently
  sourced estimates agree), and **no warning notification between baseline and stop carries a
  subscriber**. Owner ruling on 08-25: **watch, no action that day.** Standing exception: **if the
  stop actually fires, tell the owner immediately — nothing else will.** Never read the fence logs
  into a report (figures, account ids); report SHAPE only.
- **Warning-subscriber gap** — independent of the budget decision, reversible, still open.
- **Claude Code window hangs** — no report filed, by owner decision; write one on the next
  occurrence. Two cases held: AG-3 `HUNG` (~05:00–08:00Z, recovered by ESC + `continue`);
  AG-5 `LOOP-DEAD` (poller silent 06:00–07:45Z, agent alive and unaware).
- The owner starts lanes in **Antigravity IDE as a Claude Code plugin**, not from a terminal.
  `/ub` = foreman, `/wr` = producer, `/free` = scout; a window **wins its address from the server**
  and is never told which lane it is.

## 6 · ORDER OF WORK FOR S118

1. **§0.5, the carrier debt.** First act, before new phase work — and list the project docs before
   claiming any of them is missing.
2. Measure whether AG-3 wrote its state and posted its two owed reports; its push-timing answer
   shrinks hole 1.
3. `#402`: the red must be understood, not retried. It needs CI-grade load to separate a race from
   a real assertion failure — that is the measurement to design first.
4. `#387` lands only after `#402`, and only by AG-5.
5. Then the pre-S117 queue resumes: `PHASE-CONTEXT-RETRIEVAL-1`, `F-S117-CLARIFY-CHILD-LAYER-FALSE-EMPTY-1`
   as the live falsifier for `#29 A23`, and the SOTA acceptance contract (0/16 external criteria
   measured — the internal 7-key counter is NOT the acceptance criterion).
