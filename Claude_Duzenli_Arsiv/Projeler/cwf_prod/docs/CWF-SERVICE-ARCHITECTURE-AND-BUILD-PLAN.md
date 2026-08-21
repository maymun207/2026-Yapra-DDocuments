# CWF Service — Architecture & Build Plan
### EAIP-aligned · single-agent now · ~100% reusable into L3/L4 later

> **Amaç.** `CWF-DEMO` reposunu, içinde simülasyon / virtual-factory'ye dair **hiçbir şey kalmayan**, tamamen canlı **ARMES MCP** üstünde çalışan, tek-ajanlı, üretim-kalite bir **CWF servisine** dönüştürmek. Sistem promptu ve knowledge base, EAIP katmanlarına (L3 Orchestration / L4 LLM-core / Knowledge & Memory) **yeniden yazılmadan taşınacak** şekilde modüler kurulacak. Kod referans-kalite olacak: ports-and-adapters, sıfır duplikasyon, sıfır hardcoded değer, her modül tek sorumluluk.
>
> Bu doküman iki bölümdür: **(A) Mimari** (ne kuruyoruz, neden) ve **(B) Sıralı yapılacaklar** (faz faz, numaralı, her birinin doğrulama kapısıyla). Claude Code 4.8 her fazı buradan birebir yürütür.

---

## 0. Tasarım sözleşmesi (anti-spaghetti + reuse)

Bu kuralların ihlali = iş bitmemiş demektir.

1. **Bağımlılık yönü içe doğru.** `domain` ve `prompt` katmanları, `infra`'yı (MCP, HTTP, provider SDK) **asla import etmez**. Infra, domain'e bağımlıdır; tersi yasak. (Hexagonal / ports-and-adapters.)
2. **Tek yol.** Provider başına ayrı kod yolu YOK. Tüm sağlayıcılar (Anthropic, OpenAI, Gemini) **tek gateway** üzerinden geçer → bugünkü RULE 0 duplikasyonu **ölür**.
3. **Sıfır hardcoded değer (RULE 1).** Her tunable (`MAX_TOOL_ROUNDS`, bütçeler, timeout'lar, model id'leri, history penceresi, heartbeat) `_core/config` veya `process.env`'de yaşar.
4. **Saf modüller.** Her prompt modülü ve her knowledge modülü, yan etkisiz **saf fonksiyon** veya **tipli veri**dir. I/O yok, global yok.
5. **Boundary'de tip güvenliği.** Tüm dış girdiler (HTTP body, MCP sonucu, tool args) **Zod** ile parse edilir; içeride `any` yok.
6. **İnce handler.** HTTP handler yalnızca: parse → `runAgent(ports)` → stream. İçinde prompt, tool, döngü mantığı **bulunmaz**.
7. **Her seam bir interface.** Gelecekte bir EAIP katmanına dönüşecek her concern, bugün bir **interface arkasında izole** edilir; bugünkü implementasyon o interface'in "static/local" sürümüdür.
8. **Test-per-module.** Her modülün kendi unit testi var; refactor'lar snapshot/characterization testiyle korunur.

---

## A. MİMARİ

### A.1 EAIP seam haritası — bugünkü modül → yarınki katman

