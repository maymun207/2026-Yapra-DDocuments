# CWF — Open Items Register · v26
<!-- rev 26 · 2026-07-07 · Supersedes v25. Ground truth = repo CHANGELOG at master HEAD `84f4601`.
     Delta since v25 (09efc8e): B / REPLAY-QUOTA-1 SHIPPED + fully closed — code `62df338` → merge `b6bd150`
     → FIX-1 `a639828` (function EXECUTE from PUBLIC) → FIX-2 `537c8d5` (EXECUTE from public+anon+authenticated;
     the Operator's live read caught FIX-1's gap) → doc-flip `57039c4` (Operator-applied + live grant-verified,
     verifyGrants 25/25). Then a tooling fix: verifyGrants entry-guard was a silent false-green under its own
     `npx vite-node` command → FIX `84f4601` (test-runtime guard). New DEFERRED: HARDEN-FN-PROBE-1. master HEAD
     `84f4601` (1209 tests / 118 files / docVersion rev 51 / drift [OK]). -->

---

## 🧭 THE GOVERNING PRINCIPLE (locked — applies to every RBAC change)
> The developer (`power_user`) plays with **everything in their own sandbox** (session/draft/preview/personal
> row, isolated, no blast radius); the **ONLY** gated line is **global** (commit/publish to shared state) =
> super_admin. Promotion of a proven sandbox artifact to global is a HUMAN act (verbal/email → super applies).
> One categorical exception: **CORE kind structure** is code-Zod-locked for *everyone*.

## ✅ CLOSED — the sandbox-vs-global RBAC line + B (through this window)
- **NAV-RBAC-1** (`e5b678a`, rev 48) — five-section nav + `REPLAY_LENS`/`PROVIDER_VIEW`/`KIND_VIEW` maker caps +
  server gate splits (replay GET=LENS/POST=RUN; providers VIEW/MANAGE; kinds VIEW/SOFT_EDIT). Full review PASS.
- **KIND-DRAFT-1** (`3dd0a95`, rev 49) — SOFT-kind session-draft sandbox (`kind_drafts` owner-RLS; CORE always
  wins; publish stays global). Full review PASS. Migration APPLIED + schema-read confirmed.
- **A3 / PROVIDER-PERSONAL-1** (merge `caa3292`, rev 50) — personal LLM-provider sandbox. Two-table secret split
  (config `llm_providers_personal` owner-RLS/no value + service-role-only `llm_provider_secrets` owner-can't-read
  + append-only audit), SSRF guard stronger than spec, FAIL LOUD, single gateway preserved, empty-config byte-
  identical. Migration APPLIED + live grant-verified (`09efc8e`). Full review PASS.
- **B / REPLAY-QUOTA-1** (merge `b6bd150`, rev 51, 1144→1205; + FIX-1/FIX-2/doc-flip) — **per-user monthly
  replay-run token quota**, enforced as an **atomic RESERVE-CLAMP-SETTLE** at the `/api/admin/replay` POST seam
  (an ADDITIONAL gate after `replay:run`; both single + `mode:'ab'` branches). Reserve clamps the run's own token
  budget to remaining (engine physically can't overshoot even mid-run); settle trues consumed to actual (personal
  key → 0, still audited; error → refund BEFORE the unchanged error-audit); over-quota → 429 (no run, no audit).
  `user_quotas` service-role-ONLY (RLS-on/no-policy/REVOKE-all); atomic `replay_quota_reserve` (FOR UPDATE) +
  `replay_quota_settle`; `QUOTA_MANAGE` super-only (not maker); engine `tokenBudget?` additive/byte-identical-
  when-absent; `/api/admin/replay-quota` (GET counts-only view ∪ all-time aggregate · PUT set-limit ≥ budget /
  no_limit · POST ?reset, audited via `updated_by`); QuotaPanel (`quota:manage`-gated). **Anti-drift root-cause
  fix:** verifyGrants PROBES row + the `verifyGrantsProbes.test.ts` CI coverage test (every classified table has
  a probe). Frozen safety artifacts byte-identical. Full review PASS + independent suite re-run.
  **Migrations APPLIED + live grant-verified** (Operator/Supabase MCP, project ref `fjbrkimwvtpwoxhziidh`):
  `user_quotas` `20260707160000` (RLS true, 0 policies, 0 anon/authenticated DML grants) + the FIX-2 EXECUTE
  lockdown `20260707170000` (both SECURITY DEFINER RPCs → EXECUTE for `service_role`/owner ONLY; verifyGrants
  25/25 anon UPDATE `user_quotas` → 42501).
