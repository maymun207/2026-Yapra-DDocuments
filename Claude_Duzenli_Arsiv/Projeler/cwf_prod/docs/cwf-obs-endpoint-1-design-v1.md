# OBS-ENDPOINT-1 — Langfuse Host: Trust Classification & Hardening · Design v1

<!-- cwf-obs-endpoint-1-design-v1 · rev 1 · 2026-07-10 · Architect-lane artifact (NOT for AG).
     Diagnosed at origin/master 171ee43 (verified floor: 1673 / 165 / rev 58 / drift [OK]).
     Origin: L1 design v2 §D3 ejection; register v30 item #5 / v31 Q-NEXT. -->

## 0. Committed decision (single path — reverses the recorded scope, needs owner ratification)

`obs.langfuseHost` does **NOT** become a governed param. OBS-ENDPOINT-1 resolves as a small
**HARDEN + LAW** phase:

1. **LAW** — the Langfuse host is env-only by law (docblock in `observability/config.ts`,
   ADR-007 records the risk acceptance). Polarity class = METRIC_ALIASES precedent: the value
   *looks* governable but an admin edit must never be able to redirect secret-bearing egress.
2. **Validation** — one pure `validateLangfuseHost()` in `config.ts`: https-only
   (http allowed for localhost/127.0.0.1 dev), URL-parses, no path/query/fragment, trailing
   slash normalized. Rejected host ⇒ observability treated as ABSENT with ONE loud console
   error (floor discipline: chat never breaks, never silent).
3. **Re-init seam** — `shutdownObservability()` in `otel.ts` (provider.shutdown() + null).
   Testable seam; precondition for any future governed-selection phase. Init signature untouched.
4. **Revisit trigger recorded** — governed *selection among a code allowlist* becomes a
   legitimate phase the day a **second** production host exists (DR / SSO migration). Until
   then it is DEFERRED with this trigger attached.

## 1. Diagnosis (S30-3 definition-site anchors, HEAD `171ee43`)

| Anchor | Today | Finding |
|---|---|---|
| `observability/config.ts:17` | `LANGFUSE_HOST_ENV` name home | RULE 1 home exists; **zero shape validation anywhere** |
| `config.ts:62-74` | `computeObservabilityEnabled` = presence-only check; `OBSERVABILITY_ENABLED` fixed at module load | Any string enables the pipeline — a typo'd or hostile env host receives keys + traces |
| `otel.ts:63,71-72,77` | module singleton; `baseUrl: process.env[LANGFUSE_HOST_ENV]` raw read at init | D3-(i) confirmed unchanged: sync/env-only/pre-auth — a DB value structurally cannot reach init without rebuild; a publish would be a **silent no-op** |
| `otel.ts:77` + env `LANGFUSE_*` keys | exporter authenticates to whatever host is configured | D3-(ii) confirmed: unvalidated governed host = **key + trace exfiltration channel** |
| `api/admin/observability.ts:30` | request-time raw env read → deep-link config | **NEW third fatal (this diagnosis):** the host is also a *browser navigation target*. InspectTab (`:310`) explicitly normalizes the Langfuse login wall as "expected, not a broken link" — a hostile host serving a fake login wall gets perfect camouflage → admin-credential phishing surface, independent of the exfil channel |
| `InspectTab.tsx:73-75`, `ReplayTab.tsx:995,1432` | link builders from the endpoint | consume whatever the endpoint returns; no client-side gate (correct — the gate belongs server-side) |

## 2. Why governance loses on its own terms

- **Pair integrity:** the keys are env-only (secrets-env-only, non-negotiable). The host decides
  *where those keys are sent*, so it inherits the keys' trust tier. Governing it at a lower tier
  breaks the pair.
- **Allowlist regress:** the allowlist itself can never be a governed row (infinite regress), so
  it must be CODE. But then adding/changing a host requires a code change *anyway* — governance
  would only buy **redeploy-free selection among pre-approved hosts**. The approved set today is
  one element (CloudFront `dl3644f5a7fnn.cloudfront.net`). Selection within a one-element set = zero value, non-zero risk, plus a
  hot-path host-comparison + re-init dance in every serverless instance.
- **HC-1 is not violated, it is polarity-scoped:** exactly the METRIC_ALIASES LAW shape —
  "everything tweakable" never meant "an admin row may steer secret egress." Naming the split
  (map §7) is the deliverable; ADR-007 makes the acceptance durable and drift-gated.

## 3. Phase contents (what AG builds — one small gated phase)

- **B1 — `validateLangfuseHost(raw: string | undefined): string | null`** in `config.ts`
  (the RULE 1 home). Rules: URL-parses · protocol `https:` (or `http:` iff hostname is
  `localhost`/`127.0.0.1`) · `pathname === '/'` after parse (a pathed host would silently break
  `LANGFUSE_OTLP_PATH` derivation) · no query/fragment/credentials · returns the normalized
  origin (trailing slash stripped) or `null`.
- **B2 — single-source consumption (the hidden trap):** validation only inside
  `OBSERVABILITY_ENABLED` is NOT enough — `otel.ts:77` reads the env *again* raw. All three
  readers converge on the validator: `computeObservabilityEnabled` (presence → validity),
  `otel.ts` init `baseUrl` (validated value), `api/admin/observability.ts:30` (request-time
  call preserved BY DESIGN — the "host swap without frontend rebuild" property survives; a
  rejected host returns `null` → the existing honest note renders, closing the phishing vector
  with zero UI work).
- **B3 — reject path is loud-not-silent:** invalid host present ⇒ one
  `console.error('[Obs] LANGFUSE_HOST rejected: <reason, value redacted to origin-attempt>')`
  at init, pipeline behaves as absent (C2 floor: observability-down ≠ chat-down).
- **B4 — `shutdownObservability()`** in `otel.ts`: awaits `provider.shutdown()`, nulls the
  singleton, never throws. Unblocks re-init in tests and the future selection phase.
- **B5 — ADR-007-langfuse-host-trust-v1** (in-repo `docs/adr/`, drift-gate covered): the two
  D3 fatals + the deep-link phishing vector, the pair-integrity rule, the rejected governed-host
  design, the recorded revisit trigger (second production host).
- **B6 — LAW docblocks:** `config.ts` host constant + `agentParams.ts` a one-line pointer
  ("obs.langfuseHost intentionally absent — ADR-007").
- **Tests:** validator table (https ok · http localhost ok · http remote reject · pathed reject ·
  creds reject · trailing-slash normalize) · enable-flag integration · admin endpoint returns
  null for invalid env · shutdown/re-init round-trip. No DB, no migration, no Operator door.

## 4. Non-goals

Governed host row (rejected §2) · code allowlist + selection UI (deferred, trigger §0.4) ·
any change to `LANGFUSE_OTLP_PATH`/exporter transport (RULE 27) · frozen files untouched ·
`OBSERVABILITY_DISABLED` kill-switch semantics unchanged.

## 5. Risk acceptance being recorded (the §D3 "kayıtlı risk kabulü")

Residual risk after this phase: a hostile value **in the Vercel env itself** still wins —
accepted, because env access is already the trust boundary holding the Langfuse *keys*; the
host cannot be made safer than the secrets it steers. The validator's job is narrower and real:
typo/misconfig containment + eliminating every *lower-tier* write path to the value.

<!-- END · cwf-obs-endpoint-1-design-v1 · rev 1 · 2026-07-10 -->
