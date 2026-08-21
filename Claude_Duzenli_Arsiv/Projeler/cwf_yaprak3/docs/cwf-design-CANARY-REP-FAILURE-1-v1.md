# TASARIM NOTU · `CANARY-REP-FAILURE-1` · v1 — teşhis + karar

<!-- cwf-design-CANARY-REP-FAILURE-1-v1 · 2026-08-11 · S93.
     Yürüyüş kalemi #35 (rollout v3_0). Register v96 §4 ve §8.1'in borcu.
     Bu not FAZ PROMPTU DEĞİLDİR — sahip ratifikasyonundan sonra prompt kesilir.
     Zemin: origin/master 0de5ffdd98a1a855132bc80a71a7be50f070beef (rev 226),
     taze klon, 2026-08-11. Her sayı bu oturumda hesaplandı (D-3). -->

## §0 · TEK CÜMLE

Rep'ler "flake" yüzünden düşmüyor: **replay cevap defteri, modele BOŞ şema
gösterip kaydedilmiş argümanların birebir hash'ini şart koşuyor** — modelin
tahmin edemeyeceği tek bir argüman değeri bir spesimeni kalıcı olarak
ölçülemez yapıyor; ve düşen rep, jeton yakıp sessizce atılıyor.

## §1 · S92'NİN HİPOTEZİ ÖLÇÜMLE DÜZELTİLDİ

Register v96 §4 şöyle diyordu: *"koşudan koşuya SALINIYOR; spesimene çivili
değil."* Spesimen kırılımı çapraz okununca bu **yarı yanlış** çıktı:

| spesimen (kısa) | b5da685 | c2f7dfd | 0de5ffd | toplam |
|---|---|---|---|---|
| `056b094a` | 0/3 | 3/3 | 1/3 | 4/9 |
| `0be09a0d` | 3/3 | 3/3 | 2/3 | 8/9 |
| `3b16b694` | **0/3** | **0/3** | **0/3** | **0/9** |

Yani **iki ayrı sınıf** var: biri çivili (`3b16b694` üç koşuda da tam sıfır),
biri rep düzeyinde değişken. "Salınım" tek bir olgu değil, iki olgunun
toplamı. Ortam/yarış hipotezi de aşağıda ölçümle elendi.

## §2 · ÇOK DAHA BÜYÜK BİR ÖLÇÜM: KANARYA YALNIZ DEĞİL

`golden_run_chunks` — altın kapının (Layer 2 publish gate) rep düzeyindeki
kendi defteri, chunk başına **tek rep**, 20 spesimen × 20 chunk:

| ölçüm | değer |
|---|---|
| toplam chunk | **400** |
| `scoredReps = 0` olan chunk | **282 (%70,5)** |
| `status='failed'` olan chunk | **0** |
| `error` alanı dolu chunk | **0** |
| toplam jeton | **9.778.985** |
| sıfır skorlu chunk'ların yaktığı jeton | **8.036.930 (%82,2)** |

**Yorum:** kusur kanaryaya özgü değil. Yayın kapısı da aynı zeminde koşuyor;
onun Wilson aralıkları da niyet edilen N'in üçte biri üzerinde hesaplanıyor.
Ve 400 rep'in hiçbiri `failed` ya da `error` işaretlenmemiş — **bu bir sessiz
ölçüm kesintisidir**, S89-1 GATE-JURISDICTION md.4'ün ihlali (sessiz kalan
kapı sessizliğini kaydetmeli).

## §3 · SEBEP BAYTA BAĞLANDI (S73-1)

### 3.1 · Rep'in `ok:false` dönebileceği TAM İKİ yer

`api/cwf/_lib/replay/taskFn.ts`:
- **:221-227** — `missPolicy === 'strict' && stats.misses > 0` →
  `ReplayStubMissError`. Bu yol **stream'i tamamladıktan SONRA** döner;
  `base.usage` :211-215'te çoktan atanmıştır ⇒ **jeton harcanmıştır**.
- **:255-266** — `catch`: fırlatan bir rep. Bu yolda `base.usage`
  atanmamıştır ⇒ **jeton = 0**.

### 3.2 · Ayırt edici ölçüldü: fırlatma sınıfı SIFIR

| chunk sınıfı | adet | jeton = 0 | jeton > 0 | ort. jeton |
|---|---|---|---|---|
| skorlanan | 118 | **0** | 118 | 14.763 |
| sıfır skorlu | 282 | **0** | 282 | **28.500** |

Sıfır skorlu 282 chunk'ın **hiçbirinde** jeton sıfır değil. Fırlatma sınıfı
tamamen elenir: **282'sinin 282'si strict-miss yolundan geçti.** Üstelik
düşen bir rep, skorlanan bir rep'in **~1,93 katı** jeton yakıyor — model
kayıtlı yoldan saptıkça daha çok araç çağırıyor.

Kanarya bağımsız olarak aynı yönü doğruluyor: 6 düşük rep'li koşu 264.438
jeton, 3 düşük rep'li koşu 210.742 jeton.

