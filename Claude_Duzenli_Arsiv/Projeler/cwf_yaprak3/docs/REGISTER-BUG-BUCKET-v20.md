# CWF — Open Items Register · §BUG (Bug Bucket) · v20

<!-- REGISTER-BUG-BUCKET-v20 · 2026-08-05 · CLOSES S81. Supersedes v19.

     BUG-022 CLOSED on proof — production build log, 26 -> 0 under an identical
     filter, with a CONTROL deployment still returning 26 minutes later. The zero
     was derived, not asserted.

     TWO RULES MINTED: 14 (the relay lives in the repo) and 15 (every entry names
     its PROOF INSTRUMENT — the gap that made the Architect forget FAULT-SWITCH-0
     existed and mis-state BUG-009 as unprovable).

     TWO OWNER RULINGS RECORDED: BUG-006's proof is taken on a PREVIEW deployment
     of the merged SHA (option b), and FAULT-SWITCH-0 (rollout 2.3b) enters the
     queue at position 8 as BUG-006's and BUG-009's precondition.

     BUG-019, BUG-002 and BUG-007 drop after their one carried version.

     DAY TOTAL: eight bugs closed, every one on a live production read, none at
     merge. Master a6252b20 -> 5f2dee58 across five phases, zero migrations.

     COUNTS: 17 / 1 / 12 / 1.
     ── v19's header, carried ──
     v19 · BUG-019/002/007 closed in one owner-run outage window; BUG-025/026/027
     opened; rule 13 (S81-4) minted. COUNTS WERE 18 / 3 / 12 / 1. -->

---

## §BUG.-1 — TWO CONVENTIONS THIS VERSION FIXES (read before the counts)

**SESSION NUMBERING.** From v12 onward sessions are named with the **owner's**
numbering: **this session is S81.** Entries minted before v12 carry artifact
numbering (`S80`/`S81`/`S82`), which runs **two ahead** of the owner's. The two
are reconciled by **DATE**, which is identical in both and is therefore the
field to read. No pre-v12 entry was renumbered — rewriting a carried body to fix
a label would break rule 2 for a cosmetic gain.

**CLASS.** Every entry from v12 onward carries a `Class` field. Entries minted
before v12 carry no field and are **`PRODUCTION` by default** — again, not
rewritten. See rule 11.

---

## §BUG.0 — Charter, and the rule that carries it

**What belongs here.** A BUG is a *wrong behaviour of shipped production code*,
observed live. It is not a missing feature, not a scope item, not a design debt,
and not a finding about a brief. Those live on the work board and in the rollout
plan. A BUG earns an entry the moment it is observed in production, whether or
not anyone has decided when to fix it.

**Why the bucket exists separately.** Work-board items are chosen; bugs are not.
An item may legitimately wait its turn in the plan. A bug that waits its turn
must still be *visible every single session* until it is proven gone, because
the failure mode this bucket exists to prevent is a defect quietly ageing out of
attention while the register keeps getting rewritten around it.

### BUG-CARRY-1 (standing rule, owner-legislated S81)

1. **§BUG is the LAST section of every open-items register from v84 onward.**
   It is never moved, never renumbered, never merged into another section, and
   never summarised.
2. **Every register mints forward every OPEN bug entry VERBATIM.** The body of
   an open bug is immutable. Only its `Status` line and its `Evidence log` may
   gain *appended* lines; nothing is ever rewritten or shortened.
3. **The bootstrap carries the count.** Every bootstrap's open-queues section
   states `N açık bug — register §BUG`. **POSITIVE CONTROL:** if the bootstrap's
   N disagrees with the register's OPEN count, the session booted wrong and the
   owner uses that as a signal — the same instrument shape as SOTA-1's.
4. **A bug closes ONLY by its own named post-deploy live proof read** (S63-1:
   merge is not proof). A merged fix moves nothing. A bug whose fix shipped but
   whose proof read has not been taken stays **OPEN**, with the shipped SHA
   appended to its evidence log.
5. **A closed bug moves to §BUG.2 with its proof read and date**, stays there
   for exactly one register version, then drops out.
6. **Assigning a bug a home does not close it.** A bug may name the phase that
   is expected to fix it. It remains OPEN in this bucket regardless, and the
   fix phase must reference the bug id.
7. **SOTA-1 governs this bucket like everything else.** A bug is never
   deferred, shrunk or re-ordered down with "not needed yet / low traffic /
   this is enough / later / v1.1". A named waiting position is legitimate; a
   silent one is not.
8. **§BUG.3 WATCHLIST holds items that are NOT bugs.** Three admissible kinds:
   awaiting an **owner ruling**; awaiting a **read that has been deliberately
   deferred**; or a **fragility with no observed wrong behaviour**. Every entry
   names the exact question that **promotes** it to a bug or **retires** it. A
   watchlist item never leaves quietly — only by promotion, or by a ruling
   recorded in its own entry.
9. **§BUG.4 CARRY DEBTS holds obligations owed at a named moment** — typically
   session close. Each names what "done" looks like. A debt leaves only when
   discharged, and the discharge is recorded in the entry before it drops.
10. **The bootstrap's positive control extends to all three counts:**
    `N açık bug · M izleme · K borç`. Any disagreement between the bootstrap's
    numbers and this file means the session booted wrong. This supersedes the
    single-count form in rule 3.

11. **Every entry carries a `Class`, and the class decides what "closed" means.**
    Three classes:
    - **`PRODUCTION`** — a wrong behaviour of shipped production code. Closes by
      a named post-deploy live read (rule 4), **except** where the owner has
      ruled a different proof surface **in the entry itself** because a
      production read is structurally unsatisfiable (BUG-017, path (ii)).
    - **`INSTRUMENT`** — a defect in the apparatus the project's evidence rests
      on. No production read exists to take. Closes by a **gate proven in both
      directions** that reds on the defect class, plus a replay of the recorded
      instances under that gate.
    - **`PROCESS`** — a defect in how a lane produces artifacts. Closes by a
      mechanical check over the artifacts themselves, proven in both directions,
      plus a named run of consecutive clean artifacts.

    **Entries minted before v12 carry no `Class` field and are `PRODUCTION` by
    default.** They are NOT rewritten to add one: rule 2 forbids editing a
    carried body, and a cosmetic label is not worth breaking the one rule that
    keeps this file trustworthy.

    **The class does NOT soften the bar.** An `INSTRUMENT` or `PROCESS` bug is
    not closable by intention, promise or a written law — only by something that
    reds. The reason both classes exist is that this project has now twice
    written a law (S82-2, and the three premise-error corrections) and shipped
    nothing that enforces it.

12. **S81-3 — NOTHING GOES UNDER THE RUG** (owner-legislated 2026-08-05, in his
    own words: *"Hiçbir şey halı altına süpürülmez."*). Binding on the Architect:

    1. **Every defect observed enters this bucket BY NAME, in the message it is
       observed** — not batched to the next version, not "if it recurs", not
       "when there is time". If it is too small to file, it was too small to
       mention.
    2. **A near miss is never recorded as a pass.** An attempt that did not
       exercise the defect is written down as an attempt that did not exercise
       the defect, with the reason it did not. BUG-018 carries two such attempts.
    3. **What could not be read is written as "not read", with the reason** —
       never omitted, never silently rounded to a conclusion.
    4. **"Not a bug" is a RULING, not silence.** It goes to §BUG.3 carrying the
       condition that promotes it and the condition that retires it.
    5. **The Architect's own errors carry the same weight** and go in the same
       ledgers as anyone else's.
    6. **Tidiness is never a reason.** SOTA-1 forbids deferral by sufficiency;
       this forbids omission by neatness. A shorter register is not a better one.

    **POSITIVE CONTROL, runnable by the owner without reading any code:** if a
    defect was discussed in a session and does not appear by name in the next
    register version, the rule was broken. The owner cancels it by name —
    **"halı altı"** — and the Architect either files it in the same message or
    states, in writing, which of rules 1–6 exempts it. There is no third option.

13. **S81-4 — A FROZEN ENTRY IS NOT A LIVE READ.** Rule 2 freezes every open
    body, which is what makes this file trustworthy — and it is also what makes
    the bodies AGE as fixes land around them. Therefore: **every sentence in a
    phase prompt about what production code does TODAY comes from a read taken
    at the anchor commit, never from the bug entry that motivated it.**

    **POSITIVE CONTROL:** a phase prompt carries each behavioural claim
    inherited from an entry either with a command run at the anchor, or with the
    label *"taken from the entry, not verified at the anchor"*. An unlabelled
    inheritance is an S81-4 violation.

    **Why it exists:** `OUTAGE-TRUTH-1`'s brief carried three false premises —
    a named code path that did not exist, a claim that the refusal text could not
    be in code, and a claim that the misroute redirect "never reads"
    `ctx.mcpWithheldBackends`. All three were true when their entries were
    written and false at the anchor. AG caught all three before building.

14. **THE RELAY LIVES IN THE REPO.** The Author writes the phase report to
    `docs/relay/PHASE-<NAME>-report.md` **on the branch, in the same push as the
    work**, and appends the merge report to the same file under `## MERGE`
    **in the same push as the merge commit** — not afterwards, not as a separate
    step. The Architect clones the branch for RULE-25 and reads it there; the
    owner stops being a courier.

    **POSITIVE CONTROL, and it exists because half of this rule failed on its
    first use:** if `docs/relay/PHASE-<NAME>-report.md` on master carries no
    `## MERGE` section, the relay debt is open and the Architect says so. On
    2026-08-05 the phase half landed and the merge half did not, and the owner
    filled the gap by hand — the exact motion this rule removes.

15. **EVERY ENTRY NAMES ITS PROOF INSTRUMENT.** Not what is broken — **what will
    be used to show it fixed**, and whether that instrument EXISTS today.

    Instruments live in the rollout plan; defects live here. On 2026-08-05 that
    split cost real time: `FAULT-SWITCH-0` had been designed and ratified in a
    previous session, and because no entry named it, the Architect read BUG-006
    and BUG-009 and declared their proofs unobtainable — **contradicting a design
    the owner had already approved.** The owner remembered; the Architect did not.

    **Where it is recorded:** in §BUG.5's queue table, in an `INSTRUMENT` column —
    **never by editing a frozen body** (rule 2). A missing instrument is written
    as a named absence, never as a blank.


---

---
## §BUG.1 — OPEN

---

### BUG-005 · Verbatim customer data is written to a third-party log store

| | |
|---|---|
| **Status** | OPEN |
| **Opened** | 2026-08-03 · S81 |
| **Found by** | AG, inspecting the MA-RERUN-1 run's stderr; generalised by the Architect; **ruled a bug by the owner** |
| **Floor when observed** | `28ec4d9d…` · prod `dpl_EUspKSTuMB1qnXN6S9fa26mkWyAA` |
| **Expected home** | unassigned — a fix phase has not been named |

**OWNER RULING (S81, the reason this is a bug and not a design note).**
*Sensitive information of this kind must not sit in a server log.*

**SYMPTOM.** Production turn logging interpolates, verbatim: the entity strings
a user typed, the arguments sent to backend tools, and the payloads backends
send back. AG observed on a single run's console stream the entity surfaces
`Granit Ham` and `KB7 X hattı` alongside bare order and material numbers. That
console stream is the **same one production writes to Vercel's runtime log
store** — the leak is not an artefact of the replay run.

**MECHANISM — a GREP FLOOR, not a census.**

| Site | What it interpolates |
|---|---|
| `api/cwf/_lib/turn/stageClarify.ts:280` | `[EntityResolve] refs=[…] resolved=[…] unresolved=[…]` — raw user surfaces |
| `api/cwf/_lib/turn/stageClarify.ts:332` | the same, on the alias path |
| `api/cwf/_lib/toolCategories.ts:1375` | `[Frame] entity_ref=[…] metrics=[…]` — raw user surfaces |
| `api/cwf/_lib/turn/stageTools.ts:532` | `[MCP Call] … with args:` — `JSON.stringify(args).slice(0, 500)` |
| `api/cwf/_lib/turn/mcpClient.ts:156` | `[MCP Execute] … with args …` — the same data a second time |
| `api/cwf/_lib/turn/mcpClient.ts:171` | `[MCP Result] … output.slice(0, 500)` — **the backend's response payload** |
| `api/cwf/_lib/turn/stageTools.ts:791` | the time tool's args and resolution |

`[MCP Result]` is the heaviest and is a **different class** from the rest: it is
not user input but the customer's own operational data — whatever the backend
returned — truncated at 500 characters and written out.

