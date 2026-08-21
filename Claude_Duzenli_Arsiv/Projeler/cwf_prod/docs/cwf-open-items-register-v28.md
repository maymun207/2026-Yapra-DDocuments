# CWF — Open Items Register · v28

<!-- v28 · 2026-07-09 · anchor = master HEAD `f77df8c` (1285 tests / 126 files / docVersion rev 53 / drift [OK]).
     Supersedes v27. Session 28 was a UX/THEME window: shipped C (User Docs reader), CHAT-UX-1 (chat
     theme system), ADMIN-THEME-1 (admin joins the global theme + legibility restore). Do NOT re-raise
     CLOSED items. -->

## Anchor
`origin/master` = `f77df8c` · 1285 tests / 126 files · docVersion rev 53 · drift [OK].
First-parent spine: `f77df8c` (ADMIN-THEME-1) → `8632eac` (CHAT-UX-1) → `77b3aa1` (C) → `5485a96` (session-27 base).

## CLOSED this window (Session 28) — do NOT re-raise
- **C — User Docs reader** (`77b3aa1`). md-native, GitHub-Docs-style reader at `/docs/:slug` (new tab),
  `src/docs/registry.ts` extensibility contract, `DocsReader.tsx` (react-markdown + remark-gfm +
  rehype-sanitize), nav item under DOCUMENTS, `window.open` (NOT a Tab-union member). Ships the standing
  **`cwf-governance-replay-explained-v1.md`** textbook verbatim (sha256 `a62763…240a`, byte-exact gate).
  1213/119 → 1221/121. RULE-25 reviewed + accepted.
- **CHAT-UX-1 — chat theme system** (`8632eac`). The chat shell got its OWN `.chat-theme` token set
  (Warm Dark default + `.light` Porcelain, oklch, 24/24 WCAG PASS), a persisted `uiStore.theme`
  (`dark|light|auto` → `localStorage['cwf.theme']`, the key DocsReader already read), a Sidebar toggle
  under language, migration of ChatShell/LoginPage/Sidebar/cwf-* off `text-white/N` literals onto tokens
  (incl. the Option-3-corrected retirement of the cold violet/cyan/`#8cc9ff` identity), a distinct error
  container (UX-04), MessageChart axis contrast (UX-05), and the `chatLegibility` CI gate. **THEME-1 is
  subsumed here** — do not schedule it separately. 1221/121 → 1250/125.
- **ADMIN-THEME-1 — admin joins the global theme + legibility restore** (`f77df8c`). `useAdminThemeClass()`
  routes every `.admin-theme` application point (AdminPanel roots + 4 portal primitives) through the
  SAME `cwf.theme`; the dormant `.admin-theme.dark` (34 tokens) activated with 2 measured fixes
  (`--destructive` 0.704→`0.55 0.20 25` for white-on-btn 5.15:1; `--border`/`--input` 12/15%→18/22%);
  the 61 RULE-16 `text-[10/11px]` violations (56 in ReplayTab) → `text-xs`; the `adminLegibility` CI
  gate; a `/dev/admin-preview` harness (fixed to wrap in `MemoryRouter`). 1250/125 → 1285/126.
- (Prior windows, still closed — do NOT re-raise: HARDEN-FN-PROBE-1 · ADR-005/006 · supabase-ro ·
  SEC-ADVISOR-1/2 · BUGFIX-AUDIT-1 · the WHOLE sandbox-vs-global RBAC line A/A2/A3 · B/REPLAY-QUOTA-1 ·
  the verifyGrants entry-guard fix.)

## Committed queue (in order)
1. **Scope/authority lens (Part A widen)** — third per-stage deterministic lens; grounded in
   `checkScopeDivergence`; version axis = `backendAuthority` from the trust registry; floor =
   conservative non-fabrication. **Design note first.** (The textbook explainer already describes this
   lens as the committed-next build — §3.3.)
