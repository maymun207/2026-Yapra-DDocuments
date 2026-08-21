# CWF Wave-2 Sub-walk Findings (Rules · Tool Matching · Data Authority) · v1

<!-- cwf-subwalk-findings-v1 · rev 1 · 2026-07-18 · S51 sub-walks after the main Stages
     re-walk. Feeds three sequential Wave-2 IA redesigns (1a/1b/1c). Anchor d83059a. -->

## 0 · Headline
Four governance pages (Rules, Kinds, Tool Matching, Data Authority) do very
important work but their FACE never explains it. Same illnesses everywhere:
backend hidden, jargon, no explanation, context-free deep-links, non-responsive.
Owner reached three STRUCTURAL redesigns; the rest is a shared legibility layer.

## 1 · Common themes (apply to all four pages)
- **Backend foreground** — the selected backend (e.g. "Kale Seramik / ARMES") is the
  frame of each page, not a corner selector.
- **Jargon → human (naming law)** — every visible label chosen for the image it forms
  in a HUMAN's head; no raw CORE/SOFT/Zod/field_spec/system_of_record/gateway/drift/
  epoch in the primary view without human framing.
- **Provenance badges** — every seeded artifact shows origin (code-floor seed vs your
  edit). The payloads/categories/keywords are authored in the code reference
  (`referenceData.ts` / `toolCategories.ts`), system-seeded, owner-editable — NOT
  MCP-sourced.
- **F42 arrival strips everywhere** — every deep-link lands with "you came from X —
  do Y here" (the pattern the owner loved in Replay).
- **Responsive layout** — pages must not require zoom-out to see (Tool Matching's 4
  panels were invisible at normal zoom).
- **F-DOCS-ENRICH evidence** — every "Read the doc" is a one-paragraph blurb; the deep
  "why" belongs in enriched User Docs (final combined docs+arch pass).

## 2 · Rules + Kinds → REDESIGN 1a (Governance-unified)
- RS-1 header undefined → human "what is this / what do I do" + backend foreground.
- RS-2 long flat list → collapsible kind sections + expand/collapse-all.
- RS-3 views/filters meaningless (All rules / Ready to publish / Staged drafts / Audit
  trail / eval-gate-governed badge) → one-line explainer each.
- RS-4 backend hidden → foreground the selected backend.
- RS-5 payload provenance unclear → per-rule badge (code-floor seed vs edit); the
  getDailyOeeValues/getFactoryLines text = a tool_format_rule authored in code floor.
- RS-6 dead All/Rules (surface) toggle on ARMES → **bug: render only when BOTH
  parameter AND rule surfaces exist** (`hasParameterSurface && hasRuleSurface`).
- RS-7 Rules↔Kinds↔Stage06 → show shape↔instance + used-at-Stage-06 (knowledge warm).
- RS-8 Kind→Rules transition unclear → structurally solved by the merge.
- RS-9 CORE/SOFT/Zod/field_spec jargon → human language.
- RS-10 Kinds screen = Rules' twin (same backend/collapse/view/jargon issues).
- **RS-11 (BACKBONE): merge Rules + Kinds into ONE hierarchical Governance screen** —
  kind = collapsible header (shape + N rules), rule = instance beneath; collapse-all =
  Kinds overview. Kind = SHAPE, Rule = INSTANCE, a kind has N rules.

## 3 · Tool Matching → REDESIGN 1b (routing-flow)
- TM-1 (CRITICAL) 4-panel layout not responsive; invisible at normal zoom (owner had
  to drop to ~50%). Before everything.
- TM-2 proposal-row category dropdown loses row context (which keyword's dropdown?).
- TM-3 category-add discoverability: adding a 13th CATEGORY happens in Rules
  (armes.tool_category), NOT here; adding a keyword MAPPING happens here (My Draft) —
  the two are not disambiguated.
- TM-4 the 4 panels + proposals unexplained (floor / learned / draft / preview / proposed).
- TM-5 categories = armes.tool_category rules → belong in the unified Governance screen;
  Tool Matching = learned-map + proposal curation. Bridge, don't duplicate.
- TM-6 "12 vs 338" clarity: 12 = CATEGORIES (buckets, extensible via Rules); 338 =
  keyword MAPPINGS (learned, grows). Adding a keyword does NOT make categories 13.
- TM-7 4-panels-at-once → **mode-based progressive redesign** (browse / test / add /
  process-proposals as modes, not a 4-panel wall). Absorbs TM-1.
- TM-8 the 6-step routing FLOW is never taught (route → learn → propose → curate →
  publish) nor the floor/live/preview probe lenses. Panels verified:
  - Reference (code floor) = immutable 12 categories + seed keywords + tools.
  - Live (learned map) = 338 keyword→category rows, system-learned, a LAYER on floor
    (runtime = floor ∪ live).
  - My Draft (personal overlay) = your private set/remove; never touches live until
    "Publish my drafts" (super sign-off + gate) → then enters live as a pinned row.
  - Preview (probe bench) = route a message via routeKeywordLayer (deterministic, no
    LLM, no writes) under floor / live / preview lens. preview = live ∪ your drafts.
  - Proposals = the semantic router surfaces an unplaceable keyword; it does NOT
    auto-insert — you Accept (→ live via gate) or Reject.

## 4 · Data Authority → REDESIGN 1c
- DA-1 (F-S12-a, HIGH) panel doesn't explain what it does — ADR-001, the 3 tiers
  (system_of_record / reporting_mirror / unverified), "unverified is never
  authoritative", "a grant silences the scope detector (maps never unioned)". Verified
  in backendTrust.ts / runScopeCheck / trustRegistry.
- DA-2 (owner's #1) Scope-lens → Replay transition is context-free ("came from ARMES,
  what do I do, the specimen list has none of those words"). Needs the F42 arrival
  strip + "pick a specimen to test this backend's scope" guidance.
- DA-3 many-metrics chip-list overflow ("how will it look if more come").
- DA-4 jargon (system_of_record / reporting_mirror / unverified / flat / gateway /
  drift) → human; backend foreground.
- DA-5 the three actions (grant/revoke/reset) + audit vs scope-lens icons unexplained.
- DA-6 "Read the doc" blurb → F-DOCS-ENRICH evidence.

## 5 · The three redesigns (sequential, owner-approved)
1. **1a · Governance-unified** (Rules + Kinds, RS-11) — first; establishes the shared
   layer (backend-foreground / jargon / F42 / provenance) the others inherit.
2. **1b · Tool-Matching routing-flow** (TM-7/TM-8) — mode-based, responsive, teaches
   the 6-step flow + lenses.
3. **1c · Data-Authority** (DA-1/DA-2) — explain-what-it-does + Scope-lens context.
Plus the shared layer + RS-6 surface-toggle bug across all.

<!-- END · cwf-subwalk-findings-v1 · rev 1 · 2026-07-18 -->
