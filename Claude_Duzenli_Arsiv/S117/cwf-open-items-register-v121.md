# CWF OPEN ITEMS REGISTER — v121 (S117 close, written at S118 open)

Supersedes v120. Append-only; items leave ONLY via `CLOSED@evidence` / `SUPERSEDED-BY` / `MERGED-INTO`.
Predecessor `claude/cwf-open-items-register-v120.md` READ IN FULL before this was written; nothing here
is reconstructed from a bootstrap (S102 · a derived view is not a source).

**GROUND FLOOR, MEASURED not asserted:** `origin/master` = `50ba7d7efcd8b870e8350090696067c409e16a5c`
on the wire and in a fresh clone at `2026-08-25T12:25:33Z`. v120's floor was `4408fd88` (#376).

## 0 · THIS FILE IS A MIRROR AND HERE IS WHAT IT MIRRORS

**The canonical home for open items is `docs/ground/open-items.md` in the repo**, behind two floor
gates (`api/cwf/__tests__/groundLedger.test.ts` over `scripts/groundLedgerCore.ts`). This project-box
register is a **MIRROR**, and mirrors go stale silently — `PB-S108-1`, evidence
`F-S108-RULE24-COLLISION`, and again `F-S112-CANONICAL-LEDGER-SCOPE-1`.

**It mirrors commit `50ba7d7e`.** At that commit `docs/ground/open-items.md` holds **65 items**,
measured by `npm run architect:open` field 9 at `2026-08-25T12:25:35Z`. The project instructions §9
still say "15 kalem, hepsi GI-0xx" — **that figure was true at S112 and has been read forward three
sessions since.** Filed as `F-S118-PROJECT-BOX-LEDGER-COUNT-STALE-1`.

**The honest fix is still not done and is still `PHASE-ARCHITECT-CARD-GRAMMAR-1` item E:** card a lane
to migrate the project items INTO the repo ledger so there is one home. Until then this file exists
and says out loud that it is the copy.

## 1 · CLOSED THIS SESSION — `CLOSED@evidence` · S117

Fourteen requests landed into master on 2026-08-25 — **`#381 #384 #386 #389 #391 #392 #393 #394 #396
#397 #398 #399 #400 #401`** — plus **`#390` into `phase/context-retrieval-1`**, its own base. Fifteen
landings. Measured from the wire in a fresh clone; see `F-S118-LANDING-COUNT-FOURTEEN-NOT-THIRTEEN-1`
for why the number is stated as a list rather than as a word.

- `F-S117-FOREMAN-RAN-A-STALE-GATE-1` → **#396**. The foreman's shared clone was 34 commits behind; the
  gate now prints its own revision and REFUSES when the deciding files diverge from `origin/master`.
  It compares CONTENT, not distance, so a behind-but-identical checkout passes and is merely named.
  It caught its own author's drift within an hour of landing.
- `F-S117-LAND-ASSUMES-MASTER-BASE-1` → **#396**. `baseRefName` is now threaded and step 7 proves the
  RIGHT ref moved. Proven end to end by **#390**, the first stacked landing this factory has made.
- `F-S117-ANCHOR-HID-A-CARD-1` (6 instances) → **#392**. `>=` plus id dedup, plus a count over the SAME
  predicate cross-examining every zero read, plus a per-lane watermark from `factory_state.changed_at`.
- `F-S117-MAIL-VERB-NEEDS-TWO-CONNECTIONS-1` → **#392 / #394**. `relay_mark_consumed` now actually
  fires; it had taken 42501 on every delivery since the file existed.
  **`F-S111-RELAY-CONSUMED-NOT-WRITTEN` → SUPERSEDED-BY this item** — v120 carried it as "transport
  read-only, WRITE-channel decision pending", a correct symptom on a wrong cause.
- `F-S117-LAND-ANCESTRY-NEEDS-THE-HEAD-OBJECT-1` → **#398**. The ancestry test fetches the head object
  first; genuine unknowns still report `UNMEASURED`.
- `F-S117-CARD-AND-LANE-PASS-IN-FLIGHT-1` → **#400 / #401**. Card preflight in the RECEIVING LANE,
  CP-9 measured-at · CP-10 disagreement clause · CP-11 fresh box read.
  ⚠ **The closure is real and the enforcement is not: the gate landed DISARMED** —
  `F-S118-CARD-GATE-LANDED-DISARMED-1`, §3.