**This table is what `grep` can see.** M1F2A's lesson is directly on point: a
grep floor of 31 error-guarded folds was exceeded by an independent AST census
that found 44, two of them inside the Architect's own declared scope. **The fix
phase must run an AST-level census and must exceed this floor or prove it
complete.**

**WHY THIS IS REDUNDANT EXPOSURE, NOT A DIAGNOSTIC NEED.**
Every datum above already lives in a store with access control:

- the IR frame — `entity_ref` included — is persisted to `telemetry_events`
  (`type='tool_call'`, `payload.kind='ir_frame'`) under RLS; it is the
  clarification lens's own organic source;
- the user's utterance is in `messages`, which is the product's own store;
- the turn trace goes to the **self-hosted** Langfuse on our EC2, i.e. our
  infrastructure rather than Vercel's log retention.

**And the disciplined posture already exists three lines above the leak.** At
`stageClarify.ts:274-277` the OTEL span is given `ATTR_ROUTE_ENTITY_RESOLVED =
res.entityId` and `ATTR_ROUTE_ENTITY_METHOD = res.method` — the **resolved id
and the method**, never the raw surface. The same function, two postures. The
console line is the undisciplined duplicate of a value that is already recorded
correctly next to it.

**WHAT THIS IS NOT.**

- **Not an ADR-007 breach.** No key, token, connection string or service-role
  value is echoed. ADR-007 is intact; this is a class it never covered.
- **Not replay-specific.** All seven sites are on the production turn path.
- **Not fixed by shortening the slice.** Five hundred characters of a factory's
  OEE rows is still the factory's data.
- **Not solved by deleting the lines.** See the closure proof: the fix must move
  the detail into a controlled store, not blind the operator.

**COST.** Customer operational data — order numbers, material numbers, line and
product names — accumulates in a third-party log store under that vendor's
retention, outside the RLS and grant discipline every other data path in this
system is held to. The question sharpens with a second tenant, but the answer
does not depend on one.

**CLOSURE PROOF (named, live, post-deploy — S63-1).**
With the fix shipped and the deployment SHA named:

1. A production turn is issued carrying a **distinctive, known** entity string.
   A Vercel runtime-log query for that exact string over the turn's window
   returns **zero** lines. Repeat for a tool-argument value and for a value
   present only in a backend response.
2. **Positive control, and it is not optional:** the same turn's detail must
   still be retrievable from a controlled store — the `ir_frame` row in
   `telemetry_events` and/or the Langfuse trace — proving the diagnostic was
   *relocated*, not deleted. A fix that passes (1) and fails (2) has blinded the
   operator and is rejected.
3. The AST census's own count, stated, alongside the seven-site grep floor
   above, with any site the floor missed named.

**REQUIRED OUTPUT OF THE FIX (beyond the code).** A standing rule, gate-tested
in both directions per D-5, governing what a console line may interpolate. This
bucket records only that the rule is owed; its wording belongs to the fix phase.

**FINISH DEFINITION (owner-eye).**
*"If a customer asked to see our server logs, their order numbers would not be
in them — and I could still debug a turn."*

**Evidence log.**
- 2026-08-03 · observed by AG on the MA-RERUN-1 run stderr; generalised to seven
  production sites by grep; ruled a bug by the owner the same day.
- 2026-08-03 · **OWNER RULING — no interim mitigation.** The Architect proposed
  a log-retention / drain configuration change to cap accumulation before the
  fix ships. The owner declined: unnecessary problems at this stage; the
  question is revisited **after** BUG-005 is fixed, and last, if at all.
  Accumulation is accepted until then. **Do not re-raise.**

- 2026-08-05 · **THE DIAGNOSTIC COST OF THE 500-CHAR SLICE, MEASURED.** The owner
  asked whether the correct data had arrived from the gateway on
  `trace=aaa76f35`. The log shows the first three values (`111179 · 209979 ·
  195577`) matching a known-good table exactly, plus `unique_count: 5`,
  `returned=5`, `truncated=false` — but the remaining two values are **beyond
  `output.slice(0, 500)`** and are therefore unanswerable from the log. **The
  question was legitimate, the answer existed, and our own truncation withheld
  it.** This does not weaken the case for the fix; it sharpens the CLOSURE
  PROOF's positive control, which is not optional: the detail must be
  **relocated** into a controlled store (`telemetry_events` / Langfuse), never
  merely deleted. A fix that only shortens the slice would make this worse.
---

---

### BUG-006 · A security-adjacent fence's firing is only inferable from the absence of another log line

| | |
|---|---|
| **Status** | OPEN |
| **Opened** | 2026-08-03 · S81 |
| **Origin** | **Promoted from W-001 by owner ruling**, 2026-08-03 |
| **Floor when observed** | `28ec4d9d…` · prod `dpl_EUspKSTuMB1qnXN6S9fa26mkWyAA` |
| **Expected home** | unassigned |

**SYMPTOM.** With ARMES down and its tools withheld, the model attempted to
reach an ARMES tool **through the Superset gateway** — turns at `15:45:01Z` and
`15:46:42Z` both logged
`[MCP Call] call_tool with args: {"name":"getFactoryLines","arguments":{"request":{"factoryId":"KB7"}}}`.
Whether the misrouting guard stopped it is **not directly readable**. The only
available signal is the **absence** of a corresponding `[MCP Execute]` line.

**MECHANISM.** `api/cwf/_lib/turn/gatewayPreflight.ts` emits **no console output
at all** — a grep for `console.` in that module returns nothing. What it does:
`loadArmesActiveToolNames()` reads the ACTIVE `tool_name` set from the ARMES
`backend_tools` mirror; a `call_tool` whose `arguments.name` matches
short-circuits **before** the MCP call and returns
`armesGatewayMisrouteMessage(toolName)`. `getFactoryLines` is an active ARMES
tool (141 synced at the `16:00:29Z` tick), so a match was **expected** — but
expectation is not observation.

**THE SHARPEST FORM OF THE DEFECT.** `loadArmesActiveToolNames` **fails open**
on any read error, returning an empty set, in which case every gateway call
passes through untouched — in the module's own words, *"exactly as if this
module didn't exist."* That fail-open is deliberate and correct. **But it is
also silent.** Two very different states therefore produce **identical**
evidence in production:

1. the fence matched and blocked the call; and
2. the fence's mirror read failed, the fence was effectively absent, and the
   call was stopped by something else — or by luck.

No log line distinguishes them.

**LAW.** `empty≠zero` — absence is not evidence. And ADR-010: trust is earned
from **observed** behaviour. A fence whose firing cannot be observed can only be
**assumed**, never earned.

**WHAT THIS IS NOT.**
- **Not a claim the fence is broken.** There is no evidence either way — that
  *is* the defect.
- **Not a request for a general allow/deny list.** The module is deliberately a
  targeted misrouting guard and must stay one.
- **Not answered by a unit test.** A test proves the code path exists; it does
  not prove the path ran in production on the turn in question.

**COST.** Measured, this session: while diagnosing the ARMES incident the
Architect attempted to establish whether the fence had fired and could not.

**CLOSURE PROOF (named, live, post-deploy — S63-1).**
A production turn issues a Superset `call_tool` naming an **active ARMES** tool;
a Vercel log read for that turn shows an explicit line stating the pre-flight
matched and short-circuited, naming the tool. **Three states must be
distinguishable in the log**, which is the positive control:
1. matched and blocked;
2. name not in the ARMES mirror → passed through legitimately;
3. mirror read failed → fence inert.
A fix that makes (1) visible while leaving (3) silent has not closed this bug.

**FINISH DEFINITION (owner-eye).**
*"Log'a bakınca çitin ateşlediğini, geçirdiğini, ve hiç çalışamadığını
birbirinden ayırt edebiliyorum."*

**Evidence log.**

**2026-08-04 · PROOF ATTEMPTED AND NOT OBTAINABLE ON DEMAND.** In the controlled
window the model was asked the same question that triggered the escape on
2026-08-03, then asked again in the original English, then **instructed
explicitly** to call `getFactoryLines` through the Superset gateway's
`call_tool`. All three times it called `search_tools` first, found no such name
in the gateway catalog, and declined. `[GatewayFence]` never fired; `call_tool`
was never issued.

**The remedy is placed on a path only the model can open.** The withheld-aware
message lives inside `armesGatewayMisrouteMessage`, which runs only when the
model misroutes. A correctly-behaving model never gets there. That placement was
the Architect's specification, and it makes this fix **unprovable live on
demand** — which is a defect of the fix's shape, not of the window.

**Log continues:**
- 2026-08-03 · observed while diagnosing the ARMES outage; opened as W-001;
  promoted to a bug by owner ruling the same day, after a read of
  `gatewayPreflight.ts` established that the fence exists on that path and was
  expected to match.

---

---

### BUG-009 · A failed withholding read is byte-identical to "nothing was withheld"

| | |
|---|---|
| **Status** | OPEN |
| **Opened** | 2026-08-04 · S81 |
| **Found by** | AG, during `BACKEND-LIFECYCLE-AFFORDANCE-1` — **named, not fixed**, per that phase's §11 |
| **Provenance** | **Established by code reading, NOT by a live observation.** The condition has not been seen to fire in production. Recorded here so nobody later mistakes this for an incident. |
| **Floor when observed** | `ecea4851`; the site is untouched by that phase |
| **Expected home** | unassigned |

**SYMPTOM.** `withholdUnhealthyBackends`
(`api/cwf/_lib/turn/mcpHealthWithholding.ts:46-51`) fails open when the health
read throws — which is correct — and returns:

```ts
return { tools, withheldBackends: [] };
```

That value is **byte-identical** to the healthy case in which nothing needed
withholding. Downstream, `stagesResolve.ts:31` sets
`ctx.mcpWithheldBackends = withheldBackends` and `:36-40` stamps the stage span
with it. So a trace cannot distinguish:

1. **every backend healthy** — nothing needed withholding; from
2. **the withholding read failed** — the entire MCP-WARM-1 protection was inert
   and every backend's tools were offered regardless of health.

**WHY THIS IS HEAVIER THAN BUG-006.** When BUG-006's fence goes inert, one
misroute slips through and the observed instance was harmless. When **this**
goes inert, a genuinely down backend's tools are handed to the model and
**nothing downstream can tell** — the very failure the withholding rule exists
to prevent, invisible at the moment it happens.

**MECHANISM — both halves of ADR-013 at one site.**

- **Parity (a):** the success path stamps `ctx` **and** the span; the failure
  path emits only a `console.error`. Two paths reach the same decision class —
  "what is withheld this turn" — and record differently.
- **Routing (b):** the record that does exist never reaches its consumer. The
  console line is not in `ctx`, not on the span, not in the ledger.

**WHAT THIS IS NOT.**
- **Not an argument against failing open.** Failing open is right here: a health
  read failure must not blind the product. The defect is that it is
  *indistinguishable*, not that it is permissive.
- **Not fixed by removing the empty array.** The shape can stay; what is missing
  is a marker saying the evaluation could not be performed.
- **Not covered by `BACKEND-LIFECYCLE-AFFORDANCE-1`.** That phase deliberately
  left it named and untouched, which is why it needs its own entry.

**CLOSURE PROOF (named, live, post-deploy — S63-1; relative per S81-2).**
With the health read **forced to fail**, one production turn's `ctx` and stage
span carry a marker distinguishing *"withholding could not be evaluated"* from
*"nothing was withheld"* — read live, trace id and deployment SHA named.
**Positive control:** a turn with all backends healthy carries the **distinct
clean marker**, present and explicit. **Neither state may be represented by an
absent field** — an absence would reproduce this bug in a new shape.

**FINISH DEFINITION (owner-eye).**
*"When the system could not check backend health, the trace says so — instead of
looking exactly like a healthy turn."*

**Evidence log.**
- 2026-08-04 · named by AG during `BACKEND-LIFECYCLE-AFFORDANCE-1`; independently
  verified at the source by the Architect; filed under the class the owner had
  already ruled a bug at BUG-006.

---

---

### BUG-010 · The panel's Probe button proves liveness and records nothing

| | |
|---|---|
| **Status** | OPEN |
| **Opened** | 2026-08-04 · S81 |
| **Found by** | The owner, by pressing the button he actually reaches for |
| **Floor** | `b960a1c9` |

**SYMPTOM.** Asked to press "Sync", the owner pressed **Probe** — the control he
used on 2026-08-03 and the one that returns the tool list. Three requests hit
`/api/admin/mcp-probe`; **no health row was written and no `[SyncHealth]` line
appeared.**

