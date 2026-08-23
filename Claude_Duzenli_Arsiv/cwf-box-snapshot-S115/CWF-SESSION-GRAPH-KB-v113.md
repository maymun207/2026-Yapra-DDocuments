# CWF-SESSION-GRAPH-KB-v113

**v112'yi GEÇERSİZ KILAR.** S113 düğümü eklendi.

---

## §1 · S113 DÜĞÜMÜ

**Zemin** `de238bf1287e8b16aa1f9bc055609f542eeff728` → **tavan** `922ef571a4d8e1c6c9dd751d6c20f6ec144b3eea`
**Dokuz iniş. Sıfır kendi-işini-merge.**

**Konu:** ADF (Agentic Development Factory) — birden fazla otonom kodlama ajanının tek bir ürünü yönetişim altında paralel geliştirdiği fabrikanın Kademe 0 ve Kademe 1'i.

**Neden şimdi:** sahip hükmü S113-H1 — *"bozuk araçla SOTA'ya gidilmez."* SOTA-1 (a)(b)(c) karşılandı: kriter `#29 A23`, kanıtlanabilirlik tarihi ADF kapanışı, çözecek ölçüm iniş protokolünün yedi sınıflık öz-testi.

---

## §2 · S112 → S113 TAŞIYICILARI

| S112'de bırakılan | S113'te ne oldu |
|---|---|
| Kart grameri `PHASE-ARCHITECT-CARD-GRAMMAR-1` indi | **Sahada tuttu.** Üç kez bir şeridin kendi raporunu kırmızıya çevirdi; her seferinde şerit düzeltti, başka şerit indirdi |
| `budgets:ViewBudget` izni yok | Üç turda açıldı; **çit ilk kez assert adımına ulaştı** |
| Bütçe çiti 4/4 başarısız | Assert okundu, **altı assertion, üçü kırmızı** |
| `supersetArmes` streamable-HTTP | ARMES bir tur düştü, bir tur ayağa kalktı — ikisi de ölçüldü |
| `consumed_at` terk edildi | S113 boyunca `created_at` tek zemin; şeritler buna uydu |
| Kanarya 14 inişte 0 skor | **18 inişte 0 skor** |

---

## §3 · S113'ÜN ÜRETTİĞİ KALICI BİLGİ

### Fabrika mekaniği

**Şerit kimliği ölçülemez.** Beş pencere de `maymun207` olarak push ediyor; `git log --format=%an` her dalda aynı okunuyor. Bu S113'te **üç kez iş durdurdu**: Architect'in kartı yanlış yazarıldı, AG-3 emri reddetti, AG-2 içerikten ölçmek zorunda kaldı. Çözüm sahip hükmüyle kapandı: **tek kimlik** (S113-H3), koruma script + hook ile.

**İzin listesi bir niyet, harness bir mekanizma.** `.claude/settings.json` `Write(.claude/**)` ve `Bash(python3:*)` veriyor; harness yine de reddediyor. Ajan kendi izin ve hook dosyalarını yazamıyor. **Sonuç:** izin bölünmesi sahip eliyle yapıldı ve bu, ölçülmüş bir reddin sonucu olduğu için PLATINUM'dan geçti.

**`.claude/` oturum başlangıcında okunur.** İzin ayrımı master'a indi ama koşan pencerelerde etkisiz kaldı; pencereler dosyalar inmeden önce açılmıştı. Yeni ayar için pencere yeniden açılmalı.

**Ustabaşı kendi işini indiremez ve ikinci merger yoktur.** Üretici merge yetkisi kalktığı an bu bir kilit oluyor. `ADF-FOREMAN-SELF-LAND-1`, üç seçenekli açık karar.

### Ölçüm disiplini — şeritlerden

Altı yasa doğdu, hepsi §3'te bug bucket v50'de tam metinle: **pozitif kontrol** · **sertifika ağaca verilir** · **BLOCKED ≠ kırmızı** · **sessizlik ve başarı aynı renktedir** · **türetme ≠ sonradan kontrol** · **bayt ölçülmüş artefakttan gelir**.

