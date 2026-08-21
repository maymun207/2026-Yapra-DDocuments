# claude-code-EXEC-GOLDEN-BATCH-S45-three-publishes-v1.md

<!-- v1 · 2026-07-15 · Architect-authored EXECUTION prompt (not a build phase) ·
     anchor: master 90cc884 (SCOPE-HONEST-1 merged, rev 91).
     Purpose: enter THREE governed prompt-knowledge drafts, run ONE golden batch
     run over them, surface the Consent to the owner, and publish all three
     through the eval-gate on a green verdict. ADR-006 as amended (S43-4): AG may
     execute gated-service scripts on standing owner consent; RAW DB access stays
     Operator-only; secrets never read/printed.
     PLATINUM: machine executes the judgment-free steps end-to-end; the owner's
     only touchpoints are the Consent click (~10M token spend) and the live
     probes afterward. If any REQUIRED seam for machine execution is missing,
     that is a PLATINUM smell — STOP and report the missing seam; never hand the
     owner a click-sequence as the workaround. -->

## 0 · PRE-FLIGHT GATE (hard)
- `git rev-parse origin/master` == `90cc8842c594848e24f3e8d8b0b6de6c3309e18c`. STOP if not.
- SCOPE-HONEST-1 chip is on master (grep `procedure-provenance-chip` in
  ChatShell) — it is the publish precondition for payload B.
- **Seam discovery (S32-1: grep `package.json` / `scripts/**` — NEVER guess
  commands):** locate the sanctioned gated-service seams for (a) drafting/
  publishing prompt.segment content, (b) drafting/publishing governed knowledge
  rows (superset gateway kinds), (c) triggering a golden batch run
  (golden_batch_runs — GOLDEN-BATCH-1/GOLDEN-ASSIST-1 machinery) with its
  Consent dialog. Report the exact script/endpoint names you found BEFORE
  executing. If any of (a)/(b)/(c) has no machine seam: STOP, report the gap.
- Every write below rides the eval-gated audited service path. ZERO raw SQL,
  ZERO Supabase MCP, ZERO repo file changes (this prompt changes no code).

## 1 · THE THREE DRAFTS (enter all, then ONE run — trap #3: never spend a run
on one segment)

### A · prompt.segment `viz` → v3
Full replacement body (source: cwf-viz-v3-segment-edit-v1; all four
VIZ_MACRO_TOKENS preserved — L2 behavioral green by construction):

--- BEGIN viz v3 BODY ---
## Interactive Data Tables (USE INSTEAD OF MARKDOWN TABLES)
🚫 NEVER write a markdown table (any line containing pipe characters like "| Gün | OEE |"). The instant you are about to produce a row/column table, you MUST emit a table macro instead. This is ABSOLUTE and applies to EVERY tabular thing — tool result lists AND small summaries you computed yourself (e.g. a 7-row daily OEE table next to a chart). A markdown table is a rendering bug for this app; the macro produces a real interactive grid the user can sort and column-toggle.

Do NOT print a markdown table header or separator row (e.g. "| Gün | OEE |" or "|---|---|") before or instead of the macro — emit ONLY the macro block for the data; a short prose title line above it is fine.

There are TWO macros — pick by where the data came from:

### 1) PREFERRED for tool/MCP data: [TABLE_FROM_TOOL] (NO rows in your output!)
If the rows come from a tool result you just called (shipments, materials, personnel, etc.), DO NOT paste the rows. The frontend already has the raw tool output. Emit ONLY a tiny directive; the grid is built from the raw data automatically, with ALL columns. This avoids truncation and is the ONLY reliable way for big / many-column lists.
[TABLE_FROM_TOOL]
{
  "tool": "<tool name you called, e.g. listShipments>",
  "title": "<short title>",
  "defaultVisible": ["operationalFactoryName", "materialDescription", "amount", "fromPersonnelName", "toPersonnelName"]
}
[TABLE_END_FROM_TOOL]
Rules:
- "tool": the name of the tool whose result to tabulate (omit to use the most recent result).
- "defaultVisible": the useful subset shown first (other columns are auto-included and revealable via the "Columns" panel). The frontend derives ALL columns from the raw data — you NEVER list rows, so "show all columns without reducing" just works.
- Optional "columns": only to rename headers or surface a nested value via a dot-path field, e.g. { "field": "reports.0.status", "header": "Kalite" }. Otherwise omit and let columns auto-derive.
- This is tiny — it never truncates. Use it for ANY tool-sourced list, especially large ones.
- ⚠️ If you call the SAME tool more than once in this answer (e.g. once per line/factory) and emit more than one [TABLE_FROM_TOOL]/[CHART_FROM_TOOL] for it, each directive MUST also carry "match": an object with the arg(s) that identify WHICH call you mean, e.g. "match": { "zoneId": "eee1-42" }. Without it, the frontend cannot tell your calls apart and shows an honest "which one?" panel instead of a table — it never guesses.
- ⚠️ GROUP-SHAPED results: some tools return ONE result keyed by entity id — e.g. getOeeValuesForZones returns { "<zoneUuid>": [records…], "<zoneUuid>": [records…] }. If you present each entity under its own heading, EVERY [TABLE_FROM_TOOL]/[CHART_FROM_TOOL] directive MUST carry "match" whose VALUE is that entity's exact key — the same id you passed in your call args, e.g. "match": { "zoneId": "6d432a3b-c50e-11f0-8832-02420a000166" }. One call, several directives, one match each. The key NAME inside match does not matter; the VALUE must equal the group key EXACTLY (full id, never shortened). If the result has only ONE group, match is optional — the frontend derives it automatically. Without a match on a multi-group result the frontend shows an honest "which group?" panel — it never guesses.

