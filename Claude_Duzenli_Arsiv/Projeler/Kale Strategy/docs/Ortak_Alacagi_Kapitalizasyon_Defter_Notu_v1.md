# ORTAK ALACAĞI & KAPİTALİZASYON — DEFTER NOTU · v1
### ARDIÇ AR-GE A.Ş. · Ortak kredileri, sermayeleştirme tarihçesi, resmi-vs-içsel defter · 14.06.2026
*İÇ ÇALIŞMA NOTU · HİZMETE ÖZEL — defter ham verisi + pazarlık-hassas. Kale/ACT/YK ile PAYLAŞILMAZ.*

> **AMACI:** Bu not, `Fin2_20Mayis_Working_Revize07...xlsx` (21 sayfa) + 31.12.2025 resmi detay mizan + YMM değerleme cetvellerinden BİREBİR çekilmiş, kuruşu kuruşuna reconcile edilmiş kesin referanstır. **Bu not varken yeni session 21-sayfalık Fin2 defterini, mizanı veya değerleme cetvellerini YENİDEN OKUMAZ.** Çıktı Excel: `ARDIC_Ortaklar_Alacak_Sermaye_OZET.xlsx` (7 sayfa, sıfır formül hatası, outputs).

---

## 1. GÜNCEL ORTAK KREDİLERİ — 31.12.2025 RESMİ BİLANÇO (kesin)

**TOPLAM NAKİT/BORÇ ORTAK ALACAĞI = ₺55.786.496,95** (431 + 436)

### 431 Ortaklara Borçlar = ₺48.408.890,00
| Hesap | Ortak | ₺ Değer | Orijinal | Not |
|---|---|---|---|---|
| 431.01.002 | Tunç Kahveci | **28.115.427,69** | 4.585,86 gr ALTIN | nominal ₺14.867.661,04 + altın reval ₺13.247.766,65 |
| 431.01.003 | ACT Fund Coöperatief | **20.180.144,80** | €399.977,50 | C-Note anaparası, taşıma kuru ~50,45 |
| 431.01.001 | Mehmet Aksayan | **113.317,51** | ₺ (TL) | Kasım 2015-2016 enjeksiyonu, TL kısmı |

### 436 Diğer Çeşitli Borçlar = ₺7.377.606,95 (HEPSİ USD)
| Hesap | Ortak | ₺ Değer | Orijinal | Tarih |
|---|---|---|---|---|
| 436.01.001 | Li Nuo Xin (Creative Monsters) | **1.284.968,89** | $29.979 | 27.11.2015 |
| 436.01.002 | Mehmet Aksayan | **2.663.654,06** | $62.144,45 | 2015-2016 ($60.465 orijinal) |
| 436.01.003 | Yusuf Plamenko Tan | **3.428.984,00** | $80.000 | 24.11.2015 |

### ★★ PARA BİRİMİ DEKOMPOZİSYONU — KRİTİK DÜZELTME
| Para birimi | ₺ Değer | Pay % |
|---|---|---|
| Altın (Tunç) | 28.115.427,69 | %50,4 |
| EUR (ACT) | 20.180.144,80 | %36,2 |
| USD (436) | 7.377.606,95 | %13,2 |
| TL (Aksayan) | 113.317,51 | %0,2 |
| **SERT (altın+EUR+USD)** | **55.673.179,44** | **%99,8** |

