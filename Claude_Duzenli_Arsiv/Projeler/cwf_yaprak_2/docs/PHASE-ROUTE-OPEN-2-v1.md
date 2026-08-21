# PHASE-ROUTE-OPEN-2 · v1

**Closes:** `BUG-013` (`REGISTER-BUG-BUCKET-v12` §BUG.1) — queue position 1,
**URGENT by owner ruling 2026-08-05**.
**Lane:** Author = AG. **Migrations: ZERO.** **New tables/endpoints: ZERO.**
**Anchor:** `origin/master` = `a6252b20ad5e1287ef272b5d1642d1fa64d1b678`.

---

## §0 · BOOTSTRAP — do this before reading anything else

```bash
rm -rf /tmp/ro2 && git clone https://github.com/maymun207/cwf_yaprak.git /tmp/ro2
cd /tmp/ro2 && git fetch --all
git rev-parse origin/master        # MUST be a6252b20ad5e1287ef272b5d1642d1fa64d1b678
cat public/architecture/manifest.json | grep docVersion   # MUST be rev 192
ls supabase/migrations | wc -l     # MUST be 67
```

**S80-1: every write in this session uses an ABSOLUTE path.** The cwd is a
variable; `/tmp/ro2/...` is not.

**Baseline test numbers are a CLAIM, not a measurement.** The bootstrap states
**452 files / 5108 tests**. The Architect could **not** re-derive the 5108 in
this session (GitHub Actions API returned 403 from the Architect sandbox; a local
full-suite run produced no output in 50+ minutes). **452 files WAS re-derived**
under vitest's own include globs. **CI is the arbiter (S37-2): report the number
CI prints, and if it disagrees with 5108, say so rather than repeating it.**

**Branch + PR, and the PR is not a courtesy — it is the CI trigger.**
Work on `phase/route-open-2`. **Push the branch AND open a PR**; CI does not run
otherwise, and "I pushed" is not "CI ran". Habit is not an instruction, so it is
written here.

---

## §0.1 · THIS BRIEF'S OWN FALSIFIER

> **If `backend_tools` turns out to carry any per-tool exposure/annotation
> column, this brief is WRONG in its central premise and you must stop and say
> so** — because the whole design below rests on there being **no** mirror-side
> source of write-exposure.

The Architect checked, and states the check rather than the conclusion:

```
supabase/migrations/20260714120000_backend_tools.sql:41-51
create table public.backend_tools (
    id, backend_id, tool_name, description, input_schema,
    first_seen_at, last_seen_at, status, unique (backend_id, tool_name)
);
```

No annotation column. The table's own comment says it explicitly: *"Human
knowledge about a tool (exposure/notes) lives in the SEPARATE governed
`armes.tool_annotation` kind."* **Verify this yourself before writing code.**

---

## §1 · THE DEFECT, WITH ITS LIVE EVIDENCE

`ROUTE-OPEN-1` works. Copied from a Vercel query over the production deployment
`dpl_376V1pM8wTq7rBRHKABZudXogaXt` (SHA `a6252b20`), 2026-08-05:

```
04:44:03 trace=9a4f8af8
  [MCP Mirror] served 154 defs backend=armes,superset,machine-knowledge-base,honestbench
  [ToolRoute] uncovered=4 backends=[honestbench:4] covered=146 gateway=4
  [MCP Call] hb_grove_yield_total with args: {"groveId":"G-03"}
  [MCP Result] hb_grove_yield_total → { "totalYieldKg": null, "measured": false }
```

Three turns in the window, all `uncovered=4 backends=[honestbench:4]`. **Do not
narrow this. The widening is correct and stays.**

The defect is on the same line. `stageTools.ts:410`:

```ts
writeOffered = catRes ? toolDefs.filter((t) => catRes.exposureByTool.get(t.name) === 'write').length : null;
```

`exposureByTool` is built from published `armes.tool_annotation` rows
(`resolveToolCategories.ts:22-25, :137`). An **unfiled** backend has no published
rows — that is what unfiled means. So for every tool in `coverage.uncoveredFlat`
the lookup returns `undefined`, the tool is not counted, and the line prints
`writeOffered=0`.

> **The one slice of the offered set that no category judged is the one slice
> the write counter cannot see. `0` there means "I could not classify", and it
> is being printed as "none".**

