# CWF — StagesDashboard v1 Review Findings · v1

<!-- cwf-stages-v1-review-findings-v1 · rev 1 · 2026-07-11 · S37 live walkthrough of the
     merged StagesDashboard (floor b8db75e). Owner + Architect walked stages 00→02 on the
     live prod panel; the findings below already generalize to 03→14 (same shell, same
     tone, same deep-link model), so per owner decision we STOP the walkthrough here, ship
     the fixes, then re-walk 03+ on the fixed ground (mini-iteration / Scrum). This ledger
     is the input to the fix work. Root-causes marked [VERIFIED @b8db75e] were confirmed by
     Architect fresh-clone code-read this session. -->

## 0 · SYSTEMIC DIAGNOSIS (the through-line — owner-identified)

StagesDashboard promised a *teacher that goes from the big picture down to detail*. What it
shipped is a *map that opens gates but never says what to do behind the gate*. Owner's words:
"beni bir yere getiriyor; getirdiğim yerde ne yapacağım, neyi bekleyeceğim — o bilgi yok."

Two roots, one theme — **the content is written in AI-voice, and deep-links land the user
in a target with no lesson and no next-step:**
1. **Voice.** The registry prose (esp. the "… daha fazla" blocks) reads as a reminder to
   someone who already knows the system (RULE 28, "one turn id", "OTel trace id is SSOT"),
   not an explanation to a NEW developer. It never answers "what IS this thing, why does it
   exist, when would *I* touch it." Canonical failure: nowhere does the page say **what a
   "lab mode flag" actually is.**
2. **Landing without a lesson.** A deep-link chip drops the user into Rules / Replay / Users
   with zero "you came here to do X; step 1 is…". The target panels' OWN copy is AI-voice too
   (Replay's Part-A perturbation panel: owner couldn't tell why they'd run it, what nudge/temp/
   reps do, or how to act on Original-A vs Replayed-B).

**Design correction (owner's own, adopted):** deep "why/how" belongs in **User Docs** (the
sidebar tab already exists). Cards + panels stay short and action-oriented and **deep-link
into the matching User Docs section.** This resolves voice + next-step + single-source in one.

## 1 · FIX STRATEGY — TWO WAVES (both start today; owner-approved)

- **WAVE 1 · MECHANICAL (ship today, one gated bug-fix phase).** Independent of stages 03+,
  so the owner re-walks 03+ on this fixed ground. Items: F4, F5, F10, F6, F12, F1, F2, F9.
- **WAVE 2 · CONTENT + USER-DOCS BRIDGE (starts after the 03+ re-walk).** Items: F13, F14,
  F15, F16, F19 + the panel-copy explainers (F7 template, F8 schema-visibility, F17 `system`,
  F18 cross-panel action). This is a WRITING job, not engineering — writing half now and half
  after the re-walk would just repeat the F13 mistake, so it is authored once, in one voice,
  after all 14 stages' tone problems are collected. NOT a demo-deferral — correct sequencing.

## 2 · FINDINGS

Legend — **Axis:** A = this phase's own surface (StagesTab/registry/links/chips) · B = an
existing target tab UI-STAGES-1 didn't touch · C = registry CONTENT (data, not code) ·
shell = admin-wide layout/nav. **Sev:** blocker / major / minor / nit.

### Shell (blocker — one root, all screens)
- **F4 · Panel can't scroll / inner-scroll trap · blocker · shell.** Upper info card stays
  pinned, the list is trapped in its own box, the page won't scroll, you can't reach other
  surfaces. [VERIFIED @b8db75e] Root: `AdminPanel.tsx:258` `<main … min-h-0 overflow-hidden p-6>`
  — the `overflow-hidden` on the main content region traps every panel. Fix: allow the main
  region to scroll (audit each tab that assumed the old trap).
- **F5 / F11 · Browser "back" returns to chat, not to Stages · blocker · shell.** After a
  deep-link jump, browser back lands on "Chat With Your Factory", losing the Stages scroll
  position. Confirmed on Quota, Rules, Users, Replay — every tab. [VERIFIED @b8db75e] Root:
  `AdminPanel.tsx:89` `navigateToTab` uses `window.history.replaceState` (should `pushState`
  so back returns to the prior tab); also the sidebar nav (`setTab`, line 186) doesn't update
  the URL at all. Fix: pushState on deep-link nav; consider a context "← back to Stages"
  affordance (owner open to a UX recommendation — top "back" button vs breadcrumb).

