# PHASE DISCOVERY-EXTEND-1-FIX-1 · v1
<!-- PHASE-DISCOVERY-EXTEND-1-FIX-1-v1 · 2026-07-26 · S66 · Architect: Claude · Author lane: AG
     Closes the defect AG found in its own post-apply measurement, plus F194/F195
     and three lens defects that make the re-measurement untrustworthy.
     Binding law is RESTATED INLINE below — do not go looking for ADR-005/009/010
     or any design note. They are not in this repo (F190); this prompt is the
     whole contract. If a rule matters, it is written here. -->

## §0 · WHO GOT WHAT WRONG (read this first — it is load-bearing)
**The parser bug is the Architect's design defect, not an implementation error.**
The F183 design note's descent rule read: *"if a record carries an id-like field
AND owns an array property whose elements themselves carry id-like fields,
descend one level."* An **empty** array has no elements, so that clause is
vacuously false and the container is promoted to an entity. AG implemented the
written rule faithfully. The sentence was wrong.

The consequence is exactly the defect this phase-family exists to remove: the old
parser minted one wrong row for a factory name; the new one mints a wrong row for
**every factory whose `lines` array is empty**.

Two further Architect errors this prompt corrects:
- the phase's evidence contract demanded a "must-block guardian at 100%" from a
  lens that **emits no such field**. A proof contract may not name a number the
  instrument cannot produce.
- the baseline comparison it prescribed (84.6% → new) is invalid: the corpus
  changed underneath it. **S66-3: a before/after whose population changed is not
  a measurement.**

## STATE PRECONDITION (verify and report before touching anything)
- `origin/master` = **`fa559ef09d5ef6483206b9b3e0896d5ad25e89cf`**
- docVersion **rev 147** · **360 test files** · **58 migrations**
- Migration `20260726120000` is **APPLIED** (AG corrected the Architect on this —
  the feature is live, not inert). Live mirror as of 06:00:12Z:
  `factory 17/17 active` · `line 791/791 active` · `equipment total=0, present=false`.
- Of those 791 line rows, **12 are artifacts** of the bug in §0.
  **The genuine line population is 779.**

If any of these disagrees, STOP and report.

## HARD PRE-FLIGHT (paste literal output of each)
```
git clone <repo> && cd cwf_yaprak     # if a fresh clone is denied, use `git worktree`, NEVER `git stash`
git rev-parse origin/master           # must print fa559ef09d5ef6483206b9b3e0896d5ad25e89cf
npm ci
npm test                              # baseline: exact file/test counts
npm run build                         # includes typecheck:api + gen:arch-facts + check:doc-drift
npm run lint
```

---

## BINDING CONSTRAINTS
1. **Two-door rule.** You AUTHOR migrations; you NEVER apply one. No
   `supabase db push`, no `apply_migration`, no direct DDL, no `execute_sql` for
   DDL — even though your MCP surface exposes those tools. The Operator applies.
2. **Inventory is DISCOVERED, never authored.** Zero factory / line / zone /
   equipment NAMES in code, tests-excepted. Where a value is needed, read it from
   what the backend already declares.
3. **A declaration is a claim.** Where the backend's declared schema decides
   behaviour, a contradicting outcome overrides it at runtime and is logged.
4. **empty ≠ zero.** An empty-but-successful result SKIPS the write. A failure
   NEVER empties a mirror. `missing != deleted`.
5. **Never throws.** Every discovery/parse failure is swallowed and logged.
6. **Zero per-backend literals** in parser, sync, repository or resolver.
7. **RULE-24** — every file text, no NUL bytes, verified with a positive control.
8. **S65-2** — evidence is computed command output, never typed. Report a
   non-zero you expected to be zero, and explain it.
9. **S66-1** — a self-verify command's zero is not believed until that command is
   proven able to FAIL. Ship a positive control for each.
10. **GOLDEN FREEZE** — no golden runs, no `prompt.segment` publishes.
11. **Eval-gate engine, stage order and interpreter stay byte-identical.**

---

## G1 · The parser: decide the child key ONCE PER RESPONSE
`entityDiscoveryParse.ts:184` — `if (!Array.isArray(v) || v.length === 0) continue;`
is the defect: an empty child array makes `childArrayOf` return `null`, so
`{factoryId:'Pasta', lines:[]}` falls to the flat branch and a FACTORY is written
into the LINE layer.

