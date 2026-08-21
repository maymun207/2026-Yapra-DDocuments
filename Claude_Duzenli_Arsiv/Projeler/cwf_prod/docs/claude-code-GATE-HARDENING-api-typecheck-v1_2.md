# Claude Code — GATE-HARDENING: typecheck `api/` + `scripts/` in the build gate (close the build-green hole)
**Artifact: `claude-code-GATE-HARDENING-api-typecheck-v1.md` · v1 · 2026-06-28**
*(Cross-cutting gate fix. NOT a trust-line phase. Runs on master HEAD `7451383` (D-core). Independent of Phase E.)*

> **Read fully before writing a line.** This phase closes a foundation hole, it adds no product behavior.
>
> **The hole (proven, live):** `tsc -b` references only `tsconfig.app.json` (`include: ["src","shared"]`) and
> `tsconfig.node.json` (`include: ["vite.config.ts"]`). **The entire `api/` backend — `chat.ts`, the trust line,
> grounding, the eval-gate, knowledge, scripts — is in NEITHER.** `vitest` runs `api/` transpile-only (esbuild,
> no type errors surface). So the "api nodenext typecheck green" every CHANGELOG entry cites is an **ad-hoc
> command in no committed script**, and a real `TS2459` already sits in `api/cwf/__tests__/supersetGate.test.ts`
> (it imports `type RuleInstanceLike` from `composeSuperset`, which only *imports* it from `composeArmes` and
> never re-exports it) — present since ≥`8e9f65d`, caught by nothing. A type error in `chat.ts` or the grounding
> layer would land green today. This is the build-green-hides-it trap, on the foundation.
>
> **Root cause (do NOT "solve" by mass-migrating imports):** `api/` SOURCE (57 files) + `scripts/` ship as
> **ESM-nodenext** (`.js`-extension imports; `package.json "type":"module"`). `api/` TESTS (17 files) run under
> **vite's bundler resolution** (extensionless imports; `0` use `.js`). Two resolutions, two realities. The fix
> is **two typecheck passes that match the two realities** — nodenext for ship code, bundler for tests — **with
> zero import migration**. Migrating 17 test files to `.js` extensions is the trap: high blast radius, risks
> vitest resolution, and is unnecessary since tests run under the bundler.
>
> **DISCOVER-THEN-DECIDE:** the nodenext source pass may surface *latent* errors we can't see yet. The pre-flight
> RUNS it and **reports the baseline count BEFORE any fix**. A small, clearly type-only baseline → fix it. A large
> pile, or any fix that would change runtime behavior → **STOP and surface the count**; we scope a follow-up. Do
> not bulk-patch blind, and never silence a nodenext error with a behavior change.

---

## 0. HARD PRE-FLIGHT GATE (do all; paste evidence; STOP on a surprise)

1. `git rev-parse HEAD` → `7451383…` (D-core). Clean tree. `node --version` / `npx tsc --version` (TS `~6.0.2` pinned).
2. **Prove the hole is real (the live error):**
   `npx tsc --noEmit --moduleResolution bundler --module esnext --skipLibCheck api/cwf/__tests__/supersetGate.test.ts 2>&1 | grep -i "RuleInstanceLike\|TS2459"` → the error shows. Quote it. (Confirms a type error survives the current gate.)
3. **Confirm nothing committed typechecks `api/`:** show `package.json` `scripts` (no `typecheck:api`); show `tsconfig.json` references (`app` + `node` only) and that neither includes `api`/`scripts`.
4. **Confirm the import-split** (drives the two-config design): `grep -rlE "from '[^']*\.js'" api --include="*.ts" | grep -v __tests__ | wc -l` (~57 source, nodenext) vs `grep -rlE "from '[^']*\.js'" api/cwf/__tests__ --include="*.ts" | wc -l` (0 tests). Tests are bundler; do NOT change that.
5. Confirm `composeArmes` **exports** `RuleInstanceLike` (`grep -n "export interface RuleInstanceLike" api/cwf/_lib/knowledge/composeArmes.ts`) — so the fix imports from the definition site, not a new re-export.

---

## 1. SCOPE (build exactly this — gated sub-steps; STOP-and-report between G1 and the fixes)

