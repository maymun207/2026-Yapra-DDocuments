# PROOF · BUG-004 — the closure read · v1

<!-- PROOF-BUG-004-CLOSURE-v1 · 2026-08-03 · S81 · Architect: Claude.
     Self-contained (D-2 ONE-RELAY). This is what closes BUG-004. The merge did
     not (S63-1, BUG-CARRY-1 rule 4).
     Three lanes, and the Architect's is already assigned to itself. -->

**Deployed SHA under test:** `ecea48517362466381f082358978db6754293c0c`
**Serving production deployment:** `dpl_8wpjYuW92tNVTDNQkswfFm9rQSh6` (READY, verified by the Architect)

---

## 0 · What is being proven, and why it needs three instruments

The two repaired reads write a `telemetry_events` row **only when they fail**.
So a successful outcome is an **absence of rows** — and an absence proves nothing
on its own, because "the read succeeded" and "nobody ever ran the read" look
identical in the ledger (S66-1).

Three instruments therefore run together:

| Lane | Reads | Answers |
|---|---|---|
| **Owner** | loads the Sağlık tab, witnesses the two cards | did the surface render a value? |
| **Operator** | `telemetry_events` census | did either read fail? |
| **Architect** | Vercel runtime logs (already assigned to itself) | did the endpoint actually run? |

The Architect's leg is the **positive control**. Without it, "zero new rows"
could mean the tab was never opened.

---

## 1 · THE PRE-FIX BASELINE (what the census must be compared against)

Measured at S81 from the same table, before the fix:

| guard | error | rows | first_ts | **max(ts)** |
|---|---|---|---|---|
| `health-analytics.countAgingDrafts` | `CountUnavailableError` | 6 | 2026-08-03 15:28:59Z | **2026-08-03 16:02:39.334958Z** |
| `health-analytics.lastGateVerdict` | `ReadUnavailableError` | 6 | 2026-08-03 15:28:59Z | **2026-08-03 16:02:39.351413Z** |

**Twelve rows, both `max(ts)` at 16:02:39Z.** If those two numbers are unchanged
after a fresh tab load, no new failure was recorded.

---

## 2 · OWNER — two actions, in this order

1. **Note the current UTC time**, then **hard-refresh** the admin panel
   (Cmd/Ctrl+Shift+R — a cached bundle would test the old build) and open the
   **Sağlık** tab.
2. **Report what the two governance cards show**, verbatim:
   - **`Bekleyen taslak (>14g)`** — a number, or whatever it displays;
   - the **last gate verdict** card — a verdict, or an honest "no gate has run".

   A screenshot is the easiest form. **Also report the UTC time of the load.**

**What counts:** a real `0` counts. An honest "no gate has run yet" counts. A
**"could not read"** does **not** — that would mean the fix did not take.

---

## 3 · OPERATOR — one read-only query

**READ-ONLY. Zero writes, zero DDL, zero migrations** (ADR-005). Do not rewrite
the SQL; if it errors, paste the error verbatim. Never echo a secret (ADR-007).

Supabase MCP, project ref `fjbrkimwvtpwoxhziidh`. **Run this AFTER the owner has
loaded the tab.**

```sql
select payload->>'guard'  as guard,
       payload->>'error'  as error_name,
       count(*)           as row_count,
       min(ts)            as first_ts,
       max(ts)            as last_ts
from public.telemetry_events
where type = 'error'
  and payload->>'kind' = 'measurement_unavailable'
group by 1, 2
order by guard;
```

Report the raw rows. **Report every guard the query returns, not only the two
under test** — a new guard appearing is a finding in its own right.

---

## 4 · ARCHITECT — already assigned, no action required from anyone

The Architect reads the Vercel runtime logs for the serving deployment over the
owner's load window and confirms that `/api/admin/health-analytics` was actually
requested. This is the positive control described in §0 and it is not delegated.

---

## 5 · THE VERDICT RULE — stated before the readings arrive

**BUG-004 CLOSES** when **all three** hold:

1. **Operator:** `max(ts)` for both guards is still `2026-08-03 16:02:39Z`, and
   `row_count` is still 6 and 6.
2. **Owner:** both cards render a value or an honest real absence — never
   "could not read".
3. **Architect:** the endpoint is confirmed to have run inside the load window.

**BUG-004 STAYS OPEN**, and it is a finding rather than a failure of this
process, if any of these occur:

- **new rows appeared** for either guard → the fix did not take, or a *different*
  failure mode replaced the old one. The `error_name` column tells which.
- **the cards still say "could not read"** while the census shows no new rows →
  the two instruments disagree, and that disagreement is a larger finding than
  the bug: it would mean the surface and the ledger describe different runs.
- **the endpoint never ran** → the reading is void, not passed. Repeat §2.

---

## 6 · WHAT THIS ALSO SETTLES

Once this closes, rollout item **1.5's coverage claim is true again on its own
terms** — 26 items rendered with data, not 24 + 2 rendering a could-not-read
state. Nothing needs correcting in the record; the claim was accurate about the
spec and wrong only because the code was.

And it is the **first full exercise of the §BUG closure machinery** — the reason
BUG-004 was sequenced first out of eight. If any step of this relay proves
awkward or under-specified, **that is a finding about the machinery**, and it
should be reported as plainly as a finding about the code.

<!-- END · PROOF-BUG-004-CLOSURE-v1 -->