| Bugünkü modül (single-agent) | Bağlandığı interface | Yarınki EAIP sahibi | Göçte ne olur |
|---|---|---|---|
| `_core/llm/gateway.ts` | `LlmGateway` | **LiteLLM / vLLM / Ollama** (L4 core) | Adapter'ın hedefi Vercel AI SDK yerine LiteLLM endpoint'i olur. Çağrı yerleri değişmez. |
| `_core/prompt/*` (assembler + modüller + registry + version tag) | `PromptProvider` | **Prompt Store** (Langfuse, L4) | Modüller dosyadan değil Langfuse'tan key+version ile çekilir. Assembler aynı kalır. |
| `_core/knowledge/*` (tipli domain + provider) | `KnowledgeProvider` | **LlamaIndex / Qdrant / Graphiti+FalkorDB** (Knowledge & Memory) | `StaticKnowledgeProvider` → `RagKnowledgeProvider` / `GraphKnowledgeProvider`. Interface aynı. |
| `_core/grounding/*` (facts-ledger + validators) | `Guard` | **Guardrails AI** (L4) | Prompt-enforced + stub validator → Guardrails validator config'leri. |
| `_core/agent/runAgent.ts` (döngü + tool sıralama + karar) | `AgentPorts` | **LangGraph + Hybrid decision engine** (L3) | Döngü gövdesi graph node/edge'lerine bölünür. "LLM ranks, rules decide" = filter (rules) + tool-choice (ranks) zaten ayrık. |
| `_core/observability/trace.ts` | `Tracer` | **Langfuse** (L4) | No-op tracer → Langfuse SDK. Çağrı yerleri değişmez. |
| `_core/tools/*` (MCP adapter + meta-tools + filter + result store) | `ToolPort` | L3 altında **tool node** implementasyonları | `resultStore`/`aggregate`/`query` domain-agnostik primitifler olarak aynen kalır. |
| `_core/config/*` | — | **MLflow params + env** | Tunable + model registry buradan beslenir. |

> **Reuse tezi:** Her future-layer concern bugün bir interface arkasında. Göç = adapter'ın hedefini değiştirmek (LiteLLM endpoint, Langfuse key, Qdrant client), domain ve assembler mantığını **yeniden yazmak değil**.

### A.2 Hedef dizin yapısı

```
api/
  cwf/
    chat.ts                      # İNCE handler. parse → runAgent → SSE. (eski standalone-chat'in temizlenmiş hali)
    _core/
      agent/
        runAgent.ts              # Orchestration loop (L3 seam). Ports alır, stream döner. Provider-agnostik.
        ports.ts                 # AgentPorts, AgentContext, AgentResult tipleri
      llm/
        gateway.ts               # LlmGateway interface + VercelAiGateway adapter (L4 seam)
        models.ts                # Model registry — config-driven (id, ctx window, caps)
      prompt/
        assemble.ts              # buildSystemPrompt(ctx): TEK kaynak. Modülleri sıraya dizer.
        registry.ts              # Modül kaydı + semantic version tag'leri (Prompt Store seam)
        modules/
          persona.ts             # rol / kapsam / kurumsal kimlik
          safety.ts              # strict_boundaries / anti-jailbreak / PII / prompt-leakage
          time.ts                # zaman & epoch kuralları (resolve_time_range zorunluluğu)
          toolProtocol.ts        # ÖNEMLİ KURALLAR 1–10 — config'ten generate edilir
          grounding.ts           # facts-ledger + veri-sadakati kontratı
          outputFormat.ts        # chart/table makroları + yanıt formatı
      knowledge/
        KnowledgeProvider.ts     # interface: getDomainContext(query, scope) → tipli slice
        StaticKnowledgeProvider.ts
        domain/
          armesToolGraph.ts      # giriş noktaları, sıralama, UUID çözümü, capability sınırları
          zones.ts               # KB7 zone'ları + UUID + capability flag (IKINCILUST barkodsuz)
          metrics.ts             # OEE (P×Q), K4 (kesin throughput sayacı), availability, scrap tanımları
          glossary.ts            # seramik terminoloji TR/EN
          blindSpots.ts          # yapısal kör noktalar + çıkarım yasakları (boş ≠ sıfır)
          anomalies.ts           # bilinen tarihsel olaylar (retrieve-on-demand)
      grounding/
        factsLedger.ts           # reasoning-layer kontrat tipi + yardımcılar
        validate.ts              # post-hoc doğrulama hook'ları (Guardrails seam, şimdilik no-op-ready)
      tools/
        mcpTools.ts              # MCP discovery/exec adapter (api/mcp'yi sarar)
        filter.ts                # toolCategories (142→~15) — Supabase'siz, in-memory
        metaTools/
          resolveTimeRange.ts
          aggregateRecords.ts
          queryRecords.ts
        result/
          formatToolResult.ts    # 3-kademe formatter (taşındı)
          resultStore.ts         # large-result layer (taşındı)
      observability/
        trace.ts                 # Tracer interface + NoopTracer (Langfuse seam)
      transport/
        sse.ts                   # SSE stream + heartbeat + graceful error termination
      config/
        index.ts                 # TÜM tunable'lar (RULE 1) + model registry + version tag'leri
  mcp/
    connect.ts                   # KEEP — MCP transport (Streamable HTTP → SSE fallback)
    call.ts                      # KEEP — MCP tool exec proxy
shared/
  llmGateway/*                   # KEEP — gateway primitifi (gateway.ts bunu sarar)
  cwfConstants.ts                # KEEP — CHART_MACRO_INSTRUCTIONS vb. (prompt modüllerine taşınacak içerik hariç)
```

