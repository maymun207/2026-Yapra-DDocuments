# CWF — BUG KOVASI · v49 (S112 kapanışı)
<!-- 2026-08-22. v48'i DEVRALIR. Append-only: hiçbir kalem kapanış kaydı olmadan
     düşmez. v48'in §1–§4'ü taşındı; kapananlar kanıtıyla işaretlendi.
     BÜTÜN yazıldı (A-REC-S101-7). -->

## §1 · S112'DE KAPANANLAR — kanıtla

| Id | Kapanış |
|---|---|
| `F-S112-CANONICAL-LEDGER-SCOPE-1` | `CLOSED@ab4ba34c` — defter 15 → **49** kalem, `GI-001…015` + `PI-001…034`. Taze klonda alan 9 `items 49 (measured)` |
| `F-S112-ARCHOPEN-ORPHAN-LABEL-1` | `CLOSED@e3b25da3` — alan 8 artık verdict tablosundan sayıyor. `28` → **`4 (measured)`**, taze klonda doğrulandı |
| `F-S112-GATE-TALLY-STALE-1` | `CLOSED@CLAUDE-PROJECT-INSTRUCTIONS-v5_7` — 5/7 → **6/7**, ve iki skorbordun ayrımı yazıldı |
| `F-S112-VALVE-STATE-STALE-1` | `CLOSED@CLAUDE-PROJECT-INSTRUCTIONS-v5_7` — valf `qdrant`, published, ve `VECTOR-ONBOARD-DRIP-1` inmiş |
| `F-S112-LAWGATE-PRESENCE-HOLE` | `CLOSED@2e2042d7` — **oturumun en pahalı bulgusu.** `parseBundle` tekil anahtarları yalnız mükerrerlik için test ediyordu; `binds`/`scope` eksik kayıtlar **yeşil geçiyordu**. `parseLedger`'ın düşürülen garantisi restore edildi. **Gerçek korpusa arıza ekilerek** kanıtlandı: `GOLDEN-LEDGER.md`'den `binds:` silindi, kapı dosyayı ve anahtarı adlandırarak kızardı, `46/46` yeşil kaldı |
| `F-S112-OPERATOR-BOOT-MISSING-1` | `CLOSED@S112-OPERATOR-BOOT-v1` — beşinci şerit boot edildi |
| `F-S112-MCP-SSE-NO-TERMINATE-1` | `CLOSED@mcp_global_settings + mcp_settings` — iki **etkin** satır `streamable-http`'ye çevrildi, `jsonb_set` ile tek anahtara dokunularak. ⚠ Çalışma-zamanı kanıtı **UNMEASURED** |
| `F-S112-MCP-FALLBACK-SILENT-1` | `CLOSED@7a81e0c6` — `connectMcp` artık her sonuçta bağlanan transport'u ve `fallback` durumunu basıyor |
| `F-S112-GRAMMAR-DOC-DRIFT` | `CLOSED@fd3c1e26` — gramer kendini render ediyor, tür sayısı bir daha sürüklenemez |
| `F-S112-LANE-PERMISSION-STALL` | `CLOSED@8effd967` — `settings.json` yalnız `deny` taşıyordu, `allow` **hiç yazılmamıştı**. Sahibin "hiç aşamadık" dediği takılmanın ölçülmüş sebebi buydu |
| `F-S103-CONSTITUTION-README-UNIT` | `CLOSED@2e2042d7` — README `String.length` diyordu, kapı `Buffer.byteLength` çağırıyor |

## §2 · AÇIK

### §2.1 · S112'de doğanlar, kapanmayanlar

