# CWF — AÇIK KALEMLER REGISTER · v115 (S112 açılış düzeltmesi)
<!-- 2026-08-21. v114'ü GEÇERSİZ KILMAZ — DEVRALIR VE İKİ YANLIŞINI DÜZELTİR.
     ALTIN DEFTER KAYDI: v114'ün HİÇBİR kalemi düşmedi. Aşağıdaki iki düzeltme
     kalem eklemez/çıkarmaz, iki YANLIŞ İDDİAYI düzeltir:
       1. v114 §0: "v113'ün tüm kalemleri MERGED-INTO docs/ground/open-items.md."
          S112 açılışında ÖLÇÜLDÜ: göç YAPILMADI. Kanonik defterde 15 kalem var,
          hepsi GI-0xx, hepsi S111 zemin dalgasında doğdu; v113'ün hiçbir
          kalemini adlandıran MERGED-INTO kaydı yok.
          → F-S112-CANONICAL-LEDGER-SCOPE-1
       2. v114 §4: "Son yazılı hâl 5/7." ÖLÇÜLDÜ: 6/7, ve o sayaç kabul
          kriteri DEĞİL. → F-S112-GATE-TALLY-STALE-1
     Ayrıca §1'e üç ölçüm notu eklendi (kapanış kayıtlarının gramerine dair).
     BÜTÜN yazıldı (A-REC-S101-7). -->

## §0 · KANONİK EV DEĞİŞTİ — ve göç HENÜZ YAPILMADI

**Açık kalemlerin kanonik evi `docs/ground/open-items.md`'dir** (S111'de AG-3 tarafından inşa
edildi, master `2f080462`). Append-only, **iki kat kapısının** arkasında:

- **bayt tabanı** — bir mint kısalamaz
- **kalem tabanı** — kalem sayısı düşemez; düşen her kalem `CLOSED@<evidence>` /
  `SUPERSEDED-BY` / `MERGED-INTO` taşımak zorundadır, yoksa **build KIRMIZI**

Bir kalem defterden çıkmaz; **OPEN kümesinden** çıkar ve satırını, kapanışını üstünde taşıyarak
korur.

