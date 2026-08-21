# CWF — Session Graph KB · v25
<!-- rev 25 · 2026-07-07 · Supersedes v24. Ground truth = repo CHANGELOG at master HEAD `09efc8e`.
     This window: shipped A3 / PROVIDER-PERSONAL-1 (personal LLM-provider sandbox) — merged `caa3292`, then
     Operator-APPLIED + live grant-verified (`09efc8e`); designed B (Replay quota) with the atomic
     reserve-clamp-settle decision and handed the v2 prompt to AG (IN-FLIGHT); produced the NotebookLM
     real-architecture reference correction. master HEAD `09efc8e` (1144/112, rev 50, drift OK).
     Queue: cwf-open-items-register-v25.md. -->

## §0 One-paragraph state
This window shipped the THIRD sandbox-vs-global phase and set up the fourth. **A3 / PROVIDER-PERSONAL-1** — a
maker registers their OWN openai-compatible LLM endpoint (cap `provider:personal`), usable only in their own
chat — went code→merged (`caa3292`, rev 50, 1074→1144) → Operator-APPLIED + live grant-verified (`09efc8e`).
Its security core (a two-table secret split where the owner cannot read the value back, an SSRF guard stronger
than spec, FAIL-LOUD, single-gateway preserved, empty-config byte-identical) passed a full RULE-25 review incl.
an independent full-suite re-run (1144/112). **B / REPLAY-QUOTA-1** was designed with a committed atomic
**reserve-clamp-settle** enforcement model and its v2 prompt handed to AG (IN-FLIGHT — first task next session =
review AG's B report). Separately, the owner's NotebookLM slide deck was corrected: a code-grounded
**real-architecture reference** doc + a compact regeneration prompt now pin NotebookLM to what CWF actually is
(no vector RAG, no LLM intent, no LLM-judge at runtime) vs the generic-SOTA scaffold, with the completion-vision
as a strictly-separated roadmap.

## §1 The governing principle (unchanged, locked)
Developer plays with EVERYTHING in their own sandbox; the ONLY gated line is GLOBAL (publish/commit) =
super_admin; promotion is a human act; CORE kind structure is code-Zod-locked for everyone. A3 extended it to
**personal LLM providers** (personal owner-RLS rows + a service-role-only secret the owner can't read back;
global registry write stays `provider:manage`/super). Sequence: A ✅ → A2 ✅ → A3 ✅ → **B (in-flight)** → C,
scope/authority lens deferred below.

## §2 What shipped (fresh-clone RULE-25 verified)
**A3 / PROVIDER-PERSONAL-1** (`caa3292` rev 50; Operator-applied + verified `09efc8e`):
- **Storage = the mcp_settings mirror, hardened.** Config `llm_providers_personal` (one owner-RLS jsonb row;
  personal entries + `{id:<globalId>,enabled:false}` global-disable overrides; NO secret value). Secret VALUE in
  the isolated **service-role-only** `llm_provider_secrets` (RLS-on, NO policy, REVOKE both directions — owner
  cannot read it back; stronger than the personal-MCP pattern, which round-trips its token to the client).
  Append-only `llm_provider_secret_audit` (no value column).
- **Merge reuse.** `mergePersonalProviders` is the structural sibling of the shipped, tested `mergeMcpServers`
  (add + same-id-disable + enabled-filter) → the owner's requirement "my sandbox runs only on my LLM" (disable a
  global for myself) fell out for free. Effective-set is the single authority for picker + resolution.
- **Gateway seam.** A personal provider is a `LlmProviderDeclaration` the ONE gateway resolves
  (`createOpenAICompatible` + injected key + `fetch: ssrfGuardedFetch` only when `isPersonal`); stage-6
  `stageResolveProvider` runs the overlay ONLY for opted-in users (empty config → `return` → byte-identical);
  `ctx.personalApiKey` non-persisted → `stageStream` → `resolveModel(rec, resolvedApiKey?)` (injected → env
  precedence). Other families + global path byte-identical.
- **SSRF guard (net-new, full review).** `net/ssrfGuard.ts`: https-only, resolve-then-check ALL A/AAAA, validate
  the IP not the hostname (rebinding), blocks loopback/private/link-local/ULA/unspecified + CGNAT + TEST-NETs +
  IPv4-mapped-IPv6, fail-closed; resolve-time pre-check + connect-time re-validate via the SDK's native `fetch`.
  Honest residual: can't pin the socket to the validated IP (documented, not papered over).
- **FAIL LOUD** on SSRF-block / unknown personal id (pure selector returns fail-loud as data, raised in the
  stage) — never a silent global fallback. Endpoints: `provider-personal.ts` (config GET returns `hasSecret`
  only; secret PUT echoes providerId only) + sibling `provider-probe.ts` (server-resolved, CLASS-only).
- Frozen safety artifacts (evalGate, groundingCheck, trustRegistry, prompt/core, resolveAuthHeader, mcpSecrets,
  chat.ts) byte-identical. Only `provider:personal` added. Full review PASS + independent suite re-run 1144/112.
- **Two gates:** migration Operator-APPLIED (schema-read: RLS true; 4 owner-CRUD on config; **0 policies + 0
  client DML grants** on the secret store; audit super-SELECT/no-value) **+ live-verified** (`verifyGrants` anon
  UPDATE → 42501 on all three). Doc note flipped pending→applied in `09efc8e`.

