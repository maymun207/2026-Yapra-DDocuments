# PHASE SYNTH-CORPUS-V3 · v1
<!-- PHASE-SYNTH-CORPUS-V3-v1 · 2026-07-26 · S66 · Architect: Claude · Author lane: AG
     Seeds the owner's nine real operator questions as question-set v3, through
     the documented in-code warm-seeder — the same path v1 and v2 took.
     Small phase. Queue AFTER DISCOVERY-EXTEND-1-FIX-2 merges.
     Binding law is RESTATED INLINE. Do not go looking for ADRs or design notes;
     they are not all in this repo (F190). This prompt is the whole contract. -->

## §0 · Why this is a code phase and not a panel click
The owner asked for this to be applied without spending owner time. The obvious
shortcut — an Operator raw `INSERT` — is ruled out by the table's own contract,
quoted from `20260721150000_synthetic_traffic.sql`:

> *"Operational TEST DATA (owner-curated via the gated admin UI/API)... the panel
> reads/writes ONLY via gated `api/admin/synthetic-traffic*.ts` endpoints. The v1
> reference corpus lands via an in-code absence-only warm-seeder, **never a
> raw-SQL INSERT**."*

A raw insert would also leave the corpus **invisible to the repository**: no
fingerprint in `seed_state`, not reproducible in a fresh environment, not
reviewable. The seeder path costs the owner exactly as little and is correct.

## STATE PRECONDITION
- Run this **after** `PHASE DISCOVERY-EXTEND-1-FIX-2` is merged and pushed.
- Anchor = `origin/master` **at the time you start**. The Architect is
  deliberately not quoting a hash here, because FIX-2 will have moved it —
  quoting a stale value is a recurring Architect error and this prompt refuses
  to repeat it. **Report the hash you actually start from.**
- Verify before starting: `git rev-parse origin/master`, test counts,
  `npm run build` with `check:doc-drift [OK]`, `npm run lint`.

## BINDING CONSTRAINTS
1. **No migration.** This phase writes no SQL file and applies nothing. The table
   already exists.
2. **Absence-only, idempotent.** Mirror the existing v1/v2 control flow exactly:
   its own `seed_state` domain, its own corpus fingerprint, claim → absence check
   → insert → completeOutcome, `releaseClaim` on throw. A second boot must be a
   no-op. **v1 and v2 must be untouched** — their fingerprints must still match
   and stay no-ops.
3. **Never throws.** A seeding failure degrades to "no v3 set", never a broken
   boot.
4. **RULE-24** — text only, no NUL bytes, with a positive control.
5. **S65-2 / S66-1** — evidence is captured command output; a self-verify zero is
   not believed until the command is proven able to fail. FIX-2 exists because a
   claim was read off a diff instead of executed. Run what you assert.
6. **GOLDEN FREEZE** — no golden runs, no `prompt.segment` publishes. This corpus
   is frame-only and freeze-independent.
7. No ceiling change, no rate change, no eval-gate change.

## G1 · The v3 corpus
Set name: **`cwf-synthetic-question-set-v3`**, `lang = 'tr'`.

Utterance shape is fixed by the column comment:
`{idx, text, class, tags, intended_tool_categories, factory?}`.

All nine are **class `A`** (data-query). None is state-changing, so no COMMAND
row and no write-exposure surface is touched.

| idx | text (verbatim — typos are DATA, do not correct them) | factory | tags |
|---|---|---|---|
| 0 | `KB7 fabrikasının 3 günlük fırın duruşlarını getirir misin?` | `KB7` | `["linestop","zone","relative-window"]` |
| 1 | `Granit fabrikasının doğalgaz tüketim grafiğini çizer misin 7 gün için?` | `Granit` | `["metric","chart","superset","known-failing"]` |
| 2 | `Ganit fabrikasında dün akşam 4-12 vardiyasında sırlama 3-4-5 te çalışan personelleri listele.` | `Granit` | `["employee","shift","typo","multi-entity","line-range","f175-regression"]` |
| 3 | `Granit fabrikasında 10100000 sicil nolu çalışanın bu haftaki işe giriş çıkışlarını getir.` | `Granit` | `["employee","record-id","relative-window"]` |
| 4 | `Dün KB7'de barkodsuz üretim olmuş. Kaç adet karo barkodsuz üretmişiz? Problem hangi saat aralığında oluşmuş?` | `KB7` | `["metric","multi-part","barcode","empty-not-zero"]` |
| 5 | `KB7 pişmiş stokta hangi işler bulunuyor?` | `KB7` | `["status","stock-zone"]` |
| 6 | `1596497 nolu iş emrinin fire ve fire sebeplerini getirir misin?` | *(none)* | `["scrap","order","record-id","no-factory-named"]` |
| 7 | `Son 1 haftalık KB7 X hattının kamera performanslarını incele. Bariz düşük performans gösteren kameramız var mı? Performansları 3 grupta topla: 99+ iyi, 97+ ilgilenmesi gerekiyor acil değil, 96 ve altı acil düzeltilmeli.` | `KB7` | `["camera","equipment","analysis","threshold-grouping","known-failing"]` |
| 8 | `Granit Ham stokta bulunan arabaları, içlerindeki işleri, miktarları ve bekleme sürelerini getir.` | `Granit` | `["vehicle","stock","multi-field"]` |

