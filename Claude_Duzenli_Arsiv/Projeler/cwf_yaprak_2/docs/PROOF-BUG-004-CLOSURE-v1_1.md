# PROOF · BUG-004 — the closure read · v1_1

<!-- PROOF-BUG-004-CLOSURE-v1_1 · 2026-08-04 · S81 · Architect: Claude.
     v1_1 EXISTS BECAUSE v1's VERDICT RULE WAS WRONG. It pinned an ABSOLUTE
     baseline (max(ts) = 16:02:39Z, row_count = 6) that drifted before the test
     could run, and applied literally it would have declared a working fix
     broken. The rule is now RELATIVE to the load timestamp, which cannot drift.
     Architect defect, corrected here rather than in a chat message.
     Discard v1.
     Self-contained (D-2 ONE-RELAY). This is what closes BUG-004. The merge did
     not (S63-1, BUG-CARRY-1 rule 4).
     Three lanes, and the Architect's is already assigned to itself. -->

**Deployed SHA under test:** `ecea48517362466381f082358978db6754293c0c`
**Serving production deployment:** `dpl_8wpjYuW92tNVTDNQkswfFm9rQSh6` (READY, verified by the Architect)
**Live since:** `2026-08-04T03:28:30Z`

**STATUS: attempt 1 is VOID.** The Operator ran §3, but the tab was never loaded
on the repaired build, so there was nothing for the census to observe. §2 is
outstanding. §3 must be re-run **after** it.

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

## 1 · THE BASELINE IS NOT A NUMBER — it is the load timestamp

**v1 got this wrong and the error is instructive.** It recorded the census as it
stood at 16:02:39Z with 6 rows per guard, and made the pass condition *"those
numbers are unchanged"*. They changed — legitimately. Someone opened the Health
tab at **2026-08-03 18:30:06Z**, hours after that baseline was recorded and
**nine hours before the fix deployed**. The still-broken code did exactly what
it should: it failed honestly and wrote a 7th row per guard.

Applied literally, v1's rule would have read that as *"the fix did not take"*.

**A pass condition must not depend on a number that can move while you are not
looking.** The only drift-proof form is relative:

> **For each guard, `max(ts)` must be EARLIER than the moment the tab was
> loaded.** No absolute count, no pinned timestamp.

For the record, the census as it stands **before** this test:

| guard | rows | max(ts) |
|---|---|---|
| `health-analytics.countAgingDrafts` | 7 | 2026-08-03 18:30:06.693878Z |
| `health-analytics.lastGateVerdict` | 7 | 2026-08-03 18:30:06.702130Z |

Both **precede** the fix's deployment at `2026-08-04T03:28:30Z`. Nothing has
failed on the repaired build — but nothing has exercised it either. See §4.

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

## 4 · ARCHITECT — leg already run, and it VOIDED the first attempt

The Architect read the Vercel runtime logs for `dpl_8wpjYuW92tNVTDNQkswfFm9rQSh6`
over the window since the fix deployed (`2026-08-04T03:28:30Z` onward). Requests
grouped by path:

```
/api/admin/synthetic-traffic-injector  21
/api/admin/golden-runner               21
/api/admin/eval-ci                      2
/api/cwf/providers                      1
/api/admin/memory-forget                1
/api/cwf/usage                          1
```

**`/api/admin/health-analytics` is absent.** The repaired read has never run in
production. The first attempt at this proof is therefore **VOID** — not passed,
not failed — exactly as §5's third branch says.

This is the positive control earning its place: without it, "no new rows since
16:02" would have been mistaken for success on a build nobody had touched.

The Architect re-runs this leg after the owner's load, over the load window.

## 5 · THE VERDICT RULE — relative, stated before the readings arrive

Let **T** = the UTC moment the owner loaded the tab (§2, step 1).

**BUG-004 CLOSES** when **all three** hold:

1. **Operator:** for both guards, `max(ts)` is **earlier than T**. (Equivalently:
   no row exists with `ts > T`.) No absolute count is asserted, because the
   count can legitimately grow at any time before T.
2. **Owner:** both cards render a value or an honest real absence — never
   "could not read".
3. **Architect:** `/api/admin/health-analytics` is confirmed in the runtime logs
   inside the window around T.

**BUG-004 STAYS OPEN**, and each of these is a finding rather than a failure of
this process:

- **a row exists with `ts > T`** → the fix did not take, or a *different* failure
  replaced the old one. The `error_name` column names which.
- **the cards still say "could not read" while no row has `ts > T`** → the two
  instruments disagree, and that is a larger finding than the bug: the surface
  and the ledger would be describing different runs.
- **the endpoint did not run in the window** → the reading is **void**, not
  passed. Repeat §2. *(This is what happened on the first attempt.)*

## 6 · WHAT THIS ALSO SETTLES

Once this closes, rollout item **1.5's coverage claim is true again on its own
terms** — 26 items rendered with data, not 24 + 2 rendering a could-not-read
state. Nothing needs correcting in the record; the claim was accurate about the
spec and wrong only because the code was.

And it is the **first full exercise of the §BUG closure machinery** — the reason
BUG-004 was sequenced first out of eight. If any step of this relay proves
awkward or under-specified, **that is a finding about the machinery**, and it
should be reported as plainly as a finding about the code.

<!-- END · PROOF-BUG-004-CLOSURE-v1_1 -->
