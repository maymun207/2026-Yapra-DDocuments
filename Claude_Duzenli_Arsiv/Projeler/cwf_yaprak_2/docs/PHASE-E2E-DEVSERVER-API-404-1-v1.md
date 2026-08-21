# PHASE — E2E-DEVSERVER-API-404-1 · v1
<!-- PHASE-E2E-DEVSERVER-API-404-1-v1 · 2026-08-02 · S79 · rollout plan
     1.2b-pre (the HEAD of RULE26-HARDEN-1 / plan 2.3, pulled forward by
     Architect ruling because it blocks a reviewed merge; the REST of 2.3
     stays at 2.3). Authored on reads run this session against a fresh clone
     at origin/master = dec3ff55. ONE self-contained relay (D-2).
     STOP-FOR-REVIEW at the end. Do NOT merge. -->

## §0 · THE RULING YOU ASKED FOR
**Option B, executed as its own branch, merged BEFORE
`phase/inspect-verdict-1`. Option A is rejected on both of its parts.
Option C is rejected.**

Why A is rejected, part by part — this is the reasoning you should carry,
not just the verdict:
- **Hiding `vite-error-overlay` with CSS.** The overlay is not noise to be
  filtered; it is a true report that the dev server is broken. A RULE-26
  measurement that renders with the overlay suppressed would be measuring a
  page the harness knows is wrong and reporting a number as if it were
  right. If an overlay is ever present again, the correct outcome is a LOUD
  red, not a clean measurement taken around it.
- **A reload-retry when the tab doesn't render.** That is a rerun with the
  evidence removed. An honest rerun at least appears in the run record and
  demands a signature comparison; a retry inside the spec converts an
  intermittent failure into invisible green forever. This project's gates
  are worth exactly as much as their willingness to stay red.

Why B is right: vite serves no API, so a request to `/api/**` must be
answered as *absent*, never resolved to a server source file on disk and
transformed as a client module. The current behaviour is not a flake — it is
the harness answering a question it has no business answering, and then
broadcasting its own confusion to every connected client. Fixing the answer
removes the whole family; hiding the broadcast removes one symptom in one
spec.

**Your own analysis is what earned this ruling.** You proved the mechanism
with a direct probe instead of inferring it, you refused a rerun you were
explicitly permitted to request, and you named your earlier error precisely:
you had checked whether your spec was *blamed*, not whether it was
*exposed*. That distinction is now on the register as a premise-error
pattern in its own right.

## §1 · HARD PRE-FLIGHT (any mismatch = STOP and report)
Fresh FULL clone (`git rev-parse --is-shallow-repository` → false), branch
from **`dec3ff557036bc142d85002d596f9c74325a76ce`** — NOT from
`phase/inspect-verdict-1`, which stays byte-frozen exactly as reviewed.
1. `git rev-parse origin/master` → `dec3ff55…`
2. `ls supabase/migrations/*.sql | wc -l` → **65** (this phase adds ZERO)
3. Baseline suite counts re-proven on the untouched clone (expect 420/4675
   at this anchor — `phase/inspect-verdict-1`'s 424/4708 is NOT your
   baseline; you are branching from master, not from it).
4. `grep -oE '"docVersion": ?"[^"]*"' public/architecture/manifest.json`
   → **rev 179** (the branch's 180 is not yours; you reseal 179 → 180 too,
   and the two will reconcile at merge time — see §5).

## §2 · WHAT IS TRUE TODAY (read this session — do not re-derive as opinion)
- `playwright.config.ts`: `fullyParallel: true` · `retries` is **not set**
  (so 0) · `webServer.command = 'npm run dev'` · a comment already pins WHY
  it must be the dev server (C-1: the `/dev/admin-preview` seam exists only
  under `import.meta.env.DEV`).
- `vite.config.ts`: `plugins: [react()]` — no middleware of any kind today.
- `src/lib/params/admin.ts`: `ADMIN_API_BASE = '/api/admin'`.
- `src/dev/AdminPreview.tsx` already carries the LESSON this phase
  generalises, written at its Quota stub (S38-CLEAN-1): an admin method the
  harness fails to stub falls through to the real network path, and the vite
  server answers it with something misleading rather than nothing.
- `adminService` issues `/rules?…` from FOUR call sites (~:1054, :1061,
  :1097, :1138). The harness stubs `listRules` and `getRule` only — the
  reference-instances call (~:1138) is not stubbed, which is the request
  that reaches vite.
- CI: `.github/workflows/build-test.yml` job `rule26` runs
  `npm run test:rule26`.

## §3 · BINDING CONSTRAINTS
1. **Dev-only. Zero production surface.** The middleware must exist only in
   the dev server path and must be provably absent from a production build.
   State how you guarantee it and prove it (`apply: 'serve'` on the plugin,
   plus a build-output check).
2. **404, not a friendly stub.** The dev server answers `/api/**` with a
   plain 404 and an honest JSON body. It must NOT return `index.html`, must
   NOT return `{}`, and must NOT attempt to serve any API. A harness that
   fakes success is how S38-CLEAN-1 happened.
