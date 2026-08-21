# PHASE-CHART-CANDIDATE-1 · v1 — LANE: AG-2

<!-- 2026-08-06 · S83 · Architect: Claude (Opus 5) → Author: AG-2 (fresh lane).
     Closes: BUG-031 (two-chart trap / no candidate selection). Rollout 2F.0d.
     SOTA criterion: Gaia2 (candidate selection under ambiguity; Tier C).
     Queue position 2 (bucket v21 §BUG.5). ONE self-contained relay (D-2).
     Branch: phase/chart-candidate-1.
     Migrations: ZERO. Operator steps: ZERO. Governed publishes: ZERO —
     GATEWAY_RULES flows from code into compose directly (composeSuperset.ts:15
     → render.ts; verified by Architect recon this session). This phase is a
     code-seed rule change plus its tests. Design rationale is embedded below;
     no separate design note exists for this phase. -->

---

## §BASE · PROOF FIRST (S82-4)

```
git -C <ABS_PATH_TO_MAIN_CLONE> fetch origin --quiet
git -C <ABS_PATH_TO_MAIN_CLONE> worktree add <ABS_PATH>/wt-chart-candidate-1 -b phase/chart-candidate-1 origin/master
cd <ABS_PATH>/wt-chart-candidate-1
git rev-parse origin/master   # record VERBATIM — the anchor MAY have moved past
                              # 40085d62… if AG-1's phase merged first; a moved
                              # base is NOT a stop condition for THIS lane, but
                              # it MUST be recorded and the suite baseline taken
                              # on the base you actually stand on
git rev-parse HEAD            # MUST equal the origin/master you just recorded
git symbolic-ref --short HEAD # MUST print phase/chart-candidate-1
npx vitest run 2>&1 | tail -3 # baseline counts VERBATIM in the report
```

Every write uses an ABSOLUTE path (S80-1) — two lanes are live and the cwd is a
variable. Any local half-work from a previous lane: discard, clean cut.
**Lane fence:** your diff surface is `gatewayProtocol.ts` + its test file +
(only if a byte-read proves it necessary) `composeSuperset.ts`/`render.ts`
pass-through. You do NOT touch `stageTools.ts`, `stageStream.ts`, `memoryDistill.ts`,
`EpisodesRepository.ts`, or anything under `src/` — those are AG-1's live
surface this cycle. If you believe the fix requires crossing this fence, STOP
and report; do not improvise.

## §DIAGNOSIS (embedded — the owner-ratified evidence, bucket v21 BUG-031)

Superset holds two similar charts for the same subject: **ID 85**
(`echarts_timeseries_bar`, 5 rows, per-line series) vs **ID 94**
(`big_number_total`, 1 row, one aggregate). Search is flat text, no stemming:
`"sarfiyat"` → 85 (the chart) · `"sarfiyatı"` → 94 (the single number) ·
`"tüketimi"` → 0. Whether the model finds the RIGHT chart depends on the SEARCH
WORD — and although `viz_type` is returned to us, NO rule filters candidates by
shape. The model treats whatever single candidate a lucky-or-unlucky word
returned as THE answer.

The remedy is three owner-ratified selection rules (verbatim from the bucket):
1. when a CHART is requested, `big_number_total` alone is NOT sufficient;
2. single-candidate suspicion → re-search with the word ROOT;
3. still ambiguous → ask the user BY NAME.

## §G1 · THE THREE RULES ENTER `GATEWAY_RULES` (`gatewayProtocol.ts`)

Author THREE new rule entries in the existing house style of that file (each an
`id` + Turkish `rule` + Turkish `forbidden` where a forbidden clause is
load-bearing — study the existing entries first; match their voice, their
uppercase-emphasis convention, and their evidence-comment style, citing BUG-031
and the 85-vs-94 turns in a leading comment exactly as `cross-type-search` cites
its turns):

- **`chart-shape-filter`** — when the user's ask is a CHART/graph/trend
  ("grafik", "çiz", zaman serisi, kırılım), a candidate whose `viz_type` is
  `big_number_total` (or any single-value shape) is NOT an acceptable final
  answer BY ITSELF: it may be reported as a companion total, but the turn must
  keep searching for a chartable shape before concluding. Forbidden: presenting
  a single-number result AS the requested chart, or concluding "chart yok" while
  only single-value shapes were examined.