### A.3 Sistem Promptu Mimarisi

**Problem (bugün):** Prompt, `standalone-chat.ts` içinde iki kod yolunda **inline + duplike** template literal. Her yeni kural (örn. bugün eklenen "kural 10") iki yere elle yazılıyor; AGENTS.md RULE 0 "ikisini de düzenle" diyor. Taşınamaz, drift'e açık, test edilemez.

**Hedef:** Prompt = **saf modüllerin assembler'ı**. Tek `buildSystemPrompt(ctx)` fonksiyonu, sıralı modülleri birleştirir. Tek tüketici yol olduğu için (A.1, madde 2) duplikasyon yapısal olarak imkânsızlaşır.

Tasarım ilkeleri:

- **Her modül saf fonksiyon:** `(ctx: PromptContext) => string`. `ctx` taşır: dil, toolNames, knowledge slice, time block, version tag'leri. Modül I/O yapmaz.
- **Sıra anlamlıdır (lost-in-the-middle):** kritik talimatlar başta ve sonda. Sıra: `persona → safety → time → toolProtocol → grounding → knowledge(injected) → outputFormat`. En sert kurallar (safety, grounding) baş/son çapalarında.
- **toolProtocol config'ten generate edilir:** Kural 1–10 elle string değil; `config`'teki yapı + `resultStore`/`metaTools` isimlerinden üretilir. Yeni meta-tool eklemek = config'e satır, prompt otomatik günceller. (Bugünkü "rule 10'u iki yere yaz" derdi biter.)
- **grounding modülü = facts-ledger:** "Yazacağın her sayı, dönen bir kayda/handle'a izlenebilir olmalı; izlenemiyorsa üretme. Boş sonuç = 'veri yok', asla 'sıfır'." Format katmanı (`resultStore`/`formatToolResult`) zaten envelope alanları sağlıyor; grounding modülü bunları reasoning kuralına bağlar.
- **Versiyonlama hazır:** `registry.ts` her modüle semantic version tag verir; assembler çıktısının başına `promptVersion` hash'i koyar. Bugün dosyada, yarın Langfuse Prompt Store'da aynı key+version ile.
- **i18n ayrık:** TR/EN metin farkı modül içinde değil, modülün okuduğu i18n kaynağında. Prompt mantığı dilden bağımsız.

**Reuse:** Assembler ve modül interface'i sabit. Langfuse Prompt Store geldiğinde `registry.ts` dosya yerine Langfuse'tan çeker — assembler ve `ctx` aynı kalır.

### A.4 Knowledge Base Mimarisi

**Problem (bugün):** ARMES domain bilgisi promptta **yok**. Model getFactoryLines girişini, zone UUID'lerini, K4'ün kesin sayaç olduğunu, IKINCILUST'un barkodsuz olduğunu (→ `getDailyManualScrap` boş döner → **boş ≠ sıfır fire**), vardiya formatını bilmiyor. Sonuç: verimsiz tool keşfi (yavaş demo, fazla round) + format katmanının yakalayamadığı tek tuzak (boş sonuç "geçerli"dir).

**Hedef:** KB = **tipli, retrieve-edilebilir domain verisi**, prose değil. `KnowledgeProvider` interface arkasında.

İki eksen:

1. **Retrieval pattern'a göre katman:**
   - **Always-inject (küçük, kritik):** tool graph giriş kuralları, blind-spot kuralları, çekirdek metrik tanımları. Her istekte prompt'a girer.
   - **Retrieve-on-demand (büyük):** tam glossary, per-zone detay, tarihsel anomaliler. Sorguya göre `getDomainContext(query, scope)` döndürür. Bugün `StaticKnowledgeProvider` `toolCategories` benzeri scoping ile süzer; yarın aynı interface RAG/graph ile.