**MECHANISM.** `api/admin/mcp-probe.ts` opens a client and calls
`client.listTools()` — the strongest available evidence that a backend is up —
and contains **no** `syncBackendCatalog`, **no** `recordCheck`, **no**
`recordSyncHealth`, and no reference to `BackendHealth` at all.

**So the button that gives the human the strongest evidence is the button that
records nothing.** BUG-001's sharpest form, in a path its fix never covered.

**WHY IT WAS MISSED.** The phase prompt enumerated **two** human-reachable
callers of `syncBackendCatalog` and never asked whether there were others. The
enumeration was done by hand — the fifth hand-enumeration failure in two days,
and the measured cost of declining to build the generic parity gate.

**CLOSURE PROOF.** With a backend's freshest row fresh-and-`down`, pressing
**Probe** and nothing else produces a new `up` row with `checked_at` after the
press, read live, SHA named. **Positive control:** probing a genuinely
unreachable backend produces a `down` row, not silence.

**FINISH DEFINITION.** *"Whichever button I press to check a backend, the system
remembers what it saw."*

**Evidence log.**
- 2026-08-04 · found in the controlled window; verified at source by the Architect.

---

---
### BUG-011 · The on-connect hook's health write is late, partial, and misattributed

| | |
|---|---|
| **Status** | OPEN |
| **Opened** | 2026-08-04 · S81 |
| **Found by** | Architect, reconciling the window's ledger rows against its actions |
| **Floor** | `b960a1c9` |

**SYMPTOM — measured, three saves.** `PUT /api/admin/mcp-settings` fires a
fire-and-forget `syncBackendCatalog(...).then(...).then(recordSyncHealth)` and
then returns the response immediately.

| Save | Health row |
|---|---|
| ~06:21 | **none** |
| 06:42:56 | **none at the time** |
| 06:47:11 | one — **for the knowledge base only, not for ARMES**, which is equally enabled |

And one ledger row has no action to match it: `06:46:50 mkb down`, roughly
**four minutes** after the 06:42:56 save, with its `[SyncHealth]` console line
attributed to the *06:47:11* invocation — 21 seconds after the row it describes.

**BEST-SUPPORTED READING, not proven.** The promise is suspended when the
serverless function freezes after the response and resumes on a later warm
invocation, writing minutes late and logging under whichever request is then
active. The Architect cannot see the scheduler; what is measured is the
behaviour, not the mechanism.

**THE DEFECT THIS EXPOSES IS BIGGER THAN THE HOOK.** `backend_health.checked_at`
defaults to `now()` at **insert**. For the cron and the Sync button, insert and
observation are seconds apart. For this path they can differ by minutes — so a
**stale verdict can arrive looking fresh**, and `mcpHealthWithholding` reads
`checked_at` as freshness. In this window we were lucky: the delayed row still
described a true state. Had the restore landed first, a late `down` would have
poisoned the ledger **after** the backend was healthy.

**The same column means two different things depending on which path wrote it.**

---

**PROVEN 2026-08-05 — the G6 mount reproduced it, and the mechanism is now pinned
to a byte rather than inferred.**

A brand-new global server (`honestbench`, enabled) was saved from the panel on
floor `a6252b20`:

| Time (UTC) | Observed |
|---|---|
| `04:37:11` | `PUT /api/admin/mcp-settings 200` — the save succeeded |
| `04:36–04:43` | **ZERO `[CatalogSync]` lines. For ANY enabled server, not just the new one.** |
| `04:42:00` | the panel's manual Sync → `[SyncHealth] backend=honestbench up recorded (scope=global, human-triggered)` and `[CatalogSync] backend=honestbench tools=4 missing=0 ms=707` |

**So the sync path is sound and only the AUTO-fire is broken** — the positive
control separates them cleanly. The v10 reading said *"late, partial"*; this
observation adds a case where the promise appears **never to have resumed at
all**.

**The mechanism, pinned:** `mcp-settings.ts:114-131` fires
`syncBackendCatalog(server)` without awaiting and then returns the response, and
**`waitUntil` appears nowhere in the codebase** (repo-wide grep, 2026-08-05,
zero hits). On a serverless platform nothing keeps an un-awaited promise alive
past the response. This is no longer "the best-supported reading" — it is the
documented absence of the only mechanism that would make the hook reliable.

**Consequence for a claim we made yesterday:** `BACKEND-LIFECYCLE-AFFORDANCE-1`
closed BUG-001 on the strength of *"both branches now record a health row."*
The **cron** branch does. The **on-connect** branch demonstrably may not. BUG-001
stays closed — its own proof read was taken on the Sync-button branch and holds
— but the parity it claimed is thinner than it reads.

**WHAT THIS IS NOT.** Not an argument for making the hook block the response —
that would trade a silent write for a slow save. The fix must make the write
survive **and** make observation time distinguishable from insert time.

**CLOSURE PROOF.** A settings save with several enabled backends produces a
health row for **every** one of them, each within one minute of the save, each
carrying an observation time that is its own — verified live against the save's
timestamp, SHA named. **Positive control:** a save with one backend unreachable
still produces rows for the others.

**FINISH DEFINITION.** *"When I save the settings, either every backend gets
checked and recorded promptly, or nobody does — and the ledger never tells me
something old as if it were new."*

**Evidence log.**
- 2026-08-04 · found by reconciling eight ledger rows against the window's actions.

---

---
- 2026-08-05 · **PROVEN** — see the block above; mechanism pinned to a byte.

**FIX DIRECTION — APPENDED v12, RELOCATED VERBATIM FROM BUG-012, where v11
misfiled it.** Nothing rewritten; the move itself is the record.

**FIX DIRECTION (named here so the next session does not re-derive it).** Either
the fire-and-forget work is handed to a mechanism the platform guarantees
(`waitUntil`, which appears **nowhere** in the codebase — verified 2026-08-05),
or the write is moved off the response path entirely (a queued job the cron
drains). **And separately from either:** `backend_health.checked_at` must record
**when the observation happened**, not when the row was inserted, because today
the same column means two different things depending on which path wrote it.


---

---

### BUG-012 · A flat backend silently hijacks another backend's tool name

| | |
|---|---|
| **Status** | OPEN |
| **Opened** | 2026-08-04 · S82 |
| **Found by** | AG, during `HONESTBENCH-HARNESS-0`; independently verified at the source by the Architect |
| **Provenance** | **Established by CODE READING, NOT by a live observation** — the BUG-009 pattern. The condition has not been seen to fire in production. Recorded so nobody later mistakes this for an incident. |
| **Floor when observed** | `7480c68e`; the site is untouched by that phase |
| **Expected home** | the panel half is CLOSED (see below); the registration half is unassigned |

**SYMPTOM.** `api/cwf/_lib/turn/stageTools.ts:526` registers every MCP tool as

```ts
ctx.vercelTools[safeName] = tool({ … });
```

A plain assignment. **No `.has()` check, no log line, no span.** Two backends
offering the same tool name silently collapse into one — **last write wins** —
and nothing downstream can tell which server the surviving closure belongs to.

**MECHANISM.** Registration is keyed on `safeName`, derived per tool, with no
backend qualifier. `backend_tools` enforces `unique (backend_id, tool_name)` —
uniqueness **per backend**, which is correct for a mirror and says nothing about
collisions **across** backends. So a foreign flat backend may declare
`getDailyOeeValues`, and whichever registers last owns the name for that turn.

**WHY THIS IS HEAVIER THAN BUG-006.** When BUG-006's gateway fence goes inert,
one misroute slips through and the observed instance was harmless. Here **there
is no fence at all to go inert** — the collision has never had a guard, so there
is no degraded state to detect, only a silent substitution.

**LAW VIOLATED.** `ADR-013 DECISION-PARITY-1` half (a): a decision is reached —
*which server owns this name this turn* — and **nothing records it**. And ADR-001:
a backend's claim about itself must be attributable, and after the overwrite it
is not.

**COST.** A user's question routes to a tool whose answer comes from a different
backend than the one the provenance chain will name. Under the honesty axis this
project claims to lead, that is the worst shape available: a **correct-looking
answer with the wrong attribution**.

**WHAT THIS IS NOT.**
- **Not the panel default.** That half — a global server borrowing another
  backend's identity when the field was left blank — was **closed by
  `BACKEND-IDENTITY-IS-DATA-1`** (`d4f65600`): a blank backend on a global server
  is now refused. This entry is the *registration* half, which is untouched.
- **Not solved by rejecting the second registration.** Which one is "second" is
  an ordering accident. The fix must make the collision **visible and
  attributable**; whether it also refuses is a design question for the fix phase.

**CLOSURE PROOF (named, live, post-deploy — S63-1).**
Two backends are mounted, both declaring the same tool name. One production turn
produces a machine-readable record naming **both** claimants and which one served
— readable from the trace, with the trace id and deployment SHA named. **Positive
control:** a turn with no collision emits the clean marker, present and explicit;
**neither state may be represented by an absent field.**

**FINISH DEFINITION (user-eye).**
*"İki backend aynı aracın adını kullanıyorsa sistem bunu söylüyor — hangisinin
cevap verdiğini sonradan okuyabiliyorum."*

**NOTE, v12 — a paragraph that was never about this bug has been moved out.**
v11 carried a `FIX DIRECTION` block here describing `waitUntil`, the
fire-and-forget settings hook and `backend_health.checked_at`. Every word of
it is about **BUG-011**; not one is about tool-name collision. It has been
relocated verbatim into BUG-011 and nothing was rewritten or dropped. The
fix direction for THIS bug is stated in `WHAT THIS IS NOT` above: make the
collision visible and attributable; whether it also refuses is the fix
phase's design question.

**Evidence log.**
- 2026-08-04 · found by AG while reading the registration path for
  `HONESTBENCH-HARNESS-0`; the site read and confirmed by the Architect at
  `stageTools.ts:526`.
- 2026-08-04 · the panel half closed by `BACKEND-IDENTITY-IS-DATA-1`; the
  registration half remains open and is what this entry now covers.

---

---

### BUG-014 · The credential path has never been exercised, in any backend, ever

| | |
|---|---|
| **Status** | OPEN |
| **Class** | **PRODUCTION** |
| **Opened** | 2026-08-05 · S81, by owner ruling on inventory item 5 |
| **Found by** | The owner, during the G6 mount demonstration |
| **Floor when observed** | `a6252b20` |
| **Expected home** | unassigned — queued at §BUG.5 position 4 |

**SYMPTOM.** The G6 demonstration proved four of five acceptance links of
"mount a backend from the panel". The fifth — **credentials** — was never
exercised, because `honestbench` requires no authentication. `apiKeyRef` /
`apiKeyEnv` were left empty and the mount succeeded. So the panel's credential
affordance has **no evidence in either direction**: it has never been observed
to work, and never observed to fail.

**WHY THIS IS A BUG AND NOT A WATCHLIST ITEM (the owner ruled it in).** Every
real customer backend needs a credential. ARMES's outage on 2026-08-03 was an
**expired token**. The one field on the mount path that the only real incident
in this project's history turned on is the one field the demonstration could not
reach. An untested path on a production affordance is a defect of the
affordance, not a gap in a demo.

**THE STANDING RULE IT COLLIDES WITH.** `apiKeyEnv` resolution is restricted to
`^MCP_[A-Z0-9_]+$`, secrets are env-only, and ADR-007 forbids echoing them. A
proof therefore may not print the secret — which is precisely why the proof
needs designing rather than improvising.

**WHAT THIS IS NOT.** Not a claim the path is broken. Not a request to weaken
the env-only rule.

**CLOSURE PROOF (named, live, post-deploy — S63-1).**
A backend requiring a credential is mounted from the panel and serves one
production turn, with the resolved variable named but **never valued** in any
log. **Positive control, and it is the half that matters:** the same mount with
a WRONG credential fails **loudly and legibly** — a health row saying so, and a
panel state a human can read — rather than presenting as "no tools".

**FINISH DEFINITION (owner-eye).**
*"Şifre isteyen bir backend'i panelden bağlayabiliyorum; şifre yanlışsa sistem
bunu bana söylüyor, sessizce araçsız kalmıyorum."*

**Evidence log.**
- 2026-08-05 · named by the owner during the G6 demonstration; ruled a bug by
  the owner the same day.

---

---

### BUG-015 · Three test apparatuses reported success while measuring nothing

