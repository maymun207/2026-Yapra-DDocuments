# CWF — Open Items Register · v84

<!-- cwf-open-items-register-v84 · 2026-08-04 · closes S81.
     Supersedes v83. Derived from v83 §4/§5's carried items plus what S81
     measured. §BUG is carried BY REFERENCE — see §2, which explains why and
     flags the rule amendment that needs owner ratification. -->

---

## §0 · FLOOR — the state this register describes

| Value | Measured, this session, from a fresh clone |
|---|---|
| `origin/master` | **`b960a1c9c44120f1e8821609d1f9acc4c2612646`** |
| migrations | **67** |
| test files | **445** |
| tests | **4965** (CI-arbitrated, not re-derived by the Architect — S37-2) |
| docVersion | **rev 189 · 2026-08-04** |
| ADRs | **13** (ADR-013 = `DECISION-PARITY-1`, minted this session) |
| production | `dpl_FHuACmdStcB4EtZJ4Gz4oS82oz3S` @ `b960a1c9`, converged |
| remote branches | `master` + `phase/bug-004-column-truth-1` (`91243a62`, an ancestor — stale, harmless, sweepable) |

**Three merges this session:** `ecea4851` (BUG-004), `b960a1c9`
(BACKEND-LIFECYCLE-AFFORDANCE-1), and `d3d246c1` (MA-RERUN-1) landed at S81's
open.

---

## §1 · WHAT S81 DID

**Block 1 is SEALED.** `W-M1F2A-1` — the watch Block 1's seal hung on — was
answered by a census rather than a window: the repaired spend fence has **never**
recorded a `measurement_unavailable` row since `ce9c96de` deployed. The register
had framed it as a live 00:00–02:00Z watch; the evidence turned out to be durable
in `telemetry_events`, so every day since the deploy was read at once. The
positive control held: five *other* error kinds are present, and the recording
path is proven end-to-end by twelve rows from two other guards.

**Rollout 2.1 · `MA-RERUN-1` — merged `d3d246c1`, verdict VOID and honestly
reported.** The corpus (6626) has outgrown the instrument's hard cap (5000), so
`truncated.synthetic` is true at every legal `--limit`. Three findings outlast
the void, and the first is the most transferable:

- **The `n`-matching remedy is DISPROVEN with figures.** A recency-ordered cap
  over a per-set-rotated corpus concentrates on recent traffic: `perUtterance.n`
  went **9 → 52** and `LINE × entity-unresolved` went **20 → 420** between the
  3000- and 5000-row windows. **Matching `n` matches a count, not a population.**
  That remedy was the Architect's, in both the recon and the brief.
- **`high-unattributed` is a named cause with no name in the enum** — 23/23 at
  L3000 and 155/155 at L5000 correspond exactly to
  `layerStatus=declared-empty` on the `equipment` layer.
- **A per-frame registry degradation is invisible in the lens's own JSON
  evidence** — recoverable only from the stderr line F199 made born-loud. This
  became **BUG-008**.

**Rollout 2.3 · `BACKEND-LIFECYCLE-AFFORDANCE-1` — merged `b960a1c9`.** Five
bucket entries' code half, one law, zero migrations, zero new surfaces.
`ADR-013 DECISION-PARITY-1` landed **before** the code that cites it.

**BUG-004 fixed and CLOSED** — the smallest bug, sequenced first precisely so
the closure machinery would be exercised end to end. It was, and **the machinery
produced a defect in itself** on the first run: the proof's pass condition pinned
an absolute baseline that drifted, and applied literally would have declared a
working fix broken. That produced **S81-2**.

---

## §2 · §BUG — CARRIED BY REFERENCE, AND A RULE AMENDMENT THAT NEEDS RATIFYING

> **`REGISTER-BUG-BUCKET-v9` · 8 OPEN · 3 CLOSED · 3 WATCHLIST · 2 DEBTS**

`BUG-CARRY-1` rule 1, as the owner ratified it, requires §BUG to be the **last
section of this register, verbatim**. **The Architect has not done that, and
flags it rather than performing it silently.**