| Id | Ne |
|---|---|
| `F-S112-BUDGET-FENCE-NEVER-MEASURED` | **En ağırı.** Dört zamanlanmış koşunun dördü başarısız, `Assert the fence` her seferinde **SKIPPED**. Sebep master'da (`#333`): `cwf-langfuse-bootstrap` `budgets:ViewBudget` yapamıyor. **Harcama hakkında hiçbir şey bilinmiyor**, ve 2026-08-10'da aynı bütçe eylemi üretimi otomatik öldürdü. Sahip izni verdi — `RELAYED`, ölçülmedi. **S113'ün 1 numaralı işi** |
| `F-S112-BUDGET-FENCE-OUT-EMPTY` | Kalıntı: `${out}` boş gelirken AWS metni ayrı satırda. AG-3 üç makul sebep saydı, **hiçbirine kanıt bulamadı ve mekanizmayı kurmadı** — kasten |
| `F-S112-DOCDRIFT-SHORT-SHA-FATAL` | `checkDocDrift` sekme başına bir `fatal: Not a valid object name` basıp **yine de doğru hüküm veriyor**. O yoldaki doğruluk **açıklanmamış**, ve kısa-sha çözümü `S101-L1`'in konusu |
| `F-S112-MCP-TRANSPORT-PER-USER-DRIFT-1` | `transport` bir **protokol** özelliği, uç noktaya ait — ama kullanıcı başına saklanıyor. Üç `user_id`'de `supersetArmes` var; ikisi kapalı olduğu için şu an zararsız |
| `F-S112-RULE55-UNGATED-HALF` | `relay_inbox` gövdelerini **hiçbir kapı okumuyor** — ve bu, S112'deki her kartın gittiği yol. `card:preflight` var, build hattında yok. Yasa bunu artık kendi metninde kaydediyor |
| `F-S112-EVAL-CANARY-ZERO-RUNS` | On dört inişte `eval-canary` **on dört kez SKIPPED**. Her seferinde adıyla anıldı — doğru disiplin — ama `eval-gate atlanamaz` yasası olan bir evde kanarya bir oturum boyunca **sıfır kez skor yaptı** |
| `F-S112-RULE42-PHRASE-MISMATCH` | `RULE-42`'nin kanoniği, claim prosedürünün **emitmediği** bir ret ifadesi adlandırıyor |
| `F-S112-CENSUS-STALE` | `census.latest.json` S112 boyunca bayat kaldı, sınır 60 dk. Alan 7 bir öncül değildir |

### §2.2 · S111'den taşınanlar (v48 §2.2, değişmeden)

`F-S111-GROUND-MD-UNGATED` · `F-S111-GROUND-GATE-IN-DEPLOY-BUILD` · `F-S111-SHARED-CLONE-IDENTITY-LEAK` · `F-S111-RELAY-CONSUMED-NOT-WRITTEN` · `F-S111-BACKEND-RETIRED-ENABLED` · `readAncestry` mükerrerliği · `RULE-54` migrasyon borcu · üç öksüz denetim defteri · `gateway_artifact_observations` (126 satır, canlı öksüz) · `F-S110-SUITE-TIMING-ASSERTION-LOADSENSITIVE` → **`PI-013`, ve S112'de KANIT KAZANDI**: AG-3'ün docs-only diff'i yük altında düştü, yüksüz `14/14` geçti, ağaç master'la aynıydı. Kalemin kendi metni tam bunu istiyordu · `rule26` flake geçmişi (`F-BW01`)

## §3 · ARCHITECT ÖZ-DÜZELTMELERİ

### §3.1 · S112 — yirmi bir kayıt

| Id | Ne | Sınıf |
|---|---|---|
| `A-REC-S112-1` | Oturumun **İLK** komutunda `$?` borudan sonra okundu | duran kural |
| `A-REC-S112-2` | Test dosyası üretim modülü sanılıp basıldı | gösterge≠zemin |
| `A-REC-S112-3` | Göç emrinde sayı verildi, isim değil — **AG-2 kesti** | manifesto |
| `A-REC-S112-4` | Ve sayı yanlıştı: on üç değil **yirmi sekiz** | sayım |
| `A-REC-S112-5` | *"S111'in altı kartı"* — var olmayan popülasyon — **AG-4 kesti** | sahte küme |
| `A-REC-S112-6` | Kart preflight'ta **RED**: `CP-2`, `CP-5`, `CP-8` | kart grameri |
| `A-REC-S112-7` | Aynı sahte popülasyon, ikinci kayıt | sahte küme |
| `A-REC-S112-8` | Dört şerit **seri zincire** kondu, uyandırıcı bırakılmadı | tek tıkanma |
| `A-REC-S112-9` | `CLAUDE.md`'ye sayı yasağı yazıldı, **sonraki belgede çiğnendi** | aynı el |
| `A-REC-S112-10` | Birinci tıkanmanın çaresi yazılırken **ikincisi inşa edildi** | tek tıkanma |
| `A-REC-S112-11` | Round 8 *"uyuyor"* ilan edildi — **grep'le okundu, alet koşturulmadı** | kısmi okuma |
| `A-REC-S112-12` | **Yanlış mercek**: AG-1 "altı saattir sessiz" bildirildi, dalganın yarısını o indirmişti | iki mercek ≠ iki mercek |
| `A-REC-S112-13` | Gramer üç bölüm sanıldı, dörttü — **AG-1 kesti** | kısmi okuma |
| `A-REC-S112-14` | Round 5 DELIVERY maddesi **uygulanamazdı** — **AG-1 kesti** | imkânsız emir |
| `A-REC-S112-15` | *"Karttan anahtar listesi alma"* denildi, **aynı kartta liste verildi** — biri yanlıştı, **AG-3 kesti** | aynı nefes |
| `A-REC-S112-16` | Doğru bir eleştiriye karşı bir şerit **başka duruma ait** doğru cümleyle savunuldu — **sahip kesti** | yanlış teşhis |
| `A-REC-S112-17` | Boot sınıfı artefaktlar **şeride yönlendirildi** | yanlış rota |
| `A-REC-S112-18` | Ret **prob edilmeden** genişletildi, iş sahibe yönlendirildi — **sahip reddetti ve haklıydı** | ölçmeden varsayım |
| `A-REC-S112-19` | *"Aşağıdaki tam baytlar"* denildi ve **yer tutucu** kondu | kart taşımalı |
| `A-REC-S112-20` | Kayıt emri inişle **aynı karta** yazıldı, öncesine değil | sıralama |
| `A-REC-S112-21` | İniş sayısı **konu desenine grep'lenerek** sayıldı: `8` çıktı, doğrusu `14` | gösterge≠zemin |

