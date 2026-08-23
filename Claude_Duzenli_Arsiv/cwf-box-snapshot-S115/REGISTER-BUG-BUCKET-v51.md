# REGISTER-BUG-BUCKET-v51

**v50'yi GEÇERSİZ KILAR.** S114 kapanışında yazıldı.

**A-REC sayacı: 31 → 41.** S114'te on yeni Architect öz-düzeltmesi. Ortak kök: **Architect'in makinenin yapabileceğini sahibe, sahibin göremeyeceğini makineye yüklediği yerler.**

---

## §1 · S114'TE DOĞAN A-REC'LER

**`A-REC-S114-STALE-WINDOW-1`**
Bootstrap "pencereleri aç" dedi, eski sekmelerin kapanması gerektiğini demedi. `.claude/` açılışta okunur; eski oturum `/wr`'ı tanımadı. S113'ün `F-S113-SPLIT-INERT` dersi aynı gün tekrar etti.

**`A-REC-S114-LAUNCH-FLAG-1`**
"`--settings … ile aç`" yazıldı; sahip bayrağı sohbete yapıştırdı. Başlatma bayrağı bir prompt değildir; insan diliyle ("terminali aç, şunu yaz") yazılmamıştı.

**`A-REC-S114-SECRET-READ-ORDER-1`** ⚠ **sahip tarafından yakalandı** (*"Bu ne rezillik!"*)
Ölçüm satırı `settings.json`'un bölümlerini ve `settings*.json`'ları okutturdu; `settings.local.json` dışlanmadı. Şerit `SUPABASE_ACCESS_TOKEN`'ı transkripte bastı. İkinci ölçüm satırı aynı dosyayı yeniden okutacaktı, geri çekildi.
**Kural:** her ölçüm satırı sır-dosyalarını adıyla dışlar; şerit boot'u ADR-007'yi düzyazıyla ve hook'la taşır.

**`A-REC-S114-SELF-CENSUS-1`**
`pgrep -fl claude` ile pencere saydırıldı; araç kendi ata zincirini dışlar. Şerit 5 sayıp "bir eksik" demedi, "ben miyim?" diye sordu ve buldu. Satır yanlıştı, şerit doğruydu.

**`A-REC-S114-SELF-LAND-IDENTITY-1`**
Order B "yazar = lander ise reddet" diye yazıldı; KB v113'te Architect'in kendisi "`git author` her şeritte `maymun207`" yazmıştı. Kural her ürün PR'ını reddetti. Hüküm: yazarlık commit konu satırındaki şerit belirteci.

**`A-REC-S114-PACKAGE-JSON-ORDER-1`**
#349 ve #350 aynı dosyaya script satırı ekliyordu; iniş kartı birini önce indirip diğerini çatıştırdı. Paylaşılan dosya kartta önceden adlandırılır.

**`A-REC-S114-PROBE-SCOPE-1`**
GUARD-1 kartındaki boot probu (`python3 -c … --force`) guard'ın kapsamında değildi; her boot sonsuza dek `GATE-INERT` basacaktı. AG-4 yakaladı ve guard'ın gerçekten reddettiği bir probla değiştirdi.

**`A-REC-S114-ASK-WHAT-I-CAN-READ-1`** ⚠ **sahip tarafından yakalandı** (*"sen gidip kendin niye okuyamıyorsun?"*)
Push edilmiş dallar, raporlar ve bus satırları Architect'in kendi okuyabildiği şeylerken sahipten ekran istendi.
**Kural:** push edilmiş her şey Architect okur; sahipten ekran yalnız bus'ın ulaşamadığı yerde.

**`A-REC-S114-RULING-NOT-ON-BUS-1`** ⚠ **sahip tarafından yakalandı** (*"ustabaşına gerekli kartı yaptın mı? işim bitti kart bekliyorum diyor"*)
Adım 6–7 hükmü sohbete yazıldı, bus'a basılmadı; ustabaşı "pending ruling" diye bekledi.
**Kural:** hüküm bus'a basılmadan hüküm değildir.

**`A-REC-S114-AUTO-MODE-1`**
Dört harness reddi (`rm`, `CronCreate`, poke, `npm run land`) "harness" diye genel adlandırıldı; hepsi IDE panelinin auto-mode sınıflandırıcısıydı. Pencere modu bootstrap'a yazılmamıştı.

