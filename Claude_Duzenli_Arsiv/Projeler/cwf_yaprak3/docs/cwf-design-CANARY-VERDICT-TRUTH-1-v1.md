# TASARIM NOTU · `CANARY-VERDICT-TRUTH-1` · v1

<!-- cwf-design-CANARY-VERDICT-TRUTH-1-v1 · 2026-08-10 · S92.
     Yürüyüş kalemi #1 (rollout v2_9). Eski adı CANARY-POWER-1 (S92-H2).
     Bu not FAZ PROMPTU DEĞİLDİR — sahip onayından sonra prompt kesilir. -->

## §1 · ÖLÇÜM (S92 açılışında canlıdan okundu, iddia değil)

`replay_audit` üzerinde `outcome->>'canary'='true'`, 2026-07-12 21:14 →
2026-08-09 23:45 (28 gün):

| `decision.verdict` | `decision.kind` | adet |
|---|---|---|
| `underpowered` | `compared` | **111** |
| `(null)` | `baseline:absent` | 22 |
| `underpowered` | `advisory:promptRev-changed` | 3 |

**`non_regressing` = 0. `regression` = 0. 136 koşuda kanarya bir kez bile hüküm
vermedi.** Ortalama `scoredReps` 9'da **3,74**; min 0, max 10.

## §2 · ÜÇ KUSUR, ÜÇÜ DE BAYTA DAYALI

### F-S92-1 · Kural "evet" diyemiyor — aritmetik olarak

`api/cwf/_lib/replay/goldenRun.ts:122`

```ts
function separated(a, b) { return a !== null && b !== null && (a.high < b.low || b.high < a.low); }
```

`wilsonInterval(0, n)` için `p = 0` ⇒ `low = 0` (clamp değil, cebirsel olarak:
`center = half` olduğundan `center - half = 0`). Yani **her iki kolda da sıfır
olay gözlendiğinde her iki aralığın `low`'u 0'dır** ve `a.high < 0` imkânsızdır.

> **`separated` sağlıklı bir sistemde HER N'de false döner.** n=3 için de,
> n=10.000 için de. Bu bir güç sorunu değil, kuralın kendisi.

Sonuç: `goldenVerdict` sağlıklı bir koşuda yalnız `underpowered` üretebilir.
`non_regressing` **ulaşılamaz durumdadır** ve etiketin adı ("güç yetersiz")
teşhisi 111 koşu boyunca yanlış yöne yolladı.

### F-S92-2 · Defter, ölçemediğini ölçmüş gibi yazıyor

`api/admin/eval-ci.ts:202`

```ts
reps_completed: batch.specimens.filter((s) => s.ok).length * batch.repsPerSpecimen,
```

`s.ok`, specimen'in **fırlatmadığı** anlamına gelir — rep düzeyindeki başarı
değil. Rep başarısızlığı `runExperiment.ts:257`'de `failedReps` olarak
hesaplanır ve `CanaryPooled`'da karşılığı olmadığı için **havuzlama sınırında
düşer**. Üç kanıt satırı:

| tarih (TR) | defter `reps_completed` | gerçek `scoredReps` | token | `completed` |
|---|---|---|---|---|
| 2026-08-03 02:19 | **9** | **0** | 291.937 | `true` |
| 2026-08-03 17:08 | **9** | **0** | 296.182 | `true` |
| 2026-08-06 08:04 | **9** | **0** | 336.957 | `true` |

Üstelik `emptyCount` yalnız skorlanan rep'ler üzerinden sayıldığı için
(`runExperiment.ts:219`), hiçbir şey ölçmeyen koşu deftere **`emptyCount: 0`**
yazar — *"her cevap doluydu"* ile *"hiç cevap yoktu"* **birebir aynı**.
Bu `empty≠zero`'nun ihlalidir ve MEASURE-READ-HONESTY-1 sınıfıdır:
**"okuyamadım", "temiz okudum" diye kaydediliyor.**

Ayrıca `batch.specimens[]` (her specimen'in `scored`/`empty`/`violation`
kırılımı) hesaplanıp **audit satırına hiç yazılmıyor** — atıf da kayboluyor.

### F-S92-3 · Okuma yüzeyi var olmayan bir alanı basıyor

`.github/workflows/build-test.yml:212`

```bash
jq '{decision, completed, pooled, tokensTotal, baselineRunId, goldenSetHash, promptRev, commitSha, verdict}'
```

