# PHASE · BACKEND-LIFECYCLE-AFFORDANCE-1 — every path that decides, records · v1

<!-- PHASE-BACKEND-LIFECYCLE-AFFORDANCE-1-v1 · 2026-08-04 · S81 · Architect: Claude.
     Rollout plan v1_3 item 2.3, and the named prerequisite of 2.2.
     Carries FIVE bucket entries: BUG-001, BUG-003, BUG-006, BUG-007, and the
     MODEL-facing half of BUG-002.
     Design note: cwf-backend-lifecycle-affordance-design-v1 (owner-ratified).
     Everything needed is embedded here. -->

## 0 · ANCHOR

Fresh full clone. **In an existing clone, `git fetch` FIRST** (S81-1).

| Value | Expected |
|---|---|
| `git rev-parse origin/master` | `ecea48517362466381f082358978db6754293c0c` |
| migrations | `67` |
| test files under `src`/`shared`/`api` | `440` |
| `docVersion` | `rev 188` |

---

## 1 · THE FINDING THIS PHASE ACTS ON

Five defects, five different sites, **one shape**. In every one the mechanism
that should have recorded the decision **already exists** and is simply not
invoked on one of the paths that reaches the same decision:

| Bug | Mechanism that exists | Path that does not invoke it |
|---|---|---|
| BUG-001 | `BackendHealthRepository.recordCheck` | `api/admin/backend-tools/sync.ts` and `api/admin/mcp-settings.ts`'s on-connect hook run the **same** `syncBackendCatalog` probe the cron runs, and write **no** health row |
| BUG-003 | `classifyProbeError` (`api/admin/mcp-probe.ts:63`) → `{errorClass:'auth'\|'unreachable'\|'error', httpStatus}` | **both** human paths call it; the cron — the one that writes the ledger — uses raw `capErrorHead` instead |
| BUG-006 | `[GatewayPolicy] denied …` + `ATTR_GATEWAY_DENIED` / `ATTR_GATEWAY_DENIED_TOOL` (`stageTools.ts:563-569`) | the sibling branch at `:570`, `misroutedToArmes`, emits neither |
| BUG-007 | `ctx.mcpWithheldBackends` (`stagesResolve.ts:31`) | `armesGatewayMisrouteMessage` composes a fixed redirect and never reads it |
| BUG-002 (model half) | the same `ctx.mcpWithheldBackends` | nothing tells the model a backend is *withheld* rather than absent |

**Nothing here needs building. What is missing is the obligation to invoke what
already exists.**

---

## 2 · G1 — WRITE THE LAW DOWN (first deliverable, before any fix)

Add to `docs/adr/` (or the standing-rules home the repo already uses for this
class — **choose by precedent, and state which precedent you followed**):

> **DECISION-PARITY-1.** Where more than one path reaches a decision of the same
> class — a denial, a withholding, a liveness verdict — **every** such path must
> emit the **same** record, and that record must be readable by whatever consumes
> that class of decision. A path that reaches the decision and records nothing is
> a defect **even when its behaviour is correct**, because it makes the two
> states indistinguishable afterwards.

Two halves, both load-bearing: **(a) parity** — sibling branches at one site
record alike; **(b) routing** — an observation must reach the authority that
consumes it. Cite BUG-006 as the pure (a) case and BUG-001 as the pure (b) case.

---

## 3 · G2 — BUG-001 · a probe that proves liveness must tell the ledger

Both human-reachable callers of `syncBackendCatalog` record a health row:

- success → `recordCheck({ backendId, status:'up', latencyMs, toolCount })`,
  taking the same fields off `outcome` the cron already uses
  (`outcome.durationMs`, `outcome.active`);
- failure → `recordCheck({ backendId, status:'down', errorHead })` with G3's
  classified head.

**THREE GUARDS, all mandatory:**

1. **Only a governed backend.** `backend_health.backend_id` is a FK to
   `backends(id)`. A server row with no `backend_id` — or one whose id is not a
   real backend — **must not** produce a health row. Skip silently; this is a
   correct no-op, not a failure.
2. **Personal scope never writes health.** `sync.ts` serves `scope='global'` and
   `scope='personal'`. A **personal** server's probe **must not** write to the
   governed ledger, even if it declares a `backend_id` — ADR-010: a declaration
   is a claim, not a warrant. Global scope only.
3. **Never fail the caller.** The health write is best-effort. A failed
   `recordCheck` is logged and swallowed exactly as the cron already does
   (`backend-health.ts:97-101`); it must never turn a successful sync into an
   error response, and must never reject the on-connect hook's fire-and-forget.

**No new endpoint, no new button, no UI change.** The panel affordance already
exists (`adminService.ts:1551`). This phase makes it count.

---

## 4 · G3 — BUG-003 · the ledger records a classifiable cause

The cron's catch (`api/admin/backend-health.ts:93-96`) calls
`classifyProbeError(err)` and records a head that names **`errorClass`** and,
when present, **`httpStatus`** — the same classification its two sibling paths
already perform.

- When no status can be determined, record an **explicit** marker for that.
  *"No status available"* is a fact; a bare `Error POSTing to endpoint:` is a
  gap wearing a fact's clothes.
- Keep `capErrorHead`'s 300-char bound. It never fired on the observed failure
  and it is not the defect — do not remove it.
