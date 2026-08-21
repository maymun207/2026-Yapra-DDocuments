# CWF — SESSION GRAPH KB · v110 (S110)
<!-- 2026-08-20. S110'un kalıcı hükümleri, ölçümleri ve öğrenilenleri.
     v109'u geçersiz KILMAZ; onun ardılıdır. BÜTÜN yazıldı. -->

## §1 · S110 NE YAPTI — bir cümle

Sabah "RAG kayboldu, backend discovery yok" korkusuyla açıldı; **hiçbirinin doğru olmadığı ölçüldü**, üç bekçi canlıda adlandırıldı, sekiz PR indi, korpus tamamlandı, ve Recall@k **null** çıkarak `#81`'i makul bir yönden **kanıtlanmış zorunluluğa** çevirdi. Oturumun asıl çıktısı bir özellik değil, bir **teşhis**: sistem her şeyi inşa etmiş, hiçbirini okumuyor.

---

## §2 · ÜÇ RAF, SIFIR OKUYUCU — S110'un merkezi bulgusu

| Raf | İçinde | Üretimde okuyan |
|---|---|---|
| Vektör korpusu | **342 kalem** (araç açıklamaları + governed knowledge) | ⑦ Yol B indi, **valf kapalı**, ve yanlış raf |
| RAG doküman korpusu | Faaliyet Raporu 2025 dahil, erişilebilir | yönlendirilmiyor |
| Superset artefakt kataloğu | **47 dataset adı**, `Granit - Mengil Doğalgaz Kullanımı` dahil | **hiç kimse** |

Ve dördüncüsü S110'da inşa edildi: `turnContextLog` — **hiçbir aşama ona yazmıyor**.

---

## §3 · ON BEKÇİ — canlıda ölçülmüş harita

Bir kullanıcı cümlesi modele ulaşana kadar iki tür kapıdan geçer: **şekillendirici** (masaya ne konacağını belirler) ve **kesici** (turu öldürür, model hiç konuşmaz).

| # | Bekçi | Nerede | Tür | S110'da |
|---|---|---|---|---|
| B0 | BurstGuard | ön | kesici (kaynak) | sağlıklı |
| **B1** | Kategori (kelime→kategori) | routing | **şekillendirici** | 04:41'de `knowledge_search`'ü sakladı |
| B2 | GatewayPolicy | register-tools | şekillendirici | — |
| B3 | ToolCollision | register-tools | şekillendirici | `hb_*` ×4 her turda |
| **B4** | Varlık-çözümleme kapısı | clarify | **kesici** | 06:47'de "Kaleseramik"te kesti |
| **B5** | Frame-güven kapısı | clarify | **kesici** | 06:55 ve 07:39'da kesti |
| B6 | COMPARE kapısı | clarify | kesici | tetiklenmedi |
| B7 | Zaman kapısı | clarify | yumuşak (LOW) | — |
| B8 | ALT-D / COMMAND | clarify | kesici | uyudu |
| B9 | Kısaltma bandı | stream | şekillendirici | ✅ dürüstçe çalıştı |

**Sahip hükmü:** *"başıbozuk bir ordu — Bremen mızıkacıları bile daha koordineli."* Doğru, ve kanıtı S110'un kendi logunda: B4'ün iki kanalı aynı dize hakkında zıt hüküm verdi (`alias → unresolved`, `scope → resolved`) ve anlaşmazlığı bir **elle konmuş boolean** çözdü (`suppressedClarification=true`). Koordinasyon tasarımla değil yamayla.

**Dört probun merdiveni** (aynı soru, dört formülasyon):

| Prob | B1 | B4 | B5 | Sonuç |
|---|---|---|---|---|
| marka + tam soru | ❌ | – | – | araçsız clarify |
| "Dokümanlarda" + marka | ✅ | ❌ | – | "hangi varlık?" |
| markasız, iki parçalı | ✅ | ✅ | ❌ | "anlayamadım" |
| **markasız, tek cümle** | ✅ | ✅ | ✅ | **kaynaklı cevap: 2.931 kişi** |

Cevap bütün sabah erişilebilirdi. Kullanıcının doğal cümlesiyle arasında **üç bağımsız bekçi** vardı.

---

## §4 · İKİ KATMANDA SÖZCÜKSEL ÇÖKÜŞ — mühürlü

**Recall@k null:**

