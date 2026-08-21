# CWF · AÇIK KALEMLER REGISTER'I · v96 — S92 kapanışı

<!-- cwf-open-items-register-v96 · 2026-08-11 · v95'i supersede eder.
     Bağlayıcı sıra: cwf-master-rollout-plan-v3_0. -->

## §0 · ZEMİN (S92 kapanışında, canlıdan HESAPLANDI)

`origin/master` **`0de5ffdd98a1a855132bc80a71a7be50f070beef`** · docVersion
**rev 226** (ikinci-merger açık SET, S90-1) · suite **521 dosya / 6415 test,
0 skip** (Architect'in entegre ağaçtaki bağımsız sayımı; master o ağaçla kod
düzeyinde bayt-aynı) · migration 68 · ADR 13 · GATEWAY_RULES 18/18 ·
üretim `0de5ffd`'ye yakınsadı (kanıt: kanarya satırı 03:27, `gitSha 0de5ffd`).

**S92'nin BEŞ merge'i (üçü yürüyüş kalemi):**
`b5da685` CANARY-VERDICT-TRUTH-1 (rev 224) · `c2f7dfd` STAGE-CONTEXT-TRUTH-1
(rev 225) · `0de5ffd` ROUTING-FLOOR-BACKEND-1 (rev 226) · + `bceb58c` tanık
commit'i · + `b646c01` ikinci-merger reseal commit'i.

## §1 · S92 SAHİP HÜKÜMLERİ (bağlayıcı)

