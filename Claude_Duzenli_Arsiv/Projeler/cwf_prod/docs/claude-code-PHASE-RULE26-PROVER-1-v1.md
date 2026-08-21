# PHASE RULE26-PROVER-1 — headless clip PROVER + KindsTab resolution
**claude-code-PHASE-RULE26-PROVER-1 · v1 · 2026-07-11 · AG-lane (Developer) · single gated phase**

> Architect diagnosis this fixes (Session 36): the register's Q-NEXT presumed a headless
> *measurement* capability that does not exist. There is NO Playwright/Puppeteer, no e2e
> harness; jsdom/vitest cannot measure layout (`scrollWidth` is always 0 — no layout engine);
> the `/dev/admin-preview` seam only *renders* (its docblock says "screenshot"). And the
> "KindsTab scroll defect" is **unconfirmed from code** — the tab is `max-w-3xl` (768px),
> field rows `flex-wrap`, long `kind_id` truncates, the wide `<pre>` lives in a `max-w-lg`
> dialog with `overflow-auto`. So this phase BUILDS the prover, uses it to prove whether the
> clip reproduces at 1280 AND 1024, and — ONLY IF RED — applies the minimal fix. Net standing
> gain: RULE-26 stops being screenshot-manual and becomes an automated CI invariant (the
> automation-first directive: screenshot-RULE-26 was a manual step = a missing-tooling bug).

---

## 0 · RULE-25 BOOTSTRAP (do first, report before touching anything)

```
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak && cd cwf_yaprak
git rev-parse origin/master        # MUST be 6b8e3f1485581de4557b8a71cd1024ca9d53e8a0
npm ci --no-audit --no-fund
```
Verification STARTS at `git rev-parse origin/master`. Anchor = **6b8e3f1** (1945 tests /
184 files / docVersion rev 65). Branch off master; `--no-ff` merge; squash BANNED.

## 1 · PRE-FLIGHT — re-confirm the diagnosis facts (grep-verified; S32-1)

Run each; the RHS is what the Architect observed. If any diverges, STOP and report — the
phase's premises changed.

```
grep -n "admin-preview" src/App.tsx
#   → line 51: import.meta.env.DEV && ... pathname === '/dev/admin-preview' → <AdminPreview/>
#   (DEV-ONLY: this route is tree-shaken from prod. It reads window.location.PATHNAME today,
#    NOT the query string.)

sed -n '72,75p' src/components/admin/AdminPanel.tsx
#   → the tab initializer ALREADY reads window.location.search (scopeBackend → 'replay',
#     else 'rules'). This is the precedent you extend for ?tab=.

grep -nE "playwright|puppeteer" package.json ; echo "exit=$?"
#   → NEITHER present (exit=1). No e2e/visual harness exists.

grep -n "selectedBackendId: null" src/dev/AdminPreview.tsx
#   → the seam seeds capabilities/backends but selectedBackendId=null and seeds NO kinds →
#     KindsTab renders "No kinds for this backend." (empty tab = nothing to measure). You WILL
#     seed representative kinds (sub-phase A2).

sed -n '33,33p' src/components/admin/KindsTab.tsx
#   → KindsTab reads from useAdminStore: { kinds, rules, selectedBackendId, ..., loading, error }
#     and list = kinds.filter(k => k.backend_id === selectedBackendId).

ls .github/workflows/    # → build-test.yml, deploy-langfuse.yml
```

## 2 · HARD CONSTRAINTS (violating any = phase fails)

- **C-1 DEV-only seam ⇒ drive `vite dev`, NEVER `vite preview`/build.** `/dev/admin-preview`
  exists only when `import.meta.env.DEV` is true. `vite preview` serves a PROD build where
  DEV=false and the route is tree-shaken → 404. The Playwright `webServer` MUST run
  `npm run dev` (vite default port 5173; no port override in vite.config).
- **C-2 The prover is a NUMERIC INVARIANT, not a screenshot.** Assert
  `document.documentElement.scrollWidth <= window.innerWidth` at each width. NO visual-
  regression / pixel baselines (flaky, needs golden images). Deterministic or it doesn't ship.
