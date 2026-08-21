# PHASE OBS-ENDPOINT-1 — Langfuse Host: Trust Hardening (env-only LAW + validator + re-init seam) · v1

<!-- claude-code-PHASE-OBS-ENDPOINT-1-langfuse-host-trust-v1 · rev 1 · 2026-07-10
     Author lane: AG (Claude Code). Design authority: cwf-obs-endpoint-1-design-v1 (owner-approved).
     Base: origin/master 171ee43 (verified floor 1673 tests / 165 files / docVersion rev 58 / drift [OK]). -->

## 0. HARD PRE-FLIGHT (abort on any mismatch — report, do not "fix")

```bash
git fetch origin && git rev-parse origin/master   # MUST print 171ee43e392f51fae2829ad291ca3e73d83fc4b5
git status --porcelain                             # MUST be empty
npm ci --no-audit --no-fund --silent
npx vitest run --reporter=dot 2>&1 | tail -5       # MUST report 1673 passed / 165 files
npm run docs:drift 2>&1 | tail -3                  # (or the repo's drift-gate script) MUST be [OK]
```
Branch: `git checkout -b feat/obs-endpoint-1`.

## 1. CONTEXT (read, do not restate)

`obs.langfuseHost` was ejected from L1 (design v2 §D3) and is now RESOLVED as env-only by LAW —
it will NEVER be a governed param. Three fatals, all code-confirmed at HEAD:
(i) `otel.ts` init is a sync/env-only/pre-auth singleton — a DB value cannot reach it;
(ii) the host steers where the env-only `LANGFUSE_*` keys are sent (pair-integrity: the host
inherits the keys' trust tier — an admin row may never redirect secret-bearing egress);
(iii) the host is also the browser target of InspectTab/ReplayTab deep-links, and the UI
normalizes the Langfuse login wall as "expected" — a hostile host = admin-credential phishing.
This phase ships the validator, the loud-reject floor, the re-init seam, and ADR-007.

## 2. CONSTRAINTS (violations = phase failure)

- **NO secrets in code or logs.** The reject path NEVER echoes the env value (not even the
  hostname) — reason string only.
- **RULE 27 untouched:** `LANGFUSE_OTLP_PATH`, LangfuseSpanProcessor transport/exportMode/mask,
  the ScrubbingSpanProcessor ordering, force-flush semantics — all byte-identical.
- **FROZEN (byte-identical):** `api/admin/replay.ts` · `api/cwf/_lib/turn/*` · evalGate engine ·
  `promptFloor.ts` · `redaction.ts` · all UI files (`InspectTab.tsx`, `ReplayTab.tsx` — the
  endpoint's null path already renders the honest note; zero UI diff in this phase).
- **NO DB, NO migration, NO new SQL function, NO Operator door.** Probe registry stays 36/36.
- **`OBSERVABILITY_DISABLED` kill-switch semantics unchanged** (checked first, as today).
- Merges `--no-ff`; squash banned. Coverage floor may only ratchet up.
- Every deviation from this spec: STOP or disclose explicitly in the report — never silently adapt.

## 3. GATED SUB-PHASES

### G1 — The validator (ONE pure function, RULE 1 home)

In `api/cwf/_lib/observability/config.ts` add:

```ts
export function validateLangfuseHost(raw: string | undefined | null): string | null
```

Rules (in order): trim; empty/undefined → null · must `new URL()`-parse → else null ·
protocol MUST be `https:`, EXCEPT `http:` allowed iff hostname is exactly `localhost` or
`127.0.0.1` (local Docker stack) · `username`/`password` MUST be empty → else null ·
`pathname` MUST be `'/'` (a pathed host silently breaks the `LANGFUSE_OTLP_PATH` derivation)
· `search`/`hash` MUST be empty → else null · return `url.origin` (normalizes the trailing
slash away). Docblock states the LAW: *"The Langfuse host is env-only BY LAW (ADR-007) —
it steers where the LANGFUSE_* secrets are sent and where admin deep-links navigate; it is
NEVER a governed row. Revisit trigger: a second production host existing."*

Rewire `computeObservabilityEnabled` (config.ts:62-74): the host presence check becomes
`validateLangfuseHost(env[LANGFUSE_HOST_ENV]) !== null`. Kill-switch check stays first,
key-presence checks unchanged. The function stays pure/env-parameterized.

**Tests** (`observabilityConfig.test.ts`, table-driven): valid https → normalized origin ·
`https://host/` → `https://host` · `http://localhost:3000` ok · `http://127.0.0.1:3000` ok ·
`http://remote.example` → null · `https://host/api` → null · `https://host?x=1` → null ·
`https://host#f` → null · `https://u:p@host` → null · garbage / empty / undefined → null ·
enable-flag: valid host + keys → true; invalid host + keys → false; kill-switch still wins.

### G2 — Single-source consumption + loud reject + re-init seam (`otel.ts`)

- `initObservability()`: `baseUrl` becomes the validator's output, NOT the raw env read
  (the hidden trap this phase exists to close — `otel.ts:77` today re-reads the env raw).
  Belt-and-braces: if enabled but the validated value is somehow null, abort init gracefully
  (same non-fatal posture as the existing catch).
- **Loud reject (C2 floor, once per process):** when `OBSERVABILITY_ENABLED` is false AND the
  host env var IS present AND the validator rejects it, `initObservability()` emits exactly one
  `console.error('[Obs] LANGFUSE_HOST rejected (<reason>) — observability disabled; chat unaffected')`.
  Reason = a closed enum string from the validator's failure branch (expose a companion
  `explainLangfuseHostRejection(raw): string | null` in config.ts OR return a discriminated
  result — your call, but the reason derivation must be pure and unit-tested). The VALUE is
  never printed. Module-level `let warned` guard.
- `export async function shutdownObservability(): Promise<void>` — awaits
  `provider.shutdown()`, sets `provider = null`, resets the `warned` guard, NEVER throws
  (mirror `forceFlushObservability`'s posture). Docblock: the explicit re-init seam
  (test isolation today; precondition for any future governed-selection phase).

**Tests** (`observabilityOtel.test.ts`, follow the file's existing module-mock pattern):
shutdown → re-init round-trip constructs a fresh provider · shutdown when never initialized
resolves cleanly · rejected-host env ⇒ exactly ONE console.error (spy), zero on second init
call, and the error string contains no part of the configured value.

### G3 — Admin deep-link endpoint converges

`api/admin/observability.ts:30`: `langfuseHost` becomes
`validateLangfuseHost(process.env[LANGFUSE_HOST_ENV])`. The **request-time read is preserved
BY DESIGN** (the "host swap without frontend rebuild" property) — do NOT hoist to a module
constant. Update the file docblock: a rejected host returns null → the panel's existing honest
note renders (this closes the deep-link phishing vector with zero UI diff).

**Test** (`api/admin/__tests__/observability.test.ts`): invalid env host (e.g.
`http://evil.example`) ⇒ response `langfuseHost: null`; valid pathless https host ⇒ normalized
origin returned; projectId behavior unchanged.

### G4 — ADR-007 + LAW pointers + living-doc reseal

- `docs/adr/ADR-007-langfuse-host-trust-v1.md` (drift-gate covered): the three fatals
  (§1 above), the pair-integrity rule, the governed-host design REJECTED, the residual risk
  acceptance (a hostile value in the Vercel env itself still wins — accepted: env access is
  already the boundary holding the keys; the host cannot be made safer than the secrets it
  steers), the recorded revisit trigger (second production host ⇒ a governed-SELECTION-
  among-code-allowlist phase becomes legitimate).
- `agentParams.ts`: one docblock line near `AGENT_PARAM_KEYS` — *"obs.langfuseHost is
  intentionally absent — env-only by LAW, ADR-007."*
- Living-doc reseal: docVersion **rev 58 → 59**, two-commit seal convention as every phase.

### G5 — Full self-verify (evidence is literal, paste outputs)

1. `npx vitest run --reporter=dot 2>&1 | tail -5` — full suite green; report NEW totals
   (expect > 1673 / ≥ 166 files — state exact numbers).
2. `grep -rn "LANGFUSE_HOST_ENV" api/ src/ --include="*.ts" --include="*.tsx" | grep -v __tests__`
   — paste output; the ONLY non-test readers must be: config.ts (name home + validator/enable
   internals) · otel.ts (validator call + rejection check) · admin/observability.ts (validator
   call). Any other raw read = G5 FAIL.
3. `git diff 171ee43..HEAD --stat` — paste; MUST show zero diff on every FROZEN file.
4. Drift gate `[OK]` after the reseal.
5. Coverage floor respected (paste the coverage summary line if the repo gate prints one).

## 4. MERGE (S30-2 — use this message VERBATIM)

```
Merge feat/obs-endpoint-1: OBS-ENDPOINT-1 — Langfuse host trust hardening (host declared env-only by LAW [ADR-007: pair-integrity — the host steers secret-bearing LANGFUSE_* egress AND admin deep-link navigation; governed-host design REJECTED, revisit trigger = second production host]; ONE pure validateLangfuseHost in observability/config.ts [https-only with localhost http exception, no path/query/fragment/credentials, origin-normalized] consumed by ALL THREE readers [enable derivation, otel init baseUrl, admin deep-link endpoint — request-time read preserved by design]; invalid host = ONE loud console.error + pipeline-absent [C2 floor, value never echoed]; shutdownObservability() re-init seam; no DB/no migration/no UI diff; rev 58→59 reseal)
```

`--no-ff` merge to master, push, then report `git rev-parse origin/master` (RULE 25: a merge
isn't done until pushed + the remote hash is reported).

## 5. REPORT FORMAT

Base/HEAD hashes · per-gate evidence (literal command outputs per G5) · new test/file counts ·
every deviation disclosed with rationale · confirmation NO frozen file moved · the remote hash.

<!-- END · claude-code-PHASE-OBS-ENDPOINT-1-langfuse-host-trust-v1 · rev 1 · 2026-07-10 -->
