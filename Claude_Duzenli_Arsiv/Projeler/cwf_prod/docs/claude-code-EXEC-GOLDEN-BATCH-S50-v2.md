# EXEC — GOLDEN-BATCH S50 · v2 (SELF-CONTAINED): viz v4 + behavior laws + b1_scope v3 + superset-serve-1

<!-- claude-code-EXEC-GOLDEN-BATCH-S50-v2 · rev 2 · 2026-07-17 · Architect-authored.
     SUPERSEDES claude-code-EXEC-GOLDEN-BATCH-S50-v1 (PLATINUM-BREACH-4: v1
     required the owner to coordinate a three-file relay; the relay unit must
     be ONE self-contained document). cwf-viz-v4-segment-edit-v1.md and
     cwf-behavior-laws-segment-edit-v1.md remain valid as design records;
     every payload they define is embedded VERBATIM below — you need NOTHING
     beyond this file and your working tree.
     Lane: AG executes the gated-service script per ADR-006 rev 2 (standing
     owner consent for gated-service scripts; raw DB stays Operator-only;
     secrets never printed — ADR-007).
     FREEZE RECORD: the owner granted an explicit ONE-TIME lift of the GOLDEN
     FREEZE for THIS batch ("evet", S50, 2026-07-17). The freeze RE-ENGAGES
     automatically after this batch's publish step.
     PLATINUM: single orchestrated run; owner touchpoints are exactly one
     consent dialog + post-publish real-world probes. -->

**PRECONDITION (S47-1):** Valid only while `origin/master == 3d115b9` (or a
later master containing it) and `cwf-publish-job-S45-viz3-b1scope2-superset-serve1-v2.json`
is present in your working tree. On mismatch: STOP and report actual state.

---

## 1 · Assemble the S50 job file

Create `cwf-publish-job-S50-viz4-behavior-superset-v1.json` FROM the S45 v2
job file. Loader contract (scripts/publishGovernedContent.ts): BOTH
`promptSegments[]` and `ruleInstances[]` arrays required, even if one is empty.

### 1.1 `promptSegments` — exactly 4 entries

**Entry 1 — `"segmentId":"viz"`, text = the S45 job's viz text with THREE
surgical edits applied verbatim:**

**E1 (table section, ⚠ GROUP-SHAPED bullet):** replace exactly this sentence:

> Without a match on a multi-group result the frontend shows an honest "which group?" panel — it never guesses.

with:

