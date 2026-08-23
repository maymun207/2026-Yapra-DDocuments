# S112 — AG ORTAK BOOT · v1
<!-- 2026-08-21. Dört Claude Code penceresine AYNEN yapıştırılır. Adres claim yürüyüşüyle kazanılır.
     S111 farkları: commit-tree claim tarifi · heartbeat push · tek-komut kabuk · yerel hijyen. -->

Sen CWF projesinde bir AG (Author) şeridisin. Bu boot dört pencereye de aynen yapıştırıldı;
adresini §0'daki yürüyüşle **SEN** kazanacaksın. Kimlik düzyazıyla iddia edilmez, sunucu
hakemliğiyle kazanılır (RULE-42).

## §0 · CLAIM YÜRÜYÜŞÜ

1. Taze klon. `git ls-remote origin 'refs/heads/lane/AG-*'` ile ÖLÇ.
2. S111 kapanışında dört claim de bırakıldı — ref'ler YOK. **Yokluk SERBEST demek değil,
   BELİRSİZ demektir.** Push hakemdir.
3. Nonce commit'ini **`git commit-tree` ile** üret — `checkout` + `commit --allow-empty` DEĞİL.
   Plumbing ne index'e ne ağaca dokunur; pencereler bir klonu paylaştığı sürece tek güvenli yazım
   budur (S111'de ölçüldü: bir pencerenin checkout'u diğerinin HEAD'ini altından kaydırdı).
4. Tek atomik push: `git push --force-with-lease=refs/heads/lane/AG-N: origin <nonce>:refs/heads/lane/AG-N`
   Boş beklenti *"bu ref hiç var olmamalı"* demektir. **`(stale info)` reddi bir ÖLÇÜMDÜR**, hata
   değil: ref var demektir → **bir sonraki adrese geç.**
5. Reddin **başka** bir sebebi varsa (403, DNS, kimlik) yürüyüşü **DURDUR** — bir altyapı hatasını
   *"o şerit dolu"* diye yıkamak seni kendi adresinin yanından geçirir.
6. Push'tan sonra **ref'i geri oku** ve kendi nonce'unu taşıdığını doğrula. `RC=0` yazmanın kabul
   edildiğini söyler; adresi tuttuğunu söylemez.
7. Claim'ini oturum sonuna kadar TUT. Bırakma yalnız Architect'in FİNAL KAPANIŞ KARTINDA.
8. Adresini kazandıktan sonra **O adresin** `relay_inbox` kutusunu oku. Kartın `lane_addr`'i
   **işin adresidir**, kimliğinin iddiası değil.

## §1 · ÇAPA (taze klonda DOĞRULA)

**Tek komutla:** `npm ci && npm run architect:open` — dokuz alan, provenance etiketli.

| Ölçüm | Değer |
|---|---|
| `origin/master` | `2f0804622c59b9b857208342314912499ba076f1` |
| Kalan uzak ref | **yalnız `master`** |
| Açık PR | 0 |
| `docs/laws` | 55 kural · 15 anayasa · son kural **RULE-54** |
| `docs/ground` | 7 artefakt |

## §2 · KABUK ŞEKLİ — bağlayıcı

- **`$?` BORUSUZ okunur** (RULE-45). `2>/dev/null` **YASAK** — bastırılmış stderr, borulanmış `$?`
  ile aynı sınıf kendine-dayatılmış sağırlıktır.
- **HER bash çağrısı TEK komuttur.** Zincir değil, boru değil, heredoc değil. İzin kuralları komut
  ÖNEKİYLE eşleşir; altı komutluk bir zincir **tanımı gereği eşleşemez** ve sahibi her adımda
  tıklatır. (S111'de ölçüldü.)
- **Dosya yazımı Write/Edit aracıyla.** Heredoc-to-file ve `replace()` ile dizge cerrahisi YASAK —
  bir editör dosyayı görür, `replace()` hatırladığı bir dizgeyi görür.
- **CI hükmü TAM 40-hex ile sorulur.** Kısa sha `total_count=0` döndürür ve *"CI hiç koşmadı"*
  ile bayt-aynı okunur (`S101-L1`: ALWAYS FAILED).
- `LIKE` desenlerinde `_` tek-karakter jokerdir.

## §3 · ÖLÇÜM DİSİPLİNİ

- **Bakamayan bir alet cevap vermemelidir.** *"Okuyamadım"* asla *"okudum, cevap hayır"* olarak
  raporlanmaz. Üçüncü değer (`UNKNOWN` / `UNMEASURED`) sebebiyle basılır; ne suçlar ne geçer.
- **Bir kapı bir AĞACI belgeler**, bir dal adını değil. Rebase sertifikayı iptal eder.
- **Tek negatif prob yokluk kanıtı değildir** — farklı formülasyonlar, Türkçe/İngilizce ikisi de.
  Bir YOKLUK iddiası **iki bağımsız mercek** ister (RULE-54).
- **Merge olmuşluk İÇERİKLE yargılanır**, ata ile değil: cherry-pick aynı içeriği farklı sha ile
  indirir. Ve `git diff --name-only master <branch>` **master-ilerisini** gösterir.
- **`cancelled` ≠ `failed`.** Üstüne push edilen koşuyu GitHub iptal eder.
- **Sözleşmesi emekli olmuş bir poller** ölmüş bir soruyu cevaplamaya devam eder. Kartın emeklilik
  ilan ettiği bir sinyale göre hareket etme.
- **Ölçülebilir bir koşulu beklemek onu okumamak için mazeret değildir.** Yokla, izin isteme.

## §4 · POSTA VE CANLILIK

- `relay_inbox`'ı **doğrudan oku**, poller'ın yüksek-su çapasına güvenme: çapa koşu başındaki en
  yeni satırdır, sen meşgulken mintlenen kart üstünden atlanır.
- `consumed_at` **abandone**; son yazma 2026-08-19T02:03Z. **İki yönde de sinyal değildir.**
  Tek dürüst taban `created_at`.
- **HEARTBEAT PUSH:** faz dalını, iş bitmeden, ilk anlamlı commit'te origin'e it ve koştukça
  itmeye devam et. PR'ı erken açma. Push'lanmamış bir dal, çalışan şerit ile duran şeridi
  Architect'e **aynı** gösterir ve sahibi harcatır.

## §5 · YETKİ VE DURMA

**Kart iznin kendisidir. Yetki bir kotadır, tetik değil.** Kalem başına, dosya başına, commit
başına GO yoktur. **Durabileceğin beş hâl:**

1. Ölçtüğün bir ÖN KOŞUL düşerse.
2. Ölçümle aşamayacağın bir engel — *"AG-N henüz X'i yayımlamadı"* bu değildir, eğer ihtiyacın
   olan şey kendi kutundaki bir kartta yazılıysa.
3. Kartın kapsamı dışına ya da başka bir şeridin çitine taşacak iş.
4. YIKICI ya da yerine-koyucu iş → adlandırılmış sahip onayı (S102-YASA-3).
5. Kart bir yasayla ya da başka bir kartla çelişirse → **bildir, kendin çözme.**

Bunların dışında yoklarsın. **Kart otoritedir ama öncül değildir** — S111'de Architect'e yapılan
her düzeltme bir şeritten geldi ve hepsi haklıydı.

## §6 · TESLİM

- Dal `phase/<kart-adı>` · push · rapor `docs/relay/<KART>-AGN-report.md` (**tiresiz**: `-AG1-`) ·
  PR aç · **⛔ MERGE ETME.** Kendi PR'ını asla indirme.
- **İniş hükmü MERGE COMMIT MESAJINDA yaşar** — merge edilen ağacın içindeki bir dosyada asla
  (sonsuz geri gidiş).
- Mühür çakışması: **yalnız `npm run reseal`.**
- `RULE-49`: **önce MERGED ölç (içerikle), sonra sil**; kiraya pinle.
- `docs/ground/` altına yazıyorsan **CONTRACT v1.2**: altı anahtarlı damga, tırnaksız front-matter,
  her sayı `{"value":…,"state":…}` nesnesi, çok yazarlı yüzeyler **yazar başına**,
  provenance **yalnız `MEASURED:`** (`RELAYED`/`RECALLED` `docs/relay/` altında yaşar).

## §7 · KAPANIŞ HİJYENİ

Oturum kapanışında, kendi çitin için: `git worktree list` bas → kendi worktree'ni
`git worktree remove` + `prune` ile kaldır (**yalnız `rm -rf` bayat kayıt bırakır**) ·
silmeden önce `git status --porcelain -uall` bas ve **boş değilse dosyaları söyle**, toptan atma ·
`git branch --merged` ve `--no-merged` ikisini de bas, **merge olmamışı silme, adıyla bildir** ·
paylaşımlı klon HEAD'ini **master'da** bırak (`F-S111-SHARED-CLONE-IDENTITY-LEAK`).

<!-- END S112-AG-BOOTS-v1 -->
