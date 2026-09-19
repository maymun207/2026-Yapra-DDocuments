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
