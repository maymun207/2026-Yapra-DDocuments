# PHASE-PROBE-PARITY-1 — v1
**Lane: AG-1 · closes BUG-010 + the BUG-011 residue (AUTO-SYNC-ON-SAVE-1 folds in — one home, as ruled S81) · branch `phase/probe-parity-1`**
**Authored by Architect, S85, doctrine v1_3 (D-9.3: written while your LEDGER merge was in flight).**

## STANDING PRECONDITION (machine-checkable — verify, then start)
1. Your LEDGER-COMPLETE-1 merge report is pushed to master (this phase starts only after that lane closes).
2. Fresh clone; `git log origin/master --first-parent -1` recorded as anchor. No file overlap with anything in flight: this phase touches `api/admin/mcp-probe.ts`, `api/admin/mcp-settings.ts`, `package.json` (+lockfile), tests — verify none is touched by an unmerged branch.
3. Soft expectation: suite 488/5629 · docVersion rev 207 (post-LEDGER). Deviation = report.

## WHY (live bytes, this session, origin/master)
The register's memory of this area is STALE and the scope narrowed accordingly (S65-1 executed): the save path ALREADY probes + records via `recordSyncHealth` (LIFECYCLE-AFFORDANCE-1 G2 + HEALTH-TRUTH-1 G3 landed: connection-changed narrowing, two-arm `.then`, skip declared). Two gaps remain:
- **G-A (BUG-010):** `api/admin/mcp-probe.ts` computes the full verdict and returns it WITHOUT recording — the panel's Probe button proves liveness and forgets it. The recording seam exists and five sites already use it.
- **G-B (BUG-011 residue):** the save path schedules its probe/record chain as a BARE fire-and-forget promise. `waitUntil` appears NOWHERE in the repo; `@vercel/functions` is not a dependency (only `@vercel/node` is). On Vercel, work scheduled after the response ends has no survival guarantee without `waitUntil` — "sometimes drains" is precisely the late/partial shape BUG-011 recorded. The fix is a deterministic lifetime, not a hope.

## CHANGES
### C1 — `mcp-probe.ts` records through the SAME seam (BUG-010)
After the verdict is computed (both arms — success AND the classified error), record it via `recordSyncHealth`, with three laws that are contract:
1. **Global scope only.** A personal probe measures the caller's own connection, not the backend's global health — `scope==='personal'` probes stay read-only, and the response gains an honest `recorded: false` field on that arm (`recorded: true` on recorded arms). Guard 2 inside `recordSyncHealth` already enforces this direction; do not fight it, declare it.
2. **No attempt ⇒ no observation.** The skeleton-row arm (no url — no network attempt) records NOTHING: "could not attempt" must never mint a `down` row (MEASURE-READ-HONESTY). Read `probeAttempted.ts` first and follow the existing attempted-vs-not law — do not invent a parallel one.
3. **Record must not change the verdict.** Same two-arm posture as the save path: the verdict is decided BEFORE the record is attempted; a health-write failure is logged, never converted into a probe failure. The endpoint's response shape stays backward-compatible (additive `recorded` field only).

### C2 — the save path's chain gets a deterministic lifetime (BUG-011 residue)
Add `@vercel/functions` and wrap the ENTIRE per-server chain at the scheduling site in `mcp-settings.ts`:
`waitUntil(syncBackendCatalog(server).then(...twoArm...).then(recordSyncHealth...).catch(...))`
— semantics byte-identical (still never blocks the response, still unrejectable), only the lifetime changes from "maybe drains" to "runtime-guaranteed". Grep for any OTHER bare fire-and-forget scheduling of this same chain class (`mcp-catalog.ts` imports the seam too — read it; if it awaits in-request, it needs nothing; if it schedules, it gets the same wrap). Report the census either way.

### C3 — tests
- C1 both directions (D-5): a success verdict records one `up`-class call with the verdict's own fields; a classified-error verdict records `down`-class; the personal arm records NOTHING and responds `recorded:false`; the skeleton arm records NOTHING. Fixture the seam, not the network.
- C2: a unit pin that the scheduling site passes its promise through `waitUntil` (mock `@vercel/functions`), and the two-arm order is preserved.

## EVIDENCE PLAN
Pre-merge: CI green on PR head; suite delta from CI. Post-merge PROOF READS (S63-1), split honestly:
- **BUG-010 seal:** Architect-side — after ONE owner Probe click on a live backend (real-world-test class, D-4c, the single owner touch beyond the relay quartet, declared here), Architect reads the new `backend_health` row via Supabase (checked_at = observation moment, verdict fields populated). The `down` positive control comes free from any disabled/unreachable entry — if none exists, the seal is the `up` row alone and the `down` arm stays ARMED, stated, never manufactured.
- **BUG-011 seal:** after one owner SAVE that changes a connection, every touched enabled backend has a health row within 1 minute — Architect reads it; `waitUntil` makes this deterministic rather than lucky.

## GUARDRAILS
Merge `--no-ff`; conflicted-merge commits use `--cleanup=strip` (RULING-S85-1). doc-drift: `api/admin/**` mapping per the manifest — expect hash-only reseal if any tab maps these files; report what the gate says, never pre-decide a redraw. Tail anchor: NO MERGE WITHOUT ARCHITECT GO. Touch counter: this prompt = 1 of 4 (+1 declared real-world test at seal time).

<!-- END PHASE-PROBE-PARITY-1-v1 · tail anchor: DO NOT MERGE WITHOUT ARCHITECT GO -->