> Without a match on a multi-group result the frontend renders ALL groups honestly: a [TABLE_FROM_TOOL] becomes ONE combined table with a labelled "Grup" column; a line/bar [CHART_FROM_TOOL] with ≤12 groups becomes ONE multi-series chart with each group as a named series (names auto-resolved from this turn's tool results). Only above 12 chart groups does the honest "which group?" panel appear. It never guesses — omitting "match" MEANS "all groups".

**E2 (chart section, new bullet inserted immediately after the "You type ZERO numbers…" rule line):**

> - ⚠️ COMBINED CHART ("tüm hatlar tek grafikte" class): when the user wants SEVERAL entities in ONE chart, make ONE call to the multi-entity tool (e.g. getOeeValuesForZones with ALL the zoneIds) and emit ONE [CHART_FROM_TOOL] directive with NO "match" — the frontend plots every group as its own named series automatically. NEVER merge/compute the values yourself and NEVER use [CHART_START] to hand-type numbers that exist in a tool result: a hand-typed chart is unauditable and forbidden when the data came from a tool.

**E3 (chart section, ⚠ pointer sentence):** replace exactly:

> — see the table rules above, including GROUP-SHAPED results (one directive per zone/entity, "match" value = that entity's exact id key).

with:

> — see the table rules above, including GROUP-SHAPED results: per-entity headings → one directive per entity with "match"; ONE combined chart of all entities → one directive with NO "match".

Post-edit checks: all four VIZ_MACRO_TOKENS present ([TABLE_FROM_TOOL],
[TABLE_START], [CHART_FROM_TOOL], [CHART_START]); length < 8000; the string
`omitting "match" MEANS` occurs exactly once.

**Entry 2 — `"segmentId":"safety.b1_scope"`, text = the S45 job's b1_scope
text with this line APPENDED verbatim (no other change):**

```
- Bir tesis/fabrika/hat adının kapsam içi olup olmadığından EMİN DEĞİLSEN reddetme: önce getFactoryList ile kontrol et — o listede geçen her tesis (ör. SIR, KB7) Kale Seramik kapsamı İÇİDİR ve verisi normal şekilde sorgulanır. Sorgulamadan "kapsamım dışında" deme.
```

**Entry 3 — `"segmentId":"tools.rule.1"`, text verbatim:**

```
1. Kullanıcı veri istediğinde, liste istediğinde veya bir sorgu yaptığında MUTLAKA yukarıdaki araçları çağır. Soru eksik belirtilmişse (tarih/kapsam yok) KARŞI SORU SORMA — makul varsayımla ÇALIŞ ve varsayımını cevabının başında tek cümleyle beyan et: tarih verilmemişse resolve_time_range ile BUGÜNÜ al; kapsam verilmemişse TÜMÜNÜ al ("KB7'nin OEE'si" = KB7'nin BÜTÜN hatları). Kullanıcı isterse aralığı sonraki mesajında daraltır — önce iş, sonra ince ayar.
```

**Entry 4 — `"segmentId":"tools.rule.6"`, text verbatim:**

```
6. Birden fazla araç çağrısı gerekiyorsa sırayla çağır. KAPSAM SADAKATİ: kullanıcı bir fabrikanın/tümünün verisini istediyse, hat/birim listesindeki HER ögeyi sorguna dahil et — kendi seçtiğin bir alt kümeyi ASLA sessizce "fabrikanın verisi" diye sunma. Bir alt kümeye daraltıyorsan, hangi birimleri neden dışarıda bıraktığını cevabında açıkça yaz. Boş dönen birim de rapora dahildir ("X için bu aralıkta veri yok").
```

### 1.2 `ruleInstances`
Copied UNCHANGED from the S45 job (the superset-serve-1 set).

### 1.3 Pre-run self-check
JSON parses; segment ids ∈ the enum in `api/cwf/_lib/prompt/core/segmentIds.ts`;
no `{{TOKEN}}` occurs in any of the four texts (placeholder whitelist is empty
for all four); rule.1/rule.6 texts start with their own rule numbers ("1. ",
"6. ") matching the floor convention.

---

## 2 · Orchestration (dry-run-first; identity = production admin)

Actor for EVERY subcommand: `--as ksadmin@ardictech.com` (f4805bd1…;
maymun207@gmail.com has NO auth.users row).

1. `plan --job cwf-publish-job-S50-viz4-behavior-superset-v1.json --as ksadmin@ardictech.com`
   — read-only. Expected grammar (from the script): `CREATE|UPDATE <kindId>/<key>`
   lines + `[Plan] golden set size=N, reps=R, governed token ceiling=C`.
   REMEMBER (S49-1): CREATE vs UPDATE = findOwnDraft draft-reuse for THIS
   actor, NOT a diff of the published row; publish supersedes unconditionally.
   Paste the full plan output in your report. STOP if any line references a
   kind/key outside the 4 segments + the superset set.
2. `stage` — same job, same actor.
3. `golden` — raises the CONSENT DIALOG: **do not bypass or answer it
   yourself; surface it and wait — consent is the OWNER'S only touchpoint.**
   Chunked cron-background run (golden_runs + golden_run_chunks); spend
   clamped by governed quota.goldenRunTokenCeiling (clamp [1M,30M], seed 12M).
   Poll via the script/read seam — never raw DB.
4. Golden GREEN → `publish` — same job, same actor. Expect born-loud
   `[Gate] action=publish kind=prompt.segment key=<id> verdict=published`
   per segment (S41-1). A rejection surfaces loudly: read the 4xx body + the
   rule_audit trail, report verbatim, no blind retry.
5. Golden RED → STOP; report the failing lens/specimens verbatim; no publish.

---

## 3 · Report
Job file sha256 + per-segment text lengths; full plan output; golden run id,
chunk count, token spend vs ceiling; publish [Gate] lines; anomalies verbatim.
The Architect reads production logs independently; the owner closes the batch
with three live probes: ① "KB7 nin OEE degerlerini gunluk olarak cizermisin"
(no counter-question; assumption declared; all 7 zoneIds in args), ② "tum
hatlari tek bir grafikde cizelim" (ProvenanceCaption above the chart =
tool-bound; an empty zone appears as a NAMED gap series), ③ "SIR tesisinde
durum nedir" (no refusal; a real data query in the evidence line). Do NOT
declare the batch done — the probes close it.

<!-- END · claude-code-EXEC-GOLDEN-BATCH-S50-v2 · rev 2 · 2026-07-17 -->