| | |
|---|---|
| **Status** | OPEN |
| **Class** | **INSTRUMENT** — see rule 11; this entry does not close on a production read |
| **Opened** | 2026-08-05 · S81, by owner ruling on inventory item 10 |
| **Found by** | AG and the Architect, three separate times in two days |
| **Floor when observed** | `7480c68e` … `a6252b20` |
| **Expected home** | unassigned — queued at §BUG.5 position 5 |

**SYMPTOM — three instances, two days, one shape.**

| # | Apparatus | What it reported | What it actually measured |
|---|---|---|---|
| 1 | a summary read through `tail` | a clean, complete result | a **truncated** tail; the rest was never seen |
| 2 | an ESM `vi.spyOn` | the spy was in place | the spy was **inert** — ESM binding, never called |
| 3 | a mutation run under `zsh` | **`8/8 SURVIVED`** | one bogus path: `zsh` did not word-split an unquoted scalar, vitest received garbage and measured **nothing** |

Instance 3 is the sharpest: `8/8 SURVIVED` is a *strong* claim — it asserts eight
mutants were introduced and eight were caught. Zero were introduced.

**THE LAW THIS ALREADY MINTED, AND WHY THAT IS NOT ENOUGH.** S82-2 states that a
test apparatus's report is itself a CLAIM, and requires every harness to run its
own red/green control before its output counts as evidence. **The law is
written; nothing enforces it.** A law with no gate is a sentence in a document,
and this bucket's whole existence is an argument against that arrangement.

**WHAT THIS IS NOT.**
- **Not a bug in production code.** It is a defect in the instruments the
  project's evidence rests on — which under a contract whose entire claim is
  *honest measurement* is not a lesser class. See rule 11.
- **Not fixed by being more careful.** Three instances in two days, by two
  different lanes, is a systemic property.

**CLOSURE PROOF (class INSTRUMENT — no production read is possible or required).**
A CI gate reds when a harness reports a result without having demonstrated, in
the same run, that it can produce the opposite result. The gate must itself be
proven in both directions (D-5): a harness with a passing red/green control goes
green; the **same harness with its control removed goes RED**. The three
instances above, replayed under the gate, must all red.

**FINISH DEFINITION (owner-eye).**
*"Bir test 'geçti' diyorsa, o testin kızarabildiği aynı koşuda kanıtlanmış
oluyor — bana söz vermesi yetmiyor."*

**Evidence log.**
- 2026-08-04/05 · three instances observed; S82-2 minted on the third.
- 2026-08-05 · ruled a bug by the owner, with the class extension.

- 2026-08-05 · **SIXTH AND SEVENTH.** `git checkout -- <file>` returned a
  **committed** plant silently with exit 0 — the third variant of a trap already
  recorded twice, and the *opposite* cause from the untracked-file variant found
  hours earlier. And `check:tenant-zero`'s verdict **depends on whether a build
  ran first**: it scans the working tree, and `public/architecture/changelog.md`
  is gitignored and build-generated, so a pristine anchor produces a **FALSE
  RED** — a clean-anchor control alone would have let a phase report a phantom
  master defect. **Two more instruments whose reading depends on unstated
  state.**
---

---

### BUG-016 · Thirteen premise errors in one session, all of a single shape

| | |
|---|---|
| **Status** | OPEN |
| **Class** | **PROCESS** — see rule 11; the defective component is the Architect lane |
| **Opened** | 2026-08-05 · S81, by owner ruling on inventory item 11 |
| **Found by** | The owner, correcting each one at the moment it was made |
| **Expected home** | unassigned — queued at §BUG.5 position 5, beside BUG-015 |

**SYMPTOM.** In one session the Architect made **thirteen** claims about live
system behaviour that were written from a document, a report or a mental model
rather than from a read. None appeared in a computed table; all were in prose,
where no gate inspects anything.

**WHY IT IS FILED HERE RATHER THAN LEFT AS A LESSON.** The three corrections
already in force —

1. a citation is **copied** from a command run in the same message,
2. every sentence about what production DOES names a live read or says it was
   not taken,
3. every phase prompt carries its own falsifier —

are the same kind of object as S82-2: **written, unenforced.** The session that
minted the corrections produced, in its own closing artifact, an assertion
(*"today nothing changes"*) that expired 22 minutes later and was not re-read
for 3½ hours. That is the fourteenth instance, and it happened **after** the
corrections were written.

**WHAT THIS IS NOT.**
- **Not a request for self-flagellation in prose.** The cost of the class is
  measured, not felt: an unsatisfiable proof step (BUG-008 P3), a scope
  extension found only by AST census, and a false floor prescription that AG
  refused (`{armes}` vs `null`).
- **Not closable by promising harder.** It closes the way the others do: with an
  instrument.

**CLOSURE PROOF (class PROCESS).**
A mechanical check over relay artifacts reds when a phase prompt or GO block
contains a claim about production behaviour with **neither** an in-message
command output **nor** an explicit "not read" marker, and when a phase prompt
carries no falsifier section. Proven in both directions (D-5): a compliant
artifact passes; the same artifact with its falsifier removed **reds**. Ten
consecutive relay artifacts pass without a manual waiver.

**FINISH DEFINITION (owner-eye).**
*"Architect bana bir şey söylediğinde, o cümlenin arkasında ya bir okuma var ya
da 'okumadım' yazıyor — üçüncü ihtimali sistem kabul etmiyor."*

**Evidence log.**
- 2026-08-05 · thirteen instances recorded in the session's own KB.
- 2026-08-05 · a fourteenth found by this bucket's own BUG-013 read, after the
  corrections were in force. Ruled a bug by the owner the same day.

- 2026-08-05 · **FIVE MORE, all one shape, and the shape is new.** In
  `OUTAGE-TRUTH-1`'s brief: G3 named a code path that does not exist; falsifier
  (b) asserted the refusal text could not be in code (it is, at `promptFloor.ts`,
  and tenant-free); G4 said the misroute redirect "never reads"
  `ctx.mcpWithheldBackends` (it has since `BACKEND-LIFECYCLE-AFFORDANCE-1` G6).
  In `OUTAGE-WINDOW-1` v1: a warm-cache TTL that does not exist, and a
  cron-collision risk model that was false because neither cron calls a tool.
  **All five were written from frozen entries or from a mental model instead of a
  read at the anchor.** Rule 13 (S81-4) was minted for exactly this.
- 2026-08-05 · **DAY TOTAL: 23.** Beyond the five already listed: a warm-cache
  TTL that does not exist; a cron-collision risk model false because neither cron
  calls a tool; a `GET /api/admin/backend-health` hypothesis with zero callers;
  **declaring BUG-009's proof unobtainable while `FAULT-SWITCH-0` sat designed
  and owner-ratified in a previous session's design note**; and diagnosing the
  Author as "asking permission paranoically" when the Author was asking nothing —
  the client was opening a per-command approval dialog, which one screenshot
  settled. **The last two are the instructive ones:** both were claims about a
  system's state written from a mental model when a search or a screenshot was
  one message away. Rules 13 and 15 were minted against exactly these.
- 2026-08-05 · **AND THE COUNTER-EVIDENCE, which is what makes this measurable.**
  `TYPEGATE-TRUTH-1` shipped with **ZERO round-trips**: four of the brief's
  premises were false and AG proved all four false without relaying one of them,
  because every claim carried a `[READ @anchor]` or `[HYPOTHESIS]` label. Rule 13
  is working. The metric is now reported per phase.
---

---

### BUG-017 · The frame forces a foreign backend's entity into ARMES's taxonomy, at high confidence

| | |
|---|---|
| **Status** | OPEN |
| **Class** | **PRODUCTION** |
| **Opened** | 2026-08-05 · S81 — **promoted from W-011 by owner ruling** |
| **Found by** | Observed on the G6 turn; re-verified live 2026-08-05 by the Architect |
| **Floor when observed** | `a6252b20` · prod `dpl_376V1pM8wTq7rBRHKABZudXogaXt` |
| **Expected home** | unassigned — queued at §BUG.5 position 6 |

**OWNER RULING ON THE PROOF PATH — (ii), AND IT IS THE POINT OF THE ENTRY.**
The condition **cannot** be proven on a production turn: `router.frameRouting`
is dark, the frame steers nothing, and a production-turn proof step would be
unsatisfiable — the exact trap that forced BUG-008's P3 to be withdrawn. The
owner ruled path **(ii): the closure proof is taken through the LENS**, which
forces the flag. This is recorded in the entry so no later reader re-derives it
and no later phase writes a proof step that cannot fire.


On the G6 turn (`trace=9a4f8af8`, 2026-08-05), asking about a **grove** — an
entity type that exists only in a newly mounted foreign backend — produced:

```
[Frame] action=QUERY_METRIC object=LINE entity_ref=[G-03 grove]
        metrics=[throughput,oee] conf=HIGH basis=keyword
```

**`object=LINE`, and `conf=HIGH`.** The frame vocabulary has no concept for a
foreign backend's entity types, so it force-fits the nearest ARMES object **and
reports high confidence while doing it**.

**Not a bug today:** `router.frameRouting` is dark, so the frame steers nothing —
it is extracted and recorded only. **Promotes to a bug the day that flag is
published**, because a confident wrong object would then route.

**Retires when** the frame can answer "I have no object for this" — which is the
understanding layer's problem (`PACK-FROM-PROTOCOL-1`, rollout 2E.3, and A23),
not the frame extractor's alone.

---

**CLOSURE PROOF (class PRODUCTION, proof surface = LENS, by owner ruling).**
A lens run over a corpus containing at least one foreign-backend entity produces,
for those frames, a frame that does **not** claim a confident ARMES object — it
reports either the correct foreign object or an explicit *"no object for this"* —
and the count of such frames is a field in the run's JSON evidence.
**Positive control:** the same run over ARMES-only frames is byte-unchanged in
its object assignments, and the new field is present and **`0`**, never absent.
A fix that improves the foreign case by degrading the domestic one is rejected.

**FINISH DEFINITION (owner-eye).**
*"Sistem tanımadığı bir şeye 'bu bir hat' demiyor — hele emin olduğunu hiç
söylemiyor."*

**Evidence log.**
- 2026-08-05 · observed on the G6 turn (`trace=9a4f8af8`), filed as W-011.
- 2026-08-05 · re-verified live by the Architect in the same production window
  as BUG-013; promoted to a bug by owner ruling, proof path (ii).

- 2026-08-05 · **THE BUCKET IS UNSTABLE, not merely wrong** (`trace=9a864b2e`).
  The same foreign entity that was classified `object=LINE conf=HIGH` came back
  `object=ZONE conf=HIGH`. Both are ARMES concepts and neither is a grove. The
  entry's body names LINE; the defect is not the choice of bucket but the
  confidence attached to an arbitrary one.
---

---

### BUG-020 · Nothing bounds concurrency or spend, and the agent knocked over the customer's own BI server

| | |
|---|---|
| **Status** | OPEN |
| **Class** | **PRODUCTION** |
| **Opened** | 2026-08-05 · S81 |
| **Found by** | The Architect, reading the turn the owner reported |
| **Floor when observed** | `a6252b20` · `trace=13d532e7` |
| **Expected home** | `GATEWAY-BURST-GUARD-1` — queue position 4 |

**SYMPTOM — the chain, measured.** The model needed to find one chart among 191.
Its filter attempt was rejected twice (see BUG-021). It fell back to scanning,
requested `pageSize:200`, received `records=10/191 page=1/20`, and then **issued
nineteen page requests essentially at once.** The Superset MCP server returned
`Streamable HTTP error` on roughly twenty calls and, in one case, its own
SQLAlchemy failure — *the backend broke under our load*. Page 10 did return, and
contained the chart it wanted (`id: 91`). The follow-up `get_chart_data` then
failed on the same collapsed connection.

**Cost of that single question: `input=307908 output=4915 total=312823`.**

**MECHANISM — the brake is on the wrong shaft.** `maxToolRounds=16` bounds
ROUNDS, not calls: nineteen parallel calls are one round. There is no per-backend
concurrency ceiling, no per-tool call budget, and no per-turn token ceiling.

**WHY THIS IS HEAVIER THAN IT LOOKS.** W-012 named that mounting a backend opens
an outbound **data** path. This is the outbound **load** path: our agent can
take down a customer's production BI system from inside a chat turn. The blast
radius of "add a backend" includes "we can DoS it".

**AND IT ALREADY CAUSED A SECOND-ORDER ERROR.** Twenty `list_charts` failures
were caused by us, not by the tool. Any verdict system that marked tools failing
on transport errors would have amputated the catalogue's most useful tool for a
fault we created — which is why BUG-021's verdict layer must attribute by error
class.

