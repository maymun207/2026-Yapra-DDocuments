# CWF — Open Items Register · v25
<!-- rev 25 · 2026-07-07 · Supersedes v24. Ground truth = repo CHANGELOG at master HEAD `09efc8e`.
     Delta since v24 (3dd0a95): the sandbox-vs-global RBAC line shipped its THIRD phase — A3 /
     PROVIDER-PERSONAL-1 (personal LLM-provider sandbox, rev 50, merge `caa3292`), then Operator-APPLIED +
     live grant-verified (follow-up `09efc8e`). B (REPLAY-QUOTA-1 v2) is IN-FLIGHT at AG. New: HARDEN-GRANTS-1
     (cross-cutting REVOKE hardening) + verifyGrants anti-drift (folded into B) + seal-time doc-honesty
     (standing rule). master HEAD `09efc8e` (1144 tests / 112 files / docVersion rev 50 / drift [OK]). -->

---

## 🧭 THE GOVERNING PRINCIPLE (locked — applies to every RBAC change)
> The developer (`power_user`) plays with **everything in their own sandbox** (session/draft/preview/personal
> row, isolated, no blast radius); the **ONLY** gated line is **global** (commit/publish to shared state) =
> super_admin. Promotion of a proven sandbox artifact to global is a HUMAN act (verbal/email → super applies).
> One categorical exception: **CORE kind structure** is code-Zod-locked for *everyone*.

## ✅ CLOSED — the sandbox-vs-global RBAC line (through this window)
- **NAV-RBAC-1** (`e5b678a`, rev 48) — five-section nav + `REPLAY_LENS`/`PROVIDER_VIEW`/`KIND_VIEW` maker caps +
  server gate splits (replay GET=LENS/POST=RUN; providers VIEW/MANAGE; kinds VIEW/SOFT_EDIT). Full review PASS.
- **KIND-DRAFT-1** (`3dd0a95`, rev 49) — SOFT-kind session-draft sandbox (`kind_drafts` owner-RLS; CORE always
  wins; publish stays global). Full review PASS. Migration APPLIED + schema-read confirmed.
- **A3 / PROVIDER-PERSONAL-1** (merge `caa3292`, rev 50, 1074→1144) — personal LLM-provider sandbox. A maker
  registers their OWN openai-compatible endpoint (cap `provider:personal`), usable ONLY in their own chat.
  **Two-table secret hardening:** config `llm_providers_personal` (owner-RLS jsonb, **NO secret value**) + the
  isolated **service-role-only** `llm_provider_secrets` (owner cannot read the value back) + append-only
  `llm_provider_secret_audit` (no value column). **SSRF guard** (`net/ssrfGuard.ts`, https-only + resolve-then-
  check ALL A/AAAA + IPv4-mapped-IPv6 + connect-time re-validate via the SDK `fetch`) — **stronger than spec**.
  **FAIL LOUD** on SSRF-block / unknown personal id (never a silent global fallback). Single gateway preserved
  (`createOpenAICompatible` + injected key). **Empty personal config ⇒ resolution/picker/stream byte-identical**
  (opted-in-only). Per-user global-provider disable via the `mergeMcpServers`-mirror `mergePersonalProviders`.
  Frozen safety artifacts byte-identical. Full review PASS. **Migration APPLIED** (Operator/Supabase MCP,
  project ref `fjbrkimwvtpwoxhziidh`; schema-read: RLS true all three, 4 owner-CRUD on config, **0 policies +
  0 client DML grants** on the secret store, audit super-admin SELECT/no value column) **+ live grant-verified**
  (`scripts/verifyGrants.ts` anon UPDATE → 42501 on all three, service-role positive control unaffected; follow-
  up `09efc8e`). *Interpretation accepted:* a missing secret = the supported naked (auth-less) tunnel → resolves
  with no key → endpoint 401s honestly (still no silent swap).

