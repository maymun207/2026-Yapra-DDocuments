<!-- relay-audit: v1 kind=card -->
# CARD-AUTHORITY-MATRIX-RULED-1 · v1 — make the authority matrix say what the owner ruled, remove the calendar gate, and author the reply_authority migration file

The owner ruled on the seven conformance disagreements this morning (`OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1`, on the bus in the foreman box; also in the project box). Six of the seven are the MATRIX being wrong about a design the owner has fixed; one (#6) is a live-versus-source drift closed by a migration. Separately, the P7D freshness bound is REMOVED by ruling. This card does all of that in ONE branch, as a PRODUCER card for AG-4. It authors a migration FILE and NEVER applies it: under RULING 1, only the Operator (Gemini, `supabase db push`) applies migrations — an AG lane that runs `db push` or `apply_migration` has crossed the fence.

## PREMISE

MEASURED: 2026-09-04T06:3xZ, `scripts/authorityMatrix.mjs` at the shared clone's HEAD (649 lines) — `ROLES` binds foreman to `claimShape: /^UB-[0-9]+$/`, producer to `/^AG-[0-9]+$/`, scout to `/^scout(?:-[0-9]+)?$/`; its header comment cites "the owner's S118 ruling that roles must be a MATRIX, not an ordinal convention" and says plainly "NO LIVE ADDRESS MATCHES `UB-*` TODAY". Lenses emit SHAPE-DECIDES-CLAIMABILITY-NOT-ROLE, ROLE-SHAPE-UNSATISFIED, CLAIMABILITY-DISAGREES, ROLE-BINDING-IS-A-CODE-LITERAL, BUS-ADMITS-AN-AUTHOR-THE-VERB-REFUSES, REPLY-AUTHORITY-DRIFT, BOOT-PROSE-BINDS-ROLE-TO-ORDINAL. `snapshotVerdict` (lines ~495–533) parses `freshnessBound` (`P7D`) and returns FRESH/STALE/MALFORMED; `conformanceVerdict` short-circuits to COULD-NOT-RUN on a non-FRESH snapshot.
MEASURED: 2026-09-04T06:3xZ, `api/cwf/__tests__/authorityMatrix.test.ts` (358 lines) — describe "the snapshot is present, well-formed and fresh" (lines ~194–228: FRESH assertion, absent, STALE, MALFORMED falsifiers); describe B "the comparison fires on each claim the card names" (claims 1–3 + drift + a falsifier that fails "on a clean board"); describe C (REPORTED expected at ~320; FALSIFIER 1 at ~324 expects CLEAN_BOARD for empty findings; FALSIFIER 2 expects COULD-NOT-RUN for absent/stale).
MEASURED: 2026-09-04T06:3xZ, `docs/ground/authority-live.snapshot.json` carries top-level `"freshnessBound": "P7D"` and `stamp.measuredAt`.
MEASURED: 2026-09-03T14:2xZ (the investigation, re-quoted): live `relay_inbox_reply_authority` = `CHECK ((direction = 'to_lane') OR (lane_addr = ANY (ARRAY['operator','scout'])))`; migration `20260813110000_relay_inbox.sql:141` declares `check (direction = 'to_lane' or lane_addr = 'operator')`; no later migration adds scout to THIS constraint. The precedent file for the same class is `20260824210000_relay_inbox_lane_addr_drift.sql` (drop-by-name, recreate, OPERATOR-PENDING header).
MEASURED: 2026-09-04T06:21Z, master is the PR 488 merge (`master` fence); the matrix files above are unchanged by PR 488 and PR 489 except the two ground files, so the shared clone's copies are current for the source files and the snapshot.
DECAYS on any push to master touching `scripts/authorityMatrix*`, the test, `scripts/laneRoster.mjs`, `scripts/factoryState.mjs`, or `supabase/migrations/`. ORDER A re-reads them from your fresh branch off the `master` fence value.
ON-DISAGREEMENT: if the live constraint no longer reads as quoted (re-measure it with the read-only path before writing the migration), or if `ROLES`/the lenses/the test do not read as described — STOP and report with the bytes. If your re-measure differs from any line here, THE MEASUREMENT WINS.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is the PR 488 merge and the branch is cut from it | MEASURED: 2026-09-04T06:21Z, foreman ORDER C on PR 488 | master |
| the matrix expects a foreman UB- shape, a claimable scout, and a role-not-literal binding; the owner ruled all three the other way | MEASURED: 2026-09-04T06:3xZ, authorityMatrix.mjs ROLES + lenses; the ruling text in the `ruling` fence | ruling |
| the freshness bound is a top-level snapshot field and three test assertions plus a verdict short-circuit depend on it | MEASURED: 2026-09-04T06:3xZ, the snapshot json, snapshotVerdict, conformanceVerdict, test lines ~194–228 and ~331–342 | — |
| reply_authority live admits operator+scout; the migration history declares operator only | MEASURED: 2026-09-03T14:2xZ, pg_constraint vs the migration file; ORDER D re-measures live | drift |
| whether the corrected matrix reports zero disagreements against a fresh snapshot | NOT-READ | — |

```evidence:master
origin/master after PR 488, the foreman's ls-remote read-back:
    1dceed1ceaaf970085e13463215b53134ff733a8
```

```evidence:ruling
OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1, the dispositions this card implements:
  RULING 2  scout takes NO address — the code (laneRoster: has a box, never claimable) is right; the matrix is wrong.
  RULING 3  foreman address is FIXED: AG-5. No UB- shape. No redesign. The AG-5 literal in factoryState.mjs and
            foreman.md IS the design. Operator and scout author reports WITHOUT holding an address or a nonce, by design.
  RULING 4  the P7D freshness bound is REMOVED entirely. measuredAt stays as provenance (a date is a fact; an expiry is a rule).
  RULING 1  migration authority is GEMINI, full stop. An AG authors the file; only the Operator applies it.
The module's header cites "the owner's S118 ruling that roles must be a matrix, not an ordinal convention".
RULING 3 supersedes it; the comment is rewritten to cite OWNER-RULING-S130 and to say S118 was superseded, not erased.
```

```evidence:drift
live  relay_inbox_reply_authority   CHECK ((direction = 'to_lane') OR (lane_addr = ANY (ARRAY['operator','scout'])))
tree  20260813110000_relay_inbox.sql:141   check (direction = 'to_lane' or lane_addr = 'operator')
precedent for the fix  20260824210000_relay_inbox_lane_addr_drift.sql  (drop constraint if exists by name; add constraint; OPERATOR-PENDING header)
```

## ORDER A — BRANCH, IN YOUR OWN WORKTREE
`phase/authority-matrix-ruled-1` off the `master` fence value, in an exclusive worktree (S98-L1). Never the shared clone's main tree (it carries a dirty `docs/ground/authority-conformance.latest.md`, now two landings behind; do not touch it). Commit subjects begin `PHASE-AUTHORITY-MATRIX-RULED-1 AG-4:` — the token BEFORE the first colon, every commit, so lens one is unanimous and lens two is not load-bearing (F-S130-LENS-TWO-LOAD-BEARING-1).

## ORDER B — THE MATRIX SAYS THE RULED DESIGN
In `scripts/authorityMatrix.mjs` (and its `.d.mts` if types change):
- `ROLES.foreman.claimShape` → the fixed address: `/^AG-5$/`. `ROLES.producer.claimShape` → every other producer address: `/^AG-(?!5$)[0-9]+$/`, so `rolesClaiming('AG-5')` returns exactly `['foreman']` and no collision finding is manufactured. `ROLES.scout.claimShape` → `null` (has a box, never claimable), with `why` rewritten to say so.
- The lenses: SHAPE-DECIDES-CLAIMABILITY-NOT-ROLE, ROLE-SHAPE-UNSATISFIED, ROLE-BINDING-IS-A-CODE-LITERAL and BOOT-PROSE-BINDS-ROLE-TO-ORDINAL now describe the RULED design, not a defect. Do not delete the lenses — INVERT their sense where the ruling makes the measured state the expected one (the foreman literal AG-5 in factoryState.mjs and foreman.md is EXPECTED; a change away from it becomes the finding), and retire the two that have no ruled expectation left to compare (SHAPE-DECIDES…, ROLE-SHAPE-UNSATISFIED) with a comment naming the ruling. CLAIMABILITY-DISAGREES stays and must now read AGREEMENT for scout. BUS-ADMITS-AN-AUTHOR-THE-VERB-REFUSES: the ruled expectation is exactly that operator and scout may author reports without a nonce — invert to a finding only if the bus STOPS admitting them or the verb STARTS accepting them. REPLY-AUTHORITY-DRIFT stays exactly as is: it compares the migration text to live and is what ORDER E's file closes.
- Rewrite the header comment: cite OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1 by name; state that the S118 "matrix, not ordinal" ruling is SUPERSEDED by it; keep the history, do not erase it. No number in the comment that is not a ruling number or a date.

## ORDER C — THE CALENDAR GATE IS GONE
- Remove `freshnessBound` from `docs/ground/authority-live.snapshot.json` AND from whatever writes it (`scripts/authoritySnapshot.mjs` — read it first; if it stamps the bound, stop stamping it). Keep `stamp.measuredAt`.
- `snapshotVerdict`: no FRESH/STALE; it verifies PRESENT and WELL-FORMED (stamp, measuredAt parseable, lenses present) and nothing about age. MALFORMED stays for an unreadable `measuredAt`. `conformanceVerdict` no longer short-circuits on age; COULD-NOT-RUN stays for an absent snapshot or an UNMEASURED lens (empty ≠ zero: an unread lens is never a zero finding).
- The test: delete the FRESH assertion and the STALE falsifier; keep the absent-snapshot falsifier and the MALFORMED falsifier (re-pointed at `measuredAt`, since `freshnessBound` no longer exists). `describe C`: with the matrix corrected, the expected verdict against a fresh snapshot is now what the WORLD says — rewrite the REPORTED expectation to assert that the rendered document's finding count EQUALS the comparison's finding count (report fidelity), not that findings are non-empty. FALSIFIER 1 ("a clean board FAILS because agreeing on the first run means it stopped measuring") was true when the matrix disagreed with the world by design; under the ruling, agreement is the truthful state. Re-point FALSIFIER 1 at what it actually guards: a clean board with an UNMEASURED lens must be COULD-NOT-RUN, never CLEAN-BOARD. Keep FALSIFIER 2. Every deleted assertion is named in the commit body with the ruling that deleted it.
- `describe B` claims 1–3 test that the comparison FIRES on the old defects. Under the ruling, claim 1 (shape decides claimability) and claim 2 (code literal) are no longer defects: rewrite each to plant the INVERTED fault (e.g. a factoryState that binds the foreman to something other than AG-5) and prove the lens fires on that. Claim 3 (bus admits an author the verb refuses) is inverted the same way. The drift test stays.

## ORDER D — RE-MEASURE LIVE, REGENERATE, AND READ THE ZERO HONESTLY
Run `npm run authority:snapshot` (read-only path) and the conformance generator. Re-measure the reply_authority constraint live and quote it byte-for-byte in your report. Expected on the corrected matrix: every ruled lens reads AGREEMENT; REPLY-AUTHORITY-DRIFT still reads ONE disagreement until ORDER E's file is applied by the Operator (the migration text still says operator-only). If any lens reads UNMEASURED, the verdict must be COULD-NOT-RUN and you report which lens, not a zero. Run the full vitest suite locally; report `Test Files`/`Tests` lines verbatim.

## ORDER E — AUTHOR THE MIGRATION FILE. DO NOT APPLY IT.
`supabase/migrations/<UTC timestamp>_relay_inbox_reply_authority_drift.sql`, modelled on the lane_addr precedent: OPERATOR-PENDING header naming RULING 1 and the investigation's #6; the live definition quoted byte-for-byte from your ORDER D re-measure; `drop constraint if exists relay_inbox_reply_authority; add constraint relay_inbox_reply_authority check (direction = 'to_lane' or lane_addr in ('operator','scout'))`; a note that applying it against a database that already matches leaves the identical definition in place. `npm run check:migration-versions` must pass. You do NOT run `supabase db push`, you do NOT call any `apply_migration`; the hooks refuse both and that refusal is correct.

## ORDER F — PUSH, PR, REPORT
Push the branch, open a PR to master (title beginning `PHASE-AUTHORITY-MATRIX-RULED-1 AG-4:`), wait for `build (24.x)` to a CONCLUSION and report every context by name with the full forty hex. File from_lane `AUTHORITY-MATRIX-RULED-1-AG-4-report` with: the diff summary per file, the deleted/inverted assertions each paired with its ruling, the ORDER D live constraint quote and conformance result (finding count, verdict, which lens if COULD-NOT-RUN), the vitest summary lines, the migration file path and its sha256, the PR number, the CI verdict, and `read relay_inbox at <ISO>` with what the box holds. Landing is the foreman's under a later card. The Operator's push is Gemini's under a later prompt.

## FALSIFIER
Wrong if master is not the `master` fence value, if the live reply_authority constraint does not read as the `drift` fence, if the matrix/test do not read as PREMISE, or if the corrected matrix still reports any of #1/#2/#3/#4/#5/#7 as a disagreement against a fresh snapshot (then the inversion is wrong — STOP and report which). #6 remaining until the Operator applies the file does NOT falsify the card.

## SHARED SURFACES
Files: `scripts/authorityMatrix.mjs` (+ `.d.mts`), `scripts/authoritySnapshot.mjs` (bound stamping only), `api/cwf/__tests__/authorityMatrix.test.ts`, `docs/ground/authority-live.snapshot.json` and `docs/ground/authority-conformance.latest.md` (regenerated), ONE new file under `supabase/migrations/`. NOT touched: `scripts/laneRoster.mjs`, `scripts/factoryState.mjs`, `.claude/boot/*`, `land.ts`, `.github/`. NO db push. NO apply_migration. NO governed row. NO production traffic. NO push to master.

## DECISION RIGHTS
The owner ruled the design; you implement it. You decide the wording of comments and the shape of inverted falsifiers, nothing about which expectations hold. A lens that still disagrees after inversion is a STOP, not a judgement call. A test that can only pass by deleting a falsifier without a ruling behind it is a STOP.

BODIES: `PLATINUM` · `S37-2` · `S61-2` · `S63-1` · `S98-L1` · `S112-YASA-1` (the ruling is the owner's and is cited by name) · `TOTAL-45` · `empty ≠ zero` · ADR-005 (two-door rule).

fanout: personalized

```deliverables
branch: phase/authority-matrix-ruled-1 — pushed, PR to master open
report: bus row from_lane, artifact_name AUTHORITY-MATRIX-RULED-1-AG-4-report; docs/relay/AUTHORITY-MATRIX-RULED-1-AG-4-report.md in the branch
```

TAIL ANCHOR: CARD-AUTHORITY-MATRIX-RULED-1-v1 ends here.