**WHAT THIS IS NOT.**
- **Not an argument for silent truncation.** A brake that drops work quietly is
  the disease this bucket exists to remove. Every brake reports through
  BUG-019's badge.
- **Not solved by lowering `maxToolRounds`.** Wrong shaft.

**THE THREE LIMITS ARE GOVERNED PARAMS — DB rows, changeable without a deploy,
owner-set.** Proposed starting values, explicitly provisional:
`gateway.maxConcurrentCallsPerBackend = 3` · `turn.maxCallsPerToolPerTurn = 8` ·
`turn.maxTokensPerTurn` (value owner-set).

**CLOSURE PROOF (named, live, post-deploy — S63-1).**
A production turn that would previously have burst shows, live, at most N
concurrent calls to one backend, and the turn's badge states that a limit was
reached and which — SHA and trace named. **Positive control:** a normal turn
reaches no limit and the badge says so explicitly, never by absence.
**Second control:** the limits are read from the governed store, proven by
changing one value and observing the new bound without a deploy.

**FINISH DEFINITION (owner-eye).**
*"Ajanım müşterinin sunucusunu deviremiyor, ve bir freni çektiğinde bana
söylüyor."*

**Evidence log.**
- 2026-08-05 · measured from `trace=13d532e7` by the Architect; ruled a bug by
  the owner the same day, with the limits required to be configurable.

- 2026-08-05 · **A CONSTRAINT THE BRAKE MUST SATISFY, measured on a HEALTHY
  turn** (`trace=cb71521b`). `getScrapSummaryForZones` takes a single
  `targetDate`, so a seven-day question legitimately fans out to **seven calls**
  — one per day, all correct, all necessary. **A blind concurrency ceiling would
  have cut this turn as readily as it would have cut the nineteen-page scan that
  felled Superset.** The brake must therefore distinguish a bounded fan-out
  demanded by a tool's own shape from an unbounded scan caused by a wrong guess.
  This was not known when the entry was written and it constrains the design.
---

---

### BUG-021 · The gateway boundary loses inner-tool schemas, and the system throws away the schema facts the backend gives it for free

| | |
|---|---|
| **Status** | OPEN |
| **Class** | **PRODUCTION** |
| **Opened** | 2026-08-05 · S81 |
| **Found by** | The owner, asking why the system rediscovers what it already connected to; diagnosed at the source by the Architect |
| **Floor when observed** | `a6252b20` · `trace=13d532e7` |
| **Expected home** | `TOOL-EARNED-TRUST-1` (A/B/C) — queue position 5 |

**FIRST, WHAT IS NOT BROKEN, because the entry is worthless without it.**
For FLAT backends discovery already works the way it should: `backend_tools`
mirrors `tool_name`, `description` **and `input_schema`** automatically on
connect (`20260714120000_backend_tools.sql:41-51`). ARMES's ~141 tools are not
rediscovered per turn. The inner catalogue of a gateway is also persisted —
that is where `[GatewayPolicy] … inner=22` comes from.

**SYMPTOM — three layers, and the middle one was never asked for.**

| Layer | Source | Today |
|---|---|---|
| DECLARED | what the protocol volunteers: name, description, tags, `parameters_hint` | **stored** |
| INTROSPECTED | the backend's own schema tool | **never called** |
| OBSERVED | validation errors and successful calls | **discarded every turn** |

The gateway hands us, for `list_charts`, exactly this and nothing more:
`{"name":"list_charts","title":…,"description":…,"annotations":{…},"meta":{"fastmcp":{"tags":["core"]}},"parameters_hint":"request"}`.
`parameters_hint: "request"` names the argument and says nothing about its
contents. This is F189, recorded months ago in the code
(`gatewayPolicy.ts:149-151`, `gatewayDisposition.ts:90`): *the loss is exactly at
the gateway boundary.*

**THE PART THAT IS OURS.** The backend then told us the missing field, in
machine-shaped text, for free:

```
Error: Validation error in list_charts: request -> filters -> opr: Field required
```

