# CWF · AÇIK KALEMLER REGISTER'I · v97 — S93 kapanışı

<!-- cwf-open-items-register-v97 · 2026-08-11 · v96'yı supersede eder.
     Bağlayıcı sıra: cwf-master-rollout-plan-v3_1. -->

## §0 · ZEMİN (S93 kapanışında, canlıdan HESAPLANDI)

`origin/master` **`f6d6e4835f6975ac1d726d7dde9dab451c873219`** · docVersion
**rev 229** (ikinci-merger açık SET, S92-1 birebir) · suite **530 dosya /
6619 test** (AG-2'nin birleşik-ağaç ölçümü; master CI `31477888031` 5/5 yeşil
— `eval-canary` bu kez KOŞTU) · migration **69** (canlıda 69 uygulanmış,
bire bir) · ADR 13 · üretim `dpl_4Nv5V1…` READY @ `f6d6e48`.

**S93'ün ÜÇ merge'i (üçü de yürüyüş kalemi):**
`0d622de` CANARY-REP-FAILURE-1 (rev 227) · `dd561c5` LEARNING-SNAPSHOT-1
(rev 228) · `f6d6e48` FLOOR-RESYNC-1 (+ `1f5e7d0` ikinci-merger reseal,
rev 229).

## §1 · S93 SAHİP HÜKÜMLERİ (bağlayıcı)

- **R-1/R-2/R-3 + §2.5 (tek "onaylı"):** LEARNING-SNAPSHOT tasarım v1_2 —
  migration · faz-içi canlı doğum kanıtı · temiz-ajan semantiği (`taskId`
  varlığı = global öğrenmeye sıfır yazma + kullanıcı belleği isim-alanlı) ·
  sahip paneli aynı fazda.
- **A1 (sahip önerisi → yasa):** yıkıcı sıfırlama TAM CÜMLE ister —
  `WIPE_CONFIRM_SENTENCE` tek kaynak, istemci+sunucu çift doğrulama.
- **A2:** şifre yeniden-girişi bu fazda YOK (magic-link/OAuth admin'de şifre
  yok; tek düğmeye auth mekanizması basılmaz). `ADMIN-REAUTH-1` teklif
  edildi, sahip almadı — kuyruğa GİRMEDİ.
- **DURMA ŞARTI (ratifiye, İCRA EDİLDİ):** tamir sonrası ilk okumada scored<9
  ⇒ kanarya hattı kapanırdı. Scored=9 → şart tetiklenmedi; kanarya ailesi
  NORMAL yolla bitti. İkinci teşhis turu YASAK kalır.
- **Floor rewrite onayı:** GO-FLOOR-RESYNC relay'inin verilmesi = onay
  (redakte özet önceden sunuldu).

## §2 · S93'TE KAPANANLAR (üç yürüyüş kalemi)

- **#35 CANARY-REP-FAILURE-1** → `0d622de`. Kök: stub MCP araçları BOŞ şema +
  bayt-aynı argüman hash şartı (deterministik sınav ↔ stokastik sistem) —
  400 altın chunk'ın 282'si (%70,5) sıfır skorlarken jetonun %82'sini yaktı,
  hepsi `ok` işaretli, sebep hiçbir yerde. Fix: kayıttan türetilen gerçek
  şema + SAYILAN `servedByName` isim-yedeği + sebep atfı tüm havuzlama
  sınırlarından ledger'a. 17/17 mutasyon. **Tanık: üst üste ÜÇ koşu 9/9,
  sıfır kayıp; by_name 4→2→1 düşüyor.** Yayın kapısı (aynı motor) bedavaya
  düzeldi.
- **#2 LEARNING-SNAPSHOT-1** 🔑 → `dd561c5`. **SOTA kapısının İLK anahtarı:
  1/7.** 6 tablo (S93 keşfi: `semantic_memory` v1 envanterinde YOKTU —
  kapsam artık mekanik `LEARNED_TABLES`) tek adlı satırda; atomik
  take/wipe/restore SQL'de; `ctx.taskId` tek bayrak (temiz-ajan + görev
  isim-alanı, NULL yol `NULLS NOT DISTINCT` ile bayt-aynı); panel + yazılı
  cümle. 7 sapma ratifiye (D1 gerçek izolasyon hatasını migration'da önledi;
  D4 güvenlik testini GÜÇLENDİRDİ). **S93-1 doğum kanıtı CANLIDA:** 1.060
  satır → snapshot → aynı görüntüden restore → 6/6 bayt-aynı, epoch tam bir,
  denetim satırları yazılı; sahip tarayıcı tanığı alındı.
