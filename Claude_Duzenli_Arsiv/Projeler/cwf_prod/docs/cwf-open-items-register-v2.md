# CWF / EAIP — Açık İş Kaydı (Open-Items Register)
**rev 2 · 2026-06-30 · HEAD `5e8bb8a` (PROV-1, canlı + DB seeded)**

Bu session-line'da kapanan işlerden sonra güncel durum. v1'den farkı: DOC-1, P-1 ve PROV-1 kapandı; yeni standing UI-affordance kuralı eklendi; PROV-track açıldı.

---

## ✅ AGREED SEQUENCE (kararlaştırılan sıra)
1. **(bu adım) Açık-iş kaydı v2** — bitti.
2. **PROV-2** — admin "Providers" tab'ı (UI affordance).
3. **P-3** — session-graph KB → v6 + bootstrap prompt v5.
4. **Yeni session:** **P-2 (viz-restore)** ile devam.
   *(Not: P-1 (Gemini Lite) zaten PROV-1 ile kapandı — aşağıya bak. Yeni session'da kalan parked iş P-2.)*

---

## 0. Bu session-line'da KAPATILANLAR (artık açık değil)
- **OBS-1** (`a3d11d9`) — test observability (no-redeploy cache clear + `[ToolRoute]` trace).
- **UI-1** (`d0b91a0`) — admin portal-theme escape + table clip.
- **Phase F** (`1c2e0a7`) — backend-aware tool filter (gateway exemption + metrics); iki yarı da canlı doğrulandı.
- **DOC-1** (`dc16a2e`) — Living Architecture Document: 8-tab shell, 5 diyagram as-is, build-time Live Facts, Decisions/ADR tab, freshness manifest, **WARN drift-guard + lock-step gate** (AGENTS RULE 20 / RULE 3 item 4). checkDocDrift NUL-korupsiyonu temizlendi + `.gitattributes` koruması eklendi.
- **P-1 — Gemini Lite** → **PROV-1 ile çözüldü.** Diagnosis: path bug DEĞİL (offered=8/145, gemini ile birebir), saf model zayıflığı (output=0, zinciri sürdüremiyor). Aksiyon: gemini-lite chat option'dan düştü, **router modeli olarak kaldı**. RULE-1 router-literal nit'i de kapandı.
- **PROV-1** (`5e8bb8a`) — LLM Provider Registry (DB-first/code-floor): family-dispatch resolver (+openai-compatible, unknown→throw = `default:google` öldü), `llm_providers` tablosu (RLS service-role-writes), registry warm→read, byte-identical 3-provider, "LLM ekle = bir satır" kanıtlı, secrets env-only. **Migration + seed Maymun tarafından uygulandı → DB-first canlı.**
- **Standing rule (memory #7):** governed-data işlemleri (LLM/backend/model ekle-çıkar-toggle) gated admin-UI affordance ile yapılabilmeli; data → UI, structure/secret → code/env. "Code/script-only" data tarafı için tooling boşluğu.

---

## 1. PARK EDİLEN — sıradaki adım

**P-2 · Viz-restore** *(açık — yeni session)*
Tool-result zengin render (tablo/grafik) hâlâ stub'a degrade. OEE **verisi geliyor** ama tablo/grafik çizilmiyor. `cwfConstants`'taki ölü simulation chart macro'ları da temizlenmeli. Frontend, parallel-safe.

**P-3 · Session-graph KB → v6 + bootstrap prompt v5** *(sırada — PROV-2'den sonra)*
OBS-1/UI-1/Phase-F/DOC-1/P-1/PROV-1 + memory #7'yi kalıcı KB'ye işle. Versiyonlama kuralı gereği bump.

*(P-1 Gemini Lite → KAPANDI, yukarıda.)*

---

## 2. PLANLANAN — gelecek fazlar

**PROV-2 · Admin "Providers" tab'ı** *(sıradaki commit'li adım)*
Standing rule'ün UI affordance'ı: gated/audited path'ten LLM provider satırı ekle/çıkar/toggle/edit; `apiKeyEnv` **pointer** + "env tanımlı değil" status badge (secret değeri ASLA UI'da); chat picker'ı registry'nin `exposedAsChat` satırlarından besle (hardcoded liste yerine). PROV-1 deseni + governance panel deseni.

**PROV-3 · `shared/llmGateway/*` fallback'ini registry'ye konsolide et** *(yeni)*
İkinci provider yüzeyi (non-streaming fallback) hâlâ kendi provider def'lerini taşıyor — tek kaynağa (registry) indir.

**PL-1 · F-obs gözlemlenebilirlik backbone** (OTel → self-hosted Langfuse; F-obs1/2/3; 3 adlı tuzak: full-I/O redaction, serverless force-flush, OTLP/HTTP-only). Load-bearing.

**PL-2 · Eval golden harness.**

**PL-3 · ARCHITECTURE.md + formal ADR'lar.** `docs/ARCHITECTURE.md` repo'da MEVCUT (stub olabilir — genişlet). Formal ADR bekleyenler: OBS-1, Phase-F, DOC-1, PROV-1 (şu an CHANGELOG'da kayıtlı, formal ADR dosyası yok). Decisions tab bunları link'liyor.

**PL-4 · Tam Tool Routing tab** (per-category düzenleme; OBS-1C sadece view+clear getirdi).

**PL-5 · Deny/quarantine UI** (Phase D-core'dan deferred).

**PL-6 · Cross-source reconciliation (Phase E).**

**PL-7 · LangGraph bridge (Shape B).**

**PL-8 · Self-improving KB (Phase 7+ vizyon).**

*(Deferred aile: Vercel AI Gateway family — egress/veri-residency duruşu; openai-compatible custom yolu varken gerekmedi.)*

---

## 3. TEKNİK BORÇ

**TD-1 · Superset runtime empty≠zero validator (P7)** — facts-ledger ARMES-zone-specific; Superset 2 katman (prompt+eval-gate) vs ARMES 3. Kırılgan regex YOK.

**TD-2 · Phase D forged-label limit** — single-source self-consistent in-scope forged-label yalan scope-divergence'ı atlatır; contained, not detected (ADR-001 kayıtlı limit).

**TD-3 · Non-OEE cold-cache robustluğu** — OEE deterministik (metrics); diğer uncategorized sorgular router/learned-cache'e bağımlı. İzle.

**TD-4 · Küçük kod nit'leri (non-blocking):**
- OBS-1 `clearAll` `.neq('keyword',' ')` match-all idiom.
- OBS-1 `bumpEpochAndClear` epoch read-then-write non-atomic (benign).
- Phase F pozisyonel `BACKEND_IDS[1]` (literal testle guard'lı).
- **YENİ:** `/api/admin/rules/[id]`'de `url.parse()` deprecation (DEP0169) — WHATWG `URL`'e geç. Düşük öncelik.

**TD-5 · DOC-1 takip** — drift-guard **WARN→FAIL** yükseltmesi (PROV-1 lock-step'te sync oldu; 1 faz daha sonra map güvenli sayılıp FAIL'e çıkarılabilir); Mermaid dönüşümü; live-DB facts (şu an code-floor'dan generate).

---

## 4. OWNER-ACTION

**OA-1 · `scripts/seedRules.ts`** — Superset `rule_kinds`+CORE'u governed DB'ye publish *(memory'den; durumu teyit)*.

**OA-2 · `backend_id:'superset'` backfill** — `supersetArmes` `mcp_settings` *(durumu teyit)*.

**OA-3 · Real-ARMES confidence pass** — bu session ARMES açıldı + OEE turn'leri koştu → muhtemelen kapanabilir *(teyit)*.

*(OA — PROV-1 migration + seed → ✅ Maymun bu session uyguladı.)*

---

## Architect-önerisi öncelik (sıra dışı bağımsız işler)
Kararlaştırılan sıra geçerli (PROV-2 → P-3 → P-2). Bağımsız/owner: OA-1/OA-2 istediğin an; PL-1 (F-obs) tüm gelecek test/optimizasyon altyapısı olduğu için P-2 sonrası güçlü aday.
