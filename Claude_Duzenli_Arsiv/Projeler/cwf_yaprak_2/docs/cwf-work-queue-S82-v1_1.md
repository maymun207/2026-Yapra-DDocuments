# CWF — Work Queue · S82 · v1_1

<!-- cwf-work-queue-S82-v1_1 · 2026-08-06 · supersedes v1 (§3 ruling settled) · Architect: Claude (Opus 5).
     THIS IS NOT A SECOND SOURCE. It is the working copy of
     REGISTER-BUG-BUCKET-v20 §BUG.5 with S82's owner placement applied, and it
     folds VERBATIM into §BUG.5 when bucket v21 is minted. If this file and the
     bucket ever disagree, THE BUCKET WINS. -->

**Live queue of record:** `REGISTER-BUG-BUCKET-v20` §BUG.5 → to become `v21`.
**Not the walking order:** `cwf-master-rollout-plan-v1_9` is the program map (blocks,
criteria, thresholds). The two diverged; the queue won. `v2_0` is owed.

**Rule 15 stands on every row: an item names the instrument that will prove it.**
"DOES NOT EXIST" is a named absence, never a blank.

---

## §1 · THE QUEUE

| # | Phase | Closes | Instrument (rule 15) |
|---|---|---|---|
| **1** | `GATEWAY-BURST-GUARD-1` | BUG-020 | **Exists.** A legitimate 7-call fan-out must survive the brake. *In flight with AG; amendment 1 issued.* |
| **2** | `TOOL-EARNED-TRUST-1` A→B→C | BUG-021 | **Exists** — `backend_tools.input_schema` is already there and empty. **Six instances recorded** (trace `90f1f5ed` added S82). |
| **3** | **`PROCEDURE-RECALL-1`** | *no bug — a named design gap* | **Exists** — the turn surface's procedure chip (`procedureRulesRetrieved`): `none` → `some`. Measured as: same question twice, second turn shows a registered procedure **and** fewer tool calls. |
| **4** | `PROSE-RENDER-PARITY-1` | BUG-023 + BUG-027 + **BUG-028** + **BUG-029** | **Exists** — the badge surface built by `OUTAGE-TRUTH-1`. Widened by owner ruling S82 (§3). |
| **5** | `UNIT-TRUTH-1` | BUG-024 | **Exists** — an ordinary production turn. |
| **6** | BUG-012 registration guard | BUG-012 | **Exists.** Still precedes `HONESTBENCH-RUN-1`'s M3b dial. |
| **7** | `PROBE-PARITY-1` + `AUTO-SYNC-ON-SAVE-1` | BUG-010, BUG-011 | **Exists** — the panel plus the health ledger, readable since BUG-026. |
| **8** | `FAULT-SWITCH-0` (rollout 2.3b) | *no bug — it IS an instrument* | **To be built.** `getServiceClient()` wrapper, second instance of `wrapClientWithDbReadSpans`. Env-armed · reads only · deterministic · fails loud. **Known gap: wraps `.from()`, not `.rpc()`.** |
| **9** | BUG-006 + BUG-009 | BUG-006, BUG-009 | **Position 8's output.** BUG-006's proof surface: **preview deployment** (owner ruling b) — never a production window. |
| **10** | credential proof phase | BUG-014 | **DOES NOT EXIST** — needs a backend that actually requires a credential. Named absence. |
| **11** | instrument + process gates | BUG-015, BUG-016 | **DOES NOT EXIST** — the gates ARE the deliverable. Seven instrument false-readings and 23 premise errors recorded. |
| **12** | lens frame phase | BUG-017 | **Exists** — the lens. Proof path (ii), owner-ruled. |
| **LAST** | BUG-005 | BUG-005 | **Exists** (AST census). **Owner-placed last, by name and with his reason:** *"her şey bitti, kapakları kapatıyoruz, CWF is done dediğimiz anda."* |