2. **Endpoint switcher / "Sayfa 3"** — gated admin UI to point Langfuse (AWS ↔ local Docker ↔ other);
   inherits `mcp_secrets` for keys.
3. **GOVERN polish** (owner rough-spot list) · **P7** (Superset empty≠zero runtime validator, 3rd layer,
   no fragile regex).

## Owner-owned / awaiting owner
- **Aesthetic sign-off (open):** dark chat + dark admin palettes shipped and RULE-26-verified, but the
  owner has NOT yet signed off on accent tone / charcoal warmth. Any tweak is a cheap token-only
  follow-up in `.chat-theme`/`.admin-theme.dark` (`--*-accent`, surface temperature) — surface only if
  the owner asks.
- **ARMES token rotation** (surface only on a real 401): daily rotation of `supersettoken`/
  `armes-daily-token`.

## DEFERRED (do NOT build unprompted)
- **Multi-author CHANGELOG/KB gates** (ADR-006 follow-up): thin `GEMINI.md`/`.gemini` → `.agents/AGENTS.md`
  pointer + a "changelog-touched" CI check. Required BEFORE onboarding Gemini as a routine Developer.
- **CI-apply pipeline** (ADR-005 future): protected GH Actions `db push` on merge + CI token + post-apply
  verifyGrants/get_advisors gate.
- **Docs-platform migration (Docusaurus)** — build ONLY when a trigger fires: (1) docs become
  public-facing product documentation, (2) doc count exceeds ~20 or full-text search is a real need,
  (3) authors beyond the Architect need a docs-CMS workflow. Until then the in-app md-native reader
  (`.md` + registry row) is the house pattern; `.md` files port verbatim if we ever migrate.
- HARDEN-GRANTS-1 · AWS-DENY-1 · Multi-user Langfuse SSO · AWS README harden · novel-kind preview
  follow-up · provider config drafts beyond model selection · kind-draft versioning/history/sharing ·
  LM Studio + broader on-prem LLM families · the missing-interface governed connectors (Intent-LLM /
  LangGraph / Memory / Knowledgebase-RAG — each OPTIONAL/off-by-default/governed; own design note + phase).

## Tracked-small
**New this window:**
- DEV preview harnesses (`ChatPreview`/`AdminPreview`) MUST wrap router-context components in
  `MemoryRouter` — an un-wrapped harness blank-crashes (`Cannot destructure 'basename'`) and makes
  RULE-26 evidence impossible. The harness is itself a deliverable: "added" ≠ "renders."
- AG must ALWAYS push the feature branch when a phase completes (even if NOT merging) — unpushed work is
  unrecoverable + unreviewable, especially after a crash. (ADR-006 Developer-lane addendum.)
- Architect can now produce RULE-26 evidence for auth-gated DEV harnesses headlessly (system Chrome at
  `/opt/google/chrome/chrome` + playwright-core + `vite dev`) — no owner manual screenshots.
- `chatLegibility`/`adminLegibility` grep gates exclude `__tests__` (so a test naming the banned pattern
  doesn't self-trigger); tree-shake proof must target `dist/assets/*.js`, not `dist/` (CHANGELOG prose in
  `dist/architecture/` is a benign measurement artifact).

**Carried (still open):**
- B QuotaPanel 1280/1024 real-browser screenshot + owner smoke · A3 UI visual pass · flaky verifyGrants
  positive-control · grounding "clean" badge grey→green · novel-kind preview boundary · InlineHelp
  localStorage · routing preview · perturbation single-shot label · REPLAY-A1 edit-diff · replay_audit
  status-null · ToolFilter dedup · act() RTL · `.mcp.json` trailing newline (33f2b45, cosmetic) ·
  AGENTS.md/skill-KB note (plugin-override trap + ADR-005/006).

<!-- END · CWF-OPEN-ITEMS-REGISTER · v28 · 2026-07-09 -->
