# REGISTER BUG BUCKET — v55 (S117 OVERNIGHT + MORNING delta, plus the S118-opening measurements; append to v54)

Written WHOLE at S118 open, 2026-08-25 ~12:40Z (15:40 TSİ), master `50ba7d7e` measured on the wire.
Predecessor READ before writing (ledger law): `claude_REGISTER-BUG-BUCKET-v54.md` and, behind it,
`claude/REGISTER-BUG-BUCKET-v53.md`. Nothing here is reconstructed from a bootstrap: a bootstrap is a
derived view and a derived view is not a source (S102 · türev kaynağın yerine geçmez).

**WHERE v54 ACTUALLY LIVES, because the next reader will not find it where the siblings are.**
v54 sits at the project-box path **`claude_REGISTER-BUG-BUCKET-v54.md`** — ROOT level, UNDERSCORE —
while every other bucket uses the `claude/` namespace with a slash. It was written mid-S117 at
`2026-08-24T17:37:04Z` and it is NOT missing. The bootstrap v118's first draft asserted it was owed;
that assertion was made without listing the project docs and is recorded as
`A-REC-S117-CARRIER-ABSENCE-ASSERTED-1`. **A carrier outside its namespace is a carrier the next
reader will not enumerate**, which is exactly how the false absence happened. v55 is written to
`claude/REGISTER-BUG-BUCKET-v55.md`; v54 is left where it is, named here, and NOT re-hosted — moving
an append-only carrier would break the only link the S117 record has to it.

---

## 0 · WHY THIS FILE IS LONG · the S117 record existed in three places and NO single one carried it all

`S117-SESSION-NOTES-v1` (09:00Z), `v2` (06:25Z, supersedes v1), `v3` (10:55Z, supersedes v1 and v2).
v3 is the fullest NARRATIVE and it is also **the one that dropped the most NAMES.** Under
`EN TAM TANIKLI İFADE KAZANIR` a silent compression is a DEFECT, not an update. This bucket restores
the full name set. Filed as its own finding below.

---

## 1 · OPEN · carried unchanged from v54

- **`F-S117-CLARIFY-CHILD-LAYER-FALSE-EMPTY-1`** — `/api/cwf/chat` "KB7 OEE" → 200, ZERO tool calls
  despite `canonicalOEE=present` + 33 tools offered to `gemini-2.5-flash`. Clarify DUAL-resolve
  contradiction: pass1 `[EntityResolve] alias resolved=[KB7:alias-direct] unresolved=[]` vs pass2
  `[EntityResolve] scope=floor=none resolved=[] unresolved=[KB7]`. Equipment CHILD layer read WITHOUT
  parent `factoryId` scope → `[Clarify] layerStatus=declared-empty layer=equipment reads=ok` →
  rendered to the user as "no equipment records in the system" = **`empty ≠ zero` RENDER-layer
  breach**. `[Ask] decision=no-ask reason=all-resolved valve=0` reads the optimistic pass1 and ignores
  pass2's `unresolved=[KB7]`; neither parent-scope promotion nor clarification; terminal false-empty.
  ROOT: `backend_entity_layers` `armes.equipment` `parent_layer_key=factory` /
  `parent_param_name=factoryId`; parent (factory KB7) never promoted into child scope.
  `entity_registry`: KB7 = **factory** layer (1 row), NOT equipment.
  **SAME CLASS as `#29 A23 ⑤/⑥` `stageClarify.ts:321-329` DUAL resolved/unresolved loop — this is its
  live production reproduction AND its falsifier.** FIX DIRECTION (bug-fix turn): (a) promote pass1's
  parent-layer resolve `[KB7:factory]` into the child layer's parent_param scope (`factoryId=KB7`)
  instead of discarding it; (b) `declared-empty` on an UNSCOPED child layer must route to ask or to
  parent-scope, NEVER render as "no records in the system"; (c) the Ask decision must read the pass
  that carries `unresolved`, not the optimistic pass. **Repro: re-issue any `KB7 <equipment-metric>`
  query; deterministic.**
  LOG-COORDS: turn `2026-08-24 16:42:41Z` · Vercel runtime-log window
  `since=2026-08-24T16:40:00Z until=2026-08-24T16:45:00Z` (keep the window ≤5 min — wide windows time
  out) · `route=/api/cwf/chat` · `trace=26053c7389aa3f44643bed97a44f9a93` (short `26053c73`) ·
  `dep=dpl_BdSvnZfCBY8dWAv4ErbuXyysSvgf` (branch=master) ·
  `projectId=prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i` `teamId=team_UjOMyrQtTQ32mfYCeEDpC0Qj`.
  Retention caveat: Vercel runtime logs are short-lived; if this window has aged out by the fix turn,
  the DB root is stable, so re-issue "KB7 OEE" to reproduce the identical trace live.

