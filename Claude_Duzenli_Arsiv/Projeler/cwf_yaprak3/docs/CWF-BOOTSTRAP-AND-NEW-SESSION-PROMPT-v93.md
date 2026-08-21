# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT · v93 — S93 açılışı

<!-- v92'yi geçersiz kılar. S37-1. İlk mesaj: "S92'den devam". -->

## §A · KİMLİK + YASALAR (verbatim tekrar zorunlu)

SOTA-1 + S82-6 ilk mesajda **verbatim**. Doktrin **v1_4** · D-7 · DALGA-ÇAPA
(S88-1) · S74-3/4 bekleme sözleşmesi — **düzeltilmiş hâliyle: Architect şerit
ÇIKTILARINI origin'den KENDİ okur** (dallar + `docs/relay/*-report.md`);
sahipten yalnız push-edilmemiş pencere içeriği ve elle tanık istenir ·
otomasyon-önce · sahip maddeleri insan-dili.

Yasa katmanları: S89 beşlisi · S90 ikilisi · S91 altılısı · **S92 üçlüsü**:
- **S92-1 ÇOK-ŞERİT RESEAL PROTOKOLÜ:** kaynak çitleri ayrık olsa bile reseal
  ORTAK yan-etkidir; her çok-şeritli dalganın GO'su ikinci-merger adımını
  taşır (master'ı dala al → merged ağaçta reseal → docVersion AÇIKÇA SET →
  drift 7/7 → merge).
- **S92-2 KESİLMİŞ KANIT KANIT DEĞİLDİR:** `head`/filtreli sayımdan çit
  yazılmaz; sayım TAM koşulur.
- **S92-3 SIFIR DÖNEN PROBE:** anahtar adları gerçek veriyle doğrulanmadan
  "yok" hükmü verilmez.

Sahip hükümleri: register **v96 §1 (H1–H5)**.

## §B · RULE-25 BOOT (taze TAM klon; iddia edilen zemin — DOĞRULANACAK)

`origin/master` **`0de5ffdd98a1a855132bc80a71a7be50f070beef`** · docVersion
**rev 226** · **521** test dosyası / **6415** test, 0 skip · 68 migration ·
13 ADR · GATEWAY_RULES 18/18 · üretim `0de5ffd`'ye yakınsamış (kanarya satırı
tanık).

**S92 merge'leri:** `b5da685` (CANARY-VERDICT-TRUTH-1, rev 224) · `c2f7dfd`
(STAGE-CONTEXT-TRUTH-1, rev 225) · `0de5ffd` (ROUTING-FLOOR-BACKEND-1,
rev 226; ikinci-merger reseal `b646c01`).

**Kanarya artık KONUŞUYOR:** üç hüküm, üçü `no_jurisdiction` + N. Taban
`CLEAN_ARMS_MIN_N = 9`; scored 3↔6 salınıyor → tabana ulaşmanın tek kapısı
**#35 CANARY-REP-FAILURE-1** (failed rep'ler `ok:true` + `errorName:null` —
fırlatmıyor, sessizce skorlanamaz).

**Kapanış hâli governed/canlı:** `armes.metric_registry` 3 yayınlı ·
`router.learnEnabled` 0 · planner ÜRETİMDE live-mode plan türetiyor
(`QUERY_MASTER`, H5 tanığı) · S89-1 sözlüğü iki organda görünür.

## §C · S93'ÜN İLK İŞLERİ (sıra — rollout v3_0)

1. **#35 CANARY-REP-FAILURE-1 — ÖNCE ARCHITECT TEŞHİSİ** (register v96 §8.1):
   `runExperiment` skorlanabilirlik sınıflandırıcısı bayta kadar okunur, üç
   koşunun specimen kırılımı çapraz okunur, salınım hipotezi (ortam/yarış)
   test ölçümüyle adlandırılır. Faz promptu teşhisten SONRA.
2. **#2 LEARNING-SNAPSHOT-1** — tasarım **`v1_1` amendi** ratifikasyona:
   S92 şema okuması migration doğurdu (`router_proposals` ·
   `tool_category_cache` çıplak-keyword PK; kodda `task_id` sıfır isabet) →
   Operator adımı, ADR-005 yolu. ⚠ S88-1: `router_proposals`'a dokunur.
3. **#4 TRUST-PANEL-PER-BACKEND-1** — dalga-1'den çekilmişti, artık serbest;
   prompt YENİ master'a karşı yeniden kesilir (eski v1 relay'i KULLANILMAZ —
   SHA'sı bayat).
4. **#36 FLOOR-RESYNC-1** — tek script + sahip onayı; W-038 redaksiyon kuralı
   talimatta.

## §D · DEĞİŞMEZLER (yeniden tartışılmaz)

S89+S90+S91+S92 katmanları aynen. Artı: SOTA KAPISI = mimarinin tamamlanması
(**0/7**, sıradaki anahtar #2) · elle kelime ekleme kapısı yok · sözlük 5'li
ve YALNIZ `regression` eyler (M1 dinamik pin) · `typecheck:api` iki proje
AYRI (`npx tsc --noEmit` sahte yeşil) · `categorySlice.ts` replay/ altında
ama ROUTING ailesinden (çit yazarken dizin yanıltır).

## §E · DOSYA SETİ (projeye yüklü olacak)

`CLAUDE-PROJECT-INSTRUCTIONS-v4` · `cwf-sota-definition-v1_5` ·
`cwf-architect-doctrine-v1_4` · **`cwf-master-rollout-plan-v3_0`** ·
bootstrap **v93** (bu) · register **v96** · KB **v93** · bucket **v30** ·
`cwf-design-CANARY-VERDICT-TRUTH-1-v1` ·
`cwf-design-ROUTING-FLOOR-BACKEND-1-v1` ·
`cwf-design-LEARNING-SNAPSHOT-1-v1` (⚠ v1_1 amendi S93'te gelecek) ·
`cwf-design-TOOL-BEHAVIOR-CENSUS-1-v1` · `cwf-sota-run-guide-S91-v1` ·
`cwf-implementation-order-S92-v4_2` (türetilmiş görünüm — payda artık 36,
v3_0 kazanır) · `cwf-advisor-note-CS329A-lessons-v2` ·
`cwf-architecture-research-S82-v1`.

⚠ Şeritler proje dosyalarını GÖREMEZ (S91-4); faz promptları kendi kendine
yeter.

## §F · İLK MESAJDA SÖYLENECEK TEK CÜMLE

*"S92 üç merge'le kapandı (rev 226): kanarya artık konuşuyor (üç hüküm,
no_jurisdiction+N), 04 kartı dürüst, taban backend-anahtarlı — S93,
kanaryanın 9 tabanına giden tek kapı olan CANARY-REP-FAILURE-1 teşhisiyle
açılıyor."*

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v93 -->
