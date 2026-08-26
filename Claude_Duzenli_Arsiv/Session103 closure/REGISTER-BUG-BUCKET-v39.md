# REGISTER — BUG BUCKET · v39 (S103 kapanışı)

<!-- REGISTER-BUG-BUCKET-v39 · 2026-08-17. v38'i GEÇERSİZ KILAR.
     Her kalem: MEKANİZMA + KANIT + EV. Kapanış kanıtsız yazılmaz. -->

## ✅ S103'TE KAPANANLAR
| Ad | Nasıl kapandı |
|---|---|
| **F-S97-REGISTRY-PARENT-OVERWRITE** (S97'den beri taşınıyordu) | #25 GRAPH-KB-1. `upsertLayer` ON CONFLICT ile ebeveyni sessizce eziyordu (canlı yüzey: 96 çakışan isim / 212 satır — **S97 sayıları yeniden ölçüldüğünde birebir tekrarlandı**). Kenar defteri artık HAKEM: gözlemlenmiş kenarın çeliştiği ezme **REDDEDİLİR**, iki ebeveyn de adıyla loglanır ve satır **tanıklı** ebeveyni taşıyarak yeniden yazılır — ret, yeni iddiayı veto etmekle kalmaz, gözlemlenmiş gerçeği KORUR |
| **F-S103-CONSTITUTION-TEXT-EROSION-2** | Kutu v5_6: altı anayasal blok `docs/laws@1f660ea`'dan bayt-verbatim restore (~292 karakter, üçü taşıyıcı cümle). BÜTÜN yazıldı, yamalanmadı (A-REC-S101-7) |
| **F-S103-STALE-CONSTITUTION-COPY-IN-PROJECT** | Kutudaki kopya repo ile bayt-aynı (md5 `86c4e58354f202d87cd3a825ac84ef28`); §0'a ayna-md5 preflight ritüeli girdi, ilk koşusu YEŞİL |
| **F-S103-GRAPHKB-NUL-IN-SOURCE** | İki `.ts` dosyasında literal NUL → `\u0000` kaçışı (çalışma zamanı bayt-aynı) + `checkRule24` teli CI'a. **Tel aynı gün master'da 4 ESKİ taşıyıcı / 9-10 NUL daha yakaladı.** Mekanizma dersi: **git'in binary sezgisi yalnız ilk ~8000 baytı okur** — derin NUL'lar düz metin gibi diff'leniyordu, yani aracın kendi sinyali onları HİÇ göremezdi; tenant-zero da üç kaynak dosyaya kördü. Kapı bir turda ÜÇ kez yakaladı (biri bizzat şeridi) |
| **F-S103-R4-CHILD-ID-NOT-RESOLVED** | R4-FIX-1. Sahip gözüyle bulundu: çocuk sütunu ham UUID, ebeveyn isim. Ölçüm tasarımı şekillendirdi: 783/783 satırda `display_name` DOLU ama **yalnız 667'si benzersiz** (96 isim iki ebeveyn altında, 212 satır) → **isim özne, id altında soluk**; ikisi de yük taşıyor, çünkü isim TAM DA WOULD-REFUSE satırlarında muğlak |
| **F-S103-R4-CORRIDOR-UI** (sahip şikâyeti, S101 sınıfının tekrarı) | R4-FIX-1 + FIX-2. Kusur TALİMATTAYDI: kart census desenini zorunlu kılmadı. Paneller + arama (TÜM küme üzerinde, sonra 300'de kesme, kesildiğini söyleyerek) + sıralama + dördüncü cümle ("Eşleşme yok — filtre") + esneme (2 satır@900 → 5 satır@1400) |
| **F-S103-R4-BOTTOM-STRIP** (sahip şüphesi, GERÇEK çıktı) | FIX-1'de ölçüldü: içerik 1024'te katlamanın **147px altındaydı** ve sayfa-sığdı metrikleri kördü (`<main>` taşmayı yutuyordu). Yalnız alt-KENAR ölçümü görebilirdi; artık spec'te kapılı. 11rem tam 900/900'e oturuyordu → **REDDEDİLDİ** ("tam sığdırmak için tıraşlamak, nav bütçesini üç şerittir kronikleştiren şeydi") → 10rem |
| **F-S103-R4-BOTTOM-EDGE-GATE-MISMEASURED** (şeridin kendi kapısı) | FIX-2. FIX-1'in yürüyüşü HER torunun rect'ini sayıyordu; sınırlı scrollbox içindeki `<table>` **tam yüksekliğini** raporlar → kapı meşru kaydırma içeriğini sayfa taşması sanıyordu. FIX-1'de yeşil geçmesinin tek sebebi panellerin küçüklüğü: **sayı tesadüfen doğruydu.** Yürüyüş artık scroll-yönetimli öğeleri atlıyor |
| **A2A / batch / seal çakışmaları** | Üç merge turunda da tek final reseal, `manifest.json` skaler çakışması yasanın öngördüğü gibi yakalandı (272 FINAL · 273 · 274); FIX-2'de haritalı alan oynamadığı için **revizyon BASILMADI** (doğru: olmayan doküman değişikliği kaydedilmez) |

## 🔴 AÇIK
| Ad | Mekanizma / kanıt | Ev |
|---|---|---|
| **F-S103-R4-VERDICT-FILTER-LABEL-AS-VALUE** (ORTA) | Sahip gözüyle bulundu, **kabul SONRASI**. `verdictIfSweptNow` hakemin enum'u: `lands \| refused \| unmeasured`. Ekranda `lands` insanca "agree" yazılıyor (doğru) ama filtre seçeneğinin DEĞERİ de "agree" yapılmış → hiçbir zaman eşleşmiyor; "showing 0 of 783" + no-match cümlesi (yüzey dürüsttü, HESAP yanlıştı). Kök: `VerdictFilter = 'all'\|'agree'\|'refused'\|'unmeasured'` paralel sözlük ilan ettiği için derleyici kabul etti (doğru kalıp iki satır aşağıda: `ProvenanceFilter='all'\|ProvenanceClass`). Süit kördü: filtre yalnız `'refused'`+`'all'` ile test edilmiş. `conflicting: 0/783` AYRI hesaplandığı için hiçbir gerçek çelişki saklanmadı | **R4-FIX-3** (uçuşta, AG-1): tip domain enum'undan türetilir + her seçenek değerini domain tipinden sayan test |
| **F-S103-LANE-POLL-MORTALITY** (ORTA) | Posta modeli ölümsüz yoklama varsayıyor; gerçek şerit oturumu boşta kalınca döngü **SESSİZCE** ölüyor ("bir ara okur" sınıfı). S103'te dört şeritte de görüldü | Ara çözüm: sahibin tek satırlık uyandırma bloğu (sahibin TEK operasyon istisnası). Kalıcı: **RELAY-BUS-2 / E2 heartbeat** |
| **F-S103-STALE-DEV-SERVER-CROSS-CHECKOUT** (ORTA, filo-geneli) | Playwright `reuseExistingServer: !CI`, ÖNCEKİ kartın açık kalmış dev sunucusuna bağlandı (`lsof`: pid'in cwd'si eski klon) → koca bir ölçüm turu **testte olmayan kodu** tarif etti (`flexGrow=0`, `maxH=160px`, kaynakta `flex-1` yazarken). İpucu hata mesajı değil, **kaynak↔computed style çelişkisi** oldu | Nöbet + her şeridin GO'suna girecek ders: *"sınıflar dosyada" ≠ "tarayıcı onları aldı"* |
| **F-S103-VIEW-CHAIN-DENOMINATOR-LOSS** | v10'dan sonra türetilmiş görünümler SAYILAN PAYDAyı bıraktı; v10→v13 dikişinde 8 kalem kanıtsız görünümden çıktı, v104 sıkıştırması PARK+NÖBET bölümlerini düşürdü → 10+ kalem kayboldu; **iki kalem GERÇEKTEN öldü** (numaraları başka işlere verildi) | v16/v17 payda geri getirdi; kurtarma #69/#70/#71/#72/#73; kalıcı çare **L-ADAY-1 + L-ADAY-2 → #74** |
| **F-A23-SIBLING-REF-MISMATCH** (DÜŞÜK) | A23 ana belgesinin END satırı kardeşi `turn-sequence-target-**v1_1**` diye anıyor; dosyanın kendi footer'ı *"amendments mint v1_1"* diyor → **v1_1 hiç mint edilmedi**, v1 son sürüm. İleri-atıf hatası (karşı örnek: component-architecture gerçekten amend edildi, v1_2) | **A23 v1_4 amendmenti** (KARAR-A23-SEQ-1 §3c) |
| **F-S103-CARD-UNIT-MISLABEL** (DÜŞÜK, Architect'in) | Kart üç Türkçe metni 511/564/577 diye "karakter" saydı; inen dosyada `String.length` 469/512/545. Şerit iki birimde de ölçtü: **UTF-8 baytta 511/564/577 — kartla birebir**, transkripsiyon bayt-kesin. İki sahte "düzeltme" de reddedildi (metni şişirmek sahip cümlesini yeniden yazar; yanlış tabanı pinlemek sonraki yazarı yasayı UZATMAYA iter) | Birim artık yazarın karşılaşacağı yerde yazılı — KAPALI-AS-DOCUMENTED |
| **F-S103-PIP-LAYER-REBUILD-ON-DEP-ADD** (DÜŞÜK) | Tek satır bağımlılık (waitress) torch dahil bütün pip katmanını amd64 emülasyonunda yeniden derletti | Nöbet: torch kendi erken Dockerfile katmanına pinlenir; CI etkilenmez, yalnız yerel yineleme maliyeti |
| **F-S103-COMPOSE-PS-TEMPLATE-EATEN** (DÜŞÜK) | Terraform'un `yamlencode`'u compose-apply log şablonunu yedi (`{{.Name}}` literal basıldı) | Şerit kaydetti, onarmadı (kendi kartını bekliyor) |
| ARMES yetki: 13 araç "no access to factory" | Erişim grant'ı, sayım bulgusu DEĞİL; tek dokunuş 13 aracı açar | ARDIC — dış bekleme |
| F-S98-SHIFT-QUERY-UNUSABLE | Vardiya yüzeyi ARMES'te kullanılamıyor | ARDIC — dış bekleme |
| F-S100-SYNTH-FRAME-ERROR (1/9) | `hat` IR_OBJECTS enum'unda yok; retention penceresi dar | Nöbet: taze gün okuması + enum genişletme (S99-6 tadili Architect'ten) |
| F-S100-MIGRATION-STATUS-LIES-WIDER | 13 dosya, 2'si RUNTIME mesajı | Nöbet (Architect'te) |
| F-S101-MKB-TOKEN-ROTATION | Sahip planlı | Gündeme getirilmez |
| corpus-vs-registry | Grid referanslarının 1/3'ü kayıtta yok | Nöbet |

## 🔵 NÖBET (değişmedi)
Kanarya verdikt nöbeti + `underpowered` kilidi (mühür #37) · BUG-016 sayacı ·
transient permission classifier retry (tek örnek) · adsız flake ×2 (S99-9 adli
disiplini; 3. görülmede kalem açılır) · GitHub App token formatı ·
#46 canlı re-probe borcu · ekipman R3 gerçek sondası · **F180/LB-11 araç-çıktısı
enjeksiyonu** (A23 §10; filo-geneli risk) · RULE-38 teli.

## 🟡 SAHİP HİJYENİ
User-voice kuyruğu: 3 incelenmemiş 👎 (48s+ eski, golden dönüşüm 0/3) — üçü de
gerçek grounding/erişim şikâyeti; golden-set adayı.

## 📌 S103 A-REC DEFTERİ (Architect hataları — hepsini şerit ya sahip yakaladı)
1. **Kart birimi** ("karakter" ≠ bayt) → F-S103-CARD-UNIT-MISLABEL.
2. **R4 kartı census desenini zorunlu kılmadı** → koridor UI doğdu; sahip yakaladı.
   Kusur talimatta, şeritte değil. → L-ADAY-3.
3. **FIX-2 kartı "viewport'a esnesin" yazdı; sahip "ben resize edebileyim"
   demişti** → yanlış spesifikasyon; FIX-3 ile düzeltiliyor.
4. **Arşiv belgelerini kutuya yükleme aksiyonu** sahibin kendi hacim yasasıyla
   çelişiyordu (v5_6 §10) → geri alındı, ev repo arşivi (#74).
**Kök (dördünde de aynı aile):** sahip cümlesini ya da ev yasasını KART METNİNE
tam geçirmemek. Sertleşen kural: sahip cümlesi karta **VERBATIM** girer; ev
deseni varsa kart o deseni ADIYLA emreder.

<!-- END · REGISTER-BUG-BUCKET-v39 -->
