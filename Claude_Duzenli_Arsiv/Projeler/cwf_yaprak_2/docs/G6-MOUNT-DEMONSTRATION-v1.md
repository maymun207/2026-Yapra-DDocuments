# G6 · THE DEMONSTRATION — the owner's sentence, performed

<!-- G6-MOUNT-DEMONSTRATION-v1 · 2026-08-05 · S82 · Architect: Claude (Opus 5).
     Rollout 2.3a's acceptance proof, unblocked by ROUTE-OPEN-1 (a6252b20).
     Performed by the OWNER. The Architect reads the result from Vercel — no
     owner step beyond the clicks below. -->

---

## WHAT THIS PROVES

> **"Admin gelir, backend'i ekler, credential'ını girer, sistem onu kullanır.
> Elle hiçbir müdahale yok."**

Nothing else. If any step below needs SQL, an Operator, an env var or a deploy,
**the demonstration has failed and that failure is the result** — write down which
step and stop. Do not work around it.

**Floor:** `origin/master` = `a6252b20ad5e1287ef272b5d1642d1fa64d1b678`, deployed
and converged (`dpl_376V1pM8wTq7rBRHKABZudXogaXt`, production, READY).

---

## BEFORE YOU START — one thing you must NOT do

**Do not touch the dial.** `mcp-honestbench` is currently on its **honesty
control** (`activeMode: null`) — verified live: it tells the truth.

An instrument must be shown to tell the truth **before** it is asked to lie.
If the dial were on and something looked wrong, we could not tell whether the
oddity came from the server or from us. The five adversary modes are a **later**
run (`HONESTBENCH-RUN-1`), and they wait on BUG-012's registration guard.

---

## THE CLICKS

### 1 · Create the backend identity

**Control Plane → MCP Servers.** In the backends section (the surface
`BACKEND-IDENTITY-IS-DATA-1` added):

| Field | Value |
|---|---|
| id | `honestbench` |
| display name | `mcp-honestbench — honesty testbed` |
| tool pattern | **`flat`** |
| enabled | **on** |

**On `flat`, deliberately:** the `/gateway` profile is a *separate* identity and
its run is the BUG-006/007 capture, not this. One thing at a time.

### 2 · Add the server

**Add Server**, scope **Global** (not Personal):

| Field | Value |
|---|---|
| name | `honestbench` |
| transport | **HTTP** (Streamable — not SSE) |
| URL | `https://mcp-honestbench.vercel.app/flat` |
| backend | **`honestbench`** — it appears in the dropdown because step 1 created it |
| API key / env var | **leave empty** — this server needs no credential |

**The backend field is now required for global servers**
(`BACKEND-IDENTITY-IS-DATA-1`), so a blank cannot silently borrow another
backend's identity. That refusal is itself part of what is being tested.

**On the empty credential, stated so the report is honest:** the credential path
(`mcp_secrets` + `apiKeyRef`) is **already proven to work** and is **not
exercised here**. This demonstration proves the *mount*, not the secret store.

### 3 · Save. Then stop.

The catalog sync fires on save. **Do nothing else** — no Probe, no manual Sync,
no page tricks. The point is what happens **without** you.

### 4 · Ask one ordinary question

Open the chat and ask something that clearly belongs to this backend's invented
domain — its tools are about groves and sensor readings, e.g.:

> *"G-03 grove'unun toplam verimi nedir?"*

One turn is enough.

---

## WHAT THE ARCHITECT READS — five lines, no owner step

| # | Line | What it proves |
|---|---|---|
| 1 | `[CatalogSync] backend=honestbench tools=4 missing=0` | discovery ran and wrote, unaided |
| 2 | mirror rows for `honestbench` in `backend_tools` | the catalog persisted |
| 3 | `[SyncHealth]` / `[BackendHealth] backend=honestbench` | health tracking picked it up by itself |
| 4 | **`[ToolRoute] uncovered=4 backends=[honestbench:4] covered=… gateway=…`** | **the new line, and the whole point** — the tools were offered although nobody filed a category |
| 5 | a tool call to one of the four | the model could actually use it |

**Line 4 is the one that did not exist yesterday.** Before `ROUTE-OPEN-1`, an
unfiled backend's tools were dropped the moment the message matched any ARMES
category — so this exact turn would have offered nothing.

---

## PASS / FAIL

**PASS** — all five lines appear, and **you did nothing between saving and
asking.**

**FAIL, and each failure is a finding worth more than a pass:**

- a step needs SQL, an Operator, an env var or a deploy → **name the step**
- line 1 never appears → the sync did not fire on save
- line 4 shows `uncovered=0` while `honestbench` has tools → coverage resolved
  wrongly, and the phase's central claim is false
- the model gets the tools but the answer misattributes them → BUG-012's shape,
  and this becomes its first **live** observation rather than a code-read

**A partial pass is recorded as partial.** The sentence is true or it is not.

---

## AFTERWARDS

The result goes into the S82 close: `2.3a` closes on a PASS, or the failing link
is named and homed. **Nothing about `HONESTBENCH-RUN-1` starts here** — the dial
stays where it is.

<!-- END · G6-MOUNT-DEMONSTRATION-v1 -->
