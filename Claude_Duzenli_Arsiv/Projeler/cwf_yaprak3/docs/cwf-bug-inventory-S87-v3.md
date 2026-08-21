# CWF — BUG ENVANTERİ · S87 · v3 (tam liste, insan-okur — GRİ SIFIR · 017 sicili işlendi)

<!-- cwf-bug-inventory-S87-v3 · 2026-08-08 · v2'yi geçersiz kılar (S37-1) · Kaynaklar: master `e650f0f` taze klon
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
| BUG-015 | Üç alet ölçmeden "başarılı" raporluyor | 🔶 AÇIK | #6 ALETLER FAZI; kodda yalnız test şerhi |
| BUG-016 | 23 farklı öncül hatası tek şekle katlanıyor | 🔶 AÇIK | #6; kodda **sıfır iz** (başlamadı — doğru) |
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

**#6 ALETLER FAZI tasarım girdisi (017 sicilinden, bağlayıcı):** faz promptu yazılırken 017 teslimatı TAKSONOMİ/ÖLÇÜM tarafıdır; kanıt adımı LENS altında koşar (hüküm-2), üretim turu beklenmez; tam emeklilik 2E.3'e ADIYLA bağlanır — #6 bunu kapatmaz, ölçülebilir kılar.

**Bu envanterin v91 mint'ine etkisi:** geri-alma YOK (gerek kalmadı) · bu dosya referans artefaktı olarak girer · ders satırı yukarıda · sahibin S82 notundaki hüküm izleri (020 semafor-hükmü, 005 proje-kapanışı, 023-027 faz eşlemesi) kanıt sütununa işlendi.

<!-- END · cwf-bug-inventory-S87-v2 -->
