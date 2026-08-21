# PHASE OA10-1 — Control-Plane UI Home (complete redesign, final look) — v1

> **Version:** v1 · rev 1 · 2026-07-02 · Author lane prompt (Claude Code on AntiGravity)
> **Baseline:** master @ `5302ff1` (551 tests, docVersion rev 20)
> **Companions (design authority, already produced project-side):** `cwf-oa10-control-plane-ui-scope-v1.html`, `cwf-agent-control-plane-blueprint-v2_1.html`. This prompt is self-contained — everything you need is inline — but those two files are the design record.

---

## 0 · Mission

Rebuild the admin/governance surface (`/admin`, currently a flat 9-tab sidebar) into the **Control-Plane UI Home**: a two-plane shell — **GOVERN** (configure the system) and **MICROSCOPE** (inspect one request: observe → tweak → replay) — with every panel redesigned to a clean, mainstream, SOTA bar in **one phase**, so the complete final UI/UX is visible end-to-end. Features whose backend does not exist yet (F-obs stage tree, Replay execution) are **rendered in their final place but visibly inactive**, each with an honest "inactive — requires …" note. No feature is silently omitted; no dead button pretends to work.

This is primarily a **frontend phase** with three small, precisely-bounded backend additions (§3). Everything else is UI over endpoints that already exist — verify them, do not rebuild them.

---

## 1 · Hard pre-flight gate (do not write a line of code before ALL pass)

1. `git status` clean on `master`; `git log -1` shows `5302ff1`. If HEAD differs, STOP and report — do not proceed on an unexpected base.
2. Full test suite green: `npm test` → **551 passing**. Record the count.
3. Verify these exist exactly as stated (read them; they are your API contract — quote each file path in your report):
   - `api/admin/rules.ts` (GET list w/ `?status=`, POST createDraft), `api/admin/rules/[id].ts` (GET detail+versions+diffs; PATCH draft; POST publish|rollback|archive), `api/admin/kinds.ts` (GET; POST createSoftKind; PATCH updateSoftKindFieldSpec), `api/admin/reset.ts`, `api/admin/capabilities.ts`, `api/admin/providers.ts`, `api/admin/mcp-settings.ts`, `api/admin/routing-cache.ts`, `api/admin/users.ts`.
   - `api/cwf/_lib/labMode.ts` (flags: `routingBypass`, `knowledgeSource`, `previewDrafts`; `LAB_MAX_PREVIEW_DRAFTS=25`; `authorizeLab`).
   - Tables: `domain_rules` (status ∈ draft|published|archived; unique published per (kind,key)), `rule_kinds`, `rule_versions`, `rule_audit`, `telemetry_events` (RLS own-rows), `messages` (`content`, `raw_tool_results`).
4. Confirm the SPA rewrite `/((?!api/).*) → /index.html` is present (external client routes rule) — the new panel routes depend on it.
5. Branch: create `p-oa10-1-ui-home` off master. (Branch hygiene: delete after merge.)

If any check fails → STOP, report the discrepancy, wait.

---

## 2 · The shell (two planes)

Replace the flat sidebar with two labeled groups (same app, same auth, capability-gated as today):

- **GOVERN** — Rules · Kinds · Providers · MCP Servers · Routing · Users
- **MICROSCOPE** — Inspect (renamed from Telemetry) · Tweak (renamed from Lab) · Replay (new) · Architecture (existing blueprint tab stays here)

