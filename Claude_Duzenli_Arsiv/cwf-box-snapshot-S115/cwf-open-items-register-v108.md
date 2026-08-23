# CWF — AÇIK KALEMLER REGISTER · v108 (S105 kapanışı)

<!-- cwf-open-items-register-v108 · 2026-08-17. v107'yi GEÇERSİZ KILAR.
     Türetildiği taban: cwf-work-board-S74-v1 + rollout-plan (BAĞLAYICI).
     L-ADAY-2 uyarınca bu register PAYDA + PARK + NÖBET taşır; biri eksikse
     mint edilemez. Kalem yalnız CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO
     ile çıkar; her kapanış kanıt satırını yapıştırır. NUMARA YENİDEN
     KULLANILMAZ (L-ADAY-1). BÜTÜN yazıldı — yönetişim artefaktı yamayla
     üretilmez (A-REC-S101-7). S104 BOŞ GEÇTİ; oturum S105 olarak mühürlendi. -->

## §0 · ZEMİN (S105 kapanışında ÖLÇÜLDÜ, türetilmedi)
`origin/master` **`d3644c9e25608e51a20e240edde9ce68813d75da`** · docVersion
**rev 277** · **653** vitest test dosyası (koşan süit 9245 test) · **19** e2e
spec · **88** migration (canlı `schema_migrations` = 88, **bire bir** — kayık
anahtar 0) · **16** ADR · `phase/*` = **0 ref** (origin master-only, açık PR 0) ·
`docs/design/` = **5 dosya** (4 belge + INDEX) · `public.governance_archive`
CANLI (3 tetik: append_only/no_delete/no_truncate) · `public.tool_arg_policy`
**23** satır · kutu 8/8 konteyner · encoder digest
`sha256:54a282264c68dc170fb684010d6fbf93cb880ea2b59b624a35a74e706ab4a1c3`.

## §1 · SOTA KAPISI — **6/7**
Dönen: #2 (S93) · #10 (S96) · #16 (S98) · #18 (S99) · #23 (S100) · #25 (S103).
Kalan: **#29 🔑 A23 ANLAMA KATMANI**.
`yaprak_gate` = 7/7 (mimari tamam, ölçüm yok) · `cinekop_gate` = liste sıfır +
ölçüm turu.

## §2 · S105'TE KAPANANLAR
| Kalem | Kapanış kanıtı |
|---|---|
| **VALF — `vector.engine`/`vector.enabled`** | **AÇIK@evidence.** `incumbent`v1→**`qdrant`v2 published** · `0`v1→**`1`v2 published**, ikisi de `agent.param`, aktör ksadmin `f4805bd1`, öncüller atomik arşivli, eval-gate `verdict=published`. Architect canlı DB'den bağımsız okudu. Onay: `ONAY-VECTOR-ENGINE-SWITCH-1` (banklı, S105'te harcandı) |
| **F-1 · switch kanıt yolu** | `.github/workflows/vector-live-proof.yml` — dispatch-only, **etkin gövdede sıfır terraform**, SSM salt-okuma (`deploy-langfuse.yml:325` idiomu), host emsali `build-test.yml:176-178`. Kullanımla kanıtlandı: run **32052501343** (R4) + **32053413647** (R6.1), ikisi de apply'sız. `F-S105-SWITCH-CARD-R2-UNRUNNABLE` BURADA KAPANDI |
| **F-2 · admission ölçüm yüzeyi** | `resolveVectorLane.ts:214` koşullu spread — `'on'`+qdrant çözümü `admission` taşır, incumbent'ta GERÇEKTEN yok. Falsifier kırmızı-yetenekli kanıtlandı (kusur geri konunca 6'nın 3'ü adıyla kızarıyor, revert sonrası çözücü bayt-aynı). **Dördüncü düzeltme:** `VectorLaneDeps.engines` fabrika şeklinin `admission`'sız ikinci kopyasını tutuyordu — test dikişinin içinden kusuru geri sokan yol; tip denetçisi buldu, hiçbir test bulamazdı |
| **Canlı gösterge okuması (R6.2/6.3)** | Uygulamanın kendi okuyucusuyla (`fetchSystemParamRows`): 49 satır, `enabled=1`, `engine='qdrant'` → çözücü `status:'on'`, `engine:'qdrant'`, encoder `bge-m3-v1-d1024` dims 1024, `'admission' in lane = true`, `snapshot()` = {query/index sayaçları, busy:false, indexRatePerSec:5}. Önceki kartın R4.2'sinin isteyip alamadığı satır |
| **#82a DESIGN-HOME-1** | **CLOSED@evidence**, master **`d3644c9e`** (PR #283 MERGED `--no-ff`, iki ebeveyn, ref silindi). 4 temiz belge + 12 satırlık INDEX + changelog; diff **tam 6 yol**, hepsi `docs/**`+`.agents/**`. **Kanarya ATEŞLEMEDİ** (Actions `total_count=0`, okundu-varsayılmadı). Architect dört dosyanın md5'ini kendi kaynak kopyalarıyla karşılaştırdı: **4/4 MATCH** — gözaltı zinciri uçtan uca kapalı |
| **GO-BATCH-MERGE-3** | 5 dal tek push, tail `7a3eca10`, docVersion rev 276, migration çakışması çözüldü + `check:migration-versions` telli, kanarya 1× success |
| **Operator defter onarımı** | `migration repair` (2 reverted / 2 applied) → `db push --include-all` 3 dosya. Architect canlıdan doğruladı: defter **88=88**, kayık anahtar **0**, `tool_arg_policy` 23, `governance_archive` 3 tetik. Defter-kayması sınıfı KAPANDI |
| **#63 LAW-LEDGER-1 · #27 QDRANT-ENGINE-1 · #25 GRAPH-KB-1** | S103'te kapandı, kayıtta kalır |

