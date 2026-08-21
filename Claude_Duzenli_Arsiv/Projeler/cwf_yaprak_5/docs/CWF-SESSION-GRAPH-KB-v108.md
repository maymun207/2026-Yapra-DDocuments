# CWF — SESSION GRAPH KB · v108 (S108)
<!-- 2026-08-19. v107'yi GEÇERSİZ KILAR. Dersler ADIYLA; özetin özeti yasak. -->

## §1 · S108'İN TEK CÜMLESİ
Merge kontrolü bir disiplin problemi değil, **kablolanmamış bir kapı** problemiydi; kapı kuruldu ve
aynı gün, aynı kapının kurulma sürecinde, dokuz farklı biçimde AYNI kök hata tekrar çıktı:
**göstergeyi yer gerçeği sanmak.**

## §2 · KÖK HATA SINIFI — dokuz maske (sekizi Architect'te)
| Maske | Gösterge | Yer gerçeği |
|---|---|---|
| Diff | `git diff master..branch` | merge sonucu (S107: force-push emri) |
| Boşluk | boş sorgu sonucu | şema kısıtı (şerit YAZAMIYOR) |
| İzin | allow listesindeki `Bash(git *)` | sınıflandırıcının anlık kararı |
| Rozet | `SKIPPED` / `underpowered` | verdict yokluğu |
| Talimat | düzyazıdaki "master oynarsa üstüne çık" | dayatılan kapı |
| Teslim | `close()` çağrıldı | sunucu onayı |
| Sayı | "üç doküman" (izlenim) | dört ek (sayım) |
| Zaman | "dünkü" (konuşma mesafesi) | aynı sabah (damga) |
| **Kimlik** | **kart adresi** | **kazanılmış claim ref'i** |
| **Bayrak adı** | **"auto-merge" = bekler** | **kapı yoksa DERHAL birleştirir** |
| **Kredi** | rapor ekranı | hangi pencerenin yaptığı |

Sonuncular S108'in kendi katkısı. Kimlik maskesi en pahalısı: **atfın kendisini bozar**, yani üstüne
kurulan her ölçümü şüpheli kılar.

## §3 · S108'İN ON DERSİ

**D1 · Kapısı olmayan kural süstür — yönetişim katmanına da uygulanır.**
RULE-16'da 61 ihlal böyle birikmişti. Merge düzleminde de aynısı: CI PR'larda koşuyordu ama HİÇBİR
ŞEY onu gerektirmiyordu; `push origin HEAD:master` kabul ediliyordu. Elli birinci yasayı yazmak
elli birinci kez işe yaramaz — düzeltme MEKANİK olmalı (config, kapı, CI), metin değil.

**D2 · `--auto`, kapı yokken beklemez.** Ölçüm: #295 `build`+`rule26` in_progress iken indi;
#297 kapı armed iken 16 dakika bekledi. Aynı komut, aynı check durumu, zıt sonuç, tek değişken.
Bir bayrağın anlamı adından çıkarılmaz.

**D3 · Şerit adresi bir etiket, kilit değil.** Dört pencere aynı adrese düştü çünkü kimlik boot
metninde DÜZYAZIYLA iddia ediliyordu. Çözüm: nonce'lu claim push'u — ilk push kazanır, ikincisi
non-fast-forward reddedilir. Nonce ZORUNLU (nonce'suz iki pencere bayt-aynı commit üretip ikisi de
kazandığını sanabilir). Yürüyüşten önce `ls-remote` (fast-forward eden claim sessizce çalar).

**D4 · Bus'tan kimlik türetmek yasak.** Bir pencere bunu "Identity — DERIVED, not assumed" başlığı
altında yaptı: bize öğrettiğimiz disiplini uyguladığını sanıyordu, ama YANLIŞ KANITTAN türetiyordu.
Bus ne GÖNDERİLDİĞİNİ söyler, kim OLDUĞUNU asla.

