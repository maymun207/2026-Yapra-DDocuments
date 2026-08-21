# ORTAK ALACAĞI & KAPİTALİZASYON — DEFTER NOTU · v5
### ARDIÇ AR-GE A.Ş. · Ortak kredileri, sermayeleştirme, resmi-vs-içsel defter, banka kanıtı, kaynak izleme · 14.06.2026
*İÇ ÇALIŞMA NOTU · HİZMETE ÖZEL — defter ham verisi + pazarlık-hassas + kişisel banka hareketleri. Kale/ACT/YK ile PAYLAŞILMAZ.*

> **v5 NE DEĞİŞTİ (Fin2 içsel rakamlar hücre izli):** §9 EK'teki **H bloğu (Fin2 içsel rakamlar)** bu turda **ham hücreden okundu ve hücre-izli** hale getirildi (artık "okunmadı/kırmızı" değil). İçsel maaş `OzetinOzeti!E30/E31` (31.12.2025) ve `H30/H31` (20.05.2026); içsel operasyonel yükümlülük `GG hazirliklari!C6:C25` (= 31.259.039,77); $889K kapitalizasyon `MART 2015 MİLAT!E24→F24+C29+C30`. **Önemli ayrım:** bunlar artık izlenebilir ama **denetimli değil** — iç çalışma defteri rakamıdır, denetimli tabloda görünmez; CFO Fin2'den doğrular. Çapraz teyit: `OzetinOzeti!E10`=14.867.661 ve `F10`=2.746.252,32, Tunç nominal nakit ve 2025 taze nakit rakamlarını iç defterden de doğrular.
>
> **v4 NE DEĞİŞTİ (CFO kaynak izleme):** İçerik v3 ile aynıdır; sona **§9 EK — Kaynak İzleme (CFO çapraz-doğrulama cetveli)** eklendi. Her rakamın kaynak dosyası, sayfası ve **hücresi / hesap kodu** + **katman etiketi** (T1/T2/T3) listelenir. Bu, Excel `…OZET_v4_CFO.xlsx` içindeki `Kaynak_Izleme_CFO` sayfasının metin karşılığıdır; hafta içi CFO çapraz-doğrulaması için. A & B blokları (Tunç altın + ACT/436) bu turda **ham hücreden birebir doğrulandı**; H bloğu (Fin2 içsel) o sürümde henüz doğrulanmamıştı — **v5'te hücre-izli hale getirildi (bkz. yukarıdaki v5 notu).**
>
> **v3 NE DEĞİŞTİ (Aksayan statüsü):** Mehmet Aksayan **~Ocak 2020 sonunda şirketten ayrılmıştır** (ayrılış belgesi CFO kayıtlarında mevcut; kopya dosyaya eklenecek — **PENDING**). **Husumetli DEĞİL → işbirlikçi.** Sonuç: (1) defter ayrılışla tutarlı — 335.03.003 ₺222.330 ayrılış-öncesi donmuş ücret kalıntısıdır, 2025'te yeni tahakkuk YOK; (2) ₺2.776.972,06 kredisi (431+436) "otomatik kurucu feragatı" değil, **dostane ayrı imzayla** feragat/uzlaşı kalemidir; (3) %21,41 A-grubu payı %85 GK nisabında **destekleyici oydur** — risk değil, varlık. Güvenle Tunç-kontrollü feragat = altın kredisi **₺28.115.427,69** (Hülya'nın nakit kredisi yok). Rakamlar değişmedi; tedavi/çerçeve keskinleşti.
>
> **v2 NE DEĞİŞTİ:** Bu sürüm, `Fin3_*` (31.12.2025 **bağımsız/denetimli** bilanço — yan yana 2024/2025, ayrıntılı gelir tablosu, 11 sayfa detay mizan, Tunç altın değerleme cetvelleri, GEÇİCİ VERGİ kur değerleme, KKEG, enflasyon düzeltmesi) ve `Fin5_*` (Tunç 5-kaynak banka hareketleri + GİB/BDDK/MASAK cevap belgesi) dosyaları **ham hücreden** okunarak üretildi. v1/v8'in tüm başlık rakamları **denetimli bilançoya kuruşu kuruşuna bağlandı**; küçük sapmalar (toplam dış borç +36.016, net zarar/özkaynak +72.928, 2025 taze nakit +298K vb.) izlenip düzeltildi. İki yeni katman eklendi: **§6 resmi tablo mutabakatı** ve **§7 banka-seviyesi kanıt**.
>
> **Bu not varken yeni session ham defteri/mizanı/değerleme cetvellerini YENİDEN OKUMAZ.** Çıktı Excel: `ARDIC_Ortaklar_Alacak_Sermaye_OZET_v3.xlsx` (9 sayfa, **sıfır formül hatası**, denge tutar, outputs).

---

## 1. GÜNCEL ORTAK KREDİLERİ — 31.12.2025 DENETİMLİ BİLANÇO (kesin)

**TOPLAM NAKİT/BORÇ ORTAK ALACAĞI = ₺55.786.497,44** (431 + 436) — bilanço UVYK "Diğer Borçlar" kalemiyle birebir.

### 431 Ortaklara Borçlar = ₺48.408.890,49
| Hesap | Ortak | ₺ Değer | Orijinal | Not |
|---|---|---|---|---|
| 431.01.002 | Tunç Kahveci | **28.115.427,69** | 4.585,8565 gr ALTIN | nominal nakit ₺14.867.661,04 + altın reval ₺13.247.766,65 |
| 431.01.003 | ACT Fund Coöperatief | **20.180.144,80** | €399.977,50 × 50,4532 | C-Note anaparası; 3 yıldır sıfır nakit hareket |
| 431.01.001 | Mehmet Aksayan | **113.318,00** | ₺ (TL) | *v2 düzeltme: 113.317,51 → 113.318,00 (bilanço/mizan)* |