> ### ⚠ v114'ÜN DÜZELTİLEN İDDİASI — okumadan geçme
> v114 §0 şunu yazdı: *"v113'ün tüm kalemleri MERGED-INTO docs/ground/open-items.md.
> Hiçbir kalem kapanış kaydı olmadan düşmedi."*
> **S112 açılışında dosyaya karşı ÖLÇÜLDÜ ve bu cümle YANLIŞTIR.**
> Kanonik defterde **15 kalem** var: `GI-001`…`GI-015`, hepsi S111'in zemin dalgasında doğmuş.
> `#25` · `#29` · `#81` · `#82b` · `VECTOR-ONBOARD-DRIP-1` · `PHASE-CONTEXT-RETRIEVAL-1` ve
> §2⓹'teki on üç küçük kalem **içinde yok**, ve hiçbirini adlandıran bir `MERGED-INTO` kaydı
> **yok**. Göç bir cümleyle beyan edildi, bir baytla yapılmadı.
>
> **Bunun anlamı:** S110'da 18 kalemin kaydı olmadan düşmesinin çaresi olarak bu defter yapıldı;
> defter yapıldı, kapısı yapıldı, **korunacak kalemler içine hiç konmadı.** Kapı bugün on beş
> kalemi koruyor, projenin üstünde yürüdüğü ~otuz kalem hâlâ YALNIZ bu kapısız aynada.
> Bu, S110 durumunun aynısıdır — üstünde "düzeltildi" yazan bir cümleyle.
>
> **Çare:** `PHASE-ARCHITECT-CARD-GRAMMAR-1` **item E** (AG-2, [FLOOR], S112'de kesildi).
> Metinler kısaltılmadan (`S103-YASA-2`), her kalem `GI-010` uyarınca MANIFEST'e, çaresi inmiş
> olanlar `CLOSED@<sha>` ile ve sha'nın ata olduğu YAZILMADAN ÖNCE kanıtlanarak.

**Bu dosya bir AYNADIR.** Kutuda her oturumda hazır bulunan nüshadır. **Çelişkide REPO KAZANIR**
ve fark bir bug olarak kaydedilir (türev-kaynak yasası). Ayna asla öncül değildir.
**Ama bugün ayna, kanonikten DAHA ÇOK kalem taşıyor** — ve bu, aynanın üstünlüğü değil,
kanoniğin doldurulmamışlığıdır. İki taşıyıcı arasındaki bu asimetri item E ile kapanana kadar
her oturum açılışında ADIYLA anılır.

---

## §1 · S111'DE KAPANANLAR — kapanış kanıtıyla

| Kalem | Kapanış |
|---|---|
| `PHASE-ARCHITECT-GROUND-TRUTH-1` (A–H) | `CLOSED@2f080462` — dört şerit, PR #317/#318/#319/#321/#322 |
| `#25 GRAPH-KB` bağımlılığı: ölçüm organı | `MERGED-INTO docs/ground/census.latest.json` ⚠ bkz. not 2 |
| Register/KB/bug-bucket'ın append-only'e taşınması | `CLOSED@2f080462` — MEKANİZMA indi; **kalem göçü İNMEDİ**, bkz. §0 |
| `RULE-54` mint | `CLOSED@2f080462` — 55 kural, gramere bağlı |
| `GI-015` ancestry suçlaması | `CLOSED@fa299b2f` — üç değerli predikat, sığ klonda kanıtlı ⚠ bkz. not 1 |
| `GI-014` / markdown arm | `SUPERSEDED-BY F-S111-GROUND-MD-UNGATED` (daraltıldı, kapanmadı) ⚠ bkz. not 1 |
| `A23-STEP01` ölçüm organı bağımlılığı | `MERGED-INTO PHASE-CONTEXT-RETRIEVAL-1` ⚠ bkz. not 2 |

**Not 1 — kapanış gecikmesi (`F-S112-LEDGER-CLOSURE-LAG-1`).** `GI-015`'in çaresi ÖLÇÜLDÜ:
`fa299b2f` master'ın atasıdır (`merge-base --is-ancestor` exit 0) ve üç değerli `decideAncestry`
ile dört öz-test `scripts/checkGroundTruth.ts`'te durur. Bu ayna ve bug bucket v47 kapanışı
KAYDEDİYOR; **kanonik defter satırı hâlâ `OPEN` diyor.** Yasa gereği repo kazanır → kanonik
kümede `GI-015` AÇIK, düzeltme ise ağaçta. `GI-014` için aynı desen.
**Yapısal sebep:** iki kat kapısı KISALMAYI engelliyor, **KAPANIŞ KAYDINI ZORLAMIYOR.** Bir kalem
düzeltilip sonsuza kadar açık kalabilir ve Architect'e aynı işi iki kez yaptırabilir.

**Not 2 — gramer uyuşmazlığı (`F-S112-MERGED-INTO-NONITEM-1`).** Defter grameri `MERGED-INTO:<id>`
ister. Yukarıdaki iki satır bir DOSYA YOLU (`docs/ground/census.latest.json`) ve bir FAZ ADI
(`PHASE-CONTEXT-RETRIEVAL-1`) yazıyor; ikisi de defter id'si değil. Yedi kapanış kaydının ikisi
kanonik gramerde tip tutmuyor → kapı onları doğrulayamaz. Item E bunları düzgün id'lere çevirir.

**Not 3 — damga/içerik uyuşmazlığı (`F-S112-GROUND-STAMP-PREDATES-CONTENT-1`).** Kanonik defterin
damgası `commit: ae85c3b4 · measuredAt 2026-08-20T16:55:00Z`; baytları en son `a81912d0`
(2026-08-20T20:38:39Z) yazdı ve master damgalı commit'ten **45 commit** ileride. Damga
JENERATÖRÜN koştuğu anı adlandırıyor, İÇERİĞİN yazıldığı anı değil. Ancestry geçtiği için kapı
yeşil ve bayatlık görünmez. `GI-015`'in *ancestry* defektinin *freshness* ikizi.

---

## §2 · AÇIK — S112 sırasıyla

**⓵ `PHASE-ARCHITECT-CARD-GRAMMAR-1` — S112'nin 1 numaralı kartı. KESİLDİ.**
Dört şeride basıldı, bayt-aynı: md5 `f86c3e3bb5f89fc34923857bcfa61ef0`, 4555 bayt,
`AG-1 410fff6a · AG-2 ade26a33 · AG-3 0e611ee3 · AG-4 2de9ac29`.
On iki kart kuralı, hepsi S111'in altı kusurlu turundan ölçülerek türetildi.
`kind=card` grameri · insert-öncesi denetim · yasa metinleri · preflight. ZEMİN kalemleri
**karanlık iner**. Gerekçe sahibin: *"süreçte bir hata olduğunda dişliler birbirine giriyor ve
bunu çözmek 4+ saat alıyor, bunu efford edemeyiz."*
**+ item E** (Architect eklemesi, sahip-iptal-edilebilir): §0'daki defter göçü, AG-2, [FLOOR].

**⓶ `PHASE-CONTEXT-RETRIEVAL-1` — ASLA DÜŞÜRÜLMEZ. ⚠ BELGESİ YOK.**
Sahip hükmü S110, kelimesi kelimesine: *"retrieval'i da bir sonraki turda yap ama mutlaka
yapılmalı, skip sakın."* Projenin **kendi** Qdrant'ıyla (TEK-ORGAN). Korpus sırası: yasalar +
`docs/ground/` → repo dokümanları + ADR → proje kutusu → **oturum arşivleri**.
**S112 ölçümü:** bu fazın **dokümanı hiç yazılmadı** — iki taşıyıcıda adı geçiyor, belgesi yok.
Kart kesilmeden önce belge yazılır (`S91` tamlık kapısı).
**S112 ölçümü:** korpusta bugün **hiçbir doküman yok** — 342 kayıt, 8 koleksiyon, hepsi
`backend_tools.description` / `governed.knowledge`. Kurgu düşmedi; **inşa edilen kısmı sıfır.**
**Bağımlılık DÜŞTÜ:** `VECTOR-ONBOARD-DRIP-1` İNDİ (`api/cwf/_lib/vectorLane/admission.ts`).
**Yeni bağımlılık:** `admission.ts` kendi yorumunda *"üçüncü bir sınıf, bu ikisine karşı nasıl
sıralanacağına dair bir kural ister"* diyor. Architect retrieval'i o ÜÇÜNCÜ tüketicidir.
**Yeni bağımlılık:** `ALLOWED_CORPORA` KAPALI liste; Architect korpusu oraya bir YASA
DEĞİŞİKLİĞİYLE girer, konfigürasyonla değil.

**⓷ `#81 BACKEND-DISCOVERY-1`** — dört eksik: proaktif süpürme · içerik derinliği · doğrulayıcı ·
tur anında okuyucu. Kabul çıtası sahip test seti (Q2 · Q20 · Q21 + iki doküman sorusu),
**orijinal cümlelerle**.

**⓸ `#29 A23 ⑤/⑥ MAKİNESİ`** — iç sayacın kalan TEK anahtarı. Spec dormant, makine yok.
**S112'de ÖLÇÜLDÜ:** üçlü teşhis `api/cwf/_lib/turn/stageClarify.ts:321-329`'daki döngüde ölüyor —
döngü `res.kind === 'resolved'` / else şeklinde **İKİLİ**; üçüncü durum yok, çözülmeyen her şey
tek kovaya düşüyor. Patlama yarıçapı 95/678. (Öncül artık iddia değil, ölçüm.)

**⓹ Küçük kalemler — sıra serbest, hepsi ölçülmüş:**

| Kalem | Ölçüm |
|---|---|
| `F-S112-ARCHOPEN-ORPHAN-LABEL-1` | **YENİ · yüksek.** `architect:open` alan 8 `orphans 28` basıyor; `scripts/architectOpen.ts:394` madde-işaretli SATIRLARI sayıyor. Gerçek ORPHAN **4**. Bağlayıcı açılış komutu yanlış sayı basıyor |
| `F-S111-GROUND-MD-UNGATED` | tek `validateStamp` çağrısı uzaklıkta (`parseFrontMatter` indi) |
| `F-S111-GROUND-GATE-IN-DEPLOY-BUILD` | `check:ground`, Vercel'in deploy komutunun içinde |
| `F-S111-SHARED-CLONE-IDENTITY-LEAK` | paylaşımlı klon HEAD'inde bayat lane-claim commit'i |
| `F-S111-RELAY-CONSUMED-NOT-WRITTEN` | `consumed_at` son yazma 2026-08-19T02:03Z; **sinyal değil** |
| `F-S111-BACKEND-RETIRED-ENABLED` | `armes-new` lifecycle=retired ama enabled=true, 141 araç |
| `F-S110-SUITE-TIMING-ASSERTION-LOADSENSITIVE` | master defekti, kendi kartı |
| `readAncestry` mükerrerliği | doğruluk kazancı yok, düzeltme kalemi |
| RULE-54 migrasyonu | 1512/1715 satır · 380 tek-mercek yokluk iddiası |
| Üç öksüz denetim defteri | `llm_provider_secret_audit` · `mcp_secret_audit` · `provider_audit` |
| `gateway_artifact_observations` | canlı öksüz, 126 satır (79 + 47), besleniyor okunmuyor |
| `MEMORY.md` sıkıştırma | 409 konu · 195 ulaşılabilir (%47.7) · 0 kırık link · **münhasır oturum ister** |
| `PHASE-LANE-SHELL-PERMISSIONS-1` | repoda `.claude/settings.json` + "tek komut, tek çağrı" |
| **`S112-OPERATOR-BOOT` YOK** | **YENİ.** Kutuda `S112-AG-BOOTS-v1` var, Operator karşılığı yok. *"BOOT'suz posta verilmez"* → beşinci şerit BAŞLATILAMAZ |
| Merge queue | repo kişisel hesapta → **org'a taşıma sahip kararı**; `merge_group` tetikleyicisi hazır |
| Şerit-yerel hijyen | hijyen kartı 21:34:44Z basıldı; master'a rapor İNMEDİ → **UNMEASURED**, "temiz" değil |

---

## §3 · UFUK — düşmez, unutulmaz

- **`#82b` Design-RAG** — sahip hükmü S105: *"şimdilik park et ama ASLA UNUTMA."* Tetik: sahip
  çağrısı ya da A23 sonrası envanter konuşması. **⓶ ile aynı organa binecek.**
- **⑦ Yol B vektör tüketicisi** — A23 §9 Step 1.5. Kod YAZILDI, rung KAPALI:
  `vector.toolRetrievalMode=0` (published 2026-08-20), kod tabanı 0, kesintide 0.
  S111'de öncülü ölçüldü: *"okuyucu YOK"* ÇÜRÜTÜLDÜ (off-turn okuyucu var), *"tur yolunda okuyucu
  yok"* DOĞRULANDI.
- **`VECTOR-ONBOARD-DRIP-1`** — **KAPANDI**, `CLOSED@api/cwf/_lib/vectorLane/admission.ts`.
  Sahip hükmü S102 yerine getirildi: `EncodeClass='query'|'index'`, varsayılanı OLMAYAN zorunlu
  parametre, kapıda ret (FIX-8 sözleşmesi), sayaçlar. Motorun dört kilidinden üçüncüsü.
- **`A23 v1_4` mint** — Architect borcu, Step 1.5 ve parite ölçümünden sonra.
- **Qdrant admin yüzeyi** — sahibin kendi ertelemesi, vektör kapısının arkasında.
- **G3 doğum kanıtı** — ARMES toparlanması ve Hülya'nın üç soruluk gözlemi.
- **GI-001 hükmü — Architect borcu, ARTIK TETİKLENDİ.** Defterin `GI-001` kalemi: register/KB/
  bug-bucket'ın baytları **public** repoya konulamaz (on beş arşiv belgesinin on ikisi kapılı
  tenant kelimesi taşıyor; istisna yok, redaksiyon yok). Sahip S112'de **private repo** önerdi —
  bu, `GI-001`'in tam olarak beklediği hükmün girdisidir. Hüküm yazılacak.

