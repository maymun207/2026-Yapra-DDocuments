# HOTFIX F149 — rule26 cold-start flake: stale optimizeDeps root fix
<!-- claude-code-HOTFIX-F149-RULE26-OPTIMIZEDEPS-1-v1 · rev 1 · 2026-07-20
     Architect: Claude · Lane: AG-A (free after BATCH-W-1; wrote this test file).
     Anchor: origin/master = dca514c945e7191d0e2a091e157a520fd80f2faf (rev 121).
     PRECONDITION (S47-1): valid ONLY while origin/master == dca514c and no other
     hotfix/f149 branch exists. On mismatch: STOP and report actual state.
     Ceremony: HOTFIX profile (e2e + vite.config ONLY; NO api/shared/migration/
     prompt/golden surface → light ceremony, targeted validation, no gated sub-
     phases beyond the ones below). CI-green on PR head = merge precondition
     (S37-2). Zero migrations · zero Operator · zero golden exposure.
     PLATINUM compliance: self-configuring — removes a config defect; no manual
     owner step created. This UNBLOCKS master (currently RED) and every branch.
     PRIORITY: #1 — ahead of OBS-TRACE-1. Master's rule26 is red after 2 reruns;
     until this lands, S37-2's "CI is the sole arbiter" cannot function. -->

## §0 · SITUATION (owner-confirmed, Architect-verified on anchor)
`rule26` fails on master `dca514c` — the BATCH-W-1 merge commit — REPEATEDLY
(1 pass on the PR rerun, 3 subsequent failures incl. two master reruns). The
failing test is `RULE-26: Tool Matching (routing) does not clip across all four
modes @1024` (`e2e/rule26-admin.spec.ts:335`). It times out at line 360 waiting
for `getByTestId('routing-curate')` to become visible. The @1280 twin PASSES
consistently (curate included). This is NOT a one-off transient — a rerun does
not reliably clear it.

## §1 · ARCHITECT DIAGNOSIS — TREE-PROVEN (build on these; two hypotheses)
Verified on the `dca514c` clone:

**Root trigger (primary):** `vite.config.ts` `optimizeDeps.include` lists
`['@mui/material', '@mui/x-data-grid', '@emotion/react', '@emotion/styled']`
(line 63) — but NONE are in `package.json` and NONE are imported anywhere in
`src/` (zero hits). Every rule26 run prints four `[WebServer] Failed to resolve
dependency: @mui/… present in optimizeDeps.include` warnings at startup. Vite's
cold dev-server (playwright.config `webServer.command = 'npm run dev'` —
MANDATORY, preview tree-shakes the admin route to 404 per its own doc comment)
tries to pre-bundle these ghost deps, fails, and re-optimizes mid-run → a page
reload. The longest test (@1024 four-mode routing) is the most exposed to the
reload window → high failure rate. These entries + the dead `@mui/material/
styles/recomposeColor` rewrite plugin (lines 6-32) are leftovers from a reverted
@mui experiment (added in STAGES-FIX-1 `524fba1`).

**Premise correction (S54-1, carry to register v57):** a prior belief that "the
VSplit describe has `retries:2`" is FALSE on this tree. `18ea0ab` added that
retry; `4de6cc9` (TOOLMATCH-IA-1, which dropped the VSplit component) REMOVED it
along with the component. There are ZERO `retries` anywhere in `e2e/` or
`playwright.config.ts` today. So the new BATCH-W-1 routing test never had a retry
guard — do NOT "copy the VSplit retry"; there is nothing to copy.

**Residual hypothesis (must be ruled out, not assumed away):** the failure is
curate-AND-1024-specific and repeats. A pure random reload would sometimes hit
browse/test or @1280. So AFTER the root fix, if @1024 curate STILL fails, treat
it as a REAL 1024 layout/visibility bug in curate mode (the heaviest mode —
hygiene strip + proposals + editable rules — inside the `flex-1 min-h-0
overflow-y-auto` body at line 511) and fix THAT. The phase branches on the N-rep
result; it does not pre-conclude.

## §2 · STEPS (in order — each step's result decides the next)