### 436 Diğer Çeşitli Borçlar = ₺7.377.606,95 (HEPSİ USD × 42,8623)
| Hesap | Ortak | ₺ Değer | Orijinal | Tarih |
|---|---|---|---|---|
| 436.01.001 | Li Nuo Xin (Creative Monsters) | **1.284.968,89** | $29.979 | 27.11.2015 |
| 436.01.002 | Mehmet Aksayan | **2.663.654,06** | $62.144,45 | 2015-2016 ($60.465 orijinal) |
| 436.01.003 | Yusuf Plamenko Tan | **3.428.984,00** | $80.000 | 24.11.2015 |

### ★★ PARA BİRİMİ DEKOMPOZİSYONU — değişmeyen kritik bulgu
| Para birimi | ₺ Değer | Pay % |
|---|---|---|
| Altın (Tunç) | 28.115.427,69 | %50,4 |
| EUR (ACT) | 20.180.144,80 | %36,2 |
| USD (436) | 7.377.606,95 | %13,2 |
| TL (Aksayan) | 113.318,00 | %0,2 |
| **SERT (altın+EUR+USD)** | **55.673.179,44** | **%99,8** |

> Ortak kredi defteri pratikte **%99,8 sert para/altın-endeksli**; sadece ₺113K (Aksayan, %0,2) saf TL. Bu yükümlülük TL enflasyonuyla **erimez** — Tunç'unki gram altın olduğu için reel olarak büyür; ACT ise faiz işletilmeden salt EUR kuruyla büyür (= **simetri argümanı**: borç sertse, ödeme/feragat de sert değerden konuşulur).
>
> **Tunç bakiyesinin niteliği (artık birebir izlenebilir):** Görünen ₺28,12M'in ~%47'si (₺13,25M) altın-fiyat revaluation'ıdır; **gerçekte avans edilen nominal nakit ₺14.867.661,04**'tür = cari hesaba kredilendirilen ₺32.883.233,60 − geri ödenen ₺18.015.572,56 (Tunç değerleme cetveli 2025 toplam satırı). Mizan 431.01.002 alacak hareketi ₺46.131.000,25 = bu nominal alacak (₺32.883.233,60) + yıl-sonu reval kaydı (₺13.247.766,65); borç hareketi ₺18.015.572,56. "Tunç şirkete ₺28M koydu" yanlış; **₺14,87M koydu, gram-altın endekslemesi ₺28,12M'e taşıdı**. Ama feragat ettiği legal claim ₺28,12M'dir (gold-indexed, büyüyen) — feragat gerçek bir taviz.
>
> **v2 FX çıpa düzeltmesi:** 31.12.2025 YMM değerleme kurları **USD ₺42,8623 · EUR ₺50,4532 · Altın ₺6.130,90/gr**'dir. (v1 notundaki USD 42,8457 / EUR 50,2859 değerleri **hatalıydı**; hücre değerleri/çarpımlar zaten doğruydu, sadece not satırı yanlıştı.)
>
> *Altın gram notu:* resmi/YMM değerleme **4.585,8565 gr** (otoriter); 20Mayıs Working iç defteri 4.609,95 gr (~24 gr fark). Resmi alınır.

---

## 2. KAPİTALİZASYON TARİHÇESİ — 2008 → 2026

**Çekirdek bulgu (değişmedi): 2008-2015 kurucu alacaklarının ~$889.000'ı iki tranşta öz sermayeye dönüştü; artık borç DEĞİL. Bugün defterde duran ortak kredileri SADECE Kasım 2015 sonrası yeni krediler + ACT + Tunç altın revolving'tir.**

| Dönem | Olay | Tutar | Durum |
|---|---|---|---|
| 2008-2014 | 6 kurucu enjeksiyonu | fazla $585.142,13 + maaş(USD-fixed) $305.179,83 = **$890.321,96** | Birikti |
| **Mart 2015 MİLAT** | Dönüşüm #1: Aksayan $250.000 + Kahveci ailesi $400.000 | **$650.000 → öz sermaye** | Kalan kredi $240.321,96 |
| **Ocak 2016** | Dönüşüm #2: Aksayan $109.000 + Tunç $130.000 | **$239.000 → öz sermaye** | Kalan ~$1.322 virman |
| — | **TOPLAM SERMAYEYE DÖNEN** | **$889.000** | Artık BORÇ DEĞİL |
| Kasım 2015-2016 | YENİ krediler (bugün defterde) | Tan $80.000 · Li/Creative Monsters $30.000 · Aksayan ₺113.318 + $60.465 | → bugünkü 436 + Aksayan-431 |
| 2018→2024 | Tunç altın-endeksli cari hesap | **2018 devri yalnızca 15,68 gr** → end-2024 **4.047,9177 gr** (₺12.121.408,67 @ 2.994,48) | → 431.01.002 |
| ~2021 | ACT Fund Coöperatief kredisi (C-Note) | €399.977,50 | → 431.01.003 (bugün ₺20,18M) |
| 2023-2025 | Tunç altın revolving (kriz) | → end-2025 **4.585,8565 gr** (₺28.115.427,69 @ 6.130,90) | → 431.01.002 |
| **2024** | Hülya 431.01.004 virman: borç 900.000 / alacak 900.000 | **net ₺0** — 2025'te kapandı | Hülya'nın ayrı 431 kredisi YOK |
| **2024** | 331 kısa-vadeli ortak borcu: 2.000.000 in/out | **net ₺0** — 2025'te yok | — |
| Ağu-Ara 2024 | Kurucuya kısmi geri ödeme (maaş mahsubu + borç) | ₺2.142.757 + Txfr2Payback'te ek ~₺4M Kasım'24 mahsup | Ödendi |
| **2025 (v2 düzeltme)** | Tunç/Kahveci net taze nominal nakit | **brüt giriş ₺20.761.825 / çıkış ₺18.015.573 → net +₺2.746.252,37** | Revolving |
| Q1 2026 | Tunç net taze nakit | net +₺774.000 | Revolving |