- **C-3 Measure the PAGE, not the tab.** The RULE-26 invariant is "the page does not clip."
  Measuring the `max-w-3xl` tab div would always pass and prove nothing. Measure
  `document.documentElement` (and set `document.body` / html to no forced min-width in the
  harness so a real child overflow is the ONLY thing that can push scrollWidth).
- **C-4 An empty tab measures nothing.** Sub-phase A2 seeds representative worst-case kinds
  FIRST (a CORE locked-to-code kind, a SOFT kind, a long `kind_id`, a field row with long
  `enumValues`), so a real clip — if it exists — is present to be caught.
- **C-5 RULE-1:** the `?tab=` value is whitelisted to the `Tab` union (import/reuse the type;
  no free-string tab). Preserve the existing `scopeBackend → 'replay'` precedence.
- **C-6 jsdom can't measure layout** — do NOT attempt a vitest `scrollWidth` assert; that is
  exactly the trap that made the register think the seam was "the tool." Layout lives in the
  browser; that is why this is Playwright.
- **C-7 Secrets:** none introduced. The prover uses no network beyond localhost dev server.
- **C-8 Report the prover result BEFORE any layout change** (sub-phase C is a GATE, not a
  formality). "Prove the clip first" is the whole point of RULE 26.

## 3 · GATED SUB-PHASES

### A — seam: deep-link + representative kinds (so the prover measures something real)

**A1 · `?tab=` deep-link (prod code, minimal, precedented).** In
`src/components/admin/AdminPanel.tsx` tab initializer (72–75), extend the existing
`URLSearchParams(window.location.search)` read to honor `?tab=<Tab>`: if present AND in the
`Tab` union, use it; else keep the current `scopeBackend → 'replay'` / default `'rules'`
logic. Whitelist against the `Tab` type (C-5). Add a focused vitest unit test
(`AdminPanel` tab-init) covering: `?tab=kinds` → kinds, `?tab=bogus` → rules,
`?scopeBackend=…` still → replay, no-query → rules.

**A2 · seed representative kinds in the seam (DEV-only).** In `src/dev/AdminPreview.tsx`
`seedMockAdmin`, set `selectedBackendId` to a seeded backend id and seed `useAdminStore`
`kinds` + `rules` so KindsTab renders POPULATED. Include, at minimum:
- one **CORE** kind (`class: 'core'`, a `field_spec` mirror) — exercises the "locked to code"
  badge row;
- one **SOFT** kind with several fields, one field of `type: 'enum'` with **long
  `enumValues`** (the widest KindFieldRow case), and a deliberately **long `kind_id`**
  (exercises the `truncate` path);
- a couple of `rules` rows whose `kind_id` matches, so the "N instances →" badge renders.
Keep it in the existing seed-stub style (in-memory, no network, tree-shaken). This is the
worst-case content the prover needs (C-4).

### B — the Playwright RULE-26 prover

- Add `@playwright/test` as a **devDependency**. Add `playwright.config.ts`:
  `testDir: 'e2e'`, one `chromium` project, `webServer: { command: 'npm run dev',
  url: 'http://localhost:5173', reuseExistingServer: !process.env.CI, timeout: 120_000 }`,
  `use: { baseURL: 'http://localhost:5173' }`. No screenshot/trace baselines.
