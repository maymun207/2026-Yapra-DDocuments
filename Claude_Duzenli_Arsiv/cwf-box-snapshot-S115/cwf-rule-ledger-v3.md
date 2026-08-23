# CWF — NUMARALI KURAL DEFTERİ (RULE LEDGER) · v3
<!-- v2'yi GEÇERSİZ KILAR. v3 FARKI: son üç boşluk (RULE-16/20/31) KAPANDI —
     kanonik ifadeler S28/S34/S37/S41/S90 oturum arşivlerinden hasat edildi.
     Dokuz numaralı kuralın DOKUZU da tanımlı. Açık borç: YOK.
     ⚠ TÜRETİLMİŞ GÖRÜNÜM: kanonik yer kodun kendisidir; çelişkide KOD kazanır. -->

## 0 · DURUM
Repo'da geçen numaralar: **1 · 16 · 20 · 24 · 25 · 26 · 27 · 28 · 31** — dokuzu
da bu defterde tanımlı. Kural korpusu **üç yerde** yaşıyor: kod (kanonik
uygulama) · oturum arşivleri (kanonik tek satırlar) · proje dosyaları (yalnız
adlar). Bu yüzden arama prosedürü bağlayıcıdır: *önce REPO grep'lenir, sonra
oturum arşivi taranır, sonra sahibe sorulur — asla hatırlanarak yazılmaz.*

## 1 · KANONİK TEK SATIRLAR

| Kural | Kanonik ifade |
|---|---|
| **RULE-1** | No hardcoded config |
| **RULE-16** | Okunabilirlik tabanı — 12px altı metin YASAK; kontrast WCAG AA (4.5:1) |
| **RULE-20** | **Yeniden mühürlenen bir hakikat yüzeyi, mühürleme anında YANLIŞ OLDUĞU BİLİNEN iddia taşıyamaz** |
| **RULE-23** | Blueprint stays at roadmap altitude |
| **RULE-24** | Source = text, no NUL |
| **RULE-25** | Doğrulama taze klon + `git rev-parse origin/master` ile başlar — rapora asla güvenilmez |
| **RULE-26** | 1280/1024'te hiçbir şey kırpılmaz — render edilmiş kanıt yoksa iş bitmemiştir |
| **RULE-27** | Gözlemlenebilirlik taban değişmezleri |
| **RULE-28** | Tek turn id — asla paralel bir tur kimliği basılmaz |
| **RULE-31** | Deklare edilen `tool_graph_node` **canlı** olmalı (kategori kapsamı üzerine değil) |

## 2 · UYGULAMA NOTLARI (canlı repo + arşiv)

**RULE-16 · okunabilirlik.** Kapsam **YALNIZ `src/components/admin/**`** —
karanlık sohbet kabuğu (LoginPage, ChatShell) kural DIŞIDIR; bir audit bunu
karıştırıp yanlış ihlal saymıştı. Otomatik kapı `adminLegibility` yalnız
literal `text-[10px]`/`text-[11px]`'i banlar; **rem tabanlı sub-12px** kapının
göremediği açıktır (ruh > lafız). **Tarihi ders — "audit-or-alarm":** RULE-16
uzun süre *"grep-enforced"* diye YAZILIYORDU ama gerçek CI kapısı YOKTU; bu
boşlukta **61 ihlal birikti.** Kural: **iddia edilen dayatma, WIRED kapı
olmadan dayatma değildir.**

**RULE-20 · mühür dürüstlüğü.** Tam ifade: *"a resealed truth surface may not
carry claims known false at reseal time."* Yani reseal bir imzadır — bilinen
yanlışı imzalamak yasaktır. Uygulama ritüeli (**S34-1**): mapped `.ts`
dosyasına dokunan her DOC-FLIP, ayrı ve **tam ifşalı** bir commit'te diyagram
notu + `npm run reseal` + `docVersion` bump taşır. Bugünkü drift kapısının yasal
dayanağı budur. S101'de AG-2'nin "diyagramı mühürlemek yerine yeniden çizdim,
çünkü üç iddiası artık yanlıştı" kararı bu kuralın doğru uygulanmasıydı.