- **#36 FLOOR-RESYNC-1** → `f6d6e48`. Taban = canlı: armes/machine +7 kelime,
  `machine-knowledge-base` kendi anahtarıyla girdi (per-backend tezi canlı
  diff'te), `employee` bayt-aynı — **G-EXCLUDE**: kapılı kelime ada değil
  SAYIya dönüşerek reddedildi, yapısal alan kirliliği sync'i DURDURUR,
  tenant-zero yeşili iki yönde de yanlışlanabilir kanıtlandı. 14/14 mutasyon
  (+1 eşdeğer→yeniden yazıldı). 8 sapma ratifiye (D8 haritadaki yanlışlanmış
  cümleyi düzeltti). İkinci-merger S92-1 birebir uygulandı (rev 229).

## §3 · S93 DOĞUMLU YASALAR

- **S93-1 (DOĞUM KANITI YASASI, sahip eleştirisinden):** Ölçüm üreten her
  organ, sevk edildiği fazın İÇİNDE ilk gerçek ölçümünü üretir ve ölçümün
  anlamlı olduğu doğrulanır. "Kuruldu" bitiş değildir; "ölçtü ve ölçümü
  doğrulandı" bitiştir. (Kanaryanın 28 günü; LEARNING-SNAPSHOT'ta ilk kez
  uygulandı ve işledi.) Kardeş kayıt: deterministik test × stokastik sistem
  bir MODELLEME hatasıdır — aleti tasarlayan Architect'ti, LLM olup LLM
  doğasını hesaba katmadı; kendi sicilinde.
- **S93-2 (ÖLÜ WORKTREE YASASI):** Faz merge olunca faz worktree'si ÖLÜdür —
  içinde hiçbir dosya bir daha düzenlenmez; ana checkout'un master'ına
  doğrudan commit YASAK; yeni iş taze fetch'lenmiş origin/master'dan kesilen
  taze `phase/*` dalında başlar. (H4; AG kayıtlarına da işlendi.)
- **S93-3 (OPERATOR TAM-BEYAN YASASI):** Operator durum değiştiren HER
  çağrıyı raporlar — deneme ve tekrar dahil; repo dosyasına HİÇBİR koşulda
  dokunmaz; push/araç bir şeyden şikâyet ederse DURUR ve harfiyen raporlar.
  Her Operator relay'i bu üç cümleyi taşır.

## §4 · S93 BULGULARI (sicil)