## §3 · AÇIK YÜRÜYÜŞ KALEMLERİ — **21, SAYILARAK**
🔑 = son anahtar · 🔒 = kapı arkası · ♻ = denetimle geri gelen · ⏳ = uçuşta
| # | Kalem | Dalga | Durum / not |
|---|---|---|---|
| **75** | **VECTOR-CONSUMER-1** | **9 (S106 açılış)** | **YENİ.** Valf açık ama OKUYANI YOK: `resolveAgentParams` iki anahtarı çözmüyor, `resolveVectorLane`'i yalnız testler + iki kanıt script'i çağırıyor (üçü de config hardcode). Yönetişim gerçeği değişti, üretim davranışı SIFIR değişti. **Sonuç taşınır: üretimdeki 0 `VectorEngineUnreachableError` YAPISALDIR, canlılık ölçümü değildir.** İlk tüketici ek onay olmadan canlıya çıkar → #66 ile AYNI masada |
| **66** | VECTOR-ONBOARD-DRIP-1 | 9 (S106 açılış) | **Sahip hükmü, AYRI FAZ.** Yarısı elde: admission kapısı telli + `indexRatePerSec=5` + sayaçlar okunabilir. **Eksik: öncelik kuyruğunun kendisi** (sorgu ⟩ indeks sınıf sırası). #75'ten ÖNCE iner |
| **81** | BACKEND-DISCOVERY-1 | 9 | Path B §2 "Ingestion Pipeline — Federated Korpus Nasıl Doğar" (`cwf-ir-pathb-hybrid-logic-v1_3`, 2026-07-19) + veri-yüzeyi keşfi (Superset datasets) + Graph KB + routing kuralları. S102'nin IR-4 FUTURE-STATE hükmü yalnız 2 değişmezi miras aldı, §2 adlı kaleme bağlanmadan kesildi (S61-2 ihlali, Architect) |
| **29** | 🔑 A23 ANLAMA KATMANI | 9 | Sözleşmeler kutuda TAM; **KARAR-A23-SEQ-1 bağlayıcı**; W1 faz kilidi "A23 v1_4 kutuda". **v1_4 mint = Architect borcu, S106'ya taşındı** (düzeltilmiş §3(c) ile). Vektör tüketicisi A23 ③ Resolve'ün İÇİNE takılır, ona paralel değil |
| — | R4-FIX-3 (filtre + tutamak + boşluk) | 8.6 | ⏳ AG-1. `F-S103-R4-VERDICT-FILTER-LABEL-AS-VALUE` fix'i |
| **65** | MERGE-FIELD-AWARE-1 | 8.6 | ⏳ AG-2. `F-S101-OVERRIDE-DROPS-BACKEND`; izolasyon hükmünün 2. zorunlu ayağı |
| **74** | LAW-LEDGER-3 | 8.6 | Kartı Architect'te. S-law/doktrin/F sicilleri + L-ADAY-1/2/3 + arşiv-ingest |
| — | **LAW-LEDGER-4** | 8.6 | **YENİ.** S105 yasa adayları (§8) + `check:law-corpus` kapısının VARLIĞI (kart onu istedi, revizyonda YOK — AG-3 uydurmadı, raporladı) |
| **64** | nav-scrollbox hükmü | 8.6 | HÜKÜM METNİ v107 §5'te YAZILI, aynen taşınır; kartı kesilecek (kapıya 768 viewport) |
| — | **governance_archive zehirli satır temizliği** | 8.6 | **YENİ.** Architect'in bozuk yüklemesi (`F-S105-ARCHITECT-INGEST-CHANNEL-FAULT`); tek dosyalık onarım migration'ı, kendini-kanıtlayan predicate: yalnız `md5 <> md5(content)` satırı silinebilir. AG-2 kapanış partisi |
| **69** | ♻ OWNER-BATTERY-1 | 8.7 | Yüzey keşfi YAPILDI (§5). 11 soru: 8 ARMES + 3 Superset. Batarya = A23 adım-1 taban korpusu |
| **70** | ♻ ARTIFACT-NAME-OBSERVATION-1 | 8.7 | Gateway aramasının döndürdüğü artefakt ADLARI kalıcı GÖZLEM olur |
| — | admin metin-üçlüsü doğrulaması | 8.7 | VOICEGATE-BLIND · TRUST-COPY-STUTTER · HEALTH-SYSTEM-ROW. Ölçülecek, varsayılmayacak |
| — | SEED-PROBATION | 8.7 | **Sahip: EVET (R4 sonrası sıraya).** Tetiği Graph-KB ile SAĞLANDI |
| — | S63-1 canlı okumalar | 8.7 | (a) canlı WOULD-REFUSE gözlemi · (b) `uses`→turn hattı entegrasyonu (GOLDEN FREEZE, kendi ölçülü turu) |
| **71** | A2A-HOSTED-AUTH-CONTEXT-1 | 9 | 401 kararı + `context_id` sürekliliği (S100 borcu) |
| **17** | HONESTBENCH-HARNESS-0 taraması | 9 | Alet S82'de inşa+kanıtlı; backend canlıda VAR; iş = üç engelin taraması |
| **48** | FAILURE-LESSON-MEMORY-1 | 9 | S98-L5 kazık defteri |
| **59** | SILENT-FINISH-DESIGN-1 | 9 | 30 günde 16 olay tetiği |
| **33** | B-FRONTIER-PAIRING-1 | 9.5 | 🔒 Kapı SONRASI, ilk skordan ÖNCE; eşit maliyet (R5) sonradan kurulamaz |
| **72** | ♻ RAG şeridi (2B.1) | 9.5 | SOTA Tier F1; R9 "KRİTİK" |
| **73** | ♻ WEB-VALVE-1 (2B.2) | 9.5 | SOTA Tier F2; *çıktısı doğrulanamayan vana vanasızlıktan kötüdür* |
| **37** | GOLDEN-SET-REPLAYABILITY-1 | 9.5 | 🔒 mühür + underpowered kilidi; ilk skor turundan ÖNCE |
| **30 · 31 · 32** | EVAL-SPLIT+ilk ölçüm · honestbench (Fast_p) · v1.1 kuyruğu | 10 | 🔒 ölçüm bandı → `cinekop_gate` |
| **68** | QDRANT-OWNER-SURFACE-1 | tetikli | Sahip isteyince; hedef: kendi admin panelimizde okunabilir Qdrant yüzeyi (ham tünel DEĞİL) |
| — | RELAY-BUS-2 (E1..E4) | tetikli | E2 heartbeat'i `F-S103-LANE-POLL-MORTALITY` besliyor; **S105 kanıtı:** uyandırma blokları `consumed_at` damgalamadığı için defter okuma gerçeğine KÖR (şeritler `supabase-ro` ile zaten damgalayamaz — makbuz rapordur, S99-2) |

