# CWF — Control-Plane Activation Map · v1
<!-- rev 1 · 2026-07-05 · Code-grounded sweep of the OA-10 admin surface at master HEAD b3fa7a5 (fresh clone, RULE 25). Turns Maymun's 7-item "üst yapı" frustration into a per-panel real/partial/shell classification + an ordered build backlog. This is a PLANNING artifact (like the open-items register), not a diagram — no drift-manifest coupling. -->

## The headline (evidence-based reframe)
At the **code** level the panel is **not** a toy. Every one of the 9 panels renders a real, capability-gated component wired to a real backend endpoint — there are **no dead "coming soon" tabs**. The GOVERN plane (Rules · Kinds · Providers · MCP · Routing · Users) is a genuinely capable governance surface with real mutating endpoints. The pain is **narrow and specific**, concentrated in three places: (1) the Inspect deep-link is probably already fixed by this session's AWS cutover and just needs a runtime re-check; (2) Replay is half-live and its inactive half's blocker *just cleared*; (3) the observability endpoint-switcher is genuinely not built. Plus a cross-cutting UX pass. That is a **bounded** backlog, not a from-zero build.

---

## Per-panel classification (HEAD b3fa7a5)

| Plane | Panel | LoC | Endpoint | Status | Note |
|---|---|---|---|---|---|
| GOVERN | Rules | 393 | `/rules`, `/rules/[id]` | ✅ REAL | create · patch · ready-signal · publish · rollback · archive — full lifecycle |
| GOVERN | Kinds | 254 | `/kinds` | ✅ REAL | CORE view-only (Zod-locked) vs SOFT live field editor |
| GOVERN | Providers | 303 | `/providers` | ✅ REAL | upsert · toggle · delete (PROV-1/2/3) |
| GOVERN | MCP Servers | 479 | `/mcp-settings` PUT | ✅ REAL | biggest panel; per-server config |
| GOVERN | Routing | 104 | `/routing-cache` | ✅ REAL | learned-cache view + clear |
| GOVERN | Users | 404 | `/users` | ✅ REAL | invite · roles · scopes · reset · disable · full identity lifecycle |
| MICROSCOPE | Inspect | 347 | `/telemetry` GET · `/observability` GET | ⚠️ REAL, verify | deep-link code is **correct** (builds `{host}/project/{id}/traces/{session_id}`); graceful-off. **Item 4 = runtime re-check, likely already green post-cutover** |
| MICROSCOPE | Tweak | 188 | `labMode` (session read-path overlay) | ⚠️ REAL, limited | existing flags work, no persist; planned points (temperature 09 / history 04) **disabled by design** (each = a typed LabMode code change) |
| MICROSCOPE | Replay | 267 | `/replay` | 🟡 HALF-LIVE | **Part B LIVE** (specimen · reps · miss-policy · per-rep table · audit); **Part A INACTIVE shell — its blocker (permanent host) CLEARED this session → now buildable** |
| MICROSCOPE | Architecture | — | static | ✅ display | blueprint/diagram tabs |

---

## Gap register (maps Maymun's 7 items → concrete work)

- **G1 — Inspect deep-link (item 4).** The InspectTab code is complete and correct: it fetches `/api/admin/observability` (GET, non-secret host+projectId from env at request time), builds the exact C2-verified trace URL, and renders an honest "set LANGFUSE_HOST + LANGFUSE_PROJECT_ID" note when unconfigured. This session's cutover set those 4 Vercel prod env vars, and the C2 test proved `session_id` == trace id flows on instrumented turns. **So item 4 is most likely ALREADY WORKING** — the "not called from admin" symptom was almost certainly observed *before* the env swap (when prod pointed at the tunneled local Docker host). **Action = a 2-minute runtime verify, not a build.** If still blank: confirm the env NAMES are exactly `LANGFUSE_HOST` / `LANGFUSE_PROJECT_ID` in Vercel prod, and that Inspect rows carry a non-null `session_id`.

- **G2 — Replay Part A now unblocked (item 5a).** Part A (single-request per-stage replay) renders an honest disabled banner reading "awaits permanent-host experiment infrastructure (the AWS phase)." **That host landed this session (MICRO-1 closed) → the stated dependency is satisfied → Part A is now buildable.**

- **G3 — F3: replay_audit happy-path row vanished (item 5b).** Owner-input-pending open item; service-role-only, cause unknown. Healthy baseline = Gate-B `replay_audit` 11→14 clean. Investigate before/with Part A.

- **G4 — Observability endpoint-switcher (item 2). GENUINELY NOT BUILT.** `/api/admin/observability` is **GET-only, read-only** — host/projectId come from env; there is no write path. Switching targets today = edit Vercel env + redeploy (what the cutover did). To switch from the UI (AWS ↔ local Docker ↔ other endpoint) **without a redeploy**, the target must move from env to a **governed config** (DB-first/code-floor), read at request time, with env as the floor. **Config/secret split (recurring trap #7):** the **host/projectId = non-secret soft config** → DB-editable + gated admin write UI; the **public/secret keys = secret** → stay env-only, the UI stores only the env-NAME *pointer* per target, never a value. This is a real feature (env→governed-config resolver + gated write UI + a "target" selector), not just a form.

- **G5 — GOVERN "toy" feeling (items 1/7). UX/polish, not missing function.** The GOVERN endpoints work; if it *feels* like a toy, that is discoverability/polish/rough-edges, not absent capability. Cross-cutting pass, lower priority than making the debugging surface real. Needs Maymun to point at specific rough spots (runtime, not visible from code).

- **G6 — "Karanlıkta olan bağlantılar" (item 3) — interpretation to confirm.** The only honest-disabled surfaces the sweep found are: **Replay Part A** (banner, now unblocked → G2) and **Tweak's planned points** (temperature/history, disabled by design). If *these* are what "dark connections" means, G2 + a Tweak-points phase cover it. If Maymun means something else (a specific dead button / a broken runtime flow not visible in code), he points at it.

---

## Committed build order (single path)

1. **Inspect + deep-link — VERIFY-FIRST, then polish** *(page 1)*. Runtime re-check G1 (probably already green — cheap win that directly kills item 4), then make Inspect the real "sit down and debug a turn" window: row → deep-link → Langfuse 14-stage waterfall. This is the debugging substrate everything else builds on, and it answers item 7's core complaint directly.
2. **Replay — activate Part A (G2, now unblocked) + resolve F3 (G3) + confirm Part B is usably reachable** *(page 2)*.
3. **Observability endpoint-switcher (G4, item 2)** — env→governed-config + gated write UI + target selector; config/secret split enforced *(page 3)*.
4. **GOVERN UX/polish pass (G5)** — cross-cutting, ongoing, driven by Maymun's specific rough-spot list.

Rationale for #1 first: Maymun's stated goal is "be able to debug and use an AI service." The debugging surface IS Inspect + the Langfuse waterfall. It's likely a verify-not-build (fastest possible win), and it's the foundation Replay/Tweak sit on.
