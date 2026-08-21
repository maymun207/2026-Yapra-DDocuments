# CWF — Open Items Register · v85

<!-- cwf-open-items-register-v85 · 2026-08-05 · closes S82. Supersedes v84.
     Derived FROM cwf-work-board-S74-v1 and cwf-master-rollout-plan-v1_9.
     §BUG is carried BY REFERENCE to REGISTER-BUG-BUCKET-v11 (D-003 still owes
     the owner's ruling on whether that is permitted — see §6). -->

---

## §0 · FLOOR — everything else in this file is read against it

| | |
|---|---|
| `origin/master` | **`a6252b20ad5e1287ef272b5d1642d1fa64d1b678`** |
| deployed & converged | `dpl_376V1pM8wTq7rBRHKABZudXogaXt` (production, READY) |
| migrations · test files · tests · ADRs | **67** · **452** · **5108** · **13** |
| docVersion | **rev 192 · 2026-08-04** |
| acceptance contract | **`cwf-sota-definition-v1_5`** |
| walk order | **`cwf-master-rollout-plan-v1_9`** |
| bug bucket | **`REGISTER-BUG-BUCKET-v11`** — `8 open · 1 closed · 11 watchlist · 1 debt` |
| second repo | `mcp-honestbench` @ `bfa818e0`, live at `https://mcp-honestbench.vercel.app` |

**S82 shipped four merges in one session:** `LENS-CEILING-1` (`4469a370`) ·
`MA-RERUN-2` (`b0e8c9e2`) · `HONESTBENCH-HARNESS-0` (`fbfd8aa1`) ·
`BACKEND-IDENTITY-IS-DATA-1` (`d4f65600`) · `ROUTE-OPEN-1` (`a6252b20`).
Tests **4965 → 5108**. One bug closed (BUG-008), one opened (BUG-012).

---

## §1 · WHAT THIS SESSION ACTUALLY SETTLED

**One SOTA criterion moved by evidence — the first ever.** §10's internal
ask-rate row was stale since 2026-07-25; it is now measured (55.41 % at
n=2534 like-for-like, 38.63 % at n=7227), with the must-block guardian at 4/4
certifying that a *falling* rate is a win rather than a leak.

**A load-bearing architectural claim was falsified, and that was the better
outcome.** `backend identity is DATA` was **half true**: enablement was data,
dispatch pattern and governance identity were **code**. Found by trying to mount
a foreign MCP server and failing — one phase spent instead of a failed benchmark
round with 28 servers attached.

**The product walked with a stick and now does not.** Connecting a backend
required five steps (a migration, three code edits, a hand-authored category job
file). It now requires **zero**. And a backend nobody filed is no longer dropped
from every turn that matches an ARMES keyword.

**And it was demonstrated, not asserted.** See §2.

---

## §2 · G6 — the owner's sentence, performed 2026-08-05

> *"Admin gelir, backend'i ekler, credential'ını girer, sistem onu kullanır.
> Elle hiçbir müdahale yok."*

**VERDICT: PARTIAL PASS.** Four links of five ran unaided.

| Link | Result | Evidence |
|---|---|---|
| create the identity | ✅ from the panel | `04:33:24 POST /api/admin/backends 201` · `[BackendRegistry] created id=honestbench pattern=flat by=…` |
| add the server + backend | ✅ from the panel | `04:37:11 PUT /api/admin/mcp-settings 200` |
| **catalog sync on save** | ❌ **needed a human** | zero `[CatalogSync]` for **any** enabled server; the manual Sync worked immediately |
| mirror + health | ✅ | `[CatalogSync] backend=honestbench tools=4 missing=0 ms=707` · `[SyncHealth] up recorded (human-triggered)` |
| offered on a turn + called | ✅ | see below |

**The turn that proves `ROUTE-OPEN-1`, under the hard condition:**

```
[ToolFilter] ✅ Matched categories: [andon, metrics] → 7/146 tools
[ToolRoute]  uncovered=4 backends=[honestbench:4] covered=146 gateway=4
[ToolRoute]  offered=15/154 … writeOffered=0
[MCP Call]   hb_grove_yield_total  args {"groveId":"G-03"}
[MCP Result] { "groveId":"G-03", "totalYieldKg": null, "measured": false }
```

The relevance filter **engaged** (`path=keyword`, categories matched, 7 of 146
ARMES tools survived) and the foreign backend's four tools were offered anyway.
Before this session that turn would have offered **eleven** tools and honestbench
would have been invisible. **`writeOffered=0`** — ADR-011 held live.

**And the answer, which is the sentence this project exists for:**

> *"G-03 grove'u için toplam verim verisi bulunamadı. Bu grove için ölçüm
> yapılmamış veya veri mevcut değil."*

The server returned `null` + `measured:false`. **CWF did not say zero.**
`empty ≠ zero` held on a foreign backend's first turn, with no domain pack, no
categories and no configuration — and the response carried its provenance
(`Kanıt: hb_grove_yield_total ×1`).

**Not proven by this demonstration, and said rather than implied:** the
credential path. `honestbench` requires no auth (verified: zero auth code in its
source), so `apiKeyRef` / `apiKeyEnv` were never exercised. The mechanism is live
in production for `armes` and `superset`; *this* run did not test it.

---

## §3 · THE QUEUE — owner-ratified, in order

| # | Item | Why it is where it is |
|---|---|---|
| **1** | **BUG-012 registration guard** | `ROUTE-OPEN-1` moved the flat-path name collision from *almost never* to *every turn*. And it must precede `HONESTBENCH-RUN-1`'s **M3b** dial: an instrument built to cause collisions must not be pointed at a system that cannot see them |
| **2** | **`ROUTE-DERIVE-1`** (2E.2) | the routing rail derives itself from the mirror — `stage-drafts` unlocked from `armes` and publishing **absence-only** through the gate, on the `selfSeedReconciler` precedent |
| **3** | **`PACK-FROM-PROTOCOL-1`** (2E.3) | read the `instructions` MCP already sends at `initialize`; `pack.ts` becomes the code floor |
| **4** | **`HONESTBENCH-RUN-1`** | the scored five-mode run. Rules and predictions are **frozen and dated**; the dial has not moved |
| **5** | **`ROUTE-ASK-1`** (2E.4) | needs `2.7 FRAME-SHADOW-EVIDENCE-1`'s measurement first |

**Homeless but named:** `AUTO-SYNC-ON-SAVE-1` — belongs inside BUG-011's fix
phase, whose direction is now written in the bucket. `BENCH-BACKEND-MOUNT-1`
(2.2) and `BACKEND-REGISTER-AFFORDANCE-1` (2.2a) sit behind the routing block.

---

## §4 · WAIT CONTRACT — what is owed, by whom

**Owner rulings outstanding (four):**

1. **`BUG-CARRY-1` rule 1** — may §BUG be carried into a register **by
   reference**? **D-003 depends on it**, and this register carries it by
   reference for the third time without a ruling.
2. **BUG-006's `inert` closure condition.**
3. **The RAG lane relay** — paused since S80. Still an S74-1 breach: a lane
   running in parallel with no finish definition and no measurement.
4. **The credential half of §2** — prove it (a small auth check added to
   `honestbench` + an `apiKeyRef`), or close G6 with it explicitly untested.

**Architect owes:** the `BUG-012` phase prompt (next relay).

---

## §5 · LAWS MINTED THIS SESSION

- **S82-1** *(proposed, unratified)* — a phase carrying a proof run longer than
  ~30 minutes opens its own second touch quartet and declares it in advance.
  D-6's four assume a prompt-response rhythm; a two-hour proof breaks it.
- **S82-2** *(binding)* — **a test apparatus's report is also a CLAIM.** Every
  mutation or verification harness runs its own **red/green positive control**
  before its output counts as evidence. Three instances in two days: a `tail`-cut
  summary, an inert ESM `vi.spyOn`, and a zsh word-splitting failure that
  reported **8/8 SURVIVED** while measuring nothing.
- **R10** (contract, `cwf-sota-definition-v1_5`) — an item enters v1 **with the
  measurement that would falsify it**. Owner's words: *"Ölçmediğin hiçbir şey var
  değildir."*
- **G1's three-state floor** (ratified against the Architect's brief) — a floor
  has **`null` = attribution unknowable → fail closed**, not two states. F185
  decides it: the floor degrades toward TODAY, never toward something new.