3. **`retries` stays 0.** You may not add retries, a `retry` flag, a
   reload-retry, or any per-spec wait-and-hope. If a spec is unstable after
   this fix, that is a finding to report, not a knob to turn.
4. **No CSS suppression of `vite-error-overlay`** anywhere, in any spec.
5. **`phase/inspect-verdict-1` is not touched.** No commits on it, no
   rebase, no cherry-pick out of it. Its reviewed sha stays `c32b881a`.
6. Zero migrations, zero governed writes, zero publishes, zero Operator
   steps, no new env var, no secret (ADR-007).

## §4 · GATED SUB-PHASES

### G1 · POSITIVE CONTROL FIRST (the fix must be proven able to fail)
Before writing the fix, reproduce the poison deterministically on the
untouched anchor and RECORD it: your own method (curl the
`/api/admin/rules?backend=armes&reference=armes.tool_graph_node` URL in a
loop while a spec interacts) is the sanctioned one. Paste the observed
failure — the transform PARSE_ERROR and an overlay-intercepted or blank-page
spec failure. **A fix whose "before" was never made to fail red is not
evidence (S66-1).**

### G2 · THE FIX
A dev-only vite plugin (`apply: 'serve'`) whose middleware answers any
request whose path starts with `/api/` — before vite's own transform
middleware sees it — with `404` and a small JSON body naming the harness
(e.g. `{"error":"no API in the dev server — this is the vite harness"}`).
Placement matters: it must run early enough that the path is never resolved
to a file on disk. Say in a comment WHY this exists, in the register's
voice: the dev server has no API, so the honest answer to an API request is
*absent*, and the alternative — transforming a server module and shouting
the failure over HMR to every client — poisons every spec running in
parallel.

### G3 · THE HARNESS COMPLETES ITSELF
With G2 in place the omission becomes LOUD (a clean 404 the app surfaces as
an error) instead of silent. Now finish the job the loud signal names: stub
the reference-instances call the Rules tab makes, in `AdminPreview.tsx`,
following the file's existing stub pattern and its S38-CLEAN-1 note.
- **Measure, do not assume.** Run `rule26-admin.spec.ts` Rules @1024 BEFORE
  adding the stub and report whether the clean 404 changed that test's
  content path. If it passes unchanged, say so and add the stub anyway with
  that measurement recorded; if it changes, the stub is what restores it.
  Either way the reader must see which of the two happened.

### G4 · PROOF THE FAMILY IS GONE
- Re-run the G1 reproduction with the fix in place: the probe must produce a
  404 and NO overlay, and the spec under interaction must stay green.
- Run the FULL e2e suite (both `rule26-admin.spec.ts` and, from a scratch
  worktree checkout of `phase/inspect-verdict-1`'s spec file placed on top
  of your branch **for measurement only, never committed**,
  `inspect-verdict.spec.ts`) **three consecutive times**. Report the raw
  per-run results. One clean run is not evidence for a defect whose whole
  nature is intermittency; three are the minimum and you say so plainly if
  any run reds.
- If `inspect-verdict.spec.ts` still reds after the fix, STOP and report —
  that would mean the spec has a second, independent defect and my ruling
  needs revisiting. Do not repair someone else's branch from inside this one.

### G5 · DOCS
CHANGELOG + KB lesson (name the pattern: a test harness that answers a
question it has no answer for is worse than one that refuses) + `reseal`
(179 → 180) + `check:doc-drift` [OK], in the SAME commit as the code.

## §5 · SELF-VERIFY (literal evidence, no adjectives)
1. `git rev-parse origin/master` at start · branch name · head sha.
2. The §1 four pre-flight outputs.
3. `git diff --stat dec3ff55..HEAD` + full file list.
4. Suite before/after with the delta explained per file.
5. `tsc -b` + `typecheck:api` clean.
6. G1's recorded RED, and G4's three consecutive run results, raw.
7. Production-absence proof for the middleware (§3.1).
8. Statement that `phase/inspect-verdict-1` was not touched:
   `git rev-parse origin/phase/inspect-verdict-1` → `c32b881a…` unchanged.
9. reseal 179 → 180 + doc-drift verdict.
10. Zero migrations · zero governed writes · zero publishes · zero Operator
    steps — or name what you needed and STOP instead.

**Merge-order note (for the GO, not for you to execute):** this branch
merges FIRST. `phase/inspect-verdict-1` then merges unchanged in content;
its reseal collides with yours at 179→180 and that collision is resolved at
ITS merge, by re-running reseal on the merge result — the Architect will
name that step in the revised GO. Do not pre-solve it here.

## §6 · STOP-FOR-REVIEW
Push `phase/e2e-devserver-api-404-1`, open NO PR, merge NOTHING, hand back
the report.

<!-- TAIL ANCHOR (S61-3): this relay ends after the words "hand back the
     report." and this comment. Missing line = truncated relay — request a
     re-send before acting. -->
<!-- END · PHASE-E2E-DEVSERVER-API-404-1-v1 -->
