# CWF — TAM İMPLEMENTASYON SIRASI · S95 kapanışı · v7

<!-- v6'yı geçersiz kılar. ⚠ TÜRETİLMİŞ GÖRÜNÜM. Bağlayıcı sıra
     `cwf-master-rollout-plan-v3_2`, açık kalemler register v99. -->

**ZEMİN:** `1b7f8dd` · rev 240 · 554 test dosyası · 73 migration · 14 ADR ·
drift 7/7 · **kapalı 16 / açık 25 / payda 41** · SOTA kapısı **1/7**.

## §1 · DÖRT-ŞERİT DALGA PLANI (S95'te doğrulandı, çalışıyor)

Şablon: **A = ağır (kapı anahtarı, mühür jetonu) · B = orta · C/D = SC-A hafif.**

| Dalga | AG-1 (A) | AG-2 (B) | AG-3 (C) | AG-4 (D) | Açık | Kapı |
|---|---|---|---|---|---|---|
| ✅1 | #40 | #41 | #24 | #22 | 28 | 1/7 |
| ✅2 | #10-1A | #6 | #26 | #20 | 25 | 1/7 |
| **3** | **#10-1B** 🔑 | #7 | #8 | #9 | 21 | **2/7** |
| 4 | #11 | #15 | #19 | #21 | 17 | 2/7 |
| 5 | #16 🔑 | #13 | #17 | #12 | 13 | **3/7** |
| 6 | #18 🔑 | #14 | #28 | #37 | 9 | **4/7** |
| 7 | #23 🔑 | #34 | #27 | — | 6 | **5/7** |
| 8 | #25 🔑 | #33 | artıklar | — | 4 | **6/7** |
| 9 | #29 🔑 | — | — | — | 3 | **7/7 → yaprak_gate** |
| 10 | #30 ilk ölçüm | #31 | #32 | — | **0** | **→ cinekop_gate** |

**Gerçekçilik notu:** Dalga 7-8-9'un A şeritleri (#23 PathB · #25 Graph-KB ·
#29 A23) bugünkü işlerin birkaç katı. Alt fazlara bölünürlerse yaprak_gate
9 → 11-12'ye kayar. #23'ün gerçek maliyeti görüldüğünde yeniden hesaplanacak.
Dalga sayısı PLAN'dır, ölçüm değil.

## §2 · KAPI ANAHTARLARI — 1/7

| # | Anahtar | Dalga | Durum |
|---|---|---|---|
| ✅2 | LEARNING-SNAPSHOT-1 | S93 | dönmüş |
| 10 | TOOL-BEHAVIOR-CENSUS | 3 | 1A indi, **1B anahtarı döndürür** |
| 16 | BENCH-BACKEND-MOUNT | 5 | önkoşul #15 (D4) |
| 18 | BENCH-A2A | 6 | #34'ün önkoşulu |
| 23 | PB-FULL / PathB | 7 | yakıtı S95'te geldi |
| 25 | GRAPH-KB | 8 | |
| 29 | A23 ANLAMA | 9 | → yaprak_gate |

## §3 · KAPI ARKASI (cinekop_gate kuyruğu)

#37 (örneklem temsili, Dalga 6'ya çekilmesi sahip kararında) · #33 (eşit
maliyet — SONRADAN kurulamaz) · #34 (dış ölçüm zemini) · #27 (vektör, çıtası
#26'da kuruldu) · #30 (**ilk ölçüm turu — SOTA burada kanıtlanır**) · #31 ·
#32.

## §4 · ÇİT DİSİPLİNİ (her dalga promptuna gömülür)

1. Mühür jetonu: merge turunda, rebase edilmiş ağaçta, master'dan okunarak
   (S95-1). İnşada ASLA.
2. Migration damga slotları dalga açılışında atanır; rebase'te yeniden damga.
3. Her rapor `git diff --name-only` verbatim; Architect dörtlü kesişim
   matrisini (6 ikili) HESAPLAR, beklenen ∅ — varsayılmaz.
4. Merge sırası: **kim hazırsa** (S95'te sabit sıra denendi, kuyruk tıkadı;
   sıra değişirse TÜM şeritlere relaylenir — S95-2).
5. C/D şeritlerine makine-doğrulanır doğum kanıtı zorunlu.

## §5 · İnsan diliyle

41 kalemin 16'sı kapalı, 25'i açık. S95 tek günde yedi kalem kapattı ve dört
şeritli modelin çalıştığını kanıtladı. Kapı hâlâ 1/7 çünkü #10'un anahtarı
1B'de dönüyor — Dalga 3'ün ilk işi bu. Sonrası düz yol: her dalgada bir
anahtar, Dalga 9'da yaprak_gate, Dalga 10'da cinekop_gate. Süreyi kısaltan
tek kaldıraç eşzamanlı şerit sayısı; tavanı Architect'in RULE-25 bandı.

<!-- END · cwf-implementation-order-S95-v7 -->
