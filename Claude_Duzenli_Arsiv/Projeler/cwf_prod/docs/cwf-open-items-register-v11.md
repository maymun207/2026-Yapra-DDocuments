# CWF / EAIP — Açık İş Kaydı (Open-Items Register)
**rev 11 · 2026-07-01 · HEAD `5302ff1` (TD-13 fix `8b79084` · OBS-3 `5302ff1` merged; 551 test; docVersion rev 20)**

v10'dan farkı: bu session **empty-stop destanını** koştu — ve önemli bir ders çıkardı. **TD-13 re-scope** (`getZonesWithRecipeId*` [factory]→[production], `8b79084`, 535 test, rev 19) meşru bir intent düzeltmesi olarak indi **ama empty'yi ÇÖZMEDİ**: Claude 2-sample preview'e bakıp "MERGE GO, Gemini exonerated" dedi, prod (`cc4792a8`) bunu yanlışladı — aynı 6-tool offered set boşa düştü. **Düzeltme: [factory]+Gemini empty STOKASTİK + input-korele, tool-composition DEĞİL.** Ardından **OBS-3** (`5302ff1`, 551 test, rev 20, ADR-003) bounded same-provider retry ekledi; mekanizma canlıda çalıştı (`8d24bad3`: 3 deneme de boş → bounded-stop → dürüst mesaj) **ama identical retry gerekli-ama-yetersiz** (temp=0.7'de bile aynı input 3× boş). Empty artık **contained + instrumented** (dürüst floor, blank asla), **çözülmedi**. **Kavşak ÇÖZÜLDÜ:** OA-10 (control-plane UI evi) + F-obs/replay sıradaki; empty-completion replay lab'ının ilk müşterisi.

---