- `F-S117-DEAD-LANE-REF-NOT-RECLAIMABLE-1` → **#397 / #399**, PARTIAL. `SILENT-UNTIL <iso> :: <what>`,
  `UNDECLARED-SILENT` as its own class, a candidate notice that NAMES and never acts, a destructive
  dwell. ⚠ **The READ half is unwired** — `F-S118-SILENCE-DECLARATION-UNREADABLE-1`, §3. **This item
  is therefore NOT closed; it is carried in §2 with its built half named.**
- `F-S117-CI-DIET-REASON-FALSIFIED-1` → **#392**.
- `F-S117-LAND-STATUS-VS-CHECKS-1` → adopted into the drain ritual (wait on the STATUS as well as the
  CHECKS, at the full sha). Behavioural, not code.
- `F-S117-FACTORY-STATE-NO-WRITE-CHANNEL-1` → **CLOSED@evidence**, FACTORY-BOOT-2 (#379 + the operator
  apply + TRANSPORT-1), proven live at S117 close: AG-5 wrote `PARKED` through its own verb and read
  the row back from the table rather than trusting the exit code.
- `FACTORY-BOOT-1-AG5-PROOF` (carried from v120) → **CLOSED@evidence**. The S117 zero-paste open ran:
  owner said "fabrikayı başlat", opened one foreman window, typed `/ub`, pasted NOTHING.
  `PLATINUM-BREACH-S116-1`'s acceptance test PASSED — and it passed by producing three filed defects
  rather than a clean run, which is the test working.
