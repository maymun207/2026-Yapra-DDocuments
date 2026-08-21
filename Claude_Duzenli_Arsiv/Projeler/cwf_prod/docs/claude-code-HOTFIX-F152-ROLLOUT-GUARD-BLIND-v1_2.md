# HOTFIX F152 — Rollout guard-blind + Replay flake root-fix (master RED) · v1_2
**claude-code-HOTFIX-F152-ROLLOUT-GUARD-BLIND-v1_2 · rev 1.2 · 2026-07-21 · Architect: Claude · Executor: AG-A**
Supersedes v1 (immutable, S37-1). v1's Rollout removal is DONE on branch
`hotfix/f152-rollout-guard-blind` (PR #93) — KEEP it. This version FOLDS ONE
additional delta onto the SAME branch (S55-2: do not restart). §0 below is the
only new work.

> PLATINUM statement: makes a required CI guard deterministically green AND
> flake-resistant by construction — no reruns, no manual babysitting of a
> required job. Zero production change.

## §P · PRECONDITION (S47-1) + ISOLATED WORKDIR (S56-1)
Continue on your existing `hotfix/f152-rollout-guard-blind` branch, which was
cut from `origin/master == 46813be68e247e293748ea2a2fcb85ac7d5292e3` (rev 127,
tree-verified — merge-base matches). No other PR touches
`e2e/pane-scroll-admin.spec.ts`. Isolated workdir (S56-1). If master has moved,
STOP and report.

## §0 · NEW DELTA — Replay flake root-fix (the reason for v1_2)
**Do NOT accept the PR#93 first-run Replay timeout as "just a flake" (S55-1).**
Root cause (tree-verified by the Architect at `46813be`): `ReplayTab` IS wired
in the panel path (`AdminPanel.tsx:456`, `{tab==='replay' && <ReplayTab/>}`), so
this is NOT the Rollout deterministic-non-render class — it is a genuine
INTERMITTENT timeout. Mechanism: the guard calls
`page.goto('/dev/admin-preview?tab=${tab}')` with Playwright's DEFAULT
`waitUntil:'load'` (waits for EVERY resource) and then `primer.waitFor({state:
'visible'})` with the DEFAULT 30s. On a cold/loaded CI worker, a heavy panel's
full `load` event + hydration can exceed 30s → the observed one-off Replay
timeout. It flaked on Replay this run; it can flake on ANY heavy panel later.
This is a required CI job — leaving it tight-timeout-flaky is an F149-class
landmine.

**Fix (robustness, NOT assertion weakening — the primer must still become
visible; we only stop waiting on unrelated resources and give a cold worker
headroom):**
1. Change the navigation to `await page.goto(\`/dev/admin-preview?tab=${tab}\`,
   { waitUntil: 'domcontentloaded' });` — the primer's visibility (not the full
   resource `load`) is the real signal.
2. Give the visibility wait an explicit generous timeout:
   `await primer.waitFor({ state: 'visible', timeout: 15000 });` (ample once
   `domcontentloaded` has fired; a real non-render still fails, just faster than
   30s).
3. Apply to the shared code path so ALL remaining PANELS cases benefit (one
   place, not per-case). Do NOT touch the assertion (`rootHeight >
   mainClientHeight * 1.1`) or the forced-1400px primer logic.

## §1 · CARRIED FROM v1 (already done — verify still present, do not redo)
- Rollout entry removed from `PANELS`; disclosure comment added (Trust / MCP /
  Tweak / **Rollout**). Verified in the PR#93 diff.
- `RolloutTab.tsx` still carries the `PanelScroll` wrapper (grep-verified). No
  production file touched.

## §2 · VERIFY (HOTFIX profile — targeted, S43-2 + S55-1)
- [ ] `npm run test:rule26` GREEN locally **5× consecutive retry-free** (raised
      from 3× because we are specifically hunting an intermittent — S55-1
      demands retry-free N-rep for a flake fix, not a rerun). Paste all five
      tails. Replay must pass every run.
- [ ] `git diff --stat origin/master..HEAD` = ONLY
      `e2e/pane-scroll-admin.spec.ts`. Grep-prove zero production files.
- [ ] Grep-prove: no `retries` added, no `page.waitForTimeout`/`setTimeout`
      sleep added (the fix is `waitUntil` + an explicit `waitFor` timeout only —
      NOT a sleep, NOT a retry belt; those are F149-class last resorts, banned
      here).
- [ ] Push. FULL unsharded `rule26` CI job green on the PR head — the WHOLE job,
      not a mid-run claim, and **without a rerun** (S56-2). If CI flakes again,
      STOP and report — do NOT rerun; that would prove the root-fix insufficient.
- [ ] Report cites the real merge-base from a fresh `git rev-parse` (S54-1).

## §3 · WHAT YOU DO NOT DO
No merge (Architect HOTFIX-profile RULE-25 review → verbatim merge message,
S30-2). No production code. No RolloutTab/ReplayTab change. No `retries`, no
sleeps. No migration. No golden runs (FREEZE). No shared workdir. **No rerun of
a failed CI job — root-cause or report (S55-1).**

<!-- END · claude-code-HOTFIX-F152-ROLLOUT-GUARD-BLIND-v1_2 · rev 1.2 · 2026-07-21 -->
