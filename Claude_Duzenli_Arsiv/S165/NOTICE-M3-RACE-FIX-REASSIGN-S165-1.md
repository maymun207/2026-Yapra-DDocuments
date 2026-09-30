<!-- relay-audit: v1 kind=notice -->
NOTICE-M3-RACE-FIX-REASSIGN-S165-1

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 notice" and stops). Thank you for SLIP-NOTICE-VECTORLANE-SD1-CARRY-PREP-S165-1 — both carries clean, both parent = master.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T16:17Z
PRECONDITION: PR 649 OPEN at head 72b912f74495484a3da5c4a6f54d2eeebd544bac on branch phase/m3-feedback-evidence-s165-2; master fb28343ea332e98aa588bf73acc0762c84e1d9dc. If the branch head differs (AG-3 pushed), STOP, change nothing, report the new head.
WHY: M3 is green code held red by a test that is not its own. AG-3 took the fix at 15:14Z under NOTICE-M3-CI-RED-ENTITYLAYERS-RACE-S165-1, whose proof demanded 20x a parallel FULL `npx vitest run` before AND after — the Architect's own defect: that is hours of suite time for a one-line test fix, and it breaks §12.8. You are idle and hold the lighter proof below. The plain push is the lock: if AG-3 pushes first, yours is rejected as non-fast-forward and you STOP.
WHAT THE ARCHITECT MEASURED: Build and Test on 72b912f74495484a3da5c4a6f54d2eeebd544bac failed at step 11 "Run tests", later steps skipped. One assertion: src/components/admin/__tests__/entityLayersSection.test.tsx:132, test "a successful declaration names the layer and its audit id, and the list reloads": `expect(h.getEntityLayerDescriptors.mock.calls.length).toBeGreaterThanOrEqual(2)` got 1. M3's diff does not touch that component or test. Hypothesis (UNMEASURED until you measure it): the test waits for `entitylayers-written` then asserts the reload count synchronously, while the reload runs in a later effect (GraphKbTab.tsx: setLastWrite + setReloadKey batched; the reload useEffect fires after).
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) plan items 2 and 6 · §12.8 · §13.11 · S55-1 (a diagnosed flake is fixed, never re-run).
NO CRON TASK. GRAFT: graft first (graft/src/components/admin/), then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. `git ls-remote origin` refs/heads/phase/m3-feedback-evidence-s165-2 twice; must equal 72b912f74495484a3da5c4a6f54d2eeebd544bac. Work in a scratch worktree at that head.
2. Read the reload path; name file:line where the list reload is triggered and whether `written` can render before it. If it is NOT the race (the component stopped reloading, or M3 caused it): STOP, change nothing, report file:line.
3. If it is the race, TEST-ONLY fix: wrap that one assertion in `await waitFor(() => expect(h.getEntityLayerDescriptors.mock.calls.length).toBeGreaterThanOrEqual(2))`. No count lowered, no assertion deleted, no timeout raised, no retry wrapper.
4. PROOF (lean, all quoted): the test file alone 20x → 20/20; PLANT (make the component skip the reload) → red, revert; ONE parallel full `npx vitest run` → quote the summary line (files/tests passed).
5. The M3 report under docs/relay/ that carries its FILE-FENCE: grow the fence by exactly this one path and add one line "FENCE-GREW: entityLayersSection.test.tsx — CI race fix per NOTICE-M3-RACE-FIX-REASSIGN-S165-1 (AG-1, reassigned from AG-3)". Gates: `npm run build` (reseal on drift) · typecheck:api · check:rule24 · relayAudit · report:check.
6. ONE commit (git commit -F <file>), parent = 72b912f74495484a3da5c4a6f54d2eeebd544bac. Re-check ls-remote once, then PLAIN push to phase/m3-feedback-evidence-s165-2 (this synchronizes PR 649 and starts its fresh CI run — the certificate, not a re-run). Rejected as non-fast-forward → STOP, report.
7. Remove your scratch worktrees (git worktree remove + git worktree prune); say how many. Slip SLIP-NOTICE-M3-RACE-FIX-REASSIGN-S165-1 (bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SLIP-NOTICE-M3-RACE-FIX-REASSIGN-S165-1.md") with the new head (40-hex). Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.
FORBIDDEN: --force; editing EntityLayersSection source; loosening any assertion; re-running CI; opening a PR; merging; migration apply; cron; printing an environment value.

END · NOTICE-M3-RACE-FIX-REASSIGN-S165-1
