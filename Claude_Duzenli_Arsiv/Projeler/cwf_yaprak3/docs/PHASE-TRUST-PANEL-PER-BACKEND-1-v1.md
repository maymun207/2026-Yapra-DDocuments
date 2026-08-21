# PHASE-TRUST-PANEL-PER-BACKEND-1 · v1

<!-- Architect-authored · S94 · walk item #4 (rollout v3_1) · single lane (AG) ·
     supersedes NOTHING (the old wave-1 relay for this item was never executed
     and is STALE — do not read it, do not diff against it). -->

## PRECONDITION (S47-1 — verify before any work)

Fresh full clone of `maymun207/cwf_yaprak`. `git rev-parse origin/master` MUST
print `f6d6e4835f6975ac1d726d7dde9dab451c873219`. If it prints anything else,
STOP and report the observed SHA — do not proceed on a moved master.

Work starts on a fresh branch cut from that fresh origin/master:
**`phase/trust-panel-per-backend-1`** (S93-2: never a reused worktree, never a
direct commit to a local master).

## WHY THIS PHASE EXISTS (context you cannot otherwise see)

PHASE-METRIC-REGISTRY-DATA-1 (S92) made the trust console's ENFORCEMENT honest
per backend: `api/admin/backend-trust.ts` computes `allowedMetricsByBackend`
(each backend's own published `<backend>.metric_registry` rows ∪ its own
grants) and the PUT/DELETE gate 422s a metric that backend does not publish.

The AFFORDANCE was left dishonest, by name, as this item: the flat
`allowedMetrics` union field was RETAINED because `src/**` belonged to another
lane that wave, and `BackendTrustPanel.tsx` reads the flat field by NAME off a
hand-written client interface — renaming it server-side would have emptied the
grant dropdown SILENTLY with the client typecheck still green (the S82-5
copy-by-name hazard). Today the panel still offers every backend the union
vocabulary, i.e. it OFFERS metrics the server will refuse.

Both sides are in ONE lane now. The flat field dies in this phase.

## THE HIDDEN TRAP — read this before designing anything

`api/cwf/_lib/knowledge/resolveMetricRegistry.ts` returns
`source: 'governed' | 'floor' | 'stale'`, and **`floor` deliberately conflates
"healthy read, zero published rows" with "could not read / unconfigured"**.
That conflation is LOAD-BEARING for the turn: the F156 learn guard
(`api/cwf/_lib/toolCategories.ts` — grep `refuse-ungoverned`) admits ONLY
`'governed'`, and the resolver's own comment (grep `Zero published rows`)
explains that an empty 'governed' would licence a learn-path write against a
vocabulary nobody authored. **You may NOT change what `source` means.**

But the trust console is an ACTUATOR-ADJACENT surface (grants feed grounding
verdicts), and MEASURE-READ-HONESTY-1 (embedded law: *a read feeding a
measurement, ledger row, actuator or fence must distinguish "no data" from
"could not read"*) demands the distinction the console currently cannot make.
After METRIC-REGISTRY-DATA-1 the platform floor is EMPTY, so for every
non-armes backend "publishes nothing" is the NORMAL healthy state — rendering
it identically to "the registry read fell over" is the exact empty≠zero
violation this codebase legislates against.

**The committed resolution — additive, authority untouched:**
`MetricRegistryResolution` gains ONE new required field, `readOk: boolean` —
did the underlying published-rules read for THIS call complete without
throwing. It is a MEASUREMENT field, never an authority field:

- `governed` ⇒ `readOk: true` by construction.
- `floor` + `readOk: true` ⇒ healthy read, zero rows — "this backend publishes
  no metrics". THE NEW STATE THE CONSOLE NEEDS.
- `floor` + `readOk: false` ⇒ unconfigured store, or a failed read with nothing
  remembered — "vocabulary could not be established".
- `stale` ⇒ `readOk: false` (this call failed; values are remembered).
- The `backendIds: []` early return and the exported `EMPTY_METRIC_REGISTRY`
  constant: derive the honest value yourself, pin it with a test, and record
  the choice + reasoning in the report. (`EMPTY_METRIC_REGISTRY` is handed to
  callers that never performed a read — think before calling that `readOk:
  true`.)