**Ve yapısal olan, kaydedilmiş:** her bulguya bir kart kesildi; 17:42Z'de **on yedi okunmamış kart** vardı. Round 7'de bağlanıldı — *şeridin kutusundaki bir kartın zaten cevapladığı soru yeni kart almaz.*

### §3.2 · S111 (v48 §3.2, değişmeden)
`A-REC-S111-1` … `A-REC-S111-6`

## §4 · ARAÇ TUZAKLARI

### §4.1 · S112'de doğanlar

- **`exit 1` bir PreToolUse hook'unda BLOKLAMAZ** ve komut yine koşar. Alışılmış Unix hata kodu burada tam olarak yanlış olan. Zaman aşımına uğrayan bir hook da bloklamaz.
- **Bir izin listesi NEGATİF İFADE EDEMEZ** — her önek her son eki kabul eder. `--force-with-lease`, `--force` ile karakter karakter başlar.
- **`-m "..."` içindeki ters tırnak komut ikamesidir** ve mesajın tarif ettiği komutları **çalıştırır**. Uzun mesaj dosyaya yazılır, `-F` ile geçirilir. `git merge -F -` stdin okumaz, `git commit -F -` okur.
- **Bir konu desenine grep, yapısal bir sayım değildir.** `merge pull` deseni `Land #N ·` ve `merge(...)` formlarını kaçırır.
- **`pgrep -af` kendi kabuk çağrısının argv'sinde ÖZ-EŞLEŞİR.** Bir PID döndürmesi canlı bir süreç olduğunu söylemez.
- **`total_count=N` de ALWAYS FAILED olabilir** — gerekli kontrol henüz **yaratılmamışsa**. Workflow'lar PR olayına bağlıdır; PR açılmadan `build` koşusu yoktur.
- **Klasik branch-protection endpoint'inin `404`'ü YANLIŞ MERCEKTİR**, yokluk değil. Kapı ruleset'te yaşayabilir.
- **`jsonb_agg`, `with ordinality` + `order by ord` olmadan sırayı bozabilir** — ve bozulan sıra, yetkilendirilmemiş satırların sessiz yeniden yazımıdır.
- **Mühür ağaçtan türer**, yani her iniş arkadaki her dal için yeniden kayar. Tek çare `npm run reseal`; hunk seçmek asla değil. Ve doğru reseal, **kapının kendi bildirdiği** digest'lere oturur.
- **Bir yorum temizleyici `//`'den satır sonuna siler** ve `https://host` taşıyan bir satırı yutar — işi bir şey bulmak olan bir testte yanlış-negatif.

### §4.2 · S111'de doğanlar (v48 §4.2, değişmeden)
Tam 40-hex CI hükmü · `git diff --name-only` master-ilerisi · `--force-with-lease` boş beklenti · `cancelled ≠ failed` · emekli poller · `rm -rf` worktree bırakmaz

<!-- END REGISTER-BUG-BUCKET-v49 -->
