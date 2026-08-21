# PHASE `WAVE2-CONTENT-1` — Stage content in the human voice · docs bridge as a TYPE · the three renames

<!-- claude-code-PHASE-WAVE2-CONTENT-1-v1 · rev 1 · 2026-07-13 · Session 40.
     Author: Architect. Executor: AG (Claude Code / AntiGravity).
     Design note (binding): cwf-wave2-content-voice-design-v1_2.
     Code floor this prompt was written against: origin/master b753783 · 2116 tests / 207 files
     · docVersion rev 70 · drift [OK] · CI green.
     Ceremony profile: FULL (multi-file). Client-only ⇒ NO reseal, NO docVersion bump. -->

---

## 0 · PRE-FLIGHT GATE (do not write a single line until all four pass)

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak
git rev-parse origin/master        # MUST equal b753783e1566520db6291627011d1ec8c1f1d201
npm ci --no-audit --no-fund --silent
npx tsx scripts/checkDocDrift.ts   # MUST print [OK]
npx vitest run --reporter=dot      # MUST be 2116 passed / 207 files
```

If any of the four disagrees: **STOP and report.** Do not "fix forward".

---

## 1 · WHY THIS PHASE EXISTS (read this, it changes how you write code here)

The Stages tab shipped in S37 and the owner walked all 15 cards. His verdict:
*"beni bir yere getiriyor; ne yapacağım, neyi bekleyeceğim — bilmiyorum."*

The content is not **wrong**. It answers *"what is this?"* and never *"what do I do, and what will
I see?"* It was written by the Architect, in the Architect's voice, for a reader who already holds
the system's vocabulary. It cites laws by number. It names tables. It opens a gate and stops.

This phase fixes that — and, more importantly, makes the fix **impossible to lose**:

- the voice becomes a **test** (`voiceGate.test.ts`),
- the docs bridge becomes a **type** (a card without a doc link will not typecheck),
- the "what will you do" beat becomes a **required field**.

**You are not writing the copy.** Every Turkish string in §5 is authored and is to be transplanted
**verbatim** — including punctuation, `**bold**` and `` `code` `` markers, and the ` ' ` escaping
style already used in the file. If a string looks odd to you, it is still the string. Report, do
not improve.

---

## 2 · BINDING CONSTRAINTS (violating any one of these fails review)

1. **S39-2 — master ONLY via a reviewed PR.** Push a branch, open a PR (that is what fires CI).
   Never push to master. Never merge without the Architect's verbatim `-m` message.
2. **CLIENT-ONLY.** You may touch **only** `src/**`. Zero diff under `api/**`, `shared/**`,
   `supabase/**`, `scripts/**`, `vercel.json`, `public/architecture/**`. The doc-drift manifest maps
   only `api/**`/`shared/**`/`vercel.json`, so this phase carries **no reseal and no docVersion
   bump** — and the drift gate must still print `[OK]` at the end. If you find yourself needing an
   `api/**` edit, **STOP and report**; the phase scope is wrong, not the constraint.
3. **No new endpoint, no new server field, no schema change.** Everything needed is already on the
   client.
4. **`?tab=` ids do NOT change** (G2, decided). Only the *visible labels* move. Any change to the
   `TABS` array itself is out of scope.
5. **No `.md` files under `public/docs/`.** The six user docs are `WAVE2-DOCS-1`'s job. This phase
   declares their slugs as a *planned set* and nothing more (§4.2).
6. **Turkish-only for stage content** (carried from UI-STAGES-1 C-15). Panel copy keeps its existing
   `t(tr, en)` pairs where they already exist.
7. **No behavior change outside content + labels + the F38 visual + the F53 hint pair.** No layout
   regrouping (that is `WAVE2-IA-1`), no Rules restructuring (that is `WAVE2-IA-2`).
8. **CHANGELOG entry in-branch**, in the same PR (`.agents/` changelog convention).
9. Test count will move (new gate file + `adminLegibility.test.ts` auto-generates 2 tests per admin
   `.tsx` — you are adding **no new admin `.tsx`**, so that generator should contribute **0** new
   tests; if it does contribute, say so explicitly in the report).

---

## 3 · SUB-PHASE A — the type contract (do this FIRST, before any content)

### A1 · `src/docs/registry.ts` — split "planned" from "shipped"

Today the file exports `DOCS_REGISTRY` (one row: `microscope-replay`) and `DEFAULT_DOC_SLUG`.
Add — **without touching the existing row or `DEFAULT_DOC_SLUG`**:

```ts
/**
 * WAVE2-CONTENT-1 — the PLANNED user-doc set. This is the slug vocabulary the Stages
 * cards are allowed to link to; DOCS_REGISTRY is the set that actually SHIPS today.
 * The two converge in WAVE2-DOCS-1 (its exit criterion: every DOC_SLUGS entry has a
 * DOCS_REGISTRY row). Until then a card may reference a planned-but-unwritten doc and
 * the UI simply renders NO link — never a dead link, never a "coming soon" stub.
 */
export const DOC_SLUGS = [
    'nasil-calisir',
    'turler-ve-kurallar',
    'arac-eslemesi',
    'veri-otoritesi',
    'microscope-replay',
    'sandbox-ve-yayin',
] as const;

export type DocSlug = (typeof DOC_SLUGS)[number];

/** The href for a doc slug, or null when the doc is planned but not yet written. */
export function docHref(slug: DocSlug): string | null {
    return DOCS_REGISTRY.some((d) => d.slug === slug) ? `/docs/${slug}` : null;
}
```

