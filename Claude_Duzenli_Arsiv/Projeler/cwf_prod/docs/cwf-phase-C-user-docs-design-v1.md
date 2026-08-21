# CWF — Phase C Design Note: User Docs Page · v1

<!-- v1 · 2026-07-07 · anchor = origin/master `84f4601` (RULE-25 fresh-clone verified: AdminPanel.tsx nav +
     the DOCUMENTS section + the architecture tab's iframe render pattern read directly; no markdown lib in
     package.json). Design only — NOT the AG prompt. Committed single path. -->

## 0. What C is
The DOCUMENTS section of the admin panel currently holds ONE tab — **Architecture** (`tab==='architecture'`),
which renders a self-contained static page via `<iframe src="/architecture/index.html">` (iframe isolation → no
`.admin-theme` token bleed). C adds a **second DOCUMENTS tab — User Docs / Kılavuzlar** — that hosts the
**standing governance-replay textbook explainer**, rendered the SAME way (a self-contained styled HTML page under
`public/docs/`, embedded via iframe). Panel-holders only (the tab shows to anyone who can open the panel).

## 1. The committed approach (and why — I'm choosing the house pattern, not inventing one)
**Mirror the Architecture tab exactly: a self-contained HTML doc served from `public/`, embedded via iframe.**
- **No markdown library.** `package.json` has none; RulesTab does not hand-render markdown. Adding `react-markdown`
  + a sanitizer + a KaTeX/table pipeline to render one long-form doc (with Wilson-CI math, tables, worked
  examples) is new dependency surface + XSS review for a doc we fully control. The architecture docs prove the
  house pattern: **author a rich self-contained HTML page, iframe it.** Consistent, isolated, zero new deps.
- **No backend, no DB, no migration, no new capability.** The doc is static educational content. It ships in the
  repo under `public/docs/`. Visibility = panel-holder (`show: true`, like `architecture`) — it is not sensitive
  (it teaches the deterministic, token-free lenses; contains no cross-user data, no secret, no C9 payload).
- **Source of truth vs rendered form.** The **`cwf-governance-replay-explained-v1.md`** markdown is the canonical
  textbook (the owner-flagged CRITICAL deliverable, portable/reviewable). The app ships a faithful **rendered
  `governance-replay-explained.html`** under `public/docs/`. I (Architect) produce BOTH — exactly as I produce
  the architecture `.html` maps — so **AG's job is wiring only** (add the file + the nav tab + the iframe), never
  authoring the textbook content.

## 2. Structure (extensible from day one)
- `public/docs/index.html` — a small self-contained **docs hub**: a left rail listing the available docs + the
  selected doc rendered in the main pane (or, for v1's single doc, it simply renders the explainer with a title
  header and a "more docs coming" affordance). Same visual language + fonts as the architecture pages so the two
  DOCUMENTS tabs feel of a piece. RULE 26: no clip at 1280/1024; readable long-form column.
- `public/docs/governance-replay-explained.html` — the rendered explainer (the hub links/embeds it). For v1 the
  hub can inline it directly; keep the index hub so doc #2 (e.g. a future "How quotas work" or the scope/authority
  lens explainer) slots in without touching AdminPanel.
- The hub is **self-contained** (inline CSS, no external fetch, no localStorage) — same constraints as the
  architecture pages.

## 3. The one AdminPanel change (minimal, mirrors architecture)
In `src/components/admin/AdminPanel.tsx`:
- Add to `nav`: `{ id: 'docs', section: 'documents', label: t('Kılavuzlar', 'User Docs'), icon: BookOpen, show: true }`
  (a `lucide-react` `BookOpen`/`GraduationCap` icon), placed right after the `architecture` entry so DOCUMENTS
  reads Architecture → User Docs.
- Add `'docs'` to the `Tab` union; add the render line mirroring architecture:
  `{active?.show && tab === 'docs' && (<iframe src="/docs/index.html" title={t('Kılavuzlar','User Docs')} className="w-full h-full border-0 rounded-md bg-background" />)}`.