| Korpus | Recall A → B | Genişlik A → B |
|---|---|---|
| **v3** | **0.3333 → 0.3333** | 13.00 → 16.78 |
| v1 | 0.6494 → 0.6954 | 16.03 → 19.59 |
| v2 | 0.5631 → 0.5991 | 15.03 → 18.49 |
| line1 | 0.5250 → 0.5500 | 8.00 → 11.70 |

E1 bekçisi altında hiçbir korpusta kurtarma yok — her kazanç ~3.5 fazla araçla geldi. Arm A mühürlü tabanı birebir üretti (`v1 0.6494`, `v3 0.3333`) → **alet çapalı, null güvenilir**.

**Mekanizma kontrollerde:** mekanizma-kelimeli soru `knowledge_search`'ü yüzeye çıkarıyor; **dört gerçek üretim sorusunun dördü de çıkarmıyor.**

**İkinci katman:** `tuketim` → **SIFIR**, çünkü dataset adı `Kullanımı`. On iki şekil: 4 isabet, 8 ıska. Ve `observed_via` 47/47 `list_datasets` — **hiçbir grafik envantere alınmamış**, yani grafik araması geri düşecek kayıt da bulamazdı.

> **Boşluk GÖNDERGESEL, sözcüksel değil.** `backend_tools.description` aracın MEKANİZMASINI söyler, verisinin İÇERİĞİNİ asla. Daha güçlü bir kodlayıcı bunu kapatamaz.

---

## §5 · S110 HÜKÜMLERİ — kalıcı

### Yönetişim / protokol
1. **`F-S110-CLAIM-DELETE-RACE`** — claim = ölçülmüş bayat sha'ya pinli `--force-with-lease`, **silme adımı YOK**. Delete-then-push atomik değildir ve silme adımı, first-push-wins'i mümkün kılan hakemliği yok eder. **S111 boot standardı.**
2. **`F-S110-UNOBSERVABLE-PRECONDITION`** — bekleme sözleşmesi, bekleyen tarafın **kendi aletiyle okuyabileceği** sinyallerle ifade edilir. Otobüs tek yönlüdür; akran düzyazısı sinyal değildir. Böyle bir bekleyiş yaratan kart, **kartın kusurudur**, şeridin görevi değil.
3. **Ölçülebilir bir koşulu beklemek, onu okumamak için bir mazeret değildir** (AG-1). Kendi ön koşulunu ölçebilen şerit onu yoklar; izin istemez.
4. **Bir statü bir izin olamaz** (AG-3, ADR-010 atfıyla). "Hangi statüler yönlendirir" sorusu doğrulayıcıyı yönlendirme mercii yapar.
5. **Silme de yıkıcı bir yazmadır** (AG-1) — kiraya pinlenir, yoksa "MERGED ölçtüm" ile "sildim" arasındaki pencerede gelen commit sessizce yok olur.
6. **Kapanışın tek başarısızlık modu, kaydı olmayan açık daldır.** `LANDED` ve `RETIRED` ikisi de meşru terminal durum — bu çerçeve "bitmedi"yi kusur olmaktan çıkarıp karara çevirir (AG-2).

### Epistemik
7. **`L-ADAY-S110-REBASE-VOIDS-GATE`** — bir kapı bir **AĞACI** belgeler, bir dal adını değil. CI durumu içeriğe değil commit kimliğine bağlanır; rebase kimliği değiştirir. S110'un tek partisinde **dört kez** yüzeye çıktı.
8. **`L-ADAY-S110-ISOLATION`** — izolasyon **tarafsız bir kontrol değildir**. 8/8 yeşil "test sağlam" gibi okunur; oysa izolasyon aradığın nedeni (süit içi çekişme) yok eder. Ölçmek istediğin nedeni ortadan kaldıran bir kontrolün sonucu delil değildir.
9. **"Bir mutant'ı olmayan argüman düzyazıdır, sözleşme değil"** (AG-3).
10. **Bastırılmış `stderr`, borulanmış `$?` ile aynı sınıftır** — kendine-dayatılmış sağırlık, ve kayıp her seferinde **sessizlik** olarak yüzeye çıkar; en zor fark edilen biçim.
11. **Dağılım tek satırdan fazlasını söyler** (AG-1) — 47 satırda 2 ayrı `first_seen` değeri "parti başına damga" der; tek ters satır hiçbir şey kanıtlamazdı.
12. **Deterministik bir boru hattının tekrarı ÜRETİLEBİLİRLİĞİ test eder, varyansı değil** (AG-4). Üç bayt-aynı koşuyu "dar dağılım" diye sunmak yerine bunu söylemek.
13. **`BEHIND` (ağaç yanlış → insan gerek) ≠ `BLOCKED` (ağaç doğru → zaman gerek)** (AG-2). Bir engelin adı ona ne yapacağını söyler — yeter ki "birleştirilemiyor"u tek bir durum sanmayasın.
14. **Rapor telin söylediğini basar, beklediğini değil** (Operator raporu vakası).
15. **Kanıt bloğu rebase'den sağ çıkarken İKİ master'ı birden taşır** (AG-1) — kartın yazıldığı ve üstüne oturulan. Yalnız eskisini taşımak yanlış iddia, sessizce değiştirmek kaynağı silmek.
16. **Dormantlık BEYAN değil ÖLÇÜM olmalıdır** (AG-2) — taban değişimi bir import getirmiş olabilir; süit kısıtı iddia etmelidir ki doğru olmaktan çıktığı gün kırmızı yansın.
17. **Hunk seçmek hiç kimsenin hesaplamadığı bir sayı üretir** — iki türetilmiş değerin birleşimi. `reseal` sonucu türetilmiş tutar.
18. **Bir kelimenin iki farklı gerçeği örtmesi** S110'un tekrar eden şekli: `absent`/`unexposed` · `on`/`idle` · ölü sha'da yeşil · "en yeni satır" demek isterken "son tükettiğim satır" (AG-4).