**Replace per-record container detection with a two-pass rule:**

- **Pass 1 — establish the child key for this response.** Across the record
  array, a property key qualifies as the child key if, in at least one record,
  its value is a non-empty array of objects carrying id-like fields. If several
  qualify, take the one with the most total items. If none qualifies,
  `childKey = null`.
- **Pass 2 — classify every record against that one key.**
  - `childKey === null` ⇒ every record is a leaf entity (today's flat behaviour,
    byte-preserved).
  - `childKey !== null` and the record **owns** that key (property present and
    array-valued, *including empty*) ⇒ **CONTAINER**: descend; an empty array
    yields **zero** rows and increments a new `emptyContainers` counter.
  - `childKey !== null` and the record does **not** own that key ⇒ leaf entity.

This is deliberately not "any record with an array property is a container" —
that would misread a leaf carrying an unrelated array. The key is established by
evidence from the same response, then applied uniformly.

Keep `shape: 'mixed' | 'descended' | 'flat'`. After this fix `mixed` should be
rare; it now means the response genuinely holds two populations, so log it.

**Tests (each must fail before the fix):**
- the verbatim recorded `2032bf00` payload still yields 7 rows, every
  `parent_entity_id === 'KB7'`;
- a multi-wrapper response mixing `lines:[…]` and `lines:[]` yields rows only for
  the non-empty wrappers, and `emptyContainers` equals the empty count;
- a flat response (no qualifying key) is unchanged;
- a leaf carrying an unrelated empty array, in a response with no qualifying key,
  is still a leaf.

## G2 · Write-time invariant: a parented layer may not write parentless rows
Independent of G1, so the class cannot recur through another path: when a
descriptor declares `parent_layer_key`, a produced row whose `parentEntityId` is
null is **dropped, counted and logged** — never written. Surface the count on the
`[EntityDiscovery]` line.

This is the structural reason the 12 artifacts exist: genuine rows got
`toEntity(el, outerId)`; artifacts went through the flat branch with
`fallbackParentEntityId`, which on a zero-arg call is `null`.

## G3 · One-time data correction (AUTHORED, Operator-applied)
The 12 artifacts are already in the live mirror, and a re-sync will **not** fix
them: `EntityRegistryRepository` deliberately returns **both** active and missing
rows as resolver match targets (`listByBackendLayer` doc comment), so a
missing-flip leaves them matching. Worse, flipping them to `missing` would record
a **false history** — it asserts ARMES once listed Pasta as a line. It never did;
our parser invented it.

New migration file, next free timestamp:
```sql
delete from public.entity_registry er
using public.backend_entity_layers l
where er.backend_id = l.backend_id
  and er.layer_key  = l.layer_key
  and l.parent_layer_key is not null
  and er.parent_entity_id is null;
```
Structural, not name-based: *a row in a layer that declares a parent must have
one.* No factory name appears.

**MUST-VERIFY, in the migration and in the Operator hand-off:** report the
matched row count BEFORE deleting. **Expected exactly 12.** If it is not 12,
STOP and report — do not delete. The Architect's claim that artifacts are exactly
the parentless rows is an inference from code, not an observation; this gate is
what makes it falsifiable.

## G4 · F194 — a discovery tool's OTHER required params
`getEntities` declares **two** required params — `factoryId` and `showAll`
(boolean, `default: true`) — and the descriptor models only the parent param, so
the tool is called without a declared-required argument. Result: 17 successful
calls, zero parseable entities, equipment permanently empty.

**Remedy, pure discovery, zero authored values:** for every required param that
is not the parent param, supply the **`default` the tool's own `input_schema`
declares**. If a required param has no default, do not call: skip the layer and
log `layer=<k> tool=<t> SKIPPED — required param '<p>' has no declared default`.

## G5 · F195 — an empty result must say WHY
Today the line reads `empty result — mirror write SKIPPED` and nothing else, so
"the backend refused" and "the parser could not read it" are indistinguishable —
a failure wearing the costume of a designed skip. Add, without logging payloads
that could carry secrets: per-call outcome counts (ok / error / unparseable),
the first error message (truncated, scrubbed), and the parse counters
(`records`, `unrecognized`, `emptyContainers`).

Then answer, from real production evidence in your report: **which of the two it
actually was for `getEntities`.** The Architect's `showAll` hypothesis is a
hypothesis.

