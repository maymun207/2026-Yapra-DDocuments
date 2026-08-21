# PHASE · BUG-004-COLUMN-TRUTH-1 — two column references that name nothing · v1

<!-- PHASE-BUG-004-COLUMN-TRUTH-1-v1 · 2026-08-03 · S81 · Architect: Claude.
     Closes the two confirmed sites of BUG-004 and establishes the true extent
     of its class. First item of the post-MA-RERUN-1 sequence, chosen because it
     is the SMALLEST bug: it is where the §BUG closure machinery gets exercised
     end to end for the first time. -->

## 0 · ANCHOR

Fresh full clone. **If you work in an existing clone, `git fetch` FIRST** —
`git rev-parse origin/<ref>` reads a *local* ref, and a stale clone reports the
floor at which it was made (S81-1, minted this session from your own finding).

| Value | Expected |
|---|---|
| `git rev-parse origin/master` | `d3d246c184c2b9d66c24e48ae4c50388b1dc0468` |
| migrations | `67` |
| test files under `src`/`shared`/`api` | `440` |
| merge parents of master HEAD | **2** (`28ec4d9d` + `8052f8ac`) |

---

## 1 · WHAT IS BROKEN, CONFIRMED BY HAND

Two methods in
`api/cwf/_lib/persistence/repositories/HealthGovernanceRepository.ts` reference
columns that **do not exist in any of the 67 migrations**. Both fail
deterministically on every call; both were caught honestly by the read floor and
recorded as `measurement_unavailable` rows — six loads of the Health tab, twelve
rows, from `15:28:59Z` on 2026-08-03.

### 1.1 · `countAgingDrafts` — wrong column AND wrong semantic

```ts
.from(DB_TABLES.DOMAIN_RULES)
.select('rule_id', { count: 'exact', head: true })
.eq('status', RULE_STATUS.DRAFT)
.lt('created_at', cutoff)          // ← domain_rules HAS NO created_at
```

`domain_rules` columns are exactly: `rule_id, kind_id, backend_id, key, payload,
status, version, created_by, updated_by, updated_at`. There is **no
`created_at`**, and none of the 67 migrations adds one.

**The fix is `updated_at`, and this is an ALIGNMENT, not a semantic change.**
The card's own tooltip already states the intended meaning
(`src/components/admin/HealthTab.tsx:806`):

> *"Bir taslak sorun değildir; **iki haftadır kimsenin bakmadığı** taslak,
> yönetişim kuyruğunun tıkanmasıdır."*
> *"A draft is not a problem; a draft **nobody has looked at** for two weeks is
> the governance queue silting up."*

That is `updated_at` semantics, written down, before this phase existed. The
query was wrong about the column **and** about the meaning the surface promised.

**Do NOT add a `created_at` column.** Owner-ruled, S81. Backfilling it for
existing rows would put a fabricated date where a fact should be. If true
creation timestamps are ever needed they arrive going forward with **NULL** for
existing rows — an honest gap, never an invented value.

### 1.2 · `lastGateVerdict` — wrong column name only

```ts
.select('action, created_at, rule_id')   // ← rule_audit HAS NO rule_id
```

`rule_audit` columns: `audit_id, actor, action, target_kind, target_rule,
reason, detail, created_at`. `created_at` **is** present; the rule reference is
`target_rule`.

Select `target_rule` and keep mapping it onto the existing `LastGateVerdict.ruleId`
field. **The method's external shape must not change** — no UI or API surface
moves in this phase.

---

## 2 · THE CENSUS — and why the Architect's attempt does not count

**The extent of this class is currently UNKNOWN.** The Architect ran a
grep-based scan and it failed in both directions:

- it flagged **five false positives** on `backend_tools`, because that table is
  declared `create table public.backend_tools` — **without** `if not exists` —
  and the scanner's pattern only matched the `if not exists` form, so it read
  the table as having no columns at all;
- it **missed** `domain_rules.created_at`, a defect already proven by hand,
  because its `DB_TABLES` constant resolution was loose.

Six results, and every one of them wrong in some way. **That failure is the
argument for doing this properly**, and it is also the specification: a census
that cannot survive a second DDL spelling is worth less than no census, because
it returns "clean".

### 2.1 · What the census must do

Enumerate every column name a repository or endpoint passes to Supabase —
`.select(...)` field lists, and the column argument of `.eq / .neq / .lt / .lte /
.gt / .gte / .is / .in / .like / .ilike / .not / .order` — and check each against
the columns the migrations actually declare.

