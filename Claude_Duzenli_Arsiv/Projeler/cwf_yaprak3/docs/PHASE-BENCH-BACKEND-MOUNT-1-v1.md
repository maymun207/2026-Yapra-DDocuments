# PHASE-BENCH-BACKEND-MOUNT-1-v1 — a backend joins this platform without a deploy

<!-- S98 · Architect-authored · lane AG-1 · Wave-5 MAIN · walk item #16 ·
     🔑 SOTA gate key 3 of 7. Filed through relay_inbox (single-line). -->

## PRECONDITION (S47-1)
Fresh clone at `origin/master` = `cc9a2a78de473b2ec6eeb3d38641780cc781851b`
(rev 249 · 575 vitest test files · 77 migrations · 15 ADRs · drift 7/7 ·
zero `phase/*`). Disagreement → STOP and report.

## WHY (the criterion, not the feature)
The SOTA claim is that onboarding a backend becomes a CONFIGURATION STEP,
not an engineering project. Today a new MCP backend still needs a human to
know things the system could ask the backend itself. This phase makes the
mount path complete and self-configuring end to end, and #15's four-state
law (`draft|active|paused|retired`) is what it walks: a mount is
**born `draft`, VERIFIED, then promoted** — never born serving.

## CLAIMS (S97-L1 — computed live this session; each names its source)
- `api/admin/backends.ts` already exposes GET (list) · POST (create:
  `{id, displayName, toolPattern?}`) · PATCH (rename/re-pattern/enable) ·
  PATCH (lifecycle transition, EXCLUSIVE branch) — read from its own
  header block. The identity door EXISTS; the verification path is what
  is missing.
- `api/admin/mcp-settings.ts` is where a connection is declared and where
  `syncBackendCatalog` + `recordSyncHealth` + `connectionChanged` already
  fire on connect (import lines read live).
- Live registry (read from `public.backends`, S94-2 pg_catalog discipline
  for schema, table read for rows): **5 backends, all `active`** —
  armes (150 mirror tools) · superset (26) · machine-knowledge-base (5) ·
  honestbench (4) · system (0).
- Post-#15, `lifecycle` is a real column with the four-state CHECK, and
  `resolveActiveBackendsDecision` already withholds non-serving states
  from a live turn (S97 TEL wire) — so a `draft` backend is ALREADY
  structurally unserved. This phase does not re-legislate that; it uses it.
- Existing riders on `syncBackendCatalog` (read from the file): gateway
  inner-tool sweep · entity-discovery walk · route derivation · behaviour
  census (opt-in). A mount VERIFY must reuse these, never fork them.

## THE SHAPE (what "mount" must mean)
One panel flow, zero code, zero redeploy, for a backend nobody has ever
seen. R1–R4 below are the phase; each names the state it leaves behind.

### R1 — DRAFT is the birth state
Creating an identity + declaring its connection lands `lifecycle='draft'`.
A draft is invisible to every live turn (already true — prove it, do not
rebuild it) and IS visible to the mount console. If POST currently
defaults to something else, this changes there; state what it was.

### R2 — VERIFY is a real, bounded probe of the declared connection
A `verify` action on a draft backend runs the EXISTING seams — connect,
`listTools()`, mirror upsert through `syncBackendCatalog`, health record —
and returns a VERDICT with its evidence: tools discovered (count + names),
reachability, and every check that could not be run, named. Laws:
- MEASURE-READ-HONESTY-1: a failed probe is `could-not-read`, NEVER
  "zero tools". Empty≠zero, and a verify that could not connect must not
  look like a backend with nothing in it.
- ADR-010: verification is OBSERVATION. It earns no trust tier, grants no
  authority, and writes no `tool_annotation` — a probe result is not a
  human's exposure ruling. ADR-011 stands: nothing here mints write access.
- ADR-001: the backend's own claims are recorded as CLAIMS.
- No live turn may be affected while a draft verifies.

### R3 — PROMOTE is a gated transition, never automatic
`draft → active` happens only when a human acts on a verdict, through the
EXISTING lifecycle PATCH branch. A backend that never verified cannot be
promoted (the endpoint refuses, by name, with the missing evidence). The
refusal reason is data, not prose in a log.

### R4 — the console is part of the organ (S82-6)
The admin surface shows, per backend: lifecycle state · last verify
verdict + when · what was discovered · what could not be read. The panel
renders ONLY what the endpoint just asserted (the BENCH-RESET-1 precedent
— never a compiled-in derivation that looks like a live answer).

## FENCE (exhaustive; intersections with the three sibling lanes computed = ∅)
EDIT: `api/admin/backends.ts` · `api/admin/mcp-settings.ts` ·
`api/cwf/_lib/backends/backendLifecycle.ts` ·
`api/cwf/_lib/backends/catalogSync.ts` (ONLY if a verify entry point is
genuinely needed — prefer a new module over editing this shared seam) ·
the admin backends panel component under `src/components/admin/**`
CREATE: `api/cwf/_lib/backends/mountVerify.ts` (+ its `__tests__`) ·
`api/admin/backend-verify.ts` if a separate endpoint is cleaner (say which
and why) · `docs/relay/PHASE-BENCH-BACKEND-MOUNT-1-report.md`
PLUS: `.agents/CHANGELOG.md` · `.agents/skills/cwf-project-kb/SKILL.md`
(the KB twin — named in the fence this time, per the S98 lesson)
**THE THREE-REGISTRY BLOCK (A-REC-S98-1, allocated to THIS lane):** if you
create a table, `shared/dbConstants.ts` + `shared/grantPolicy.ts` +
`scripts/verifyGrants.ts` are IN your fence as one block, plus a migration
stamped **`20260813120000`** (yours exclusively this wave). A governed
param instead? `knowledge/reference/agentParams.ts` is ALSO yours this
wave — no sibling may touch it.
NOTHING else. Fence conflict → STOP and ask (four for four this session).

## FALSIFIERS
(a) A draft backend is absent from a live turn's served set — proven at
    the resolver, and proven NOT by the code you added.
(b) A verify against an unreachable connection yields `could-not-read`
    and NEVER a zero-tool verdict; a test forces the failure rather than
    hoping for it.
(c) Promote refuses an unverified draft, naming what is missing.
(d) Nothing in the verify path writes an annotation, a category, or a
    trust tier (grep-pinned, both directions).
(e) The panel shows a state the endpoint did not assert → red.

## BIRTH PROOF (S93-1, inside this phase)
Mount a REAL backend end to end and report it: use the live
`machine-knowledge-base` identity as the model, or stand up a throwaway
identity pointed at an existing reachable MCP endpoint — your choice,
say which. Report the draft row, the verify verdict with its evidence,
the promote action, and the first live turn that served it. A mount
proven only by fixtures is not proven.

## DELIVERY (S91 gate)
Branch `phase/bench-backend-mount-1` — PUSH · open a PR against master ·
report at the path above · seal: `shared/**` and several panel files are
drift-mapped — if you touch any, apply a PROVISIONAL seal in its OWN
commit, DROP-AT-MERGE by SHA, docVersion NOT bumped (the merge turn
derives it, S95-1). NO per-lane GO: build, push, report, then **re-enter
MAIL-WAIT** — the GO-TRAIN arrives as mail.

<!-- END · PHASE-BENCH-BACKEND-MOUNT-1-v1 -->