### 3.3 · Ve miss'in doğduğu bayt

`api/cwf/_lib/replay/stubTools.ts`:
- **:140** defter anahtarı: `${toolName}#${canonicalArgsHash(entry.args)}`
- **:148-155** arama: anahtar yoksa `misses++` → strict'te **fırlat**
- **:175** modele gösterilen şema: **`{ type: 'object', properties: {} }`**

Yani model, **hiçbir parametre şeması görmeden** kaydedilmiş argüman
nesnesini **birebir** üretmek zorunda. Bir anahtar fazlası, farklı bir tarih
biçimi, farklı yazılmış tek bir değer → farklı hash → miss → rep ölür.
`resolve_time_range` ve meta-araçlar gerçek şemalarıyla kayıtlı (:194, :205,
:210); **yalnız MCP araçları kör.**

### 3.4 · Ölçüm bunu da doğruluyor (argüman-tahmin edilebilirliği)

| spesimen | argümanlı kayıt | en çok arg anahtarı | 20 chunk'ta skor |
|---|---|---|---|
| `a2588454` / `74407986` | 0 | 0 | **20/20 · 20/20** |
| `bb85fea2` | 7 | 2 | 20/20 |
| `056b094a` | 3 | 2 | 20/20 |
| `0be09a0d` | 3 | 3 | 11/20 |
| `9ab97e5c` / `3b16b694` | 6 / 8 | 4 | **0/20 · 0/20** |
| `7fa515d7` | 1 | **1** | **0/20** |

Argüman **sayısı** tek başına belirleyici değil (`7fa515d7`: tek çağrı, tek
anahtar, yine de 0/20). Belirleyici olan **değerin tahmin edilebilirliği**:
opak tek bir kimlik ya da serbest metin, spesimeni kalıcı olarak ölçülemez
yapmaya yetiyor. **20 altın spesimenin 14'ü fiilen replay edilemez.**

## §4 · İKİNCİ, BAĞIMSIZ KUSUR: TABAN = TAVAN

- Governed `quota.evalCiSpecimenCap` = **3** (min 1, **max 5**), kaynak `db`.
- `picked = [...goldenSet].sort().slice(0, cap)` — 20 spesimenin **sözlük
  sırasına göre** ilk 3'ü. Temsil değil, alfabe.
- `EVAL_CI_REPS` = `GOLDEN_MIN_REPS` = 3 ⇒ **tavan = 3 × 3 = 9 rep.**
- `CLEAN_ARMS_MIN_N = GOLDEN_MIN_REPS × 3 = **9**` (`goldenRun.ts:83`) ve
  `:237` bunu **iki kolda birden** arıyor.

**Sonuç: tabanla tavan eşit.** Rep kusuru tamamen çözülse bile
`clean_both_arms`, iki ardışık koşunun 9 rep'inin **18'inin de** kusursuz
olmasını gerektirir. Marj sıfır. Jeton bütçesi bağlayıcı değil: 2.000.000
governed bütçenin koşu başına yalnız **~%12,5**'i harcanıyor.

## §5 · ÜÇÜNCÜ KUSUR: SEBEP HİÇBİR YERE YAZILMIYOR

`aggregate.failedReps` dört tüketicide var (`canaryRun.ts:171`,
`admin/replay.ts:101,127`, `eval-ci.ts:258`) — ama **sebebi taşıyan hiçbir
alan hiçbir yere yazılmıyor**:

- `reps[].failure.name` üretiliyor (`taskFn.ts:226,262`) ve **her tüketicide
  düşüyor**.
- `aggregate.stubMisses` — ayırt edici sayı — `admin/replay.ts:102`'de var,
  **kanarya havuzunda yok** (`CanaryPooled`, `canaryRun.ts:65-81`).
- Altın chunk digest'i (`goldenBatchRunner.ts:125-131`) beş sayaç taşıyor,
  hiçbiri sebep değil; `catch` yalnız **fırlatmayı** yakalar — strict-miss
  fırlatmadığı için chunk `DONE` yazılır ve log **"ok"** basar.

Bu, **F-S92-2'nin bir kat altındaki aynı kusur**: sayı taşınıyor, sebep
pooling sınırında düşüyor. `empty≠zero` ilkesinin kardeşi burada
**"düştü ≠ neden düştü"**.

## §6 · ELENEN HİPOTEZLER (ölçümle, tartışmayla değil)

| hipotez | eleme kanıtı |
|---|---|
| Jeton bütçesi kesiyor | üç koşuda da `completed:true`; `aborted` null |
| Spesimen yüklenemiyor | üç koşuda da her spesimen `ok:true`, `errorName:null` |
| Ortam/yarış (transient) | 282/282 düşük rep jeton yakmış ⇒ hepsi tam stream sonrası strict-miss; fırlatma sınıfı = 0 |
| Spesimene çivili tek kusur | `056b094a` temmuzda 20/20, bugün 4/9 — çivili değil, tahmin edilebilirliğe bağlı |
| Kanaryaya özgü | altın kapı 282/400 aynı sınıftan düşüyor |

