# PHASE DATA-AUTHORITY-1 — tier legibility + F38 completion + the two live bridges

<!-- claude-code-PHASE-DATA-AUTHORITY-1-v1 · rev 1 · 2026-07-20 · Architect: Claude (S54)
     Contract: cwf-data-authority-ia-design-v1_2 (owner-GO'd by relay) + LANE
     A's own five critique findings (all folded there). LANE A builds (critique
     author = builder). THIS file is the ONE relay payload (S54-3). -->

## 0 · PRECONDITION (S47-1, parallel-lane form)
Branch `data-authority-1` from **current `origin/master`** (at authoring
`eddf83e`; paste your rev-parse). **Pre-cleared mid-flight advance:** LANE B's
TOOLMATCH-IA-1 will land while you work (RoutingTab, `api/admin/**`,
`chat.ts`, `stageTools`, `toolCategories`, the rule26 routing block). The ONLY
plausible shared file is `AdminPanel.tsx` (both phases may add a nav-callback
prop) — on TOOLMATCH's merge: rebase, resolve the trivial prop-append seam,
paste name-only + `git range-diff` proofs, and if any doc-mapped file ended up
touched, reseal to the next free rev; otherwise state "no reseal — drift
[OK]". STOP only on a non-trivial conflict.

## 1 · Scope & laws
CLIENT-ONLY. Untouched, with name-only proof at the end: `api/**` (zero api
changes), `supabase/**`, `shared/**`, grounding/trust runtime,
`GroundingViolation` type & telemetry emit (F147 is a SEPARATE register item —
do not ship it here), PanelPrimer, tab ids, the shipped flat-Events catch
sentence (VERBATIM), `e2e/**` (zero RULE-26 impact — critique-verified).
Profile FULL-lite: multi-file client + test extensions; **unsharded CI = sole
arbiter**.

## 2 · Work items

**W1 · Tier legibility (BackendTrustPanel.tsx):**
- NEW additive hero directly under the existing PanelPrimer: the three tier
  sentences, bilingual, each with a "… daha fazla" expandable (Wave-2 voice):
  `system_of_record` — "Sözü senettir." / "Its word is the record." (asıl
  kaynak; rakamları doğrudan cevaba girer) · `reporting_mirror` — "Aynadır." /
  "It is a mirror." (yansıtır, hüküm vermez; çelişkide asıl kaynak kazanır) ·
  `unverified` — "Söyler ama otorite tanınmaz." / "It speaks without
  authority." (gösterilebilir, tek başına gerçek sayılmaz; 12. aşama —
  grounding — bu sınırı savunur).
- Define the six sentences ONCE (a small exported const in the component
  module); the hero renders them, and the row `<Badge>{b.tier}</Badge>` gains
  a tier-colored variant whose click/hover popover renders THE SAME const —
  one copy source, zero second wording.
- The flat table structure and `trust-row-{id}` / audit-drawer testids stay
  BYTE-STRUCTURALLY intact (additive-safe per your own critique flag);
  existing `backendTrustPanel.test.tsx` must pass with at most additive
  assertions.

**W2 · F38 completion (InspectTab.tsx + StageContextSection.tsx):**
- Flat Events list (~:400): NO text change — the shipped bilingual sentence is
  kept verbatim; `InspectTab.test.tsx:84-113` passes UNMODIFIED.
- Tier-2 turn-card badge (~:556): "Yakalandı / Caught" gains one short clause:
  "— cevabınız korundu" / "— your answer stayed correct". Testid stable;
  `inspectTabTiers.test.tsx` EXTENDED (not rewritten).
- Tier-3 stage-labelled line (~:596): the same short clause added beside the
  bare icon.
- Stage-12 card (StageContextSection ~:287-309): copy already framed; gains
  the §W3 bridge only.
- ALL catch copy stays SOURCE-AGNOSTIC ("bir kaynak / a source") — naming a
  backend requires F147, not this phase.

**W3 · The two live bridges + landing strip (the structural work):**
- `AdminPanel.tsx`: wire a `onOpenTrust(context)` callback (the EXACT
  pushTo/makeNavEntry/captureScrollY pattern of the existing trust→replay
  jump) into BOTH `<InspectTab …>` and the Stages board component.
- InspectTab: render the bridge beside the EXISTING `DocLink
  slug="veri-otoritesi"` on catch sites (both kept — concept doc vs live
  state). Stages-12 card: same bridge.
- BackendTrustPanel: its FIRST inbound nav-context read → the F42-pattern
  arrival strip, one variant per origin ("Inspect'teki yakalamadan geldiniz —
  ilgili kaynağın katmanı aşağıda." / "12. aşama kartından geldiniz — katman
  savunmasının canlı durumu aşağıda."), bilingual, dismissed on navigate-away
  per NAV-STACK norms.

**W4 · Tests:** backendTrustPanel additive (hero renders; popover = same
const; rows/drawer pins untouched) · InspectTab.test UNMODIFIED-passing +
new clause assertions in inspectTabTiers · oa10UiHome extend (non-destructive
class pin stays) · bridge tests: both origins push the nav entry with
context; landing strip renders per-origin variant and dismisses. NO e2e
changes.

## 3 · Gated steps
G0: rev-parse · S32-1 script greps · paste anchors (PanelPrimer block, badge
render line, the three catch sites with line numbers, trust→replay pushTo
site in AdminPanel, listBackendTrust consumer) · naming-collision grep
`onOpenTrust|TIER_SENTENCES|data-authority` · branch `data-authority-1`.
G1 W1 (+tests). G2 W2 (+tests). G3 W3 (+tests). G4 `.agents` APPEND +
drift-check (reseal only if [DRIFT] — client files are expected unmapped;
paste the check output either way).

## 4 · Self-verify (paste literal evidence)
1. rev-parse (+§0 proofs if TOOLMATCH landed). 2. Head SHA + PR # + **CI
GREEN**. 3. `git diff --name-only <anchor>..HEAD -- api/ shared/ supabase/ e2e/`
**EMPTY** (paste). 4. Grep proof: exactly ONE definition of the six tier
sentences; flat-Events sentence byte-unchanged (`git diff` shows no hunk at
~:400). 5. InspectTab.test passing UNMODIFIED (state it). 6. Bridge test
outputs (both origins + landing variants). 7. drift-check output (+reseal rev
if triggered). 8. PLATINUM + window/freeze untouched statements.

## 5 · Report & merge
Push, PR, post §4. **Do NOT merge.** Architect FAST-GATE → GO. Upon GO,
`--no-ff` with exactly:

`Merge PHASE DATA-AUTHORITY-1: tier legibility hero + F38 completion clauses + Inspect/Stages live bridges to Veri Otoritesi`

Post-merge: delete branch `data-authority-1`. Architect-side: owner screen
walkthrough (feeds the round-close BOARD-WALK); F147 remains a register item.

<!-- END · claude-code-PHASE-DATA-AUTHORITY-1-v1 · rev 1 · 2026-07-20 · amendments mint v1_2 -->