### Langfuse (major)
- **F10 · Stage Langfuse chip lands on the generic, unfiltered trace list · major · A.**
  `telemetry-init` and `lab-overlay` chips both open the same generic Langfuse Tracing list
  — no per-span filter, "meant nothing". [VERIFIED — docs] The Filter Search Bar that
  serializes a `name:*span*` filter into a shareable URL runs on the Langfuse **v4** data
  model and is **Cloud-only**; self-hosted (this deploy = **v3.205 OSS**) has no such stable
  filter-URL yet. So AG's `/traces` fallback was technically correct but is a dead promise in
  practice. Fix options (decide in phase): (a) make the chip copy the span name to clipboard
  + a one-line "paste into Langfuse's filter bar (self-hosted has no filter-URL yet)"; (b)
  keep the link but relabel it honestly as "open Langfuse (filter by `<span>` manually)";
  (c) drop the chip's link affordance, keep the span name as a labeled reference. Owner's UX
  question — "did it go generic because I picked no trace/session first?" — answer: a stage
  map has no specific trace; the chip must be span-level/trace-agnostic or not a link. Do NOT
  bolt a "pick a user/session first" flow onto Stages (that's Inspect's job).

### Code link (decision — major)
- **F9 · ‹/› GitHub code link: private-repo + control-boundary concern · major · A.**
  Owner: when the repo goes private, will the blob link even render? And is it dangerous —
  can a user edit the code from there? Answers: private repo → the blob 404s for a
  non-authorized GitHub viewer (no leak, but the link dies for panel users who aren't GitHub
  members); editing requires repo WRITE on GitHub (the panel link grants nobody write). BUT
  the deeper instinct is right: code leaving the control plane out to GitHub is a boundary
  jump. Fix (decide in phase): an **in-panel read-only code viewer** — fetch the file at the
  deployed SHA and show it in a modal (the repo already uses `<pre>`-based viewers in
  Kinds/Inspect/etc.), never leaving the panel; OR a governed toggle "code links on/off"
  with auto in-panel mode when the repo is private. Recommend the in-panel viewer.

### Target-panel bugs (existing tabs — axis B)
- **F1 · Replay-Quota "User" column is an opaque UUID · major · B.** Header just "User",
  cell is a raw UUID; clicking shows a tooltip of the same UUID — no name/email, no action.
  [VERIFIED @b8db75e] Root: `QuotaPanel.tsx:244` renders only `r.userId`. Fix: join
  email/display-name (fallback UUID); the Users panel already has emails.
- **F2 · A permanent blank-User row (row ~4) with live values · major · B.** A ledger row
  with empty userId but non-zero usage (11.2K). empty≠zero relevance: value present, identity
  "missing". [Root likely] an orphan `user_quotas` row for a deleted `auth.user`, rendered
  unfiltered. Fix: label such rows "(deleted/orphan user)" or filter, and surface honestly.
- **F3 · Quota usage chart is crude/unlabeled · minor · B.** Bare bars, no axes; only a hover
  tooltip. Improvement, not a blocker.
- **F7 · Rules "New draft" Payload is empty, no template · major · B.** Kind selected but
  Payload (JSON) stays `{ }`; user doesn't know what to type. [VERIFIED @b8db75e] Root:
  `RulesTab.tsx:69` seeds `'{\n  \n}'`. **Cheap fix available:** the client ALREADY has each
  kind's `field_spec` (`RuleKind.field_spec`, shown in KindsTab) — derive a skeleton JSON
  template from `field_spec` when a kind is chosen. No new endpoint.
- **F8 · Rules: selecting a Kind shows no schema / no current payload · major · B.** Owner
  couldn't see what the selected kind contains. [VERIFIED @b8db75e] Same lever as F7:
  `field_spec` + `code_schema_ref` are on the client; render the schema (fields/types/
  required) read-only on kind-select, and/or the current published payload for that (kind,key).
