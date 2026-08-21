# FIX — verifyGrants entry-guard: robust run-as-script detection (fix the vite-node false-green)
**v1 · 2026-07-07 · anchor = origin/master `57039c4` · Author lane (AG) · a security-tooling correctness fix.**

<!-- v1 · Empirically confirmed (Architect ran an argv probe under both invocations): the entry-guard added in
     the B code phase — `if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)` —
     SUPPRESSES main() under the script's OWN DOCUMENTED command `npx vite-node scripts/verifyGrants.ts`,
     because under vite-node process.argv[1] is the vite-node binary (…/.bin/vite-node), not the script, so the
     comparison is false and the script exits 0 with ZERO probes run — a SILENT FALSE-GREEN in the grant-verify
     tool the whole two-gate discipline relies on. It works only via `node --import tsx …` (argv[1] = the
     script). Fix: robust detection that fires under BOTH direct-run styles yet still suppresses on import (the
     CI PROBES-coverage test must keep importing PROBES without running main). This is a security-enforcement
     script → FULL REVIEW even though the change is small. -->

You implement THIS prompt exactly. No re-scope. If something seems wrong, STOP and report.

---

## 0. HARD PRE-FLIGHT GATE (paste evidence)
1. `git rev-parse origin/master` == `57039c4` (fresh clone; if moved, STOP).
2. `npm ci` clean; **full suite green 1205 / 117** (baseline).
3. Drift `[OK]`; `git status` clean; branch `master`; merge `--no-ff` (squash BANNED).

## 1. HARD CONSTRAINTS
- **Two files only:** `scripts/verifyGrants.ts` (the guard) + a NEW unit test. Optionally a shared helper file
  IF you place the pure function there — but keep it minimal; inlining the exported helper in verifyGrants.ts is
  fine. NOTHING else: no PROBES/PROBES_COVERAGE_EXEMPT change, no migration, no engine, no endpoint, no frozen
  file (evalGate/groundingCheck/trustRegistry/prompt-core/resolveAuthHeader/mcpSecrets/chat.ts untouched).
- **Import must stay side-effect-free.** The CI PROBES-coverage test (`verifyGrantsProbes.test.ts`) imports this
  module; after the fix, importing it must STILL NOT run main() or connect to any DB. Confirm that test passes.
- **No behavior change to the probes themselves** — same PROBES, same anon-UPDATE checks, same output.

## 2. THE CHANGE
Extract a PURE, exported helper and replace the inline guard with it:

```ts
/**
 * True when this module was invoked AS THE ENTRY SCRIPT (directly run), false when merely
 * imported (e.g. by the CI PROBES-coverage test). Robust across launchers: `node file.ts`,
 * `node --import tsx file.ts`, and `vite-node file.ts` all place the script PATH somewhere in
 * argv (argv[1] for node, argv[2] for vite-node whose argv[1] is the vite-node binary), so we
 * scan argv[1..] for an entry that resolves to THIS module's URL. A test runner's argv never
 * contains this script's path, so main() stays suppressed on import.
 */
export function isInvokedAsScript(argv: readonly string[], metaUrl: string): boolean {
    return argv.slice(1).some((a) => {
        try {
            return pathToFileURL(path.resolve(a)).href === metaUrl;
        } catch {
            return false;
        }
    });
}
```
(Add `import path from 'node:path';` — `pathToFileURL` is already imported.) Then replace the bottom guard:

```ts
// Run the live probes ONLY when invoked directly (node / node --import tsx / vite-node). When
// imported (the CI PROBES-coverage test), main() does NOT run and nothing connects to a DB.
if (isInvokedAsScript(process.argv, import.meta.url)) {
    main().catch((e) => { console.error(e); process.exit(1); });
}
```

## 3. NEW UNIT TEST (the anti-regression guard — this is the point)
Create `scripts/__tests__/verifyGrantsInvocation.test.ts` (or the repo's script-test location) asserting
`isInvokedAsScript` returns the right verdict for the three real argv shapes. Use the ACTUAL resolved path so
the test is meaningful (compute `const self = pathToFileURL(path.resolve('scripts/verifyGrants.ts')).href;`):
- **vite-node style** — `['/usr/bin/node', '/x/.bin/vite-node', 'scripts/verifyGrants.ts']`, metaUrl = `self`
  → **true** (the bug case — this MUST be true now).
- **node --import tsx style** — `['/usr/bin/node', 'scripts/verifyGrants.ts']`, metaUrl = `self` → **true**.
- **imported-by-test style** — `['/usr/bin/node', '/x/.bin/vitest', 'run']`, metaUrl = `self` → **false**
  (import must NOT trigger main).
- **absolute-path arg** — `['/usr/bin/node', path.resolve('scripts/verifyGrants.ts')]`, metaUrl = `self` →
  **true** (abs args resolve too).
Run the test from repo root so `path.resolve('scripts/verifyGrants.ts')` matches `self`.

## 4. SEAL
- `.agents/CHANGELOG.md`: a short FIX note — "verifyGrants entry-guard was a silent no-op under its documented
  `npx vite-node` command (argv[1] is the vite-node binary, not the script → main() never ran → false-green);
  replaced with a robust `isInvokedAsScript(argv, metaUrl)` that fires under node / tsx / vite-node yet stays
  suppressed on import; unit-tested for all three argv shapes."
- No docVersion bump / no diagram change expected (scripts + test only; not a mapped diagram area). Run
  `check:doc-drift` → expect `[OK]`. Merge `--no-ff`; push; report the remote hash.

## 5. SELF-VERIFICATION (literal)
- [ ] `git rev-parse origin/master` before (`57039c4`) → merged HEAD (pushed remote hash).
- [ ] **Suite moves 1205 → 1205 + <new tests>** (the invocation test file); paste both counts. All green.
- [ ] `verifyGrantsProbes.test.ts` STILL passes (import stays side-effect-free — no DB connect on import).
- [ ] The new invocation test passes with the vite-node-style argv asserting **true** (the bug case).
- [ ] Frozen-file sweep = ZERO. `git diff 57039c4..<HEAD> --stat` = verifyGrants.ts + the new test + CHANGELOG
      (+ optional helper file) only.
- [ ] Drift `[OK]`; docVersion still rev 51.

## 6. REPORT FORMAT
The helper + guard change pasted; the new test's four cases + pass; the §5 checklist with literal outputs; the
commit ledger (fix → merge, pushed remote hash).

<!-- END · claude-code-FIX-verifygrants-entry-guard-robust-invocation-v1 · 2026-07-07 · anchor 57039c4 -->