- **FIX / verifyGrants entry-guard** (`84f4601`, 1205→1209) — the B-phase `import.meta.url===pathToFileURL(argv[1])`
  guard silently no-op'd under the documented `npx vite-node scripts/verifyGrants.ts` (vite-node strips the script
  from argv; `import.meta.main` undefined) → a false-green in the grant-verify tool. Replaced with a test-runtime
  guard `shouldRunProbes(env) = !VITEST && !JEST_WORKER_ID` (the only signal surviving all direct-run launchers;
  suppressed on the vitest CI import). Unit-tested on the real env signals. Architect-verified live (independent
  suite 1209/118 + the documented command now reaches `main()`). Full review PASS.

## 📌 STANDING DELIVERABLE (owner-flagged CRITICAL — MUST produce; do not forget)
**`cwf-governance-replay-explained-v1.md`** — textbook explainer of the per-stage governance replay lens. What a
lens is (deterministic, no-LLM, read-only re-run of ONE gate against a recorded turn at a chosen rule-version =
counterfactual); why (token-free governance regression testing); the three lenses as three data-agent failure
modes (grounding=empty≠zero · routing=ALWAYS_INCLUDE floor · scope/authority); grounded in ADR-001 (make a
lying/wrong backend HARMLESS). **Mandatory worked example** = the real 2026-07-06 Part A A/B at reps=3 (both
arms empty_rate=0, Wilson [0, 0.561] overlap, distinguishable=false): teach reps=1→3→20+; `distinguishable=false`
= UNDERPOWERED, not "no effect"; the lens measures absence, not reply length (365→30 tokens shortened, not
emptied). Plain-engineering AND AI terms. **C needs it** — produce with/before C.

## 🔴 LIVE QUEUE (committed, ordered)
1. **C — User Docs page.** DOCUMENTS-section renderer; hosts the textbook explainer above. Panel-holders only.
   **Next phase: design note first, then produce the textbook explainer, then the gated AG prompt.**
2. **Part A widen — SCOPE/AUTHORITY** (third per-stage lens). `checkScopeDivergence`; version axis =
   `backendAuthority` from `trustRegistry` (no version param yet); floor = conservative-non-fabrication. Design
   note first.
