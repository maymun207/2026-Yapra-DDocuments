# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT · v103 — S103 açılışı

<!-- v102'yi GEÇERSİZ KILAR. S37-1: tek ad, tek içerik. İlk mesaj: "S102'den devam".
     v103 FARKI: S102 on bir merge ile kapandı (rev 268→271); Dalga 8'in iki fazı
     kapandı, biri UÇUŞTA kaldı; üç yeni ANAYASAL yasa doğdu; oturum boyunca
     onbeş A-REC sicile girdi. Bu belge BÜTÜN yazıldı (A-REC-S101-7). -->

## §A · KİMLİK + YASALAR (verbatim tekrar ZORUNLU)

Architect ilk mesajında **SOTA-1'i kelimesi kelimesine** yeniden yazar (S66-1).
Yokluğu = oturum yanlış açıldı.

Doktrin **v1_5** · D-7 · DALGA-ÇAPA (S88-1) · S74-3/4 (Architect şerit çıktısını
origin'den KENDİ okur) · otomasyon-önce · PLATINUM · sahip maddeleri insan-dili
Türkçe, adım adım.

**S102'de doğan ve verbatim tekrarlanacak ÜÇ ANAYASAL YASA:**

- **S102-YASA-1 · SAHİP-ELİ YASASI.** Sahibin tek yüzeyi RIZA ve gerçek-dünya
  tanıklığıdır. Bir makinenin yapabileceği hiçbir operasyon adımı sahibe
  taşınamaz: Architect'in kendi kabı yetmiyorsa iş ŞERİDE gider, sahibe değil.
  Sahibe yazılan her aksiyon maddesi tek testten geçer: bu madde insan YARGISI
  mı içeriyor (karar, harcama onayı, gerçek-dünya tanıklığı)? Hayırsa o madde
  YASAKTIR ve yazılması kendiliğinden-beyan gerektiren bir ihlaldir. Sahibe
  davul çaldırtılmaz.
- **S102-YASA-2 · YARIŞSIZ TESLİM YASASI.** İki otomat arasındaki her
  el-değişimi ya SENKRONDUR — bekleyen taraf neyi beklediğini ve son ne
  gördüğünü adlandırarak bekler, hedef sürümü HESAPLAR, varsayamaz — ya da
  TASARIM HATASIDIR. "Bir ara okur", "umarım yetişir" sınıfı teslim yasaktır.
  İnsan eliyle kapatılan her zamanlama boşluğu numaralı bir PLATINUM-BREACH'tir.
  Bir kanıt, hangi motoru ölçtüğünü adıyla basamıyorsa o kanıt yarışın yeşil
  gömleklisidir ve reddedilir.
- **S102-YASA-3 · OKUNMAMIŞ PLAN YIKAMAZ.** Auto-approve altındaki hiçbir apply
  meşru değildir. Her apply, kaydedilmiş ve OKUNMUŞ planın kendisini uygular —
  incelenen nesne ile icra edilen nesne aynı bayttır. Yıkım ya da yerine-koyma
  içeren plan, ayrı ve adlandırılmış sahip onayı olmadan koşamaz; kapı ihlali
  adresleri basarak durur.

**S102'de YASA mertebesine çıkan iki sahip hükmü (verbatim):**
- *"türev kaynağın yerine geçmez · tek negatif prob yokluk kanıtı değildir"*
- *"en tam tanıklı ifade kazanır, en yeni sürüm değil"* (sessiz sıkıştırma bir
  defekttir, güncelleme değildir)

**Şeritlerin doğurduğu üç ders (yasa adayı, RULES.md'ye LAW-LEDGER-2 ile):**
- API sınırını geçen metin, ev üslubuna değil API'nin KARAKTER SETİNE uyar.
- ÖLÇÜM TÜRETMEYİ YENER (*measured beats derived*): Architect'in aritmetiği,
  şeridin ölçtüğü RSS'e yenildi ve yenilmesi doğruydu.
- Kimsenin ÜZERİNE AKSİYON ALMADIĞI healthcheck, tedavisi olmayan teşhistir
  (`restart: always` çıkışa bakar, sağlığa değil).
- Eşzamanlılık, ÇAĞRILANIN işçi modeline göre seçilir; tek işçiye paralel yük
  bindiren timeout'u kendisi üretir.

Yasa katmanları (değişmedi): S89–S101 + **S102 üçlüsü** yukarıda.

## §B · RULE-25 BOOT (taze TAM klon; iddia — DOĞRULANACAK)

`origin/master` **`1f660eadbe4bb835d123723acec292d3495a89aa`** ·
docVersion **rev 271 · 2026-08-16** · **650** test dosyası (git ls-tree bağımsız
sayımı) / test sayısı İDDİA — hakem PR-head CI (S37-2) · **16** e2e Playwright
spec (AYRI) · **83** migration repoda, **canlıda 83, bire bir**, tepe
`20260816121000` · **16** ADR · `docs/laws/` **3 dosya** (CONSTITUTION · RULES ·
README) · drift kapısı [OK].

**S102'nin on bir merge'ü (first-parent, hepsi doğrulandı):**
`cdb9f1f` LAW-LEDGER-1 → `fd02f69` PROBE-CANARY-500 → `2208dc9` RBAC-GOVERNED-1
→ `a259d9e` QDRANT-ENGINE-1+FIX-1 (rev 270) → `5669bb5` FIX-2 → `1d7bbc1`
FIX-2-ASCII → `014208f` FIX-3 → `319e6fc` OBS-DELIVERY-NAME-1 (rev 271) →
`57084df` FIX-4 → `d14aa92` FIX-5 → `1f660ea` FIX-6.

**SOTA kapısı: 5/7 — DEĞİŞMEDİ ve değişmemesi doğruydu.** Kalan iki anahtar:
**#25 GRAPH-KB · #29 A23**. S102 bir anahtar döndürmedi; bu oturum vektör
motorunun ALTYAPISINI ve onu ölçen enstrümanları kurdu — #25'in üzerinde
koşacağı zemin.

**HİJYEN BORCU (S103'ün İLK işi, S98-L1):** origin'de **13 `phase/*` + `probe/*`
+ `status/*` ref** duruyor, hepsi merge edilmiş ya da tüketilmiş:
`law-ledger-1` · `obs-delivery-name-1` · `qdrant-engine-1` ·
`qdrant-engine-1-fix-2` · `qdrant-engine-1-fix-2-ascii` ·
`qdrant-engine-1-fix-3` · `qdrant-engine-1-fix-4` · `qdrant-engine-1-fix-5` ·
`qdrant-engine-1-fix-6` · `rbac-governed-1` · `status-request-s102-1-ag-2` ·
`probe/canary-500-f-s102` · `status/ag-1-s102-1`.
⚠ **`phase/qdrant-engine-1-fix-7` HENÜZ YOK ve silinecekler listesine GİRMEZ** —
uçuştaki işin dalıdır (aşağı bkz.).

## §C · UÇUŞTAKİ İŞ — S103'ÜN İLK GERÇEK GÖREVİ (S91-3 devri)

**AG-3 · PHASE-QDRANT-ENGINE-1-FIX-7 — kod YAZILDI, imaj BUILD'de, dal HENÜZ
PUSH EDİLMEDİ.** S102 kapanırken şeridin bildirdiği durum:

- Taban: `1f660ea`. Dört dosya yazılı: `app.py` (Flask dev server → **waitress**,
  yalnız model çağrısı `_infer_lock` arkasında — encode'lar KATI SIRALI kalır,
  determinizm dokunulmamış, `/health` yük altında cevap verebilir) ·
  `requirements.txt` (waitress pinli) · `deploy-langfuse.yml` (**R1 gözleri**:
  beklemeden ÖNCE kutuya `OOMKilled`/`RestartCount`/`ExitCode`/`Status`/
  `StartedAt` + son 15 log satırı sorulur, verbatim basılır; OOM · konteyner yok
  · restart-loop ≥3 durumlarında HIZLA ve ADIYLA düşer; gövde-basım timeout'u
  20s→**45s** çünkü CloudFront 504'ü 31. saniyede gelir) · rapor.
- **R2 UYGULANMADI ve uygulanmaması DOĞRUDUR:** kartın `mem_limit: 2g` öncülü
  YANLIŞ atıflıydı (2g **qdrant'ın**; encoder zaten 4g) ve OOM hipotezi
  şeridin ölçümüyle çürütüldü — yerelde yüklü encoder **1.79 GiB / 4g**, ~20s'de
  yükleniyor. Kart kendi durma maddesini işletti (A-REC-S102-15).
- **Üretimdeki durum:** encoder konteyneri, FIX-6 öncesi 161'lik fan-out'tan
  beri KİLİTLİ (`/vector/encode/health` → 504, ~30.3s; port dinliyor ama
  uygulama accept etmiyor). Qdrant `readyz` 200, Langfuse 200, kutu sağlıklı.
  **Valf KAPALI olduğu için üretim etkisi SIFIR.**
- **Sıra:** imaj build biter → şerit 161'lik fan-out'u YERELDE yeniden üretip
  `/health` ayakta kalıyor mu ÖLÇER (kalmazsa hipotez yanlıştır ve GÖNDERMEZ) →
  merge (bir kanarya, sahip onayı gerekir) → CI imaj build → **YENİ DIGEST** →
  dispatch (şeridin kendi `gh workflow run`'ı) → yakınsama → R1 teşhisi →
  dört kanıt bölümü.
- ⚠ **DIGEST DEĞİŞECEK.** FIX-3/FIX-6 imajı
  `…@sha256:795c44b02af9682b25bb3009fa4de0f2bdc08cb5770f4169a17f7461aee87cec`
  idi; FIX-7 `requirements.txt`'i değiştirdiği için YENİ imaj doğar. Eski
  digest'i dispatch'e YAZMA.

**AG-1 · GRAPH-KB-1 🔑 — DURUM BİLİNMİYOR (S98-L3).** Kart teslim edildi
(`PHASE-GRAPH-KB-1-v1`, md5 `12986ebf93464f50940e459cbdc68478`, kutuda), "posta"
verildi, **dal push edilmedi ve rapor gelmedi.** S103 bunu HATIRLAYARAK değil
ÖLÇEREK devralır: `git ls-remote` + kutu + sahibe sor.

**AG-2 · boşta. AG-4 · OBS-DELIVERY-NAME-1 merge edildi, şerit boşaldı.**

## §D · S102'NİN HASADI (kapanmışlar — kanıtla)

| İş | Kapanış kanıtı |
|---|---|
| **#63 LAW-LEDGER-1** | `cdb9f1f` · yasa korpusu `docs/laws/`'a indi · v5_1'in "en tam tanıklı" anayasal metinleri restore edildi (6/6 bayt-aynı, Architect ölçümü) · taban-uzunluk kapısı (M9) CI'da: yasa artık **sessizce kısalamaz** · sentetik-kırmızı pozitif kontrolü alındı |
| **F-S102-CANARY-500-ON-MERGE** | `fd02f69` · HARD-CRASH sınıfı teşhis edildi, CI artık non-200 gövdesini üç durumda basıyor · deney yeşil |
| **#47 RBAC-GOVERNED-1** | `2208dc9` + migrasyon `20260816120000`/`120500` canlıda · kod-tavan kelepçesi (mutasyonla: tavan kalkınca 6 KIRMIZI) · anon süpürmesi (census 24, revoke 20, 4 kasıtlı) · cross-user "ortası" · discovery-cache kimlik-anahtarlı (kimlik sökülünce 2 KIRMIZI) · **Architect canlıda bağımsız doğruladı**: anon→user_audit=false, anon→mcp_settings=false, authenticated→mcp_settings=true, 5 politika duruyor |
| **OBS-DELIVERY-NAME-1** | `319e6fc` (rev 271) · `[Obs]` satırı artık `err=<Ad>[:<statü>][ <mesaj>]` basar, YALNIZ `delivery=failed` iken · mutasyon kanıtı: yakalamayı sökünce KOMPOZİSYON süiti 4 kırmızı, saf formatter testleri yeşil kalıyor |
| **Langfuse teslim zinciri** | **CLOSED@owner-eyes** · kutu yeniden doğdu (8 konteyner), anahtarlar state'te yaşadı (pk ön eki her yerde `pk-lf-f74c02…`), CloudFront üzerinden OTLP 200/37ms, sahip izi UI'da GÖZÜYLE gördü · `delivery=failed` sebebi: eski deployment'ın ölü kutuya bayat bağlantısı; AG-4 merge'ünün redeploy'u ile aktı |
| **AWS kutusu yeniden doğdu** | `i-057e5737f7ce02c52` · **8 konteyner** (6 Langfuse + qdrant + bge-m3) · iki ayrı vector SG (`sg-0d277c72…` 6333, `sg-018712e1…` 8080, ikisi de yalnız `pl-a3a144ca`) · CloudFront iki origin + iki behaviour + path-rewrite function · SSM apply document + association (30dk) |

**QDRANT-ENGINE-1 canlı kanıtları — dörtte ÜÇÜ ÖLÇÜLDÜ:**
- **(b) İmzasız prob ✅** — `vector-index` 401 (Qdrant kendi api-key'i),
  `vector-encoder` 403 (bizim kapı başlığımız). Tek assertion'da SG + iki origin
  + sıralı davranışlar + path-rewrite + iki kimlik birden sınandı.
- **(a2) Kimlik ön-kontrolü ✅** — `/health` 200 `state=loaded ready=true`;
  bildirilen imaj = dispatch edilen imaj (bayt bayt); model revizyonu
  `5617a9f61b028005a4858fdac845db406aefb181` (GERÇEK pin — FIX-3'te `revision`
  kwarg'ının yutulduğu bulundu, ağırlıklar build'de gömüldü).
- **(c) DETERMİNİZM ✅✅** — `encoder=bge-m3-v1-d1024 dims=1024 sparseTerms=6`,
  20 tekrar → **tek digest** `2d1dee267d18a155`. IR sözleşmesinin kalbi artık
  ölçülmüş bir özellik.
- **(d) PARİTE ⏸ NOT-MEASURED** — korpus canlıdan okundu (**161 kalem** = 150
  araç açıklaması + 11 governed; hiçbir kiracı metni repoya/loga girmedi), ama
  encoder fan-out'la kilitlendiği için ölçülemedi. **S103'ün ilk çıktısı.**

## §E · DEĞİŞMEZLER (yeniden tartışılmaz)

- **Valf KAPALI.** `vector.engine` çevrilmedi ve şu sıra olmadan çevrilemez:
  parite sayıları → **Architect'in bağımsız yeniden-okuması** → **VECTOR-QOS
  (DRIP) fazının kapanması** → ayrı sahip onayı. Dördü de zorunlu.
- Uygulanmış 83 migration dokunulmaz tarihtir.
- `VECTOR_GATE_KEY` Vercel env'e **HENÜZ GİRİLMEDİ** — sır SSM'de yaşıyor
  (`/cwf/langfuse/env`), adapter onsuz gürültüyle reddeder. Girişi, parite
  kapandıktan sonra tek komut + tek yapıştırma (sahip aktı).
- Secrets: `SUPABASE_URL` + `SUPABASE_PARITY_KEY` GitHub Actions'ta (sahipçe
  eklendi). Genişlik borcu: `F-S102-PARITY-KEY-BREADTH` (LOW).
- AMI artık `ignore_changes` ile kilitli: hiçbir apply kutuyu kendiliğinden
  yıkamaz. Plan kapısı `allow_destroy=yes-destroy` olmadan yıkıma izin vermez.
- Langfuse sürümü **3.205.0**, sabitli — güncellenmedi, kutu yeniden kuruldu.
  Eski telemetri tarihçesi volume ile gitti (bilinen, kabul edilmiş).
- Eski Langfuse UI hesapları (`cwf-viewer` vb.) gitti; yaşayan tek hesap
  **init admin** (`admin@cwf.local`, şifre `/cwf/langfuse/env`'de).
- Operator (Gemini) **BOOT'suz "posta" almaz** — şablon MULTI-AG-WORKMODE §4'te,
  akışın o adımında sahibe ULAŞTIRILIR (A-REC-S102-8).
- GitHub API Architect kabından **403** (beklenen, arıza değil). AWS CLI ve
  CloudFront domaini Architect'in ağ izin listesinde YOK — bu yüzden operasyon
  ŞERİDE koşar (S102-YASA-1).

## §F · S103'ÜN İLK İŞLERİ (sıra)

1. **Preflight + hijyen:** taze klon, §B çapası doğrulanır, 13 ölü ref silinir
   (fix-7 dalı HARİÇ — uçuşta).
2. **AG-3 FIX-7 zinciri bitirilir:** yerel fan-out kanıtı → merge (sahip
   onayı: bir kanarya) → build → YENİ digest → dispatch → **parite sayıları** →
   Architect'in bağımsız okuması → faz KAPANIR.
3. **AG-1 GRAPH-KB-1 🔑 ölçülür** (dal? rapor? kutu?) ve gerekiyorsa yeniden
   başlatılır. Kapıyı 6/7 yapacak tek iş budur.
4. **LAW-LEDGER-2** kesilir: S102'nin üç anayasal yasası + iki YASA hükmü +
   şerit dersleri `docs/laws/RULES.md`'ye numaralı girer; **PLATINUM→AGNOSTIC-1
   rename** (Q4) burada uygulanır.
5. **MERGE-FIELD-AWARE-1** kartı kesilir (`F-S101-OVERRIDE-DROPS-BACKEND` —
   RULING-PERSONAL-BACKEND-ISOLATION'ın ikinci zorunlu fix'i, HÂLÂ AÇIK).
6. **VECTOR-ONBOARD-DRIP-1** (öncelik kuyruğu + throttling) — switch'in zorunlu
   ön koşulu, sahip hükmüyle AYRI FAZ.
7. Nöbet: bütçe-çiti ~20 Ağustos (iki yeni konteyner çite bildirilecek) ·
   kilitli konteynerin `restart: always` ile iyileşmemesi
   (`F-S102-HEALTHCHECK-NO-TREATMENT`).

## §G · İLK MESAJDA SÖYLENECEK TEK CÜMLE

*"S102 on bir merge'le kapandı (rev 268→271): yasa korpusu kendi evine taşındı
ve CI koruması altına girdi, RBAC kodun tavanını canlıda kelepçeledi, vektör
şeridinin ikinci motoru kendi yazdığımız deterministik kodlayıcıyla ayağa kalktı
ve üç canlı kanıtını verdi — imzasız çağrı reddedildi, ölçülen motorun kimliği
dispatch edilenle bire bir eşleşti, yirmi tekrar tek bir digest üretti — ama
dördüncü kanıt (parite) kendi ölçüm düzeneğimizin fan-out'unda takıldı ve o
düzeltme uçuşta kaldı; yol boyunca okunmamış bir plan gözlem kutusunu yıktı ve
onu yeniden kurarken üç anayasal yasa doğdu: sahibin eli operasyonda olmaz,
yarışlı teslim tasarım hatasıdır, okunmamış plan yıkamaz."*

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v103 -->