- Add `e2e/rule26-admin.spec.ts`. For each `width of [1280, 1024]`:
  `await page.setViewportSize({ width, height: 900 })`; `await page.goto('/dev/admin-preview?tab=kinds')`;
  wait on a **robust** KindsTab locator (e.g. the PanelPrimer title text
  "Kinds — the structure contract" / "Türler" — pick one language deterministically, or add a
  `data-testid="kinds-tab"` on KindsTab's root `div` and wait on that — the testid is the
  cleaner, language-independent choice; add it);
  **precondition assert**: the tab is populated (at least one kind card present) — a green
  measurement of an empty tab is a false pass, fail loudly if empty;
  **the invariant**: `const clip = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth })); expect(clip.sw, \`RULE-26 clip @${width}: scrollWidth ${clip.sw} > innerWidth ${clip.iw}\`).toBeLessThanOrEqual(clip.iw);`
  On failure, ALSO log the widest offending element (scan elements whose
  `getBoundingClientRect().right > innerWidth`, print the top offender's tag+class) so a RED
  result pinpoints the culprit for the fix.
- Add script `"test:rule26": "playwright test"` to package.json.

### C — RUN THE PROVER · the diagnosis GATE (report BEFORE touching KindsTab layout)

Run `npx playwright install --with-deps chromium` then `npm run test:rule26`. Report the
**raw** result:
- **GREEN at both 1280 and 1024** ⇒ the reported "clip" does NOT reproduce (stale / env-
  specific). Do **NOT** touch KindsTab layout. The item closes as *not-reproducible* and the
  gain is the permanent automated RULE-26 gate. Skip sub-phase D-fix; go to E.
- **RED at either width** ⇒ paste the measured `scrollWidth`/`innerWidth` + the offending
  element the spec logged. THEN apply the **minimal** KindsTab (or KindFieldRow) layout fix
  targeting exactly that overflow (likely candidates named by the Architect: a non-wrapping
  child breaking the `max-w-3xl` cap, or a fixed-width element without `min-w-0`/`shrink`).
  Re-run `npm run test:rule26` → MUST be GREEN at BOTH widths. No layout change beyond what
  the measured overflow requires.

### D — CI wiring

Add a `rule26` job to `.github/workflows/build-test.yml` (mirror the `coverage` job's
node-22 shape): checkout, setup-node 22 (`cache: 'npm'`), `npm ci`,
`npx playwright install --with-deps chromium`, `npm run test:rule26`. This is a build-quality
gate — run it on **both push AND pull_request** (do NOT add the eval-canary `if:` fence; that
fence exists to stop token spend, which does not apply here). No secrets.

### E — docs / seal / count

- If any mapped `.ts` **comment** changed, honor the S34-1 reseal budget (AST `removeComments`
  printer per S35-1, never a raw scanner) and bump `docVersion`.
- Update the ROADMAP tab (and any relevant narrative doc) to record that RULE-26 now has an
  **automated headless gate** (`e2e/rule26-admin.spec.ts`), superseding screenshot evidence.
  Living-doc two-commit seal + `npm run check:doc-drift` [OK] if a narrative tab changes.
- Report the new vitest count (expected: 1945 + the A1 tab-init unit test(s); Playwright specs
  are NOT counted by vitest and do NOT touch the coverage floor). File count delta from new
  files (playwright.config.ts, e2e spec — these are outside `src/**` coverage).

## 4 · SELF-VERIFY (literal evidence — paste it)

1. `git rev-parse origin/master` at start = `6b8e3f1…`.
2. Pre-flight §1 outputs, each matching the annotated RHS (or a STOP report).
3. **The prover result verbatim** at 1280 AND 1024 (RED-with-culprit or GREEN), reported
   BEFORE any KindsTab layout edit (C-8).
4. If RED: the minimal-fix diff + the re-run GREEN at both widths.
5. `npm run test` full count (or shard `1/2`+`2/2` and sum — the full run exceeds a single
   window; report both shard tails). `npm run check:doc-drift` → `[OK]` if a tab moved.
6. The `rule26` CI job added to build-test.yml (paste the job block).
7. Remote HEAD after `--no-ff` merge + push (a merge isn't done until pushed + hash reported).

## 5 · REPORTING CONTRACT

Report: the anchor confirmation; each pre-flight line; **the prover RED/GREEN before any fix**;
the fix diff + green re-run IF RED; the count/file/rev deltas; the pushed remote HEAD. The
Architect will RULE-25 fresh-clone review; note that Architect's own sandbox likely CANNOT
download a browser binary (egress allowlist = npm/pypi/github only), so the Playwright test's
Architect verification is code-read + confirming the `rule26` CI job ran green — a flagged
verification-surface reduction, already disclosed to the owner.

<!-- END · claude-code-PHASE-RULE26-PROVER-1 · v1 · 2026-07-11 -->