### Step 1 — Root fix (the trigger)
1. Remove the four ghost entries from `vite.config.ts` `optimizeDeps.include`
   (line 63). If that leaves `optimizeDeps` empty/meaningless, remove the empty
   key cleanly (don't leave `optimizeDeps: {}` if it serves nothing).
2. Remove the dead `@mui/material/styles/index.mjs` recomposeColor rewrite plugin
   (lines ~6-32) — it only ever fires on an `@mui` import that no longer exists;
   confirm no other config references it before removing. If removal is riskier
   than it looks (e.g. it's wired into the plugins array in a non-obvious way),
   leave it (it's a harmless no-op) and note that in the report — the
   optimizeDeps entries are the load-bearing fix.
3. Confirm the four `[WebServer] Failed to resolve dependency` warnings are GONE
   from a fresh `npm run dev` startup (paste the clean startup lines).

### Step 2 — N-rep validation (retry OFF — prove the root, don't mask it)
Run `npm run test:rule26` **5 times consecutively**, retries still at zero.
- **All 5 green (incl. @1024 curate every time)** → root fix confirmed; go to
  Step 4.
- **@1024 curate fails on ANY of the 5** → the residual real-bug hypothesis is
  live; go to Step 3.
Paste all 5 run summaries (pass/fail per run) as evidence — this is the
stochastic-verification gate; a single green run is NOT sufficient (project rule).

### Step 3 — ONLY IF Step 2 still failed: real curate-@1024 fix
Investigate why `routing-curate` (line 681, under `{mode === 'curate'}`) does not
become visible at 1024px after browse/test succeeded. Likely area: the mode-body
container `flex-1 min-h-0 overflow-y-auto` (line 511) interacting with curate's
heavier content at the narrower width (zero-height collapse, or an element
overflowing and pushing curate out of the visible box). Fix the real layout
issue (do NOT paper over it by loosening the test's assertion or bumping the
timeout). Re-run Step 2's 5-rep gate after the fix; must be 5/5 green.

### Step 4 — Belt (defense-in-depth, AFTER the root passes retry-free)
Add a scoped retry to the routing four-mode test for CI-only cold-start variance
— but ONLY now that Steps 2/3 proved it passes WITHOUT retries. Use
`test.describe.configure({ retries: 2 })` wrapping just the routing four-mode
`for (const width…)` block (or `test.info().retry`-scoped equivalent), CI-only in
spirit. This is a safety net, NOT the fix — the phase's acceptance is the
retry-free 5/5 green from Step 2/3, and the retry is additive on top.

## §3 · BINDING CONSTRAINTS
- Touch ONLY `vite.config.ts` and `e2e/rule26-admin.spec.ts` (+ its imports if a
  real Step-3 fix needs a `src/` layout change — if so, that specific `.tsx` is
  in scope and the ceremony stays hotfix since it's a bounded cosmetic/layout
  fix, but call it out explicitly in the report).
- Do NOT touch: any other test's behavior, playwright.config's `webServer`
  command (must stay `npm run dev` — preview 404s the route), migrations,
  api/shared, prompt segments, golden surfaces.
- Do NOT "fix" the flake by raising the 30s timeout or weakening the clip
  assertion — that hides the problem, violating the observability/honesty ethic.
- CHANGELOG + `.agents/` skill-KB entry for F149 land ON the branch pre-merge.
- Doc-drift: this phase likely touches NO mapped source (vite.config + e2e are
  not in the doc manifest) → probably no reseal. Run `npm run check:doc-drift`;
  if it flags nothing, no reseal needed. If Step 3 edited a mapped `.tsx`, reseal
  per S34-1.

## §4 · SELF-VERIFY CHECKLIST (evidence = literal, paste outputs)
1. Step 1: the diff of `vite.config.ts` + clean `npm run dev` startup (no @mui
   "Failed to resolve" lines).
2. Step 2: all 5 consecutive `npm run test:rule26` summaries, retry-free, showing
   @1024 curate green in every run. (If Step 3 was needed, paste the pre-fix
   failing runs, the Step-3 diff, and the post-fix 5/5.)
3. `git diff --stat dca514c..HEAD` — files limited to §3 scope; paste it.
4. CI green on the PR head (all jobs: build 20/22, coverage, rule26, eval-canary)
   — and note the rule26 job specifically green (link).
5. `npm run check:doc-drift` result (expected: clean / no reseal).

## §5 · MERGE (only after Architect GO)
Merge `--no-ff` (squash banned). Merge-commit message VERBATIM:
```
Merge HOTFIX F149: rule26 cold-start flake — remove stale @mui/@emotion optimizeDeps.include entries (ghost deps forcing mid-run Vite re-optimization reload) + retry belt on the routing four-mode test
```
(If Step 3 was needed, append `+ curate-@1024 layout fix` to the message.)
Report: remote hash + CI link + §4 evidence. Architect FAST-GATE (S43-2) against
`dca514c`; then this becomes the new floor and OBS-TRACE-1 (AG-B) rebases onto it.

<!-- END · claude-code-HOTFIX-F149-RULE26-OPTIMIZEDEPS-1-v1 · rev 1 · 2026-07-20 -->
