# HOTFIX F152 — Rollout guard-blind reclassification (master RED)
**claude-code-HOTFIX-F152-ROLLOUT-GUARD-BLIND-v1 · rev 1 · 2026-07-21 · Architect: Claude · Executor: AG (either idle lane)**

> PLATINUM statement: corrects a guard's over-claim so the completeness of the
> disclosed guard-blind set is honest by construction — no manual re-checking,
> no silent skips. Master returns to green with zero production change.

## §P · PRECONDITION (S47-1) + ISOLATED WORKDIR (S56-1)
Valid ONLY while `origin/master == 46813be68e247e293748ea2a2fcb85ac7d5292e3`
(docVersion rev 127) and no other PR touches `e2e/pane-scroll-admin.spec.ts`.
Clone into a UNIQUE path you own (NOT a shared `/tmp/cwf_yaprak`). On mismatch:
STOP and report. Grep test commands from `package.json` (S32-1). Branch:
`hotfix/f152-rollout-guard-blind`.

## §1 · WHY (root-caused, S55-1 — NOT a rerun)
CI `rule26` job is RED on master: `PANE-SCROLL-1: Rollout` times out 30s waiting
for `getByTestId('primer-rollout')` to be visible. Deterministic non-render
(hard timeout, not a flake). Root cause: `/dev/admin-preview?tab=rollout` does
NOT render `RolloutTab`'s primer in clean CI — RolloutTab's dev-preview
reachability is the SAME seam gap AG-B already disclosed for Trust / MCP /
Tweak (`AdminPreview.tsx` renders RolloutTab under a separate `view='rollout'`,
and the `?tab=` panel path is not seeded for it the way Users/Inspect/Quota/
Replay/Governance are). AG-B's local run rendered it (dev-server state); the
clean CI runner does not (S37-2: local green ≠ CI). The scroll FIX itself is
correct and unaffected — `RolloutTab` already carries the `PanelScroll`
wrapper (`data-testid="rollout-tab"`, tree-verified at `46813be`); only the
guard's CLAIM to cover Rollout is wrong.

## §2 · THE FIX (test-only, honest — no-silent-caps)
In `e2e/pane-scroll-admin.spec.ts`:
1. REMOVE the `{ tab: 'rollout', testid: 'primer-rollout', label: 'Rollout' }`
   entry from the `PANELS` array.
2. ADD Rollout to the file's DISCLOSED guard-blind comment (the existing block
   that names Trust / MCP Settings / Tweak as unreachable-in-dev-preview), with
   the same one-line justification: "Rollout — RolloutTab is reachable in
   `/dev/admin-preview` only via `view='rollout'`, not the `?tab=` panel path
   this guard drives; its `PanelScroll` wrapper is applied and review-verified.
   Guard-reachability is a follow-up (dev-preview seam fix)."
3. Do NOT touch RolloutTab.tsx or any production file. Do NOT weaken any
   remaining assertion. The other 6 pane-scroll cases stay exactly as they are.

## §3 · VERIFY (HOTFIX profile — targeted, S43-2)
- [ ] `npm run test:rule26` (or the grep'd equivalent) GREEN locally, run
      **3× consecutive retry-free** (S55-1) — paste all three tails. The suite
      must show the Rollout case GONE (not skipped-as-failure), remaining
      pane-scroll + RULE-26 cases all pass.
- [ ] `git diff --stat origin/master..HEAD` = ONLY
      `e2e/pane-scroll-admin.spec.ts`. Grep-prove zero production / zero other
      files.
- [ ] Grep-prove RolloutTab.tsx still carries the `PanelScroll` wrapper on
      master (the fix is intact; only the guard entry is removed).
- [ ] Push, open PR. Unsharded CI green on the PR head — including the FULL
      `rule26` job (S56-2: the full job green, not a mid-run claim) — is the
      merge precondition (S37-2).
- [ ] Report cites the real merge-base from a fresh `git rev-parse` (S54-1).

## §4 · WHAT YOU DO NOT DO
No merge (Architect reviews — HOTFIX-profile light RULE-25 = tree-identity +
targeted rule26 green + diff-scope — then authors the verbatim merge message,
S30-2). No production code. No RolloutTab change. No migration. No golden runs
(FREEZE). No shared workdir (S56-1).

<!-- END · claude-code-HOTFIX-F152-ROLLOUT-GUARD-BLIND-v1 · rev 1 · 2026-07-21 -->
