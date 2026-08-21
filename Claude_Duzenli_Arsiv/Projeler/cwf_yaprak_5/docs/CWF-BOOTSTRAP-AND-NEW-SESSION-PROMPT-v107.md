# CWF — BOOTSTRAP & YENİ OTURUM PROMPTU · v107 (S107 açılışı)

<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v107 · 2026-08-18. v106'yı GEÇERSİZ
     KILAR. ÇAPA tablosu S106 kapanışında ÖLÇÜLDÜ. Taze klonda DOĞRULANMADAN
     faz kartı kesilmez. BÜTÜN yazıldı. -->

## §1 · ÇAPA TABLOSU (S107 açılışında TAZE KLONDA DOĞRULANACAK)

| Ölçüm | S106 kapanış değeri |
|---|---|
| `git rev-parse origin/master` | `8f8dd2a9345f6a61c3ac9b9dba41c62543cf99f1` |
| docVersion | **rev 284 · 2026-08-18** |
| `git ls-remote --heads origin` | **yalnız master** (phase/* = 0 ref) |
| Açık PR | **0** (son: #291 MERGED) |
| vitest | **659** dosya / **9346** test |
| `vercel.json` crons | **9** girdi; `/api/admin/vector-index` = `50 3 * * *` |
| `ALLOWED_KIND_SUFFIXES` | `['glossary_term','tool_doc','zone','entity_alias']` |
| Üretim `[Vector]` | son okuma `hits=0 corpusSize=0 queueDepth=0` |

⚠ **Bu tablo bir İDDİADIR (TOTAL-45).** Doğrulanmadan öncül yapılmaz.

## §2 · AÇILIŞ SIRASI (bağlayıcı)

1. `cwf-memory-seed-CWF5-v1` oku — hafızanın yerine geçer.
2. Bu dosyayı oku, **ÇAPA tablosunu taze klonda doğrula**.
3. `cwf-open-items-register-v109` · `CWF-SESSION-GRAPH-KB-v106` ·
   `REGISTER-BUG-BUCKET-v42` · `cwf-implementation-order-S106-v19` oku.
4. **CONSTITUTION.md ayna md5 preflight**: kutudaki nüsha ile `docs/laws/`
   arasında fark = ayna bayat → **repo kazanır + bug kaydı**.
   ⚠ `F-S106-CONSTITUTION-MIRROR-STALE` AÇIK — bu preflight'ın onarımı bekliyor.
5. **SOTA-1 POZİTİF KONTROLÜ**: Architect ilk mesajda SOTA-1'i **kelimesi
   kelimesine** yeniden yazar (S66-1). Yokluğu = oturum yanlış açıldı.

## §3 · İLK İŞ (sıra bağlayıcı, tartışmasız)

**`PHASE-SEAL-DERIVE-1`** — AG-2 kutusunda **DAMGASIZ** bekliyor.
- id `2581cd7b-b176-42fb-aa1e-939da86029f9` · md5 `2c6b6265656f1dd1b3e290d6e72c385b` · 3858 char
- Bekleme sözleşmesi (STEP 0) **KARŞILANDI** — iki dal da origin'den silindi.
- Sahibe tek söz: **"AG-2'ye posta"**.
- DO NOT MERGE — adlı onay ayrıca istenecek.

**İkinci iş:** ⏰ **03:50 UTC cron atışından sonra** üretim logları okunur;
`[VectorIndex]` satırı + `[Vector] corpusSize` — **#81 orada kapanır.**

**Üçüncü iş:** **#29 A23** kartı (son SOTA anahtarı, W1 düştü, kesilebilir).

## §4 · ŞERİT BOOT KAPSAMI (S106'da DÖRT kez ısırdı)

Her AG boot metni açılışta şu dört git iznini **kapsam olarak** ister:
`git checkout --detach` · `git merge` · `git push` · `git worktree`.
Gerekçe kayıtta: `F-S106-LANE-PERMISSION-SCOPE-INCOMPLETE`. Bir şerit reddi
aşmaz, durur ve rapor eder — bu doğru davranıştır; kusur boot kapsamındadır.

## §5 · S106'DA YERLEŞEN HÜKÜMLER (kart yazarken uygulanır)

- **Yetki bir kotadır, tetikleyici değil.** GO kartları "ölç, zaten doğruysa
  tekrar icra etme" satırını taşır.
- **`$?` borusuz okunur** — dört canlı yalan gözlendi.
- **Bayt-aynılık HAM commit nesnesine karşı** doğrulanır; `--format=%B` newline
  ekler.
- **Ardıl kuralı iniş-anıdır** — SEAL-DERIVE inene kadar geçerli; indikten sonra
  GO şablonlarından mühür adımı **kalıcı olarak silinir**.
- **Sahibe komut yazdırılmaz.** Bir adımın cevabı "insan komut yazar" ise
  tasarım yanlıştır.
- **Kartlar KISA tutulur** (`F-S106-ARCHITECT-TRANSPORT-DRIFT`).

## §6 · OTURUM HİJYENİ (A-REC-S106-1'in yasası)

**Kuyruk boşaldığında Architect KAPANIŞI ÖNERİR**, sıradaki kartı ateşlemez.
Oturum tazeliği Architect'in **proaktif** sorumluluğudur; sahibin hatırlatması
gerekiyorsa Architect geç kalmıştır.

## §7 · KAPANIŞ SETİ (her oturum sonunda BÜTÜN yazılır)

`cwf-open-items-register-v*` · `CWF-SESSION-GRAPH-KB-v*` ·
`REGISTER-BUG-BUCKET-v*` · `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v*` ·
`cwf-implementation-order-S*-v*` · `S*-AG-BOOTS-v*` · `CWF-S*-SESSION-CLOSE-v*`.
**Yedi belge. Biri eksikse kapanış eksiktir.**

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v107 -->