2. **Tip + kaynak:**
   - Her parça tipli obje (`ToolGraphNode`, `Zone`, `MetricDefinition`, `BlindSpotRule`, `GlossaryTerm`). Prose değil → makine-okunur, RAG/graph-ingestable.
   - **Kaynak otoriter, uydurma yok:** tool graph → canlı ARMES şeması (Faz 0 dump); zone'lar → `getFactoryLines`; metrik tanımları → Definitions (senin RTF); blind-spot'lar → senin operasyonel bilgin, **doğrulanmış**.

`KnowledgeProvider` interface:

```
getDomainContext(query: string, scope: KnowledgeScope): DomainContext
// DomainContext = { injected: string; references: KnowledgeRef[] }
// injected → prompt'a giren always-inject slice (scope ile süzülmüş)
// references → modelin tool ile derinleşebileceği işaretler (RAG seam)
```

**Reuse:** `StaticKnowledgeProvider` bugün `domain/*` tipli dosyalarını okur. Qdrant/LlamaIndex/Graphiti geldiğinde `RagKnowledgeProvider`/`GraphKnowledgeProvider` aynı interface'i implemente eder; domain verisi graph'e ingest edilir. Assembler ve agent değişmez.

### A.5 Grounding + Observability (destek sütunlar)

- **Grounding (Guardrails seam):** facts-ledger reasoning kontratı (A.3) + format-katmanı (mevcut `resultStore`/`formatToolResult`, KEEP) + blind-spot kuralları (A.4). `validate.ts` bugün no-op-ready hook; yarın Guardrails AI validator. **Tek değişiklik gereken davranış burada** — gerisi refactor.
- **Observability (Langfuse seam):** `Tracer` interface + `NoopTracer`. Bugünkü `console.log`'lar buradan geçer (`trace.toolCall`, `trace.llmCall(usage)`, `trace.span`). Langfuse = no-op'u değiştir, çağrı yeri değişmez. Şimdi ucuz, sonra büyük getiri.

### A.6 Tek-yol birleştirme (RULE 0'ı öldürmek)

Bugün `standalone-chat.ts` iki yol taşıyor: Vercel AI SDK (anthropic/openai/gemini-lite, streaming) + Gemini-native `generateContent` (default gemini-2.5-flash, non-streaming, manuel round loop). İkisi prompt/tool/result mantığını duplike ediyor; AGENTS.md RULE 0 bu yüzden var.

**Hedef:** Tüm sağlayıcıları — **default gemini dahil** — `LlmGateway` (Vercel AI SDK / sonra LiteLLM) üstünden `streamText` ile geçir. Gemini-native yol **silinir**. RULE 0'ın varlık sebebi ortadan kalkar; parity tek kaynaktan otomatik gelir.

> ⚠️ Davranış-etkileyen tek refactor adımı budur. Eval golden set + snapshot ile kapı altında. (Gemini-native yol demoda en çok ayarlanmış yolsa, alternatif: önce extract+enrich, birleştirmeyi demodan sonra yap — bkz. B/Sequencing.)

---

## B. SIRALI YAPILACAKLAR (faz faz, numaralı)

