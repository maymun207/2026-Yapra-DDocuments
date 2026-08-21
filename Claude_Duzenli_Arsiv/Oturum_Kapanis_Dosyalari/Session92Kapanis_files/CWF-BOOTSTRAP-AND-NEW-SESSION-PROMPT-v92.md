# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT · v92 — S92 açılışı

<!-- v91'i geçersiz kılar. S37-1. İlk mesaj: "S91'den devam". -->

## §A · KİMLİK + YASALAR (verbatim tekrar zorunlu)

SOTA-1 + S82-6 ilk mesajda **verbatim**. Doktrin **v1_4** · D-7 · dalga
sözleşmesi + S88-1 DALGA-ÇAPA · S74-3/4 bekleme sözleşmesi (⚠ **düzeltildi:
Architect'in TIMER'ı YOKTUR** — EXPIRY saatte değil, sahibin bir sonraki
mesajında ateşlenir) · otomasyon-önce · sahip maddeleri insan-dili.

Yürürlükteki yasa katmanları: **S89 beşlisi** (KAPI-YETKİ 4 madde · BEYAN ·
TAM-YELPAZE · TEZGÂH · sıralama) · **S90 ikilisi** (S90-1 TEK-SKALER SESSİZ
MUTABAKAT · S90-2 mühür beklentisi yazılmaz) · **S91 altılısı** (S91-1 bayat
blokaj · S91-2 relay yönlendirme · **S91-3 ŞERİT-TAMLIK KAPISI** · S91-4 faz
promptu kendi kendine yeter · S91-5 faz promptu tamlık kapısı · S91-6 tam SHA).

Sahip hükümleri: register **v95 §1 (H1–H7)**.

## §B · RULE-25 BOOT (taze TAM klon; iddia edilen zemin — DOĞRULANACAK)

`origin/master` **`00062c7871a994fea3d63a79ba3c918b5201f263`** ·
docVersion **rev 223** · **518** test dosyası / **6322** test, 0 skip ·
**68** migration · **13** ADR · GATEWAY_RULES **18** yayınlı (**kod tabanı da
18** — v94'ün "16+2" parantezi bayattı, düzeltildi) · `phase/*` **27** ·
üretim `dpl_JE98TTsGH7FPGdxiYcyHeBsKKDLr` **READY** @ `39a0b90`.

**S91 merge'leri:** `d32482f` (STAGE-CARD-COVERAGE-1, rev 222) ·
`39a0b90` (METRIC-REGISTRY-DATA-1, rev 223).

**Governed canlı durum:** `armes.metric_registry` **3 yayınlı**
(`oee` order 1 · `fire` order 2 + `categoryHints:["quality"]` · `throughput`
order 3) · `superset.tool_annotation` **4 taslak, o yoldan sıfır publish** ·
`armes.tool_annotation` 141 yayınlı/44 taslak · `system.plan_template` 5 ·
`armes.tool_category` 12 yayınlı/4 taslak · gateway_rule 18 ·
`router.learnEnabled` **0**.

## §C · S92'NİN İLK İŞLERİ (sıra — rollout v2_8 hükmü)

1. **`CANARY-POWER-1`** — sahip-ratifiye PİLOT. Kanarya **10 ardışık merge'de**
   `verdict: null`; `scoredReps` 4·2·3·6·3, son merge'de **düştü**. Bu, dış
   ölçüm yerine geçecek **iç geri besleme döngüsüdür** ve şu an kırık.
2. **`LEARNING-SNAPSHOT-1`** — sahip hükmü: ŞART. Tasarım notu hazır
   (`cwf-design-LEARNING-SNAPSHOT-1-v1`); faz promptu recon ile açılır.
3. **`ROUTING-FLOOR-BACKEND-1`** — METRIC-REGISTRY-DATA-1'in adlandırılmış
   dışlaması, 2E ray ailesi.
4. **`STAGE-CONTEXT-TRUTH-1`** (api/**) ve **`TRUST-PANEL-PER-BACKEND-1`** (src/**)
   — iki küçük, birbirinden bağımsız şerit; DALGA-ÇAPA için ideal çift.
5. Sonra: **#6 ALETLER** (015 · 016 · 017-ölçüm · W-026×5) → **CENSUS** →
   **METRIC-VOCAB-DISCOVERY-1** (önkoşulu artık KARŞILANDI).

## §D · DEĞİŞMEZLER (yeniden tartışılmaz)

S89 beşlisi + S90 ikilisi + S91 altılısı aynen. Artı:

- **SOTA KAPISI = MİMARİNİN TAMAMLANMASI** (H2). Dış benchmark'lara PathB ·
  Graph-KB · anlama katmanı · orkestrasyon · mount · A2A sunucusu ·
  LEARNING-SNAPSHOT-1 tamamlanmadan **girilmez**. Bu bir erteleme değil sahip
  hükmüdür ve gerekçesi yazılıdır: benchmark'lar tam da o bileşenleri ölçüyor.
- **Elle kelime ekleme kapısı yoktur ve açılmayacaktır** (S90 H2: keşif önerir,
  governance karar verir).
- **Beyan LİSTE DEĞİLDİR** · kapı delilsiz hüküm veremez ve susuşu üretimde
  görünür · ikinci deneme-sayacı kurulmaz · tezgâh üretim baytını çağırır ·
  machine-v5 SON elle kural · W-032/W-033 inceltme sınıfı, faz açılmaz.
- **"Tapu-anahtarlığı sökülmez" ihlal edilmedi** — mekanizma korundu ve
  backend-başına çoğaltıldı; yalnız ADRES taşındı (S90 H1, S91'de sevk edildi).

## §E · DOSYA SETİ (yeni projeye yüklenecek)

`CLAUDE-PROJECT-INSTRUCTIONS-v4` · `cwf-sota-definition-v1_5` ·
`cwf-architect-doctrine-v1_4` · `cwf-master-rollout-plan-v2_8` ·
bootstrap v92 (bu) · register **v95** · KB **v92** · bucket **v29** ·
`cwf-design-METRIC-REGISTRY-DATA-1-v1` + **`-v1_1`** ·
`cwf-design-LEARNING-SNAPSHOT-1-v1` · `cwf-design-TOOL-BEHAVIOR-CENSUS-1-v1` ·
`cwf-sota-run-guide-S91-v1` · `cwf-implementation-order-S91-v3` ·
`cwf-advisor-note-CS329A-lessons-v2` · `cwf-architecture-research-S82-v1`.

⚠ **Şeritler proje dosyalarını GÖREMEZ** (S91-4). Faz promptları kendi kendine
yeter olmak zorunda; bağlayıcı hükümler prompta gömülür.

## §F · İLK MESAJDA SÖYLENECEK TEK CÜMLE

*"S91 iki merge'le kapandı (rev 223), kanarya 10× sessiz, ve SOTA kapısı sahip
hükmüyle mimarinin tamamlanmasına bağlandı — S92 CANARY-POWER-1 ile açılıyor."*

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v92 -->
