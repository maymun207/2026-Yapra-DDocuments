# PHASE GATE0-UI-BATCH-1 — board-walk batch fix (F-BW01·02·03·04·08·09·10)
**claude-code-PHASE-GATE0-UI-BATCH-1-v1 · rev 1 · 2026-07-21 · Architect: Claude · Executor: AG-A**
Closes GATE-0 item (b)'s findings (`cwf-board-walk-findings-v1` + F-BW10 minted at
the card-14 walk). ALL client-only. Profile: **FULL** (multi-file) — but zero
api/shared/migration surface, so the review is FAST-GATE (S43-2) and CI is the
sole test arbiter (S37-2), WHOLE job green (S56-2).

> PLATINUM statement: pure display behavior — defaults, legends, and derived
> previews self-configure from data already in the client; zero manual steps,
> zero Operator action, zero new endpoints.

## §P · PRECONDITION (S47-1) + ISOLATED WORKDIR (S56-1)
Valid ONLY while `origin/master == 0636fd372ffec93978bca2958a499d6bdab9bdfe`
(rev 127). If `synth-traffic-1` (AG-B, concurrent) merges first: REBASE onto the
new master, report the new anchor, and per the S47-1 corollary the
SECOND-TO-MERGE lane re-runs `npm run reseal` on the MERGED tree if the doc
manifest is touched. On any other mismatch STOP and report actual state.
UNIQUE workdir — do NOT share `/tmp/cwf_yaprak` with AG-B (S56-1). Grep all
scripts from `package.json` before running (S32-1). Branch: `gate0-ui-batch-1`.

## §C · BINDING CONSTRAINTS
- CLIENT-ONLY: `git diff --name-only` vs anchor must show ZERO paths under
  `api/**`, `shared/**`, `supabase/**`. Paste the proof in self-verify.
- NO new endpoints, NO new tables, NO writes of any kind added. F-BW10 and
  F-BW09 are DERIVED VIEWS over the digest the client already receives
  (`TurnTraceDigestStageBucket`); zero LLM calls; deterministic string/state
  composition only.
- empty≠zero at the meta level: wherever a preview/decision CANNOT be derived
  honestly from the digest, render an explicit "türetilemedi / not derivable"
  state — NEVER guess, never fabricate a plausible value.
- Turn-trace digest remains DISPLAY-ONLY (ADR-008 / C1-LAW spirit): the existing
  `turnTraceDigestDisplayOnly` lint must stay green; do not import gate/
  grounding/trust modules into the new display code.
- GOLDEN FREEZE untouched (no `prompt.segment` surface — state it in
  self-verify). Frozen surfaces (gateway, evalGate engine, keyword layer)
  untouched — name-only diff proof.
- Naming-collision grep before coding:
  `CandidateMemory|candidateMemory|renderDecision|DigestLegend|stageContext`.
- i18n: every new copy string in the existing tr/en `t()` pattern.

## §G · GATED SUB-PHASES
**G0 · Preflight:** rev-parse anchor proof · §P checks · S32-1 greps · paste
anchors: `adminUi.tsx` InlineHelp/PanelPrimer default branch (~:141-145/:190/
:203-204) · `StagesTab.tsx` body render (~:277-283) + C-11 disclosure (~:360) +
local snapshot state (~:444) + `useLatestTurnTrace` (~:405) · `AdminPanel.tsx`
context-lift comment (~:80) · `TurnDigestSection.tsx` SpanIoRow/bucket shape ·
`stagesModel.ts` nested-consistency writes (~:192/:222). Line numbers are
S56-era hints — locate by CONTENT, report actuals.

**G1 · F-BW02 — page-head defaults collapsed:** flip the absent-preference
default in InlineHelp + PanelPrimer from expanded → COLLAPSED, globally. Legacy
sessionStorage values ('dismissed'/'expanded'/'collapsed') still honored (the
S37/F32 migration stays). Tests: absent→collapsed; each legacy value keeps its
behavior.

**G2 · F-BW03 — card bodies collapsible, default closed:** wrap NE YAPAR /
NASIL AYARLANIR bodies in the EXISTING C-11 native-disclosure idiom, closed by
default, on ALL stage cards (03/09/10 confirmed; apply uniformly). Card shows
title + first-line summary when closed. Tests: default closed; expand renders
full body; per-card independent state.

**G3 · F-BW01 — context persist + auto-select:** lift picked `turnId`/`snapshot`
out of StagesTab local state into AdminPanel's existing context-lift pattern
(NavContext; exactly the Rules-filters/stageCardId/scrollY idiom — AdminPanel
never unmounts). Manual tab-switch away+back restores context identically to
the deep-link path (kills the F42 inconsistency). On first mount with no
context, seed `handlePickTurn` from the already-resolved
`useLatestTurnTrace().traceId` — context is never empty when a last turn
exists; banner names it. Tests: persist across simulated tab-switch;
auto-select fires once on empty first mount; explicit user pick overrides and
persists; no-turns state stays honest.