**Cross-cutting kurallar (her fazda geçerli):** önce `cwf-project-kb` skill + `.agents/CHANGELOG.md` oku · `.env*` dosyalarına **asla** dokunma, sırları `$VAR` ile referansla · her faz, önceki fazın "tamam" iddiasını hedef ortamda **bağımsız doğrular** · her değişiklik üç sağlayıcı için de geçerli olmalı (Faz 2 sonrası tek yol → otomatik) · **demo her an çalışır kalmalı** (canlı UI `/api/cwf/standalone-chat`'i çağırıyor; o yol hiçbir fazda kırılmaz).

---

### FAZ 0 — Güvenlik ağı + envanter + ARMES ground truth
*Hedef: refactor'a korkmadan girebilmek. Hiçbir davranış değişmez.*

0.1 `cwf-project-kb` skill ve `CHANGELOG.md` oku; mevcut durumu özetle.
0.2 **Karakterizasyon testi:** canlı UI yolunun (`standalone-chat`) mevcut davranışını kilitleyen bir test seti yaz — temsili 6–8 sorgu için (liste, analitik/handle, tarih→epoch, injection denemesi, boş-zone) request→response shape snapshot'ı.
0.3 **Prompt snapshot:** her iki yolun ürettiği sistem promptunu deterministik (time block hariç) string olarak dump et; golden snapshot olarak sakla. Refactor sonrası **byte-identical** olacak (Faz 3 kapısı).
0.4 **ARMES canlı tool kataloğu dump:** `api/mcp/connect` ile ARMES'e bağlan, 142 tool'un `name + inputSchema + örnek çıktı`'sını çıkar → `docs/armes-tool-catalog.json`. (armesToolGraph/zones/metrics'in **ground truth** kaynağı; tahmin yok.)
0.5 **Keep/Delete/Decouple manifesti** üret (aşağıdaki Faz 1 listesini repo gerçeğiyle doğrula ve dondur).
- **Kapı:** tüm yeni testler yeşil; mevcut suite (213/213) hâlâ yeşil; manifest gözden geçirildi.

---

### FAZ 1 — Cleanup: simülasyon / virtual-factory'yi tamamen çıkar
*Hedef: yüzeyi küçült. Restructure'dan ÖNCE, ki daha az kod restructure edelim. Sıra: yaprakları sil → dangling import'ları onar → her adımda build+test yeşil.*

**1A. Backend — SİL (simülasyon ajanı + demo + copilot):**
1.1 `api/cwf/chat.ts` (3600 satır simülasyon ajanı)
1.2 `api/cwf/demo-chat.ts`
1.3 `api/cwf/_lib/copilotEngine.ts`, `copilotPrompt.ts`
1.4 `api/cwf/copilot/` (enable, disable, evaluate, heartbeat)
1.5 `api/cwf/_lib/chatEngineAI.ts` (simülasyon provider yolu)
1.6 `api/cwf/_lib/cwfDbSchema.ts`, `cwfParameterRanges.ts`, `cwfResponseCache.ts`, `cwfKnowledgeDocs.ts` (Drive demo KB — doğrula)
1.7 İlgili testler.

**1B. Backend — DECOUPLE (keeper ama simülasyon tendrili var):**
1.8 `api/cwf/_lib/toolCategories.ts` → **Supabase bağımlılığını kaldır.** `learnToolMapping` self-learning cache'ini in-memory (veya kısa-TTL keyed cache) yap. Supabase importu sıfırlanmalı.
1.9 `@supabase/supabase-js` ve `SUPABASE_*` env — başka keeper kullanmıyorsa **bağımlılıktan ve CSP'den çıkar** (`vercel.json` connect-src'den `*.supabase.co` sil). Doğrula: grep ile sıfır kullanım.

