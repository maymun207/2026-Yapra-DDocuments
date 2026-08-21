# CWF — BUG ENVANTERİ · S87 · v5 (tam liste, insan-okur — GRİ SIFIR · 015+016+017 sicilleri işlendi)

<!-- cwf-bug-inventory-S87-v5 · 2026-08-08 · v4'ü geçersiz kılar (S37-1) · Kaynaklar: master `e650f0f` taze klon
     grep'i · bucket zinciri v19→v25 · docs/relay beyanları · sahibin S82 notu
     (V1_Schedule.docx) · bu oturumun canlı DB/log okumaları. Kural: kalem yalnız
     KANITLA kapanır; "muhtemel-kapalı" dürüst bir ara etikettir, kapanış değildir. -->

Durum sözlüğü: **✅ KAPALI** (kanıt işaretçili) · **🔶 AÇIK** (kuyrukta) ·
**🛡 ARMED** (alet gemide, canlı tanık bekliyor) · **⚠ GRİ** (defterden kapanışsız
düşmüş — bu envanterle geri girer) · **🟡 M-KAPALI** (muhtemel kapalı; §K kanıt
işaretçisi eksik, işaretçi bulunana dek gri sayılır).

| # | Kısa tanım (insan diliyle) | Durum | Kanıt / Not |
|---|---|---|---|
| BUG-001 | Backend yaşam döngüsü kaydının tek-yazar disiplini bozuktu | ✅ KAPALI | BACKEND-LIFECYCLE-AFFORDANCE-1 (S81, `b960a1c9`) |
| BUG-002 | Düşmüş governed okuma sessizce taban değere kayıyordu (dürüst-okuma) | ✅ KAPALI | HONEST-READ-2 / 2.11 (S81; sahip notu ✅) |
| BUG-003 | Eski satırlar yeni alan yokluğunu "veri" gibi gösteriyordu | ✅ KAPALI | v21 kapanış dalgası; kod mührü "pre-BUG-003 row… reports absence faithfully" |
| BUG-004 | Panel kolon adları gerçekte olmayan kolonları gösteriyordu | ✅ KAPALI | BUG-004-COLUMN-TRUTH-1; RESEAL rev 187→188 |
| BUG-005 | Langfuse'a giden metinlerde verbatim taşıma sınırı | 🔶 AÇIK | **Sahip hükmü: proje kapanışında** (değişmedi) |
| BUG-006 | Harcama çiti hiç ateşlememişti — ölçülemeyen çit çit değildir | ✅ KAPALI | S86 tanığı; satır `04c636b9…` (04:37:20Z) |
| BUG-007 | Kesinti anında yönlendirme teklif sınırı yanlış davranıyordu | ✅ KAPALI | OUTAGE-TRUTH-1 G4; v21 dalgası |
| BUG-008 | Lens tavanı: degrade olan governed okuma hangi lens altında, görünmüyordu | ✅ KAPALI | LENS-CEILING-1 (S82, `4469a370`) |
| BUG-009 | Başarısız sağlık okuması "kimse tutulmadı" ile aynı görünüyordu | ✅ KAPALI | S86, merge `43d15f38`; `healthReadFailed` üçüncü durumu |
| BUG-010 | Sağlık probu paritesi; ana gövde kapandı, DOWN kolu nöbette | ✅+🛡 | Gövde ✅ v24 (satır `dcc2bbb8`, çift tanık); down-kolu ARMED nöbet (v25 §A) |
| BUG-011 | Save-sonrası sağlık satırı garantisi (≤1 dk deterministik yazım) | ✅ KAPALI | v24 mührü: satır `914b7a03` (PROBE-PARITY'nin adlı okuma sözü S86'da koştu) |
| BUG-012 | Araç adı çakışması span anahtarlarını eziyordu | ✅ KAPALI | S86 canlı mühür ×3 üretim nesli (`collisions=0`) |
| BUG-013 | (Modülün kaldırmak için var olduğu eski davranış) | ✅ KAPALI | Kalıcı kod mührü; v21 dalgası |
| BUG-014 | Credential-yolu hatası — test edecek backend yok | 🔶 AÇIK (aletsiz) | Credential isteyen backend doğana dek yapısal bekleme |
| BUG-015 | INSTRUMENT sınıfı — test aleti hiçbir şey ölçmeden başarı raporluyor ("8/8 SURVIVED" derken sıfır mutant sokulmuştu) | 🔶 AÇIK (canlı sınıf) | Soy: S81 sahip hükmü; bulan AG+Architect, iki günde üç kez · örnekler: (1) tail'le kırpık okuma (2) ESM vi.spyOn atıl casus (3) zsh tırnaksız skaler→8/8 SURVIVED-sıfır-mutant · ek (6)(7) S81: `git checkout --` commit'li plant'ta sessiz exit-0; check:tenant-zero hükmü build'in koşup koşmadığına bağlı (çalışma ağacı) · S82'de iki taze örnek (RESULT-BUDGET 19/19-yeşil-kendi-döngüsü; AG-2 sed-uygulanmadı-yeşil) · **S87 bağları:** bugünkü W-026 = örnek-7'nin AYNI şekli 6 gün sonra yeniden gözlendi (sistemik kalıcılık kanıtı); AG-1'in `tail`-`$?` avı = örnek-1'in şekli, bu kez YAKALANDI · yasası S82-2 yazılı ama KAPISIZ — "kapısı olmayan yasa belgedeki cümledir" · **kapanış kanıtı (INSTRUMENT):** CI kapısı — harness aynı koşuda TERS sonucu üretebildiğini göstermeden sonuç raporlarsa KIRMIZI; D-5 çift yön (kontrollü harness yeşil, kontrolü sökülmüş aynısı kırmızı); üç doğum örneği kapı altında yeniden koşulunca ÜÇÜ DE kızarmalı · **bitiş tanımı (sahip gözü, verbatim):** "Bir test 'geçti' diyorsa, o testin kızarabildiği aynı koşuda kanıtlanmış oluyor — bana söz vermesi yetmiyor" · daha-dikkatli-olmakla düzelmez; aletle kapanır |
| BUG-016 | PROCESS sınıfı — öznesi ARCHITECT: canlı sistem hakkında okumasız iddia (belgeden/zihinden yazılan cümle, hiçbir kapının denetlemediği düzyazıda) | 🔶 AÇIK (canlı sınıf) | Soy: S81 sahip hükmü, doğumda 13 iddia tek oturumda (bulan: sahip, anında düzelterek) · 14. örnek: kapanış artefaktının "bugün hiçbir şey değişmiyor" iddiası 22 dk sonra geçersiz · S82 örnekleri register v86 öncül defterinde (Architect kendi yazdı) · defter bugün 23 (bucket v25) · **S87 örneği bu oturumda doğdu ve buraya yazılıyor:** envanter v1 gri alarmı — isim-varlığı grep'iyle, kapanış cümlesi OKUNMADAN "defterden düşmüş" iddiası (033 "§K'da adı yok" dahil); sahip belgesi tetikledi, v2'de düzeltildi · **kapanış kanıtı (sahip hükmü):** relay artefaktları üzerinde MEKANİK kontrol — faz promptu/GO bloğunda üretim davranışı iddiası ne mesaj-içi komut çıktısı ne açık "okunmadı" işareti taşıyorsa KIRMIZI; yanlışlayıcı bölümü olmayan faz promptu KIRMIZI; D-5 çift yön; **10 ardışık relay elle muafiyetsiz geçer** · **bitiş tanımı (sahip gözü, verbatim):** "Architect bana bir şey söylediğinde, o cümlenin arkasında ya bir okuma var ya da 'okumadım' yazıyor — üçüncü ihtimali sistem kabul etmiyor" · gayretle değil ALETLE kapanır; kendini-kırbaçlama talebi DEĞİL |
| BUG-017 | Frame, yabancı-backend varlığını en yakın ARMES nesnesine ZORLA oturtup yüksek güven raporluyor (`[Frame] object=LINE entity_ref=[G-03 grove] conf=HIGH basis=keyword`) | 🔶 AÇIK (potansiyel) | Soy: W-011 → S81 sahip terfisi · gözlem `trace=9a4f8af8` (G6, 2026-08-05) · hiç işlenmedi · **hüküm-1:** `router.frameRouting` karanlık olduğu sürece potansiyel — bugün de karanlık (canlı DB S87: en yeni published=0, 2026-07-25) · **hüküm-2 / kanıt yolu (ii):** kapanış kanıtı ÜRETİMDE alınamaz, LENS zorlar (BUG-008 P3 tuzağının dersi) · **emeklilik şartı:** frame "bu varlık için nesnem yok" diyebildiğinde — sahibi PACK-FROM-PROTOCOL-1 (2E.3+A23), tek başına extractor değil |
| BUG-018 | Grafik y-ekseni birim/format dürüstlüğü | ✅ KAPALI | AXIS-TRUTH-1 |
| BUG-019 | Kesinti anında eldekini koru davranışı | ✅ KAPALI | OUTAGE-TRUTH-1 G1 |
| BUG-020 | Patlama freni yoktu (eşzamanlılık/token/çağrı tavanları) | ✅ KAPALI | GATEWAY-BURST-GUARD-1 + FIX-1 (S82); canlı `trace=15f24d24`; semafor artığı sahip hükmüyle |
| BUG-021 | Araç güveni beyana değil gözleme dayanmalıydı (onarım dahil) | ✅ KAPALI | TOOL-EARNED-TRUST-1 / 2F.0b (`a24271d4`) |
| BUG-022 | Yazar-anı tip kapısı eksikti | ✅ KAPALI | TYPEGATE-TRUTH-1 |
| BUG-023 | "Hayalet görsel" notu DOM'a ulaşmıyordu | ✅ KAPALI | PROSE-RENDER-PARITY-1; DOM testi mühür |
| BUG-024 | Başlık, KAYNAĞIN birimini söylemiyordu | ✅ KAPALI | UNIT-TRUTH-1 |
| BUG-025 | Sağlık analitiği önceki listeyi okumadan yazıyordu | ✅ KAPALI | HEALTH-TRUTH-1 G3 |
| BUG-026 | Sağlık analitiği backend-sebep ayrımı | ✅ KAPALI | HEALTH-TRUTH-1 G1 |
| BUG-027 | Reddiye karşı-altyazısı DOM'a ulaşmıyordu | ✅ KAPALI | PROSE-RENDER-PARITY-1; DOM testi mühür |
| BUG-028 | Sayaç turdan az çağrı sayıyordu — kimlik denklemi yoktu | ✅ KAPALI | S86: `queryCount = Σkanıt + failures` (bayt-doğrulı) |
| BUG-029 | Sistem cümleleri kaynağını söylemiyordu | 🛡 ARMED | SIGNAL-SOURCE-1 G2 gemide; ilk doğal tetik tanığı bekleniyor |
| BUG-030 | Gateway sonucu viz katmanına görünmezdi (üç kopuk halka) | ✅ KAPALI | v21 (S82, canlı kanıt); CHART-LANDING G3 "THE BUG-030 SHAPE fires" kalıcı regresyon pini |
| BUG-031 | İki-grafik tuzağı (aday seçiminde çift çizim) | ✅ KAPALI | v22 mührü: CHART-CANDIDATE-1 merged `ce2e244` + P1 `d94bcfc3` |
| BUG-032 | Konuşma-zehirlenmesi: başarısız tur bir daha sunulmasın | 🛡 ARMED | SUCCESS-ONLY G2/G3 gemide; bugünkü okuma: `failed` **0/168** → ilk gerçek başarısız tur hâlâ görülmedi |
| BUG-033 | GitHub Actions merge push'una koşu doğurmadı (teslim arızası) | ✅ KAPALI | v23 §BUG.1: "dış arıza; run 31152100128" — §K zinciri SAĞLAMDI |
| BUG-034 | Kural-kaynaklı çizim tutarsızlığı + yanlış yokluk iddiası | ✅ KAPALI | v23 §BUG.1: "N=3 v2 3/3" (S84) |
| BUG-035 | Cevap "grafiği çizdim" dedi, ekranda yoktu (landing kapıları) | ✅ KAPALI | CHART-LANDING-MECH-1 "Opens + closes: BUG-035"; kapılar bugün 2F.1 tanığında da temiz koştu |
| BUG-036 | Preview anahtarı 42 gündür ölüydü — mevcudiyet ≠ geçerlilik | ✅ KAPALI | S86; gövde `"spend-unmeasured"`; W1 sahip onarımı |

