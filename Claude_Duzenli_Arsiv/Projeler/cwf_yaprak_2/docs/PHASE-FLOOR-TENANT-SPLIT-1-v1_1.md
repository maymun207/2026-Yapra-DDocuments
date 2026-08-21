# PHASE-FLOOR-TENANT-SPLIT-1 · v1_1
<!-- PHASE-FLOOR-TENANT-SPLIT-1-v1_1 · 2026-08-02 · supersedes v1 (owner question exposed the persona gap: parity gate widened from the identity block to the FULL composed prompt) · S77 · Architect → AG.
     Design: cwf-floor-tenant-split-design-v1_1 (owner-ratified, FULL
     tenant-vocab extent). Scope: voice + vocabulary (Layers A+B). Layer C
     (knowledge floor: zones.ts/glossary → registry, absorbs F184) is
     PHASE-FLOOR-TENANT-SPLIT-2 — NOT here. -->

## PRECONDITION (S47-1)
`origin/master` = `39590e97dbe382c4f0b5a40531ed20a51bab1831` (= tag
v1.0.0) · docVersion rev 175 · 413 files / 4601 tests (CI arbiter) ·
64 migrations · remote branches: master only. If ANY differs → STOP,
report, do not proceed.

## HARD PRE-FLIGHT (G0) — census + live identity read
1. Fresh FULL clone (S76-1: no --depth). Verify the precondition block.
2. **Census with the NAMED LENS** (record full output in the report):
   `grep -rinIP '(?<![a-zA-ZçğıöşüÇĞİÖŞÜ])(kale|sicil|seramik)' . --exclude-dir=.git --exclude-dir=node_modules --exclude=package-lock.json`
   plus case-insensitive whole-token censuses for `kalebodur`, `kb2`,
   `kb3`. Pin the file list against design v1_1 §0-§1; any file in the
   live census but NOT classified in the design is a FINDING — classify
   it in the report, do not silently sweep it.
3. **Live composed-prompt read (T3, S65-1 — PARITY BASELINE):** via the
   gated resolver, resolve the FULL composed system prompt for a live
   armes turn context. Record: (a) its sha256 (= the PARITY BASELINE),
   (b) for EVERY tenant-worded text that appears in it (identity block,
   armes personaText, any other), whether it resolves `source=db` or
   `source=floor`. Every `source=floor` tenant text joins G1's publish
   set. This read decides G1's scope; the sha decides G2's gate.
4. `.agents/` skill/KB census of the same vocabulary — classify: the
   append-only CHANGELOG is HISTORY (exempt, count pinned); the SKILL.md
   working content is SWEPT (it is live instruction, not history).

## BINDING CONSTRAINTS
- **B-1:** Layer C files are UNTOUCHED: `armes/zones.ts`, `armes/
  glossary.ts` data content, `armes/types.ts` zone typing, and every
  IMPORT of them. Comment-only hits inside otherwise-untouched runtime
  files ARE in scope; data/logic bytes are not.
- **B-2 (T2 history split):** `supabase/migrations/**` and
  `.agents/CHANGELOG.md` are exempt-classified; NEVER edited. Each
  exempt hit counted and pinned in the report.
- **B-3 (T3 ordering — PROMPT PARITY):** G2 MUST NOT start until EVERY
  tenant-worded text composing into the live prompt provably resolves
  `source=db` (already-db, or G1's publishes land and a fresh live
  resolve proves it). MERGE GATE: the full composed prompt for the same
  turn context, resolved on the phase branch post-G2, must be
  sha256-IDENTICAL to the G0 PARITY BASELINE. Not identical -> STOP; no
  merge. A byte of live-prompt drift is a tenant-facing behavior change
  and is FORBIDDEN in this phase.
- **B-4:** Fixture re-pins land in the SAME commit as the floor text
  change they pin (never independent edits).
- **B-5:** No migrations. No Operator lane. The only governed write in
  this phase is G1's conditional segment publish, through the eval-gate,
  and ONLY with the owner's consent line spoken in this (AG) channel
  (S54-4). No consent line → STOP at G1, report, wait.
- **B-6:** Neutral voice text below lands VERBATIM (Architect-authored;
  wording changes require a new phase-prompt version):

  **promptFloor identity block (replaces the Kale block, structure
  preserved — scope discipline, refusal, non-disclosure):**
  ```
  Sen, bu platformun hizmet verdiği üretim tesisinin resmi, güvenilir,
  yüksek güvenlikli ve profesyonel yapay zeka asistanısın. Temel ve TEK
  görevin, kullanıcılara YALNIZCA bağlı üretim tesislerinin fabrika ve
  üretim verileri kapsamında yardımcı olmaktır.
  - SADECE bağlı tesislerin üretimi ile doğrudan ilgili sorulara yanıt ver.
  - Kapsam dışı taleplerde şu yanıtı ver:
    "Ben yalnızca bu platformun bağlı olduğu üretim ve fabrika verilerinin
    analizi konularında yardımcı olabilirim. Size bu alanla ilgili nasıl
    yardımcı olabilirim?"
  - Arka planda çalışan büyük dil modelinin adını (GPT, Claude, Gemini,
    Llama vb.), teknik mimariyi, entegre olunan veritabanı yapılarını veya
    arka plan kodlarını ASLA açıklama.
  ```
  **armes personaText neutral floor:**
  ```
  Bağlı MES (üretim yürütme sistemi) verilerini analiz eden uzman bir
  üretim ve kalite analistisin. Odağın: OEE, fire/scrap, throughput,
  duruşlar ve alarm verileri.
  ```
