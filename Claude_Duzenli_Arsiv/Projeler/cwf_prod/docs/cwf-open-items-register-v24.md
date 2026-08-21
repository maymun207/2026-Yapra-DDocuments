# CWF — Open Items Register · v24
<!-- rev 24 · 2026-07-07 · Supersedes v23. Ground truth = repo CHANGELOG at master HEAD `3dd0a95`.
     Delta since v23 (bf3d95d): the sandbox-vs-global RBAC line opened and shipped its first two phases —
     NAV-RBAC-1 (five-section nav + maker view/lens caps + server gate splits, rev 48, e5b678a) and
     KIND-DRAFT-1 (SOFT-kind session-draft sandbox, rev 49, 3dd0a95; migration APPLIED). v23's queued
     "Part A widen — SCOPE/AUTHORITY" was deferred BELOW the sandbox sequence (owner drove the RBAC work).
     master HEAD `3dd0a95` (1074 tests / 103 files / docVersion rev 49 / drift [OK]). -->

---

## 🧭 THE GOVERNING PRINCIPLE (owner-set this window — locked, applies to every future RBAC change)
> The developer (`power_user`) plays with **everything in their own sandbox** (session-scoped
> draft/preview, isolated, no blast radius); the **ONLY** gated line is **global level** — any change that
> commits/publishes to shared, all-users state is **super_admin only**. Promotion of a proven sandbox
> artifact to global is a HUMAN act (verbal/email → super applies), never an in-system workflow.
> One categorical exception: **CORE kind structure** is code-Zod-locked for *everyone* (super included).

## ✅ CLOSED — the sandbox-vs-global RBAC line (this window)
- **NAV-RBAC-1** (`e5b678a`, rev 48, 1013→1036) — admin nav re-grouped from two planes → **five sections**
  (DOCUMENTS · CONNECTION SETTINGS · CONFIGURATION · MICROSCOPE · GOVERN). Three new maker caps
  `REPLAY_LENS` / `PROVIDER_VIEW` / `KIND_VIEW` added to `MAKER_PERMISSIONS`. **Server gate splits** (the
  security core): replay endpoint GET(specimen+lenses)=`REPLAY_LENS` / POST(paid run)=`REPLAY_RUN`;
  providers read=`PROVIDER_VIEW` / mutate=`PROVIDER_MANAGE`; kinds read=`KIND_VIEW` / write=`KIND_SOFT_EDIT`.
  Capability-not-role throughout (kinds `ensureSuperAdmin`→`ensurePermission` conversion). Gate tests mint
  through the REAL permission path (test the gate, not a mock). Full review PASS.
- **KIND-DRAFT-1** (`3dd0a95`, rev 49, 1036→1074) — SOFT-kind **session-draft sandbox**. New **non-governed,
  owner-RLS** `kind_drafts` table (never a production read path) + `KIND_DRAFT` maker cap + pure
  `resolveKindWithDrafts` helper (**CORE always wins**) + two additive seams (rule-draft kind resolution in
  `governance.ts`; `composeLabSlice` consult STRICTLY inside the `previewUserId` block → production
  byte-identical) + `kind-drafts` endpoint (owner-scope server-side, foreign→404, CORE-shadow→422) + UI
  ("Taslaklarım", copy-as-JSON, shared field editor). **Publish stays global-only** (safe sandbox→prod
  boundary: a rule against a draft-only kind can be authored/previewed but not published). Frozen eval-gate
  engine byte-identical. Full review PASS. **Migration APPLIED** (Operator/Supabase MCP, project ref
  `fjbrkimwvtpwoxhziidh`; schema-read confirmed: 9 cols, RLS=true, EXACTLY 4 owner-scoped `auth.uid()=user_id`
  policies, NO service-role/production read, UNIQUE(user_id,kind_id)).