### G1 — nodenext typecheck for SHIP code (`api/` source + `scripts/`), DISCOVER baseline first
Create **`tsconfig.api.json`** (root): `module: "nodenext"`, `moduleResolution: "nodenext"`, `noEmit: true`,
`strict: true`, `skipLibCheck: true`, `target: "es2023"`, `lib: ["ES2023"]`, `types: ["node"]`,
`moduleDetection: "force"`. `include: ["api/**/*.ts","scripts/**/*.ts","shared/**/*.ts"]`,
`exclude: ["**/__tests__/**","**/*.test.ts","**/*.d.ts"]`. (Do NOT `extends` `tsconfig.app.json` — that pins
bundler resolution; this pass MUST be nodenext to enforce the `.js`-extension ESM correctness the source already
uses. No `allowImportingTsExtensions`.)
- **Run it once:** `npx tsc -p tsconfig.api.json` → **report the full error list + count, and STOP if it is not
  trivially clean.** Expected: clean or near-clean (the source already uses `.js` ESM imports). If a real pile
  appears, paste it and HALT — do not fix blind.
- If clean/near-clean: any fix is **type-only, no runtime behavior change** (an import form, a missing `.js`
  extension, a type annotation). **If a nodenext error can only be resolved by changing runtime behavior, STOP
  and surface it** — that is a real bug to discuss, not to silence.