- **F17 · `system` scope/backend is unexplained · major · B (content).** Users→Scopes shows
  `armes · superset · system`; owner: "system is new, no idea what it is." [VERIFIED @b8db75e]
  `system` = the L1 param lane's backend id (`SYSTEM_BACKEND_ID='system'`, agentParams.ts) —
  NOT a data source like ARMES/Superset but the home of the agent's own governed params.
  Needs an explainer in the Users panel and in stages 02/10.
- **F18 · Users "…" actions lack "set this user's quota" · improvement · B.** Actions menu has
  reset-email / temp-password / edit / disable / demote / delete but no quota jump. Owner: a
  one-place cross-action to that user's quota screen would be "cute". Cross-panel action;
  kin to F1/F2 (weak user-identity bridge between Users and Quota).

### Content / voice (systemic — WAVE 2, axis C / A)
- **F13 · Registry prose is AI-voice, not human onboarding · major · C.** THE core problem.
  Rewrite every stage's purpose/tweak/deep/try in a real onboarding voice: **what is this
  (definition) → why it exists → when/how YOU touch it.** Currently answers "what it does"
  but never "what it IS" (the lab-mode-flag gap).
- **F14 · Deep-link never says what to DO at the target · major · A/C.** NavChip jumps to
  Tweak but doesn't say "in Tweak, toggle flag X like so". Every deep-link needs a
  "what you'll do there" micro-instruction (tooltip or inline).
- **F15 · Target panels' OWN copy is AI-voice too — esp. Replay · major · B (content).**
  Replay Part-A: owner couldn't tell why to run it, what nudge/temp/reps/baseline mean, what
  Original-A vs Replayed-B tells them, or how to act on the result to evolve the product.
  Tooltips exist but are also AI-voice. So WAVE 2 covers panel copy, not just the registry.
- **F16 · Missing User-Docs bridge (owner's solution) · major · A/architecture.** Deep "why/
  how" belongs in User Docs; every card/panel should deep-link to the matching User-Docs
  section. Adopt as the WAVE-2 architecture.
- **F19 · No "why am I here" context on arrival at a deep-linked panel · major · A.** The
  target panel doesn't greet the arriving user with context + first step. Resolved together
  with F14/F16.

### Nits (axis A)
- **F6 · `📡` (live source glyph) is missing from the legend · nit · A.** Legend explains
  🗄️ 🧱 🔬 ✍️ ◔ but not 📡 (used on stage 11 "canlı backend sonuçları"). [VERIFIED @b8db75e]
  `KIND_GLYPH.live = '📡'` but no legend entry. Add it.
- **F12 · NavChip color (violet vs primary) is unexplained · minor · A.** Session sources get
  a violet chip; owner asked what the color difference means. Explain in the legend (color
  key) or via tooltip.

## 3 · ROOT-CAUSE FILE MAP (for the fix phase)

| Finding | File · anchor | Nature |
|---|---|---|
| F4 | `src/components/admin/AdminPanel.tsx:258` `<main … overflow-hidden>` | shell 1-liner |
| F5 | `src/components/admin/AdminPanel.tsx:89` `replaceState`→`pushState`; sidebar `setTab` (186) no URL | shell nav |
| F1/F2 | `src/components/admin/QuotaPanel.tsx:244` renders `r.userId` only | join + orphan handling |
| F7/F8 | `src/components/admin/RulesTab.tsx:69`; client has `RuleKind.field_spec` + `code_schema_ref` | derive template + show schema, no new API |
| F9 | new in-panel viewer (reuse `<pre>` pattern); `stagesLinks.buildCodeLink` | viewer or governed toggle |
| F10 | `src/components/admin/stagesLinks.ts buildSpanLink`; Langfuse v3.205 OSS = no filter-URL | relabel/clipboard/reference |
| F6/F12 | `StagesTab.tsx` legend array | add glyph + color key |
| F13–F19 | `stagesRegistry.ts` content + target-panel copy + User Docs | WAVE 2 writing |

<!-- END · cwf-stages-v1-review-findings-v1 · rev 1 · 2026-07-11 -->
