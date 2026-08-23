# S114-AG-BOOTS-v1

**S113'ten farkı:** üretici ve ustabaşı boot metinleri artık **repoda**. Bu belge yalnız pencereye yazılacak kelimeyi ve S114'e özgü bağlamı taşır.

---

## §1 · PENCERELERİ AÇMA

| pencere | ne yazılır | ne olur |
|---|---|---|
| dört üretici | `/wr` | `.claude/boot/producer.md` okunur; adres **sunucudan kazanılır**, numara yazılmaz |
| ustabaşı | `/ub` | `.claude/boot/foreman.md` okunur; `lane/AG-5` claim'i zaten tutuluyor |
| keşif | `/free` | `.claude/boot/free.md` okunur; adres almaz, kutu okumaz, repoya **yazmaz** |
| herhangi biri | `/durum` | on alan + claim'ler + açık PR |

**⚠ Ustabaşı penceresi şununla açılmalı:** `--settings .claude/settings.foreman.json`

S113'te bu yapılmadı ve ölçüldü: `printenv ADF_LANE_ROLE` boş döndü, kontrol merceğiyle probun çalıştığı kanıtlandı. **İzin ayrımı master'da gerçek, pencerede etkisizdi.** `.claude/` oturum başlangıcında okunur; yeni ayar yeni pencere ister.

---

## §2 · OPERATOR (Gemini) — hâlâ elle

`.gemini/` yüzeyi **ölçülmedi**. Üç şey bilinmiyor ve hiçbiri varsayılmayacak: otomatik yükleme var mı · slash komut mekanizması var mı · izin/hook katmanı var mı. **S114'ün ikinci işi `/free` ile bunu ölçmek.**

O ölçüme kadar Operator boot'u elle yapıştırılır:

```
Sen bu projenin Operator şeridisin: Gemini + Supabase MCP.

Proje çiti: fjbrkimwvtpwoxhziidh — başka hiçbir projeye dokunmazsın.
Yetkin: supabase db push, şema okuma, canlı doğrulama. Yalnız bunlar.
relay_inbox'ta from_lane yönünde yazabilen tek adres sensin.

Her migrasyon için: uygulanan baytın md5'ini ve uzunluğunu raporla.
Bir apply, kaydedilmiş ve okunmuş planın kendisini uygular; apply anında
yeniden plan çıkarmak iki farklı nesne demektir (S102-YASA-3).

Bir ret ölçümdür. Etrafından dolaşma, metnini kelimesi kelimesine bas.

Kutunu created_at ile oku. consumed_at RETIRED.
```

**S113 notu:** Operator `apply_migration` yerine `supabase db query --file` kullandı; `supabase_migrations` history'de kayıtlı mı — **kontrol edilmedi**, açık kalem.

---

## §3 · S114 ŞERİTLERİNİN BİLMESİ GEREKEN — S113'ten taşınan

**Kimse kendi işini merge etmez.** Ve S113'te ölçüldü: `git author` her şeritte `maymun207` okunuyor. Yazarlığı **içerikten** doğrula — commit konu satırları şeridi adlandırır.

**Üretici merge yetkisi YOK.** `.claude/settings.json` içinde `gh pr merge` sıfır kez geçer. İniş yalnız AG-5'in işidir. `npm run land` indiğinde bu script üzerinden yürüyecek.

**Bir ret ölçümdür.** S113'te harness, `.claude/settings.json` ve `guard-bash.py` yazımını izin listesi izin verdiği halde reddetti. Doğru davranış: metni kelimesi kelimesine bas, dur, raporla. Etrafından dolaşma.

**Pozitif kontrol zorunlu.** Bir yokluk iddiası, aynı probun var olduğu yerde bulabildiği gösterilmeden anlamsızdır. `grep -c` bir dalda 0 döndüyse, aynı probu bilinen bir yerde koş.

**Sertifika ağaca verilir.** Head kaydığında eski CI hükmü ölür; onu şimdiki durum diye aktarmak bir hafızayı ölçüm diye sunmaktır.

**`BLOCKED` kırmızı değildir.** "Zorunlu check tatmin edilmemiş" demektir ve *pending* de bunu tatmin etmez.

**Bir SKIPPED kapı adıyla yazılır.** Yeşile katlanmaz. Ve `total_count` düşerse bir kapı hiç konuşmamış demektir — sessizlik ve başarı, bir şey saymadıkça aynı renktedir.

---

## §4 · S114'ÜN İLK KARTLARI — Architect keser

| kart | adres | konu |
|---|---|---|
| `ADF-KADEME-2-LAND-SCRIPT-v1` | üretici | `npm run land` yedi adım + yedi sınıflık öz-test |
| `ADF-KADEME-2-MEASURE-v1` | `/free` | paylaşılan klon erişimi · `.gemini/` yüzeyi · ARMES canlı durumu |
| `ADF-KADEME-1-CLOSE-LAND-v1` | belirsiz | AG-5'in üç açık dalı — `ADF-FOREMAN-SELF-LAND-1` kararına bağlı |

---

## §5 · ZEMİN

```
master        922ef571a4d8e1c6c9dd751d6c20f6ec144b3eea
tutulan claim lane/AG-5
açık dallar   phase/adf-kademe-1-close
              phase/adf-kademe-1-fence-read
              phase/adf-kademe-1-foreman-first   (üçü de AG-5'in kendi işi)
```

**Her şerit bu sha'yı taze klonda kendi ölçer.** Kaymışsa kaydığını söyler ve ölçülmüş head'i kullanır.

<!-- END S114-AG-BOOTS-v1 -->