**It arrived twice in the same turn and was discarded both times.** The model,
correctly obeying our own pack (`gatewayProtocol.ts:28` — *"parametre
uydurma"*), re-searched instead of guessing, then scanned twenty pages and
triggered BUG-020. **ADR-010 says trust is earned from observed behaviour; that
doctrine was applied to permissions and never to schemas.**

**AND A DOOR NOBODY KNOCKED ON.** Superset exposes an inner `get_schema` tool —
the model called it in this very turn and received `schema_info`. The schema is
available **on request** and has never been requested at connect or by the cron.

**WHAT THIS IS NOT.**
- **Not fixable by hand-authoring the argument shapes.** ADR-009 forbids it and
  it silently rots at the backend's next release: today `opr`, tomorrow
  something else.
- **Not a claim the gateway is misbehaving.** It is within protocol. The defect
  is that we treat a lossy boundary as if it were a complete one.
- **Not "verification".** A tool that answers a validation error has told us
  about its ARGUMENTS, not about whether it works. Provocation yields a SCHEMA
  and leaves the verdict at `unproven` — conflating the two would build exactly
  the instrument `mcp-honestbench` exists to catch.

**THE PROGRAM, OWNER-RATIFIED 2026-08-05 — three phases, because one would be
unreviewable.**

- **A · `GATEWAY-INNER-MIRROR-1`** — the inner catalogue gains a persisted schema
  per tool with `schema_source ∈ {declared, introspected, provoked, observed,
  unknown}`. `unknown` is a value, never an absent field. Refreshed at connect
  **and by the CRON** — deliberately not by the settings-save hook, which is
  BUG-011 and demonstrably does not fire. **Behaviour unchanged.**
- **B · `TOOL-VERDICT-1`** — a verdict ledger per inner tool:
  `unproven / verified / failing`, with **error attribution by class**:
  *CONTRACT* (validation error — the tool is fine, the CALL was wrong; **never
  demote, and harvest the schema**), *TRANSPORT* (HTTP/session/timeout — says
  nothing about the tool; the fault is recorded against the BACKEND), *TOOL*
  (well-formed refusal or repeated empty/malformed results — this is the only
  demotion signal). A verdict carries the time it was taken and the catalogue
  revision it was taken against. Learned schema is injected on later turns, and
  a first validation error gets **one** corrected retry before any fallback.
- **C · `TOOL-VERDICT-ROUTING-1`** — the verdict reaches the offered set:
  `failing` tools are withheld, **and the turn says how many were withheld and
  why**. A silent withdrawal would reproduce BUG-002 in a new shape. Every
  catalogue refresh resets verdicts to `unproven`, so a backend that fixes its
  own bug is re-earned automatically and nothing is marked broken forever.

**TWO OWNER-GATED SWITCHES, both governed params, both defaulting to OFF until
the owner sets them:** (1) **provocation** — deliberately invalid payloads sent
to READ-class inner tools only, never to a mutating one, to harvest required
fields from the error; (2) **connect-time verification** — one minimal REAL call
per read-class tool with a now-known schema, which is the only step that can
produce `verified` and the only one that puts real queries on a customer's
system at connect.

**CLOSURE PROOF (named, live, post-deploy — S63-1; per phase).**
A: a production read shows a stored schema for an inner tool with its
`schema_source`, and a tool with none reads `unknown`, explicitly.
B: the `opr` fact is harvested from one validation error and appears in the
store; the next turn's prompt carries it; a TRANSPORT storm demotes **nothing**
— proven against `trace=13d532e7`'s own error mix replayed.
C: a `failing` tool is withheld and the turn's badge names the count; a refresh
returns it to `unproven` and a later successful call marks it `verified`, with
the timestamp readable.

**FINISH DEFINITION (owner-eye).**
*"Sistem bir aracı bir kez öğreniyor, çalıştığını bir kez kanıtlıyor, ve karşı
taraf düzeldiğinde kendi kendine yeniden deniyor — ben hiçbir şey yazmadan."*

**Evidence log.**
- 2026-08-05 · raised by the owner; F189's existing record, the `parameters_hint`
  payload, the discarded validation error and the unused `get_schema` door all
  read at source by the Architect in the same session; program ratified by the
  owner the same day.

- 2026-08-05 · **APPENDED — phase A is SMALLER than this entry's program says.**
  During the ROUTE-OPEN-2 review the Architect read
  `20260722120000_backend_tools_via_gateway.sql` and
  `catalogSync.test.ts:10`: **inner tools are ALREADY swept into `backend_tools`
  with `via_gateway=true`**, and that row already carries an `input_schema`
  column. So `GATEWAY-INNER-MIRROR-1` needs **no new table and no new mirror** —
  it fills a column that exists and is empty, and adds `schema_source`. The body
  above is left unchanged per rule 2; this is what changed about it.
- 2026-08-05 · **THIRD AND FOURTH INSTANCES, IN ONE TURN** (`trace=aaa76f35`).
  Third: `call_tool {"name":"get_chart_data","arguments":{"request":{"id":85}}}`
  → `Validation error in get_chart_data: request: Value error, At least one of
  'identifier' or 'form_data_key' must be provided.` The field is `identifier`,
  the model guessed `id`, the backend named the correct field in the error, and
  the error was discarded exactly as `opr` was the day before.
  Fourth, and it is the more interesting one: the retry SUCCEEDED and returned a
  **column profile** — names, data types, `sample_values`, `null_count`,
  `unique_count` — **not a row set**, so nothing downstream could chart it. The
  tool's own description advertises *"Multiple formats: json, csv, excel"* and an
  *"Optional row limit override"*, i.e. **parameters that would have returned
  rows exist and the model has no way to learn they exist.** The gap is not only
  which FIELD to send; it is which RESPONSE SHAPE can be asked for.
- 2026-08-05 · **FIFTH INSTANCE** (`trace=0b9e7b8c`), on the turn that closed
  BUG-018: the model issued `{"request":{"id":85}}` **and**
  `{"request":{"identifier":"85"}}` in the same round; the first took the
  validation error, the second succeeded. **It now guesses BOTH spellings and
  pays for one of them every time** — the cost of the missing schema, paid per
  turn, indefinitely.
---


---

### BUG-023 · The answer text announces a chart the render layer did not draw

| | |
|---|---|
| **Status** | OPEN |
| **Class** | **PRODUCTION** |
| **Opened** | 2026-08-05 · S81, by owner ruling — *"HİÇBİRŞEY HALI ALTINA SÜPÜRÜLMEZ."* |
| **Found by** | The owner, in a production turn he issued to prove a different bug |
| **Floor when observed** | `3fc6a1bc` · prod `dpl_GTLyRa4kDj2aAv3PbvNtmspcCnRF` · `trace=aaa76f35` |
| **Expected home** | unassigned — queued at §BUG.5 position 4 |

**SYMPTOM.** The model's prose read *"Aşağıdaki grafik, Glazür hatları bazında
toplam doğalgaz sarfiyatını göstermektedir"* — **the chart below shows…** — and
below it there was no chart, only the render layer's honest notice:
*"Grafiğe dönüştürülecek araç sonucu bulunamadı (call_tool) · tool result not
available to chart."* The user reads a sentence pointing at an artifact that does
not exist, immediately above a notice saying it does not exist.

**WHAT IS NOT BROKEN, and it matters.** The render layer behaved **correctly**.
`get_chart_data` returned a column profile rather than rows; a profile is not a
chartable set; `MessageChartContent.tsx:92` said so. That fallback is designed,
dates from `a843eb6` (2026-07-31, VIZ-MATCH-ARRAY-1), and **was not introduced by
`AXIS-TRUTH-1`** — verified: that phase's six-file diff does not include this
file. **This entry is not an argument against the fallback; the fallback is the
only honest thing in the exchange.**

**MECHANISM.** Two facts existed in the same turn and were never compared: what
the model's prose CLAIMED, and what the render layer PRODUCED. Nothing
deterministic reconciles them. The prose is the model's; the notice is the
system's; the contradiction is the user's problem.

**FAMILY.** BUG-019 — an outage arriving as a scope refusal — is the same disease
(the model's prose asserting something the system knows to be otherwise) on a
different surface. **They are separate entries and separate phases:** BUG-019 is
about what the turn says when tool calls FAIL; this is about what the turn says
when a RENDER did not happen. Do not merge them, and do not absorb this into
`OUTAGE-TRUTH-1` while that phase is in flight.

**WHAT THIS IS NOT.**
- **Not fixed by editing the prompt** to tell the model not to promise charts.
  ADR-001: the remedy is deterministic code, never an instruction the model may
  ignore. A model that obeys today disobeys under a different question.
- **Not fixed by drawing something.** Rendering a chart to match the sentence
  would be the worse cure — a picture that answers a different question is not an
  improvement over a notice that admits there is none (W-013's companion fact).
- **Not a duplicate of W-013.** W-013 is about not reaching the right artifact.
  This is about SAYING you reached one when you did not.

**CLOSURE PROOF (named, live, post-deploy — S63-1).**
A production turn whose prose refers to a chart while the render layer produced
none carries a deterministic, model-independent notice reconciling the two — read
live, trace id and SHA named. **Positive control:** a turn that both promises and
draws a chart carries the clean marker explicitly, and a turn that promises
nothing is byte-unchanged. **Neither state may be represented by an absent
field.**

**FINISH DEFINITION (owner-eye).**
*"Sistem bana 'aşağıdaki grafik' diyorsa aşağıda grafik var. Yoksa, olmadığını
söyleyen o cümlenin kendisi oluyor."*

**Evidence log.**
- 2026-08-05 · observed by the owner on `trace=aaa76f35`; the render layer's
  correctness and the fallback's provenance (`a843eb6`, 2026-07-31, untouched by
  `AXIS-TRUTH-1`) verified at source by the Architect the same day; ruled a bug
  by the owner in the same exchange.

---

---

### BUG-024 · The answer labels a number with a unit its source never stated, in three inconsistent forms

| | |
|---|---|
| **Status** | OPEN |
| **Class** | **PRODUCTION** |
| **Opened** | 2026-08-05 · S81, by owner ruling |
| **Found by** | The Architect, reading the log of a turn the owner issued |
| **Floor when observed** | `3fc6a1bc` · prod `dpl_GTLyRa4kDj2aAv3PbvNtmspcCnRF` · `trace=cb71521b` |
| **Expected home** | unassigned |

**SYMPTOM — one answer, three units, none of them the source's.**

| Where | What it said |
|---|---|
| the question | *"toplam üretim **adedi**"* (count) |
| the model's prose | *"toplam üretim adedi **(metre cinsinden)**"* |
| the table header | *"Toplam Üretim **(m²)**"* |
| **the source field** | **`actualQuantityInMeter`** |

*"Count, in metres"* is incoherent on its own. The table then reports **m²** while
the field the numbers came from is named **Meter**.

**WHAT THIS IS NOT.** **Not a claim the numbers are wrong.** The rows are real
(`actualQuantityInMeter` summed per line across seven days) and the arithmetic is
defensible. **Not a claim m² is wrong either** — ceramic output is conventionally
measured in m², so the label may well be physically correct. **The defect is that
nothing in the turn ESTABLISHED the mapping.** It was asserted, not derived, and
a reader has no way to tell which of the three units is the real one.

**FAMILY.** BUG-018 was an axis whose numbers were right and whose LABELS lied.
This is the same shape one layer up: the value is right and the UNIT is
unsourced. Both are human-facing numbers made untrustworthy by their captions.

**COST.** A unit error in a factory metric is a silent order-of-magnitude class
of mistake — pieces, linear metres and square metres are not interchangeable in
any decision an operator would make with this number.

**CLOSURE PROOF (named, live, post-deploy — S63-1).**
A production turn that renders a numeric column states a unit **only** where the
source establishes one, and where it does not, says so rather than choosing.
Read live, trace id and SHA named. **Positive control:** a column whose source
DOES carry a unit renders it unchanged; a column whose source carries none
renders without a fabricated one, and the absence is explicit rather than blank.

**FINISH DEFINITION (owner-eye).**
*"Tablodaki birim, verinin geldiği yerde yazan birimdir. Sistem birim uydurmuyor;
bilmiyorsa bilmediğini yazıyor."*

**Evidence log.**
- 2026-08-05 · found by the Architect reading `trace=cb71521b`; ruled a bug by
  the owner in the same exchange.

---

---

### BUG-025 · The settings/sync path writes `down` for backends that are demonstrably healthy

| | |
|---|---|
| **Status** | OPEN |
| **Class** | **PRODUCTION** |
| **Opened** | 2026-08-05 · S81 |
| **Found by** | The owner and the Architect, during `OUTAGE-WINDOW-1` |
| **Floor** | `5858ce8c` · prod `dpl_39xeq9mLzxts4TBtxjPyAxhhQpyF` |
| **Expected home** | `HEALTH-TRUTH-1` |

**SYMPTOM.** The owner edited **only** ARMES's URL and pressed Sync. Health rows
were written for backends he never touched:

| time | rows written `down` | truth |
|---|---|---|
| 14:09:38–41 | armes · superset · honestbench | armes true; the other two **false** |
| ~14:11 | superset · machine-knowledge-base · honestbench | mkb possibly true (RAG team was working); superset and honestbench **false** |
| ~14:16 | superset · honestbench | **false** |

**THE POSITIVE CONTROL IS DECISIVE AND IT IS THE CRON'S OWN.** At 15:01 the
`*/30` health cron probed the same four backends over the same connections:

```
[CatalogSync] backend=armes tools=141 ms=7923
[CatalogSync] backend=superset tools=4 ms=3102
[CatalogSync] backend=machine-knowledge-base tools=5 ms=13876
[CatalogSync] backend=honestbench tools=4 ms=740
[BackendHealth] tick { checked: 4, up: 4, down: 0 }
```

**Four up, zero down.** So superset and honestbench were healthy throughout, and
the rows that withheld them were false.

**MECHANISM — PARTIALLY READ, EXPLICITLY NOT CONCLUDED.**
`mcp-settings.ts:127` runs `syncBackendCatalog(...).then(result =>
recordSyncHealth({ scope:'global', server, result }))` for **every** server in the
saved payload, which is why one URL edit probes four backends. **What is NOT
established is why individual probes failed.** The obvious timeout story does not
survive the data: **honestbench is the FASTEST backend (740 ms) and was marked
down; machine-knowledge-base is the slowest (13.9 s) and was not, in the first
batch.** A hypothesis worth testing first, labelled as such: `GET
/api/admin/backend-health` both probes and WRITES, and if the Health tab's
refresh calls it, then *looking* at the health page writes health rows — the
14:16 timestamps landed while the owner was on that tab.

**COST, and it is user-facing.** A false `down` row withholds a working
backend for its whole freshness window (code floor 3600 s). Users are told a
capability is temporarily unavailable when it is not — **the system generates the
very outage BUG-002 was built to report honestly.**

**WHAT THIS IS NOT.** Not the cron's fault — the cron branch is the control that
proved the rows false. Not fixed by shortening freshness: that would make a false
row expire sooner, not stop it being written.

**CLOSURE PROOF (named, live — S63-1).**
Editing one backend's settings writes a health verdict **only** for backends
actually probed, and a probe that did not complete records **neither `up` nor
`down`** — an unknown is not a verdict (`empty≠zero`, at the health layer).
**Positive control:** a genuinely unreachable backend still writes `down` with
its reason, and the cron's 4/4-up result is reproduced after the fix.

**FINISH DEFINITION (owner-eye).**
*"Bir backend'in ayarını değiştirdiğimde, dokunmadığım backend'ler kapalı
görünmüyor."*

**Evidence log.**
- 2026-08-05 · three false batches observed during `OUTAGE-WINDOW-1`; falsified
  by the 15:01 cron's 4/4-up read; `mcp-settings.ts:127` read at the anchor.

---

---

### BUG-026 · The health check records WHY a backend is down and shows it to nobody

| | |
|---|---|
| **Status** | OPEN |
| **Class** | **PRODUCTION** |
| **Opened** | 2026-08-05 · S81 |
| **Found by** | The owner asking *"which panel?"* — and the answer being *"there is no reason shown anywhere"* |
| **Floor** | `5858ce8c` |
| **Expected home** | `HEALTH-TRUTH-1` — **before** BUG-025, because it is BUG-025's instrument |

**SYMPTOM.** `backend_health` carries a capped, classified `error_head` for every
`down` row (`backend-health.ts:102-105`). The Health tab renders **name ·
`ayakta`/`kapalı`/`hiç kontrol edilmedi` · relative time** and **nothing else**.
The reason is written and never surfaced. Worse, only the CRON branch logs it
(`[BackendHealth] backend=X down: <errorHead>`); the settings/sync branch writes
it to the database and prints nothing.

**HOW IT WAS FOUND — the cleanest possible way.** Diagnosing BUG-025 required
knowing why two healthy backends were marked down. The reason existed, in a
column, and could not be reached from the panel, the logs, or the Architect's
tools. **The first time this field was needed, it was unavailable.**

**FAMILY.** BUG-002 and BUG-019, just closed, are both *"the system knows why and
does not say"*. This is the same disease pointed at the operator instead of the
end user.

**WHAT THIS IS NOT.** Not a request to dump raw stack traces into the panel —
`error_head` is already capped and classified. Not a new measurement: the data
exists.

**CLOSURE PROOF (named, live — S63-1).**
A `down` backend's reason is readable by a human without a database query — in
the Health tab beside the status. **Positive control:** an `up` backend shows no
reason field rather than an empty one, and `hiç kontrol edilmedi` stays visibly
distinct from both. **Second control:** the settings/sync branch logs the same
classified head the cron branch already logs, so the two paths are readable
identically (ADR-013).

**FINISH DEFINITION (owner-eye).**
*"Bir backend kapalıysa, panelde NEDEN kapalı olduğunu görüyorum."*

**Evidence log.**
- 2026-08-05 · established by reading `HealthTab.tsx:568-586` against
  `backend-health.ts:102-105` while trying and failing to diagnose BUG-025.

---

---

### BUG-027 · The scope refusal survives beside the chip that contradicts it

| | |
|---|---|
| **Status** | OPEN |
| **Class** | **PRODUCTION** |
| **Opened** | 2026-08-05 · S81 |
| **Found by** | The Architect, in the turn that CLOSED BUG-002 |
| **Floor** | `5858ce8c` · `trace=03b48753` |
| **Expected home** | `PROSE-RENDER-PARITY-1`, together with BUG-023 |

**SYMPTOM.** One answer, two sentences, contradicting each other:

> *"Ben yalnızca **Kale Seramik** kapsamında üretim ve fabrika verilerinin
> analizi konularında yardımcı olabilirim."* — the model's prose
>
> ⚠ *"honestbench geçici olarak kullanılamıyor — **bu yetenek yok değil**, şu an
> erişilemiyor"* — the deterministic chip

One says the capability does not exist; the other says it exists and is
unreachable. The question was about a grove — honestbench's own domain, a
legitimately mounted backend.

**THIS IS THE NAMED RESIDUAL OF AN ACCEPTED RULING, NOT A REVERSAL OF IT.** The
owner chose "never unaccompanied" over server-side suppression, and the reasons
stand: suppression would string-match a governed segment (blind the day a tenant
edits a word) and would start the server rewriting model output (destroying
provenance for replay, governance and the eval gate). The ruling stated in
writing that the residual would be named and sized by measurement rather than
hidden. **This entry is that follow-through.**

**MECHANISM.** The scope sentence is governed data (`safety.b1_scope`; the code
floor at `promptFloor.ts` is tenant-free, the live row carries the tenant name).
It describes a scope that **does not know which backends are mounted**, so when
tools are absent the model falls back to it — and declares out-of-scope a
capability the platform actually has.

**WHAT THIS IS NOT.** Not fixed by editing the sentence — that text belongs to
the tenant. Not fixed by suppressing model output. Not the same as BUG-023
(prose promising an undrawn chart), though they share a surface and a phase.

**CLOSURE PROOF (named, live — S63-1).**
A production turn where a mounted backend is withheld does not present the user
with a scope refusal contradicting the withheld chip. **The instrument that sizes
this first:** the `answerUnbacked`-style detector's RATE over real turns — if the
contradiction is rare, the chip may suffice; if it is common, the remedy is the
governed prompt segment via the admin UI, **never server-side rewriting**.
**Positive control:** a genuinely out-of-scope question on a fully healthy turn
still gets the scope refusal, byte-unchanged.

**FINISH DEFINITION (owner-eye).**
*"Sistem aynı cevapta hem 'bu benim işim değil' hem 'bu yetenek var' demiyor."*

**Evidence log.**
- 2026-08-05 · observed on `trace=03b48753`, the turn that closed BUG-002; named
  in advance in the ruling that chose the mechanism, and filed rather than left
  as an accepted cost.

---

## §BUG.2 — CLOSED

### BUG-022 · The deploy pipeline's type gate prints twenty errors and ships anyway

| | |
|---|---|
| **Status** | **CLOSED 2026-08-05** — production build log, measured against a live control |
| **Class** | **INSTRUMENT** — the defect is in a gate, and it closes by a gate that can red |
| **Opened** | 2026-08-05 · S81 |
| **Found by** | **The owner, reading the build log** — a surface nobody had been reading |
| **Provenance** | LIVE build log of the `338e538` production deployment |
| **Floor when observed** | `338e538` · prod `dpl_6cVFZecJTiV9wYfw1vfKgGsapqqb` |
| **Expected home** | unassigned |

**SYMPTOM.** The `338e538` build log runs the project's own checks clean —
`tsc -b` (13:04:40), `typecheck:api` (13:04:56), `gen:arch-facts`, `vite build`,
and `check:doc-drift [OK] no drift -- all 7 narrative tabs synced` (13:05:02).
Then, from 13:05:02 onward, the **serverless function compile** emits roughly
twenty errors across ten files:

```
governance.ts(420,102): TS2339 Property 'reason' does not exist on 'GoldenPublishDecision'
recordSyncHealth.ts(135,98): TS2339 Property 'err' does not exist on 'SyncProbeResult'
chat.ts(358,76) · stageStream.ts ×5 · stageClarify.ts ×4 · memoryDistill.ts(159,58)
stageTools.ts(727,112),(729,65),(746,44) · gatewayPolicy.ts(295,127) · synthetic-traffic.ts(120,85)
```

**`Build Completed` · `Deployment completed`.**

**MECHANISM, AND THE ERRORS ARE FALSE.** Every one is a discriminated-union
narrowing failure — reading `.reason` off `{allowed:true} | {allowed:false;
reason}`. That narrowing **requires `strictNullChecks`**. Both
`tsconfig.json:16` and `tsconfig.api.json:6` set `"strict": true`, and both
project typechecks pass **in the same build**. The function-layer compile is
therefore running under a configuration **the project does not use**, producing
errors that are wrong — and then ignoring them.

**WHY IT IS FILED ANYWAY, AND WHY IT IS NOT CosMETIC.**
A type gate in the shipping path that **cannot fail** is not a gate. Today it is
loud and wrong; the day a REAL type error lands in `api/**` it will print
identically and deploy identically, inside twenty lines of noise nobody reads.
Our actual protection is CI's `typecheck:api`, which works — so the risk is
bounded, and the **channel is deaf**, which is this session's recurring disease
in a new place (BUG-015, S82-2: an apparatus reporting a state it did not
measure).

**WHAT THIS IS NOT.**
- **Not caused by ROUTE-OPEN-2.** `stageTools.ts:727` is the F187-era gateway
  denial block; the ROUTE-OPEN-2 diff touches it **zero** times, verified.
- **Not a production defect.** Those code paths run correctly in production —
  `[GatewayPolicy] decision=passed` was read live the same day.
- **Not fixed by silencing the output.** Making the channel quiet and deaf is
  worse than loud and deaf.

**CLOSURE PROOF (class INSTRUMENT).**
Either the function-layer compile is bound to `tsconfig.api.json` and the twenty
errors disappear **because they were never real**, or a check reads that output
and reds when it is non-empty. **Proven in both directions (D-5):** a clean build
passes, and a deliberately planted real type error in an `api/**` file **fails
the deploy** rather than printing and shipping. The planted error is reverted and
the revert verified.

**FINISH DEFINITION (owner-eye).**
*"Build log'unda hata yazıyorsa deploy olmuyor. Yazmıyorsa gerçekten hata yok."*

**Evidence log.**
- 2026-08-05 · found by the owner in the `338e538` build log; the false-positive
  mechanism (strict-mode narrowing vs the function-layer config) and the
  not-ours attribution both verified at source by the Architect the same day.

- 2026-08-05 · **THE REMEDY IS ALREADY IN THE TREE AND HAS BEEN INERT FOR A
  MONTH.** `git log -S'@vercel/node' -- tsconfig.json` returns **`a7af3b3`,
  2026-07-07**: *"fix(tsconfig): strict:true on root config so @vercel/node
  checks api under strict (BUILD-CLEANUP-2)"*. The root config carries
  `"strict": true` in `compilerOptions` plus a docblock stating the exact
  mechanism — that `@vercel/node`'s per-function typecheck otherwise falls back
  to compiler defaults with `strictNullChecks` OFF, under which
  discriminated-union narrowing fails and correct code mis-reports TS2339. **The
  diagnosis was right, the fix was written, and the symptom never went away.**
  `189` merges have landed since. **So "add strict" is not this bug's fix — it is
  this bug's failed first attempt, and the phase must not repeat it.**
- 2026-08-05 · **THE COUNT ITSELF IS CONTESTED, WHICH IS THE BUG ARGUING FOR
  ITSELF.** The Architect counted **22** distinct `error TS` lines by reading the
  full build log the owner pasted (governance ×2 · recordSyncHealth ·
  bulk-publish · synthetic-traffic · chat ×2 · stageStream ×6 · stageClarify ×4 ·
  memoryDistill · stageTools ×3 · gatewayPolicy). AG counted **18** enumerating
  the same build through the Vercel log API across head, tail and a middle
  window. Most likely a windowing artefact — **and neither number is adopted as a
  fixture.** AG's conclusion is taken as binding on the fix: **the gate must
  measure its own baseline in the same run rather than key on a hand-read
  constant.** A fixture nobody re-derives is the same defect class as a bound
  nobody sweeps.
---

---

**CLOSURE — and the diagnosis was more interesting than the fix.**
Merged `5f2dee584717dcc9cd296589c126adf7c839bd0d`, converged
`dpl_3B7pa51EEYiPBZu5bX73oVZguEAy`.

**The 2026-07-07 remedy was RIGHT, and something threw it away.**
`@vercel/node` resolves its per-function typecheck config with
`ts.findConfigFile(<entrypoint>)`, walking up from the function's directory — so
it **did** read the root `tsconfig.json` and **did** read the `strict: true` that
`a7af3b3` added. Then `fixConfig()` (`@vercel/node@5.8.22`, `dist/index.js:72215`),
seeing no `module` key beside it, sets `module`, `moduleResolution` **and
`strict: false`**. Right file, right key, **missing sibling** — inert for 190+
merges, because the only artefact that would have falsified it is a build log and
nobody reads those.

**AND THE OBVIOUS FIX WOULD HAVE BEEN A SECOND SILENT NO-OP.** `fixConfig` runs
on the RAW, un-extended options, so `{ "extends": … }` alone still looks
`module: undefined`, the clobber fires, and the injected `strict:false` lands on
the CHILD and beats the parent. AG ran all three variants instead of reasoning
about them; V1 resolved to `strict:false` and would have reproduced `a7af3b3`
exactly. `api/tsconfig.json` therefore **restates** `module`/`moduleResolution`,
and a four-test net (5 mutations, 5 killed) reds if anyone deletes them believing
the parent covers it.

**PROOF, with the control that makes the zero mean something.**
`get_deployment_build_logs(errorsOnly: true, direction: head, limit: 2000)` — the
**identical filter that counted 26** — returns **zero** function-layer `error TS`
lines against production, and the view reaches `Build Completed`, so it is a
complete log and not a window. `typecheck:api` still runs and still passes in the
same log, proving nothing was switched off to buy silence.
**POSITIVE CONTROL:** the same filter, minutes later, against
`dpl_4qaQqURvrDVXuRZn1hHDocLAoJXk` **still returns all 26**. The instrument
demonstrably sees 26 when 26 exist. The zero is a measurement.

**The contested count is settled:** replaying `5858ce8c` gives 23 in-tree / 22
build-visible — the Architect's 22 was right, the 18 was a truncated read, and
the +4 to 26 was `recordSyncHealth.ts` growing under `HEALTH-TRUTH-1`. Which is
why G4 forbade a hard-coded baseline in the first place.

**Zero product code changed.** Six files, 721 insertions, zero deletions, zero
migrations, no docVersion change. **Round-trips: zero.**

**Evidence log.**
- 2026-08-05 · found by the owner reading a build log nobody had been reading.
- 2026-08-05 · the inert 2026-07-07 remedy found by `git log -S`.
- 2026-08-05 · merged `5f2dee58`; **merging did not close it.**
- 2026-08-05 · proof read with a live control. **CLOSED.**


---


## §BUG.3 — WATCHLIST (not bugs; each names what promotes or retires it)

**Counting rule (rule 10 depends on it):** the WATCHLIST count is the number of
**live** entries. `PROMOTED` / `RETIRED` / `DISCHARGED` stubs keep their id
forever so it is never reused and the trail is never silent, but they are **not
counted**.

### W-001 · PROMOTED

**Promoted to BUG-006 by owner ruling, 2026-08-03.** The id is retired, never
reused. The full record lives in BUG-006; a second finding surfaced by the same
code read was opened separately as BUG-007.

---

---

### W-004 · The MCP Servers panel shows "not probed" while the ledger is fresh

**Observed** 2026-08-04, mid-window: the MCP Servers page listed all three global
servers as **"not probed"** at a moment when `backend_health` carried rows minutes
old and the **Health tab** correctly read *"ARMES up 13 minutes ago"*. Two
surfaces, same ledger, different answers.

**Not a bug:** the Architect has not read what that Status column is sourced from
or what it is meant to assert. Filing on an uninvestigated observation is the
error this bucket exists to prevent.

**Resolves by:** reading the MCP Servers page's Status source. If it is meant to
reflect `backend_health` and does not, it promotes; if it names a different,
session-local concept, it retires and the column's wording is the finding.

---

---

### W-002 · `[CatalogSync] backend=armes tools=141 missing=9`

**Observed** at the `16:00:29Z` catalog-sync tick. Nine mirrored tool rows carry
`status='missing'`.

**Unread.** No claim is made in either direction. Filing a bug on an
uninvestigated observation would repeat the error this bucket's charter exists
to prevent.

**Deliberately deferred** until `MA-RERUN-1` completes, per S74-1 (a started job
finishes before another opens). **This is a named deferral, not a silent one.**

**Resolves by:** a read of `backend_tools` where `backend_id='armes'` and
`status='missing'` — which nine, since when, and whether they correspond to
tools ARMES genuinely stopped publishing. That read promotes this to a bug or
retires it.

---

---

### W-003 · The born-loud `[Clarify]` line carries no frame identity

`stageClarify.ts:384` emits one line per frame, but the line carries no
correlation id. Aligning it to an evaluation is **positional only** — it works
because `clarificationLens.ts:917-919` is a strictly sequential `for/await`
loop with nothing interleaved.

AG met this during MA-RERUN-1 and handled it correctly: an asserted expected
line count (`len(evaluations) + guardian.n`) plus an `object=`-match positive
control, **withholding the partition rather than emitting a plausible-looking
wrong one**.

**Not a bug:** no wrong behaviour has been observed. Recorded as a fragility so
that the next consumer of this line does not have to rediscover it.

**Promotes to a bug if:** an alignment failure is ever observed, in production
or in a run.

---

---

### W-005 · The "born-loud" claim is true only under replay

`stageClarify.ts` documents the `[Clarify]` line as born-loud and *"readable from
production without anyone being asked to reproduce it."* **In production that is
false today:** `computeTurnClarification` returns at `:385` when
`ctx.frameRoutingEnabled` is falsy, and `router.frameRouting` is dark, so the
line never fires. It is true only inside the offline lens, which forces the flag.

**Not a bug:** no wrong behaviour. But a comment in the codebase asserts an
observability property the system does not have — **and it misled the Architect
into writing an unsatisfiable proof step** (BUG-008's P3).

**Retires when:** `router.frameRouting` is published to 1 and the claim becomes
true on its own. **Promotes if:** anything else is built on the assumption that
the line fires in production.

---

### W-006 · The AdminPanel active-context assertion cannot fail on its own cause

`AdminPanel.test.tsx` went red once under full-suite load and was proven a flake
(5× isolated on the branch, 3× isolated on a clean `origin/master` worktree, full
suite green locally on both, all five CI gates green on a re-run with identical
code, plus the structural argument that the test drives `permissions: []` and
never mounts `MCPSettingsTab`).

**The underlying defect is the test's own:**
`findByTestId('active-context-banner')` resolves in **both** states, so it cannot
distinguish *"not updated yet"* from *"updated"*.

**Not a bug** (test-side, no production behaviour). **Promotes if** it ever
masks a real regression; **retires when** the assertion is given a discriminator.

---

### W-007 · `CATALOG-STATUS-SPLIT-1` — two consumers, two definitions of "the catalog"

| Consumer | Line | Counts `status='missing'` rows? |
|---|---|---|
| the gateway misroute fence | `gatewayPreflight.ts:98` | **No** — filters to `active` |
| the eval-gate's referential stage | `governance.ts:331`, `:76/78` | **Yes** — no status filter |

Neither is obviously wrong (rows are retained because *missing ≠ deleted*), but
they cannot both be the definition. **Resolves by** an owner ruling on whether
the gate's catalog includes retired rows; the Architect's recommendation is to
leave the gate permissive and make the divergence **visible** in its existing
catalog evidence rather than to tighten it.

---

### W-008 · `HONESTBENCH-RUNLOG-DURABILITY-1`

`mcp-honestbench` runs on Vercel serverless, where the run log survives neither
the filesystem nor the next invocation. **Accepted, because the server is
deterministic:** given `fixture.json`, `dial.json` and the call, the served value
is a pure function and both files are hash-pinned, so the scorer's authoritative
inputs are the two hashes plus CWF's own telemetry.

**Retires if** reconstruction proves sufficient across a full scored run;
**promotes** the moment it does not, and only then is a durable sink built.

---

### W-009 · `HONESTBENCH-PUBLIC-ACCESS-1` — the benchmark is behind SSO

The project's `ssoProtection` is `enabled: true` with
`deploymentType: all_except_custom_domains`. Project-scoped URLs 302 to a login;
the short production alias serves 200 and was **independently verified reachable
without credentials** (a plain fetch returned 404 from Express rather than a
login redirect).

**A mount works today via the alias.** But Tier E requires the benchmark to be
**runnable by third parties** (C2+C3), and a URL behind SSO fails that
structurally. **Resolves before publication (Blok 4)** by disabling Vercel
Authentication for this project or attaching a custom domain — the setting
already exempts custom domains. No decision is needed today.

---

### W-010 · `SYNTH-SPEND-ESTIMATE-1` — the spend fence meters an estimate

`runSyntheticInjectorTick.ts:38` adds a flat
`ESTIMATED_TOKENS_PER_ROUTER_CALL = 400` per injection because `routeSemantica`
does not surface real usage. The daily ceiling is 200000, so
**200000 ÷ 400 = exactly 500** — *"daily token ceiling"* is a **500-calls-per-day
limit wearing a token costume**, and the real daily cost of synthetic traffic is
**unknown**.

**Not a bug:** the constant's name and comment declare the estimate openly.
**Retires when** `routeSemantica` returns real usage, or when `BENCH-SMOKE-1`
(rollout 2.6, already defined as a cost-metering instrument) meters this path.

---
### W-011 · PROMOTED

**Promoted to BUG-017 by owner ruling, 2026-08-05.** The id is retired,
never reused. The full record lives in BUG-017, together with the owner's
ruling on its proof path: **(ii) — the closure proof is taken through the
LENS, not a production turn**, because `router.frameRouting` is dark and a
production-turn proof would be unsatisfiable (BUG-008's P3 lesson).

---

---

---

### W-012 · `BACKEND-EGRESS-SURFACE-1` — mounting a backend opens an outbound data path

`[MCP Call] hb_grove_yield_total with args: {"groveId":"G-03"}` — tool arguments
are **constructed from user text** and sent to whatever URL an admin configured.
Today's target is a **public, unauthenticated** third-party endpoint.

**Not an alarm:** an admin is authorised and chose the URL; that is what the
affordance is for. **But the blast radius of "add a backend" now includes "user
text may reach that host", and nobody had named it.** Same family as BUG-005,
which is the *other* direction of the same line: those arguments are also written
verbatim to a third-party log store.

**Promotes if** an argument carrying customer data is observed leaving to a
non-owned host. **Retires when** BUG-005's fix defines what may leave and the
same rule is applied to the egress side.

---

---

---

### W-013 · `SEARCH-STOPS-AT-FIRST-CANDIDATE-1` — the answer degrades from a chart to a table because the search stopped at the first plausible artifact

**Observed** 2026-08-05, `trace=8446ba665d865d61c600163f8450223f`, prod
`dpl_6cVFZecJTiV9wYfw1vfKgGsapqqb` @ `338e538` — the same turn that closed
BUG-013.

The question asked for a **10-day chart**. The turn found
`"Granit - Glazür Hatları Doğalgaz Sarfiyat Grafiği"` (id 85), pulled its data,
correctly determined that the data carried **no time series**, said so plainly,
attributed the source (*"Superset BI özet verisidir, yetkili MES (ARMES) verisi
değildir"*), rendered the five rows it did have as a **table**, and stopped.

**The same `list_charts` result, in the same turn's log, also returned ids 80, 91
and 95, named `"Granit — Glazür 3/4/5 Vardiya Bazlı Doğalgaz Sarfiyat Grafiği"`.**
"Vardiya bazlı" (per-shift) names a finer grain than the aggregate it chose.
**Whether any of them carries a 10-day series was NOT read and is not claimed
here** — what is observed is that three named candidates were returned and none
was opened.

**NOT A BUG, and the distinction is the whole point of this section.** Nothing
the turn said was false. It did not fabricate, did not hide a failure, did not
dress an outage as a scope limit. It was **honest about what it had read**. The
defect class this bucket exists to catch is absent.

**WHY IT IS ON THE WATCHLIST ANYWAY — OWNER RULING, 2026-08-05.**

> *"Grafik son kullanıcı arayüzüdür; insan görselle çalışır, yazı ile zorlanır."*

The cost is therefore not "slightly less thorough retrieval". A user asked for a
**chart** and received a **table**: the deliverable fell back to the medium the
human parses worst, and it did so silently, because from inside the turn nothing
distinguishes *"this catalogue has no time series"* from *"I opened one of four
candidates"*. **That is the same shape as `empty≠zero`, one storey up — at the
level of the ANSWER's medium rather than a number's value.**

**PROMOTES TO A BUG IF:** the pattern is observed again on a question whose
answering artifact demonstrably existed in the catalogue at the time; or any
measurement (the lens, MEASURE-2) shows first-candidate stopping at a rate; or a
turn ever states that something does not exist when an unopened candidate did.
The third form is a bug the moment it happens, with no repetition required.

**RETIRES WHEN:** the system can tell what a tool is able to PRODUCE before
calling it — `TOOL-EARNED-TRUST-1` (rollout queue 4) plus `ROUTE-ASK-1` (2E.4),
or the understanding layer. It does not retire by the model getting luckier.

**A COMPANION FACT, recorded so it is not re-derived:** the previous day's answer
to the identical question DID render a chart — and it charted the aggregate,
which also was not the 10-day series that was asked for, with the mismatch placed
in a footnote. **A picture that answers a different question is not better than a
table that admits it.** Both turns were honest; only one was honest in the
headline. This entry is about reaching the right artifact, never about drawing
something to look complete.

---

---

### W-014 · `BADGE-TURN-SCOPED-1` — a chart drawn from a previous turn's data carries "not based on any tool query"

**Observed** 2026-08-05, the follow-up turn to `trace=cb71521b`: the owner asked
*"bunu grafik olarak çizer misin"*, a chart rendered correctly from the previous
turn's numbers, and the grounding badge read *"⚠ Bu cevap hiçbir araç sorgusuna
dayanmıyor."*

**NOT A BUG, and the reason is that the badge is right.** That turn made **zero**
tool calls. The badge's scope is the TURN, and within the turn it told the truth —
which is the same discipline that caught the fabricated answer on
`trace=269c2367`. Narrowing it would break the control that works.

**Recorded because a user reads both at once:** a chart that looks authoritative
sitting above a warning that the answer is not tool-grounded. The data WAS
grounded — one turn earlier.

**PROMOTES TO A BUG IF:** a user is observed acting on the badge's turn-scoped
meaning as if it were conversation-scoped, or if the badge is ever the reason a
correct answer is distrusted.
**RETIRES WHEN:** the badge can distinguish *"no tool call this turn, and none
was needed"* from *"no tool call at all"* — which is `OUTAGE-TRUTH-1`'s and
`PROSE-RENDER-PARITY-1`'s surface, not a new one.

---

## §BUG.4 — CARRY DEBTS (owed at a named moment)

### D-001 · DISCHARGED

**Discharged 2026-08-04** by `cwf-open-items-register-v84` §5, which carries both
`S81-1` and `S81-2` alongside the S80 rules — exactly the condition this debt
named. Drops after one version.

---

### D-003 · §BUG is not yet part of any register

This bucket exists as a **standalone file**. BUG-CARRY-1 rule 1 requires it to
be the last section of register v84 and every register after it, and rule 10
requires the bootstrap to carry all three counts.

**Done when:** register v84 carries §BUG verbatim **and** bootstrap v80 states
`8 açık bug · 3 kapalı · 3 izleme · 2 borç` (or whatever the counts are at that moment,
matching this file exactly).

---

**APPENDED v12:** the counts this debt must match are now
`17 açık bug · 1 kapalı · 12 izleme · 1 borç`.


---

## §BUG.5 — THE QUEUE (S81 close · owner-legislated)

**Three owner rulings recorded this version.** `TOOL-EARNED-TRUST-1` moved ahead
of the prose work. **`FAULT-SWITCH-0` (rollout 2.3b) enters at position 8** as
the precondition for BUG-006 and BUG-009. **BUG-005 goes LAST, in the owner's own
words:** *"her şey bitti, kapakları kapatıyoruz, CWF is done dediğimiz anda."*
And **BUG-006's proof is taken on a PREVIEW deployment of the merged SHA (option
b)** — never a production window, because the thing being broken is our own DB
read and that code path is identical in preview.

| # | Phase | Closes | **INSTRUMENT — rule 15** |
|---|---|---|---|
| **1** | `GATEWAY-BURST-GUARD-1` | BUG-020 | Exists. A legitimate 7-call fan-out must survive the brake. |
| **2** | `TOOL-EARNED-TRUST-1` A→B→C | BUG-021 | Exists — `backend_tools.input_schema` is already there and empty. Five instances recorded. |
| **3** | `PROSE-RENDER-PARITY-1` | BUG-023 + BUG-027 | Exists — the badge surface built by `OUTAGE-TRUTH-1`. |
| **4** | `UNIT-TRUTH-1` | BUG-024 | Exists — an ordinary production turn. |
| **5** | `BUG-012` registration guard | BUG-012 | Exists. Still precedes `HONESTBENCH-RUN-1`'s M3b dial. |
| **6** | `PROBE-PARITY-1` + `AUTO-SYNC-ON-SAVE-1` | BUG-010, BUG-011 | Exists — the panel plus the health ledger, readable since BUG-026. |
| **7** | **`FAULT-SWITCH-0`** (rollout 2.3b) | *no bug — it IS an instrument* | **To be built.** `getServiceClient()` wrapper, second instance of `wrapClientWithDbReadSpans`. Env-armed only · reads only · deterministic · fails loud. **Known gap: wraps `.from()`, not `.rpc()`.** |
| **8** | BUG-006 + BUG-009 | BUG-006, BUG-009 | **Position 7's output.** BUG-006's proof surface: **preview deployment (owner ruling b)**. |
| **9** | credential proof phase | BUG-014 | **DOES NOT EXIST** — needs a backend that actually requires a credential. Named absence, not a blank. |
| **10** | instrument + process gates | BUG-015, BUG-016 | **DOES NOT EXIST** — the gates ARE the deliverable. Seven instrument false-readings and 23 premise errors recorded. |
| **11** | lens frame phase | BUG-017 | Exists — the lens. Proof path (ii), owner-ruled. |
| **LAST** | BUG-005 | BUG-005 | Exists (AST census). **Owner-placed last, by name and with his reason.** |

**Then:** `ROUTE-DERIVE-1` · `PACK-FROM-PROTOCOL-1` · `HONESTBENCH-RUN-1` ·
`ROUTE-ASK-1`.

**SOTA-1 CHECK.** Nothing deferred, shrunk or re-ordered down by the Architect.
Every move in this version is an owner ruling recorded with its reason. BUG-005's
placement is the owner's own sequencing decision, carrying his words and its
date — not a convenience deferral.

**NO PRODUCTION READ IS OWED.**

---

<!-- END · REGISTER-BUG-BUCKET-v20 · OPEN: 17 · CLOSED: 1 · WATCHLIST: 12 · DEBTS: 1 · CLOSES S81 -->