### G2 — bundler typecheck for TESTS + fix the live error
Create **`tsconfig.api.test.json`** (root) that **`extends: "./tsconfig.app.json"`** (inherits bundler resolution,
the reality tests run under), overriding `types: ["node","vitest/globals"]`,
`include: ["api/**/__tests__/**/*.ts","api/**/*.test.ts"]`. (Source `.js` imports pulled in transitively resolve
to `.ts` under bundler — fine.)
- **Run it:** `npx tsc -p tsconfig.api.test.json` → the `supersetGate` `TS2459` appears (red). Paste it.
- **Fix the live error — one line, at the definition site:** in `api/cwf/__tests__/supersetGate.test.ts`, import
  `RuleInstanceLike` from `../_lib/knowledge/composeArmes` (where it is `export interface`-d, matching
  `acidScaffold.containment.test.ts` and `evalGate.test.ts`). Do **NOT** add a re-export to `composeSuperset`
  (don't widen its public surface). Re-run `tsc -p tsconfig.api.test.json` → green. Paste.

### G3 — wire BOTH into the gate so a type error can never land green again
- `package.json` scripts: add `"typecheck:api": "tsc -p tsconfig.api.json && tsc -p tsconfig.api.test.json"`.
- Fold it into the deploy gate: `"build": "tsc -b && npm run typecheck:api && vite build"`. (Vercel runs `build`;
  this is the only way "build green" becomes a real guarantee — the entire point of the phase. It adds two fast
  `tsc --noEmit` passes; note the tradeoff in the docs.)

---

## 2. CONSTRAINTS / TRAPS (any violation = fails review)
- **No mass import migration.** The 17 test files stay **extensionless/bundler**. Source stays `.js`/nodenext.
  Touching test import extensions to "unify" is a hard stop (blast radius + vitest risk + pointless).
- **No runtime behavior change.** This phase is type-coverage + one test-import fix + configs/scripts. The only
  source edit permitted is a **type-only** baseline fix from G1 (if any), each justified as no-behavior.
  Prove behavioral freeze: `git diff 7451383 -- api/cwf/chat.ts api/cwf/_lib/grounding api/cwf/_lib/knowledge/gate`
  is **empty** (or, if G1 forced a type-only fix there, the diff is the annotation only — quote and justify it).
- **`tsc -b` stays src+shared-only.** Do NOT add `api`/`scripts` to `tsconfig.app.json`/`tsconfig.node.json` — that
  would pull the server graph into the frontend build. `api`/`scripts` are typechecked by `typecheck:api`, a
  separate pass invoked from `build`.
- **No new dependency.** `typescript` is already pinned; reuse it. No new `@types/*` unless G1 proves one is
  genuinely missing (report it first).
- **DISCOVER-THEN-DECIDE on G1.** Report the nodenext baseline count before fixing; HALT on a large pile.
- Secrets via env only; evidence never to telemetry; do not touch `CWF-DEMO`.

## 3. DOCS (RULE 3)
- `.agents/CHANGELOG.md`: GATE-HARDENING — `api/`+`scripts/` now typechecked in the gate (nodenext source +
  bundler tests); the latent `supersetGate` `TS2459` fixed at the definition site; the ad-hoc "api nodenext
  typecheck" is now a committed `typecheck:api` folded into `build`. Record the G1 baseline result.
- `.agents/AGENTS.md` — a new standing rule (next free RULE #, **likely RULE 14**):
  *Server code (`api/` + `scripts/`) is typechecked in the build gate under its real resolution — **nodenext for
  ship code** (`.js`-extension ESM, `tsconfig.api.json`), **bundler for tests** (`tsconfig.api.test.json`). A green
  `vite build`/`vitest` alone is NOT proof of `api/` type-correctness — `vitest` is transpile-only and `tsc -b`
  covers only `src`+`shared`. `npm run typecheck:api` is part of `build`; never re-create an ad-hoc out-of-gate
  typecheck.* Cross-ref the prior "api nodenext typecheck" CHANGELOG claims as now-committed.
- SKILL KB: record the two-config model + the resolution split (source ESM-nodenext / tests bundler) and why no
  import migration.
- ROADMAP: add **GATE-HARDENING ✅** (api/scripts typecheck folded into the gate; latent error fixed) to the
  completion set, before **E ⏳**.

## 4. SELF-VERIFY CHECKLIST (report MUST show evidence)
- [ ] Pre-flight §0: HEAD `7451383`; the live `supersetGate` `TS2459` quoted (proof the hole is real); no
      committed `typecheck:api` shown; import-split counts shown.
- [ ] **G1 baseline reported:** the first `tsc -p tsconfig.api.json` output + error count, BEFORE any fix. If >0,
      each fix listed and justified as type-only/no-behavior (or HALTED with the count).
- [ ] `tsconfig.api.json` (nodenext, source+scripts, tests excluded) + `tsconfig.api.test.json` (bundler, tests)
      committed; `typecheck:api` in `package.json`; folded into `build`.
- [ ] **Gate proven to bite:** seed a deliberate type error in an `api/` SOURCE file (e.g. assign a `string` to a
      `number`), run `npm run typecheck:api` → **RED** (paste); remove it → **GREEN** (paste). This proves a future
      `api/` type error fails the gate.
- [ ] **Live error fixed:** `supersetGate.test.ts` imports `RuleInstanceLike` from `composeArmes`;
      `tsc -p tsconfig.api.test.json` green; **`composeSuperset` got NO new re-export** (grep-proven).
- [ ] **Behavioral freeze:** `git diff --stat 7451383 -- api/cwf/chat.ts api/cwf/_lib/grounding api/cwf/_lib/knowledge/gate`
      empty (or type-only, quoted+justified). No `_lib` runtime logic changed.
- [ ] **Full green WITH the new passes in `build`:** `npm run build` (now incl. `typecheck:api`) · `oxlint(0)` ·
      `vitest` **340 passed, 0 todo** (unchanged — this phase adds no tests). Paste the totals.
- [ ] CHANGELOG + AGENTS RULE + SKILL + ROADMAP updated. Commit + report HEAD.
- [ ] Commit: `chore(gate): typecheck api/+scripts in the build gate (nodenext source + bundler tests); fix latent supersetGate TS2459 at the definition site; close the build-green hole. no runtime behavior change`.

**Stop conditions:** the G1 nodenext baseline surfaces a large/unclear error pile (report the count, HALT — don't
bulk-fix); any fix would change runtime behavior (surface it, don't silence); test imports get migrated to `.js`
(out of scope); `api`/`scripts` added to `tsconfig.app.json`/`tsconfig.node.json` (wrong separation).

---

## 5. WHERE THIS LEAVES THE LINE
After this, "green build" finally *means* the server is type-correct: `chat.ts`, the trust line, grounding, and the
eval-gate are checked under nodenext on every `build`; tests are checked under the bundler they run in; and the
class of error that sat invisible in `supersetGate.test.ts` can no longer land. This unblocks **Phase E
(cross-source reconciliation)** to be written over a typechecked backend — E adds non-trivial `api/` grounding
logic, and shipping it without this coverage would be the same trap, deferred. **E remains gated** on the
owner-run ARMES-on comparability acceptance pass; this phase changes nothing about that gate.