## 📌 STANDING DELIVERABLE (owner-flagged CRITICAL — MUST produce; do not forget)
**`cwf-governance-replay-explained-v1.md`** — textbook explainer of the per-stage governance replay lens. What a
lens is (deterministic, no-LLM, read-only re-run of ONE gate against a recorded turn at a chosen rule-version =
counterfactual); why (token-free governance regression testing); the three lenses as three data-agent failure
modes (grounding=empty≠zero · routing=ALWAYS_INCLUDE floor · scope/authority); grounded in ADR-001 (make a
lying/wrong backend HARMLESS). **Mandatory worked example** = the real 2026-07-06 Part A A/B at reps=3 (both
arms empty_rate=0, Wilson [0, 0.561] overlap, distinguishable=false): teach reps=1→3→20+; `distinguishable=false`
= UNDERPOWERED, not "no effect"; the lens measures absence, not reply length (365→30 tokens shortened, not
emptied). Plain-engineering AND AI terms. Deliver on request or when C needs it.

## 🔴 LIVE QUEUE (committed, ordered)
1. **B — Replay quota subsystem — IN FLIGHT at AG** (`claude-code-PHASE-REPLAY-QUOTA-1-…-v2.md`, anchor
   `09efc8e`; owner-approved design). Per-user MONTHLY token quota + super manual reset + "no limit" + super
   usage view. **Enforcement = atomic RESERVE-CLAMP-SETTLE** (quota = physical token ceiling: reserve clamps the
   run's own budget to remaining, so the engine cannot overshoot; settle trues-up to actual). New `user_quotas`
   (service-role-only) + `QUOTA_MANAGE` (super-only). **Personal-key spend quota-EXEMPT but audited** (forward-
   safe: replay resolves global providers only today, so unreachable — encoded via `isPersonalProviderId` at
   settle, no wiring). `REPLAY_RUN` unchanged (quota is an ADD gate). Engine `tokenBudget?` additive/byte-
   identical-when-absent. Full review. **First task next session: RULE-25 review of AG's B report.**
2. **C — User Docs page.** DOCUMENTS-section renderer; hosts the textbook explainer above. Panel-holders only.
3. **Part A widen — SCOPE/AUTHORITY** (third per-stage lens). `checkScopeDivergence`; version axis =
   `backendAuthority` from `trustRegistry` (no version param yet); floor = conservative-non-fabrication. Design
   note first.
4. **Endpoint switcher / "Sayfa 3"** — gated admin UI to point Langfuse (AWS ↔ local Docker ↔ other); inherits
   `mcp_secrets` for keys. *(= the screenshot's "Langfuse hardcoded → selectable" completion-vision item.)*
5. **GOVERN polish — continued** (owner rough-spot list; MCP JSON-edit masked round-trip · probe auto-poll).
6. **P7** — Superset empty≠zero runtime validator (3rd defense layer, no fragile regex).

## 🛠 DEFERRED (do NOT build unprompted)
- **HARDEN-GRANTS-1** (NEW, cross-cutting, low-priority, full-review) — a small migration to
  `REVOKE REFERENCES, TRIGGER, TRUNCATE FROM anon, authenticated` on all secret + owner-CRUD tables
  (`mcp_secrets`, `mcp_secret_audit`, `mcp_settings`, `kind_drafts`, `llm_provider_secrets`,
  `llm_provider_secret_audit`, `llm_providers_personal`, and B's `user_quotas`). Rationale: A3's Operator
  schema-read showed residual REFERENCES/TRIGGER on the secret tables and TRUNCATE on the owner-CRUD config
  tables (the established pattern — NOT an A3 regression; secret VALUES fully protected since no DML). TRUNCATE
  is RLS-exempt but unreachable via PostgREST (no TRUNCATE verb) → low real risk; tighten for least-privilege.
- AWS-DENY-1 (DENY `ssm:SendCommand`/`ssm:StartSession`; NEVER deny `ec2:ModifyInstanceAttribute`) · Multi-user
  Langfuse SSO (rising) · AWS README harden · novel-kind preview follow-up · session-scoped *provider config*
  drafts beyond model selection · kind-draft versioning/history/sharing · **LM Studio + broader on-prem LLM
  families** (A3 delivered the openai-compatible core; LM Studio is a small extension — completion-vision) ·
  the **"missing-interface" governed connectors** (Intent-LLM / LangGraph / Memory / Knowledgebase-RAG — the
  completion-vision roadmap arc, each OPTIONAL/off-by-default/governed under the advisory-not-authoritative
  INVARIANT; own design note + phase per connector).

## 🟡 TRACKED-SMALL / DOC-DEBT
- **A3 UI visual pass 1280/1024 (RULE 26)** — headless run didn't capture screenshots; DOM-no-leak is contract-
  enforced (value never reaches client) but a real-browser pass is advisable (owner 2-min smoke: add personal
  provider → set key → Test connection → confirm in picker).
- **AGENTS.md / skill-KB A3 note** — add the ssrfGuard artifact + `provider:personal` cap + two-table personal-
  secret pattern (next doc-touch phase; A3's phase deliberately stayed within "nothing else unexpected").
- **verifyGrants anti-drift** — the live-only, non-CI `scripts/verifyGrants.ts` PROBES map silently drifted 6
  tables stale by the A3 window; AG backfilled all 6. **Root-cause fix folded into B** (add each new table's
  probe row in-phase + a CI coverage test asserting PROBES covers every grantPolicy-classified table).
- **Flaky verifyGrants positive-control** — the service-role positive-control write returned HTML on one run,
  clean on retry (negative controls passed both times → security result solid). If it recurs, investigate the
  Supabase edge cold-start / URL that returns an HTML error page. Low priority.
- Grounding "clean" badge grey→green (`variant="secondary"`→`success`) · novel-kind preview boundary (owner
  decision) · InlineHelp localStorage · routing replay preview · perturbation single-shot label · REPLAY-A1
  edit-diff · `replay_audit outcome.status=null` on 3 CHAR-1 rows · `[ToolFilter] Learned` dedup · `act()` RTL.

## 👤 OWNER-OWNED (manual — surface only on a real 401)
Daily rotation of `supersettoken` / `armes-daily-token`: Secrets → Rotate → paste RAW token (no "Bearer ").

## Verified anchors
- **Repo** `maymun207/cwf_yaprak` master HEAD **`09efc8e`** — **1144 tests / 112 files** / docVersion **rev 50**
  / drift `[OK]`. RULE-25 fresh-clone verified this window: A3 migration RLS (two-table secret split), SSRF
  guard (stronger than spec), gateway seam (empty-config byte-identical), frozen-file sweep (ZERO), no-leak +
  owner-scope endpoints, permission delta (only `provider:personal` added); **full suite re-run independently =
  1144/112**; follow-up `09efc8e` diff = CHANGELOG + verifyGrants only (unmapped → no reseal).
- Chain (from v24 close `3dd0a95`): A3 code `b81d8c1` → doc `969e4a0` → merge **`caa3292`** (rev 50, 1074→1144)
  → follow-up **`09efc8e`** (Operator-applied flip + verifyGrants backfill 24/24).
- **A3 migration APPLIED + live grant-verified** (Operator/Supabase MCP, project ref `fjbrkimwvtpwoxhziidh`).
  `mcp_secrets` live (`armes-daily-token`, `supersettoken`).
- AWS unchanged: `i-030c2b4fadebfa229`, CloudFront, `cwf-prod`, eu-central-1; bootstrap key DEACTIVATED;
  `cwf-budget-stop` STANDBY. RULES current through RULE 29.
- Artifacts this window: A3 design `cwf-phase-A3-…-design-v2.md` + prompt `…PROVIDER-PERSONAL-1-…-v1.md` +
  Operator prompt `cwf-operator-A3-apply-personal-provider-migration-v1.md`; B design
  `cwf-phase-B-replay-quota-subsystem-design-v1.md` + prompt `…REPLAY-QUOTA-1-…-v2.md`; NotebookLM real-
  architecture reference `cwf-real-architecture-reference-for-notebooklm-v2.md` + regeneration prompt
  `cwf-notebooklm-regeneration-prompt-v3.md`. Session artifacts: register v25 + KB v25 + bootstrap v25.

<!-- END · cwf-open-items-register-v25 · rev 25 · 2026-07-07 -->