**D5 · Sınıflandırıcı muhtemelen ŞEKİL × HEDEF'i puanlıyor — ama bu bir hipotez.**
Bileşik `PUT …/protection` ret, çıplak aynı çağrı geçti (iki pencerede bağımsız). Karşı örnek:
bileşik `POST /rulesets` GEÇTİ. Dört vakanın üçünü açıklayan sebep bulgu değil hipotezdir (AG-1).
Pratik kural her iki hipotez altında da bedava: **çıplak yaz, satır başına bir komut.**
MERGE-GATE'i saatlerce bloke eden üç ret muhtemelen kabuk sözdizimiydi.

**D6 · Yönetişim durumu iki mercek ister.** `GET /branches/{b}/protection` → 404 "not protected"
iken ruleset AKTİF'ti. İki uç birbirine yapısal olarak kör. Tek merceğe bakan bir pencere ikinci,
gereksiz bir koruma düzlemi ekledi. Cevap ikisinden okunmazsa `UNKNOWN`'dır.

**D7 · Kart icra edilmeden önce BÜTÜN kuyruk okunur.** Sonraki bir kart öncekini iptal edebilir.
E�lik eden kapı: `gh pr list --state all` — sadece-açık sorgusu HARCANMIŞ bir kartı göremez, çünkü
harcanmış kartın PR'ı zaten merged'dır (AG-1 buldu).

**D8 · Muhafız, yazıldığı yerde değil KAPSAMASI GEREKEN YOLLARIN SINIRINDA incelenir.**
`runTurn.ts` tek başına F169-uyumlu okunuyor — ve öyle, ona ULAŞAN her yol için. Delik, ona hiç
ulaşmayan yollar kümesi ve yalnız `chat.ts`'ten görülüyor. Dosya-yerel bir inceleme bunu her
seferinde geçirir. (`L-S108-CROSS-FILE-HOLE`, AG-2)

**D9 · Zorunluluk tüketimi ima etmez.** `intendedToolCategories` dört korpus nesli boyunca zorunlu,
66/66 dolu ve HİÇ okunmamış. Tip sistemi VARLIĞI dayatır, KULLANIMI hiçbir şey. L-ADAY-4'ün
(opsiyonel yüzeyin tüketicisi olmalı) zorunlu alanlara genişlemesi. (`L-S108-REQUIRED-IS-NOT-CONSUMED`)

**D10 · Bir rapor, pencereler ve saatler arası taşınan icra edilebilir bir artefakt olabilir.**
İnen MERGE-GATE raporundaki payload, kartın hiç adlandırmadığı `required_linear_history: false`
dahil, bayt-bayt başka bir pencere tarafından uygulandı. Şerit onu tam bu amaçla oraya koymuştu.

## §4 · ŞERİTLER ARCHITECT'İ YEDİ KEZ DÜZELTTİ, TERSİ SIFIR
1. Force-push emrini ölçüp reddetti (S107, taşındı) · 2. auto-merge cümlesini ölçüp çürüttü ·
3. Harcanmış kartı yakalayıp durdu · 4. "harness geneli" çıkarımını çürüttü ·
5. Tenant-zero sızıntısını (kazara) durdurdu · 6. Şekil yasasını hipoteze indirdi ·
7. Hak etmediği krediyi reddetti.
**Hüküm hiyerarşiden değil ölçümden çıkıyor** — kurulmaya çalışılan sistemin çalıştığının kanıtı.

## §5 · SAHİP KATKILARI (S108)
- Dört ek verdiğini fark edip *"her iki AG de kendini AG1 sanıyor"* diye bildirmesi kimlik defektini açtı.
- Rapor başlığı istemesi (`REPORT-HEADER-1`) — ve Architect başlığı ÖLÇÜLMÜŞ yaptı, çünkü etiketin
  kendisi zaten çalışmayan şeydi.
- Üç-modelli testin AYNI session'da koştuğunu söylemesi bağlam bulaşmasını ortaya çıkardı.
- OKF hükmü: "merge'den sonra ama MUTLAKA" + upstream enhancement fikri.
- Dört şerit kararı: *"böylelikle senin temel problemi çözüp çözemediğini de görmüş oluruz."*
<!-- END v108 -->
