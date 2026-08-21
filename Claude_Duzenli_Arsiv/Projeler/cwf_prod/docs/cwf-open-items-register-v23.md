# CWF — Open Items Register · v23
<!-- rev 23 · 2026-07-06 · Supersedes v22 AND reconciles two PARALLEL session threads that both advanced
     the repo (see KB v23 §"dual-session"). Ground truth = repo CHANGELOG at master HEAD bf3d95d, not
     either chat's summary. Delta since v22 (c9f34cf): the whole Replay-microscope line landed —
     REPLAY-A2 (routing per-stage lens, rev 46, 3f8b639), PRIMER-COLLAPSE-1 (ff46bf3), PERTURB-1 (Part A
     A/B perturbation LIVE+audited, rev 47, b6ba5d3), REPLAY-UX-4 (specimen-first layout, bf3d95d). master
     HEAD bf3d95d (1013 tests / 93 files / docVersion rev 47 / drift [OK]). -->

---

## 🧵 DUAL-SESSION RECONCILIATION (read once, then trust the repo)
Two chat threads ran in parallel and both drove real commits: **this thread** did the v21→v22 MCP-config
marathon (→ `c9f34cf`); the **"backtothefuture" thread** resumed from v22 and drove REPLAY-A2 → PRIMER →
PERTURB-1 → REPLAY-UX-4 (→ `bf3d95d`); then this thread was mistakenly re-entered and re-reviewed the same
builds. There is ONE reality: **`origin/master = bf3d95d`**. This v23 supersedes v22 and any per-thread
record. Going forward, resume ONLY from the latest v* here + the repo — never from a chat's memory.

## ✅ CLOSED — the MCP-config line (v22, RULE 29 §1–§9 closes the screen; do not reopen)
MCP-SECRET-REF-1 (`b165c34`, rev 42) · MCP-DONE-1 (`f020712`, rev 43 — isolated `mcp_secrets` store,
service-role-only, UI-rotatable, no redeploy) · MCP-BACKEND-ID-1 (`9dda837`, rev 44) · MCP-HEADERS-1
(`c9f34cf`, rev 45 — header-name-aware guard + required-URL). Global armes + global Superset LIVE
(`apiKeyRef` refs, daily rotation = one UI Rotate). RULE 29 = nine invariants; every future MCP change fits inside.

## ✅ CLOSED — the Replay microscope line (this window)
- **REPLAY-A2** (`3f8b639`, rev 46) — per-stage **ROUTING** replay lens (deterministic, no-LLM), widening
  the A1 grounding lens. `routeKeywordLayer` pure-core extraction (keyword-path byte-identical) + version-
  pinned learned-map slice `{floor|live}` (preview deferred — no `tool_cache` draft store). Availability
  floor SACRED (reuse production core; no-keyword-match ⇒ `path='no-keyword-match'` + floor set, never
  `offered=0`). `calledButNotOffered` = the coverage-regression signal. Lands on the Part B specimen-detail
  panel beside "Grounding @". C9 NAME-ONLY, no audit (pure GET). Full review PASS.
- **PRIMER-COLLAPSE-1** (`ff46bf3`) — the admin PanelPrimer `✕ dismiss→return null` became a reversible
  **collapse ⇄ expand** (sessionStorage, legacy `'dismissed'`→collapsed). Never renders null again.
  Frontend-only. (Tracked-small: the separate `InlineHelp` banner still uses localStorage — deferred.)
