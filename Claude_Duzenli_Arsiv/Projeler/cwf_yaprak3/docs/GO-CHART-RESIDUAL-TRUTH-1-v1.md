# GO — CHART-RESIDUAL-TRUTH-1 · v1 (Architect → AG-2)

<!-- GO-CHART-RESIDUAL-TRUTH-1-v1 · 2026-08-09 · S89. RULE-25 review PASSED from
     the Architect's own clone: diff read byte-level; chatParser.ts:262 confirms
     per-CLAIM is the chart's live law; independent recount 6+6+9=21 new tests /
     +3 files → 503/6007 arithmetic exact; file map compliant (src/** + .agents/**
     only). Mutation table (§5) accepted as D-5 evidence. -->

## RULINGS (bind into the record; no code change required)
R1 · **Per-CLAIM ratified** — your reading of `seriesLabels[field] === undefined`
     is the law itself, not an interpretation of it. Per-entry is REJECTED for
     the reasons you gave.
R2 · **KB/SKILL edit ratified** under the standing update-the-KB law; a stale
     law quoted as authority is worse than a file-map deviation.
R3 · **The un-numbered prompt-lane residual you declined to id IS W-030**
     (register v92 §2) — your restraint was correct; it stays open, out of scope.
R4 · The production over-cap panel witness becomes a WATCH line in register v93
     (natural-occurrence witness; no contrived owner query).

## STEP 1 — CI VERIFICATION (BLOCKING; do this before touching merge)
```
gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=$(git rev-parse origin/phase/chart-residual-truth-1)" \
  --jq '.workflow_runs[] | {id, status, conclusion}'
```
PASS condition: a run on the CURRENT branch tip with `status=completed` AND
`conclusion=success` (read CONCLUSION; `in_progress`/`null` is NOT a pass;
eval-canary skipped-by-design does not count against it). The run you cited
(31293139027) predates the report commit — the tip run is the one that gates.
If the tip run is red or absent: STOP, report, no merge.

## STEP 2 — MERGE (only after STEP 1 passes)
```
git checkout master && git pull --ff-only origin master
git merge --no-ff phase/chart-residual-truth-1 -m "merge: CHART-RESIDUAL-TRUTH-1 — the cap counts SERIES, and the table obeys the same identity law

W-029: MAX_CHART_SERIES gates on projectedSeriesCount (groups × distinct
fields, distinctFields REUSED) — 10×2=20 now reaches the honest panel; the
boundary itself is pinned unmoved on both sides. W-031: a table directive's
columns list is a SET keyed by field, per-CLAIM first-wins (chatParser's own
seriesLabels law) — a live header is never rewritten, a late header on an
unclaimed field still lands; UNIT-TRUTH-1 still reconciles LAST. 21 tests,
4 mutations each killed by exactly the intended nets. Closes W-029 + W-031.
Suite 503/6007. Zero migrations, zero publishes, rev 217 stands.

RULE-25: PASS (Architect, S89). Report: docs/relay/PHASE-CHART-RESIDUAL-TRUTH-1-report.md"
git push origin master
```
Squash is BANNED. After the push: report the merge SHA and the master CI run id
on that SHA. Do NOT delete the branch (GO scope: sweep happens at session close).

## AFTER
Nothing else is yours: no Operator step, no publish, no reseal. AG-1's merge is
SEQUENCED behind yours (S88-1) and gets its own GO once master moves.

<!-- END · GO-CHART-RESIDUAL-TRUTH-1-v1 -->
