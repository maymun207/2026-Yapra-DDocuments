# DESIGN · BACKEND-LIFECYCLE-AFFORDANCE-1 · v1

<!-- cwf-backend-lifecycle-affordance-design-v1 · 2026-08-04 · S81 · Architect: Claude.
     Rollout plan v1_3 item 2.3, and the named prerequisite of 2.2
     (BENCH-BACKEND-MOUNT-1). Carries five bucket entries: BUG-001, BUG-003,
     BUG-006, BUG-007, and the MODEL-facing half of BUG-002.
     Floor read live at origin/master `ecea4851`. NOT a phase prompt — the
     prompt is authored after the owner rules on §5. -->

---

## 0 · THE REFUTATION TEST — run first, as promised

When this phase was proposed, the Architect committed to a falsifier before
writing a line of it:

> *"If the fixes for BUG-001 and BUG-006 share no common mechanism, they are not
> one disease, the 'missing law' diagnosis is a rationalisation, and I withdraw
> it."*

**Result: the claim survives. Its WORDING did not.**

The diagnosis said a recording mechanism was *missing*. That is false. In all
five sites the mechanism **already exists** — and is simply **not invoked on one
of the paths that reaches the same decision**:

| Bug | The mechanism that already exists | The path that does not invoke it |
|---|---|---|
| BUG-001 | `BackendHealthRepository.recordCheck` | `POST /api/admin/backend-tools/sync` and `mcp-settings`'s on-connect hook both run `syncBackendCatalog` — the **same** liveness probe the cron runs — and write no health row |
| BUG-003 | `backend_health.error_head`, a real column | the writer stores a message whose cause never entered it |
| BUG-006 | `[GatewayPolicy] denied …` + `ATTR_GATEWAY_DENIED` / `ATTR_GATEWAY_DENIED_TOOL` at `stageTools.ts:564-568` | the **sibling branch** at `:570`, `misroutedToArmes`, emits neither — three lines apart, same site, same decision class |
| BUG-007 | `ctx.mcpWithheldBackends`, set at `stagesResolve.ts:31` | `armesGatewayMisrouteMessage` composes a fixed redirect and never reads it |
| BUG-002 (model half) | the same `ctx.mcpWithheldBackends` | nothing on the tool-offer path consults it before the model is left to conclude the capability is absent |

**So the law is a PARITY law, not a recording law.** Nothing needs building.
What is missing is a rule requiring that **every path reaching the same class of
decision invokes the same record** — and that the record reaches whatever
consumes it.

A second, structural consequence, verified at the byte: `stageTools.ts:545` is
`armesActiveToolNames!.has(...)`, and `loadArmesActiveToolNames` fails open to an
**empty Set**. An unreadable mirror therefore makes `misroutedToArmes`
permanently `false` — **the fence goes inert silently.** That is BUG-006's
sharpest form and it is a parity failure too: the inert state has no record
while the active state has none either.

---

## 1 · THE LAW (draft wording — the phase must gate-test it, D-5)

> **DECISION-PARITY-1.** Where more than one path reaches a decision of the same
> class — a denial, a withholding, a liveness verdict — **every** such path must
> emit the **same** record, and that record must be readable by whatever consumes
> that class of decision. A path that reaches the decision and records nothing is
> a defect even when its behaviour is correct, because it makes the two states
> indistinguishable afterwards.

Two halves, and both are load-bearing:

**(a) Parity of recording.** Sibling branches at one site record alike. BUG-006
is the pure case: one branch logs and stamps a span, its neighbour does neither.

**(b) Routing.** An observation must reach the authority that consumes it.
BUG-001 is the pure case: a probe proves liveness and the ledger that gates tool
offering never hears.

A rule with only (a) leaves BUG-001 open; only (b) leaves BUG-006 open. **That
both halves are needed is itself evidence the two bugs are one family** — the
refutation test's real answer.

---

## 2 · WHAT EACH FIX IS — and none of them adds a surface

**BUG-001.** `syncBackendCatalog`'s human-reachable callers record a health row:
success → `up` with latency and tool count; failure → `down` with the cause.
**No new UI.** The panel button already exists (`adminService.ts:1551` →
`POST /api/admin/backend-tools/sync`) and already runs the identical probe. The
owner's finish definition — *"I pressed one thing in the panel"* — is satisfied
by a button that has been there all along.