Bunların hepsini **şeritler** buldu, Architect değil. S113'te şeritlerin Architect'e yaptığı düzeltme sayısı, Architect'in şeritlere yaptığını yine aştı — S102'den beri değişmeyen örüntü.

### CWF hakkında öğrenilen

**Araç döngüsü kendini tekrarlıyor.** Aynı soru iki tavanda koşuldu (300k ve 600k); `resolve_time_range` **her ikisinde de dört kez** çağrıldı. Deterministik bir çözümleyici; araç sonucu turlar arasında taşınmıyor. Kontrol merceği: tek değişken tavandı, çağrı deseni değişmedi. **Bu, A23'ün soru bütçesi `b` ve L5 miss-ledger kalemlerinin ölçülmüş gerekçesi.**

**Doğru ölçüm, yanlış cümle.** ARMES erişilemezken kanıt satırı *"yetenek var, erişilemiyor"* diyor; kullanıcı metni *"böyle bir aracım yok"* diyor. Sistem üçüncü değeri hesapladı, dışa iki-değerli konuştu.

**Yönetişimli parametreler Control Plane'den yayımlanır.** Kod tanımı bir **taban**; panel bir **yüzey** — üç kapılı gate, sürüm çizelgesi, rollback. `sessionTweakable: false` "panelden değişmez" değil, "oturum içinde geçici oynanamaz" demek.

### Altyapı tarihi — S113'te tamamlandı

`2026-08-10 00:11:19Z` bütçe eylemi `AWS-StopEC2Instance` çalıştırdı, `AUTOMATIC`, insan yok → altı Langfuse servisi + Qdrant + encoder düştü.
`2026-08-16` Qdrant motoru ayağa kaldırılırken terraform apply **kutuyu yeniden inşa etti** (`PHASE-QDRANT-ENGINE-1-FIX-4`). Yeni instance `14:37:41Z`.
`2026-08-17` bütçe çiti indi — **beyanı zaten bayattı**, kimse fark etmedi çünkü çit hiç koşamadı.
`2026-08-22` çit ilk kez baktı ve bunu ilk bakışında yakaladı.

**Ders:** statik bir beyan bir yeniden inşadan sağ çıkamaz. `A3` bir kür değil, bir dedektör — ve yalnız koştuğunda tespit eder.

---

## §4 · S113'TE MASTER'A GİRENLER

```
392fde0f  AG-3 premise ölçümleri            ← AG-2 indirdi
f743dbea  AG-4 rapor şeması (H3)            ← AG-3 indirdi
e670e007  AG-2 kapı kalp atışı + kanarya    ← AG-3 indirdi
8772e950  AG-1 ustabaşı yüzeyleri           ← AG-2 indirdi
567fd4de  AG-3 iniş raporu                  ← AG-2 indirdi
43f1452f  izin ayrımı (H8 istemci)          ← AG-2 indirdi
c0823449  AG-2 iniş raporu                  ← AG-5 ustabaşı  ← ilk ustabaşı inişi
65839004  boot + komut dosyaları            ← AG-5
922ef571  fence-decl raporu                 ← AG-5
```

**Yeni yüzeyler:** `.claude/commands/{wr,ub,free,durum}.md` · `.claude/boot/{producer,foreman,free}.md` · `docs/ground/REPORT-SCHEMA-v1.json` · `scripts/reportSchemaCheck.ts` · `.github/workflows/report-schema.yml` · `.claude/settings.foreman.json`

---

## §5 · S114'E TAŞINAN SORULAR

1. **`npm run land`** — yedi adım, yedi sınıflık öz-test. Bugünkü acının kaynağı burası
2. Paylaşılan klon şeritlerce erişilebilir mi? (`ADF-SHARED-CLONE-SYNC-1`)
3. `.gemini/` yüzeyi ne? Operator boot'u repoya alınabilir mi?
4. `guard-bash` mutlağını kim yazar — harness reddi ölçülmüş, sahip eli gerekebilir
5. Ustabaşının kendi raporunu kim indirir? (üç seçenek)
6. ADF mimari belgesi repoya nasıl girer? (düz metin parçalar)

<!-- END CWF-SESSION-GRAPH-KB-v113 -->