---

## §6 · ARCHITECT'İN ÖZ-DÜZELTMELERİ — dokuz, ve hepsi aynı kökten

| Kayıt | Ne | Bulan |
|---|---|---|
| `A-REC-S110-1` | Register v112, S106'da kapanmış `#75`'i yanlış önermeyle yeniden açtı | Architect (canlı log) |
| `A-REC-S110-2` | Kelime-listesi yaması önerdi; sahip reddetti ve **sahip haklıydı** | Sahip |
| `A-REC-S110-3` | Tablonun varlığını 03:50'ye **geriye yansıttı** — ölçümü zamanda geri taşımak | AG-4 |
| `A-REC-S110-4` | Sahibe markalı prob cümlesi verdi; arıza zaten ölçülmüştü, bir tur yakıldı | Architect |
| `A-REC-S110-5` | "Sınır asla ilerlemez" tahmini **çürütüldü** (`upserted=100 skipped=69`) | AG-4 |
| `A-REC-S110-6` | Gramerin ifade edemeyeceği bir işaretçi verdi; geri çekildi | AG-3 |
| `A-REC-S110-7` | "#70 hiç inşa edilmedi" — **tek negatif grep**; 47 satır varmış | AG-1 |
| `A-REC-S110-8` | "Hangi statüler yönlendirir" sorusu ADR-010'u çiğniyordu | AG-3 |
| `A-REC-S110-9` | Slot-4 kartına **okunamayan** ön koşul yazdı | AG-4 |

**Ortak kök:** Architect, oturumdan oturuma yeniden yazılan özet zincirinden öncül türetiyor. Literatürdeki adı **brevity bias** ve **context rot**. Defter iki mint'te 17.249 → 4.923 bayta indi; ~18 kalem kapanış kaydı olmadan düştü. **`PHASE-ARCHITECT-GROUND-TRUTH-1`** bu kökün kartıdır ve S111'in 1 numarasıdır.

**Ve S110'un en önemli tek gözlemi:** dört düzeltmenin dördü de, **doğrulayamadığı bir öncülü kabul etmeyen bir şeritten** çıktı. Kart otoritedir ama öncül değildir. Sistem mimarını düzeltebiliyor.

---

## §7 · S110 İNİŞLERİ

| PR | Faz | Merge sha |
|---|---|---|
| #310 | DIGEST-TRUTH-AND-CORPUS-1 | `b33ac46d` |
| #311 | TOOL-RETRIEVAL-PATHB-1 (⑦ Yol B) | `674d4ea8` |
| #309 | DIAGNOSIS-DECISION-SPEC-1 | `1cbd1580` |
| #308 | RAG-REACH-PROBE-1 | `1ea3ff07` |
| #313 | CATALOG-VERIFY-1 | `f6de2dec` |
| #312 | TURN-CONTEXT-SKELETON-1 | `313efd99` |
| #315 | BACKEND-CATALOG-CARRIER-1 | `b90897fc` |
| #314 | DOC-CORPUS-DISCOVERY-1 | `ae85c3b4` |

Sekiz PR · sıfır kendi-PR'ını-indirme · sıfır `--admin` · sıfır kırmızıda merge · kapanışta **yalnız `master`**.

<!-- END KB v110 -->