Uç noktanın yanıtında **üst seviye `verdict` alanı yoktur** (`eval-ci.ts:229-246`);
gerçek hüküm `decision.verdict`'tedir. Kapı mantığı (`:214`, `:222`, `:226`)
doğru alanı okuyor. Yani **kapı on merge boyunca doğru çalıştı, RAPOR yanlış
okudu.** "verdict: null" hiç var olmamış bir alandır.

## §3 · GİZLİ TUZAK — kusur kanaryaya AİT DEĞİL

`goldenVerdict` **dört tüketicisi** olan paylaşılan bir organdır:

| Tüketici | Rolü | Eylem yüklemi |
|---|---|---|
| `canaryRun.ts:184` | deploy sonrası kanarya | *(yok — yalnız kaydeder)* |
| `goldenBatchRunner.ts:226` → `goldenPublishContract.ts:94` | **YÖNETİŞİM PUBLISH KAPISI** | `verdict === 'regression'` ⇒ reddet |
| `rolloutGuardrail.ts:149` → `api/admin/rollouts.ts:267` | **ilerlemeli dağıtım guardrail'i (L5)** | `verdict === 'regression'` ⇒ 409 / durdur |
| `publishGovernedContentCore.ts:179` | kapılı publish betiği | kayıt |

**İki sonuç:**

1. **Kanaryayı yerel bir sarmalayıcıyla düzeltmek, kusuru dört yerin birinde
   düzeltmek olur.** Publish kapısı ve rollout guardrail'i, tertemiz bir
   sıfır-sıfır koşusu için sonsuza dek "underpowered" demeye devam eder.
   Bu, kanıtlanmış katmanın üstüne yama (S73-1) ve yarım organ (S82-6) olur.
   **Düzeltme paylaşılan kuralda yapılır.**

2. **Ama üçünün de eylem yüklemi `=== 'regression'`** — bu, kod içinde zaten
   yazılı bir tasarım (`rolloutGuardrail.ts:44-45`). Yani **ek bir hüküm kelimesi
   davranışsal olarak ATIL'dır** ve bu ispatlanabilir. Genişletme güvenlidir;
   koşulu, atıllığın teste çivilenmesidir.

**Ve asıl bulgu:** `underpowered` bugün **iki ayrı iş** yapıyor — istatistiksel
bir hüküm VE "karar veremem / bakmadım" nöbetçisi (`rolloutGuardrail.ts:144`
güç tabanı, L1 param zorlaması). Bu tam olarak **S89-1 KAPI-YETKİ YASASI madde
4**'ün yasakladığı şey: *"yetkim yok" ile "baktım, temiz" görünür şekilde ayrı
olmalı.* Verdict organı o yasadan ÖNCE yazıldı; bu faz onu yasaya uyduruyor.

## §4 · TASARIM

### 4.1 · Hüküm sözlüğü — S91'de zaten sevk edilmiş dörtlüyü tekrar kullan

`GATE-SILENCE-VISIBILITY-1` (merged `5d92d81`) BurstGuard için kapalı bir
dörtlü mintledi: `tripped · watched · no-jurisdiction · not-consulted`.
**Yeni bir sözlük icat edilmiyor; ratifiye edilmiş olan uygulanıyor.**

`GOLDEN_VERDICTS` üçten beşe çıkar (**tamamen ADDITIVE**):

| Hüküm | Anlamı | Bloke eder mi? |
|---|---|---|
| `regression` | Aday, tabandan ayrışacak kadar kötü | **EVET** *(tek eyleyen, değişmedi)* |
| `non_regressing` | Ayrışıyor ve kötü değil | hayır *(değişmedi)* |
| `clean_both_arms` | **İki kolda da sıfır olumsuz olay**, her kolun N'i tabanın üstünde | hayır — **gözlem, sertifika değil** |
| `underpowered` | En az bir kolda sıfırdan farklı oran var, aralıklar örtüşüyor | hayır *(DARALTILDI)* |
| `no_jurisdiction` | Bir kol hiç skorlamadı / aralık yok / okuma başarısız | hayır — **"bakamadım"** |

**Üç yasa, tasarımın belkemiği:**

- **`clean_both_arms` bir iyileşme iddiası DEĞİLDİR.** Adı "temiz", "geçti"
  değil; yanında **daima N'ini taşır** (F-M1F3-3 emsali: istatistik, hesaplandığı
  N ile birlikte gösterilir). Sağlıklı bir sistemin doğru cevabıdır ve bugün
  söylenemiyor.