**Sayım kontrolü:** numaralı açık kalem **19** (#17·#29·#30·#31·#32·#33·#37·#48·
#59·#64·#65·#66·#68·#69·#70·#71·#72·#73·#74·#75·#81 = 21 numara, #30/#31/#32 üç
ayrı kalem) + numarasız yürüyüş kalemi **6** (R4-FIX-3 · LAW-LEDGER-4 ·
zehirli-satır · admin-üçlüsü · SEED-PROBATION · S63-1) → **görünümde 26 satır,
sayılan yürüyüş kalemi 21** (RELAY-BUS-2 tetikli, payda dışı; #82a KAPANDI,
#82b PARK'ta).

## §4 · SAHİP HÜKÜMLERİ (S105)
1. `ONAY-BATCH-3-CANARY-1` — harcandı (5 dal tek push).
2. `ONAY-VECTOR-ENGINE-SWITCH-1` — **harcandı**, valf açıldı. Sahip verbatim: *"Valf sözünü tut"*.
3. `ONAY-SWITCH-PREP-CANARY-1` — harcandı (tek push, tek kanarya, PR #282).
4. `ONAY-DESIGN-HOME-PUSH-1` — harcandı, sıfır kanarya ÖLÇÜLDÜ.
5. **#82 BÖLÜNDÜ:** #82a DESIGN-HOME **KAPALI**; **#82b Design-RAG PARK**, sahip verbatim: *"şimdilik park et ama ASLA UNUTMA"*. Tetik: sahip çağrısı ∨ A23-sonrası envanter.
6. **SADELEŞTİRME HÜKMÜ (sahip, S105):** kirli 8 belgenin baytları bugün DB'ye taşınmaz — sahipte kalır, INDEX'te adıyla yaşar, inişi #82b'ye adlı erteleme. Sahip verbatim: *"niye bu kadar kompleks hale getirdik bu işi?"* — haklıydı, kalan 7 yükleme İPTAL edildi.
7. **VECTOR-ONBOARD-DRIP-1 AYRI FAZ** (v106'dan taşınan verbatim hüküm, hâlâ yürürlükte): öncelik kuyruğu + throttling kendi fazıdır.
8. Arşiv belgeleri kutuya değil repoya (#74 kapsamı) — kabul, S105'te `docs/design/` ile ilk kez uygulandı.

## §5 · ARCHITECT HÜKÜMLERİ (S105)
**MOJIBAKE KANAL ONARIMI — KABUL (AG-4'ün yargı çağrısı):** kanal UTF-8'i
Latin-1 diye çözüp yeniden kodladı; AG-4 bunu bayt imzasından teşhis etti
(digest'i herhangi bir düzeltmeyi TEST etmek için kullanmadan ÖNCE), **tek tip**
dönüşümü on ikisine birden uyguladı, kayıpsızlığı sıfır U+FFFD ile kanıtladı, ve
digest tam reddetme gücünü korudu — varış baytlarını 12/12 REDDETTİ. **Prensip:
tek-tip + kayıpsızlığı-kanıtlı + digest-oracle = meşru kanal onarımı; dosya-başına
uyarlama ya da digest'e doğru yönlendirilmiş herhangi bir dönüşüm = DEĞİL.**

**PARİTE BİR SAYI DEĞİL, DAĞILIMDIR (S105, AG-3'ün kendi çürütmesinden):**
aynı build, aynı korpus, aynı digest, 12 dakika arayla **%26,7 / %20,0 / %26,7**.
Encoder her koşuda bayt-deterministik; oynaklık top-3 sıralamasındaki
berabere-yakın yer değiştirmelerde. **Sonuç: v107 §5'teki parite okuması TEK
ÖRNEĞE dayanıyordu.** Valfin 2. kilidi bu haliyle zayıftır; pariteyi kabul
kriteri yapan her kart **tekrar + yayılım** ister. Yasa adayı → §8.

**VALF AÇIK AMA ATIL — GERİ SARILMADI:** şerit sağlığı iki kez kanıtlandı
(R4 + R6.1, dört kol yeşil), atıl açık valf tehlike değildir. Ama iki sonuç
taşınır: (a) üretimin sıfır hata sayısı yapısaldır, ölçüm değildir; (b) sıradaki
tüketici ek onay olmadan canlıya çıkar — bu yüzden #75 ve #66 aynı masadadır.

**#64 NAV-SCROLLBOX HÜKMÜ** — v107 §5'teki tam metin AYNEN yürürlüktedir
(scrollbox meşrudur, adlandırılmış tek istisna; iki şart: görünür kaydırılabilirlik
+ viewport matrisine 768 eklenir — kapı GENİŞLER, gevşemez).

**KARAR-A23-SEQ-1** — v107 §5'teki tam metin AYNEN yürürlüktedir (makine önce,
kanal-2 kalibrasyondan önce; dört tel W1-W4; yalnız `CLOSED@v1_4-mint` ile düşer).
**S105 düzeltmesi:** §3(c)'nin *"turn-sequence v1_1 hiç mint edilmedi"* hükmü
YANLIŞTI — v1_1 VAR, kilitli, ve `cwf-turn-sequence-target-v1`'i supersede ediyor
(INDEX'te ölçüldü). Tek-negatif-prob hatası; v1_4 amendment kapsamı düzeltilmiş
haliyle mint edilecek: referans KALIR.

**S106 AÇILIŞ SIRASI (bağlayıcı):** #66 öncelik kuyruğu → #75 okuyucu + ilk
tüketici (A23 ③ Resolve'ün içinde) → tekrarlı parite ölçümü (tek koşu değil).
#81 korpus paralel koşar, tüketiciyi bloklamaz — dürüst-boş meşru cevaptır.

## §6 · PARK (tetikli — TAM liste, L-ADAY-2)
| Kalem | Tetik |
|---|---|
| **#82b Design-RAG** | **sahip çağrısı ∨ A23-sonrası envanter** (sahip hükmü 5). Borcu: 8 belgenin baytları + korpus uzunluk-muhafızı. ASLA DÜŞÜRÜLMEZ |
| ACTION-AUTHORITY-ADR → BACKEND-N8N-1 | yaprak_gate ∨ sahip çağrısı |
| OPA-AYNA (ADR-016'nın ikinci aşaması) | federated backend GERÇEK olduğunda |
| TENANT-CONSOLE / EAIP-TENANT ailesi | müşteri #2 ∨ online satış |
| Nakil kanıtının 2. yarısı (seed-foreign canlı kullanım) | kurulum #2 |
| LangGraph ikinci-beyin sınıfı | eylem-uzvu hattı sonrası |
| HISTORY-DIET-1 | 2F-sonrası kuyruk |
| MEMORY-HYGIENE-Q | sahip onayı (S90 H3) |
| ROUTER-DISTILL-1 | ölçüm-tetikli |
| QUERY-CANDIDATE-1 | CLOSED-BY-RECON (S86-R1) — kayıtta kalır, yeniden açılmaz |
| DOKÜMANTASYON | **sahip kararı: EN SONA** |

## §7 · NÖBET (faz açtırmaz — TAM liste)
⏰ **Langfuse bütçe-çiti ~20 AĞUSTOS** (canlı doğrulama = `budget-fence.yml` ilk
CI koşusu; bu EC2 bir kez bütçe eylemiyle DURDURULDU) · kanarya verdikt nöbeti +
**underpowered kilidi** (S105'te yine underpowered: violationReps 0, failedReps 0,
stubMisses 0 — mühür #37) · BUG-016 sayacı · transient permission classifier
retry · adsız flake ×2 · user-voice 3 incelenmemiş 👎 · GitHub App token formatı ·
**ARDIC ×2 dış bekleme** · #46 canlı re-probe borcu · ekipman R3 gerçek sondası ·
F-S100-SYNTH-FRAME-ERROR taze-gün okuması · FRAME-ERROR enum (1/9) ·
MIGRATION-STATUS-LIES-WIDER · corpus-vs-registry · RULE-38 teli ·
**F180 / LB-11 araç-çıktısı enjeksiyon sertleştirmesi** ·
`F-S103-PIP-LAYER-REBUILD` (DÜŞÜK) · `F-S103-COMPOSE-PS-TEMPLATE-EATEN` (DÜŞÜK) ·
`F-S103-LANE-POLL-MORTALITY` (ORTA → RELAY-BUS-2/E2) ·
`F-S103-STALE-DEV-SERVER-CROSS-CHECKOUT` (ORTA) ·
**`F-S105-SEAL-TABS-BEYOND-EDIT`** (3 sekme hash'i düzenlemesiz oynadı; S105'te
bir kez daha görüldü — AG-3'ün R3'ünde bir sekme kaydı, altısı durdu; İZLEME) ·
**iki kilitli belgede bayat sibling ref** (`component-architecture-v1_1`;
KAYITLI, ONARILMAZ — kilitli belge indeksle yeniden yazılmaz) ·
**PLATINUM-BREACH-S105-1** (`/private/tmp/ag3-ano1`'i sahip sildi; yasa adayı
"yarat: yalnız kendi silebileceğin yerde") · **tenant-zero sayım farkı** (Architect
guarded lens 54 hit / AG-4 45 hit; temiz-kirli bölünmesi BİREBİR aynı, sayım farkı
ÇÖZÜLMEDİ — düşük öncelik, ama kapatılmadan kapı sayısı alıntılanmaz).

## §8 · YASALAR (S105)
**Külliyatta (S103, #67 ile):** S102-YASA-1/2/3 · DERIVED-NEVER-SOURCE ·
FULLEST-ATTESTED · AGNOSTIC-1 · RULE-36..39.

**S105 ADAYLARI (→ LAW-LEDGER-4):**
- **L-ADAY-4 · OPSİYONEL YÜZEY YALNIZ TÜKETİCİYLE YA DA FALSIFIER'LA YAŞAR.**
  Beyan edilmiş ama ne okunan ne test edilen opsiyonel alan sessizce derlenir ve
  ÖLÇÜM YÜZEYİ OLDUĞUNU SANDIRIR. İki ölçülmüş örnek: #80'in atıl `declared_type`
  ve F-2'nin `admission?`. İki örnek = kalıp = kapı.
- **L-ADAY-5 · TEK KOŞU BİR DAĞILIMI ÖLÇEMEZ.** Sıralama-tabanlı her metrik
  (parite, örtüşme, recall@k) tekrar + yayılım ile raporlanır; tek sayı bir
  ARGÜMANDIR, sonuç değil (TOTAL-45'in ölçüm-katmanındaki kardeşi).
- **L-ADAY-6 · MAKİNE-YOLU BAYT YÜKÜ KENDİ KAPISINI TAŞIR.** Bayt taşıyan her
  cümle digest'ini AYNI cümlenin içinde kanıtlar (`insert … select … where
  md5(content) = beklenen`) — yanlış bayt doğamaz, sahte satır yerine gürültülü
  sıfır-satır düşer. Doğuşu: `F-S105-ARCHITECT-INGEST-CHANNEL-FAULT`.
- **L-ADAY-7 · KANAL ONARIMI ≠ İÇERİK DÜZENLEMESİ** (§5'teki üç şart).
- **L-ADAY-8 · YARAT: YALNIZ KENDİ SİLEBİLECEĞİN YERDE** (PLATINUM-BREACH-S105-1).

**Kart disiplini dersleri (S105):**
(a) Bir kartın kapı listesindeki her kapının VARLIĞI ölçülür — `check:law-corpus`
kartta vardı, revizyonda yoktu. (b) Bir kartın "kimlikli yol" dediği şey APPLY
olabilir: yolun kendisi okunmadan probe diye adlandırılamaz
(`F-S105-SWITCH-CARD-R2-UNRUNNABLE`). (c) Bir belgeyi okumuş olmak, o belgeyi
kapıdan geçirmiş olmak DEĞİLDİR (`F-S105-DESIGN-HOME-TENANT-COLLISION`).
(d) Sıfır-hit banner'ı **paydasıyla** okunur; çöken payda sahte yeşildir.

<!-- END · cwf-open-items-register-v108 -->