- **`PLATINUM-BREACH-S117-1`** — the Architect handed the owner a paste-and-append operation for THIS
  register instead of authoring the artifact itself: a machine op routed to the owner's surface
  (`S102-YASA-1` breach). Queue-jumping redesign, and it is what produced this very file: **the
  Architect authors bug-bucket / open-items / all closing-set documents as finished files directly;
  the owner surface is consent + real-world witnessing (receiving/placing the artifact) ONLY. No
  "paste this into a doc yourself" instruction to the owner, ever.** S118 opened by discharging the
  whole carrier debt in the Architect's own hand — the breach's acceptance test.

---

## 2 · OPEN · carried from v53, re-measured or explicitly NOT re-measured at S118 open

- `F-S116-RELAY-INBOX-MIGRATION-DRIFT-1` — the live `relay_inbox` address CHECK family exists in no
  repo migration. UNCHANGED, uncarded, still owed to an AG + Operator pair.
- `F-S111-RELAY-CONSUMED-NOT-WRITTEN` — **SUPERSEDED-BY `F-S117-MAIL-VERB-NEEDS-TWO-CONNECTIONS-1`**,
  which measured the true root (the verb and the table need two different connections) and closed it
  in #392/#394. The v53 line's own framing — "transport read-only 25006, WRITE-channel decision
  pending" — was a correct symptom attached to a wrong cause.
- eval-canary 25+ SKIPPED streak — UNMEASURED at S118 open (`gh` is ENOENT in the Architect
  container; the CI arbiter is in the lanes). Still open, still Kademe 3.
- budget-fence — NO LONGER "proof pending". See §5: it has now failed **eight consecutive scheduled
  days** and the owner has ruled. The v53 line is SUPERSEDED by the S117 fence findings.
- `F-BW01` rule26 flake — mitigated by CI-DIET path scoping; watch. UNCHANGED.
- census re-run cadence — **re-measured at S118 open: `docs/ground/census.latest.json` is STALE by
  523 minutes against a 60-minute bound** (stamp commit `3273a2b3`, measured `2026-08-25T03:42:15Z`).
  Still open; still not a premise until re-run.
- Operator lane-row seed deviation — harmless floor value, resolve in FACTORY doc v2. UNCHANGED.

---

## 3 · CLOSED@evidence · S117, and every one of them on the same day

