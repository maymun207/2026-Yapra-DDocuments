# Claude Code — PHASE 6.8: Cross-Backend Scope & Data-Authority Guard
**Artifact version: v1 · internal rev 1 · 2026-06-27**
*(Corrective for P6.7. Versioned per standing rule — do not overwrite prior phase prompts.)*

---

## WHY THIS PHASE EXISTS (read before touching code)

P6.7 (commit `8bd6166`) fixed the Superset **read path** (transport retry + SSE-first =
keep; param-shape hints = keep) but its premise about OEE was **falsified by live data**,
and one of its rules is **actively harmful**.

Live multi-turn traces (ARMES disabled, Superset active) established the ground truth:

- Superset has **genuine OEE data only for GRANIT** (datasets like `Granit - Hat Günlük OEE`, ClickHouse).
- A dashboard **titled** `KB7 - Yönetici Raporu` (id 5) **exists**, but it is a **shell**: all 29
  of its charts are bound to `Granit - …` datasources. **There is NO KB7-scoped OEE dataset.**
- Therefore "KB7" in Superset is a **label on Granit data**. `"olmalı" ≠ "var"` — it is not there.

Consequence: P6.7's `resource-identifier` rule hardcodes the worked example
`(ör. "Granit - Makine Günlük OEE" → id)` — it literally guides the model toward the Granit
dataset when asked for OEE. Combined with the softened decline (which now lets the model
**proceed** because `search_tools` is non-empty) and the **absence of any scope/authority
guard**, the most likely outcome of "KB7 OEE this week" is: model finds the KB7-titled /
Granit-bound resource → presents **Granit OEE as KB7 OEE** — the exact correctness/fabrication
error this project is architected to prevent, now *guided by the prompt*.

The model variance observed across providers (Sonnet caught the trap; Gemini Flash and GPT-4.1
did not reliably investigate) makes a **structural** guard mandatory — safety cannot depend on
the model being the smart one (RULE 5 / RULE 0 three-provider parity).

**This phase adds the guard and removes the harmful example. It does NOT touch transport,
the gateway, composers, eval-gate machinery, or ARMES. It does NOT re-seed.**

---

## HARD PRE-FLIGHT GATE — do ALL, paste evidence, STOP if any fails

1. `git log --oneline -1` → MUST be `8bd6166` (P6.6+6.7). Clean tree, `master`.
2. Baseline green and record the numbers:
   - `npx tsc -b` → clean
   - api strict-nodenext typecheck (source, tests excluded) → clean
   - `npx vite build` → built
   - `npx oxlint` → no errors
   - `npx vitest run` → **275 passed** (record exact count)
3. Open and read, confirm shapes (paste 2–3 line confirmations):
   - `api/cwf/_lib/knowledge/backends/superset/gatewayProtocol.ts` — `GATEWAY_RULES` array; locate
     the P6.7 rules `decline-on-empty`, `request-shape-from-description`,
     `recover-from-validation-error`, `resource-identifier`.
   - `api/cwf/_lib/knowledge/gate/evalGate.ts` — `SUPERSET_REQUIRED_MARKERS` (~L139).
   - `api/cwf/_lib/knowledge/reference/referenceData.ts` — confirm `...GATEWAY_RULES.map(...)` still
     seeds the rules (so new rules ride the floor + DB-baseline + seed, one source).
   - `api/cwf/__tests__/supersetDomain.test.ts` — the **no-enumeration guard** (forbids any of the
     22 underlying tool names appearing in the slice). Your new rule text MUST NOT introduce an
     exact underlying tool name. `list_*` / `get_*_info` wildcards are allowed (already used);
     `Granit`/`KB7` are **data labels**, not tool names, so they are fine — but **do not** add a
     literal underlying tool name.

If anything diverges from the above, STOP and report — do not improvise.

---

## CHANGES

### A) REMOVE the harmful Granit worked-example
In `gatewayProtocol.ts`, rule `resource-identifier`: **delete the `"Granit - Makine Günlük OEE"`
example** and make the example scope-neutral. The mechanic (find id via `list_*`, then call the
detail tool with `identifier=<id>`) stays; only the Granit-pointing example goes.

Replace its `rule` text with a neutral version, e.g.:
> `'Bir kaynağın (dataset/chart/dashboard) detay/inceleme aracı (get_*_info) genelde sayısal bir id veya UUID ister (identifier). id\'yi önce ilgili listeleme aracıyla (list_*) bul, sonra detay aracını identifier=<id> ile çağır.'`

(No concrete dataset name. `forbidden` stays as-is.)

### B) ADD four guard rules to `GATEWAY_RULES` (Turkish, matching pack i18n)

