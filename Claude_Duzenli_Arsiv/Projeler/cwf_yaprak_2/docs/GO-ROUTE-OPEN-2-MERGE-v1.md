# GO — ROUTE-OPEN-2 MERGE · v1

**Branch:** `phase/route-open-2` · **HEAD:** `13888ce139e7db1ba977b4eb64df4282df618328`
**Anchor:** `a6252b20ad5e1287ef272b5d1642d1fa64d1b678` (= `merge-base`, verified)
**PR:** #156 · **Closes on proof, not on merge:** `BUG-013`

**RULE-25 review taken by the Architect on a FRESH FULL CLONE, independently
recounted.** Every claim in AG's report was re-derived, not accepted: HEAD,
merge-base, diff surface (11 files, zero migrations, zero admin endpoints, zero
`src/`), `vercelTools[safeName]` absent from the diff, the empty-map branch at
`backendCoverage.ts:163`, the lens importing the same `countExposure`, `+16`
`it()` blocks (10→19 and 10→17), `docVersion rev 192 → 193`, and the
`via_gateway` migration behind AG's §5.6 item 4.

---

## STEP 1 — BLOCKING. Re-read CI before touching master.

The Architect's sandbox cannot reach the GitHub API (403, rate-limited without
identity), so this check is yours and it gates everything below.

```bash
gh run list --repo maymun207/cwf_yaprak --commit 13888ce139e7db1ba977b4eb64df4282df618328 --json name,status,conclusion
# or: /repos/maymun207/cwf_yaprak/actions/runs?head_sha=13888ce1...
```

**PASS CONDITION — all four must be `completed` + `success`:**
`build (20.x)` · `build (22.x)` · `coverage` · `rule26`.

- `eval-canary` = **`skipped` is expected and is NOT counted as a pass.** It is
  fenced to `push`/`workflow_dispatch` (`build-test.yml:109`) so the PR plane
  never spends. It runs on merge to master.
- `in_progress` or `null` is **NOT** a pass. Wait, or stop.
- If `rule26` is red, it is the chronic flake F-BW01: **one** ordered re-run,
  and only if the failure signature matches. A second red is a real failure.

---

## STEP 2 — MERGE, `--no-ff`, with this message VERBATIM

Squash is banned. Do not edit, shorten or re-wrap the message.

```bash
git checkout master && git pull --ff-only
git merge --no-ff 13888ce139e7db1ba977b4eb64df4282df618328 -F -
```

