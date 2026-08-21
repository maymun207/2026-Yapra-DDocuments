# PROOF · BACKEND-LIFECYCLE-AFFORDANCE-1 — the five closure reads · v1

<!-- PROOF-BACKEND-LIFECYCLE-CLOSURE-v1 · 2026-08-04 · S81 · Architect: Claude.
     Self-contained (D-2 ONE-RELAY). Executes the owner's own proposal: pull the
     ARMES key, let it fall, watch how the system behaves — turned into evidence
     rather than an anecdote.
     Pass conditions are RELATIVE to events inside the test (S81-2). -->

**Deployed SHA under test:** `b960a1c9c44120f1e8821609d1f9acc4c2612646`
**Serving production deployment:** `dpl_FHuACmdStcB4EtZJ4Gz4oS82oz3S` — converged, verified by the Architect

---

## 0 · BEFORE YOU TOUCH ANYTHING — three conditions

1. **Confirm you can restore the ARMES key.** Have it in hand. If you cannot put
   it back, **do not start**.
2. **Write down `T0`, the current UTC time.** Every pass condition below is
   *"after T0"*. No absolute count is asserted anywhere — that mistake cost us a
   void reading on BUG-004.
3. **Stop boundary:** if any restore step does not take on the **first** attempt,
   **stop**. Do not retry, do not improvise, do not chase it. Write down where
   you stopped and hand it back. A half-restored backend is worse than an
   unproven bug.

**Blast radius:** ARMES only, one window. Superset and the knowledge base are
untouched. Every step's undo is the step itself.

---

## 1 · THE WINDOW — owner steps, in this order

Record the **UTC time of each step**. That is the whole instrument.

| # | Action | What it is proving |
|---|---|---|
| **1** | Note `T0`. | the baseline every rule below is relative to |
| **2** | **Delete the ARMES key** in the MCP settings panel and **save**. | saving fires the on-connect hook, which now records health — **BUG-001, hook path** |
| **3** | Press **"Kataloğu senkronize et"** (Sync) for ARMES. | **BUG-001, button path** — the affordance that existed and was not listened to |
| **4** | In the chat, ask for the factory list — the same question as yesterday. **Paste the answer verbatim.** | **BUG-007** and **BUG-002 (model half)** |
| **5** | Ask something that uses Superset — a dashboard or dataset listing. | **BUG-006 `passed`** — a gateway call that is *not* an ARMES name |
| **6** | **Restore the ARMES key** and save. | **BUG-001 up path**, hook |
| **7** | Press **Sync** again. | **BUG-001 up path**, button |
| **8** | Ask for the factory list again. **Paste the answer.** | tools offered again — the other half of BUG-001 |

**Optional ninth step, and BUG-003 does not close without it.** BUG-003's proof
requires **two different** failure classes producing **two different** heads. Steps
2–3 give `auth`. For `unreachable`: change the ARMES **URL** to a non-resolving
host, save, press Sync, then **restore the URL**. One extra edit, same undo.

If you skip it, say so — BUG-003 stays OPEN with `unreachable` unproven, which is
an honest result. **Do not skip it silently.**

---

## 2 · OPERATOR — one read-only query, AFTER the window closes

**READ-ONLY. Zero writes, zero DDL, zero migrations** (ADR-005). Do not rewrite
the SQL; if it errors, paste the error verbatim. Never echo a key or token
(ADR-007) — none of these columns contains one.

Supabase MCP, project ref `fjbrkimwvtpwoxhziidh`:

```sql
select checked_at,
       backend_id,
       status,
       latency_ms,
       tool_count,
       error_head
from public.backend_health
where backend_id = 'armes'
order by checked_at desc
limit 30;
```

Paste the raw rows. **Do not summarise, do not sort differently, do not omit
rows that look redundant** — the redundant-looking ones are the hook-vs-button
pairs this test exists to see.

---

## 3 · ARCHITECT — assigned to itself, no action from anyone

The Architect reads the Vercel runtime logs for `dpl_FHuACmdStcB4EtZJ4Gz4oS82oz3S`
across the window and confirms:

- `[SyncHealth] backend=armes … recorded` lines, one per human action;
- the `[GatewayFence] decision=… mirror=…` line and which state it named;
- `[MCP Health] backend=armes down … tools withheld` during the window.

This is the positive control: it establishes that the code **ran**, so that a
"no new rows" or "expected row present" reading means something (S66-1).

---

## 4 · VERDICT RULES — written before the readings arrive

**BUG-001 CLOSES** when, in `backend_health` for `armes`:
- at least one row with `checked_at > T0` and `status='down'` from the key-deleted
  steps, **and** at least one with `status='up'` and `checked_at` **after** the
  restore step; and
- the `up` row lands **within one minute** of the restore action; and
- step 8's answer shows the factory tools working again.
**Positive control:** step 2 and step 3 each produce their own row — the hook path
and the button path are separately proven, not inferred from one another.

**BUG-003 CLOSES** when the `auth` failure and the `unreachable` failure produce
**two different, classifiable** `error_head` values, each naming a class and
either an HTTP status or an explicit no-status marker. **Never the same string,
never a bare colon.** Without step 9, this stays OPEN.

**BUG-007 CLOSES** when step 4's answer states that ARMES is **temporarily
unavailable** rather than directing anything at it.
**BUG-002 (model half) CLOSES** when that same answer carries the explicit denial
of the wrong inference — the capability is **not missing**, it is unreachable.
**Positive control:** step 8's answer, with ARMES up, carries **neither** clause.

**BUG-006 — partial by construction.** `blocked` closes if the model
spontaneously reaches for the gateway with an ARMES tool name during step 4 (it
did this twice yesterday, but it is **not deterministic** — if it does not
happen, we retry, we do not fabricate). `passed` closes on step 5. **`inert`
cannot be induced from any lane we have** — it needs an unreadable or empty
`backend_tools` mirror, which is a governed write the Operator is fenced from
and for which no admin affordance exists. It is covered by a mutation-proven
test and by nothing live.

> **This one still needs an owner ruling.** Either BUG-006 closes on two live
> states plus the test, with the missing live proof of `inert` recorded by name;
> or it stays OPEN until a safe fault-injection affordance exists — which would
> then become its own item. **The Architect recommends the first.** Until you
> rule, BUG-006 stays OPEN.

**ANY BUG STAYS OPEN** if its reading is void — and a reading is void, not
failed, if §3 shows the code did not run in the window.

---

## 5 · WHAT THIS WINDOW DOES NOT COVER

- **BUG-009** — the withholding read's own failure path. Not fixed by this phase
  at all; named and untouched.
- **BUG-006 `inert`** — see above.
- **BUG-002's user-facing half** — belongs to `HONEST-READ-2`, not here.

Naming these is the point. A window that quietly covered four of five and
reported five would be the exact defect this bucket exists to catch.

<!-- END · PROOF-BACKEND-LIFECYCLE-CLOSURE-v1 -->
