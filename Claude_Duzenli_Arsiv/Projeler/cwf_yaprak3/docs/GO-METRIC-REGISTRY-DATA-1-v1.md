# GO-METRIC-REGISTRY-DATA-1 · v1  (lane AG-1)

**VERDICT: GO.** RULE-25 review completed by the Architect in a FRESH FULL CLONE
(`git clone` → `git checkout origin/phase/metric-registry-data-1`), independently,
not from your report.

## What the Architect verified independently

| Check | Method | Result |
|---|---|---|
| Branch tip | `git rev-parse` | `b9ccd0914e81b3e4411d7216b2057f896cbd5ca6` |
| `docVersion` | read from `manifest.json` | **rev 223 · 2026-08-09** ✅ |
| Test files | recomputed over the vitest include globs | **518** ✅ |
| `shared/metricVocab.ts` | file existence | **DELETED** ✅ |
| `MetricId` | `grep` at the definition site | `export type MetricId = string;` (`dbConstants.ts:354`) ✅ **R3** |
| **§6d exit criterion** | **re-run by the Architect** over `api shared src scripts` | **3 hits, all in `reference/metricRegistry.ts`, all COMMENTS** ✅ |
| **R6 · the F214 fence** | every diff hunk's start line vs the fence range 164–490 | hunks at 16 · 28 · 624 · 644 · 928 — **ZERO inside the fence** ✅ |
| Commit shape | `git log origin/master..HEAD` | G7 (`820bb5f`) is one below the report tip; `reset --hard HEAD~1` drops G7 and nothing else ✅ |

Three things in the report are worth more than the phase, and all three are
accepted as findings rather than noise:

