# PHASE-RELAY-AUDIT-GATE-1 · v1 — Wave 3 · Lane AG-3 (C) · Item #8 (BUG-016)

<!-- Self-contained (S54-3 / D-2). You cannot see the Claude project; everything
     you need is in this file + the repo. This phase builds the MECHANICAL
     relay auditor for the PROCESS class of defect: a live-system claim written
     from memory/documents with no reading behind it. The defect's subject is
     the ARCHITECT — this tool audits the Architect's artifacts. -->

## PRECONDITION (S47-1)
Fresh FULL clone of `maymun207/cwf_yaprak`, branch from `origin/master`.
Wave-3 floor at prompt time: `1b7f8dd9490b8943e730e4e4175223385ec54dae`.
If master has moved (sibling lanes merge this wave, order = whoever is ready):
rebase and re-run. Absolute paths everywhere (S80-1).

## THE DISEASE (owner-ruled record)
BUG-016, PROCESS class: an unread claim about the live system, in prose no gate
inspects. Closure proof (owner's ruling, binding): MECHANICAL control over
relay artifacts — if a production-behaviour claim in a phase prompt / GO block
carries neither an in-message command output nor an explicit "not read" marker
→ RED; a phase prompt without a falsifier section → RED; D-5 both directions;
the class retires only after **10 consecutive exemption-free relays** (a
counter, NOT this merge). **Owner's finish definition (verbatim):** "Architect
bana bir şey söylediğinde, o cümlenin arkasında ya bir okuma var ya da
'okumadım' yazıyor — üçüncü ihtimali sistem kabul etmiyor."
Free-prose claim detection is not mechanizable; therefore the auditor enforces
a STRUCTURE that makes unread claims mechanically visible. That inversion is
the design.

## GRAMMAR v1 (what the auditor enforces)
A GOVERNED relay artifact is any file whose first 3 lines contain the header
`<!-- relay-audit: v1 kind=<prompt|report|go> -->`. Rules by kind:
- **all kinds:** must contain a `## CLAIMS` section holding a markdown table
  whose rows are `| <claim text> | READ: <command> | <anchor> |` or
  `| <claim text> | NOT-READ | <reason> |`. `<anchor>` names a fenced block in
  the same file (```evidence:<anchor-id>) containing the command's output, or
  says `inline` when the output is in the command column itself.
- **kind=prompt:** additionally requires `## PRECONDITION` and `## FALSIFIER`
  sections (non-empty).
- **kind=report:** additionally requires a `## DIFF` section containing a
  fenced `git diff --name-only` block.
- **kind=go:** additionally requires the literal marker `TAIL-ANCHOR:` on some
  line.
- **Tripwires (the mechanical teeth):** OUTSIDE the CLAIMS table and
  evidence/diff fences, any of these → RED with file:line —
  (a) a bare 7–40 char hex token, (b) `rev <digits>`, (c) `<digits> test` /
  `<digits> migration` / `<digits> ADR` (case-insensitive, Turkish plural
  variants `testler/migrationlar` included). This forces every live-state
  number/hash through the CLAIMS table where its basis is declared. False
  positives are resolved by moving the sentence into CLAIMS, never by widening
  the grammar.

## GOALS

**G1 — The auditor (`scripts/relayAudit.ts`, new).**
- `node --import tsx scripts/relayAudit.ts <file...>` → per-file verdict lines
  + exit 0 only when every file passes; exit 1 on violation (each named with
  rule id + line); NO database access of any kind (this is a pure file tool —
  no env, no fence banner, C1 trivially).
- `--self-test`: runs the auditor over EMBEDDED in-memory samples — one
  compliant per kind (must pass) and one violating per rule (must fail) — and
  prints `[SelfTest] red=proven green=proven`, exiting non-zero if any
  direction fails. (Same convention AG-2 is building this wave, implemented
  HERE independently — do NOT import AG-2's in-flight files; enrollment into
  their registry is a named one-line follow-up after the wave, not your job.)

**G2 — The CI gate (`api/cwf/__tests__/relayAuditGate.test.ts`, new).**
Runs under normal vitest (NO workflow edits, NO package.json edits — both are
single-writer resources you must not touch). For every file under
`docs/relay/**.md`:
- header present → grammar must pass;
- header absent → the path must appear in the frozen exemption file
  `docs/relay/RELAY-AUDIT-EXEMPT-HISTORY-v1.txt`, else RED.
You CREATE the exemption file this phase by ENUMERATING the current inventory
with `ls` (compute, never recall; it was 74 files at the wave floor — verify
your own count and record it). **Append four future paths by name** (they are
this wave's sibling reports, being written in parallel and unable to adopt a
grammar born beside them):
`PHASE-TOOL-BEHAVIOR-CENSUS-1B-report.md`,
`PHASE-HARNESS-HONESTY-GATE-1-report.md`,
`PHASE-FRAME-FORCEFIT-LENS-1-report.md`, and your own
`PHASE-RELAY-AUDIT-GATE-1-report.md`. The file header states: FROZEN — future
additions are forbidden (a new headerless relay file must instead carry the
header); Wave-4 artifacts onward are governed.
- Coverage in both directions is part of the gate: a fixture "new file, no
  header, not in list" must redden; a listed historical file without header
  must pass.

**G3 — Fixtures (`api/cwf/__tests__/fixtures/relay-audit/`).**
One compliant artifact per kind; one violation fixture per rule (missing
falsifier, missing claims, claim row with neither READ nor NOT-READ, bare hash
tripwire, `rev` tripwire, count tripwire, missing diff in report, missing
tail-anchor in go). The gate test drives the REAL auditor over these — D-5
both directions inside the phase.

**G4 — Operating doc (`docs/relay/RELAY-AUDIT-GRAMMAR-v1.md`, headered,
kind=report-exempt? NO —** give it the `kind=go`? Neither: it is
documentation, and documentation about the grammar must itself satisfy the
grammar it can satisfy — give it the header with `kind=report` and a CLAIMS
table whose only row is `| this document defines grammar v1 | NOT-READ |
definition, not observation |`, plus an empty-but-present DIFF fence noted
`not applicable`. If that bends your G1 rules, tighten the DOC not the
grammar, and record the choice in your report.) Contents: the grammar, the
exemption-freeze rationale, the 10-consecutive-relay closure counter and who
keeps it (the Architect's register — this merge does NOT close BUG-016).

## OUT OF SCOPE (do not touch)
`package.json` · `vercel.json` · `.github/workflows/**` ·
`supabase/migrations/**` (ZERO migrations this lane) · `shared/**` ·
`api/cwf/_lib/**` · `scripts/` files other than `relayAudit.ts` (checkTenantZero
and harness files are AG-2's; lens files are AG-4's; census files are AG-1's).
Your diff must not intersect theirs.

## SEAL LAW (S95-1 + Footgun-6)
Never bump docVersion during build. Report the honest `npm run check:doc-drift`
state. If red from your own files: ONE provisional reseal as the last build
commit, `chore(seal): PROVISIONAL reseal for CI — DROP AT MERGE`; dropped and
re-pressed at merge turn by the wave procedure. AG-1 holds the seal token.

## DELIVERY (S91 completeness gate)
- Branch **`phase/relay-audit-gate-1`** · PUSH to origin · open a **PR against
  master** (CI on the PR head arbitrates, S37-2).
- Report: **`docs/relay/PHASE-RELAY-AUDIT-GATE-1-report.md`** (listed in your
  own exemption file — say so) with: `git diff --name-only
  origin/master...HEAD` VERBATIM in a fence · your computed exemption count vs
  the floor's 74, stated as a read · the machine-verifiable birth proof as ONE
  command (`npx vitest run api/cwf/__tests__/relayAuditGate.test.ts`) whose
  fixtures demonstrate red↔green both directions, plus
  `node --import tsx scripts/relayAudit.ts --self-test` output pasted · the
  named follow-ups (enrollment into AG-2's registry; Wave-4 governance start;
  the 10-relay counter's owner) · any deviation, by name.
- Then **STOP**. No merge without the Architect's GO.

<!-- END · PHASE-RELAY-AUDIT-GATE-1-v1 -->