**Note the fifth slug:** `microscope-replay` is the doc that already exists — reuse it, do not mint
`mikroskop-tekrar-oynatma`. (Its *title* is already Turkish; only the slug is English, and slugs are
URLs, not copy.)

### A2 · `src/components/admin/stagesRegistry.ts` — two field changes

In `interface StageEntry`:

- `try?: string;` → **`try: string;`** (required — beat 3 is now mandatory).
- add **`docs: { slug: DocSlug; anchor?: string };`** (required), importing `DocSlug` **type-only**
  from `../../docs/registry` (keep the module client-safe: it already imports nothing from `api/**`,
  and `registry.ts` is client code — this is legal).

Both changes must make the file **fail to compile** until every card is filled in. That is the point.

### A3 · `src/components/admin/StagesTab.tsx` — render the doc link

For each card, render a `📖` link **only when `docHref(stage.docs.slug)` is non-null**, pointing at
`href + (anchor ? '#' + anchor : '')`. Label: `t('Belgeyi oku', 'Read the doc')` — or the existing
sibling-chip idiom if one is already established in that file; match the local style, do not invent
a new one. When `docHref` returns null, render **nothing** (no disabled chip, no tooltip, no
placeholder).

Add `data-testid="stage-doc-link"` on the anchor.

---

## 4 · SUB-PHASE B — the gate (`voiceGate.test.ts`)

New file: `src/components/admin/__tests__/voiceGate.test.ts`.

### B1 · The forbidden vocabulary

```ts
const FORBIDDEN: RegExp[] = [
    /§\s*\d/,                    // §7
    /\bRULE[-\s]?\d+/i,          // RULE 28
    /\bADR-\d{3}/,               // ADR-001
    /\bOBS-\d(\.\d)?/,           // OBS-3.1
    /\bL[1-5]\b/,                // L3
    /\bS\d{2}-\d\b/,             // S36-1
    /\bC-?\d{1,2}\b/,            // C-9d, C1
    /\b[0-9a-f]{7,40}\b/,        // commit SHA
    /\bFIX-\d|\bPHASE\b|\bWAVE\d/i,
];
```

### B2 · The three assertions

1. **Beats 1–3 are clean.** For every `STAGES` entry, the strings `purpose`, `tweak`, `try` and
   every `sources[].role` must match **none** of `FORBIDDEN`.
2. **Beat 4 is fenced.** For every `deep[]` entry, `law` and `text` may contain a forbidden token
   **only inside a parenthesised span**. Implement mechanically: strip every `\([^)]*\)` span from
   the string, then apply `FORBIDDEN` to the remainder. A hit in the remainder fails, and the
   failure message must name the stage `no`, the field, and the offending match.
3. **Every card is complete.** Every `STAGES` entry has a non-empty `try`, a `docs.slug` that is a
   member of `DOC_SLUGS`, and every `sources[]` entry with a `target: {tab}` has a non-empty `role`.

### B3 · The §4.1 assertion (the one that is NOT about stages)

`TweakTab.tsx`'s primer copy must contain the session-scoped sentence — because the Turkish label
"Sandbox Ortamı" does **not** carry the session-scoping that the English "Session Sandbox" does.
Pin the exact string as a substring assertion against the component's copy:

> `Buradaki değişiklikler yalnızca senin oturumunda ve yalnızca sen çıkana kadar yaşar; kimsenin gördüğü sistemi değiştirmez.`

