# CWF / EAIP — Açık İş Kaydı (Open-Items Register)
**rev 3 · 2026-06-30 · HEAD `48d345a` (viz-restore unit complete, canlı)**

v2'den farkı: DOC-2, P-2A, P-2B kapandı (viz-restore birimi tamam); standing-rule seti empty≠zero-at-render + viz-FROM-TOOL-directive ile genişledi; `provider_audit` migration uygulandı.

---

## ✅ AGREED SEQUENCE (kararlaştırılan sıra)
1. **(bitti)** Living-doc reconciliation = **DOC-2**.
2. **(bitti)** **P-2A** (viz tables) → **P-2B** (viz charts) = viz-restore birimi tamam.
3. **(bu adım)** Açık-iş kaydı v3 + KB v7 + bootstrap v6 — checkpoint.
4. **Sıradaki:** **PROV-3** → **PL-1 F-obs**.

---

## 0. Bu session-line'da KAPATILANLAR (artık açık değil)
- **DOC-2** (merge `347e80e`; code `9d58536`) — living-doc reconciliation. 5 diyagram **DOC-1 doğumundan beri ilk kez gerçekten** koda reconcile edildi (önceki "sync"ler manifest sayı-bump'ıydı). Tablo-sayısı tutarsızlığı (Arch Map "13" vs Request Lifecycle "12") → **gerçek 18** (`verifyGrants 18/18`); drift-guard **glob boşluğu kapatıldı** (`api/cwf/chat.ts`→`api/cwf/*.ts`); 3 sapma da kod-doğrulandı (roles→users, domain_editor→power_user deprecated alias, governance footer zaten rev 2). Doc-only → manifest `768bd6d`'e mühürlendi.
- **P-2A** viz tables (merge `e9fbee3`; code `5006194`, seal `40301cb`) — 42-satırlık drop-stub → gerçek renderer. `DataTable.tsx` (sort + column-visibility, bağımlılıksız, shadcn üstüne). `[TABLE_FROM_TOOL]` satırları `rawToolResults`'tan (model sıfır değer); `[TABLE_START]` sınırlı escape. Ölü sim chart makroları prompttan söküldü. **İlk post-DOC-2 lock-step sınavı** — iki-commit seal pattern kanıtlandı.
- **P-2B** viz charts (merge `48d345a`; code `71b466a`, seal `b1a6fbf`) — `[CHART_FROM_TOOL]` (field-names-only) + `chartData.deriveChartData` (rawToolResults'tan seri; model sıfır sayı) + `MessageChart.tsx` (bağımlılıksız SVG line/bar). Tüm eski chart makroları emekliye ayrıldı (dead-sim + model-typed `data=`). empty≠zero dört-yönlü (real-0=data, missing=gap, empty="veri yok", non-numeric="not chartable"). Tablo parse-fn gövdeleri byte-identical. `TABLE_*`→`VIZ_MACRO_INSTRUCTIONS`.
- **`provider_audit` migration** — Maymun bu session **uyguladı**; PROV-2 audit-trail tam canlı.

---

## 1. PARK EDİLEN — sıradaki adım

**PROV-3 · `shared/llmGateway/*` fallback'ini registry'ye konsolide et** *(açık — sıradaki commit'li adım)*
İkinci provider yüzeyi (non-streaming fallback) hâlâ kendi provider def'lerini taşıyor → tek kaynağa (PROV-1 registry'si) indir.

**PL-1 · F-obs gözlemlenebilirlik backbone** *(PROV-3 sonrası, load-bearing)*
OTel → self-hosted Langfuse. F-obs1 (OTel SDK + LangfuseSpanProcessor bootstrap + AI SDK `experimental_telemetry` + serverless force-flush) · F-obs2 (manuel span'lar `executeMCPTool`/DB-read + per-turn trace id + session=conversationId) · F-obs3 (redaction boundary span-processor seviyesinde + `telemetry_events` ledger vs tracing ADR). 3 adlı tuzak: full-I/O redaction, serverless force-flush (stream fonksiyonu donar), OTLP/HTTP-only (gRPC desteklenmez).

---

## 2. PLANLANAN — gelecek fazlar
- **PL-2 · Eval golden harness.**
- **PL-3 · `docs/ARCHITECTURE.md` + formal ADR'lar** (OBS-1 · Phase-F · DOC-1 · PROV-1 — şu an CHANGELOG/Decisions tab'da, formal dosya yok).
- **PL-4 · Tam Tool Routing tab** (per-category edit; OBS-1 sadece view+clear getirdi).
- **PL-5 · Deny/quarantine UI** (Phase D-core'dan deferred).
- **PL-6 · Cross-source reconciliation (Phase E)** — forged-label DETECTION; ARMES-on data-comparability'ye gated.
- **PL-7 · LangGraph bridge (Shape B)** — `runAgent` extraction first.
- **PL-8 · Self-improving KB (Phase 7+ vizyon).**

---

## 3. TEKNİK BORÇ
- **TD-1 · Superset runtime empty≠zero validator (P7)** — facts-ledger hâlâ ARMES-zone-specific; Superset 2 katman (prompt+eval-gate) vs ARMES 3. Kırılgan regex YOK. *(Not: empty≠zero artık RENDER katmanında da var — N44 — ama bu prompt/veri katmanı validator'ından ayrı.)*
- **TD-2 · Phase D forged-label limit** — single-source self-consistent in-scope forged-label scope-divergence'ı atlatır; contained, not detected (PL-6 = detection).
- **TD-5 · DOC-1 drift-guard WARN→FAIL** — **bilinçli ertelendi (yeni gerekçe):** build-time FAIL, karışık code+doc fazlarının iki-commit seal akışını kırar (henüz var olmayan SHA'ya `lastSyncedCommit` bump'lanamaz). Doğru yeri PR/merge katmanı, kendi fazında. *(Map artık reconcile + glob-fix'li, yani teknik olarak hazır; sadece build-FAIL değil PR-gate olarak.)*
- **TD-6 · `index.html` statik docVersion span drift** *(YENİ, kozmetik)* — rev 3'te, manifest rev 4. Runtime facts-JSON ile overwrite ediliyor (gösterilen değer doğru). Bir sonraki doc-touch'ta `rev 4`'e çek; başlı başına commit'e değmez.
- **TD-4 · küçük kod nit'leri** (taşınıyor): OBS-1 clearAll match-all idiom · `bumpEpochAndClear` non-atomic (benign) · Phase F pozisyonel `BACKEND_IDS[1]` · `/api/admin/rules/[id]` `url.parse()` DEP0169.

---

## 4. OWNER-ACTION
- **OA-1 · viz live acid test** *(açık)* — gerçek ARMES tool → sortable grid + chart → reload → boş-liste; running app + ARMES MCP + Supabase auth gerekir. Yapısal+birim-kaplı, canlı teyit eksik.
- **OA-2 · `seedRules.ts`** (Superset rule_kinds publish — durumu teyit) · **OA-3 · `backend_id:'superset'` backfill** (teyit) · **OA-4 · real-ARMES confidence pass** (muhtemelen kapanabilir).
- *(provider_audit migration → ✅ uygulandı.)*

---

## Architect-önerisi öncelik
Kararlaştırılan sıra geçerli: **PROV-3 → PL-1 F-obs.** F-obs tüm gelecek test/optimizasyon altyapısı olduğu için PROV-3'ten hemen sonra güçlü aday. OA-1 (viz live test) PROV-3'ten önce koşulabilir ama hard-blocker değil — app bir sonraki açıldığında batch'lenebilir.