| finding | what it was | closed by |
|---|---|---|
| `F-S117-FOREMAN-RAN-A-STALE-GATE-1` | the foreman's shared clone was **34 commits behind**; `npm run land` runs from it, so every refusal CLASS printed all night came from a gate that no longer existed, reported in the present tense. Found by the foreman measuring ITSELF mid-drain. Its own repair sentence: **a gate certifies a TREE; it must also say WHICH GATE.** | **#396** — the gate prints its own revision and REFUSES when it cannot vouch for its own rules. It caught its own author's drift within an hour of landing. |
| `F-S117-LAND-ASSUMES-MASTER-BASE-1` | five expressions hardcoded `origin/master`; `baseRefName` was REQUESTED at the one `gh pr view` and then DISCARDED by a parse taking `headRefOid` alone — so a reader skimming for "does it know about bases" finds a yes and nothing that decides consults it. LABEL-IS-NOT-THE-COMPUTATION, inside the gate that enforces it. The dangerous half was step 7: it proved a landing by re-reading `origin/master`. | **#396** — proven end to end when **#390** landed into `phase/context-retrieval-1` and step 7 proved the RIGHT ref moved |
| `F-S117-ANCHOR-HID-A-CARD-1` (**6 measured instances**) | the poller's anchor advanced to a card's exact `created_at`, and `created_at > anchor` never returns the row sitting AT the anchor. Lanes printed `read OK · zero new rows` over a NON-EMPTY box. **One card sat invisible 459 seconds.** Caught only by a second lens (the table count). | **#392** — `>=` plus id-level dedup, plus a count over the SAME predicate cross-examining every zero read |
| `F-S117-MAIL-VERB-NEEDS-TWO-CONNECTIONS-1` | "read a card, then mark it consumed" exists in NEITHER connection alone: `supabase-ro` can SELECT the table and takes 42501 on the verb; `cwf_lane` can EXECUTE the verb and takes 42501 on the table. `mail-wait.mjs` held one. **`relay_mark_consumed` had taken 42501 on every delivery since the file existed — not one stamp had ever landed.** The grants are not broken; they are complementary by design and nothing told the caller. | **#392 / #394** |
| `F-S117-LAND-ANCESTRY-NEEDS-THE-HEAD-OBJECT-1` | after `update-branch` moves a head the clone lacks the object and ancestry refuses `UNMEASURED`. The gate behaved WELL — it printed UNMEASURED with its reason rather than defaulting — but **the foreman performed the remedy BY HAND three times, and a remedy performed by hand three times is a defect with a workaround.** | **#398** |
| `F-S117-LAND-STATUS-VS-CHECKS-1` | every JOB green and the commit STATUS still pending (Vercel). Check-runs and statuses are two surfaces; "all checks completed" is not "ready". **`empty ≠ zero` in a CI costume.** | adopted into the drain ritual — wait on the STATUS as well as the CHECKS, at the full sha |
| `F-S117-CI-DIET-REASON-FALSIFIED-1` | a CORRECT rule defended by a FALSIFIED reason ("a skipped job reports no context at all"; measured, a job skipped by a job-level `if:` DOES report a context). *A correct rule resting on a falsifiable reason is a rule that gets "corrected" by whoever checks the reason and not the rule.* | **#392** |
| `F-S117-CARD-AND-LANE-PASS-IN-FLIGHT-1` | five Architect cards asserted a state that had stopped being true — by 11 seconds, by 33 seconds, by 6.5 minutes, and twice by more | **#400 / #401** — preflight CP-9/CP-10/CP-11, run by the RECEIVING LANE. ⚠ **LANDED DISARMED** — see `F-S118-CARD-GATE-LANDED-DISARMED-1` in §4 |
| `F-S117-DEAD-LANE-REF-NOT-RECLAIMABLE-1` | both boots define the death certificate as a `CLOSED` row PLUS a released ref, and a dead holder can complete neither half; the ordinary walk answers `NO-ADDRESS-FREE` and stops | **#397 / #399** — declared silence, candidate notice, human confirmation. ⚠ the READ half is not wired — see `F-S118-SILENCE-DECLARATION-UNREADABLE-1` |
| `F-S117-CI-FILTER` / subject-grammar family | four CI-green requests refused `AUTHOR-UNKNOWN` because no card ever stated the land gate's subject grammar | subject-grammar fixes #391 and the rebuild behind #389 |

---

## 4 · OPEN · S117 findings that were NOT closed, restored BY NAME

**Three of these were carried by `S117-SESSION-NOTES-v2` and dropped by `v3`. Six more were carried by
`v1` and dropped by both. They are open items, not prose.**

- **`F-S117-REF-READING-CONFLICT-UNEXPLAINED-1`** — `lane/AG-3` was deleted at `06:01:40Z` and
  measured ABSENT by the foreman, yet read PRESENT at `5cd6ddb1` by the Architect at 06:02, 06:38,
  06:55 and 07:16Z, then ABSENT again at 07:45Z. **AG-3 testified it never re-pushed, falsifying the
  only reconciling hypothesis.** Not closed with replica lag or any other unmeasured story.
  *MIRROR CASE, and it is live:* AG-3's new nonce object `82495d4d` is dated `08:38:55Z`, yet the
  Architect measured `lane/AG-3` ABSENT at 09:14, 09:35, 09:53, 10:14, 10:34 and 10:51Z and PRESENT
  at 11:57Z. Leading hypothesis — **a commit timestamp is when the object was MINTED, not when the
  ref was PUSHED.** HYPOTHESIS, NOT MEASUREMENT. The settling measurement is AG-3's own transcript
  and it has not been given (see `F-S118-AG3-REPORTS-NOT-ON-BUS-1`).
- **`F-S117-UPDATE-BRANCH-EXIT-1-UNEXPLAINED-1`** — `gh pr update-branch` reports conflicts; three
  `merge-tree` rehearsals in three directions produce ONE identical tree with no conflicted path.
  **A tool's error string is a claim, not a measurement.**