```
{
  // P6.8. Scope is determined by the underlying DATASOURCE, never by a resource's
  // TITLE. A dashboard titled "KB7 - ..." whose charts are all bound to "Granit - ..."
  // datasources contains GRANIT data, not KB7 data (live-verified: KB7 dashboards are
  // Granit shells). This is the rule that makes a weak model do what Sonnet did.
  id: 'scope-from-datasource',
  rule: 'Bir kaynağın (dashboard/chart/dataset) BAŞLIĞI/ADI veri KAPSAMINI BELİRLEMEZ. Gerçek kapsam, bağlı olunan underlying datasource/dataset adından belirlenir. Örn. başlığı "KB7 ..." olan bir dashboard\'ın grafikleri "Granit - ..." datasource\'larına bağlıysa, o veri KB7 değil GRANIT kapsamındadır. Kapsamı her zaman bağlı datasource\'dan DOĞRULA, başlıktan VARSAYMA.',
  forbidden: 'Bir kaynağın başlığındaki etikete (ör. "KB7") bakıp içindeki veriyi o kapsamda SAYMA; underlying datasource adını kontrol etmeden kapsam ATAMA.',
},
{
  // P6.8. Sibling of empty≠zero: wrong-scope ≠ the answer. If the only data found is a
  // different scope (Granit), say the requested scope (KB7) is not visible — never substitute.
  id: 'scope-match-or-decline',
  rule: 'Kapsamlı bir soruyu (ör. "KB7 OEE") YALNIZCA kapsamı isteğe (KB7) uyduğunu DOĞRULADIĞIN veriyle yanıtla. Bulduğun tek veri farklı kapsamdaysa (ör. Granit), istenen kapsamın (KB7) aktif backend\'de GÖRÜNMEDİĞİNİ açıkça söyle. Bu, "BOŞ ≠ SIFIR"ın kardeşidir: YANLIŞ-KAPSAM ≠ doğru cevap.',
  forbidden: 'Farklı-kapsam veriyi (ör. Granit OEE) istenen kapsamın (KB7) cevabı olarak SUNMA veya İKAME ETME.',
},
{
  // P6.8. Superset is BI/exploration, not the authoritative MES. Always attribute.
  id: 'attribute-source',
  rule: 'Superset\'ten gelen veriyi her zaman kaynağıyla etiketle: bu bir BI panosu/keşif verisidir, authoritative MES (ARMES) DEĞİLDİR. Bir sayı sunarken hangi datasource\'dan ve hangi kapsamdan geldiğini açıkça belirt.',
  forbidden: 'Superset BI rakamını, authoritative MES metriği gibi etiketsiz/kaynaksız SUNMA.',
},
{
  // P6.8. OEE / scrap / throughput are ARMES-authoritative (getDailyOeeValues, K4).
  id: 'metric-authority-armes',
  rule: 'OEE, fire/scrap ve throughput (debi/K4) ARMES-authoritative metriklerdir. ARMES aktifse bu metrikler için ARMES kullanılır. ARMES aktif DEĞİLSE ve istenen kapsam Superset\'te gerçekten yoksa, bu metrik için authoritative kaynağın (ARMES) GEREKTİĞİNİ söyle.',
  forbidden: 'OEE/fire/throughput için, istenen kapsam Superset\'te yokken benzer-etiketli BI verisinden bir DEĞER UYDURMA.',
},
```

### C) Eval-gate markers (additive — machinery untouched)
In `evalGate.ts`, append to `SUPERSET_REQUIRED_MARKERS` the `forbidden` substrings of the two
**safety-critical** new rules, so a poison that strips them fails `stageBehavioralSuperset`:

```
GATEWAY_RULES.find((r) => r.id === 'scope-match-or-decline')?.forbidden ?? 'İKAME ETME',
GATEWAY_RULES.find((r) => r.id === 'metric-authority-armes')?.forbidden ?? 'UYDURMA',
```
(Only the array literal changes — do NOT touch `runGate`, `GATE_STAGES`, the schema interpreter,
or the ARMES path.)

### D) Tests (add to `api/cwf/__tests__/supersetGate.test.ts`, a `P6.8` describe block)
- Floor render (`renderSupersetSliceFrom`/code baseline) contains `scope-from-datasource`,
  `scope-match-or-decline`, `attribute-source`, `metric-authority-armes` rule text.
- DB-composed render (`composeSupersetContext([...])`) carries the same (governed path).
- Poison that DROPS `scope-match-or-decline` → `composeSupersetContext` candidate fails
  **behavioral** (marker missing).
- Assert the Granit example string `"Granit - Makine Günlük OEE"` **no longer appears** in the slice.
- Re-run `supersetDomain.test.ts` no-enumeration guard → still green (no underlying tool name leaked).
- `promptSnapshot.test.ts` → ARMES byte-identical (no ARMES file in diff).