- **ZERO migrations.** `error_head` is an existing `text` column and is where
  this lands. Do not add a column.

---

## 5 · G4 — BUG-006 · three states, three records

At `stageTools.ts` the `misroutedToArmes` branch records exactly as its
`policyDenial` sibling does — a log line **and** the span attributes.

**Three states must be distinguishable in production:**

| State | How it arises |
|---|---|
| **matched-and-blocked** | the requested name is in the ACTIVE ARMES mirror |
| **passed legitimately** | the name is not in the mirror |
| **fence inert** | `loadArmesActiveToolNames` failed and returned an **empty Set** (`gatewayPreflight.ts`), so `stageTools.ts:545`'s `.has(...)` is permanently `false` |

**A fix that makes the first visible and leaves the third silent has not closed
this bug.** The inert state is the dangerous one precisely because today it is
indistinguishable from "nothing needed blocking".

**OWNER RULING, S81 — binding:** the fence **stays fail-open**. When the mirror
cannot be read, calls continue to pass through. Do **not** make it fail closed;
make it **loud**. The distinction between "the fence let this through" and "the
fence was not there" must be readable, and behaviour must not change.

---

## 6 · G5 — BUG-007 + BUG-002 (model half) · stop pointing at a locked door

`armesGatewayMisrouteMessage` consults `ctx.mcpWithheldBackends`. When the target
backend is **withheld this turn**, the message states that the backend is
temporarily unavailable instead of instructing the model to use it directly.

**POSITIVE CONTROL, mandatory:** with the backend **up**, the existing message is
**byte-unchanged**. A fix that improves the outage path by altering the normal
one is rejected.

**Scope fence:** this is the **model-facing** half only. What the *end user* is
told stays with `HONEST-READ-2` and is **not** in this phase. If you find
yourself editing a user-visible string, stop — you have crossed the line.

---

## 7 · G6 — THE TESTS (D-5, both directions)

**A generic parity gate is explicitly NOT in scope** and the design note says why:
enumerating "all paths reaching decision class X" is the same problem that broke
four separate grep-based censuses in one day. It is named as a separate future
item; do not attempt it here.

Deliver instead **five standing tests, one per site**, each:

1. asserting the parity explicitly (for G4: all **three** gateway states emit
   their own distinct record);
2. **mutation-proven** — removing that site's record turns the test red, and the
   failure message names which record was lost;
3. plus an **innocent-case probe**: a path that legitimately makes no decision of
   that class emits nothing. A test that also fires there would disprove its own
   rule.

---

## 8 · CONSTRAINTS — self-verified in G7

- **ZERO migrations** (`67` before and after). **ZERO** governed publishes.
  **ZERO** writes to `messages` (C1 LAW). **ZERO** Operator involvement.
- `evalGate.ts` diff **EMPTY**.
- **No new endpoint, no new panel control, no user-visible string change.**
- Behaviour under a readable mirror is **unchanged** — this phase adds records
  and one conditional message, nothing else.
- If `check:doc-drift` demands a reseal, **obey it and say so**; never silence it.

---

## 9 · G7 — SELF-VERIFY (computed, in the report)

```
git diff --stat origin/master...HEAD
ls supabase/migrations/*.sql | wc -l
git diff origin/master...HEAD -- api/cwf/_lib/evalGate.ts | wc -l
```

Then the full gate suite, green in CI, before you report.

---

## 10 · THE PROOF READS THIS PHASE OWES (S63-1 — merging closes nothing)

All five stay **OPEN** in the §BUG bucket after merge, with the shipped SHA
appended to each evidence log. **Per S81-2, every pass condition below is
relative to an event inside its own test — never an absolute count or a pinned
prior reading.**

| Bug | Proof |
|---|---|
| BUG-001 | with a backend's freshest row fresh-and-`down`, a human action produces a **new** `up` row whose `checked_at` is **after** the action, and the next turn's `[ToolRoute]` shows that backend's tools offered again — both inside one minute. Positive control: the same action against a genuinely unreachable backend produces **no** `up` row. |
| BUG-003 | an induced **auth** failure and an induced **unreachable** failure produce two **different** classifiable `error_head` values, read live from the rows. Never the same string, never a bare colon. |
| BUG-006 | a production `call_tool` naming an active ARMES tool yields an explicit matched-and-blocked record; a name absent from the mirror yields the pass record; a forced empty-mirror read yields the inert record. **All three distinguishable.** |
| BUG-007 | with the backend fresh-and-`down` and withheld, a live turn triggering the guard receives a temporarily-unavailable message, trace id and SHA named. Positive control: backend up ⇒ original message byte-unchanged. |
| BUG-002 (model half) | the same turn shows the model was told the backend is withheld, not that the capability is absent. |

---

## 11 · REPORT BACK

Branch `phase/backend-lifecycle-affordance-1`, pushed, CI green. Report:

1. The §0 anchor, confirming you fetched before reading refs.
2. Where DECISION-PARITY-1 landed and **which precedent** decided that location.
3. Each of G2–G5 with the diff hunk that closes it.
4. The five tests, each with its **red** output under mutation.
5. §9's self-verify numbers.
6. Anything that surprised you — and if a sixth site of this same shape turned
   up while you were in there, **name it, do not fix it.**

<!-- END · PHASE-BACKEND-LIFECYCLE-AFFORDANCE-1-v1 -->
