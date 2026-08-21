# FIX — verifyGrants entry-guard v2: test-runtime guard (fix the vite-node false-green)
**v2 · 2026-07-07 · anchor = origin/master `57039c4` · Author lane (AG) · SUPERSEDES v1.**

<!-- v2 · AG correctly pushed back on v1. Architect verified live under all three launchers:
       • `npx vite-node scripts/x.ts`  → process.argv = ["node", ".../vite-node"] (SCRIPT STRIPPED), import.meta.main = undefined, VITEST = undefined
       • `node --import tsx scripts/x.ts` → process.argv = ["node", ".../scripts/x.ts"], import.meta.main = true, VITEST = undefined
       • under vitest (import)           → process.env.VITEST = 'true' (verified 2/2), JEST_WORKER_ID = undefined
     ⇒ v1's argv-scan CANNOT detect the vite-node entry (the script isn't in argv), and import.meta.main is
     undefined there too — so v1 would go green on a fabricated-argv unit test while `npx vite-node
     scripts/verifyGrants.ts` STILL runs zero probes (a false-green in the fix itself). The ONLY signal that
     separates a direct run (node/tsx/vite-node) from an import (vitest/jest) is the TEST-RUNNER env. v1's test
     location was also wrong: vitest `include` is src/** · shared/** · api/**/__tests__ — NOT scripts/**. -->

You implement THIS prompt exactly (Option 1 — test-runtime guard). No re-scope. If something seems wrong, STOP.

---

## 0. HARD PRE-FLIGHT GATE (paste evidence)
1. `git rev-parse origin/master` == `57039c4` (fresh clone; if moved, STOP).
2. `npm ci` clean; **full suite green 1205 / 117** (baseline).
3. Drift `[OK]`; `git status` clean; branch `master`; merge `--no-ff` (squash BANNED).

## 1. HARD CONSTRAINTS
- **`scripts/verifyGrants.ts` (guard) + ONE new test file only** (+ CHANGELOG). No PROBES/PROBES_COVERAGE_EXEMPT
  change, no migration, no engine/endpoint, no frozen file (evalGate/groundingCheck/trustRegistry/prompt-core/
  resolveAuthHeader/mcpSecrets/chat.ts untouched).
- **Import must stay side-effect-free** — `verifyGrantsProbes.test.ts` imports this module under vitest; after
  the fix, importing it must STILL NOT run main() or connect to a DB. Confirm that test still passes.
- **The documented command must WORK after the fix**: `npx vite-node scripts/verifyGrants.ts` must reach main()
  (it currently silently no-ops). This is the whole point.

## 2. THE CHANGE (test-runtime guard)
Replace the current inline entry-guard with a PURE, exported predicate keyed on the TEST-RUNNER env (the only
signal that survives vite-node):

```ts
/**
 * True when the live probes SHOULD run — i.e. this module was executed directly (node,
 * `node --import tsx`, OR `npx vite-node`, none of which set a test-runner env var), and NOT
 * imported by a test runner. The CI PROBES-coverage test imports this module under vitest,
 * which sets process.env.VITEST, so main() stays suppressed on import (no DB connect). We key
 * on the runner env rather than argv/import.meta.main because vite-node strips the script from
 * process.argv and leaves import.meta.main undefined — verified live — so neither can detect
 * the documented `npx vite-node scripts/verifyGrants.ts` entry.
 */
export function shouldRunProbes(env: Record<string, string | undefined> = process.env): boolean {
    return !env.VITEST && !env.JEST_WORKER_ID;
}
```
Then the bottom guard becomes:
```ts
// Run the live probes unless imported by a test runner (see shouldRunProbes). Fixes the prior
// guard, which silently no-op'd under the documented `npx vite-node` command.
if (shouldRunProbes(process.env)) {
    main().catch((e) => { console.error(e); process.exit(1); });
}
```
Remove the now-unused `import { pathToFileURL } from 'node:url';` if nothing else in the file uses it (keep
`oxlint` clean).

## 3. NEW UNIT TEST (in an INCLUDED dir — NOT scripts/)
Create `api/cwf/__tests__/verifyGrantsInvocation.test.ts` (next to `verifyGrantsProbes.test.ts`), importing
`shouldRunProbes` from `../../../scripts/verifyGrants.js`. Assert the REAL runtime signals (env), because a
fabricated-argv test is exactly the false-green we are removing:
- `shouldRunProbes({ VITEST: 'true' })` → **false** (imported under vitest — suppressed; this is the CI case).
- `shouldRunProbes({ JEST_WORKER_ID: '1' })` → **false**.
- `shouldRunProbes({})` → **true** (a bare direct run — node/tsx/**vite-node** — MUST run; the bug case).
- `shouldRunProbes({ NODE_ENV: 'development' })` → **true** (vite-node sets NODE_ENV=development but no VITEST;
  must still run — do not key on NODE_ENV).

## 4. SEAL
- `.agents/CHANGELOG.md`: FIX note — "the B-phase entry-guard silently no-op'd under its own documented
  `npx vite-node scripts/verifyGrants.ts` (vite-node strips the script from process.argv and leaves
  import.meta.main undefined, so the argv/URL comparison was always false → ZERO probes, a false-green in the
  grant-verify tool). Replaced with a test-runtime guard `shouldRunProbes(env)` (run unless VITEST/JEST env is
  set); unit-tested on the real env signals. Note: an argv-based fix would have passed a fabricated-argv unit
  test while the live command stayed broken."
- No docVersion bump / no diagram change (scripts + test only). `check:doc-drift` → expect `[OK]`. Merge
  `--no-ff`; push; report the remote hash.

## 5. SELF-VERIFICATION (literal)
- [ ] `git rev-parse origin/master` before (`57039c4`) → merged HEAD (pushed remote hash).
- [ ] **Suite 1205 → 1205 + <new tests>** (the invocation test); paste both counts. All green.
- [ ] `verifyGrantsProbes.test.ts` STILL passes (import side-effect-free under vitest — VITEST set ⇒ suppressed).
- [ ] The `shouldRunProbes({})` → true case passes (proves a bare/vite-node direct run now executes main).
- [ ] Frozen sweep = ZERO. `git diff 57039c4..<HEAD> --stat` = verifyGrants.ts + the new test + CHANGELOG only.
- [ ] Drift `[OK]`; docVersion still rev 51.
- [ ] (Optional, if your lane has live keys) `npx vite-node scripts/verifyGrants.ts` now PRINTS the probe lines
      and exits 0 with `25 passed, 0 failed` — i.e. the documented command is no longer a silent no-op.

## 6. REPORT FORMAT
The helper + guard change pasted; the four test cases + pass; the §5 checklist with literal outputs; the commit
ledger (fix → merge, pushed remote hash).

<!-- END · claude-code-FIX-verifygrants-entry-guard-robust-invocation-v2 · 2026-07-07 · anchor 57039c4 · supersedes v1 -->