Every existing consumer of `source` (`toolCategories.ts`, the two lenses,
`bench/gate.ts`, `bench/armor.ts`) keeps byte-identical behaviour — the field
is additive and none of them read it. VERIFY that claim with a sweep, don't
inherit it (D-3: the Architect's counts are estimates; derive your own).

## THE WORK

### 1 · Resolver (`api/cwf/_lib/knowledge/resolveMetricRegistry.ts` + its test)
Add `readOk` per the table above. Every return path sets it explicitly — no
default, no derivation from `source`. Extend the module's docblock: `source`
answers the AUTHORITY question (may the turn treat this vocabulary as
governed), `readOk` answers the MEASUREMENT question (did the read succeed);
the trust console is the first consumer of the second question and the learn
guard must never consult it.

### 2 · Endpoint (`api/admin/backend-trust.ts` + its test)
The GET response becomes:
`{ backends, allowedMetricsByBackend, metricStateByBackend }` where
`metricStateByBackend: Record<backendId, { source, readOk }>` is filled from
each per-backend `resolveMetricRegistry` call already in the loop.
`allowedMetricsByBackend` stays byte-identical. **The flat `allowedMetrics`
field is DELETED** — server stops emitting it, and the disclosed-compromise
comment block (grep `RETAINED alongside`) is replaced by one sentence recording
that the debt was paid here. A test pins that `metricStateByBackend` and
`allowedMetricsByBackend` carry the SAME key set (parallel maps must not
drift). PUT/DELETE paths untouched.

### 3 · Client type truth (`src/lib/adminService.ts`)
`listBackendTrust`'s return type updated to the new shape. Then close the
S82-5 class structurally: a compile-time assertion test pins the client type
to the server response shape (the M1F3 precedent — a hand mirror that drifts
must fail `typecheck`, not review). If a shared type home is cleaner than an
assertion (e.g. exporting the response type from a location both projects may
import), you may choose it — but note `typecheck:api` and the src typecheck
are SEPARATE projects; whatever you choose must be proven under BOTH, and the
report records which mechanism you picked and why.

### 4 · Panel (`src/components/admin/BackendTrustPanel.tsx` + its test)
- `grantable` for each row derives from `allowedMetricsByBackend[b.id]` minus
  that backend's current authority. The union vocabulary dies with the flat
  field — a row can no longer offer another backend's metric.
- Per-row honest state, FOUR renders, never folded:
  1. governed, non-empty → today's dropdown, unchanged look.
  2. `floor` + `readOk:true` → muted informational text: this backend
     publishes no metrics (grants, if any, remain visible and revocable).
     NOT an error tone — this is a healthy fact.
  3. `floor` + `readOk:false` → warning tone: the metric vocabulary could not
     be read; granting is unavailable until it can. Distinct wording from
     state 2 — conflating them is the bug this phase exists to kill.
  4. `stale` → render the remembered list WITH a visible stale marker
     (vocabulary is remembered from an earlier read; the registry could not be
     read just now). The dropdown stays: the server re-resolves fresh at PUT
     and 422s anything gone — safe by construction; say so in a comment.
- D-12 (embedded law): user-visible copy carries NO internal identifiers — no
  phase names, no `F156`, no ADR/RULE numbers, and not the word "floor" as
  jargon. Bilingual TR/EN in the panel's existing `t(tr, en)` voice. The
  standing `voiceGate` test will red you if you slip; write the copy to pass
  it on the first run.
- Empty-registry ≠ empty-backends: the existing "no backends registered" row
  is a different fact and stays untouched.

### 5 · Echo surfaces — every mimic of the old shape turns in this phase
`src/dev/AdminPreview.tsx` (the trust fixture — note its current placeholder
metrics are nonsensical `read`/`write` strings; replace with a realistic
two-backend fixture exercising states 1 and 2), plus the three test files
that mock the flat shape: `backendTrustPanel.test.tsx`,
`dataAuthorityBridges.test.tsx`, `navStackIntegration.test.tsx`. STEP-1 sweep
(below) may find more — every reader of the GET response converts; zero flat
readers survive (pin with a grep-style structural test if practical, otherwise
record the sweep result in the report).

### 6 · Proofs in-tree
- Behavioural tests for all four render states.
- A mutation-class control: collapsing state 2 into state 3 (or deriving
  `readOk` from `source`) must RED a named test — a detector that cannot fail
  is not a detector.
- The parallel-map key-set pin (§2) and the type pin (§3).

## STEP 1 — RECON, before any edit (S65-1)

From your fresh clone, derive and record in the report:
(a) `git rev-parse origin/master`; (b) every reader of the GET
`/api/admin/backend-trust` response across `src/**` and tests (the Architect's
list above is 6 files — DO NOT TRUST IT, derive); (c) every consumer of
`MetricRegistryResolution.source` (Architect counted 5 production sites —
derive); (d) whether any pre-commit-diff/modal path in the panel reads the
flat field beyond line ~337 (the Architect saw one read site + one comment —
derive); (e) baseline test-file count and drift-gate state. Any divergence
from this prompt's premises: STOP, report, wait.

## GATES (all must be green before the report)

`typecheck` (src) AND `typecheck:api` (separate projects, both) · full test
suite · `check:tenant-zero` · `check:doc-drift` — `api/cwf/_lib/**` is a
mapped area, so expect drift: reseal is expected HASH-ONLY (an additive
response field and client rendering add no topology node, authority, table,
gate or endpoint); docVersion SET explicitly to **rev 230** (S90-1 — set,
never inherit). If the drift gate demands a REDRAW, stop and report — that
means the change grew past this prompt's altitude.

## WHAT DONE MEANS (S93-1 · S63-1 — named now, executed at GO)

"Built" is not done. This phase births a measurement organ (the per-backend
registry-state read on an actuator surface) and S93-1 requires its first real
measurement inside the phase's own lifecycle: the post-deploy proof is that
the LIVE panel shows `armes` in state 1 (its published trio + grants) while
`machine-knowledge-base` and `superset` show state 2 ("publishes no metrics")
— three backends, visibly DIFFERENT truthful states, owner browser witness.
If any backend unexpectedly renders state 3 live, that is a real finding, not
a rendering bug — report it, do not paper it. The merge itself happens only
on a later Architect GO relay after RULE-25 review; this prompt does NOT
authorize a merge.

## DELIVERABLES (A2 — all four, none optional)

1. Branch `phase/trust-panel-per-backend-1` **pushed to origin**.
2. Report at **`docs/relay/PHASE-TRUST-PANEL-PER-BACKEND-1-report.md`**
   (committed on the branch): recon results (a)–(e) · design choices made
   where this prompt delegated them (`backendIds:[]` / `EMPTY_METRIC_REGISTRY`
   readOk value; the §3 type-pin mechanism) · the four-state copy as shipped
   (TR+EN) · gate outcomes incl. reseal tab list · test counts before/after ·
   any deviation, NAMED, with reasoning — a silent deviation is a fence
   violation.
3. **A PR against master** so CI runs on the PR head (S37-2: that unsharded
   run is the sole test arbiter; the Architect queries it by full 40-char SHA).
4. STOP after push+PR+report. No merge, no master commit, no second phase.