---

## §2 · ŞERİTLERİN YAKALADIĞI — Architect'in değil

**`F-S114-HOOK-PATH-SPACES-1`** · terminal penceresi, kelimesi kelimesine
`/bin/sh: /Users/tunckahveci/Desktop/2026: No such file or directory`. Proje yolunda boşluk, hook komutu tırnaksız `$CLAUDE_PROJECT_DIR`. Script hiç koşmadı; Claude Code "non-blocking" sayıp geçirdi. **Günün kök sebebi.** #351 komutu göreli yaptı.

**`F-S114-CLAIM-WALK-NO-CEILING-1`** · AG-6, AG-7
Yürüyüş roster'ı bilmez; DDL bilir. "Boş kutu ile adreslenemez kutu aynı okunur." Kapandı (#349).

**`F-S114-FOREMAN-CLAIM-PERSIST-1`** · yeni ustabaşı penceresi
Claim pencereyle ölmez; boot'un ikinci adresi yok. Lease-pinli devralma ile kapandı (#349).

**`F-S114-POLL-BUDGET-DEAF-1`** · dört şerit, aynı gün
Kendi koydukları bütçe dolunca sağırlaştılar; bütçe hayalet bir sorunu çözüyordu. **AÇIK**, S115 ilk kart.

**`F-S114-SCOUT-PRINTED-SECRET-1`** · `/free`
ADR-007 ihlali: sır ekrana basıldı. Hook ile kapandı (#351); davranış kuralı boot'a S115'te.

**`F-S114-LAND-COLD-CLONE-CONFLICT-1`** · AG-5
Step 4 `merge-tree`'nin success dışındaki her çıkışını `MERGE-CONFLICT` sayıyor; soğuk klonda aynı komut fetch öncesi kırmızı, sonrası yeşil. Açık.

**`F-S114-LAND-QUEUE-VERDICT-1`** · AG-5
Kuyruklu (auto-merge) iniş hükmü, yapmadığı ağaç doğrulamasını iddia ediyor. Açık.

**`F-S114-VERCEL-CANCELED-GREEN-1`** · AG-5
Commit-status "Canceled by Ignored Build Step" `gh pr checks`'te yeşil; check-runs API'sinde yok. Step 3'e commit-status okuması. Açık.

**`F-S114-LANE-ROLE-UNNAMED-1`** · AG-5
`ADF_LANE_ROLE` yük taşıyor (onsuz her iniş `AUTHOR-UNKNOWN`), hiçbir boot/kart adlandırmıyor; ustabaşı elle verdi. Açık, S115 ilk kart.

**`F-S114-GUARD-TEXT-MATCH-1`** · AG-5
`gh pr merge` geçen salt-okunur `grep` reddedildi. Vocabulary vs purpose. Açık.

**`F-S114-GRAMMAR-NONZERO-FALSE-POSITIVE-1`** · AG-5
`R-ABSENCE-LENS` "non-zero exit" içindeki `\bzero\b`'yu yokluk iddiası sandı. Açık.

**`F-S114-FOREMAN-CLOCK-LOCAL-MIDNIGHT-1`** · AG-5, kartla ölçtürüldü
Tick başlığı yerel gece yarısında tarih atlıyordu. Açık (kozmetik; `date -u` kuralı boot'a).

**`F-S114-MERGE-VERDICT-MISSING-1`** · AG-5, kendi aleyhine
#349 `--auto --merge` hükümsüz indi; kart `-F` demedi. Master yeniden yazılmaz; hüküm raporda. Kapalı-kayıtlı.

**`F-S114-LANE-REF-PREVIEW-DEPLOY-1`** · Vercel ekranı
Her claim nonce'u preview deploy üretiyor. Açık.

**`F-S114-HARNESS-CRONCREATE-REFUSED-1`** · AG-5
Sil-önce-yarat sırası + sınıflandırıcı reddi = poller'sız ustabaşı. Yarat-önce kuralı + default mod ile kapandı.

**`F-S114-SECRET-IN-SETTINGS-LOCAL-1`** · `/free`
Token düz metin dosyada. **Sahip maddesi, döndürülmedi.**

**`F-S114-INSTRUCTIONS-PASTE-STALE-1` · `F-S114-CONSTITUTION-MIRROR-PATH-STALE-1`** · Architect açılış ölçümü
Sohbete v5_6 yapıştırıldı (kutuda v5_7); talimat §0'ın aynası tek dosya, repo klasör. Sahip talimatı güncellemeli.

---

## §3 · S114'TE DOĞAN YASALAR — şeritlerden

**BOŞ KUTU ≠ ADRESLENEMEZ KUTU** · AG-6, AG-7 bağımsız
Dışarıdan ikisi de `rows=0`. Ayıran poll değil DDL'dir.

**LEASE BİR COMPARE-AND-SWAP'TIR** · AG-6, AG-7, AG-5
`--force-with-lease=<ref>:<sha>` "yalnız bu sha'daysa" demektir; çıplak `push :ref` başkasının claim'ini de siler. "Yalnız kendi ref'in" cümlesini garanti yapan şey lease'dir.

**GÖZLEMCİ NÜFUSUN ÜYESİDİR** · `/free`
Kendi içinden sayım yapan alet kendini çıkarır. Bir eksik sayım önce "ben miyim?" sorar.

**POKE OKUYANI HAREKETE GEÇİRİR** · AG-5, AG-4 üzerinde ölçüldü
Bus'a satır yazmak, kutuyu okumayan şeride ulaşmaz. Uyandırma pencereden ya da hiç.

**TAMAMLANMA TÜRETİLİR** · sahip + Architect
Damga iddiadır; rapor master'daysa bitmiştir. `consumed_at`'in doğru mezar taşı.

**RAPOR KENDİ COMMIT'İNİ TAŞIYAMAZ** · AG-5
Regres yoktur, yasa vardır: hüküm merge mesajında yaşar, ağaçta değil.

**İKİ MERCEK, İKİ ROSTER** · AG-5
Aynı nesneyi iki alet farklı listeyle görür; birinin yeşili diğerinin yokluğudur.

---

## §4 · TAŞINAN DEFEKTLER — v50'den

`F-S112-EVAL-CANARY-ZERO-RUNS` (**on sekiz → yirmi beş**, hâlâ sıfır skor) · `F-S113-FENCE-DECL-STALE` · `F-S113-FIELD10-BLIND` · `F-S113-CP8-INSTANCE-ID` · `F-S112-BUDGET-FENCE-OUT-EMPTY` · `F-S112-DOCDRIFT-SHORT-SHA-FATAL` · `F-S112-MCP-TRANSPORT-PER-USER-DRIFT-1` · `F-S112-RULE55-UNGATED-HALF` · `F-S112-RULE42-PHRASE-MISMATCH` · `F-S112-CENSUS-STALE` · `F-S111-GROUND-MD-UNGATED` · `F-S111-GROUND-GATE-IN-DEPLOY-BUILD` · `F-S111-SHARED-CLONE-IDENTITY-LEAK` · `F-S111-RELAY-CONSUMED-NOT-WRITTEN` · `F-S111-BACKEND-RETIRED-ENABLED` · `F-S108-RULE24-COLLISION` · `F-S103-CONSTITUTION-TEXT-EROSION-2` · `F-BW01` rule26 flake · `PI-013` · `readAncestry` mükerrerliği · `RULE-54` migrasyon borcu · üç öksüz denetim defteri · `gateway_artifact_observations`

**Kapananlar (v50 → v51):** `F-S113-SPLIT-INERT` (klon senkronu + pencere koşulları) · `F-S113-GREP-SINGLE-LENS` (gramer kapısı artık zorluyor).

---

## §5 · SAYIM

| | v50 | v51 |
|---|---|---|
| A-REC | 31 | **41** |
| şerit bulgusu (S114) | — | **17** |
| şeritten doğan yasa (S114) | — | **7** |
| kanarya ardışık SKIPPED | 18 | **25** |
| script iniş / elle iniş | 0 / 9 | **4 / 3** |
| kapı hükmü (RED / yeşil) | 0 | **1 / 1** |

**S114'ün tek cümlelik dersi:** Architect'in on hatasının üçü sahip tarafından, dördü şeritler tarafından yakalandı; fabrika ilk kez kendi kapısına takıldı ve bunu hata değil kanıt saydı.

<!-- END REGISTER-BUG-BUCKET-v51 -->
