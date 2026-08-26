# CWF — AÇIK KALEMLER REGISTER · v106 (S102 kapanışı)

<!-- v105'i GEÇERSİZ KILAR. Bağlayıcı sıra: master-rollout-plan. Yeni kalem
     yalnız ADIYLA eklenir; liste yeniden gözden geçirilmez (ALTIN DEFTER).
     Kalemler yalnız CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO ile çıkar. -->

## §0 · ZEMİN (S102 kapanışında taze klonda HESAPLANDI)

`origin/master` **`1f660eadbe4bb835d123723acec292d3495a89aa`** · docVersion
**rev 271** · **650** test dosyası · **16** e2e spec · **83** migration (canlıda
83, bire bir, tepe `20260816121000`) · **16** ADR · `docs/laws/` 3 dosya ·
**uçuşta şerit: 2** (AG-3 FIX-7 · AG-1 GRAPH-KB durum bilinmiyor).

## §1 · SOTA KAPISI — **5/7** (değişmedi)

Dönen: #2 (S93) · #10 (S96) · #16 (S98) · #18 (S99) · #23 (S100).
Kalan: **#25 GRAPH-KB · #29 A23**.
S102 anahtar döndürmedi ve döndürmemesi doğruydu: bu oturum vektör motorunun
altyapısını, onu ölçen enstrümanları ve deploy yolunun yasalarını kurdu.

## §2 · S102'DE KAPANAN KALEMLER

| Kalem | Merge | Kapanış kanıtı |
|---|---|---|
| **#63 LAW-LEDGER-1** | `cdb9f1f` | `docs/laws/` kanonik ev; v5_1'in en-tam-tanıklı anayasal metinleri restore (6/6 bayt-aynı); taban-uzunluk kapısı M9 CI'da; sentetik-kırmızı pozitif kontrolü |
| **F-S102-CANARY-500-ON-MERGE** | `fd02f69` | HARD-CRASH sınıfı; CI non-200 gövdesini üç durumda basıyor; deney yeşil |
| **#47 RBAC-GOVERNED-1** | `2208dc9` | Kelepçe (mutasyon: 6 KIRMIZI) · anon süpürmesi (24 census / 20 revoke / 4 kasıtlı) · cross-user ortası · discovery-cache kimlik-anahtarlı (mutasyon: 2 KIRMIZI) · Architect canlı bağımsız doğrulama |
| **#64 OBS-DELIVERY-NAME-1** | `319e6fc` | `err=<Ad>[:<statü>][ <mesaj>]`, yalnız `delivery=failed` iken; redaction sözlüğüne karşı sanitize; mutasyon: kompozisyon süiti 4 kırmızı / saf formatterlar yeşil |
| **Langfuse teslim zinciri** | — | **CLOSED@owner-eyes**: kutu 8 konteyner, anahtarlar state'te yaşadı, CF üzerinden OTLP 200/37ms, sahip izi UI'da gördü |

## §3 · AÇIK KALEMLER (bağlayıcı sırada)