**Then:** `ROUTE-DERIVE-1` (2E.2) · `PACK-FROM-PROTOCOL-1` (2E.3) · `HONESTBENCH-RUN-1` ·
`ROUTE-ASK-1` (2E.4, needs `FRAME-SHADOW-EVIDENCE-1`'s measurement first).

### The four ratified constraints — all intact after the S82 insertion

1. `TOOL-EARNED-TRUST-1` ahead of the prose work. ✅
2. `FAULT-SWITCH-0` immediately before BUG-006 + BUG-009. ✅
3. BUG-012 before `HONESTBENCH-RUN-1`'s M3b dial. ✅
4. BUG-005 last. ✅

### Position 3 — the placement and its reason

> **Owner placement, S82:** `PROCEDURE-RECALL-1` enters between BUG-021 and BUG-023.
> Memorising a route is only meaningful once the route is correct; **any route recorded
> before `TOOL-EARNED-TRUST-1` is the scan itself.** This is therefore the earliest
> position at which the item can work, not a delay.

**Opening condition, not a deferral:** the design note's first line is
`TOOL-EARNED-TRUST-1`'s post-merge measurement — *"the same question, after the schema
lands: how many calls?"* If the answer is 12 it is a speed item; if 2, a consistency item.
The position does not move; only the first sentence waits for a number.

**And the shape is already decided:** no second memory organ is built. The registered-
procedure organ exists and is user-visible; the move is to **feed it candidates from
successful turns** — publication absence-only, through the gate, on the
`selfSeedReconciler` precedent, a human-touched row never overwritten. Two organs that can
disagree is the disease, not the cure.

---

## §2 · WHAT MEMORY DOES AND DOES NOT CARRY (the finding behind position 3)

Read from `memoryDistill.ts` / `memoryRetrieve.ts` at `5f2dee58`:

- **Written per turn:** `asked` head · entity surfaces + canonical ids · scope (action /
  object / time / metrics) · **tool NAMES and callIds only** · route basis · grounding
  summary · importance · TTL.
- **Never written:** tool arguments, tool results, the answer.
- **Offered to the model** as one line per episode:
  `- (date) "asked head" · varlıklar: … · araçlar: …`, under a header that tells the model
  in its own words: *"ham veri değildir; bilgi kaynağı değildir — yalnız bağlam ipucudur."*

**So on trace `90f1f5ed` memory ran and recalled three episodes** (`[Memory] offered=3
conv=1 user=2 topK=3 ms=137`) — and what it recalled was *"you asked this before and used
these tools"*, where those tools were the ones that scanned. **It reinforced the failing
path.** The result was never stored, correctly: a stored answer becomes stale and would be
served as fresh, which this project forbids. The gap is the middle layer — **the route
does not go stale the way the number does.**

---

## §3 · NEW THIS SESSION — filed, not yet versioned

Minted into bucket **v21**, together with phase 1's outcome, so the four counts are
computed once:

| id | class | what |
|---|---|---|
| **BUG-028** | PRODUCTION | The turn header's call count disagrees with its own evidence list (13 vs 14). Mechanism **derived**: `ctx.toolCallCount++` exists at exactly one site (`stageTools.ts:783`, inside the MCP execute closure); the three local tools (`resolve_time_range`, aggregate, query) never increment it. Every turn using a local tool under-reports. |
| **BUG-029** | PRODUCTION | A Turkish question answered with an English system message, beside Turkish labels on the same screen. **Mechanism not read** — `ctx.language` resolution was not traced, and is not claimed. |
| **W-015** | WATCHLIST | `silentFinishMessage`'s `error` branch hard-codes *"the question may be too large"* regardless of the actual error. On trace `90f1f5ed` the advice happened to fit (input 418 546). **Promotes** if an `error` finish with a small input renders "too large". **Retires** when the advice is derived from something measured. |
| **BUG-020** | evidence | Second turn above the ceiling: `total=420892` (trace `90f1f5ed`), eight of twenty pages scanned again, on the current floor. |
| **BUG-021** | evidence | Sixth instance: the model guessed `chart_id` for `get_chart_data`, got `Validation error … At least one of 'identifier' or 'form_data_key' must be provided`, recovered via `get_chart_info`. |

**OWNER RULING, S82 — SETTLED:** **BUG-028 and BUG-029 fold into position 4**
(`PROSE-RENDER-PARITY-1`) rather than taking queue slots of their own — same surface,
same phase. Precedent, not invention: the queue already carries un-slotted open bugs
(BUG-025, BUG-026). Position 4 now closes four bugs; its phase prompt must carry all
four and prove each separately — a folded bug is still a bug with its own closure
evidence, never a line absorbed into another one's proof.

---

## §4 · OPEN DEBTS AND RULINGS — nothing swept

**Artifact debts (Architect):** `cwf-master-rollout-plan-v2_0` · `cwf-open-items-register-v86`
(must carry §BUG **verbatim** — owner ruled S82) · `REGISTER-BUG-BUCKET-v21`.

**Relay debt (AG):** `docs/relay/PHASE-TYPEGATE-TRUTH-1-report.md` has no `## MERGE`
section. Folds into the next relay; no separate owner touch requested.

**Rulings settled in S82, recorded here so they are not re-asked:** §BUG copied verbatim
into the register ✅ · BUG-006's proof is taken on a **preview** deployment, and the
production window adds nothing because what breaks is our own DB read ✅ · the RAG lane
**resumes** ✅ · G6 closes with the **credential path explicitly untested**, and BUG-014
stays open ✅ · the turn token ceiling is **300 000** and counts `totalTokens` ✅.

**Still owed by the owner: NOTHING.** Every ruling raised in S82 is settled and recorded
above.