- **`F-S117-ROUTE-DERIVE-G3-RED-UNEXPLAINED-1`** — `#402` red on ONE test of 10,105
  (`routeDerivationAutoRun.test.ts`, 5000 ms budget, unrelated to the diff). AG-2 ran it **sixteen
  times across three lenses** (file alone ×10: green 10, median 1031 ms; `api/cwf` suite ×3: green 3,
  median 29315 ms; `_lib/backends --detectAsyncLeaks --no-file-parallelism` ×3: green 3, no leak),
  ZERO reproductions, **and ruled the timeout repair OUT on evidence**: the whole file completes in
  ~1 s against a 5000 ms per-test budget, roughly 5× clear. **RAISING THE TIMEOUT IS FORBIDDEN** — it
  moves a number that is not the constraint and buries the cause. Outcome 2 (a real race) and
  outcome 3 (a genuine assertion failure) both remain live and are separable only under CI-grade
  load: **CI reported 332 s for its run; AG-2's machine takes ~30 s — an order of magnitude less
  contended, so sixteen greens under 10× less load are weak evidence.** OBSERVATION, explicitly NOT a
  diagnosis: the failing case and its two neighbours all mutate shared `hoisted` state
  (`hoisted.published`, `hoisted.mirror`, `createDraft.mockReset()`) — the shape a within-file
  ordering bug takes. UNMEASURED: whether this test has failed before (CI exposes job conclusions,
  not per-test history) and whether the 332 s runner was typical. The file has exactly one commit,
  `659c373b`, so nobody has papered over it before and there is no rate to learn.
- **`F-S117-REWRITE-ORPHANS-STAMP-1`** *(v2; dropped by v3)* — a history rewrite orphans any
  provenance stamp naming a rewritten commit, so "rebuild the subjects" and "change nothing" cannot
  both hold once a stamped artifact is in the tree. The repair is a RE-MEASUREMENT (re-run the
  generator); hand-typing a sha into a provenance field is the precise act `check:ground` exists to
  catch.
- **`F-S117-JEST-DOM-SETUP-GAP-1`** *(v2; dropped by v3)* — 404 `toBeInTheDocument` failures,
  reproduced in a clean worktree carrying none of the session's edits. **Not ours.** Still unowned.
- **`F-S117-ARCHITECT-WATCH-CARRIES-STALE-VERDICTS-1`** *(v2; dropped by v3)* — an Architect watch
  fired 15 minutes late carrying the falsified "AG-3 died" framing and a finding name already
  withdrawn. Same class as the project box's §9: a frozen snapshot read in the present tense.
  **DISCIPLINE ADOPTED: a watch body is a list of things to MEASURE, never a set of facts.**
- **`F-S117-S116-DRAIN-TAIL-1`** *(v1; dropped by v2 and v3)* — `lane/AG-4@8721b528` was present at
  ~00:22Z and GONE at 00:27Z and 00:29Z; the release happened between two Architect reads,
  UNATTRIBUTED, with no `factory_state` row touch and no `factory_events` row. Observation class,
  never explained.
- **`F-S117-CLOSE-SHUTDOWN-NOT-WRITTEN-1`** *(v1; dropped by v2 and v3)* — the S116 close doc §6
  sentence "AG-5 exits last writing SHUTDOWN" did not execute: measured mode was `DRAINING`, no
  SHUTDOWN row. A close-doc sentence is not an event.
- **`F-S117-FOREMAN-BACKLOG-BLIND-1`** *(v1)* — a fresh window anchors the high-water mark at
  table-max as of start, so the carried PROOF card (22:45Z) and the DRAINING card (00:11Z) were
  invisible and "DONE derived — empty set" was FALSE-EMPTY. Root joins the anchor family; the
  strictly-greater half is CLOSED by #392, **but "a fresh window starts blind to its own backlog" was
  never separately repaired.**
- **`F-S117-FOREMAN-DRAINING-RESOLVE-GAP-1`** *(v1)* — the boot covers a RUNNING foreman meeting
  `DRAINING`; there is no rule for BOOTING INTO a stale `DRAINING` → a lawful, infinite hold, and the
  escalation reached the owner's SCREEN rather than the bus. Uncarded.