3. **Endpoint switcher / "Sayfa 3"** — gated admin UI to point Langfuse (AWS ↔ local Docker ↔ other); inherits
   `mcp_secrets` for keys. *(= the screenshot's "Langfuse hardcoded → selectable" completion-vision item.)*
4. **GOVERN polish — continued** (owner rough-spot list; MCP JSON-edit masked round-trip · probe auto-poll).
5. **P7** — Superset empty≠zero runtime validator (3rd defense layer, no fragile regex).

## 🛠 DEFERRED (do NOT build unprompted)
- **HARDEN-FN-PROBE-1** (NEW, small, full-review) — add a **function-EXECUTE anon-denied probe** to
  `scripts/verifyGrants.ts` for the service-role-only RPCs (`replay_quota_settle(NO_UUID,0,0)` is the crisp,
  FK-free detector: anon CAN'T execute ⇒ error = good; no-error ⇒ LEAK). Rationale: the FIX-1/FIX-2 saga was a
  function-EXECUTE leak that verifyGrants (table-UPDATE probes only) could NOT catch — only the Operator's manual
  catalog read did. Automate the class.
- **HARDEN-GRANTS-1** (cross-cutting, low-priority, full-review) — a small migration to
  `REVOKE REFERENCES, TRIGGER, TRUNCATE FROM anon, authenticated` on all secret + owner-CRUD tables
  (`mcp_secrets`, `mcp_secret_audit`, `mcp_settings`, `kind_drafts`, `llm_provider_secrets`,
  `llm_provider_secret_audit`, `llm_providers_personal`, **`user_quotas`** — the Operator's B read re-confirmed
  the `REFERENCES,TRIGGER` residual on `user_quotas`, the established pattern). Secret VALUES fully protected (no
  DML); TRUNCATE RLS-exempt but unreachable via PostgREST → low real risk; least-privilege cleanup.
- AWS-DENY-1 (DENY `ssm:SendCommand`/`ssm:StartSession`; NEVER deny `ec2:ModifyInstanceAttribute`) · Multi-user
  Langfuse SSO (rising) · AWS README harden · novel-kind preview follow-up · session-scoped *provider config*
  drafts beyond model selection · kind-draft versioning/history/sharing · **LM Studio + broader on-prem LLM
  families** (A3 delivered the openai-compatible core) · the **"missing-interface" governed connectors**
  (Intent-LLM / LangGraph / Memory / Knowledgebase-RAG — completion-vision roadmap arc, each OPTIONAL/off-by-
  default/governed under the advisory-not-authoritative INVARIANT; own design note + phase per connector).

## 🟡 TRACKED-SMALL / DOC-DEBT
- **B QuotaPanel 1280/1024 (RULE 26)** — the seal shipped the structural-guard substitute (adminRowDiscipline +
  store counts-only) because the panel rendered empty pre-migration. The migration is now APPLIED, so a real-
  browser screenshot pass is doable (owner ~2-min smoke: GOVERN → Replay Quota → set a limit → reset → confirm
  counts-only rows).
- **A3 UI visual pass 1280/1024 (RULE 26)** — real-browser pass advisable (owner smoke: add personal provider →
  set key → Test connection → confirm in picker).
- **AGENTS.md / skill-KB note** — add: the A3 ssrfGuard + `provider:personal` + two-table personal-secret pattern
  AND the B service-role-only-FUNCTION lockdown rule (revoke EXECUTE from public+anon+authenticated + grant
  service_role; the pg_default_acl trap). Next doc-touch phase.
- **Flaky verifyGrants positive-control** — the service-role positive-control write returned HTML on one run,
  clean on retry (negative controls passed both → security result solid). Investigate only if it recurs. Low.
- Grounding "clean" badge grey→green (`variant="secondary"`→`success`) · novel-kind preview boundary (owner
  decision) · InlineHelp localStorage · routing replay preview · perturbation single-shot label · REPLAY-A1
  edit-diff · `replay_audit outcome.status=null` on 3 CHAR-1 rows · `[ToolFilter] Learned` dedup · `act()` RTL.
- **(CLOSED this window)** verifyGrants anti-drift (PROBES-coverage CI test, folded into B) + the verifyGrants
  vite-node false-green (FIX `84f4601`).

## 👤 OWNER-OWNED (manual — surface only on a real 401)
Daily rotation of `supersettoken` / `armes-daily-token`: Secrets → Rotate → paste RAW token (no "Bearer ").

## Verified anchors
- **Repo** `maymun207/cwf_yaprak` master HEAD **`84f4601`** — **1209 tests / 118 files** / docVersion **rev 51**
  / drift `[OK]`. RULE-25 fresh-clone verified this window: B POST-seam (reserve/429/clamp/settle/personal-exempt/
  refund), engine `tokenBudget?` byte-identical-when-absent, `user_quotas` RLS+REVOKE, atomic RPC DDL (FOR
  UPDATE), QUOTA_MANAGE super-only, anti-drift CI test, frozen sweep ZERO, seal-honesty ("authored, Operator-
  pending"); **independent full-suite re-run 1205/117 then 1209/118**; verifyGrants entry-guard fix empirically
  proven live (vite-node no longer a silent no-op).
- Chain (from v25 close `09efc8e`): B code `62df338` → merge **`b6bd150`** (rev 51, 1144→1205) → FIX-1
  **`a639828`** → FIX-2 **`537c8d5`** → doc-flip **`57039c4`** (Operator-applied + live grant-verified) →
  verifyGrants FIX **`84f4601`** (1205→1209).
- **B migrations APPLIED + live grant-verified** (Operator/Supabase MCP, project ref `fjbrkimwvtpwoxhziidh`):
  `user_quotas` service-role-only; the two RPCs locked to `service_role` (EXECUTE removed from
  public+anon+authenticated). `mcp_secrets` live (`armes-daily-token`, `supersettoken`).
- AWS unchanged: `i-030c2b4fadebfa229`, CloudFront, `cwf-prod`, eu-central-1; bootstrap key DEACTIVATED;
  `cwf-budget-stop` STANDBY. RULES current through RULE 29.
- Artifacts this window: B FIX-1 / FIX-2 / doc-flip prompts; Operator prompts (`cwf-operator-B-apply-user-
  quotas-migration-v1.md`, `cwf-operator-B-FIX-2-apply-execute-lockdown-v1.md`); verifyGrants FIX v2 prompt
  (`claude-code-FIX-verifygrants-entry-guard-robust-invocation-v2.md`). Session artifacts: register v26 + KB v26
  + bootstrap v26.

<!-- END · cwf-open-items-register-v26 · rev 26 · 2026-07-07 -->
