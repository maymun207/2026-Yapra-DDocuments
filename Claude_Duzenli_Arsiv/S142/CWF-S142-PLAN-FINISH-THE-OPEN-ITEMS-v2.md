# CWF-S142-PLAN-FINISH-THE-OPEN-ITEMS-v2

v2 SUPERSEDES v1, cut roughly twenty minutes after it, 2026-09-18. v1's text is carried WHOLE below this
block and nothing in it is deleted (A-REC-S101-7: a governance artefact is written whole, never patched by
string surgery; the join below was done by machine, not by hand). v2 corrects ONE sentence of v1 — its
most load-bearing one — and names the class that produced the error.

## THE DEFECT IN v1, QUOTED FROM ITSELF

v1 §2 Track 1 says: "the spine's next card is P1-4, the cross-turn carrier … named by the S140 carrier
itself rather than chosen by the Architect." The second half was the Architect's defence of the first
half, and both are WRONG.

**P1-4 IS DONE.** Measured from the project box and the landed tree:

- `F-S140-CROSS-TURN-CARRIER-ABSENT-1` is **CLOSED@evidence** in `CWF-S140-FINDINGS-v2`, with a
  correction to its own wording: the slice ALREADY EXISTED as the episodes row (`entities.canonical` +
  scope) plus `EpisodesRepository.listRecentByConversation` — "the A23 CARRIER read". Only the CONSUMER on
  the clarify path was absent: CALLER-ABSENT (§12.6), not MECHANISM-ABSENT. **No migration was needed.**
  Wired by PR 575 and witnessed TWICE on production (`ARCHITECT-WITNESS-S140-CARRIER-LIVE-1`).
- Its residual defect was then cured in S141 by PR 576 and witnessed on production
  (`ARCHITECT-WITNESS-S141-CARRIED-OPTION-INJECTED-LIVE-1`): stage 03 of the reply turn read
  `optionRefs: ["FIRINUST"], injectedRef: "FIRINUST"` — the feeder fired, on the exact folded shape that
  had idled the rung the night before.
- The landed tree at the anchor carries `api/cwf/__tests__/carryLastResolution.test.ts`,
  `EpisodesRepository.ts`, the `20260730150000_episodes.sql` migration, and consumers across the turn and
  memory paths.

## WHY v1 GOT IT WRONG, AND THE CLASS IT BELONGS TO

`CWF-S140-IMPLEMENTATION-PLAN-EVERYTHING-LIVE-v2` was cut at 2026-09-16T18:12Z. Its section "WHAT THE
WITNESSES SAY THE NEXT CARD IS" lists P1-4 as next. **PR 575 landed at 20:20Z THE SAME EVENING** — two
hours after the carrier was cut. The carrier is not lying; it is OLDER THAN THE WORK.

This is `F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1` at the level of a WORK QUEUE: a number — or
here, a position in a queue — carried from one carrier to another without being re-derived. The Architect
has now done it FOUR times in one session: "scope gate then tau/beta" (from the register's summary), "the
three BENCH items first" (from §6, over an owner-locked spine), "BENCH-A2A-1 as a build card" (caught by
the box: it is built), and now "P1-4 is next" (caught by the box: it is done).

THE MECHANICAL CURE, and it is narrow enough to obey: **the next card is derived from a measurement of the
PRODUCT — the landed tree, the live database, a production trace — and never from a plan carrier's own
"next" list.** A carrier's queue is a derived view (DERIVED-NEVER-SOURCE). When the two disagree, the
product wins and the carrier is advanced with the difference recorded, which is what this v2 is.

## THE CORRECTED NEXT CARD

**§9-1 · THE BASELINE, and it is a RUN card, not a build card.** Measured in the landed tree: both
instruments the plan names already exist — `api/cwf/_lib/replay/routerAbLens.ts` and
`api/cwf/_lib/replay/toolRetrievalRecall.ts`, each with its own test file. Nothing is built; a number is
produced.

What it produces: Recall@k and offered-set width, N-rep, on the live corpus, at TWO trees — master
`4c6df852` (the fork point of PR 573, the pre-wiring state) and current master — reported as one number
each. The plan's own words: "§9-1 stays owed." It is owed from S140 and it is the number every later item
is judged against, which is why it comes before scope gate, before the typer and long before tau/beta
calibration.

After it, unchanged from v1 and in the spine's locked order: tool-selection observation (#20, measure
before designing) → #15 scope gate → #16 typer + channel-2 BM25 + RRF → #13 tau/beta.

## WHAT v1 GOT RIGHT AND v2 DOES NOT TOUCH

Everything else stands as written below: the owner's standing ruling is what decides the question, the
spine is not reordered, Track 2's three host-free items start now, Track 3 is the factory's own debt, and
the owner's surface is TWO HOSTING DECISIONS — the A2A endpoint plus a GHCR-class token, and the vector
engine host — plus a later named spend approval for the scored runs.