**RULE-23 · irtifa.** Vizyon/blueprint notları roadmap irtifasında kalır: şema
taahhüdü YOK, faz promptu doğrudan buradan TÜREMEZ. Canlı örnek
`TENANT-CONSOLE-VISION-v1` kendini bu kurala tabi ilan eder. **Dalga 8
bağlantısı:** IR-4 sözleşmesinin *"FUTURE-STATE · build order değildir"*
beyanı bu kuralın aynısıdır — QDRANT kartında adıyla anılmalı.

**RULE-24 · bayt hijyeni.** NUL yasak; ayırıcı-arama yerine yapı parse edilir.
Testin gerekçesi: *"bir NUL, dosyanın binary okunmasına ve her grep'in sessizce
hiçbir şey döndürmesine yol açtı"* → **sessiz boş sonuç yokluk değildir**
(A-REC-S102-2'nin aylar önceki hâli).

**RULE-25 · faz ÇIKIŞ kapısı** (giriş kapısı ayrıdır); beklenmedik durumda
"uyarlama değil DUR ve RAPOR ET". `git stash` temiz checkout değildir (S61-1).

**RULE-26 · kırpma.** Kanonik yer `.github/workflows/build-test.yml` işi
`rule26` (`npm run test:rule26`): `documentElement.scrollWidth <= innerWidth`,
1280 VE 1024, gerçek Chromium. Harcama yapmadığı için push+PR ikisinde de
koşar. Eskiden **manuel ekran görüntüsü** adımıydı → `RULE26-PROVER-1` ile
otomatikleşti: PLATINUM kuralının uygulanmış örneği. ⚠ `latest-turn-trace.ts`
"RULE 26 posture" der (içerik/araç sonucu/PII yok) — gizlilik yüzü mü, ad
çakışması mı: S102'de netleştirilecek.

**RULE-27 · gözlemlenebilirlik tabanı.** Yedi admin uç dosyasında: salt-okuma
admin uçları saf DB okuma/yazmadır — **OTel span YOK, audit satırı YOK**; turn
hattının izi kirletilmez. `golden-runner` tersini de yazar: span üreten yolda
**yanıttan ÖNCE flush** (serverless kabı donar).

**RULE-28 · tek kimlik.** `stagesRegistry.ts`'te ekrana basılan yasa: log
satırı, iz ağacı ve olay kaydı AYNI kimlikten türer; ikinci kimlik basmak
yasaktır. `messages.trace_id` = turn'ün OTel trace id'si; feedback join
anahtarı da odur (M1F1). İstisna: `session_id` null satırı.

**RULE-31 · erişilebilirlik.** Yayın anındaki **tek erişilebilirlik kontrolü
İKİ YÖNÜ birden kapsar** (graph düğümü yayınlarken yayınlanmış kategorilere
karşı, kategori yayınlarken düğümlere karşı) — çünkü tam aday kümesine karşı
değerlendirir. Aynası gerekmez: kural **saf aday-içidir** (düğümler vs kategori
araç listeleri vs `ALWAYS_INCLUDE`). Kapıya taşındı. **#25 Graph-KB çağında
doğrudan devreye girer.**

## 3 · AÇIK BORÇ
**YOK** (dokuz kuralın dokuzu tanımlı). Tek küçük soru: RULE-26'nın "posture"
yüzü aynı kural mı, S102'de netleşir.

## 4 · TAŞIMA DERSİ
Oturum arşivleri yeni projeye TAŞINMAZ (hacim) ama **ASLA SİLİNMEZ**: bu
defterin dört kanonik satırı (RULE-16, 20, 23, 31) yalnız orada yaşıyordu.
Arşiv, kod ve proje dosyalarının kapatamadığı boşluğun tek kaynağıdır.

<!-- END · cwf-rule-ledger-v3 -->