## §3 Key learnings (this window)
- **Harden past the pattern you're told to mirror when the requirement demands it.** The bootstrap said "mirror
  the personal/global MCP pattern," but that pattern round-trips its token to the owner's client — contradicting
  A3's own "never client-bound." So A3 mirrored the CONFIG side and hardened the SECRET side to the mcp_secrets
  service-role-only posture. Surfaced as an explicit owner decision, not buried in the prompt.
- **Reuse a tested pure function over inventing a second one.** The owner's "disable a global provider in my
  sandbox" mapped 1:1 onto `mergeMcpServers`; `mergePersonalProviders` is its structural sibling. This also
  moved the config storage from a row-per-provider table to the mcp_settings jsonb-row (which natively carries
  add + disable in one merge).
- **Encode a forward invariant cheaply, don't build for a nonexistent path.** Replay resolves providers via the
  global registry only (no A3 personal overlay in the replay engine), so no replay can spend on a personal key
  today. B encodes the "personal-key exempt" rule as a one-predicate settle-time branch (`isPersonalProviderId`)
  — correct when replay-on-personal lands — with ZERO speculative metering machinery.
- **Choose the architecturally-correct enforcement, not the easy one.** For B, quota = a PHYSICAL token ceiling
  (atomic reserve-CLAMP-settle: the reserve clamps the run's own budget to remaining, so the engine cannot
  overshoot even mid-run) — over accounting-only (can overshoot one run) and ceiling-reserve (over-conservative
  + "limit < one run's budget → un-runnable" footgun).
- **A live anon-key deny probe is stronger than a catalog read.** The Operator's schema-read confirmed policies/
  grants structurally; `verifyGrants.ts` then proved anon UPDATE → 42501 against the REAL DB (behavioral). Both
  now form the migration confirmation. But that live-only, non-CI script had **silently drifted 6 tables stale**
  — root-cause fix folded into B (per-phase probe row + a CI test asserting PROBES covers every classified
  table).
- **Seal docs at the truth of the moment.** A3's diagram pre-declared "Operator-applied" at seal time (before it
  was applied); it became true only after the Operator ran. Standing rule now: sealed docs say "authored,
  Operator-pending"; the flip to "applied + verified" is the post-Operator follow-up commit (as `09efc8e` did).
- **Residual grants are the established posture, not a new defect.** A3's schema-read showed REFERENCES/TRIGGER
  on the secret tables + TRUNCATE on the owner-CRUD config tables — identical to the shipped mcp_secrets/
  mcp_settings. Secret VALUES fully protected (no DML); TRUNCATE is RLS-exempt but unreachable via PostgREST.
  Raised as cross-cutting HARDEN-GRANTS-1 (least-privilege), NOT a reopen.
- **NotebookLM real-architecture correction.** A NotebookLM deck mixed generic-SOTA agent theory with CWF and
  contradicted itself (vector RAG shown as mechanism vs forbidden-in-core). A code-grounded reference doc
  ([CWF-REAL]/[REFERENCE-MODEL]/[ROADMAP] registers) + a compact prompt now pin it to reality; the owner's
  completion-vision (selectable backends; the "missing-interface" governed connectors) sits as a strictly-
  separated roadmap under the "connectors are advisory/additive, never bypass the governance floor" invariant.

## §4 Verified anchors + commit ledger
- master HEAD **`09efc8e`** — 1144 tests / 112 files / docVersion **rev 50** / drift `[OK]`.
- From v24 close `3dd0a95`: A3 code `b81d8c1` → doc `969e4a0` → merge **`caa3292`** (rev 50, 1074→1144) →
  follow-up **`09efc8e`** (Operator-applied flip + `verifyGrants` backfill, live 24/24).
- **A3 migration APPLIED + live grant-verified** (Operator/Supabase MCP, project ref `fjbrkimwvtpwoxhziidh`).
  `mcp_secrets`: `armes-daily-token`, `supersettoken` (UI-rotatable).
- AWS unchanged: `i-030c2b4fadebfa229`, CloudFront, `cwf-prod`, eu-central-1; bootstrap key DEACTIVATED;
  `cwf-budget-stop` STANDBY. RULES current through RULE 29.

## §5 Open queue → cwf-open-items-register-v25.md
IN FLIGHT: **B — Replay quota** (REPLAY-QUOTA-1 v2 at AG; atomic reserve-clamp-settle; `user_quotas` service-
role-only; `QUOTA_MANAGE` super; personal-key exempt forward-safe; verifyGrants anti-drift + PROBES-coverage
test folded in; seal-time doc-honesty). NEXT: **C — User Docs** (hosts the textbook explainer) · **Part A widen
SCOPE/AUTHORITY** · **Sayfa 3** (Langfuse selectable) · GOVERN polish · P7. DEFERRED: **HARDEN-GRANTS-1**
(REVOKE REFERENCES/TRIGGER/TRUNCATE across secret+owner-CRUD tables) · AWS-DENY-1 · Langfuse SSO · LM Studio /
on-prem families · the missing-interface governed connectors (Intent-LLM/LangGraph/Memory/RAG, invariant-bound).
STANDING DELIVERABLE: `cwf-governance-replay-explained-v1.md` (textbook, reps=3 Wilson-CI worked example).

<!-- END · CWF-SESSION-GRAPH-KB-v25 · rev 25 · 2026-07-07 -->
