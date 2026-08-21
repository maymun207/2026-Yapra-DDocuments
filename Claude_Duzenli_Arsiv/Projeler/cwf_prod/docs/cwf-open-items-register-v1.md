# CWF / EAIP — Açık İş Kaydı (Open-Items Register)
**rev 1 · 2026-06-30 · HEAD `1c2e0a7` (Phase F, canlı)**

Bu session'da kapatılanların ardından açık kalan her şey. Üç ana kova + owner-action + docs.

---

## 0. Bu session'da KAPATILANLAR (referans — artık açık değil)
- **OBS-1** (`a3d11d9`) — test observability: no-redeploy routing-cache clear (epoch) + per-turn `[ToolRoute]` trace log. Canlı, doğrulandı.
- **UI-1** (`d0b91a0`) — admin portal-theme escape (ghost dropdown) + RoutingTab keyword-column clip. Canlı, doğrulandı.
- **Phase F** (`1c2e0a7`) — backend-aware tool filter: gateway exemption (Superset `offered=4/4`, eski `0/4`) + `metrics` kategorisi (ARMES OEE → canonical tools, `canonicalOEE=present`). **Her iki yarı da canlı `[ToolRoute]` ile doğrulandı.**
- **OEE/Superset bug + cold-cache sorusu** — Phase F ile çözüldü. `metrics` kategorisi OEE'yi deterministik route ediyor (`path=keyword`, router/cache bağımsız) → OEE için cold-cache kırılganlığı moot. (cold-cache test protokolü v2 → OEE için **superseded**.)

---

## 1. PARK EDİLEN — sıradaki adım (hemen alınabilir)