## ✅ AGREED SEQUENCE (kararlaştırılan sıra)
1–14. **(bitti — v10'da kapandı)** bug-fix hattı · N53 flow deep-dive · FLOOR-1 (#18) · OBS-2 (#19) · CONTROL-PLANE VİZYONU · DOC-3 (#20).
15. **(bitti — ama dersli)** **TD-13** (`8b79084`) — `getZonesWithRecipeId*` [factory]→[production] re-scope. Intent düzeltmesi olarak sağlam, **empty'yi çözmedi** (empty stokastik çıktı).
16. **(bitti — kısmi)** **OBS-3** (`5302ff1`) — bounded same-provider empty-retry. Mekanizma çalışıyor, floor sağlam; korele empty fraksiyonu direniyor → **OBS-3.1 perturbed retry** açık borç.
17. **Sıradaki (yeni session):** kavşak çözüldü → **OA-10 panel redesign + F-obs/replay** (empty-completion = replay'in ilk müşterisi). F-obs hâlâ **OA-8**'e bloke.

---

## 0. Bu session-line'da KAPATILANLAR / netleşenler
- **TD-13** (`8b79084`; 2-commit seal `3b75c93`+`215cda6`, 532→535 test, rev 19; 4 tab reseal — Runtime Topology dahil, drift-guard 3 değil 4 flag'ledi) — **re-scope shipped.** `getZonesWithRecipeId`+`getZonesWithRecipeIdAndZoneTypes` [factory]→[production] (recipe intent'i zaten reçete tool'larına sahip + reçete/recipe/order keyword'leriyle kapılı); `[factory].tools`=`['getFactoryList','getFactoryLines']` (ikisi `ALWAYS_INCLUDE`). Emsal: `metrics` kategorisinin PHASE-F küründe olduğu gibi (tool'u ait olduğu intent'e taşı, silme). **Kritik ders (D46):** probe 2 preview run'ı temizledi → Claude "MERGE GO, mekanizma kesin, Gemini exonerated" dedi → **prod (`cc4792a8`) yanlışladı** (aynı 6-tool set boş). Empty stokastik+input-korele, tool-comp değil. **Stokastik bug'ta küçük temiz örneklem kanıt değil.**
- **OBS-3** (`5302ff1`; 2-commit seal `5b59185`+`32b3018`, 535→551 test, rev 20, ADR-003) — **bounded same-provider empty-completion retry.** `completionGuard.ts`: `isRetriableEmpty` (empty+no-tool + finishReason∈{stop,other,unknown,undefined}), `decideRetry`→accept|retry|give-up (`attempt<maxRetries` bound), `filterPreTokenDelta` (whitespace suppression → no double-paint), `emptyRetryEmitPayload` (redacted, `kind:'empty_retry'` piggyback — governed-schema değişmedi). `config.ts` `LLM_EMPTY_RETRY_MAX` (default 2 = 3 deneme; `!== undefined` → explicit 0 kapatır). chat.ts streaming block `for(attempt=0..MAX)` ile sarıldı, **her attempt identical `providerRec` — farklı provider ASLA**; non-empty (text OR tool-call) kazanır; tükenince/non-transient → değişmemiş OBS-2 dürüst mesajı; attempt-indexed `[LLMFinish]`/`llm_call` + `[LLMRetry]` empty oranını gözlemlenebilir yaptı. **Prensip uzlaşması (ADR-003):** cross-provider silent swap hâlâ banlı; bounded logged same-provider retry izinli. **Canlı doğrulama:** mekanizma tam çalıştı (`8d24bad3`: attempt 0/1/2 hepsi empty → bounded-stop → dürüst mesaj). **BULGU:** identical retry **gerekli ama yetersiz** — `GEN_TEMPERATURE=0.7` (greedy değil) iken aynı input 3× boş → empty **input-korele** (bazı input ~%70-90 empty, çoğu düşük); temp-0.7 resampling yüksek-empty bölgesinden çıkmıyor. Kullanıcı-görünür empty ~%14 (hammerlanmış sorgu, retry'a rağmen), floor sağlam.

---

## 1. PARK EDİLEN — sıradaki büyük adım (BLOKE)

**PL-1 · F-obs gözlemlenebilirlik backbone** — **⛔ BLOKE (park-but-not-forget)** · control-plane build-order'ın **1. adımı**
**Blocked-on: OA-8** — self-hosted Langfuse host ayakta değil; (i) host nereye (Docker Compose + Postgres + ClickHouse), (ii) Vercel serverless egress'ten erişilebilir mi. Mimari/altyapı girdisi.
**Kapsam (değişmez):** F-obs1 (OTel SDK + LangfuseSpanProcessor + AI SDK `experimental_telemetry` + serverless force-flush) · F-obs2 (manuel span'lar + per-turn trace SSOT + session=`conversationId` + **TD-10 reconcile**) · F-obs3 (redaction span-processor'da + ledger-vs-tracing ADR).
**3 tuzak:** full-I/O redaction · serverless force-flush · OTLP/**HTTP-only**.
**KİLİTLİ:** per-turn SSOT = OTel trace id; 8-char log `traceId` ondan türer; ikinci id mint YOK; `telemetry_events.session_id`→`conversationId`; standalone patch YOK (F-obs2'de). **Yeni bağ:** F-obs + replay, **OBS-3.1'in tasarım zemini** — empty-completion replay'in ilk müşterisi.

---

## 2. CONTROL-PLANE BUILD-ORDER (kuzey yıldızı — blueprint = 6. tab) — kavşak çözüldü
Bu session'ın dersleri build-order'ı **doğruladı** (stokastik bir arızayı manuel N-rep ile karakterize edememek = replay'in somut gerekçesi):
- **CP-1 · Observe** = PL-1 F-obs (OA-8'e bloke). Trace tree + stage-08 final-prompt görünürlüğü.
- **CP-2 · Tweak** = GOV-4 lab overlay'ini tüm tweakable'lara genişlet (server-authorized, session-only, read-only).
- **CP-3 · Replay** = asıl yeni inşa; bir isteğin stage input'larını yakala, bir kademeyi tweak'le yeniden koş, çıktıyı diff'le. **İlk müşteri = empty-completion:** hangi input'lar yüksek-empty, OBS-3.1 nudge'ı bölgeyi kırıyor mu.
- **CP-4 · Stub / Extensibility.**
- **Kapsam dışı:** multi-agent.
- **UI evi = OA-10 panel redesign** (aşağıda) — control-plane'in observe/tweak yüzeyi, RULE 23 ile blueprint'e bağlı. **Committed: bir sonraki somut faz bu** (F-obs OA-8'e bloke olduğu için önce UI evi kurulur, F-obs indiğinde bozuk eve değil temiz eve düşer).

---

## 3. PLANLANAN — diğer gelecek fazlar
- **PL-2 · Eval golden harness** · **PL-3 · `docs/ARCHITECTURE.md` + ADR'lar** · **PL-4 · Tam Tool Routing tab** · **PL-5 · Deny/quarantine UI** · **PL-6 · Cross-source reconciliation (Phase E)** = forged-label detection · **PL-7 · LangGraph bridge (Shape B)** · **PL-8 · Self-improving KB.**

---

## 4. TEKNİK BORÇ
- **TD-13 · KAPANDI (re-scope shipped) → yerini OBS-3.1'e bıraktı.** Re-scope meşru ve indi; ama empty'nin gerçek çözümü OBS-3.1 (aşağıda). TD-13 satırı artık "root-cause deneyi" değil.
- **OBS-3.1 · Perturbed empty-retry** *(YENİ — OBS-3 bulgusundan; asıl açık iş)* — identical same-provider retry input-korele empty'yi kurtaramıyor (`8d24bad3`: 3 deneme de boş, temp 0.7). Gereken: retry'da input'u **perturbe et** (aynı-provider, bounded kalarak): kısa "cevabını üret" nudge'ı ve/veya temperature bump, ki yüksek-empty bölgeden çıksın. **`LLM_EMPTY_RETRY_MAX`'i artırmak ÇÖZMEZ** (identical retry aynı bölgede kalır). **KÖR TAHMİNLE YAPMA** — Claude iki kez reaktif yanıldı; **replay-harness verisine karşı tasarla** (hangi input yüksek-empty, nudge bölgeyi kırıyor mu). Replay lab'ının ilk müşterisi. Şimdilik pasif prod gözlemi (`[LLMRetry]`/attempt-indexed `[LLMFinish]`) empty oranını veriyor.
- **TD-10 · `telemetry_events.session_id` SSOT sapması** — her emit'te ikinci korelasyonsuz per-turn id; `conversationId` değil. Advisory. **Committed:** F-obs2'ye katlanır — standalone patch YOK.
- **TD-8 · Force-signout / instant session-revoke** *(UM-1)* — id-ile-revoke yok; gerçek revoke = GoTrue capability / service-role SQL / Edge Function.
- **TD-11 · `deleteUser` audit-FIRST ordering** — irreversible delete için audit-FIRST daha güçlü; ayrı küçük hardening.
- **TD-12 · `api/**` coverage kapsamı** — backend core ölçülmüyor; `api/**`'a genişletmek gerçek artış + floor'u düşürür → ayrı kasıtlı faz.
- **TD-1 · Superset runtime empty≠zero validator (P7)** — facts-ledger ARMES-zone-specific; kırılgan regex YOK.
- **TD-2 · Phase D forged-label limit** — contained, not detected (PL-6 = detection).
- **TD-5 · DOC-1 drift-guard WARN→FAIL** — bilinçli ertelendi (build-FAIL iki-commit seal'i kırar; RULE 23 de aynı guard'a dayanıyor).
- **TD-4/6 · küçük nit'ler:** `url.parse()` DEP0169 · statik docVersion span · OBS-1 clearAll match-all · Phase F pozisyonel `BACKEND_IDS[1]` · `shell.admin` i18n çifti (`tr:"Yönetişim"`/`en:"Admin"`).

---

## 5. OWNER-ACTION
- **OA-8 · Langfuse host yerleşimi** *(F-obs = CP-1'i unblock eder)* — nereye + Vercel egress'ten erişilebilir mi? Gelmeden F-obs kanıt-gate'i tatmin edilemez (kod code-complete inebilir).
- **OA-10 · Admin/settings/telemetry panel REDESIGN** *(control-plane'in UI evi — committed next concrete phase)* — Maymun panelleri gösterecek → kapsam çıkar; RULE 23 ile blueprint'e bağlı.
- **OA-11 · Empty-completion pasif izleme** *(YENİ, düşük efor)* — OBS-3 instrumented; ilk gerçek `[LLMRetry] → attempt=1 empty=false` (retry'ın bir empty'yi KURTARDIĞI) prod loglarında geldiğinde Claude pasif okur → OBS-3'ün transient-recovery yarısı da doğrulanmış olur. Manuel grind gerekmez.
- **OA-9 · crossover/session live-verify** · **OA-1 · viz live acid test** — app açılınca batch.
- **OA-5/6/7 · email-change / forgot-password / `APP_BASE_URL` prod env** · **OA-2/3/4 · `seedRules.ts` (Superset publish) · `backend_id:'superset'` backfill · real-ARMES confidence pass** — durum teyit.

---

## Architect-önerisi öncelik
Bu session empty-stop destanını koştu ve iki kez stokastikliğe yenildi (TD-13 2-sample over-call → prod falsified; OBS-3 happy-path 6/6 clean ≠ retry-recovers). **Sonuç: empty contained + instrumented + honest floor, ama çözülmedi; gerçek fix (OBS-3.1 perturbed retry) veriye dayalı olmalı.** Ve bu, control-plane/replay tezinin somut kanıtı oldu — manuel N-rep stokastik input-korele arızayı karakterize edemiyor. **Committed öncelik:** kavşak çözüldü → **OA-10 (control-plane UI evi) sıradaki somut faz** (F-obs OA-8'e bloke; UI evini önce kur ki F-obs temiz düşsün), paralelde **OA-8** kararı. Empty-completion **replay lab'ının ilk müşterisi** olarak OBS-3.1 için bekliyor — kör tahminle değil, replay verisiyle. Maymun yön seçer; ben seçilen fazın gated AG prompt'unu yazarım.
