# CWF / EAIP — Açık İş Kaydı (Open-Items Register)
**rev 10 · 2026-07-01 · HEAD `44d5e74` (FLOOR-1 #18 · OBS-2 #19 · DOC-3 #20 merged; 532 test; docVersion rev 18)**

v9'dan farkı: bu session **üç iş kapattı** + **yeni bir kuzey yıldızı** koydu. **FLOOR-1** (PR #18) ARMES per-kind knowledge floor asimetrisini kapattı (composeArmes artık Superset gibi her kind'ı code-baseline'a floor'lar; `composeArmesContext([]) === renderArmesCriticalSlice()` invariant'ı). **OBS-2** (PR #19) tüm-provider LLM completion sinyallerini tek gateway'de yakaladı + deterministik empty-completion guard (boş ekran → dürüst finishReason-aware mesaj, provider fallback YOK); canlı kanıt `[LLMFinish] finishReason=stop … empty=true` → Gemini teşhisi **clean empty-stop**'a indi (safety/length değil). **DOC-3** (PR #20) **Agent Control Plane blueprint**'ini 6. mimari tab yaptı + **RULE 23** (roadmap-altitude lock-step). Aradaki entelektüel çıktı: **CONTROL-PLANE VİZYONU** (elektron mikroskobu — tek ajanı observe/tweak/replay/stub ile 14 kanonik kademede inceleyip ayarlayan iç lab + differentiator). **Bug-fix hattı KAPALI kalıyor.** Kritik yol: control-plane build-order (F-obs → lab-expansion → replay → stub); F-obs hâlâ **OA-8**'e bloke, ama **Gemini root-cause deneyi UNBLOCKED**.

---

## ✅ AGREED SEQUENCE (kararlaştırılan sıra)
1–9. **(bitti — v9'da kapandı)** PROV-3 · davet/credential sagası + User-Management · checkpoint'ler · resume-doğrulama + harita-sapması + TD-10 · HARDEN-1 (#14) · FIX-1 (#15) · FIX-2 (#16) · FIX-3 (#17). **Bug-fix hattı KAPANDI.**
10. **(bitti)** **N53 · System-prompt assembly + request/response flow deep-dive** (v9'un NEXT'i) — `buildSystemPrompt` (CORE cached-prefix + per-backend domain packs) + `chat.ts` request spine + viz FROM-TOOL path, koda karşı haritalandı. Control-plane blueprint'inin empirik zemini.
11. **(bitti)** **FLOOR-1** (PR #18 → `84d9c57`) — ARMES per-kind knowledge floor (Superset paritesi; partial-publish artık always-inject slice düşüremez).
12. **(bitti)** **OBS-2** (PR #19 → `b8a0e6d`) — all-provider completion signals + empty-completion guard. Canlı kanıt `[LLMFinish]` emit ediyor.
13. **(bitti — strateji)** **CONTROL-PLANE VİZYONU** — 5 SOTA referans → kanonik 14-kademe master flow + separation points; differentiator = observe+tweak+replay+stub (piyasada yok).
14. **(bitti)** **DOC-3** (PR #20 → `44d5e74`) — blueprint = 6. mimari tab + RULE 23.
15. **Sıradaki (yeni session seçer):** control-plane build-order. **UNBLOCKED:** Gemini root-cause deneyi. **BLOKE:** F-obs (OA-8). **Flag'li:** panel redesign.

---

## 0. Bu session-line'da KAPATILANLAR (artık açık değil)
- **N53 · Flow deep-dive** — sistem-prompt montajı + request/response yolu tümüyle koda karşı çıkarıldı (v9'daki NEXT). Öğrenilen: **stage-08 (final assembled prompt) runtime'da gözlenemiyor** (sadece build-time snapshot) → F-obs'un build-order'da 1. olmasının somut gerekçesi. TD-10 `sessionId` mint noktası (`chat.ts:449`) request spine'da doğrulandı.
- **FLOOR-1** (PR #18 → `84d9c57`; 2-commit seal `da904a6`+`4162782`, 497→504 test, docVersion 15→16) — **ARMES per-kind knowledge floor asimetrisi.** `composeArmes.ts` bare `.map()` idi (per-kind baseline fallback yok) → partial publish (blind-spot satırlarını archive etmek) **boş** blind-spot slice enjekte edip always-inject IKINCILUST empty≠zero kuralını düşürebiliyordu; Superset zaten `pick(rows, baseline)` ile floor'luyordu. Fix aynası: local `pick<T>`, 5 array kind + persona (`?? ARMES_PERSONA_TEXT`) + singleton'lar floor'landı. **Invariant:** `composeArmesContext([]).injected === renderArmesCriticalSlice()` (byte-identical). Eval-gate güvenli kanıtlandı: blind-spot guard **raw-row** (`evalGate.ts:98`), flooring'den bağımsız; tek verdict değişimi = empty-metrics reject→pass (zararsız). **Doğrulandı:** byte-identical, `composeSuperset.ts` untouched, 5+2 test.
- **OBS-2** (PR #19 → `b8a0e6d`; 2-commit seal `a94ddda`+`c2feb94`, 504→532 test, docVersion 16→17) — **all-provider LLM completion signals + empty-completion guard.** Kök: tek gateway tüm completion sinyallerini atıyordu (`onFinish` typed `{usage}` only). Fix: `gateway.ts` `onFinish` → full `OnFinishEvent` forward; saf `_lib/llm/completionGuard.ts` (`isEmptyCompletion` + `emptyCompletionMessage` finishReason-aware + `emptyCompletionEmitPayload` type-locked redaksiyon allow-list); `chat.ts` `llm_call` payload'ı finishReason/warnings/reasoning/cached/empty ile genişletildi + `[LLMFinish]` log + `onError`→`llm_error` + post-loop empty guard (`await result.finishReason`, closure değil) → boş ekran yerine dürüst mesaj. **Provider fallback YOK** (single-gateway). Redaksiyon hard (no text/headers/providerMetadata; type-locked allow-list). `payload` jsonb → migration yok. **Doğrulandı + canlı kanıt (Vercel MCP, trace `3e45d14e`):** `[LLMFinish] provider=gemini finishReason=stop output=0 reasoning=0 cached=0 warnings=0 empty=true` → teşhis **clean empty-stop**'a indi (content-filter/length/error DEĞİL; warnings=0 schema-rejection'ı zayıflatır), tool-set korelasyonu ayakta ([factory] `getZonesWithRecipeId*`).
- **CONTROL-PLANE VİZYONU** (strateji, kod değil) — 5 SOTA agent-mimari referansı kıyaslandı → kanonik **14-kademe master flow** + separation points (CWF'nin ilkesel ayrımları: core'da vector YOK, verification'da LLM-judge YOK = kimlik; planning DEFERRED→LangGraph). Differentiator: tam observe+tweak+replay+domain-aware-stub'ı hiçbir ticari araç yapmıyor (Langfuse/LangSmith read-only observe; playground'lar prompt-only replay; LangGraph Studio framework-bound; DSPy auto-optimize). **Bugün: observe ~9/14, tweak 5/14 (hepsi GOV-4 lab overlay), replay 0/14, stub 0/14** — boş replay sütunu = lab'ın kalbi. Strateji: teleskobu satın al (Langfuse/F-obs), mikroskobu üstüne kur.
- **DOC-3** (PR #20 → `44d5e74`; tek doc-commit `16f2ce2`, doc-only, docVersion 17→18) — **Agent Control Plane blueprint = 6. mimari tab + RULE 23.** `cwf-agent-control-plane-blueprint-v1.html` (14-kademe × observe/tweak/replay/stub matrisi; REPLAY sütunu 0/14 görünür) → `public/architecture/diagrams/agent-control-plane-blueprint.html` (served, kaynağa **byte-identical** — `diff -q` ile doğrulandı), `index.html` `TABS` (6 tab, header rev 4) + `manifest.json` (docVersion 18) **dar codeAreas** (`gateway.ts`, `labMode.ts` + rezerve `observability/**`, `replay/**`), **RULE 23** ile lock-step. **Doğrulandı:** diff doc-only (5 dosya), `check:doc-drift` lokalde `[OK] all 6 tabs synced`.

---

## 1. PARK EDİLEN — sıradaki büyük adım (BLOKE)

**PL-1 · F-obs gözlemlenebilirlik backbone** — **⛔ BLOKE (park-but-not-forget)** · control-plane build-order'ın **1. adımı** (observe omurgası)
**Blocked-on:** self-hosted Langfuse host **ayakta değil** → **OA-8**. Gereken: (i) host nereye (Docker Compose + Postgres + ClickHouse), (ii) **Vercel serverless egress'ten erişilebilir mi**. Mimari/altyapı girdisi — icat edilemez.
**Kapsam (değişmez):** F-obs1 (OTel SDK + LangfuseSpanProcessor + AI SDK `experimental_telemetry` + serverless force-flush) · F-obs2 (manuel span'lar `executeMCPTool`/DB-read + per-turn trace SSOT + session=`conversationId` + **TD-10 reconcile burada**) · F-obs3 (redaction span-processor'da + ledger-vs-tracing ADR).
**3 adlı tuzak:** (1) full-I/O redaction (deterministik scrubber, export öncesi) · (2) serverless force-flush (yoksa span hiç gitmez) · (3) OTLP/**HTTP-only** (gRPC desteklenmez).
**KİLİTLİ (re-litigate YOK):** per-turn kimlik SSOT = OTel trace id; 8-char log `traceId` ondan türetilir; İKİNCİ id mint EDİLMEZ; `telemetry_events.session_id`→`conversationId`; **standalone patch YOK — F-obs2'de tek seferde**; F-obs1 code-complete iner, "span düştü" kanıt-gate'i host ayağa kalkınca. **Control-plane bağı:** F-obs stage-08 (final prompt) + stage-03/10 (planning/per-step) observe boşluklarını kapatır — matrisin observe sütununu doldurur.

---

## 2. CONTROL-PLANE BUILD-ORDER (yeni kuzey yıldızı — blueprint = 6. tab)
Sıra, her katmanı **doğrulanabilir** kılan sırayla (observe→tweak→replay→stub):
- **CP-1 · Observe** = PL-1 F-obs (yukarıda; OA-8'e bloke). Trace tree + stage-08 final-prompt görünürlüğü.
- **CP-2 · Tweak** = GOV-4 lab overlay'ini 5 kademeden tüm tweakable'lara genişlet (server-authorized, session-only, read-only; governed state'e dokunmadan). Güvenlik modeli zaten var, bu kapsam.
- **CP-3 · Replay** = **asıl yeni inşa.** Bir isteğin stage input'larını yakala; bir kademeyi tweak'le yeniden koş; çıktıyı orijinalle diff'le. Boş sütun = mikroskobun kalbi.
- **CP-4 · Stub / Extensibility** = pluggable stage interface — eksik kademeye stub, ya da geliştirici küçük JS/Python transform yazıp izole çalıştırıp observe+replay ile etkisini görsün.
- **Kapsam dışı (bilinçli):** multi-agent orchestration — sonraki bölüm, bu değil.
- **UI evi:** control-plane'in observe/tweak yüzeyi bugün dağınık log + admin/settings/telemetry sayfalarında. **Panel redesign** (aşağıda OA/nit) bu katmanın UI evi — ayrı sıralı faz, RULE 23 ile blueprint'e bağlı.

---

## 3. PLANLANAN — diğer gelecek fazlar (control-plane dışı carry)
- **PL-2 · Eval golden harness** (Langfuse'la aynı çatı) · **PL-3 · `docs/ARCHITECTURE.md` + formal ADR'lar** · **PL-4 · Tam Tool Routing tab** · **PL-5 · Deny/quarantine UI** · **PL-6 · Cross-source reconciliation (Phase E)** = forged-label DETECTION · **PL-7 · LangGraph bridge (Shape B)** = stage-03 planning'in gerçek yeri; `runAgent` extraction first · **PL-8 · Self-improving KB.**

---

## 4. TEKNİK BORÇ
- **TD-13 · Gemini [factory] clean empty-stop — root-cause deneyi** *(YENİ — OBS-2 canlı kanıtından)* — gemini-2.5-flash [factory] tool-set'inde `finishReason=stop, warnings=0, output=0` (temiz boş-stop; safety/length değil). Tek somut ipucu tool-set korelasyonu. **Deney/fix:** `toolCategories.ts` [factory] bucket'ından `getZonesWithRecipeId` + `getZonesWithRecipeIdAndZoneTypes`'ı çıkar (recipe-scoped zone lookup'ları — "fabrika listesi" için gereksiz; `getFactoryList`/`getFactoryLines` karşılar), `[LLMFinish]`'ten `empty=true` düzeliyor mu oku. Düzelirse kalıcı fix; düzelmezse sebep prompt-shape. **UNBLOCKED, küçük.** Caveat: bu ikili [factory] tek bucket'ıysa gemini/openai filtered-path'te erişilemez olurlar (Anthropic full-set + router-learning'de erişim kalır) — AG prompt'unda doğrulat.
- **TD-10 · `telemetry_events.session_id` SSOT sapması** — `chat.ts:449` (bu session'da `:468`'den `:449`'a yeniden konumlandığı doğrulandı) her emit'te ikinci, korelasyonsuz per-turn id yazıyor; `conversationId` değil. Advisory. **Committed:** F-obs2'ye katlanır (OTel trace id'de birleştir + `session_id`→`conversationId`) — standalone patch YOK.
- **TD-8 · Force-signout / instant session-revoke** *(UM-1)* — id-ile-revoke yok; `disable`(ban) yenilemeyi engelliyor, access token TTL'e kadar geçerli. Gerçek revoke = GoTrue capability / service-role SQL / Edge Function.
- **TD-11 · `deleteUser` audit-FIRST ordering** — audit-or-alarm altında irreversible delete'in audit'i fail ederse kayıtsız silme + alarm. Silme için audit-FIRST daha güçlü; ayrı küçük hardening.
- **TD-12 · `api/**` coverage kapsamı** — coverage `include` `src`+`shared`; backend (governance/safety core) ölçülmüyor. `api/**`'a genişletmek gerçek artış + floor'u düşürür → ayrı kasıtlı faz.
- **TD-1 · Superset runtime empty≠zero validator (P7)** — facts-ledger hâlâ ARMES-zone-specific. Kırılgan regex YOK. *(Not: FLOOR-1 compose-katmanı paritesini kapattı; bu ayrı — runtime validator katmanı.)*
- **TD-2 · Phase D forged-label limit** — single-source self-consistent in-scope forged-label contained, not detected (PL-6 = detection).
- **TD-5 · DOC-1 drift-guard WARN→FAIL** — bilinçli ertelendi (build-FAIL iki-commit seal'i kırar; doğru yer PR/merge katmanı). *(RULE 23 de aynı WARN-only guard'a dayanıyor — escalation ikisini birden etkiler.)*
- **TD-4/6 · küçük nit'ler:** `/api/admin/rules/[id]` `url.parse()` DEP0169 · `index.html` statik docVersion span · OBS-1 clearAll match-all · Phase F pozisyonel `BACKEND_IDS[1]` · `shell.admin` i18n çifti uyumsuz (`tr:"Yönetişim"`/`en:"Admin"`).

---

## 5. OWNER-ACTION
- **OA-8 · Langfuse host yerleşimi** *(F-obs'u = CP-1'i unblock eder — kritik yol)* — self-hosted Langfuse nereye + Vercel egress'ten erişilebilir mi? Bu karar gelmeden F-obs kanıt-gate'i tatmin edilemez (kod code-complete inebilir).
- **OA-10 · Admin/settings/telemetry panel REDESIGN** *(YENİ — Maymun flag'ledi: pitiful/dumb, telemetry sayfasının kabul edilemez bug'ları + eksik feature'ları)* — control-plane'in UI evi. Ayrı sıralı faz; blueprint'e RULE 23 ile bağlı. Maymun panelleri gösterecek → kapsam o zaman çıkar.
- **OA-9 · FIX-2B + FIX-3A crossover/session live-verify** — app açılınca OA-1 ile batch.
- **OA-1 · viz live acid test** *(carry)* — gerçek ARMES tool → grid + chart → reload → boş-liste.
- **OA-5 · Stricter email-change (opsiyon)** · **OA-6 · User-facing forgot-password** · **OA-7 · `APP_BASE_URL` prod env (ops)** · **OA-2/3/4 · `seedRules.ts` (Superset publish) · `backend_id:'superset'` backfill · real-ARMES confidence pass** — durum teyit.

---

## Architect-önerisi öncelik
Bu session üç iş kapattı (FLOOR-1 resilience · OBS-2 observability · DOC-3 doc) ve **kuzey yıldızını netleştirdi: single-agent control plane** (blueprint artık 6. tab, RULE 23 ile canlı). Bug-fix borcu yok. **Kritik yol control-plane build-order:** CP-1 F-obs (OA-8'e bloke) → CP-2 tweak → CP-3 replay → CP-4 stub. **Ama hemen yapılabilir tek somut iş var: TD-13 Gemini root-cause deneyi** — unblocked, küçük, OBS-2 teşhis döngüsünü kapatır, ve `[LLMFinish]` sayesinde sonucu log'dan kesin okuruz. **Committed öneri:** yeni session'da ya (a) TD-13 deneyini koş (unblocked, OBS-2'yi bitirir), ya (b) OA-8'i cevapla → F-obs1'i code-complete yaz (build-order başlar), ya (c) OA-10 panel redesign'a gir (control-plane'in UI evi). Maymun yön seçer; ben seçilen fazın gated AG prompt'unu yazarım.
