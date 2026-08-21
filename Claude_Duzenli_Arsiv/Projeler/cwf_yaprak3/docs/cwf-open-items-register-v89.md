# cwf-open-items-register-v89 — S85 kapanışı (2026-08-07)
<!-- v88'i geçersiz kılar. S37-1: sürümlü, sessizce üzerine yazılmaz.
     Her satır bu oturumda KOŞULMUŞ komut/okuma kaynaklı (D-3). -->

## §1 · S85'TE KAPANANLAR (kanıt zincirli)
| Kalem | Kapanış kanıtı |
|---|---|
| **CI-DIET-1** | merge `637fe0a` (5/5, canary 3:26 underpowered) · P1 her iki düzlem kontrollü (`f2b72df`: probe `e6162e0` → 0 run + deploy CANCELED; head_sha merceği kontroller 1/1) · rapor push'ları artık bedava |
| **TOOL-NAME-COLLISION-1 / BUG-012→RESOLVED-GUARDED** | merge `10525a2` (AG-2; 5/5, canary 3:23) · suite 487/5617 mutabakatlı · DB mühür-okuması: 3 yerel ad × 185 satır × 4 backend = **0 deklarasyon** (pozitif kontrol: getFactoryLines/list_datasets ateşledi) → beklenen ilk-tur okuması `collisions=[]` MEVCUT-ve-BOŞ |
| **LEDGER-COMPLETE-1 / W-024 emekli** | merge `e32ccb4` (5/5, canary 3:43, checkedReps:1) · rev 207 · `--cleanup=strip` ilk canlı başarı (gövde boş) |
| **PROBE-PARITY-1 / BUG-010 + BUG-011 KAPALI** | merge `cd24285` (5/5, canary 3:49) · rev 208, Governance Model REDRAWN stamp 9 · suite 490/5642 · **BUG-010 mührü:** satır `dcc2bbb8…` armes·up·1340ms·141tool·19:35:54 + `/api/admin/mcp-probe` 1 çağrı (cron salvosu 19:31'de ayrı, karışma yok) · **BUG-011 mührü:** satır `914b7a03…` honestbench·up·664ms·19:36:57, aç-kaydet'ten ~1 dk, `waitUntil` altında ilk doğum + `/api/admin/mcp-settings` 3 çağrı; kapat-kaydet'in satırsızlığı DOĞRU (devre dışı senkronlanmaz) |
| **BUG-033** | dış arızaydı, S85 açılışında kapalı teyit (run'lar tüm gün doğdu) |
| **RULING-S85-1** | AG-2 merge gövdesindeki git-otomatik `# Conflicts:` bloğu: OLDUĞU GİBİ KABUL — doğrulanmış/deploy'lu tarih yorum bloğu için yeniden yazılmaz. Önleme: tüm merge GO'larında `--cleanup=strip` (LEDGER'de tuttu) |

## §2 · ARMED (pasif nöbet — Architect okur, sahibe iş yok)
- **BUG-012 canlı mührü:** ilk DOĞAL turda `[ToolRegistry] collisions=[]` (tüm gün doğal tur yaşanmadı — `ToolRegistry` 0, lens pozitif kontrollü: aynı deployment 62 satır gösterdi).
- **BUG-028 canlı mührü (yükseltilmiş):** aynı ilk doğal turda başlık/Kanıt paritesi artık TAM yerel rosteri kapsar (LEDGER sonrası).
- **BUG-010 down-kolu:** dört backend de sağlıklı; ulaşılamaz doğal örnek çıkana dek ARMED — üretilmez (sonda ekonomisi).
- Diğer ARMED aile (BUG-032 P1/P2 · GatewaySearchZero · BUG-029 dil · chartId çipi) v88'deki gibi sürer.

## §3 · YENİ/AÇIK KALEMLER
- **W-025 (S85 doğumu):** `check:doc-drift` `likelyCulprits` ipucu commit'lenmiş tarihi diff'liyor; gerçek sebep uncommitted iken masum dosyaları suçladı (CI-DIET vakası). İpucu-kalitesi; doc-drift'e dokunan ilk faza biner.
- **W-022:** verifySupersetGatewayLive bayat — v88'deki yeriyle sürer.
- **RAG 3-soru relay'i · W-020 R1/R2:** sahip beklemesinde, değişmedi.
- **BUG-006 + BUG-009:** açık; aleti FAULT-SWITCH-0 (S86 #1'in çıktısıyla).

## §4 · PARK (adlı yeniden-giriş tetikli)
- **RELAY-BUS-1** — üç-taraf posta kutusu (kendi Vercel'imizde remote MCP; Architect'e custom connector, AG/Gemini MCP istemcisi). Tetik: SAHİP SİNYALİ. Ürün gerçekleri doğrulandı: claude.ai bulunttan bağlanır → kamuya açık URL şart; header-auth beta mevcut; yerel makineye bağlanılamaz. ADR-014 taslağı + faz promptu Architect'te sinyalle yazılır. Karanlık-bölge vakası (push'lanmamış şerit çıktısı, S85'te 1 kez zararsız yaşandı) gerekçe dosyasına işli. TENANT-CONSOLE ailesi v88'deki gibi parkta.

## §5 · S85 DERSLERİ/YASALARI (doktrin-dışı, kayda)
- **S85-1:** Ayakta-GO kendi kendini AÇMAZ — şeritler tur-tabanlıdır, önkoşulu ancak tur aldıklarında kontrol ederler; sahipten tek-satır kalp atışı ayakta-GO deseninin parçasıdır.
- **ÖNCÜL #28:** iki noktadan yön okunmaz — LEDGER raporunun "alet güçsüzleşiyor" (scoredReps 2→1) çıkarımını PROBE-PARITY raporu geri çekti; trend iddiası ≥N nokta ister.
- **GO beklentileri TABAN+DELTA yazılır:** COLLISION GO'sundaki mutlak 486/5610, CI-DIET araya girince bayadı; delta (+1/+11) değişmezdi. Mutabakat cümlesi GO'ya baştan konur.
- Canary yakınsama serisi (yeni çit altında ilk gün): **3:26 · 3:23 · 3:43 · 3:49** — sıfır 900'lük yanık.

## §6 · KUYRUK → bucket v24 TEK işleyen kaynak (bu liste türev)
FAULT-SWITCH-0 → BUG-006+009 → 2F.1 → 2F.2 → 2F.3 → 015+016 → 017 →
2F.4 PLANNER-0 → 2E.2/3/4 → HONESTBENCH-RUN-1 → BUG-005 SON.

## §7 · PROJE DOSYASI TEMİZLİĞİ (sahip, S86 öncesi)
Kaldır: BOOTSTRAP v85 · register v88 · bucket v23 · KB v85 · doctrine v1_2.
Yükle: BOOTSTRAP v86 · register v89 · bucket v24 · KB v86 · doctrine v1_3.
<!-- END v89 -->