ONE ITEM ALSO NEEDS ITS STATUS RE-READ before it is cited again: `F-S140-CARRIED-OPTION-MATCHED-BUT-NO-REF-TO-RESOLVE-1`
is carried as OPEN in `cwf-open-items-register-v131` §3, but the S141 production witness above reads like
its cure. Whether it is CLOSED@evidence is UNMEASURED here and must be settled at the close rather than
asserted in either direction.

---
(v1 text, carried whole)

# CWF-S142-PLAN-FINISH-THE-OPEN-ITEMS-v1

Cut 2026-09-18, S142, on the owner's question at 05:55 TSİ: *"bu acik itemlar bitmedi ise once onlari
bitirmemiz gerekmiyormu? Bunlari nasil yapacagiz senden bir plan yapmani istiyorum"*. Recorded by name as
an owner design contribution (S112-YASA-1).

## 0 · THE QUESTION WAS ALREADY RULED, BY HIM, AND THE ARCHITECT HAD DRIFTED OFF IT

His question is not a preference to be weighed. It restates a STANDING OWNER RULING:
**OWNER-RULING-S140-EVERYTHING-IN-THE-TABLE-GOES-LIVE-1**, his words — *"Bu tabloda olan her item
çalışmıyorsa çalışacak, bağlı değilse bağlanacak, eksikse inşa edilecek … bu tabloda her şey çalışıyor,
her fonksiyon aktif olacak."* Beside it stands **KARAR-A23-SEQ-1**: the A23 §9 build order is the spine
and it is OWNER-LOCKED.

THE ARCHITECT'S ERROR, THIRD CORRECTION OF THE NIGHT AND THE ONE THAT MATTERS. Earlier this session it
proposed two orderings in a row — first "scope gate then tau/beta", then "the three BENCH items first" —
and BOTH were authored without reading the primary sources that already decided the question. The second
one would have reordered an owner-locked spine on the strength of §6 of the acceptance contract, which
the Architect had just read for the first time in twenty sessions and immediately over-applied. The cure
is mechanical, not moral (A-REC-S122-ARCHITECT-PRECISION-DECAY-1): the archive search and the standing
rulings are read BEFORE a queue is proposed, never after the owner questions it.

## 1 · WHAT THE MEASUREMENT ACTUALLY CHANGED, AND WHAT IT DID NOT

It did NOT change the spine's order. What it changed is the SHAPE of the benchmark harness:

- `cwf-sota-definition-v1_5.md` exists in the archive, five byte-identical copies, and §6 says three items
  block **15 of 16** criteria: BENCH-A2A-1, BENCH-RESET-1, BENCH-BACKEND-MOUNT-1.
- **BENCH-A2A-1 IS LARGELY BUILT.** Measured in the landed tree at the anchor: nine source files under
  `a2a/` (server.ts with the exact `--host/--port/--card-url` entrypoint the contract names, agentCard.ts,
  executor.ts, machineAuth.ts, responseSink.ts, runTask.ts, spendFence.ts, config.ts), four test files,
  three helper scripts, `Dockerfile.a2a`, and FIVE relay reports including a 390-line
  `PHASE-BENCH-A2A-1-report.md`. The phase already ran. Cutting a "build the A2A agent" card would have
  ordered a lane to build what exists — the CALLER-ABSENT class at infrastructure scale (§12.6), and the
  project box stopped it (§12.5).
- WHAT IS GENUINELY MISSING, from that report's own OWED section plus an Architect measurement of all ten
  workflows at the anchor: **no workflow builds or deploys the a2a image** (GHCR appears only for the
  bge-m3-encoder); **the GHCR push was never performed** — "no GHCR-class token in the environment …
  No credential was manufactured"; **`api/admin/bench-reset.ts` can never succeed in production** because
  `persistence_class_catalog` was never authored (F-S99-BENCH-RESET-UNARMED), so BENCH-RESET-1's
  assessment-level half is unarmed while its per-task clean-agent seam works and is proven; and **the arm
  answers Turkish to an English task**, which lands in the GOVERNED PROMPT layer and which that report
  says "should be closed before any scored run".

So 15 of 16 criteria are blocked not by unwritten code but by A HOST, A TOKEN, and two data-shaped
repairs. That is a different plan from "build three things".

## 2 · THE PLAN — THREE TRACKS, AND ONLY ONE OF THEM NEEDS THE OWNER

### TRACK 1 · THE SPINE. Finish the open items, in the order already locked.

This track answers his question directly and it is the main line. The plan carrier
`CWF-S140-IMPLEMENTATION-PLAN-EVERYTHING-LIVE-v2` names the next card itself, so the Architect does not
get to choose it:

1. **P1-4 · cross-turn carrier** (§9-3b, last-resolution slice): table via Operator migration, written at
   flush, read at ②. The carrier's own words for why it outranks the graph: the missing carrier "loses the
   factory on every reply turn to an ask — a defect the owner witnessed". THIS IS THE NEXT CARD.
2. **§9-1 baseline on BOTH trees** — Recall@k + offered-set width, N-rep, at master `4c6df852` (573's fork
   point) and at current master, reported as one number each. The pre-wiring number is recoverable because
   the tree exists in git.
