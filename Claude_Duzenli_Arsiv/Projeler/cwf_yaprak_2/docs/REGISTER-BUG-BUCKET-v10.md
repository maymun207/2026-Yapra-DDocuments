# CWF — Open Items Register · §BUG (Bug Bucket) · v10

<!-- REGISTER-BUG-BUCKET-v10 · 2026-08-04 · closes S82. Supersedes v9.
     COUNTS MOVED — the bootstrap's three-count positive control must be updated
     with this file or the next session boots "wrong" by its own test.
     BUG-008 CLOSED (proof read taken on merged master, not merged shut).
     BUG-012 OPENED (code-reading provenance, never observed live — the BUG-009
     pattern). BUG-001/003/004 DROP here: register v84 carried them for their one
     version (rule 5). Six watchlist entries added from a single session, which is
     itself a finding. D-001 DISCHARGED; D-002's stub drops.
     Every OPEN entry below is carried VERBATIM from v9 per BUG-CARRY-1 rule 2 —
     assembled by extraction, not retyping. -->

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

---

---

## §BUG.1 — OPEN

---

### BUG-002 · A withheld backend reaches the user as "I have no such capability"

| | |
|---|---|
| **Status** | OPEN |
| **Opened** | 2026-08-03 · S81 |
| **Found by** | Architect, while diagnosing BUG-001 |
| **Floor when observed** | `28ec4d9d…` · prod `dpl_EUspKSTuMB1qnXN6S9fa26mkWyAA` |
| **Expected home** | `HONEST-READ-2` family (register v83 §4) |

**SYMPTOM.** Turn `4eba38ae`, `15:48:33Z`. Asked for the factory list, the
product answered that it has **no tool** for it and listed its Superset BI
capabilities instead. To the reader that is a statement about what the product
*is*. It was in fact a statement about what one backend was doing for the next
thirty minutes. The two are indistinguishable at the surface.

**MECHANISM.**
`api/cwf/_lib/turn/stagesResolve.ts:31` sets `ctx.mcpWithheldBackends`. Its only
consumer is the span I/O summary at `:40`. `grep` for `mcpWithheldBackends` and
`withheldBackends` across `src/` and `shared/` returns **zero** client-side
consumers. `mcpHealthWithholding.ts:14-19` names the constraint that produced
this: the phase's binding *"no client-visible API changes"*, which the module
explicitly records as leaving a user-facing notice **out of scope**.

**LAW VIOLATED.** `empty≠zero`, at the **capability layer**. An outage is
rendered as the absence of a capability. This is the HONEST-READ-2 disease one
storey up: what goes missing is not rows, it is what the product can do.

**COST.** A user concludes the product cannot do something it can do, and has no
route to discover otherwise. The owner experienced exactly this and had to read
runtime logs to recover the truth.

**CLOSURE PROOF.** With a backend fresh-and-down, a live production turn whose
question routes to that backend's categories produces a **user-visible**
statement of temporary backend unavailability — not "I have no tool" — verified
from production with the trace id and deployment SHA named. Positive control: a
turn with all backends up must carry **no** such notice.

**FINISH DEFINITION (user-eye).**
*"When a system is down, it tells me it is down, instead of telling me it can't
do the job."*

**Scope note for the fix (not a decision made here).** How much backend detail an
end user should see is a design question belonging to the fix phase, not to this
entry. The entry asserts only that "temporarily unavailable" and "not supported"
must not arrive as the same sentence.

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
- 2026-08-03 · opened from turn `4eba38ae` (above).

---

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

### BUG-007 · The misroute redirect points the model at a withheld backend

| | |
|---|---|
| **Status** | OPEN |
| **Opened** | 2026-08-03 · S81 |
| **Found by** | Architect, reading `gatewayPreflight.ts` for BUG-006 |
| **Floor when observed** | `28ec4d9d…` · prod `dpl_EUspKSTuMB1qnXN6S9fa26mkWyAA` |
| **Expected home** | unassigned |