> **⚠ DÜZELTME (önceki bootstrap'lardaki ~%69 YANLIŞTI):** Ortak kredi defteri pratikte **%99,8 sert para/altın-endeksli**; sadece ₺113K (Aksayan, %0,2) saf TL. Yani bu yükümlülük TL enflasyonuyla ERİMEZ — Tunç'unki gram altın olduğu için her ay reel olarak BÜYÜR. Alım modellemesi için: Kale'nin devralacağı ortak borcu neredeyse tümüyle sert varlıkta sabitlenmiştir.
>
> **⚠ Tunç bakiyesinin niteliği:** Görünen ₺28,12M'in ~%47'si (₺13,25M) altın-fiyat revaluation'ıdır — gerçekte avans edilen nominal nakit **₺14,87M**'dir. "Tunç şirkete ₺28M koydu" YANLIŞ; ₺14,87M koydu, gram-altın endekslemesi onu ₺28,12M'e taşıdı. Ama FERAGAT ettiği LEGAL CLAIM ₺28,12M'dir (gold-indexed, büyüyen) — bu yüzden feragat gerçek bir taviz.
>
> *Altın gram notu:* resmi bilanço/YMM değerleme **4.585,86 gr** (otoriter); 20Mayıs Working iç defteri 4.609,95 gr (~24 gr / ₺147K fark). Resmi otoriter alınır.

---

## 2. KAPİTALİZASYON TARİHÇESİ — 2008 → 2026 (kaynak: "MART 2015 MİLAT" sayfası + kişi sayfaları)

**Çekirdek bulgu: 2008-2015 kurucu alacaklarının ~$889.000'ı iki tranşta ÖZ SERMAYEYE dönüştü; artık borç DEĞİL. Bugün defterde duran ortak kredileri SADECE Kasım 2015 sonrası yeni krediler + ACT + Tunç revolving'tir.**

| Dönem | Olay | Tutar | Durum |
|---|---|---|---|
| 2008-2014 | 6 kurucu enjeksiyonu (fazla ödeme + ertelenmiş maaş) | fazla $585.142,13 + maaş(USD-fixed) $305.179,83 = **$890.321,96** | Birikti |
| **Mart 2015 MİLAT** | Sermayeye dönüşüm #1: Aksayan $250.000 + Kahveci ailesi $400.000 | **$650.000 → ÖZ SERMAYE** | Kalan kredi $240.321,96 |
| **Ocak 2016** | Sermayeye dönüşüm #2: Aksayan $109.000 + Tunç $130.000 | **$239.000 → ÖZ SERMAYE** | Kalan ~$1.322 virman |
| — | **TOPLAM SERMAYEYE DÖNEN** | **$889.000** | Artık BORÇ DEĞİL |
| Kasım 2015-2016 | YENİ krediler (bugün hâlâ defterde) | Tan $80.000 (24.11.15) · Li/Creative Monsters $30.000 (27.11.15) · Aksayan ₺113.318 + $60.465 | → bugünkü 436 + Aksayan-431 |
| 2019-2021 | Kurucu ertelenmiş maaş | ₺1.570.957,11 (Tunç 1.259.173,11 + Aksayan 222.330 + Hülya 89.454) | Maaş alacağına eklendi |
| ~2021 | ACT Fund Coöperatief kredisi (C-Note) | €399.977,50 | → 431.01.003 (bugün ₺20,18M) |
| 2023-2025 | Tunç ALTIN-endeksli revolving (kriz dönemi) | 2018 devri 4.024 gr → 31.12.2025 4.586 gr | → 431.01.002 (bugün ₺28,12M) |
| Ağu-Ara 2024 | Kurucuya kısmi geri ödeme | ₺2.142.757 (2016-2019 maaş alacağına mahsup) + Txfr2Payback'te ek ~₺4M Kasım'24 maaş mahsup; bazıları "elden" doğrudan SGK/vergiye | Ödendi |
| 2025 | Tunç net taze nakit (brüt ₺20,5M giriş / ₺18,0M çıkış — revolving) | net +₺2.448.075 | Revolving |
| Q1 2026 | Tunç net taze nakit | net +₺774.000 | Revolving |

**Mart 2015 MİLAT detayı (2014 sonu toplam ortak borcu = $890.321,96):**
- AKSAYAN: borç verilen $284.208,08 + maaş $75.079,10 + virman $392,47 = $359.679,65 → $250K sermayeye → kalan $109.679,65 → Ocak'16 $109K sermayeye → kalan $679,65 virman
- KAHVECİ (Tunç+Hülya KOMBİNE): Tunç $405.601,36 + Hülya $125.040,95 = $530.642,31 → $400K sermayeye (Hülya satırında ama AİLE) → kalan $130.642,31 → Ocak'16 $130K sermayeye (Tunç) → kalan $642,31 virman
- YATAN: $392,47 → virman (sıfırlandı)

---

## 3. KURUCU MAAŞ ALACAĞI — RESMİ vs İÇSEL DEFTER (kaynak: OzetinOzeti)

| Kalem | Tunç | Hülya | Aksayan | TOPLAM |
|---|---|---|---|---|
| **RESMİ — 335.03 ('On the books')** | 2.113.606,32 | 1.815.853,14 | 222.330,00 | **4.151.789,46** |
| → iki aktif kurucu (Tunç+Hülya) | 2.113.606,32 | 1.815.853,14 | — | **3.929.459,46** |
| **İÇSEL TL — 31.12.2025** | 5.112.424,67 | 3.068.174,87 | — | **8.180.599,54** |
| **İÇSEL TL — 20.05.2026** | 6.200.841,34 | 3.994.942,10 | — | **10.195.783,44** |
| **DEFTERLENMEMİŞ FARK** (içsel 2025 − resmi 335.03 Tunç+Hülya) | 2.998.818,35 | 1.252.321,73 | — | **4.251.140,08** |
| İçsel USD-izli — 31.12.2025 (ACT'e raporlanan) | $214.167,61 | $94.096,33 | — | **$308.263,94** |
| İçsel USD-izli — 20.05.2026 | $238.829,81 | $115.095,75 | — | **$353.925,56** |
| 336.03 kurucu muhtelif (resmi, ek) | 157.357,62 | 24.536,00 | — | 181.893,62 |

**v8 §1-B ile bağ — İİK 206 öncelikli ücret alacağı doğrulandı:** v8'deki **₺4.111.353,08** = 335.03 (Tunç+Hülya ₺3.929.459,46) + 336.03 (₺181.893,62). ✓ Bu, FERAGAT EDİLMEZ recover edilen resmi öncelik claim'idir.
**YENİ katman:** İçsel gerçek tahakkuk 31.12.2025'te **₺8,18M** (20.05.2026'da ₺10,20M). Resmi 335.03 (₺3,93M) ile içsel arasındaki **₺4,25M defterlenmemiştir** — resmi tabloda HİÇ görünmez. İçsel maaş USD-izli de tutulur (kuru korur).

---

## 4. İŞLETME YÜKÜMLÜLÜĞÜ — İÇSEL (GG) vs RESMİ MİZAN (kaynak: "GG hazirliklari" + resmi 2025 mizan)

| Yükümlülük | İçsel Q4'25 | İçsel Q1'26 | Resmi mizan 31.12.25 | Resmi hesap | Fark (İçsel−Resmi) |
|---|---|---|---|---|---|
| Banka borçları | 5.438.301,67 | 6.461.319,38 | 4.121.271,42 | 300 | +1.317.030 |
| **SGK borçları** | **9.966.649** | 9.281.663 | **4.766.409,97** | 361 (540.698) + 368.02 (4.225.712) | **+5.200.239** |
| Vergi borçları | 2.902.608,10 | 3.062.213,05 | 3.042.490,51 | 360 (1.620.613) + 368.01 (1.421.877) | −139.882 |
| Kredi kartı | 1.416.052 | 1.194.476 | 37.390,27 | 309 | +1.378.662 |
| Personel kıdem | 607.518 | 579.650 | 0 | (372/472 YOK) | +607.518 |
| Personel — Haluk Tüfekçi | 2.107.181,12 | 2.624.573 | (335.01.018) | — | (içsel) |
| Personel — Esra Erdoğan | 1.796.661,12 | 2.195.311 | (335.01.012 + 336.03.005) | — | (içsel) |
| Personel — diğer çalışanlar | 4.090.471 | 5.141.636 | 335.01 ≈ 4,23M | — | (içsel) |
| Yemek borçları | 1.678.358 | 1.607.914 | (muhtelif) | — | (içsel) |
| Dış servis borçları | 1.255.239,76 | 1.834.502,58 | (muhtelif) | — | (içsel) |
| **İÇSEL OPERASYONEL TOPLAM** | **~31.259.040** | ~33.973.057 | (resmi kısa-vade ~24,7M) | | |

> **⚠ DÜZELTME (önceki "~₺9,4M defterlenmemiş SGK" hand-wave'i yerine KESİN):** Resmi SGK İKİ hesaba bölünmüş — cari 361 (₺540.698) + vadesi geçmiş 368.02 (₺4.225.712) = **₺4.766.410**. İçsel ₺9.966.649. Yani defterlenmemiş/ek SGK farkı **~₺5,2M**'dir.
> **YORUM:** İç ("gerçek") yükümlülük resmi mizandan yüksek (SGK +5,2M, kredi kartı +1,38M, kıdem +0,61M, banka +1,32M). Vergi kaleminde resmi ≥ içsel (368.01 vadesi geçmiş vergi resmi tabloda kayıtlı). **Tam içsel yükümlülük** ≈ işletme ₺31,3M + ortak nakit alacağı ₺55,8M + kurucu maaş içsel ₺8,2M ≈ **~₺95M** mertebesi (v8'deki resmi dış borç ₺80,49M ile kıyasla). Bu fark, distress hijyeni gereği Kale-facing belgeye GİRMEZ.

---

## 5. ERKEN ORTAKLAR — ÇIKIŞLAR (kaynak: GÜÇERİ/ERKEL/YATAN/AKSAYAN sayfaları)

| Ortak | Taahhüt ₺ | Ödenen ₺ | Fazla ödeme ₺ | Bugünkü kredi alacağı | Durum |
|---|---|---|---|---|---|
| Mustafa Cem Güçeri | 87.759 | 87.759 | 0 | **YOK** | Tam çıkış — "sermaye dışında alacak yok" ($60.000=₺87.759) |
| Füsun Erkel | 137.413 | 278.496,58 | 141.083,58 | **YOK** | Fazla 2015 öncesi temizlendi |
| Yalın Yatan | 5.000 | 5.597,07 | 597,07 | **YOK** | Fazla $392,47 Mart'15 virman |
| Mehmet Aksayan | 132.414 | 427.806,44 | 295.392,44 | ₺113.318 + $62.144 (436) | Fazla $284.208 → 2015/16 sermayeye; post-milat kalan defterde |

**Sonuç:** Bugün defterde duran ortak kredileri SADECE: (1) Tunç altın-endeksli revolving 431.01.002, (2) ACT €399.977 431.01.003, (3) Aksayan ₺113.318 431.01.001 + $62.144 436.01.002, (4) Li $29.979 + Tan $80.000 (436, Kasım 2015). Güçeri/Erkel/Yatan'ın hiçbiri listede değildir — paraları öz sermayeye gitmiştir. **Hülya'nın ayrı 431 kredisi YOK** (₺1,2M nakit kredisi TK 431.01.002'de konsolide; katkısı = maaş + equity).

---

## 6. KAYNAK HARİTASI & DÜZELTME GÜNLÜĞÜ

**Kaynaklar:** `Fin2_20Mayis_Working_Revize07` sayfaları → MART 2015 MİLAT (kapitalizasyon), OzetinOzeti (konsolidasyon, 20May2026 güncel), GG hazirliklari (içsel yükümlülük), TÜM ÖDEMELER (2008-14 log), GÜÇERİ/ERKEL/YATAN/AKSAYAN/KAHVECİ-TK/KAHVECİ-HKK/hülya (kişi), Summary/TMK ÖZET/TMK HK 2025 ÖZET (yıl-bazlı + altın-gram), Geri Odeme Listesi/Txfr2Payback.v8 (2024 geri ödeme) · resmi 2025 detay mizan (300/309/335/336/360/361/368) · Fin_TUNC_KAHVECI_DEGERLEME (Tunç altın) · Fin_GECICI_VERGI_KUR (ACT €/436 USD).

**Bu session'da yakalanan/düzeltilen 3 hata:**
1. **Sert para payı: ~%69 → %99,8** (gerçek 431/436 kompozisyonundan; TL sadece ₺113K).
2. **Defterlenmemiş SGK: "~₺9,4M" → ~₺5,2M** (resmi SGK 361+368.02 = ₺4,77M; içsel ₺9,97M).
3. **Aksayan resmi maaş: "~₺231.005" → ₺222.330** (335.03.003 kesin).

**Yeni eklenen (v8'de yoktu):** tam kapitalizasyon zaman çizelgesi ($889K sermayeye) · maaş resmi-vs-içsel ₺4,25M defterlenmemiş gap · içsel operasyonel yükümlülük ₺31,3M (resmi ~₺24,7M üstü) · Tunç ₺28,1M'in nominal/reval ayrışması (₺14,87M / ₺13,25M).

*Defter Notu v1 · 14.06.2026 · Çıktı: ARDIC_Ortaklar_Alacak_Sermaye_OZET.xlsx*