**BUG-003.** `error_head` must carry a **classifiable** cause. The observed
string ended at `Error POSTing to endpoint:` with nothing after it, and the
300-char cap never fired — the detail was never in `err.message`. The fix must
first establish where it is lost (an empty response body interpolated into the
transport's message, a dropped `cause` chain, or both) and then record a
transport status **or** an explicit "no status available" marker. Never the same
string for two different failures.

**BUG-006.** The `misroutedToArmes` branch records exactly as its sibling does.
**Three states must be distinguishable**: matched-and-blocked, name-not-in-mirror
(passed legitimately), and mirror-unreadable (fence inert). A fix that makes the
first visible and leaves the third silent has not closed it.

**BUG-007.** `armesGatewayMisrouteMessage` consults `ctx.mcpWithheldBackends`.
When the target backend is withheld this turn, the message says the backend is
temporarily unavailable instead of directing the model to it. **Positive
control:** with the backend up, the existing message is byte-unchanged.

**BUG-002, model half only.** Same routing, at the tool-offer layer: the model
must be able to tell "this backend is down right now" from "no such capability
exists". **The user-facing half stays with `HONEST-READ-2` and is not in this
phase.**

---

## 3 · THE GATE — and an honest limit

D-5 requires the law be gate-tested in both directions, including an
innocent-case probe. Here is where the Architect will not overpromise:

**A general parity gate is not achievable in one phase.** Enumerating "all paths
that reach a decision of class X" across the tree is the same problem the schema
census turned out to be — four grep-based attempts failed today, each on a
different spelling. A gate built on that footing would return "clean" and be
believed.

**What is achievable, and what this phase must deliver instead:**

1. **One standing test per site**, five in total, each asserting parity
   explicitly — e.g. for the gateway site: both denial branches emit a record,
   and the inert state emits a third, distinct one. Each must be
   **mutation-proven** to red when its branch's record is removed.
2. **The innocent-case probe:** a path that legitimately makes no decision emits
   nothing. A test that also fires there would disprove its own rule.
3. **DECISION-PARITY-1 written into the register's standing rules**, so the next
   site inherits a named obligation rather than a precedent nobody read.

A generic gate is **named as a separate future item**, not silently dropped.
Naming what we cannot build yet is the difference between a scope cut and a
quiet gap.

---

## 4 · CLOSURE PROOFS — already written, and unchanged

Each of the five carries its own post-deploy proof read in the §BUG bucket, and
this design does not soften any of them. **Merging closes none of them**
(S63-1). And per **S81-2**, minted from BUG-004's own closure, every pass
condition here must be **relative to an event inside the test** — a probe
timestamp, a turn's trace id — never an absolute count or a pinned prior reading.

---

## 5 · THE OWNER RULING THIS PHASE NEEDS — one question

Everything above is design. This one is a production-behaviour choice and it is
not the Architect's to make:

> **When the ARMES mirror cannot be read, the gateway fence currently goes inert
> and every `call_tool` passes through untouched — fail-open, by design. Should
> it stay fail-open (loudly recorded), or become fail-closed?**

**The Architect's recommendation: stay fail-open, and make the inert state
loud.** Reasons, both directions given:

- *For fail-open:* the mirror is a mirror. A transient read failure would, under
  fail-closed, block every gateway tool call for as long as the outage lasts —
  turning a data-availability problem into a capability outage. That is the same
  shape as BUG-002, which we are here to fix.
- *For fail-closed:* the fence exists to stop a cross-backend escape, and a
  fence that disappears exactly when the system is degraded is a fence you
  cannot rely on when it matters.

The recommendation rests on this: **the fence's job is to correct a misroute,
not to contain an attack.** Its own module scopes it to a targeted misrouting
guard, and the misroute it prevents is harmless when it slips — the observed
escape attempt failed on its own because the gateway did not know the tool name.
Making it loud converts an unknown into a measurement; making it closed trades a
small correctness win for a real availability risk.

**If you rule fail-closed, the phase grows** by an availability guard and the
scope change is flagged rather than absorbed.

---

## 6 · WHAT IS NOT IN THIS PHASE

- **BUG-002's user-facing half** → `HONEST-READ-2`.
- **BUG-005** (customer data in server logs) → sequenced after this phase,
  because its remedy is *"move it to a controlled store"* and **this phase's law
  defines what that store is**.
- **BUG-008** (the lens's evidence cannot express a degraded read) → rides with
  the measurement-ceiling work.
- **The generic parity gate** and **the schema-reference gate** → both named,
  neither built here.

---

## 7 · FINISH DEFINITION (user-eye, S74-1)

> *"I fixed the backend, pressed one thing in the panel, and the assistant could
> use it again straight away — the panel told me it was back. While it was down,
> nothing pretended the capability did not exist, and afterwards I could read
> what the system had decided and why."*

<!-- END · cwf-backend-lifecycle-affordance-design-v1 -->