Where the string lives is your call (the panel's existing primer/`InlineHelp` copy), but the test
must fail if it is deleted. If `TweakTab.tsx` has no primer today, add one using the panel's own
`InlineHelp` idiom (`adminUi.tsx:138`) — **collapsible, not dismissible** (that is the F32 rule
already shipped).

---

## 5 · SUB-PHASE C — the content (TRANSPLANT VERBATIM)

Replace the `purpose` / `tweak` / `try` / `deep` / `docs` of each card with what follows.
**`spans[]`, `sources[]` (kind/name/sub/writes/target/codePath), `no`, `id`, `title`, `tag`,
`heart`, `pre` do not change** — except each `sources[].role` string, which is given below where it
changes. Anything not listed keeps its current value byte-for-byte.

> A note on what changed and why, so you can sanity-check yourself: every `purpose` now opens in the
> **user's** world, not the system's. Every `tweak` names a **consequence** before a capability.
> Every card now has a `try` — the concrete next action. Every internal identifier moved into `deep`,
> inside parentheses. Nothing was deleted from `deep` except where a sentence existed only to name a
> law; the ideas all survive.

---

### 00 · Kota Kapısı

```
purpose: 'Sen bir soru sormadan önce, sistem o soruya harcayacağı bütçeyi ayırır. Aylık token bütçen bittiyse turn hiç başlamaz — yarım cevap, sürpriz fatura yoktur.',
tweak: 'Bütçeyi büyütürsen daha çok soru sorulur ve maliyet artar; küçültürsen kullanıcılar gün ortasında duvara toslar. Üç politika değeri kalıcı olarak Kurallar\'da yaşar; bir oturum KENDİ bütçesini genişletemez — bu bilinçli bir kilittir, yoksa herkes kendine sınırsız yetki verirdi.',
try: 'Kota panelinde kendine düşük bir aylık sınır ver, bir soru sor, İncele\'de rezerve→mahsup satırlarını gör, sonra sınırı kaldır. Beş dakika sürer ve kapının nasıl çalıştığını bir daha unutmazsın.',
docs: { slug: 'nasil-calisir', anchor: 'kota-kapisi' },
```

`deep`:
```
{law:'Neden soru sorulmadan önce?', text:'Önce tahmini maliyet ayrılır, gerçek kullanım sınırdan geçer, cevap bitince hesap kapatılır. Böylece "önce harca, sonra say" hiç yaşanmaz — bütçe aşımı bir sürpriz değil, imkânsızlıktır.'},
{law:'Neden oturum kendi bütçesini büyütemiyor?', text:'Bir oturumun kendi sınırını genişletebilmesi, yetki yükseltmenin en sessiz yoludur. Bu yüzden kota politikası yalnızca kalıcı kuralardan değişir; tek kişiye istisna tanımak ayrı ve iz bırakan bir yüzeydir (Kota paneli).'},
{law:'İzi nerede bulursun?', text:'Bu kapının kendi iz kaydı yoktur — çünkü kapı, turn\'ün dışındadır. Ne olduğunu İncele\'deki kota satırlarından okursun.'},
```

---

### 01 · Kullanıcı Sorgusu

```
purpose: 'Sorun sisteme girer. Yanında, o an açtıysan, yalnızca senin oturumunda geçerli deneme bayrakları da gelir. Turn\'ün kaydı burada açılır.',
tweak: 'Burada kalıcı bir ayar yoktur; burası deneme bayraklarının taşıyıcısıdır. Bir bayrağı açıp aynı soruyu sorduğunda cevabın nasıl değiştiğini görürsün — ve yanlış açarsan yalnızca kendi oturumun etkilenir, kimsenin sistemi değişmez.',
try: 'Sandbox Ortamı\'nda bir bayrak aç, bir soru sor; İncele\'de o turn\'ün satırını bul ve oradaki iz linkiyle aynı turn\'ün ayrıntılı ağacına geç. Üç ayrı ekranda aynı olayı görmen gerekir.',
docs: { slug: 'nasil-calisir', anchor: 'kullanici-sorgusu' },
```

`deep`:
```
{law:'Burada karar alınmaz', text:'Bayraklar istekle birlikte gelir ama yetkiyi SUNUCU verir. İstemcinin "ben yetkiliyim" demesi hiçbir kapıyı açmaz — kapı her zaman sunucu tarafındadır.'},
{law:'Tek turn, tek kimlik', text:'Bir turn\'ün tek bir kimliği vardır ve log satırı, iz ağacı ve olay kaydı hepsi AYNI kimlikten türer. İkinci bir kimlik basmak yasaktır (RULE 28) — üç ekranda aynı olayı bulabilmen tam olarak bu kurala borçlu.'},
```

---

### 02 · Konuşma / Durum

```
purpose: 'Kim olduğun, neyi görmeye yetkin olduğun ve hangi backend\'lere erişebildiğin çözülür; konuşmanın geçmişi yüklenir.',
tweak: 'Bir kullanıcı bir paneli göremiyorsa çözüm rolünü şişirmek DEĞİLDİR — eksik olan yetkiyi tanımlayıp atamaktır. Kapılar kodda tanımlıdır; kime hangi kapının açıldığı ise veridir ve Kullanıcı Yönetimi\'nden değişir.',
try: 'Kullanıcı Yönetimi\'nde bir kullanıcının backend kapsamını daralt, o kullanıcıyla bir soru sor: sunulan araç setinin küçüldüğünü Araç Eşleme lens\'inde gör. Sonra geri al.',
docs: { slug: 'nasil-calisir', anchor: 'konusma-durum' },
```

`sources[].role` değişiklikleri: yok (mevcutlar korunur).

`deep`:
```
{law:'Rol değil, yetki', text:'Kod hiçbir yerde "bu kişi admin mi?" diye sormaz; "bu kişinin şu yetkisi var mı?" diye sorar. Rol yalnızca bir yetki paketidir. Yeni bir ihtiyaç = yeni yetki tanımı (yapı, kodda) + atama (veri, panelde). Rol adına göre dallanmak yasaktır.'},
{law:'Kapsam neyi belirler?', text:'Kullanıcının backend kapsamı, 07\'de sunulacak araç listesini besler. Konuşma kaydı ise çift görevlidir: hem geçmiş penceresi (05), hem de sonradan tekrar oynatacağın numunelerin kaynağı.'},
{law:'Sık yapılan hata', text:'"Şu paneli görsün diye rolünü büyüteyim." Bunu yaptığın an o kişiye görmemesi gereken beş şeyi de açmış olursun. Doğrusu: gereken yetkiyi ata, panel görünürlüğü kendiliğinden gelsin.'},
```

---

### 03 · Niyet / Anlama

```
purpose: 'Sorunun hangi konuya girdiği anlaşılır: sistem, geçmiş turn\'lerden öğrendiği kelime→konu eşlemesine bakar. "Fire" dediğinde hurda araçlarına, "OEE" dediğinde verimlilik araçlarına yönelmesi buradan gelir.',
tweak: 'Yanlış eşleme cevabı yanlışlamaz — sadece doğru aracı geç buldurur. Öğrenilen eşlemeyi Araç Eşleme ekranında görürsün: tek tek düzeltebilir ya da tüm öğrenmeyi bir hamlede tazeleyebilirsin.',
try: 'Araç Eşleme\'de bir kelimenin öğrenilmiş eşlemesini bul. Sandbox Ortamı\'nda bu katmanı atlayan bayrağı açıp aynı soruyu sor; iki turn\'ü Tekrar Oynat\'ın araç lens\'inde karşılaştır — hangi araçların sunulduğu değişecek.',
docs: { slug: 'arac-eslemesi' },
```

`deep`:
```
{law:'Öğrenme bulmayı iyileştirir, bilmeyi değil', text:'Bu ayrım platformun bel kemiğidir. Öğrenilen eşleme yalnızca "hangi araçlar aday" sorusuna etki eder; "cevap doğru mu" sorusuna ASLA. En kötü ihtimalle araç geç bulunur — cevap yanlışlanmaz.'},
{law:'Tazeleme nasıl çalışır?', text:'Temizle düğmesi satırları silmez, öğrenmenin sürümünü ilerletir: eski öğrenmelerin tamamı tek hamlede geçersizleşir. Nokta atışı düzeltmek istersen taslak yazıp yayınlarsın — taslak kişiseldir, yayın yetki ister.'},
{law:'İzi nerede?', text:'Bu katmanın ayrı bir iz kaydı yoktur; çıkarım 07\'nin araç-kayıt adımının içinde koşar. Oradaki çipten izlersin.'},
```

---

### 04 · Planlama / Ayrıştırma

```
purpose: 'Ayrı bir planlayıcı yoktur. Model, planını araç döngüsünün (11) içinde adım adım kurar: bir araç çağırır, sonucu görür, bir sonrakine karar verir.',
tweak: 'Bugün burada ayar yüzeyi yok — ve bu bir eksiklik değil, bir karar. Planlayıcı geldiği gün, plan şablonları doğuştan governed olacak: kod referansı, versiyonlu değer ve oturumluk deneme — 06 ve 09\'un bugünkü deseninin birebir kopyası.',
try: 'Bir çok-adımlı soru sor ("Glazur3\'ün dünkü OEE\'si ve fire oranı"). İz ağacında modelin araçları hangi sırayla çağırdığını izle — plan orada, adım adım görünür.',
docs: { slug: 'nasil-calisir', anchor: 'planlama' },
```

`deep`:
```
{law:'Neden boş bırakıldı?', text:'Erken planlayıcı, erken karmaşıklıktır. Bugünkü görev tipinde model döngü içinde yeterince iyi plan yapıyor ve her adımı ölçülebiliyor. Ayrı bir planlayıcı, gerçek bir çok-adımlı ihtiyaç KANITLANINCA gelir — tahminle değil.'},
{law:'Geldiği günkü şekli', text:'Plan şablonları "önce kur, sonra yönet" olmayacak: ilk günden kod referansı + versiyonlu DB değeri + oturumluk önizleme ile doğacak. Bu sırayı bir kez bozarsan, geri dönmek yeniden yazmak demektir.'},
```

---

### 05 · Bellek Getirme

```
purpose: 'Konuşmanın son birkaç mesajı modele verilir; böylece "peki ya dün?" dediğinde neyin devamı olduğunu bilir. Kullanıcıya özel uzun vadeli bellek YOKTUR — sistem seni turn\'ler arasında hatırlamaz.',
tweak: 'Pencereyi büyütürsen model daha çok bağlam görür ama daha çok token harcar ve eski konular yeni cevaba sızmaya başlar; küçültürsen ucuzlar ama unutkanlaşır. Doğru değer görev tipine bağlıdır — bu yüzden kodda gömülü değil, Kurallar\'da bir satırdır.',
try: 'Sandbox Ortamı\'nda pencereyi 4\'e indir, çok turlu bir konuşmada eski bir detayı sor. Sonra 12\'ye çıkarıp aynısını tekrarla. Farkı Tekrar Oynat\'ta yan yana gör — kalıcı hiçbir şey değiştirmeden.',
docs: { slug: 'nasil-calisir', anchor: 'bellek' },
```

`deep`:
```
{law:'Tek yol, tek sınır', text:'Pencere boyu her ayar gibi TEK bir zincirden çözülür — oturumluk deneme, sonra yayınlanmış değer, sonra kod tabanı — ve her kaynak AYNI alt/üst sınırdan geçer. Zehirli bir veritabanı satırı da, uçuk bir oturum değeri de aynı kapıda kırpılır. Dağınık "yoksa şunu al" zincirleri bu yolda yasaktır (OBS-3.1 dersi).'},
{law:'Bağlam bedava değildir', text:'Daha çok geçmiş her zaman daha iyi cevap demek değildir: bağlam şiştikçe modelin dikkati dağılır ve eski konular yeni cevaba sızar. Bu yüzden pencereyi "ne olur ne olmaz" diye büyütmek bir iyileştirme değil, ölçülmemiş bir risktir.'},
```

---

### 06 · Bilgi / RAG

```
purpose: 'Ajanın fabrika hakkında NE BİLDİĞİ burada yüklenir: hatlar, metrik tanımları, kör noktalar, araç kullanım kuralları. Bunlar kodda değil, yönetilen kurallarda yaşar — yani sen değiştirebilirsin, deploy gerekmez.',
tweak: 'Bir kuralı değiştirdiğinde ajanın bir sonraki cevabı değişir — bu yüzden yayın bir kapıdan geçer: şema, tutarlılık ve davranış kontrolleri. Kapı atlanamaz. Yanlış giden yayını geri alırsın; en kötü gün "referansa sıfırla" düğmesi hep oradadır.',
try: 'Bir taslak yaz, Sandbox Ortamı\'nda yalnızca kendi oturumunda önizle, sonra yayınlamadan sil. Üretim hiçbir şey fark etmez — riski sıfır bir provadır ve gerçek yayın akışının aynısını öğretir.',
docs: { slug: 'turler-ve-kurallar' },
```

`deep`:
```
{law:'Bilgi nerede yaşar?', text:'Çalışma anında tek doğruluk kaynağı yönetilen veritabanıdır. Koddaki referansın tam üç görevi vardır: ilk tohum, "referansa sıfırla" hedefi ve kesinti tabanı. Veritabanı çökse bile ajan bilgi-kör kalmaz — ve "veri yok" ile "sıfır" ayrımı o kesintide bile ayakta durur. Bu deseni ters çevirmek (kod asıl, veritabanı isteğe bağlı) YASAKTIR.'},
{law:'Zehirlenmeye karşı ne var?', text:'Çekirdek türlerin ŞEKLİ koda kilitlidir — yapı zehirlenemez. DEĞERLER veritabanındadır ama yalnızca sunucu tarafındaki kapıdan geçerek yayınlanır; istemcinin doğrudan yayın yapması reddedilir. Yanlış yayın geri alınır.'},
{law:'Taslaklar üretimi göremez', text:'Taslak satırları yalnızca oturumluk önizlemede okunur; üretim yolu o tabloyu hiç görmez. Taslağın kazara sızma riski disiplinle değil, YAPIYLA sıfırdır.'},
```

`sources[].role` değişiklikleri:
- `referenceSchema` → `role: 'İlk tohum · "referansa sıfırla" hedefi · kesinti tabanı'`

---

### 07 · Araç Seçimi

```
purpose: 'Model araçları BİLMEZ — bulur. Bu aşamada ona sunulacak araç listesi kurulur: öğrenilmiş eşlemenin adayları, senin kapsamının izin verdikleri ve her zaman dahil edilen bir taban. Liste asla boş kalamaz.',
tweak: 'Yanlış eşleme kurtarılabilir bir hatadır — araç geç bulunur, cevap yine doğrudur. Ama sunulmayan bir araç, cevabı olmayan bir soru demektir. "Bu aracı neden kullanmadı?" dediğinde bakılacak yer burasıdır: eşleme mi kaçırdı, kapsam mı kesti, bağlantı mı düştü.',
try: 'Araç Eşleme\'de Temizle ile öğrenmeyi tazele, aynı soruyu tekrar sor ve sunulan araç setinin değiştiğini iz ağacındaki araç-kayıt adımından izle. Bir de Tekrar Oynat\'ın araç lens\'inde "çağırdı ama sunulmamıştı" sinyalini ara — varsa elinde bir regresyon kanıtı var demektir.',
docs: { slug: 'arac-eslemesi' },
```

`deep`:
```
{law:'Sunulan liste nasıl doğar?', text:'Önce konu adayları, sonra senin kapsam filtren, sonra her koşulda eklenen taban. Tabanın anlamı şudur: öğrenme ne kadar bozulursa bozulsun, sunulan liste asla boşalamaz. Bu güvence disiplinden değil, TASARIMDAN gelir — oturumluk bir bayrak bile onu düşüremez.'},
{law:'En değerli sinyal', text:'Model, kendisine SUNULMAYAN bir aracı çağırmaya kalktıysa, elinde bir yönlendirme regresyonunun deterministik kanıtı var demektir — kanaat değil, kayıtlı turn üzerinde ölçüm.'},
{law:'Anahtarlar', text:'Backend token\'ları referansla taşınır: arayüz yalnızca env adını ve maskeyi görür; değer hiçbir ekrana, log\'a veya ize yazılmaz (ADR-007).'},
```

---

### 08 · Sıkıştırma

```
purpose: 'Bir araç 18 fabrikanın tüm hatlarını döndürdüğünde, bu yığın olduğu gibi modele verilmez: bir tutamağa bağlanır ve model ona deterministik sorgu araçlarıyla erişir. Özetleme YOKTUR — bilinçli olarak.',
tweak: 'Bugün burada ayar yüzeyi yok; eşikler kodda. Özetleyici bir gün gelirse, bayraklı ve versiyonlu gelecek — sessizce açılmayacak. Çünkü özetleme, sessiz bilgi kaybının en kibar adıdır ve burası sayılarla çalışan bir ajandır.',
try: 'Büyük sonuç döndüren bir soru sor (tüm hatların listesi gibi). İz ağacında araç sonucunun boyutunu gör, sonra modelin o yığını nasıl sorguladığını izle — ham veriye erişiyor, bir özete değil.',
docs: { slug: 'nasil-calisir', anchor: 'sikistirma' },
```

`deep`:
```
{law:'Neden özet yok?', text:'Bir özetleyici, sayıyı yanlış yuvarladığında bunu kimse fark etmez — ve o andan itibaren "özetin doğruluğu" diye yeni bir güven sorunun olur. Bunun yerine büyük sonuç bir tutamak alır; model ham veriye deterministik olarak sorar. Kaybolan bir bilgi yoktur.'},
{law:'Ne zaman değişir?', text:'Eşikler ve olası bir özetleyici birlikte ertelendi. Tetik açık: üretimde ilk gerçek bağlam taşması. O gün geldiğinde eşikler yönetilen satırlara taşınır, özetleyici bayrakla ve ölçümle gelir.'},
```

---

### 09 · Prompt Kurulumu

```
purpose: 'Ajanın kim olduğu, neye dikkat edeceği, nasıl konuşacağı ve araçları nasıl kullanacağı — hepsi burada tek bir metinde birleşir. Bu metin kodda değil: 20 yönetilen parçadan kurulur. Yani ajanın kişiliğini deploy etmeden değiştirebilirsin.',
tweak: 'Bir parçanın metnini değiştirdiğinde ajanın TÜM cevapları değişir — bu yüzden yayın, işaretlediğin altın örnekler üzerinde bir kontrol koşusundan geçmeden yapılamaz: "bu metin, eskiden doğru olan hangi cevabı bozuyor?" sorusu yayından ÖNCE cevaplanır. Parçaların LİSTESİ yapıdır (kod işi); parçaların METNİ değerdir (senin işin).',
try: 'Bir parça için taslak yaz, Sandbox Ortamı\'nda yalnızca kendi oturumunda dene. Beğenirsen Aşamalı Yayın\'da %0\'lık aday olarak sahneye koy ve yayınlamadan geri çek — her adım iz bırakır.',
docs: { slug: 'turler-ve-kurallar', anchor: 'prompt-parcalari' },
```

`deep`:
```
{law:'Yapı ile değer ayrımı', text:'Parçaların kimlikleri koda kilitlidir — yeni bir parça eklemek bir kod işidir. Parçaların METNİ ise versiyonlu, kapıdan geçen, geri alınabilir bir değerdir. Güvenlik metinleri bile bu desendedir; ama güvenlik alanının kod tabanının ALTINA inememesi ayrıca kilitlidir.'},
{law:'Yayın öncesi kontrol koşusu', text:'İşaretlenmiş altın örnekler üzerinde bir lens koşusu geçilmeden metin yayınlanamaz. Bu, "değiştirdim, umarım bozulmamıştır" ile "değiştirdim, neyin bozulmadığını KANITLADIM" arasındaki farktır.'},
{law:'Damga', text:'Her turn, hangi metin sürümüyle koştuğunu üzerine yazar. Bir hafta sonra "bu cevabı hangi ayarlar üretti?" sorusunun tek doğru cevabı o damgadır. Ayrıca araç içeriği sistem metnine ASLA karışamaz — bu bir yapı testiyle kilitlidir.'},
```

---

### 10 · LLM Çıkarımı

```
purpose: 'Model çağrılır. Hangi sağlayıcı, hangi model, hangi sıcaklık — hepsi yönetilen satırlardan gelir, kodda gömülü değil. Tek bir kapıdan geçilir; ikinci bir çağrı noktası yoktur.',
tweak: 'Sıcaklığı yükseltirsen cevaplar çeşitlenir ama sayısal tutarlılık düşer — burası fabrika verisi konuşan bir ajan, bu takas ucuz değildir. Sağlayıcı eklemek bir satır işidir, migration değil. Model boş cevap dönerse ekran ASLA boş kalmaz: dürüst bir mesaj ve sınırlı bir yeniden deneme devreye girer.',
try: 'Sandbox Ortamı\'nda sağlayıcıyı sabitleyip aynı soruyu iki farklı modele sor; iki turn\'ün iz kayıtlarını yan yana koy — token, gecikme, sonuç. Kalıcı hiçbir şeyi değiştirmeden bir A/B yapmış olursun.',
docs: { slug: 'sandbox-ve-yayin', anchor: 'saglayicilar' },
```

`deep`:
```
{law:'Tek kapı yasası', text:'Her sağlayıcı aynı çağrı noktasından geçer ve telemetri yalnızca orada açılır. Yeni bir model, bilinen bir aile içindeyse governed bir SATIRDIR; bilinmeyen bir aile ise kodda hata fırlatır. Bu, "sessizce yeni bir yol açıldı" durumunu imkânsız kılar.'},
{law:'Boş cevap tabanı', text:'Boş ya da bozuk bir cevap asla boş ekran olmaz: dürüst mesaj + AYNI sağlayıcıda sınırlı yeniden deneme. Hata anında sessizce başka bir modele geçmek yasaktır — çünkü o, kimsenin ölçmediği bir davranış değişikliğidir.'},
{law:'Kişisel sağlayıcı', text:'Sahibine kilitlidir ve anahtarı referansla taşınır. Tekrar Oynat kişisel sağlayıcıyla koşabilir: üretim trafiğine hiç dokunmadan model karşılaştırması yaparsın.'},
```

---

### 11 · Araç Döngüsü

```
purpose: 'Ajanın canlı elleri. ARMES ve Superset\'e gerçek çağrılar burada yapılır — ve cevabın ASIL İÇERİĞİ hiçbir tabloda durmaz, her seferinde canlı gelir. Döngü sınırlıdır: model sonsuza kadar araç çağıramaz.',
tweak: 'Burada "cevabı düzeltmek" diye bir şey yoktur. Tablolar çerçeveyi verir — ajan neyi bilir, neye güvenir, nasıl konuşur; içeriği backend verir. Bir sayı yanlışsa ya çerçeve yanlıştır (06/09/12\'ye bak) ya da backend yanlış söylüyordur — ikisi çok farklı işlerdir.',
try: 'Bir OEE sorusu sor ve iz ağacında araç çağrısını aç: hangi backend, hangi araç, hangi argümanlarla, kaç milisaniyede, ne kadar veri. Sonra aynı turn\'ü İncele\'deki araç satırıyla eşleştir — tek kimlik, iki ekran.',
docs: { slug: 'nasil-calisir', anchor: 'arac-dongusu' },
```

`deep`:
```
{law:'Çerçeve ve içerik', text:'Bu platformun kalp taşlarından biri: yönetilen tablolar ajanın NE bileceğini, NEYE güveneceğini ve NASIL konuşacağını belirler; ham içerik her turn canlı gelir. Bu yüzden "cevabı düzelten tablo" aramazsın — çerçeveyi düzeltirsin.'},
{law:'Tekrar oynatmanın hammaddesi', text:'Her çağrının ham sonucu turn kaydına yazılır ve tekrar oynatmanın girdisi HER ZAMAN odur; redakte edilmiş telemetri asla girdi olmaz. Her deneme ayrı bir iz düğümüdür: yeniden denemeler, süreler, boyutlar tek tek görünür.'},
{law:'Sınırlı döngü', text:'Araç turu sayısı üstten sınırlıdır — kaçak bir döngü yapısal olarak imkânsızdır. Bu sınır bugün kodda yaşıyor; yönetilen bir satıra taşınması sırada.'},
```

---

### 12 · Doğrulama

```
purpose: 'Cevap sana gösterilmeden önce, deterministik bir kod onu denetler: boşluk sıfır diye sunulmuş mu, sayı uydurulmuş mu, kaynağın yetkisi buna yetiyor mu. Bu denetimi bir yapay zekâ YAPMAZ — bir modelin başka bir modeli yargılaması burada yasaktır.',
tweak: 'Bir backend\'in yetkisini kısarsan, onun ürettiği bazı cevaplar artık "kesin bilgi" sayılmaz — ve bunun GEÇMİŞ cevapları nasıl etkileyeceğini, tek bir token harcamadan önceden görebilirsin. Denetim motoru mekanik olarak kilitlidir; senin yüzeyin yetki haritası ve üç ölçüm lens\'idir.',
try: 'Tekrar Oynat\'ta bir numune seç ve kapsam/yetki lens\'ini koştur. Sonra Veri Otoritesi\'nde tek bir yetkiyi değiştirsen verdiktin nasıl döneceğini fark ekranında gör — değişikliği yapmadan önce.',
docs: { slug: 'veri-otoritesi' },
```

`deep`:
```
{law:'Zararsız yapmak, dürüst yapmak değil', text:'Yalan söyleyen ya da yanılan bir backend\'i DÜRÜST yapmaya çalışmayız — ZARARSIZ yaparız: çıktısı kontrol altında, kaynağına atıflı, gerekirse karantinada. Doğrulama asla bir modelin kanaati değildir (ADR-001).'},
{law:'"Veri yok" ile "sıfır" arasındaki fark', text:'İhlal, boşluğu MİKTAR SIFIR olarak sunmaktır — "0 adet üretildi" gibi. Boş bir sonuç için "veri yok" demek ihlal değil, İTAATTİR. Bu ayrım gerçek bir hatayla bilendi: kapı bir ara kendi önerdiği "veri dönmedi" cümlesine ceza kesiyordu.'},
{law:'Yakalama iyi bir gündür', text:'Denetim bir ihlali yakaladığında sistem hata vermemiştir — sistem seni KORUMUŞTUR. Yanlış bir sayı sana ulaşmadan durdurulmuştur.'},
```

---

### 13 · Biçim / Sunum

```
purpose: 'Cevap ekrana çıkarken dört durum asla karışmaz: gerçek 0 bir veridir (çizilir) · eksik değer bir boşluktur (boş bırakılır) · sonuç yoksa "veri yok" denir · sayısal olmayan şey çizilmez. Ve boş bir cevap asla boş ekran olmaz.',
tweak: 'Bu DAVRANIŞ mekaniktir, değiştirilemez. Ama kullanıcının o anda okuduğu CÜMLE yönetilen bir metindir — tonunu beğenmiyorsan davranışı değil, sözcükleri değiştirirsin, ve o değişiklik versiyonlu ve geri alınabilir.',
try: 'Verisi olmayan bir hat için (barkodsuz bir hattın hurdası gibi) soru sor. Cevabın "0" değil, "ARMES\'te görünmüyor" demesi gerekir. Öyle demiyorsa elinde gerçek bir hata var — İncele\'de o turn\'ü işaretle.',
docs: { slug: 'veri-otoritesi', anchor: 'bos-degil-sifir' },
```

`deep`:
```
{law:'Dörtlü ayrım', text:'Grafik makroları bu ayrımı korur ve tekrar oynatmanın puanlayıcısı da AYNI ayrımı puanlar. Yani üretim ile ölçüm aynı dili konuşur — biri "veri yok" derken diğeri "0" saymaz.'},
{law:'Davranış ve dil', text:'"Boş asla boş ekran olmaz" bir davranıştır: mekanik taban, dokunulmaz. Kullanıcının okuduğu cümle ise dildir: yönetilen, versiyonlu, geri alınabilir. Bu iki kutuyu karıştıran her istek, yanlış yerde çözülür.'},
```

---

### 14 · Bellek Güncelleme

```
purpose: 'Turn kalıcılaşır: konuşma, mesajlar ve ham araç sonuçları kaydedilir — bir sonraki tekrar-oynatma numunesi tam olarak burada doğar. Sistemin öğrendiği TEK şey, kelime→araç eşlemesidir. Bilgi öğrenmez.',
tweak: 'Öğrenilen eşlemeyi görür, düzeltir ve geri alırsın — hepsi Araç Eşleme\'de. Kaydetme mekaniktir; "şunu unutsun" diye bir düğme yoktur, çünkü sistemin bilgisi zaten yalnızca yönetilen kurallardan gelir (06).',
try: 'Bir soru sor, Araç Eşleme\'de az önce yazılan öğrenme satırını bul. Tekrar Oynat\'ın araç lens\'inde kod tabanı ile canlı arasındaki farkta aynı satırı gör, sonra Temizle ile geri al. Sistemin tüm "öğrenmesi" budur — ve tek hamlede geri alınır.',
docs: { slug: 'arac-eslemesi', anchor: 'ogrenme' },
```

`deep`:
```
{law:'Deney, hammaddesini kirletemez', text:'Canlı turn kaydına YALNIZCA canlı turn yazar; tekrar oynatma ve yönetim yolları o tabloya asla yazamaz. Böylece ölçtüğün şey, ölçme eyleminden etkilenmez.'},
{law:'Damgalar', text:'Kapanışta turn, hangi metin sürümü, hangi parametre sürümü ve hangi yayın dilimiyle koştuğunu üzerine yazar. Denetlenebilir bir yaşam döngüsünün çekirdeği budur.'},
{law:'Tek öğrenme', text:'"Model zamanla bilgi öğrenir" diye bir mekanizma YOKTUR. Öğrenilen tek şey eşlemedir, farkı lens\'te birebir görünür ve Temizle tek hamlede geri alır. Bilgi yalnızca 06\'nın kapılı yolundan değişir.'},
```

---

## 6 · SUB-PHASE D — the three renames (G2: ids stay, labels move)

`src/components/admin/adminTabs.ts` → `tabLabel()` only:

| tab id (unchanged) | old label | **new label** |
|---|---|---|
| `routing` | `t('Yönlendirme', 'Routing')` | **`t('Araç Eşleme', 'Tool Matching')`** |
| `trust` | `t('Backend Güveni', 'Backend Trust')` | **`t('Veri Otoritesi', 'Data Authority')`** |
| `tweak` | `t('Ayarla', 'Tweak')` | **`t('Sandbox Ortamı', 'Session Sandbox')`** |

Then sweep: `grep -rn "Yönlendirme\|Backend Güveni\|Ayarla" src/` and update any hand-written label
that duplicates a tab name **in a navigational sense** (headings, breadcrumbs, arrival strips, nav
chips). Do **not** rewrite ordinary prose that merely contains the word. `adminTabs.test.ts` pins
labels — update it. Report every file you touched in this sweep.

---

## 7 · SUB-PHASE E — the two panel fixes

### E1 · F38 — a grounding catch must not look like an error

`InspectTab.tsx:104` classifies a row as a grounding violation; today it renders as a red ⚠ with the
raw string `grounding_violation`. That is backwards: **a catch is the system protecting the user.**

- Replace the red-alarm treatment with a **shield** icon (`ShieldCheck` from lucide-react) in the
  panel's "good/positive" token colour — not `destructive`, not amber.
- Replace the raw kind string with:
  `t('Yakalandı — bir kaynak, verisi olmayan bir sonucu "0" gibi sunmaya çalıştı. Cevabın doğru kaldı.', 'Caught — a source tried to present missing data as "0". Your answer stayed correct.')`
- Keep the raw payload visible in the expanded row (nothing is hidden — only the *framing* changes).
- `data-testid="grounding-catch"` on the badge; pin it in a test: a `grounding_violation` payload
  renders the catch copy and does **not** carry the destructive class.

### E2 · F53 — the golden bucket hint is single-language

`GOLDEN_BUCKETS` (in `goldenCoverage.ts`) carries `labelTr`/`labelEn` but a single `hint`, rendered
raw at `ReplayTab.tsx:~232`. Add `hintTr` / `hintEn` (move the existing string into `hintTr`, author
the English), render via `t(b.hintTr, b.hintEn)`, and delete the old `hint` field so no caller can
regress. Pin one assertion per language.

---

## 8 · SELF-VERIFICATION (evidence, not adjectives — paste each into the report)

1. `git rev-parse origin/master` at start = `b753783…`; branch name; PR URL.
2. `git diff --stat b753783..HEAD` — and prove the client-only constraint:
   `git diff --name-only b753783..HEAD -- api shared supabase scripts vercel.json public` must be
   **EMPTY**. Paste the empty result.
3. `npx tsx scripts/checkDocDrift.ts` → `[OK]`, **rev still 70** (no bump — prove it).
4. `npx vitest run --reporter=dot` (UNSHARDED — sharded ≠ CI, S37-2): full pass, and state the new
   count with a per-file explanation of the delta (`voiceGate.test.ts` + the E1/E2 pins).
5. **Prove the type teeth:** temporarily delete one card's `docs` field and paste the `tsc` error;
   temporarily delete one `try` and paste the error. Restore both. This is the phase's core claim —
   demonstrate it, do not assert it.
6. **Prove the gate bites:** temporarily insert `§7` into a `purpose` and paste the failing
   `voiceGate` output naming the stage and field. Restore.
7. `grep -rn "§\|RULE \|ADR-\|OBS-3" src/components/admin/stagesRegistry.ts` — every remaining hit
   must be inside a `deep[]` string **and** inside parentheses. Paste the hits.
8. Screenshot-free but literal: state which stage cards render a `📖` link today (expected: **only**
   those pointing at `microscope-replay` — none of the six new docs exist yet) and confirm no dead
   link renders anywhere.
9. **CI green on the PR head.** Paste the CI conclusion. A local green is not the experiment CI runs.

**Report every deviation.** A deviation disclosed is a design conversation; a deviation discovered
in review is a defect.

---

## 9 · OUT OF SCOPE (do not touch — these are other phases)

- Sandbox panel *layout* regrouping, stage-chip corrections, class badges → `WAVE2-IA-1`.
- Rules/Kinds structure, publish-flow, archived-row filter, role split → `WAVE2-IA-2`.
- Writing the six `.md` docs, panel "📖" links beyond the stage cards, arrival strips → `WAVE2-DOCS-1`.
- The chart's epoch-ms X axis (F63), the chat raw-tool-output input panel (F64), the empty
  `cwf.backend.id` span attribute (F65) → a later phase.

<!-- END · claude-code-PHASE-WAVE2-CONTENT-1-v1 · rev 1 · 2026-07-13 -->
