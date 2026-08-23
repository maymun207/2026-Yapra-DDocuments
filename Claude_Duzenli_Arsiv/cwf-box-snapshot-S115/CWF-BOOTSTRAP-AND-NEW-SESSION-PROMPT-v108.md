# CWF — BOOTSTRAP & YENİ OTURUM PROMPTU · v108 (S108 açılışı)
<!-- 2026-08-19. v107'yi GEÇERSİZ KILAR. ÇAPA S107 kapanışında CANLI ÖLÇÜLDÜ.
     Taze klonda DOĞRULANMADAN faz kartı kesilmez. BÜTÜN yazıldı. -->

## §1 · ÇAPA TABLOSU (S108 açılışında TAZE KLONDA DOĞRULANACAK)
| Ölçüm | S107 kapanış değeri |
|---|---|
| `git rev-parse origin/master` | `15db33a48a2f3c5f3c77d93e311f7383e1998816` |
| `git ls-remote --heads origin` | **yalnız master** (phase/* = 0 ref) |
| Açık PR | **0** (#292 MERGED a18f7697 · #293 MERGED 26ce6379 · #294 MERGED 15db33a4) |
| docVersion | TÜRETİLMİŞ: `<sha7> · <date>` — manifest'te skaler anahtar YOK; facts.json build'de hesaplar |
| AGENTS.md 45/176/201 | üçü de "There is no docVersion to bump — identity DERIVED from git" |
| vitest | 661 dosya / 9366 test (a18f7697 master CI'ında ölçüldü; 15db33a4 docs-only, CI tasarımca atlandı) |
| Üretim `[McpClose]` | CANLI — her teardown'da satır; 5×http `no-session`, 1×sse `n/a` |
| Üretim ARMES | `down: auth | http=401 | SSE error` (gece boyunca) |
⚠ **Bu tablo bir İDDİADIR (TOTAL-45).** Doğrulanmadan öncül yapılmaz.
⚠ **total_count=0 istisnası (S101-L1 daraltması):** docs-only master push'u (`paths-ignore: docs/**, .agents/**`, ALL-or-nothing) TASARIMCA koşu üretmez — 15db33a4 böyledir; bu bir başarısızlık DEĞİLDİR. Önce değişen yollar okunur, sonra hüküm verilir.

## §2 · AÇILIŞ SIRASI (bağlayıcı)
1. `cwf-memory-seed-CWF5-v1` oku. 2. Bu dosya + ÇAPA doğrulaması (taze klon).
3. `cwf-open-items-register-v110` · `CWF-SESSION-GRAPH-KB-v107` · `REGISTER-BUG-BUCKET-v43` · `cwf-implementation-order-S107-v20` oku.
4. CONSTITUTION ayna preflight (kapalı olması muaf kılmaz; ayna md5 `7fb9eb4356947ad84217ca2768503ef4` @ 8f8dd2a9; docs/laws o zamandan beri dokunulmadı).
5. SOTA-1 POZİTİF KONTROLÜ: ilk mesajda kelimesi kelimesine (S66-1).

## §3 · İLK İŞLER (sıra bağlayıcı)
**1 · #29 A23 kartı** — SON SOTA anahtarı. W1 düştü, masa temiz, ertelenemez (SOTA-1).
**2 · G3 doğum kanıtı** — ARMES ayağa kalkınca `[McpClose] label=armes…` satırı okunur (transport? session? DELETE?). Sahip yarısı: Hülya'ya üç soru (pool reset · reset sonrası tırmanış · 401 nedeni). `F-S107-MCP-NO-SESSION-AMBIGUOUS` burada çözülür.
**3 · #81 vector-index cron** — `[VectorIndex]` + `[Vector] corpusSize` okuması.

## §4 · MERGE KARTI ŞABLONU (S107'nin ana yapısal dersi — kalıcı)
**Sınıflandırıcı bir izin DEĞİLDİR.** `Bash(git *)` allow'da dururken merge yine reddedilebilir; boot metni bunu çözemez (AG-1'de dört ret, sonuncusu salt-okunur `git status`). Merge kartları DURMAYI PLANLAR:
şerit inşa eder → gate'ler → mesajı hazırlar → kendi sınıflandırıcısı reddederse kart **izinli pencereye devrolur** (S107'de AG-1→AG-2 devri kanıtladı) — ASLA sahibin eline değil. Devir güven meselesi değildir ve kartta öyle yazılır; **alan şerit içeriği kendisi yeniden doğrular** (pusher, master'a ineni sahiplenir).
Kanıtlı deyim: `checkout --detach origin/master` → `merge --no-ff -F msg` → gate'ler MERGE EDİLMİŞ ağaçta → `push HEAD:master` → PR MERGED teyidi → dal sil.
**Mühür/bump adımı GO şablonlarından KALICI silindi** (SEAL-DERIVE indi; "bump docVersion" diyen her kart bayattır).

## §5 · S107'DE YERLEŞEN HÜKÜMLER
- **İki-nokta diff merge önizlemesi DEĞİLDİR.** Bayat tabanlı dalda master'ın sonraki merge'leri SİLME olarak görünür; imza bayatlık kanıtıdır, revert değil. Karar: detached'ta deneme merge + SONUCU master'a diff + adıyla sağkalım kontrolü. `merge-base --is-ancestor` rc=1 = tuzak canlı.
- **Yıkıcı iskele iş komutuyla aynı satıra konmaz** — çoğu zaman iskele hiç gerekmez (`rm -rf` ve `reset --hard`, ikisi de gereksizdi; detached deyim varken reset yok). Repo yasası: no add -A / commit -a / reset --hard.
- **Relay şema gereği tek yönlü:** `relay_inbox_reply_authority CHECK ((direction='to_lane') OR (lane_addr='operator'))` — postgres dahil her rolü bağlar. Şerit raporu = kendi penceresi; kanıt düzlemi dal/PR/rapor (S99-2). Satır sayısı yalnız "boş" der; YASAK ile HİÇ OLMAMIŞ'ı ancak kısıt ayırır.
- **Şeritler kendiliğinden yoklamaz** (`F-S107-LANE-WAKE-MANUAL`) — her tur sahibin "posta"sına bağlı. RELAY-RETURN-PATH-1 kapsamına otonom yoklama da girer.
- **Merge mesajı kanıtlanmamış iddia taşıyamaz** — "fixes X" değil "targets the measured mechanism; confirmation owed" (A-REC-S107-1, şerit yakaladı).
- **Onay token'ı yalnız sahipten doğar** — kart, sahip yazmadan "granted" diyemez.
- **consumed_at işlenmişlik kanıtı değildir** (şeritler damgalayamaz).
- **`underpowered` ≠ güvenli** — "ayırt edecek gücüm yok" bir ölçüm eksikliğidir, yeşil değil.

## §6 · OTURUM HİJYENİ
Kuyruk boşaldığında Architect KAPANIŞI ÖNERİR. Tazelik proaktif Architect sorumluluğudur.

## §7 · KAPANIŞ SETİ — yedi belge, biri eksikse kapanış eksiktir
register · KB · bug-bucket · bootstrap · implementation-order · AG-boots · session-close.
<!-- END v108 -->