`resolveToolCategories.ts:73-76` already reasons about exactly this false zero
**for the floor case** and fails closed there. The same reasoning was not carried
to the uncovered slice the same phase introduced. That is the whole bug.

---

## §2 · THE DESIGN DECISION, STATED SO IT CAN BE VETOED

**There is no source of truth for an uncovered backend's write exposure.** Not
in the mirror (§0.1), not in published rows (it is unfiled by definition). The
honest state is **UNKNOWABLE**, and this phase says so instead of guessing.

Therefore:

1. **Behaviour does not change. The uncovered slice is still offered whole.**
   F185: the system degrades toward TODAY, never toward something new. Dropping
   unclassified tools would re-create the disease `ROUTE-OPEN-1` cured, on the
   day after it was cured.
2. **`writeOffered` stops being a bare number whenever anything is
   unclassified.** A number that silently excludes a slice is the defect; a
   number that names its own blind spot is not.
3. **No heuristic decides exposure.** `backendToolsStageDrafts` proposes
   annotations by a write-prefix heuristic — that is a *proposal for a human*,
   and it must never become a *classification*. A guessed exposure printed as a
   fact would be a worse bug than the one being fixed.
4. **The lever is named, not built here:** publishing `tool_annotation` rows for
   a backend resolves its tools' exposure permanently. This phase makes the gap
   visible and names the lever; it does not build a new affordance.

**Owner veto surface:** if the owner wants unclassified uncovered tools
**withheld** from filtered turns rather than offered-and-marked, that is a
one-line change at G2 and a different default — but it is a behaviour change and
it is not what this phase does without a ruling.

---

## §3 · GATES

### G1 — exposure resolution becomes three-state, in ONE place

Add to `api/cwf/_lib/routing/backendCoverage.ts` (it already owns the partition,
and both the turn and the lens import from it — putting this anywhere else lets
the two drift):

```ts
export type Exposure = 'read' | 'write' | 'unclassified';

export function resolveExposure(
    toolName: string,
    exposureByTool: ReadonlyMap<string, 'read' | 'write'> | null,
): Exposure;
```

- `exposureByTool === null` (the floor) → `'unclassified'` **for every tool**.
  The floor carries no annotations at all; reporting `read` there would be the
  same false zero one storey up.
- a hit → that value.
- **a miss → `'unclassified'`. Never `'read'`.** This is the single line the
  whole bug reduces to.

**Do NOT special-case the uncovered slice inside this function.** A covered
backend can also have an unannotated tool, and it deserves the same honesty. The
function takes a name and a map; it does not know about coverage.

### G2 — the `[ToolRoute]` line reports what it could not classify

`stageTools.ts:410` and `:490`. Replace the bare count with a pair, computed over
`toolDefs` (the set actually offered), never over the filtered slice alone:

```
writeOffered=<N> unclassified=<M>
```

- **Both tokens print ALWAYS**, including `unclassified=0`. An omitted token is
  indistinguishable from a clean one — the class this project has spent three
  days removing.
- On the full-set / bypass branch both stay `unknown` (today's `null`
  behaviour). **Not applicable is not zero** — this is already the documented
  rule at `stageTools.ts:244`; do not regress it.
- `M` counts every offered tool whose exposure resolved `'unclassified'`,
  wherever it came from. It is **not** simply `uncoveredFlat.length` — a covered
  backend's unannotated tool belongs in it too, and if the two numbers happen to
  be equal today that is a fact about today, not a definition.

Keep the existing `uncovered=` / `backends=[…]` tokens **byte-unchanged**. They
are correct and a reader's eye is already trained on them.

### G3 — span parity (ADR-013 DECISION-PARITY-1)

Whatever the console line says, the stage span says. Add `writeOfferedCount` and
`unclassifiedCount` beside the existing `uncoveredCount` / `uncoveredBackends`
on the same span, with the **same `null` semantics** on the full-set branch. Two
paths reaching the same decision class must record identically — that is the
whole content of ADR-013 half (a), and BUG-009 is the open entry that exists
because it was violated at another site.

### G4 — the lens must not disagree with the turn

`api/cwf/_lib/replay/routeShadowLens.ts` partitions the same universe. It must
import `resolveExposure` from the same module and expose the same counts in its
evidence. **A lens and the turn it replays must never disagree about what was
offered or about how much of it was unclassified** — every measurement built on
the lens inherits the error silently otherwise.

### G5 — the two controls, and neither may pass vacuously

