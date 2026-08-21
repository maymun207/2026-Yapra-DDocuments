# PHASE TOOLMATCH-IA-1 — mode-based Tool Matching + the declared reads

<!-- claude-code-PHASE-TOOLMATCH-IA-1-v1_2 · rev 1.2 · 2026-07-20 · Architect: Claude (S54)
     SUPERSEDES v1 (immutable, S37-1). RULING folded: R3 (probe sticky/context
     fields) is DROPPED from this phase — Architect premise error #6 (the probe
     path computes no sticky; surfacing it needs routeKeywordLayer plumbing +
     prior-message input = keyword-file contact mid-window). Successor item
     F146 minted: "probe context + per-layer attribution lens", sequenced
     POST-WINDOW (IR-3 era, all three rungs' provenance at once). W4 removed,
     W1 Test copy trimmed, evidence renumbered, MERGE MESSAGE updated (S30-2).
     Everything else verbatim from v1. THIS file is the ONE relay payload. -->

## 0 · PRECONDITION (S47-1, parallel-lane form)
Branch from **current `origin/master`** (paste your rev-parse; IR-2 may land
mid-flight — its surfaces are DISJOINT from yours; on its merge: rebase, paste
the name-only disjointness proof + a `git range-diff` no-content-change proof,
and reseal to the **next free docVersion rev** (`api/admin/**` is doc-mapped,
reseal is certain). STOP only on a non-trivial conflict.

## 1 · Scope & laws
Mode-based rewrite of the Tool Matching tab + exactly TWO api reads (R1-R2).
NOT touched: routing/learn runtime BEHAVIOR (console lines byte-identical; the
keyword layer — including `routeKeywordLayer` — is window-locked and this
phase now has ZERO reason to touch it), eval-gate, frame semantics (IR-3's),
`supabase/**` (diff must be empty), the `VSplit` primitive (`ProvidersTab`
keeps its instance). Profile **FULL**; **unsharded CI = sole arbiter**;
RULE-26 job rewritten per W5.

## 2 · Work items

**W1 · The screen** (design v1_2 §1/§2/§5/§6, binding):
- Four modes via segmented switcher, single-column, responsive:
  **Gözat/Browse** (Reference floor ∪ Learned overlay; TM-6 sentence: "12
  kategori (yapı — Rules'ta yönetilir) · N öğrenilmiş anahtar (katman —
  burada bakımı yapılır)"; category data from R2, not the floor manifest) ·
  **Sına/Test** (probe verdict with TODAY'S fields: path, matched categories,
  offered tools — against floor / live / preview; one honest deferral line in
  the panel copy: "Bağlam ve katman katkısı gösterimi ayrı bir fazda (F146)
  gelecek") · **Bakım/Curate** (proposals inbox with the EXISTING in-row
  picker ~:515 — options from R2; hygiene strip bound to R1 rows) ·
  **Taslaklarım/My Drafts** (personal `routing_drafts` overlay ONLY).
- TWO bridge cards, never duplication (TM-3/TM-5): "Kategori yapısı Rules'ta
  yönetilir →" and "Kapsanmamış araç taslakları Governance'ta →" — NAV-STACK
  deep-links with arrival context strips (the F42 pattern).
- **Exposure badges = DERIVED tri-state** from `backend_tools` mirror ∪
  `tool_annotation` (this phase is the mirror GET's FIRST frontend consumer —
  disclose in report): no annotation row ⇒ "Sınıflandırılmamış (F80)" ·
  `read` ⇒ "Okuma" · `write` ⇒ "Yazma (allowWrite denetimli)". The binary
  enum is untouched.
- **Frame observation slot**: honest-dark placeholder card only ("IR-1
  gölge-çerçeve gözlemi şu an kapalı; flip sonrası burada: action×object
  dağılımı, enum-drop oranı, sağlayıcı kırılımı") — zero data wiring.
- Flow-teacher strip (route → learn → propose → curate → publish → serve):
  one human sentence + "… daha fazla" per step, TR/EN bilingual (Wave-2
  voice), doubling as mode navigation.

**W2 · R1 — `learn_aggregate` telemetry (the VERIFIED precise mechanism):**
- The stagetools-path counters are LOCAL to `stageTools.ts`'s learn block
  (all 5). The fallback-path counters live in `toolCategories.ts`'s learn
  block and count only 3 (kept / skipped_broad / skipped_stopword — the
  verdict return at ~:920 stays DISCARDED; do not change fallback behavior).
  `filterToolsByMessage`'s result gains an optional `learnStats` field
  carrying the fallback trio when that path learned.
- `stageTools.ts` (sole production caller, ctx in scope) collects whichever
  path's counters exist onto `ctx.learnStats` (typed in `turn/types.ts`).
  `chat.ts` emits ONE telemetry row alongside the `ir_frame` emission point
  (post-fingerprint): `payload.kind:'learn_aggregate'`, payload
  `{ path, kept, skipped_stopword, skipped_broad, skipped_same, skipped_short, config_fingerprint }`
  — **on the fallback path, `skipped_same`/`skipped_short` are `null` = NOT
  MEASURED, never 0** (empty≠zero applied to the payload itself). No row when
  no learn attempt happened. Console lines BYTE-IDENTICAL on both paths
  (pinned by the existing tests passing unmodified).
- Thin admin read aggregating recent rows for the Curate strip (mirror the
  `backend-tools.ts` GET pattern: PANEL_ACCESS gate, one repo call,
  serialize).

**W3 · R2 — live category listing:** new `api/admin/tool-categories.ts`
(flat `api/admin/<resource>.ts` convention; PANEL_ACCESS gate) serializing
`resolveToolCategories()`'s row list as-is. Browse + the TM-2 picker consume
it.

**W4 · Tests/RULE-26 rewrite (verified boundaries):** retire
`rule26-admin.spec.ts:249-337` (the `PANEL-RESIZE-1 routing VSplit` describe +
all `-routing` testids) and ALL of `routingTab.test.tsx`; keep
`rule26-admin.spec.ts:17-247` untouched. New: mode-based unit tests (each
mode renders + bridges navigate + badges derive the tri-state incl. the
absence case + strip binds R1 data incl. the null-vs-zero render + the Test
panel's F146 deferral line renders) and a fresh RULE-26 e2e asserting
`document.documentElement.scrollWidth <= window.innerWidth` at 1280 AND 1024
with seeded worst-case data. `VSplit.tsx` + its tests + `ProvidersTab`
byte-untouched (name-only proof). `routing-curation.ts` and
`routeKeywordLayer` byte-untouched (name-only proof — R3's retreat leaves
zero probe-side changes).

## 3 · Gated steps
G0: rev-parse · S32-1 script greps · paste anchors (RoutingTab modes/testids
inventory, backend-tools GET, resolveToolCategories return shape, ir_frame
emission point in chat.ts, both learn-counter blocks) · naming-collision grep
`learn_aggregate|tool-categories|learnStats` · branch `toolmatch-ia-1`
(already open — continue on it).
G1 W2 (telemetry + read + types, tests incl. null-not-zero pin).
G2 W3 (read + tests).
G3 W1 (the screen, bilingual copy, bridges, badges, placeholder, F146 line).
G4 W4 (test/RULE-26 rewrite).
G5 `.agents` APPEND + reseal per §0.

## 4 · Self-verify (paste literal evidence)
1. rev-parse (+§0 proofs if IR-2 landed). 2. Head SHA + PR # + **CI GREEN**.
3. `git diff --name-only <anchor>..HEAD -- supabase/` EMPTY;
VSplit/ProvidersTab untouched name-only proof; `routing-curation.ts` +
`toolCategories.ts`'s `routeKeywordLayer` untouched proof (the R1 return-field
change is the ONLY toolCategories hunk — paste the diff hunks list); both
learn console-line tests passing UNMODIFIED. 4. `learn_aggregate` payload
examples from tests: one stagetools (5 numbers), one fallback (3 numbers +
two `null`s). 5. Badge derivation test output incl. the no-annotation ⇒ F80
case. 6. RULE-26 output at both widths. 7. Reseal output (next free rev).
8. PLATINUM + window/freeze untouched statements.

## 5 · Report & merge
Push, PR, post §4. **Do NOT merge.** Architect FAST-GATE → GO. Upon GO,
`--no-ff` with exactly:

`Merge PHASE TOOLMATCH-IA-1: mode-based Tool Matching redesign + learn-aggregate telemetry read + live category listing`

Post-merge: delete branch `toolmatch-ia-1`. Architect-side: prod
`learn_aggregate` row + owner screen walkthrough (feeds the round-close
BOARD-WALK). F146 enters the register as a POST-WINDOW item.

<!-- END · claude-code-PHASE-TOOLMATCH-IA-1-v1_2 · rev 1.2 · 2026-07-20 · supersedes v1 · amendments mint v1_3 -->
