# PHASE-FRAME-FORCEFIT-LENS-1 · v1 — Wave 3 · Lane AG-4 (D) · Item #9 (BUG-017 measurement)

<!-- Self-contained (S54-3 / D-2). You cannot see the Claude project; everything
     you need is in this file + the repo. This phase MEASURES BUG-017 — it does
     NOT fix it. Retirement belongs to PACK-FROM-PROTOCOL-1 later; this lens is
     the ruler that will prove retirement when it happens. -->

## PRECONDITION (S47-1)
Fresh FULL clone of `maymun207/cwf_yaprak`, branch from `origin/master`.
Wave-3 floor at prompt time: `1b7f8dd9490b8943e730e4e4175223385ec54dae`.
If master has moved (sibling lanes merge this wave, order = whoever is ready):
rebase and re-run. Absolute paths everywhere (S80-1).

## THE DISEASE (owner-ruled record)
BUG-017: the frame FORCE-FITS a foreign-backend entity onto the nearest ARMES
object and reports high confidence — observed live as
`[Frame] object=LINE entity_ref=[G-03 grove] conf=HIGH basis=keyword`
(trace 9a4f8af8). Rulings, binding: (1) while `router.frameRouting` stays dark
the bug is POTENTIAL — the frame steers nothing; the measurement is still owed.
(2) Closure evidence CANNOT be taken in production; a LENS forces it (the
BUG-008 P3 trap's lesson). (3) Retirement condition: the frame can say "I have
no object for this entity" — owned by PACK-FROM-PROTOCOL-1, NOT by this phase.
Your deliverable: the closed failure taxonomy + the deterministic, read-only
measurement instrument + its FIRST REAL MEASUREMENT (S93-1).

## WHAT EXISTS (read before writing)
- `api/cwf/_lib/routing/irFrame.ts` — `IR_OBJECTS` closed list, `IrFrameRawSchema`
  (EXPORTED — S95 lane law: the recorder is never a second model; import it,
  never re-declare it).
- `api/cwf/_lib/routing/frameEvidence.ts` — PHASE-FRAME-SHADOW-EVIDENCE-1 (#6,
  merged at the floor): every frame extraction's evidence is recorded in shadow
  via `recordFrameEvidence` → `emit({type:'tool_call', payload:
  frameEvidencePayload(...)})` → `telemetry_events`. Slot constants
  (`FRAME_SLOT.ENTITY_REF` etc.), caps, and the payload builder live HERE —
  your lens filters and parses telemetry rows USING THESE exports, never a
  copied shape.
- `api/cwf/_lib/replay/lineResolutionLens.ts` + `scripts/runLineResolutionLens.ts`
  — the #24 pattern you mirror VERBATIM in posture: read-only (writes NOTHING —
  no governed row, no `messages` [C1], no publish); ADR-007 no secrets; the
  `[Fence]` banner from `getServiceClient()`; exact counted populations;
  `--all | --limit`, `--since/--until` window freeze; REFUSED verdict ⇒ exit 2
  distinct from crash exit 1; `--json` with the stdout-guard import FIRST
  (read its load-bearing import-order comment and copy the discipline);
  `--out <dir>` writing `summary.json` + `cases.ndjson`.
- Entity ground truth: the discovered entity mirror (the registry
  `entityDiscoverySync` maintains). JOIN LAW applies: resolution against the
  registry uses the PRODUCTION seam's own guarded lookup — parent-guarded,
  name-only matching forbidden (the Glazur3 collision is why). Find the seam
  the production resolver uses (follow #24's parity approach: `--no-parity`
  exists there and is DISCLOSED in evidence when used) and call IT.
- The synthetic-traffic injector runs every minute and its frames also land in
  telemetry (S33-1 null-actor rows) — your second, always-populated source.

## GOALS

**G1 — Taxonomy (closed, in `api/cwf/_lib/replay/frameForceFitLens.ts`).**
Per frame-evidence record, classify into EXACTLY one of:
- `FF_UNRESOLVED` — `entity_ref` non-empty · confidence HIGH · object claimed ·
  ZERO guarded-registry match for every ref (the force-fit signature);
- `FF_COLLISION` — ref matches ONLY via a path the JOIN LAW forbids
  (name-only / parentless) and not via the guarded path;
- `RESOLVED` — at least one ref resolves through the guarded path;
- `SAFE_ABSTAIN` — empty `entity_ref` OR confidence AMBIGUOUS (the behaviour
  retirement wants more of);