- **`no_jurisdiction` `underpowered`'dan ayrılır.** `rolloutGuardrail`'in iki
  zorlama noktası (`:144` güç tabanı, L1 param) `underpowered`'dan **çıkar**,
  `no_jurisdiction`'a taşınır; mevcut `forced` alanı korunur. Bir nöbetçi
  değeri, istatistiksel bir hükmün kelimesini ödünç alamaz.
- **Eylem yüklemi ASLA genişlemez.** Üç tüketicide de `=== 'regression'` aynen
  kalır; yeni hiçbir kelime bloke edemez. Bu, bir yorum değil **test**tir
  (§6 M1).

### 4.2 · `N` tabanı — kodda, yönetilen değil

`clean_both_arms` için asgari N bir **kod sabiti**dir, governed param DEĞİL.
Gerekçe tek cümle: **yönetilen bir taban, bir publish'in kendi sertifikasını
genişletmesine izin verir.** Taban `GOLDEN_MIN_REPS`'ten türetilir ve hükümle
birlikte daima basılır; altındaki koşu `no_jurisdiction` alır, "temiz" değil.

### 4.3 · Defter dürüstleşir

- `CanaryPooled` **`failedReps`** kazanır (`runExperiment`'ta zaten hesaplanıyor,
  yalnız taşınmıyor).
- `reps_completed` **türetilmeyi bırakır**: `scoredReps + failedReps`, ÖLÇÜLMÜŞ.
- `scoredReps === 0` ⇒ `emptyCount` **`null`**, asla `0` (empty≠zero).
- `batch.specimens[]` digest'i audit satırına girer — atıf geri gelir.
- `completed` bayrağının anlamı **değişmez** (specimen düzeyi); rep düzeyi ayrı
  ve adıyla raporlanır. İki farklı gerçeğe iki farklı alan.

### 4.4 · Okuma yüzeyi

`build-test.yml`'in jq projeksiyonundan **hayalet `verdict` anahtarı silinir**;
`.decision.verdict` + `.decision.n` basılır. CI notice'ı hükmün **kendi adını**
ve N'ini yazar — bir daha "null" yazamaz.

## §5 · BU FAZ NE YAPMIYOR (adlandırılmış erteleme, gizli değil)

**9 rep'in 5-6'sı neden başarısız oluyor?** Bilmiyoruz — çünkü F-S92-2 tam da
onu saklıyordu. Bu faz **görünür kılar, teşhis etmez.**

> **`CANARY-REP-FAILURE-1`** — tetiği bu fazın deploy sonrası İLK okumasıdır
> (S63-1: merge kanıt değil, canlı ölçüm kanıttır). Ölçülecek: yeni
> `failedReps` alanının üretimdeki ilk üç kanarya koşusundaki değeri ve
> `specimens[].error` adları. Erteleme değil — **ölçüm-tetikli sıralama**, ve
> tetiği bu fazın kendisi kuruyor.

## §6 · POZİTİF KONTROLLER (S66-1 · kanıtlanamayan düzeltme düzeltme değildir)

| # | Mutasyon / kontrol | Kırmızı olması gereken |
|---|---|---|
| M1 | Bir tüketicinin eylem yüklemini `!== 'regression'` yönünde genişlet | Üç tüketici için de ayrı ayrı kırmızı — yeni kelime bloke ETMEMELİ |
| M2 | Sıfır-sıfır kolları besle | `clean_both_arms` + N; **asla** `underpowered` |
| M3 | `scoredReps: 0` besle | `no_jurisdiction`; **asla** `clean_both_arms`, ve `emptyCount` **null** |
| M4 | Bilinen bir regresyon tohumla | `regression` — eski davranış aynen |
| M5 | `failedReps` taşımasını sil | `reps_completed` ölçüm testi kırmızı |
| M6 | jq'ya hayalet `verdict` anahtarını geri koy | Workflow kontrat testi kırmızı |
| M7 | `rolloutGuardrail`'in zorlamasını `underpowered`'a geri al | Nöbetçi-ayrımı testi kırmızı |

**Sıfır-tarama tabanı (S66-1):** M1'in "üç tüketici" sayımı sıfır dönerse test
**başarısız olur** — kendi kendini doğrulayan sıfır kabul edilmez.

## §7 · SINIRLAR

Migration **yok**. Operator adımı **yok**. Governed publish **yok**.
`evalGate` semantiği **dokunulmaz**. `wilsonInterval` matematiği **dokunulmaz**
(C-C: aralık matematiği bu fazda yeniden türetilmez — yalnız hükmün
kelimeleri ve deftere yazılanlar değişir).

<!-- END · cwf-design-CANARY-VERDICT-TRUTH-1-v1 -->
