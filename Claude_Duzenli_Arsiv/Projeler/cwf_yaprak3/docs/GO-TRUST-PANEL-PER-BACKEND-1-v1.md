# GO-TRUST-PANEL-PER-BACKEND-1 · v1

<!-- Architect-authored · S94 · walk item #4 · authorizes the merge of
     phase/trust-panel-per-backend-1 into master. Single lane — no second-merger
     ceremony applies. RULE-25 review completed by the Architect from a fresh
     clone at 2c3208be: byte-pinned diffs, independent recounts, sweep verified. -->

## STATE PRECONDITION (S47-1 — verify, do not assume)

* `origin/master` = `f6d6e4835f6975ac1d726d7dde9dab451c873219`
* `origin/phase/trust-panel-per-backend-1` = `2c3208bef81a0ee0d2fa55754cb6694a73e76fc5`

If either differs, STOP and report both observed SHAs. Do not merge a moved tree.

## WHAT THE ARCHITECT VERIFIED INDEPENDENTLY (so you know what is NOT re-asked)

Recounted from a fresh clone of your branch, not from your report: docVersion
`rev 230 · 2026-08-11` (SET, not inherited) · 530 test files · 69 migrations
(ZERO delta — no Operator step exists for this phase) · the flat-field sweep
(5 residual hits, all prose or the not-toHaveProperty assertion; zero code
readers) · `isDataBackend` keys on the shared `SYSTEM_BACKEND_ID` with no
string literal and is applied at all three doors · every `readOk` return path
set explicitly, including the stale-path override · the panel's missing-entry
default resolving to `unreadable`.

**Both deviations you raised are ACCEPTED, and one is a correction to me:**

* **D1 — my `voiceGate` claim was FALSE.** You were right to check rather than
  trust the prompt, and right not to widen the gate here. It is recorded as a
  finding and enters the register by name (`F-S94-VOICEGATE-BLIND`): the gate
  the Architect named as the backstop for user-visible copy scans two files and
  has never watched any admin panel — which is exactly how `none (floor)`
  survived to reach the owner's screen.
* **D2 — extending the named refusal to `POST ?reset` is correct and is now
  the ruling, not a tolerated overreach.** My §7 enumerated two write doors and
  missed the third; leaving reset to answer *"unknown backend 'system'"* would
  have shipped a false statement on a path that rewrites an authority map.
* D3 (splitting the folded router test) and D4 (adding direct resolver
  coverage) are both strengthenings and are accepted without qualification. D4
  in particular caught a mutation that would otherwise have survived — that is
  the phase doing its own job.

**Also carried out of this phase as a named debt, NOT fixed here:**
`F-S94-HEALTH-SYSTEM-ROW` — `api/admin/health-analytics.ts` reads the same
unfiltered backend list, so the Health tab's per-backend band still carries a
`system` row. Your §7(e) census found it and correctly left it alone. It enters
the register.

---

## STEP 1 — CI VERDICT (BLOCKING; the Architect cannot read this — rate-limited)

Do this FIRST. If it does not come back green, STOP and report; do not merge.

