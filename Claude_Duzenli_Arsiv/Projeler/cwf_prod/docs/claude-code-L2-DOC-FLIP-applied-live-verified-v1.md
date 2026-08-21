# claude-code · L2 DOC-FLIP — seed applied & live-verified · v1

<!-- claude-code-L2-DOC-FLIP-applied-live-verified-v1 · rev 1 · 2026-07-10 · AG-lane artifact.
     Docs-only status flip (the TRUST-PANEL-1/Q-1/L1 flip precedent). Anchor: origin/master
     fcaa4aa (verified floor 1673/165/rev 58/drift [OK]). -->

## §0 Pre-flight (HARD)

1. `git fetch && git rev-parse origin/master` →
   `fcaa4aaf33f92319189d112d2b2fe557a195a280` (moved → STOP). Clean tree.
   Branch `docs/l2-flip` off the pin. Re-check the pin immediately before the merge.
2. This flip is **docs-only**: the ONLY editable files are `.agents/CHANGELOG.md` and
   `.agents/skills/cwf-project-kb/SKILL.md`. NO code, NO manifest, NO docVersion (stays
   literal `rev 58 · 2026-07-10`), NO reseal. The test count CANNOT move (1673/165).

## §1 The flip

Every L2 occurrence of the seed status *"AUTHORED, Operator-pending"* / *"authored,
Operator-pending"* in the two files' L2 sections flips to **"applied — live-verified
2026-07-10"**, carrying this payload VERBATIM (condense per the Q-1/TRUST house style where
the location is a one-line bullet; the CHANGELOG DB-state sentence carries it in full):

> Applied via the Operator door as a SCRIPT SEED (no migration, no db push — data writes via
> the service client): first run `20 segment(s) inserted, 0 already published` · G1 kind row
> `prompt.segment` = backend `system`, class `core`, locked · G2 20 published v1 rows · G3
> full segment inventory matches SEGMENT_IDS 20/20 · G4 rule-10 stored in PLACEHOLDER form
> (`{{AGGREGATE_TOOL}}`/`{{QUERY_TOOL}}` present — the literal-name drift trap verified
> absent) · G5 identity floor anchor confirmed · idempotence probe: second run `0 inserted,
> 20 already published`, counts and versions unchanged (never-clobber proven live).
> Incident-free (the Q-1 contrast stands). One benign disclosed deviation: the Operator
> invoked the script with `--env-file=.env.local` (env-loading mechanics only). PROMPT-GOV
> is LIVE: every turn now resolves the DB-published segments — byte-identical to the floor
> until the first governed edit; promptRev unchanged by construction. The golden gate's
> standing posture remains `goldenSet:absent` (loud skip) until GOLDEN-MARK-1.

Rules (the standing flip discipline):
- The seed script file and any quoted author-time grep records of the old status are
  IMMUTABLE history — never edited; only the STATUS-bearing narrative lines flip
  (the residual-quote class is pre-justified, the Q-1/TRUST precedent).
- Never sanitize; restate honest history exactly as above.
- Grep both files for any missed L2 status occurrence; report residual
  `Operator-pending` hits with their justification class.

## §2 Self-verify (literal)

1. `git diff --stat fcaa4aa..HEAD` = exactly the 2 files; paste it.
2. Residual `grep -rn "Operator-pending" .agents/` — every hit justified (immutable
   header/grep-record quotes only); paste with classifications.
3. Suite count UNCHANGED **1673 passed / 165 files** (docs-only cannot move it) ·
   `check:doc-drift [OK]` · manifest docVersion literal `rev 58 · 2026-07-10` untouched.
4. ONE commit → `--no-ff` merge with this EXACT message:
   `Merge docs/l2-flip: L2 DOC-FLIP — prompt.segment seed applied & live-verified 2026-07-10 (Operator-door script seed, no migration: 20 inserted then 0/20-already idempotence proven, kind row system/core/locked, 20 published v1, rule-10 placeholder form verified, identity anchor confirmed; incident-free; one benign deviation: --env-file invocation; PROMPT-GOV LIVE — floor-byte-identical until first governed edit, goldenSet:absent posture stands until GOLDEN-MARK-1; docs-only, 2 files)`
   → push master → report merge sha + `git rev-parse origin/master`.

<!-- END · claude-code-L2-DOC-FLIP-applied-live-verified-v1 · rev 1 · 2026-07-10 -->