## 📌 STANDING DELIVERABLE (owner-flagged CRITICAL — MUST produce; do not forget)
**`cwf-governance-replay-explained-v1.md`** — a textbook-level explainer of the per-stage governance replay
lens architecture, with worked examples. Required: what a lens is (deterministic, no-LLM, read-only re-run
of ONE gate against a recorded turn at a chosen rule-version = a counterfactual); why (governance
regression testing, token-free, proves which past decisions a rule change flips); the three lenses as three
data-agent failure modes (grounding=empty≠zero · routing=ALWAYS_INCLUDE floor · scope/authority); grounded
in ADR-001 (make a lying/wrong backend HARMLESS, not honest). **Mandatory worked example** = the real
2026-07-06 Part A A/B at reps=3 (both arms empty_rate=0, Wilson [0, 0.561] overlap, distinguishable=false):
teach reps=1 (illustrative) → reps=3 (underpowered, CI overlaps) → reps=20+ (CI tightens, arms separate);
core lesson `distinguishable=false` ≠ "no effect" = UNDERPOWERED (Wilson-CI honesty = refuse a claim at low
power). Also teach what the lens measures (absence/emptiness, NOT reply quality/length — the perturbed arm
shortened the reply to 30 vs 365 tokens but did not empty it). Plain-engineering AND AI-technology terms.

## 🔴 LIVE QUEUE (committed, ordered — next session)
1. **A3 — Personal Provider Sandbox** (design note + gated prompt not yet written). Developer adds own LLM
   providers (LiteLLM / Ollama / own key) as **personal rows** (mirror the personal/global MCP pattern,
   owner-RLS) + gateway resolution (single-gateway preserved — a ROW, not a new client) + personal secret
   (masked, rotate-only, never client-bound). **Local-LLM entry:** guided tunnel setup UI (copy-paste
   tunnel cmd + URL + auth-header-as-personal-secret) + honest probe (reachable/unreachable/private-IP).
   **Browser-direct localhost REJECTED** (bypasses server-side governance). **SSRF/egress guard** (https-only,
   block private/link-local/loopback, post-resolve IP check) = security artifact → full review. Promotion to
   global = out-of-band human act.
2. **B — Replay quota subsystem.** Per-user **monthly** token quota (auto-reset + **super-admin manual
   reset**) + **"no limit" option** + super-admin per-user **usage view** (free aggregate over `replay_audit`
   by `actor_user_id`; only a small `user_quotas` ceiling table needed). Server-side atomic enforcement at
   the replay POST before spend. Grants developer a **quota-gated `REPLAY_RUN`**. **Personal-key spend is
   quota-EXEMPT but audited.** Cost/security-relevant → full review.
3. **C — User Docs page.** DOCUMENTS-section doc renderer; **hosts the textbook governance-replay explainer**
   (the standing deliverable above). Visible to panel-holders (super + power_user); not standard user.
