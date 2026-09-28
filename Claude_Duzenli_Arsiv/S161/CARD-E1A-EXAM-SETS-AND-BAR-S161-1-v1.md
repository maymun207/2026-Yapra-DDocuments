<!-- relay-audit: v1 kind=card -->
CARD-E1A-EXAM-SETS-AND-BAR-S161-1-v1

LANE: AG-4 (fresh window AFTER CARD-ENTRY-FLOOR-REQUIRED-S161-1 lands; one card per window) — reaches AG-4 ONLY with a scout GREEN row
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-28T00:32Z (bridge clock, date -u)
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 ("onay S161 planı", 2026-09-28 02:37 TSI, plan step P7, card E1-a) · OWNER-RULING-S159-A25-ADOPT-1 · OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1 · OWNER-RULING-S158 governed settings are changed in the admin UI with the owner. Register rows 103 E1, 39 (M-a), 40c (C3/C4), 21, 28, 105, 96 named below.
ADVERSARY GATE: NEW SUBJECT → scout first (12.1). No exemption claimed. THIS IS A WIRING CARD (12.6): the specimen store, the replayability predicate, the golden mark door, the Recall@k scorers and the spend-gated runner all EXIST; the card adds the exam-set partition, the acceptable-set labels, the K25 declaration and one runner over them.
BRANCH: phase/e1a-exam-sets-and-bar-s161-1 off origin/master · PUSH early · REPORT docs/relay/E1A-EXAM-SETS-AND-BAR-S161-1-AG4-report.md · PR: yes, non-draft, opened in THIS card.
GRAFT: take context from graft first (goldenSpecimens, GoldenSpecimensRepository, recordedTurn, toolRetrievalRecall, recallCat, routerAbLens, runExperiment, HealthTab golden door, resolveGoldenRunPolicy). Slip and report carry a GRAFT line.
Work in your own worktree, never in the main worktree another lane uses.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API branches/master, Architect bridge, 2026-09-27T23:28Z | master |
| A25 E1 and K11/K25 as adopted | READ: A25 v1 HTML (sha256 8e8c18a8fab6141fe178f483f286ca1a2e93d8416fa5fadd6ac7bc4d9cf7866b), text extraction lines [116], [134], [423] — extraction, not HTML bytes | a25 |
| golden_specimens carries membership only (no set, no labels) | MEASURED: production DB pg_catalog, Architect (Supabase MCP, read-only), 2026-09-28T00:24Z | table |
| the mark door, the composed golden-set reader, the replayability predicate and the two-arm Recall@k scorer exist and are tested | MEASURED: GitHub contents API at master, 2026-09-28T00:22Z | mech |
| a golden run is spend-gated by a governed ceiling and a consent flag | MEASURED: GitHub contents API at master (resolveGoldenRunPolicy.ts, runRouterAbReplay.ts header), 00:22Z | spend |

```evidence:master
c58438b59cff4d1d403634b28e44af9b01db6dea
```

```evidence:a25
[116] K11 · Sınav soruları held-outAltın kaynak: messages/turn deposu + Langfuse izleri (08-11/12 Faaliyet Raporu, 08-18 sermaye tavanı, S149 Q3/Q4). Paraphrase üreticisi ≠ profilleyici. Şema-türevi sorular duman testidir. Etiket = kabul edilebilir küme; aynı görev ailesi aynı kümede. Üç küme: profil-geliştirme · kalibrasyon · bağımsız kabul.
[134] K25 · Regresyon güven aralıklı; kabul barajı ayrı"Recall düşmesin" küçük N'de sistemi dondurur. Geçiş: düşüş önceden ilan Δ ve min n içindeyse. Kabul barajı ölçmeden ÖNCE ilan edilir (ürün gereksinimi); τ veriden kalibre edilir; sistem kötü gidince kendi barajını düşüremez (SOTA-1 ruhu).
[423] A25E1P0/P1'in sınav yarısına: K11 üç küme held-out gerçek turlardan; kabul edilebilir küme etiketleri; dört tanık (T1 sermaye · T2 personel · T3 Q3 fire · PR 621 camelCase) REGRESYON kümesi, final değil; K-A fikstürü (sentetik MCP sunucusu, finans, 30 araç) + K-A′ ikinci görülmemiş sözlük; K-G aleti; ÜÇ SAĞLAYICI tabanı fatura maliyetiyle (önbellek durumu kaydedilir; harcama R6(d)); K25 barajı BU AŞAMADA ilan. Kod: yalnız replay/sınav/fikstür.Taban sayıları provider × backend kırılımlı; hiçbir eşik uydurulmadı.
```