## §7 · KARAR — TEK YOL (menü yok)

Üç adım, **bu sırayla**. Sıra pazarlık konusu değil: 1'siz 2'nin etkisi
ölçülemez (kör yama), 2'siz 3 yalnızca daha çok jeton yakar.

### K-1 · ÖNCE ATIF (dürüstlük katmanı)
Rep düşüşünün **sebebi** pooling sınırından geçirilir: `CanaryPooled` ve
spesimen digest'i `stubMisses` + hata-adı dökümü taşır; altın chunk digest'i
aynı alanı alır; `eval-ci` satırı ve `04` yüzeyi bunu gösterir. Kapı sessiz
kaldığında sessizliğini **sebebiyle** kaydeder (S89-1 md.4).
*Bu adım hiçbir davranışı değiştirmez — yalnız görünür kılar.*

### K-2 · SONRA CEVAP DEFTERİ (asıl kusur)
İki hamle, ikisi de birlikte:
- **(a)** MCP stub araçları, kayıtlı çağrılardan türetilen **gerçek şemayla**
  duyurulur (boş `properties: {}` ölür) — model doğru anahtarları görür.
- **(b)** `lookup()` **isim düzeyinde yedek** kazanır: birebir
  `name#argsHash` bulunamazsa aynı araç adının kaydı sunulur, ve bu
  **`servedByName` olarak ayrı sayılır** — rep'e iliştirilir, gizlenmez.
  *Bu yeni bir taviz değil:* defter **zaten** kuyruk tükendiğinde `last`'ı
  yeniden sunuyor (`stubTools.ts:156`) — ilke kabul edilmiş, kapsamı dar.

### K-3 · EN SON KAPASİTE (marj)
K-2'nin etkisi ölçüldükten **sonra** governed `quota.evalCiSpecimenCap`
3 → **5** (izinli tavan). Tavan 9 → 15 olur, 9 tabanının marjı doğar.
⚠ `goldenSetHash` picked alt kümeden hesaplandığı için değişir ⇒ değişimden
sonraki **ilk koşu `baseline:absent`** olur; bu beklenen ve yeşildir, bedeli
tek koşudur.

## §8 · SAHİBİN RATİFİYE ETMESİ GEREKENLER

Bunlar Architect'in tek başına alamayacağı kararlardır — çünkü **"replay"in
ne demek olduğunu** değiştirirler:

- **R-1 · İsim düzeyinde yedek kabul mü?** Model, birebir sormadığı bir çağrının
  cevabını alır. Sadakat düşer, ölçülebilirlik doğar; her yedek sayılır ve
  görünür. *Architect tavsiyesi: EVET.*
- **R-2 · Yedekle beslenen rep hüküm kanıtı sayılsın mı?** *Architect
  tavsiyesi: EVET — ama `servedByName` sayacıyla ayrı görünür. HAYIR demek,
  bugünkü sıfır-kanıt durumunu korumaktır.*
- **R-3 · Kapasite 3 → 5.** Koşu maliyeti ~250k → ~420k jeton; governed 2M
  bütçenin ~%21'i, aylık koşu tavanı 60. *Architect tavsiyesi: EVET, ama
  K-2'den SONRA.*

## §9 · ADIYLA KUYRUĞA GİREN YENİ KALEM (S82-6 — ertelenmiyor, adlanıyor)

**`GOLDEN-SET-REPLAYABILITY-1`** — altın kümenin üyeliği ve kanaryanın alt
küme seçimi. İki ayrı sorun: (a) 20 spesimenin 14'ü bugün replay edilemez;
(b) alt küme **sözlük sırasıyla** seçiliyor — ölçüm aleti kendi örneklemini
alfabeye göre seçiyor. **Tetik:** K-2 sevk edildikten sonraki ilk kanarya
okuması (S63-1). Kümeyi "stub'ın sunabildiği" spesimenlere göre budamak
YASAK — alet kendi örneklemini seçemez.

## §10 · BU NOTUN SINIRLARI (TOTAL-45)

- Argüman **değerleri** okunmadı; yalnız anahtar SAYILARI toplandı — W-038
  sınıfı sızıntı riski yok, ama "hangi değer tahmin edilemez" sorusu bu notta
  **ölçülmedi**, K-1 onu görünür kılacak.
- `golden_run_chunks` ölçümü **2026-07-14** tarihli tek koşudur; bugünkü
  kanarya bağımsız olarak aynı sınıfı gösteriyor, ama ikisi bayt-aynı
  koşullar değil.
- `056b094a`'nın 20/20 → 4/9 gerilemesi **açıklanmadı**. Hipotez üretmedim;
  K-1 sevk edilince sebep tek sorguyla okunur.

<!-- END · cwf-design-CANARY-REP-FAILURE-1-v1 -->