1. **ADR-011 survives, unchanged.** `routeOpenStageTools.test.ts` §2 already
   proves ARMES's write-annotated tools stay absent from a filtered turn, using
   the **real classifier** plus a fixture-reality test. It must still pass, and
   it must still **red** under the per-tool-predicate mutation. Do not touch it
   except to add to it.
2. **NEW, and this is the control that reds on today's bug:** a fixture with an
   uncovered backend serving a tool that *would* be `write` if published must
   produce `unclassified=1`, **not** `writeOffered=0` with nothing else said.
   **Mutation check:** revert `resolveExposure`'s miss branch to `'read'` and
   this test must go RED. If it stays green, the test is measuring nothing and
   you have reproduced BUG-015 inside the fix for BUG-013.

### G6 — the citation that does not resolve

`backendCoverage.ts:39` names `backendCoverageWriteLock.test.ts` as the ADR-011
control. **No such file exists** (`find` repo-wide returns nothing). The control
is real and lives in `routeOpenStageTools.test.ts` §2. Repair the reference to
name the file that exists. One line; it is in this phase because a citation that
cannot be followed is how a reader loses the ability to check anything.

### G7 — S82-2, applied to this phase's own apparatus

**Every harness this phase runs states its red/green control in the report.** If
you run a mutation sweep, show one mutant that **died** and one command whose
output proves the runner received the paths you think it received. `8/8 SURVIVED`
was reported in this repo two days ago by a runner that measured nothing.

---

## §4 · DOCS & DRIFT

Obey the drift gate **by reading the tabs**, not by guessing. Expected: the
Request Lifecycle and Agent Control Plane tabs inventory `[ToolRoute]` fields and
will need the two new tokens; a new function inside an existing routing module
adds no node, authority, kind, gate, table or endpoint, so the Architecture Map,
Runtime Topology and Governance Model are **reseal-only**. `rev 192 → 193`.
If a tab you did not expect drifts, say so — the expectation above is the
Architect's, and it is falsifiable.

---

## §5 · REPORT — what the GO will be checked against

1. `git rev-parse HEAD` on the branch, and the PR URL.
2. **CI: all five gates, each named with its conclusion.** `in_progress` or
   `null` is **NOT** a pass. Use `/actions/runs?head_sha=<SHA>`.
3. Test counts before → after, **as CI prints them**, plus a note if CI's
   "before" is not 5108.
4. G5's mutation evidence: the revert applied, the test RED, the revert undone,
   the test GREEN — four outputs, not a sentence.
5. The exact new `[ToolRoute]` format string, copied from the code.
6. Anything in §1–§4 you found to be wrong. The Architect made fourteen premise
   errors in two days; the fifteenth is likelier than a clean brief.

---

## §6 · POST-DEPLOY PROOF (S63-1 — merge is not proof)

Taken **after** the merge lands on production, SHA and trace id named:

- **The non-zero half, live:** one production filtered turn with `honestbench`
  still mounted prints `uncovered=4 backends=[honestbench:4] … writeOffered=<N>
  unclassified=<M>` with **M ≥ 4** and both tokens explicit.
- **The zero half is NOT obtainable in production today, and that is stated
  rather than faked.** Producing `uncovered=0` would require unmounting the only
  uncovered backend or publishing categories for it — a data change nobody
  ordered. The explicit-zero case is proven at unit level in G2's test, and this
  asymmetry is recorded here so no one later writes an unsatisfiable proof step.
  **BUG-008's P3 was withdrawn for exactly this reason; it is not repeated.**
- **The counter's honesty, checked against a second source:** `M` must equal the
  number of offered tools with no published `tool_annotation` row for that turn's
  backend set. If the Operator lane is available, that is one read; if not, say
  it was not taken rather than asserting agreement.

---

## §7 · OUT OF SCOPE — named, so nobody absorbs them

- **BUG-012** (tool-name collision registration guard) — queue position 2, its
  own phase. `ROUTE-OPEN-1` made it reachable every turn; do not fix it here and
  do not "improve" `ctx.vercelTools[safeName]` in passing.
- **BUG-014** (credential path) — position 4.
- Any change to the coverage **predicate** itself. It is per-BACKEND and correct.
- Any new panel affordance, table, endpoint or migration.

<!-- END · PHASE-ROUTE-OPEN-2-v1 · closes BUG-013 · zero migrations -->
