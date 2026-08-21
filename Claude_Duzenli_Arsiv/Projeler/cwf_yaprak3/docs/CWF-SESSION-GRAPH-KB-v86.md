# CWF-SESSION-GRAPH-KB v86 — S85 eklendi (2026-08-07)
<!-- v85'i geçersiz kılar. S85 düğümü; önceki oturum grafiği v85'ten aynen devralınır,
     burada yalnız S85 düğümü + değişen kalıcı yasalar yazılıdır. -->

## S85 DÜĞÜMÜ — "diyet günü": 4 faz, 4 yakınsama, 2 mühür, doktrin v1_3
**Açılış:** master `be8509ef` · 485/5599 · rev 205 · migrations 67 · ADR 13 · roster 18 — hepsi taze tam klonda yeniden hesaplandı, sapma 0.
**Kapanış:** master `e98edb8` · **490/5642** · **rev 208** · migrations 67 (gün boyu SIFIR migration, SIFIR Operator adımı) · ADR 13 · roster 18 · canlı deploy `dpl_25jN…` READY @ `cd24285`.

### Merge zinciri (first-parent, hepsi --no-ff, hepsi 5/5 + canary yakınsadı)
`be8509ef` → **`637fe0a` CI-DIET-1** (rapor `e6162e0`, P1 `f2b72df`) → **`10525a2` TOOL-NAME-COLLISION-1** (AG-2; rapor `b1360e5`, P1 `57e736a`) → **`e32ccb4` LEDGER-COMPLETE-1** (rapor `38d3908`, P1 `9ebb05f`) → **`cd24285` PROBE-PARITY-1** (rapor `914769a`, P1+deploy-kanıtı `e98edb8`).

### Faz özleri (tek satır ruh + kalıcı teknik gerçek)
- **CI-DIET-1:** rapor push'u tam CI takımı satın alıyor ve merge'in canary'sini çalıyordu. `paths-ignore [docs/**, .agents/**]` yalnız push'ta (PR bilerek filtresiz); canary çiti `ref==master` (dispatch-on-branch deliği kapalı); concurrency master-dışı cancel; `vercel-ignore.mjs` (Vercel exit TERSLİĞİ: 0=SKIP — sabitler etkiyle adlı; her okunamayan yol BUILD'e; `[].every()===true` tuzağı yorumlu; NUL-delimited). `public/docs/*.md` RUNTIME-SERVED — uzantı-glob'u asla. yaml↔mjs parite testi roster driftini kilitler. rev 205 TUTULDU (reseal hash-only; 206 COLLISION'ındı — W-023 tekrarından kaçınıldı). `allowJs:true` tsconfig.api.test'e (tek-kaynak > driftleyen .d.mts).
- **COLLISION-1:** tek namespace, ilk iddia kazanır, her kayıp seslidir. Yerel rezervasyon loop ÖNCESİ; tek `continue` iki store'u birden gate'ler; `collisions=[]` her turda MEVCUT (MCP'siz dahil); sanitize-SONRASI ad çakışır. Yeni ATTR_* sabitleri geçici olarak stageTools'ta (fence gereği; config.ts'e taşınma borcu kodda yorumlu). İlk GO STOP'u yük taşıdı: kanıt sırası = CI-DIET önce.
- **LEDGER-COMPLETE-1:** iki meta-araç closure'ı `recordToolCall` dikişine bağlandı (`?? null` yük taşır; senkronluk DOĞRULANDI — Promise stringify "{}" tuzağı AG yakalayışı). Parite artık tam yerel rosteri görür.
- **PROBE-PARITY-1:** probe'un kanıtı satır olur, save zinciri yaşam garantisi alır. `recorded` DÜRÜSTLÜK alanı (status değil); backend_id yalnız BEYANDAN (backendOf() ARMES-fallback'i yanlış-atıf tuzağı — test-pinli); non-attempt `ProbeNotAttemptedError` ile DİKİŞE İLETİLİR ("karar verip kayıt bırakmayan yol, karar doğruyken bile defekttir"); `waitUntil` = "umut garanti olur" (`@vercel/functions@^3.8.0`); census: syncBackendCatalog'un TAM 3 çağıranı. Governance Model REDRAWN (stamp 9).

### Doktrin v1_3 — İLK GÜN SONUÇLARI (DENEME sürüyor; 0 tripwire)
Çalıştı: sensör modu (git fetch + Vercel MCP + Supabase RO — her okuma adlı-kaynak), ayakta-GO'lar (AG-2 nudge sonrası kendi açıldı; AG-1 LEDGER→PROBE-PARITY'ye relay'siz geçti), boru hattı bindirmesi (LEDGER promptu COLLISION merge'i sürerken, PROBE-PARITY promptu LEDGER sürerken yazıldı), sahip-ekran sensörü (GitHub 403 kör düzlemini screenshot kapattı). Ders S85-1: ayakta-GO kalp atışı ister. Karanlık bölge 1 kez zararsız yaşandı (push'suz şerit durumu) → RELAY-BUS-1 gerekçesine işli.

### Mühür okumaları (Architect, çift tanık)
BUG-010: `backend_health` satır `dcc2bbb8` (armes·1340ms·141·19:35:54) + mcp-probe 1 çağrı; cron salvosu (19:31, 4-backend) ayrık. BUG-011: satır `914b7a03` (honestbench·664ms·19:36:57) + mcp-settings 3 çağrı; kapat-kaydet satırsızlığı doğru davranış. BUG-012 DB-mühürü: 0 deklarasyon / 185 satır / 4 backend, pozitif kontrollü. Doğal tur GÜN BOYU 0 (`ToolRegistry` lensli, kontrollü) → canlı mühürler ARMED devretti.

### Kalıcı yasa güncellemeleri
- RULING-S85-1 + `--cleanup=strip` tüm merge GO'larında.
- ÖNCÜL #28: iki noktadan yön yok (AG'nin kendi düzeltmesi, PROBE-PARITY raporunda).
- GO beklentileri TABAN+DELTA.
- S84-1 kitapta kalır; CI-DIET(d) konfigürasyonunda yapısal gereksiz.
- Vercel MCP notlarına ek: `list_deployments` meta'sı commit mesajı+SHA taşır (deploy-kimlik eşlemesi için yeterli); docs-push deploy'ları CANCELED görünür (ignoreCommand izi).
<!-- END KB v86 -->
