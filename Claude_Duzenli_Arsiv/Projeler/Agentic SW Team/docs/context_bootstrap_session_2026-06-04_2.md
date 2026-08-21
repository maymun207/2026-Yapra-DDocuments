# Context Bootstrap — Session 2026-06-04 (post-migration · cookbook complete)

> **Authoritative project state.** This document is the handoff between
> sessions. Open it, read §1–§7, resume work from §7. Do not re-explain
> §1–§6 back to the operator; treat as known.

---

## 1. Identity & program

You (Claude) act as senior full-stack architect and engineering lead for
**ARDICTECH A.Ş.** — an AIoT company (Istanbul) building a Virtual
Software Engineering Organisation: an autonomous multi-agent software
development platform, AI-assisted via Google **Antigravity (AG)**, NOT
human coding.

**Conductor:** Maymun (founder/CEO, CTO, program owner).
**Single-author rule:** Claude is the sole architect and prompt author.
**Execution surface:** AG handles filesystem, git, GitHub PR, deployment.
**Tool boundary:** AG only edits code in repos. Real infrastructure
deployment (Kubernetes, Vault, etc.) is done by humans in Phase 1+ — the
SSoT is *documentation*, not a live system.

---

## 2. Dual-platform vision

**ARDICTECH** = two reinforcing sub-platforms:

| Platform | Role |
|---|---|
| **EAIP** (Enterprise AI Platform) | Multi-tenant product platform; CWF lives here |
| **Revolutionize** | Autonomous agent platform that builds EAIP; ships verified PRs into EAIP and receives EAIP production telemetry as its reality signal |

**Program window:** June–December 2026, three reinforcing objectives:
1. Teach the engineering team agentic development
2. Build an internal autonomous development platform (**Revolutionize v0.5**)
3. Deliver **CWF to Kale Seramik** as first tenant (Türk Re for insurance triage as second customer)

**CWF delivery holds absolute priority.**

---

## 3. Repos & deployment

- **Content repo:** `agbuilder-platform/revolutionize@main`
  - Contains: v6 SSoT, v5 SSoT (reference), charter, ADRs, stage prompts, lessons.md
  - The v6 SSoT lives at `docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html`
- **App repo:** `maymun207/TheBluePrint23@main`
  - Next.js 15 + React 19 + TypeScript + Tailwind
  - Deployed at `theblueprint23.dev` via Vercel
  - **Post-S6-S7:** content tabs frame the SSoT via `DocumentFrame` (srcDoc + sandbox="allow-scripts" + ResizeObserver auto-height)
  - App-machinery tabs (Phase 0, Library, Resources) keep their own React content
- **Six-person senior engineering team** (the same team that built IoT-Ignite) executes Phase 1+ implementation work starting M1

---

## 4. Migration status (as of 2026-06-04)

✅ **All migration stages complete + cookbook feature-complete.**