```evidence:table
MEASURED: select attname, format_type(...) from pg_catalog.pg_attribute ... relname='golden_specimens' (production, 2026-09-28T00:24Z)
message_id uuid NOT NULL · marked_by uuid NOT NULL · marked_at timestamptz NOT NULL · revoked_by uuid · revoked_at timestamptz · note text
```

```evidence:mech
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/persistence/repositories/GoldenSpecimensRepository.ts:84:    async mark(messageId: string, userId: string, note?: string): Promise<GoldenMarkResult> {
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/replay/goldenSpecimens.ts:65:export async function loadGoldenSpecimenSet(
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/replay/recordedTurn.ts:302:export function isReplayableSpecimen(r: Pick<MessageRowLike, 'role' | 'raw_tool_results'>): boolean {
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/replay/toolRetrievalRecall.ts:142:export function scoreTwoArms(input: ScoreTwoArmsInput): TwoArmResult {
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/replay/toolRetrievalRecall.ts:205:export function aggregateTwoArms(results: readonly TwoArmResult[]): TwoArmAggregate {
READ: GitHub code search at master — src/components/admin/HealthTab.tsx is the only admin component naming golden_specimens (the mark door UI); api/admin/prompt-golden.ts runs the golden batch under PERMISSIONS.REPLAY_RUN + REPLAY-QUOTA-1 reserve/settle.
```

```evidence:spend
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/knowledge/resolveGoldenRunPolicy.ts:27:export async function resolveGoldenRunTokenCeiling(
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/knowledge/resolveGoldenRunPolicy.ts:60:export async function resolveGoldenRunnerEnabled(
READ: scripts/runRouterAbReplay.ts header: "REFUSES BY DEFAULT ... exits non-zero unless --consent-tokens <n> is supplied. Being run at all is NEVER itself consent to spend."
```

