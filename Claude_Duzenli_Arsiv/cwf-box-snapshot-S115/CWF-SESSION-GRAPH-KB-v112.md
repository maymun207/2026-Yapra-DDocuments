# CWF — OTURUM GRAFİĞİ KB · v112
<!-- 2026-08-22. v111'i DEVRALIR. Bu belge NE OLDUĞUNU değil, NE ÖĞRENİLDİĞİNİ
     taşır — anlatı `CWF-S112-SESSION-CLOSE-v1`'de.
     BÜTÜN yazıldı (A-REC-S101-7). -->

## §1 · S112'NİN ÜÇ BİLGİ DÜĞÜMÜ

### ⓵ Bir kapı, koruduğu şeye ekilen arızayla kanıtlanır

**Ölçüm:** `parseBundle`, tekil değerli anahtarları yalnız **mükerrerlik** için test ediyordu; `parseLedger` onları **varlık** için test ediyordu. Monolit→bundle dönüşümü *"grameri korudu ve garantilerinden birini düşürdü."* `binds:` silinmiş bir anayasa kaydı **her vakada yeşil geçiyordu.**

**Neden fark edilmedi:** `text:` kazara korunuyordu — eksik metin sıfır bayt ölçer ve erozyon zeminine takılır. Yani **aşağı akışta tüketicisi olan anahtarlar** korunuyordu, gerisi korunmuyordu. Kapı, koruduğunu sandığı şeyin yarısını koruyordu ve **hiçbir yeşil bunu söylemiyordu.**

**Nasıl bulundu:** Architect'in **tören sandığı** bir kabul kriteri. `GUILTY 2` *"boş bir yeşile karşı formalite"* diye yazılmıştı.

**Ve nasıl kanıtlandı:** AG-1 fixture'lara güvenmedi. *"Bir testin kendi fixture'ları üzerindeki assertion'lar yalnız fixture'ları kanıtlar."* **Gerçek korpusa arıza ekti** — tek kullanımlık klonda `GOLDEN-LEDGER.md`'den `binds:`i sildi — ve kapı **dosyayı ve anahtarı adlandırarak** kızardı. Aynı koşu `46/46` yeşil kaldı, yani düzeltme geçerli korpusu kızartmıyor.

> **DURAN YÖNTEM:** bir kapı, benzeyen bir fixture'a değil, **koruduğu şeye** ekilen bir arızayla kanıtlanır. Ve tek yönlü bir yeşil, gramerinin yarısını sessizce dayatmayı bırakmış bir kapıyı onaylar.

### ⓶ Bir izin listesi negatif ifade edemez

**Ölçüm:** `--force-with-lease`, `--force` ile **karakter karakter** başlar.

**Sonuç:** `git push --force`'a yazılmış bir yasak kuralı, **atomik lane claim'ini de** yasaklar — bu projenin güvenli olmasına bağlı olduğu tek push'u. Ve bunun bir önek listesinde **hiçbir yazımı yoktur.**

> **Bir izin listesi NEGATİF İFADE EDEMEZ, çünkü her önek her son eki kabul eder.**

**Mimari sonuç:** hook bir yedeklilik değil, **mutlakları taşıyabilen tek katmandır.** Onu düşürmeyi öneren her gelecek oturum, aslında mutlakları düşürmeyi öneriyor olur.

**Ve hook'un kendi tuzağı:** `exit 1` **bloklamaz** — bloklamayan bir hata sayılır ve komut yine koşar. Alışılmış Unix hata kodu burada tam olarak yanlış olan. Zaman aşımına uğrayan bir hook da bloklamaz.

### ⓷ Tek negatif mercekten yokluk sonucu çıkarmak — aynı gün üç aktörde

| Kim | Ne yaptı | İkinci mercek ne gösterdi |
|---|---|---|
| **AG-2** | Retleri yalnız **kendi taslaklarını yazarken** ölçüp *"harness içeriği izliyor"* dedi | Architect'in yayımladığı baytları **yerleştirebiliyordu** |
| **Architect** | Aynı genişletmeyi **sınamadan** varsayıp işi sahibe yönlendirdi | Sahip reddetti; prob sınırın gerçek şeklini buldu |
| **AG-1** | Branch protection'a **tek uçtan** bakıp *"korumasız"* dedi ve bunu bir merge gövdesine yazdı | Ruleset aktif `master-merge-gate` döndürdü |

**Üçü de dışarıdan değil, ikinci merceği ARAYAN tarafından yakalandı.** `RULE-54`'ün mekanikleştirdiği şey budur ve bir gün içinde üç kez **kendimize karşı** çalıştı.

> **Bir yokluk iddiası, FARKLI kanıt görebilecek merceklere dayanır.** Aynı şeklin iki grep'i, bir merceğin iki kez kullanılmasıdır — ve Architect bunu `A-REC-S112-12`'de biçimsel olarak uygulayıp özünde kaçırdı.

---

## §2 · SINIRIN GERÇEK ŞEKLİ — ölçüldü

Harness'ın otomatik-yüklenen talimat metni üzerindeki reddi:

| Deneme | Sonuç |
|---|---|
| `.claude/settings.json` yazımı | ✅ (dar izinden sonra) |
| `.claude/hooks/*.py` | ✅ |
| `.claude/commands/claim.md` | ✅ |
| `CLAUDE.md`, **şeridin kendi ürettiği** | ⛔ |
| `.claude/loop.md`, **şeridin kendi ürettiği** | ⛔ |
| Rapor, taslakları **taşıyarak** | ⛔ |
| Aynı rapor, **taşımadan** | ✅ |
| `CLAUDE.md`, **Architect'in yayımladığı baytlar** | ✅ md5-aynı |

> **Sınır, KİMİN ÜRETTİĞİNİ izliyor** — hedefi değil, konuyu değil. Gate'lenen şey: **bir ajanın kendi gelecek davranışını kendisinin yazması.**

Ve **insanın açıkça çağırdığı** talimat metni (`claim.md`) ile **kendini yükleyen** metin farklı sınıf.

---

## §3 · KART GRAMERİNİN KENDİ ÜZERİNDEKİ ÖLÇÜMÜ

`card:preflight` sekiz kontrol taşıyor. Architect'in kartları üzerindeki yörünge:

```
S111 kartı      6/8 RED
S112 round 1    4/8 RED
S112 round 6    1/8 RED
```

**Ve AG-4 kendi üç kızarmasını kendi kusuru ilan etti:** `CP-2` teslimat üstverisinden iş-emri çiti istedi, `CP-4` düz bir dizge dayattı, `CP-5` bir anahtar adı dayattı. Üçünde de kart **işi yapmıştı**, kontrol **kelimeyi** reddetti.

> **Amacını değil sözlüğünü savunan bir kontrol, kendisi bir kusurdur.**

Ve AG-4'ün kendi cümlesi, oturumun en taşınabilir dersi:

> **Bir kusuru adlandırmak, sana ona karşı bağışıklık kazandırmaz.**

Kanıtı: AG-4 bu kusuru kendi `CP-2` taslağında mahkûm etti ve **üç kez daha** işledi. Architect ise `CLAUDE.md`'ye sayı yasağını yazıp **sonraki belgede** çiğnedi.

---

## §4 · İKİ TASARIM KARARI, ÖLÇÜLMÜŞ GEREKÇEYLE

**Sinyal tasarımı (AG-4):** fallback, ham config dizgesine göre değil **tercih edilen transport**'a göre yargılanır. `transportOrder` `undefined` için de `streamable-http` için de http-önce döndürür; ham dizgeyle karşılaştırmak, alanı hiç doldurmamış **her** sunucuda yanlış alarm üretirdi.
> **Çoğunluk vakasında havlayan bir sinyal, okuyucusuna kendisini yok saymayı öğretir; sinyalsizlikten kötüdür.**

**Üçüncü değer:** tam başarısızlıkta `fallback: 'n/a'`, `false` değil. `false`, *"fallback olmadı, her şey yolunda"* diye okunurdu — oysa **hiçbir şey bağlanmadı.** `empty ≠ zero`'nun transport katmanındaki hâli.

---

## §5 · ZİNCİR TASARIMI — üç tıkanma, üçü de Architect'in

| # | Tıkanma | Çare |
|---|---|---|
| 1 | Seri merge zinciri, **uyandırıcısı yok** | Devralma yetkisi (round 6) |
| 2 | Devralma, **indiren şeridin yokluğuna** bağlı — ama BEHIND dalı **sahip şerit** günceller | — |
| 3 | Tek iniş şeridi atandı, ama **dal güncelleme zinciri** seri kaldı | **Atanmış iniş şeridi, indireceği dalı da günceller** |

Üçüncünün gerekçesi, kuralın kendi tutarsızlığıydı:
> Bir dalı master'a **indirmeye** yetkili şeride, master'ı **o dala** almayı yasaklamak, büyük eylemi serbest bırakıp küçüğünü reddetmektir.

**Ve dördüncü, mekanik olan:** şeritler tur-tabanlı. Kart, turu bitmiş bir odaya düşer. Çare zamanlanmış yoklama — ve o da yalnız oturum **koşuyorken ve boştayken** ateşlenir.

---

## §6 · SAHİBİN ÜÇ KATKISI — `S112-YASA-1` altında

Yasa aynı gün indi ve **aynı gün üç kez işledi**: zamanlanmış görevler *(Architect defekti adlandırabildi, mekanizmayı adlandıramadı)* · boot'un repo hâline gelmesi *(`CLAUDE.md`)* · kutu-boşalana-kadar yasası *(Architect yanlış teşhis koydu ve savundu; sahip düzeltti)*.

Ve dördüncüsü yasaya girmedi ama kayda değer: *"bunları sen kendi AG ekibine yaptır bana değil"* — o itiraz `A-REC-S112-18`'i doğurdu ve **sınırın gerçek şeklini ölçtürdü.**

<!-- END CWF-SESSION-GRAPH-KB-v112 -->