- Update the nav-order test (`oa10UiHome.test.tsx`) for the new DOCUMENTS tab.
That is the entire code delta: a nav row + a Tab-union member + an iframe line + the test. No store, no service, no
endpoint, no permission, no migration.

## 4. Scope / frozen / seal
- **Frozen safety artifacts** (evalGate, groundingCheck, trustRegistry, prompt/core, resolveAuthHeader,
  mcpSecrets, chat.ts) — untouched (C is docs + one nav tab).
- **No permission-matrix change** ⇒ **no governance-model diagram redraw**. The nav IA gains a docs tab under the
  existing DOCUMENTS section; if a mapped diagram/tab depicts the nav, it's a reseal-not-redraw (drift gate will
  say). Expect docVersion bump only if a mapped area moved; likely a CHANGELOG entry + (if the nav is depicted) a
  small reseal. The AG prompt will gate on `check:doc-drift` and instruct reseal-only if it flags.
- **No migration** ⇒ no Operator lane, no verifyGrants. Two-lane phase (Architect authors content + prompt → AG
  wires). Clean.
- RULE 26 (1280/1024) applies to the hub HTML.

## 5. The textbook content (the standing deliverable — I author it next)
`cwf-governance-replay-explained-v1.md` must contain, in plain-engineering AND AI terms:
- **What a lens is** — a deterministic, no-LLM, read-only re-run of ONE governance gate against a recorded turn
  at a chosen rule-version (a counterfactual: "what would this gate have decided under rule vN?"). Pure GET,
  un-audited, reuses the production core so the floor never drifts.
- **Why it matters** — token-free governance regression testing: proves which past decisions a rule change flips,
  with zero model spend.
- **The three lenses as three data-agent failure modes** — grounding (empty ≠ zero: an empty backend answer is
  not "truthfully zero"); routing (the right tools were offered / the ALWAYS_INCLUDE floor held); scope/authority
  (data attributed to the correct backend / only authoritative sources spoke). Grounded in **ADR-001**: make a
  lying/wrong backend HARMLESS, not honest.
- **Mandatory worked example** — the real **2026-07-06 Part A A/B at reps=3**: both arms empty_rate=0, Wilson CI
  [0, 0.561] fully overlapping, `distinguishable=false`. Teach the reps=1 (illustrative, not evidence) → reps=3
  (underpowered, CI overlaps) → reps=20+ (CI tightens, arms can separate) progression. Core lesson:
  **`distinguishable=false` ≠ "no effect" — it means UNDERPOWERED**; Wilson-CI honesty = refusing a confident
  claim at low power (suppress, don't manufacture). And what the lens measures vs not: in that run the perturbed
  arm SHORTENED the reply (365 → 30 tokens) but did NOT empty it — the lens measures **absence/emptiness, not
  answer quality/length.**

## 6. Open decision (single, low-stakes)
Tab label: **"Kılavuzlar / User Docs"** (my pick) vs "Belgeler/Docs" (but the SECTION is already BELGELER/
DOCUMENTS, so a "Docs" tab inside a "DOCUMENTS" section is redundant). I'm committing to **User Docs / Kılavuzlar**
unless you prefer otherwise.

## 7. Deliverable order (on your approval)
1. `cwf-governance-replay-explained-v1.md` (the textbook — standing deliverable).
2. `governance-replay-explained.html` + `docs/index.html` hub (the rendered app doc, self-contained, RULE-26).
3. ONE gated AG phase prompt: drop the two public/docs files + the AdminPanel nav tab + iframe + the nav-order
   test; frozen sweep; drift `[OK]`; RULE-26 1280/1024 screenshot pair of the new tab.

<!-- END · cwf-phase-C-user-docs-design-v1 · v1 · 2026-07-07 · anchor 84f4601 -->