**SYMPTOM — the observed chain, end to end.** ARMES marked down → its tools
withheld from the turn → the model reaches for the Superset gateway → the
misroute guard (expected to) match and answer
*"`getFactoryLines` ARMES kataloğundadır; Superset gateway üzerinden
çağrılamaz. **ARMES aracını doğrudan kullanın.**"* → **the ARMES tool it names
is not offered this turn** → the model has nowhere left to go → it answers that
it has no tool for the factory list (turn `4eba38ae`, `15:48:33Z`).

The guard directed the model at a door that was locked, in a state the guard
does not consult.

**MECHANISM.** `armesGatewayMisrouteMessage(toolName)` composes a **fixed**
redirect with no reference to whether that backend's tools are offered on this
turn. The withheld set is known and available — `ctx.mcpWithheldBackends`, set
at `stagesResolve.ts:31` — and **nothing on the pre-flight path reads it**.

**RELATIONSHIP TO BUG-002.** Same family — an outage arriving as an absence of
capability — but a different site, a different audience and a different fix:
BUG-002 is about what the **user** is told; BUG-007 is about what the **model**
is told. They close independently, which is why they are separate entries.

**WHAT THIS IS NOT.** Not an argument against the redirect. When ARMES is up the
message is correct and useful; the defect is that it is stated unconditionally.

**COST.** The redirect is not merely unhelpful, it is **misleading**: it asserts
a route that does not exist in that turn's state, and having taken it the
model's only remaining move is to deny the capability outright.

**CLOSURE PROOF (named, live, post-deploy — S63-1).**
With a backend fresh-and-down and its tools withheld, a production turn that
triggers the misroute guard receives a message stating the backend is
**temporarily unavailable** rather than directing the model to use it —
verified live, trace id and deployment SHA named. **Positive control:** with the
backend up, the original redirect text is byte-unchanged. A fix that improves
the outage path by degrading the normal one is rejected.

**FINISH DEFINITION (owner-eye).**
*"Kapı kilitliyken sistem modele 'şu kapıyı kullan' demiyor."*

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
- 2026-08-03 · found while reading `gatewayPreflight.ts` for BUG-006; ruled a
  bug by the owner the same day.

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

**Evidence log.**
- 2026-08-04 · found by AG while reading the registration path for
  `HONESTBENCH-HARNESS-0`; the site read and confirmed by the Architect at
  `stageTools.ts:526`.
- 2026-08-04 · the panel half closed by `BACKEND-IDENTITY-IS-DATA-1`; the
  registration half remains open and is what this entry now covers.

---

## §BUG.2 — CLOSED

### BUG-008 · The lens's JSON evidence reports a clean run that was not clean

| | |
|---|---|
| **Status** | **CLOSED 2026-08-04** — proof read taken on merged master, not merged shut |
| **Opened** | 2026-08-03 · S81 |
| **Found by** | AG, executing MA-RERUN-1's §5 agreement check under AMENDMENT-2 §A8 |
| **Floor when observed** | `8052f8ac` (`phase/ma-rerun-1`, doc-only over `28ec4d9d`) |
| **Expected home** | unassigned |

**SYMPTOM.** Two runs of the clarification lens over a **byte-identical row set**
disagreed on exactly one evaluation of 5164. At that frame, run2's per-frame
governed registry read failed —
`[EntityRegistryRepository] listByBackend failed: TypeError: terminated` — the
lens fell back to the code floor, `layerStatus` became `unknown`, the entity did
not resolve, and the verdict flipped from `LOW`/`time-unclear` to
`HIGH`/`entity-unresolved`.

**In the very run that suffered it, the JSON evidence reports a clean run:**

| Evidence field | Value in the degraded run |
|---|---|
| `load.readErrors` | `[]` |
| `registry.entityAliasSource` | `'db'` |
| `registry.errors` | `[]` |
| `guardian.rate` | `1` |
| `caveats[]` | unchanged, all four |

**The evidence object has no field that can express "N frames were evaluated
against a fallback registry read."** The failure exists **only** on the stderr
line F199 made born-loud.

**MECHANISM.** `load.readErrors` is scoped to the row-**load** phase, so `[]` is
correct for its own scope. `entityAliasSource` describes the run-level
**snapshot**, so `'db'` is likewise true of what it names. Neither is a lie.
**The defect is the absence of a field**, not a wrong value in one — the
per-frame evaluation reads are a second, unrepresented read surface.

