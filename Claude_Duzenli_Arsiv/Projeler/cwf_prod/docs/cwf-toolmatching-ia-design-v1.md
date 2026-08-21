# 1b · Tool-Matching IA — design note (mode-based redesign)

<!-- cwf-toolmatching-ia-design-v1 · rev 1 · 2026-07-20 · Architect: Claude (S54)
     Inputs: cwf-subwalk-findings-v1 (TM-1..TM-8) · S49 owner conclusions ·
     ROUTE-GOV-1 surfaces · SR1-W2/W3b · IR-1 (dark) · Wave-2 voice/naming law.
     Target lane: LANE B (AG-B). Owner GO on this note → Architect authors
     claude-code-PHASE-TOOLMATCH-IA-1-v1. -->

## 0 · What this is
`RoutingTab.tsx` (621 lines, tab id `routing`, label already "Araç Eşleme /
Tool Matching" — F33 naming law satisfied) is today a 4-panel wall that is
unusable at normal zoom (TM-1) and teaches nothing (TM-4/TM-8). Since it was
built, the routing plane grew real governed surfaces: `backend_tools` mirror +
sync, `armes.tool_annotation` exposure overlay (F80 fail-closed), DB-first
`armes.tool_category` (live: `catSource=db catCount=12`), the governed
proposals ledger (now visibly collecting multi-word blind spots: "is emri",
"uretim miktari"), the learned map with F144/F145 hygiene, and — as of today —
IR-1's dark frame observation. 1b makes ONE coherent screen out of this.

## 1 · The IA: one screen, four MODES (TM-7 — absorbs TM-1)
A mode switcher (segmented control) replaces the 4-panel wall; each mode is a
single-column, responsive surface (RULE-26-provable at 1280px and 1024px):

- **Gözat / Browse** — the layered map, taught as layers: Reference floor
  (immutable 12 categories + seed keywords) ∪ Learned overlay (N rows,
  system-learned). The TM-6 counter pair rendered as a sentence, not two bare
  numbers: "12 kategori (yapı — Rules'ta yönetilir) · N öğrenilmiş anahtar
  (katman — burada bakımı yapılır)". Per-category drill-down lists floor
  keywords vs learned keywords distinctly.
- **Sına / Test** — the probe lens: type a message, see the route verdict
  (path, matched categories, which LAYER matched each, sticky/context
  contribution) against floor / live / preview — the existing preview
  endpoints; zero new routing code.
- **Bakım / Curate** — learned-map hygiene + the proposals inbox. TM-2 fix:
  the category picker renders IN the proposal row (row context never lost).
  Hygiene stats strip bound to the real aggregate-line counters (kept /
  skipped_stopword / skipped_same / skipped_short / skipped_broad) so F144/F145
  behavior is VISIBLE, not folklore.
- **Taslaklar / Drafts** — My Draft + the ROUTE-GOV stage-drafts flow for
  uncovered tools, ending at the publish bridge.

**TM-3/TM-5 (bridge, don't duplicate):** adding a 13th CATEGORY is a Rules
operation on `armes.tool_category` — every mode carries the explicit bridge
card "Kategori yapısı Rules'ta yönetilir →" as a NAV-STACK deep-link with the
arrival context strip (the F42 reference pattern). Tool Matching itself never
edits category structure.

## 2 · The flow teacher (TM-8)
A compact header strip teaches the SIX steps with live counters bound to real
data: **route → learn → propose → curate → publish → serve** (each step: one
human sentence + a "… daha fazla" progressive-disclosure per the Wave-2 voice
law, TR/EN bilingual). The strip doubles as mode navigation (route/serve →
Test, learn → Browse, propose/curate → Curate, publish → Drafts/Rules bridge).

## 3 · Data bindings — EXISTING sources only
Learned map + aggregate stats, proposals ledger, `armes.tool_category` rows,
`backend_tools` mirror + `tool_annotation` overlay (exposure badges: read /
write-audited / F80-ungoverned), preview/probe endpoints. G0 of the phase
ENUMERATES the exact endpoints from the tree; if a thin read is genuinely
missing, it is disclosed and added as a read-only endpoint (FULL profile then).
No guessing, no new write paths.

## 4 · What 1b does NOT touch
Routing runtime, learn paths, the keyword layer (window law), eval-gate,
frame semantics (IR-3's), any `supabase/` surface. This is an IA/legibility
phase: client + (at most) thin read endpoints.

## 5 · Reserved slot: Frame observation (IR arc hook)
A fifth surface is RESERVED, not built: "Çerçeve Gözlemi / Frame observation"
— an honest-dark placeholder card ("IR-1 gölge-çerçeve gözlemi şu an kapalı;
flip sonrası burada: action×object dağılımı, enum-drop oranı, sağlayıcı
kırılımı"). It will read the `ir_frame` telemetry rows + `cwf.route.frame.*`
attrs AFTER the observe-flip; building its charts now would front-run the
window review. The placeholder states this in one sentence — empty≠zero
discipline applied to a UI surface: absent-by-design, said out loud.

## 6 · Compliance
- **Naming law:** labels done (F33); ALL in-panel copy rewritten human-first
  bilingual (Wave-2 voice), no AI-voice remnants.
- **PLATINUM:** zero manual configuration; every surface self-serves from
  governed data; deep-links carry context; the phase introduces no owner
  ritual. RULE-26 e2e asserts the TM-1 fix deterministically
  (`scrollWidth <= innerWidth` at 1280/1024 in the existing rule26 harness).
- **Window/freeze:** untouched by construction (§4).

## 7 · Phase shape (on GO)
LANE B · branch `toolmatch-ia-1` · profile decided at phase authoring (HOTFIX
if pure-client after G0's endpoint enumeration; FULL if any thin read endpoint
is needed) · RULE-26 job extended · reseal expected (RoutingTab may be mapped)
· merge message authored in the phase prompt.

<!-- END · cwf-toolmatching-ia-design-v1 · rev 1 · 2026-07-20 · amendments mint v2 -->
