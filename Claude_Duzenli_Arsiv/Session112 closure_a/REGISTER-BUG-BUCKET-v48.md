# CWF — BUG KOVASI · v48 (S112 açılış bulguları)
<!-- 2026-08-21. v47'yi DEVRALIR. Append-only: hiçbir kalem kapanış kaydı olmadan düşmez.
     v47'nin §1/§2/§3/§4'ü BÜTÜN olarak taşındı; hiçbiri kısaltılmadı.
     YENİ: §2'ye S112 açılışının SEKİZ bulgusu, §3'e İKİ A-REC, §4'e iki tuzak.
     BÜTÜN yazıldı (A-REC-S101-7). -->

## §1 · S111'DE KAPANANLAR (v47'den taşındı, değişmeden)

| Id | Ne | Kapanış |
|---|---|---|
| `GI-015` | Ancestry kapısı, sığ klonda tarih olmadığı için dürüst artefaktları *"fabricated or rewritten provenance"* diye **suçluyordu**. Tek bir `catch`: `git merge-base --is-ancestor` 1 ile *"baktım, hayır"*, 128 ile *"bakamadım"* der; kod ikisini tek cevaba indirmişti. | `CLOSED@fa299b2f` — üç değerli predikat. Architect gerçek bir depth-1 klonda üç yönde doğruladı: inmiş kapı RED · düzeltme GREEN · **düzeltme + sahte damga hâlâ RED**. ⚠ S112: kanonik defter satırı hâlâ OPEN — bkz. `F-S112-LEDGER-CLOSURE-LAG-1` |
| `F-S111-TURNCTXLOG-SCOPE-MENTION-VS-IMPORT` | Kapsam testi *"imported by no production module"* diyor, *"named by no file"* uyguluyordu. Mention ≠ import. | `CLOSED@2f080462` — uygulama kapsamına uyduruldu, kapsam zayıflatılmadı |
| Tırnaklı front-matter sapması | Üç şerit sözleşmeyi bağımsız uyguladı, altı damga anahtarında mutabık kaldı; tırnak yazılmamıştı ve ayrıştı. | `CLOSED@2f080462` — tırnaksız kanonik; **okuyucu hoşgörülü YAPILMADI** |
| İki `groundContract.ts` | Sözleşme mintlendi, uygulayıcı sahibi adlandırılmadı. | `CLOSED@2f080462` — AG-1'inki modül, AG-4 katkısı o dosyaya ek |
| Sahte öksüz (AG-2 kendi aletinde) | Üç mercek defekti, üçü de sessiz; biri sahte bir öksüz yayımladı. | `CLOSED@9837563c` — mutasyonla pinlendi + **sayan** kaplama tabanı |

## §2 · AÇIK

### §2.1 · S112 AÇILIŞINDA DOĞANLAR — sekiz bulgu, hepsi canlı ölçüm