### E) Docs (RULE 3 — part of "done")
- **CHANGELOG**: dated entry. Record the **data reality** (KB7 OEE absent from Superset; KB7
  dashboards are Granit shells), that P6.7's Granit example was harmful and is removed, and the
  guard added. Keep the falsified-premise trail (don't rewrite history; ⚠️-note it).
- **AGENTS.md**: extend the Superset/active-backend rule (RULE 9/10) with: *scope is set by the
  underlying datasource, not the title; OEE/fire/throughput are ARMES-authoritative; never
  substitute wrong-scope BI data; always attribute Superset as BI-not-MES.*
- **SKILL.md**: update the Superset KB section with the scope-by-datasource trap (named example:
  the KB7-titled / Granit-bound dashboard) and the metric-authority split.
- **ROADMAP**: add P6.8 (guard); note the remaining **P7** item — a **deterministic runtime
  scope validator** (Superset answer claims "KB7 …" but producing tool-results' `datasource_name`
  is `Granit …` → flag) as the third defense layer mirroring ARMES `groundingCheck`. Do NOT build
  it now; do NOT bolt on a fragile regex.

---

## HARD CONSTRAINTS (non-negotiable)
- **FROZEN — empty diff required:** `_lib/llm/gateway.ts`, `composeArmes.ts`, `composeSuperset.ts`,
  `prompt/assemble.ts`, transport (`executeMCPTool`/`connectMcp`/discovery), all ARMES files.
- **Eval-gate:** only the `SUPERSET_REQUIRED_MARKERS` array literal may change. Machinery (runGate,
  GATE_STAGES, schema interpreter, ARMES path) byte-identical; `evalGate.test.ts` 6/6 green.
- **ARMES byte-identical:** `buildSystemPrompt(ctx, [])` and `(ctx, ['armes'])` unchanged
  (`promptSnapshot` green). The Superset slice appears only when `'superset'` active.
- **No-enumeration guard stays green** — no literal underlying tool name in any new rule.
- **NO RE-SEED in this phase.** The new rules ride the code floor + DB-baseline + seed source, but
  the runtime composes from the **existing P6.5 DB rows** until the owner re-seeds. That is the
  intended safe staging — leave it dormant. (Re-seed happens in the handoff, WITH the guard.)
- No new dependency, no `.env`/token, no mutating Superset call, no migration.

---

## SELF-VERIFY CHECKLIST (paste evidence per line; no summaries)
- [ ] Pre-flight: on `8bd6166`, clean; baseline 275 green (all five checks).
- [ ] A: Granit example removed; `resource-identifier` example is scope-neutral; grep proves
      `"Granit - Makine Günlük OEE"` absent from `gatewayProtocol.ts` and from the rendered slice.
- [ ] B: 4 guard rules present in `GATEWAY_RULES`; render floor AND `composeSupersetContext` both
      carry them (test output pasted).
- [ ] C: 2 markers added; `evalGate.ts` diff is the array literal ONLY (paste the diff).
- [ ] D: P6.8 tests pass; poison-drops-`scope-match-or-decline` → behavioral fail (pasted);
      no-enumeration guard green; `promptSnapshot` green.
- [ ] E: CHANGELOG/AGENTS/SKILL/ROADMAP updated.
- [ ] Frozen paths empty-diff (paste `git diff --name-only` and confirm gateway/composers/assemble/
      transport/ARMES absent).
- [ ] Full green: `tsc -b` · api nodenext · `vite build` · `oxlint` · `vitest` (new count = 275 + new).
- [ ] Commit prepared but **NOT pushed** until I review (or push to a branch). Re-seed deferred to handoff.

---

## HANDOFF — AFTER I review the diff (owner-run, do NOT do in this phase)

1. **Re-seed** (`scripts/seedRules.ts`, service role) — publishes the guard + corrected rules into
   the governed DB (this is when they go live; idempotent).
2. **Deploy**, then **3-provider acceptance** (RULE 0 parity), ARMES **disabled**, ask
   **"KB7 OEE this week"** on **Gemini Flash, GPT-4.1, Sonnet 4.6**. Paste each `telemetry_events`
   trace. Expected on ALL three (no Granit-as-KB7 on any):
   - **If KB7 is NOT a genuine filterable value in any Superset OEE dataset** (current evidence):
     the model states KB7 OEE is **not visible in the active backend / needs ARMES**, and (at most)
     offers that Superset has **Granit-scope** OEE — clearly labeled Granit, BI, not KB7.
   - **If the owner confirms KB7 IS a real filterable column-value** in a Granit OEE dataset: the
     model may answer with rows it has **verified** isolate KB7, **attributed** ("Superset BI;
     Granit dataset, KB7 filtresi"). Only then.
3. Only after this passes does **Fix B** (`execute_sql` SELECT-is-read) become safe to consider —
   never before the guard. **Fix D** (guaranteed final message) is independent and fine anytime.

---

### OPEN DATA QUESTION FOR THE OWNER (sets the acceptance branch above)
Does any Superset OEE dataset (e.g. `Granit - Hat Günlük OEE`) contain a column whose value
identifies **KB7** (a line/fırın/tesis code), making KB7 OEE genuinely derivable by filtering — or
is KB7 a separate facility with **no** OEE data in Superset yet (so the only correct answer is
"needs ARMES")? The guard is correct either way; this only sets what the acceptance test should show.