- **H1:** Kapının arkasındaki adsız işler yürüyüşe girdi — B-FRONTIER-PAIRING-1
  (#33) ve AGENTBEATS-INTEGRATION-1 (#34); hakem-model maliyeti #20'nin YAZILI
  kapsamı oldu, ayrı organ kurulmadı.
- **H2:** `CANARY-POWER-1` → **`CANARY-VERDICT-TRUTH-1`** — ad, ölçümün
  çürüttüğü teşhisi taşıyordu.
- **H3:** `cwf-design-CANARY-VERDICT-TRUTH-1-v1` §4 onayı (paylaşılan organda
  additive 5'li sözlük; `clean_both_arms` N tabanı KOD sabiti).
- **H4:** `cwf-design-ROUTING-FLOOR-BACKEND-1-v1` onayı ("onaylı").
- **H5 (elle tanık):** 04 kartı üretimde okundu ve DOĞRU — `recorded` ·
  `live mode` · `plan: derived` · `template: QUERY_MASTER` · `steps: 3` ·
  `replans: 0` (ölçülmüş sıfır) · `gate: no-jurisdiction` · "plan text is not
  persisted" notu ekranda. Eski kopya hiçbir yerde yok.

## §2 · S92'DE KAPANANLAR (üç yürüyüş kalemi + zincirleri)

- **#1 CANARY-VERDICT-TRUTH-1** → `b5da685`. F-S92-1/2/3 kapandı. Dört sapma
  (eksen-kapsamlı kural · tek zorlanmış yol · üçüncü union · `setArm`)
  GO-v1'de ratifiye — §6.1 sapması L5 auto-rollback'i tasarımımın harfiyen
  uygulanmasından KURTARDI. 14/14 mutasyon. Tanık: aletin İLK hükmü
  `no_jurisdiction` + N bloğu; `reps_completed 9 = 3+6 ÖLÇÜLMÜŞ` (önceki
  satır aynı 9'u çarpımla uyduruyordu, yan yana kanıtlı).
- **#3 STAGE-CONTEXT-TRUTH-1** → `c2f7dfd`. 04 kalıcı-ince yalanından çıktı;
  `turn_done.payload.planner` TEK anahtarından üç-durumlu okuma; yol üstünde
  gerçek loader kusuru bulundu ve düzeltildi (üç sonuç tek `null`'a
  katlanıyordu — eski tüketicilere bayt-aynı katlanmış görünüm korunarak).
  10/10 mutasyon. Elle tanık H5.
- **#5 ROUTING-FLOOR-BACKEND-1** → `0de5ffd`. `FLOOR_BY_BACKEND`; platform
  tabanı BOŞ (tenant-zero çalışma zamanında, M1); ÜÇ varsayılan öldü; resolver
  tabanı okuyacağı id listesinin BİRLEŞİMİ (bugün bayt-aynı); **floor
  slice'ında `coveredBackendIds: null` ÖLDÜ** — "atıf bilinemez" tarih oldu.
  Beş kapsam kararı (§7.1-5) GO'da ratifiye — özellikle §7.2: router LLM
  promptu artık çağıranın dilimini alıyor (önceden kod tabanından kurup DB
  dilimiyle filtreliyordu — gerçek tutarsızlık, düz listenin ölümü zorladı).
  8/8 mutasyon kendi kontrolüyle. v1 STOP raporu TAM KABUL edilmişti — üç çit
  koşulu da haklıydı ve ikisi Architect hatasıydı.

## §3 · S92 DOĞUMLU ARCHITECT YASALARI

- **S92-1 (ÇOK-ŞERİT RESEAL PROTOKOLÜ):** Kaynak çitleri ayrık olsa bile
  reseal ORTAK yan-etkidir; `docVersion` tek skalerdir ve iki şerit aynı
  string'i basarsa çakışmasız birleşip bir revizyon kaybettirir. Her
  çok-şeritli dalganın GO'su ikinci-merger adımını taşır: master'ı dala al →
  merged ağaçta reseal → `docVersion`'ı AÇIKÇA SET et → drift 7/7 → sonra
  merge. (S90-1'in operasyonel hâli; bu oturumda probe'da üretildi ve canlıda
  birebir uygulandı.)
- **S92-2 (KESİLMİŞ KANIT KANIT DEĞİLDİR):** `| head` / `| grep -v` filtreli
  bir sayımdan çit veya kapsam yazılmaz — sayım TAM koşulur ve toplam sayı
  raporlanır. (v1 çitini 25 dosyalık gerçeğin 6'sından yazma hatası; AG-2'nin
  STOP'u yakaladı.)
- **S92-3 (SIFIR DÖNEN PROBE ANAHTAR DOĞRULAMADAN KABUL EDİLMEZ):** Bir
  harita/manifest/şema sorgusu sıfır dönerse, anahtar adları gerçek veriyle
  doğrulanmadan "yok" hükmü verilmez (S66-1'in probe hâli — `mappedFiles` vs
  `codeAreas` hatası "reseal gerekmez" yanlış hükmünü üretti).

## §4 · YENİ KALEMLER (S92 doğumlu)

- **#35 CANARY-REP-FAILURE-1** — tetiği ATEŞLENDİ (tasarım §5, S63-1). Üç
  koşuluk ölçüm: `failed/scored` = 6/3 → 3/6 → 6/3; **koşudan koşuya
  SALINIYOR**, spesimene çivili değil; başarısız rep'ler `ok:true` +
  `errorName:null` (fırlatmıyor, sessizce skorlanamaz dönüyor). Baseline hep
  önceki koşu olduğundan N tabana (9) asla ulaşamıyor → **kanaryanın
  konuşabilmesinin tek kapısı bu kalem.** İlk adım Architect teşhisi
  (defter + `runExperiment` skorlanabilirlik sınıflandırıcısı okuması), sonra
  faz.
- **#36 FLOOR-RESYNC-1** — AG-2 §4'ün borcu, F185'in emrettiği yön (taban :=
  bugünün yayınlı hâli). Önceden-var divergence anchor worktree'de kanıtlı:
  `machine-knowledge-base` 0↔1 kategori (5 `knowledge_*` aracı) + armes 8 canlı
  keyword kayması. Backend-anahtarlı taban sayesinde bu sync artık DOĞRU yere
  akar (düz tabanda o 5 araç armes'in outage setine sızardı — fazın tezi canlı
  diff'te görüldü). Küçük: `--report` + `--write` + commit; sahip-sıralamalı.

## §5 · ÖLÇÜLMÜŞ SİSTEM GERÇEKLERİ (S92'de okundu)

- Kanarya üç kez konuştu, üçü de `no_jurisdiction` + N: alet dürüst, güç
  meselesi değil kural meselesiydi — İSPATLANDI (136 koşu, 111 underpowered,
  aritmetik imkânsızlık `separated`'ta bayta bağlandı).
- Üretim planner'ı **live mode'da plan türetiyor** (`QUERY_MASTER`, 3 adım) —
  "planner karanlıkta/sıfır bayt" varsayımı ARTIK ESKİ; kartın kendisi
  düzeltti.
- S89-1 sözlüğü iki organda üretimde görünür: planner `gate: no-jurisdiction`,
  kanarya `no_jurisdiction`.
- `turn_done.payload.planner` — TEK anahtar, tam `TurnPlannerSummary`, her
  post-faz satırda koşulsuz mevcut.
- Suite büyümesi: 518/6322 → **521/6415** (üç fazın net katkısı; iki şerit
  tesadüfen simetrik +1/+30 ölçtü, birleşim öngörüyle birebir).

## §6 · NÖBET / KUSUR (faz açtırmaz) — v29'dan devir + S92 eklemeleri

Devir: W-030 · W-032 · W-033 · W-018 · W-034 (TOOL-ANNOTATION-KIND-MINT-1
adlı iş) · W-035 (`evalGate.ts:160-164` armes bloğu — #13'ün evi) ·
UI-POLISH-NOTE · Gemini+PII 3. nokta · BUG-005 · BUG-014 · BUG-015/016/017
(alet kuyruğu #7-9) · ARMED 010-down · ARMED 029.

**S92 yeni:**
- **W-036** — stage-08 not/başlık uyumsuzluğu: kart adı `Sıkıştırma`
  (`stagesRegistry.ts:243`), PERMANENT_THIN notu "warm altyapıdır". AG-1'in
  M5 mandası altında BİLEREK dokunulmadı; aynı yalan sınıfının adayı.
- **W-037** — `check:tenant-zero` gitignored dosyaları tarıyor: canlı koşu
  için worktree'ye kopyalanan `.env.local` sahte kırmızı üretir. Muafiyet
  veya belgelenmiş not gerek.
- **W-038** — `syncRoutingFloor --report` çıktısı canlı keyword basar ve
  armes `employee` kategorisinde kapılı tenant token'ı VAR: çıktıyı relay
  belgesine yapıştıran kapıyı kızartır. Kural: rapora yapıştırmadan redakte
  (AG-2 yaşadı, redakte etti, kapı yeşil).
- Header SHA rozeti eski bundle'da bayat kalabiliyor (H5 ekranında `c2f7dfd`
  görünürken master `0de5ffd`) — kusur değil, bilinen davranış notu.

## §7 · PARK / TETİKLİ (değişmedi)

ACTION-AUTHORITY-ADR → BACKEND-N8N-1 (CENSUS) · LangGraph · HISTORY-DIET-1
(2F) · MEMORY-HYGIENE-Q · ROUTER-DISTILL-1 · TENANT-CONSOLE / EAIP-TENANT ·
QUERY-CANDIDATE-1.

## §8 · SIRADAKİ ARCHITECT MASASI (şerit işi DEĞİL)

1. **CANARY-REP-FAILURE-1 teşhis notu** — skorlanabilirlik sınıflandırıcısını
   bayta kadar oku, üç koşunun specimen kırılımını çapraz oku, hipotezi
   (ortam/yarış sınıfı, salınımlı) test edecek ölçümü adlandır.
2. **LEARNING-SNAPSHOT-1 tasarım `v1_1` amendi** — S92 şema okuması: beş
   tablonun İKİSİ (`router_proposals`, `tool_category_cache`) çıplak-keyword
   PK, `task_id` izolasyonu MIGRATION'SIZ imkânsız + kodda `task_id` sıfır
   isabet → Operator adımı var, ADR-005 yolu. Ratifikasyona gelecek.
   ⚠ S88-1: bu kalem `router_proposals`'a dokunur — routing-floor artık
   merge'de, çakışma yok; ama gelecek eşleştirmelerde adı geçsin.
3. **FLOOR-RESYNC-1** tek sayfalık talimat (sahip-sıralamalı).

## §9 · BURN-DOWN (payda SAYILIYOR)

> **Yürüyüş kalemleri: 36 · kapanan (S92): 3 (#1 · #3 · #5) · doğan (S92): 2
> (#35 · #36) · AÇIK: 33 · uçuşta: 0.**

SOTA kapısı: **0/7** — S92'nin üç merge'i kapı anahtarı değildi (dürüstlük ve
altyapı borçlarıydı); yedi anahtar aynen duruyor ve sıradaki anahtar **#2
LEARNING-SNAPSHOT-1** (tasarım amendi §8.2'de).

<!-- END · cwf-open-items-register-v96 -->