## PREMISE
MEASURED: the anchors above. In plain words: A25 says nothing can be called better or worse until there is a held-out exam with three separate question sets, each question labelled with the SET of acceptable answers (tools/facts), and an acceptance bar declared BEFORE anyone measures. Today the house has the pieces — real recorded turns, a curated "golden" list, a replayability check, Recall@k scorers, a spend-gated runner — but no partition into sets, no labels, and no declared bar (evidence:table, evidence:mech). This card wires them: (1) every golden specimen gets an `exam_set` (profile-dev · calibration · acceptance · regression) and an `acceptable` label (tools that may be offered/called; facts that must appear), written by the OWNER in the admin UI through the mark door — governed data, never a lane DB write; (2) T1–T4 become the REGRESSION set (T4 = the PR 621 camelCase case lives in the vitest suite already and is referenced, not duplicated); (3) K25's Δ and n_min are declared as governed params BEFORE the first exam run; (4) one exam runner scores Recall@1 per backend per set using the EXISTING scorers, with a bootstrap confidence interval, and refuses to run on a set below n_min. No routing path changes. Provider baselines (E1-d) and the K-A fixture (E1-b) are SEPARATE cards.
SELF-INVALIDATION: dies if golden_specimens already carries a set/label column at your head, or if an exam-set mechanism exists elsewhere (grep 'exam' 'heldOut' 'acceptable' at your head; the Architect's code search returned 0 hits and one negative probe is not proof — re-measure).
ON-DISAGREEMENT: YOUR READING WINS: print both, STOP before the migration if the schema differs.

## FALSIFIER
At your head: (i) the migration applies on a fresh shadow DB and the mark door round-trips set + labels (test); (ii) the runner over an EMPTY set prints `set:absent n=0` and spends nothing; (iii) the runner over the regression set (after the owner marks T1–T3) prints per-backend Recall@1 with CI and n, and REFUSES with `below n_min` when n < the declared n_min — the refusal is the expected result today; (iv) a run with no `--consent-tokens` exits non-zero with the estimate only; (v) `git grep` shows no acceptable-set label typed into code or fixtures with real tool names (labels are DATA the owner writes).

## ORDERS
1. MIGRATION (authored by you under supabase/migrations/, APPLIED by the Gemini operator on the Architect's prompt — never by a lane): golden_specimens gains `exam_set text NOT NULL DEFAULT 'unassigned' CHECK (exam_set IN ('unassigned','profile-dev','calibration','acceptance','regression'))` and `acceptable jsonb` (shape: { tools: string[], facts: string[], note?: string }, validated by a zod schema in code; NULL = unlabelled). Version key per check:migration-versions.
2. Repository + reader: GoldenSpecimensRepository gains setExamSet(messageId, set) and setAcceptable(messageId, acceptable); loadGoldenSpecimenSet gains an optional set filter; the composed set hash (goldenSetHashOf) covers set membership so a re-partition changes the hash.
3. K25 DECLARATION as governed params (agentParams decl, code floor + Rules UI): `exam.k25.deltaRecall` (declared allowed drop, default 0.05, min 0, max 0.5), `exam.k25.nMin` (default 30, min 5, max 1000), `exam.acceptance.recallAt1` (the ACCEPTANCE BAR, default 0.80, min 0, max 1; sessionTweakable false). They are published by the OWNER in the Rules UI before the first exam run (the card names this as ORDER 0 for the owner, sequenced AFTER landing).
4. EXAM RUNNER: api/cwf/_lib/replay/examRun.ts (pure core) + scripts/runExam.ts (the runRouterAbReplay.ts shape: estimate first, refuse without --consent-tokens, REPLAY-QUOTA-1 reserve/settle, one replay_audit row with outcome { exam:true, set, n, perBackend: { recallAt1, ci95, n }, bar, verdict }). Scoring reuses toolRetrievalRecall/recallCat over the recorded router output (offeredToolNames vs acceptable.tools) — NO live LLM call in this card; the verdict per set: `below-nMin` | `pass` | `fail` against exam.acceptance.recallAt1; CI by bootstrap (1000 resamples, seeded).
5. REGRESSION SET: locate the three witness turns READ-ONLY by their recorded timestamps/ids (T1 capital question S158 — ACCEPTANCE-D6-CAPITAL-QUESTION-S158-1 names it; T2 personnel question 2026-09-26T16:02:28Z; T3 Q3 scrap S149/S151) and print their message ids in the slip; the OWNER marks them exam_set='regression' with their acceptable labels in the UI (ORDER 0, owner, after landing, Architect watching). T4 (PR 621 camelCase) is a vitest case: reference it by file:line in docs/ground, do not duplicate.
6. UI/UX (OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1) — ADDITIONS in src/components/admin/HealthTab.tsx golden door: an exam-set selector (i18n pair "Sınav kümesi" / "Exam set", four values + unassigned), an acceptable-label editor (tools multi-select from the live catalog names + free facts list; i18n "Kabul edilebilir küme" / "Acceptable set"), per-set counts beside the golden count, and a read-only "K25 barajı" line showing the three params with their source; data-testids on the selector and the editor. CHANGES: none to existing controls. REMOVALS: none — say so.
7. E2E LOCATORS (row 116): `git grep -n -E "golden|altın" -- e2e/` at your head; every file it names is in the fence; new controls get exact data-testids.
8. Counts: `git grep -n -E "armes|Armes|ARMES" -- <your file set>` before/after (must not grow; no real tool or backend name in code, tests or fixtures — tests use invented names).
9. npm run build (five gates) + suite + typecheck:api; report with the FILE-FENCE in the first commit; PR non-draft; slip SLIP-E1A-EXAM-SETS-AND-BAR-S161-1 (branch, 40-hex head, PR, CI by full sha read twice if zero, the three witness message ids, the migration file name). Do not merge. Stop.

## SHARED SURFACES
```scope
- supabase/migrations/<version>_golden_specimens_exam_set.sql (new)
- api/cwf/_lib/persistence/repositories/GoldenSpecimensRepository.ts; api/cwf/_lib/replay/goldenSpecimens.ts (set filter, hash)
- api/cwf/_lib/replay/examRun.ts (new) + __tests__; scripts/runExam.ts (new); api/cwf/_lib/replay/config.ts (exam constants)
- api/cwf/_lib/knowledge/reference/agentParams.ts (three decls) + the seed/reference registry those decls require
- api/admin/ (the golden mark endpoint gains set/label writes under the existing permission); src/lib/adminService.ts
- src/components/admin/HealthTab.tsx + __tests__; i18n pairs; e2e files ORDER 7 names
- docs/ground/ (T4 reference); docs/relay/E1A-EXAM-SETS-AND-BAR-S161-1-AG4-report.md
```

## DECISION RIGHTS
AG-4 chooses file names, the zod shape, the bootstrap implementation and the i18n keys. The Architect decided (by A25 and the owner's rulings): sets and labels are governed DATA written by the owner in the UI; K25 params declared before the first run with the defaults above (the owner may change them in the UI); the runner reuses the existing scorers and spends only under consent; no live routing change. You may refuse on evidence this card did not anticipate.
FORBIDDEN: no DB write from the lane (migration is authored, not applied); no real tool/backend name in code, tests or fixtures; no change to the live routing path; no LLM call added; no merge; no scout post on your own head; no poll task, no cron; never print an environment value.

END · CARD-E1A-EXAM-SETS-AND-BAR-S161-1-v1
