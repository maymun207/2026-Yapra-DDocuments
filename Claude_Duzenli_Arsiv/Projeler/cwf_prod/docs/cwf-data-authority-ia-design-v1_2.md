# 1c · Veri Otoritesi (Data Authority) — legibility design note

<!-- cwf-data-authority-ia-design-v1_2 · rev 1.2 · 2026-07-20 · Architect: Claude (S54)
     SUPERSEDES v1 (immutable, S37-1). Folds AG-A's five tree-grounded
     findings (@eddf83e). Premise corrections owned: F38's shield/success fix
     + the bilingual catch sentence are ALREADY SHIPPED (flat Events list,
     InspectTab.tsx ~:400) — v1's "renders as a red alarm" was stale (Architect
     premise #7). NEW: F147 minted (GroundingViolation.backendId attribution —
     out of 1c's scope, enables named-backend copy later). Target lane: LANE A
     (critique author builds). -->

## 0 · Sharpened scope
1c = (a) tier legibility in BackendTrustPanel, (b) F38 COMPLETION (two thin
copy top-ups where the shipped fix left one-word/zero-word sites), (c) the
two LIVE bridges that don't exist yet. Client-only — AG-A confirmed
`adminService.listBackendTrust()` already carries everything (flat
`TrustAdminBackend[]`; tier-grouping is a pure client transform; ZERO new
endpoints). No grounding/trust runtime, no `GroundingViolation` type change
(→ F147), no tab-id change, no `supabase/**`.

## 1 · Tier legibility (BackendTrustPanel)
- **NEW additive hero** under the existing PanelPrimer (which stays untouched
  — it is the admin/dev box; this hero is the human explanation): the three
  tier sentences, bilingual, each with a "… daha fazla" expandable:
  **system_of_record — "Sözü senettir"** (asıl kaynak; rakamları doğrudan
  cevaba girer) · **reporting_mirror — "Aynadır"** (yansıtır, hüküm vermez;
  çelişkide asıl kaynak kazanır) · **unverified — "Söyler ama otorite
  tanınmaz"** (gösterilebilir, tek başına gerçek sayılmaz; 12. aşama bu
  sınırı savunur).
- **Flat table KEPT byte-structurally** (`trust-row-{id}` pins preserved —
  additive-safe per the critique's own flag). The bare `<Badge>{b.tier}</Badge>`
  gains a tier-colored variant + a click/hover one-liner reusing the hero
  sentences (one copy source, rendered twice — no second wording).

## 2 · F38 completion (InspectTab + stage-12 card)
- Flat Events list sentence: **KEPT VERBATIM** (it is right, and
  `InspectTab.test.tsx:84-113` pins it — extend, never rewrite).
- Tier-2 turn-card badge: "Yakalandı / Caught" gains ONE short clause
  ("— cevabınız korundu" / "— your answer stayed correct"), testid stable.
- Tier-3 stage-labelled line: gains the same short clause (today: bare icon).
- The existing `DocLink slug="veri-otoritesi"` (static concept doc) is KEPT;
  the live bridge (§3) is ADDED beside it — concept vs live-state are
  different needs.
- Copy stays SOURCE-AGNOSTIC ("bir kaynak…") everywhere — naming the backend
  requires F147, not shipped here.

## 3 · The two live bridges (the phase's structural work)
Mechanically the trust→replay precedent (pushTo/makeNavEntry in AdminPanel):
- **InspectTab → Veri Otoritesi**: new `onOpenTrust` callback prop wired from
  AdminPanel; rendered beside the DocLink on catch sites.
- **Stages 12 card → Veri Otoritesi**: same prop into the Stages board
  (StageContextSection ~:287-309 already has the 🛡️ framing, zero link).
- **Landing side**: BackendTrustPanel gains its FIRST inbound nav-context
  read → the F42-pattern arrival strip ("Inspect'teki yakalamadan geldiniz —
  ilgili backend'in katmanını aşağıda görün…" / stage-12 variant), dismiss on
  navigate-away per NAV-STACK norms.

## 4 · Not touched (+ the minted follow-up)
`backend_authority` data/tiers · grounding & trust enforcement ·
`GroundingViolation` type & telemetry emit shape · eval-gate · tab ids ·
`supabase/**` · PanelPrimer · the shipped flat-list sentence.
**F147 (minted, register item):** attach `backendId` to `GroundingViolation`
at detection (checkScopeDivergence already reads `tr.provenance?.backendId`
internally — attaching is additive) + thread through the telemetry emit;
unlocks named-backend catch copy and per-backend catch counts in this panel.
Small, independent, trust-surface — sequenced with the next api-touching
batch, NOT here.

## 5 · Phase shape (on GO)
LANE A · branch `data-authority-1` · **client-only FULL-lite**: multi-file
client + test extensions (InspectTab.test extend, inspectTabTiers extend,
oa10UiHome extend; backendTrustPanel additive; **zero RULE-26 impact** —
critique-verified) · reseal NOT expected (client-only; G-step verifies
against the manifest and reseals only if drift says so) · unsharded CI = sole
arbiter · merge message authored in the phase prompt.

<!-- END · cwf-data-authority-ia-design-v1_2 · rev 1.2 · 2026-07-20 · supersedes v1 · amendments mint v1_3 -->