**idx 3 carries a SUBSTITUTED personnel number.** The owner's real example was a
live Kale sicil. The synthetic injector is frame-only — no tool fires, nothing is
fetched — but the **utterance text persists in `telemetry_events`** and is
replayed by every subsequent lens run, and that ledger is specified PII-free.
`10100000` is a syntactically identical stand-in. The owner confirmed the real
number stays valid for manual testing; it must not enter the corpus.
**Do not restore the original number.**

`intended_tool_categories`: the column comment states these are *"admin-UI
filter/display convenience, never re-derived at read time"* — so choose sensible
values and do not agonise. They are not load-bearing and nothing routes off them.
Suggested: idx0 `["linestop"]` · idx1 `["metrics"]` · idx2 `["employee"]` ·
idx3 `["employee"]` · idx4 `["production","quality"]` · idx5 `["production"]` ·
idx6 `["quality","metrics"]` · idx7 `["machine","metrics"]` · idx8 `["logistics"]`.

## G2 · Tests
- v3 seeds on a clean state; a second run is a **no-op** (absence-only holds).
- v1 and v2 fingerprints unchanged and still no-ops — pin this explicitly; a
  shared-helper refactor that silently re-seeds v1 is the failure mode worth
  catching.
- The corpus fingerprint is stable across runs for identical input.
- A seeding failure does not throw out of boot.
- Utterance count is 9 and `idx` values are 0..8 with no gaps.

## G3 · Doc surface
Run `npm run reseal` and let `check:doc-drift` decide whether a reseal is
required — **the Architect is not asserting that it is or isn't**. If it bumps,
bump `docVersion` and append a manifest `reviewNote` entry **after the genuinely
last entry**, quoting that entry's verbatim title in your report. If no drift, say
so with the command output.

## SELF-VERIFY (literal captured output)
1. `git rev-parse origin/master` at start; branch head at end.
2. `npm test` before/after, delta explained.
3. `npm run build` — `check:doc-drift` result pasted.
4. `npm run lint` — clean.
5. NUL scan with a positive control ⇒ 0.
6. Each G2 test shown failing before and passing after where applicable.
7. **The nine utterance texts, pasted back from the source file**, so the
   Architect can byte-compare them against this table. Typos included.
8. Confirmation that `10100000` — not the owner's original number — is what is
   in the file.
9. CI green and unsharded on the PR head, from raw `conclusion` fields.

## DONE IS NOT DONE AT MERGE
The set exists only after deploy, when the warm-seeder next runs. Name, do not
produce, the evidence: the v3 row present in `synthetic_question_sets`, its
`seed_state` domain recorded, and v1/v2 still no-ops.

**Then the sequence that must not be skipped** (S66-3 — a before/after whose
population changed is not a measurement):
1. let round-robin cycle **at least 3 full passes** over the 9 utterances;
2. run the clarification lens and record **v3's per-set numbers as its baseline**,
   with the per-layer registry snapshot attached;
3. only then may a later phase be measured against it.

question-set-v2 has no baseline and its numbers therefore compare to nothing.
That mistake cost this session its headline. It must not be repeated one set
later.

<!-- TAIL ANCHOR — if you cannot see this line the relay arrived truncated;
     request a resend before starting (S61-3).
     END · PHASE-SYNTH-CORPUS-V3-v1 · 2026-07-26 · S66 -->