3. **Tool-selection observation** (owner list #20, F-S140-TOOL-OFFERED-BUT-NOT-CHOSEN-1): offered set
   versus called set over the day's ledgers. MEASURE FIRST; a gate only if the ratio is bad.
4. **#15 scope gate** (§9-6): signal table as governed rows, `router.nudgeOnTimeUnclear`, attributed scope.
5. **#16 typer + channel-2 BM25 + RRF** (§9-4) — score space is born here.
6. **#13 τ/β calibration** (§9-5) — and note the order: the spine puts calibration AFTER channel-2 is live
   and L5 data exists. Tonight's earlier suggestion to do τ/β second was wrong by the spine's own text.
7. **#17 / #18 / #19** hang off those in the plan's own numbering (§9-5 · §9-6 · §9-7, then P2, then P3).

**#14 GraphKb needs ONE measurement before it keeps its DEFERRED label.** It was deferred behind P1-4 with
a measured reason: the registry's parentage and `entity_topology_edges` agreed on every line row (783/783)
and the equipment layer had "1725 edges, 0 registry rows". Since S135 the equipment layer HAS registry
rows (1688). The stated trigger to pull P1-5 forward may therefore be met. That is a measurement to run,
not a conclusion to assert.

### TRACK 2 · THE HARNESS. Everything here that needs nothing from the owner starts now.

SOTA-1 forbids the Architect deferring any item that advances a criterion, so nothing in this track waits
on Track 1. Three pieces are machine work and are orderable immediately:

- **The language confound.** §7.1 of the contract already RULED: "benchmarks run in English … A Turkish
  handicap is a finding, not an excuse." The product currently answers Turkish to an English task, in the
  GOVERNED prompt layer — a governed-row change through the publish pipeline, not a code change. It gates
  EVERY scored run in Tiers A, B, C, D and F. Cheapest item in the whole plan per criterion unblocked.
- **`persistence_class_catalog`.** Author it so `api/admin/bench-reset.ts` can succeed; that arms
  BENCH-RESET-1's assessment-level half, which AgentBeats mandates.
- **BENCH-BACKEND-MOUNT-1.** Mount a benchmark's MCP servers as an ordinary backend with zero code change.
  This needs NO host: it runs in-product. The contract says the pass/fail of the mount is the STRONGER
  result — stronger than the score — because a mount needing a code change falsifies ADR-009 on the spot.

### TRACK 3 · THE FACTORY'S OWN DEBT. Machine work, cheap, and it closes his list's tail.

**#21** producer NUL gate · **#22** S140 findings into the register (already carried in v131 §3) ·
**#23** the archive push — `Claude_Duzenli_Arsiv/S141` and `S142` are UNTRACKED in the local documents git
and have never reached GitHub, and the bug bucket has stood at v57 since S138 — one lane card covers both ·
**#24** the five S142 closing carriers.

## 3 · THE OWNER'S SURFACE — TWO DECISIONS, AND THEY ARE BOTH HOSTING

Everything else above is machine work. These two are not, and each one unblocks a whole block:

1. **Where the A2A agent is hosted, plus a GHCR-class token.** Until an endpoint exists that a third party
   can reach, C2 and C3 cannot be satisfied by any amount of code, and 15 of 16 criteria stay unprovable.
   This is `F11` in `S132-CWF-MISSING-FUNCTIONALITY-v2`, where it has stood as "waits on your vendor call
   and spend".
2. **The vector engine host** (`P0-2`, owner-side host item, `F-S140-VECTOR-ENGINE-UNREACHABLE-1`): every
   witnessed turn raises `VectorEngineUnreachableError`, and the plan makes P2-1 wait on it explicitly —
   so this one decision gates the whole of P2, which is the owner list's #18.

A third, later and named now so it is not a surprise: §7.5 of the contract ends "All of §6 is AG lane;
spend is owner." The scored runs will need a named spend approval when their cards are cut. Not tonight.

## 4 · WHAT THIS PLAN REFUSES TO DO

It does not defer any item that advances a criterion on grounds of convenience — SOTA-1 allows the
Architect exactly one objection class and it must name (a) the criterion left unproven, (b) the date it
becomes provable and (c) the measurement that resolves it. Rather than invent a date for the benchmark
runs, Track 2 starts the parts that need no host tonight, so nothing that CAN move is held. What remains
gated is gated by an owner decision, which is not an Architect deferral.

It also does not reorder the spine. KARAR-A23-SEQ-1 is owner-locked, and tonight's measurement gave no
reason to touch it — it changed the harness, not the understanding layer.

## 5 · VERIFICATION, PER ITEM, UNCHANGED

CI at the full forty-hex head read by the scout (S101-L1: the run must EXIST) · Vercel READY at that sha ·
a post-deploy `turn_trace_digest` read · and the owner's witness on his own screen where the item is
visible to him. A landing without the post-deploy read is not closed (S63-1). No item closes on merge.

END · CWF-S142-PLAN-FINISH-THE-OPEN-ITEMS-v1
