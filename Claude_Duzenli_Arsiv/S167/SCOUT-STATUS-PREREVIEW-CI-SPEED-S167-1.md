[scout-1]
ADVERSARY-VERDICT: RED card=CARD-CI-SPEED-S167-1
GRAFT: graft skeleton scripts/mail-wait.mjs · graft grep "from_lane" · graft grep ".replied" · graft skeleton scripts/relayAudit.ts. graft does not index node_modules, workflow YAML or vitest.config.ts definitions, so the vitest/vite internals were read from the INSTALLED source and the repo files with `git grep`/`git show` at origin/master 9354882aa2f993d8285bb0cefcb9cb1f350ec118.
PROMPTS: one sandbox network denial: productionresultssa17.blob.core.windows.net, the Actions job-log blob reached by `gh api …/actions/jobs/110090717114/logs`. Not retried (P3). It is why the CI core count below is UNMEASURED. No permission prompt.

SCOUT-STATUS-PREREVIEW-CI-SPEED-S167-1 · reply to ORDER-SCOUT-PREREVIEW-CI-SPEED-S167-1 (id a392a51e-5967-440c-a9ed-a14dec4aa28d, md5 7347a301…, DIGEST-OK)
Reviewed 2026-10-01 ~03:40Z, about 6 h after minting. Not superseded: there is no CI-speed PR (gh pr list), and master moved 1f694e1f → 731c1ee4 (PR 656) → 9354882a (PR 659) without touching vitest.config.ts, src/test/setup.ts or build-test.yml's test step.

## 1 · PRECONDITION at 9354882a
- vitest.config.ts:9 `environment: 'jsdom',` · :10 `setupFiles: ['./src/test/setup.ts'],` · :11 include of the three globs: HOLDS. The card omits :8 `globals: true,`, which matters (A1).
- vitest 4.1.9: package-lock.json:13232-13233 and node_modules/vitest/package.json:4. HOLDS.
- build-test.yml:437-439 `- name: Run tests` / `run: npm run test`: HOLDS. package.json:36 `"test": "vitest run"`.
- "workers = cores − 1 → 3 on CI": NOT VERIFIED. `gh repo view` → `"isPrivate":true`. GitHub documents its standard hosted Linux runner as 4 vCPU for PUBLIC repos and 2 vCPU for PRIVATE repos (RECALLED, not measured here). If CI has 2 vCPU, today's default is 1 worker, not 3, and the slip's k ≈ 3.1 (744 s × 3 / 713 s) is miscomputed. See A4.

## 2 · Traps
(a) GREEN at one import level. Lens 1: `git grep -E "\b(window|document|navigator|localStorage|sessionStorage|HTMLElement|requestAnimationFrame)\b"` over api/**/*.ts and shared/**/*.ts, tests excluded → 0 hits. Lens 2: api/shared tests import from src/ in 26 files, and the only modules are src/test/repoRoot (node builtins), src/store/turnHistory.ts (whose one import is shared/turnFinishClass) and src/lib/toolEvidence.ts (no imports). No api/shared source imports from src/. `document.|window.|navigator.` in api/shared test files → 0. Deeper transitive imports were not walked; AG-3's identical failed sets under node cover them empirically.
(b) GREEN, CONDITIONAL ON A1. setup.ts imports '@testing-library/jest-dom/vitest' (matchers, no DOM at import) and `Object.defineProperty(globalThis, 'localStorage', …)`. Node 22.x/24.x (CI build and nightly-compat.yml:58) have no default global localStorage; AG-3's local node-env run on Node 26, where one exists, passed. But setup.ts calls bare `beforeEach(…)` and `vi.restoreAllMocks()`, which exist only under `globals: true`. See A1.
(c) GREEN. `process.(chdir|umask|setuid|setgid|abort)(` and `process.on('SIG` → 0 hits in api/shared tests and 0 in api/, shared/ and scripts/ sources. Children are spawned with `process.execPath` (docDriftAttest:214, mergeGuard:228/236/434, relayAuditGate:238/299), which is the same binary in a worker thread. lensPartialSurvivesKill SIGKILLs a CHILD, not its own worker. AG-3 measured threads only on api/admin, so C5's full CI run is the real proof.
(d) PARTIAL. relay-corpus.yml:101 `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts` is a path filter that must match the node project once (A5). nightly-compat.yml:87 `npm run test` (22.x, 24.x) and :120 `npm run test:coverage` use the same config. The coverage block must stay at the ROOT; that vitest reads coverage only from the root in projects mode is RECALLED, not measured. vitest.exam.config.ts is standalone (its own include, environment 'node') and unaffected.
(e) GREEN. `git grep -E "Test Files|Tests +[0-9]|passed \(|vitest run"` over scripts/ and .github/workflows/ finds only relayAudit.ts:206 and :1560-1564, which are grammar EXAMPLES, not readers. No gate counts tests or files from vitest output.
(f) SPLIT. The machine is CONFIRMED separate: rule26 is its own job (build-test.yml:461-462, `runs-on: ubuntu-latest`), so it never shares the build job's VM. The vCPU count is UNMEASURED (private repo, see §1). maxWorkers 4 on a 2-vCPU VM oversubscribes 2:1.