| Id | Ne | Ölçüm | Ağırlık |
|---|---|---|---|
| `F-S112-CANONICAL-LEDGER-SCOPE-1` | **Kanonik ilan edilen açık-kalem defteri neredeyse boş.** `docs/ground/open-items.md`: **15 kalem, hepsi `GI-0xx`, hepsi S111 zemin dalgasında doğdu.** `#25`·`#29`·`#81`·`#82b`·`VECTOR-ONBOARD-DRIP-1`·`PHASE-CONTEXT-RETRIEVAL-1` ve on üç küçük kalem **YOK**; hiçbirini adlandıran `MERGED-INTO` kaydı **YOK**. Register v114 §0 *"v113'ün tüm kalemleri MERGED-INTO"* diyor — **dosyaya karşı ölçüldü, YANLIŞ.** S110'un 18-kalem kaybının çaresi olarak kapı yapıldı; kapı yapıldı, **kalemler içine konmadı.** | Architect, taze klon `2f080462`, dosyanın tamamı okundu @2026-08-21T04:56Z | **EN AĞIR** — S110 durumu, üstünde "düzeltildi" cümlesiyle |
| `F-S112-ARCHOPEN-ORPHAN-LABEL-1` | **Bağlayıcı açılış komutu yanlış sayı basıyor.** `architect:open` alan 8 `orphans 28 (measured)` yazıyor. `scripts/architectOpen.ts:394` okundu: `body.split('\n').filter(/^\s*[-*]\s+\S/)` — **madde-işaretli SATIR sayısı**, öksüz sayısı değil. Belgenin kendi verdict tablosu: ORPHAN **4** · READ-OFF-TURN 15 · READ-ON-TURN 37 · READ-ONLY 2 · INERT 0. v112 bu çıktıyı oturumun tek öncülü ilan etti → her oturum yanlış sayıyla açılacaktı. **Bir alanın ADI, davranışı olarak basılıyor** — GI-015'in aynı dosyada aynı sınıfı bulmasından bir dalga sonra. | Architect, kaynak okundu @2026-08-21T04:56Z | **YÜKSEK** — aletin kendisi |
| `F-S112-LEDGER-CLOSURE-LAG-1` | **İki kat kapısı KISALMAYI engelliyor, KAPANIŞ KAYDINI zorlamıyor.** `GI-015`'in çaresi `fa299b2f`'te indi (ata testi exit 0; üç değerli `decideAncestry` + dört öz-test `checkGroundTruth.ts`'te); bug bucket v47 ve register v114 kapanışı KAYDEDİYOR; **kanonik defter satırı hâlâ `OPEN`.** Yasa gereği repo kazanır → Architect'e aynı iş iki kez yaptırılabilir. `GI-014` aynı desen. | Architect, `merge-base --is-ancestor` + kaynak @2026-08-21T05:0xZ | ORTA-YÜKSEK |
| `F-S112-GROUND-STAMP-PREDATES-CONTENT-1` | **Damga, içerikten eski.** `open-items.md`: `commit ae85c3b4 · measuredAt 2026-08-20T16:55:00Z`; baytları `a81912d0` (20:38:39Z) yazdı; master damgalı commit'ten **45 commit** ileride. Damga JENERATÖRÜN koştuğu anı adlandırıyor, İÇERİĞİN yazıldığı anı değil. Ancestry geçtiği için kapı YEŞİL ve bayatlık görünmez. `GI-015`'in *ancestry* defektinin **freshness ikizi**. | Architect, `git log -- <path>` + `git log ae85c3b4..origin/master \| wc -l` @2026-08-21T05:0xZ | ORTA |
| `F-S112-MERGED-INTO-NONITEM-1` | **Kapanış kayıtları gramerde tip tutmuyor.** Defter grameri `MERGED-INTO:<id>` ister. Register v114 §1 iki satırda bir DOSYA YOLU (`docs/ground/census.latest.json`) ve bir FAZ ADI (`PHASE-CONTEXT-RETRIEVAL-1`) yazıyor. Yedi kapanış kaydının ikisi kapı tarafından doğrulanamaz. | Architect, gramer satırı + v114 §1 @2026-08-21T04:5xZ | ORTA |
| `F-S112-GATE-TALLY-STALE-1` | **"SOTA kapısı 5/7" üç oturumdur yanlış.** Ölçüm **6/7**: `#2·#10·#16·#18·#23·#25` kapalı, `#29` açık (`cwf-sota-full-table-S106-v2` §A; doğrulayan `CWF-S106-SESSION-CLOSE-v1:118`). `#25` S103'te döndü; proje talimatları §9 ve register v114 §4 güncellenmedi. **İkinci yarısı daha ağır:** o sayaç KABUL KRİTERİ DEĞİL — kabul sözleşmesi `cwf-sota-definition-v1_5` §10'dur ve **0/16**'dır. İki skorbord karıştırılıyordu. | Architect, iki bağımsız kaynak @2026-08-21T05:0xZ | **YÜKSEK** — hüküm tabanı |
| `F-S112-VALVE-STATE-STALE-1` | **"Valf `vector.engine` KAPALI" dört gündür yanlış.** Canlı `domain_rules`: `vector.engine='qdrant'` **published 2026-08-17T18:02:17Z** · `vector.enabled=1` · `vector.indexRatePerSec=5`. Kapalı olan MOTOR değil TÜKETİCİ: `vector.toolRetrievalMode=0` (published 2026-08-20). Ayrıca `VECTOR-ONBOARD-DRIP-1` bir ön koşul olarak yazılıydı — **İNDİ** (`vectorLane/admission.ts`). | Architect, Supabase `execute_sql` @2026-08-21T05:0xZ | **YÜKSEK** — mimari hüküm tabanı |
| `F-S112-OPERATOR-BOOT-MISSING-1` | **Beşinci şerit başlatılamaz.** Kutuda `S112-AG-BOOTS-v1` var, Operator karşılığı **yok**. Proje kuralı: *"BOOT'suz posta verilmez."* Operator şeridi S112'de boot edilemez durumda. | Architect, kutu envanteri @2026-08-21T05:1xZ | ORTA — **bloklayıcı** |

### §2.2 · S111'DEN TAŞINANLAR (v47 §2, değişmeden)

| Id | Ne | Ölçüm |
|---|---|---|
| `F-S111-GROUND-MD-UNGATED` | `docs/ground/*.md` damgalarının **içi** denetlenmiyor (altı anahtar, sıra, `MEASURED:` öneki, 40-hex, ISO). Front-matter varlığı ve tırnak **denetleniyor** (slot 1b). | tek `validateStamp` çağrısı uzaklıkta |
| `F-S111-GROUND-GATE-IN-DEPLOY-BUILD` | `check:ground`, `npm run build`'in içinde — Vercel'in **deploy** komutu. Bir depo-hijyen kapısı üretim dağıtımını kırabiliyor. Kapı, `check:doc-drift` için kurulmuş bir `fetch-depth: 0` azaltıcısına biniyordu; **o ortamda korunuyor, her yerde açıkta.** | AG-1'in kendi yerleştirme kararı, adıyla bildirdi |
| `F-S111-SHARED-CLONE-IDENTITY-LEAK` | Paylaşımlı klon HEAD'inde bayat `lane-claim AG-3` commit'i; orada boot eden pencere ağaçta kimlik buluyor. **Sabah dört pencerenin kendini AG-3 sanmasının sebebi.** | AG-4 reflog'dan ölçtü, iki yabancı pid |
| `F-S111-RELAY-CONSUMED-NOT-WRITTEN` | `relay_inbox.consumed_at` son yazma **2026-08-19T02:03Z** — sekiz PR'ın indiği bir oturum boyunca hiç işaretlenmedi. **Canlılık sinyali değildir; iki yönde de kanıt taşımaz.** | Architect ölçtü, 79/270 satır |
| `F-S111-BACKEND-RETIRED-ENABLED` | `armes-new`: `lifecycle='retired'` ama `enabled=true`, üstünde 141 araç satırı. Kod tabanı 6 backend, DB 7. Statü/izin karışımı (ADR-010). | `#81`'in kapsamına girer |
| `readAncestry` mükerrerliği | AG-4'ün cevaplanabilirlik ön koşulu, hotfix indikten sonra modül predikatının içindekini kısmen tekrarlıyor. Uyuşuyorlar; **doğruluk kazancı yok, düzeltme kalemi.** | AG-4 adlandırdı, silmedi |
| RULE-54 migrasyon borcu | 1512/1715 satır etiketsiz · **380 tek-mercek yokluk iddiası** | AG-3'ün provenance taraması |
| Üç öksüz denetim defteri | `llm_provider_secret_audit` (1 satır) · `mcp_secret_audit` (25) · `provider_audit` (7). **Yazılıyor, kimse okumuyor**, ve ikisinde yazarın gerekçesi bile yok. | AG-2'nin yürüyücüsü, altı mercek |
| `gateway_artifact_observations` | **CANLI öksüz**: 126 satır, iki kanal — `list_charts` 79 · `list_datasets` 47 (18'inden beri sessiz). Besleniyor, okunmuyor. S112'de yeniden sayıldı: **126**, değişmedi. | REPRODUCED, tek `max()` ölü kanalı gizlerdi |
| `F-S110-SUITE-TIMING-ASSERTION-LOADSENSITIVE` | master defekti, kendi kartı | v46'dan taşındı |
| `rule26` flake geçmişi (`F-BW01`) | S111'de **iki kez ilk denemede yeşil**. Merge queue açılmadan önce ölçülmeli: kuyrukta bir flake zincirleme yeniden başlatma üretir. | AG-2 not düştü |

## §3 · ARCHITECT ÖZ-DÜZELTMELERİ (A-REC)

### §3.1 · S112

| Id | Ne | Sınıf |
|---|---|---|
| `A-REC-S112-1` | **Oturumun İLK komutunda `$?`'ı borudan sonra okudum** (`git clone … \| tail -5; echo "CLONE_EXIT=$?"` → `tail`'in kodu). Dört canlı ihlalle sabitlenmiş duran kural, ilk temasta çiğnendi. Bare yeniden ölçüldü. | **standing rule, tekrar** |
| `A-REC-S112-2` | A23 ⑤/⑥ öncülünü doğrularken `grep` çıktısının ilk isabetini aldım ve **`api/cwf/__tests__/stageClarify.test.ts`'i üretim modülü sanıp bastım.** Yakalandı; `api/cwf/_lib/turn/stageClarify.ts`'ten yeniden okundu ve teşhis (ikili resolved/unresolved döngüsü) orada doğrulandı. **Modülün adını İÇEREN bir dosya adı, modül değildir** — gösterge/zemin karıştırması, tam da aynı mesajda başkalarında teşhis ettiğim sınıf. | **gösterge≠zemin** |

### §3.2 · S111 (v47 §3, değişmeden)

| Id | Ne | Sınıf |
|---|---|---|
| `A-REC-S111-1` | Kart, claim yürüyüşünün karar vereceği adresi ön-atadı | kart kusuru |
| `A-REC-S111-2` | S110'un dur emri açıkça iptal edilmedi | kart kusuru |
| `A-REC-S111-3` | Bayt-aynılık talebi ile canlı damga sözleşmesi çelişkili | kart kusuru |
| `A-REC-S111-4` | Sözleşme mintlendi, uygulayıcı sahibi adlandırılmadı | kart kusuru |
| `A-REC-S111-5` | İki kartımda rapor dosya adı farklı yazıldı | kart kusuru |
| `A-REC-S111-6` | **Durum değişikliği emreden kart, emrettiği değişime karşı yaşlanır** — üç örnek | **yeni sınıf** |
| (kayıtsız, kıl payı) | Dal emekliliğini `git diff --name-only master <branch>` ile kontrol ettim; master-ilerisi "inmemiş iş" gibi okunuyordu. **İddia etmeden önce ata testine geçtim.** | ölçüm merceği |

## §4 · ARAÇ TUZAKLARI

### §4.1 · S112'de doğanlar

- **Bir alanın ETİKETİ, o alanın HESABI değildir.** `architect:open`'ın `orphans` satırı gibi:
  aleti okuyan, aletin KAYNAĞINI okumadan sayıyı öncül yapmaz. Bir gösterge panelindeki her sayı
  için sorulacak soru: *bu sayıyı üreten ifade ne?*
- **`api.github.com` HTTP 403 rate-limit, "0 PR" DEĞİLDİR.** Kimliksiz çağrı reddedilir; ret bir
  ölçüm değil bir sessizliktir. `gh` yoksa alan `UNMEASURED` basılır; sıfır basılmaz.
  (Dolaylı çıkarım — "master-dışı dal yoksa in-repo PR olamaz" — ÇIKARIM diye etiketlenir,
  ölçüm diye değil; fork PR'ı bu çıkarımın dışındadır.)

### §4.2 · S111'de doğanlar (v47 §4, değişmeden)

- **CI hükmü TAM 40-hex ile sorulur.** Kısa sha `total_count=0` döndürür ve *"CI hiç koşmadı"*
  (= `S101-L1` ALWAYS FAILED) ile **bayt-aynı** okunur. Üç şerit de bu tuzağa değdi.
- **`git diff --name-only master <branch>`** master-ilerisini gösterir; **inmemişlik sinyali
  değildir.** Ata testi (`merge-base --is-ancestor`) sorulan soruyu cevaplar.
- **`--force-with-lease=<ref>:`** boş beklentiyle *"bu ref hiç var olmamalı"* demektir; atomik
  test-and-set'tir ve `(stale info)` reddi **bir ölçümdür**, hata değil.
- **`git merge -F -` stdin okumaz** (`git commit -F -` okur); index'e dokunmadan önce düşer.
- **Sözleşmesi emekli olmuş bir poller** ölmüş bir soruyu cevaplamaya devam eder ve yanlış anda
  yeşil "git" sinyali basar.
- **`cancelled` ≠ `failed`.** Üstüne push edilen koşuyu GitHub iptal eder; ikisinden biri gibi
  raporlamak yanlıştır.
- **`rm -rf` bir worktree'yi kaldırmaz** — bayat yönetim kaydı bırakır; `git worktree remove` +
  `prune`.

<!-- END REGISTER-BUG-BUCKET-v48 -->