| # | Kalem | Dalga | Not |
|---|---|---|---|
| **27** | **QDRANT-ENGINE-1 · canlı yarım** | **8-1 UÇUŞTA** | Kod master'da. Kanıt 3/4: imzasız 401/403 ✅ · kimlik pini ✅ · determinizm 20×1-digest ✅ · **parite ⏸**. FIX-7 (waitress + `_infer_lock`) yazıldı, imaj build'de, dal push edilmedi. **Yeni digest doğacak.** |
| **25** | 🔑 **GRAPH-KB-1** | **8-3** | Kart teslim (md5 `12986ebf…`), posta verildi, **rapor/dal YOK — durum ölçülecek**. 4. bellek katmanı · SEED-PROBATION tetiği (kaynak: vizyon notu §6, YALNIZ tetik semantiği) · `F-S97-REGISTRY-PARENT-OVERWRITE` burada kapanır (S97 ölçümü 96 ad/212 satır, canlıda yeniden ölçülecek) · RULE-31 burada devreye girer |
| **65** | **MERGE-FIELD-AWARE-1** | 8 | `F-S101-OVERRIDE-DROPS-BACKEND` fix'i. RULING-PERSONAL-BACKEND-ISOLATION'ın **ikinci zorunlu** fix'i (ilki DISCOVERY-CACHE ✅ kapandı). Kart HENÜZ KESİLMEDİ |
| **66** | **VECTOR-ONBOARD-DRIP-1** | 8.5 | **SAHİP HÜKMÜ (S102, verbatim): "priority queue olması lazım ve traffic throttling yapılmalı ama AYRI BİR FAZ olarak yapılacak."** R1 sorgu her zaman indekslemeyi geçer (iki sınıf, tek kuyruk yok) · R2 indeksleme/onboarding hız-sınırlı damlar (governed düğme) · R3 kanıt: canlı sorgu yükü altında N-kalem onboarding, sorgu gecikmesi sayıyla · **DAMGA: motor switch'inin ZORUNLU ÖN KOŞULU** |
| **67** | **LAW-LEDGER-2** | 8.5 | S102'nin 3 anayasal yasası + 2 YASA hükmü + şerit dersleri RULES.md'ye numaralı girer · **PLATINUM→AGNOSTIC-1 rename (Q4 onayı)** burada uygulanır |
| **68** | **QDRANT-OWNER-SURFACE-1** | tetikli | **Sahip istediğinde** (S102'de kendi kararıyla ertelendi): Qdrant'ın sahip-okur yüzü. Hedef: kendi admin panelimizde okunur yüzeyler — tarayıcı eklentisi cambazlığı DEĞİL |
| 33 | B-FRONTIER-PAIRING-1 | 8 | 🔒 kapı sonrası, ilk skordan önce |
| 29 | 🔑 A23 ANLAMA KATMANI | 9 | A23 ∩ PLANNER-0 çizili |
| 48 | FAILURE-LESSON-MEMORY-1 | 9 | S98-L5 |
| 59 | SILENT-FINISH | 9 | S102'de canlı örnek daha: `finishReason=error` + `silentFinish=true` (16:11 turu) |
| 49 · 17 | A2A auth (401) + `context_id` · HONESTBENCH-HARNESS-0 | 9 | |
| 30 · 31 · 37 · 32 | EVAL-SPLIT + ilk ölçüm · honestbench · GOLDEN-SET-REPLAY · v1.1 kuyruğu | 10 | 🔒 |
| — | **RELAY-BUS-2** | 8.5/9 | S102'de ONAYLANDI: E1 claim RPC · E2 status · E3 view · E4 kind · R1..R5 |

## §4 · S102'DE DOĞAN BULGULAR

**Kapananlar (hepsi bu oturumda kabloya döndü):**

| Bulgu | Nerede kapandı |
|---|---|
| `F-S102-AMI-DRIFT-DESTROYS-HOST` — sabitlenmemiş AMI + okunmamış auto-approve = kutu yıkıldı | FIX-2: `ignore_changes=[ami]` + plan kapısı |
| `F-S102-SG-PREFIX-LIST-WEIGHT` — CloudFront prefix-list kuralı kotada **55** sayılır; 3 kural × 55 = 165 > 60 | FIX-2: port başına ayrı SG |
| `F-S102-ASCII-ONLY-AWS-STRINGS` — EC2 `GroupDescription` ASCII-only; ev üslubu em-dash | FIX-2-ASCII (92 satır **sınıflandırıldı**, 3'ü düzeltildi) |
| `F-S102-ENCODER-LAZY-LOAD` — port model yüklenmeden açılıyordu | FIX-3: import'ta yükle, `/health` yalnız resident'ken 200 |
| `F-S102-ENCODER-REVISION-KWARG-SWALLOWED` — `revision` `**kwargs`'a düştü, hiç iletilmedi; "pin" bir yalandı | FIX-3: build-time gömme + `HF_HUB_OFFLINE=1` |
| `F-S102-PROOF-RACES-ASSOCIATION` — apply parametreyi yazdı, association eski sürümü okudu, kanıt ESKİ konteyneri ölçtü | FIX-4: zorunlu yakınsama + hesaplanmış sürüm beklemesi + kimlik ön-kontrolü |
| `F-S102-VOLUME-SHADOWS-BAKED-WEIGHTS` — bayat named volume `/models`'ı gölgeledi; boş volume'da ÜREME (Docker boş volume'u imajdan tohumlar, dolu olanı ASLA) | FIX-5: mount silindi (3 yolla yeniden üretildi) |
| `F-S102-FANOUT-AT-SINGLE-WORKER` — parite `Promise.all` ile 161 eşzamanlı encode fırlattı; determinizm için TEK işçi olan servisi boğdu | FIX-6 (istemci sıralı) + FIX-7 (sunucu dayanıklı, UÇUŞTA) |
| `F-S102-CLOUDINIT-ENV-RACE` — kutu `.env`'i vector anahtarları yazılmadan çekti | Association'ın kendi yakınsamasıyla iyileşti; kalıcı sıralama S103'te |
| Langfuse `delivery=failed` (3 tur) | Kök: eski deployment'ın ölü kutuya bayat bağlantısı; AG-4 redeploy'u ile aktı. **CLOSED@owner-eyes** |

**Açık kalanlar (faz açtırmaz, adıyla izlenir):**

| Bulgu | Ağırlık | Not |
|---|---|---|
| `F-S102-HEALTHCHECK-NO-TREATMENT` | **ORTA** | `restart: always` çıkışa bakar, SAĞLIĞA değil — kilitlenen konteyner 15 dk `unhealthy` raporladı ve kimse aksiyon almadı. *Kimsenin üzerine aksiyon almadığı healthcheck, tedavisi olmayan teşhistir.* |
| `F-S102-PARITY-KEY-BREADTH` | DÜŞÜK | CI'daki `SUPABASE_PARITY_KEY` service_role genişliğinde; daraltılmış okuma anahtarı sonraya, adıyla |
| `F-S102-APPLYLOG-TEMPLATE-ESCAPE` | DÜŞÜK | `compose-apply.log` konteyner adları yerine `{{.Name}}` şablonunu basıyor (kaçış hatası) |
| `F-S102-ROOT-CONSOLE-USE` | DÜŞÜK | Sahip AWS konsoluna root ile giriyor; IAM kullanıcısı doğru pratik |
| `F-S102-ORPHANED-MODEL-VOLUME` | DÜŞÜK | `langfuse_bge_m3_models` kutuda mount'suz duruyor; sonraki süpürmede silinir (kabuğa girip silmek YASAK — S102-YASA-1) |
| `F-S102-LANGFUSE-UI-ACCOUNTS-LOST` | KAYIT | Eski UI hesapları volume ile gitti; yaşayan tek hesap init admin. Telemetri tarihçesi de gitti (kabul edilmiş) |
| `F-S101-BACKENDS-ENABLED-NO-WRITER` | DÜŞÜK | v105'te düşmüştü, **geri eklendi** |
| `F-S101-MKB-TOKEN-ROTATION` | — | **Sahip planlı. GÜNDEME GETİRME.** |
| Devir: FRAME-ERROR enum · MIGRATION-LIES-WIDER (13 dosya) · corpus-vs-registry · `F-S101-FK-CENSUS-BY-CONVENTION` · `F-S101-ROUTE-READ-DUP` · `F-S101-PURPOSE-GATE-SCOPE` · `F-S101-LIFECYCLEOF-SERVES-UNKNOWN` | | değişmedi |

**Nöbet:** bütçe-çiti **~20 Ağustos** — iki yeni konteyner (qdrant + bge-m3)
çite bildirilecek · kanarya `underpowered` kilidi (mühür #37) · ARDIC'taki iki
kalem (`F-S98-SHIFT-QUERY-UNUSABLE`, 13 araç yetkisi) · ARMES'in kendi DB
tökezlemesi (`Could not open JPA EntityManager`, 22:30 turu — tedarikçi tarafı).

## §5 · SAHİP HÜKÜMLERİ (S102 — dokuz, hepsi kapalı)

1. **YASA:** *"türev kaynağın yerine geçmez · tek negatif prob yokluk kanıtı değildir"*
2. **RULING-PERSONAL-BACKEND-ISOLATION** — beş kanal; iki zorunlu fix
   (DISCOVERY-CACHE ✅ · OVERRIDE-DROPS-BACKEND → #65)
3. **C1** RULE-0 mekanizmasız parite ✅ · **C2** RULE-22 non-blocking gerçeği ✅
4. **Q4** PLATINUM→AGNOSTIC-1 rename → LAW-LEDGER-2'de
5. **Q5 YASA:** *"en tam tanıklı ifade kazanır, en yeni sürüm değil"*
6. **KARAR-LAW-HOME-1** ONAYLANDI@S102
7. **RELAY-BUS-2** onaylandı · **Seçenek 1 "kutuyu düzelt"** TAM/bu dalgada
8. **merge-first sıralaması** (workflow_dispatch fizik kuralı)
9. **DRIP hükmü** (§3 #66'da verbatim) · **"bu işin yarını YOK"** · **"race
   condition UNACCEPTABLE, operasyon şeritte"**

## §6 · SAHİP KARARI SIRADA

**Yok** — ama S103'te GELECEK olanlar: FIX-7 merge kanaryası (bir onay) ·
GRAPH-KB GO'su · LAW-LEDGER-2 · MERGE-FIELD-AWARE-1 · ve en sonda **motor
switch onayı** (parite + bağımsız okuma + DRIP kapanışı önkoşullarıyla).

<!-- END · cwf-open-items-register-v106 -->