---

## §6 · ARCHITECT PREMISE LEDGER — S82

Thirteen, recorded because the pattern matters more than the count. **Every one
of them was a claim about live behaviour written from a document, a report or a
mental model rather than from a read.**

1. Design note §6 — *"the third backend mounted with zero code."* False; it took
   five steps. Corrected three times before it was fully right.
2. *"The design note is ready"* — said; the file was not presented.
3. GO §0 — five line numbers for four return paths; `:186` was not a return.
4. **P3** — a proof step on a path that **cannot execute** (the gate is dark, so
   `[Clarify]` never fires in production).
5. The `MAX_LIMIT` site list — invented, after writing *"do not assume the list."*
6. `:69` "advertises a maximum" — it did not.
7. G3's baseline-definition inference — circular; AG refused it and was right.
8. **G0 named `readIntegrity` and forgot the guardian** — in a phase whose entire
   output is a rate that improves by falling.
9. Corpus growth from cron cadence — the governor is the spend fence.
10. Amendment 1 §5 — asserted `backends.tool_pattern` satisfied `toolPatternOf`.
    It is never read. **The migration's own comment said "DATA now, behavior
    later" and I quoted that line while reading it as "behavior now."**
11. The brief said `mcp_settings`; global rows live in `mcp_global_settings`.
12. G1's floor prescribed `{armes}`; the honest answer is `null`.
13. G6 said *"the sync fires on save"* — taken from a census line, not observed.
    It does not.

**The shape, stated once:** the Architect's errors cluster in prose that no gate
reads, and never in the tables it computes. Every derived value this session
held. **Verification and narration were separated by a gap, and the citation was
re-created across it instead of copied.**

**Three standing corrections in force:** a citation is **copied** from a command
run in the same message or it is not written · any claim about what production
**does** names a live read or says it was not read · every phase prompt carries
its own falsifier.

---

## §7 · WHAT IS TRUE, AND WHAT IS NOT

**True:** an admin can add a backend from the panel and the system will discover,
mirror, health-track and **use** it. Demonstrated, not argued.

**Not true:** *"no manual intervention"* — one link still needs a human, and its
name is in §3.

**Unchanged:** **sixteen of sixteen external SOTA criteria remain unmeasured.**
One internal criterion moved. Under **C2** an internal, self-run, unpublished
number is a self-portrait, so **this contract is no closer to satisfied than it
was two days ago** — but the instrument that produces its numbers is now honest,
and the door the benchmark round walks through is open.

<!-- END · cwf-open-items-register-v85 -->