- `CI-DIET-1` (carried from v120) → **CLOSED@evidence #377**.
- `F-S115-BUDGET-FENCE-A3-INSTANCE-DRIFT-1` repo half → stays closed (#372). The fence's *behaviour* is
  a separate live item; see §4.

## 2 · OPEN — carried from v120, or born in S117 and NOT closed

- **`#29 A23 UNDERSTANDING LAYER`** — the seventh internal SOTA key. `stageClarify.ts:321-329`, the
  binary resolved/unresolved loop, is the measured kill site. **It now has a live production
  reproduction AND falsifier**: `F-S117-CLARIFY-CHILD-LAYER-FALSE-EMPTY-1` (bucket v54, restated in
  bucket v55 §1), deterministic on any `KB7 <equipment-metric>` query. That is a change in kind — the
  key stops being a design item and becomes a bug with a repro.
- **`#387`** `phase/context-retrieval-1` head `993fa218` — `AUTHOR-UNKNOWN` on a TRUE two-lane tie
  (13 subjects, 11 tokenless, 3 reports naming 2 lanes). Everything ahead of authorship is green.
  **Measured: landable by AG-5 and by nobody else, and only after #402.** No report was removed from
  any tree to clear it, and none should be.
- **`#402`** `phase/lens-author-set-1` head `2d7469d8` — the AUTHOR-SET lens, delivered by AG-4,
  **design credited to AG-3** in the branch's own opening paragraph. RED on one unexplained test.
  See `F-S117-ROUTE-DERIVE-G3-RED-UNEXPLAINED-1`.
- **`F-S117-REF-READING-CONFLICT-UNEXPLAINED-1`** — open, unattributed, with a live mirror case
  (AG-3's `82495d4d` dated `08:38:55Z` yet read absent six times after it). The settling measurement
  is AG-3's own transcript and **it has not been given** —
  `F-S118-AG3-REPORTS-NOT-ON-BUS-1`.
- **`F-S117-UPDATE-BRANCH-EXIT-1-UNEXPLAINED-1`** — open.
- **`F-S117-ROUTE-DERIVE-G3-RED-UNEXPLAINED-1`** — open, with one outcome ruled OUT on evidence.
  **Raising the timeout is forbidden.** The next measurement must produce CI-grade load.
- **`F-S117-DEAD-LANE-REF-NOT-RECLAIMABLE-1`** — carried, half built (#397/#399), read path unwired.
- **`F-S116-RELAY-INBOX-MIGRATION-DRIFT-1`** — unchanged, uncarded.
- **`F-S117-FOREMAN-BACKLOG-BLIND-1`** — the strictly-greater half closed in #392; "a fresh window
  starts blind to its own backlog" was never separately repaired.
- **`F-S117-FOREMAN-DRAINING-RESOLVE-GAP-1`** — no rule for BOOTING INTO a stale `DRAINING`; the
  escalation reached the owner's screen rather than the bus. Uncarded.
- **`F-S117-S116-DRAIN-TAIL-1`** · **`F-S117-CLOSE-SHUTDOWN-NOT-WRITTEN-1`** ·
  **`F-S117-REWRITE-ORPHANS-STAMP-1`** · **`F-S117-JEST-DOM-SETUP-GAP-1`** ·
  **`F-S117-ARCHITECT-WATCH-CARRIES-STALE-VERDICTS-1`** — all open, all restored by name in bucket v55
  §4 after `S117-SESSION-NOTES-v3` dropped them.
- **`F-S117-LIVENESS-IS-POSITIVE-ONLY-1`** — kept OPEN deliberately as a standing constraint. It has no
  repair; it has a consequence. FOUR states — `BUSY` · `DEAD` · `LOOP-DEAD` · `HUNG` — and the last two
  are visible only from outside. **The factory NAMES a candidate; a human CONFIRMS.**
- **`F-S117-LANDING-COUNT-WATCHES-MASTER-ONLY-1`** — a counter that only watches master misses every
  stacked request.
- **Kademe 3** — `PHASE-CONTEXT-RETRIEVAL-1` (**still no design document; its name appears in two
  carriers and it has no doc**) · archive automation → private repo (ORDER D blocked on a harness
  refusal, reported and NOT routed around) · Operator boot to repo · takeover-in-walk relocation retry
  · MCP inventory (14 servers) · model pin · eval-canary 25+ SKIPPED investigation (UNMEASURED at S118
  open: `gh` is ENOENT in the Architect container).
- **Kademe 4** — H9 deploy verification · H10 lane_events dispatch half on the `factory_events`
  substrate.
- **Carried unchanged from v120, none of them dropped:** VECTOR-QOS before any engine switch (owner
  verbatim) · `#82b` Design-RAG PARKED (**"ASLA UNUTMA"**) · Qdrant owner surface deferred ·
  `ADF-HEADLESS-LANE-1` deferred · G3 birth proof (ARMES/Hülya) · org repo migration · Operator lane-row
  seed deviation (harmless; resolve in FACTORY doc v2) · census re-run cadence — **now itself a defect:
  STALE at open for the third consecutive session** (`F-S118-CENSUS-STALE-AT-OPEN-1`).
- **`#81 BACKEND-DISCOVERY-1`** — carried from the project instructions' §9 sequence, untouched since.

## 3 · BORN AT S118 OPEN — the full list lives in bucket v55 §6, named here so the ledger holds them

`F-S118-CARD-GATE-LANDED-DISARMED-1` (**blocking**) · `F-S118-LANDING-COUNT-FOURTEEN-NOT-THIRTEEN-1` ·
`F-S118-AG3-REPORTS-NOT-ON-BUS-1` · `F-S118-AG3-FIVE-CARDS-UNCONSUMED-1` ·
`F-S118-STATE-ROW-VS-WIRE-DISAGREE-AG3-1` · `F-S118-SILENCE-DECLARATION-UNREADABLE-1` ·
`F-S118-WATERMARK-MOVED-BY-WRITELANE-1` · `F-S118-SHARED-CLONE-BEHIND-CARD-GATE-1` (reported by AG-4,
NOT verified by the Architect) · `F-S118-NOTES-V3-DROPPED-FINDING-NAMES-1` ·
`F-S118-CENSUS-STALE-AT-OPEN-1` · `F-S118-PROJECT-BOX-LEDGER-COUNT-STALE-1`.

**Two more were born after the session's first hour, during the owner-ordered factory refresh, and
they are the two that changed what the day is about:**

- **`F-S118-CLAIM-GUARD-DEADLOCK-AFTER-LEGITIMATE-RECLAIM-1`** — verified by the Architect from the
  PRIMARY source (`supabase/migrations/20260824060000_factory_write_channel.sql:182-201`), not from
  the lane's report. `factory_claim` admits a re-claim in exactly two shapes: the presented nonce
  matching the stored one, or `state = 'CLOSED'`. **Both are gated on a nonce only the DEAD window
  could present.** So a lane that lawfully re-wins its address after its predecessor window died can
  never re-enter the database: `factory_claim` refuses `FW002`, and the `CLOSED` write that would
  satisfy the second shape is refused `FW001` by `factory_write_lane` against the same stored nonce.
  Measured live on AG-3: row `state='WORKING'`, `nonce_sha='5cd6ddb1…'` (the window AG-5 deleted at
  `06:01:40Z`), while `lane/AG-3` on the wire reads `82495d4d`, won at `11:53:30Z` on an empty lease
  with one atomic push. **AG-3's own sentence, adopted verbatim into the record: *the address is free
  in git and unwritable in the database at once.*** The durable repair is a third admissible shape —
  or a `factory_release(addr, nonce)` a lane holding the GIT half can call — and it is a PHASE, never
  a hand-edit. **`AG-3 did NOT reach for `planTakeover`** even though it sat in the module it was
  already calling, because both cards said this is not a takeover.
- **`A-REC-S118-CLOSING-CARD-NAME-NOT-READ-1`** — the Architect's three closing cards were named
  `S118-REFRESH-CLOSE-1-<lane>-v1`, and both boots key the end of a lane's claim on a card named
  **`*-CLOSING-*`** for that lane (`.claude/boot/producer.md:204`, `.claude/boot/foreman.md:484`).
  The names do not match. **A lane following the letter of its boot would have been right to keep its
  claim.** AG-4 released anyway, reading the ORDERS rather than the file name. Same class as
  `A-REC-S117-CARD-SUBJECT-GRAMMAR-OMITTED-1`: a card written without reading the grammar the
  RECEIVER enforces — committed inside a session whose opening message named that exact class.
  Re-issued correctly at `12:43:13Z`; the mis-named cards were NOT withdrawn (S37-1).

**And one finding closed by evidence within the hour it was filed:**
`F-S118-AG3-REPORTS-NOT-ON-BUS-1` → **the absence was real and its CAUSE was not silence.** AG-3's
bus post is refused by the harness (auto mode could not evaluate it, not retried and not reworked per
its own CLAUDE.md §6) and its DB channel is fenced by `FW002`. **Two blocked channels, not a dead
lane.** The item stays in the ledger wearing its closure, because the classification it was filed
under — `UNMEASURED`, never `DEAD` — is the thing that has to survive: it was the correct reading
before the cause was known, and it is why nobody swept a live lane's address twice in two days.

**`PHASE-ARCHITECT-CARD-GRAMMAR-1` is promoted to BLOCKING.** Not for tidiness: the card preflight
cannot be armed until cards are written in the grammar it checks, and until it is armed every
discipline this session adopted is advisory. AG-4's measurement is the evidence — 0 of 10 cards pass,
and four checks (CP-1, CP-3, CP-4, CP-5) refuse all ten for one reason: no card posted to a lane is
written in the card grammar at all. Item E (the ledger migration) rides the same phase.

## 4 · OWNER-SURFACE ITEMS — consent and witness only, never operations

- **Budget fence: EIGHT consecutive red scheduled days.** Hypothesis (1) — the budget state genuinely
  violates the fence — refuted against miscalibration on four independent grounds. Two persistent
  failures: projected monthly spend exceeds the stop threshold (two independently sourced estimates
  agree), and **no warning notification between baseline and stop carries a subscriber.** Owner ruling
  2026-08-25: **watch, no action.** STANDING EXCEPTION: **if the stop actually fires, tell the owner
  immediately — nothing else will.** Report SHAPE only; never read the fence logs into an artefact.
- **Warning-subscriber gap** — reversible, independent of the budget decision, still open, uncarded.
- **Claude Code window hangs** — no report filed by owner decision; write one on the NEXT occurrence.
  Held: AG-3 `HUNG` (~05:00–08:00Z, recovered by ESC + `continue`); AG-5 `LOOP-DEAD` (poller silent
  06:00–07:45Z, agent alive and unaware).

## 5 · SOTA GATE — TWO SCOREBOARDS, both cited, per the rule that a close citing only (A) is incomplete

**(A) INTERNAL 7-KEY TALLY — 6/7.** Open: `#29` A23. Canonical enumeration `cwf-sota-full-table-S106-v2`
§A. **This is an internal readiness measure and it is NOT the acceptance criterion.**

**(B) ACCEPTANCE CONTRACT — 0/16.** `cwf-sota-definition` v1_5 §10: sixteen external criteria, sixteen
UNMEASURED · `mcp-honestbench` NOT BUILT · D-OPA-2 / D-OPA-3 UNMEASURED · cost UNMEASURED. The only
measured rows are internal M-A rows, and §10.1's own sentence governs them: under C2, an internal,
self-run, unpublished number is a self-portrait. **Turning the seventh key does NOT satisfy SOTA-1.**
The one measured row's expiry is EVENT-BASED and probably already expired — `frameRouting=1` went live
at S106 and layer-aware `[EntityResolve]` prints in production — **but that has not been measured.**
The measurement that resolves it is `MA-RERUN-2` re-run after `b0e8c9e2`. It has not been run in
S113, S114, S115, S116 or S117.

END-OF-REGISTER cwf-open-items-register-v121