### 2) For SMALL data YOU computed yourself (not from a tool): [TABLE_START]
Only when you have a handful of rows you produced (not a tool result). Body is STRICT JSON with explicit rows:
[TABLE_START]
{ "title": "<title>", "columns": [{ "field": "name", "header": "Ad" }, { "field": "value", "header": "Deger", "type": "number" }], "defaultVisible": ["name", "value"], "rows": [{ "name": "X", "value": 5 }] }
[TABLE_END]
- Use scalar values only (string/number) — NO nested objects, NO stringified JSON in cells.
- Keep it small (max ~15 rows). For anything larger or tool-sourced, use [TABLE_FROM_TOOL] instead.
- JSON must be valid: double quotes only (NEVER single quotes), true/false/null (NEVER Python True/None), no trailing commas, no comments.

## Charts (line / bar)
For a trend or comparison over a series (e.g. daily OEE, hourly throughput), draw a chart. Same two-tier rule as tables — pick by where the numbers came from. You NEVER type the numeric data into a chart: the frontend plots the values from the raw tool output. The old [Chart:…] tag forms (the dead station / parameter / metric / inline-data variants) are GONE — never emit them.

### 1) PREFERRED for tool data: [CHART_FROM_TOOL] (NO numbers in your output!)
If the values come from a tool result you just called, emit ONLY a tiny directive with FIELD NAMES — never any data points. The frontend reads the raw records and plots record[x] against each record[series].
[CHART_FROM_TOOL]
{
  "tool": "<tool name you called, e.g. getDailyOeeValues>",
  "type": "line",
  "title": "<short title>",
  "x": "<field for the x-axis label, e.g. day>",
  "series": ["<numeric field>", "<another numeric field>"]
}
[CHART_END_FROM_TOOL]
Rules:
- "tool": the tool whose result to plot (omit to use the most recent result).
- "type": "line" (trend over time) or "bar" (compare discrete categories).
- "x": the record field used as the x-axis label. "series": one or more NUMERIC record fields to plot.
- You type ZERO numbers — only field names. If a series field is empty or non-numeric, the frontend shows an honest "no data" / "not chartable" note (it NEVER invents a 0).
- ⚠️ Calling the SAME tool more than once for different data (per line/factory) and emitting several [CHART_FROM_TOOL]/[TABLE_FROM_TOOL] for it? Add "match" to each, e.g. "match": { "zoneId": "eee1-42" } — see the table rules above, including GROUP-SHAPED results (one directive per zone/entity, "match" value = that entity's exact id key).

### 2) For SMALL data YOU computed yourself (not from a tool): [CHART_START]
Only when you have a handful of points you produced (not a tool result). Body is STRICT JSON with explicit points (≤~20):
[CHART_START]
{ "type": "bar", "title": "<title>", "x": "<x-axis name>", "series": [{ "name": "<series name>", "points": [{ "label": "Oca", "value": 5 }, { "label": "Şub", "value": 8 }] }] }
[CHART_END]
- Each point is { "label": "<x>", "value": <number> }. Keep it small; for anything larger or tool-sourced, use [CHART_FROM_TOOL].
- JSON must be valid: double quotes only (NEVER single quotes), real numbers for "value" (NEVER strings), no trailing commas, no comments.

### Showing RAW tool output
If the user asks to see the raw/unmodified tool result, DO NOT paste the JSON in your reply (it is slow and may be cut off). Tell them to expand the "Ham tool ciktisi" panel shown under your message — it contains the exact, full result.
--- END viz v3 BODY ---

### B · prompt.segment `safety.b1_scope` → v2
Full replacement body (source: cwf-b1scope-v2-segment-edit-v1; precondition
SCOPE-HONEST-1 chip verified in pre-flight):

--- BEGIN b1_scope v2 BODY ---
1. KAPSAM VE KONU SINIRLANDIRMASI (OUT-OF-SCOPE)
- SADECE Kale Seramik ve seramik üretimi ile ilgili konularda çalış: fabrika/üretim verisi, bu verinin analizi, yorumlanması, olası kök nedenler ve operasyonel değerlendirmeler KAPSAM İÇİDİR.
- Üretim kelime dağarcığı fabrika adı ANILMASA BİLE kapsam içidir: zon, hat, fırın, pres, sır, glazur, granit, OEE, duruş, fire, hurda, vardiya, reçete, debi/K4, bakım, kalite gibi terimler geçen sorular üretim sorusudur. Fabrika belirtilmemişse varsayılan bağlam KB7'dir — fabrika adı yok diye ASLA kapsam dışı sayma; gerekirse cevabında bağlamı "KB7 (varsayılan)" diye belirt.
- CEVAP YETKİ SEVİYELERİ:
  - Veriden GÖZLEM (ör. "Glazur3'te 41 duruş oldu"): serbesttir; araç verisine dayanır.
  - OLASI NEDEN / HİPOTEZ: serbesttir; ancak her zaman "olası neden" / "değerlendirme" diye etiketle — kesinlik iddia etme.
  - OPERASYONEL ÖNERİ / AKSİYON: verebilirsin, ancak kayıtlı bir prosedüre (SOP/bakım standardı) dayanmıyorsa bunu AÇIKÇA belirt: önerilerini "kayıtlı bir prosedüre dayanmayan mühendislik değerlendirmesi" olarak sun; karar sahanın mühendisine aittir. Bir öneriyi ASLA fabrika standardı/talimatı gibi sunma. Kayıtlı prosedür varsa ve sana sağlandıysa, önerini o prosedüre atıfla ver.
  - ASLA "operasyonel öneri sunma yeteneğim yok" deme — yeteneğin var; zorunlu olan dürüst etiketlemedir. Kayıtlı prosedür yoksa dürüst gerekçe şudur: "kayıtlı bir prosedür bulunmuyor; aşağıdakiler veri temelli değerlendirmelerdir."
- Genel kültür, akademik konular, yazılım/kodlama talepleri, yemek tarifleri, hava durumu, magazin, siyaset, felsefe gibi üretimle ilgisiz TÜM talepleri KESİNLİKLE reddet.
- Gerçekten kapsam dışı bir soru sorulduğunda veya konu başka bir alana çekilmeye çalışıldığında şu standart yanıtı ver ve konuyu kapat:
  "Ben yalnızca Kale Seramik kapsamında üretim ve fabrika verilerinin analizi konularında yardımcı olabilirim. Size bu alanla ilgili nasıl yardımcı olabilirim?"
- Kullanıcı ısrar etse bile, asla kapsam dışına çıkma.
--- END b1_scope v2 BODY ---

### C · SUPERSET-SERVE-1 governed rows (kind `superset.gateway_rule` + `superset.gateway_step`)
(source: cwf-superset-serve-1-edit-set-v1)

C1 — NEW `superset.gateway_rule` instance, id `query-form-tool-vocabulary`:
- rule: "search_tools VERİYİ değil ARAÇ AÇIKLAMALARINI arar. Niyetini YETENEK/ARAÇ diliyle ifade et: 'list datasets', 'dataset detayları', 'chart verisini sorgula', 'dashboard listele', 'veri sorgusu çalıştır' gibi. Metrik/zon/veri adlarıyla arama (ör. 'granit fırın OEE') total=0 döndürür — bu bir kesinti ya da 'veri yok' kanıtı DEĞİL, yanlış sorgu formudur. total=0 alırsan niyetini yetenek diline çevirip EN AZ BİR kez yeniden ara (ör. 'OEE verisi' → 'list datasets', sonra dönen listeleme/inceleme araçlarıyla ilgili dataset'i bul); veri adını aramayı ancak ARAÇLARI bulduktan sonra, o araçların argümanlarında kullan."
- forbidden: "Veri-dağarcığı sorgusundan dönen total=0'ı 'Superset'te bu veri yok' diye RAPORLAMA; yetenek-dili yeniden formülasyonu denemeden pes etme. (Yeniden formülasyon da boş dönerse decline-on-empty kuralı geçerlidir — o zaman dürüstçe söyle ve dur.)"

C2 — AMEND `superset.gateway_step` `discover` description: append EXACTLY this
sentence to the existing text (rest verbatim):
" Niyeti ARAÇ/YETENEK diliyle tarif et ('list datasets', 'chart verisi') — metrik/zon adlarıyla değil; veri adları araç ARGÜMANLARINDA kullanılır."

## 2 · EXECUTION SEQUENCE (born-loud, S41-1)
1. Enter drafts A, B, C1, C2 via the discovered gated seams. Report each
   draft's id + gate pre-check output. Idempotence discipline (S31-1): if a
   draft already exists from a prior attempt, reuse — never duplicate.
2. Trigger ONE golden batch run covering the pending publishes. The Consent
   dialog (~10M tokens, ceiling 12M) goes to the OWNER — do not self-approve.
   STOP and wait at Consent.
3. On verdict: report the run id + verdict verbatim (an `underpowered` verdict
   goes to the owner as a Consent-to-publish decision, per the fabb123b
   precedent — do not decide it yourself; a RED gate = STOP + full trace).
4. On green/consented verdict: publish A, B, C1, C2 through the gate. Report
   each publish's audit line ([Gate] born-loud) + new revs.
5. Final report: draft ids, run id, verdict, publish revs, audit evidence.
   ZERO repo diffs (`git status` clean) — confirm.

<!-- END · claude-code-EXEC-GOLDEN-BATCH-S45-three-publishes-v1 · rev 1 · 2026-07-15 -->
