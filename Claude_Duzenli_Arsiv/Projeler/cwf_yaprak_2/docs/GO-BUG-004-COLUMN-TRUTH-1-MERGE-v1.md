# GO · BUG-004-COLUMN-TRUTH-1 — merge · v1

<!-- GO-BUG-004-COLUMN-TRUTH-1-MERGE-v1 · 2026-08-03 · S81 · Architect: Claude.
     Self-contained (D-2 ONE-RELAY). Everything needed is in this file: the
     Architect's independent review, the blocking CI check, the merge command,
     the verbatim commit message, and the post-merge read. Nothing to assemble
     from anywhere else. -->

**Branch:** `phase/bug-004-column-truth-1` · **head** `91243a6249daf1f12e76c9c4f0fff0e9d9f26f7e` · **PR #149**

---

## 0 · The Architect's independent review (RULE-25) — already done

Re-derived from a fresh clone, not read from the report:

| Check | Measured |
|---|---|
| branch head | `91243a6249daf1f12e76c9c4f0fff0e9d9f26f7e` ✅ |
| files changed | 6 — repository, its test, and the 4 files RULE 20's reseal required |
| `api/cwf/_lib/evalGate.ts` diff | **0 lines** ✅ |
| `supabase/` diff | **0 files** ✅ |
| migrations | **67** ✅ |
| `countAgingDrafts` | `.lt('created_at')` → `.lt('updated_at')` ✅ |
| `lastGateVerdict` | `'…, rule_id'` → `'…, target_rule'`, external `ruleId` preserved ✅ |
| docVersion | 187 → **188** ✅ |
| doc-drift deviation | **legitimate** — a tab's `codeAreas` covers `api/cwf/_lib/persistence/**`, so RULE 20 genuinely fires ✅ |
| the pinned-test claim | **confirmed** — pre-fix suite asserted `toContain('lt:created_at')` ✅ |

**One correction of record, the Architect's:** the phase prompt §1.1 said
`domain_rules` columns are "exactly" ten. They are **twelve** — `20260702120000`
adds `ready_at` / `ready_by` with `alter table` on one line and `add column` on
the next. The verdict is unchanged (`created_at` is absent either way), but the
word "exactly" was wrong, and the Architect's verification grep missed the same
multi-line ALTER a second time.

---

## STEP 1 · CI verification — BLOCKING, do this first

The Architect's sandbox is rate-limited against the GitHub API, so this check
belongs to you and it gates everything below.

```
gh run list --repo maymun207/cwf_yaprak --commit 91243a6249daf1f12e76c9c4f0fff0e9d9f26f7e --json name,status,conclusion
```

(or `GET /repos/maymun207/cwf_yaprak/actions/runs?head_sha=91243a62...` — **not**
`/commits/<sha>/check-runs`, which returns an unreliable `total_count: 0`.)

**PASS CONDITION — every one of these must hold:**

- `build (20.x)` · `build (22.x)` · `coverage` · `rule26` → `status: completed`
  **and** `conclusion: success`.
- `eval-canary` → **`skipped` is the expected and correct PR result.** It runs
  for real on the master push; STEP 3 reads it there.

**A `status` of `in_progress`, `queued`, or `null` is NOT a pass.** If any
required job is anything other than completed+success, **STOP and report** —
do not merge.

---

## STEP 2 · Merge

`--no-ff`. **Squash is banned.** Use this message **verbatim** — do not
reformat, re-wrap, summarise, or add a co-author trailer.

```bash
git fetch --all --prune
git checkout master
git pull --ff-only
git merge --no-ff phase/bug-004-column-truth-1 -F - <<'MSG'
merge: BUG-004 — two column references that named nothing

HealthGovernanceRepository.countAgingDrafts filtered on domain_rules.created_at
and lastGateVerdict selected rule_audit.rule_id. Neither column exists in any of
the 67 migrations. Both failed deterministically on every call since 1.5 shipped;
both were caught honestly by the read floor as measurement_unavailable rows.

countAgingDrafts now filters on updated_at. This is an ALIGNMENT, not a semantic
change: the card's own tooltip already promised "a draft nobody has looked at for
two weeks". No created_at column is added — owner-ruled, S81. Backfilling one
would put a fabricated date where a fact belongs.

lastGateVerdict selects target_rule, still mapped onto LastGateVerdict.ruleId.
No API or UI surface shape moves.

THE EXISTING TEST DID NOT MISS THIS BUG — IT PINNED IT. The pre-fix suite
asserted toContain('lt:created_at'), so a correct fix would have gone red and
invited someone to revert it. The fake's select handler discarded the field list
entirely, leaving every select column in that file unobserved since it was
written. Six new tests assert the column names actually reached the query
builder; all six fail on the pre-fix tree.

CENSUS: 899 column references across 44 tables. Positive control PASSED — the
pre-fix run independently rediscovered exactly the two known sites and nothing
else; post-fix is 0 at identical coverage. Six backend_tools.via_gateway hits
were adjudicated FALSE-POSITIVE (declared inside a DO $$ ... $$ block) and the
census fixed, not the code. DDL forms enumerated from this tree rather than
assumed, including a multi-line create-table-if-not and a $a9$-tagged DO body
hiding 5 of 13 real add-columns.

Four independent grep-based schema reads failed today, two by the Architect and
two by the Author, each on a different DDL spelling. A schema-reference CI gate
is named as a separate item; it is deliberately not built here.

docVersion rev 187 -> rev 188: RULE 20 reseal, required because a tab's
codeAreas cover api/cwf/_lib/persistence/**.

BUG-004 REMAINS OPEN. Merging does not close it (S63-1).
MSG
git push origin master
```

---

## STEP 3 · Post-merge read — owed, and it is not optional

On the master push, `eval-canary` **runs for real** (it is structurally skipped
on PRs). Read that run and report:

```
gh run list --repo maymun207/cwf_yaprak --branch master --limit 1 --json displayTitle,conclusion,headSha
```

**Report the merge commit SHA, every job's conclusion, and the `eval-canary`
duration.** If `eval-canary` is red, do not investigate — report it and stop;
the Architect reviews it.

---

## STEP 4 · Report back

One message containing:

1. STEP 1's raw job list.
2. The merge commit SHA and its **parent count** (must be **2** — proof of
   `--no-ff`).
3. STEP 3's master-CI result, `eval-canary` included by name.

---

## What this merge does NOT do

**It does not close BUG-004.** Per S63-1 and BUG-CARRY-1 rule 4, the bug stays
**OPEN** in the §BUG bucket with this merge's SHA appended to its evidence log.
It closes only when both of its named proof reads are taken on the deployed SHA:

1. a Health-tab load producing **zero new** `telemetry_events` rows of
   `payload.kind = 'measurement_unavailable'` for
   `health-analytics.countAgingDrafts` and `health-analytics.lastGateVerdict`,
   proven by a census whose `max(ts)` for those guards is **older** than the
   load; and
2. both cards rendering a value **or an honest real absence** — a real `0` and
   `lastGateVerdict: null` both count, "could not read" does not.

That proof is a **separate relay**, authored after this merge lands.

<!-- END · GO-BUG-004-COLUMN-TRUTH-1-MERGE-v1 -->
