# CWF-SESSION-GRAPH-KB-v114

**v113'ü GEÇERSİZ KILAR.** S114 düğümü eklendi.

---

## §1 · S114 DÜĞÜMÜ

**Zemin** `922ef571a4d8e1c6c9dd751d6c20f6ec144b3eea` → **tavan** `7c099fc6a6e6534dbabc4d9d0e4e89d84ac78c62`
**Yedi iniş, dördü script ile. Sıfır üretici merge'ü. Kapı iki yönlü hüküm verdi.**

**Konu:** ADF Kademe 2 — iniş protokolü script olur, kapı hook olur, claim yürüyüşü tavanlanır.

**Neden bu kadar insan eli:** iki eksik — poll bütçesi ve türetilmiş tamamlanma — sabahın her "yapıştır" dakikasını üretti. İkisi de ölçüldü ve S115'in ilk kartı oldu.

---

## §2 · S113 → S114 TAŞIYICILARI

| S113'te bırakılan | S114'te ne oldu |
|---|---|
| `npm run land` yedi adım | **İndi**, on bir sınıfla; dört iniş yaptı, birini reddetti |
| `guard-bash` mutlağı, harness reddi | **İndi** (#351); harness `rm`'i reddetti, `.gitignore` çözdü. Kök: hook yolu boşluklu dizinde kırılıyordu |
| `ADF-FOREMAN-SELF-LAND-1` üç seçenek | Sahip dördüncüyü seçti: **rapor-PR istisnası**, yol listesiyle |
| Paylaşılan klon erişimi ölçülecek | Bayattı, S114 açılışını kırdı; sahip onayıyla senkronlandı |
| `.gemini/` yüzeyi | Tek `settings.json`; Operator boot mekanizması yok |
| Kanarya 18 SKIPPED | **25** |
| Bütçe çiti üç kırmızı | Değişmedi; ay sonu yaklaşıyor |

---

## §3 · S114'ÜN ÜRETTİĞİ KALICI BİLGİ

### Fabrika mekaniği

**Adresi veren ve roster'ı sınırlayan iki ayrı sistemdi.** Git ref uzayı `lane/AG-*` için sınırsız; bus `CHECK` AG-5'te biter. Yürüyüş AG-6 ve AG-7 üretti; ikisi de `READ OK rows=0` okudu ve bunu "boş kutu" sandı — **boş kutu ile adreslenemez kutu dışarıdan aynı okunur.** Çözüm: roster DB'den **türetilir**, yazılmaz (#349).

**Bir pencerenin claim'i pencereyle birlikte ölmez.** Ref kalır; yeni ustabaşı `(stale info)` alır ve ikinci adresi yoktur. Çözüm: ölü tutanı lease-pinli devralma — `--force-with-lease=<ref>:<ölçülmüş sha>` compare-and-swap'tır; canlı tutan varsa reddedilir (#349). Salt-okunur süreç sayımı (`pgrep -a`, kendi ata zinciri dahil) tutanın ölü olduğunu kanıtladı.

**Poll bütçesi hayalet bir sorunu çözüyordu.** Zamanlanmış görevler yalnız pencere açık ve boştayken ateşlenir; "oturum kapanınca poller'ı sil" kuralı gereksizdi, "N poll sonra sus" uygulaması dört şeridi sağırlaştırdı. Kartlar ve poke'lar sağır kutulara düştü. Ustabaşının poke'u bu yüzden uyandıramaz — **poke okuyan şeridi harekete geçirir, okumayanı değil.**

**Tamamlanma damgalanmaz, türetilir.** `consumed_at` üç yapısal sebeple terk edilmişti: şeritler salt-okunur, damga iddiadır, yarış üretir. Sahibin "completed işareti" talebinin doğru hâli: rapor master'daysa CLOSED, dalda ise IN-FLIGHT, yoksa TODO — git'ten her tick sıfırdan hesaplanır (`RELAY-DONE-DERIVED-1`).

**Yazarlık login'den okunamaz.** Tek kimlik altında `author = lander` her zaman doğru; order B her ürün PR'ını reddetti. Ölçülebilir tek yazarlık commit konu satırındaki `AG-<n>` belirteci; belirteçsiz konu `AUTHOR-UNKNOWN`. Kural ustabaşının kendi raporunu reddetti (#352); reseal aynı ağaç, yasal konu, yeni commit — tarih yeniden yazılmadı (#353).

**Claude Code hook'u bulamazsa sessizce geçirir.** `exit 2` engel, her şey "non-blocking". Proje yolunda boşluk + tırnaksız `$CLAUDE_PROJECT_DIR` = hiç koşmayan kapı, sıfır sinyal. Kural: hook komutu göreli ve değişkensiz; **her boot kapıyı probla kanıtlar, kanıtlayamazsa durur.**

**IDE paneli ile terminal aynı harness değil.** Panel auto-mode sınıflandırıcısı ile koşuyor (`settings.local.json`), `/hooks` yok, başlatma bayrağı yok. Terminal + `--permission-mode default` sorular sahibe gelir. Pencere açma koşulu üç parçalı oldu.

**Aynı dosyayı değiştiren iki kart sırayla indiğinde ikincisi çatışır.** `package.json` iki script satırı; Architect'in sıralaması üretti. Kart, paylaşılan dosyayı önceden adlandırır.

**Bir prob, kapının gerçekten reddettiği komut olmalıdır.** `python3 … --force` guard kapsamında değildi; her boot `GATE-INERT` basacaktı. AG-4 düzeltti.

### Ölçüm disiplini — şeritlerden

**Kendi nüfusunun içinden sayım yapan gözlemci tarafsız değildir** (`/free`): `pgrep` kendi ata zincirini dışlar; bir eksik sayım "ben miyim?" sorusuyla başlar.
**İki mercek, iki roster** (AG-5): `gh pr checks` iptal edilmiş commit-status'u yeşil gösterir; check-runs API'si onu hiç listelemez.
**Regresin mühendislik çözümü yoktur** (AG-5): rapor kendisini içeren commit'in kimliğini taşıyamaz; bu yüzden hüküm merge mesajına yazılır, ağaca değil — §5'in varlık sebebi.
**Metne bakan kapı amaca bakmaz** (AG-4, AG-5): `--squash`'ı engelleyip `-s`'i geçiren ve `gh pr merge` geçen `grep`'i reddeden aynı kapı.

### CWF hakkında

`CWF-OWNER-QSET-1`: sahibin 11 sorusu (Kale hattı), 9'u ARMES URL'li, 2'si korelasyon. "Son 3 günün duruşları — zaman kısıtını anlayamadı" = `resolve_time_range ×4` bulgusunun kullanıcı yüzü. A23'ün kabul çıtası artık orijinal cümlelerle bu set.

---

## §4 · S114'TE MASTER'A GİRENLER

```
ce72c867  #349 AG-3 claim tavanı + devralma     ← AG-5 elle, hükümsüz
78d7d20b  #350 AG-2 npm run land + öz-test      ← AG-5 elle, hüküm -F
b0ae2f14  #344 AG-5 Kademe 1 raporu             ← npm run land  ← ilk script inişi
8f47f636  #346 AG-5 çit okuma raporu            ← npm run land, kuyruk
dafde074  #348 AG-5 Kademe 1 kapanış            ← npm run land
7a631833  #351 AG-4 guard                       ← AG-5 elle, hüküm
7c099fc6  #353 AG-5 Kademe 2 raporu, reseal     ← npm run land (#352 RED AUTHOR-UNKNOWN)
```

**Yeni yüzeyler:** `scripts/{land,landSelfTest,claimRoster}.ts` · `.claude/hooks/{guard.sh,guard-secrets.py}` · boot probu · `.gitignore __pycache__/` · dört Kademe 2 raporu + JSON ikizleri.

---

## §5 · S115'E TAŞINAN SORULAR

1. Yeni pencerede kapı probu BLOCKED mı? (Kademe 2'nin son kanıtı)
2. Bütçesiz poller + türetilmiş tamamlanma (`ADF-KADEME-3-POLL-AND-DONE-1`)
3. `ADF_LANE_ROLE` boot'tan nasıl gelir?
4. `MERGE-CONFLICT` soğuk klon · kuyruk hükmü · commit-status okuması
5. Remote Control kanalı bir şeridi dışarıdan uyandırır mı?
6. Model pini var mı? (`ADF-LANE-MODEL-PIN-1`)
7. Token döndürüldü mü? (sahip)

<!-- END CWF-SESSION-GRAPH-KB-v114 -->
