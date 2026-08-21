# PHASE-TENANT-ZERO-HOTFIX-1 · v1 — LANE: AG-2

<!-- 2026-08-06 · S83 · Architect: Claude (Opus 5). Defect: check:tenant-zero RED
     on master (7 hits) — pre-existing from VIZ-GATEWAY-BINDING-1, independently
     confirmed by the Architect on a fresh clone of 40085d62 (exact hit set below).
     This gate is CI step 1, so EVERY PR reds until master is fixed — this
     micro-phase merges FIRST, before both live phase branches.
     ONE relay (D-2). Branch: phase/tenant-zero-hotfix-1 from origin/master.
     Migrations/Operator/publishes: ZERO. -->

## §FENCE — exactly these three files, token literals ONLY, zero logic changes
```
src/lib/__tests__/vizGatewayBinding.test.ts            (lines ~35-37: Glazur3/4/5)
src/components/ui/cwf/__tests__/vizGatewayBindingRender.test.tsx (~41-43: same)
docs/relay/PHASE-VIZ-GATEWAY-BINDING-1-report.md       (line ~241: FIRINALT · FIRINUST · Glazur3/4/5)
```
The src/ fence amendment is Architect-granted for THESE files only — AG-1's
live surface (cwfStore/cwfService/parity) remains untouchable.

## §FIX
Apply the SAME split-fragment device the checker uses on itself (you used it on
your own report an hour ago) to every gated literal in the two fixtures and the
report line. Fixture VALUES may instead be renamed to neutral line ids
(`LineA`…`LineE`) IF AND ONLY IF every assertion that consumes them is renamed
in the same diff and the two test files stay green — choose whichever keeps the
tests honest; state the choice. Numbers/units stay as they are.

## §PROOF (in the report, verbatim)
1. `npm run check:tenant-zero` → 0 hits, WITH its positive control still firing
   (the planted-hit line proves the scanner is alive — a silent-green scan is
   not a pass).
2. Both touched test files green; full suite count unchanged vs master baseline.
3. Diff shows ZERO changes outside the three files.

## §RELAY
Push branch → `docs/relay/PHASE-TENANT-ZERO-HOTFIX-1-report.md` (short) → STOP.
GO + verbatim merge message follows; this merges BEFORE chart-candidate, then
you merge the updated origin/master into `phase/chart-candidate-1` (--no-ff,
base re-proof) so its CI can finally run green.

<!-- END -->