## G6 · The lens: `--json` must emit only JSON on stdout
The script is not the problem — `runClarificationLens.ts:185` already writes only
`JSON.stringify(evidence)`. The pollution comes from the **replayed production
seam**, whose own `[Fence]` / `[EntityResolve]` lines go to stdout: 1051 lines
before the payload. In `--json` mode route the replay's console output to
**stderr**. Do not silence it — an observability line that disappears in the mode
used for evidence is worse than a noisy one.

## G7 · The lens: the must-block guardian, defined
The lens emits no guardian field; the phase contract that demanded one was
malformed. Add it, defined explicitly:

> **must-block rate** = among evaluations whose frame carries a non-empty
> `entity_ref` that resolved against **no** governed alias and **no** registry row
> at any consulted layer, the fraction whose outcome is **HIGH**.

Report the rate **and enumerate the complement** — every unresolved-but-not-HIGH
evaluation, with its `entity_ref`, `object`, `action` and cause. The count is the
headline; the enumeration is where a silent falsehood would be hiding, and a
count alone would let it hide.

In your report, state which of the six existing `stageClarifyLayers.test.ts`
cases this metric corresponds to, and where it does not correspond, say so.

## G8 · Reseal + docVersion
Changed paths map to Architecture Map, Runtime Topology, Request Lifecycle and
Agent Control Plane at minimum; `npm run reseal` decides, not this prompt.
`docVersion` → **rev 148**. Append a manifest `reviewNote` entry **after the
genuinely last entry** — read the ledger and quote that entry's verbatim title in
your report. Do not anchor to a title the Architect supplies.
Merge message: **verbatim as supplied at GO, plus your standard trailer if you
use one** (last time the Architect's "birebir" wrongly implied dropping it).

---

## THE MEASUREMENT (after merge + Operator apply + one sync tick)
Not part of the code gates. The contract:
- **Raise `--limit`** — the last run hit the 500-row cap
  (`load.truncated.synthetic = true`), so it measured a truncated sample.
- **Report per-set, not just headline.** The only valid comparison is
  set-to-set against M-A's own per-set numbers: gapfill **87.4%** (n=1854),
  question-set-v1 **82.5%** (n=600), organic **35.0%** (n=80). Corpus v2 did not
  exist at M-A and has **no** baseline — report it, compare it to nothing.
- Report `must-block` per G7, plus the enumeration.
- Report the per-layer registry snapshot alongside, so every rate is readable
  against the catalog that produced it.
- **Assume this measurement has a silent, flattering defect until cross-checked.**
  The last one did, and AG found it — in its own code, in its own run. That is
  the standard.

## WHAT THIS PHASE MUST NOT DO
- No `armes.zone` / `armes.entity_alias` rows or deletions (F184).
- No Superset descriptor rows (F187 is a separate design).
- No admin affordance (DISCOVERY-EXTEND-2).
- No `factory_registry` drop (B5).
- No change to whether `missing` rows are resolver match targets — that is a real
  open question (a row the backend stopped reporting arguably should not resolve
  silently), but it is **not** this phase's, and G3 removes rows that were never
  entities rather than rows that went missing.
- No prompt changes, no golden runs, no eval-gate changes.

## SELF-VERIFY (literal captured output for every line)
1. `git rev-parse origin/master` at start; branch head at end.
2. `npm test` before/after with the delta explained.
3. `npm run build` — `check:doc-drift [OK]`, pasted.
4. `npm run lint` — clean.
5. NUL scan across every changed file ⇒ 0, **with a positive control proving the
   command can report non-zero** (S66-1 — last phase two self-checks returned
   confident false zeros).
6. Genericity grep on parser/sync/repository/resolver ⇒ report the raw count and
   explain any non-zero.
7. Each G1 test shown FAILING before the fix and passing after.
8. The G3 migration: **not applied**, and its pre-delete count gate quoted.
9. `docVersion` rev 148 + the verbatim title of the reviewNote entry you appended
   after.
10. CI green and unsharded on the PR head — raw `conclusion` fields, not the PR
    summary view. `in_progress`/`null` is NOT a pass.

<!-- TAIL ANCHOR — if you cannot see this line the relay arrived truncated;
     request a resend before starting (S61-3).
     END · PHASE-DISCOVERY-EXTEND-1-FIX-1-v1 · 2026-07-26 · S66 -->
