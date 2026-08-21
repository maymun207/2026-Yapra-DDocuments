# WAVE2 — Rules + Kinds unified "Governance" screen · Design v1

<!-- cwf-wave2-governance-unify-design-v1 · rev 1 · 2026-07-18 · Architect-authored, owner-approved.
     Born from the S51 Rules sub-walk. Owner decision: MERGE Rules + Kinds into ONE
     hierarchical screen (kind = collapsible header/shape, rule = instance under it). -->

**PLATINUM compliance:** client-only, data-derived (kind→rule hierarchy comes from
`kind_id`, not hardcode), backend-agnostic. No migration, no gate/authority change.
Self-configuring: a new backend's kinds+rules render in the same hierarchy with zero code.

## 0 · The one mental model this screen must teach

**Kind = the SHAPE (a template). Rule = an INSTANCE filling that shape. A kind has N
rules.** Collapse everything → you see a KINDS overview. Expand a kind → you see its
RULES. One hierarchy, two zoom levels — the structure IS the model.

## 1 · Why merge (owner-reached, Architect-endorsed)

Today Rules and Kinds are two screens showing two faces of ONE thing joined by
`kind_id`. Rules' section headers (`ARMES.TOOL_FORMAT_RULE`, `ARMES.TOOL_GRAPH_NODE`…)
ARE the kinds. Collapse Rules fully → the headers left = a Kinds list. The owner saw
this ("collapse edince Kinds listesi görürüm"). Merging:
- makes the "kind=shape, rule=instance, N instances" model the literal UI hierarchy;
- structurally kills "am I in Rules or Kinds?" (RS-8), not a bridge patch;
- solves the long flat list (RS-2): collapse → kinds, expand → rules.

## 2 · Verified foundations (the merge is safe)

- `KindsTab` already carries `onOpenRules(kindId)` — half the hierarchy is wired.
- **Permission split is clean and preserved:** editing a kind's SHAPE = `KIND_SOFT_EDIT`
  (checker-only); editing a rule INSTANCE = `RULE_DRAFT_CRUD` / `RULE_PUBLISH_GLOBAL`.
  Two affordances bind to two different caps even in one screen — no cap bleed.
- **CORE lock is structural:** CORE = code Zod schema, NO field edit; SOFT = editable
  field_spec. The unified "fields ▸" affordance is read-only on CORE, editable on SOFT.
- STAGES-FIX-4 arrival strips + kindFilter deep-link → become "open the relevant kind
  expanded" in the unified screen (compatible, not broken).

## 3 · The unified screen skeleton

- **Backend foregrounded (RS-4):** top, large — "🏭 Kale Seramik (ARMES) — the shapes
  and rules this backend gives the agent." Human one-liner, not "governed rule instances."
- **Kind header (collapsible):** `name · CORE/SOFT · N rules · [fields ▸] · [expand/collapse]`
  - `[fields ▸]` → the kind's SHAPE (field/type/required table). SOFT = "edit fields"
    (KIND_SOFT_EDIT), CORE = "structure locked" read-only.
  - `[expand]` → the kind's RULE instances (running/ready/draft/archived), each with a
    provenance badge (RS-5: seeded-from-code-floor / your-edit) + a payload editor
    (Edit → new version / Reset to code floor).
- **Collapse-all / expand-all (RS-2):** the two zoom levels in one control.
- **Actions at the right level:** "New SOFT kind" at the top (a new shape);
  "New draft / rule" inside an expanded kind (a new instance).
- **Views as lenses, explained (RS-3):** All / Ready to publish (N) / Staged drafts (N)
  / Audit trail — each with a one-line human "what it shows". Staged drafts = drafts for
  uncovered tools; Audit trail = publish history.
- **Dead surface toggle removed (RS-6):** the All/Rules (surface) segmented control
  renders only when BOTH parameter AND rule surfaces exist (`hasParameterSurface &&
  hasRuleSurface`). On ARMES (rule-only) it disappears — today it shows "All | Rules"
  that do the same thing.
- **Human labels, not jargon (RS-1/RS-9):** CORE/SOFT explained in-place ("shape locked"
  / "shape you can edit"); no raw "structure contract", "Zod", "field_spec",
  "interpreter-validated" in the primary view (naming law).
- **Consumption link (RS-7):** a rule shows "used at → Stage 06 (knowledge warm)".

## 4 · Naming (naming law — human image)

- Screen title candidate: "Governance / Yönetim" or "Rules & Shapes" — decide in phase.
- CORE → "shape locked", SOFT → "editable shape" (or similar human phrasing).
- Keep inner `?tab=` ids (`rules`, `kinds`) alive for deep-links even if the screens
  merge visually (a redirect/alias), so STAGES-FIX-4 + Kinds→Rules links never break.

## 5 · Scope honesty

This is NOT a hotfix — it merges RulesTab + KindsTab into one component with a
kind→rule hierarchy. Client-only, data-derived, no backend/gate/migration change.
It is the CENTREPIECE of the Wave-2 IA work. FULL ceremony (client `src/**`, mapped →
reseal). Unsharded CI arbiter (S37-2).

## 6 · Rules sub-walk findings ledger (RS-1 … RS-11)

- RS-1 header undefined → human "what is this / what do I do" + backend foreground.
- RS-2 long flat list → collapsible kind sections + expand/collapse-all.
- RS-3 views/filters meaningless → one-line explainer per view.
- RS-4 backend hidden → foreground the selected backend as the screen's frame.
- RS-5 payload provenance unclear → per-rule badge (code-floor seed vs your edit);
  the getDailyOeeValues/getFactoryLines text = a tool_format_rule authored in
  `referenceData.ts` (code floor), system-seeded, owner-editable — NOT MCP-sourced.
- RS-6 dead All/Rules toggle on ARMES → render only when both surfaces exist (bug).
- RS-7 Rules↔Kinds↔Stage06 links → show shape↔instance + used-at-Stage-06.
- RS-8 Kind→Rules transition unclear → structurally solved by the merge.
- RS-9 CORE/SOFT/Zod/field_spec jargon → human language.
- RS-10 Kinds screen = Rules' twin (same backend/collapse/view/jargon issues).
- **RS-11 (BACKBONE): merge Rules + Kinds into ONE hierarchical Governance screen** —
  kind = collapsible header (shape + N rules), rule = instance beneath. Collapse-all =
  Kinds overview. Absorbs RS-2/RS-8/RS-10 in one structural move.

<!-- END · cwf-wave2-governance-unify-design-v1 · rev 1 · 2026-07-18 -->