- `UNMEASURABLE` — the shadow record lacks a slot this classification needs
  (counted, NEVER folded into any rate's denominator — empty≠zero; "could not
  read" is its own verdict, MEASURE-READ-HONESTY-1).
Rates are reported per class with EXACT denominators, split by source
(organic vs synthetic) — two denominators kept apart, the #24 discipline.

**G2 — The lens engine (same file).**
Inputs: `telemetry_events` frame-evidence rows (filtered via
`frameEvidence.ts`'s own payload identity), window-frozen, exact-counted;
optional `--object <IR_OBJECT>` focus (default: all). For each record: parse
with the EXPORTED schema/constants → resolve refs through the guarded seam →
classify. Population honesty verbatim from #24: a source not read, a
population not countable, or a read stopped short ⇒ `verdict:'refused'` in the
evidence AND exit 2 in the runner; counts still printed, labelled.
PostgREST 1000-row cap: page to exhaustion — a silently truncated read is a
refused verdict, never a smaller denominator.

**G3 — The runner (`scripts/runFrameForceFitLens.ts`).**
Mirror `runLineResolutionLens.ts`'s skeleton: usage block, flags
(`--all|--limit`, `--since`, `--until`, `--object`, `--source organic|synthetic|both`,
`--no-parity` [disclosed], `--out`, `--json`), stdout-guard import FIRST,
EXIT_REFUSED=2. No DB writes, no secrets, no consent flag (no authority
exercised — say so in the header, as #24 does).

**G4 — Tests (`api/cwf/__tests__/frameForceFitLens.test.ts` + fixtures under
`api/cwf/__tests__/fixtures/forcefit/`).**
- Classification unit tests: one fixture record per class, including the
  live-observed shape (`object=LINE`, `entity_ref=["G-03 grove"]`, HIGH) →
  `FF_UNRESOLVED`; a Glazur3-shaped name-collision fixture → `FF_COLLISION`
  (and the SAME record under the guarded path with the parent present →
  `RESOLVED` — both directions of the JOIN LAW in one pair).
- `UNMEASURABLE` never enters a denominator (assert the arithmetic).
- Refused-verdict propagation: a truncated page ⇒ refused + exit-2 mapping.
- Parser uses the EXPORTED schema (a test that breaks if someone re-declares a
  local copy — assert the import identity, the S95 recorder law).
- Fixture refs use INVENTED foreign nouns (groves, berths, wards) — no tenant
  vocabulary enters the tree (the #22 law); no ARMES entity names in fixtures.

**G5 — Birth proof (S93-1): the FIRST REAL MEASUREMENT, inside the phase.**
Run the lens against the LIVE database (read-only) with `--all --out
docs/relay/evidence/PHASE-FRAME-FORCEFIT-LENS-1/` and commit the evidence
(`summary.json` + `cases.ndjson`; the ndjson carries slot values ALREADY
capped by frameEvidence's own caps — verify no secret/tenant leak beyond what
the shadow record itself stores, and say so). Expected: the synthetic source
is non-empty (the injector runs every minute); the organic source may be small
(#6 merged only at the floor) — report BOTH denominators as read. If a source
is empty, that is a labelled zero-population refusal for THAT source, not a
silent green. Paste the summary block into your report.

## OUT OF SCOPE (do not touch)
Fixing BUG-017 (no extractor prompt change, no semanticRouter edit, no frame
schema change) · `api/cwf/_lib/routing/**` (READ-only for you; if an export
you need is missing, STOP and report — do not add one, that is AG-1's
neighbourhood this wave) · `package.json` · `vercel.json` ·
`.github/workflows/**` · `supabase/migrations/**` (ZERO migrations) ·
`shared/**` · `scripts/` files other than `runFrameForceFitLens.ts` ·
`api/cwf/_lib/turn/**` and `api/cwf/_lib/backends/**` (AG-1's fence) ·
harness/relay-audit files (AG-2/AG-3). Your diff must not intersect theirs.

## SEAL LAW (S95-1 + Footgun-6)
Never bump docVersion during build. Report the honest `npm run check:doc-drift`
state. If red from your own files: ONE provisional reseal as the last build
commit, `chore(seal): PROVISIONAL reseal for CI — DROP AT MERGE`; dropped and
re-pressed at merge turn by the wave procedure. AG-1 holds the seal token.

## DELIVERY (S91 completeness gate)
- Branch **`phase/frame-forcefit-lens-1`** · PUSH to origin · open a **PR
  against master** (CI on the PR head arbitrates, S37-2).
- Report: **`docs/relay/PHASE-FRAME-FORCEFIT-LENS-1-report.md`** with:
  `git diff --name-only origin/master...HEAD` VERBATIM in a fence · the pasted
  live summary (G5) with both denominators and the refused/measured verdict
  per source · the machine-verifiable birth proof as commands the reviewer can
  run (`npx vitest run api/cwf/__tests__/frameForceFitLens.test.ts`, and the
  lens invocation with its exit code) · the named hand-off: this lens is the
  ruler for #14 ROUTE-ASK-1's gate and for #13's retirement proof · any
  deviation, by name.
- Then **STOP**. No merge without the Architect's GO.

<!-- END · PHASE-FRAME-FORCEFIT-LENS-1-v1 -->
