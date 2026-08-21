# PHASE-CI-DIET-1 — v1
**Lane: AG-1 (Author) · one small phase · branch `phase/ci-diet-1`**
**Authored by Architect, S85. S37-1: versioned; amendments arrive as v1_2, never silent overwrite.**

## PRECONDITION (S47-1 — verify before any write)
- Fresh full clone (`--depth` banned), `git rev-parse origin/master` = `be8509ef5040c6af6046a90e6f4a9555c05c4d44`. If master moved, STOP and report.
- `.github/workflows/build-test.yml` = 199 lines; `on.push.branches: ["master"]`; eval-canary fence is `if: github.event_name == 'push' || github.event_name == 'workflow_dispatch'`.
- `vercel.json` contains NO `ignoreCommand` key.
- If any precondition fails, STOP and report the observed byte — do not adapt silently.

## WHY (diagnosis, verified from live bytes this session)
1. **Docs-only report pushes to master fire the full team** (build ×2 matrix, coverage, rule26, eval-canary). AG's observed two-commit pattern (merge push, then report push) means every phase pays CI twice.
2. **The report push supersedes the merge deploy on Vercel**, so the merge SHA's canary polls the full 900 s and reds with "never became live" (S84 evidence: 9056a50). S84-1 exists only because of this mechanism.
3. **Canary on a non-master ref is possible via `workflow_dispatch` on a branch** (push is already master-only; PR plane is already fenced). The dispatch hole burns 900 s polling for a SHA prod will never serve.
4. Trap found in recon: `public/docs/*.md` are **runtime-served**. Any "skip on *.md" rule would silently stop shipping user-facing docs. The skip set is therefore an explicit prefix allowlist, never a glob on extension.

**INVARIANT (S37-2, untouchable):** a push to master containing ANY code change runs the FULL team. `paths-ignore` skips only when EVERY changed file matches the docs set. Mixed pushes always build, test, and canary.

## CHANGES (exactly these, nothing adjacent)

### C1 — `.github/workflows/build-test.yml`: docs-only pushes trigger nothing
On the `push` trigger ONLY (leave `pull_request` untouched — a docs-only PR must still get its checks):
```yaml
push:
  branches: [ "master" ]
  paths-ignore:
    - 'docs/**'
    - '.agents/**'
```

### C2 — eval-canary fence: master-ref only
Extend the existing fence (do not restructure the job):
```yaml
if: (github.event_name == 'push' || github.event_name == 'workflow_dispatch') && github.ref == 'refs/heads/master'
```
This closes the dispatch-on-branch hole while keeping manual master re-runs alive.

### C3 — workflow-level concurrency, cancel only off-master
At workflow top level:
```yaml
concurrency:
  group: build-test-${{ github.ref }}
  cancel-in-progress: ${{ github.ref != 'refs/heads/master' }}
```
Rationale: stacked PR pushes cancel their stale runs; master runs are NEVER cancelled — canary debt is an obligation to run (KB v85), and a cancelled master canary would be unpaid debt. Guard is written to the observed pattern (ÖNCÜL #26).

### C4 — Vercel deploy skip for docs-only pushes
`vercel.json` gains:
```json
"ignoreCommand": "node scripts/vercel-ignore.mjs"
```
New file `scripts/vercel-ignore.mjs`:
- Exports `DOC_PREFIXES = ['docs/', '.agents/']` and `isDocsOnly(files: string[]): boolean` — true iff `files` is non-empty and every entry starts with a prefix in `DOC_PREFIXES`.
- CLI body (guarded by `import.meta.url` main-check): run `git diff --name-only HEAD^ HEAD`; if `isDocsOnly` → `process.exit(0)` (skip build); else `process.exit(1)` (build).
- **Failure honesty (MEASURE-READ-HONESTY spirit):** any exec/git error, empty diff read, or missing HEAD^ → `exit(1)` (BUILD). "Could not read" must never look like "docs-only". No silent-green skip path.

### C5 — tests (vitest include does not cover `scripts/**` → tests live in `api/cwf/__tests__/`)
New `api/cwf/__tests__/vercelIgnore.test.ts`, importing `isDocsOnly` + `DOC_PREFIXES` from the `.mjs` directly. Both directions (D-5):
1. `['docs/relay/PHASE-X-report.md', '.agents/CHANGELOG.md']` → **true**.
2. `['docs/relay/r.md', 'api/cwf/chat.ts']` → **false** (mixed = build).
3. `['public/docs/cwf-nasil-calisir-v1.md']` → **false** — the runtime-served-md trap, pinned as a named test.
4. `[]` → **false** (empty read is not docs-only).
5. **Roster-parity test:** read `.github/workflows/build-test.yml`, extract the `push.paths-ignore` entries, assert they equal `DOC_PREFIXES.map(p => p + '**')` — the yaml and the script may never drift apart.

## EVIDENCE PLAN
- **Pre-merge:** unsharded CI on the PR head green (S37-2 arbiter; canary structurally absent on the PR plane — not a failure). Report the run URL + test count delta (expected: +1 file / +5 tests over 485/5599; exact count read from CI, never asserted locally).
- **Post-merge self-test (the phase proves itself on its own two-commit pattern):**
  - The **merge push** is a code push → full team, 5/5 expected, **canary must now converge** (no follow-up deploy supersedes it — S84-1 tension structurally resolved; the law stays on the books).
  - Your **report push** (docs/relay + .agents only) is the natural probe: expected outcome = **zero workflow run** AND **Vercel deploy skipped**. Paste both observations (Actions list screenshot/line + Vercel dashboard state) into the merge report. Positive control for the absence claim (S66-1): the merge push's full run in the same window.
- docVersion: expected **unchanged at rev 205** (no architecture-tab content). If `check:doc-drift` demands a bump, STOP and report — do not bump silently.

## GUARDRAILS
- No other workflow file, no `deploy-langfuse.yml` contact, no package.json script changes beyond what C4/C5 need (expected: none).
- Merge `--no-ff` only, squash banned. Tail anchor (S61-3): merge waits for Architect GO; the GO block will carry the verbatim merge message and the CI-verification blocking step.
- Touch counter (doctrine v1_2 D-6): this prompt = touch 1 of 4 (prompt → report → GO → merge report).

<!-- END PHASE-CI-DIET-1-v1 · tail anchor: DO NOT MERGE WITHOUT ARCHITECT GO -->
