PREREVIEW-VERDICT: GREEN branch=phase/vectorlane-fake-timers-s165-1 head=4af0f6995682fb9864d880dcd246ba962d617206
SCOUT-STATUS-PREREVIEW-VECTORLANE-S165-1 · from scout-1 · reply to ORDER-SCOUT-PREREVIEW-VECTORLANE-S165-1 (id 1a705d1b-684c-48e4-8d4d-5dcc5daeaf74, DIGEST-OK). PRE-REVIEW ONLY — no status posted.

1 · HEADS (git ls-remote at 15:3xZ): master fb28343ea332e98aa588bf73acc0762c84e1d9dc · phase/vectorlane-fake-timers-s165-1 4af0f6995682fb9864d880dcd246ba962d617206 (= the precondition) · phase/vectorlane-fake-timers-s165-2 DOES NOT EXIST yet (no ref on origin) — only -s165-1 reviewed. ONE commit, parent 64f5d5c77e70b1da03b0ea333c760e9ceb2f13d8; 3 files, +163 / -15.

2 · CARD FIDELITY (CARD-VECTORLANE-FAKE-TIMERS-S165-1-v2 + my Δ-A) — GREEN
- Fence includes public/architecture/manifest.json (Δ-A): report docs/relay/VECTORLANE-FAKE-TIMERS-S165-1-AG1-report.md:110 `FILE-FENCE:` + :111-113 = admission.test.ts, the report, manifest.json = `git diff --name-only 64f5d5c7..4af0f699` (3 = 3).
- docs/ground/authority-conformance.latest.md: NOT in the diff (restored, as Δ-A ordered). Re-confirmed: my own full-suite run in the scratch worktree rewrote its measuredAt again — the side effect is real and AG-1 kept it out.
- api/cwf/_lib/vectorLane/admission.ts: NOT in the diff (D3).
- No assertion loosened: the test diff changes ZERO `expect(` lines. Every numeric claim, before = after: (a)-1 `loaded.p50 ≤ idle.p50 + COST * 3` and `loaded.max ≤ idle.max + COST * 4`, COST = 4 · (b)-1 `queryPos ≤ 1`, `order.length = 21` · (c)-1 `slow > fast`, `slow / max(fast, 0.001) > 1.8` · (c)-3 `Date.now() - t0 < 1000` · (d)-2 `depth: 1`, `retryAfterSec ≥ 1`. What changed: `import { afterEach, …, vi }`; helpers `virtualClock()` (toFake setTimeout, clearTimeout, Date) and `onVirtualClock(body)` (runAllTimersAsync); `afterEach(() => vi.useRealTimers())`; the four clock proofs wrapped; :184's real setTimeout(1) → `vi.advanceTimersByTimeAsync(1)`. (e)-1 and every order/count proof stay on real timers.

3 · SCRATCH WORKTREE at 4af0f699
- ALONE: admission.test.ts 10× → 10/10 runs "Tests 14 passed (14)" (read from each run's log).
- UNDER CONTENTION: a full parallel `npx vitest run` in the same worktree, 15:34:17Z for 180.14 s (772 files; its 5 failed files are the known sandbox loopback/tsx-spawn ones), and inside that window admission.test.ts 10× back to back 15:34:25Z–15:35:07Z → 10/10 runs "Tests 14 passed (14)".
- PLANT (card D4 — reverse the ENCODE_PRIORITY walk at admission.ts:227) → 3 RED: (b)-1 "expected 20 to be ≤ 1" (:71), (b)-2 "expected 2 to be < 1" (:90), (a)-1 "expected 244 to be ≤ 20" (:123). Reverted → 14/14. Same numbers as my card-review prototype.

4 · FENCE / GATES / CI
- The guard reads one block (one exact `FILE-FENCE:` line in that report); fence = diff → blocks 1, diff-not-fence ∅, fence-not-diff ∅.
- vs CURRENT master fb28343e: `git merge-tree --write-tree` → CONFLICT in public/architecture/manifest.json ONLY (mechanical — take master's, `npm run reseal`); this is why AG-1 re-carries it as -s165-2. PREDICTABLE TRIP if -s165-1 itself were opened on fb28343e: the stale seal → check:doc-drift fails in Build. The -s165-2 re-carry is the fix; review it when it exists (not measurable now).
- rule26 WILL RUN (public/architecture/manifest.json in the diff → CI-DIET ui=true); eval-canary SKIPPED by design.

5 · WORKTREES: this order created ONE scratch worktree (scratchpad/wtvl2) and removed ONE (`git worktree remove --force` — it held only the suite's conformance side effect); it no longer appears in `git worktree list`. `git worktree prune -v` then tried 11 stale records (10 other windows', 1 my old wt640) and every delete failed "Operation not permitted" — nothing pruned; reported, not routed around.
NOTE: `git worktree list` shows AG-1's LOCAL branch phase/vectorlane-fake-timers-s165-2 at 68224cda2649237989afc37f3dfaba109eebb180 (worktree 62111134…/wt-ag1), but origin has no such ref (ls-remote twice). Unpushed work in progress — not reviewed as a head; review it once pushed.

UNMEASURED: -s165-2 (no ref yet); rule26 e2e.
Forbidden kept: no status posted, no edit to the branch, push, merge, re-run, cron. No environment value printed.
