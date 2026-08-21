# CWF/EAIP — Session Graph Knowledge Base  ·  v8

### Claude's self-reference graph. Read to reconstruct context fast. Nodes = entities/decisions; edges = relations. Trust repo code > this doc.
<!-- v8 · 2026-07-01 · resume = master HEAD `b52faa7`. Supersedes v7 (`48d345a`). Since v7: PROV-3 (dead `shared/llmGateway` fallback REMOVED — single-source by deletion) · the full invite/credential saga (INV-1 config · SMTP fix · SPA rewrite · INV-2 accept-invite/set-password · user-list-from-auth.users · INV-3 credential lifecycle hardening) · the complete User-Management surface (UM-1 lifecycle ops+audit · UM-2 legibility · UM-3 identity+pending). N1–N44 carried from v7 (stable). -->

---

## GRAPH: NODES  (N1–N28 stable foundation→Phase C; N29–N44 post-C; N45–N47 this run)

**N1–N44 — carried from v7 (stable, unchanged).** Spine: N1 project · N2 repos (`cwf_yaprak` canonical / CWF-DEMO frozen harvest-source) · N3 backends (ARMES flat ≈140 `system_of_record` / Superset gateway ≈22 `reporting_mirror`) · N4 EAIP seam map · N5 prompt arch · N6 knowledge/source-of-truth · N7 governance · N8 eval-gate · N10 ARMES facts (sacred) · N13 backend registry · N14 runtime grounding · N16 UI shell · N18 persistence · N23–N28 trust line A→C (ADR-001 v2; RLS/REVOKE=RULE 11; injection boundary=RULE 12; scope/authority validator=RULE 13) · N29 D-core · N30 gate-hardening · N31 RBAC v2 (three-role maker-checker) · N32 governance panel v2 · N33 OEE-parity learning · N34 OBS-1 · N35 UI-1 · N36 Phase F · N37 DOC-1 (living doc + drift-guard) · N38 PROV-1 (LLM=DATA) · N39 PROV-2 (providers tab) · N40 MCP-ADMIN · N41 security audit · N42 DOC-2 · N43 P-2A viz tables · N44 P-2B viz charts (viz-restore unit complete).