| Stage | Delivered | Status |
|---|---|---|
| S1 | Mapping + reconciliation | ✅ merged |
| S2 | Click-to-detail panels (Architecture tabs) | ✅ merged |
| S2b | Inline connection-detail rows (Connectivity tabs) | ✅ merged |
| S2c | v5 component richness restored (sub, desc, deploy, config, notes, owner, repo) — all 67 components | ✅ merged |
| S2d.1 | `ops` + `sample` fields for 48 internal components | ✅ merged (PR #7) |
| S2d.2 | `errors[]` (failure modes) + ECONN FROM/TO cross-linking | ✅ merged (PR #8) |
| S3–S5 | Timeline anchor + prerequisites correction | ✅ verified on main (self-closed: work already there) |
| S6–S7 | Tab flip — all 8 TheBluePrint23 content tabs now render from SSoT/charter; React content layer retired | ✅ merged · Vercel success (SHA d8cdade) |

### Cookbook tier coverage

- **All 67 components:** restored v5 fields (sub · desc · deploy · config · notes · owner · repo)
- **48 internal components:** + ops + sample + errors[]
- **19 external/managed components:** S2c content only (sections hidden by graceful degradation)
- **ECONN cross-linking:** FROM/TO names clickable → opens cookbook panel
- **RCONN cross-linking:** deferred (Rev endpoints don't map to COMPS yet)
- **All content English-only** (TR translation is a deferred pass)

### File size growth

v6 SSoT: 25 KB (pre-cookbook) → 247 KB (post-S2d.2). DocumentFrame
handles this via auto-resize. Cookbook interactivity (chip click, inline
row, cross-link) runs entirely inside the sandboxed iframe.

---

## 5. Pattern Library (living)

Cumulative pattern catalog from prompt-authoring corrections.

| # | Pattern |
|---|---|
| 1–14 | (established in earlier sessions — see `lessons.md`) |
| 15 | (established earlier — see `lessons.md`) |
| **16** | **`</script>` source escape rule.** Any literal `</script>` inside ANY JS string (single, double, or backtick) within an HTML `<script>` block MUST be written as `<\/script>` in source. The HTML parser terminates the parent `<script>` block at the first literal `</script>` regardless of JS quoting context. (Caught by AG during S2d.1; baked into S2d.2 as a hard smoke-test assertion.) |
| **17** | **Re-verify stage prompts against latest file state when another stage shifts content.** S6-S7 was authored pre-cookbook; the v2 re-verification surfaced the iframe-sizing risk that wouldn't have appeared in v1's acceptance. Two minutes of architect review prevented a "panel cropped" defect at Vercel preview. |
| **18** | **Stages can self-close as no-ops.** S3-S5 and S6-S7 both reported "all work was already on main." Content-text anchors (not line numbers) made these self-discovering rather than collision-prone. Verify-before-edit turned what could have been double-application into clean confirmations. |

### Persistent operating principles (unchanged from earlier sessions)

- **Pattern #11 (critical):** stage prompts describe *outcomes the agent produces*, never operator keystrokes
- **Source-of-truth assignment must be explicit per data dict.** v5 SSoT → component depth; v6 SSoT → bilingual strings + all Rev content
- **AG will not self-grade** despite explicit instructions — the three-author `lessons.md` structure must account for this
- **Layout acceptance criteria must include viewport-width visual checks**
- **Spot-check assertions must verify referenced IDs exist in actual source data** before being written into prompts
- **`model_recommended` and `model_used_actual`** tracked separately
- **Bilingual convention:** human-readable prose in both EN and TR; technical identifiers (component names, protocol strings, stage IDs) stay as-is
- **Calendar-bound vs. implementation-bound work:** calendar-bound work does not compress with AI assistance
- **Six non-negotiable AG operating rules:** no `.env` access · BLOCKED-not-false-success reporting · exact identifiers only · cross-phase verification · no raw secrets · additive-over-destructive changes

---

## 6. Architecture invariants

The following are **stable design decisions**, not open questions:

- **Antigravity is a swappable execution surface** (Channel Adapter Pattern), not a foundation. Revolutionize's core stays tool-agnostic.
- **ADR-001:** LiteLLM as LLM gateway foundation (adopted)
- **ADR-002:** MCP as external tool protocol (adopted)
- **Phase 1 Stage Groups 1.4 and 1.7 run in parallel** (dev schedule patch)
- **Dual rendering of the v6 SSoT:** standalone `file://` view = pure reference; TheBluePrint23-wrapped view = same content + (future) progress-tracker overlay
- **The SSoT is documentation.** Nothing runs from it. Phase 1+ humans deploy the actual infrastructure
- **Conductor pattern:** Maymun directs Claude (sole architect), AG executes, operator manually approves browser checks before AG merges

---

## 7. Open / pending work

### 7.1 In-flight: **S2f — Phase filter + summary cards** ← NEXT

Authored 2026-06-04 (this session). **Not yet fired to AG.**

Four sub-deliverables bundled:
1. Per-component `phase` re-extracted from v5 → COMPDATA (67 entries)
2. Per-agent `RCOMP_PHASE` mapping authored by architect (33 entries)
3. EAIP Arch filter UI (7 phase chips + External + Turn All Off; hours per chip)
4. Rev Arch filter UI (8 phase chips + Turn All Off; month ranges per chip)
5. Phase summary cards on both tabs

Prompt file: `S2f-phase-filter.md` in `/mnt/user-data/outputs/` from this
session. 840 lines. Operator (Maymun) was about to paste to AG; session
ended before close-out.

**Resume action:** confirm prompt is staged, ask Maymun if S2f was fired
in the interim, then either await close-out report or re-present the prompt.

### 7.2 Scheduled: **S2e — Supabase progress tracker**

The "developer notes + completion tracking" workstream agreed in
mid-session.

- **Schema lives in Supabase** (not in SSoT HTML)
- **Surfaced through TheBluePrint23** with auth from D0.6
- **4-state model** per component: ⚪ not started · 🟡 in progress · 🔵 staging · 🟢 production
- **Append-only notes** per component (author + timestamp)
- **Blockers field** per component (visible at component level)
- **Roll-up percentages** by layer, phase, owner role
- **Timing:** scheduled for **late M0 / early M1** when Phase 1 starts
  producing real implementation events to capture. Premature to build now.

### 7.3 Deferred (post-Phase 1 start)

- **Rev component cookbook depth.** Currently Rev agents have only model
  assignment + (after S2f) phase. No description/deploy/ops/errors —
  different schema than EAIP because agents are prompts + tools + specs,
  not deployed services. Revisit when Rev's Phase 1 work starts.
- **RCONN cross-linking.** Rev endpoint names don't map to COMPS. Needs
  Rev cookbook before linking has a destination.
- **TR translation of cookbook fields.** Component-side cookbook is
  EN-only (deferred pass). Connection-side stays bilingual.
- **Cookbook content drift capture.** When Phase 1 actually deploys
  LangGraph etc. and finds the cookbook's ops/sample/errors describe
  intent rather than reality, S2e's tracker captures the drift via dev
  notes. Until then, the cookbook represents *design intent*.
- **Five Revolutionize prerequisites** (per `ROPENS` in v6 SSoT) —
  ① first product · ② SOUL.md founder · ③ LLM budget · ⑤ expertise gaps
  remain OPEN. ④ (relation to ARDICTECH) marked RESOLVED in S3–S5.

---

## 8. Recall conventions (Claude-specific)

When Maymun signals a stage:
1. **Read the prompt fresh from `/mnt/project/` or `/mnt/user-data/outputs/`** —
   do not rely on prior session memory for prompt details
2. **Stage prompts follow the 13-field template** documented in earlier
   bootstrap docs; key fields per stage: stage_id, type, model_recommended,
   model_used_actual, predecessor, successor, merge_mode (always
   operator-gated)
3. **Acceptance always includes a Node.js smoke test** that loads the file,
   eval's the script, asserts structural and functional invariants
4. **AG opens PR, stops; operator runs manual browser check; operator
   signals; AG merges** — never short-circuit this loop

### When Maymun reports an AG close-out

Standard close-out has six fields:
- PR # · merge SHA · file size delta · lines added · lessons.md commit · scratch cleaned

After receiving a close-out, append the Pattern Library if AG surfaced a
new gotcha (as happened with Pattern #16 from S2d.1).

### When Maymun signals "fire X"

This means: paste the prompt to AG. Claude's role is to wait for the
close-out report. Do not assume Claude executes anything itself.

### When Maymun says "what are we waiting for?"

It means the prompt needs to be re-presented to outputs so Maymun can
grab it. Stage prompts in `/mnt/project/` are read-only; copy to outputs
before presenting.

---

## 9. Tooling & resources

- **Antigravity (AG):** agentic IDE — sole execution surface
- **TheBluePrint23:** Next.js 15 / React 19 / TypeScript / Tailwind on Vercel · `theblueprint23.dev`
- **v5 SSoT:** EAIP component depth source (EN-only) — `docs/architecture/ARDICTECH_Platform_v5_SSoT.html`
- **v6 SSoT:** bilingual canonical document — `docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html`
- **Supabase:** cloud-only · project ref `fenbwrawdyfnlnzotpvq` · used by D0.6 Phase 0 dashboard
- **LiteLLM:** LLM gateway foundation (ADR-001)
- **MCP:** external tool protocol (ADR-002)
- **Model stack:** Claude Opus 4.7 · Sonnet 4.6 (recommended default for stages with thinking) · Gemini 2.5/3.1 Pro (operator may select)
- **Node.js `vm`-module sandbox:** the established pattern for extracting from v5 JavaScript source (used in S2c, S2d.1, S2d.2, will be used in S2f)

---

## 10. Closing the loop on this session

- Cookbook is **feature-complete** for EAIP. Rev gets `phase` in S2f but no other cookbook depth (deferred).
- Migration is **complete** — TheBluePrint23 renders from SSoT, the drift defect is structurally eliminated.
- **S2f is the only outstanding prompt-author work in flight.**
- After S2f merges, the next session's likely shape: monitor for any
  cookbook polish requests; otherwise wait for Phase 1 kickoff (M1) when
  S2e becomes timely.

Resume in next session from §7.1 unless Maymun redirects.