---

## §4 · SOTA KAPISI — İKİ SKORBORD, ÖLÇÜLDÜ

**(A) İç 7-anahtar sayacı: 6/7.** Kapalı: `#2 · #10 · #16 · #18 · #23 · #25`.
Açık: **`#29 A23`**. Kaynak: `cwf-sota-full-table-S106-v2` §A, doğrulayan
`CWF-S106-SESSION-CLOSE-v1:118`.
⚠ **v114 §4'ün "5/7"si YANLIŞTI** — S102 rakamı, `#25` S103'te döndü, taşıyıcı güncellenmedi.

**(B) Kabul sözleşmesi: 0/16.** `cwf-sota-definition-v1_5` §10: on altı dış kriterin on altısı
**ÖLÇÜLMEDİ** · `mcp-honestbench` **NOT BUILT** · `D-OPA-2`/`D-OPA-3` **ÖLÇÜLMEDİ** · maliyet
**ÖLÇÜLMEDİ**. Ölçülü tek satır içtir ve §10.1: C2 altında iç/kendi-koşulmuş/yayınlanmamış bir
sayı **otoportredir**.

**BAĞLAYICI:** SOTA-1 kabul kriterini (B)'ye bağlar. **(A)'yı 7/7 yapmak SOTA'yı KANITLAMAZ.**
Bir oturum (A)'yı anıp (B)'yi anmadan kapanırsa eksik kapanmıştır.
⚠ (B)'nin tek ölçülü satırı olay-tabanlı expiry taşır ve **muhtemelen expired** — ölçülmedi.
Çözen ölçüm: `MA-RERUN-2` yeniden koşusu, `b0e8c9e2` sonrası.

<!-- END cwf-open-items-register-v115 -->