**Reason.** The bucket changed **nine times in one session**; this register is
minted once per session. A verbatim copy would be stale within hours, and two
copies of a defect ledger that disagree are worse than one copy nobody
duplicated. The rule was written before the bucket became a live artifact.

**Proposed amendment, for owner ratification:**

> §BUG may be carried **by reference** ONLY IF the register names the exact
> bucket version **and** all three counts, and the bootstrap's positive control
> checks those counts against that file. Physical duplication is forbidden,
> because a second copy can drift.

Until ratified, treat this section as the register's §BUG. **The counts above
are the positive control** — if they disagree with the file, the session booted
wrong.

**Rule 5's clock, clarified:** a closed bug stays one **register** version, not
one bucket version. BUG-001, BUG-003 and BUG-004 are closed here and drop at v85.

---

## §3 · THE CONTROLLED WINDOW — S81's central measurement

Owner-proposed: *"let me delete the ARMES key and see how the system behaves."*
`T0 = 2026-08-04T06:21Z`, SHA `b960a1c9`. Every pass condition relative to an
event inside the test (S81-2).

| Z | Action | Measured |
|---|---|---|
| 06:25:46 | key deleted → **Sync** | `armes down`, `auth \| http=401` |
| 06:27:22 | a turn | ARMES withheld, `0/5` factory tools |
| 06:34:24 | key restored → **Sync** | `armes up`, 2345 ms, 141 tools |
| 06:35:40 | a turn | `26/146` tools, `getFactoryList` → **17 factories** |
| 06:45:37 | knowledge base → bad URL → **Sync** | `unreachable \| http=none` |
| 06:47:16 | URL restored → **Sync** | `up`, 5675 ms, 5 tools |

**Recovery from repair to working product: 76 seconds**, against ~30 minutes and
a cron tick the day before. Three independent legs agreed — ledger, runtime logs,
and the Health tab's own surface. **BUG-001 and BUG-003 closed.**

The window also produced **four findings the phase had not anticipated**:
BUG-010, BUG-011, W-004, and the recorded fact that BUG-002/006/007 are
**unprovable on demand**. All are in the bucket.

---

## §4 · NAMED ITEMS ON THE BOARD (placement, not re-litigation)

Carried from v83 §4 unchanged except where S81 measured something:

| Item | Placement | Note |
|---|---|---|
| `OMURGA-SIGNALS-1` | **Block 2** | unchanged from v83. |
| `HONEST-READ-2` | **Block 2, end** | **Now has live evidence on the fixed build**: the S81 window's answer said *"şu anki araç setimle… yeteneğim bulunmamaktadır"* and never named the outage. Screenshot in the session record. |
| `DECK-REFRESH-1` | **Block 2 adjacent** | Worse than in v83: the decks were derived at `ce9c96de`; master is now `b960a1c9`, **seven merges later**. |
| `E2E-RETRY-MASK-7` | **Block 6** | unchanged. |
| RAG lane | **Block 2B.1** | unchanged; still paused, still an S74-1 violation until it has a user-eye finish definition. |
| `GOVERNANCE-SIGNALS-1` · `PERF-P95-1` | RETIRED · RESOLVED | unchanged. |
| **schema-reference CI gate** | **NEW, unhoused** | From BUG-004. Four grep-based schema censuses failed in one day, each on a different DDL spelling. |
| **generic parity gate** | **NEW, unhoused** | From ADR-013, refused in-phase with its evidence recorded. Its absence has a measured cost: BUG-010. |
| **safe fault-injection affordance** | **NEW, unhoused** | Without it BUG-006's `inert` state cannot be proven live from any lane we have. |

---

## §5 · RULINGS MINTED THIS SESSION

