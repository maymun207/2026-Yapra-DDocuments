# CWF — TASARIM NOTU: TOOL-BEHAVIOR-CENSUS-1 · v1 — SAHİP ALGORİTMASI (değişmez çekirdek)

<!-- cwf-design-TOOL-BEHAVIOR-CENSUS-1-v1 · 2026-08-08 · S87 kapanışı.
     STATÜ: SAHİP-HÜKMÜ (S87, sözlü, bu oturum + ~2 gün önceki oturumda ilk kez).
     Bu not, sahibin "bir daha hatırlatmayacağım" dediği algoritmanın TAM kaydıdır.
     Architect'in S87'deki eksik hatırlaması (yalnız bağlanma-anı sondası önerip
     cron/deneyim döngüsünü düşürmesi) BUG-016 defterine örnek olarak işlendi.
     Her gelecek faz promptu bu notu adıyla referans alır; nottan sapma =
     sahip-hükmü ihlali. -->

## §0 · TEK CÜMLELİK ÖZ (sahibin diliyle)
"Embesil modeli kendi zekâmızla kompanze edeceğiz": zayıf model neyi
beceremiyorsa, sistem onu KEŞİFLE öğrenir, KAYITLA taşır, CRON'la tazeler —
kullanıcı hiçbir zaman elle kural girmez.

## §R · SAHİP-HÜKMÜ GEREKSİNİMLER (R-numaralı, eksiksiz)

**R1 — Bağlanma-anı davranış sayımı (connect-time census).** Bir backend
bağlandığında sistem: (a) her aracın TANIMINA bakar (şema aynası — bugün var:
catalogSync), (b) **her aracı TEK TEK DENER** (davranış sondası — bugün YOK)
ve (c) araç başına bir **doğrulama kaydı** üretir. Sondalar yalnız okuma
araçlarında (ADR-011: 44 yazma-işaretli araç yapısal dışarıda) ve bütçe
çitiyle koşar. Sonda aileleri şema-türevlidir: zorunlu-parametresiz →
sıfır-arg · zorunlu dizi → **boş-dizi denemesi** (S87 canlı dersi:
getEmployeeShiftBetween'de boş dizi = "hepsi"; beyan "required" derken
davranış aksini gösterdi — ADR-010 sahada) · zorunlu kimlik → varlık
aynasından bilinen örnekle (entityDiscoverySync'in fan-out deseni araçlara
uyarlanır). Kayda giren: gözlenen çağrı şekli, cevap ALAN ADLARI, örnek
şekil, boş/hata davranışı.

**R2 — Çalışma-zamanı deneyim defteri (positive-experience ledger).** Üretim
turlarında her aracın ZAYIF MODELCE başarıyla kullanımı araç başına işlenir
(2F.0b TOOL-EARNED-TRUST altyapısı bunun yarısıdır; census kaydına
"pozitif deneyim var/yok" boyutu eklenir). Pozitif deneyimi OLMAYAN araç,
olanla aynı statüde tutulmaz — ayırt edilebilir kalır.

**R3 — CRON'lu periyodik yeniden-keşif + FRESH işareti.** Keşif bir kereye
mahsus değildir: periyodik cron (mevcut 30-dk backend-health cron kardeşi ya
da binicisi) census'u yeniden koşar. Kural: **pozitif deneyimi olmayan her
araç "fresh" işaretlenir ve YENİDEN sondalanır** — çünkü ilk sondanın
başarısızlığı kalıcı hüküm değildir.

**R4 — Backend evrimi yakalanır.** Sağlayıcı YENİ API ekleyebilir ya da
BOZUK API'sini düzeltmiş olabilir (custom tool dahil). Cron, ayna ile canlı
tanım setini diff'ler: yeni araç → tam sonda; değişen şema → yeniden sonda;
daha önce başarısız sondalanan araç → R3 gereği zaten fresh döngüsünde.
Düzelen API kendiliğinden "çalışır" statüsüne yükselir — kimse elle
dokunmaz.

**R5 — Çıktı OTOMATİK tüketilir; elle kural SIFIR.** Census kaydı, mevcut
ToolDoc kompozisyon kanalından (`[ToolDoc] composed=N mode=append` — dikiş
bugün canlıda çalışıyor) HER modele akar. Yarın yeni backend bağlandığında
kullanıcının yapacağı tek şey bağlamaktır; hint/kural/kategori kelimesi
girmek bu tasarımın İHLALİDİR. (S87'nin elle-hint günleri: 2F yığını
öncesi yara bandıydı; PLANNER-0 kabulünde hint-emeklilik kanıtı zaten
plan v2_4'te adlı.)

## §MAP · MEVCUT ORGANLARA BAĞ (yeniden icat yasak)
catalogSync = R1(a) hazır · entityDiscoverySync = R1(b)'nin deseni (fan-out,
declared-vs-observed override, cadence sınıfları) · TOOL-EARNED-TRUST 2F.0b =
R2'nin gözlem altyapısı · backend-health cron = R3'ün taşıyıcı adayı ·
ToolDoc compose = R5'in kanalı · ADR-010 iki-vitesli güven = kayıt modeli ·
ADR-009 sıfır-tenant-literal = census kodu hiçbir backend/araç adı içermez.

## §HOME · KUYRUK YERİ
Blok 2E ("kendini anlatan backend") ailesi; kesin sıra v91/v2_5 mint'inde
sahip hükmüyle. S82-6 gereği "tetik bekleyelim" sınıfı erteleme geçersiz —
kalem adıyla kuyruktadır, SOTA seviyesinde yapılır.

## §S87 DOĞUM KANITLARI
Sonnet turu `8e8de3c8`: boş-dizi keşfi + workingPlace alanları (census'un
ilk doğrulama vakası — faz koşusu bu iki gerçeği ELLE DEĞİL kendi sondasıyla
yeniden üretmeli) · Gemini turları `6adfc7d0`/`c09a75db`/`66a9dcf5`: zayıf
modelin şema-beyanına teslim oluşu = kompanze edilecek davranışın kaydı.

<!-- END · cwf-design-TOOL-BEHAVIOR-CENSUS-1-v1 -->
