# PHASE · GOV-UNIFY-1 — merge Rules + Kinds into one hierarchical Governance screen

<!-- claude-code-PHASE-GOV-UNIFY-1-v1 · rev 1 · 2026-07-18 · Architect-authored, owner-approved.
     Relay to AG (Author lane) verbatim. Wave-2 IA redesign 1a. Design note:
     cwf-wave2-governance-unify-design-v1_2? see cwf-wave2-governance-unify-design-v1. -->

**PLATINUM compliance:** client-only, DATA-DERIVED (the kind→rule hierarchy comes from
`kind_id`, never hardcode), backend-agnostic (a new backend's kinds+rules render in the
same hierarchy with ZERO code). No migration, no gate/authority change. Self-configuring.

**Naming law (standing):** every USER-VISIBLE label chosen for the image it forms in a
HUMAN's head — not what an AI parses. Test each label against "what does a person picture?"

**PRECONDITION (S47-1):** valid ONLY while `origin/master == d83059a` (Merge STAGES-FIX-4).
On mismatch: STOP and report actual `git rev-parse origin/master`.

## 0 · The one model this screen must teach
**Kind = the SHAPE (a template). Rule = an INSTANCE filling that shape. A kind has N
rules.** Collapse everything → a Kinds overview. Expand a kind → its rules. The hierarchy
IS the model.

## 1 · Scope
Merge `RulesTab.tsx` + `KindsTab.tsx` into ONE hierarchical "Governance" component. Both
`?tab=rules` and `?tab=kinds` render it (keep BOTH ids alive — deep-link safety). Entry
sets the default zoom: `?tab=kinds` opens COLLAPSED (shapes overview); `?tab=rules` opens
with rules visible. STAGES-FIX-4's kindFilter/arrivalFrom + Kinds' `onOpenRules(kindId)`
become "open that kind EXPANDED with the arrival strip."

## 2 · Gated sub-phases

### G1 — the unified hierarchy
- Kind header (collapsible): `name · [CORE/SOFT badge] · N rules · [fields ▸] · [chevron]`.
  Human framing for CORE/SOFT: CORE = "shape locked" (code Zod schema, fields read-only);
  SOFT = "editable shape" (field_spec). NO raw "structure contract"/Zod/field_spec/
  interpreter-validated in the header.
- Expand a kind → its RULE instances (the current Rules list rows: running vN / ready /
  draft / archived), each opening the existing payload editor (Edit → new version / Reset
  to code floor).
- **Collapse-all / Expand-all** control (RS-2). Collapse-all = the Kinds overview.
- Backend foreground (RS-4): top, large — "🏭 {backend} — the shapes & rules this backend
  gives the agent" + one human line. Not "governed rule instances".

### G2 — the shape affordance ([fields ▸])
- `[fields ▸]` on a kind header opens that kind's SHAPE (the field/type/required table
  from today's KindsTab). SOFT → "edit fields" (cap `KIND_SOFT_EDIT`); CORE → read-only
  "structure locked". Preserve the existing edit-fields + reset-to-reference behavior and
  their caps — no cap bleed (shape edit = KIND_SOFT_EDIT; instance edit =
  RULE_DRAFT_CRUD / RULE_PUBLISH_GLOBAL).

### G3 — legibility layer (inherited by 1b/1c later)
- **Provenance badge per rule (RS-5):** "seeded from code floor" vs "your edit" (derive
  from the existing reset-to-code-floor / version state — no new endpoint).
- **Views explained (RS-3):** All rules / Ready to publish (N) / Staged drafts (N) /
  Audit trail — one human line each (Staged drafts = drafts for uncovered tools; Audit
  trail = publish history). The `eval-gate governed` badge = informational tooltip
  ("every publish passes the gate"), not a toggle.
- **Consumption link (RS-7):** a rule shows "used at → Stage 06 (knowledge warm)".
- **Human labels (RS-1/RS-9):** no kind_id jargon in a user-facing render (kill "(agent.
  param)"-style leaks); the screen title + intro are human.

### G4 — surface-toggle bug + deep-link compatibility
- **RS-6 bug fix:** the All/Rules (surface) segmented control renders ONLY when BOTH
  `hasParameterSurface && hasRuleSurface`. On a rule-only backend (ARMES) it disappears
  (today it shows "All | Rules" doing the same thing).
- Deep-link compatibility: STAGES-FIX-4 kindFilter/ruleKey/ruleKeyPrefix + arrivalFrom
  ('stages') and Kinds→Rules onOpenRules must open the target kind EXPANDED with the
  arrival strip. Prove the existing arrival-strip tests still pass.

### G5 — tests
- Data-derived: a synthetic new backend's kinds+rules render in the hierarchy with ZERO
  code referencing its ids.
- CORE vs SOFT: CORE kind's [fields ▸] is read-only; SOFT's is editable (cap-gated).
- RS-6: rule-only backend renders no surface toggle; a two-surface (system) lane renders it.
- Deep-link: a stages→rules kindFilter opens the kind expanded + arrival strip (existing
  suite green).
- No user-facing kind_id jargon string in the primary render.

## 3 · Ceremony (FULL)
Fresh clone; unsharded CI on the PR head is the SOLE test arbiter (S37-2). Mapped `src/**`
→ reseal (bump docVersion, "below diagram altitude, reseal not redraw", `npm run reseal`,
`check:doc-drift` green — verify with `CI=1 npm run check:doc-drift`). Push branch → CI →
Architect FAST-GATE review → merge `--no-ff` on GREEN CI only → report remote HEAD hash.
No migration. This is a large IA rebuild — gate the sub-phases, single PR.

## 4 · What this is NOT
- Not a Tool Matching change (that's 1b, next).
- Not a Data Authority change (1c).
- Not a migration / gate / authority change — client IA only.
- Not backend-name-keyed — data-derived from kind_id (PLATINUM).

<!-- END · claude-code-PHASE-GOV-UNIFY-1-v1 · rev 1 · 2026-07-18 -->
