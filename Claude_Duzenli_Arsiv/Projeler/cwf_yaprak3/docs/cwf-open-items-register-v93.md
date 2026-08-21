# CWF — AÇIK KALEMLER REGISTER'I · v93

<!-- cwf-open-items-register-v93 · 2026-08-09 · S89 kapanışı · v92'yi geçersiz kılar (S37-1).
     Kaynaklar: bu oturumun canlı okumaları (taze klon · Supabase telemetri/governed ·
     Vercel deploy kayıtları) + dört STOP-FOR-REVIEW ve dört MERGE raporu + sahip
     tanıklıkları (05:53 OEE · 14:27 doğalgaz · 14:34 tezgâh). -->

## §0 · Kapanış zemini (hesaplanmış)
origin/master `656ec2920a141bd03c032b0223fb985667839c1c` (= merge `4c7726f` + salt-doküman
MERGE raporu) · docVersion **rev 220** · 68 migration · 13 ADR · GATEWAY_RULES 18 ·
suite **513 dosya / 6206 test, 0 skip** (birleşik ağaç ÖLÇÜLDÜ; master CI `31309863507` 5/5) ·
üretim **`dpl_DXnGcC6QebjTEJJqZQhHFqzNfkEh` READY @ `4c7726f`** · S89 merge'leri (5):
`b7f26ce`(04:57, S88 kuyruğu) · `8c8b172` · `162bffe` · `5a052dc` · `4c7726f` ·
uzak dalda 31 phase/* kalıntısı (S89'un 4'ü dahil) — süpürme bloğu kapanış mesajında.

## §1 · S89'DA KAPANANLAR (hepsi kanıt işaretçili)
- **F-S88-1** ✅ sahip-göz tanığı 05:53 (5 seri/5 renk/ek yok).
- **W-028** ✅ CLOSED-BY-RECON: `execute_sql` tags=`[mutate]` (canlı ayna) →
  `foreign_surface` (gatewayDisposition:63/132) → `hasDomainYield` yalnız `data` sayar
  (landingSignals:240). Yarış YOK; yüklem doğruydu.
- **W-029 · W-031** ✅ `8c8b172` (tavan gerçek SERİ sayar; tablo per-CLAIM ilk-kazanır).
- **2F.4 PLANNER-0** kod ✅ `162bffe`; **F-S89-1** aynı gün doğdu (ilk üretim tanığı,
  4 kusur: D1 plana-uyanı cezalandıran kapı · D2 kelime imhası · D3 rutin disiplini
  yerinden etti · D4 delilsiz hüküm) ve ✅ KAPANDI: FIX-1 v2 `5a052dc` + üretim
  tanığı 11:26Z (`metricsSurface:["doğalgaz tüketimi"]` · `gate:active` · 4-aramalı
  tam yelpaze · onarım halkası · 5 hat veri).
- **A1 HİNT-EMEKLİLİK** ✅ — `energy-synonym-search` arşivli, aynı sınıf hint'siz
  başarıldı (knowledgeHash birebir). F-S86-2 papağanlık yarısı YAPISAL EMEKLİ.
  **→ 2F BİLİŞSEL BLOK, KABUL KANITIYLA İLAN EDİLDİ.**
- **STAGE-BENCH-1** ✅ `4c7726f`; kabul = sahip koşusu 14:34 — 150 kelime →
  3 vocab-kept · **147 beyan-captured · 0 discarded**, gerekçe sütunlu.
  (Gate-bench insan koşusu opsiyonel kaldı; fonksiyon-seviyesi merge raporunda gerçek
  `judgeGateStep` ile koşuldu.)
- STAGE-CARD tetiği: 2F ilanıyla **STAGE-CARD-COVERAGE-1 UYANDI** (tek geçiş, sırada).

## §2 · S89'DA DOĞAN adlı kalemler
**Beş sahip yasası (rollout v2_6'da verbatim):** KAPI-YETKİ (4 madde) · BEYAN ·
TAM-YELPAZE (tek fren: token) · TEZGÂH programı · sıralama (2E.2+2.7 öne, #6 arkaya).
**Yeni işler:** `GATE-JURISDICTION-AUDIT-1` (kapı envanteri: kanunu·delili·delilsiz-davranışı;
S90 açılış işi, Architect) · `HISTORY-DIET-1` · `BEYAN-PERSIST-Q` (yakalanan kelime
episodes/semantic'e kalıcılaşmıyor — rutinler bu turlardan ölçüt kelimesi öğrenemez;
tasarım sorusu) · `METRIC-VOCAB-DISCOVERY` (ufuk ADAYI, ratife bekler).
**Yeni W'ler:** **W-032** kapı v0, kelime-taşımayan hazırlık adımını (resolve_time_range)
tek dürtüyor — yetki İHLALİ değil, hassasiyet; tezgâhta incelenir, inceltme adayı
(plan-adımı-farkındalı delil / ilk-adım muafiyeti). **W-033** tezgâh `drops.metrics`
çipi kırmızı — sayaç "imha" değil "resmî-id-değil" demek; beyan PRESENT iken alarm
rengi yanıltıcı; UI-POLISH ailesine katlanır. **W-030** açık (bölge-başlık niyeti,
prompt şeridi — AG-2 S89'da adsız yeniden gözledi, kimliği teyitli).
**Ders satırları (v93 mührü):**
1. Karanlıkta (observe-only) alınan tasarım kararları, organ aydınlığa çıkarken
   YENİDEN YARGILANIR (METRIC_IDS: 28 Haz tapu-anahtarı → 20 Tem sansür ödünçü).
2. GO'nun adım SIRASI da D-5'ten geçer — kendi ön-adımına bağımlı doğrulama = kilit
   (çakışan PR merge-ref üretmez → koşu yoktur).
3. Faz içi iki organın yasaları BİRBİRİNE KARŞI probe edilir — kapı, planın uyulmuş
   hâlini fikstür olarak koşmadan yayınlanmaz.
4. vitest çözücüsü eksik named-export'u TOLERE eder; ESM bütünlüğü Node probe'la
   doğrulanır (BENCH merge'ünde üretim-500'ü yakalayan tek şey buydu).
5. Reseal SON adımdır; mapped-test düzenlemesi de reseal bozar (aynı fazda 2×).
6. `scrollHeight` `clientHeight`'a kenetli — açığı söyler, fazlayı asla.
7. Kapasite kurtarmaları her artışta YENİDEN ölçülür, ekstrapole edilmez (M1F3'ün
   "bir sonrakine de yeter" öngörüsü 18. satırda düştü).
8. Tenant-zero, kendi dokümantasyonuna karşı da korur: kapılı token'ı AÇIKLAYAN
   düzyazı da kızarır; sözlük split-fragment'ta yaşar.
9. Salt-doküman push CI'ı tetiklemez → relay dosyası CI-kapısız kalır; yerel
   tenant-zero koşusu zorunlu telafidir.
10. Sahibe sunulan insan-okur tablo da envanter denetimidir; adlı kalem atlayan
    özet, özet-özetidir.
**Kanarya defteri:** merge-üstü koşu **8× ardışık `verdict:null`** (S89'da 4 kez daha;
rep 3→2, like-for-like hash'ler). CANARY-POWER-1'in aciliyet gerekçesi büyüdü; yeri
değişmedi (#6, bataklık dalgasının arkası).

## §3 · Açık kalanlar (değişmedi + yukarıdaki eklerle)
BUG: 005(proje kapanışı) · 014(önkoşulsuz) · 015 · 016 · 017 — beşi #6/2E.3 evli.
ARMED: 010-down · 029. W: 018 · 030 · 032 · 033 + UI-POLISH-NOTE(+W-033 katlandı) ·
Gemini+PII 3. veri noktası · no-jurisdiction üretim ORANI (telemetri birikince tek okuma).
W-026 sicili ×5 (BENCH şeridi çalışma-ağacı örneğiyle) — BUG-015 teslimat girdisi.
BEYAN-PERSIST-Q · HISTORY-DIET-1 · AG-2'nin zararsız yerel `.vercel` bağı (süpürmede gider).

## §4 · Sıra (v2_6 bağlayıcı)
S90: **1)** GATE-JURISDICTION-AUDIT-1 (Architect; klon+tezgâh; üç sütun) →
**2)** BATAKLIK-KURUTMA: 2E.2 ROUTE-DERIVE-1 recon→tasarım→faz (AG-1) + 2.7
FRAME-SHADOW-EVIDENCE-1 (AG-2) → **3)** STAGE-CARD-COVERAGE-1 (tek geçiş, uygun boşlukta)
→ sonra #6 ALETLER → TOOL-BEHAVIOR-CENSUS-1. ROUTE-ASK-1 ölçüm-kapılı kalır (2.7 besler).

<!-- END · cwf-open-items-register-v93 -->