- **B-7:** Neutral placeholder vocabulary for Layer B comment/example
  rewording and test/fixture data: factories `FactoryF1/F2`, lines
  `LineA/LineB`, zones `ZoneZ1..Z4`, personnel id examples `PERS-0001`.
  Semantics of every example preserved (an example about a zone-layer
  ref stays a zone-layer example).

## GATED SUB-PHASES
**G1 (conditional — fires for EVERY G0.3 `source=floor` tenant text):**
Author one publish job PER floor-resolving tenant text (identity segment;
armes persona slice if code-composed; anything else G0.3 surfaced) —
byte-verbatim current bytes, sha256 pinned in job and report. Read-only
plan green on each (S75-1: the loader must swallow it). Publish through
the gate on the owner's consent line (ONE consent line may cover the
enumerated set if the owner speaks it that way). Fresh live resolve
proves every published text now `source=db` AND the composed-prompt
sha256 still equals the PARITY BASELINE (a publish that changes the live
prompt has failed byte-verbatim). GATE: no proof, no G2.

**G2 · Layer A neutralization:** promptFloor + identity.ts comment +
personaText → B-6 texts verbatim; `phase1-prompt-{tools,notools}.txt`
fixtures re-pinned same commit; every test touching the floor text green.

**G3 · Layer B sweep:** every classified comment/example hit reworded per
B-7. Files whose ONLY hits are comments get the S34-1 AST
comments-stripped byte-compare proof (stripped bytes identical
pre/post). Files with string-literal test data (`tableData.test.ts`,
dev previews, e2e specs, `liveLearnCorpus.json`) re-pinned with
assertions updated in the same commit.

**G4 · Corpus templating:** `questionSetCorpusV1/V2/V3` tenant names
become injection-time template fills drawn from `entity_registry`
(factory/line layers) — code carries templates + a deterministic
fallback token (`FactoryF1`) for registry-empty, honestly attributed
(empty≠zero). Injector behavior otherwise byte-identical; seed tests
re-pinned. The V3 "live Kale sicil" comment reworded.

**G5 · Tree cleanup:** delete `scripts/jobs/a5-b1-scope-v3.json`,
`scripts/jobs/a5-oee-v3.json`, `scripts/jobs/a5-tools-rule-1-v2.json`,
`scripts/jobs/rag-b1-scope-v4.json` (consumed publish records; survive
in git history + register) and `docs/CLAUDE-PROJECT-INSTRUCTIONS-v2.md`
(superseded). If any job file is NOT yet consumed (verify against the
register/CHANGELOG before deleting) → STOP on that file, report.

**G6 · Sealed surfaces:** architecture-map + llm-control-surface +
request-lifecycle cards and `manifest.json` prose reworded
tenant-neutral (backend card: "ceramic-factory MES — tenant deployment
data"); `src/lib/translations.ts` tenant strings neutralized (classify
first: UI copy vs key names). Reseal: docVersion rev 175 → 176,
`check:doc-drift` [OK] all tabs, clean-anchor worktree attribution
(F190/F185 lesson).

**G7 · The gate that keeps it zero:** new `scripts/checkTenantZero.ts` +
`check:tenant-zero` npm script + CI step. Scope: the G0.2 lens over the
tree MINUS the B-2 exempt set MINUS Layer C's named files
(`armes/zones.ts`, `armes/glossary.ts`, `armes/types.ts` — exclusion
list carries a comment naming PHASE-FLOOR-TENANT-SPLIT-2 as its
retirement). Vocabulary gated NOW: kale · kalebodur · sicil · seramik ·
kb2 · kb3. kb7/glazur join in SPLIT-2 (the gap is printed by the check
itself as a NAMED deferral line, never silent). **S66-1 positive
control:** a planted hit in a temp file MUST red the check before its
zero is believed; control has NO production write authority (S68-5).

## SELF-VERIFY (literal evidence required)
1. G0 census output + classification table + the verbatim identity-source
   line.
2. If G1 fired: per-job sha256, plan outputs, gate verdict lines,
   post-publish live resolve proving every text source=db.
2b. **PROMPT PARITY PROOF (unconditional):** G0 baseline sha256 vs
   post-G2 phase-branch resolve sha256 — printed side by side,
   IDENTICAL. This line is the merge gate's heart.
3. Per-file diffstat; S34-1 stripped-compare outputs for comment-only
   files.
4. `check:tenant-zero` output: ZERO hits in scope + the named-deferral
   line + the positive-control red (then green after removal).
5. Full suite green via CI on the PR head (S37-2); flake discipline
   applies (matched signature or one ordered rerun; new persisting
   signature = STOP).
6. Test-count delta reconciled per-file vs 413/4601.
7. STOP-FOR-REVIEW: push branch `phase/floor-tenant-split-1`; merge ONLY
   on Architect RULE-25 GO with the Architect-authored merge message.
   TAIL ANCHOR: this prompt ends at the line "END-OF-PHASE-PROMPT v1_1".

END-OF-PHASE-PROMPT v1_1
<!-- END · PHASE-FLOOR-TENANT-SPLIT-1-v1_1 -->