**P-1 · Gemini Lite path sapması** *(bu session'da işaretlendi, "düzeltmemiz lazım")*
gemini-flash-lite chat provider olarak diğer sağlayıcıların tool-assembly path'inden farklı davranıyor: OEE testinde Run 3 clarification sordu, Run 4'te tool listesi yoktu. Şüphe: router modeli (gemini-flash-lite) aynı zamanda chat provider olarak kullanılınca path coupling. → izole tekrar üret, path'i diğer sağlayıcılarla hizala.

**P-2 · Viz-restore** *(memory + bu session)*
Tool-result zengin render (tablo/grafik) hâlâ stub'a degrade. Phase F sonrası OEE **verisi geliyor** ama tablo/grafik çizilmiyor. Ayrıca `cwfConstants`'ta ölü simulation chart macro'ları temizlenmeli. Frontend, parallel-safe.

**P-3 · Session-graph KB → v6 + bootstrap prompt v5** *(bu session'da teklif edildi)*
OBS-1 / UI-1 / Phase F'i + yeni operating-model kuralını kalıcı KB'ye işle. Versiyonlama kuralı gereği bump.

---

## 2. PLANLANAN — gelecek fazlar (commit'li yol haritası)

**PL-1 · F-obs gözlemlenebilirlik backbone (OTel → self-hosted Langfuse)** *(memory: load-bearing)*
OBS-1 yalnız hafif köprüydü (traceId + no-redeploy clear). Asıl backbone:
- **F-obs1:** OTel SDK + LangfuseSpanProcessor + AI SDK `experimental_telemetry` + serverless force-flush.
- **F-obs2:** Manuel span'ler (MCP `executeMCPTool`, DB read) + per-turn trace id + `session=conversationId` bind.
- **F-obs3:** Redaction scrubber'ı deterministik boundary olarak sertleştir + `telemetry_events` (ledger) ile tracing'i ayıran ADR.
- **3 adlı tuzak:** (a) full-I/O = yeni secret-leak yüzeyi → span-processor seviyesinde redaction; (b) serverless streaming fn donuyor → span'ler response'tan önce force-flush; (c) Langfuse self-host yalnız OTLP/HTTP → gRPC default'u HTTP'ye zorla.

**PL-2 · Eval golden harness** *(completion set)*
Golden-fixture eval harness (Langfuse aynı zamanda prompt store + eval harness olarak planlı).

**PL-3 · ARCHITECTURE.md + ADR'lar** *(completion set)*
ARCHITECTURE.md henüz yok. ADR-001 (trust/provenance) var. Yeni ADR'lar gerek: OBS-1 (telemetry-ledger vs tracing ayrımı), Phase F (backend-aware filter), eval-gate scoping.

**PL-4 · Tam Tool Routing tab (governance step 5 tamamlama)**
OBS-1C view + clear getirdi. Per-category düzenleme (tam `tool_category_cache` governance yüzeyi) hâlâ deferred.

**PL-5 · Deny / quarantine UI (governance panel)** *(Phase D-core'dan deferred)*
Quarantine, gelecek bir governance-panel fazına ertelendi. Deny/quarantine affordance'ı yok.

**PL-6 · Cross-source reconciliation (Phase E)** *(Phase D'den deferred)*
Backend'ler arası claim reconciliation (ARMES authoritative vs Superset mirror), mevcut scope-divergence tespitinin ötesinde.

**PL-7 · LangGraph bridge (Shape B)** *(yön belirlendi)*
TS core'u MCP-exposed servis olarak tut; Python LangGraph loop'u orkestre etsin; governance publish-time kalır, migration'dan etkilenmez.

**PL-8 · Self-improving KB (Phase 7+ vizyon)**
Offline curation agent → candidate-rule inbox → human gate; nadir core-kind kod değişimi için CC-via-MCP. Uzak vizyon.

---

## 3. TEKNİK BORÇ — latent / deferred fix / bilinen limit

**TD-1 · Superset runtime empty≠zero validator (P7 gap)** *(memory, tracked)*
Facts-ledger empty≠zero validator'ı ARMES-zone-specific. Superset'in empty≠zero'su yalnız prompt (code-floor) + eval-gate katmanlarında savunuluyor (ARMES'in 3 katmanına karşı 2 — deterministik runtime catch yok). Superset-scoped runtime validator P7 item. **Kırılgan regex bolt-on YAPMA.**

**TD-2 · Phase D forged-label limit** *(ADR-001'de kodlanmış honest limit)*
Tek-kaynak, kendi içinde tutarlı, in-scope, **forged-label** (S⊆T) bir yalan scope-divergence check'i atlatıyor. Zararsız hale getiriliyor (contained), görünür değil. Tespit redundancy gerektirir (data/infra kararı). Bilinen limit; "fix" değil, izlenen sınır.

**TD-3 · Non-OEE sorgular için cold-cache robustluğu**
OEE artık deterministik (metrics kategorisi, `path=keyword`). Diğer uncategorized sorgular hâlâ router LLM + learned cache'e bağımlı (warm-cache-carried). Tasarımın doğası; yalnız belirli bir sorgu sınıfı kırılgan çıkarsa sorun. İzle.

**TD-4 · Küçük kod nit'leri (bu session, non-blocking)**
- OBS-1 `clearAll`: "tümünü sil" için `.neq('keyword',' ')` idiom'u — çalışıyor (tokenizasyon nedeniyle hiçbir keyword tek boşluk olamaz) ama `.not('keyword','is',null)` daha sağlam.
- OBS-1 `bumpEpochAndClear`: epoch read-then-write atomik değil — yarış zararsız (epoch'un sadece ilerlemesi yeterli).
- Phase F `backendToolPattern`: superset için pozisyonel `BACKEND_IDS[1]` — literal testle guard'lı ama pozisyonel bağımlılık; named bir SUPERSET_ID sabiti dbConstants'a eklenirse daha temiz.

---

## 4. OWNER-ACTION — Maymun'un sahip olduğu

**OA-1 · `scripts/seedRules.ts` çalıştır** *(memory)*
Superset `rule_kinds` + CORE rule'larını governed DB'ye publish et. O zamana dek Superset code-floor'dan servis ediyor (intended) — DB-sourced path canlı exercise edilmemiş.

**OA-2 · `backend_id:'superset'` backfill** *(memory)*
`supersetArmes` `mcp_settings` entry'sine ekle. O zamana dek live-gateway DB path'i test-proven ama canlı exercise edilmemiş.

**OA-3 · Real-ARMES confidence pass** *(önceki açık item — durumu teyit et)*
Çalışan app'te büyük tablolar → resultStore handle path. (Bu session'da ARMES'i açıp OEE turn'ü koştun; bu item'ı kapatıp kapatmadığını teyit et.)

---

## 5. DOCS / KB durumu
- **CHANGELOG / cwf-project-kb SKILL / AGENTS** — AG memory-rule gereği güncel tutuyor (Phase F RULE 19 ekledi). Borç değil, bakımlı.
- **Session-graph KB v6** — bkz. P-3 (parked, docs tarafı).

---

## Önerilen sıra (architect görüşü)
1. **P-1 Gemini Lite** (küçük, izole; test parite'sini netleştirir) →
2. **P-2 viz-restore** (kullanıcı-görünür değer: OEE verisi var, görselleştirme yok) →
3. **PL-1 F-obs backbone** (tüm gelecek testleri/optimizasyonu taşıyan altyapı) →
4. ardından eval harness / ARCHITECTURE.md / governance step-5 tamamlama.
OA-1/OA-2 (Superset DB activation) bağımsız, istediğin an.
