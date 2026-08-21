# CWF — SUPERSET-SERVE-1 Edit Set · v1

<!-- cwf-superset-serve-1-edit-set-v1 · rev 1 · 2026-07-15 · Architect-authored.
     Target: governed Superset knowledge rows (kinds `superset.gateway_rule` +
     `superset.gateway_step`, CORE). Teaching-not-inclusion: we teach the QUERY
     FORM; we never enumerate the tool catalog into the prompt.
     Evidence: trace `b251b9ea` — gateway ALIVE, search_tools ×2 returned total=0
     for DATA-vocabulary queries ("OEE …"); the model honestly declined and even
     spoke the authority doctrine unprompted. Diagnosis (bootstrap trap #6):
     search_tools searches TOOL DESCRIPTIONS, not data — total=0 on a
     data-vocabulary query is the untaught query-form, not an outage.
     Provenance half: already covered by live rules `attribute-source`,
     `metric-authority-armes`, `scope-from-datasource`, `scope-match-or-decline`
     (P6.8) — NO edit needed there; this set is the missing QUERY-FORM tooth.
     BATCHING (trap #3): edit 3 of 3 in the ONE golden run (~10M + one Consent),
     with viz v3 and b1_scope v2.
     DB-first: publish payload only; code floor (gatewayProtocol.ts) stays as-is —
     outage serves the current honest-but-under-taught floor. Floor sync folds
     into the next FULL phase touching that file.
     PLATINUM: teaches an automatic reformulation rule; no manual step created.
     S41-2 reachability note: these rows bind to the ALREADY-REACHABLE gateway
     tools (search_tools/call_tool are offered when superset is active) — not a
     dead publish. -->

## 1 · What changes
**E1 — ONE new `superset.gateway_rule` row** (id: `query-form-tool-vocabulary`):

- **rule:**
  "search_tools VERİYİ değil ARAÇ AÇIKLAMALARINI arar. Niyetini YETENEK/ARAÇ
  diliyle ifade et: 'list datasets', 'dataset detayları', 'chart verisini
  sorgula', 'dashboard listele', 'veri sorgusu çalıştır' gibi. Metrik/zon/veri
  adlarıyla arama (ör. 'granit fırın OEE') total=0 döndürür — bu bir kesinti ya
  da 'veri yok' kanıtı DEĞİL, yanlış sorgu formudur. total=0 alırsan niyetini
  yetenek diline çevirip EN AZ BİR kez yeniden ara (ör. 'OEE verisi' →
  'list datasets', sonra dönen listeleme/inceleme araçlarıyla ilgili dataset'i
  bul); veri adını aramayı ancak ARAÇLARI bulduktan sonra, o araçların
  argümanlarında kullan."
- **forbidden:**
  "Veri-dağarcığı sorgusundan dönen total=0'ı 'Superset'te bu veri yok' diye
  RAPORLAMA; yetenek-dili yeniden formülasyonu denemeden pes etme. (Yeniden
  formülasyon da boş dönerse decline-on-empty kuralı geçerlidir — o zaman
  dürüstçe söyle ve dur.)"

**E2 — `superset.gateway_step` `discover` row, description amendment** (append
one sentence to the existing text, rest verbatim):

> " Niyeti ARAÇ/YETENEK diliyle tarif et ('list datasets', 'chart verisi') —
> metrik/zon adlarıyla değil; veri adları araç ARGÜMANLARINDA kullanılır."

No other row changes. Provenance/authority rows untouched (already live and
observed working in trace `b251b9ea` — the model spoke "OEE, ARMES'ten alınan
yetkili bir metriktir" unprompted).

## 2 · Interaction notes (gate + doctrine)
- `decline-on-empty` stays fully compatible: the new rule inserts ONE mandatory
  reformulation attempt BEFORE the decline path; genuine emptiness after
  reformulation still declines honestly (empty≠zero untouched).
- `metric-authority-armes` still wins when ARMES is active: for OEE-class
  metrics with ARMES up, the agent uses ARMES; this rule serves the
  Superset-explicit and ARMES-down paths (SUPERSET-SERVE-1's actual goal:
  Superset can SERVE when addressed).
- Eval-gate: additive rows in existing CORE kinds — schema mirrors
  (SUPERSET_GATEWAY_RULE_MIRROR / STEP_MIRROR) already cover the fields;
  behavioral markers (never-fabricate/never-cross-reach) untouched.

## 3 · Acceptance evidence (post-publish)
- Golden gate green (all three batched edits in one run).
- Live probe (the trace-`b251b9ea` query verbatim): explicit "Superset'ten
  getir" ask → search_tools with capability vocabulary → non-zero candidates →
  discover-and-query proceeds; the answer carries datasource attribution
  (existing provenance rules) — Superset SERVES for the first time in prod.
- Negative probe: a metric genuinely absent from the bound datasource still
  yields the honest decline (post-reformulation), never a fabricated value.

<!-- END · cwf-superset-serve-1-edit-set-v1 · rev 1 · 2026-07-15 -->