1. **Mutation 2 turned the argument into a demonstration.** With the vocabulary
   parameter defaulted and one call site's argument dropped, `tsc -p
   tsconfig.api.json` exited 0 while the router silently judged every backend by
   armes's three words. Only the census test caught it. That is the entire case
   for the required parameter, proven rather than asserted.
2. **A real bug the tests caught.** `api/admin/replay.ts` has two grounding arms;
   the `?scopeReplay` arm would have shipped silently blind — zero violations
   reported, reading as "the grant changed nothing" when nothing was compared.
   A detector that silently stops detecting is the exact failure class R5 exists
   to prevent, found inside the phase that legislates it.
3. **The panel collision, disclosed instead of absorbed.**
   `BackendTrustPanel.tsx:337` reads `allowedMetrics` BY NAME off a hand-written
   client interface, so renaming it would have emptied the grant dropdown with
   the client's own typecheck green — S82-5 exactly. Keeping the flat field was
   the right call under the lane fence, and the 422 gate is per-backend and
   unsoftened. It carries forward by name.

**Your anchor deviation is ACCEPTED, and the error was mine.** The brief said
`d32482f`; the true tip was `8c9d7af`, one docs-only commit ahead. You merged
forward and reported it in advance rather than after. The brief's stated reason
for ordering the merge was that figures computed on a stale anchor describe a
tree nobody will ship — merging the true tip serves that reason; obeying the
literal SHA would have violated it while satisfying its letter. Correct judgment.

---

## STEP 1 — BLOCKING: CI on the PR head

Read **by conclusion**, on the **FULL 40-character** SHA:

```
GET /repos/maymun207/cwf_yaprak/actions/runs?head_sha=b9ccd0914e81b3e4411d7216b2057f896cbd5ca6
```

PASS: `status: completed` AND `conclusion: success` on every real job.
`in_progress` or `null` is NOT a pass. `eval-canary` skipped-by-design on a
`pull_request` event is not a failure.

⚠ A SHORT sha returns an empty `workflow_runs` array, indistinguishable at a
glance from "CI never ran" — AG-2 hit this and the previous GO caused it.
Cross-check that `refs/pull/<n>/merge` exists before concluding anything, because
a CONFLICTED PR also produces zero runs. If the run is red, STOP and report.

## STEP 2 — MERGE

`--no-ff`. Squash banned. Message below **VERBATIM**.

Re-read `origin/master` immediately before merging: it must still be
`8c9d7afce205f31a9de78c6ce1cf0782c7109b3c`. If it moved, STOP and report.

Note: `git merge -F -` does not read stdin (unlike `git commit -F -`) — write the
message to a file and pass `-F <path>`.

### TAIL ANCHOR (S61-3) — PRINT it, do not assume it

`git rev-list --parents -1 HEAD` must show a merge commit with
**parents = [`8c9d7afce205f31a9de78c6ce1cf0782c7109b3c`,
`b9ccd0914e81b3e4411d7216b2057f896cbd5ca6`]**. No third parent.

## STEP 3 — THE SEAL: rev 223, SET not inherited

You resealed seven tabs and minted `rev 223` in its own commit, and G7 carries a
second reseal so that dropping it still leaves a drift-free tree. Confirm on the
MERGED tree: `check:doc-drift` `[OK] no drift`, and `docVersion` reads
`rev 223 · 2026-08-09`. Per S90-1, state it explicitly in the report: **the merged
tree is rev 223.** AG-2's merge minted nothing, so 223 is uncontested.

## STEP 4 — CLOSING SWEEP (this is the wave's last merge)

After the merge and the report, delete BOTH merged wave branches:

```
git push origin --delete phase/stage-card-coverage-1
git push origin --delete phase/metric-registry-data-1
git ls-remote --heads origin 'refs/heads/phase/*' | wc -l
```

Verify ancestry with `git merge-base --is-ancestor` on each before deleting.
Expected final count: **27**. Report the number.

## STEP 5 — MERGE REPORT

`docs/relay/PHASE-METRIC-REGISTRY-DATA-1-MERGE-report.md`, pushed on master.
Carry: the CI run id and conclusion; the tail-anchor parents as PRINTED; the
post-merge suite figure MEASURED on the merged tree; the doc-drift result and
`docVersion`; the sweep count; the canary's own body (not its conclusion — the
streak stands at ten); and the four residuals restated by name.

---

## S63-1 · POST-DEPLOY PROOF — named now, read by the Architect after deploy

The Architect measured the live DB at GO time so the proof is falsifiable rather
than open-ended:

1. **`armes.metric_registry` currently has ZERO rows** — the kind does not exist.
   So the ABSENCE-ONLY seed is LIVE, not inert (S80-3 would have made it inert on
   a database already carrying rows). Expected after deploy: **3 published rows**
   with `order` = oee 1, fire 2, throughput 3, plus their `rule_audit` witness
   rows — the `system.plan_template` shape.
2. **`vocabSource` on a live turn** must read `governed` once those rows land.
   Before they land it reads `floor`, and a `floor` reading on a live turn is
   itself the honest signal the phase was built to produce.
3. **G7's consequence:** `armes.tool_annotation` already exists (141 published /
   44 draft), which is why armes is excluded from the mint. `superset` and
   `honestbench` do not exist. After deploy, the post-sync derivation's
   `failed=4` becomes **4 staged DRAFTS**, with `rule_audit` showing `create` and
   **ZERO `publish`** from that path.

## RESIDUALS CARRIED FORWARD (named, not absorbed)

1. **Panel migration to `allowedMetricsByBackend`** — the flat `allowedMetrics`
   field is a UI affordance that may still OFFER a metric the server refuses.
   Enforcement is per-backend and unsoftened; the affordance is not. `src/**`
   lane. Enters the register as **`TRUST-PANEL-PER-BACKEND-1`**.
2. **`ROUTING-FLOOR-BACKEND-1`** — the `[F214-FLOOR-SYNC]` fence still holds
   `'oee'` (:169) and `'scrap'`/`'ıskarta'` (:381–382) plus 12 ceramic categories.
   Untouched by name, verified hunk-by-hunk by the Architect.
3. **`evalGate.ts:160-164` armes-only routing block** — accepted at ROUTE-DERIVE-1,
   home `2E.3`. Unreachable while nothing non-armes publishes.
4. **The canary streak: TEN consecutive `verdict: null`.** Not this phase's, and
   not to be read as a quality signal either way. `CANARY-POWER-1` is the
   owner-ratified pilot behind this wave.

---

## THE MERGE MESSAGE — VERBATIM, DO NOT EDIT

```
merge: METRIC-REGISTRY-DATA-1 — a ceramic factory's vocabulary leaves the platform floor

The owner's question was one sentence: if this system ran at an insurance company,
what does OEE mean? What does FIRE mean in banking? METRIC_IDS was born on
2026-06-28 as trust-registry keys when exactly one backend existed, was lent to
the vocabulary armor on 2026-07-20 during a dark phase, and had become a ceramic
factory's field vocabulary sitting in the shared code floor of a platform meant
for every tenant. The mechanism was never the problem. The address was.

The words and their aliases are now backend-scoped governed rows
(<backendId>.metric_registry), minted generically through the same kindsOnly
seed domain that mints tool_doc, gateway_tool_policy and tool_category — so this
phase needs ZERO migrations and ZERO Operator steps. The platform floor is
EMPTY: ids: []. Not a fallback trio, not a comment promising one. A bank sees no
oee, including during an outage, and every word it submits lands as BEYAN
because an empty registry means everything is a user declaration. MetricId is
string, because a closed compile-time union is hard-coding at the type level.

The vocabulary parameter is REQUIRED at armorIrFrame and deriveCandidateCategories,
across all nine production call sites the lane derived rather than trusted — the
brief listed seven and called them eight. Mutation 2 is why REQUIRED and not
optional-with-a-default: with a default in place and one call site's argument
dropped, tsc exited 0 while the router silently judged every backend by armes's
three words. The typechecker was happy; only the call-site census caught it. The
argument for the design is now a demonstration of it.

The RULE 5 polarity law — this module must never become a governed row, because
detectors that can be silenced by data are not detectors — was correct when it
was written and is discharged here rather than deleted. Its reasoning is
preserved verbatim at the new guard site with the sentence that retires it:
vocabSource, shipped in GATE-SILENCE-VISIBILITY-1, ended the condition it
depended on, because a silenced detector and a clean one are no longer
byte-identical. And the guard now FAILS CLOSED: when the vocabulary is not
governed, F156 refuses to learn rather than learning freely. Refusing is
reversible; a contaminated tool_category_cache is not — F185 measured it regrow
from 2 rows to 19 in hours.

Ordering became data instead of accident. Key-sorting was determinism by
collation and silently moved a live verdict: a query naming both oee and fire
would have changed which metric the scope-divergence check keys on. The row now
carries an explicit order integer and the armes seed preserves declaration order
(oee 1, fire 2, throughput 3), so armes is byte-par and a bank orders its own.

The trust surface tells the truth per backend: allowedMetrics is that backend's
published rows plus its own grants, and granting oee to a reporting mirror now
422s. The flat allowedMetrics field survives on purpose — BackendTrustPanel reads
it by name off a hand-written client interface, so renaming it would have emptied
the grant dropdown with the client's typecheck still green. Enforcement is
per-backend; the affordance is not, and TRUST-PANEL-PER-BACKEND-1 carries it.

A real bug was caught by the tests and would otherwise have shipped: replay.ts
has two grounding arms and only one was wired, leaving ?scopeReplay silently
blind — zero violations reported, reading as "the grant changed nothing" when
nothing had been compared. A detector that stops detecting without saying so is
the exact failure class this phase legislates against, found inside it.

NOT TOUCHED, BY NAME: toolCategories.ts:164-490, the generated [F214-FLOOR-SYNC]
block, still holds 'oee' and 'scrap'/'ıskarta' as literals along with twelve
ceramic categories and a hundred armes tool names — the outage fallback and the
text rendered into the router-fallback prompt. The exit grep cannot reach it and
was not widened to pretend it had. That is ROUTING-FLOOR-BACKEND-1, the same law
one organ lower, and a phase that quietly fixed three literals there would have
claimed a victory its evidence does not carry.

Eight mutations, eight killed. 217 test-project type errors to zero. The exit
criterion returns three hits, all comments, all in the armes seed module. Suite
517/6308 -> 518/6322 measured on the merged tree. Seven tabs resealed and
docVersion set explicitly to rev 223 — never inherited, because for a scalar two
lanes both write, the failure mode is silent agreement rather than conflict.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
```

<!-- END · GO-METRIC-REGISTRY-DATA-1-v1 -->