**Sayım (v2 — nihai):** 36 kalemden — **✅ 28 kapalı** (010'un ana gövdesi dahil) · **🔶 5 açık** (005 proje-kapanışı · 014 aletsiz · 015 · 016 · 017; #6 paketine CANARY-POWER-1 refakat eder) · **🛡 3 ARMED nöbet** (010-down-kolu · 029 · 032) · **GRİ: SIFIR** — v1'in dört gri kalemi zincir kapanış-bölümü okumasıyla aklandı; GOLDEN LEDGER kayıpsız çıktı.

**v1→v2 düzeltme kaydı (dürüst):** v1'in gri alarmı Architect'in denetim yöntemindendi — isim-varlığı grep'i kapanış-bölümü okuması değildir. Sahibin S82 transkripti ("020·021·030 canlı kanıtla tam") derin okumayı tetikledi; 011=`914b7a03` · 030=v21 · 031=`ce2e244`+`d94bcfc3` · 033=run 31152100128 · 034=N-3-v2-3/3 mühürleri zincirde zaten duruyordu. **v91 aday ders satırı:** "Envanter denetimi kapanış CÜMLESİNİ okur; isim-varlığı grep'i denetim değildir."

**BUG-dışı adlı kusur, tamlık için:** F-S86-2 — taşıma yarısı ✅ bugün kapandı (2F.1 tanığı `af53fbc` + `procedure=1`/`routine=1`); hata-papağanlığı yarısı 🔶 açık, önleyicisi 2F.4 PLANNER-0.

**#6 ALETLER FAZI tasarım girdileri (016+017 sicillerinden, bağlayıcı):**
- **017:** teslimat TAKSONOMİ/ÖLÇÜM tarafıdır; kanıt adımı LENS altında koşar (hüküm-2), üretim turu beklenmez; tam emeklilik 2E.3'e ADIYLA bağlanır — #6 bunu kapatmaz, ölçülebilir kılar.
- **016:** teslimat yukarıdaki MEKANİK relay-denetçisidir (iddia→okuma-veya-"okunmadı", yanlışlayıcı-bölüm zorunluluğu); D-5 çift-yön kanıt fazın içinde; kapanış saati faz merge'i DEĞİL, **10 ardışık muafiyetsiz relay** — yani faz aleti gemiye koyar, kapanış sayaçla gelir (ARMED-benzeri kuyruk davranışı).
- **015:** teslimat harness-dürüstlük CI kapısıdır (S82-2'yi DAYATAN mekanizma): sonuç raporlayan her harness aynı koşuda kızarabildiğini kanıtlar; D-5 çift yön fazın içinde; kabul, üç doğum örneğinin kapı altında KIZARMASINI içerir. **W-026 bu fazın doğal parçasıdır** (örnek-7'nin şekli — tenant-zero'nun çalışma-ağacı bağımlılığı); ayrı kalem olarak süründürülmez, 015 teslimatına adıyla katlanır.
- **Üçlünün ortak resmi (sicilden):** 015+016 aynı sınıf — "yazılı ama dayatılmamış yasa" (biri harness'ları, öteki relay artefaktlarını mekanik kapıyla denetler); 017 ölçümü #6'da, emekliliği 2E.3'te.

**Bu envanterin v91 mint'ine etkisi:** geri-alma YOK (gerek kalmadı) · bu dosya referans artefaktı olarak girer · ders satırı yukarıda · sahibin S82 notundaki hüküm izleri (020 semafor-hükmü, 005 proje-kapanışı, 023-027 faz eşlemesi) kanıt sütununa işlendi.

<!-- END · cwf-bug-inventory-S87-v2 -->
