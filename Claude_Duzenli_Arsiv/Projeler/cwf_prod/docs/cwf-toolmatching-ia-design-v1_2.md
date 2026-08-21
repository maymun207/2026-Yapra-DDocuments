# 1b · Tool-Matching IA — design note (mode-based redesign)

<!-- cwf-toolmatching-ia-design-v1_2 · rev 1.2 · 2026-07-20 · Architect: Claude (S54)
     SUPERSEDES v1 (immutable, S37-1). Folds AG-B's tree-grounded critique
     (all five findings ratified): three new/extended admin reads named
     upfront; exposure badges respecified as a DERIVATION (no schema change);
     Drafts mode de-conflated (bridge, not duplicate); profile FULL from the
     start; RULE-26/unit tests REWRITE not extension; reseal via api/admin
     mapping (RoutingTab.tsx confirmed unmapped). Inputs as v1. -->

## 0 · What this is
`RoutingTab.tsx` (621 lines, tab id `routing`, label "Araç Eşleme / Tool
Matching") is a 4-panel wall, unusable at normal zoom (TM-1), teaching nothing
(TM-4/TM-8). 1b makes ONE coherent, mode-based screen out of the routing
plane's real governed surfaces.

## 1 · The IA: one screen, four MODES (TM-7 — absorbs TM-1)
Segmented mode switcher; each mode a single-column responsive surface
(RULE-26-provable at 1280/1024):

- **Gözat / Browse** — the layered map: Reference floor (immutable 12
  categories + seed keywords) ∪ Learned overlay (N rows). TM-6 counter as a
  sentence: "12 kategori (yapı — Rules'ta yönetilir) · N öğrenilmiş anahtar
  (katman — burada bakımı yapılır)". Category data comes from the LIVE
  published `armes.tool_category` rows (R2 below), not the static floor
  manifest.
- **Sına / Test** — the probe lens: type a message → route verdict (path,
  matched categories, per-layer attribution, **sticky/context contribution**
  via R3) against floor / live / preview, on the existing probe core.
- **Bakım / Curate** — learned-map hygiene + proposals inbox. TM-2: the
  in-row category picker ALREADY EXISTS (RoutingTab.tsx ~:515) — kept; its
  options move to the live category list (R2). Hygiene stats strip bound to
  REAL persisted counters (R1) — kept / skipped_stopword / skipped_same /
  skipped_short / skipped_broad — so F144/F145 behavior is visible, not
  folklore.
- **Taslaklarım / My Drafts** — the PERSONAL `routing_drafts` overlay ONLY
  (native to this tab). ROUTE-GOV **stage-drafts are NOT rendered here**:
  they live in Governance and get the TM-5 bridge card ("Kapsanmamış araç
  taslakları Governance'ta →", NAV-STACK deep-link with arrival context) —
  bridge, never duplicate. Same bridge pattern for category structure
  (TM-3/TM-5: "Kategori yapısı Rules'ta yönetilir →").

**Exposure badges (Browse tool rows, from the `backend_tools` mirror):** a
DERIVED tri-state, not a schema state — computed from mirror ∪
`tool_annotation`: no annotation row ⇒ **"Sınıflandırılmamış (F80)"** (the
fail-closed absence badge); `exposure='read'` ⇒ "Okuma"; `exposure='write'` ⇒
"Yazma (allowWrite denetimli)". The binary enum is untouched. Note:
`GET /api/admin/backend-tools` exists but has ZERO frontend consumers today —
this phase is its FIRST live consumer (wiring disclosed, not assumed).

## 2 · The flow teacher (TM-8)
Header strip: **route → learn → propose → curate → publish → serve**, live
counters bound to real data, one human sentence + "… daha fazla" per step
(Wave-2 voice, TR/EN). Doubles as mode navigation.

## 3 · Data bindings — honest inventory (AG-B-verified)
EXISTING, reused as-is: learned map (`GET /api/admin/routing-cache`),
proposals (`GET/POST /api/admin/router-proposals`), probe core
(`POST /api/admin/routing-curation {action:'probe'}`), backend-tools GET
(first consumer). NEW/EXTENDED — exactly three, declared upfront:

- **R1 · Hygiene stats:** the aggregate counters exist only as console lines
  today. Change: `filterToolsByMessage` RETURNS the counters (both the
  stagetools and fallback paths flow through its result), and stageTools —
  where `ctx` lives — emits ONE telemetry row per learning turn
  (`payload.kind:'learn_aggregate'`, the ADD-1/`ir_frame` pattern; no
  migration, C1-safe, volume = one row per learning turn). A thin admin read
  aggregates the recent rows. Console lines stay byte-identical.
- **R2 · Live category listing:** thin admin GET listing the published
  `armes.tool_category` rows (server resolver exists; only the read surface
  is missing). Feeds Browse and the TM-2 picker options.
- **R3 · Probe schema addition:** `RoutingProbeResult` gains
  sticky/context-contribution fields (server logic exists per SR1-W3b; the
  probe just doesn't surface it).

No other api change. No `supabase/` change anywhere.

## 4 · What 1b does NOT touch
Routing runtime semantics, learn-path behavior (R1 only RETURNS existing
counters), the keyword layer (window law), eval-gate, frame semantics
(IR-3's), any `supabase/` surface, the VSplit primitive itself (ProvidersTab
remains its consumer).

## 5 · Reserved slot: Frame observation (IR arc hook)
Unchanged from v1, AG-B-verified clean: honest-dark placeholder card only
("IR-1 gölge-çerçeve gözlemi şu an kapalı; flip sonrası burada: action×object
dağılımı, enum-drop oranı, sağlayıcı kırılımı") — zero `ir_frame` UI consumer
exists today, correctly deferred to post-flip.

## 6 · Compliance
Naming law: labels done; all in-panel copy human-first bilingual. PLATINUM:
zero manual configuration; badges/counters derive from governed data;
deep-links carry context. Window/freeze: untouched by construction.

## 7 · Phase shape (on GO) — corrected
LANE B · branch `toolmatch-ia-1` · **profile FULL from the start** (R1 touches
the turn path's return shape + telemetry; R1-R3 touch `api/admin/**`, which IS
doc-mapped → **reseal expected**, next free rev). RULE-26: the
PANEL-RESIZE-1 VSplit describe block and `routingTab.test.tsx` are
**REWRITTEN** for the mode-based layout (old 4-panel testids retire); a fresh
`scrollWidth <= innerWidth` assertion at 1280/1024 with seeded worst-case data
is added. Merge message authored in the phase prompt.

<!-- END · cwf-toolmatching-ia-design-v1_2 · rev 1.2 · 2026-07-20 · supersedes v1 · amendments mint v1_3 -->
