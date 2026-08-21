# GO · BACKEND-LIFECYCLE-AFFORDANCE-1 — merge · v1

<!-- GO-BACKEND-LIFECYCLE-AFFORDANCE-1-MERGE-v1 · 2026-08-04 · S81 · Architect: Claude.
     Self-contained (D-2 ONE-RELAY). Nothing to assemble from anywhere else. -->

**Branch:** `phase/backend-lifecycle-affordance-1` · **head** `cf155f3e15166d5c960e483b724d4291451828ef` · **PR #150**

---

## 0 · The Architect's independent review (RULE-25)

Re-derived from a fresh clone, not read from the report:

| Check | Measured |
|---|---|
| branch head | `cf155f3e15166d5c960e483b724d4291451828ef` ✅ |
| files changed | **22** (14 code/test/ADR + 8 reseal) — matches the report's 14 + 8 |
| `evalGate.ts` diff | **0 lines** ✅ |
| `src/**` diff | **0 files** ✅ — no user-visible string moved |
| `supabase/**` diff | **0 files** ✅ |
| migrations | **67** ✅ |
| test files | **445** (440 + 5 new parity suites) ✅ |
| new endpoint files under `api/admin` | **none** ✅ |
| docVersion | 188 → **189** ✅ |
| tests 4965 | **CI-arbitrated, not re-derived by the Architect** (S37-2) |

**The three mandated guards, read at the source** (`recordSyncHealth.ts`) — all
present, and **stricter than the prompt required**:

- personal scope → `skipped-personal-scope`, before anything else;
- the backend id must be **declared**, explicitly *"never `backendOf()`'s
  fallback"* — an addition the prompt did not ask for and which closes the
  ADR-010 hole where any server could claim `armes`;
- an unreadable `backends` registry → `skipped-registry-unreadable`, loud in the
  log, silent to the caller. **Every guard fails toward not writing.**
- Guard 3 is doubled: an inner swallow around `recordCheck` and an outer belt
  around the whole module. Nothing reaches the caller.

**G4's three states, verified:** `blocked` / `passed` — earned only when
`mirror.state === 'active'` / `inert`. And the mirror carries its own three
states (`active` / `empty` / `unreadable`), logged alongside, so a genuinely
empty mirror and an unreadable one stay distinguishable too. That split was not
required by the prompt.