- **`root-research`** — a SINGLE candidate returned from ONE search word is a
  SUSPICION, not a conclusion: before settling, re-search at least once with
  the word ROOT / a stemmed or shorter variant (ör. "sarfiyatı" → "sarfiyat",
  "tüketimi" → "tüketim") and with an obvious synonym when one exists. Turkish
  suffixes change result sets — one lucky word is not coverage. Forbidden:
  treating one flat-text hit list as the complete candidate space.
- **`ambiguity-ask-by-name`** — when after root-research two or more plausible
  candidates remain (ör. a timeseries AND a total over the same subject), do
  NOT pick silently: list the candidates TO THE USER by name and id (ör.
  "Gaz Sarfiyatı — hat bazında zaman serisi (85)" vs "Toplam Gaz Sarfiyatı —
  tek sayı (94)") and ask which one. Forbidden: silent tie-breaking by search
  rank; forbidden: asking when root-research already left exactly ONE
  shape-appropriate candidate (an unnecessary question is its own failure —
  rule 1 + rule 2 must run BEFORE this rule can fire).

Rules are DATA for the model, not code branches — this phase adds NO
imperative candidate-filtering code path; the protocol file is the seed and the
compose path carries it (verified: `composeSuperset.ts:15` → `render.ts`). Keep
each rule's text self-contained: the model sees the rule, never this prompt.

## §G2 · TESTS (the gate's self-test, D-5, both directions)

- The gatewayProtocol test file pins: three new ids PRESENT · rule/forbidden
  non-empty · the BUG-031 evidence comment present · total rule count bumped by
  exactly 3 (an accidental deletion of an old rule must FAIL the test).
- `evalGate.ts` imports `GATEWAY_RULES` (read-only consumer): run the gate's
  own suite and QUOTE the result — the eval-gate is unbypassable and "no gate
  change" means byte-identical engine; your change must pass THROUGH it, not
  around it. If any golden/eval fixture pins the rule count or compose output,
  update the FIXTURE (never the engine) and list every touched fixture in the
  report.
- Compose-path proof THROUGH THE SEAM (S75-1 spirit): a test that renders the
  Superset compose output and asserts the three rule texts arrive in it — the
  seam's own loader swallowing the rules, not a hand-read of the constant.
- Mutation control both directions: delete ONE new rule entry → the pin test
  FAILS; restore → green. Quote both runs.

## §CI · GATES

All five standing CI gates green (eval-canary structurally skipped on PR is not
a failure) · full suite green, baseline → final counts verbatim ·
`check:tenant-zero` NOTE: your rule texts NAME chart ids 85/94 and words like
"sarfiyat" as EVIDENCE — before writing them into rule text, grep the
tenant-zero gate's token list; if any evidence word is a fenced tenant token,
keep that word in the leading CODE COMMENT (evidence) and out of the RULE TEXT
(runtime), and state in the report which side each landed on. The gate decides,
not taste.

## §REPORT (touch 2 — ONE file, `docs/relay/PHASE-CHART-CANDIDATE-1-report.md`)

§BASE proof verbatim (including the anchor you actually stood on) · the three
rule entries QUOTED in full · eval-gate suite result · compose-seam test
evidence · both mutation runs · fixture list (or "ZERO fixtures touched") ·
test counts before/after · tenant-zero verdict on evidence words · **push the
branch to origin BEFORE the report's final line** (work not on origin does not
exist — S83 law).

Then STOP. No merge without the Architect's GO (touch 3) — it will arrive with
the verbatim merge message and the blocking CI-verification STEP 1. Merge order
across lanes is the Architect's alone; you may be asked to re-prove your base
after AG-1's merge lands. Merge will be `--no-ff`; squash is banned.

## §POST-DEPLOY PROOF (named now, read by the Architect after merge — S63-1)

P1: the BUG-031 turn shape re-run live — "gaz sarfiyatı grafiği" class ask →
either chart 85 drawn or a by-name question listing both; never a silent 94.
P2: Vercel log shows the re-search actually happened on a single-hit word
(two `search_tools` calls in one turn where one used the root). The Architect
reads both; the phase's DONE is P1+P2, not the merge.

<!-- END · PHASE-CHART-CANDIDATE-1 · v1 -->