4. **Part A widen — SCOPE/AUTHORITY** (the third per-stage governance lens; was v23's first task, deferred
   below the sandbox sequence). Grounded in `checkScopeDivergence`: pure inputs (query S+M from vocab,
   tool-result provenance {scope,backendId}, the compute); version axis = `backendAuthority` from
   `trustRegistry` (currently NO version param — floor|live achievable, preview needs overlay work);
   floor-equivalent invariant = **conservative-non-fabrication** (authority-outage/unknown → "cannot assess,
   not cleared", never fabricate clearance). Lands beside "Grounding @"/"Routing @". Design note first.
5. **Endpoint switcher / "Sayfa 3"** — gated admin UI to point Langfuse at AWS ↔ local Docker ↔ other;
   inherits the `mcp_secrets` store for its keys (host/projectId = soft config; keys = `apiKeyRef`).
6. **GOVERN polish — continued** (owner's live rough-spot list). Tracked MCP: JSON-edit masked round-trip;
   probe auto-poll.
7. **P7** — Superset empty≠zero runtime validator (3rd defense layer, no fragile regex).

## 🛠 DEFERRED (do NOT build unprompted)
AWS-DENY-1 (DENY `ssm:SendCommand`/`ssm:StartSession`; NEVER deny `ec2:ModifyInstanceAttribute`) ·
Multi-user Langfuse SSO (rising) · AWS README harden-later · **novel-kind preview follow-up** (extend the
composer to render draft/novel kinds — see tracked-small; its own phase if the owner wants it) · session-
scoped *provider config* drafts beyond model selection · kind-draft versioning/history/sharing.

## 🟡 TRACKED-SMALL / DOC-DEBT
- **Novel-kind preview boundary (KIND-DRAFT-1 Seam-2, owner-decision pending):** a NOVEL draft kind's
  instances don't RENDER in the lab-preview/lens slice (composers render only known-registry kinds);
  shadow-drafts over existing SOFT kinds preview fully; author+validate+rule-draft works for both. Owner to
  decide: promote to a follow-up phase or leave tracked-small.
- **Grounding "clean" verdict badge** renders grey (`variant="secondary"`) not green — should use the
  existing `success` token (ReplayTab). Cosmetic; fold into a GOVERN/Replay-UX polish pass.
- `InlineHelp` banner localStorage · routing replay `preview` deferred (no `tool_cache` draft store) ·
  perturbation single-shot (reps=1) "illustrative, not evidence" · REPLAY-A1 edit-diff · `replay_audit
  outcome.status=null` on 3 CHAR-1 rows · `[ToolFilter] Learned` dedup · `act()` RTL warnings.
- **CLOSED tracked-small:** replay.ts header docstring ("Both gated by REPLAY_RUN" → lens/run split) — fixed
  in KIND-DRAFT-1.

## 👤 OWNER-OWNED (manual — surface only when a real 401 appears, not reflexively)
Daily rotation of `supersettoken` / `armes-daily-token`: Secrets → Rotate → paste RAW token (no "Bearer ").
One place, all users, no redeploy. Only an action when ARMES/Superset tool calls start returning 401.

## Verified anchors
- **Repo** `maymun207/cwf_yaprak` master HEAD **`3dd0a95`** — **1074 tests / 103 files** / docVersion
  **rev 49** / drift `[OK]`. RULE-25 fresh-clone verified: seal chains, diff scope, frozen-file sweep (zero),
  security cores (gate splits, resolve helper CORE-wins, Seam-2 previewUserId guard, production
  byte-identical); full-suite tally + file count per AG report corroborated by the +5/+5 new test files.
- Chain (from v23 close `bf3d95d`): NAV-RBAC-1 code `19747b7` → doc `12695d4` → merge **`e5b678a`** (rev 48) →
  KIND-DRAFT-1 code `a7b64b9` → doc `3c415ac` → merge **`3dd0a95`** (rev 49).
- **`kind_drafts` migration APPLIED** to live DB (Operator/Supabase MCP, project ref `fjbrkimwvtpwoxhziidh`,
  schema-read confirmed). `mcp_secrets` live (`armes-daily-token`, `supersettoken`).
- AWS unchanged: `i-030c2b4fadebfa229`, CloudFront, `cwf-prod`, eu-central-1; bootstrap key DEACTIVATED;
  `cwf-budget-stop` STANDBY.
- Design notes this window: `cwf-phase-A-rbac-nav-maker-sandbox-design-v3.md` (the sandbox-vs-global
  parent + A3 section), `cwf-phase-A2-kind-draft-sandbox-design-v1.md`. Phase prompts:
  `claude-code-PHASE-NAV-RBAC-1-…-v1.md`, `claude-code-PHASE-KIND-DRAFT-1-…-v1.md`.
- Session artifacts (versioned): register v24 + KB v24 + bootstrap v24.

<!-- END · cwf-open-items-register-v24 · rev 24 · 2026-07-07 -->
