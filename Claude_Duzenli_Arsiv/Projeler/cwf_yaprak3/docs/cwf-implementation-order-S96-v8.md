# CWF — TAM İMPLEMENTASYON SIRASI · S96 kapanışı · v8

<!-- cwf-implementation-order-S96-v8. v7'yi geçersiz kılar. ⚠ TÜRETİLMİŞ
     GÖRÜNÜM — bağlayıcı sıra rollout v3_2, açık kalemler register v100,
     çitler fence-map S96-v2. -->

**ZEMİN:** `3299a59` · rev 242 · 562 test · 74 migration (74 uygulanmış) ·
14 ADR · drift 7/7 · **kapalı 20 / açık 21 / payda 41** · **kapı 2/7**.

## §1 · DALGA PLANI

| Dalga | AG-1 (A) | AG-2 | AG-3 | AG-4 | Açık | Kapı |
|---|---|---|---|---|---|---|
| ✅1-2 (S95) | #40 · #10-1A | #41 · #6 | #24 · #26 | #22 · #20 | 25 | 1/7 |
| ✅3 (S96) | #10-1B 🔑 | #7 | #8 | #9 | 21 | **2/7 ✅ canlı mühürlü** |
| **3.5 (uçuşta)** | CENSUS-REFRESH-FIX-1 | — | — | — | 21 | 2/7 |
| 4 | #11 | #15 | #19 | #21 | 17 | 2/7 |
| 5 | #16 🔑 | #13 | #17 | #12 | 13 | 3/7 |
| 6 | #18 🔑 | #14 | #28 | #37ª | 9 | 4/7 |
| 7 | #23 🔑 | #34 | #27ᵇ | — | 6 | 5/7 |
| 8 | #25 🔑 | #33 | artıklar | — | 4 | 6/7 |
| 9 | #29 🔑 | — | — | — | 3 | **7/7 → yaprak_gate** |
| 10 | #30 ilk ölçüm | #31 | #32 | — | **0** | **→ cinekop_gate** |

ª karar-2 · ᵇ karar-3. Dalga sayısı PLAN'dır (gerçekçi 12-18; #23/#25/#29
bölünebilir).

## §2 · KAPI ANAHTARLARI — 2/7
✅#2 LEARNING-SNAPSHOT (S93) · ✅#10 TOOL-BEHAVIOR-CENSUS (S96, R1-R5 tam;
canlı: census+deneyim+gölge) · #16 MOUNT (5) · #18 A2A (6) · #23 PathB (7) ·
#25 GRAPH-KB (8) · #29 A23 (9).

## §3 · İnsan diliyle
41'in 20'si kapalı. Dalga 3 alet dalgasıydı ve kapıya ikinci anahtarı taktı:
sistem artık her aracı dener, denediğini kaydeder, başarıyı defterler, cron'la
tazeler ve evrimi diff'ler — üstelik bunu yaparken kendi ölçüm aletlerine de
kapı taktık (bir harness "geçtim" diyorsa kızarabildiğini aynı koşuda kanıtlar;
bir relay iddiası ya okumasını taşır ya "okumadım" der). Sırada bir günlük
küçük fix (pozlama-kör seçici), sonra Dalga 4 ve düz yol: her dalgada bir
anahtar, 9'da yaprak_gate, 10'da cinekop_gate.

<!-- END · cwf-implementation-order-S96-v8 -->
