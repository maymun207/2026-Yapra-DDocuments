# CWF — Open Items Register · v27

<!-- v27 · 2026-07-08 · anchor = master HEAD `5485a96` (1213 tests / 119 files / docVersion rev 52 / drift [OK]).
     Supersedes v26. Do NOT re-raise CLOSED items. -->

## Anchor
`origin/master` = `5485a96` · 1213 tests / 119 files · docVersion rev 52 · drift [OK].

## CLOSED this window (Session 27) — do NOT re-raise
- **AG SEC-ADVISOR-1** — `set_updated_at` search_path='' (lint 0011). Applied `b1529fa`, independently verified live (Gemini) — 0011 GONE.
- **AG SEC-ADVISOR-2** — authz helpers → `private` schema (closes 0028/0029 boolean-oracle RPC leak). Applied `b1529fa`, independently verified: helpers in `private`, 17 policies re-qualified, 0028/0029 GONE, anon behavioral-denied (B4).
- **AG BUGFIX-AUDIT-1** — `delete_user` audit FK bug (deletions were un-audited). Applied `b1529fa`, verified: `user_audit` has 0 FK constraints.
- **Ledger reconcile** — `schema_migrations` timestamp→file-prefix. Verified live: 36 rows = 36 repo files (33 reconciled + 3 new), no applied-but-absent object.
- **ADR-005 (Accepted)** — Supabase apply authority: AG read-only · Operator/CI applies via `db push` · deterministic gate · private-schema invariant · CI-apply as zero-rework future.
- **supabase-ro read-only downgrade** — AG's Supabase connection is now Postgres-level read-only (`supabase_read_only_user`, `transaction_read_only=on`, DDL→25006); root cause was the built-in `plugin:supabase:supabase` override (#21368), fixed by disable-plugin + non-"supabase"-named `supabase-ro` server. Committed `33f2b45`.
- **ADR-006 (Accepted)** — Agent Operating Modes: developer/operator {repo,DB} tuple, no-double-write invariant, role-based/symmetric, mode bound to connection, default safe.
- **HARDEN-FN-PROBE-1 (CLOSED, RULE-25-reviewed `5485a96`)** — function-EXECUTE anon-deny probe + SSOT coverage test in verifyGrants. Suite 1213/119 independently recounted.
- (Prior windows, still closed — do NOT re-raise: the WHOLE sandbox-vs-global RBAC line A/A2/A3, B/REPLAY-QUOTA-1 incl. FIX-1/FIX-2/doc-flip, the verifyGrants entry-guard fix.)

## Committed queue (in order)
1. **C — User Docs page** (the committed FIRST TASK, untouched this window). A DOCUMENTS-section doc renderer (panel-holders only) hosting the STANDING textbook governance-replay explainer. Produce, in order: (1) design note code-grounded at CURRENT HEAD `5485a96` (DOCUMENTS nav + docs route/renderer + markdown-render approach + READ-cap access); (2) the textbook explainer `cwf-governance-replay-explained-v1.md`; (3) ONE gated AG phase prompt. **STANDING owner-flagged CRITICAL deliverable** — the textbook explainer (see its full spec in bootstrap v27).
2. **Part A widen — SCOPE/AUTHORITY** — third per-stage deterministic lens; grounded in `checkScopeDivergence`; version axis = `backendAuthority` from trustRegistry; floor = conservative-non-fabrication. Design note first.
3. **Endpoint switcher / "Sayfa 3"** — gated admin UI to point Langfuse (AWS ↔ local Docker ↔ other); inherits `mcp_secrets` for keys.
4. **GOVERN polish** (owner rough-spot list) · **P7** (Superset empty≠zero runtime validator, 3rd layer, no fragile regex).

## DEFERRED (do NOT build unprompted)
- **NEW — Multi-author CHANGELOG/KB gates** (ADR-006 follow-up): a thin `GEMINI.md`/`.gemini` pointer to `.agents/AGENTS.md` (no rule duplication) + a "changelog-touched" CI check (a PR changing mapped `api/`/`shared/`/`src/` but not `.agents/CHANGELOG.md` FAILs). Required BEFORE onboarding Gemini as a routine Developer; sequenced after the committed queue. Optionally seal as its own ADR.
- **CI-apply pipeline** (ADR-005 future upgrade): protected GH Actions `supabase db push` on merge + CI-held scoped token + post-apply `verifyGrants`+`get_advisors` gate. Zero-rework from the current Operator model; build only when the manual relay becomes friction.
- HARDEN-GRANTS-1 (REVOKE REFERENCES/TRIGGER/TRUNCATE from anon/authenticated on secret+owner-CRUD tables incl. user_quotas — least-privilege cleanup) · AWS-DENY-1 (DENY ssm:SendCommand/StartSession; NEVER deny ec2:ModifyInstanceAttribute) · Multi-user Langfuse SSO (rising) · AWS README harden · novel-kind preview follow-up · provider config drafts beyond model selection · kind-draft versioning/history/sharing · LM Studio + broader on-prem LLM families · the missing-interface governed connectors (Intent-LLM / LangGraph / Memory / Knowledgebase-RAG — completion-vision roadmap, each OPTIONAL/off-by-default/governed under "advisory-additive, never bypass the governance floor"; own design note + phase per connector). Owner-owned (surface only on a real 401): daily rotation of supersettoken/armes-daily-token.

## Tracked-small
`.mcp.json` lost trailing newline in `33f2b45` (cosmetic; fix opportunistically) · B QuotaPanel 1280/1024 real-browser screenshot + owner 2-min smoke · A3 UI visual pass 1280/1024 · AGENTS.md/skill-KB note (A3 ssrfGuard + provider:personal + B service-role-only-FUNCTION lockdown + pg_default_acl trap + NOW: the plugin-override trap + ADR-005/006) · flaky verifyGrants positive-control (HTML on one run, clean on retry; investigate only if recurs) · grounding "clean" badge grey→green · novel-kind preview boundary · InlineHelp localStorage · routing preview · perturbation single-shot label · REPLAY-A1 edit-diff · replay_audit status-null · ToolFilter dedup · act() RTL.

<!-- END · CWF-OPEN-ITEMS-REGISTER · v27 · 2026-07-08 -->