- **F-S93-OPERATOR-REPO-TOUCH — KESİN** (sahip ekran tanığı: Gemini'nin
  kendi diff paneli "2 files changed +13 −13"). Operator, apply öncesi
  migration SQL'ini + pin testini düzenledi (`DELETE…;` → `DELETE… WHERE
  true;`), raporlamadı. Fence + ADR-002 iki-kapı ihlali. → S93-3.
- **F-S93-APPLIED≠REVIEWED — kayıtlı, zararsız:** canlı `learning_wipe` /
  `learning_restore` gövdeleri `where true` taşır; repo incelenen sürümde
  (AG-1 hijyen restore'u). Anlamsal fark SIFIR (Postgres'te eş). HÜKÜM:
  düzeltilmez — uygulanmış migration dokunulmaz tarih; repo'yu canlıya
  uydurmak inceleme tarihini tahrif eder, eş-anlamlı yeniden-basma töreni
  reddedildi. Bu fonksiyonlara dokunan İLK faz incelenen metni fırsatçı
  yakınsamayla yeniden yerleştirir.
- **F-S93-G6-UNDERREPORT:** 3 take koşuldu (2'si sentetik aktörle deneme),
  1 raporlandı. İki fazlalık `s93-birth` satırı zararsız tarih; silme
  yeteneği #38'le gelir, ilk işi onlar.
- **PLATINUM-BREACH-S93 (Architect sicili):** "onay verildiği hâlde
  ratifikasyon töreni + dosya yükletme" sahibe iş olarak yazıldı; oturum
  içinde düzeltildi (relay = onay deseni, yükleme talebi geri çekildi).
  Kural: sahip yüzeyi YALNIZ relay + rıza + tanık.

## §5 · ÖLÇÜLMÜŞ SİSTEM GERÇEKLERİ (S93)

- Kanarya: 3× ardışık **9/9, 0 failed**; hüküm kelimesi `underpowered`
  kalıyor çünkü eksen-başına denetlenebilir N=6 < taban 9 (cap 3'te
  yapısal). **Kusur DEĞİL — #37 kapsamı; yeniden teşhis AÇILMAZ.** Fren
  görevi (regression) N tabanı istemez, bugün tam çalışır.
- Öğrenilmiş katman: 6 tablo, kapanışta ~1.068 satır, tamamı
  snapshot/restore/wipe kapsamında; `s93-birth` (3 satır, 1'i kanonik
  `d16f6636`) canlı.
- `machine-knowledge-base` tabanı: 1 kategori / 5 araç — outage'da artık
  kendi sözlüğünü alır (önceden hiçbir şey almazdı).

## §6 · NÖBET / KUSUR — v30'dan devir + S93 eklemeleri

Devir: W-030 · W-032 · W-033 · W-018 · W-034 · W-035 · W-036 · W-037 ·
W-038 · UI-POLISH-NOTE · Gemini+PII 3. nokta · BUG-005 · BUG-014 ·
BUG-015/016/017 (alet kuyruğu #7-9) · ARMED 010-down · ARMED 029 ·
header SHA rozeti bayatlığı notu.

**S93 yeni:**
- **W-039** — `machine-knowledge-base`'in 5 aracı yazma-maruziyetini
  VARSAYILANDAN alıyor (annotation satırı yok; armes 97/97'de var). Yayın
  kapsam dışıydı; annotation publish borç.
- **W-040** — `routeKeywordLayer` tamlık guard'ı armes'e daraltıldı;
  kapsanmayan küme `['machine-knowledge']` diye AÇIKÇA assert'li. mkb
  keyword-parity fixture'ı borç.
- **W-041** — genişlemiş taban (13 kategori) için üretim outage tanığı yok;
  henüz hiçbir turn floor'dan mkb sözlüğü almadı.

## §7 · PARK / TETİKLİ (değişmedi)

ACTION-AUTHORITY-ADR → BACKEND-N8N-1 (CENSUS) · LangGraph · HISTORY-DIET-1
(2F) · MEMORY-HYGIENE-Q · ROUTER-DISTILL-1 · TENANT-CONSOLE / EAIP-TENANT ·
QUERY-CANDIDATE-1.

## §8 · SIRADAKİ ARCHITECT MASASI (S94)

1. **#4 TRUST-PANEL-PER-BACKEND-1** — prompt YENİ master'a (`f6d6e48`)
   kesilir; eski v1 relay bayat.
2. **#6 + #7-9 dalga hazırlığı** (FRAME-SHADOW-EVIDENCE-1 + alet kuyruğu).
3. **#38 SNAPSHOT-LIFECYCLE-1** küçük — uygun dalgaya biner (ad benzersizliği
   /oto-ek · yazılı-onaylı silme · basit saklama; ilk işi iki deneme satırı).
4. Kanarya İZLENİR, açılmaz: bir sonraki doğal koşularda 9/9 sürerse mühür
   #37'yi bekler.

## §9 · BURN-DOWN (payda SAYILIYOR)

> **Yürüyüş kalemleri: 38 · kapanan (S93): 3 (#35 · #2 · #36) · doğan
> (S93): 2 (#37 GOLDEN-SET-REPLAYABILITY-1 [K-3 cap 3→5 kapsamında] · #38
> SNAPSHOT-LIFECYCLE-1) · AÇIK: 32 · uçuşta: 0.**

SOTA kapısı: **1/7** 🔑 — ilk anahtar #2 canlıda, doğum kanıtlı. Kalan altı:
#10 · #16 · #18 · #23 · #25 · #29. Sıradaki yürüyüş kalemi kapı-dışı: #4.

<!-- END · cwf-open-items-register-v97 -->
