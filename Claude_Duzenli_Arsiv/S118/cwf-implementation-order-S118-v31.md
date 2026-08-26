# CWF IMPLEMENTATION ORDER — S118 close → v31

<!-- Supersedes v30. Written WHOLE. SOTA-1 governs: nothing SOTA-relevant defers
     without (a)+(b)+(c) in writing. -->

## §0 · THE ORDER CHANGED, AND THE REASON IS MEASURED

v30 and every order before it assumed the acceptance contract's §6 sentence: three
items block fifteen of sixteen criteria, therefore build them first. **The S118 recon
measured that sentence and it is stale in its reasoning.**

> **The harness the acceptance contract calls blocking is NOT BLOCKED BY CODE.**
> Every code floor is repaired and wired; every phase has landed. What stands between
> this system and its first external measurement is deployment, one governed data
> write, and a spend authorisation — **none of which is build work.**

**Binding consequence: the benchmark track and the build track are on DIFFERENT
critical paths.** They do not compete for a lane, a gate, or a wave. The order below
therefore runs them in PARALLEL, and that is not a deferral of either.

---

## §1 · TRACK A — THE BENCHMARK UNBLOCKS (owner-gated, starts immediately)

None of these is build work. Three are the owner's surface exclusively and cannot be
worked around; the Architect's job is to make each decision cheap and measured, never
to route past it.

**A1 · A long-lived public HTTPS host for the agent server.** Built from
`Dockerfile.a2a`, or from an image pushed to a registry. Not configured anywhere;
Vercel cannot hold this endpoint open and the code says so itself. **Owner decision +
spend.** The Architect owes: a measured comparison of the smallest sufficient options
with real prices, and nothing else.

**A2 · The credential set.** `A2A_TRIGGER_SECRET` and `A2A_ACTOR_USER_ID` — the latter
a real `auth.users` uuid, **not a sentinel** — plus `A2A_CARD_URL` set to the address
peers actually use. Env-only, never a settings file, never a transcript. **Owner
hand.**

**A3 · The Operator's two data rows** — the `backends` identity and the global MCP
server row in `mcp_global_settings` (**not** `mcp_settings`, which is per-user and
whose correction the harness phase already recorded). **Needs an Operator window**,
which the owner opens. The same window applies the migration in B0.

**A4 · A public HTTPS endpoint for the honestbench instrument.** Containerised, locally
proven, *"deliberately never published; publication is an owner decision, not an
oversight."* **Owner ruling.**

**A5 · A spend authorisation**, plus a ruling on whether the synthetic injector is
paused for the run window. R4 stands: 2M tokens for the harness proof, $10 per
measurement round (provisional, owner's words *"şimdilik $10 yapalım görelim"*), and a
full-round estimate of ≈400M tokens ≈ $100 Flash-class that **remains an estimate**
until `BENCH-SMOKE-1` reports metered actuals. **The budget clause is absolute: money
decides how many criteria get measured, never what counts as measured.**

**A6 · Then the first external measurement.** Which criterion is cheapest and readiest
is an OUTPUT of A1–A5, not a guess made before them. When it runs, `BENCH-SMOKE-1`
meters it and the contract's cost line stops being an estimate.

---

## §2 · TRACK B — THE BUILD QUEUE (runs beside Track A, competes with nothing)

**B0 · The unapplied migration.** `supabase/migrations/20260825153000_factory_recovery.sql`
is on master and has never executed against the live database. Operator work, same
window as A3. **First, because a silent schema/repository drift gets worse by sitting**
— nothing in the poll tick, the landing gate or `architect:open` reads pending
migrations.

**B1 · `PR #409` and its measured red.** The first build item. Both remedies are ruled
in `CWF-S118-SESSION-CLOSE-v1` §6 and neither is negotiable: the conformance
comparison becomes a reporting instrument that exits 0, and the detector's missing
live-read path is fixed by a live read or by a governed snapshot with measured
freshness — **never by deleting the two assertions that failed.**

**B2 · Land `phase/sota-harness-recon-1`.** The recon report is the evidence base for
Track A and it belongs on master before anyone quotes it.

**B3 · The pipe-dialog class.** `CLAUDE.md` lines 173–176 forbid pipes; a lane piped
during the S118 recon and raised a dialog on the owner's screen. Acceptance test: **a
lane's whole recon runs with zero dialogs, proven by a real run rather than by reading
the rule.**

**B4 · The carrier merge debt.** `S118-FINDINGS-ADDENDUM-1` into `S118-SESSION-NOTES`,
plus S118 versions of the bug bucket, the open-items register and the session KB.
Named at close rather than discovered.

**B5 · The stale-fact sweep the recon named.** The reset endpoint's docblock says the
catalogue is not installed (it is) · `F-S99-BENCH-RESET-UNARMED` rests on the same
retired fact · the honestbench headline *"backend identity is DATA is HALF FALSE"* is
historical and quoting it now quotes a fixed defect as a live one. **Three documents
that will mislead their next reader.**

**B6 · `#29` A23 — the understanding layer.** It traces to a criterion (TIER A ·
Gaia2, *"the clarification gate — the external instrument for the epistemic/aleatoric
distinction"*), so SOTA-1 protects it from deferral. **Its measured lever is DISCOVERY,
not clarify logic:** entity-unresolved is 62.14 % / 76.40 % of clarification blocks,
and a deterministic failure class has `pass@1 = 0` and is untouched at any `k`.
`DISCOVERY-EXTEND-2` is the lever; "sample more / bigger model" is not.

**B7 · `PHASE-CONTEXT-RETRIEVAL-1`** — still has no design document, and its branch is
unlanded. The design document comes first.

---

## §3 · CARRIED, WITH THEIR TRIGGERS UNCHANGED

- **`MA-RERUN-2` is NOT a queue item.** It maintains an internal row that advances no
  external criterion. §8 of the contract says a stale row may not be cited as evidence
  — so the honest and free remedy is to mark it **STALE** in the v1_6 amendment. It
  re-enters only when it gates something external.
- **`VECTOR-QOS` before any engine switch** (owner verbatim, carried since S115) — and
  an open question: the live engine already reads `qdrant`, published 2026-08-17.
  **UNMEASURED** whether VECTOR-QOS landed first. Not an accusation; a measurement owed.
- **The vector infrastructure has not earned its place.** Before it is committed, a
  governed LLM-scan retrieval baseline must be measured under **F1 (BrowseComp-Plus)** —
  CodeMonkeys reached 92.6 % recall at ~$0.7/problem with plain LLM-scan over a ~3M-token
  corpus. That baseline has never been run. **Owner's direction call**, with money
  already spent on one side of it.
- **`#82b` Design-RAG PARKED** (owner: *"ASLA UNUTMA"*) · Qdrant owner surface deferred
  · `ADF-HEADLESS-LANE-1` deferred · org repo migration · census re-run cadence.
- **`RULE26-HARDEN-1` → v1.1** (R8, owner: *"boş beleş iş yapmanın kimseye faydası
  yok"*).

---

## §4 · WHAT THE ORDER REFUSES TO DO

**It does not schedule an ADF acceptance contract.** ADF has no scoreboard of its own
and the owner deferred one to *"when the second product arrives"*. The ADF exit test
(2/6) measures whether the car is drivable and nothing more.

**It does not put build work in front of a measurement that build does not block.**
That was the shape v30 inherited, and the recon refuted its premise.

**It does not carry a number it did not measure.** Every figure above was measured at
S118 close or is labelled as an estimate by the contract itself.

<!-- END · cwf-implementation-order-S118-v31 -->