**G5's positive control, verified structurally:** the non-withheld branch of
`armesGatewayMisrouteMessage` is byte-unchanged; the withheld branch names the
state **and** denies the wrong inference (*"yetenek eksik değil, geçici olarak
erişilemiyor"*), which is BUG-002's model half.

**ADR-013 placement accepted.** `docs/adr/ADR-013-decision-parity.md`,
unversioned filename, precedent ADR-011 rather than ADR-012 — the reasoning
given (ADR-012 is a transcription pattern; ADR-011 is the repo-authored
owner-issued law landed by a phase's own G1) is correct and the F190 citation
gate makes landing-before-citation mandatory anyway.

---

## STEP 1 · CI verification — BLOCKING

```
gh run list --repo maymun207/cwf_yaprak --commit cf155f3e15166d5c960e483b724d4291451828ef --json name,status,conclusion
```

Then per-job via `/actions/runs/<id>/jobs` — **not** `/commits/<sha>/check-runs`.

**PASS CONDITION:** `build (20.x)` · `build (22.x)` · `coverage` · `rule26` all
`completed` + `success`. `eval-canary` **`skipped` is the expected PR result**;
it runs for real on the master push and STEP 3 reads it there.

**`in_progress`, `queued` or `null` is NOT a pass.** Re-verify that the branch
head is still `cf155f3e` and master still `ecea4851` immediately before merging.

---

## STEP 2 · Merge

`--no-ff`. **Squash banned.** `git merge` does not accept `-F -`; write the
message to a file and pass it with `-F <file>`, then verify the committed body
by reading it back.

```
merge: BACKEND-LIFECYCLE-AFFORDANCE-1 — every path that decides, records

Closes the code half of five bucket entries: BUG-001, BUG-003, BUG-006, BUG-007
and the MODEL-facing half of BUG-002. Five defects, five sites, one shape — in
every one the mechanism that should have recorded the decision ALREADY EXISTED
and was simply not invoked on one of the paths reaching the same decision.

ADR-013 DECISION-PARITY-1 lands first, before the code that cites it: where more
than one path reaches a decision of the same class, every such path must emit the
same record, and that record must be readable by whatever consumes that class. A
path that reaches the decision and records nothing is a defect EVEN WHEN ITS
BEHAVIOUR IS CORRECT, because it makes the two states indistinguishable
afterwards.

BUG-001 · the panel Sync button and the on-connect hook run the same
syncBackendCatalog probe the */30 cron runs; both now record a health row.
No new endpoint, no new control — the affordance was already there, nothing
listened. Three guards, all failing toward not writing: global scope only, a
DECLARED backend_id never backendOf()'s fallback, and a real row in `backends`.
The health write can never fail a sync.

BUG-003 · the cron now classifies with classifyProbeError, the same classifier
its two sibling paths already used. Head shape is <class> | http=<n>|none |
<capped raw>, class first, so the 300-char cap can eat a trailing cause but never
the classification. Three copies of that cap became one. No migration —
error_head is where this lands.

BUG-006 · the misroutedToArmes branch records like its policyDenial sibling,
three lines away. Three states are now distinguishable: blocked, passed (earned
only when the mirror is active), and INERT — the state where an unreadable mirror
made the fence permanently false and silent. OWNER RULING S81: the fence STAYS
FAIL-OPEN. Behaviour is unchanged; only its visibility is.

BUG-007 + BUG-002 (model half) · the misroute message consults
ctx.mcpWithheldBackends and, when the backend is withheld, states that it is
temporarily unavailable and that the capability is not missing — instead of
directing the model at a locked door. With the backend up the original message is
byte-unchanged.

Five standing parity tests, each MUTATION-PROVEN red with the lost record named,
each carrying an innocent-case probe that stays green. A generic parity gate is
REFUSED with its evidence recorded in the ADR: enumerating every path reaching a
decision class is the problem that broke four separate grep-based censuses in one
day, and a gate on that footing would return clean and be believed. It is named
as a separate item.

A SIXTH SITE OF THE SAME SHAPE IS NAMED, NOT FIXED:
withholdUnhealthyBackends (mcpHealthWithholding.ts) returns withheldBackends: []
on a health-read failure — byte-identical to "nothing was withheld" — so a trace
cannot distinguish "all backends healthy" from "the withholding read failed and
we offered everything anyway". ADR-013 half (a), one stage earlier.

docVersion rev 188 -> rev 189: check:doc-drift went red on 6 tabs and was obeyed,
not silenced.

ALL FIVE BUGS REMAIN OPEN. Merging closes none of them (S63-1).
```

---

## STEP 3 · Post-merge read

On the master push `eval-canary` runs for real. Report the merge SHA, every job's
conclusion, and the canary's verdict and duration. **If it is red, do not
investigate — report and stop.**

---

## STEP 4 · Report back

1. STEP 1's raw job list.
2. The merge SHA and its **parent count** (must be **2**).
3. STEP 3's master-CI result, `eval-canary` named.
4. Delete the merged remote branch `phase/backend-lifecycle-affordance-1`, and
   the two stale ancestors `phase/e2e-devserver-api-404-1` and
   `phase/inspect-verdict-1` — all three are ancestors of master and their
   presence feeds the stale-clone hazard S81-1 describes.

---

## What this merge does NOT do

**It closes none of the five bugs.** Each stays **OPEN** in the §BUG bucket with
this merge's SHA appended to its evidence log, until its own post-deploy proof
read is taken against the deployed SHA. Those proofs are a **separate relay**,
authored after this lands — and per **S81-2** every pass condition in it will be
relative to an event inside its own test, never an absolute count or a pinned
prior reading.

<!-- END · GO-BACKEND-LIFECYCLE-AFFORDANCE-1-MERGE-v1 -->