## 3 · THE DEFECT THAT MAKES THIS RED: inline projects inherit nothing, and `extends` concatenates arrays
- node_modules/vitest/dist/chunks/cli-api.24X8XwN1.js:11113: `const configFile = typeof options.extends === "string" ? … : options.extends === true ? vitest.vite.config.configFile || false : false;`. An inline project WITHOUT `extends` is built with configFile=false, so it gets none of the root's `plugins: [react()]`, `resolve.alias['@']` or `test.globals: true`. As C1 is written ("same setupFiles"), both projects load setup.ts without globals and fail on its first bare `beforeEach`. The dom project also loses JSX transform and '@' resolution.
- With `extends: true`, the project is merged over the root config by Vite's mergeConfig, which CONCATENATES arrays: node_modules/vite/dist/node/chunks/node.js:2595-2597 `if (Array.isArray(existing) || Array.isArray(value)) { merged[key] = [...arraify(existing), ...arraify(value)]; …`. If root `test.include` is left in place, each project's include becomes all three globs plus its own. Every api file would then run twice, once under jsdom, and the saving is erased. `setupFiles` repeated in a project would run setup.ts twice.
- C2's count parity would catch the doubling, but only after the run. The config should be right before the first push.

## 4 · Amendments (paste-ready)
A1. "C1: BOTH inline projects carry `extends: true`. Without it vitest 4.1.9 builds an inline project with configFile=false (vitest/dist/chunks/cli-api.24X8XwN1.js:11113) and it inherits neither `globals: true` (needed by src/test/setup.ts's bare beforeEach/vi), the react plugin, nor the '@' alias."
A2. "C1: `environment` and `include` MOVE out of the root `test` block into the two projects only. `setupFiles`, `globals` and `coverage` stay at the root ONLY and are not repeated in a project. With extends:true, Vite's mergeConfig concatenates arrays (vite/dist/node/chunks/node.js:2595-2597), so a root include would make each project run all three globs."
A3. "C2 prints, at the same tree: the old total (files, tests); the node project's file count = the count of api/**/__tests__/**/*.test.ts plus shared/__tests__/**/*.test.ts; the dom project's = the count of src/**/__tests__/**/*.test.{ts,tsx}; node + dom = the old total, and no file path appears in both projects' lists (`vitest list --filesOnly --project <name>`)."
A4. "PRECONDITION correction: the repository is private (`gh repo view` isPrivate:true), so the CI runner's core count is UNMEASURED and may be 2, not 4. Before keeping `maxWorkers: 4`, AG-3 measures the build job's core count from a source it can quote. If it cannot, maxWorkers is left at the default and the report says UNMEASURED. The slip's k ≈ 3.1 is recomputed with the measured worker count."
A5. "The report quotes the relay-corpus job's `Test Files  1 passed (1)` for `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts` at the PR head. That proves a path filter under projects runs the file once, in the node project."
A6. "PRECONDITION adds vitest.config.ts:8 `globals: true` to the lines it names."

## Box
read relay_inbox at 2026-10-01T03:25:35Z (mail-wait exit 0, 5 rows, head reached). Box NOT emptied on the bus: every scout_reply this window was blocked (see SCOUT1-BLOCKER-BUS-S167-1.md).

END · SCOUT-STATUS-PREREVIEW-CI-SPEED-S167-1