- **PERTURB-1** (`b6ba5d3`, rev 47) — the UI's **"Part A · single-request replay"** shell is now a LIVE,
  **audited** two-armed **A/B** (baseline vs perturbed) over the SHIPPED REPLAY-B engine — NO new engine.
  `runPairedReplay` calls `runReplayExperiment` ×2 under ONE atomic token budget; ONE POST `mode:'ab'`; ONE
  paired `replay_audit` row (params+rates+delta, no reply/payload/secret); Wilson-CI delta (overlap ⇒ "not
  distinguishable from noise"). Spends tokens → audited. §PARITY folded the Part-B UX in up front. Full review PASS.
- **REPLAY-UX-4** (`bf3d95d`) — specimen-first layout: the shared specimen picker lifted into a top
  **① Specimen** section above both experiments (① pick → ② Part A · A/B → ③ Part B · empty-completion),
  one `specimenId`, both run buttons gated + hinted. Frontend-only, zero run-behavior change. RULE-25 PASS.

**Naming collision RESOLVED (both surfaces now live, distinct):** the UI "Part A · single-request replay"
panel = model **perturbation** A/B (PERTURB-1). The "Part A per-stage replay" **governance** lenses (A1
grounding, A2 routing) live under **Part B's specimen-detail** panel. Same "Part A" label, two features.

---

## 🔴 LIVE QUEUE (committed, ordered — next session)
1. **Part A widen — SCOPE/AUTHORITY (the third per-stage lens).** A1 = grounding, A2 = routing; the last
   deterministic per-stage lens is scope/authority. Short design note BEFORE the phase prompt (what's pure
   vs impure in scope resolution, the version-pinned slice, the floor-equivalent invariant). Lands beside
   "Grounding @"/"Routing @" on the Part B specimen-detail panel. Security-relevant → full review; keep OUT
   of any UI-polish phase.
2. **Endpoint switcher / "Sayfa 3"** — gated admin UI to point Langfuse at AWS ↔ local Docker ↔ other.
   `/api/admin/observability` is GET-only; move target env → governed config (DB-first/code-floor) + gated
   write UI + selector. **Config/secret split INHERITS the `mcp_secrets` store:** host/projectId = non-secret
   soft config (DB-editable); keys = a stored secret referenced + resolved server-side (the `apiKeyRef` discipline).
3. **GOVERN polish — continued** (owner's live rough-spot list; MCP screen is done). Tracked MCP follow-ups:
   JSON-*edit* masked round-trip view; probe auto-poll.
4. **P7** — Superset empty≠zero runtime validator (3rd defense layer, no fragile regex; Superset at 2 vs ARMES's 3).
5. **ARMES-401 — SUBSUMED.** ARMES is a global `apiKeyRef:armes-daily-token` row → rotation is one UI Rotate
   (no per-user rows, no Vercel). Residual = obtaining the ARDIC token (source-blocked).

## 🛠 DEFERRED (do NOT build unprompted)
AWS-DENY-1 (DENY `ssm:SendCommand`/`ssm:StartSession` etc. before next re-provision; NEVER deny
`ec2:ModifyInstanceAttribute`) · Multi-user Langfuse SSO (rising as the multi-user product lands) · AWS
README harden-later (OIDC→role, permissions-boundary, Elastic IP, CloudFront↔origin secret, MinIO media).

## 🟡 TRACKED-SMALL / DOC-DEBT
- `InlineHelp` banner localStorage (PRIMER-COLLAPSE-1 §2.4) — a later pass to match the primer's sessionStorage.
- Routing replay `preview` deferred (no `tool_cache` draft store — faking one would be dishonest).
- Perturbation single-shot (reps=1) is "illustrative, not evidence"; N-rep-per-arm is the honest default.
- REPLAY-A1 edit-diff limitation (floor-first union suppresses edits to existing floor-id rules).
- `replay_audit outcome.status=null` on 3 CHAR-1 rows · `[ToolFilter] Learned` dedup · `act()` RTL warnings.

## 👤 OWNER-OWNED (manual, trivial now)
Daily rotation of `supersettoken` / `armes-daily-token`: Secrets → Rotate → paste the RAW token (no "Bearer ").
One place, all users, no redeploy.

## Verified anchors
- **Repo** `maymun207/cwf_yaprak` master HEAD **`bf3d95d`** — **1013 tests / 93 files** / docVersion **rev 47**
  / drift `[OK]` (fresh-clone RULE-25 verified).
- Chain (from v22 close `c9f34cf`): REPLAY-A2 →`3f8b639` (rev 46) → PRIMER-COLLAPSE-1 →`ff46bf3` → PERTURB-1
  →`b6ba5d3` (rev 47) → REPLAY-UX-4 →`bf3d95d`.
- Prod serves the latest master deployment. `mcp_secrets` live (`armes-daily-token`, `supersettoken`).
- AWS unchanged: `i-030c2b4fadebfa229`, CloudFront, `cwf-prod`, eu-central-1; bootstrap key DEACTIVATED;
  `cwf-budget-stop` STANDBY.
- RULES current through **RULE 29** (24 amended for the landed per-stage lenses + Part A live).
- Session artifacts (versioned): the four phase prompts above + design notes (`cwf-per-stage-replay-routing-
  design-v1.md`, `cwf-single-request-replay-perturbation-design-v1.md`) + register v23 + KB v23 + bootstrap v23.