> **v2 düzeltme — 2018 gram & 2025 taze nakit:** v1 zaman çizelgesindeki "2018 devri 4.024 gr" **yanlıştı**; 2018 devri yalnızca 15,68 gr'dır. 4.023,82 gr, 2025 dönem-açılışında 2024 kapanış TL'sinin ocak-2025 altın fiyatına yeniden bölünmesinden doğan bir görüntüdür. Altın-endeksli cari hesap **2019'dan beri** aktiftir; ağır kriz revolving'i 2023-2025'tedir. Ayrıca v1'deki 2025 net taze nakit "+₺2.448.075" (ACTPL Cashflow türevi) ham defterle uyuşmuyordu; **ledger'a göre net +₺2.746.252,37** (giriş 20.761.824,93 − çıkış 18.015.572,56; nominal kapanış = açılış 12.121.408,67 + bu net = 14.867.661,04 ✓).

**Mart 2015 MİLAT detayı (2014 sonu toplam ortak borcu = $890.321,96):**
- AKSAYAN: $359.679,65 → $250K sermayeye → kalan $109.679,65 → Ocak'16 $109K → kalan $679,65 virman
- KAHVECİ (Tunç+Hülya kombine): $530.642,31 → $400K (Hülya satırında ama AİLE) → kalan $130.642,31 → Ocak'16 $130K (Tunç) → kalan $642,31 virman
- YATAN: $392,47 → virman

---

## 3. KURUCU MAAŞ ALACAĞI — RESMİ vs İÇSEL (31.12.2025 mizan 335.03/336.03 — kuruşu kuruşuna doğrulandı)