Rules for the shell:
- Sidebar and panels share **one** capability check per affordance: `hasPermission(CAP)`, never a role literal (existing rule; extend, don't fork).
- Keep the existing backend-switcher, identity chip, and "Back to chat".
- Every panel begins with a **Panel Primer** (§4). No panel ships without one.

---

## 3 · The ONLY backend changes in this phase (bounded; everything else is UI)

**3a · Ready-signal (Rules publish queue).** Migration `..._domain_rules_ready_signal.sql`:
- `alter table public.domain_rules add column ready_at timestamptz, add column ready_by uuid references auth.users(id) on delete set null;`
- **Do NOT touch** the `status` check, the one-published unique index, RLS policies, or the eval-gate. A maker sets/clears `ready_at` on their own **draft** via the existing draft-update path (extend `PATCH /api/admin/rules/[id]` to accept `{ ready: boolean }` alongside payload edits; server stamps `ready_at=now()/null`, `ready_by=actor`; reject if status ≠ draft). Publish/archive must **clear** `ready_at`. Audit both transitions via `rule_audit` (action `update`, detail `{ready: true|false}`).
- Queue query = drafts where `ready_at is not null` (list endpoint: allow `?status=draft&ready=1`).

**3b · Inspect cross-user read (decided: YES).** New `api/admin/telemetry.ts`:
- GET with `?from=&to=&type=&q=&user=&limit=&cursor=`; reads via **service role**; gated by a new permission `TELEMETRY_READ_ALL` granted to `super_admin` only (add to `shared/permissions.js` following the existing pattern). Non-super_admin callers get 403 — the personal own-rows path (existing RLS read) remains untouched for everyone else.
- Response rows are the raw `telemetry_events` columns (payload already redacted at write time — do not re-process).
- Export: same endpoint with `&format=csv` streams CSV of the selected window (RULE 1: no hardcoded limits — page size etc. from config/dbConstants).

**3c · Nothing else.** No new lab flags, no OTel, no Langfuse, no replay execution, no schema changes beyond 3a. If you find yourself editing `chat.ts`, `governance.ts` beyond the ready-flag path, `labMode.ts`, or the eval-gate — STOP; you are out of scope.

---

## 4 · Cross-cutting UI rules (apply to EVERY panel; the report must show each)

1. **Panel Primer** at the top of each panel: *what it controls · which tables · where in code (file names) · lifecycle*. Content per panel is specified in §5 — use it verbatim in spirit; keep it code-accurate. Dismissible but returns per session (no persistence needed).
2. **SOTA table bar:** equal-width aligned columns, no text clipping (truncate w/ ellipsis + full value in expand/tooltip), numbers right-aligned monospace, rounded display (cost `$0.0028`, never 15 digits), sortable columns, sticky header, filter/search where list-like, expandable rows where records have depth. shadcn primitives; no new UI dependency without stating why.
3. **Determinism/soft split visible** wherever both exist (CORE vs SOFT is the canonical case).
4. **Inactive-not-hidden:** anything whose backend does not exist yet renders in final position, disabled, with a short honest note naming the dependency (exact strings in §5). Never a dead control without a note; never a fake-working control.
5. Empty≠zero at the render layer everywhere: empty list = "no data", real 0 = 0.

---

## 5 · Panel-by-panel specification

### 5.1 Rules (GOVERN) — fully functional
- **Primer:** governed rule instances the agent reads · tables `domain_rules` (+`rule_kinds` structure, `rule_versions` history, `rule_audit` trail) · code `api/cwf/_lib/knowledge/governance.ts`, endpoints `api/admin/rules*` · lifecycle: maker drafts → eval-gate → super_admin publishes; one published per (kind,key); publish archives prior + version+1 + appends history; rollback = new gated draft.
- **List:** grouped by kind (as today) but each row shows **status legibility**: `● running vN` (published) · `◐ draft` (a draft exists for this key) · `✓ ready` (draft with `ready_at`). Segmented control: **All rules | Ready to publish (N)** — the queue view lists ready drafts across kinds (super_admin sees all in scope; maker sees own).
- **Detail:** header (key, kind, badges: eval-gate governed / structure-locked if CORE) + **version timeline** (from existing GET versions+diffs): each historical row → view · diff · rollback; published row highlighted "running now"; ready-draft row dashed-accent. Payload editor for drafts (JSON, schema-validated via existing PATCH; show server error verbatim on 422).
- **Actions, role-gated via capabilities:** maker → edit draft, **mark ready / unmark**; super_admin → **publish** (show gate stages result on failure: failedStage + errors, from the existing publish response), rollback, archive. Destructive actions confirm first (existing rule).

### 5.2 Kinds (GOVERN) — fully functional, zero backend change
- **Primer:** the structure contract · table `rule_kinds` · CORE structure = code Zod in `api/cwf/_lib/knowledge/reference/coreSchemas.ts` (DB `field_spec` is a read-only mirror; validation uses code); SOFT structure = `field_spec`, interpreter-validated · registry `reference/kinds.ts` · Zone note: `hasBarcode/scrapVisible` are the shape behind blind-spot empty≠zero; instances live in Rules.
- **CORE card:** locked field table (each row shows type · required · lock glyph), amber "locked to code · core" badge, and exactly three affordances: **view Zod schema** (modal showing the mirror + `codeSchemaRef` + file pointer), **N instances →** (navigates to Rules filtered to this kind), **reset to reference** (existing endpoint; destructive-confirm; explain "re-publishes code baseline as a NEW version; history preserved"). **No structure edit affordance exists on CORE.**
- **SOFT card:** live **field editor** — rows of (name input · type select from the field-spec type set · required toggle · delete), add-field, save → existing PATCH; surface the server's "breaks N instance(s)" rejection verbatim. **New SOFT kind** → existing POST.
- Backend-level **Reset backend to reference** stays (destructive-confirm).

### 5.3 Inspect (MICROSCOPE) — list fully functional; stage tree inactive
- **Primer:** per-request observation · table `telemetry_events` (append-only; service-role writes; write-time redaction in `TelemetryRepository.record`) · emission `api/cwf/chat.ts emit()` · today: event list; after F-obs: OTel stage tree joined by one trace id.
- **List (the locked SOTA requirements — all seven):** (1) row = summary; click expands to full record in **dual view: human-readable key/value + raw JSON**, with copy-JSON; (2) **no payload column**; (3) equal/aligned/sortable/sticky columns (`time · type · model/tool · tok i/o · ms · cost · expander`), numbers right-aligned mono; (4) **cost rounded** to 4dp in the row (full precision only inside expand); (5) **time-range picker + export** (CSV via 3b); (6) type filter (`message|llm_call|tool_call|error`) + free-text search, **error rows highlighted**; (7) trace-id column rendered but **inactive**: "— · inactive — joinable trace id lands with F-obs (OA-8)".
- **User filter** (3b): visible to super_admin only (capability-gated); default "me".
- **Stage tree:** a collapsed section at top of the expanded request view, disabled, note: *"14-stage trace tree — inactive; requires the observe backbone (self-hosted Langfuse + OTel), parked on OA-8."*

### 5.4 Tweak (MICROSCOPE) — fully functional (existing flags only)
- **Primer:** session read-path overlay · code `api/cwf/_lib/labMode.ts` (`authorizeLab`) applied in `chat.ts if(labActive)` · nothing persisted · invariant badges: server-authorized · read-only (no publish path exists) · clears on refresh · flags off ⇒ request path byte-identical.
- **Flags, each stage-tagged:** `06 routingBypass` toggle · `05 knowledgeSource` select (DB published | code floor) · `05·08 previewDrafts` input (max 25, read-only note) · `09 forceProvider` select (uses the existing `req.body.forceProvider` path; chat-selectable providers from the providers registry) · `12 rawToolData` toggle (client render flag, as today). **Clear all flags.**
- **Planned tweak points** (temperature 09, history window 04): render as disabled rows, note: *"inactive — each new tweak point is a typed LabMode field + guarded application (code change), not in this phase."*
- Do NOT add new flags to `labMode.ts` in this phase.

### 5.5 Replay (MICROSCOPE) — designed shell, fully inactive
Render the final screens exactly as designed, all controls disabled, with two honest banners:
- **Part A · single-request replay** (captured stage → perturbation chips [nudge / temp / model] → run → original-vs-replayed diff panes): banner *"inactive — isolated stage replay requires captured per-stage I/O (F-obs, parked on OA-8)."*
- **Part B · empty-completion experiment** (dataset card "high-empty queries · sourced from messages.content" → variants [baseline retry · nudge · temp-bump] → recovery % cards → winner): banner *"inactive — buildable pre-F-obs: needs the experiment substrate (Langfuse Experiments) + the domain task-fn and deterministic recovery scorer; next phase after the UI home."*
- Primer: substrate = Langfuse Experiments (buy); inputs from `messages.content` (unredacted), tools stubbed from `messages.raw_tool_results` — never from redacted telemetry; the two BUILD pieces are the task-fn and the deterministic (`empty≠zero`) recovery scorer.
- No backend calls from this panel. Zero.

### 5.6 Govern grammar pass (Providers · MCP Servers · Routing · Users) — restyle only
Apply §4 to all four (primer + SOTA table bar + inactive-not-hidden). **No endpoint changes.** Primers, code-accurate:
- **Providers:** which LLMs exist/are on/are chat-selectable is DATA (`llm_providers` row); new family/SDK = code (closed set); secrets env-only — panel shows only whether `apiKeyEnv` is SET, never a value field.
- **MCP Servers:** global vs personal `mcp_settings`; personal secrets owner-scoped RLS (ADR-002); session-override never mutates global.
- **Routing:** tool-category cache + self-learn; cache-clear action (existing endpoint).
- **Users:** RBAC + backend scopes; invite = pure magic-link (reset-parity); capability-not-role everywhere.

---

## 6 · Constraints (standing rules — violations fail the phase)

- Capability-not-role in every gate (`hasPermission(CAP)`); sidebar + panel share one check.
- No LLM-judge anywhere; no vector in the knowledge core (not that this phase should be near either — if you are, you're out of scope).
- Secrets via env only; never render or log a secret value; RULE 1 — no hardcoded tunables (page sizes, limits → config/dbConstants).
- Audit-or-alarm untouched; the ready-flag transitions are audited (§3a).
- Coverage floor: the CI-enforced ratchet must not go down; new backend code (3a/3b) ships with tests (see §7).
- Living-doc lock-step: sync the architecture/blueprint tab reference + bump the doc manifest **in the same seal**, using the two-commit seal pattern for this mixed code+doc phase. The blueprint itself was already re-synced project-side to v2.1 — the in-app Architecture tab must reference/embed the v2.1 map, not v1.
- Every artifact/file this phase generates carries its version in filename + inside.
- Branch `p-oa10-1-ui-home`; merge to master when green; delete the branch after merge.

---

## 7 · Self-verification (evidence required — a claim without evidence is not done)

Produce a report with, at minimum:
1. Pre-flight transcript: HEAD hash, test count before.
2. Migration applied (3a): `\d domain_rules` (or equivalent) showing `ready_at/ready_by`; proof the status check + unique index are byte-identical to before (diff of the schema dump).
3. Tests: new tests for (a) ready-flag set/clear only on own draft, cleared on publish/archive, audited; (b) `api/admin/telemetry.ts` — super_admin gets cross-user rows, non-super_admin 403, filters + CSV work; (c) a render-level test that Replay panel issues **zero** network calls. Final suite count ≥ 551 + new tests, all green; coverage floor not lowered.
4. Screenshots (or DOM dumps) of: the two-plane sidebar; each of the 9 panels showing its **primer**; Rules queue view with a ready draft; a Kinds CORE card (3 affordances, no edit) vs SOFT card (field editor); Inspect expanded row (dual view) + rounded cost + error highlight + super_admin user filter; Tweak with stage tags; Replay both parts with inactive banners.
5. Grep evidence: no role literals in the new UI (`grep -rn "super_admin\|power_user" client/... ` limited to the new panel code → only capability constants), no `.env` reads, no hardcoded page sizes.
6. The seal: the two commits (code, then doc-sync + manifest bump) with hashes.

Report format: facts + evidence, no summaries of intent. Anything you could not complete: list it explicitly under "NOT DONE" — an honest gap beats a silent one.

---

*PHASE OA10-1 · v1 · rev 1 · 2026-07-02 · baseline 5302ff1 · one phase, whole house, honest inactive states.*