- **`F-S117-FACTORY-STATE-NO-WRITE-CHANNEL-1`** *(v1)* — **CLOSED@evidence** by FACTORY-BOOT-2
  (#379 + the operator apply + TRANSPORT-1); proven live at S117 close when AG-5 wrote `PARKED`
  through its own verb and read the row back. Recorded here because v3 dropped the name and a closure
  with no item is unauditable.
- **`F-S117-FENCE-SCHEDULE-NOT-BORN-1`** *(v1)* — the budget-fence 24 Aug 07:10Z scheduled run was
  never born as of 09:00Z (the previous day's was born 07:42Z; >110 min beyond pattern). A3 ruling
  carried: "run not born, no ruling". **SUPERSEDED-BY the fence measurements in §5** — the runs are
  being born and they are red.
- **`F-S117-HEARTBEAT-MEASURES-POLLING-NOT-LIVENESS-1`** — the heartbeat fires per TICK, so it
  measures the POLL LOOP, not the agent. AG-2's counterexample from the wire: AG-3's last heartbeat
  `04:47:22Z`, its commit `1e154696` at `05:00:10Z` — **thirteen minutes later.** A 900-second
  threshold would have certified it dead about two minutes AFTER it committed.
- **`F-S117-ABSENCE-OF-DAMAGE-IS-NOT-PROOF-OF-NO-DAMAGE-1`** — **a repaired state is byte-identical
  to an unbroken one.** A current reading is not a claim about the past.
- **`F-S117-LIVENESS-IS-POSITIVE-ONLY-1`** — the law of the day, kept OPEN as a standing constraint
  rather than closed, because it has no repair: every liveness lens this factory owns proves ALIVE at
  an instant and **not one proves DEAD.** `empty ≠ zero`, applied to time. FOUR states, not two:
  `BUSY` · `DEAD` · `LOOP-DEAD` (agent alive, poller stopped — AG-5, 105 minutes: *"I did not declare
  that silence because I did not know it was happening"*) · `HUNG` (agent present, not progressing —
  AG-3, recovered by the owner with ESC + `continue`). **The last two are visible only from outside**,
  and neither can be covered by a declaration a lane makes about itself. Consequence, and it is not a
  defeat: the only lens that can see a stopped window is a person looking at it — the one place
  `S102-YASA-1`'s real-world witness is irreducible. **The factory NAMES a candidate; a human
  CONFIRMS.** Consent, not operation.
- **`F-S117-LANDING-COUNT-WATCHES-MASTER-ONLY-1`** — a counter that only watches master misses every
  stacked request. **A landing that does not move master is still a landing** (#390 into
  `phase/context-retrieval-1`).

---

## 5 · A-REC-S117 · THE ARCHITECT'S OWN ERRORS — EIGHT NAMED, plus one unnamed candidate

`S117-SESSION-NOTES-v3` §4 counted six; the bootstrap v118 preamble counted seven; the measured set
across all three notes is **EIGHT named**. The count itself kept being asserted rather than counted,
which is the class.

1. **`A-REC-S117-CARD-SUBJECT-GRAMMAR-OMITTED-1`** — no card ever stated the land gate's subject
   grammar, so four CI-green requests refused `AUTHOR-UNKNOWN`. The Architect's own remembered
   version of the rule was ALSO wrong ("before the first two colons"; measured: before the FIRST
   colon, exactly one token, all non-merge subjects agreeing).
2. **`A-REC-S117-BRANCH-ATTRIBUTION-ASSERTED-1`** — attributed `phase/context-retrieval-1` and
   `-organ` to AG-4 from memory; **the bus held the answer** (both governing cards addressed to AG-2
   at 2026-08-24 20:08Z). AG-3's lens resolved them to AG-2 and FLAGGED the disagreement rather than
   adopting either reading. **Cost: AG-4 committed on AG-2's branch in good faith, and `#387` is
   still blocked on the two-lane tie that created.**
3. **`A-REC-S117-LIVENESS-ASSERTED-FROM-ONE-LENS-1`** — certified AG-3 dead from one stale heartbeat
   while it was working, escalated it to the owner, and obtained a DESTRUCTIVE approval on a false
   premise. **The deletion ran at `06:01:40Z`; the withdrawal is stamped `06:01:51Z` — eleven seconds
   late. A live lane lost its address.** What caught it: the owner's screen. The unused lens: the wire.
4. **`A-REC-S117-NO-DAMAGE-INFERRED-FROM-CURRENT-STATE-1`** — then told the owner FOUR TIMES that the
   push had never run, because the ref read present at 06:02Z. See
   `F-S117-ABSENCE-OF-DAMAGE-IS-NOT-PROOF-OF-NO-DAMAGE-1`.
5. **`A-REC-S117-FENCE-ABSENCE-ASSERTED-1`** — carried "the budget fence never fires" across two
   sessions unmeasured. It had fired seven consecutive days. The probe window was also wrong:
   **a probe timed outside the observed distribution manufactures the answer it was sent to find.**
6. **`A-REC-S117-TOOL-ERROR-STRING-TAKEN-AS-MEASUREMENT-1`** — `gh` said "cannot update due to
   conflicts"; three `merge-tree` rehearsals in three directions produce the identical tree with no
   conflicted path.
7. **`A-REC-S117-CARD-GATE-CONFLICT-2`** *(v1; dropped by v2 and v3)* — the FIX-1 card said "touch
   nothing else" and CONFLICTED with the relay-audit gate, whose header flips the file to GOVERNED
   and produces 29 violations. Same class as S116's. Cure applied: **the gate source is read BEFORE
   the card is cut.**
8. **`A-REC-S117-CARRIER-ABSENCE-ASSERTED-1`** — the bootstrap v118 asserted that
   `REGISTER-BUG-BUCKET-v54` was owed, without listing the project docs. **LIST BEFORE YOU CLAIM AN
   ABSENCE.** The owner's question is what surfaced it.

**Unnamed candidate, carried from v1 and still uncarded:** the card-name / report-path grammar
mismatch (a card named `…-BUILD-1-v1` whose report lands at a different path leaves DONE-derivation
TODO-forever). Name it when it is carded.

**AND THE NUMBER THAT MATTERS MOST: of the previous Architect's last ten cards, ZERO would pass the
card preflight that already existed.** Measured by AG-4 at `2026-08-25T09:44Z` over the ten most
recent cards addressed to it — the whole corpus that lane can read:

    CP-1  10/10   CP-2   2/10   CP-3  10/10   CP-4  10/10
    CP-5  10/10   CP-6   4/10   CP-7   0/10   CP-8   6/10
    CP-9   4/10   CP-10  4/10   CP-11  0/10        CARDS THAT WOULD PASS: 0 of 10

Four checks refuse EVERY card — CP-1, CP-3, CP-4, CP-5 — and they are not four opinions, they are one
fact: **no card posted to that lane is written in the card grammar at all.** No `kind=card` header,
no `## PREMISE` section, no decay clause, no fan-out line, because cards are written as prose with
ORDERS. *A rule its author fails ten times out of ten while believing he follows it is the case for
moving the check to the reader* — which is what #401 does.

---

## 6 · BORN AT S118 OPEN · measured 2026-08-25 12:25–12:40Z against master `50ba7d7e`

- **`F-S118-CARD-GATE-LANDED-DISARMED-1`** — **the highest-consequence finding of the opening.**
  `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v118` §2 states *"A non-compliant card is REFUSED, its check
  ids reported, and the lane STOPS"*, and §3 states the preflight *"can refuse you"*. **MEASURED:
  `scripts/mail-wait.mjs:151` in master `50ba7d7e` reads `const CARD_GATE = 'REPORT';`.** At
  `readCard` (line ~712) the verdict is computed and, when `REFUSED`, the ids print — and then, unless
  `CARD_GATE === 'REFUSE'`, the lane prints `[CARD-GATE-DISARMED]` and **PROCEEDS INTO THE CARD.**
  The gate is landed and it is NOT armed. The arming note is explicit that this was deliberate and
  that the decision is the Architect's: *"a named, reviewable, revocable one-word decision, made by
  the Architect on evidence, not made by this lane inside a commit"* — because arming today would not
  gate the factory, it would HALT it (0 of 10 cards pass, including any card sent to countermand it).
  **CONSEQUENCE FOR S118: no card the Architect cuts today can be rejected by the receiving lane.
  The discipline is real; the enforcement is not. Believing otherwise is the exact class the gate
  exists to end.** The cure is not to flip the constant — it is to adopt the card grammar first, then
  arm. That is `PHASE-ARCHITECT-CARD-GRAMMAR-1`, and it is now blocking.
- **`F-S118-LANDING-COUNT-FOURTEEN-NOT-THIRTEEN-1`** — bootstrap v118 §1 and `S117-SESSION-NOTES-v3`
  §1 both say **thirteen** requests landed into master on 2026-08-25. **Measured from the wire in a
  fresh clone: FOURTEEN** — `#381 #384 #386 #389 #391 #392 #393 #394 #396 #397 #398 #399 #400 #401`
  — plus `#390` into `phase/context-retrieval-1`, so **fifteen landings in the day.** v3's list omits
  **`#381`** (`phase/foreman-boot-2026-08-24`, merged `03:25:25Z`). AG-5 corrected this count on the
  bus and said so in its own words: *"I corrected this once already and it did not take, which is
  itself the lesson: a number in prose does not survive being read twice."* **It then failed to take
  a second time — the bootstrap was written at 12:17Z, more than an hour AFTER the correction was
  posted at 10:56Z.** The list is the artefact; the arithmetic is the reader's.
- **`F-S118-AG3-REPORTS-NOT-ON-BUS-1`** — `LANE-AG3-RECLAIMED-1-report` and
  `LANE-AG3-REF-VANISHED-1-AG3-report` do not exist. Measured with THREE independent formulations
  (S102 · a single negative probe is not proof of absence): (a) `artifact_name` scan for `AG3`/`AG-3`
  across the whole table; (b) an aggregate over the whole table — 675 rows, 83 `from_lane`, **newest
  `from_lane` row `2026-08-25 10:56:28Z`**; (c) a grouped enumeration of every distinct `from_lane`
  artifact name since 04:00Z. AG-3's last post of any kind is
  `KADEME3-MERGE-AND-READ-1-AG3-report` at `04:13:30Z`. **The push-timing testimony that would shrink
  `F-S117-REF-READING-CONFLICT-UNEXPLAINED-1` has not been given.**
- **`F-S118-AG3-FIVE-CARDS-UNCONSUMED-1`** — five cards addressed to AG-3 carry `consumed_at = null`:
  `LANE-AG3-REF-VANISHED-1-AG3-v1` (07:46:16Z) · `LANE-AG3-RECLAIM-1-v1` (08:00:10Z) ·
  `LANE-AG3-RECLAIM-2-v1` (08:32:41Z) · `S117-STANDBY-1-AG3-v1` (10:53:39Z) ·
  `LANE-AG3-RECLAIMED-1-v1` (11:59:06Z). **AND YET** the nonce commit `82495d4d` names
  `LANE-AG3-RECLAIM-2-v1` in its subject — *"lane claim AG-3 ordinary walk 2026-08-25T08:38:38Z under
  LANE-AG3-RECLAIM-2-v1 empty lease"* — so AG-3 READ a card whose `consumed_at` never landed. Either
  the stamp fix had not reached AG-3's tree or the read path differed. **UNEXPLAINED. Do not close
  it with a story.**
- **`F-S118-STATE-ROW-VS-WIRE-DISAGREE-AG3-1`** — `factory_state` AG-3: `state=WORKING`,
  `nonce_sha=5cd6ddb144a4fcc4bb26ebf4f29d348b0ce33c16`, `heartbeat_at=2026-08-25 04:47:22Z`,
  `changed_at=2026-08-24 20:25:50Z`. The WIRE says `lane/AG-3@82495d4d`. **The row and the wire name
  different objects and the wire wins.** The row is a value nobody has been able to write, because
  the lane that owns it could not reach its verb without its ref. Neither half is the foreman's to
  change — AG-5 named this inconsistency itself at close rather than tidying it.
  **AG-3's four-state classification is `UNMEASURED`. Never `DEAD`.**
- **`F-S118-SILENCE-DECLARATION-UNREADABLE-1`** — measured by AG-4, **independently verified here in
  master `50ba7d7e`**: `readLanes()` in `scripts/factoryState.mjs:291-308` selects
  `lane_addr, state, nonce_sha, heartbeat_at, changed_at, changed_by` and **NOT `note`** — while
  `note` is the column a lane writes its `SILENT-UNTIL` declaration into; and `candidateNotice` has
  **no non-test caller** (every reference is in `api/cwf/__tests__/silenceContractAddendum.test.ts`
  and `api/cwf/__tests__/laneDeathCertificate.test.ts`). **So a declaration that IS written is
  returned by no landed read path.** The mechanism from #397/#399 is built and unwired. Uncarded.
- **`F-S118-WATERMARK-MOVED-BY-WRITELANE-1`** — measured by AG-4: `writeLane` updates
  `factory_state.changed_at`, and that column IS the per-lane box floor, **so posting a declaration
  moves the floor to now.** AG-4 proved it was safe in its own case rather than assuming — box empty
  above the floor, every card stamped, TABLE lens (which has no watermark) read on both sides of the
  write and compared — and measured that **heartbeats do NOT move the floor** (the watermark sat
  unmoved at 09:36:23 across dozens of ticks while `heartbeat_at` advanced every minute).
  **The defect itself is open and uncarded.**
- **`F-S118-SHARED-CLONE-BEHIND-CARD-GATE-1`** — REPORTED BY AG-4, **NOT verified by the Architect**
  (the foreman's shared clone is on the owner's machine and outside every Architect lens): *"THE GATE
  FROM #401 IS LANDED BUT THE SHARED CLONE HAS NOT CHECKED IT OUT: its mail-wait carries zero
  occurrences of CARD_GATE, so every lane still reads cards through an ungated reader; one
  `git merge --ff-only origin/master` fixes it and it is the foreman's call, not mine, because every
  window's tick runs from that tree."* Same class as `F-S117-FOREMAN-RAN-A-STALE-GATE-1`, one day
  later. **Compounds with `F-S118-CARD-GATE-LANDED-DISARMED-1`: even the REPORT half may not be
  printing.**
- **`F-S118-NOTES-V3-DROPPED-FINDING-NAMES-1`** — `S117-SESSION-NOTES-v3` supersedes v1 and v2 and is
  the fullest NARRATIVE, but it drops NINE item names that its predecessors carried (§4 above lists
  them). Under `EN TAM TANIKLI İFADE KAZANIR` a silent compression is a DEFECT, not an update.
  **This bucket is the restoration.** Standing rule, restated because it keeps being violated by
  well-written prose: *özetin özeti yasak; her kalem ADIYLA yaşar.*
- **`F-S118-CENSUS-STALE-AT-OPEN-1`** — `docs/ground/census.latest.json` STALE by **523 minutes**
  against a 60-minute bound (stamp `3273a2b3`, measured `2026-08-25T03:42:15Z`, read at
  `2026-08-25T12:25:35Z`). Not a premise until re-run. Recurrence of the S116 line — this is the
  third session in which census is stale at open, which makes the cadence itself the defect.
- **`F-S118-PROJECT-BOX-LEDGER-COUNT-STALE-1`** — the project instructions §9 state the canonical
  ground ledger holds **15** items, all `GI-0xx`. **Measured at S118 open: `docs/ground/open-items.md`
  holds 65 items.** The §9 figure was true at S112 and has been read forward three sessions since.
  Not a defect in the ledger — a defect in reading a frozen number in the present tense, which is the
  same class as `F-S112-GATE-TALLY-STALE-1` and `F-S117-ARCHITECT-WATCH-CARRIES-STALE-VERDICTS-1`.

---

## 7 · OWNER-SURFACE ITEMS · open, and NOT machine work

- **BUDGET FENCE — EIGHT consecutive red scheduled days.** Diagnosis is hypothesis (1): the budget
  state genuinely violates the fence. **Refuted against miscalibration on four independent grounds**,
  including that the suite partially recovered when the world was fixed. Two persistent failures:
  projected monthly spend exceeds the stop threshold (two independently sourced estimates agree), and
  **no warning notification between baseline and stop carries a subscriber** — *"silence before a
  stop is the defect this fence exists to prevent."* **Owner ruling 2026-08-25: watch, no action that
  day.** STANDING EXCEPTION: **if the stop actually fires, tell the owner immediately — nothing else
  will.** Never read the fence logs into a report (figures, account ids); report SHAPE only.
- **Warning-subscriber gap** — independent of the budget decision, reversible, still open, uncarded.
- **Claude Code window hangs** — no report filed, by owner decision; write one on the NEXT
  occurrence. Two cases held: AG-3 `HUNG` (~05:00–08:00Z, recovered by ESC + `continue`); AG-5
  `LOOP-DEAD` (poller silent 06:00–07:45Z, agent alive throughout and unaware).
- **A transcript is a PUBLICATION** (standing rule adopted from AG-4) — if the next read would put a
  secret into an artefact, the lane STOPS and asks for a card.

END-OF-BUCKET REGISTER-BUG-BUCKET-v55