**G4 · F-BW04 + F-BW08 — digest legend + dedupe:** ONE reusable legend
affordance on digest tables/span lists (collapsed by default, G1's idiom)
explaining, verbatim-faithful to the diagnoses: (a) table/op/rows semantics;
(b) "insert (ölçülmedi/not measured)" = inserts don't count rows; (c)
`seed_state` insert+select pairs = the S46 self-seed CONCURRENCY CLAIM — an
atomic no-op lock-probe (23505 = already seeded), 3 pairs = 3 domains, NOT a
per-turn write; (d) `tierSummary` + **`superset:[]` = honest-absence
(empty≠zero), not a gap** — the ADR-001 Data Authority face, the most important
legend line; (e) `ai.*` spans carry no I/O BY RULING (owner ruling-1): the real
scrubbed I/O lives on the matching `cwf.*` sibling spans — intentional, not a
loss. F-BW08: where a nested child span's output is byte-identical to its stage
span's output (warm.trust vs stage.12.warm-trust), render ONCE with the note
"nested child + stage span carry the same value". Tests: dedupe fires only on
byte-identical pairs; non-identical pairs still render both; legend present on
cards 07/09/10/12 digest surfaces.

**G5 · F-BW09 — card 13 render-decision visibility:** card 13 (Biçim/Sunum) has
NO server span (intentional — say so in its copy). Add a DERIVED
"render kararı (türetilmiş)" line computed deterministically from the digest's
recorded stage-11 tool-result shapes, mapping to the four states:
real-0 → "gerçek 0 — çizilir" · missing → "eksik — boş bırakılır" · no result →
'"veri yok" mesajı' · non-numeric → "sayısal değil — grafiklenmez". If the
digest does not carry enough to classify, render "türetilemedi (sunucu izinde
render kararı yok — kasıtlı, client-side)". NEVER guess. Tests: one per state +
the not-derivable state.

**G6 · F-BW10 — card 14 candidate-memory preview:** on card 14, under an honest
banner, render a deterministic recomposition of the SAME digest: intent/frame
(stage-03 output) · entities from the frame · tools called + rowCounts
(stage-11) · flush outcome (stage-14). Banner copy (tr/en, exact spirit):
"Uzun süreli bellek YOK (MEMORY-1 ile gelecek). Aşağısı bu turn'den bir bellek
ADAYI önizlemesi — hiçbir yere YAZILMADI ve knowledge base'e girmez. Bilgi
(governed rules) ≠ bellek (epizodik); sistem bugün sadece kelime→araç eşlemesini
öğrenir." No digest → honest empty state. This is CARD PEDAGOGY: it must not
claim a memory format or write path; MEMORY-1's design is NOT prejudged. Tests:
preview renders from a seeded digest fixture; absent-digest honest state;
zero network writes (assert no new fetch/mutation calls).

**G7 · Seal:** if any mapped file is touched, reseal per living-doc lock-step
(expect rev 128; two-commit seal if mixed). `.agents` CHANGELOG entry per the
CHANGELOG ruling. Run the FULL suite via CI (push → whole job green, S56-2).

## §V · SELF-VERIFY (paste literal evidence)
1. Anchor rev-parse + §P proofs. 2. Head SHA + PR # + **WHOLE CI job green**
(S56-2). 3. `git diff --name-only <anchor>..HEAD -- api/ shared/ supabase/`
**EMPTY** (paste) + frozen-surface name-only proof. 4. RULE-26 rendered
evidence: screenshots at 1280px — (a) a card default-collapsed, (b) expanded,
(c) card 13 derived decision, (d) card 14 preview + banner, (e) context
surviving a manual tab-switch. 5. Dedupe + legend test output. 6. G5/G6
honest-state ("türetilemedi"/empty) test output. 7. `turnTraceDigestDisplayOnly`
lint green. 8. PLATINUM + freeze-untouched statements. 9. Reseal/manifest
status (rev number or "no mapped files touched").

## §M · REPORT & MERGE
Push, open PR, post §V. **Do NOT merge.** Architect FAST-GATE review → GO. Upon
GO, `--no-ff` with exactly:

`Merge PHASE GATE0-UI-BATCH-1: board-walk batch — context persist + collapsed defaults + digest legend/dedupe + render-decision & candidate-memory previews (F-BW01/02/03/04/08/09/10)`

Post-merge: delete branch `gate0-ui-batch-1`. Optional rider: delete stale
merged remotes (`obs-trace-2b`, `flake-sweep-1`, `pane-scroll-1`,
`pane-scroll-2`, `hotfix/f152-rollout-guard-blind`) — confirm each merged first.

<!-- END · claude-code-PHASE-GATE0-UI-BATCH-1-v1 · rev 1 · 2026-07-21 -->