**1C. Frontend — SİL:**
1.10 `src/store/`: `simulationStore.ts`, `simulationDataStore.ts`, `demoStore.ts`, `workOrderStore.ts`, `copilotStore.ts` (+ testleri)
1.11 `src/components/demo/*` (Demo*Chart, DemoDataTable, vb.)
1.12 `src/components/ui/copilot/*`
1.13 `src/components/ui/cwf/SimulationHistoryDropdown.tsx`
1.14 `src/hooks/`: `useCopilotHeartbeat.ts`, `useCopilotLifecycle.ts`, `useCWFCommandListener.ts`
1.15 `src/services/simulationHistoryService.ts`
1.16 `src/lib/params/parameterRanges.ts`, `copilot.ts` (simülasyon param'ları) + `src/lib/params/index.ts`'ten ilgili export'lar
1.17 İlgili testler + demo asset'leri.

**1D. Frontend — DECOUPLE (keeper UI'dan simülasyon tendrillerini kopar):**
1.18 `src/components/ui/CWFChatPanel.tsx`, `src/store/cwfStore.ts`, `src/lib/types/cwfTypes.ts`, `src/lib/params/cwfAgent.ts`, `src/components/ui/cwf/LayoutSettingsDropdown.tsx` → simülasyon store import'larını ve kullanımlarını çıkar; CWF chat'i bağımsız çalışır bırak.
1.19 `src/App.tsx` → simülasyon/demo/copilot mount'larını çıkar; sadece CWF shell + MCP settings kalsın.

**1E. Routing/config temizliği:**
1.20 `vercel.json` → `chat.ts` ve `demo-chat.ts` function route'larını sil.
- **Kapı:** `tsc -b` temiz, `vite build` temiz, oxlint temiz, kalan testler yeşil, **canlı `standalone-chat` yolu elle smoke-test'te çalışıyor**. Tek bir simülasyon/demo/copilot referansı `grep` ile bulunmamalı.

---

### FAZ 2 — Tek yol: iki kod yolunu gateway altında birleştir
*Hedef: RULE 0 duplikasyonunu öldür. (A.6)*

2.1 `_core/llm/gateway.ts`: `LlmGateway` interface + `VercelAiGateway` adapter (`shared/llmGateway`'i sarar). `streamText` + `stepCountIs(config.MAX_TOOL_ROUNDS)`.
2.2 `_core/llm/models.ts`: model registry config'ten (default gemini-2.5-flash dahil tüm sağlayıcılar).
2.3 `standalone-chat.ts` Gemini-native `generateContent` yolunu **sil**; default gemini'yi de gateway'e bağla.
2.4 Prompt/tool/result mantığı artık **tek yerde** (sonraki fazlarda modülleşecek).
- **Kapı:** Faz 0.2 karakterizasyon testleri + 0.3 prompt snapshot geçer (anlamlı fark yalnızca streaming-shape olabilir, içerik aynı); üç sağlayıcı için de manuel doğrulama; AGENTS.md RULE 0 notu "obsolete — tek yol" olarak güncellenir.

> Demo tight ise: bu fazı Faz 5 sonrasına ertele (bkz. Sequencing). Faz 3–5 tek yolu varsaymadan da çalışır (geçici olarak iki yola da uygulanır, snapshot ile korunur).

---

### FAZ 3 — Modüler prompt + config çıkarımı (saf refactor)
*Hedef: inline prompt → `_core/prompt` assembler + modüller. Sıfır davranış değişikliği.*

3.1 `_core/config/index.ts`: tüm tunable'lar + version tag'leri (RULE 1). Mevcut literalleri buraya taşı.
3.2 `_core/prompt/modules/*`: mevcut prompt içeriğini **birebir** modüllere böl (persona, safety, time, toolProtocol, grounding, outputFormat).
3.3 `toolProtocol.ts`: kural 1–10'u config + meta-tool isimlerinden **generate** et (elle string değil).
3.4 `_core/prompt/registry.ts` + `assemble.ts`: tek `buildSystemPrompt(ctx)`.
3.5 `transport/sse.ts`, `tools/result/*`, `tools/metaTools/*`, `tools/filter.ts`, `tools/mcpTools.ts` → ilgili mevcut dosyaları (`toolResult.ts`, `resultStore.ts`, `timeTools.ts`, `toolCategories.ts`) yeni yapıya taşı, import'ları düzelt.
3.6 Handler'ı inceelt: `chat.ts` artık parse → `runAgent` → stream.
3.7 `_core/agent/runAgent.ts` + `ports.ts`: döngüyü provider-agnostik Ports arkasına al (L3 seam).
- **Kapı:** 0.3 prompt snapshot **byte-identical** (time block hariç); 0.2 karakterizasyon yeşil; tüm testler yeşil; hiçbir dosya tek-sorumluluk dışına taşmaz.

---

### FAZ 4 — Knowledge Base mimarisi (tek davranış-katması: domain bilgisi gelir)
*Hedef: ARMES domain bilgisini tipli KB + provider olarak ekle. (A.4)*

4.1 `KnowledgeProvider.ts` interface + `StaticKnowledgeProvider.ts`.
4.2 `domain/armesToolGraph.ts` — Faz 0.4 kataloğundan: giriş noktaları (getFactoryLines), sıralama (zone UUID çöz → OEE/scrap), parametre format kontratları (epoch via resolve_time_range, tireli vardiya), capability sınırları (API pagination yok).
4.3 `domain/zones.ts` — KB7 zone'ları + UUID + capability flag (IKINCILUST: barkodsuz).
4.4 `domain/metrics.ts` — OEE (P×Q), **K4 = kesin throughput sayacı**, availability, scrap tanımları (Definitions/RTF'ten).
4.5 `domain/blindSpots.ts` — yapısal kör noktalar + çıkarım yasakları (boş `getDailyManualScrap` ≠ sıfır fire; IKINCILUST scrap görünmez).
4.6 `domain/glossary.ts`, `domain/anomalies.ts` (retrieve-on-demand).
4.7 Assembler'a `knowledge` slice'ı bağla (always-inject scope); `toolProtocol` artık tool graph'tan beslenir.
- **Kapı:** Faz 5 eval golden set'i geçmeli; özellikle boş-IKINCILUST sorgusu "veri yok/görünmüyor" döndürmeli, "sıfır fire" **dönmemeli**.

---

### FAZ 5 — Grounding (facts-ledger) + Observability seam
*Hedef: reasoning-katmanı kontratı + Langfuse'a hazır trace. (A.5)*

5.1 `grounding/factsLedger.ts` + prompt'un `grounding` modülüne facts-ledger kuralı (her sayı → kaynak tool/handle; izlenemeyen üretilmez).
5.2 `grounding/validate.ts`: post-hoc no-op-ready validator (Guardrails seam).
5.3 `observability/trace.ts`: `Tracer` + `NoopTracer`; mevcut `console.log`'ları buradan geçir.
- **Kapı:** golden set yeşil; facts-ledger ihlali (kaynaksız sayı) eval'de yakalanır.

---

### FAZ 6 — Eval harness + "bible" dokümantasyonu
*Hedef: ölçülebilirlik + referans-kalite belgeler.*

6.1 **Golden trajectory seti** (KB7): boş-IKINCILUST; getFactoryLines→hat-başı-OEE; tarih→epoch; 5470-kayıt analitik (aggregate_records handle yolu); injection denemesi; kapsam-dışı reddi.
6.2 Faz 2 ve 4 öncesi/sonrası koştur → regresyon yok + blind-spot fix kanıtı.
6.3 `docs/ARCHITECTURE.md` (bu doküman, repoya canonical), `docs/ADR/*` (her büyük karar: tek-yol, KB provider, prompt store seam), modül-başı kısa README.
6.4 `AGENTS.md` güncelle: RULE 0 → "tek yol" notu; yeni dizin haritası; "no static values" (RULE 1) örnekleri.
- **Kapı:** eval suite CI'da; build/tsc/oxlint temiz; doküman ile kod tutarlı.

---

## C. Sequencing kararı (demo tarihine göre)

- **Demo rahatsa (önerilen, en temiz):** Faz 0 → 1 → 2 → 3 → 4 → 5 → 6 sırası. Her şey yerine oturur.
- **Demo tightse:** demo-kritik **doğruluk** öne alınır — Faz 0 → **Faz 4-lite** (ARMES domain + blind-spot bilgisini mevcut prompta enjekte et, tam modülasyon beklemeden) → Faz 5.1 (facts-ledger) → demo. Cleanup (Faz 1), tek-yol (Faz 2) ve tam modülasyon (Faz 3) demodan **sonra**. Böylece demoda yanlış-veri/halüsinasyon riski kapanır, refactor borcu sonraya kalır.

---

## D. Hemen netleşmesi gereken tek karar

**Faz 2 (tek-yol birleştirme).** Default gemini'yi de gateway'e alıp Gemini-native yolu silmek, RULE 0'ı bütünüyle öldürür ve "no spaghetti" hedefinin belkemiğidir — ama davranış-etkileyen tek refactor budur. Native yol demoda en çok ayarlanmış/güvenilen yol mu? Eğer öyleyse: önce extract+enrich (Faz 3–5), birleştirmeyi demodan sonra. Değilse: önerilen sırayla birleştir.

Bunu netleştir; gerisi committed. Onay verdiğin an, **ilk teslimat Faz 0'ın Claude Code 4.8 promptu** olur (İngilizce, AntiGravity add-on'a uygun: doğrulama-ilk açılış, `.env` yasağı, RULE 0/1 şartı, self-verification checklist'iyle kapanış).