| # | Ruling |
|---|---|
| **ADR-013 · DECISION-PARITY-1** | Where more than one path reaches a decision of the same class — a denial, a withholding, a liveness verdict — **every** such path must emit the **same** record, and that record must be readable by whatever consumes that class. A path that reaches the decision and records nothing is a defect **even when its behaviour is correct**, because it makes the two states indistinguishable afterwards. Two halves: **(a) parity** of recording between sibling branches, **(b) routing** of the record to its consumer. |
| **S81-1** | `git rev-parse origin/<ref>` reads a **local** ref. In a clone that was not freshly created, an anchor check without an explicit `git fetch` reports the floor **at which the clone was made**. The loud failure (false mismatch) is safe; the dangerous inverse is a false **MATCH** — a brief written against floor X plus a stale clone at X passes while master has moved. |
| **S81-2** | A pass condition must never depend on a value that can drift between the moment it is written and the moment the test runs. It must be **relative to an event inside the test** — a load timestamp, a run start — never an absolute count or a pinned prior reading. Minted from a defect the closure machinery found in **itself**. |
| **BUG-CARRY-1** | The bug bucket's charter, ten rules, owner-legislated. Rules 8–10 add the watchlist, the carry debts, and the three-count positive control. |

---

## §6 · ARCHITECT PREMISE LEDGER — S81

Five, all self-declared. **The pattern in four of five: a class enumerated by
hand where it needed an instrument.**

| # | Error |
|---|---|
| **S81-A** | Cited `clarificationLens.ts:155` as evidence the lens uses the production resolver. That line is `probeQuestionTr` — a deliberately blind probe. **A wrong citation supporting a true claim**, which is worse than a wrong claim because it survives review. Found by AG. |
| **S81-B** | The recon anticipated the corpus **shrinking** below 2534 and never asked what a **larger** one would mean. It had grown to 6626. |
| **S81-C** | Prescribed reconstructing like-for-like by **matching `n`**. Disproven with figures by the measurement itself. |
| **S81-D** | Wrote a proof whose pass condition pinned an **absolute** baseline that drifted before the test could run; applied literally it would have called a working fix broken. Produced S81-2. |
| **S81-E** | Enumerated **two** human-reachable callers of `syncBackendCatalog` and never asked whether there were others. There is a third — `mcp-probe`, **the button the owner actually presses**. Produced BUG-010. |

Two more, smaller and both owner-caught: instructing the owner to forward an
amendment that had not been written, and publishing two different byte-sets under
the same version name (`v5`), repaired as `v5_1`.

---

## §7 · WAIT CONTRACT — what is open, who ends it

| Wait | Ends when | Lane | Expiry / probe |
|---|---|---|---|
| **RAG team relay** | the owner pastes the team's answer | **owner paste** | on silence, ask "status?" and paste the silence |
| **`BUG-CARRY-1` rule 1 amendment** | the owner ratifies or rejects §2's proposal | **owner ruling** | until then §2 stands as the register's §BUG |
| **BUG-006 `inert` ruling** | the owner rules whether BUG-006 may close on two live states plus a mutation-proven test | **owner ruling** | until then BUG-006 stays OPEN |

`W-M1F2A-1` is **closed** — it was the only Architect-lane watch and it was
measured. No Operator door is open. No AG branch is in flight.

---

## §8 · NEXT WORK

**The measurement ceiling + BUG-008, as one piece.** Both live in
`clarificationLens.ts`: the hard cap (5000) sits below the corpus (6626), and
the evidence object cannot express a per-frame read that degraded. Splitting them
would open the same file twice.

Then **MA-RERUN-2**, which is what makes the ask-rate criterion provable:
`row.createdAt` is already in the evidence, so once the whole corpus can be read
the baseline population is isolated **in analysis** — no new flag is needed.

**SOTA-1 accounting for the ordering, in writing.** **(a)** The criterion left
unproven is `cwf-sota-definition-v1_3` §10's internal ask-rate row. **(b)** It
becomes provable on the first work item after the ceiling phase merges; nothing
external gates it. **(c)** MA-RERUN-2 resolves it — per-frame block rate over the
`createdAt ≤ 2026-07-25` subset, beside the baseline's 84.6 % at n=2534.

<!-- END · cwf-open-items-register-v84 -->