### N45 — PROV-3 (dead `shared/llmGateway` fallback REMOVED, DONE+merged `29e5dfd`) *
The PROV-1 follow-up ("consolidate the non-streaming fallback onto the registry") resolved by **deletion, not wiring**: `shared/llmGateway/{index,providers,rateLimiter}.ts` had **zero production callers** (`generateText`/`generateObject` existed nowhere else; the live agent's ONE call site `streamChat→streamText` never routed through it), and `FALLBACK_PROVIDERS` was a second hardcoded model-id list (a RULE-1 drift landmine). The PROV-1 registry is now the single provider surface. Follow-up cleanup (`ba2846c`) removed the two dangling `vitest.config.ts` coverage-excludes for the deleted files. **Live-path cross-provider resilience is NOT this orphan** — it belongs at the future gateway layer (LiteLLM/vLLM) or a deliberate registry-aware `streamChat` retry.

### N46 — INVITE / CREDENTIAL LIFECYCLE (INV-1/2/3 + SPA rewrite + user-list-from-auth, DONE+merged `b4ff3e3`) *
The full invite→set-password→login→visibility chain, fixed end-to-end and live-verified:
- **INV-1** (operator/config): Supabase Site URL → `https://cwfyaprak.vercel.app`, Redirect URLs allowlist + `/**`. Fixed the localhost activation link.
- **SMTP**: custom SMTP configured (wrong port caused a 30s send-hang → 504; port/TLS pairing fixed).
- **SPA rewrite** (`vercel.json`, PR #8): `/((?!api/).*) → /index.html` — fixed the `/accept-invite` (and `/admin`) direct-load 404. **Any externally-linked client route needs this.**
- **INV-2** (`cb0f756`): explicit `redirectTo`=`/accept-invite` (single-sourced `ACCEPT_INVITE_PATH` in `shared/appRoutes.ts`; env/origin base, omit-not-malform guard) + `/accept-invite` route + `authStore.setPassword`→`updateUser`.
- **user-list-from-auth** (`1fb1d17`): admin list sourced from **auth.users** (account registry), not `user_roles` — least-privilege users are now visible; `fetchAllAuthUsers` pages all; auth-fail → fallback to `user_roles` list. "Absence of a role row = 'user'" kept for authz.
- **INV-3** (`b4ff3e3`): credential lifecycle hardening — invite writes a **temp-password fallback** (secret; HTTPS-once) alongside the link; **admin-triggered reset** (`resetPasswordForEmail`, `redirectTo`=`/accept-invite`); the **crossover guard** (`src/lib/inviteGuard.ts` `evaluateInviteGate`: `allow` ONLY when `linkUserId && sessionUserId===linkUserId`, default-deny) + a second layer (`setPassword(pw, expectedUserId)` server `getUser()` re-assert). Root cause of the whole outage: accounts had no usable password (link sessions but no set-password persisted; recovery/magic links landed at root; crossover corrupted ksadmin's password). **Operator/Author lane split proven live** (native-Gemini config ops vs Claude-Code repo authoring).

### N47 — USER-MANAGEMENT SURFACE COMPLETE (UM-1/2/3, DONE+merged `b52faa7`) *
Triggered by a (justified) owner complaint: user ops required the Supabase dashboard = a missing-tooling bug. Now **every account operation is in the gated/audited/RBAC panel, zero dashboard**:
- **UM-1** (`d37a584`): audit-action CHECK migration (12 actions) + `disable`/`enable` (ban), `confirmEmail`, `setTempPassword`, audited `sendReset`; **anti-lockout extended** to disable (self / last super_admin → 409). Migration **applied**.
- **UM-2** (`477819d`): server-computed `computeUserStatus` (disabled > unconfirmed > pending > active) + status badge + search/role/status filters + user-detail drawer with the **per-user audit trail** (`UserAuditRepository.listForUser`, gated/bounded). No migration.
- **UM-3** (`b52faa7`): change email (`email_confirm:true`, collision→409, audit old→new, UI confirm dialog) + change display name (`user_metadata` **merged** not overwritten) + resend-invite (pending-only, reuses reset+temp-pw, never re-`inviteUserByEmail`) + revoke (=`deleteUser`). CHECK migration adds `change_email`/`update_profile`. Migration **applied**.
Deferred: **force-signout / instant session-revoke** (supabase-js@2.95.3 has no revoke-by-id; disable=ban prevents refresh but the existing access token stays valid ~1hr, not instant).

## GRAPH: EDGES (key causal chains — new below the v7 set)
- PROV-1 (LLM=DATA registry) → **N45** removes the duplicate second provider surface (deletion = single source). Future gateway (LiteLLM) → owns failover, not N45's orphan.
- INV-1 config → SMTP → SPA rewrite → INV-2 → user-list-from-auth → INV-3 = **N46** (each fix surfaced the next latent gap; login is browser→Supabase, invisible to Vercel logs — diagnose at the Auth layer).
- N46 crossover corruption → recovery via dashboard `updateUserById({password})` → the ground-truth test that isolated "no usable credential" as the root cause.
- Owner complaint (dashboard-for-user-ops) → **N47** (automation-first: a manual dashboard step = a missing tooling feature). N47 anti-lockout extends N31's guard.

## DECISIONS LOG (D1–D32 in v7; new below)
- **D33** — PROV-3 = **consolidate-by-deletion**: dead code wired onto a registry is still dead; single source is achieved by elimination; in-app cross-provider failover is anti-vision (future gateway layer owns it).
- **D34** — **SPA fallback rewrite** (`/((?!api/).*) → /index.html`) is required for any externally-linked client route; latent until the first full-page direct load.
- **D35** — admin user list sourced from **auth.users** (account registry), not `user_roles`; "absence of role row = 'user'" kept for authz, but visibility must come from the account registry.
- **D36** — invite = **link (preferred) + temp-password (fallback)**; recovery/reset → `/accept-invite`; the **crossover guard is POSITIVE** (allow only on link-user==session-user, default-deny) + a server `getUser()` re-assert. Password-set flows never write to a pre-existing/non-link session.
- **D37** — **user management is a first-class gated/audited/RBAC surface**; the Supabase dashboard is never the tool for a user op (a manual dashboard step = a tooling bug to fix). Full lifecycle+identity+pending+status+audit.

## ARTIFACTS PRODUCED (versioned; reference, don't regenerate)
- `claude-code-PHASE-PROV-3-fallback-surface-removal-v1.md`
- `cwf-ag-native-operator-lane-v1.md` (the Operator-lane skill: native-Gemini config/ops fence — never authors repo, never bypasses the eval-gate/governed-tables, never prints secrets)
- `claude-code-PHASE-INV-2-accept-invite-set-password-v1.md` · `claude-code-PHASE-INV-3-credential-lifecycle-hardening-v1.md`
- `cwf-user-management-surface-spec-v1.md` (the complete surface spec — HAVE/MISSING + phased plan)
- `claude-code-PHASE-UM-1-…` (lifecycle+audit) · `-UM-2-user-management-legibility-v1.md` · `-UM-3-identity-and-pending-management-v1.md`
- This checkpoint: KB **v8** · bootstrap **v7** · open-items register **v4**.

## STATUS (snapshot — master HEAD `b52faa7`, 472 tests / 52 files, docVersion rev 12)
DONE & code-verified: SEED→P6.8 · trust line A→C · D-core · GATE-HARDENING · RBAC v2 · GOV-2/3/4 · OBS-1 · UI-1 · Phase F · DOC-1 · PROV-1 · PROV-2 · MCP-ADMIN · security audit · DOC-2 · P-2A · P-2B · **PROV-3 · the invite/credential saga (INV-1/2/3 + SPA rewrite + user-list-from-auth) · the complete User-Management surface (UM-1/2/3)**. Both UM audit migrations **applied**. **NEXT: PL-1 F-obs** (OTel→self-hosted Langfuse).

## STANDING RULES (enforce every phase) — additions this run
- **Login is browser→Supabase direct** (not through Vercel) → login failures are invisible to Vercel logs; diagnose at the Supabase Auth layer. "Invalid login credentials" is **generic** (masks unconfirmed/wrong-pw for enumeration safety) — don't over-read it.
- **Crossover safety:** any password-set flow binds to the **link-established session for its own user** (positive id match, default-deny); never writes to a pre-existing session.
- **Temp passwords are secrets:** returned once over HTTPS, revealed once in the UI, **never logged/audited by value**.
- **Every account operation → gated/audited/RBAC admin UI; zero Supabase-dashboard dependency.** A manual dashboard step is a missing tooling feature. **Anti-lockout** covers disable/delete/force-signout/demote of the last super_admin + self.
- **SPA:** any externally-linked client route needs the `/((?!api/).*) → /index.html` rewrite.
- **Operator/Author lane split:** operating governed infra (config, applying repo migrations, seeds, reads) produces no repo delta → no doc obligation → the native-Gemini operator lane; authoring (code/migrations/schema) → Claude-Code with full doc lock-step. The operator NEVER writes governed tables / flips publish status / prints secrets.
- (Carried: versioned artifacts · backend=DATA · grounding+trust deterministic · empty≠zero incl. render layer · viz FROM-TOOL directive · forged-label contained not detected · admin writes only via gated API · data→UI/structure→code/secret→env · automation-first/observable tests · living-doc lock-step + verify-altitude · Superset gateway · scope=datasource not title · backend-aware relevance filter · single LLM gateway.)

## KEY LEARNINGS (this run)
- **Reactive-firefighting was my miss:** I fixed the invite chain symptom-by-symptom instead of designing the full user-management surface up front. The automation-first / gated-UI principle should have driven a complete surface from the start. Bring the whole picture; don't make the owner spell out standard features.
- **The loop is bidirectional:** AG caught two of my errors (the −14 test-count miscount from a `grep -c "it("` matching `checkRateLimit(`; the "coverage thresholds pass" assumption — they're ungated at ~60%). Verify my own assertions, not just AG's.
- **AG re-surfaces stale live-state claims:** it re-flagged already-applied migrations as "outstanding" (it can't see the live DB). Cross-check report claims against confirmed live state.
- Best-effort audit (op succeeds even if the audit insert is rejected pre-migration) opens a transient unaudited-mutation window → apply the migration immediately; consider audit-or-fail for governance-critical mutations (tracked).

## WORKING LOOP (unchanged)
Maymun runs Claude Code 4.8 on AntiGravity (Author lane) + native Gemini w/ Supabase MCP+CLI (Operator lane, config/ops only, fenced). Claude (architect): diagnose → committed rec (not menus) → versioned gated phase prompt (hard pre-flight + evidence self-verify) → critically review the AG report by cloning `cwf_yaprak` and diffing vs the last verified commit → read prod Vercel logs via MCP (scope to deploymentId + narrow `since`, search inner word). TR strategy / EN technical. Diagnosis-first, name the hidden trap, push back honestly, one path, finish fully.