1. Query the workflow runs for the PR head using the **FULL 40-character SHA**
   (a short SHA returns an empty array, which is indistinguishable from "CI
   never ran" — S91-6):

   `/repos/maymun207/cwf_yaprak/actions/runs?head_sha=2c3208bef81a0ee0d2fa55754cb6694a73e76fc5`

2. Cross-check `refs/pull/<n>/merge` for that PR. A PR with a conflicted merge
   ref also produces zero runs, and a broken query is not a measurement until
   it is ruled out.

3. **PRINT the result verbatim in the merge report** — run id, conclusion,
   job count. Do not summarise it as "green". Include the PR number.

## STEP 2 — MERGE

From a fresh clone (S93-2: the phase worktree is DEAD — do not merge from it,
do not commit to a local master inside it):

* `git fetch origin && git checkout master && git reset --hard origin/master`
* Merge `origin/phase/trust-panel-per-backend-1` with **`--no-ff`** (squash is
  banned) using the verbatim message below.
* ⚠ `git merge -F -` does **not** read stdin (unlike `git commit -F -`). Write
  the message to a file and pass the path.
* Do **not** edit the message. Not a word, not a line-break.
* docVersion is already `rev 230` on the branch and this is a SINGLE-lane merge,
  so no second-merger SET applies. Confirm after merge that the merged tree
  still reads `rev 230 · 2026-08-11` — confirm by printing it, not by assuming.
* Push master.

## STEP 3 — TAIL ANCHOR (S61-3 — do not assume, PRINT)

After pushing, print and report:

* `git rev-parse origin/master` (the new merge commit, full 40 chars)
* `git log --oneline -3 origin/master`
* the `docVersion` line from `public/architecture/manifest.json`
* `git status --porcelain` on the fresh clone → MUST be empty

## STEP 4 — CLOSING SWEEP (this is the wave's only merge)

* Confirm no uncommitted file survives anywhere in the working checkout
  (S93 hygiene finding: two uncommitted files were found sitting on master).
* Delete the phase branch **only after** the merge is on origin.
* Report the production deployment SHA once Vercel has built, if visible to
  you. The Architect will independently confirm `state=READY`,
  `target=production` at the merge SHA before declaring the phase done.

## STEP 5 — WHAT IS STILL OWED AFTER THE MERGE (S63-1 · S93-1)

The merge is not the finish. The birth proof is a LIVE read of the Data
Authority console once production has converged on the merge SHA:

1. `armes` → state 1, three metrics, no `+` offering anything new;
2. `superset`, `machine-knowledge-base`, `honestbench` → state 2, and their
   `+` offers **nothing**;
3. the `System (agent params)` row is **GONE**;
4. **four** rows remain.

The Architect has already verified the DB side of this prediction from live
data (armes: 3 published metric rows + 3 grants; the other three: 0 rows and 0
grants; zero grants exist anywhere outside armes). So a state-3 render on any
row would be a REAL production finding about the registry read, not a UI bug.
The owner supplies the browser witness; you supply the deploy confirmation.

---

## THE MERGE MESSAGE — VERBATIM, DO NOT EDIT

```
merge: PHASE-TRUST-PANEL-PER-BACKEND-1 — the console stops offering what the server refuses

METRIC-REGISTRY-DATA-1 made enforcement per-backend and left the affordance
platform-wide, by name, as a disclosed compromise: the grant dropdown read a
flat union of every backend's metrics off a hand-written client interface, so
renaming the field server-side would have emptied it silently with the client
typecheck still green. That debt is paid here. The flat field is deleted, and
the mirror that made it dangerous is deleted with it — the response type now
lives in shared/, the only directory inside both tsconfig projects, so the
client's belief about the response and the server's actual response are the
same symbol rather than two copies one review apart.

The defect was total, not occasional. Live data shows three published metric
rows and three grants on armes, and zero rows and zero grants on every other
backend — so every + control on the console except armes's was offering, always
and only, metrics the server would refuse. An affordance that is wrong on every
press is not a rough edge; it is a surface that teaches its operator to ignore
it.

The harder half is what an empty list MEANS. resolveMetricRegistry's `source`
deliberately folds "healthy read, zero rows" into "could not read", and that
fold is load-bearing for the turn: the F156 learn guard admits only 'governed',
and an empty 'governed' would licence a learn-path write against a vocabulary
nobody authored. So `source` is untouched and a second field is added beside
it. `readOk` answers the measurement question — did this call's read complete —
while `source` keeps answering the authority question. The two are pinned
against each other by a test asserting one is not derivable from the other,
because the whole value of the pair is that they can disagree.

That distinction is not decoration. After METRIC-REGISTRY-DATA-1 the platform
floor is empty, so "publishes no metrics" is the NORMAL state of every backend
that is not armes. Rendering it identically to "the registry read fell over"
would have meant an operator looking at a real outage and seeing an ordinary
Tuesday. Four states now render separately, and a missing state entry resolves
to unreadable rather than to healthy-empty — when the server did not say, the
console does not guess in the reassuring direction.

The system lane leaves this console. It was never a wrong VALUE on a trust
tier; it was a wrong QUESTION — the agent-params lane has no tool surface, no
metrics, and no external claim to be trusted or distrusted, and the metric
resolver already excluded it while this console did not. The exclusion is
applied at the endpoint rather than the repository, because the same lane is
correct and required in the Governance selector: the tempting one-line fix at
the shared read would have silently broken governance authoring. Both write
doors and the reset path refuse it by its real reason rather than by inheriting
a generic "unknown backend", which would have been a false statement about a
row that plainly exists.

FOUND WHILE VERIFYING, NAMED, NOT FIXED: voiceGate — the standing gate the
phase brief cited as the backstop for user-visible copy — scans the stage
registry and one string in TweakTab and has never read any admin panel. That is
how `none (floor)` reached an owner's screen with the word "floor" in it, and
why every string here was hand-checked against the gate's own forbidden
patterns instead. Widening the gate would red pre-existing copy across many
files and is a phase, not a footnote. Its sibling: health-analytics reads the
same unfiltered backend list, so the Health tab still carries a system row.

Both were reported rather than absorbed, and both enter the register by name.

Zero migrations, zero governed publishes, zero new permissions, tables or
endpoints. Nine mutations applied to the tree and run, nine killed — including
the three that matter: collapsing the two empty states, deriving readOk from
source, and reverting the dropdown to the union. Tests 6619 -> 6644 across 530
files, no new file. Reseal rev 229 -> 230, three tabs, hash-only, verified
rather than assumed: no diagram sentence describes the console's backend scope,
the response envelope or the metric vocabulary.

DONE IS NOT DONE AT MERGE. The proof is a live console showing armes with its
three metrics, three backends stating plainly that they publish none, no system
row, and four rows total. A state-3 render on any row after deploy would be a
real finding about the registry read in production, not a rendering bug.
```

---

## AFTER THE MERGE

Report at `docs/relay/PHASE-TRUST-PANEL-PER-BACKEND-1-report.md` (append a
MERGED section, do not rewrite history): the CI verdict verbatim, the PR
number, the tail anchor, the sweep result, and the deploy SHA if visible.

Then STOP. The next phase prompt comes from the Architect. Do not start #38.