```
merge: ROUTE-OPEN-2 — a number that could not see the slice it was counting

writeOffered counted the offered tools whose published tool_annotation row said
'write'. ROUTE-OPEN-1 then widened the offered set with a slice that has no
published rows BY DEFINITION -- an unfiled backend's whole catalogue. The lookup
missed on every one of them, the miss folded to "not write", and the line
printed writeOffered=0 for the one slice no category had judged. Neither change
was wrong alone. Correct code became wrong because a neighbouring phase widened
the population it counted over.

THE FIX IS A THREE-VALUED UNION, NOT A PATCHED FILTER. resolveExposure returns
'read' | 'write' | 'unclassified' and a miss is unclassified, never read. A
boolean would let a call site skip the "I don't know" case; the union makes the
compiler drag every consumer into deciding. [ToolRoute] now prints
writeOffered=N unclassified=M -- both ALWAYS, zeros included, and both 'unknown'
on the full-set branch, where not-applicable is not zero.

THE BRIEF'S OWN MECHANISM DEFEATED ITS OWN ARGUMENT, AND AG CAUGHT IT. G1
prescribed "exposureByTool === null (the floor) -> unclassified". The floor's
map is an EMPTY MAP, not null (resolveToolCategories.ts:103). A null-only guard
never fires on the live floor, so every floor tool would have resolved 'read' --
the exact false zero this phase exists to remove, shipped on the one surface
with no gate in its path (ADR-011). Both null-ness and emptiness now answer
unclassified, and the empty-map route carries its own named test. The | null
case is real but means no resolution at all, not "the floor". The Architect had
read line 103 earlier in the same session and then wrote the brief from memory
rather than from the read.

BEHAVIOUR IS UNCHANGED, AND THAT IS THE POINT. The uncovered slice is still
offered whole. F185: the floor degrades toward TODAY, never toward something
new, and withholding unclassified tools would re-create the disease
ROUTE-OPEN-1 cured, one day after it was cured. No heuristic classifies
anything: an exposure we were never given reads unclassified, not read.

BOTH CONTROLS RED ON THEIR OWN CAUSE. Reverting the miss branch to 'read'
killed 8 tests across both files, including the composed stage-7 control
(unclassified=1 -> 0). Implementing the forbidden per-TOOL predicate red the
ADR-011 control with "ADR-011 REPEALED: createProductionRecord reached a
filtered turn". And a harness false-green was caught BEFORE it was trusted: a
-t title filter matched nothing and reported "Test Files 1 skipped" with exit 0
-- S82-2 doing its job on the very phase that cited it.

A THIRD DOC SURFACE WAS STALE BEFORE THIS PHASE AND IS FIXED FIELD-FOR-FIELD.
scripts/genArchitectureFacts.ts anchors the [ToolRoute] field list. It named
api/cwf/chat.ts as the emit site after the line had moved to turn/stageTools.ts,
and listed 7 fields while the line emitted 11. A field list that silently stops
short is the same defect class as the counter this phase fixed, so it was
corrected whole rather than half-fixed around the new token.

DECLARED, NOT ABSORBED: the zero half of the proof is unobtainable in
production today, because producing uncovered=0 would require unmounting the
only uncovered backend. It is proven at unit level and the asymmetry is written
down rather than faked -- BUG-008's P3 was withdrawn for exactly this shape and
is not repeated.

Tests 452/5108 -> 452/5124; no new test files, 16 new it() blocks. Zero
migrations, 67 before and after. Zero new endpoints, tables or surfaces.
BUG-012's registration site is byte-unchanged and stays its own phase. Drift
obeyed by READING the tabs: Request Lifecycle and Agent Control Plane redrawn;
Architecture Map, Runtime Topology and Stage Cards reseal-only; Governance Model
did not drift at all, contradicting the brief's prediction in both directions.
rev 192 -> 193.

BUG-013 does NOT close here. BUG-CARRY-1 rule 4: a merged fix moves nothing, and
the entry stays OPEN until the live read below is taken.
```

Then `git push origin master`.

---

## STEP 3 — Deploy convergence, before any proof read

```bash
# list_deployments: state=READY, target=production, githubCommitSha = the new merge SHA
```
A proof read taken against the previous deployment proves nothing. Name the new
`dpl_…` and the SHA before reading a single line.

---

## STEP 4 — POST-DEPLOY PROOF (S63-1). BUG-013 closes here, or not at all.

Issue **one** production turn that takes the filtered branch (any ordinary
factory question — the same natural-gas question is fine), with `honestbench`
still mounted. Then read the runtime log for that trace.

**PASS:**
```
[ToolRoute] … uncovered=4 backends=[honestbench:4] … writeOffered=<N> unclassified=<M> …
```
with **`M ≥ 4`** and **both tokens present and explicit**.

**FAIL, and each means something different:**
- `unclassified` token absent → the always-print rule regressed.
- `unclassified=0` beside `uncovered=4` → the miss branch is folding again.
- `unclassified=unknown` on a filtered turn → the branch guard is wrong.

**The zero-half control is NOT taken in production** and that is by design, not
omission — see the merge message. It is covered by the unit test.

**Then, and only then:** BUG-013's status flips to CLOSED in
`REGISTER-BUG-BUCKET-v14`, with the trace id, the deployment SHA and the read
values written into its evidence log.

---

## STEP 5 — What must NOT happen in this merge

No touch to `vercelTools[safeName]` (BUG-012, its own phase) · no credential work
(BUG-014) · no change to the coverage predicate itself · no new panel affordance,
table, endpoint or migration.

**Next in the queue after this closes: `AXIS-TRUTH-1` (BUG-018).** The phase
prompt is written the moment STEP 4's read lands.

<!-- END · GO-ROUTE-OPEN-2-MERGE-v1 -->
