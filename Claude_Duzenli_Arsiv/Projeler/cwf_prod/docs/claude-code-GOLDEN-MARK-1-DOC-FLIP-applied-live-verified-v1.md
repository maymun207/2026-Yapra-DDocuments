# claude-code · GOLDEN-MARK-1 DOC-FLIP — migration applied & live-verified · v1

<!-- claude-code-GOLDEN-MARK-1-DOC-FLIP-applied-live-verified-v1 · rev 1 · 2026-07-10 ·
     AG-lane artifact. Docs-only status flip (the L2/TRUST-PANEL-1/Q-1/L1 flip precedent).
     Anchor: origin/master dabc29e (verified floor 1746/168/rev 60/drift [OK]). -->

## §0 Pre-flight (HARD)

1. `git fetch && git rev-parse origin/master` →
   `dabc29e9e42a7e26f1781dd8c308676832c2a888` (moved → STOP). Clean tree.
   Branch `docs/golden-mark-flip` off the pin. Re-check the pin immediately before the merge.
2. This flip is **docs-only**: the ONLY editable files are `.agents/CHANGELOG.md` and
   `.agents/skills/cwf-project-kb/SKILL.md`. NO code, NO migration file (its
   "authored, Operator-pending" header is IMMUTABLE authoring-time history), NO
   `goldenRun.ts`/`goldenSpecimens.ts` docblocks (same class), NO manifest, NO docVersion
   (stays literal `rev 60 · 2026-07-10`), NO reseal. The test count CANNOT move (1746/168).

## §1 The flip

Every GOLDEN-MARK-1 occurrence of the migration status *"AUTHORED, Operator-pending"* /
*"authored, Operator-pending"* in the two files' GOLDEN-MARK-1 sections flips to
**"applied — live-verified 2026-07-10"**, carrying this payload VERBATIM (condense per the
house style where the location is a one-line bullet; the CHANGELOG DB-state sentence carries
it in full):

> Applied via the Operator door (`supabase db push`, one clean run —
> `20260710120000_golden_specimens.sql` the only pending migration): G2 schema-read 6/6
> columns exact (message_id/marked_by NOT NULL uuid · marked_at NOT NULL timestamptz ·
> revoked_by/revoked_at/note nullable) · RLS enabled, ZERO policies, 0 rows (fresh ledger) ·
> G3 privilege-layer confirmed: anon SELECT/INSERT/UPDATE and authenticated SELECT/UPDATE all
> `false` (the REVOKE incl. SELECT landed) · G4 probe first-exercise: live verifyGrants
> **37/37 passed, 0 failed** — the new `golden_specimens` anon-UPDATE probe DENIED (42501)
> on its first-ever run · G5 second `db push` = "Remote database is up to date" (idempotence
> confirmed). Incident-free. Two benign disclosed Operator deviations (env mechanics, the L2
> `--env-file` class): the fresh clone landed in a workspace dir instead of /tmp (IDE sandbox
> constraint; removed after the run), and `.env.local` was copied into the clone to supply the
> probe env. **The golden marking store is LIVE**: the gated `api/admin/golden-specimens`
> endpoint (GOLDEN_CURATE, super_admin) now operates against the real table; the golden set
> is EMPTY, so the L2 publish contract's loud `goldenSet:absent` arm still gates — the
> owner's FIRST mark flips Layer 2 to MANDATORY by construction (publish contract
> byte-untouched). Owner curation (~20 specimens) is now actionable in ReplayTab.

Rules (the standing flip discipline):
- The migration file header and any quoted author-time grep records of the old status are
  IMMUTABLE history — never edited; only the STATUS-bearing narrative lines flip
  (the residual-quote class is pre-justified, the L2/Q-1/TRUST precedent).
- Never sanitize; restate honest history exactly as above (both Operator deviations stay).
- Grep both files for any missed GOLDEN-MARK-1 status occurrence; report residual
  `Operator-pending` hits with their justification class.

## §2 Self-verify (literal)

1. `git diff --stat dabc29e..HEAD` = exactly the 2 files; paste it.
2. Residual `grep -rn "Operator-pending" .agents/ supabase/migrations/20260710120000_golden_specimens.sql api/cwf/_lib/replay/goldenRun.ts api/cwf/_lib/replay/goldenSpecimens.ts`
   — every hit justified (immutable migration header / code authoring-time docblocks /
   grep-record quotes only); paste with classifications.
3. Suite count UNCHANGED **1746 passed / 168 files** (docs-only cannot move it) ·
   `check:doc-drift [OK]` · manifest docVersion literal `rev 60 · 2026-07-10` untouched.
4. ONE commit → `--no-ff` merge with this EXACT message:
   `Merge docs/golden-mark-flip: GOLDEN-MARK-1 DOC-FLIP — golden_specimens applied & live-verified 2026-07-10 (one clean db push; schema-read 6/6 columns, RLS on / 0 policies / 0 rows; privilege-layer anon+authenticated all-false incl. SELECT; probe first-exercise 37/37 with golden_specimens anon-UPDATE 42501-DENIED; second push up-to-date = idempotence confirmed; incident-free, two benign Operator deviations [workspace clone dir, .env.local copy — env mechanics]; MARKING STORE LIVE — golden set empty, goldenSet:absent loud-skip stands until the owner's first mark flips Layer 2 MANDATORY by construction; docs-only, 2 files)`
   → push master → report merge sha + `git rev-parse origin/master`.

<!-- END · claude-code-GOLDEN-MARK-1-DOC-FLIP-applied-live-verified-v1 · rev 1 · 2026-07-10 -->
