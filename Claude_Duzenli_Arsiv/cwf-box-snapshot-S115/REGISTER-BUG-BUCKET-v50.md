# REGISTER-BUG-BUCKET-v50

**v49'u GEÇERSİZ KILAR.** S113 kapanışında yazıldı.

**A-REC sayacı: 23 → 31.** S113'te sekiz yeni Architect öz-düzeltmesi. Yedisinin kökü aynı sınıf: **bilgi bir yerde vardı, Architect nereye bakacağını bilmedi.**

---

## §1 · S113'TE DOĞAN A-REC'LER

**`A-REC-S113-PAYLOAD-TRANSPORT-1`**
44 KB'lık ADF belgesi base64 olarak karta konuldu ve elle taşındı. İki kez `invalid byte sequence for encoding "UTF8"` ile reddedildi (`0x9c`, `0xd9 0x53`). Veritabanı atomik reddetti, yarım satır kalmadı — mekanizma doğru çalıştı. Repoda `scripts/busDelivery.ts` dururken kullanılmadı.
**Kural:** karta kodlanmış yük binmez. Bayt ya düz metindir ya git üzerinden gider.

**`A-REC-S113-BOOT-HOME-1`**
Ustabaşı boot metni `docs/relay/`ye yerleştirildi ve gramer kapısı kırmızı verdi. Beş `kind`'ın beşi de `R-CLAIMS-MISSING` döndürdü; muafiyet listesi FROZEN. Boot bir **kanıt artefaktı değil**, bir rol tanımı — o korpusa ait değildi. `.claude/`ye taşındı, digest korundu.
**Kural:** bir dosya bir kapıyı dürüstçe sağlayamıyorsa, o kapının yönettiği korpusa ait değildir.

**`A-REC-S113-AUTHORSHIP-1`**
Kartta *"AG-1 committed them"* yazıldı; dalı AG-3 yazmıştı, Architect'in bir saat önceki talimatıyla. AG-3 doğru davrandı: emri reddetti, çelişkiyi çözmedi, raporladı.
**Kök:** `git author` her şeritte `maymun207` okunuyor — **kimin yazdığını söyleyen alan yok.** AG-2 sonradan içerikten (commit konu satırlarından) ölçerek doğruladı.

**`A-REC-S113-GRANT-UNMEASURED-1`**
IAM grant'ı, çitin hangi `budgets` API çağrılarını yaptığı okunmadan yazıldı. İki tur kayıp: `ViewBudget` verildi → `DescribeBudgetActionHistories` reddedildi → `Describe*`.
**Kural:** bir izin, tüketicinin çağrı listesinden yazılır, tahminden değil.

**`A-REC-S113-SOURCE-NAME-1`**
Kart, kaynak artefaktı `ADF-KADEME-1-FENCE-AG5-report.md` diye adlandırdı; AG-5 çit okumasını `ADF-KADEME-1-AG5-report.md` üzerine yazmıştı. AG-1 durdu: *"yakın eşleşme, dosya adı takılmış bir düzyazıdır."*

**`A-REC-S113-CONTROL-PLANE-BLIND-1`** ⚠ **sınıf başı**
`turn.maxTokensPerTurn` "DB'ye yazılan bir şey" diye nitelendi. Kod tanımı okundu (`resolveBurstPolicy.ts`, *"the CODE DECL IS the outage floor"*), **kontrol düzlemi okunmadı**: Control Plane'de yayım yüzeyi, üç kapılı gate, sürüm zaman çizelgesi ve rollback vardı. Sahip düzeltti. İkinci hata aynı satırda: `sessionTweakable: false` "panelden değiştirilemez" diye okundu, oysa "oturum içinde geçici oynanamaz" demek.
**Kural:** kod tanımı bir **taban**, kontrol düzlemi bir **yüzey**. Biri diğerinin yerine okunamaz.

**`A-REC-S113-OWNER-GIT-PULL-1`**
Sahibe `git pull` yazıldı — S102-YASA-1 ihlali. Sahibin yüzeyi rıza ve gerçek-dünya tanıklığıdır. Paylaşılan klonun şeritlerce erişilebilirliği **ölçülmedi**; ölçüldükten sonra kart kesilecek (`ADF-SHARED-CLONE-SYNC-1`).

**`A-REC-S113-SAY-NOT-DO-1`** ⚠ **sahip tarafından iki kez yakalandı**
"Basıyorum" / "ölçüp getireceğim" denip yapılmadı. Sahip: *"birdaha bana şimdi basıyorum falan deme, basacağını git bas"* ve *"gerçekten ölçüyor musun yoksa beni yiyor musun?"*
**Kural:** ya yapılmıştır ve digest'i yanıtta, ya o cümle kurulmaz.

---

## §2 · ŞERİTLERİN YAKALADIĞI — Architect'in değil

**`F-S113-FENCE-DECL-STALE`** · AG-1
`budgetFence` paketi **16/16 geçiyor**, beyan ettiği kutu **mevcut değil**. Paket beyanın iç tutarlılığını ve render çıktısını doğruluyor; **varlığını** doğrulamıyor. Yalnız `A3` canlı buluta bakıyor ve yalnız çit koştuğunda. Beş gün boyunca yeşil kaldı.

