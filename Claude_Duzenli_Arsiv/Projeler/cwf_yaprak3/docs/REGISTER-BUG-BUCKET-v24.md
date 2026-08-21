# REGISTER-BUG-BUCKET v24 — S85 kapanışı (2026-08-07)
<!-- v23'ü geçersiz kılar. İŞLEYEN KUYRUĞUN TEK KAYNAĞI. Board yeniden
     müzakere edilmez; yeni kalemler adlı ekleme olarak girer. -->

## §BUG.1 · S85'TE KAPANANLAR (kanıt register v89 §1'de)
BUG-033 ✅ (dış arıza) · **BUG-012 → RESOLVED-GUARDED** (merge `10525a2`; canlı
mühür ARMED: ilk doğal tur `collisions=[]`) · **W-024 ✅** (merge `e32ccb4`) ·
**BUG-010 ✅** (satır `dcc2bbb8`, çift tanık) · **BUG-011 ✅** (satır `914b7a03`,
`waitUntil` altında ilk doğum) · CI-DIET-1 ✅ (alet; P1 çift düzlem).

## §BUG.2 · ARMED NÖBETLER (pasif; Architect okur; ÜRETİLMEZ)
- BUG-012 canlı mührü: ilk doğal tur `[ToolRegistry] collisions=[]` (DB-mühür:
  0 deklarasyon/185/4, pozitif kontrollü — dolu kayıt YENİ olgudur, mühür değil).
- BUG-028 canlı mührü: aynı turda başlık/Kanıt paritesi TAM yerel rosterle.
- BUG-010 down-kolu: doğal ulaşılamaz örnek çıkana dek.
- BUG-032 P1/P2 · `[GatewaySearchZero]` · BUG-029 dil · chartId çipi: v23'teki
  tanımlarıyla sürer.

## §BUG.3 · S86 İŞLEYEN SIRA
| # | İş | Not |
|---|---|---|
| 1 | **FAULT-SWITCH-0** (rollout 2.3b) | Alet: env-armed · salt-okuma · deterministik · fails-loud · kanıt PREVIEW (sahip hükmü b). S85 yüzey haritası bootstrap v86 §D.1'de; D-1 derin recon ŞART (ateşleme semantiği + preview kanıt mekaniği baytta). Anahtarlar `^MCP_`'den uzak |
| 2 | **BUG-006 + BUG-009** | #1'in çıktısıyla BİTİŞİK (ratife): çit ateşlemesi log-yokluğundan çıkarımı biter; withholding okuma arızası "hiç saklanmadı"dan ayrışır |
| 3 | 2F.1 PROCEDURE-RECALL | başarılı turdan rutin; SUCCESS-ONLY sonrası anlamlı |
| 4 | 2F.2 SEMANTIC-MEMORY | sahip tetiği çekilmişti — soru→artefakt olgusu, tam kalem |
| 5 | 2F.3 STEP-EFFICIENCY | referans çifti: 910675a7 calls=8 vs d94bcfc3 calls=5 conv=1; S84 eki: T4/T5 bayt-aynı tekrar (tur-arası araç notu yok) |
| 6 | BUG-015 + BUG-016 → BUG-017 | |
| 7 | 2F.4 PLANNER-0 → 2E.2/3/4 → HONESTBENCH-RUN-1 | |
| 8 | **BUG-005** | PROJE KAPANIŞI — EN SON |

**Ratife kısıtlar korunur:** FAULT-SWITCH-0 → 006+009 bitişik · BUG-005 son.

## §W · İZLEME/ALET KALEMLERİ
- **W-025 (YENİ, S85):** doc-drift `likelyCulprits` uncommitted sebepte masum
  dosyaları suçlar (commit'li tarihi diff'ler). İpucu-kalitesi; gate hükmü
  doğru. Doc-drift'e dokunan ilk faza biner.
- **W-022:** verifySupersetGatewayLive bayat — v23 tanımıyla sürer.
- **RAG 3-soru relay'i** · **W-020 R1/R2:** sahip beklemesinde.
- ATTR_TOOL_COLLISION_* sabitlerinin config.ts'e taşınması: kodda yorumlu borç,
  observability'ye dokunan ilk faza biner (kalem açılmadı, kod taşıyor).

## §PARK
**RELAY-BUS-1** — tetik: SAHİP SİNYALİ (register v89 §4'te tam gerekçe +
doğrulanmış ürün gerçekleri). TENANT-CONSOLE/EAIP-TENANT ailesi: müşteri #2 /
online-satış tetiğiyle.
<!-- END bucket v24 -->