| Kalem | Tunç | Hülya | Aksayan | TOPLAM |
|---|---|---|---|---|
| **RESMİ — 335.03 ('On the books')** | 2.113.606,32 | 1.815.853,14 | 222.330,00 | **4.151.789,46** |
| → iki aktif kurucu (Tunç+Hülya) | 2.113.606,32 | 1.815.853,14 | — | **3.929.459,46** |
| **İÇSEL TL — 31.12.2025** | 5.112.424,67 | 3.068.174,87 | — | **8.180.599,54** |
| **İÇSEL TL — 20.05.2026** | 6.200.841,34 | 3.994.942,10 | — | **10.195.783,44** |
| **DEFTERLENMEMİŞ FARK** (içsel 2025 − resmi aktif) | 2.998.818,35 | 1.252.321,73 | — | **4.251.140,08** |
| İçsel USD-izli — 31.12.2025 (ACT'e raporlanan) | $214.167,61 | $94.096,33 | — | **$308.263,94** |
| 336.03 kurucu muhtelif (resmi, ek) | 157.357,62 | 24.536,00 | — | 181.893,62 |

> **İİK 206 öncelikli ücret alacağı — 2025 mizandan birebir teyit:** **₺4.111.353,08** = 335.03 (Tunç+Hülya ₺3.929.459,46) + 336.03 (Tunç 157.357,62 + Hülya 24.536,00 = ₺181.893,62). Bu, **feragat edilmez**, İİK 206 birinci sıra ücret claim'idir. Tam 335.03 (Aksayan 222.330 dahil) = ₺4.151.789,46.
>
> **Doğrulandı:** 335.01.099 "Personel Ücretleri Tahakkuku" hesabı borç 48.571.700,61 = alacak 48.571.700,61 → **NET ₺0** (nakitsiz tahakkuk wash; toplam personel borcuna katkısı sıfır). 335 toplam bakiye ₺8.401.154,04 (bilançoyla aynı).
>
> İçsel gerçek tahakkuk 31.12.2025'te **₺8,18M** (20.05.2026'da ₺10,20M); resmi aktif 335.03 (₺3,93M) ile arasındaki **₺4.251.140,08 defterlenmemiştir**. İçsel maaş USD-izli de tutulur (kuru korur).
>
> **Aksayan (v3):** ~Ocak 2020 sonunda ayrıldı (belge CFO'da, kopya pending). 335.03.003 = ₺222.330,00, **ayrılış-öncesi donmuş ertelenmiş ücret kalıntısıdır**: 2024 ₺806.500,26 → 2025 ₺222.330,00 (yıl içi ₺584.170,26 ödeme/mahsup, **yeni tahakkuk YOK** = aktif çalışan değil — Tunç/Hülya'da büyük yeni alacak varken Aksayan'da yok). Bu yüzden İİK 206 aktif-kurucu claim'i (₺3.929.459,46) yalnız Tunç+Hülya'dır; Aksayan dışarıdadır.

---

## 4. İŞLETME YÜKÜMLÜLÜĞÜ — İÇSEL (GG) vs RESMİ MİZAN (31.12.2025 denetimli)

| Yükümlülük | İçsel Q4'25 | İçsel Q1'26 | Resmi mizan 31.12.25 | Resmi hesap |
|---|---|---|---|---|
| Banka borçları | 5.438.301,67 | 6.461.319,38 | 4.121.271,42 | 300 |
| **SGK borçları** | **9.966.649** | 9.281.663 | **4.766.409,97** | 361 (540.698,05) + 368.02 (4.225.711,92) |
| Vergi borçları | 2.902.608,10 | 3.062.213,05 | 3.042.490,51 | 360 (1.620.613,47) + 368.01 (1.421.877,04) |
| Kredi kartı | 1.416.052 | 1.194.476 | 37.390,27 | 309 |
| Personel kıdem | 607.518 | 579.650 | 0 | (372/472 YOK) |
| Personel — Haluk Tüfekçi | 2.107.181,12 | 2.624.573 | 235.111,12 | 335.01.018 |
| Personel — Esra Erdoğan | 1.796.661,12 | 2.195.311 | 1.594.018,10 | 335.01.012 + 336.03.005 |
| Personel — diğer çalışanlar | 4.090.471 | 5.141.636 | ~3.823.124 | 335.01 muhtelif |
| Yemek / dış servis | ~2.933.598 | ~3.442.417 | (muhtelif) | — |
| **İÇSEL OPERASYONEL TOPLAM** | **~31.259.040** | ~33.973.057 | (resmi KVYK ₺24.722.345,50) | |

> **SGK farkı kesin:** Resmi SGK = cari 361 (₺540.698,05) + vadesi geçmiş 368.02 (₺4.225.711,92) = **₺4.766.409,97**; içsel ₺9.966.649 → defterlenmemiş/ek SGK farkı **~₺5,2M**. Kredi kartı +₺1,38M, kıdem +₺0,61M defterde eksik; vergide resmi ≥ içsel (368.01 vadesi geçmiş vergi resmi tabloda kayıtlı).
>
> **Tam içsel yükümlülük** ≈ işletme ₺31,3M + ortak nakit alacağı ₺55,8M + kurucu maaş içsel ₺8,2M ≈ **~₺95M** (resmi **denetimli** dış borç **₺80.528.130,75** ile kıyasla). Bu fark, distress hijyeni gereği Kale-facing hiçbir belgeye GİRMEZ.

---

## 5. ERKEN ORTAKLAR — ÇIKIŞLAR

| Ortak | Taahhüt ₺ | Ödenen ₺ | Fazla ₺ | Bugünkü kredi alacağı | Durum |
|---|---|---|---|---|---|
| Mustafa Cem Güçeri | 87.759 | 87.759 | 0 | **YOK** | Tam çıkış ($60.000=₺87.759) |
| Füsun Erkel | 137.413 | 278.496,58 | 141.083,58 | **YOK** | Fazla 2015 öncesi temizlendi |
| Yalın Yatan | 5.000 | 5.597,07 | 597,07 | **YOK** | Fazla $392,47 virman; C-grubu hissedar %0,68 |
| Mehmet Aksayan | 132.414 | 427.806,44 | 295.392,44 | ₺113.318 + $62.144 (436) | **~Oca'2020'de AYRILDI** (CFO kaydı); fazla $284.208 → sermayeye; kalan defterde; İŞBİRLİKÇİ |

> **Hülya:** ayrı 431 nakit kredisi **YOK**. 2024'te 431.01.004 hesabı vardı (borç 900.000 / alacak 900.000 = **net ₺0 virman**); 2025'te kapanmıştır. Katkısı = ödenmemiş maaş + equity; nakit katkı Tunç 431.01.002'de konsolidedir (Ekim 2025 fişlerinde "HÜLYA KAHVECİ ŞİRKETE VERDİ" açıklamalı kayıtlar Tunç hesabı altındadır). Bugün defterde duran ortak kredileri SADECE: Tunç 431.01.002 (altın), ACT 431.01.003 (€), Aksayan 431.01.001 (₺) + 436 (Li/Aksayan/Tan).

---

## 6. ★ RESMİ TABLO MUTABAKATI — 31.12.2025 DENETİMLİ BİLANÇO & GELİR TABLOSU *(YENİ)*

**Çekirdek: denetimli tablo dengesi tutar ve v8/v1 başlık rakamları küçük sapmalarla düzeltilir.**

### A) Bilanço — toplam yükümlülük & özkaynak
| Kalem | ₺ (denetimli) | Not |
|---|---|---|
| Kısa Vadeli Yabancı Kaynaklar (KVYK) | 24.722.345,50 | 300+309+320+335+336+360+361+368+369 |
| Uzun Vadeli Yabancı Kaynaklar (UVYK) | 55.805.785,25 | 431+436 (ortak ₺55.786.497,44) + 481 (₺19.287,81) |
| **→ TOPLAM DIŞ YÜKÜMLÜLÜK** | **80.528.130,75** | *v8'in 80.492.114,72'si +36.016,03 düşüktü* |
| Özkaynaklar | 213.185.911,62 | TTK 376 TEMİZ |
| **→ PASİF TOPLAMI** | **293.714.042,37** | **= AKTİF TOPLAMI ✓ (denge tutar)** |

### B) Gelir tablosu — 2025 zarar anatomisi
| Kalem | ₺ (denetimli) | Not |
|---|---|---|
| Net satışlar | 43.917.492,53 | Yurtiçi 38,91M + yurtdışı 8,05M − iade 3,04M |
| Faaliyet kâr/zararı | (2.912.915,94) | Faaliyet gid. 46,83M (AR-GE 17,65 + GYG 29,18) |
| Kambiyo zararı (net) | (5.210.937,62) | 656 gider 5.650.919,65 − 646 gelir 439.982,03 |
| Finansman gideri (660) | (1.916.656,08) | — |
| **Olağandışı gider (689 — vergi/SGK cezaları)** | **(15.402.611,56)** | **tek seferlik karakter; faaliyet zararı değil** |
| **DÖNEM NET ZARARI** | **(25.289.569,98)** | *v8'in (25.362.497,77)'si +72.927,79 fazlaydı* |

> **689'un anatomisi önemli:** 2025 zararının ana yükü işletmeden değil, **tek seferlik vergi/SGK gecikme cezalarından** (₺15,4M) gelir. Faaliyet zararı yalnızca ₺2,9M. Bu, "şirket batık" değil, "gecikmiş kamu yükü cezalandı" tablosudur — pazarlıkta önemli nüans.

### C) Sahibe tek-sayı dekompozisyonu (denetimli toplama bağlı)
| Blok | ₺ | Tedavi |
|---|---|---|
| Kurucu ortak kredileri (Tunç 431 + Aksayan 431+436) | 30.892.399,75 | **Tunç altın 28.115.427,69 = FERAGAT (kurucu-GM); Aksayan 2.776.972,06 = ayrılmış eş-kurucu ~Oca'2020, İŞBİRLİKÇİ → dostane ayrı imzayla feragat/uzlaşı** |
| C-grubu yatırımcı kredileri (Li + Tan, 436) | 4.713.952,89 | Hisse devralımı/kapanışta uzlaşı (başa-baş) |
| ACT yatırımcı notu (431.01.003) | 20.180.144,80 | = €400.000 anapara; müzakereli temiz çıkış |
| Üçüncü-taraf operasyonel borç | 24.741.633,31 | Devralınır, bütçeden servis (*v8 24.705.617,28 → +36.016,03*) |
| **→ TOPLAM (= dış yükümlülük)** | **80.528.130,75** | çapraz doğrulama ✓ |

### D) Nominal sermaye cap table (hesap 500 — 6.485.562 pay)
| Grup / Ortak | Pay | % | Not |
|---|---|---|---|
| A — Tunç Kahveci | 110.903 | %1,71 | Kurucu/GM |
| A — Hülya Kahveci | 1.521.837 | %23,46 | Kurucu |
| A — Mehmet Aksayan | 1.388.260 | %21,41 | **Ayrılmış ~Oca'2020 (CFO kaydı, kopya pending); İŞBİRLİKÇİ → nisapta DESTEKLEYİCİ, risk DEĞİL** |
| **A Grubu** | **3.021.000** | **%46,58** | |
| B — ACT Fund Coöp. | 1.556.535 | %24,00 | Yatırımcı |
| C — Zeliha Zelal Ökten | 727.696 | %11,22 | %85 nisap için kritik |
| C — Saigen Teknoloji | 463.080 | %7,14 | |
| C — Yusuf Plamenko Tan | 441.029 | %6,80 | + 436 lender $80K |
| C — Creative Master Co. Ltd. | 232.120 | %3,58 | **Seyşeller · erişim riski · Li loan ile ilişki teyit edilecek** |
| C — Yalın Yatan | 44.102 | %0,68 | |
| **C Grubu** | **1.908.027** | **%29,42** | |
| **TOPLAM** | **6.485.562** | **%100** | |

> **Li Nuo Xin ≠ Creative Master Co. Ltd. (defterde):** 436 kredi alacaklısı kişisel adıyla **Li Nuo Xin** ($29.979); C-grubu hissedar ise **Creative Master Co. Ltd.** (Seyşeller, %3,58). OZET zaman çizelgesi bu krediyi "Creative Monsters → Li Nuo Xin" diye etiketlemiştir. Li'nin Creative Master'ın temsilcisi/aslı olup olmadığı **teyide muhtaçtır** — %85 GK nisabı (Creative Master = erişim riski) ve Li kredisinin kapatılması açısından önemli.
>
> **%85 nisap (v3 — Aksayan işbirlikçi):** A+B+Aksayan = Tunç %1,71 + Hülya %23,46 + Aksayan %21,41 + ACT %24,00 = **%70,58**. Aksayan husumetli olmadığından %21,41'i **destekleyici oydur** — nisap riski değil, varlık. %85'e ulaşmak için kalan **~%14,42 C-grubundan** gelmelidir → gerçek nisap riski **C-grubu erişilebilirliğidir** (özellikle Creative Master %3,58 Seyşeller). Aksayan'ın ₺2.776.972,06 kredisi de işbirlikçi olduğundan **kendi (dostane) imzasıyla** feragat/uzlaşıya açıktır — otomatik kurucu feragatına dahil değil, ayrı imza gerektirir.
>
> **Özkaynağın niteliği (TTK 376 / ACT 11.5 Put-ölü teyidi):** ₺213,19M özkaynağın ~%94'ü **enflasyon düzeltmesi + aktifleştirilmiş Ar-Ge** kaynaklıdır — 502 Sermaye Düzeltmesi ₺95.850.759,55 + 520 ihraç primi (enflasyon) ₺83.990.368,52 + 570 enflasyon kârı ₺50.534.383,67. "Gerçek" nakit ödenmiş yalnız ₺6,49M sermaye + ₺6,50M ACT primi. Aktif (₺293,7M) > yabancı kaynak (₺80,5M); **borca batıklık yok, TTK 376 temiz**.
>
> **Enflasyon restate notu:** Bağımsız 31.12.2024 bilançosu özkaynağı **₺200.362.758,58** idi; enflasyon düzeltmesiyle 2025 karşılaştırmalı tabloda **₺238.475.481,60**'a restate edildi (+₺38,11M). **2025 karşılaştırmalı = otoriter**; standalone 2024 bilançosu süperseded.

---

## 7. ★ BANKA-SEVİYESİ KANIT KATMANI (Fin5) — #6 "431 Savunma Dosyası" cephanesi *(YENİ)*

> **DAĞITIM: İÇ — Kale/ACT ile PAYLAŞILMAZ.** Bu, kurucunun kişisel banka hareketlerini ve düzenleyici sorgu cevabını içerir.

### A) Anonimizasyon anahtarı (dosyaları okurken ZORUNLU)
| Takma ad | Gerçek | Dosya |
|---|---|---|
| **FORD TEKNOLOJİ / Ford** | **ARDIÇ AR-GE A.Ş.** (şirket) | Fin5 HesapHareketleri |
| **SULAKGOL TEKNOLOJİ / Sulakgol** | **ARDIÇ AR-GE A.Ş.** (şirket — FARKLI takma ad, iki entity değil!) | Fin5 EE Table |
| **TOM MICHAEL JORDAN / Jordan** | **Tunç Mustafa Kahveci** (kişisel hesaplar) | Fin5 HesapHareketleri |
| Jane (Jordan) | Hülya (Karaerkek Kahveci) | — |
| Maria (Jordan) / Münevver Kahveci | Anne | — |
| Cem Galip (Jordan) | Kardeş | — |

### B) Tunç altın hesabı (431.01.002) — tam izlenebilirlik
| Kalem | ₺ |
|---|---|
| Toplam alacak (kredilendirme, açılış dahil) | 32.883.233,60 |
| (−) Toplam borç (geri ödeme) | (18.015.572,56) |
| **= Nominal nakit bakiye** | **14.867.661,04** |
| (+) Altın-fiyat revaluation | 13.247.766,65 |
| **= 31.12.2025 gold-değerli bakiye** | **28.115.427,69** (4.585,8565 gr × ₺6.130,90) |
| 2025 net taze nominal nakit (yıl içi) | +2.746.252,37 (giriş 20.761.824,93 − çıkış 18.015.572,56) |

### C) GİB/BDDK/MASAK 2025 banka sorgu cevabı — özet (Fin5 "Cevap" sayfası, 01.04.2026)
Kurucunun 5-kaynak konsolide kişisel banka hareketleri (Akbank + Garanti BBVA + İş Bankası + Garanti-2 Kazasker + Bonus KK) için **zaten hazırlanmış**, kalem-kalem, sıfıra mutabık bir düzenleyici cevap belgesi mevcuttur:
- **Beyana tabi gelir = ₺1.898.293,30** (maaş/huzur hakkı 1.645.888,88 + Bağkur emeklilik 251.518,34 + faiz 886,08).
- **Borç/anapara hareketleri (gelir DEĞİL) = ₺35.678.221,57** (ARDIÇ borç iadesi +16,998M, para piyasası fonu satımı +13,679M, anne Münevver borcu +632K, döviz bozdurma +1,517M, kendi hesap transferi +2,757M, Tüfekçi borcu net 0).
- **Nakit yatan = 0** (hiç nakit yatırma yok; tüm hareketler banka havalesi → MASAK temiz).
- **Net çıkış fazlası izah edildi** (devir +54K + anne borç +632K + döviz/fon eritme +777K > sorgu farkı 1,45M). **Sonuç: "Açıklanamayan nakit hareketi YOKTUR"**, her kalem dekont/havale ile ibraz edilebilir.

### D) 431 revolving — banka tarafı doğrulaması (2025)
431.01.002 ledger (ARDIÇ defteri): çıkış (ARDIÇ→Tunç) ₺18.015.572,56 · giriş (Tunç→ARDIÇ, yıl içi) ₺20.761.824,93 → net **+₺2.746.252,37**. Banka tarafı (Tunç 5-kaynak kişisel): ARDIÇ↔Tunç havaleleri ≈ **₺17,0M giriş / ₺18,2M çıkış**. Aradaki fark = (i) ledger'daki **nakit-olmayan mahsup** kayıtları, (ii) Hülya'nın Tunç altında kaydedilen katkıları, (iii) tek-hesap vs konsolide kapsam. Çift yönlü yüksek hacim = **e-haciz koruma "park" mekanizması**; her kalem fiş/yevmiye/dekont no ile izlenebilir (EE Table Sayfa2 + HesapHareketleri RAW-Banka 2.703 satır). Bu, #6 dosyasını "banka ekstresi gerekli" durumundan "**ekstre + dekont elde, düzenleyici cevabı yazılmış**" durumuna taşır.

### E) Distress hijyeni *(yalnız iç/sözlü — Kale-facing belgeye GİRMEZ)*
Kurucu kişisel likiditesi gergin: anne **Münevver ₺1.159.000 borç verdi** (2024: 95K, 2025: 632K, 2026: 432K; 2026'da ARDIÇ tahsilatından ödenecek). Tunç kişisel hesap neti 2024 +54K / 2025 −346K / 2026 −1,2K; ana TL hesap kullanılabilir bakiye ~₺1,59M. Haluk Tüfekçi ilişki ağı karmaşık (çalışan + borç veren + borç alan). Bu, "**kurucu geçimi = pazarlık tabanı**" tezini güçlendirir ama yalnız içeride kullanılır.

---

## 8. KAYNAK HARİTASI & DÜZELTME GÜNLÜĞÜ

**Bu session'ın kaynakları (Fin3 + Fin5, ham hücreden):** 31.12.2025 bağımsız bilanço (yan yana 2024/2025) · ayrıntılı gelir tablosu · 11-sayfa detay mizan · Tunç altın değerleme 2024+2025 · GEÇİCİ VERGİ kur değerleme 2024+2025 · 2024 KKEG + enflasyon düzeltmesi · 2024 detay kesin mizan · Fin5 EE Table (431/335 muavin + Akbank c/h) · Fin5 HesapHareketleri v6 (Tunç 5-kaynak banka + FX/kıymetli maden + GİB/MASAK cevap).

### v1/v8 → v2 düzeltme günlüğü (denetimli tabloya bağlama)
| Kalem | Eski (v8/v1) | Yeni (denetimli) | Fark |
|---|---|---|---|
| Toplam dış yükümlülük | 80.492.114,72 | **80.528.130,75** | +36.016,03 |
| Satıcılar (320) | 2.743.526,71 | 2.751.509,43 | +7.982,72 |
| Personele Borçlar (335) | 8.379.198,73 | 8.401.154,04 | +21.955,31 |
| Diğer Çeşitli Borçlar (336) | 1.594.912,88 | 1.600.990,88 | +6.078,00 |
| 2025 net zarar | (25.362.497,77) | **(25.289.569,98)** | +72.927,79 |
| Özkaynak 31.12.2025 | 213.112.983,83 | **213.185.911,62** | +72.927,79 |
| Operasyonel 3.taraf borç | 24.705.617,28 | 24.741.633,31 | +36.016,03 |
| Aksayan 431.01.001 | 113.317,51 | 113.318,00 | +0,49 |
| 2025 Tunç net taze nakit | +2.448.075 | **+2.746.252,37** | +298.177 |
| FX çıpa notu USD / EUR | 42,8457 / 50,2859 | **42,8623 / 50,4532** | (not hatası) |
| Tunç 2018 devir gram | "4.024 gr" | **15,68 gr** | (tarihçe) |

### Çözülen muammalar / çapraz-yıl
- **₺584.808,60 "kayıp" kalem RESOLVED:** 2024 yıl-sonu Aksayan-436 (+küçük Li) FX revaluation'ı 2024 bilançosuna **kayıtlı (reval öncesi) değerden** girilmiş; 2025'te trued-up. Cari pozisyonu etkilemez; YoY köprüsü tam kapanır. *(2024 detay mizan: 436 = Li 1.055.320,97 + Aksayan 1.604.762,35 + Tan 2.817.864,00 = 5.477.947,32 = 2024 bilanço 436 ✓)*
- **Hülya 431.01.004 (2024):** borç 900.000 / alacak 900.000 = net ₺0 virman; 2025'te kapandı. **331** (kısa-vadeli ortak borcu 2024) 2.000.000 in/out net ₺0.
- **YoY köprü (431+436):** end-2024 ₺32.409.007,27 → end-2025 ₺55.786.497,44 (+₺23,38M); ~%88 FX/altın revaluation (ACT +5,48M sıfır nakitle, Tunç altın reval +13,25M, USD partiler +1,31M, Aksayan-436 2024-reval catch-up 584K), yalnız ~₺2,75M Tunç taze nakit.
- **335.01.099 wash** ₺48.571.700,61 net ₺0; **İİK 206** ₺4.111.353,08 kuruşu kuruşuna; **689** ₺15.402.611,56 (2025) teyit.

### Veri hijyeni & uyarılar (beyan ≠ kanıt)
- ⚠ Fin3 GEÇİCİ VERGİ dosyalarındaki **PAZARLAMA / TRAFO KAZANLARI** sayfaları **BAYSAN Transformatör**'e aittir — ARDIÇ DEĞİL; yalnız "Değerleme" sayfası ARDIÇ'tır.
- ⚠ Fin5'te ARDIÇ **iki takma adla** geçer (FORD + SULAKGOL); tek şirkettir.
- ⚠ Standalone 2024 bilançosu (₺200,36M özkaynak) enflasyon-restate öncesidir; 2025 karşılaştırmalı (₺238,48M) otoriter.
- ⚠ Distress hijyeni: içsel ~₺95M yükümlülük, kurucu kişisel likidite, anne borcu — Kale-facing hiçbir belgeye GİRMEZ.
- ⚠ **PENDING KANIT (v3):** Mehmet Aksayan ayrılış belgesi (~Ocak 2020 sonu) — kurucu beyanı + CFO kayıtlarında mevcut, **kopya dosyaya eklenecek**. Aksayan **husumetli DEĞİL** (işbirlikçi); defter ayrılışla tutarlı (335.03.003 donmuş ₺222.330, yeni tahakkuk yok).

---

## 9. EK — KAYNAK İZLEME (CFO ÇAPRAZ-DOĞRULAMA CETVELİ)

> Her rakamın kaynak dosyası, sayfası ve hücresi/hesap kodu. **KATMAN:** **T1** = denetimli resmi tablo / YMM değerleme cetveli (en güçlü, CFO doğrudan doğrular) · **T2** = banka kanıtı (Fin5 dekont/ekstre) · **T3** = iç çalışma defteri (Fin2 20Mayıs Working) — **HÜCRE İZLİ; CFO Fin2'den doğrular, denetimli tabloda GÖRÜNMEZ** (içsel yönetim rakamı, denetlenmemiş). `.xls/.xlsx` kaynaklarda **hücre**, `.pdf` denetimli tablolarda **hesap kodu/satır** verilmiştir.

### A) Tunç altın hesabı (431.01.002) — `TUNÇ KAHVECİ CARİ DEĞERLEME 2025 (.xls)`, sayfa **Altın** · *bu turda hücre-bazlı doğrulandı* · **T1**
| Kalem | Değer (₺) | Hücre |
|---|---|---|
| Ödenen (borç) toplamı | 18.015.572,56 | **D83** |
| Alınan (alacak) toplamı | 32.883.233,60 | **E83** |
| Nominal nakit bakiye (E83−D83) | 14.867.661,04 | **E84** |
| Gram (yıl-sonu) | 4.585,8565 | **F87 (=G83)** |
| Altın fiyatı (₺/gr) | 6.130,90 | **F88** |
| Gold-değerli TL bakiye | 28.115.427,69 | **F89** |
| Altın revaluation (F89−E84) | 13.247.766,65 | **F90** |

### B) ACT & 436 USD — `GEÇİCİ VERGİ KUR DEĞERLEME 2025 (.xls)`, sayfa **Değerleme** · *bu turda hücre-bazlı doğrulandı* · **T1**
| Kalem | Değer | Hücre |
|---|---|---|
| ACT € anapara | €399.977,50 | **G8** |
| ACT TL değeri (431.01.003) | 20.180.144,80 | **L8** |
| EUR kuru | 50,4532 | **I5 (=I8)** |
| Li Nuo Xin $ (436.01.001) | $29.979 | **G9** → TL **L9** = 1.284.968,89 |
| Aksayan-436 $ (436.01.002) | $62.144,45 | **G10** → TL **L10** = 2.663.654,06 |
| Tan $ (436.01.003) | $80.000 | **G11** → TL **L11** = 3.428.984,00 |
| USD kuru | 42,8623 | **I4 (=I9/I10/I11)** |
| *(Ref)* Tunç açılış end-2024 — *yıl-sonu DEĞİL* | 12.121.408,67 | row7 / L7 |

> ⚠ Aynı kitaptaki **PAZARLAMA & TRAFO KAZANLARI** sayfaları **BAYSAN Transformatör'e** aittir — ARDIÇ DEĞİL; yalnız **Değerleme** sayfası ARDIÇ'tır.

### C) Bilanço toplamları — `BİLANÇO YANYANA 31.12.2025 (.pdf, denetimli)`, **2025 sütunu** · hesap kodu · **T1**
| Kalem | Değer (₺) | Hesap |
|---|---|---|
| KVYK | 24.722.345,50 | KVYK toplamı |
| UVYK | 55.805.785,25 | UVYK toplamı |
| **Toplam dış yükümlülük** | **80.528.130,75** | KVYK+UVYK |
| 431 Ortaklara Borçlar | 48.408.890,49 | 431 |
| 436 Diğer Çeşitli Borçlar | 7.377.606,95 | 436 |
| Özkaynaklar | 213.185.911,62 | Özkaynak toplamı |
| **Aktif = Pasif** | **293.714.042,37** | Genel toplam |
| 502 Sermaye Düzeltmesi | 95.850.759,55 | 502 |
| 520 İhraç Primi (enflasyon) | 83.990.368,52 | 520 |
| 570 Geçmiş Yıl Kârı (enflasyon) | 50.534.383,67 | 570 |
| 481 Gider Tahakkukları | 19.287,81 | 481 |

### D) Gelir tablosu — `GELİR TABLOSU 31.12.2025 (.pdf, denetimli)` · **T1**
| Kalem | Değer (₺) | Hesap |
|---|---|---|
| Net satışlar | 43.917.492,53 | Net satışlar |
| Faaliyet kâr/zararı | (2.912.915,94) | Faaliyet sonucu |
| 656 Kambiyo zararı | 5.650.919,65 | 656 |
| 646 Kambiyo geliri | 439.982,03 | 646 |
| 660 Finansman gideri | 1.916.656,08 | 660 |
| 689 Olağandışı gider (vergi/SGK ceza) | 15.402.611,56 | 689 |
| **DÖNEM NET ZARARI** | **(25.289.569,98)** | Net dönem zararı |

### E) Mizan hesapları — `MİZAN 31.12.2025 (.pdf, denetimli)` · hesap kodu · **T1**
| Kalem | Değer (₺) | Hesap |
|---|---|---|
| Tunç kurucu ücret | 2.113.606,32 | 335.03.002 |
| Hülya kurucu ücret | 1.815.853,14 | 335.03.001 |
| Aksayan (donmuş kalıntı) | 222.330,00 | 335.03.003 |
| 336.03 Tunç / Hülya | 157.357,62 / 24.536,00 | 336.03.009 / .007 |
| 335 Personele Borçlar (toplam) | 8.401.154,04 | 335 |
| 336 Diğer Çeşitli (toplam) | 1.600.990,88 | 336 |
| 335.01.099 Ücret Tahakkuku (wash, net 0) | 48.571.700,61 | 335.01.099 (borç=alacak) |
| SGK cari / vadesi geçmiş | 540.698,05 / 4.225.711,92 | 361 / 368.02 |
| Vergi cari / vadesi geçmiş | 1.620.613,47 / 1.421.877,04 | 360 / 368.01 |
| Banka / Kredi kartı / Satıcılar | 4.121.271,42 / 37.390,27 / 2.751.509,43 | 300 / 309 / 320 |
| Aksayan TL kredisi | 113.318,00 | 431.01.001 |
| Tunç mizan alacak hareketi (=nominal+reval) | 46.131.000,25 | 431.01.002 |
| Haluk Tüfekçi / Esra Erdoğan | 235.111,12 / 1.594.018,10 | 335.01.018 / .012 |

### F) Çapraz-yıl — `2024 DETAY KESİN MİZAN (.xls/.pdf)` · **T1**
| Kalem | Değer | Hesap |
|---|---|---|
| Cap table — toplam pay | 6.485.562 | hesap 500 alt hesapları |
| A/B/C pay sayıları (per-ortak) | *→ CFO hücre teyidi* | 500.01 / 500.02 / 500.03 … |
| 436 2024 toplam | 5.477.947,32 | 436 (Li 1.055.320,97 + Aksayan 1.604.762,35 + Tan 2.817.864,00) |
| 335.03.003 Aksayan 2024 (→222.330'a indi) | 806.500,26 | 335.03.003 |

### G) Banka kanıtı — `Fin5 EE Table` + `Fin5 HesapHareketleri` · **T2**
| Kalem | Değer | Dosya · Sayfa |
|---|---|---|
| 431.01.002 muavin (Tunç c/h) | (muavin) | EE Table · `Zirve gir çık` |
| Akbank Sulakgöl c/h aylık | (c/h) | EE Table · `Ozet` / `Banka git cik` |
| Tunç 5-kaynak banka hareketleri | 2.703 satır | HesapHareketleri · `RAW-Banka 24-26` |
| 2025 net taze nakit | +2.746.252,37 | HesapHareketleri · ledger (giriş 20.761.824,93 − çıkış 18.015.572,56) |
| GİB/MASAK beyana tabi gelir | 1.898.293,30 | HesapHareketleri · `Cevap` (01.04.2026) |
| GİB/MASAK borç/anapara (gelir değil) | 35.678.221,57 | `Cevap` |
| GİB/MASAK nakit yatan | 0 | `Cevap` |

### H) İçsel rakamlar — `Fin2 20 MAYIS WORKING REVİZE07 (.xlsx)` · **T3 — İÇ DEFTER, HÜCRE İZLİ; CFO Fin2'den doğrular, denetimli tabloda GÖRÜNMEZ**
| Kalem | Değer (₺) | Sayfa | Hücre |
|---|---|---|---|
| İçsel kurucu maaş 31.12.2025 | 8.180.599,54 | OzetinOzeti | **E31** (Tunç 5.112.424,67) + **E30** (Hülya 3.068.174,87) |
| İçsel kurucu maaş 20.05.2026 | 10.195.783,44 | OzetinOzeti | **H31** (6.200.841,34) + **H30** (3.994.942,10) |
| İçsel operasyonel yükümlülük Q4'25 | 31.259.039,77 | GG hazirliklari | **C6:C25** (Q42025 sütunu toplamı) |
| $889.000 kapitalizasyon (2015-16) | $889.000 | MART 2015 MİLAT | **E24** 890.321,96 → **F24** 650.000 + **C29+C30** 239.000 |
| Erken ortak çıkış (Güçeri/Erkel/Yatan) | bugün YOK | GÜÇERİ/ERKEL/YATAN | **GÜÇERİ!E10** 87.759 · **ERKEL!B3** 137.413 · **YATAN!E10** 5.597,07 · MART 2015 MİLAT!E20:E24 |

> **Çapraz teyit (Fin2 ↔ resmi/değerleme):** `OzetinOzeti!E10` = 14.867.661 (Tunç nominal nakit, `Altın!E84` ile aynı) · `OzetinOzeti!F10` = 2.746.252,32 (2025 net taze nakit, ledger ile aynı) · `OzetinOzeti!E26/E27` = 1.815.853,14 / 2.113.606,32 (Hülya/Tunç resmi 335.03, mizan ile aynı). İç defter ile resmi/değerleme kaynakları **birbirini doğruluyor**.

> **Özet:** A-B (.xls denetimli/YMM) ve H (.xlsx iç defter) **hücre-bazlı, bu turda birebir doğrulandı**. C-E (.pdf denetimli) hesap kodu ile izlenir, CFO denetim dosyasından doğrudan okur. F çapraz-yıl (cap table per-ortak pay hücreleri CFO teyidine bırakıldı). G banka kanıtı. **H artık "okunmadı" değil — hücre izli; ancak içsel yönetim rakamıdır (denetimli tabloda görünmez), CFO Fin2'den teyit eder.**

*Defter Notu v5 · 14.06.2026 · Çıktı: ARDIC_Ortaklar_Alacak_Sermaye_OZET_v5_CFO.xlsx (10 sayfa, 0 formül hatası, denge tutar; `Kaynak_Izleme_CFO` H bloğu hücre-izli)*
