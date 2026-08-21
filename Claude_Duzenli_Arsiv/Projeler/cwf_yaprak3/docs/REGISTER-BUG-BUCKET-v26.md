# REGISTER-BUG-BUCKET v26 — S87 kapanış · işleyen kuyruk (TEK kaynak)
<!-- v25'i geçersiz kılar. S37-1. Kaynaklar: plan v2_4 §S87-CARRY (yüklü) ·
     cwf-bug-inventory-S87-v6 (referans) · bu oturumun canlı kayıtları. -->

## §BUG.1 · S87'DE KAPANDI / MÜHÜRLENDİ
**2F.1 PROCEDURE-RECALL-1 ✅** (`af53fbc`, tanık çifti `e4f20cdb`/`d5835e62`) ·
**2F.2 SEMANTIC-MEMORY-1 ✅ merge** (`ac764d6`; SM1 dossier-tanığı AÇIK — aşağıda) ·
**2F.3 STEP-EFFICIENCY-1 ✅ TANIKLI KAPANDI** (`5cddf23` + S63-1 witness `4b82899`,
recorded≥1 + funnel landed) · **BUG-032 nöbeti MÜHÜRLENDİ** (ilk doğal failed
`1591000c` → sonraki turda conv=0; + S87'de 3 failed daha, hepsi karantinada) ·
**GatewaySearchZero nöbeti tanık verdi** · F-S86-2 taşıma-yarısı ✅.

## §BUG.2 · S87'DE DOĞDU
- **BUG-037 · READY-sonrası düzenleme sessiz kayboluyor** (admin-UI; sahip keşfi,
  iki-yol diferansiyeli; kanıt: rule_audit 12:58/13:16 `{"diff":{}}` çifti vs
  13:18 gerçek diff). Fazı AKIŞTA: PHASE-READY-EDIT-TRUTH-1 (AG-2).
  Workaround yürürlükte: içerik önce, direkt publish; ready en son/hiç.
- **F-S87-2** frame "hat bazında"yı varlık sandı, "Granit"i düşürdü (BUG-017
  ailesi kanıtı) · **F-S87-3** Superset araması bitişik-altdizi; varlık-önekli
  çok-kelime sorgular yapısal sıfır (hint v4 yayında; yapısal emekli 2F.4) ·
  **F-S87-4** sıfır-verimli zincir rutinleşti (fazı AKIŞTA: PROCEDURE-YIELD-1,
  AG-1) · **F-S87-5** "hat bazında" çöp dosyası semantic_memory'de (YIELD kapısı
  aynı kapıda keser; frame kökü 2E.3/BUG-017).
- **W-yeni:** `LLMFinish finishReason=error`'da sağlayıcı hata gövdesi
  loglanmıyor (Gemini PII-yoğun örneklemde 2/2 deterministik error — hipotez
  etiketli) · **tenant-veri notu:** 6811 çalışan PII'ı sağlayıcıya akıyor →
  EAIP-TENANT'a veri-sınıfı işareti girdisi · **ARMES API isteği (müşteri
  kanalına):** "getActiveShifts'in tarih-aralıklı kardeşi — factoryId+tarih
  alan, kimlik istemeyen vardiya sorgusu" ("zone yok" hipotezi EMEKLİ:
  workingPlaceId/Name vardiya kaydında VAR).

## §BUG.3 · YENİ ADLI İŞLER (sahip-hükümlü)
- **TOOL-BEHAVIOR-CENSUS-1** — sahip algoritması, tasarım notu v1 BAĞLAYICI
  (cwf-design-TOOL-BEHAVIOR-CENSUS-1-v1: R1 connect-sonda · R2 deneyim defteri ·
  R3 cron+fresh · R4 backend evrimi · R5 elle-kural-sıfır). Ev: 2E ailesi.
- **FRAME-ON-ALL-PATHS-1** — Anthropic/all-fallback yolunda frame koşmuyor →
  procedure/semantic öğrenme o yolda kör (Sonnet turu `8e8de3c8`: procedure=0).
  Küçük kalem; model-tier özgürlüğünün önkoşulu.

## §SIRA (v25 mirasi + S87 ekleri; kesin yeniden-sıralama sahip hükmüyle S88'de)
1. **AKIŞTA:** PROCEDURE-YIELD-1 (AG-1) + READY-EDIT-TRUTH-1 (AG-2) —
   raporlar bekleniyor; RULE-25 + GO'lar S88'in ilk işi.
2. SM1 dossier-tanığı (tanık-2 çifti — sahipte bekliyor) + machine-kategorisi
   7 enerji kelimesi (sahipte bekliyor).
3. #6 ALETLER FAZI (015+016+017-ölçüm+CANARY-POWER-1; girdiler inventory-v6 +
   plan v2_4'te) · 2F.4 PLANNER-0 (dört adlı girdi + hint-emeklilik kanıtı) ·
   TOOL-BEHAVIOR-CENSUS-1 & FRAME-ON-ALL-PATHS-1 yerleşimi · HONESTBENCH-RUN-1 ·
   BUG-005 (proje kapanışı).

## §A · ARMED (pasif nöbetler)
BUG-010-down · BUG-029 · (BUG-032 ✅ mühürlendi — §BUG.1).

## §K · Önceki kapanışlar v25 §K zinciri aynen (011=`914b7a03` · 030=v21 ·
031=`ce2e244` · 033=run 31152100128 · 034=N-3-v2 · tam liste inventory-v6).

<!-- END · REGISTER-BUG-BUCKET-v26 -->