**It must handle every DDL form present in `supabase/migrations/`**, including
at minimum: `create table public.X (...)`, `create table if not exists public.X
(...)`, and `alter table ... add column ...`. Enumerate the forms you found and
say so. A form you did not handle is a silent hole.

Ignore, and say you ignored: jsonb path expressions (`payload->>'kind'`),
computed aliases, and embedded/foreign-table selects.

### 2.2 · POSITIVE CONTROL — non-negotiable (S66-1)

**The census must independently rediscover both `domain_rules.created_at` and
`rule_audit.rule_id`** when run against the **pre-fix** tree.

- If it does not find both, **the census is broken, not the code.** Report that
  and fix the census.
- Run it against the pre-fix tree first, record the result, then apply the fixes
  and run it again. The second run must show those two gone and nothing new
  appear.

Report the count both times, and list every remaining finding **individually**
with a verdict of `TRUE` (a real missing column) or `FALSE-POSITIVE` (with the
reason). A raw number without that adjudication is not a census.

### 2.3 · If the census finds more true positives

They are **in scope for this phase** — same bug, wider than two sites. This is
the M1F2A lesson applied: a grep floor of 31 was exceeded by a real census that
found 44, two of them inside the Architect's own declared scope.

**But if a finding needs a semantic decision** — as `countAgingDrafts` did —
**STOP and report it.** Do not choose a meaning. That is the owner's call, and
it is exactly how §1.1 got decided.

---

## 3 · TESTS — both directions (D-5)

The existing `api/cwf/__tests__/healthGovernanceRepository.test.ts` passes today
against broken code, because the Supabase client is mocked and a column name is
just a string nobody checks. **That is the reason this bug shipped.**

Add tests that **assert the column names actually passed to the query builder**:

- `countAgingDrafts` filters on `updated_at`, and **not** on `created_at`;
- `lastGateVerdict` selects `target_rule`, and **not** `rule_id`, while still
  returning `{ action, createdAt, ruleId }`.

**Both must FAIL on the pre-fix tree.** Run them there first and paste the
failure output. A test that passes before the fix guards nothing.

---

## 4 · WHAT IS **NOT** IN THIS PHASE

- **No CI gate.** A schema-reference gate — the standing instrument that would
  stop this class recurring — is a **named separate item**, deliberately not
  built here. This phase is the smallest bug, and its purpose is to run the
  §BUG closure machinery end to end for the first time. Loading a new CI gate
  onto it would defeat that.
- **No migration.** `67` before and after.
- **No change to any API or UI surface shape**, no label change: the tooltip
  already states the semantic the fix restores.
- **No touching `evalGate.ts`.**

---

## 5 · SELF-VERIFY (G5) — computed, in the report

```
git diff --stat origin/master...HEAD
ls supabase/migrations/*.sql | wc -l
git diff origin/master...HEAD -- api/cwf/_lib/evalGate.ts | wc -l
```

Expected: `67`; `0`; and a file list containing **only** the repository, its
test file, and whatever additional sites the census proved. Then the full gate
suite, green in CI, before you report.

---

## 6 · THE POST-MERGE PROOF (S63-1 — this is what actually closes BUG-004)

**Merging does not close this bug.** After the fix is on master and deployed,
with the deployment SHA named:

1. A load of the Health tab produces **zero new** `telemetry_events` rows with
   `payload.kind = 'measurement_unavailable'` for
   `health-analytics.countAgingDrafts` and `health-analytics.lastGateVerdict` —
   established by a census whose `max(ts)` for those guards is **older** than
   the load.
2. Both cards render a value **or an honest real absence**. A real `0` draft
   count and `lastGateVerdict: null` are both acceptable results. **A
   "could not read" is not.**

Until both are read, BUG-004 stays **OPEN** in the bucket with the shipped SHA
appended to its evidence log.

**Note for the merge record:** rollout item 1.5's coverage claim (26 items
"rendered with data") becomes true again once this proof is taken. Until then
the honest statement remains 24 + 2 rendering their could-not-read state.

---

## 7 · REPORT BACK

Branch `phase/bug-004-column-truth-1`, pushed, CI green. Report:

1. The §0 anchor, including confirmation that you fetched before reading refs.
2. The pre-fix test failure output.
3. The census: DDL forms handled, pre-fix count with both known sites found,
   post-fix count, and every remaining finding adjudicated `TRUE` /
   `FALSE-POSITIVE`.
4. §5's self-verify numbers.
5. Anything that surprised you.

<!-- END · PHASE-BUG-004-COLUMN-TRUTH-1-v1 -->