**`F-S113-FIELD10-BLIND`** · AG-2 (FINDING 9 → olgu)
Alan 10'un kapı listesi sabit dört isim taşıyor. AG-4'ün `report-schema.yml`'ı beşinci kapı olarak indi; alan 10 onu **göremiyor**. Sonra aynı sınıf ikinci kez ölçüldü: order C'de `total_count` 5→4 düştü, dört check de yeşildi, hiçbir yer beşinci kapının hiç konuşmadığını söylemedi.

**`F-S113-SPLIT-INERT`** · AG-5
İzin ayrımı master'da gerçek, **koşan pencerelerde etkisiz**. `printenv ADF_LANE_ROLE` boş; kontrol merceğiyle (`CLAUDE_CODE_DISABLE_AUTO_MEMORY` → 1) probun çalıştığı kanıtlandı. Sebep: pencereler dosyalar inmeden önce açılmıştı; `.claude/` oturum başlangıcında okunuyor.

**`F-S113-CP8-INSTANCE-ID`** · AG-1
CP-8 herhangi bir 7–39 karakterlik hex dizisini kısa sha sanıyor; EC2 instance id'si 17 karakter. Kart bir instance id **taşıyamıyor**. AG-1 hükmü: **değiştirilmemeli** — kalıbı genişletmek kesik sha yakalamasını bozar.

**`F-S113-GREP-SINGLE-LENS`** · AG-3, kendi aleyhine
Yasa metnini ölçerken ilk `grep` boş döndü; tek başına okunsaydı *"yasa `CLAUDE.md`'de yok"* sonucunu desteklerdi — yanlış. Kural satır sonuna sarıyordu, arama dizesi sarmayı aşıyordu. İki farklı formülasyon anında buldu. **Raporu yazarken kendi aletinde yaşandı.**

---

## §3 · S113'TE DOĞAN YASALAR — şeritlerden

**POZİTİF KONTROL** · AG-2, aynı gün AG-5 tarafından bağımsız kullanıldı
Bir yokluk iddiası, aynı probun **var olduğu yerde bulabildiği** gösterilmeden anlamsızdır. `grep -c` bir dalda 0 döndü; aynı prob master'da 1 döndürdüğü için 0 bir **ölçüm** oldu, "probum bozuk" ile ayrıştı.
*"tek negatif mercek yokluk kanıtı değildir"* yasasının söylenmemiş yarısı.

**SERTİFİKA AĞACA VERİLİR, DALA DEĞİL** · AG-2
Head kaydığında eski CI hükmü **ölür**. Onu şimdiki durum diye aktarmak, bir **hafızayı ölçüm diye sunmaktır**.

**BLOCKED ≠ KIRMIZI** · AG-2
`BLOCKED` "zorunlu check tatmin edilmemiş" demektir; *pending* de bunu tatmin etmez. `mergeable: UNKNOWN` ile aynı sınıf iki-değerli düzleştirme.

**SESSİZLİK VE BAŞARI AYNI RENKTEDİR** · AG-2
Bir şey saymadıkça ayırt edilemez. Yol-kapsamlı bir kapının hiç tetiklenmemesi, üç inişe renk olarak bakan biri için yeşil-yeşil-yeşil görünür.

**TÜRETME ≠ SONRADAN KONTROL** · AG-1
Değeri kaynağından **türetmek** sürüklenmeyi kaldırır; sonradan kontrol yalnız **pencereyi kısaltır**. `A3` bir kür değil, bir **dedektör**.

**BAYT ÖLÇÜLMÜŞ ARTEFAKTTAN GELİR** · AG-1
Farklı adlı, inmemiş bir dosyadan on yedi karakter almak, *"asla düzyazıdan değil"* kuralının ihlalidir.

---

## §4 · TAŞINAN DEFEKTLER — v49'dan

`F-S112-EVAL-CANARY-ZERO-RUNS` (**on dört → on sekiz**, hâlâ sıfır skor) · `F-S112-BUDGET-FENCE-OUT-EMPTY` · `F-S112-DOCDRIFT-SHORT-SHA-FATAL` · `F-S112-MCP-TRANSPORT-PER-USER-DRIFT-1` · `F-S112-RULE55-UNGATED-HALF` · `F-S112-RULE42-PHRASE-MISMATCH` · `F-S112-CENSUS-STALE` · `F-S111-GROUND-MD-UNGATED` · `F-S111-GROUND-GATE-IN-DEPLOY-BUILD` · `F-S111-SHARED-CLONE-IDENTITY-LEAK` · `F-S111-RELAY-CONSUMED-NOT-WRITTEN` · `F-S111-BACKEND-RETIRED-ENABLED` · `F-S108-RULE24-COLLISION` · `F-S103-CONSTITUTION-TEXT-EROSION-2` · `F-BW01` rule26 flake · `PI-013` · `readAncestry` mükerrerliği · `RULE-54` migrasyon borcu · üç öksüz denetim defteri · `gateway_artifact_observations`

---

## §5 · SAYIM

| | v49 | v50 |
|---|---|---|
| A-REC | 23 | **31** |
| şerit bulgusu (S113) | — | **5** |
| şeritten doğan yasa (S113) | — | **6** |
| kanarya ardışık SKIPPED | 14 | **18** |
| bütçe çiti başarısız koşu | 4 | **4 + iki kısmi** (biri assert'e ulaştı) |

**S113'ün tek cümlelik dersi:** Architect'in yedi hatasının altısı, okunabilir bir yerde duran bilgiyi okumamaktan çıktı. Düzeltmesi `/free` (indi) ve bağlam organı H2 (açık).

<!-- END REGISTER-BUG-BUCKET-v50 -->