**LAW.** MEASURE-READ-HONESTY-1 one storey up. The law makes reads that feed a
measurement distinguish *"no data"* from *"could not read"*. Nothing makes the
**evidence object of a measurement** distinguish *"evaluated cleanly"* from
*"evaluated on a fallback."*

**COST — measured, not hypothetical.** Without AMENDMENT-1's stderr capture this
disagreement would have been recorded as **unattributed** — which the brief
itself calls "the much larger finding" — and would have been wrong. That capture
was an ad-hoc instruction from the Architect, **not part of the instrument**. The
next person to run this lens without it gets a clean-looking artifact over a
degraded run.

**WHAT THIS IS NOT.**
- **Not the fallback's fault.** Falling back to the code floor is the designed,
  correct behaviour. The defect is that it leaves no trace in the evidence.
- **Not fixed by removing the fallback.** That would trade a silent degradation
  for an outright failure.
- **Not a stderr problem.** The stderr line worked perfectly — that is precisely
  how the defect was found. The gap is that the **artifact** cannot carry what
  the console already says.

**CLOSURE PROOF (named, live, post-deploy — S63-1).**
With a per-frame registry read **forced to fail** for a known subset of frames,
one run produces JSON evidence carrying a countable field naming how many frames
were evaluated on the fallback, and which — cross-checked against the `[Clarify]`
stderr count for the same run, the two agreeing exactly.
**Positive control:** a clean run reports that field as **`0`**, present and
zero — never absent. An absent field would reproduce this bug in a new shape.

**FINISH DEFINITION (owner-eye).**
*"Ölçümün kendi kanıt dosyası, o ölçüm sırasında bir şeyin bozulup bozulmadığını
söylüyor — konsolu ayrıca yakalamam gerekmiyor."*

**Evidence log.**
- 2026-08-03 · found during MA-RERUN-1's agreement check; recorded in
  `docs/replay/ma-gate-rerun-S81-v1.md` §8.3.

---

**CLOSURE — `LENS-CEILING-1`, STEP 6, on merged `master` `4469a370`.**
The bucket's own criterion, met exactly. A temporary uncommitted patch forced
every third governed registry read to throw; the pair ran and was reverted.

| | 6a · degraded | 6b · clean control |
|---|---|---|
| `totalSeamInvocations` | 93 | 93 |
| `degradedFrames` | **31** | **0 — present, not absent** |
| `byFailure.discovered` | 31 | 0 |
| stderr `reads=discovered` | **31** | 0 |
| stderr `reads=ok` | 62 | 93 |
| `load.readErrors` | `[]` | `[]` |

**31 = 31, and 31 + 62 = 93.** The JSON evidence and the born-loud stderr agree
exactly. `load.readErrors` stayed empty while `degradedFrames` was 31 — the
"one field, one meaning" property holds in production, not only in test.

**AN ARCHITECT PROOF STEP WAS WITHDRAWN AS UNSATISFIABLE, and it is recorded
rather than quietly dropped.** The GO added a fourth read (P3): confirm every
production `[Clarify]` line carries the new `reads=` token. It cannot fire.
`stageClarify.ts:385` returns before the entity read whenever
`ctx.frameRoutingEnabled` is false, and `router.frameRouting` is dark — so
production emits **no `[Clarify]` line at all**. Verified two ways: by the code,
and by a Vercel query over a window containing two known production turns which
returned zero lines while the same window returned other log families. **The
bucket's own closure text never required a production turn**; P3 was the
Architect's addition, and BUG-008 closes on STEP 6 alone.

**Consequence stated plainly so nobody misreads the fix's reach:** the honesty
field is **inert in production** until `router.frameRouting` is flipped. That is
not a defect — the bug was in the *lens's evidence file*, and the lens forces the
flag true. Nobody should conclude that production turns now carry read-integrity
records.

**Evidence log.**
- 2026-08-03 · found during MA-RERUN-1's agreement check.
- 2026-08-04 · fix merged `4469a370`. **Merging did not close it.**
- 2026-08-04 · STEP 6 pair taken on merged master. **CLOSED.**

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

<!-- END · REGISTER-BUG-BUCKET-v10 · OPEN: 8 · CLOSED: 1 · WATCHLIST: 9 · DEBTS: 1 -->
